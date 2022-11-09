import React from 'react';
import {Layout} from "antd";

const { Header } = Layout;

function HeaderC(props) {
    return (
        <Header
            className="site-layout-background"
            style={{
                padding: 0,
                backgroundColor : "#001529"
            }}
        />

    );
}

export default HeaderC;
