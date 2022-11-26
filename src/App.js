import React from 'react';
import FooterC from "./components/Footer";
import HeaderC from "./components/Header";
import 'antd/dist/antd.css';
import './index.css';
import { Layout} from 'antd';
import {Route, Routes} from "react-router-dom";
import RouteList from "./app/router";


const {Content} = Layout;

const App = () => {
    // Todo router V6 hook 을 이용하는 방법으로 수정해보기
    const currentPath = window.location.pathname === '/' || window.location.pathname === '/join';
    return (
        <>
            <Layout style={{minHeight: '100vh'}}>
                <Layout className="site-layout">
                    {!currentPath && <HeaderC/>}
                    <Content>
                        <Routes>
                            {
                                RouteList.map((item, index) => (
                                    <Route key={index} {...item} />
                                ))
                            }
                        </Routes>
                    </Content>
                    {!currentPath && <FooterC/>}
                </Layout>
            </Layout>
        </>
    );
};

export default App;
