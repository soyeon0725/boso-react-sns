import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUserInfo} from "../../app/slice";
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

    const userInfo = useSelector(selectUserInfo);
    console.log(userInfo.list?.post);

    const [imageUrl, setImageUrl] = useState(userInfo.photoNum);


    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info) => {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
            // setLoading(false);
            console.log(url)
            setImageUrl(url);
        });
    };

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div style={{overflow: 'auto', height: '550px', padding: '0 60px'}}>
            {userInfo.list?.post.length > 0 ? (
                <>
                    <div style={postUploadBox}>
                        <PlusOutlined style={{marginTop: '75px'}} />
                        <div style={{marginTop: 8}}>
                            Upload
                        </div>
                    </div>
                    {userInfo.list?.post.map((item) => (
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
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>
            )}
        </div>
    )
}
export default PostList;
