import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { Request } from "@nestjs/common";
import { IUser } from "src/types/types";

interface AuthRequest extends Request {
  user: IUser;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(LocalAuthGuard)
  login(@Req() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: AuthRequest) {
    return req.user;
  }
}
