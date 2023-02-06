import { useEffect, useState } from 'react';
import {Route, Routes, useLocation, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RouteList, AuthRouteList} from './app/router';

import 'antd/dist/antd.css';
import './index.css';
import FooterC from './components/common/Footer';
import HeaderC from './components/common/Header';
import Default from "./components/modal/Default";
import Confirm from "./components/modal/Confirm";
import {selectIsLoggedIn, selectModalDefault, selectModalConfirm, setIsLoggedIn} from './app/slice';

import {auth} from "./firebase/Firebase";
import {onAuthStateChanged} from 'firebase/auth';
import {reProfileApi} from "./api/adaptor.api";

import {Layout} from 'antd';
const {Content} = Layout;

const App = () => {
    // Todo router V6 hook
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const modalDefault = useSelector(selectModalDefault);
    const modalConfirm = useSelector(selectModalConfirm);
    const [init, setInit] = useState(false);
    const showCommon = !['/', 'join-detail', 'join-simple'].includes(pathname) && isLoggedIn;

    useEffect(() => {
        // 3. 인증 상태 관찰자 설정 및 사용자 데이터 가져오기
        console.log('onAuthStateChanged');
        onAuthStateChanged(auth, (userInfo) => {
            // console.log("onAuthStateChanged" + user);
            if (userInfo) {
                console.log('logged in');
                // const uid = userInfo?.uid;
                dispatch(setIsLoggedIn(true));
                //
            } else {
                console.log('logged out');
                dispatch(setIsLoggedIn(false));
            }
            // Cloud Firestore - user information get!
            reProfileApi(userInfo?.uid);
            setInit(true);
        });
    }, []);

    return (
        <>
            <Layout style={{minHeight: '100vh'}}>
                <Layout className="site-layout">
                    {init ? (
                        <>
                            {showCommon && <HeaderC/>}
                                <Content style={{height: '628px'}}>
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
                            {showCommon && <FooterC/>}
                        </>
                    ) : null}
                </Layout>
            </Layout>
            {modalDefault.show && <Default />}
            {modalConfirm.show && <Confirm />}
        </>
    );
};

export default App;
