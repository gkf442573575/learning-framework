import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn({
    type: 'char',
    length: 40,
  })
  id: string;

  @Column({
    type: 'char',
    length: 40,
  })
  name: string;

  @Column({
    type: 'char',
    length: 60,
  })
  password: string;

  @Column({
    type: 'char',
    length: 40,
    update: false,
  })
  salt: string;
}
