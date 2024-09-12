import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type Stage = 'Discover' | 'Discern' | 'Develop' | 'Demonstrate';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('json')
  stages: {
    [key in Stage]: {
      completed: boolean;
    };
  };

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
