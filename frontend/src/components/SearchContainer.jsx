import { useState } from "react";

//componment imports
import InputText from "./InputText";
import ButtonComponent from "./ButtonComponent";

function SearchContainer() {
  //state to store search product data
  const [searchProduct, setSearchProduct] = useState({
    product: "",
    price: "",
  });

  //handle data from search input
  const handleChange = (e) => {
    setSearchProduct((newSearch) => {
      return { ...newSearch, [e.target.name]: e.target.value };
    });
  };

  console.log(searchProduct);
  return (
    //form will default to GET method
    //value of search input will be sent as query strings
    <main>
      <form>
        <InputText
          labelId={"searchProduct"}
          labelValue={"Search Product"}
          type={"search"}
          placeholder={"Search Product"}
          name={"search"}
          handleChange={handleChange}
        />
        <ButtonComponent
          type={"submit"}
          color={"dark"}
          size={"sm"}
          label={"Search"}
        />
      </form>
      <p className='text-white'>{searchProduct.product}</p>
    </main>
  );
}
export default SearchContainer;
