import * as express from 'express';
import { UserController } from '../controller/UserController';

class UserRoute {

    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/', async (req: express.Request, res: express.Response) => {
            await UserController.fetchAll(req, res);
        });
        this.router.get('/:userId', async (req: express.Request, res: express.Response) => {
            await UserController.fetch(req, res);
        });
        this.router.post('/', async (req: express.Request, res: express.Response) => {
            await UserController.register(req, res);
        });
        this.router.patch('/:userId', async (req: express.Request, res: express.Response) => {
            await UserController.modify(req, res);
        });
        this.router.delete('/:userId', async (req: express.Request, res: express.Response) => {
            await UserController.delete(req, res);
        });
    }
}

export const userRouter = new UserRoute().router;