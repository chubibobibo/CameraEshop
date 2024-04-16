import { Link, redirect, Form } from "react-router-dom";
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
    await axios.post("api/users/login", data);
    toast.success("User logged in");
    return redirect("/");
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
        </Card>
      </section>
    </main>
  );
}
export default Login;
