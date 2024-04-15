import {
    createBrowserRouter,
  } from "react-router-dom";
import LoginPage from "../pages/login";
import Layout from "../components/layout";
import BillCreationPage from "../pages/bill";
import InventoryUpdatePage from "../pages/updateInventory";
import PriceUpdatePage from "../pages/updatePrice";
import SalesHistoryPage from "../pages/salesStatistics";
import CreateUserPage from "../pages/addUser";
import AddProductPage from "../pages/addProduct";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <Layout />,
      },
      {
        path: "/bill",
        element: <BillCreationPage />,
      },
      {
        path: "/inventoryUpdate",
        element: <InventoryUpdatePage />,
      },
      {
        path: "/priceUpdate",
        element: <PriceUpdatePage />,
      },
      {
        path: "/salesTransactions",
        element: <SalesHistoryPage />,
      },
      {
        path: "/addUser",
        element: <CreateUserPage />,
      },
      {
        path: "/addProduct",
        element: <AddProductPage />,
      },
  ]);