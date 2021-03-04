import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Person } from "../../persons/entity";

@Entity()
export class LichessProfile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column({ type: 'date', nullable: true })
  sync_date: Date;

  @OneToOne(type => Person)
  person: Person;

}
