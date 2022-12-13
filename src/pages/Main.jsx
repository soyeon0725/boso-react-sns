import {useEffect} from "react";

const Main = () => {

    // 홈 화면 진입
    useEffect(()=> {
        console.log("Main PAGE");
    },[]);

    return (
        <div>Main</div>
    )
}
export default Main;
