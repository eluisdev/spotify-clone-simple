import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { songDataDB } from "../../types"
import { API_URL } from "../../layouts/AdminLayout"

export default function ListSong() {

  const [data, setData] = useState<songDataDB[]>([])

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/song/list`)
      if (response.data.success) {
        setData(response.data.songs)
      }
    } catch (error) {
      toast.error("Error occur")
    }
  }

  const removeSong = async (id: songDataDB['_id']) => {
    try {
      const response = await axios.post(`${API_URL}/api/song/remove`, { id })
      if (response.data.success) {
        toast.success(response.data.messagge)
        await fetchSongs()
      }
      toast.success("Song removed")
    } catch (error) {
      toast.error("Error occur")
    }
  }
  useEffect(() => {
    fetchSongs()
  }, [])

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map(item => {
          return (
            <div key={item._id} className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5">
              <img className="w-12" src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <p className="cursor-pointer" onClick={() => {
                removeSong(item._id) 
              }}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
