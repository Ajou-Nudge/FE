import { message } from "antd";
import { useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

function IssuerCreateContext() {

    const [context, setContext] = useState("")
    const [inputCount, setInputCount] = useState(3)
    const [rawContext, setRawContext ] = useState({})

    function handleInputCount(e) {
        setInputCount(e.target.value)
    }

    // 받아온 inputCount만큼 input 생성
    function makeInput() {
        const inputs = []
        for (let i=0; i < inputCount; i++){
            inputs.push(
                <div style={{display:"flex"}} key={i} id={i}>
                    <input defaultValue={rawContext[`value${i}`]} onChange={handleValue} key={`value${i}`}></input>
                    <div>필수여부</div>
                    <input defaultValue={rawContext[`isEssential${i}`]} onChange={handleCheck} key={`isEssential${i}`} type="checkbox"></input>
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
    function handleCheck(e) {
        let buffer = rawContext
        const isEssentialNum = e.target.checked ? "1" : "0"
        buffer[`isEssential${e.target.parentElement.id}`] = isEssentialNum
        setRawContext(buffer)
    }

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
        <div>
            <h1>IssuerCreateContext</h1>
            <div>자격증이름</div>
            <input value={context} onChange={(event) => { setContext(event.target.value) }}></input>
            <div>자격증 기재 정보 개수</div>
            <input type={"number"} value={inputCount} onChange={handleInputCount}></input>
            <hr />
            <div>{makeInput()}</div>
            <hr />
            <button onClick={submit}>양식 생성하기</button>
            <Link to="/issuer">
                <button>홈으로</button>
            </Link>
        </div>      
    )
}

export default IssuerCreateContext