import { Tabs } from 'antd';
import TextList from "../components/list/TextList";

const MyPage = () => {
    const onChange = (key) => {
        console.log(key);
    };
    return (
        <Tabs
            size='large'
            tabBarGutter={200}
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
    );
}
export default MyPage;
