import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Person } from "../../persons/entity";

@Entity()
export class ChessComProfile {
  @PrimaryColumn()
  username: string;

  @Column({ type: 'date', nullable: true })
  sync_date: Date;

  @OneToOne(type => Person, person => person.chessComProfile)
  person: Person;

}
