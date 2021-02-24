import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Person, PersonPlatform } from "../persons/entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(type => PersonPlatform, personPlatform => personPlatform.otbOwner)
  otbPersons: PersonPlatform[]
}
