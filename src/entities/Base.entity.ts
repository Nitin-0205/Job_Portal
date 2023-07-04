import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Base")
export class BaseEntity {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column("date", { name: "updatedAt" ,nullable:true})
    updatedAt: Date;

    @Column("date", { name: "deletedAt",nullable:true })
    deletedAt: Date

    @Column("varchar", { name: "createdBy",nullable:true })
    createdBy: string;

    @Column("varchar", { name: "updatedBy",nullable:true })
    updatedBy: string;

    @Column("varchar", { name: "deletedBy",nullable:true })
    deletedBy: string;

    @Column("bit", { name: "isDeleted" ,default:0})
    isDeleted: boolean;

}