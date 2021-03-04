import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Person } from "../persons/entity";
import { OtbProfile } from "../profiles/otb/entity";

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

  @OneToMany(type => OtbProfile, otbProfile => otbProfile.owner)
  otbProfiles: OtbProfile[]

  @OneToOne(type => Person)
  @JoinColumn()
  person: Person

}
