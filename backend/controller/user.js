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

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const newUser = await User.create(user);
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = router;
