import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello user! The server is up and running.";
  }
  getProfile(): string {
    return "This is users profile!";
  }
}
