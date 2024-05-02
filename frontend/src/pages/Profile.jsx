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
//UPDATE: stop converting data from the form into an object

export const action = async ({ request }) => {
  const formData = await request.formData(); //obtain data from form
  //   const data = Object.fromEntries(formData); // converts formData to obj.

  //obtain the file (name= "avatar") being sent of the input file. This will create req.file that contains the image
  const file = formData.get("avatar");

  //file size limiter
  if (file && file.size > 5000000) {
    toast.error("File cannot exceed 5mb");
  }

  //UPDATE: change data sent to API to the formData instead of the converted object
  try {
    await axios.patch("/api/admin/updateUser", formData);

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
          <Form
            className='flex flex-col gap-4'
            method='post'
            encType='multipart/form-data'
          >
            {/* name */}
            <article>
              <InputText
                labelId={"Avatar"}
                labelValue={"Avatar"}
                type={"file"}
                // placeholder={loggedUser.data.user.name}
                name={"avatar"} //naming the img file being sent
                // defaultValue={loggedUser.data.user.name}
                required={"required"}
              />
            </article>
            {/* name */}
            <article>
              <InputText
                labelId={"name"}
                labelValue={"Name"}
                type={"text"}
                placeholder={loggedUser.data.user.name}
                name={"name"}
                defaultValue={loggedUser.data.user.name}
                required={"required"}
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
                required={"required"}
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
                required={"required"}
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
