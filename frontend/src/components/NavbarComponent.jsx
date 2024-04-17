//css imports
import styles from "../utils/styles/navbar.module.css";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//dashboard context
import { DashboardContext } from "../pages/Dashboard";

function NavbarComponent() {
  //obtaining data from created context
  const context = useContext(DashboardContext);
  const loggedUser = context;
  // console.log(loggedUser);

  const navigate = useNavigate();

  //function to call the logout API
  const logoutUser = async () => {
    try {
      await axios.get("/api/users/logout");
      navigate("/");
      toast.success("User is logged out");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Navbar fluid rounded className='bg-black m-2 sticky top-0'>
      <Navbar.Brand href='/'>
        {/* <img
          src='/favicon.svg'
          className='mr-3 h-6 sm:h-9'
          alt='Flowbite React Logo'
        /> */}
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white text-slate-300'>
          Camera E-Shop
        </span>
      </Navbar.Brand>
      <div className='flex md:order-2'>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              className='mr-2'
              alt='User settings'
              img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className='block text-sm'>{loggedUser.data.user.name}</span>
            <span className='block truncate text-sm font-medium'>
              {loggedUser.data.user.email}
            </span>
          </Dropdown.Header>
          {loggedUser && loggedUser.data.user.role === "admin" && (
            <Dropdown.Item>Add Products</Dropdown.Item>
          )}

          <Dropdown.Item>View my Cart</Dropdown.Item>
          {/* <Dropdown.Item>Earnings</Dropdown.Item> */}
          <Dropdown.Divider />
          <Dropdown.Item onClick={logoutUser}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href='/' className='text-slate-300'>
          Home
        </Navbar.Link>
        <Navbar.Link href='#' className='text-slate-300'>
          About
        </Navbar.Link>
        <Navbar.Link href='#' className='text-slate-300'>
          Product Category
        </Navbar.Link>
        <Navbar.Link href='#' className='text-slate-300'>
          Pricing
        </Navbar.Link>
        <Navbar.Link href='#' className='text-slate-300'>
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavbarComponent;
