import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
//flowbite imports
import { Card } from "flowbite-react";

//components imports
import InputText from "../components/InputText";
import ButtonComponent from "../components/ButtonComponent";

//css imports
import styles from "../utils/styles/register.module.css";

//action function to register
export const action = async ({ request }) => {
  const formData = await request.formData(); //obtains data from form
  const data = Object.fromEntries(formData); //converts data to usable obj.
  try {
    await axios.post("/api/users/register", data);
    toast.success("User registered");
    return redirect("/login");
  } catch (err) {
    console.log(err);
    toast.error(
      Array.isArray(err)
        ? err.response.data.message[0]
        : err.response.data.message
    );
  }
};

function Register() {
  return (
    <main className={styles.mainContainer}>
      <section className={styles.cardSection}>
        <Card className='max-w-xl m-10'>
          <Form className='flex flex-col gap-4' method='post'>
            {/* name */}
            <article>
              <InputText
                labelId={"name"}
                labelValue={"Name"}
                type={"text"}
                placeholder={"Name"}
                name={"name"}
              />
            </article>
            {/* last name */}
            <article>
              <InputText
                labelId={"lastName"}
                labelValue={"Last Name"}
                type={"text"}
                placeholder={"Last Name"}
                name={"lastName"}
              />
            </article>
            {/* email */}
            <article>
              <InputText
                labelId={"email"}
                labelValue={"Email"}
                type={"email"}
                placeholder={"Email"}
                name={"email"}
              />
            </article>
            {/* password */}
            <article>
              <InputText
                labelId={"password"}
                labelValue={"Password"}
                type={"password"}
                placeholder={"Password"}
                name={"password"}
              />
            </article>
            <ButtonComponent
              type={"submit"}
              color={"dark"}
              size={"lg"}
              label={"Submit"}
            />
          </Form>
          <section className='text-center'>
            Already have an account?{" "}
            <Link to='/login'>Click here to login</Link>
          </section>
        </Card>
      </section>
    </main>
  );
}
export default Register;
