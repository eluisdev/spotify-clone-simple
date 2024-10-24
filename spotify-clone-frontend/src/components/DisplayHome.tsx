import { useContext } from "react";
import AlbumItem from "./AlbumItem";
import Navbar from "./Navbar";
import SongItem from "./SongItem";
import { PlayerContext } from "../context/PlayerContext";

export default function DisplayHome() {
    const { songsData, albumsData } = useContext(PlayerContext)
    return (
        <>
            <Navbar />
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Feactures Charts</h1>
                <div className="flex overflow-auto">
                    {albumsData.map((item) => (
                        <AlbumItem key={item._id} {...item} />
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
                <div className="flex overflow-auto">
                    {songsData.map((item) => (
                        <SongItem key={item._id} {...item} />
                    ))}
                </div>
            </div>
        </>
    )
}
