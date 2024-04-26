import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

//action function to delete a cart item
export const action = async ({ params }) => {
  //no data will be  passed on the form. we will be needing the id from the action path of the form to specify which item will be deleted.
  try {
    //using the id from params to tell API which item to be deleted
    await axios.delete(`/api/cart/${params.id}`);
    toast.success("Item  deleted");
    return redirect("/dashboard");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};

function DeleteCart() {
  return <div>DeleteCart</div>;
}
export default DeleteCart;
