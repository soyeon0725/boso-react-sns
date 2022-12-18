import { useSelector } from 'react-redux';
import { selectUserInfo } from '../app/slice';

import {Avatar, Button, Form, Input, Modal} from 'antd';

const EditProfile = (props) => {
    console.log('EditProfile 팝업');
    const userInfo = useSelector(selectUserInfo);
    const { editProfile, setEditProfile } = props;
    const reset = () => setEditProfile({show: false, type: ''});
    const handleOk = () => reset();
    const handleCancel = () => reset();
    return (
        <Modal
            title="프로필 편집"
            open={editProfile.show}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            <div>
                <Avatar
                    style={{ verticalAlign: 'middle' }}
                    size={100}
                    gap={4}
                    src={userInfo.photoUrl}
                />
            </div>
            <div>
                <Input
                    addonBefore='Name'
                    placeholder='Edit your name!'
                    value={`${userInfo.name}`}
                />
                <Input
                    addonBefore='Email'
                    placeholder='Edit your email!'
                    value={`${userInfo.email}`}
                />
                <Input
                    addonBefore='Birth'
                    placeholder='Edit your birth!'
                    value={`${userInfo.birth === undefined ? '' : userInfo.birth}`}
                />
                <Input
                    addonBefore='Phone'
                    placeholder='Edit your phone!'
                    value={`${userInfo.phone === undefined ? '' : userInfo.phone}`}
                />
            </div>
        </Modal>
    );
}
export default EditProfile;
