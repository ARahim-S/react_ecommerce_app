const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const app = express();

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

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/.env" });
}

app.use(ErrorHandler);
module.exports = app;
