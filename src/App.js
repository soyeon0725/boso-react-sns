import {useEffect, useState} from 'react';
import FooterC from "./components/common/Footer";
import HeaderC from "./components/common/Header";
import 'antd/dist/antd.css';
import './index.css';
import { Layout} from 'antd';
import {Route, Routes, useLocation, redirect, useNavigate, Navigate} from "react-router-dom";
import {RouteList, AuthRouteList} from "./app/router";
import {useDispatch, useSelector} from "react-redux";
import {selectIsLoggedIn, setIsLoggedIn} from "./app/slice";

// firebase 이메일 & 비밀번호 로그인 연동
import {getAuth, onAuthStateChanged} from "firebase/auth";

const {Content} = Layout;

const App = () => {
    // Todo router V6 hook 을 이용하는 방법으로 수정해보기
    const { pathname } = useLocation();
    const commonLayout = pathname === '/' || pathname === '/join';
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [init, setInit] = useState(false);

    const loader = () => {
        return redirect("/");
    };

    useEffect(() => {
        const auth = getAuth();
        // 3. 인증 상태 관찰자 설정 및 사용자 데이터 가져오기
        onAuthStateChanged(auth, (user) => {
            console.log("onAuthStateChanged")
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log("로그인 상태");
                dispatch(setIsLoggedIn(true));
                // navigate('/main');
            } else {
                // User is signed out
                console.log("로그아웃 상태");
                dispatch(setIsLoggedIn(false));
                // navigate('/', {replace : true});
            }
            setInit(true);
        });

    }, []);

    return (
        <>
            <Layout style={{minHeight: '100vh'}}>
                <Layout className="site-layout">
                    {init ? (
                        <>
                            {!commonLayout && <HeaderC/>}
                                <Content>
                                    <Routes>
                                        {isLoggedIn ? (
                                            <>
                                                {
                                                    AuthRouteList.map((item, index) => (
                                                        <Route key={index} {...item} />
                                                    ))
                                                }
                                                <Route path='*' element={<Navigate replace to='/main' />} />
                                            </>
                                        ) : (
                                            <>
                                                {
                                                    RouteList.map((item, index) => (
                                                        <Route key={index} {...item} />
                                                    ))
                                                }
                                                <Route path='*' element={<Navigate replace to='/' />} />
                                            </>
                                        )}
                                    </Routes>
                                </Content>
                            {!commonLayout && <FooterC/>}
                        </>
                    ) : null}
                </Layout>
            </Layout>
        </>
    );
};

export default App;
