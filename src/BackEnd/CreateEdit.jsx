import axios from 'axios';
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../Context/GlobalContext';
import { Link, useParams } from 'react-router-dom';

function CreateEdit() {
  let {idData} = useParams()

  const {state, handleFunction} = useContext(GlobalContext)

  const {input, setinput, setFetcStatus} = state
  const {handleInput, handleSubmit} = handleFunction

  useEffect(() => {
    // Kosongkan input sebelum memuat data baru (agar data lama tidak tertinggal)
    setinput({
      title: '',
      skils: '',
      job_description: '',
      job_type: '',
      job_tenure: '',
      company_name: '',
      company_image_url: '',
      company_city: '',
      salary_min: '',
      salary_max: ''
    });

    if (idData !== undefined) {
      axios.get(`https://final-project-api-alpha.vercel.app/api/jobs/${idData}`)
      .then((res) => {
        let data = res.data

        setinput({
          title : data.title,
          skils : data.skils,
          job_description: data.job_description,
          job_type : data.job_type,
          job_tenure : data.job_tenure,
          company_name : data.company_name,
          company_image_url : data.company_image_url,
          company_city : data.company_city,
          salary_min : data.salary_min,
          salary_max : data.salary_max
        })
      })
      .catch((error) => console.error('Error editing data:', error));
      setFetcStatus(false)
    }
  }, []);
  
  return (
    <>
      <div className="container mx-auto my-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="mb-5 flex gap-4">
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Judul</label>
              <input onChange={handleInput} value={input.title} name='title' 
              className="bg-gray-50 border-2 border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none" 
              placeholder="Masukkan Judul" required />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Skils</label>
              <input onChange={handleInput} value={input.skils} name='skils' 
              className="bg-gray-50 border-2 border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none" 
              placeholder="Contoh: html, css, php, Laravel" required />
            </div>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">Deskripsi Pekerjaan</label>
            <input onChange={handleInput} value={input.job_description} name='job_description' 
            className="bg-gray-50 border-2 border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none" 
            placeholder="Masukkan Deskripsi Pekerjaan" required />
          </div>
          <div className="mb-5 flex gap-4">
            <div className="w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-900">Type Pekerjaan</label>
            <input onChange={handleInput} value={input.job_type} name='job_type' 
            className="bg-gray-50 border-2 border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none" 
            placeholder="Masukkan Type Pekerjaan" required />
          </div>
          <div className="w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-900">Masa Pekerjaan</label>
            <input onChange={handleInput} value={input.job_tenure} name='job_tenure' 
            className="bg-gray-50 border-2 border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none" 
            placeholder="Masukkan Masa Pekerjaan" required />
            </div>
          </div>
          <div className="mb-5 flex gap-4">
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Nama Perusahaan</label>
              <input onChange={handleInput} value={input.company_name} name='company_name' 
              className="bg-gray-50 border-2 border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none" 
              placeholder="Masukkan Perusahaan" required />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Kota Perusahaan</label>
              <input onChange={handleInput} value={input.company_city} name='company_city' 
              className="bg-gray-50 border-2 border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none" 
              placeholder="Masukkan Kota Perusahaan" required />
            </div>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">Logo Perusahaan</label>
            <input onChange={handleInput} value={input.company_image_url} name='company_image_url' 
            className="bg-gray-50 border-2 border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none" 
            placeholder="Masukkan Link Logo Perusahaan" required />
          </div>
          {/* 1 baris 2 kolom */}
          <div className="mb-5 flex gap-4">
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Min Gaji</label>
              <input onChange={handleInput} value={input.salary_min} name='salary_min' 
              className="bg-gray-50 border-2 border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none" 
              placeholder="Masukkan Min Gaji" required />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Max Gaji</label>
              <input onChange={handleInput} value={input.salary_max} name='salary_max' 
              className="bg-gray-50 border-2 border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none" 
              placeholder="Masukkan Max Gaji" required />
            </div>
          </div>

          <div className='flex gap-2'>
            <Link to='/dashboard-back-end'><button type="submit" 
            className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              Kembali
            </button></Link>
            <button type="submit" 
            className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateEdit
