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
        link={"/dashboard/mirrorless"}
      />
      <CategoryCards
        title={"DSLR"}
        body={cameraDescription.dslr}
        img={cardImg.dslrImg}
        link={"/dashboard/dslr"}
      />
      <CategoryCards
        title={"POINT AND SHOOT"}
        body={cameraDescription.point}
        img={cardImg.pointImg}
        link={"/dashboard/point"}
      />
    </main>
  );
}
export default ProductCategory;
