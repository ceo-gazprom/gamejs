import * as express from "express";
import gameRoute from './GameRoute';
import userRoute from './UserRoute';

const router = express.Router();

router.use('/game', gameRoute);
router.use('/user', userRoute);

export default router;