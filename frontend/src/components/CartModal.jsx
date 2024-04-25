"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import { FaCartShopping } from "react-icons/fa6";

export function CartModal(user) {
  const [openModal, setOpenModal] = useState(false);

  //user data as context passed as props from NavbarComponent
  const userData = user.user.data.user;
  console.log(userData.cart);

  //function to obtain total price
  const totalPrice = () => {
    const priceArray = [];
    userData.cart.map((cartProducts) => {
      priceArray.push(cartProducts.productId.price);
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
              //   console.log(newCart);
              return (
                <section key={newCart._id}>
                  <article className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                    {newCart.productId.prodName}
                  </article>
                  <article>€{newCart.productId.price}</article>
                </section>
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
