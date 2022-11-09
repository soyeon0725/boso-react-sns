import React from 'react';
// import FooterC from "./components/Footer";
// import HeaderC from "./components/Header";
import 'antd/dist/antd.css';
import './index.css';
import { Layout} from 'antd';
import {Route, Routes} from "react-router-dom";
import RouteList from "./app/router";


const {Content} = Layout;

const App = () => {
    return (
        <>
            <Layout style={{minHeight: '100vh'}}>
                <Layout className="site-layout">
                    {/*<HeaderC/>*/}
                    <Content>
                        <Routes>
                            {
                                RouteList.map((item, index) => (
                                    <Route key={index} {...item} />
                                ))
                            }
                        </Routes>
                    </Content>
                    {/*<FooterC/>*/}
                </Layout>
            </Layout>
        </>
    );
};

export default App;
