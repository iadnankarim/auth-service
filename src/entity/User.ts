import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {

    // unique hoga
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string

    @Column()
    lastName: string;
    @Column()
    email: string;

    @Column()
    password: string;

}
