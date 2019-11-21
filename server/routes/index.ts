import * as express from "express";
import gameRoute from './GameRoute';
import userRoute from './UserRoute';
import accountRoute from './AccountRoute';

const router = express.Router();

router.use('/game', gameRoute);
router.use('/user', userRoute);
router.use('/account', accountRoute);

export default router;