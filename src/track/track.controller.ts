import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ObjectId } from "mongoose";
import { CreateCommentDto } from "./dto/createComment.dto";
import { CreateTrackDto } from "./dto/createTrack.dto";
import { TrackService } from "./track.service";

@Controller('tracks')
export class TrackController{
    constructor(
        private trackService: TrackService
    ){}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'preview', maxCount: 1},
        {name: 'audio', maxCount: 1}
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto){
        const {preview, audio} = files
        return this.trackService.create(dto, preview[0], audio[0])
    }

    @Get()
    getAll(){
        return this.trackService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId){
        return this.trackService.getOne(id)
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId){
        return this.trackService.delete(id)
    }

    @Post('/comment')
    addComment(@Body() dto: CreateCommentDto){
        return this.trackService.addComment(dto)
    }

    @Post('/listen/:id')
    listen(@Param('id') id: ObjectId){
        return this.trackService.listen(id)
    }
}