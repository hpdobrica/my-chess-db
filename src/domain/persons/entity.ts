
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

  @OneToOne(type => User, (user) => user.person)
  user: User;

  @OneToOne(type => ChessComProfile, chessCom => chessCom.username)
  @JoinColumn()
  chessComProfile: ChessComProfile;

  @OneToOne(type => LichessProfile, lichess => lichess.username)
  @JoinColumn()
  lichessProfile: LichessProfile;

  @OneToOne(type => OtbProfile, otbProfile => otbProfile.id)
  @JoinColumn()
  otbProfile: OtbProfile;

  @OneToMany(type => Game, (game) => game.whitePlayer)
  gamesAsWhite: Game[]

  @OneToMany(type => Game, (game) => game.blackPlayer)
  gamesAsBlack: Game[]

}
