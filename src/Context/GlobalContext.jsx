import axios from "axios";
import { createContext, useState } from "react";
import SweetAlertSuccess from '../components/SweetAlertSuccess';
import SweetAlertConfirmDelete from '../components/SweetAlertConfirmDelete';
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext()

export const GlobalProvider = (props) => {
  const navigate = useNavigate() // saat tombol submit ditekan halaman langsung pindah ke halaman tabel

  const [data, setData] = useState([]) // utk fetching data
  const [input, setinput] = useState({
    title : '',
    skils : '',
    job_description: '',
    job_type : '',
    job_tenure : '',
    company_name : '',
    company_image_url : '',
    company_city : '',
    salary_min : '',
    salary_max : ''
  })
  const [fetcStatus, setFetcStatus] = useState(true)
  const [currentId, setCurrentId] = useState(-1)  

  const handleInput = (event) => {
    const {name, value} = event.target
    setinput({...input, [name]: value})
  }

  // submit data (Create & Edit)
  const handleSubmit = (event) => {
    event.preventDefault()

    if (currentId === -1) {
      axios.post('https://final-project-api-alpha.vercel.app/api/jobs', input)
      .then(() => {
        setFetcStatus(true)
        SweetAlertSuccess({ title: 'Success!', text: 'Data Berhasil Disimpan' })
        navigate('/dashboard-back-end')
      })
      .catch((error) => console.error('Error submitting data:', error));
    } else {
      axios.put(`https://final-project-api-alpha.vercel.app/api/jobs/${currentId}`, input)
      .then(() => {
        setFetcStatus(true)
        SweetAlertSuccess({ title: 'Success!', text: 'Data Berhasil Diupdate' })
        navigate('/dashboard-back-end')
      })
      .catch((error) => console.error('Error updating data:', error));
    }

    setCurrentId(-1)

    setinput({ // mengosongkan inputan setelah submit ditekan
      title : '',
      skils : '',
      job_description: '',
      job_type : '',
      job_tenure : '',
      company_name : '',
      company_image_url : '',
      company_city : '',
      salary_min : '',
      salary_max : ''
    })
  }

  const handleEdit = (event) => {
    const idData = event.currentTarget.value
    setCurrentId(idData)
    navigate(`/edit/${idData}`)
  }

  const handleDelete = (event) => {
    const idData = event.currentTarget.value // jika ada svg di button gunakan 'currentTarget'
    SweetAlertConfirmDelete({
      onConfirm: () => {
        axios.delete(`https://final-project-api-alpha.vercel.app/api/jobs/${idData}`)
        .then(() => setFetcStatus(true))
        .catch((error) => console.error('Error delete data:', error));
      }
    })
  }

  const state = {
    data, setData,
    input, setinput,
    fetcStatus, setFetcStatus,
    currentId, setCurrentId
  }

  const handleFunction = {
    handleInput,
    handleSubmit,
    handleEdit,
    handleDelete,
  }

  return(
    <GlobalContext.Provider value={
      {
        state, handleFunction
      }
    }>
      {props.children}
    </GlobalContext.Provider>
  )
}
