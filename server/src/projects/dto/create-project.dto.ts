import {
  IsString,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class StageDto {
  completed: boolean;
}

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @ValidateNested()
  @Type(() => StageDto)
  stages: {
    Discover: StageDto;
    Discern: StageDto;
    Develop: StageDto;
    Demonstrate: StageDto;
  };
}
