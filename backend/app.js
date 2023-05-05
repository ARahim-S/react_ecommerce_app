const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(express.json());

/*
Bu middleware işlevi, Express.js uygulamasının istek ve yanıt nesnelerini temsil eden req ve res parametrelerini alır. Bu işlev, req nesnesinin Content-Type özelliğini kontrol eder ve application/json medya türü belirtilmişse, istek gövdesindeki JSON verilerini ayrıştırır ve req.body özelliğine ekler.

Bu işlev, istek gövdesindeki verilerin ayrıştırılması sırasında herhangi bir hata oluşursa, HTTP isteğinin işlenmesini durdurur ve hata durumunu Express.js'in hata yönetimi sistemi aracılığıyla işler. Bu nedenle, uygulamanızda JSON verilerini kullanacaksanız, bu middleware işlevini uygulamanın başında kullanmanız önemlidir.
*/

app.use(cookieParser());

/*
Express.js uygulamasında bir middleware işlevidir. Bu middleware işlevi, gelen HTTP isteklerindeki çerezleri (cookie) okumak ve işlemek için kullanılır.

Bu middleware işlevi, Express.js uygulamasının istek ve yanıt nesnelerini temsil eden req ve res parametrelerini alır. Bu işlev, gelen isteğin başlıklarını (headers) tarar ve istekteki tüm çerezleri çözümler. Çerezler, req.cookies özelliği altında bir obje olarak saklanır ve istekin işlenmesi sırasında erişilebilir hale gelir.

Bu middleware işlevi, istek sırasında req.cookies özelliğine çerezleri ekler, bu nedenle uygulamanızda çerezleri kullanmak istiyorsanız, bu middleware işlevini uygulamanın başında kullanmanız önemlidir. Ayrıca, bu middleware işlevi, güvenliğiniz için oturum açma ve yetkilendirme gibi durumlar için çerezleri kullanırken önemlidir, böylece uygulamanızdaki herhangi bir kullanıcının kimliği doğrulanabilir ve kimlik bilgileri depolanabilir.
*/

app.use("/", express.static(path.join(__dirname, "./uploads")));

/*
Bu kod bloğu, Express.js uygulamasında bir middleware fonksiyonu tanımlar. app.use() fonksiyonu, herhangi bir HTTP isteği geldiğinde işlemlerin yapılacağı bir fonksiyonu uygulamaya ekler.

Bu örnekte, app.use("/", express.static("uploads")); kod satırı, kök dizindeki tüm HTTP isteklerinin, uploads klasöründeki statik dosyaları (görseller, CSS dosyaları vb.) sunmak için kullanılan bir middleware fonksiyonunu çalıştırmasını sağlar.

express.static() yöntemi, belirtilen dizindeki dosyaların bir HTTP sunucusu tarafından sunulabilmesi için bir yöntem oluşturur. Bu örnekte, uploads klasöründeki dosyaların statik dosyalar olarak sunulabilmesi için express.static() yöntemi kullanılır.

Bir istemci, http://localhost:3000/image.png gibi bir adresi ziyaret ettiğinde, Express.js sunucusu, uploads klasöründe image.png dosyası varsa, bu dosyayı istemciye gönderir. Bu özellikle, kullanıcıların yüklediği resimleri veya dosyaları görüntülemek için kullanılır.
*/

app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

/*

 bir Express.js uygulamasındaki bir middleware fonksiyonudur. Bu middleware fonksiyonu, gelen HTTP isteklerindeki URL kodlaması (encoding) şeklinde gönderilen verilerin ayrıştırılmasını sağlar.

Bu fonksiyon, gelen isteklerin gövde (body) verilerinin URL kodlamasında olması durumunda çalışır. Örneğin, bir HTML formundan gönderilen veriler, varsayılan olarak URL kodlaması şeklinde gönderilir. Bu verileri okumak ve kullanmak için, Express.js uygulamasındaki istek işleyicilerine önce bodyParser.urlencoded() middleware fonksiyonunu eklemek gerekiyor.

Bu middleware fonksiyonu, gelen verileri ayrıştırmak ve anahtar-değer çiftleri olarak req.body nesnesine depolamak için Node.js'in querystring modülünü kullanır. req.body nesnesi, Express.js uygulamasındaki istek işleyicileri tarafından kullanılabilir ve bu şekilde gelen veriler işlenebilir.

*/

// app.use(fileUpload({ useTempFiles: true })); bunun yerine multer kullanacağım

/*
Express.js uygulamasındaki bir middleware fonksiyonudur. Bu middleware, HTTP isteklerindeki dosya yüklemelerini kolaylaştırmak için kullanılır.

Bu middleware, fileupload adlı Node.js modülü kullanılarak oluşturulur. useTempFiles opsiyonu, bu middleware için bir seçenektir. Bu opsiyon, yüklenen dosyaların geçici bir dizine kaydedilip kaydedilmeyeceğini belirler. Varsayılan olarak useTempFiles opsiyonu false olarak ayarlanır ve yüklenen dosyalar hafızada tutulur. useTempFiles opsiyonu true olarak ayarlanırsa, yüklenen dosyalar geçici bir dizine kaydedilir ve req.files nesnesinde belirtilir.

req.files nesnesi, yüklenen dosyaların bilgilerini içeren bir JavaScript nesnesidir. Bu nesne, dosyaların isimleri, boyutları, MIME türleri gibi bilgileri içerir. Bu nesneye, fileUpload() middleware fonksiyonunu kullanan Express.js uygulamasındaki istek işleyicileri tarafından erişilebilir.
*/

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/.env" });
}

//import routes
const user = require("./controller/user");

//API

app.use("/api/v1/user", user);

app.use(ErrorHandler);
module.exports = app;
