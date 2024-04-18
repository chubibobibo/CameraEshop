import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages import
import HomeLayout from "./pages/HomeLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import ProductMirrorless from "./pages/ProductMirrorless";
import ProductDslr from "./pages/ProductDslr";
import ProductPoint from "./pages/ProductPoint";

import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/ProductPage";
import ProductCategory from "./pages/ProductCategory";

//action function imports
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
//loader function imports
import { loader as loggedUserLoader } from "./pages/Dashboard";
import { loader as mirrorlessLoader } from "./pages/ProductMirrorless";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "/login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "/register",
          element: <Register />,
          action: registerAction,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
          errorElement: <ErrorPage />,
          loader: loggedUserLoader,
          children: [
            // relative to Dasboard
            {
              index: true,
              element: <ProductCategory />,
            },
            {
              path: "productPage",
              element: <ProductPage />,
            },
            {
              path: "mirrorless",
              element: <ProductMirrorless />,
              loader: mirrorlessLoader,
            },
            {
              path: "dslr",
              element: <ProductDslr />,
            },
            {
              path: "point",
              element: <ProductPoint />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
