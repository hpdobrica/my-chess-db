
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, PrimaryColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Game } from "../games/entity";
import { ChessComProfile } from "../profiles/chessCom/entity";
import { LichessProfile } from "../profiles/lichess/entity";
import { OtbProfile } from "../profiles/otb/entity";
import { User } from "../users/entity";

@Entity()
export class Person {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(type => User)
  user: User;

  @OneToOne(type => ChessComProfile)
  @JoinColumn()
  chessComProfile: ChessComProfile;

  @OneToOne(type => LichessProfile)
  @JoinColumn()
  lichessProfile: LichessProfile;

  @OneToOne(type => OtbProfile)
  @JoinColumn()
  otbProfile: OtbProfile;

  @OneToMany(type => Game, (game) => game.whitePlayer)
  gamesAsWhite: Game[]

  @OneToMany(type => Game, (game) => game.blackPlayer)
  gamesAsBlack: Game[]

}
