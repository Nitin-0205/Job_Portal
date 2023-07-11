import { DataSource, DataSourceOptions } from "typeorm"

export const dataSourceOption :DataSourceOptions =  {
    type: "postgres",
    host:"localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database:"jobseeker",
    logging: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*.js"],
    migrationsTableName: "JobseekerMigrations",
}

const dataSource = new DataSource(dataSourceOption)
export default dataSource
