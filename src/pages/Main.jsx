import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getPostApi} from '../api/adaptor.api';
import {Button, message, Upload} from 'antd';
import {HeartOutlined, LikeOutlined, DislikeOutlined, ReadOutlined, UploadOutlined} from '@ant-design/icons';
import {useSelector, useDispatch} from 'react-redux';
import {selectImageList, setModalDefault} from '../app/slice';
import UploadPost from "../components/modal/UploadPost";

const contentWrapStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginTop: '20px',
    textAlign: 'center'
};

const contentStyle = {
    position : 'relative',
    height: '500px',
    // backgroundColor : '#fefefe',
    // borderRadius: '1em',
    // overflow: 'hidden',
    // textAlign: 'center',
};

const imageStyle = {
    width : '80%',
    height : '90%',
    objectFit:'cover',
    borderRadius: '20px',
};

const buttonStyle = {
    marginLeft : '3%',
    fontSize : '20px'
};

const adIconStyle = {
    width : '25px',
    height : '25px',
    position: 'absolute',
    margin: '30px'
};

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageList = useSelector(selectImageList);
    const [loading, setLoading] = useState(false);

    // 홈 화면 진입
    useEffect(()=> {
        console.log('메인 화면');
        getPostApi({}, (error, data) => data
            ? setLoading(true)
            : console.log(error))
            .then(() => {});
    },[]);

    const UploadPost = () => {
        dispatch(setModalDefault({show: true, type: 'upload-post'}));
    }

    return (
        loading ? (
            <div style={{height: '100%', overflow: 'auto'}}>
                {
                    imageList?.length === 0 ? '포스트를 공유해주세요.' : (
                        <div style={{...contentWrapStyle}}>
                            {imageList?.map((item, index) => (
                                <div key={index} style={contentStyle}>
                                    <img
                                        className={item.cat === 'advertisement' ? 'image_list' : ''}
                                        key={index}
                                        style={imageStyle}
                                        src={item.url}
                                        alt='메인페이지 포스트 이미지'
                                        onClick={() =>
                                            item.cat === 'advertisement' && navigate(`/product-detail/${item.id}`)
                                        }
                                    />
                                    <div style={{display: 'flex', marginTop: '10px', paddingLeft: '10%'}}>
                                        <Button
                                            size='large'
                                            shape='circle'
                                            icon={<HeartOutlined />}
                                        />
                                        <Button
                                            style={{marginLeft: '2%'}}
                                            size='large'
                                            shape='circle'
                                            icon={<LikeOutlined />}
                                        />
                                        <Button
                                            style={{marginLeft: '2%'}}
                                            size='large'
                                            shape='circle'
                                            icon={<DislikeOutlined />}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
        ) : (
            <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>로딩 중입니다.</h2>
        )

    )
}

export default Main;
