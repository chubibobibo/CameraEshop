import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData, Link } from "react-router-dom";

import ButtonComponent from "../components/ButtonComponent";
import SearchContainer from "../components/SearchContainer";

//css
import styles from "../utils/styles/productDslr.module.css";

//flowbite imports
import { Card } from "flowbite-react";

//loader function obtain dslr's
export const loader = async ({ request }) => {
  // console.log(request);
  try {
    //modifying the loader function to create a new url that contains the URL with the search query(request.url)
    //searchParams returns an iterator of all key value-pair of new URL object.
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    // console.log(searchQueryParams);
    const foundDslr = await axios.get("/api/products/category/dslr", {
      params,
    });
    // console.log(foundDslr);
    return foundDslr;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return null;
  }
};
function ProductDslr() {
  const foundDslr = useLoaderData();
  // console.log(foundDslr);

  return (
    <main className={styles.dslrMain}>
      <section>
        <SearchContainer />
      </section>
      <section>
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
      </section>

      {/* Displays no products found relative if loader function returns results */}
      {/* <section className='flex-col'>
        <h1 className='text-white text-4xl'>No Products Found</h1>
        <br />

        <Link to='/dashboard' className='flex items-center text-white text-lg'>
          Click here to go back to categories...
        </Link>
      </section> */}
    </main>
  );
}
export default ProductDslr;
