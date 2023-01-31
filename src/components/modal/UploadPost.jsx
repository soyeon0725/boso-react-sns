import {useState} from 'react';
import {useSelector} from 'react-redux';
import {selectUserProfile} from '../../app/slice';
import {Form, Input, InputNumber, Button, Radio, Upload} from 'antd';
import {CloudUploadOutlined, PlusOutlined} from '@ant-design/icons';
import '../../assets/css/styles.css';
import {uploadPostApi} from "../../api/adaptor.api";

const {TextArea} = Input;

const iconStyle = {
    color: 'rgba(0, 0, 0, 0.25)'
}

const UploadPost = () => {
    console.log('UploadPost 팝업');
    const userProfile = useSelector(selectUserProfile);
    const [cat, setCat] = useState('animal');
    const [value, setValue] = useState(0);
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
            span: 16,
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

    const catChange = e => setCat(e.target.value);

    const changeVal = (value) => setValue(value);

    const onFinish = async (values) => {
        uploadPostApi(values.post);
    };

    // Todo Firebase 용량 초과로 Upload 기능 구현만 목적
    const [fileList, setFileList] = useState([]);

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        console.log(Array.isArray(e));
        if (Array.isArray(e)) {
            console.log(e);
            return e;
        }
        return e?.fileList;
    };

    const handleChange = (info) => {
        //{ fileList: newFileList }
        console.log(info);
        setFileList(info.fileList);
        getBase64(info.file.originFileObj, (url) => {
            // setLoading(false);
            console.log(url);
            setFileList(url);
        });
    };

    // .Todo Firebase 용량 초과로 Upload 기능 구현만 목적

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );


    return (
        <>
            <Form
                {...layout}
                initialValues={{
                    post: {
                        cat: 'animal',
                        price: 0
                    }
                }}
                validateMessages={validateMessages}
                onFinish={onFinish}
            >
                <Form.Item
                    name={['post', 'photo']}
                    label='Photo Preview'
                    // rules={[{required: true}]} // Todo Firebase 용량 초과로 Upload 기능 구현만 목적
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                        listType='picture-card'
                        onChange={handleChange}
                    >
                        {fileList.length > 0 ? null : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item
                    name={['post', 'url']}
                    label='PhotoURL'
                    rules={[{required: true}]}
                >
                    <Input placeholder='이미지 URL을 입력해주세요.' prefix={<CloudUploadOutlined style={iconStyle} />} />
                </Form.Item>
                <Form.Item
                    name={['post', 'cat']}
                    label='Category'
                    rules={[{required: true}]}
                    onChange={catChange}
                >
                    <Radio.Group>
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
                            name={['post', "title"]}
                            label='Title'
                            rules={[{required: true}]}
                        >
                            <Input placeholder='제목을 입력해주세요.' />
                        </Form.Item>
                        <Form.Item
                            name={['post', 'price']}
                            label='Price'
                            rules={[{required: true}]}
                        >
                            <InputNumber
                                style={{width: '200px'}}
                                prefix='₩'
                                min={0}
                                max={100000000}
                                onChange={changeVal}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            />
                        </Form.Item>
                        <Form.Item
                            name={['post', 'description']}
                            label='Description'
                            rules={[{required: true}]}
                        >
                            <TextArea rows={4} placeholder="maxLength is 100" maxLength={100} />
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
