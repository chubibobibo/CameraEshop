import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

//action function to delete product
export const action = async ({ params }) => {
  try {
    await axios.delete(`/api/products/${params.id}`);
    toast.success("Product deleted");
    return redirect("/dashboard");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};

function DeleteProduct() {
  return <div>DeleteProduct</div>;
}
export default DeleteProduct;
