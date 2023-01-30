import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectModalConfirm, setModalConfirm} from '../../app/slice';
import {Button, Modal} from 'antd';

const Confirm = () => {
    console.log('Confirm 팝업');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modalConfirm = useSelector(selectModalConfirm);
    const {show, type} = modalConfirm;

    const handleCancel = () => dispatch(setModalConfirm({show: false, type: ''}));
    const handleOk = () => modal[type].onEvent();

    const modal = {
        'join-success' : {
            message: '회원가입이 완료되었습니다.',
            closable: true,
            onEvent: () => {
                handleCancel();
                navigate('/');
            }
        }
    }



    return (
        <Modal
            title={modal[type]?.title || '알림'}
            open={show}
            onCancel={handleCancel}
            onOk={handleOk}
            closable={modal[type]?.closable}
            // cancelButtonProps={{ style: { display: 'none' } }}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    onClick={modal[type]?.okEvent}
                >OK</Button>
            ]}
        >
            {modal[type]?.body}
        </Modal>
    );
}
export default Confirm;
