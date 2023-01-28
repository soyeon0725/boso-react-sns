import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {selectModalConfirm, setModalConfirm} from "../../app/slice";
import { Modal } from 'antd';

const Confirm = () => {
    console.log('Confirm 팝업');
    const dispatch = useDispatch();
    const modalConfirm = useSelector(selectModalConfirm);
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
    const reset = () => dispatch(setModalConfirm({show: false, type: ''}));
    const handleOk = () => modal[modalConfirm.type].onEvent();

    return (
        <Modal
            title="알림"
            open={modalConfirm.show}
            onOk={handleOk}
            onCancel={() => reset()}
            closable={modal[modalConfirm.type].closable}
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            {modal[modalConfirm.type]?.body}
        </Modal>
    );
}
export default Confirm;
