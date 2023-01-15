import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserInfo, setDefaultModal} from '../app/slice';

import { Button, Tabs, Avatar } from 'antd';
import TextList from '../components/list/TextList';
import ImageList from '../components/list/ImageList';

const MyPage = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);

    // 마이페이지 진입
    useEffect(()=> {
        console.log("MyPage PAGE");
    },[]);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    marginTop: 20,
                    marginLeft: 20
                }}
            >
                <Avatar
                    style={{ verticalAlign: 'middle' }}
                    size={100}
                    gap={4}
                    src={userInfo.photoUrl}
                />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: 20
                    }}
                >
                    <span>{`Name : ${userInfo.name}`}</span>
                    <span>{`Email : ${userInfo.email}`}</span>
                    <Button onClick={() => dispatch(setDefaultModal({show: true, type: 'edit-profile'}))}>
                        프로필 편집
                    </Button>
                </div>
            </div>
            <Tabs
                size='large'
                tabBarGutter={100}
                defaultActiveKey="1"
                centered
                items={[
                    {
                        label: `전체 포스트`,
                        key: '1',
                        children: <ImageList />,
                    },
                    {
                        label: `찜한 포스트`,
                        key: '2',
                        children: <TextList />,
                    },
                    {
                        label: `구매내역`,
                        key: '3',
                        children: <TextList isImg />,
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
