import { useEffect } from 'react';
import {useParams} from "react-router-dom";

import Detail from '../components/join/Detail';
import Simple from '../components/join/Simple';

const Join = () => {
    const params = useParams();
    const joinType = params.type;

    // 회원가입 화면 진입
    useEffect(()=> {
        console.log("Join PAGE");
    },[]);

    return (
        <>
            {joinType === 'detail' ? <Detail/> : joinType === 'simple' ? <Simple /> : null}
        </>
    )
}
export default Join;
