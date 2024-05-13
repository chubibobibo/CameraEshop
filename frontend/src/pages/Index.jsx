import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Index() {
  //object to use to login test user
  const testUser = {
    email: "test@gmail.com",
    password: "testtest",
  };

  const navigate = useNavigate();
  //function to login testUser
  const login = async (testUser) => {
    try {
      await axios.post("/api/users/login", testUser);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className='text-white'>
      Index
      <br />
      <Link to='/login'>login</Link>
      <br />
      <Link to='/register'>register</Link>
      <br />
      <Link
        to='/dashboard/'
        onClick={() => {
          login(testUser);
        }}
      >
        Products
      </Link>
    </main>
  );
}
export default Index;
