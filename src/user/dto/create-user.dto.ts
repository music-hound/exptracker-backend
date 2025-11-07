import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "test@mail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "qwerty123" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;
}
