# Docker practice

## 概要
API(Express)とDB(Postgres)の開発環境をDockerで構築した練習用アプリケーション

## 前提
- Dockerがインストールされている
- Dockerについては先人たちが説明してくれているので割愛
    - [いまさらDockerに入門したので分かりやすくまとめます](https://qiita.com/gold-kou/items/44860fbda1a34a001fc1)
    - [「Docker」を全く知らない人のために「Docker」の魅力を伝えるための「Docker」入門](https://qiita.com/bremen/items/4604f530fe25786240db)

## API概要
ユーザー情報のCRUD操作のみ。
実践にも取り入れやすいように`ts-node`と`nodemon`を取り入れている。 \
`ts-node`: Typescriptを実行できるようにする。 \
`nodemon`: いちいち`node`で起動しなくてもファイルの変更を検知して自動で再起動させる。 

## 構成
```
.
├── .dockerignore           // コンテナにマウントしないファイルやディレクトリを指定する。
├── README.md               // 概要
├── app                     // APIディレクトリ
│   ├── Dockerfile          // Node.jsコンテナのDockerfile
│   ├── dist                // Typescript→Javascriptへの変換先ディレクトリ
│   ├── nodemon.json        // nodemonの設定ファイル
│   ├── package-lock.json   // 説明省略
│   ├── package.json        // nodeのパッケージ管理ファイル
│   ├── src                 // APIのソースディレクトリ
│   └── tsconfig.json       // Typescriptの設定ファイル
├── docker-compose.yml      // 複数コンテナの管理ファイル
└── postgres                // Postgresディレクトリ
    ├── Dockerfile          // PostgresコンテナのDockerfile
    ├── init_sql            // 初期実行SQL
    └── postgresql.conf     // Postgresの設定ファイル
```

## 使い方
### 1．postgres用のボリュームを作成する。
※1 本来これはいらない作業ですが、Docker for Windowsではこの作業が必要になります。 \
※2 `test-pgdata`は既に`docker-compose.yml`に記述されているpostgresのデータ永続化で使用するvolume名です。
``` bash
$ docker volume create --name test-pgdata
test-pgdata
```

### 2. Dockerコンテナを起動する。
`docker-compose.yml`ファイルのあるディレクトリで`docker-compose up --build`を実行します。 \
`--build`は`docker-compose.yml`ファイルをビルドしてからコンテナを起動します。一度やれば以降は`docker-compose up`だけですぐに起動するようになります。
``` bash
$ docker-compose up --build
Building db
Step 1/3 : FROM postgres:9.6
 ---> 9183c04acbe8
Step 2/3 : RUN localedef -i ja_JP -c -f UTF-8 -A /usr/share/locale/locale.alias ja_JP.UTF-8
 ---> Using cache
 ---> ba0ae0df2c87
Step 3/3 : ENV LANG ja_JP.utf8
 ---> Using cache
 ---> 5d293a68f200
Successfully built 5d293a68f200
Successfully tagged postgres:latest
Building app
Step 1/3 : FROM node:8.10
 ---> 41a1f5b81103
Step 2/3 : WORKDIR /home/app
 ---> Using cache
 ---> 7a50a808a8f2
Step 3/3 : RUN npm install
 ---> Using cache
 ---> 897c579f615d
Successfully built 897c579f615d
Successfully tagged nodeapp:latest
Creating postgres ... done
Creating nodeapp  ... done
Attaching to postgres, nodeapp
:
(初回はpostgresの実行ログが結構流れます...)
:
:
```

### 3. APIコンテナのBashを起動する。
APIコンテナのBashを起動するには`docker exec`コマンドを使用します。 \
別のターミナルを開きコマンドを実行します。
`-it`: 標準入力を受け付け(`-i オプション`)、ターミナルを割り当て(`-t オプション`)ます。
※Macの場合は`/bin/bash`で大丈夫です。Windowsだけ`//bin/bash`と指定する必要があります。
```
$ docker exec -it nodeapp //bin/bash
root@81dad1978a21:/home/app# ls
Dockerfile  dist  node_modules  nodemon.json  package-lock.json  package.json  src  tsconfig.json
```
APIを起動するにはこの状態で、`npm run dev`を実行すると起動します。
```
root@81dad1978a21:/home/app# npm run dev

> docker_parctice@1.0.0 dev /home/app
> nodemon -L

[nodemon] 1.19.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: /home/app/src/**/*
[nodemon] starting `ts-node ./src/server.ts`
Server running on port 3000
```
このコマンドは`package.json`で指定しているので、そこの`script`項目で確認できます。(詳しくは`package.json`で調べてみてください。) \
また、`npm run tsc`をした後に`npm (run) start`でも実行できます。検証環境や本番環境で実行する際はこちらを実行します。 \
APIサーバーを起動したら[Postman](https://www.getpostman.com/)等で試しに`http://localhost:3000/user`にHTTP-GETリクエストをしてみてください。DBからの情報が取れるはずです。
##### scriptでしていること
- `npm run dev`: `nodemon -L`を割り当てている。`nodemon.json`で`ts-node`を実行しているので「Typescriptファイルを実行する。ファイルの変更を検知し、自動でサーバーの再起動を行う」ことをしている。
- `npm run tsc`: `tsc`を割り当てている。`.ts`ファイルをトランスパイルし、`dist`配下に`Javascript`ファイルを出力する。
- `npm (run) start`: `node dist/server.js`を割り当てている。ここでの`run`は省略可能。tsc`で出力された`.js`ファイルを実行する。


### 4. Postgresコンテナでpsqlコマンドを実行する。
Postgresコンテナでpsqlコマンドを使用したい場合も`docker exec`コマンドを使用します。 \
別のターミナルを開きコマンドを実行します。 \
`docker exec -it postgres psql -U postgres`
```
$ docker exec -it postgres psql -U postgres
psql (9.6.12)
"help" でヘルプを表示します.

postgres=# \l
                                         データベース一覧
   名前    |  所有者  | エンコーディング |  照合順序  | Ctype(変換演算子) |      アクセス権
-----------+----------+------------------+------------+-------------------+-----------------------
 postgres  | postgres | UTF8             | ja_JP.utf8 | ja_JP.utf8        |
 template0 | postgres | UTF8             | ja_JP.utf8 | ja_JP.utf8        | =c/postgres          +
           |          |                  |            |                   | postgres=CTc/postgres
 template1 | postgres | UTF8             | ja_JP.utf8 | ja_JP.utf8        | =c/postgres          +
           |          |                  |            |                   | postgres=CTc/postgres
 testdb    | postgres | UTF8             | ja_JP.utf8 | ja_JP.utf8        |
(4 行)

postgres=#
```
ここでpsqlコマンドを実行することができます。終了するには`\q`を実行します。

### 5. Dockerコンテナを停止する。
`Ctrl + c`で停止させることができます。(docker-composeの場合)

## おまけの注意点 ※特にWindowsでDockerを扱うときの注意点
- windowsでDockerを扱う際の注意
    - コンテナ側のパス設定
        - windowsではコンテナ側のパス設定の際に一工夫必要
        - (例 シェル起動) `//bin/bash`
        - (例 volume) `pgdata://var/lib/postgresql/data`
    - Docker for Windowsでのpostgresデータマウント
        - 具体的には、`FATAL:  data directory "/var/lib/postgresql/data" has wrong ownership` のようなエラーが起こる。
        - 解消法としては先にボリュームを作成する。
        - 参考記事：[Docker for Windowsでpostgresのデータマウントができない人へ](https://qiita.com/kyo-bad/items/47b96883144a5bf1cb1e)        

## 参考文献
- [Docker O'REILLY](https://www.amazon.co.jp/Docker-Adrian-Mouat/dp/4873117763/ref=pd_sim_14_12?_encoding=UTF8&pd_rd_i=4873117763&pd_rd_r=ce0a528b-6f15-11e9-b495-35bed79005f1&pd_rd_w=oawHc&pd_rd_wg=7c8QV&pf_rd_p=b88353e4-7ed3-4da1-bc65-341dfa3a88ce&pf_rd_r=R8YV1021K6DEKVWAV8MW&psc=1&refRID=R8YV1021K6DEKVWAV8MW)
- [Docker/Kubernetes 実践コンテナ開発入門](https://www.amazon.co.jp/Docker-Kubernetes-%E5%AE%9F%E8%B7%B5%E3%82%B3%E3%83%B3%E3%83%86%E3%83%8A%E9%96%8B%E7%99%BA%E5%85%A5%E9%96%80-%E5%B1%B1%E7%94%B0-%E6%98%8E%E6%86%B2/dp/4297100339)

## 参考記事
- [いまさらDockerに入門したので分かりやすくまとめます](https://qiita.com/gold-kou/items/44860fbda1a34a001fc1)
- [「Docker」を全く知らない人のために「Docker」の魅力を伝えるための「Docker」入門](https://qiita.com/bremen/items/4604f530fe25786240db)
- [Docker PostgreSQLイメージを利用する](https://qiita.com/kimullaa/items/70eaec61c02d2513e76c#db%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E6%B0%B8%E7%B6%9A%E5%8C%96%E3%81%99%E3%82%8B)