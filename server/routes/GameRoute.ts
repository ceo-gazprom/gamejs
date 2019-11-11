import * as express from 'express';
import GameService from "../services/GameService";

let router = express.Router();

router.get('/all', async (req, res) => {
    let game = new GameService();
    let response = await game.getAll();
    res.send(response);
});

router.get('/add', (req, res) => {
    let game = new GameService();
    let data = {
        name: 'NeedForJs',
        description: 'Описание достойное внимания, сделанное на несколько строче для проверки вмещаемости контейнера на фронте. Если грамотно настроены переносы, то текст буду переноситься, а излишки скрываться. Вот как то так. А вобще хочу молока, нелюблю кофе без молока но нет  никого кто  мог бы купить молоко на работу. Жаль что все так получается. Вы знаете эти итальянские кофе машины, умные и пиздатые.',
        url: 'dfdfdf',
        cover: 'dfdf'
    }

    let response = game.add(data);
    res.send(response);
});

router.get('/data/:id', async (req, res) => {
    let game = new GameService();
    let gameID = req.params.id
    let response = await game.getGameData(gameID);
    res.send(response);
});

export default router;