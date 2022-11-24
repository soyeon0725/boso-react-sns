import { useState } from "react";
import { Button, Modal } from 'antd';

const Default = (props) => {
    console.log(props);

    const handleCancel = () => {
        props.isModalClose(false);
    };
    return (
        <>
            <Modal
                title="알림"
                open={props.isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <p>{props.message}</p>
            </Modal>
        </>
    );
}
export default Default;
