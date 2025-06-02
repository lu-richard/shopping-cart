import Navigation from './Navigation';
import HomePage from './HomePage';
import ShopPage from './ShopPage';
import ErrorPage from './ErrorPage';
import Checkout from './Checkout';

const routes = [
    {
        path: "/",
        element: <Navigation />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "shop", element: <ShopPage /> },
            { path: "checkout", element: <Checkout /> }
        ],
    },
];

export default routes;