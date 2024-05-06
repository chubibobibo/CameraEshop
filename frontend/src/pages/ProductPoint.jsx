import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData, Link } from "react-router-dom";

import ButtonComponent from "../components/ButtonComponent";

//flowbit imports
import { Card } from "flowbite-react";

//css
import styles from "../utils/styles/productPoint.module.css";

//loader function to obtain all point and shoot cameras
export const loader = async () => {
  try {
    const foundPoint = await axios.get("/api/products/category/point");
    return foundPoint;
  } catch (err) {
    toast.error(err?.response?.data?.message);
    console.log(err);
  }
};

function ProductPoint() {
  const point = useLoaderData();
  console.log(point);
  return (
    <main className={styles.pointMain}>
      {point?.data?.foundPoint?.map((allPoint) => {
        return (
          <section key={allPoint._id}>
            <Card
              className='max-w-lg m-4'
              imgSrc={allPoint.avatarUrl}
              horizontal
            >
              <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                {allPoint.prodName}
              </h5>
              <p className='font-normal text-gray-700 dark:text-gray-400 text-sm'>
                {allPoint.prodDescription}
              </p>
              {/* Link to the specificProduct component */}
              <Link to={`/dashboard/product/${allPoint._id}`}>
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
export default ProductPoint;
