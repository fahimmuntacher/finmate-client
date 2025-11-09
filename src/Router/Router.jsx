import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Components/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import AddTransaction from "../Pages/AddTransaction/AddTransaction";
import MyTransactions from "../Pages/MyTransactions/MyTransactions";
import Reports from "../Pages/Reports/Reports";
import NotFound from "../Pages/NotFoundPage/NotFound";
import AboutUs from "../Pages/AboutUs/AboutUs";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyProfile from "../Pages/MyProfile/MyProfile";
import PublicRoute from "../PublicRoute/PublicRoute";
import TransactionDetail from "../Pages/TransactionDetail/TransactionDetail";
import EditTransaction from "../Pages/EditTransaction/EditTransaction";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      { index: true, element: <Home></Home> },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register></Register>
          </PublicRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login></Login>
          </PublicRoute>
        ),
      },
      {
        path: "about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "add-transaction",
        element: (
          <PrivateRoute>
            <AddTransaction></AddTransaction>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-transactions",
        element: (
          <PrivateRoute>
            <MyTransactions></MyTransactions>
          </PrivateRoute>
        ),
      },
      {
        path: "/reports",
        element: (
          <PrivateRoute>
            <Reports></Reports>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-transactions/transaction/:id",
        element: (
          <PrivateRoute>
            <TransactionDetail></TransactionDetail>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-transactions/transaction-edit/:id",
        element: (
          <PrivateRoute>
            <EditTransaction></EditTransaction>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
