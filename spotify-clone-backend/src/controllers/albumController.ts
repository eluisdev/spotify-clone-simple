import { v2 as cloudinary } from 'cloudinary'
import { Request, Response } from 'express'

import Album from '../models/Album'

const addAlbum = async (req: Request, res: Response) => {
    try {
        const { name, desc, bgColour } = req.body
        const imageFile = req.file as any
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })

        const albumData = {
            name,
            desc,
            bgColour,
            image: imageUpload.secure_url
        }

        const album = new Album(albumData)
        await album.save()

        res.json({ success: true, message: "Album added" })
    } catch (error) {
        res.json({ success: false })
        console.log(error)
    }
}

const listAlbum = async (req: Request, res: Response) => {
    try {
        const allAlbums = await Album.find({})
        res.json({ success: true, albums: allAlbums })
    } catch (error) {
        res.json({ success: false })
    }
}

const removeAlbum = async (req: Request, res: Response) => {
    try {
        await Album.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Album removed" })
    } catch (error) {
        res.json({ success: false })
    }
}

export { addAlbum, listAlbum, removeAlbum }