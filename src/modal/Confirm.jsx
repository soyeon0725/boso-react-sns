import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

const Confirm = (props) => {
    const { confirmModal, setConfirmModal } = props;
    const navigate = useNavigate();

    const modal = {
        'join-success' : '회원가입이 완료되었습니다.',
    }

    const handleOk = () => {
        setConfirmModal({show: false, type: ''});
        if (confirmModal.type === 'join-success') navigate('/');

    };

    return (
        <Modal
            title="알림"
            open={confirmModal.show}
            onOk={handleOk}
            closable={false}
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            <p>{modal[confirmModal.type]}</p>
        </Modal>
    );
}
export default Confirm;
