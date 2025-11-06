import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
  Query,
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AuthorGuard } from "src/guards/author.guard";
import { Request } from "@nestjs/common";
import { IUser } from "src/types/types";

interface AuthRequest extends Request {
  user: IUser;
}

@Controller("transactions")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req: AuthRequest,
  ) {
    console.log(req.user.id);
    return this.transactionService.create(createTransactionDto, +req.user.id);
  }

  @Get(":type/find")
  @UseGuards(JwtAuthGuard)
  findAllByType(@Req() req: AuthRequest, @Param("type") type: string) {
    return this.transactionService.findAllByType(+req.user.id, type);
  }

  @Get("pagination")
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(
    @Req() req: AuthRequest,
    @Query("page") page: number,
    @Query("limit") limit: number,
  ) {
    return this.transactionService.findAllWithPagination(
      +req.user.id,
      +page,
      +limit,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: AuthRequest) {
    return this.transactionService.findAll(+req.user.id);
  }

  @Get(":type/:id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param("id") id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(":type/:id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(
    @Param("id") id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(":type/:id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param("id") id: string) {
    return this.transactionService.remove(+id);
  }
}
