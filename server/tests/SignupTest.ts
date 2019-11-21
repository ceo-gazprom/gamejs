/**
 * Тест для регистрации
 * нужно завернуть в приложение бутстрап
 * чтобы было легче поднимать приложение в тестах
*/

// Во время теста переменная окружения NODE_ENV устанавливается значение `test`
process.env.NODE_ENV = 'test';

// Подключаем dev-dependencies
import * as mocha from 'mocha';         // Фреймворк который позволяет проводить асинхронное тестирование.
import * as chai from 'chai';           // Позволяет без затруднений тестировать HTTP запросы.
import * as chaiHttp from 'chai-http';  //
import * as request from 'supertest';   //
import app from '../index';             // Инстанс сервера

// Подключаем файлы для работы с БД
import { Connection, getRepository } from 'typeorm';    // ORM
import { User } from '../entity/UserEntity';            // Описание модели данных таблицы `User`

chai.use(chaiHttp);

describe('Sign Up', () => {
    beforeEach((done) => { //Перед каждым тестом чистим базу
        Book.remove({}, (err) => { 
           done();         
        });     
    });


    // Тест 1: Проверка наличия юзера
    describe('/GET book', () => {
        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/book')
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });

});



// Проверка, что сервак воспринимает данные юзера при регистрации одинаково
// как Test == test 










// Регистрация с верными данными
// Регистрация с неверными данными
// Некорректный email
// Некорректный пароль
// Некорректное имя
// Юзер уже существует
