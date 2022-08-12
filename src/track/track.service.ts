import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, Schema } from "mongoose";
import { FileService, FileType } from "src/file/file.service";
import { CreateCommentDto } from "./dto/createComment.dto";
import { CreateTrackDto } from "./dto/createTrack.dto";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { Track, TrackDocument } from "./schemas/track.schema";


@Injectable()
export class TrackService{
    constructor(
        @InjectModel(Track.name) 
        private trackModel: Model<TrackDocument>,

        @InjectModel(Comment.name) 
        private commentModel: Model<CommentDocument>,
        private fileService: FileService
    ){}

    async create(dto: CreateTrackDto, preview, audio): Promise<Track>{
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const previewPath = this.fileService.createFile(FileType.IMAGE, preview)
        const track = await this.trackModel.create({...dto, listenCount: 0, preview: previewPath, audio: audioPath})
        return track
    }

    async getAll(limit = 10, offset = 0): Promise<Track[]>{
        const tracks = await this.trackModel.find().skip(offset).limit(limit)
        return tracks
    }

    async search(query: string): Promise<Track[]>{
        let tracks = await this.trackModel.find({
            $or: [
                {title: new RegExp(query, 'i')},
                {author: new RegExp(query, 'i')}
            ]
            
        })
        
        return tracks
    }

    async getOne(id: ObjectId): Promise<Track>{
        const track = await (await this.trackModel.findById(id)).populate('comments')
        return track
    }

    async delete(id: ObjectId): Promise<ObjectId>{
        const track = await this.trackModel.findByIdAndDelete(id)
        return track._id
    }

    async addComment(dto: CreateCommentDto): Promise<Comment>{
        const track = await this.trackModel.findById(dto.trackId)
        const comment = await this.commentModel.create({...dto})
        track.comments.push(comment._id)
        await track.save()
        return comment
    }

    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id)
        track.listenCount += 1
        track.save()
        return track.listenCount
    }
}