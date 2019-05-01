import * as express from 'express';
import * as bodyParser from 'body-parser';
import { userRouter } from './routes/UserRoute';

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/user', userRouter);
    }
}

export default new App().app;
