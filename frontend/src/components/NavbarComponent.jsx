//css imports
import styles from "../utils/styles/navbar.module.css";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

//component imports
import { CartModal } from "../components/CartModal";

//dashboard context
import { DashboardContext } from "../pages/Dashboard";

function NavbarComponent() {
  //obtaining data from created context
  const context = useContext(DashboardContext);
  const loggedUser = context;
  // console.log(loggedUser);

  const navigate = useNavigate();

  //TO BE REFACTORED TO A NEW FILE
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
    <Navbar fluid rounded className='bg-black m-1 '>
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
            !loggedUser.data.user.avatarUrl || !loggedUser ? (
              <Avatar
                className='mr-2'
                alt='User settings'
                img='/public/testImg.jpg'
                rounded
              />
            ) : (
              <Avatar
                className='mr-2'
                alt='User settings'
                img={loggedUser.data.user.avatarUrl}
                rounded
              />
            )
          }
        >
          <Dropdown.Header>
            <span className='font-bold capitalize block text-sm'>
              {loggedUser.data.user.name}
            </span>
            <span className='block truncate text-sm font-medium'>
              {loggedUser.data.user.email}
            </span>
          </Dropdown.Header>
          {/* adding a product if role is admin */}
          {loggedUser && loggedUser.data.user.role === "admin" && (
            <Dropdown.Item>
              <Link to='/dashboard/addProduct'>Add Products</Link>
            </Dropdown.Item>
          )}

          {/* updating profile if logged in */}
          {loggedUser && (
            <Dropdown.Item>
              <Link to='/dashboard/profile'>Update Profile</Link>
            </Dropdown.Item>
          )}
          <Dropdown.Item>View my Cart</Dropdown.Item>
          {/* <Dropdown.Item>Earnings</Dropdown.Item> */}
          <Dropdown.Divider />
          <Dropdown.Item onClick={logoutUser}>Sign out</Dropdown.Item>
        </Dropdown>
        <CartModal user={loggedUser} />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href='/' className='text-slate-300'>
          Home
        </Navbar.Link>
        <Navbar.Link href='#' className='text-slate-300'>
          About
        </Navbar.Link>
        <Navbar.Link href='/dashboard/' className='text-slate-300'>
          Product Categories
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
