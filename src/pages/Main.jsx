import {useEffect, useState} from "react";
import {getPostApi} from "../api/adaptor.api";
import {PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {Button, message, Upload} from "antd";
import {useSelector} from "react-redux";
import {selectImageList} from "../app/slice";

const Main = () => {
    // 홈 화면 진입
    useEffect(()=> {
        console.log("메인페이지");
        getPostApi();
    },[]);

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

    const imageList = useSelector(selectImageList);
    console.log(imageList);

    const [imageUrl, setImageUrl] = useState(imageList?.url);


    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'images/jpeg' || file.type === 'images/png';
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
                            />
                        </div>

                    ))}
                </>
            ) : (
                <div>
                    <p>포스트를 공유해주세요.</p>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>
            )}
        </div>
    )
}
export default Main;
