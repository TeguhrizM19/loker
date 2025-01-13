import axios from "axios";
import { useState, useEffect } from "react"
import { MdLocationOn } from "react-icons/md";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { formatDistanceToNow, parseISO } from "date-fns"; // ceatedAt
import { id } from "date-fns/locale"; // ceatedAt
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaLaptop } from "react-icons/fa";
import { BiSolidTime } from "react-icons/bi";

export default function ListJobs() {
  const [data, setData] = useState([])
  // utk detail jika di klik modal-nya muncul
  const [open, setOpen] = useState(false); // deafult modal tertutup
  // diberi {} agar terhindar dari error
  const [dataJob, setDataJob] = useState({}); // untuk menyimpan detail job yang dipilih

  useEffect(() => {
    axios.get('https://final-project-api-alpha.vercel.app/api/jobs')
    .then(res => setData(res.data))
    .catch(error => console.error('error fetching data:', error))
  }, []);
  // console.log(data);
  
  // merubah nominal menjadi Jt & Rb
  function Jt(number) {
    if (number >= 100000 && number < 1000000) {
      return `${number / 1000}Rb`
    } else if (number >= 1000000) {
      return `${number / 1000000}Jt`
    }
    return number
  }

  // mengubah created_at menjadi waktu relatif
  function formatWaktu(tgl) {
    if (!tgl) return 'Unknown date'; // Return default text if tgl is undefined
    try {
      const date = parseISO(tgl);
      return formatDistanceToNow(date, { addSuffix: true, locale: id });
    } catch (error) {
      console.error('Error parsing date:', error);
      return 'Invalid date'; // Return fallback text on error
    }
  }

  // menampilkan modal jika tombol detai di klik
  const modalDetail = (lowongan) => {
    setDataJob(lowongan); // simpan data pekerjaan yg dipilih
    setOpen(true); // modal terbuka
  };

  return(
    <>
      {/* Body */}
      <div className="container mx-auto flex-wrap flex gap-10 items-start justify-center my-10">
        {data !== null &&
          data.map((res, index) => (
            // Card
            <div key={index} className="w-80 h-auto flex flex-col bg-white shadow-lg border rounded">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg">{res.title}</span>
                  <span className="text-sm text-blue-500">
                    Rp {Jt(res.salary_min)}-{Jt(res.salary_max)}
                  </span>
                </div>
                <p className="flex flex-wrap gap-2 mt-3">
                  {(res.job_qualification?.split(", ") || []).map((item, index) => (
                    <span key={index} className="bg-gray-200 text-sm px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                </p>
                <div className="flex items-center gap-4 mt-1">
                  <img src={res.company_image_url} alt={res.title} className="mt-3 w-12 h-12 object-contain shadow-lg" />
                  <div className="flex flex-col">
                    <span className="flex items-center gap-2 text-sm">
                      <PiBuildingOfficeBold color="blue" />
                      {res.company_name}
                    </span>
                    <span className="flex items-center gap-2 text-sm">
                      <MdLocationOn color="red" />
                      {res.company_city}
                    </span>
                  </div>
                </div>
                <div className="border-b my-4"></div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <button onClick={() => modalDetail(res)} className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded-lg">
                    Detail...
                  </button>
                  <span>{formatWaktu(res.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Modal Detail */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              {/* awal isi modal */}
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="flex items-start gap-4">
                      <img src={dataJob.company_image_url || "Gambar"} alt={dataJob.title || "Judul"} className="w-16 h-16" />
                      <div className="flex flex-col">
                        <DialogTitle as="h3" className="text-xl font-semibold text-gray-900">
                          {dataJob.title}
                        </DialogTitle>
                        <span className="flex items-center gap-2">
                          <MdLocationOn color="red" />
                          {dataJob.company_city || "Alamat"}
                        </span>
                      </div>
                    </div>
                    <p className="flex items-center gap-2 text-xl mt-3">
                      <PiBuildingOfficeBold color="blue" />
                      {dataJob.company_name}
                    </p>
                    <div className="mx-auto border-2 my-3"></div>
                    <p className="flex items-center gap-2">
                      <RiMoneyDollarCircleFill size={20} color="grey" />
                      Rp {Jt(dataJob.salary_min)} - {Jt(dataJob.salary_max)}/Bulan
                    </p>
                    <p className="flex items-center gap-2 my-2">
                      <FaLaptop size={20} color="grey" />
                      {dataJob.job_type}
                    </p>
                    <p className="flex items-center gap-2 my-2">
                      <BiSolidTime size={20} color="grey" />
                      {dataJob.job_tenure}
                    </p>
                    <div className="mt-3">
                      <strong className="text-sm text-black">Skils:</strong>
                      <p className="flex flex-wrap gap-2 mt-3">
                        {(dataJob.job_qualification?.split(", ") || []).map((item, index) => (
                          <span key={index} className="bg-gray-200 text-sm px-2 py-1 rounded">
                            {item}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="mt-3">
                      <strong className="text-sm text-black">Deskripsi Pekerjaan:</strong>
                      <p className="text-sm text-gray-700">{dataJob.job_description || "Deskripsi"}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* akhir isi modal */}
              {/* awal tombol */}
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" onClick={() => setOpen(false)} className="inline-flex w-full justify-center rounded-md bg-blue-600 hover:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">
                  Lamar Pekerjaan
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
              {/* akhir tombol */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}