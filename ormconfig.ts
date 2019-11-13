import { ConnectionOptions } from 'typeorm';
 
const config: ConnectionOptions = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  // synchronize: true,
  migrationsRun: true,
  entities: [
      "server/entity/*.ts"
  ],
  subscribers: [
      "server/subscriber/*.ts"
  ],
  migrations: [
      "server/migration/*.ts"
  ],
  cli: {
      "entitiesDir": "server/entity",
      "migrationsDir": "server/migration",
      "subscribersDir": "server/subscriber"
   }
}

export = config;