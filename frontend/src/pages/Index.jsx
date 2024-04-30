import { Link } from "react-router-dom";

function Index() {
  return (
    <main className='text-white'>
      Index
      <br />
      <Link to='/login'>login</Link>
      <br />
      <Link to='/register'>register</Link>
      <br />
      <Link to='/dashboard/'>Products</Link>
    </main>
  );
}
export default Index;
