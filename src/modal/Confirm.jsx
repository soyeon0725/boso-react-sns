import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

const Confirm = (props) => {
    const { values, setValues } = props;
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (values.modal === 'confirm') setIsModalOpen(true);
    }, []);

    const handleOk = () => {
        setValues({
            modal: '',
            type: '',
            message: ''
        });
        setIsModalOpen(false);
        navigate('/');

    };
    return (
        <Modal
            title="알림"
            open={isModalOpen}
            onOk={handleOk}
        >
            <p>{values.message}</p>
        </Modal>
    );
}
export default Confirm;
