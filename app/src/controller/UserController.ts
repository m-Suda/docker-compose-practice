import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { RequestUser } from "../type/RequestUser";

export class UserController {

    public static async fetch(req: Request, res: Response) {
        try {
            const user = await UserService.fetch(req.params.userId);
            res
                .status(200)
                .send({
                    user
                });
        } catch (e) {
            console.error(e);
            res
                .status(500)
                .send({
                    message: e.message
                });
        }
    }

    public static async fetchAll(req: Request, res: Response) {
        try {
            const users = await UserService.fetchAll();
            res
                .status(200)
                .send({
                    users
                });
        } catch (e) {
            console.error(e);
            res
                .status(500)
                .send({
                    message: e.message
                });
        }
    }

    public static async register(req: Request, res: Response) {
        const user: RequestUser = req.body;

        try {
            await UserService.insert(user);
            res
                .status(200)
                .send({
                    message: 'Successful registration User!'
                });
        } catch (e) {
            console.error(e);
            res
                .status(500)
                .send({
                    message: e.message
                });
        }
    }

    public static async modify(req: Request, res: Response) {
        const user: RequestUser = req.body;
        user.userId = req.params.userId;

        try {
            await UserService.update(user);
            res
                .status(200)
                .send({
                    message: 'Successful update User!'
                });
        } catch (e) {
            console.error(e);
            res
                .status(500)
                .send({
                    message: e.message
                });
        }
    }

    public static async delete(req: Request, res: Response) {
        try {
            await UserService.delete(req.params.userId);
            res
                .status(200)
                .send({
                    message: 'Successful delete User!'
                });
        } catch (e) {
            console.error(e);
            res
                .status(500)
                .send({
                    message: e.message
                });
        }
    }
}