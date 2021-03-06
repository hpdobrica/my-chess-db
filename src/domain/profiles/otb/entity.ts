import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne, Index } from "typeorm";
import { Person } from "../../persons/entity";
import { User } from "../../users/entity";

@Entity()
@Index(['username', 'owner'], {unique: true})
export class OtbProfile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  owner: User;

  @OneToOne(type => Person, person => person.otbProfile)
  person: Person;

}
