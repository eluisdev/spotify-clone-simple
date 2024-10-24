import { createContext, RefObject, ReactNode, MouseEvent, useRef, useState, Dispatch, SetStateAction, useEffect } from "react";
// import { songsData } from "../assets/frontend-assets/assets";
import { albumDB, songDataDB, typeTime } from "../types";
import axios from "axios";

type ContextProps = {
    audioRef: RefObject<HTMLAudioElement>
    seekBg: RefObject<HTMLDivElement>
    seekBar: RefObject<HTMLHRElement>
    track: songDataDB
    setTrack: Dispatch<SetStateAction<songDataDB>>
    playStatus: boolean
    setPlayStatus: Dispatch<SetStateAction<boolean>>
    time: typeTime
    setTime: Dispatch<SetStateAction<typeTime>>
    play: () => void
    pause: () => void
    playWithId: (id: songDataDB["_id"]) => Promise<void>
    previous: () => Promise<void>
    next: () => Promise<void>
    seekSong: (e: MouseEvent) => Promise<void>
    songsData: songDataDB[]
    albumsData: albumDB[]
    albumId: string | undefined
    setAlbumId: Dispatch<SetStateAction<string | undefined>>
}

type ContextProvider = {
    children: ReactNode
}

export const PlayerContext = createContext<ContextProps>({} as ContextProps)

const API_URL = "http://localhost:4000"

const PlayerContextProvider = ({ children }: ContextProvider) => {

    const audioRef = useRef<HTMLAudioElement>(document.createElement("audio"))
    const seekBg = useRef<HTMLDivElement>(document.createElement("div"))
    const seekBar = useRef<HTMLHRElement>(document.createElement("hr"))


    const [songsData, setSongsData] = useState<songDataDB[]>([]);
    const [albumsData, setAlbumsData] = useState<albumDB[]>([])

    const [track, setTrack] = useState<songDataDB>(songsData[0])
    const [playStatus, setPlayStatus] = useState(false)

    const [albumId, setAlbumId] = useState<string | undefined>("")

    const [time, setTime] = useState<typeTime>({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = () => {
        audioRef.current.play()
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause()
        setPlayStatus(false)
    }

    const playWithId = async (id: songDataDB['_id']) => {
        await songsData.map(item => {
            if (id === item._id) {
                setTrack(item)
            }
        })

        await audioRef.current.play()
        setPlayStatus(true)
        
        // await setTrack(songsData[id])
        // await audioRef.current.play()
        // setPlayStatus(true)
    }

    const previous = async () => {
        
        songsData.map(async (item,index) => {
            if (track._id === item._id && index > 0) {
                await setTrack(songsData[index-1])
                await audioRef.current.play()
                setPlayStatus(true)
            }
        })
        // if (track.id > 0) {
        //     await setTrack(songsData[track.id - 1])
        //     await audioRef.current.play()
        //     setPlayStatus(true)
        // }
    }

    const next = async () => {
        songsData.map(async (item,index) => {
            if (track._id === item._id && index < songsData.length) {
                await setTrack(songsData[index+1])
                await audioRef.current.play()
                setPlayStatus(true)
            }
        })
        // if (track.id < songsData.length - 1) {
        //     await setTrack(songsData[track.id + 1])
        //     await audioRef.current.play()
        //     setPlayStatus(true)
        // }
    }

    const seekSong = async (e: MouseEvent) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const getSongsData = async () => {
        const response = await axios.get(`${API_URL}/api/song/list`)
        setSongsData(response.data.songs)
        setTrack(response.data.songs[0])
    }

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/album/list`)
            setAlbumsData(response.data.albums)
        } catch (error) {

        }
    }

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%"
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }, 1000)
    }, [audioRef])


    useEffect(()=>{
        getSongsData()
        getAlbumsData()
    },[])

    return (
        <PlayerContext.Provider value={{
            audioRef,
            seekBg,
            seekBar,
            track, 
            setTrack,
            playStatus, setPlayStatus,
            time, setTime,
            play,
            pause,
            playWithId,
            previous,
            next,
            seekSong,
            songsData,
            albumsData,
            albumId,
            setAlbumId
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider