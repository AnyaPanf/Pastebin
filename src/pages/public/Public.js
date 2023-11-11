import './Public.css'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Pagination } from "../../components/pagination/Pagination"
import { ThemeContext } from '../../App'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPublicRecords } from '../../redux/action'

export const Public = () => {
  const [pasteDetail, setPasteDetail] = useState("")
  const [user, setUser] = useState([])
  const [pasteDelete, setPasteDelete] = useState("")
  const [publicPastes, setPublicPastes] = useState([])
  const theme = useContext(ThemeContext);
  const allPublicRecord = useSelector((state) => state.getAllPublicRecords)
  const pastesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPaste = currentPage * pastesPerPage;
  const indexOfFirstPaste = indexOfLastPaste - pastesPerPage;
  const currentPastes = allPublicRecord.slice(indexOfFirstPaste, indexOfLastPaste)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPublicRecords())
  }, [])

  const handleDetails = (e) => {

    dispatch({
      type: "SET_A_ONE_RECORD", oneRecord: allPublicRecord.find((record) => {
        return record.id === Number(e.target.id)
      })
    })
  }
  console.log(allPublicRecord.find((record) => {
    return record.id === 1
  }))

  console.log(publicPastes);

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
              return <div className="public__lines">
                <NavLink to='/post' className="public__line public__line-title" id={paste.id} onClick={handleDetails}>{paste.title}</NavLink>
                <NavLink to='/post' className="public__line" id={paste.id} onClick={handleDetails}>{paste.price}</NavLink>
                <NavLink to='/post' className="public__line" id={paste.id} onClick={handleDetails}>{paste.category}</NavLink>
              </div>
            })}
          </div>
          <Pagination
            pastes={allPublicRecord}
            pastesPerPage={pastesPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </section>
  )
}
