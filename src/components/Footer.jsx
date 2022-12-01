import React from 'react';
import { Layout, Carousel, Image } from 'antd';

const { Footer } = Layout;

function FooterC(props) {
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            {/*Ant Design ©2018 Created by Ant UED*/}
            {/* Todo : 배너 > 배너 아이디 > 이미지 url 데이터 구조로 firebase 생성 후 가져와서 뿌리기*/}
            <Carousel autoplay autoplaySpeed={10000}>
                <div>
                    <Image
                        width={913}
                        height={160}
                        src="https://cdn.pixabay.com/photo/2016/07/14/13/35/mountains-1516733_1280.jpg"
                    />
                </div>
                <div>
                    <Image
                        width={913}
                        height={160}
                        src="https://cdn.pixabay.com/photo/2012/10/25/23/18/train-62849_1280.jpg"
                    />
                </div>
                <div>
                    <Image
                        width={913}
                        height={160}
                        src="https://cdn.pixabay.com/photo/2022/04/12/18/00/europe-7128531_1280.jpg"
                    />
                </div>
                <div>
                    <Image
                        width={913}
                        height={160}
                        src="https://cdn.pixabay.com/photo/2019/11/19/07/50/bridge-4636745_1280.jpg"
                    />
                </div>
            </Carousel>
        </Footer>
    );
}

export default FooterC;
