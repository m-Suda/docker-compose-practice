import { User } from "../models/User";
import { RequestUser } from "../type/RequestUser";
import { ResultUser } from "../type/ResultUser";
import { UserPresenter } from "../presenter/UserPresenter";
import { ResponseUser } from "../type/ResponseUser";

export class UserService {

    public static async fetch(userId: string): Promise<ResponseUser> {
        try {
            const user: ResultUser = await User.select(userId);
            return UserPresenter.userResponseInitialize(user);
        } catch (e) {
            throw e;
        }
    }

    public static async fetchAll(): Promise<Array<ResponseUser>> {
        try {
            const users: Array<ResultUser> = await User.selectAll();
            return users.map(user => UserPresenter.userResponseInitialize(user));
        } catch (e) {
            throw e;
        }
    }

    public static async insert(user: RequestUser) {
        try {
            return await User.insert(user);
        } catch (e) {
            throw e;
        }
    }

    public static async update(user: RequestUser) {
        try {
            return await User.update(user);
        } catch (e) {
            throw e;
        }
    }

    public static async delete(userId: string) {
        try {
            return await User.delete(userId);
        } catch (e) {
            throw e;
        }
    }
}