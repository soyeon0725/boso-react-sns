import {useEffect, useState} from 'react';
import { Layout, Carousel, Image } from 'antd';
import {firestore} from "../../firebase/Firebase";

const { Footer } = Layout;

function FooterC(props) {
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        overflow: 'hidden',
    };
    const [banner, setBanner] = useState([]);
    useEffect(() => {
        getBannerList().then(r => console.log(r));
    }, []);
    const getBannerList = async () => {
        const banner = firestore.collection("banner");
        let bannerList = [];
        await banner.get().then((docs) => {
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
            <Carousel autoplay autoplaySpeed={10000}>
                {banner.map((image, index) => (
                    <div key={index}>
                        <h3 style={contentStyle}>
                            <Image
                                style={{objectFit: 'cover'}}
                                width={'100%'}
                                height={'100%'}
                                src={image}
                            />
                        </h3>
                    </div>
                ))}
            </Carousel>
        </Footer>
    );
}

export default FooterC;
