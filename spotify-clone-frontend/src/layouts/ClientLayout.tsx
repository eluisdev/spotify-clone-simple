import Display from "../components/Display";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";
import { usePlayerContext } from "../hooks/usePlayerContext";

export default function ClientLayout() {
    const { audioRef, track, songsData } = usePlayerContext()
    return (
        <>
            {
                songsData.length !== 0 ? (
                    <>
                        <div className='h-[90%] flex'>
                            <Sidebar />
                            <Display />
                        </div>
                        <Player />
                    </>
                ) : (null)

            }
            <audio ref={audioRef} src={track ? track.file : ""} preload='auto'></audio>
        </>
    )
}
