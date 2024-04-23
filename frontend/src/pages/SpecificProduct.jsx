import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

//flowbite
import { Button, Card } from "flowbite-react";

//css
import styles from "../utils/styles/specificProduct.module.css";

//components
import ButtonComponent from "../components/ButtonComponent";

//loader to obtain specific product
export const loader = async ({ params }) => {
  try {
    const productData = await axios.get(`/api/products/${params.id}`);
    return productData;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};

function SpecificProduct() {
  //function to add to cart used for the onClick event
  const addToCart = async (id) => {
    try {
      const addedItem = await axios.post(`/api/products/${id}`);
      console.log(addedItem);
      toast.success("Item added to cart");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  //product from loader function
  const productData = useLoaderData();
  const prodId = productData.data.foundProduct._id;
  //   console.log(prodId);

  return (
    <main className={styles.mainCard}>
      <Card
        className='max-w-xl'
        imgAlt='Apple Watch Series 7 in colors pink, silver, and black'
        imgSrc='https://images.unsplash.com/photo-1578606460787-c1725b634269?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      >
        <a href='#'>
          <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
            {productData.data.foundProduct.prodName}
          </h5>
        </a>
        <span>{productData.data.foundProduct.prodDescription}</span>
        <div className='mb-5 mt-2.5 flex items-center'>
          <svg
            className='h-5 w-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
          <svg
            className='h-5 w-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
          <svg
            className='h-5 w-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
          <svg
            className='h-5 w-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
          <svg
            className='h-5 w-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
          <span className='ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800'>
            5.0
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-3xl font-bold text-gray-900 dark:text-white'>
            €{productData.data.foundProduct.price}
          </span>

          {/* Button to add to cart using thge function that calls the addToCartAPi */}
          <ButtonComponent
            type={"button"}
            label={"Add to cart"}
            size={"sm"}
            color={"dark"}
            onClick={() => {
              addToCart(prodId.toString());
            }}
          />
        </div>
      </Card>
      {/* <section>{productData.data.foundProduct.prodName}</section>
      <section>{productData.data.foundProduct.prodDescription}</section>
      <section>{productData.data.foundProduct.prodQty}</section>
      <section>{productData.data.foundProduct.prodCategory}</section> */}
    </main>
  );
}
export default SpecificProduct;
