import {useDispatch, useSelector} from 'react-redux';
import {selectModalDefault, setModalDefault} from '../../app/slice';
import {Modal} from 'antd';
import EditProfile from './EditProfile';
import UploadPost from "./UploadPost";

const Default = () => {
    console.log('Default 팝업');
    const dispatch = useDispatch();
    const modalDefault = useSelector(selectModalDefault);
    const {show, type} = modalDefault;
    console.log(type);

    const handleCancel = () => dispatch(setModalDefault({show: false, type: ''}));

    const modal = {
        'user-not-found': {
            body: '이메일을 확인해주세요.'
        },
        'wrong-password': {
            body: '비밀번호를 확인해주세요.'
        },
        // 'id-not-available': {
        //     body: '중복된 아이디입니다.'
        // },
        // 'id-available': {
        //     body: '사용 가능한 아이디입니다.'
        // },
        // 'weak-password': {
        //     body: '패스워드는 6자리 이상 입력해주세요.'
        // },
        'login-fail': {
            body: '로그인을 실패했습니다.'
        },
        'email-already-in-use': {
            body: '이미 사용중인 이메일 입니다.'
        },
        'join-fail': {
            body: '회원가입을 실패했습니다.',
        },
        'delete-fail' : {
            body : '회원 탈퇴를 실패했습니다. 다시 시도해주세요.'
        },
        'pw-update-success': {
            body : '비밀번호 업데이트에 성공했습니다.'
        },
        'pw-update-fail' : {
            body : '비밀번호 업데이트에 실패했습니다. 현재 비밀번호를 확인해주세요.'
        },
        'profile-update-success': {
            body: '프로필 업데이트에 성공했습니다.'
        },
        'profile-update-fail': {
            body: '프로필 업데이트에 실패했습니다.'
        },
        'post-upload-success': {
            body: '게시글 업로드에 성공했습니다.'
        },
        'edit-profile' : {
            title: '프로필 편집',
            body: (<EditProfile />),
            closable : false,
            okEvent: () => handleCancel()
        },
        'upload-post' : {
            title: '포스트 업로드',
            body: (<UploadPost />),
            closable : false,
            okEvent: () => handleCancel()
        },
    };

    return (
        <Modal
            title={modal[type]?.title || '알림'}
            open={show}
            onCancel={handleCancel}
            footer={null}
        >
            {modal[type]?.body}
        </Modal>
    );
}
export default Default;
