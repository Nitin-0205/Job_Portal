import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.config';

@Module({
    providers: [AwsS3Service],
    exports: [AwsS3Service]
})
export class AwsModule {};