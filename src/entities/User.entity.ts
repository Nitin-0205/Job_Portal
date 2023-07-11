import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobEntity } from "./Job.entity";
import { BaseEntity } from "./Base.entity";
import { Exclude } from "class-transformer";

@Entity("User")
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "userId",unique:true}) 
    userId :string;

    @Column("varchar", { name: "name"})
    name: string;

    @Column("varchar", { name: "email"})
    email: string;

    @Exclude()
    @Column("varchar", { name: "password" })
    password: string;

    @Column("varchar", { name: "phone" })
    phone: string;

    @Column("varchar", { name: "address" })
    address: string;

    @Column("varchar", { name: "role" })
    role: string;

}