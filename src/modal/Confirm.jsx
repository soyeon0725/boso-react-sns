import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {selectConfirmModal, setConfirmModal} from "../app/slice";
import { Modal } from 'antd';
기
const Confirm = () => {
    console.log('Confirm 팝업');
    const dispatch = useDispatch();
    const confirmModal = useSelector(selectConfirmModal);
    const navigate = useNavigate();
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
    const reset = () => dispatch(setConfirmModal({show: false, type: ''}));
    const handleOk = () => modal[confirmModal.type].onEvent();

    return (
        <Modal
            title="알림"
            open={confirmModal.show}
            onOk={handleOk}
            onCancel={() => reset()}
            closable={modal[confirmModal.type].closable}
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            {modal[confirmModal.type]?.body}
        </Modal>
    );
}
export default Confirm;
