const express = require("express");

const path = require("path");
/*

Bu kod bloğu, Node.js path modülünü yükler ve path adı altında bir değişkene atar. path modülü, dosya yollarını işlemek için kullanılan bir modüldür.

path modülü, işletim sistemi bağımsız bir şekilde, dosya yolları üzerinde işlem yapmanızı sağlar. Bu nedenle, Windows, macOS ve Linux gibi farklı işletim sistemleri üzerinde çalışan uygulamalarda dosya yolu işlemleri için kullanılabilir.

path modülü, özellikle dosya yollarının oluşturulması, birleştirilmesi, ayrıştırılması, normalleştirilmesi ve çözümlenmesi için kullanılır. Örneğin, path.join() yöntemi, belirtilen yolların birleştirilmesini sağlar:
*/

const router = express.Router();
const { upload } = require("../utils/multer");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../model/userModel");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    console.log(chalk.red(fileUrl));

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:8000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Please activate your account within 5 minutes",
        message: `Hello ${user.name}, \n Please click on the link to activate your account : \n ${activationUrl} `,
      });
      res.status(201).json({
        success: true,
        message: `please check your email address for verificiation - ${user.email}`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }

    // const newUser = await User.create(user);
    // res.status(201).json({
    //   success: true,
    //   newUser,
    // });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const createActivationToken = (user) => {
  return jwt.sign({ user }, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

module.exports = router;
