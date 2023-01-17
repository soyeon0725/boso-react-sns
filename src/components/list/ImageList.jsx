import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUserInfo} from "../../app/slice";
import {Upload, Button, message} from 'antd';
import {UploadOutlined, PlusOutlined} from "@ant-design/icons";

const ImageList = () => {
    useEffect(() => {
        console.log('ImageList 컴포넌트');
    }, []);
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
        <div style={{border: '1px solid red', height: '550px', padding: '0 60px'}}>
            {userInfo.list?.post.length > 0 ? (
                <>
                    <div style={{height: '200px'}}>
                        <div style={{background: 'tomato', display: 'inline-block', width: '23%', height: '100%', margin: '10px', overflow: 'hidden', textAlign: 'center'}}>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                        {userInfo.list?.post.map((item) => (
                            <div style={{display: 'inline-block', width: '23%', height: '100%', margin: '10px', overflow: 'hidden'}} key={item.id}>
                               <img style={{width: '100%', height: '100%', overflow: 'hidden', objectFit: 'cover'}} key={item.id} src={item.url} alt='마이 포스트 이미지'/>
                            </div>

                        ))}
                    </div>
                </>
            ) : (
                <div>
                    {/*<Upload*/}
                    {/*    name="avatar"*/}
                    {/*    listType="picture-card"*/}
                    {/*    className="avatar-uploader"*/}
                    {/*    showUploadList={false}*/}
                    {/*    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"*/}
                    {/*    beforeUpload={beforeUpload}*/}
                    {/*    onChange={handleChange}*/}
                    {/*>*/}
                    {/*    <div>업로드</div>*/}
                    {/*</Upload>*/}
                    <div>
                        <p>첫 포스트를 업로드해보세요.</p>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </div>
                </div>
            )}
        </div>
    )
}
export default ImageList;
