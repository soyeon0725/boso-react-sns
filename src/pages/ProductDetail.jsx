import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Divider, InputNumber} from 'antd';
import {ShoppingCartOutlined, PayCircleOutlined} from '@ant-design/icons';
import {getAdDetailApi} from '../api/adaptor.api';
import {comma} from '../utils/utilCommon';

const ProductDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [adData, setAdData] = useState({});
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    console.log(params.id);

    useEffect(() => {
        console.log('상품 상세 화면');
    }, []);

    useEffect(() => {
        getAdDetailApi(params.id, (error, data) => {
            if (data) {
                console.log('getAdDetailApi data !!!!!!!!!!!!!!!!!!!!');
                setAdData(data);
                setLoading(true);
            } else {
                console.log(error);
            }

        }).then(() => {});
    }, []);

    const onChange = value => setCount(value);

    return (
        loading ? (
            <div
                style={{
                    // border: '1px solid red',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    height: 'auto',
                    padding: 20
                }}
            >
                <div >
                    <img
                        width='450px'
                        height='auto'
                        src={adData.url}
                        alt='상품 이미지'
                    />
                </div>
                <div
                    style={{
                        paddingTop: 10,
                        marginLeft: 20,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <h2>{adData.ad?.title}</h2>
                    <span style={{paddingLeft: 10, fontSize: '24px'}}><b>{`₩ ${comma(adData.ad?.price)}`}</b></span>
                    <Divider />
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#fff',
                            width: '540px',
                            padding: 10
                        }}
                    >
                        <InputNumber
                            defaultValue={1}
                            min={1}
                            max={adData.ad?.stock}
                            onChange={onChange}
                        />
                        <span style={{color: 'red', fontSize: '16px', fontWeight: 'bold'}}>{`₩ ${comma(adData.ad?.price * count)}`}</span>
                        <div
                            style={{


                            }}
                        >
                            <Button
                                style={{
                                    display: 'inline-flex',
                                    borderRadius: '20px',
                                    flexDirection: 'row-reverse',
                                    alignItems: 'center'
                                }}
                                // shape='circle'
                                icon={<ShoppingCartOutlined style={{marginLeft: 5}} />}
                                onClick={() => navigate('/cart')}
                            >장바구니 담기</Button>
                            <Button
                                style={{
                                    marginLeft: 10,
                                    borderRadius: '20px',
                                    // display: 'inline-flex',
                                    // flexDirection: 'row-reverse',
                                    // alignItems: 'center'
                                }}
                                type='primary'
                                // icon={<PayCircleOutlined style={{marginLeft: 5}} onClick={() => navigate('/cart')} />}
                            >바로 구매하기</Button>
                        </div>
                    </div>
                    <Divider />
                    <span
                        style={{
                            width: '500px',
                            // backgroundColor: '#fff',
                            padding: 10,
                        }}
                        dangerouslySetInnerHTML={{__html: adData.ad?.description}}
                    />
                </div>
            </div>
        ) : (
            <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>로딩 중입니다.</h2>
        )
    )
}
export default ProductDetail;
