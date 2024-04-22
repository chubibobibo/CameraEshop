import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

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
      {point.data.foundPoint.map((allPoint) => {
        return (
          <section key={allPoint._id}>
            <Card
              className='max-w-lg m-2'
              imgSrc='https://images.unsplash.com/photo-1618486073499-242493d8f3a1?q=80&w=3876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              horizontal
            >
              <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                {allPoint.prodName}
              </h5>
              <p className='font-normal text-gray-700 dark:text-gray-400 text-sm'>
                {allPoint.prodDescription}
              </p>
            </Card>
          </section>
        );
      })}
    </main>
  );
}
export default ProductPoint;
