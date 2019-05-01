import { Pool } from "pg";

/**
 * Postgresクラス
 *   ※Singletonパターンを使用
 */
export class Postgres {

    private static _instance: Postgres;
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
    }

    /**
     * Postgresインスタンスの取得
     */
    public static get instance(): Postgres {

        if (!this._instance) {
            this._instance = new Postgres();
            console.log('Initial instantiation');
        }

        return this._instance;
    }

    /**
     * DB接続
     */
    public async connect(): Promise<void> {
        await this.pool.connect();
    }

    /**
     * DB切断
     */
    public async end(): Promise<void> {
        await this.pool.end();
    }

    /**
     * クエリ実行
     * @param query
     * @param params
     */
    public async execute(query: string, params: any[] = []): Promise<any> {
        return (await this.pool.query(query, params)).rows;
    }

    /**
     * Transaction Begin
     */
    public async begin(): Promise<void> {
        await this.pool.query('BEGIN');
    }

    /**
     * Transaction Commit
     */
    public async commit(): Promise<void> {
        await this.pool.query('COMMIT');
    }

    /**
     * Transaction Rollback
     */
    public async rollback(): Promise<void> {
        await this.pool.query('ROLLBACK');
    }
}