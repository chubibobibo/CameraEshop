"use client";
import { toast } from "react-toastify";
import axios from "axios";
import { useLoaderData, Link } from "react-router-dom";

//css
import styles from "../utils/styles/productMirrorless.module.css";

//flowbit imports
import { Card } from "flowbite-react";

//components
import ButtonComponent from "../components/ButtonComponent";

export const loader = async () => {
  try {
    const foundMirrorless = await axios.get(
      "/api/products/category/mirrorless"
    );
    // console.log(foundMirrorless);
    return foundMirrorless;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

function ProductMirrorless() {
  const mirrorless = useLoaderData();
  // console.log(mirrorless);

  return (
    <main className={styles.mirrorlessMain}>
      {mirrorless.data.foundMirrorless.map((allMirrorless) => {
        // console.log(allMirrorless);
        return (
          <section key={allMirrorless._id}>
            <Card
              className='max-w-lg m-2'
              imgSrc='https://images.unsplash.com/photo-1618486073499-242493d8f3a1?q=80&w=3876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              horizontal
            >
              <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                {allMirrorless.prodName}
              </h5>
              <p className='font-normal text-gray-700 dark:text-gray-400 text-sm'>
                {allMirrorless.prodDescription}
              </p>
              {/* Link to the Specific Product Component  */}
              <Link to={`/dashboard/product/${allMirrorless._id}`}>
                <ButtonComponent
                  type={"button"}
                  color={"dark"}
                  size={"sm"}
                  label={"Show more..."}
                />
              </Link>
            </Card>
          </section>
        );
      })}
    </main>
  );
}
export default ProductMirrorless;

//'https://images.unsplash.com/photo-1606986601547-a4d886b671b2?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
