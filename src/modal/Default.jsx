import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { Button, Modal } from 'antd';

const Default = (props) => {
    const { values } = props;
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(props);

    useEffect(() => {
        if (values.modal === 'default') setIsModalOpen(true);
    }, []);

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <Modal
            title="알림"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            <p>{values.message}</p>
        </Modal>
    );
}
export default Default;
