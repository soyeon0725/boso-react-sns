import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

const Confirm = (props) => {
    const { confirmModal, setConfirmModal } = props;
    const navigate = useNavigate();

    const reset = () => setConfirmModal({show: false, type: ''});

    const modal = {
        'join-success' : {
            message: '회원가입이 완료되었습니다.',
            closable: true,
            onEvent: () => {
                reset();
                navigate('/');
            }
        }
    }

    const handleOk = () => {
        modal[confirmModal.type].onEvent();
    };

    return (
        <Modal
            title="알림"
            open={confirmModal.show}
            onOk={handleOk}
            closable={modal[confirmModal.type].closable}
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            <p>{modal[confirmModal.type].message}</p>
        </Modal>
    );
}
export default Confirm;
