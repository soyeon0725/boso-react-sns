import Join from "../pages/Join";
import Login from "../pages/Login";
import Main from "../pages/Main";

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

]

export default RouteList;
