import { useState } from "react";
import { Form, Link } from "react-router-dom";

//componment imports
import InputText from "./InputText";
import ButtonComponent from "./ButtonComponent";

function SearchContainer() {
  //NOTE: modify the loader function in the ProductDslr.jsx to obtain the data from the form using Object.fromEntries() and create a new URL with the query strings based on the data on the query forms.

  return (
    //form will default to GET method
    //value of search input will be sent as query strings
    <main>
      <Form>
        <section className='flex mb-2'>
          <InputText
            labelId={"searchProduct"}
            labelValue={"Search Product"}
            type={"search"}
            placeholder={"Search Product"}
            name={"search"}
          />
        </section>
        <section className='flex gap-1'>
          <ButtonComponent
            type={"submit"}
            color={"dark"}
            size={"sm"}
            label={"Search"}
          />
          <Link to='/dashboard/dslr'>
            <ButtonComponent
              type={"submit"}
              color={"dark"}
              size={"sm"}
              label={"Reset Search"}
            />
          </Link>
        </section>
      </Form>
    </main>
  );
}
export default SearchContainer;
