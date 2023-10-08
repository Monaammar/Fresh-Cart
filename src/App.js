import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayOut from "./Pages/MainLayOut/MainLayOut";
import Register from "./Pages/Register/Register";
import Cart from "./Pages/Cart/Cart";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import LogIn from "./Pages/LogIn/LogIn";
import Products from "./Pages/Products/Products";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import { UserContextProvider } from "./Context/UserContext";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import { CartContextProvider } from "./Context/CartContext";
import CheckOut from "./Pages/CheckOut/CheckOut";
import Categories from "./Pages/Categories/Categories";
import Brands from "./Pages/Brands/Brands";
import WishList from "./Pages/WishList/WishList";
import { ListContextProvider } from "./Context/WishListContext";


let routes = createBrowserRouter([
  {
    path: "",
    element: <MainLayOut />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Register",
        element: <Register />,
      },
      {
        path: "Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "CheckOut",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },

      {
        path: "Products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "Categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "Brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "WishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "Home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "Fresh Cart",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "LogIn",
        element: <LogIn />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  // return
  return (
   <ListContextProvider>
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      </UserContextProvider>
    </CartContextProvider>
    </ListContextProvider>
  );
}

export default App;
