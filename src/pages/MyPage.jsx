import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectPersonalInfo} from "../app/slice";

import {Button, Image, Tabs, List, Avatar, Space} from 'antd';

import TextList from "../components/list/TextList";
import Confirm from "../modal/Confirm";

const MyPage = () => {
    const personalInfo = useSelector(selectPersonalInfo);
    const [confirmModal, setConfirmModal] = useState({show: false, type: ''});

    useEffect(()=> {
        console.log("MyPage PAGE");
    },[]);

    const editProfile = () => setConfirmModal({show: true, type: 'edit-profile'});

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <>
            <div style={{display: 'flex', marginTop: 20, marginLeft: 20}}>
                <Avatar
                    style={{verticalAlign: 'middle'}}
                    size={100}
                    gap={4}
                    src={personalInfo.photoUrl}
                />
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 20}}>
                    <span>{`Name : ${personalInfo.name}`}</span>
                    <span>{`Email : ${personalInfo.email}`}</span>
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
            {confirmModal.show && <Confirm confirmModal={confirmModal} setConfirmModal={setConfirmModal} />}
        </>
    );
}
export default MyPage;
