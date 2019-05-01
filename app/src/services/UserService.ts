import { User } from "../models/User";
import { IUser } from "../interface/IUser";

export class UserService {

    public static async fetch(userId: string) {
        try {
            return await User.select(userId);
        } catch (e) {
            throw e;
        }
    }

    public static async fetchAll() {
        try {
            return await User.selectAll();
        } catch (e) {
            throw e;
        }
    }

    public static async insert(user: IUser) {
        try {
            return await User.insert(user);
        } catch (e) {
            throw e;
        }
    }

    public static async update(user: IUser) {
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