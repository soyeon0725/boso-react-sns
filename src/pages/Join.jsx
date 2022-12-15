import { useEffect } from 'react';
import { useLocation } from "react-router-dom";

import Basic from '../components/join/Basic';
import Simple from '../components/join/Simple';

const Join = () => {
    const location = useLocation();
    const joinType = location.state.join;

    // 회원가입 화면 진입
    useEffect(()=> {
        console.log("Join PAGE");
    },[]);

    return (
        <>
            {joinType === 'basic' ? <Basic /> : <Simple />}
        </>
    )
}
export default Join;
