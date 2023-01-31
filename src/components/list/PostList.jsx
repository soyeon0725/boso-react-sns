import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectUserProfile, setModalDefault} from "../../app/slice";
import {Upload, Button, message} from 'antd';
import {UploadOutlined, PlusOutlined} from "@ant-design/icons";

const PostList = () => {
    useEffect(() => {
        console.log('PostList 컴포넌트');
    }, []);

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
    }

    const dispatch = useDispatch();
    const userProfile = useSelector(selectUserProfile);
    console.log(userProfile.list?.post);

    const UploadPost = () => {
        dispatch(setModalDefault({show: true, type: 'upload-post'}));
    }

    return (
        <div style={{overflow: 'auto', height: '550px', padding: '0 60px'}}>
            {userProfile.list?.post.length > 0 ? (
                <>
                    <div style={postUploadBox} onClick={UploadPost}>
                        <PlusOutlined style={{marginTop: '75px'}} />
                        <div style={{marginTop: 8}}>
                            Upload
                        </div>
                    </div>
                    {userProfile.list?.post.map((item) => (
                        <div style={postBox} key={item.id}>
                           <img
                               style={postImg}
                               key={item.id}
                               src={item.url}
                               alt='마이페이지 포스트 이미지'
                           />
                        </div>
                    ))}
                </>
            ) : (
                <div>
                    <p>첫 포스트를 업로드해보세요.</p>
                    <Upload>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>
            )}
        </div>
    )
}
export default PostList;
