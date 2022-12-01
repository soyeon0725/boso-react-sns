import Join from "../pages/Join";
import Login from "../pages/Login";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";

const RouteList = [
    {
        path : '/',
        element :  <Login/>
    },
    {
        path : '/join',
        element :  <Join/>
    },
    {
        path : '/main',
        element :  <Main/>
    },
    {
        path : '/my-page',
        element :  <MyPage/>
    },

]

export default RouteList;
