import {useEffect, useState} from "react";
import { Button, Modal } from 'antd';

const Default = (props) => {
    const { values, setValues } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (values.modal === 'default') setIsModalOpen(true);
    }, []);

    const handleCancel = () => {
        setValues({
            modal: '',
            type: '',
            message: ''
        });
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
