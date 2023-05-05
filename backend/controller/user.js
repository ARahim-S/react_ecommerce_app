const express = require("express");

const path = require("path");

const fs = require("fs");
/*

Bu kod bloğu, Node.js path modülünü yükler ve path adı altında bir değişkene atar. path modülü, dosya yollarını işlemek için kullanılan bir modüldür.

path modülü, işletim sistemi bağımsız bir şekilde, dosya yolları üzerinde işlem yapmanızı sağlar. Bu nedenle, Windows, macOS ve Linux gibi farklı işletim sistemleri üzerinde çalışan uygulamalarda dosya yolu işlemleri için kullanılabilir.

path modülü, özellikle dosya yollarının oluşturulması, birleştirilmesi, ayrıştırılması, normalleştirilmesi ve çözümlenmesi için kullanılır. Örneğin, path.join() yöntemi, belirtilen yolların birleştirilmesini sağlar:
*/

const router = express.Router();
const { upload } = require("../utils/multer");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      fs.unlink(req.file.path, function (err) {
        if (err) {
          console.log(err);
        }
        console.log("Exist user file deleted succesfuly");
      });

      next(new ErrorHandler("User already exists", 400));

      res.status(400).json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Please activate your account within 5 minutes",
        message: `Hello ${user.name}, Please click on the link to activate your account : ${activationUrl}  `,
      });
      res.status(201).json({
        success: true,
        message: `Verification mail is sent to ${user.email}`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const createActivationToken = (user) => {
  return jwt.sign({ user }, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activationToken } = req.body;

      const newUser = jwt.verify(
        activationToken,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, email, password, avatar } = newUser.user;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
