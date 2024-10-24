import { useNavigate } from "react-router-dom"
import { assets } from "../assets/frontend-assets/assets"
import { usePlayerContext } from "../hooks/usePlayerContext"

export default function Sidebar() {

    const navigate = useNavigate()
    const { albumsData } = usePlayerContext()

    return (
        <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
            <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
                <div onClick={() => navigate('/')} className="flex items-center gap-3 pl-8 cursor-pointer">
                    <img className="w-6" src={assets.home_icon} alt={assets.home_icon} />
                    <p className="font-bold">Home</p>
                </div>
                <div className="flex items-center gap-3 pl-8 cursor-pointer">
                    <img className="w-6" src={assets.search_icon} alt={assets.search_icon} />
                    <p className="font-bold">Search</p>
                </div>
            </div>
            <div className="bg-[#121212] h-[85%] rounded">
                {
                    albumsData.map(albumData => (
                        <div className="flex p-2 items-center gap-2">
                            <img src={albumData.image} alt="" className="w-14 h-14 rounded-lg"/>
                            <div>
                                <p>{albumData.name}</p>
                                <p className="text-gray-400">Lista · eluisdev</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
