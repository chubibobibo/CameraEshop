import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData, Link } from "react-router-dom";

import ButtonComponent from "../components/ButtonComponent";

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
  // console.log(foundDslr);

  return (
    <main className={styles.dslrMain}>
      {foundDslr?.data?.foundDslr?.map((allDslr) => {
        return (
          <section key={allDslr._id}>
            <Card
              className='max-w-lg m-2'
              imgSrc={allDslr.avatarUrl}
              horizontal
            >
              <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                {allDslr.prodName}
              </h5>
              <p className='font-normal text-gray-700 dark:text-gray-400 text-sm'>
                {allDslr.prodDescription}
              </p>
              {/* Link to the specific product component */}
              <Link to={`/dashboard/product/${allDslr._id}`}>
                <ButtonComponent
                  type={"button"}
                  color={"dark"}
                  size={"sm"}
                  label={"Show more..."}
                />
              </Link>
              <Link to={`/dashboard`}>
                <ButtonComponent
                  type={"button"}
                  color={"dark"}
                  size={"sm"}
                  label={"Back to Categories"}
                />
              </Link>
            </Card>
          </section>
        );
      })}
      {/* Displays no products found relative if loader function returns results */}
      <section className='flex-col'>
        <h1 className='text-white text-4xl'>No Products Found</h1>
        <br />

        <Link to='/dashboard' className='flex items-center text-white text-lg'>
          Click here to go back to categories...
        </Link>
      </section>
    </main>
  );
}
export default ProductDslr;
