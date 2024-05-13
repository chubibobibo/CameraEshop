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
import SearchContainer from "../components/SearchContainer";

//porvide id to toast to avoid repetition
const customId = "custom-id-yes";

//modify loader function to create an object containing a new URl from request that will contain the query.
//searchParams.entries() obtains all key-value pairs in that object
export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const foundMirrorless = await axios.get(
      "/api/products/category/mirrorless",
      { params }
    );
    // console.log(foundMirrorless);
    return foundMirrorless;
  } catch (err) {
    // console.log(err);
    toast.error(err.response.data.message, { toastId: customId }); //provide the id as 2nd argument
    return null;
  }
};

function ProductMirrorless() {
  const mirrorless = useLoaderData();
  // console.log(mirrorless);

  return (
    <main className={styles.mirrorlessMain}>
      <section>
        <SearchContainer />
      </section>
      <section>
        {mirrorless?.data?.foundMirrorless?.map((allMirrorless) => {
          // console.log(allMirrorless);
          return (
            <section key={allMirrorless._id}>
              <Card
                className='max-w-lg m-2'
                imgSrc={allMirrorless.avatarUrl}
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
    </main>
  );
}
export default ProductMirrorless;
