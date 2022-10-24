import { message } from "antd";
import { useState, useEffect } from "react"
import axios from "axios";
import React from "react";
import "./css/issuerCreateContext.css"

function IssuerCreateContext() {

    const [context, setContext] = useState("")
    const [inputCount, setInputCount] = useState(3)
    const [rawContext, setRawContext ] = useState({})
    
    // 창 가로크기 측정 코드, inner 850px 기준, className으로 반응
    const[ widthHandle, setWidthHandle ] = useState("")
    function handleResize() {
        if (window.innerWidth > 850) {
            setWidthHandle("")
        } else {
            setWidthHandle("_minmize")
        }
    }
    useEffect(() => {
        return window.addEventListener("resize", handleResize)
    })
    function handleInputCount(e) {
        setInputCount(e.target.value)
    }

    // 받아온 inputCount만큼 input 생성
    function makeInput() {
        const inputs = []
        for (let i=0; i < inputCount; i++){
            inputs.push(
                <div className={`issuerCC_row${widthHandle}`} key={i} id={i}>
                    <input className={`issuerCC_input_minmize`} defaultValue={rawContext[`value${i}`]} onChange={handleValue} key={`value${i}`}></input>

                    {/* 원래는 필수 여부도 선택 가능하게 갔으나 기능 뺌 */}
                    {/* <div>필수여부</div>
                    <input defaultValue={rawContext[`isEssential${i}`]} onChange={handleCheck} key={`isEssential${i}`} type="checkbox"></input> */}
                </div>
            )
        }
        return inputs
        
    }

    // input에 받아온 값 각각 rawContext에 넣기, buffer는 state를 직접 다루는 걸 피하기 위해 현재 state를 가져와 잠시 담아두는 것
    function handleValue(e) {
        const buffer = rawContext
        buffer[`value${e.target.parentElement.id}`] = e.target.value
        setRawContext(buffer)
    }

    // // 필수 여부 체크 핸들링하는 함수
    // function handleCheck(e) {
    //     let buffer = rawContext
    //     const isEssentialNum = e.target.checked ? "1" : "0"
    //     buffer[`isEssential${e.target.parentElement.id}`] = isEssentialNum
    //     setRawContext(buffer)
    // }

    // rawContext가공하여 Context 생성
    function submit() {
        let credentialSubject = {}
        for (let i=0; i < inputCount; i++){
            let buffer = rawContext
            let value = buffer[`value${i}`]
            let isEssential = buffer[`isEssential${i}`] || "0"
            const aCredentialSubject =   {[value] : isEssential}
            credentialSubject = {...credentialSubject, ...aCredentialSubject}
        }
        const Context = {
            context,
            credentialSubject
        }
        
        return sendingRequest(Context)
    }
    
    // BE에 Request 보내기
    function sendingRequest(Context) {
        console.log(Context)
        axios({
            url: `/issuer/create`,
            method: "POST",
            data: {
              ...Context
            },
        })
            .then((res) => {
                messageInfo("양식생성 성공");
            })
            .catch(() => {
                messageError("양식생성 실패");
            });
    }

    const messageInfo = (msg) => {
        message.success(msg);
    };

    const messageError = (msg) => {
        message.error(msg);
    };

    return(
        <div className="issuerCC_bg">
            <div className="issuerCC_headLineBox">
                <div className={`issuerCC_headLine${widthHandle}`}>
                    인증서양식{">"} 
                    <span style={{color: "#0bb38e"}}>양식등록</span>
                </div>
            </div>
            <div className={`issuerCC_searchBox${widthHandle}`}>
                <p style={{maxWidth: '60vw'}}>
                    발급할 인증서의 양식을 등록할 수 있습니다.
                    자격증과 발급대상의 정보 기재여부를 결정합니다.
                </p>
            </div>
            <div style={{backgroundColor: "rgb(250, 250, 250)"}}>
                <div className="issuerCC_outerbox">
                    <div className="issuerCC_innerbox">
                        <div>
                            <div className="issuerCC_title">
                                <p style={{lineHeight: "60px"}}>인증서 기재정보 입력</p>
                                <p style={{fontSize: "14px", lineHeight: "60px"}}><span style={{color: "red"}}>*</span>필수 입력항목</p>
                            </div>
                            <div className={`issuerCC_row${widthHandle}`}>
                                <div className={`issuerCC_tag${widthHandle}`}>자격증이름<span style={{color: "red"}}> *</span></div>
                                <input className={`issuerCC_input${widthHandle}`} value={context} onChange={(event) => { setContext(event.target.value) }}></input>
                            </div>
                            <div className={`issuerCC_row${widthHandle}`}>
                                <div className={`issuerCC_tag${widthHandle}`}>자격증 기재 정보 개수<span style={{color: "red"}}> *</span></div>
                                <input className={`issuerCC_input${widthHandle}`} type={"number"} min={1} value={inputCount} onChange={handleInputCount}></input>
                            </div>
                            <hr />
                            <div className={`issuerCC_row${widthHandle}`}>
                                <div className={`issuerCC_tag${widthHandle}`}>
                                    기재정보
                                    <p style={{color: "#666"}}>ex{")"} 발급대상 성명, 생년월일</p>
                                </div>
                                <div className={`issuerCC_inputs${widthHandle}`}>
                                    {makeInput()}
                                </div>
                            </div>
                            <hr />
                            <div className="issuerCC_submitBox">
                                <button className="issuerCC_submitBtn" onClick={submit}>양식 생성하기</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>     
    )
}

export default IssuerCreateContext