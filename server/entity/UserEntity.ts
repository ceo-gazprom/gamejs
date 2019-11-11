import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        width: 64
    })
    username: string;

    @Column({
        type: "varchar",
        width: 32
    })
    password: string;

    @Column({
        type: "varchar",
        width: 64
    })
    email: string;


}