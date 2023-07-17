import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk'
@Injectable()
export class AppService {
  constructor(
    private readonly conFigService: ConfigService,
  ) {}

}