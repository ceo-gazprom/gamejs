import { getConnection , getRepository} from "typeorm";
import { User } from "../entity/UserEntity";


export default class UserService {
    private GameRepository;

    constructor () {
        this.GameRepository = getRepository(User);
    }

    /**
     * Метод возвращает список игр на платформе
     * 
     * @param {Integer} limit - количество возвращаемых результатов
     * @return {Object} список игр
     */
    async getAll () {
        let response = await getRepository(User).find().catch(err=>console.log(err));
        return response;
    }

    /**
     * Метод добавляет новую игру на платформу
     * @param {Object} data - данные новой игры
     * @return 
     */
    async add (data) {
            await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {
                    username: data.name,
                    password: data.description,
                    email: data.cover,
                }, 
             ])
            .execute()
            .catch(err=>console.log(err));
    }

    /**
     * Метод возвращает информацию об игре по указанному ID
     * 
     * @param {integer} gameID
     */
    async getGameData (gameID) {
        let response = await getRepository(User)
                            .find({
                                where: { id: gameID },
                                take: 1
                            })
                            .catch(err=>console.log(err));
        return response;
    }
}
