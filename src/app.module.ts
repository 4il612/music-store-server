import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track/track.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'

@Module({
    imports:[
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        ConfigModule.forRoot({ envFilePath: '.env' }),
        TrackModule,
        FileModule,
        MongooseModule.forRoot(`mongodb+srv://nikita:${process.env.PASSWORD}@cluster0.4q0msoa.mongodb.net/?retryWrites=true&w=majority`)
    ]
})
export class AppModule {}
