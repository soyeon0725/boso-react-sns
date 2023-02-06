import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {selectUserProfile, setModalDefault} from '../../app/slice';
import {Upload, Button, message} from 'antd';
import {UploadOutlined, PlusOutlined} from '@ant-design/icons';

const contentStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 3fr)',
    gap: '20px',
    height: '390px',
    margin: '20px',
    overflow: 'auto'
};

const uploadStyle = {
    position : 'relative',
    width: '100%',
    height: '170px',
    backgroundColor : '#fefefe',
    borderRadius: '1em',
    overflow: 'hidden',
    textAlign: 'center',
};

const imageStyle = {
    width:'100%',
    height:'170px',
    objectFit:'cover'
};

const adIconStyle = {
    width : '25px',
    height : '25px',
    position: 'absolute',
    margin: '10px'
};

const PostList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userProfile = useSelector(selectUserProfile);
    console.log(userProfile.list?.post);

    useEffect(() => {
        console.log('PostList 컴포넌트');
    }, []);

    const uploadPost = () => dispatch(setModalDefault({show: true, type: 'upload-post'}));

    return (
        <div>
            {userProfile.list?.post.length === 0 ? (
                <div style={{textAlign:'center', fontSize: '15px', marginTop: '100px'}}>
                    <p>첫 포스트를 업로드해보세요.</p>
                    <div onClick={uploadPost}>
                        <Button icon={<UploadOutlined />}>UPLOAD</Button>
                    </div>
                </div>
            ) : (
                <>
                    <div style={contentStyle}>
                        <div className='upload_btn' style={uploadStyle} onClick={uploadPost}>
                            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <PlusOutlined />
                                <div style={{marginTop: 8}}>UPLOAD</div>
                            </div>
                        </div>
                        {userProfile.list?.post.map((item, index) => (
                            <div key={index} style={uploadStyle}>
                                <img
                                    className={item.cat === 'advertisement' ? 'image_list' : ''}
                                    key={index}
                                    style={imageStyle}
                                    src={item.url}
                                    alt='마이페이지 포스트 이미지'
                                    onClick={() =>
                                        item.cat === 'advertisement' && navigate(`/product-detail/${item.id}`)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
export default PostList;
