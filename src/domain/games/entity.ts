import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Person } from "../persons/entity";


export enum Result {
  WHITE_WIN ='1-0',
  BLACK_WIN = '0-1',
  DRAW = '1/2-1/2'
}

export enum Platform {
  LICHESS ='LICHESS',
  CHESS_COM = 'CHESS_COM',
  OTB = 'OTB'
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

  @Column()
  platform: Platform

  @Column({ type: 'date' })
  date: Date;

  @Column()
  result: Result

  @Column()
  pgn: string
}
