import { v2 as cloudinary } from 'cloudinary'
import Song from '../models/Song'
import { Request, Response } from 'express'

const addSong = async (req: Request, res: Response) => {
    try {
        console.log(req.files, "REQ FILES")
        const { name, desc, album } = req.body
        const audioFile = (req.files as any).audio[0]
        const imageFile = (req.files as any).image[0]
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" })
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        const song = new Song(songData)
        await song.save()

        res.json({ success: true, message: "Song Added" })

    } catch (error) {
        res.json({ success: false, message: "Hubo un error en la subida de archivos" })
        console.log(error)
        throw new Error('Hay un problema con la subida de archivos')
    }
}

const listSong = async (req: Request, res: Response) => {
    try {
        const allSongs = await Song.find({})
        res.json({ success: true, songs: allSongs })
    } catch (error) {
        res.json({ success: false, message: "Hubo un error al obtener las canciones" })
        throw new Error('Hay un problema')
    }
}

const removeSong = async (req: Request, res: Response) => {
    try {
        await Song.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Song removed" })
    } catch (error) {
        res.json({ success: false, message: "Hay un problemas" })
    }
}

export { addSong, listSong, removeSong }