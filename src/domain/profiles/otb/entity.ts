import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Person } from "../../persons/entity";
import { User } from "../../users/entity";

@Entity()
export class OtbProfile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @ManyToOne(type => User)
  @JoinColumn()
  owner: User;

  @OneToOne(type => Person)
  person: Person;

}
