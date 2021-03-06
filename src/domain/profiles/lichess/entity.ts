import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Person } from "../../persons/entity";

@Entity()
export class LichessProfile {
  @PrimaryColumn()
  username: string;

  @Column({ type: 'date', nullable: true })
  sync_date: Date;

  @OneToOne(type => Person, person => person.lichessProfile)
  person: Person;

}
