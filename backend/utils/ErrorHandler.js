class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;

/*
--- Expression of the ErrorHandler Class ---
Bu kod JavaScript'de bir sınıf tanımlar ve Error sınıfından kalıtım alır.
Bu sınıfın adı ErrorHandler olarak belirlenmiştir.

Sınıfın constructor() yöntemi iki parametre alır: 
message ve statusCode. message parametresi, hata mesajını içerirken statusCode parametresi HTTP durum kodunu içerir.

super(message) ifadesi, Error sınıfının constructor() yöntemini çağırır ve message parametresini iletilir. 
Bu, ErrorHandler sınıfının, Error sınıfının özelliklerini miras aldığını gösterir.

this.statusCode = statusCode ifadesi, ErrorHandler sınıfının özelliklerine bir statusCode özelliği ekler.

Error.captureStackTrace(this, this.constructor) ifadesi, hatanın yığıt izleme bilgisini yakalar ve hatanın oluştuğu yeri belirlemeye yardımcı olur.

Bu sınıf, özellikle web uygulamaları gibi HTTP istekleri ile ilgili işlemler yaparken, hataları yönetmek için kullanılabilir. 
Bu sınıfın örneği oluşturulduğunda, hata mesajı ve HTTP durum kodu belirtilerek hatanın nasıl yönetileceği belirlenebilir.

Error.captureStackTrace(this, this.constructor) yöntemi, bir hatanın yığıt izleme bilgisini yakalar ve bu bilgiyi hatanın özelliklerine ekler.

Bu yöntem iki parametre alır. İlk parametre, yığın izleme bilgisi hedefi olarak ayarlanacak olan nesnedir. İkinci parametre ise, yığın izleme bilgisi için bir başlatıcı işlevdir.

Bu yöntem, JavaScript'te Error sınıfının özelleştirilmiş alt sınıfları oluşturulurken sıkça kullanılır. Bu alt sınıflar, genellikle özelleştirilmiş hata mesajları veya yığıt izleme bilgisi içeren HTTP isteklerindeki hataları yönetmek için kullanılır.

Örneğin, ErrorHandler sınıfı içinde, Error.captureStackTrace(this, this.constructor) yöntemi, ErrorHandler örneği yaratıldığındaki yığıt izleme bilgisini yakalar ve bu bilgiyi hatanın özelliklerine ekler. Böylece, hata mesajının yanı sıra, hata oluştuğu noktanın yığıt izleme bilgisi de hatayı yakalayan tarafa iletilebilir ve hatanın nerede oluştuğu belirlenerek sorunun çözülmesine yardımcı olabilir.
*/
