import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets";
import { useState } from "react";

export default function Navbar() {
    const navigate = useNavigate()
    const [buttonSelected, setButtonSelected] = useState("All")
    return (
        <>
            <div className="w-full flex justify-between items-center font-semibold">
                <div className="flex items-center gap-2">
                    <img onClick={() => navigate(-1)} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_left} alt="" />
                    <img onClick={() => navigate(1)} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_right} alt="" />
                </div>
                <div className="flex items-center gap-4">
                    <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block">Explore Premium</p>
                    <Link to={"https://www.spotify.com/mx/download"} target="_blank" className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">Install app</Link>
                    <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center">G</p>
                </div>

            </div>
            <div className="flex items-center gap-2 mt-4">
                <p className={`${buttonSelected === 'All' ? "bg-white text-black" : "bg-black text-white"} px-4 py-1 rounded-2xl cursor-pointer`} onClick={() => setButtonSelected("All")}>All</p>
                <p className={`${buttonSelected === 'Music' ? "bg-white text-black" : "bg-black text-white"} px-4 py-1 rounded-2xl cursor-pointer`} onClick={() => setButtonSelected("Music")}>Music</p>
                <p className={`${buttonSelected === 'Podcast' ? "bg-white text-black" : "bg-black text-white"} px-4 py-1 rounded-2xl cursor-pointer`} onClick={() => setButtonSelected("Podcast")}>Podcast</p>
            </div>
        </>
    )
}
