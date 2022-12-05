import {useEffect, useState} from 'react';
import { Layout, Carousel, Image } from 'antd';
import {firestore} from "../firebase/Firebase";

const { Footer } = Layout;

function FooterC(props) {
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    const [banner, setBanner] = useState([]);
    useEffect(() => {
        getBannerList().then(r => console.log(r));
    }, []);
    const getBannerList = async () => {
        const banner = firestore.collection("banner");
        let bannerList = [];
        await banner.get().then((docs) => {
            console.log(docs)
            docs.forEach((doc) => {
                bannerList.push(doc.data().url);
            });
            setBanner(bannerList);
        });
    }
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            {/*Ant Design ©2018 Created by Ant UED*/}
            {/* Todo : 배너 > 배너 아이디 > 이미지 url 데이터 구조로 firebase 생성 후 가져와서 뿌리기*/}
            <Carousel autoplay autoplaySpeed={10000}>
                {banner.map((image, index) => (
                    <div key={index}>
                        <Image
                            width={913}
                            height={160}
                            src={image}
                        />
                    </div>
                ))}
            </Carousel>
        </Footer>
    );
}

export default FooterC;
