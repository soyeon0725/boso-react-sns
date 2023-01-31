import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getPostApi} from '../api/adaptor.api';
import {Button, message, Upload} from 'antd';
import {PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import {selectImageList} from '../app/slice';

const postUploadBox = {
    display: 'inline-block',
    width: '23%',
    height: '200px',
    margin: '10px',
    backgroundColor: '#fafafa',
    border: '1px dashed #d9d9d9',
    overflow: 'hidden',
    textAlign: 'center'
};

const postBox = {
    display: 'inline-block',
    width: '23%',
    height: '200px',
    margin: '10px',
    overflow: 'hidden'
};

const postImg = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
};

const Main = () => {
    const navigate = useNavigate();
    const imageList = useSelector(selectImageList);

    // 홈 화면 진입
    useEffect(()=> {
        console.log('메인 화면');
        getPostApi();
    },[]);

    return (
        <div style={{overflow: 'auto', height: '550px', padding: '60px 60px 0 60px'}}>
            {imageList?.length > 0 ? (
                <>
                    <div style={postUploadBox}>
                        <PlusOutlined style={{marginTop: '75px'}} />
                        <div
                            style={{
                                marginTop: 8,
                            }}
                        >
                            Upload
                        </div>
                    </div>
                    {imageList?.map((item) => (
                        <div style={postBox} key={item.id}>
                            <img

                                style={postImg}
                                key={item.id}
                                src={item.url}
                                alt='메인페이지 포스트 이미지'
                                onClick={() => {
                                    item.cat === 'advertisement' && navigate(`/product-detail/${item.id}`)
                                }}
                            />
                            <div>{item.cat}</div>
                        </div>
                    ))}
                </>
            ) : (
                <div>
                    <p>포스트를 공유해주세요.</p>
                    <Upload>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>
            )}
        </div>
    )
}

export default Main;
