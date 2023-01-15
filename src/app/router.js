import Join from '../pages/Join';
import Login from '../pages/Login';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import Settings from '../pages/Settings'
import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";

export const RouteList = [
    {
        path : '/',
        element :  <Login/>
    },
    {
        path : '/join/:type',
        element :  <Join/>
    },
];

export const AuthRouteList = [
    {
        path : '/main',
        element :  <Main/>
    },
    {
        path : '/my-page',
        element :  <MyPage/>
    },
    {
        path : '/settings',
        element :  <Settings/>
    },
    {
        path : '/cart',
        element :  <Cart/>
    },
    {
        path : '/product-detail',
        element :  <ProductDetail/>
    },
];

