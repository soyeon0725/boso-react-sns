import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserProfile, setModalDefault} from '../app/slice';

import { Button, Tabs, Avatar } from 'antd';
import PurchaseList from '../components/list/PurchaseList';
import PostList from '../components/list/PostList';

const My = () => {
    const dispatch = useDispatch();
    const userProfile = useSelector(selectUserProfile);

    // 마이페이지 진입
    useEffect(()=> {
        console.log("마이페이지");
    },[]);

    const editProfile = () => dispatch(setModalDefault({show: true, type: 'edit-profile'}));

    return (
        <>
            <div style={{display: 'flex'}}>
                <Avatar
                    style={{margin : '20px'}}
                    size={100}
                    // gap={4}
                    src={require(`../assets/images/photo_${userProfile.photoNum || '0'}.png`)}
                />
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <span>{`Name : ${userProfile.name}`}</span>
                    <span>{`Email : ${userProfile.email}`}</span>
                    <Button style={{marginTop : '8px', borderRadius: '20px'}} type='primary' onClick={editProfile}>프로필 편집</Button>
                </div>
            </div>
            <Tabs
                size='large'
                tabBarGutter={100}
                defaultActiveKey='1'
                centered
                items={[
                    {
                        label: `전체 포스트`,
                        key: '1',
                        children: <PostList />,
                    },
                    {
                        label: `찜한 포스트`,
                        key: '2',
                        children: <PurchaseList />,
                    },
                    {
                        label: `구매내역`,
                        key: '3',
                        children: <PurchaseList showImg />,
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
export default My;
