import { useEffect, useState } from 'react';
import {
    Route,
    Routes,
    useLocation,
    Navigate,
} from 'react-router-dom';
import {RouteList, AuthRouteList} from './app/router';

import {useDispatch, useSelector} from 'react-redux';
import {selectIsLoggedIn, setIsLoggedIn, setUserInfo} from './app/slice';
import { Layout } from 'antd';

import FooterC from './components/common/Footer';
import HeaderC from './components/common/Header';

import 'antd/dist/antd.css';
import './index.css';

// firebase 이메일 & 비밀번호 로그인 연동
import {firestore} from "./firebase/Firebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const App = () => {
    const { Content } = Layout;
    // Todo router V6 hook
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [init, setInit] = useState(false);

    const commonLayout = pathname === '/' || pathname === '/join';

    useEffect(() => {
        const auth = getAuth();
        // 3. 인증 상태 관찰자 설정 및 사용자 데이터 가져오기
        onAuthStateChanged(auth, (user) => {
            console.log("onAuthStateChanged")
            if (user) {
                // User is signed in, see docs for a list of available properties
                const uid = user.uid;
                console.log(uid);
                console.log("isLoggedIn ⭕");
                dispatch(setIsLoggedIn(true));
            } else {
                // User is signed out
                console.log("isLoggedIn ❌");
                dispatch(setIsLoggedIn(false));
            }
            console.log('uid ============');
            console.log(user?.uid);
            // Cloud Firestore userCollection get!
            const userStore = firestore.collection("user");
            userStore.doc(user?.uid).get().then((doc) => {
                console.log(doc.data());
                dispatch(setUserInfo({
                    name: doc.data()?.name,
                    email: doc.data()?.email,
                    photoUrl: doc.data()?.photoUrl
                }))
            });
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
