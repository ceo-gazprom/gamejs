import { getConnection , getRepository} from "typeorm";
import { Game } from "../entity/GameEntity";


export default class GameService {
    private GameRepository;

    constructor () {
        this.GameRepository = getRepository(Game);
    }

    /**
     * Метод возвращает список игр на платформе
     * 
     * @param {Integer} limit - количество возвращаемых результатов
     * @return {Object} список игр
     */
    async getAll () {
        let response = await getRepository(Game).find().catch(err=>console.log(err));
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
            .into(Game)
            .values([
                {
                    name: data.name,
                    description: data.description,
                    cover: data.cover,
                    url: data.url
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
        let response = await getRepository(Game)
                            .find({
                                where: { id: gameID },
                                take: 1
                            })
                            .catch(err=>console.log(err));
        return response;
    }
}
