import * as bcrypt from 'bcrypt';
import { getRepository } from "typeorm";
import { User } from "../entity/UserEntity";

// Интерфейс ответа сервера
interface IAnswer {
    status: 'Success' | 'Fail',     // Результат выполнения
    reason: string                  // Описание ошибки
}

export default class AccountService {
    private UserRepository;

    // Получаем доступ к нужному хранилищу данных
    constructor () {
        this.UserRepository = getRepository(User);
    }

    /**
     * Метод добавляет нового пользователя в БД
     * 
     * @param {string} username - Имя пользователя
     * @param {string} password - Пароль пользователя
     * @param {string} email    - Email пользователя
     * @return {IAnswer}        - Результат выполнения или причина ошибки
     */
    async create (username: string, password: string, email: string) {
        // Переводим имя и email в нижний регистр
        // Все данные юзера в БД, хранятся в нижнем регистре
        username = username.toLowerCase();
        email = email.toLowerCase();

        console.log('____________\n'+username+'\n'+password+'\n'+email)

        // Массив отправляемый в ответ клиенту, после выполнения функции
        let answer: IAnswer = {
            status: null,
            reason: null
        }

        // Проверяем не занято ли имя
        if (await this.checkUsernameExist(username)){
            answer.status = 'Fail'
            answer.reason = 'This username is already taken';
            return answer;
        }

        // Проверяем занят ли email
        if (await this.checkEmailExist(email)){
            answer.status = 'Fail'
            answer.reason = 'This email is already taken';
            return answer;
        }

        let hashPassword = await this.getHashPassword(password);

        // Записываем полученные данные в переменную
        let user = new User();
        user.username = username;
        user.password = hashPassword;
        user.email = email;

        // Сохраняем нового пользователя в БД
        this.UserRepository.save(user)
            .then(user => console.log("User has been created: ", user))
            .catch(error => console.log("Cannot create. Error: ", error));
        
        answer.status = 'Success';
        return answer;
    }

    /**
     * Метод проверяет существует ли юзер в БД с таким `Username`
     * 
     * @param {string} username - Имя пользователя
     * @return {boolean}
     */
    async checkUsernameExist (username:string) {
        // Переводим имя в нижний регистр для поиска по таблице
        username = username.toLowerCase();

        let response = await getRepository(User)
            .findAndCount({username: username})
            .catch(console.error);
        
        return !! response[1];
    }

    /**
     * Метод проверяет существует ли юзер в БД с таким `Email`
     * 
     * @param {string} email - Имя пользователя
     * @return {boolean}
     */
    async checkEmailExist (email:string) {
        // Переводим email в нижний регистр для поиска по таблице
        email = email.toLowerCase();

        let response = await getRepository(User)
            .findAndCount({email: email})
            .catch(console.error);
        
        return !! response[1];
    }

    /**
     * Возвращает хэш пароля с солью
     * 
     * @param {string} password - Пароль пользователя
     * @return {string} - Хэш пароля с солью
     */
    async getHashPassword (password:string) {
        // Генерация соли
        let salt = await bcrypt.genSalt(10);

        // Получаем хэш пароля с солью
        let hashPassword = await bcrypt.hashSync(password, 10);

        return hashPassword;
    }
}