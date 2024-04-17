import { Link } from "react-router-dom";

function Index() {
  return (
    <main>
      Index
      <Link to='/login'>login</Link>
      <Link to='/register'>register</Link>
    </main>
  );
}
export default Index;
