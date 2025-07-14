declare module '@loadable/component';

import loadable from '@loadable/component';
import { Loading } from "../components"

import SignIn from "./auth/pages"

const AdminPanel = loadable(() => import("./super-admin-panel"), {
    fallback: <Loading />
});

const ProducList = loadable(() => import("./product-list/pages"), {
    fallback: <Loading />
});

const ProducCategory = loadable(() => import("./product-category/pages"), {
    fallback: <Loading />
});

const ProducListCategory = loadable(() => import("./list-category/pages"), {
    fallback: <Loading />
});
const ProducBrends = loadable(() => import("./product-brends/pages"), {
    fallback: <Loading />
});

const CreateItems = loadable(() => import("./create-product/pages"), {
    fallback: <Loading />
});

const ProductListBrands = loadable(() => import("./list-brands/pages"), {
    fallback: <Loading />
});

const OneProductCategors = loadable(() => import("./one-product/pages"), {
    fallback: <Loading />
});



const NotFound = loadable(() => import("./not-found"));

export {
    SignIn,
    AdminPanel,
    ProducList,
    ProducCategory,
    ProducBrends,
    CreateItems,
    OneProductCategors,
    ProducListCategory,
    ProductListBrands,
    NotFound
};
