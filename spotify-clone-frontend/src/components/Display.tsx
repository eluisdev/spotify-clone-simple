import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef} from "react";
import { usePlayerContext } from "../hooks/usePlayerContext";


export default function Display() {

    const { albumsData, setAlbumId } = usePlayerContext()
    const displayRef = useRef<HTMLDivElement>(document.createElement("div"))
    const location = useLocation()
    const isAlbum = location.pathname.includes("album")
    const albumId = isAlbum ? location.pathname.split("/").pop() : "";
    const bgColor = isAlbum && albumsData.length > 0 ? albumsData.find(x => x._id === albumId)?.bgColor ?? "#121212"  : "#121212"

    // const albumId = isAlbum ? location.pathname.slice(-1) : "";
    // const bgColor = albumsData[+albumId].bgColor

    useEffect(() => {
        if (isAlbum) {
            displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`
        } else {
            displayRef.current.style.background = `#121212`
        }
        setAlbumId(albumId)
    }, [albumId])

    return (
        <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
            {
                albumsData.length > 0 ? (
                    <Outlet/>
                ) : (
                    null
                )
            }
        </div>
    )
}
