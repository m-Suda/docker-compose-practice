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

        // CORS対策
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With ,Content-Type ,Authorization");
            res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
            next();
        });

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/user', userRouter);
    }
}

export default new App().app;
