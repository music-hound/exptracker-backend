import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Request,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { IUser } from "src/types/types";
import { AuthorGuard } from "src/guards/author.guard";

interface AuthRequest extends Request {
  user: IUser;
}

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req: AuthRequest,
  ) {
    return this.categoryService.create(createCategoryDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findAll(@Req() req: AuthRequest) {
    return this.categoryService.findAll(+req.user.id);
  }

  @Get(":type/:id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(":type/:id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(":type/:id")
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param("id") id: string) {
    return this.categoryService.remove(+id);
  }
}
