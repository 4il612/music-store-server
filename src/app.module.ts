import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track/track.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports:[
        ConfigModule.forRoot({ envFilePath: '.env' }),
        TrackModule,
        MongooseModule.forRoot(`mongodb+srv://nikita:${process.env.PASSWORD}@cluster0.4q0msoa.mongodb.net/?retryWrites=true&w=majority`)
    ]
})
export class AppModule {}
