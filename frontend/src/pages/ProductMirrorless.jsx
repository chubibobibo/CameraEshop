import { toast } from "react-toastify";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

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
  console.log(mirrorless);

  return (
    <main>
      {mirrorless.data.foundMirrorless.map((allMirrorless) => {
        return (
          <>
            <article>{allMirrorless.prodName}</article>
            <article>{allMirrorless.prodDescription}</article>
          </>
        );
      })}
    </main>
  );
}
export default ProductMirrorless;
