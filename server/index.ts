import 'reflect-metadata';                                  // Поддержка декораторов для TypeORM
import * as express from 'express';                         // Фрэймворк для Node.js
import * as session from 'express-session';                 // Библиотека для работы с сессиями
import * as cookieParser from 'cookie-parser';              // Работа с куки

import * as connectPgSimple from 'connect-pg-simple';



import * as passport from 'passport';
import strategy from './auth/LocalStrategy';

import { createConnection } from "typeorm";                 // Подключение к БД с помощью TypeORM

import * as helmet from 'helmet';                           // Настраивает заголовки и защищает от уязвимостей
import * as morgan from 'morgan';                           // Логгер http запросов
import router from './routes';                              // Список роутов
import * as path from 'path';


const app = express();


// Соединение с БД
// настройки находятся в файле "ormconfig.json"
createConnection().then(async connection => {

    // Синхронизируем модели данных и БД
    // Согласно описанным моделям данных, создаются таблицы в БД
    await connection.synchronize();

    // Настройка сессий
    app.use(session({
      store: new (connectPgSimple(session))(),
      secret: '#0123',
      resave: false,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
    }));

    // Middlewares, которые должны быть определены до passport:
    app.use(cookieParser());

    // Парсинг данных отправленных из форм
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Необходимо для работы passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Локальная стратегия (собственная авторизация на сайте)
    passport.use(strategy);

    passport.serializeUser(function(user, done) {
      return done(null, user);
    })
    
    passport.deserializeUser(function(user, done) {
      return done(null, user);
    })

    // Настройка заголовков от уязвимостей
    app.use(helmet());

    // Логгер для вывода запросов к серверу в консоль
    app.use(morgan('tiny'));

    // Открывает доступ к папкам на сервере
    app.use(express.static('public'));          // Статические файлы (картинки и прч.)
    app.use(express.static('dist'));            // Бандл с js кодом фронта и файл со стилями
    
    // Подключаем маршрутизацию 
    app.use("/api", router)

    // Если нет указзаного маршрута, отдаем фронт
    app.get('*', function(req, res) {
        res.set('Content-Type', 'text/html')
        res.sendFile(path.join(__dirname + '/../dist/index.html'));
    });

    // Запускаем сервер и слушаем 3000 gjhn
    app.listen(3000, function () {
        console.log('Server listening on port 3000! =]');
    });

}).catch(error => console.log("Error: ", error));

// Для тестирования
export default app;