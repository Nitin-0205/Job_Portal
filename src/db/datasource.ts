import { DataSource, DataSourceOptions } from "typeorm"
import * as dotenv from "dotenv"

export const dataSourceOption :DataSourceOptions =  {
    type: "postgres",
    host:dotenv.config().parsed.HOST,
    port: Number(dotenv.config().parsed.PORT),
    username: dotenv.config().parsed.USERNAME,
    password: dotenv.config().parsed.PASSWORD,
    database: dotenv.config().parsed.DATABASE,
    // logging: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*.js"],
    migrationsTableName: "JobseekerMigrations",

}
const dataSource = new DataSource(dataSourceOption)
export default dataSource

