import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "../../../../src"

@Entity({
    name: "user",
    // versioning: true,
})
export class UserWithoutVersioning extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    //  @Column({ default: "a" })
    //  name2: string
}
