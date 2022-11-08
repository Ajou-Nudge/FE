//import { Link } from "react-router-dom";
import { Carousel } from 'antd';
import React, { useRef } from 'react';
import './css/Home.css'

function Home() {

    const carousel = useRef()

    window.addEventListener('wheel',onWheel)
    function onWheel(e) {
        console.log(e)
        switch (e.deltaY){
            
            case 100 :
                return carousel.current.next()
            case -100 :
                return carousel.current.prev()
            default :
                return console.log("onWheel err")
            
        }
    }

    return (
        <div>
            <a href='/FAQ' className='FAQ'>FAQ</a>
            <Carousel ref={ref => {carousel.current = ref}} dotPosition='left'>
                <div>
                    <div className='contentStyle--a'>
                        <div className='text--a'>
                            <h1 className='headline'>내 지갑 서비스</h1>
                            내 지갑 서비스에서는 블록체인을 통해 발급된<br />
                            나의 증명, 인증서 확인 및 관리, 증명서 다운로드 기능을 제공합니다.<br />
                            더 나아가 타기관에서 발급한 증명, 인증서도 등록을 통해<br />
                            DID NOW에서 한번에 관리할 수 있습니다.
                        </div>
                    </div>
                </div>
                <div>
                    <div className='contentStyle--b'>
                        <div className='text--b'>
                            <h1 className='headline'>커리어 로드맵</h1>
                            회원님의 회원가입 시 설정한<br />
                            희망직무/발급된 증명, 인증서이력을 바탕으로<br />
                            회원님의 커리어 상승에 도움이 되는 직무 관련<br />
                            자격증/활동을 추천해 드립니다.
                        </div>
                    </div>
                </div>
                <div>
                    <div className='contentStyle--c'>
                        <div className='text--c'>
                            <h1 className='headline'>입사지원</h1>
                            DIDNOW와 연동된 기업의 입사지원을 할 수 있습니다.<br />
                            입사지원시 DIDNOW 회원의 경우 별도의 회원가입이<br />
                            필요하지 않으며, 자기소개서 작성은 물론 회원님에게<br />
                            발급된 증명, 인증서를 자동 연동하여 입사지원서를<br />
                            편리하게 작성할 수 있습니다.
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}

export default Home