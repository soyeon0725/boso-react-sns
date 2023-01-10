import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    selectIsLoggedIn,
    selectDefaultModal,
    selectConfirmModal,
    setIsLoggedIn,
    setUserInfo,
} from './app/slice';
import {
    Route,
    Routes,
    useLocation,
    Navigate,
} from 'react-router-dom';
import {RouteList, AuthRouteList} from './app/router';

// firebase
import {firestore, auth} from "./firebase/Firebase";
import { onAuthStateChanged } from 'firebase/auth';

import { Layout } from 'antd';

import FooterC from './components/common/Footer';
import HeaderC from './components/common/Header';
import Default from "./modal/Default";
import Confirm from "./modal/Confirm";

import 'antd/dist/antd.css';
import './index.css';

const App = () => {
    const { Content } = Layout;
    // Todo router V6 hook
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const defaultModal = useSelector(selectDefaultModal);
    const confirmModal = useSelector(selectConfirmModal);
    const [init, setInit] = useState(false);

    const commonLayout = pathname === '/' || pathname === '/join' || pathname === '/join/detail' || pathname === '/join/simple';

    useEffect(() => {
        // 3. 인증 상태 관찰자 설정 및 사용자 데이터 가져오기
        onAuthStateChanged(auth, (user) => {
            // console.log("onAuthStateChanged" + user);
            if (user) {
                // console.log(user)
                // User is signed in, see docs for a list of available properties
                const uid = user.uid;
                console.log("isLoggedIn ⭕" + uid);
                dispatch(setIsLoggedIn(true));
                //
            } else {
                // User is signed out
                console.log("isLoggedIn ❌");
                dispatch(setIsLoggedIn(false));
            }
            // Cloud Firestore userCollection get!
            const userStore = firestore.collection("user");
            userStore.doc(user?.uid).get().then((doc) => {
                // console.log(doc.data());
                dispatch(setUserInfo({
                    name: doc.data()?.name,
                    email: doc.data()?.email,
                    birth: doc.data()?.birth,
                    phone: doc.data()?.phone,
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
            {defaultModal.show && <Default />}
            {confirmModal.show && <Confirm />}
        </>
    );
};

export default App;
