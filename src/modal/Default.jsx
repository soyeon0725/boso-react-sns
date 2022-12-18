import { Modal } from 'antd';

const Default = (props) => {
    console.log('Default 팝업');
    const { defaultModal, setDefaultModal } = props;
    const modal = {
        'id-not-available': {
            message: '중복된 아이디입니다.'
        },
        'id-available': {
            message: '사용 가능한 아이디입니다.'
        },
        'join-fail': {
            message: '아이디 중복 체크가 필요합니다.'
        },
        'email-already-in-use': {
            message: '이미 사용되고 있는 이메일입니다.'
        },
        'weak-password': {
            message: '패스워드는 6자리 이상 입력해주세요.'
        },
        'login-fail': {
            message: '아이디 또는 비밀번호를 확인해주세요.'
        }
    };
    const reset = () => setDefaultModal({show: false, type: ''});
    const handleCancel = () => reset();

    return (
        <Modal
            title="알림"
            open={defaultModal.show}
            onCancel={handleCancel}
            footer={null}
        >
            <p>{modal[defaultModal.type].message}</p>
        </Modal>
    );
}
export default Default;
