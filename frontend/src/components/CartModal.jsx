"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function CartModal(user) {
  const [openModal, setOpenModal] = useState(false);
  //user data as context passed as props from NavbarComponent
  const userData = user.user.data.user;
  console.log(userData);

  //   export const loader = async() => {
  //     try {
  //         const cartProduct = await axios.get(`/api/products/${userData._id}`)
  //     } catch (err) {
  //         console.log(err)
  //     }
  //   };

  return (
    <main>
      <Button onClick={() => setOpenModal(true)}>My Cart</Button>
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
            {userData.cart.map((newCart) => {
              return (
                <section key={newCart}>
                  <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                    {newCart}
                  </p>
                </section>
              );
            })}
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
