# Express in Docker

## 注意点
- Docker for WindowsではPostgresのデータマウントがうまくいかない
    - 具体的には、`FATAL:  data directory "/var/lib/postgresql/data" has wrong ownership` のようなエラーが起こる。
    - 解消法としては先にボリュームを作成する。
    - `docker volume create --name <例えばtest-pgdata>`
        - ymlファイル