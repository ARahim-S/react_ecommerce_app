module.exports = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};

/*
Bu kod, Express.js uygulamasında kullanılacak bir middleware işlevi oluşturmak için kullanılır. Middleware işlevi, bir sonraki işlevi çağırmak için kullanılan next parametresine sahiptir.

Bu kod, verilen func parametresiyle bir asenkron işlevi kabul eder. Bu işlev, Express.js'in üç parametreli bir rota işlevi şeklinde beklediği bir rota işlevi olmalıdır: req (istek nesnesi), res (yanıt nesnesi) ve next (sonraki middleware işlevi).

Bu kod, func işlevini bir Promise nesnesine sarar ve bu nesnenin çözülmüş değerini döndürür. Bu, func işlevinin geri dönüş değerini işlevin tamamlanmasını beklemek yerine bir Promise olarak işler.

Döndürülen middleware işlevi, yine Express.js'in üç parametreli bir rota işlevi şeklinde beklediği bir rota işlevidir: req (istek nesnesi), res (yanıt nesnesi) ve next (sonraki middleware işlevi). Bu işlev, func işlevini Promise.resolve ile çözer ve herhangi bir hata durumunda catch bloğu aracılığıyla hatayı yönetir. Bu, herhangi bir hatayı Express.js'in hata yönetimi sistemine iletir ve sonraki middleware işlevinin çağrılmasına izin verir.
 */
