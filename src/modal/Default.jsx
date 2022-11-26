import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { Button, Modal } from 'antd';

const Default = (props) => {
    const { isDefaultOpen } = props;
    const navigate = useNavigate();
    /*const [isDefaultOpen, setIsDefaultOpen] = useState(open);*/
    console.log(props);

    const handleCancel = () => {
        console.log("x")
        // setIsDefaultOpen(false);
    };
    return (
        <>
            <Modal
                title="알림"
                open={isDefaultOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <p>{props.message}</p>
            </Modal>
        </>
    );
}
export default Default;
