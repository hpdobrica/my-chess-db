import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, PrimaryColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Game } from "../games/entity";
import { Platform } from "../platforms/entity";
import { User } from "../users/entity";

@Entity()
export class Person {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @ManyToMany(type => Platform, platform => platform.persons)
  @JoinTable({
    name: 'person_platform',
    joinColumn: {
      name: 'personId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'platformId',
      referencedColumnName: 'id',
    },
  })
  platforms: Platform[];

  @OneToMany(type => Game, (game) => game.whitePlayer)
  gamesAsWhite: Game[]

  @OneToMany(type => Game, (game) => game.blackPlayer)
  gamesAsBlack: Game[]

}

@Entity('person_platform')
export class PersonPlatform {

  @Column()
  @PrimaryColumn()
  personId: string;

  @Column()
  @PrimaryColumn()
  platformId: string;

  @ManyToOne(type => User, user => user.otbPersons)
  otbOwner: User

  @Column({
    nullable: true
  })
  username: string;
}