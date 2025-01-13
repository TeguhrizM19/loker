import axios from 'axios';
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../Context/GlobalContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const {state, handleFunction} = useContext(GlobalContext)
  
  const {data, setData, fetcStatus, setFetcStatus} = state
  const {handleEdit, handleDelete} = handleFunction

  useEffect(() => {
    if (fetcStatus) {
      axios.get('https://final-project-api-alpha.vercel.app/api/jobs')
      .then(res => setData(res.data))
      .catch(error => console.error('error fetching data:', error))
    }
    setFetcStatus(false)
  }, [fetcStatus, setFetcStatus]);

  // console.log(data);
  
  
  return (
    <>
      <div className="container mx-auto my-4">
        <div className="max-w-7xl mx-auto px-4">
          <Link to='/create'>
            <button className='flex bg-blue-500 text-white py-2 px-3 rounded-md gap-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Create New Data
            </button>
          </Link>
          <div className="relative overflow-x-auto my-8 border shadow-xl rounded-lg">
            <div className="overflow-y-auto max-h-[750px]"> {/* scroll vertikal */}
              <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3">No</th>
                    <th scope="col" className="px-6 py-3">Judul</th>
                    <th scope="col" className="px-6 py-3">Skils</th>
                    <th scope="col" className="px-6 py-3">Deskripsi Pekerjaan</th>
                    <th scope="col" className="px-6 py-3">Type Pekerjaan</th>
                    <th scope="col" className="px-6 py-3">Masa Pekerjaan</th>
                    <th scope="col" className="px-6 py-3">Nama Perusahaan</th>
                    <th scope="col" className="px-6 py-3">Logo Perusahaan</th>
                    <th scope="col" className="px-6 py-3">Kota Perusahaan</th>
                    <th scope="col" className="px-6 py-3">Max Gaji</th>
                    <th scope="col" className="px-6 py-3">Min Gaji</th>
                    <th scope="col" className="px-6 py-3 sticky right-0 bg-gray-50 dark:bg-gray-700 z-10">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => ( /* Mengambil hanya 5 item */
                    <tr key={item._id} className='border-b-2'>
                      <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-6 py-4">{item.skils}</td>
                      <td className="px-6 py-4">
                        {item.job_description.length > 60 ? `${item.job_description.substring(0, 15)}...` : item.job_description}
                      </td>
                      <td className="px-6 py-4">{item.job_type}</td>
                      <td className="px-6 py-4">{item.job_tenure}</td>
                      <td className="px-6 py-4">{item.company_name}</td>
                      <td className="px-6 py-4">
                        <img src={item.company_image_url} alt="logo" width={60} />
                      </td>
                      <td className="px-6 py-4">{item.company_city}</td>
                      <td className="px-6 py-4">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.salary_min)}
                      </td>
                      <td className="px-6 py-4">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.salary_max)}
                      </td>
                      <td className="px-6 py-10 flex space-x-1 sticky right-0 bg-gray-50 z-10 mt-2">
                        <button onClick={handleEdit} value={item._id} className="text-black bg-yellow-400 py-2 px-2 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                          </svg>
                        </button>
                        <button onClick={handleDelete} value={item._id} className="text-black bg-red-400 py-2 px-2 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard
