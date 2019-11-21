// // Стратегия для библиотеки PASSPORT
// import { compare as compareHash } from 'bcrypt';
// import { Strategy } from 'passport-local';
// import { Repository } from 'typeorm';
// import { User } from '../entity/UserEntity';


// // Стратегия авторизации
// export const createLocalStrategy = async (userRepository: Repository<User>) =>
//   new Strategy({ session: false, usernameField: 'username', passwordField: 'password' }, async (req, done) => {

//     // Проверка существует ли юзер с таким username?
//     try {
//       // Поиск по таблице
//       const user = await userRepository.findOne({ username: req.body.username });

//       console.log(user);

//       // Если такой юзер найден, проверяем совпадают ли пароли
//       if (await compareHash(req.body.password, user.password)) {
//         console.log('[passport] - юзер найден, пароли совпали');
//         done(null, { ...user, hashedPassword: undefined });
//       }
//       // Если не совпали
//       else {
//         console.log('[passport] - пароли не совпали');
//         done(null, false);
//       }
//     }
//     // Если такой пользователь не зарегистрирован
//     catch (err) {
//       done(err);
//     }
//   });

import * as passport from 'passport';
import { Strategy as LocalStrategy} from 'passport-local';
import AccountService from '../services/AccountService';
import { getRepository } from "typeorm";
import { User } from "../entity/UserEntity";

let strategy = new LocalStrategy(
  // Принимает парамметры отправленные в запросе POST
  async function (username:string, password:string, done){
    let account = new AccountService;

      // Получаем хэш пароля
      let hashPassword = await account.getHashPassword(password)
      console.log(username);
      console.log(password);
      console.log(hashPassword)

      // Выполняется запрос к БД и ищет юзера с таким `username`
      await getRepository(User).findOne({username: username, password: hashPassword}).then(
          (user) => {
          
          // Такой юзер зарегистрирован
          if (user !== undefined) {
              console.log(user)
              console.log('++++++++++\nТы авторизован!\n++++++++++\n');
          }
          // Такой юзер не найден
          else {
              console.log(user)
              console.log('++++++++++\n Шахай нахуй\n++++++++++\n');
          }
          return done(null, username);

      });
  }
);

export default strategy;