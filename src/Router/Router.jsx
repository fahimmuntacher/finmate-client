import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Components/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import AddTransaction from "../Pages/AddTransaction/AddTransaction";
import MyTransactions from "../Pages/MyTransactions/MyTransactions";
import Reports from "../Pages/Reports/Reports";
import NotFound from "../Pages/NotFoundPage/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
        { index: true, element: <Home></Home> },
        {
            path: "register",
            element:<Register></Register>
        }, 
        {
            path: "login",
            element: <Login></Login>
        },
        {
          path: "add-transaction",
          element: <AddTransaction></AddTransaction>
        },
        {
          path: "my-transactions",
          element: <MyTransactions></MyTransactions>
        },
        {
          path: "reports",
          element: <Reports></Reports>
        },
    ],
  },
]);

export default router;
