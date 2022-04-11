// основные модули =====================================================================================================================================================================================================
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const keys = require("./keys");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require('connect-mongodb-session')(session)
const varMiddleware = require("./middlewares/variables");
const csurf = require('csurf')
const flash = require('connect-flash')

// создание сервера =====================================================================================================================================================================================================
const app = express();

// Handlebars, устраение ошибок =====================================================================================================================================================================================================
// устранение ошибки взаимодествия mongoose и Handlebars
const Handlebars = require("handlebars");
const {
   allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

// настройка парсера URL-encoded (решает проблему пустого req.body при post запрсах)
app.use(express.urlencoded({ extended: true })); // когда "extended: true" парсинг URL-encoded data проходит с помощью библиотеки qs (вместо querystring)

// создание и настройка оъекта handlebars
const hbs = exphbs.create({
   defaultLayout: "main",
   extname: "hbs",
   handlebars: allowInsecurePrototypeAccess(Handlebars), //для устранения ошибки при взаимодействии Handlebars и mongoos
});

// внедрение handlebars в app
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

// статические папки
app.use("/books", express.static(path.join(__dirname, "books")));
app.use(express.static(path.join(__dirname, "public"))); //задаёт 'public' как статическую папку для обращения через "/"


// Session =====================================================================================================================================================================================================
// создание и настройка конфигурации хранилища сессий
const store = new MongoStore({
   collection: 'sessions',
   uri: keys.MONGODB_URI
})

// настройка конфигурации сессии
app.use(
   session({
      secret: "Str12-01Rt",
      resave: false,
      saveUninitialized: false,
      store
   })
);

app.use(csurf())
// Middlewares =====================================================================================================================================================================================================
app.use(varMiddleware);
app.use(flash())

// routes=====================================================================================================================================================================================================
// регистрация роутов
const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const privateRoutes = require('./routes/private')

// подключение обработчиков GET-запросов
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/private", privateRoutes);

// Запуск сервера =====================================================================================================================================================================================================
// определение порта
const PORT = process.env.PORT || 3000;

// запуск сервера
async function start() {
   try {
      await mongoose.connect(
         keys.MONGODB_URI,
         {
            useNewUrlParser: true,
         }
      );
      // запуск сервера
      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
      });
   } catch (e) {
      console.log(e);
   }
}

start();
