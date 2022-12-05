//import { Link } from "react-router-dom";
import { Carousel } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Footer from '../../component/footer';
import FAQimg from '../../img/main/FAQ.png'
import './css/Home.css'

function Home() {

    const [ mod, setMod ] = useState("person")
    const carousel = useRef("")
    useEffect(() => {
        window.addEventListener('wheel',onWheel)
    }, [])

    function onClick(e) {
        setMod(e.target.id)
    }

    function onWheel(e) {
        // console.log(e)
        switch (e.deltaY){
            
            case 100 :
                return carousel.current && carousel.current.next()
            case -100 :
                return carousel.current && carousel.current.prev()
            default :
                return console.log("onWheel err")
            
        }
    }

    return (
        <div>
            <a href='/FAQ' className='FAQ'><img alt='FAQ' src={FAQimg} /></a>
            <div className='mod_warp'>
                <ul style={{listStyle:"none"}}>
                    <li style={{marginBottom:"9px"}}>
                        <button id="person" onClick={onClick} className='mod_person_btn'>개인고객</button>
                    </li>
                    <li style={{marginBottom:"9px"}}>
                        <button id="company" onClick={onClick} className='mod_company_btn'>기업고객</button>
                    </li>
                </ul>
            </div>
            {(mod === "person") ? 
                <Carousel ref={carousel} infinite={false} dotPosition='left' adaptiveHeight={true}>
                    <div>
                        <div className='contentStyle--a'>
                            <div className='text--a'>
                                <h1 className='headline'>내 지갑 서비스</h1>
                                <p>
                                    내 지갑 서비스에서는 블록체인을 통해 발급된<br />
                                    나의 증명, 인증서 확인 및 관리, 증명서 다운로드 기능을 제공합니다.<br />
                                    더 나아가 타기관에서 발급한 증명, 인증서도 등록을 통해<br />
                                    DID NOW에서 한번에 관리할 수 있습니다.<br />
                                </p>
                                <a className='headline_Btn' href='/signIn'>바로가기</a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='contentStyle--b'>
                            <div className='text--b'>
                                <h1 className='headline'>커리어 로드맵</h1>
                                <p>
                                    회원님의 회원가입 시 설정한<br />
                                    희망직무/발급된 증명, 인증서이력을 바탕으로<br />
                                    회원님의 커리어 상승에 도움이 되는 직무 관련<br />
                                    자격증/활동을 추천해 드립니다.<br />
                                </p>
                                <a className='headline_Btn' href='/signIn'>바로가기</a>
                            </div>
                        </div>
                    </div>
                    <div style={{overflow:"scroll"}}>
                        <div className='contentStyle--c'>
                            <div className='text--c'>
                                <h1 className='headline'>입사지원</h1>
                                <p>
                                    DIDNOW와 연동된 기업의 입사지원을 할 수 있습니다.<br />
                                    입사지원시 DIDNOW 회원의 경우 별도의 회원가입이<br />
                                    필요하지 않으며, 자기소개서 작성은 물론 회원님에게<br />
                                    발급된 증명, 인증서를 자동 연동하여 입사지원서를<br />
                                    편리하게 작성할 수 있습니다.<br />
                                </p>
                                <a className='headline_Btn' href='/signIn'>바로가기</a>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </Carousel>
            :   
            <Carousel ref={ref => {carousel.current = ref}} dotPosition='left'>
                <div>
                    <div className='contentStyle--d'>
                        <div className='text--a'>
                            <h1 className='headline'>증명,인증서 발급</h1>
                            <p>
                                기업에서 발급하고자 하는 증명, 인증서를<br />
                                엑셀 파일 하나로 발급할 수 있습니다.<br />
                                증명, 인증서 발급 완료 시<br />
                                개인에게 Push알림을 통해 자동으로 안내됩니다..<br />
                            </p>
                            <a className='headline_Btn' href='/signIn'>바로가기</a>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='contentStyle--e'>
                        <div className='text--b'>
                            <h1 className='headline'>발급 증명, 인증서 관리</h1>
                            <p>
                                기업에서 발급한 증명,인증서를 관리할 수 있습니다.<br />
                                본 서비스에서는 개인 혹은 단체에게<br />
                                잘못 발급된 증명, 인증서도 삭제가 가능합니다.<br />
                            </p>
                            <a className='headline_Btn' href='/signIn'>바로가기</a>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='contentStyle--f'>
                        <div className='text--c'>
                            <h1 className='headline'>입사지원</h1>
                            <p>
                                DIDNOW와 기업 간 입사지원 연동을 할 경우,<br />
                                입사지원서 제작 및 관리 더 나아가 지원자들이 제출한<br />
                                증명, 인증서의 진위 여부도 자동으로 확인해 드립니다.<br />
                            </p>
                            <a className='headline_Btn' href='/signIn'>바로가기</a>
                        </div>
                    </div>
                </div>
            </Carousel>
            }
        </div>
    )
}

export default Home