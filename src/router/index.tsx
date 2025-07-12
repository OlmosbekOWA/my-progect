import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "../App";
import {
  SignIn,
  AdminPanel,
  NotFound,
  ProducList,
  ProducCategory,
  ProducBrends,
  OneProductCategors,
  ProducListCategory,
  ProductListBrands,
} from "../modules";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />

        <Route path="super-admin-panel" element={<AdminPanel />}>
          <Route index element={<ProducList />} />
          <Route path="produc-category" element={<ProducCategory />} />
          <Route path="produc-brends" element={<ProducBrends />} />
          <Route path="item/:id" element={<OneProductCategors />} />
          <Route path="category/:category" element={<ProducListCategory />} />
          <Route path="brands/:brand" element={<ProductListBrands />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Index;
