import { Postgres } from "../postgres/postgres";
import { IUser } from "../interface/IUser";

export class User {

    public static async selectAll() {

        const db: Postgres = Postgres.instance;
        await db.connect();
        const sql = `
          SELECT user_id,
                 user_name,
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
        const db: Postgres = Postgres.instance;
        await db.connect();

        const sql = `
          SELECT user_id,
                 user_name,
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
        } finally {
            // Poolを使用するときはend()しない(するとエラーでる)
            // await db.end();
        }
    }

    public static async insert(user: IUser) {

        // 練習用なのでとりあえずここでチェック
        if (user === null ||
            typeof user.userId === 'undefined' ||
            typeof user.userName === 'undefined' ||
            typeof user.createUser === 'undefined') {
            throw new Error('Oops! Missing required parameters');
        }

        const db: Postgres = Postgres.instance;
        await db.connect();

        const sql = `
          INSERT INTO mst_user (user_id,
                                user_name,
                                create_date,
                                create_user,
                                update_date,
                                update_user)
          VALUES ($1, $2, to_char(now(), 'YYYYMMDDHH24MISS'), $3, to_char(now(), 'YYYYMMDDHH24MISS'), $4);
        `;
        const params = [
            user.userId,
            user.userName,
            user.createUser,
            user.createUser,
        ];

        try {
            await db.execute(sql, params);
        } catch (e) {
            throw new Error(e);
        } finally {
            // Poolを使用するときはend()しない(するとエラーでる)
            // await db.end();
        }
    }

    public static async update(user: IUser) {

        // 練習用なのでとりあえずここでチェック
        if (typeof user.userId === "undefined" ||
            typeof user.userName === "undefined" ||
            typeof user.updateUser === "undefined") {
            throw new Error('Oops! Missing required parameters');
        }

        const db: Postgres = Postgres.instance;
        await db.connect();

        const sql = `
          UPDATE mst_user
          SET user_name   = $1,
              update_user = $2,
              update_date = to_char(now(), 'YYYYMMDDHH24MISS')
          WHERE user_id = $3
        `;
        const params = [ user.userName, user.updateUser, user.userId ];

        try {
            await db.execute(sql, params);
        } catch (e) {
            throw new Error(e);
        } finally {
            // Poolを使用するときはend()しない(するとエラーでる)
            // await db.end();
        }
    }

    public static async delete(userId: string) {
        const db: Postgres = Postgres.instance;
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
        } finally {
            // Poolを使用するときはend()しない(するとエラーでる)
            // await db.end();
        }
    }
}