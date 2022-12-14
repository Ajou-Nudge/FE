import { message, Input } from "antd";
import { useState, useEffect } from "react"
import axios from "axios";
import React from "react";
import headline from "../../component/headline"
import issuerCC_headline from "../../img/headline/issuerCC_headline.png"
import "./css/issuerCreateContext.css"
import { useNavigate } from "react-router-dom";

function IssuerCreateContext() {

    const navigate = useNavigate()

    // 밑의 state는 context 이름 의미, credentialsubject와 분리되어있다.
    const [ context, setContext ] = useState("")
    // 기재정보 추가 여부, 추가 갯수, 추가 정보
    const [ addInput, setAddInput ] = useState(false)
    const [ inputCount, setInputCount ] = useState(1)
    const [ inputValue, setInputValue ] = useState([])
    // 이 context로 생성할 vc에 기재될 정보들
    const [ checkboxValue, setCheckboxValue ] = useState(["name", "title"])
    
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
        setInputValue(
            inputValue.slice(0, parseInt(e.target.value))
        )
    }

    // 받아온 inputCount만큼 input 생성
    function makeInput() {
        const inputs = []
        for (let i=0; i < inputCount; i++){
            inputs.push(
                <div className={`issuerCC_row${widthHandle}`} key={i}>
                    <input className={`issuerCC_input_minmize`} id={i} value={inputValue[`value${i}`]} onChange={handleValue} key={`value${i}`}></input>
                </div>
            )
        }
        return inputs
        
    }

    // 추가기재값 credentialSubject에 반영
    function handleValue(e) {
        let buffer = inputValue
        buffer[e.target.id] = e.target.value
        setInputValue([...buffer])
    }

    // 기재정보 선택 값 핸들링
    function onChecked(e) {
        // checked는 체크여부 boolean , id는 기입요소 한글명
        const { checked, id } = e.target
        if (checked === true) {
            setCheckboxValue([
                ...checkboxValue,
                id
            ])
        } else if (checked === false) {
            setCheckboxValue([
                ...checkboxValue.filter(subject => id !== subject)
            ])
        } else {
            console.log("체크박스 에러:" + checked)
        }
    }

    // 기재정보 추가 체크박스 핸들링
    function onClick(e) {
        setAddInput(e.target.checked)
    }

    // crdentialSubject에 inputValue 병합, context명 추가
    function submit() {
        const Context = {
            context,
            credentialSubject: [
                ...checkboxValue,
                ...inputValue
            ]
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
                navigate("/issuer/contextList")
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
                                            <div className="issuerCC_form_checkBox_warp">
                                                <Input onChange={onChecked} id="name" defaultChecked disabled className="issuerCC_form_checkBox" type="checkbox"></Input>
                                                <label htmlFor="name" className="issuerCC_form_infoBold">성명</label>
                                            </div>
                                            <div className="issuerCC_form_checkBox_warp">
                                                <Input onChange={onChecked} id="issuer" defaultChecked disabled className="issuerCC_form_checkBox" type="checkbox"></Input>
                                                <label htmlFor="issuer" className="issuerCC_form_infoBold">발급기관</label>
                                            </div>
                                            <div className="issuerCC_form_checkBox_warp">
                                                <Input onChange={onChecked} id="issueDate" className="issuerCC_form_checkBox" type="checkbox"></Input>
                                                <label htmlFor="issueDate" className="issuerCC_form_infoBold">발급일</label>
                                            </div>
                                            <div className="issuerCC_form_checkBox_warp">
                                                <Input onChange={onChecked} id="expiredDate" className="issuerCC_form_checkBox" type="checkbox"></Input>
                                                <label htmlFor="expiredDate" className="issuerCC_form_infoBold">만료일</label>
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