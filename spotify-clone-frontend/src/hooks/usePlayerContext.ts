import { useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"

export const usePlayerContext = () => {
    const playerContext = useContext(PlayerContext)

    if (!playerContext) {
        throw new Error('Error with the context, please verify')
    } else {
        return playerContext
    }
    
}