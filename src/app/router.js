import Join from "../pages/Join";
import Login from "../pages/Login";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";

export const RouteList = [
    {
        path : '/',
        element :  <Login/>
    },
    {
        path : '/join',
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

];

