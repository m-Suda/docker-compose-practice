import { ResultUser } from "../type/ResultUser";
import { ResponseUser } from "../type/ResponseUser";

export class UserPresenter {

    public static userResponseInitialize(user: ResultUser): ResponseUser {
        return {
            userId  : user.user_id,
            userName: user.user_name,
            tel     : user.tel,
            gender  : user.gender
        }
    }
}