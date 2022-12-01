import { message, Input } from "antd";
import { useState, useEffect } from "react"
import axios from "axios";
import React from "react";
import headline from "../../component/headline"
import issuerCC_headline from "../../img/headline/issuerCC_headline.png"
import "./css/issuerCreateContext.css"

function IssuerCreateContext() {

    // 밑의 state는 context 이름 의미, credentialsubject와 분리되어있다.
    const [ context, setContext ] = useState("")
    const [ inputCount, setInputCount ] = useState(1)
    const [ credentialSubject, setCredentialSubject ] = useState({value1: "name", value8: "title"})
    const [ addInput, setAddInput ] = useState(false)
    
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
            // context와 연결되는 valueId, 1-3은 체크박스로, 4-8을 input으로 받음으로 여기선 4에서부터 시작해야한다.
            const valueId = parseInt(i) + 4
            inputs.push(
                <div className={`issuerCC_row${widthHandle}`} key={i} id={valueId}>
                    <input className={`issuerCC_input_minmize`} value={credentialSubject[valueId]} onChange={handleValue} key={`value${i}`}></input>
                </div>
            )
        }
        return inputs
        
    }

    // 추가기재값 credentialSubject에 반영
    function handleValue(e) {
        setCredentialSubject({
            ...credentialSubject,
            [`value${e.target.parentElement.id}`]: e.target.value
        })
    }

    // 기재정보 선택 값 핸들링
    function onChecked(e) {
        // 부모id는 value{i}, id는 기입요소 영문명
        const { parentElement, checked, id } = e.target
        setCredentialSubject({
        ...credentialSubject,
        [ parentElement.id ]: (checked === true) ? id : undefined 
        })
    }

    // 기재정보 추가 체크박스 핸들링
    function onClick(e) {
        setAddInput(e.target.checked)
    }

    // crdentialSubject와 context 병합
    function submit() {
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
            url: `http://localhost:8080/issuer/context`,
            method: "POST",
            data: {
              ...Context
            },
            withCredentials: true,
        })
            .then((res) => {
                messageInfo("양식생성 성공");
            })
            .catch((err) => {
                messageError(err + "양식생성 실패");
            });
    }

    const messageInfo = (msg) => {
        message.success(msg);
    };

    const messageError = (msg) => {
        message.error(msg);
    };

    const subtitle = "발급할 인증서의 양식을 등록할 수 있습니다. 자격증과 발급대상의 정보 기재여부를 결정합니다."

    return(
        <div className="issuerCC_bg">
            {headline(issuerCC_headline, 700, subtitle, 9999 )}
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
                            <dl className={`issuerCC_row${widthHandle}`}>
                                <dt className={`issuerCC_tag${widthHandle}`}>기재정보 선택<span style={{color: "red"}}> *</span></dt>
                                <dd className={`issuerCC_select${widthHandle}`}>
                                    <div style={{width: "100%"}}>
                                        <p className="issuerCC_form_infoBold">증명서 기입요소를 선택할 수 있습니다.</p>
                                        <div className="issuerCC_form_checkBoxList">
                                            <div id="value1" className="issuerCC_form_checkBox_warp">
                                                <Input onChange={onChecked} id="name" defaultChecked disabled className="issuerCC_form_checkBox" type="checkbox"></Input>
                                                <label htmlFor="name" className="issuerCC_form_infoBold">성명</label>
                                            </div>
                                            <div className="issuerCC_form_checkBox_warp">
                                                <Input onChange={onChecked} id="issuer" defaultChecked disabled className="issuerCC_form_checkBox" type="checkbox"></Input>
                                                <label htmlFor="issuer" className="issuerCC_form_infoBold">발급기관</label>
                                            </div>
                                            <div id="value2" className="issuerCC_form_checkBox_warp">
                                                <Input onChange={onChecked} id="issuedDate" className="issuerCC_form_checkBox" type="checkbox"></Input>
                                                <label htmlFor="issuedDate" className="issuerCC_form_infoBold">발급일</label>
                                            </div>
                                            <div id="value3" className="issuerCC_form_checkBox_warp">
                                                <Input onChange={onChecked} id="expiredDate" className="issuerCC_form_checkBox" type="checkbox"></Input>
                                                <label htmlFor="만료일" className="issuerCC_form_infoBold">만료일</label>
                                            </div>
                                            <div className="issuerCC_form_checkBox_warp">
                                                <Input onChange={onClick} id="detail" className="issuerCC_form_checkBox" type="checkbox"></Input>
                                                <label htmlFor="detail" className="issuerCC_form_infoBold">기재정보 추가</label>
                                            </div>
                                        </div>
                                    </div>
                                </dd>
                            </dl>
                            {(addInput === false) ? null : 
                                <div>
                                    <div className={`issuerCC_row${widthHandle}`}>
                                        <div className={`issuerCC_tag${widthHandle}`}>추가갯수<span style={{color: "red"}}> *</span></div>
                                        <input className={`issuerCC_input${widthHandle}`} type={"number"} min={1} max={5} value={inputCount} onChange={handleInputCount}></input>
                                    </div>
                                    <hr />
                                    <div className={`issuerCC_row${widthHandle}`}>
                                        <div className={`issuerCC_tag${widthHandle}`}>
                                            추가기재
                                            <p style={{color: "#666"}}>ex{")"} 발급대상 성명, 생년월일</p>
                                        </div>
                                        <div className={`issuerCC_inputs${widthHandle}`}>
                                            {makeInput()}
                                        </div>
                                    </div>
                                </div>
                            }
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