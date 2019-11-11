import * as express from 'express';
import GameService from "../services/UserService";

let router = express.Router();

router.get('/signup', async (req, res) => {
    let game = new GameService();
    let response = await game.getAll();
    res.send(response);
});


export default router;