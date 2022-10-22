import React, { useEffect, useState } from "react"
import "./css/footer.css"

function Footer() {

    const[ width, setWidth ] = useState(window.innerWidth)
    
    function handleResize() {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        return window.addEventListener("resize", handleResize)
    })

    function forInteractive() {
        if (width > 1000) {
            return(
                <div style={{display: "flex", paddingTop: "25px"}}>
                    <div>
                        <p className="footer_subtitle">COMPANY</p>
                        <p className="footer_info">이용약관</p>
                        <p className="footer_info">개인정보처리방침</p>
                        <p className="footer_info">공지사항</p>
                        <p className="footer_info">FAQ</p>
                    </div>
                    <div style={{paddingLeft: "40px"}}>
                        <p className="footer_subtitle">CONTACT</p>
                        <p className="footer_info">010-5561-3356</p>
                        <p className="footer_info">nudge335@gmail.com</p>
                        <p className="footer_info">카카오톡</p>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    return(
        <footer id="footer" className="footer">
            <div className="footer_margin">
                <div style={{height: "100%"}}>
                    <div style={{display: "flex", alignItems:"center"}}>
                        <p className="footer_title">DIDNOW</p>
                        <p className="footer_subtitle">didnow는 당신의 신뢰, 커리어 상승에 도움을 드립니다.</p>
                    </div>
                    <div>
                        <p className="footer_info">(주)넛지 대표 민정근</p>
                        <p className="footer_info">주소:미정 사업자등록번호:미정 통신판매업신고:미정</p>
                    </div>
                    <p className="footer_copyRight">Copyright(C) NUDGE Co, Ltd. all rights reserved</p>
                </div>
                {forInteractive()}
            </div>
        </footer>
    )
}

export default Footer