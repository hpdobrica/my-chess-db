import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Person, PersonPlatform } from "../persons/entity";
import { Platform } from "../platforms/entity";


export enum Result {
  white_win ='1-0',
  black_win = '0-1',
  draw = '1/2-1/2'
}


@Entity()
export class Game {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => Person, person => person.gamesAsWhite)
  @JoinColumn()
  whitePlayer: Person

  @ManyToOne(type => Person, person => person.gamesAsBlack)
  @JoinColumn()
  blackPlayer: Person

  @ManyToOne(type => Platform, platform => platform.games)
  @JoinColumn()
  platform: Platform

  @Column({ type: 'date' })
  date: Date;

  @Column()
  result: Result

  @Column()
  pgn: string
}
