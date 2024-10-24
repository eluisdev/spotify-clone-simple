import mongoose, { Document, Schema } from "mongoose"

export interface IAlbum extends Document {
   name: String
   desc: String
   bgColour: String
   image: String
}

const albumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    bgColour: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const Album = mongoose.model<IAlbum>('Album', albumSchema)
export default Album