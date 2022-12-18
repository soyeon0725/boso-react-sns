import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {selectUserInfo} from '../app/slice';

import { Button, Tabs, Avatar } from 'antd';

import TextList from '../components/list/TextList';
import EditProfile from "../modal/EditProfile";

const MyPage = () => {
    const userInfo = useSelector(selectUserInfo);
    const [editProfileModal, setEditProfileModal] = useState({
        show: false,
        type: ''
    });

    // 마이페이지 진입
    useEffect(()=> {
        console.log("MyPage PAGE");
    },[]);

    // Todo EditProfile Modal 생성 후 연동하기
    const editProfile = () => setEditProfileModal({show: true, type: 'edit-profile'});

    const onChange = (key) => {
        console.log(key);
    };

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
                    <Button onClick={editProfile}>
                        프로필 편집
                    </Button>
                </div>
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
            {editProfileModal.show && <EditProfile editProfile={editProfileModal} setEditProfile={setEditProfileModal} />}
        </>
    );
}
export default MyPage;
