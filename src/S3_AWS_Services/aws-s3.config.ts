import { Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk'
@Injectable()
export class AwsS3Service {
    constructor() { }

    AWS_S3_BUCKET_NAME: 'jobportfoliobucket';
    s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY

    })
    async uploadFile(file: any) {
        console.log(file)
        const { originalname, buffer } = file;

        return await this.s3_upload(
            buffer,
            originalname,
            this.AWS_S3_BUCKET_NAME,
            file.mimetype
        )

    }
    async s3_upload(file: any, name: string, bucket_name: string, mimetype: string) {
        const params = {
            Bucket: bucket_name,
            Key: name,
            Body: file,
            ACL: 'public-read',
            ContentType: mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: 'ap-south-1',
            },
        }
        try {
            let s3Response = await this.s3.upload(params).promise();
            return s3Response;
        } catch (e) {
            console.log(e);
        }
    }
}