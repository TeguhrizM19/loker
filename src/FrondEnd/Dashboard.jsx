import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between bg-slate-50 p-4">
        <div className="flex flex-col text-wrap text-center mx-auto lg:text-left">
          <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-900 mb-1">Dapatkan Pekerjaan</span>
          <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-900">Impianmu Disini</span>
          <p className="mt-3 text-base md:text-lg max-w-xl mx-auto lg:mx-0 font-semibold text-gray-400">
            Loker.id is the worldwide leader on insights about jobs and companies. Search millions of jobs and get the inside scoop on companies with employee reviews, personalized salary tools, and more. Hiring? Post a job for free.
          </p>
          <div className="flex mx-auto lg:mx-0">
            <Link to="/cari-loker">
              <button className="flex items-center gap-2 text-white text-base md:text-lg font-semibold mt-5 bg-primary py-3 px-4 rounded-md">
                <FaSearch /> Cari Loker
              </button>
            </Link>
          </div>
        </div>
        <img src="./1.jpg" alt="gambar" className="w-full lg:w-1/2 rounded-lg mt-5 lg:mt-0" />
      </div>

      <div className="flex flex-col items-center justify-between bg-slate-50 p-10 mt-10 min-h-screen">
        <div className="flex flex-col lg:flex-row items-center">
          {/* <!-- Kolom gambar pertama --> */}
          <div className="flex flex-col gap-4 lg:gap-6">
            <img src="./2.jpg" width={300} className="rounded-md" />
          </div>
          
          {/* <!-- Kolom gambar kedua --> */}
          <div className="flex flex-col gap-4 lg:gap-6 lg:ml-6"> 
            <img src="./3.jpg" width={300} className="rounded-md" />
          </div>
          
          {/* <!-- Kolom teks --> */}
          <div className="flex flex-col text-center lg:text-left mt-4 lg:mt-0 lg:ml-12">
            <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-1">Temukan Pekerjaan</span>
            <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black">Sesuai Passionmu</span>
            <p className="mt-3 text-base md:text-lg max-w-xl font-semibold text-gray-400">
              Find a job that suits your interest and talents. A high salary is not the top priority. Most importantly, You can work according to your hearts desire and have a work-life balance.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
