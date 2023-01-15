import {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectUserInfo} from "../../app/slice";

const ImageList = () => {
    useEffect(() => {
        console.log('ImageList 컴포넌트');
    }, []);
    // const userInfo = useSelector(selectUserInfo);
    // console.log(userInfo.post?.imageList);
    const userInfo = {
        post: {
            imageList: []
        }
    }
    return (
        <>
            {userInfo.post?.imageList.length > 0 ? (
                <ul>
                    { userInfo.post?.imageList.map((item) => (
                        <li key={item.id}>
                            <img src={item.url} alt="마이 포스트 이미지" width={100}/>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>첫 포스트를 업로드해보세요</div>
            )}

        </>
    )
}
export default ImageList;
