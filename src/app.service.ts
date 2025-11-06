import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello fucker!";
  }
  getProfile(): string {
    return "This is fuckers profile!";
  }
}
