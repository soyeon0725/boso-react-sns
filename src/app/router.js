import Join from '../pages/Join';
import Login from '../pages/Login';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import Setting from '../pages/Setting'

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
        path : '/setting',
        element :  <Setting/>
    },

];

