//flowbite imports
import { Card, Label, Textarea, Select } from "flowbite-react";
import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

//components import
import InputText from "../components/InputText";
import ButtonComponent from "../components/ButtonComponent";

//css imports
import styles from "../utils/styles/addProduct.module.css";

//action function to add a product
export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  if (file.size > 5000000) {
    toast.error("Image cannot exceed 5mb");
  }
  try {
    await axios.post("/api/products", formData);
    toast.success("New product added");
    return redirect("/dashboard/");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};

function AddProduct() {
  //categories
  const categories = ["Dslr", "Mirrorless", "Point and Shoot"];

  return (
    <main className={styles.mainContainer}>
      <section className={styles.cardSection}>
        <Card className='max-w-xl m-10'>
          <Form
            className='flex flex-col gap-4'
            method='post'
            encType='multipart/form-data'
          >
            {/* product image */}
            <article>
              <InputText
                labelId={"productImage"}
                // labelValue={"Product Name"}
                type={"file"}
                // placeholder={"Product Name"}
                name={"avatar"}
              />
            </article>
            {/* product name */}
            <article>
              <InputText
                labelId={"productName"}
                labelValue={"Product Name"}
                type={"text"}
                placeholder={"Product Name"}
                name={"prodName"}
                required={"required"}
              />
            </article>
            {/* product quantity */}
            <article>
              <InputText
                labelId={"productQty"}
                labelValue={"Product Quantity"}
                type={"number"}
                placeholder={"Quantity"}
                name={"prodQty"}
                required={"required"}
              />
            </article>
            {/* product description */}
            <article>
              <Label htmlFor='productDescription' value='Product Description' />
              <Textarea
                id='productDescription'
                placeholder='Product Description'
                rows={6}
                required
                name='prodDescription'
              />
            </article>
            {/* product cartegory */}
            <article>
              <Label
                htmlFor='productCategory'
                value='Select Product Category'
              />
              <Select
                id='productCategory'
                required
                defaultValue=''
                name='prodCategory'
              >
                <option disabled hidden value=''>
                  Choose Product Category...
                </option>
                {categories.map((newCategories) => {
                  return (
                    <option
                      key={newCategories}
                      value={newCategories.toString()}
                    >
                      {newCategories}
                    </option>
                  );
                })}
              </Select>
              {/* product price */}
              <article>
                <InputText
                  labelId={"productPrice"}
                  labelValue={"Product Price"}
                  type={"number"}
                  placeholder={"Product Price"}
                  name={"price"}
                  required={"required"}
                />
              </article>
            </article>
            <ButtonComponent
              type={"submit"}
              color={"dark"}
              size={"lg"}
              label={"Submit"}
            />
          </Form>
        </Card>
      </section>
    </main>
  );
}
export default AddProduct;
