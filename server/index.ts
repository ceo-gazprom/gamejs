import "reflect-metadata";                      // Поддержка декораторов для TypeORM
import * as express from "express";             // Фрэймворк для Node.js
import session from "express-session";          // Библиотека для работы с сессиями
import { createConnection } from "typeorm";     // Подключение к БД с помощью TypeORM
import passport from "passport";                // Библиотека для решистрации/авторизации
import * as helmet from "helmet";               // Настраивает заголовки и защищает от уязвимостей
import * as morgan from "morgan";               // Логгер http запросов
import router from "./routes";                  // Список роутов
import * as path from "path";


const app = express();

// Соединение с БД
// настройки находятся в файле "ormconfig.json"
createConnection().then(async connection => {

    // Синхронизируем модели данных и БД
    // Согласно описанным данным, создаются таблицы в БД
    await connection.synchronize();

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