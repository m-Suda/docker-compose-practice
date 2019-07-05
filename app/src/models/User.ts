import { Postgres } from "../postgres/postgres";
import { RequestUser } from "../type/RequestUser";

export class User {

    public static async selectAll() {

        const db: Postgres = new Postgres();
        await db.connect();
        const sql = `
          SELECT user_id,
                 user_name,
                 tel,
                 gender,
                 create_date,
                 create_user,
                 update_date,
                 update_user
          FROM mst_user
          ORDER BY create_date
        `;

        try {
            return await db.execute(sql);
        } catch (e) {
            throw new Error(e);
        } finally {
            // Poolを使用するときはend()しない(するとエラーでる)
            // await db.end();
        }
    }

    public static async select(userId: string) {
        const db: Postgres = new Postgres();
        await db.connect();

        const sql = `
          SELECT user_id,
                 user_name,
                 tel,
                 gender,
                 create_date,
                 create_user,
                 update_date,
                 update_user
          FROM mst_user
          WHERE user_id = $1
        `;
        const params = [ userId ];

        try {
            return await db.execute(sql, params);
        } catch (e) {
            throw new Error(e);
        }
    }

    public static async insert(user: RequestUser) {

        // 練習用なのでとりあえずここでチェック
        if (user === null ||
            typeof user.userId === 'undefined' ||
            typeof user.userName === 'undefined' ||
            typeof user.createUser === 'undefined') {
            throw new Error('Oops! Missing required parameters');
        }

        const db: Postgres = new Postgres();
        await db.connect();

        const sql = `
          INSERT INTO mst_user (user_id,
                                user_name,
                                tel,
                                gender,
                                create_user,
                                create_date,
                                update_user,
                                update_date
                                )
          VALUES ($1, $2, $3, $4, $5, to_char(now(), 'YYYYMMDDHH24MISS'), $5, to_char(now(), 'YYYYMMDDHH24MISS'));
        `;
        const params = [
            user.userId,
            user.userName,
            user.tel,
            user.gender,
            user.createUser
        ];

        try {
            await db.execute(sql, params);
        } catch (e) {
            throw new Error(e);
        }
    }

    public static async update(user: RequestUser) {

        // 練習用なのでとりあえずここでチェック
        if (typeof user.userId === "undefined" ||
            typeof user.userName === "undefined" ||
            typeof user.updateUser === "undefined") {
            throw new Error('Oops! Missing required parameters');
        }

        const db: Postgres = new Postgres();
        await db.connect();

        const sql = `
          UPDATE mst_user
          SET user_name   = $1,
              tel         = $2,
              gender      = $3,
              update_user = $4,
              update_date = to_char(now(), 'YYYYMMDDHH24MISS')
          WHERE user_id = $5
        `;
        const params = [
            user.userName,
            user.tel,
            user.gender,
            user.updateUser,
            user.userId
        ];

        try {
            await db.execute(sql, params);
        } catch (e) {
            throw new Error(e);
        }
    }

    public static async delete(userId: string) {
        const db: Postgres = new Postgres();
        await db.connect();

        const sql: string = `
          DELETE
          FROM mst_user
          WHERE user_id = $1
        `;
        const params = [ userId ];

        try {
            await db.execute(sql, params);
        } catch (e) {
            throw new Error(e);
        }
    }
}