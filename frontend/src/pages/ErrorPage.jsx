import { useRouteError } from "react-router-dom";

//css
import styles from "../utils/styles/errorPage.module.css";
import { Link } from "react-router-dom";

//flowbite
import { Button } from "flowbite-react";

function ErrorPage() {
  //error handler
  const error = useRouteError();
  //   console.log(error);
  return (
    <main className={styles.errorMain}>
      <section className={styles.errorImage}>
        {error.status === 404 ? (
          <img src='./src/assets/404.jpg' alt='' />
        ) : (
          <article>Something Went Wrong</article>
        )}
      </section>
      <article className={styles.errorBtn}>
        <Button color='dark' size='xl'>
          <Link to='/'>Back to Home</Link>
        </Button>
      </article>
    </main>
  );
}
export default ErrorPage;
