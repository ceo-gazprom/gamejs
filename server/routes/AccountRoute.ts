/**
 * 
 */
import * as express from 'express';                             //
import * as passport from 'passport';                           //
import { check, validationResult } from 'express-validator';    // Валидация входящих данных
import AccountService from '../services/AccountService';        //


let router = express.Router();

/**
 * Авторизация пользователя
 * 
 * @method POST
 * @param {string} username (required) - Имя пользователя
 * @param {string} password (required) - Пароль пользователя
 */
router.post('/auth', passport.authenticate('local'), (req, res) => {
    res.send('Попытка авторизации');
});

/**
 * Регистрация нового пользователя
 * [+] - добавить подтверждение по email
 * [+] - добавить поле не подтвержденный аккаунт
 * 
 * @method POST
 * @param {string} username (required)  - Имя пользователя (длинна 4 - 30 символов)
 * @param {string} password (required)  - Пароль пользователя (длинна от 6 - 32 символов)
 * @param {string} email (required)     - Email пользователя (длинна от 6 - 40 символов)
 * @return {json}                       - Статус ok или ошибки в отправленных данных
 */ 
router.post ('/signup', [
        check ('username')
            .isLength({ min: 4, max: 30 })
            .trim()
            .escape(),
        check('password').isLength({ min: 6, max: 32 }),
        check('email')
            .isEmail()
            .isLength({ min: 6, max: 40 })
            .normalizeEmail()
    ],
    async (req, res) => {
        let account = new AccountService();

        // Если были обнаружены ошибки, возвращается json обьект с ошибками
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
    
        else {
            // Если данные верны, создаем нового юзера в БД
            let response = await account.create (req.body.username, req.body.password, req.body.email);

            // Проверяем наличие ошибок при сохранении
            if (response.status == 'Success') {
                return res.status(200).send();
            }
            else {
                return res.status(422).send(response);
            }
        }
    }

);


/**
 * Проверяет, занят ли `username`
 * 
 * @method POST
 * @param {string} username (required) - Имя пользователя
 */
router.post ('/usernameexist', async (req, res) => {
    // Если пришел пустой запрос
    if (req.body.username == undefined) return res.status(400).send('Bad Request');

    let account = new AccountService();
    let response = await account.checkUsernameExist(req.body.username);
    console.log(req.body.username);
    console.log(response);

    // Отправляем результат клиенту
    let answer = {
        result: null
    }
    answer.result = (response) ?  true : false;

    return res.status(200).json(answer).send();
});


/**
 * Проверяет, занят ли `email`
 * 
 * @method POST
 * @param {string} email (required) - Email пользователя
 */
router.post ('/emailexist', (req, res) => {
    // Если пришел пустой запрос
    if (req.body.email == undefined) return res.status(400).send('Bad Request');

    let account = new AccountService();
    let response = account.checkEmailExist(req.body.email);

    // Отправляем результат клиенту
    let answer = {
        result: null
    }
    answer.result = (response) ?  true : false;

    return res.status(200).json(answer).send();
});

export default router