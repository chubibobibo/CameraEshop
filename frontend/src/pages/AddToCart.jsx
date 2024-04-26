//this will allow the adding of items in the cart
import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

//action function that will call the API to add items to cart
//will need to accept paras to send the id to the API that needs the id for the specific item to add.
export const action = async ({ params }) => {
  try {
    await axios.post(`/api/cart/${params.id}`);
    toast.success("Item added to cart");
    return redirect(`/dashboard/product/${params.id}`);
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};
function AddToCart() {
  return <div>AddToCart</div>;
}
export default AddToCart;
