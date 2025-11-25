import { Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {

    // unique hoga
    @PrimaryGeneratedColumn()
    id: number;

}
