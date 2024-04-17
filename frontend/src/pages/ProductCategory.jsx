//components imports
import CategoryCards from "../components/CategoryCards";
//css
import styles from "../utils/styles/productCategory.module.css";

//product description
import {
  cameraDescription,
  cardImg,
} from "../utils/productDescription/description.js";

function ProductCategory() {
  return (
    <main className={styles.mainContainer}>
      <CategoryCards
        title={"MIRRORLESS"}
        body={cameraDescription.mirrorless}
        img={cardImg.mirrorlessImg}
      />
      <CategoryCards
        title={"DSLR"}
        body={cameraDescription.dslr}
        img={cardImg.dslrImg}
      />
      <CategoryCards
        title={"POINT AND SHOOT"}
        body={cameraDescription.point}
        img={cardImg.pointImg}
      />
    </main>
  );
}
export default ProductCategory;
