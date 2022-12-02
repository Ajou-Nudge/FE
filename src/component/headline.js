import { Input } from "antd"
import "./css/headline.css"
import React, { useState, useEffect } from "react"


// 로그인 후 페이지의 nav바 아래 표시될 헤드라인 생성 컴포넌트

// headline: 경로표시하는 headline 이미지(import된 img),
// maxWidth: headline의 최대가로 크기(int), 기본 600 하프 300,
// subtitle: 페이지 설명 텍스트(string),
// inputSize: 검색창 표시할 최소 가로길이(int), 기본 850 - 870, 불필요시 9999
function Headline( headline, maxWidth, subtitle, inputSize )  {
    
    const { Search } = Input
    // 창 가로크기 측정 코드, 입력된 inputSize 기준, 검색창 키고끄는데 사용
    const[ widthHandle, setWidthHandle ] = useState( () => 
        {if (window.innerWidth > inputSize) {
            return ""
        } else {
            return "_minmize"
        }}
    )
    function handleResize() {
        if (window.innerWidth > inputSize) {
            setWidthHandle("")
        } else {
            setWidthHandle("_minmize")
        }
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize)

        // // 사용 끝난 eventListener 제거
        // return () => window.removeEventListener("resize", handleResize)
    })

    // searchBox 스타일 코드는 subtitle이 없을경우 해당 박스의 margin 자체 삭제 기능
    return (
        <div>
            <div className="headLineBox">
                <img style={{width: "100%", maxWidth: `${maxWidth}px`}} alt="headline" src={headline}/>
            </div>
            <div className="searchBox" style={(subtitle === "") ? {display:"none"} : {}}>
                <p>
                    {subtitle}
                </p>
                <p style={(widthHandle === "") ? {width:"30%", marginLeft:"70px"} : {display:"none"}}>
                    <Search/>
                </p>
            </div>
        </div>
    )
}

export default Headline