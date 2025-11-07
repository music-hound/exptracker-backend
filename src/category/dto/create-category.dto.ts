import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateCategoryDto {
  @ApiProperty({ example: "Food" })
  @IsNotEmpty()
  title: string;
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  user?: User;
}
