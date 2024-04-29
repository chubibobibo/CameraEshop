import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData, Form, Link, redirect } from "react-router-dom";

//copied styles from register
import styles from "../utils/styles/updateProfile.module.css";

//flowbite imports
import { Card } from "flowbite-react";

//components imports
import InputText from "../components/InputText";
import ButtonComponent from "../components/ButtonComponent";

//loader function to obtain the profile of the logged user
export const loader = async () => {
  //accepts request to obtain req.user.userId
  try {
    const loggedUser = await axios.get("/api/admin/loggedUser");
    return loggedUser;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};

//action to submit updated profile
export const action = async ({ request }) => {
  const formData = await request.formData(); //obtain data from form
  const data = Object.fromEntries(formData); // converts formData to obj.
  try {
    const updatedUserData = await axios.patch("/api/admin/updateUser", data);

    toast.success("User profile updated");
    return redirect("/dashboard");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};

//JSX
function Profile() {
  //obtain laoder data
  const loggedUser = useLoaderData();
  console.log(loggedUser);
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
                placeholder={loggedUser.data.user.name}
                name={"name"}
                defaultValue={loggedUser.data.user.name}
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
                defaultValue={loggedUser.data.user.lastName}
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
                defaultValue={loggedUser.data.user.email}
              />
            </article>
            <ButtonComponent
              type={"submit"}
              color={"dark"}
              size={"lg"}
              label={"Update Profile"}
            />
          </Form>
        </Card>
      </section>
    </main>
  );
}
export default Profile;
