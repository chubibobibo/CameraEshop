//outlet to render childre pages
import { Outlet } from "react-router-dom";

//component imports
import Navbar from "../components/NavbarComponent";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
export default Dashboard;
