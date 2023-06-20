# nest-rookie
기존에 작성한 코드에서 graphql 만 추가하려다가 버전 호환성이 하도 안맞아서
새로만든 레포지토리


### Env
- Node v16.20.0


### Install
```sh
npm i

# typeorm cli를 위한 설치
npm i -g ts-node

# .env 파일 작성
cp .env.copy .env

# nest 서버 실행
nest start --watch

# db migration
npm run typeorm migration:run

```



### TypeOrm
```sh
# package install
npm install --save typeorm mysql2 @nestjs/typeorm

# typeorm cli를 위한 설치
npm i -g ts-node

# package.json "typeorm" 항목 추가
# "typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js -d data-source.ts"
```


### TypeOrm Migration CLI 예시
### migrations
```sh
npm run typeorm migration:generate src/migrations/create-users-table
npm run typeorm migration:run
npm run typeorm migration:revert

npm run typeorm migration:generate src/migrations/create-posts-table
npm run typeorm migration:create src/migrations/modify-posts-table
npm run typeorm migration:generate src/migrations/create-comments-table
```

