import {useEffect, useState} from 'react';
import {Layout, Carousel, Image} from 'antd';
import {firestore} from '../../firebase/Firebase';

const { Footer } = Layout;

const contentStyle = {
    height: '140px',
    // color: '#fff',
    // lineHeight: '160px',
    // textAlign: 'center',
    // background: '#364d79',
    // overflow: 'hidden',
};

const imageStyle = {
    width:'100%',
    height:'100%',
    objectFit:'cover',

};

function FooterC(props) {

    const [banner, setBanner] = useState([]);
    useEffect(() => {
        getBannerList().then(() => {});
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
        <Footer style={{textAlign: 'center'}}>
            {/*Ant Design ©2018 Created by Ant UED*/}
            <Carousel autoplay effect='fade' autoplaySpeed={10000}>
                {banner.map((image, index) => (
                    <div key={index}>
                        <h3 style={contentStyle}>
                            <img
                                style={imageStyle}
                                src={image}
                                alt={'배너 이미지'}
                            />
                        </h3>
                    </div>
                ))}
            </Carousel>
        </Footer>
    );
}

export default FooterC;
