import {
  AiFillDropboxCircle,
  AiFillAndroid,
  AiFillSlackSquare,
} from "react-icons/ai";

import {
  OneStudent,
  ProducList,
  ProducCategory,
  ProducBrends,
  ProducListCategory,
} from "../modules";

export const adminRights = [
  {
    path: "/super-admin-panel",
    label: "Produc-list",
    element: <ProducList />,
    icon: <AiFillDropboxCircle style={{ fontSize: "22px" }} />,
    showInSidebar: true,
  },
  {
    path: "/super-admin-panel/produc-category",
    label: "Produc-category",
    element: <ProducCategory />,
    icon: <AiFillAndroid style={{ fontSize: "22px" }} />,
    showInSidebar: true,
  },
  {
    path: "/super-admin-panel/produc-brends",
    label: "Produc-brends",
    element: <ProducBrends />,
    icon: <AiFillSlackSquare style={{ fontSize: "22px" }} />,
    showInSidebar: true,
  },
  {
    path: "/super-admin-panel/item/:id",
    element: <OneStudent />,
    showInSidebar: false,
  },

  {
    path: "/super-admin-panel/category/:category",
    element: <ProducListCategory />,
    showInSidebar: false,
  },
];
