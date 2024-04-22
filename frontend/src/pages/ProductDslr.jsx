import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

//css
import styles from "../utils/styles/productDslr.module.css";

//flowbite imports
import { Card } from "flowbite-react";

//loader function obtain dslr's
export const loader = async () => {
  try {
    const foundDslr = await axios.get("/api/products/category/dslr");
    return foundDslr;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};
function ProductDslr() {
  const foundDslr = useLoaderData();
  console.log(foundDslr);

  return (
    <main className={styles.dslrMain}>
      {foundDslr.data.foundDslr.map((allDslr) => {
        return (
          <section key={allDslr._id}>
            <Card
              className='max-w-lg m-2'
              imgSrc='https://images.unsplash.com/photo-1618486073499-242493d8f3a1?q=80&w=3876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              horizontal
            >
              <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                {allDslr.prodName}
              </h5>
              <p className='font-normal text-gray-700 dark:text-gray-400 text-sm'>
                {allDslr.prodDescription}
              </p>
            </Card>
          </section>
        );
      })}
    </main>
  );
}
export default ProductDslr;
