import { Link, redirect, Form, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

//flowbite
import { Card, Checkbox, Label } from "flowbite-react";

//css
import styles from "../utils/styles/login.module.css";

//component import
import InputText from "../components/InputText";
import ButtonComponent from "../components/ButtonComponent";

//action function to submit
export const action = async ({ request }) => {
  const formData = await request.formData(); //obtain data from form
  const data = Object.fromEntries(formData); // converts data to useable obj.
  try {
    await axios.post("/api/users/login", data);
    toast.success("User logged in");
    return redirect("/dashboard");
  } catch (err) {
    console.log(err);
    toast.error(
      Array.isArray(err.response.data.message)
        ? err.response.data.message[0]
        : err.response.data.message
    );
    return err;
  }
};

function Login() {
  //object used as login
  const testUser = {
    email: "test@gmail.com",
    password: "testtest",
  };

  const navigate = useNavigate();
  //function to handle login onClick
  const handleLogin = async (testUser) => {
    try {
      await axios.post("/api/users/login", testUser);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className={styles.mainContainer}>
      <section className={styles.cardSection}>
        <Card className='max-w-xl m-10'>
          <Form method='post' className='flex flex-col gap-4'>
            <article>
              <InputText
                labelValue={"Email"}
                labelId={"email"}
                type={"email"}
                placeholder={"Email"}
                name={"email"}
              />
            </article>
            {/* password */}
            <InputText
              labelValue={"Password"}
              labelId={"password"}
              type={"password"}
              name={"password"}
              placeholder={"Password"}
            />
            <article className='flex items-center gap-2'>
              <Checkbox id='remember' />
              <Label htmlFor='remember'>Remember me</Label>
            </article>
            {/* button */}
            <ButtonComponent
              type={"submit"}
              color={"dark"}
              size={"lg"}
              label={"Submit"}
            />
          </Form>
          <section className='text-center'>
            No Account Yet? <Link to='/register'>Click here to Register</Link>
          </section>
          <section className='text-center'>
            <Link
              onClick={() => {
                handleLogin(testUser);
              }}
            >
              Click here to browse the Shop
            </Link>
          </section>
        </Card>
      </section>
    </main>
  );
}
export default Login;
