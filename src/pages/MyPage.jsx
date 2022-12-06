import {Image, Tabs} from 'antd';
import TextList from "../components/list/TextList";

const MyPage = () => {
    const onChange = (key) => {
        console.log(key);
    };

    // ToDo 리덕스 연동 후, 로그인한 유저 아이디 받아오기

    return (
        <>
            <div>
                <h2>개인 정보 영역</h2>
                <Image
                    width={50}
                    height={50}
                    src={''}
                />
            </div>
            <Tabs
                size='large'
                tabBarGutter={100}
                centered={true}
                defaultActiveKey="1"
                onChange={onChange}
                items={[
                    {
                        label: `전체 포스트`,
                        key: '1',
                        children: `전체 포스트 영역`,
                    },
                    {
                        label: `찜한 포스트`,
                        key: '2',
                        children: <TextList />,
                    },
                    {
                        label: `구매내역`,
                        key: '3',
                        children: <TextList isImg={true} />,
                    },
                    {
                        label: `대시보드`,
                        key: '4',
                        children: `대시보드 영역`,
                    },
                ]}
            />
        </>
    );
}
export default MyPage;
