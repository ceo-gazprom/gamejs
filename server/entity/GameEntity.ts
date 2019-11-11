import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Game {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        width: 128
    })
    name: string;

    @Column({
        type: "varchar",
        width: 32
    })
    url: 255;

    @Column({
        type: "varchar",
        width: 32
    })
    cover: string;

    @Column({
        type: "text"
    })
    description: string;

}