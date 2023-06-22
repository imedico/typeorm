import { Column, Entity, PrimaryGeneratedColumn } from "../../../../src"

@Entity({ versioning: true })
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}
