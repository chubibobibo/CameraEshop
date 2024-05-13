"use client";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { BiSolidXSquare } from "react-icons/bi";

import { Form } from "react-router-dom";

export function CartModal(user) {
  console.log(user);
  const [openModal, setOpenModal] = useState(false);

  //user data as context passed as props from NavbarComponent
  const userData = user.user.data.user;
  // console.log(userData.cart);
  //function to obtain total price
  //map the prices into an array then used reducer method to obtain the total price
  //NOTE: we have the product data in the productId because we populated that objectId in the adminControllers
  const totalPrice = () => {
    const priceArray = [];
    userData.cart.map((cartProducts) => {
      //check productId if still existing, when admin removes the item.
      //this will fix the error when admin removes an item in the database which is currently in the cart of the user.
      if (cartProducts.productId !== null) {
        priceArray.push(cartProducts.productId.price);
      }
    });
    const initialValue = 0;
    const totalCartPrice = priceArray.reduce(
      (accum, current) => accum + current,
      initialValue
    );
    return totalCartPrice;
  };

  //convert number to price in euros
  let euro = Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
  });

  // jsx
  return (
    <main>
      <Button onClick={() => setOpenModal(true)}>
        {" "}
        <div className='text-center'>
          <FaCartShopping />
        </div>
        My Cart
      </Button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className='flex-auto justify-center'
      >
        <Modal.Header className='capitalize'>{`${userData.name}'s Cart`}</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>

            {/* map cart array to display all product details */}
            {userData.cart.map((newCart) => {
              return (
                // Dynamically render the products if still existing in the database
                newCart.productId !== null && (
                  <section key={newCart._id} className='flex'>
                    <Form
                      method='post'
                      action={`/dashboard/deleteCart/${newCart._id}`}
                      className='mr-2 content-center'
                    >
                      <button>
                        <BiSolidXSquare />
                      </button>
                    </Form>
                    <section className='w-20 h-10 mr-3'>
                      <img
                        src={newCart.productId.avatarUrl}
                        alt='thumbnail cart product'
                      />
                    </section>
                    <section>
                      <article className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                        {newCart.productId.prodName}
                      </article>
                      <article>{euro.format(newCart.productId.price)}</article>
                    </section>
                  </section>
                )
              );
            })}
            {/* Use currency converter on the obtained total price */}
            <section className='text-right'>
              Total Price: {euro.format(totalPrice())}
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color='gray' onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
