import './Public.css'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { PasteModal } from "../../components/pasteModal/PasteModal"
import { Pagination } from "../../components/pagination/Pagination"
import { ThemeContext } from '../../App'

export const Public = () => {
  const [pasteDetail, setPasteDetail] = useState("")
  const [user, setUser] = useState([])
  const [pasteDelete, setPasteDelete] = useState("")
  const [publicPastes, setPublicPastes] = useState([])
  const theme = useContext(ThemeContext);

  const handleDelete = async (e) => {
    const { data } = await axios.delete(
      // `...${e.target.id}`
      "https://fakestoreapi.com/products/6"
    )
    setPasteDelete(data)
  }

  // useEffect(() => {
  //   const getPastes = async () => {
  //     let {data} = await axios('https://1387-212-42-120-155.ngrok-free.app/api/Poste', {
  //       method: 'GET',
  //         headers: {
  //           "ngrok-skip-browser-warning": "69420",
  //           }        
  //     }
  //     )
  //     console.log(data);
  //   }
  //   getPastes()
  // }, [])

  useEffect(() => {
    const getPublicPastes = async () => {
      let { data } = await axios(`https://fakestoreapi.com/products`)
      setPublicPastes(data)
    }
    getPublicPastes()
  }, [])

  console.log(publicPastes);

  const pastesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPaste = currentPage * pastesPerPage;
  const indexOfFirstPaste = indexOfLastPaste - pastesPerPage;
  const currentPastes = publicPastes.slice(indexOfFirstPaste, indexOfLastPaste)

  const handleDetails = (e) => {
    setPasteDetail(e.target.id)
    console.log(e.target.id)
  }

  return (
    <section className="public">
      <div className="container">
        <div className="public__titlegroup">
          <h2 className="public__title">{user.username}'s Pastebin</h2>
          <div className="public__color"></div>
        </div>
        <div className="public__wrapper">
          <div className="public__table">
            <div className="public__head">
              <p>Paste Title</p>
              <p>Deadline</p>
              <p>Privacy</p>
              <p>Delete Paste</p>
            </div>
            {currentPastes.map((paste) => {
              return <div className="public__lines" onClick={handleDetails}>
                <p className="public__line public__line-title" id={paste.id}>{paste.title}</p>
                <p className="public__line" id={paste.id}>{paste.price}</p>
                <p className="public__line" id={paste.id}>{paste.category}</p>
                <p className="public__line public__line-btn" id={paste.id} onCLick={handleDelete}>DELETE</p>
              </div>
            })}
          </div>
          <div>{pasteDetail ? <PasteModal pasteDetail={pasteDetail}
            setPasteDetail={setPasteDetail} /> : ""}</div>
          <Pagination pastes={publicPastes}
            pastesPerPage={pastesPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </section>
  )
}
