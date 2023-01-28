import {useDispatch, useSelector} from "react-redux";
import {selectModalDefault, setModalDefault} from "../../app/slice";
import { Modal } from 'antd';
import EditProfile from "./EditProfile";

const Default = () => {
    console.log('Default 팝업');
    const dispatch = useDispatch();
    const modalDefault = useSelector(selectModalDefault);
    const modal = {
        'id-not-available': {
            message: '중복된 아이디입니다.'
        },
        'id-available': {
            message: '사용 가능한 아이디입니다.'
        },
        'join-fail': {
            message: '회원가입이 실패했습니다.',
        },
        'email-already-in-use': {
            message: '이미 사용되고 있는 이메일입니다.'
        },
        'weak-password': {
            message: '패스워드는 6자리 이상 입력해주세요.'
        },
        'login-fail': {
            message: '아이디 또는 비밀번호를 확인해주세요.'
        },
        'user-not-found': {
            message: '이메일을 확인해주세요.'
        },
        'wrong-password': {
            message: '비밀번호를 확인해주세요.'
        },
        'change-password': {
            message: '비밀번호 변경이 완료되었습니다.'
        },
        'edit-profile' : {
            message: <EditProfile />
        },
        'change-profile': {
            message: '프로필 변경이 완료되었습니다.'
        },
    };
    const reset = () => dispatch(setModalDefault({show: false, type: ''}));

    return (
        <Modal
            title="알림"
            open={modalDefault.show}
            onCancel={() => reset()}
            footer={null}
        >
            <div>{modal[modalDefault.type].message}</div>
        </Modal>
    );
}
export default Default;
