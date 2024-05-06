import { Card, Label, Textarea, Select } from "flowbite-react";
import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

//components import
import InputText from "../components/InputText";
import ButtonComponent from "../components/ButtonComponent";

//css imports
import styles from "../utils/styles/addProduct.module.css";

//action function to submit form details (including image file)
//modified action function to not convert data to object. Multer will parse the data

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  try {
    await axios.patch(`/api/products/${params.id}`, formData);
    toast.success("Product successfuly updated");
    return redirect("/dashboard");
  } catch (err) {
    // console.log(err);
    toast.error(
      Array.isArray(err?.response?.data?.message)
        ? err.response.data.message[0]
        : err.response.data.message
    );
  }
};

export const loader = async ({ params }) => {
  try {
    const productData = await axios.get(`/api/products/${params.id}`);
    return productData;
  } catch (err) {
    console.log(err);
    toast.error(err?.repsonse?.data?.message);
  }
};

function UpdateProduct() {
  //categories for the select option input
  const categories = ["Dslr", "Mirrorless", "Point and Shoot"];

  //obtaining data from the loader function
  const data = useLoaderData();
  const productData = data.data.foundProduct;
  console.log(productData);

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
                defaultValue={productData.prodName}
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
                defaultValue={productData.prodQty}
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
                defaultValue={productData.prodDescription}
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
                // defaultValue={productData.prodCategory}
                name='prodCategory'
              >
                <option disabled hidden value=''>
                  {productData.prodCategory}
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
                  defaultValue={productData.price}
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
          <Link to={`/dashboard/product/${productData._id}`}>
            <ButtonComponent
              type={"submit"}
              color={"dark"}
              size={"lg"}
              label={"Back"}
            />
          </Link>
        </Card>
      </section>
    </main>
  );
}
export default UpdateProduct;
