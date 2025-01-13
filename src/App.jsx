import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./Context/GlobalContext";
import Navbar from "./components/navbar";
import DashboardFE from "./FrondEnd/Dashboard";
import ListJobs from "./FrondEnd/ListJobs";
import DashboardBE from "./BackEnd/Dashboard";
import CreateEdit from "./BackEnd/CreateEdit";
// import Footer from "./components/footer";

export default function App() {
  return(
    <>
      <BrowserRouter>
        <GlobalProvider>

          <Navbar />

          <Routes>
            <Route path="/" element={<DashboardFE />} />
            <Route path="/cari-loker" element={<ListJobs />} />
            <Route path="/dashboard-back-end" element={<DashboardBE />} />
            <Route path="/create" element={<CreateEdit />} />
            <Route path="/edit/:idData" element={<CreateEdit />} />
          </Routes>
          
          {/* <Footer /> */}

        </GlobalProvider>
      </BrowserRouter>
    </>
  )
}