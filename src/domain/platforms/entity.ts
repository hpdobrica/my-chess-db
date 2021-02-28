import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, OneToMany } from "typeorm";
import { Game } from "../games/entity";
import { Person } from "../persons/entity";
import { User } from "../users/entity";

@Entity()
export class Platform {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToMany(type => Person, person => person.platforms)
  persons: Person;

  @OneToMany(type => Game, (game) => game.platform)
  games: Game[]

}
