/**
 * В данном маршруте содержатся вс endpoint-ы связанные с пользовтелем
 * Основным является getProfile
 */

import * as express from 'express';
import * as passport from 'passport';
import UserService from '../services/UserService';

let router = express.Router();

/**
 * Получить данные о пользователе
 * 
 * @method GET
 */
router.get('/profile', passport.authenticate('local'), (req, res) => {
    res.status(200).send('Данные о пользователе');
});



export default router;