import {
  AiFillDropboxCircle,
  AiFillAndroid,
  AiFillSlackSquare,
} from "react-icons/ai";

import {
  OneProductCategors,
  ProducList,
  ProducCategory,
  ProducBrends,
  ProducListCategory,
  ProductListBrands
  
} from "../modules";

export const adminRights = [
  {
    path: "/super-admin-panel",
    label: "Product-list",
    element: <ProducList />,
    icon: <AiFillDropboxCircle style={{ fontSize: "22px" }} />,
    showInSidebar: true,
    disabled: false, 
  },
  {
    path: "/super-admin-panel/produc-category",
    label: "Product-category",
    element: <ProducCategory />,
    icon: <AiFillAndroid style={{ fontSize: "22px" }} />,
    showInSidebar: true,
    disabled: false, 
  },
  {
    path: "/super-admin-panel/produc-brends",
    label: "Product-brends",
    element: <ProducBrends />,
    icon: <AiFillSlackSquare style={{ fontSize: "22px" }} />,
    showInSidebar: true,
    disabled: false, 
  },
  {
    path: "/super-admin-panel/item/:id",
    element: <OneProductCategors />,
    showInSidebar: false,
    disabled: true, 
  },

  {
    path: "/super-admin-panel/category/:category",
    element: <ProducListCategory />,
    showInSidebar: false,
    disabled: true, 
  },
  {
    path: "/super-admin-panel/brands/:brand",
    element: <ProductListBrands />,
    showInSidebar: false,
    disabled: true, 
  },
];
