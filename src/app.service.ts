import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly conFigService: ConfigService,
  ) {}
  getHello(): string {
    console.log(this.conFigService.get("H"));
    return 'Hello World!';
  }
}
