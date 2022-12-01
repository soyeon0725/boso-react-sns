import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { UserOutlined, ShoppingCartOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Space, Button } from "antd";

const { Header } = Layout;

function HeaderC(props) {
    const navigate = useNavigate();

    return (
        <Header
            style={{
                backgroundColor : "#314152",
                display: "flex",
                justifyContent: "space-between",
                padding: "0 20px"
            }}
        >
            <div className="header-logo">
                <a href="/main" style={{letterSpacing: '5px', color: '#fff', fontSize: '24px'}}>
                    B<span style={{fontSize: '16px'}}>🤍</span>S<span style={{fontSize: '16px'}}>🤍</span>
                </a>
            </div>
            <div className="header-icon">
                <Space>
                    <Space wrap>
                        <Button
                            type="text"
                            icon={<SettingOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                        />
                        <Button
                            type="text"
                            icon={<UserOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                            onClick={() => navigate('/my-page')}
                        />
                        <Button
                            type="text"
                            icon={<ShoppingCartOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                        />
                    </Space>
                </Space>
            </div>
        </Header>
    );
}

export default HeaderC;
