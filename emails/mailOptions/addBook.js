const keys = require('../../keys')

module.exports = function (email, title) {
   return {
      from: keys.EMAIL_FROM,
      to: email,
      subject: 'Заявка на добавление книги',
      html: `
         <h1>Заявка на добавление книги</h1>
         <p>Ваша заявка по книге "${title}" отправлена на рассмотрение :)</p>
         <p>Чтобы мы добавили вашу книгу на сайт, отправьте в ответном письме ссылку файл или ссылку на него</p>
         <hr/>
         <a href="${keys.BASE_URL}">Открытая библиотека</a>
      `,
   }
}
