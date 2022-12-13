import {useEffect} from "react";

const Main = () => {

    useEffect(()=> {
        console.log("Main PAGE");
    },[]);

    return (
        <div>Main</div>
    )
}
export default Main;
