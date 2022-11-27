import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

const Confirm = (props) => {
    const { values } = props;
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(props);

    useEffect(() => {
        console.log(values.modal)
        if (values.modal === 'confirm') setIsModalOpen(true);
    }, []);

    const handleOk = () => {
        navigate('/');
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        navigate('/');
        setIsModalOpen(false);
    };
    return (
        <Modal
            title="알림"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p>{values.message}</p>
        </Modal>
    );
}
export default Confirm;
