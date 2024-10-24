import { Route, Routes} from 'react-router-dom'
import ClientLayout from './layouts/ClientLayout'
import AdminLayout from './layouts/AdminLayout'
import AddSong from './admin/pages/AddSong'
import AddAlbum from './admin/pages/AddAlbum'
import ListSong from './admin/pages/ListSong'
import ListAlbum from './admin/pages/ListAlbum'
import DisplayHome from './components/DisplayHome'
import DisplayAlbum from './components/DisplayAlbum'
import { usePlayerContext } from './hooks/usePlayerContext'

function App() {
  const { albumsData, albumId } = usePlayerContext()
  return (
    <div className='h-screen bg-black'>
      <Routes>
        <Route path='/' element={<ClientLayout />} >
          <Route index element={<DisplayHome />} />
          <Route path="album/:id" element={<DisplayAlbum album={albumsData.find(x => x._id === albumId)} />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route path="add-song" element={<AddSong />} />
          <Route path="add-album" element={<AddAlbum />} />
          <Route path="list-song" element={<ListSong />} />
          <Route path="list-album" element={<ListAlbum />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
