import { ToastContainer } from "react-toastify";
import Sidebar from "../admin/components/Sidebar";
import Navbar from "../admin/components/Navbar";
import { Outlet } from "react-router-dom";

export const API_URL = "http//localhost:4000"

export default function AdminLayout() {
  return (
    <div className="flex items-start min-h-screen">
        <ToastContainer />
        <Sidebar />
        <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
            <Navbar />
            <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
              <Outlet />
            </div>
        </div>
    </div>
  )
}
