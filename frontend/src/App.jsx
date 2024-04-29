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
import SpecificProduct from "./pages/SpecificProduct";

import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/ProductPage";
import ProductCategory from "./pages/ProductCategory";
import DeleteCart from "./pages/DeleteCart";
import AddToCart from "./pages/AddToCart";
import Profile from "./pages/Profile.jsx";

//action function imports
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as deleteCartAction } from "./pages/DeleteCart";
import { action as addToCartAction } from "./pages/AddToCart";
import { action as updateProfileAction } from "./pages/Profile";
//loader function imports
import { loader as loggedUserLoader } from "./pages/Dashboard";
import { loader as mirrorlessLoader } from "./pages/ProductMirrorless";
import { loader as dslrLoader } from "./pages/ProductDslr";
import { loader as pointLoader } from "./pages/ProductPoint";
import { loader as specificLoader } from "./pages/SpecificProduct";
import { loader as updateProfileLoader } from "./pages/Profile";

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
              loader: dslrLoader,
            },
            {
              path: "point",
              element: <ProductPoint />,
              loader: pointLoader,
            },
            {
              path: "product/:id",
              element: <SpecificProduct />,
              loader: specificLoader,
            },
            {
              path: "addToCart/:id",
              element: <AddToCart />,
              action: addToCartAction,
            },
            {
              path: "deleteCart/:id",
              element: <DeleteCart />,
              action: deleteCartAction,
            },
            {
              path: "profile/", // Obtain id to load logges user profile
              element: <Profile />,
              loader: updateProfileLoader,
              action: updateProfileAction,
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
