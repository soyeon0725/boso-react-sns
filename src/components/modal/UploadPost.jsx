import {useState} from 'react';
import {Form, Input, InputNumber, Button, Radio, Upload, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {uploadPostApi} from "../../api/adaptor.api";
import {comma} from "../../utils/utilCommon";

const {TextArea} = Input;

const UploadPost = () => {
    console.log('UploadPost 팝업');
    const [cat, setCat] = useState('animal');
    const [imageUrl, setImageUrl] = useState('');
    let catArray = [
        {ko: '동물', en: 'animal'},
        {ko: '인물', en: 'person'},
        {ko: '음식', en: 'food'},
        {ko: '풍경', en: 'view'},
        {ko: '광고', en: 'advertisement'}
    ];

    // antd layout object
    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 20,
        },
    };
    // antd validateMessages object
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        }
    };

    const onChangeURL = e => setImageUrl(e.target.value);
    const onChangeCat = e => setCat(e.target.value);

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        const ad = values.ad;
        let postData = {
            id: Math.random().toString(36).substring(2, 17),
            cat: values.post.cat,
            url: values.post.url
        };
        console.log(Math.random().toString(36).substring(2, 17));
        if (values.post.cat === 'advertisement') postData = {...postData, ad};
        uploadPostApi(postData);
    };

    // Todo Firebase 용량 초과로 Upload 기능 구현만 (현재 미사용)
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        console.log('What is the file type ?', isJpgOrPng);
        console.log('Less than 2MB ? ', isLessThan2MB);
        const isLessThan2MB = file.size < (1024 * 1024 * 2); // 2MB
        // const isLt2M = file.size / 1024 / 1024 < 2; // 위와 같은 식
        if (!isJpgOrPng) message.error('You can only upload JPG/PNG file !');
        if (!isLessThan2MB) message.error('Image must smaller than 2MB !');
        return isJpgOrPng && isLessThan2MB;
    }

    const handleChange = (info) => {
        console.log(info);
        getBase64(info.file.originFileObj, (url) => {
            // setLoading(false);
            setImageUrl(url);
        });
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    // .Todo Firebase 용량 초과로 Upload 기능 구현만 (현재 미사용 처리하기)

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{marginTop: 8}}>UPLOAD</div>
        </div>
    );

    return (
        <>
            <Form
                {...layout}
                initialValues={{
                    post: {
                        cat: 'animal'
                    }
                }}
                validateMessages={validateMessages}
                onFinish={onFinish}
            >
                <Form.Item
                    name={['post', 'photo']}
                    label='Photo Preview'
                    // rules={[{required: true}]}
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                >
                    <Upload
                        name='avatar'
                        listType='picture-card'
                        className='avatar-uploader'
                        // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                        beforeUpload={beforeUpload} // ?
                        onChange={handleChange}
                        showUploadList={false} // Firebase 데이터 용량 초과로 Upload 기능 구현만
                        disabled={true} // Firebase 데이터 용량 초과로 Upload 기능 구현만 (disabled)
                    >
                        {/*{fileList.length > 0 ? null : uploadButton}*/}
                        {imageUrl === '' ? (
                            <img
                                width='100%'
                                height='100%'
                                src={'https://www.dummyimage.com/305x305/f7f7f7/aba8ab.png&text=+Preview'}
                                alt='미리보기 이미지'
                            />
                        ) : (
                            <img
                                width='100%'
                                height='100%'
                                src={imageUrl}
                                alt='포스트 이미지 미리보기'
                                onError={e => e.target.src = 'https://www.dummyimage.com/305x305/f7f7f7/aba8ab.png&text=+Preview'}
                            />
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item
                    name={['post', 'url']}
                    label='PhotoURL'
                    rules={[{required: true}]}
                    onChange={onChangeURL}
                >
                    <Input style={{width : '300px'}} placeholder='이미지 URL을 입력해주세요.' />
                </Form.Item>
                <Form.Item
                    name={['post', 'cat']}
                    label='Category'
                    rules={[{required: true}]}

                >
                    <Radio.Group onChange={onChangeCat} value={cat}>
                        {
                            catArray.map((item, index) => (
                                <Radio key={index} value={item.en}>{item.ko}</Radio>
                            ))
                        }
                    </Radio.Group>
                </Form.Item>
                {cat === 'advertisement' && (
                    <>
                        <Form.Item
                            name={['ad', 'title']}
                            label='Title'
                            rules={[{required: true}]}
                        >
                            <Input style={{width : '300px'}} placeholder='상품명을 입력해주세요.' />
                        </Form.Item>
                        <Form.Item
                            name={['ad', 'price']}
                            label='Price'
                            rules={[{required: true}]}
                        >
                            <InputNumber
                                style={{width : '300px'}}
                                prefix='₩'
                                placeholder='상품 금액을 입력해주세요.'
                                min={0}
                                max={100000000}
                                formatter={value => comma(value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name={['ad', 'stock']}
                            label='Stock'
                            rules={[{required: true}]}
                        >
                            <InputNumber
                                style={{width : '300px'}}
                                min={1}
                                placeholder='상품 재고를 입력해주세요.'
                            />
                        </Form.Item>
                        <Form.Item
                            name={['ad', 'description']}
                            label='Description'
                            rules={[{required: true}]}
                        >
                            <TextArea
                                style={{width : '300px'}}
                                rows={4}
                                placeholder='상품 설명을 입력해주세요.'
                                // maxLength={100}
                            />
                        </Form.Item>
                    </>
                )}
                <Form.Item
                    name='submit'
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 6
                    }}
                >
                    <Button type='primary' htmlType='submit'>
                        Upload
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default UploadPost;
