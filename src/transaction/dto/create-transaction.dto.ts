import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";

export class CreateTransactionDto {
  @ApiProperty({ example: "Coffee purchase" })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 150 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ example: "expense", enum: ["expense", "income"] })
  @IsString()
  @MinLength(6)
  type: "expense" | "income";

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  category: Category;

  @ApiProperty({ example: 1 })
  user: User;
}
