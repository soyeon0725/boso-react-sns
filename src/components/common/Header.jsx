import {useNavigate, Link} from 'react-router-dom';
import {Layout, Space, Button} from 'antd';
import {UserOutlined, ShoppingCartOutlined, SettingOutlined, LogoutOutlined} from '@ant-design/icons';
import {auth} from '../../firebase/Firebase';
import {signOut} from 'firebase/auth';

const { Header } = Layout;

const headerWrap = {
    backgroundColor : '#001529',
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'baseline',
    padding: '0 20px',
};

const logoStyle = {
    letterSpacing: '5px',
    color: '#fff',
    fontSize: '24px'
}

const logoHeartStyle = {
    fontSize: '20px'
}

const iconStyle = {
    color: '#fff',
    fontSize: '24px'
}

function HeaderC(props) {
    const navigate = useNavigate();

    return (
        <Header className='header-custom' style={headerWrap}>
            <h1 className='header-logo' style={{height: '100%', marginBottom: 0}}>
                <Link to='/main' style={logoStyle}>
                    B
                    <span style={logoHeartStyle}>🤍</span>
                    S
                    <span style={logoHeartStyle}>🤍</span>
                </Link>
            </h1>
            <Space style={{height: '100%', lineHeight: '68px'}} wrap>
                <Button
                    type='text'
                    icon={<ShoppingCartOutlined style={iconStyle} />}
                    onClick={() => navigate('/cart')}
                />
                <Button
                    type='text'
                    icon={<UserOutlined style={iconStyle} />}
                    onClick={() => navigate('/my')}
                />
                <Button
                    type='text'
                    icon={<SettingOutlined style={iconStyle} />}
                    onClick={() => navigate('/setting')}
                />
                <Button
                    type='text'
                    icon={<LogoutOutlined  style={iconStyle} />}
                    onClick={() => signOut(auth)
                        .then(() => console.log('signOut 성공'))
                        .catch(() => console.log('signOut 에러'))}
                />
            </Space>
        </Header>
    );
}

export default HeaderC;
