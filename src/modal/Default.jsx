import { Modal } from 'antd';

const Default = (props) => {
    const { defaultModal, setDefaultModal } = props;

    const reset = () => setDefaultModal({show: false, type: ''});

    // const modal = {
    //     'id-not-available': '중복된 아이디입니다.',
    //     'id-available': '사용 가능한 아이디입니다.',
    //     'join-fail': '아이디 중복 체크가 필요합니다.',
    //     'login-fail': '아이디 또는 비밀번호를 확인해주세요.'
    // }

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
        'login-fail': {
            message: '아이디 또는 비밀번호를 확인해주세요.'
        }
    };

    const handleCancel = () => {
        reset();
    };
    return (
        <Modal
            title="알림"
            open={defaultModal.show}
            onCancel={handleCancel}
            footer={null}
        >
            {/*<p>{modal[defaultModal.type]}</p>*/}
            <p>{modal[defaultModal.type].message}</p>
        </Modal>
    );
}
export default Default;
