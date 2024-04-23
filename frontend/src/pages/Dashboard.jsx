//outlet to render childre pages
import { Outlet } from "react-router-dom";
import { createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

//component imports
import Navbar from "../components/NavbarComponent";
//context
export const DashboardContext = createContext();

//loader function to obtain logged user
export const loader = async () => {
  try {
    const loggedUser = await axios.get("/api/admin/loggedUser");
    return loggedUser;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};

function Dashboard() {
  const userData = useLoaderData();
  //   console.log(userData);
  return (
    <div>
      {/* pass the user data from loader function to navbar and all the child components (Outlet) */}
      <DashboardContext.Provider value={userData}>
        <Navbar />
        <Outlet />
      </DashboardContext.Provider>
    </div>
  );
}
export default Dashboard;
