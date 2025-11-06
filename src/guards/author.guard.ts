import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  Request,
} from "@nestjs/common";
import { CategoryService } from "src/category/category.service";
import { TransactionService } from "src/transaction/transaction.service";
import { IUser } from "src/types/types";

interface AuthRequest extends Request {
  user: IUser;
  params: { id: number; type: string };
}

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const { id, type } = request.params;

    let entity: { user?: { id: number } } | null = null;

    switch (type) {
      case "transaction":
        entity = await this.transactionService.findOne(+id);
        break;
      case "category":
        entity = await this.categoryService.findOne(+id);
        break;
      default:
        throw new NotFoundException("Something went really wrong");
    }

    const user = request.user;

    if (
      entity &&
      user &&
      typeof entity === "object" &&
      "user" in entity &&
      entity.user &&
      "id" in entity.user &&
      entity.user.id === user.id
    ) {
      return true;
    }

    throw new BadRequestException("Something went wrong");
  }
}
