import Join from '../pages/Join';
import Login from '../pages/Login';
import Main from '../pages/Main';
import My from '../pages/My';
import Setting from '../pages/Setting'
import Cart from '../pages/Cart';
import ProductDetail from '../pages/ProductDetail';

const RouteList = [
    {
        path : '/',
        element :  <Login/>
    },
    {
        path : '/join/:type',
        element :  <Join/>
    },
];

const AuthRouteList = [
    {
        path : '/main',
        element :  <Main/>
    },
    {
        path : '/my',
        element :  <My/>
    },
    {
        path : '/setting',
        element :  <Setting/>
    },
    {
        path : '/cart',
        element :  <Cart/>
    },
    {
        path : '/product-detail/:id',
        element :  <ProductDetail/>
    },
];

export {RouteList, AuthRouteList};

