import { connect } from "react-redux";
import { actionCreators } from "../../component/store";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx"
import { Empty, Switch } from "antd";
import Headline from "../../component/headline";
import issuerI_headline from "../../img/headline/issuerI_headline.png"
import DummyContextList from "../../dummy/dummyContextList";
import "./css/issuerIssue.css"

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd"


function IssuerIssue(userIdInStore) {
    
    // contextList는 받아온 formList에서 context만 추출한 것
    const [ uploadMod, setUploadMod ] = useState("handWrite")
    const [ fileName, setFileName ] = useState("")
    const [ formList, setFormList ] = useState([])
    const [ contextList, setContextList ] = useState([])
    const [ theForm, setTheForm ] = useState(undefined)
    const [ issueVcs, setIssueVcs ] = useState([{
        holderId: "1",
        vc: {
            context: "",
            issuer: "",
            credentialSubject:{}
        }
    }])
    
    const navigate = useNavigate()

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

    // 서버에서 issuer의 context정보 불러오기
    // useEffect(() => {
    //     axios({
    //         url: `http://localhost:8080/issuer/context-list/:sjh3922@naver.com`,
    //         method: "GET",
    //         // withCredentials: true,
    //     })
    //     .then((res) => {
    //         setFormList(res.data)
    //     })
    //     .catch(() => {
    //         message.error("자격증 양식 가져오기 실패");
    //         navigate("/issuer")
    //     });
    // }, [navigate, userIdInStore])

    useEffect(() => {
        const Dummy = DummyContextList
        setFormList([...Dummy])
    },[])

    // 받아온 List 내부의 form에서 context만 추출
    useEffect(() => {
        let contexts = []
        formList.map((form) => {
            contexts=[...contexts, form.context]
            return contexts
        })
        setContextList(contexts)

    }, [formList])

    // 인증서 생성 방식 핸들링
    function onSwitch(e) {
        if (e === true) {
            setUploadMod("excel")
        } else if (e === false) {
            setUploadMod("handWrite")
        } else {
            console.log("switch err")
        }
    }

    // excel 파일 입력양식 뿌려주기
    function makeExcelInput() {
        return(
            <div className={`issuerI_row${widthHandle}`}>
                <label 
                    htmlFor="getExcelFile"
                    className={`issuerI_tag${widthHandle}`}
                >
                    파일첨부
                </label>
                <div className={`issuerI_excelBtn${widthHandle}`}>
                    <label
                        htmlFor="getExcelFile"
                        className="issuerI_label"
                    >
                        {fileName === "" ? "내컴퓨터에서 찾아보기" : fileName}
                    </label>
                </div>
                <input 
                    id="getExcelFile"
                    style={{display: "none"}}
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={(e) => {
                        console.log(e)
                        readExcel(e)
                    }}>
                </input>
            </div>
        )
    }

    // excel 파싱 후 vc양식에 넣어주기
    function readExcel(event) {
        try {
            // event에서 target 분리
            const input = event.target;
            // 파일 첨부란에 띄울 파일 이름 따기
            setFileName(event.target.files[0].name)
            const reader = new FileReader();

            // reader에 input 넘겨줄경우 실행할 코드 지정
            reader.onload = function () {
                const data = reader.result;
                let xlsx = XLSX.read(data, { type: 'binary' });
                xlsx.SheetNames.forEach((sheetName) => {
                    // 각각의 input 내부의 sheet들을 json으로 전환하여 rows로 넣어주기
                    let rows = XLSX.utils.sheet_to_json(xlsx.Sheets[sheetName]);
                    console.log(rows)

                    // 각각의 row들을 issuerVc로 변환하여 buffer에 담기
                    const buffer = []
                    // 현재 설정된 context 가져오기
                    const currentContext = issueVcs[0].vc.context
                    rows.map((row) => {
                        const issueVc =  {
                            holderId: row.holderId,
                            vc: {
                                context: currentContext,
                                issuer: "",
                                credentialSubject: row,
                            }
                        }
                        return buffer.push(issueVc)
                    })
                    setIssueVcs(buffer)
                })
            }
            reader.readAsBinaryString(input.files[0]);
        }   catch (error) {
            return console.error("failed to read file" + error)
        }



    }
    

    // 유저가 선택한 자격증 종류 핸들링
    function contextSelect (e) { 

        
        // 필터링하여 theForm에 넣어주기
        const theContext = e.target.value
        const form = formList.filter((form) => {
            return theContext === form.context
        })
        setTheForm(...form)
        
        // context 이름 넣어주기
        const currentVcs = issueVcs
        const buffer = []
        currentVcs.map((issueVc) => {
            issueVc.vc.context = e.target.value
            return buffer.push(issueVc)
        })
        setIssueVcs(buffer)
    }
    
    // 선택한 자격증에 따라 input 생성
    function makeInput() {

        // 선택된 값이 없으면 작동 정지, 빈값 반환
        if (theForm === undefined) {
            return <Empty />
        } 
        // 디폴트값 아니면 input뿌려주기
        const formSubject = theForm.credentialSubject
        const inputs = []
        for (let i in formSubject){
            inputs.push(
                <div className={`issuerI_row${widthHandle}`} key={i}>
                    <div className={`issuerI_tag${widthHandle}`}>{i}{(formSubject[i] === "1") ? <span style={{color: "red"}}> *</span> : ""}</div>
                    <input className={`issuerI_input${widthHandle}`} id={i} onChange={inPutChange}></input>
                </div>
            )
        }
        return inputs   

    }
    
    // 사용자 입력값따라 body 작성
    function inPutChange(e) {
        const issueVc = issueVcs
        const id = e.target.id
        issueVc[0].vc.credentialSubject[`${id}`] = e.target.value
        setIssueVcs(issueVc)
    }

    // BE 제출
    function submit() {
        console.log(issueVcs)
        axios({
            url: `http://localhost:8080/issuer/vc`,
            method: "POST",
            data: issueVcs,
        })
        .then((res) => {
            message.success("양식생성 성공");
            navigate("/issuer")
        })
        .catch(() => {
            message.error("양식생성 실패");
        });
    }

    const subtitle = "발급 대상자에게 인증서를 발급할 수 있습니다."

    return(
        <div className="issuerI_bg">
            {Headline(issuerI_headline, 700, subtitle, 9999)}
            <div className="issuerI_form_bg">
                <div className="issuerI_form_outterBox">
                    <div className="issuerI_form_innerBox">
                        <Switch 
                            unCheckedChildren="직접 작성하기" 
                            checkedChildren="excel 업로드"
                            onChange={onSwitch}
                        ></Switch>
                        <div className="issuerI_title">
                            <p style={{lineHeight: "60px"}}>인증서 기재정보 입력</p>
                            <p style={{fontSize: "14px", lineHeight: "60px"}}><span style={{color: "red"}}>*</span>필수 입력항목</p>
                        </div>
                        <div className={`issuerI_row${widthHandle}`}>
                            <div className={`issuerI_tag${widthHandle}`}>자격증이름<span style={{color: "red"}}> *</span></div>
                            <select
                            onChange={contextSelect}
                            className={`issuerI_input${widthHandle}`}
                            >   
                                <option>인증서를 선택해주세요.</option>
                                {contextList.map((context) => {
                                    return <option key={context}>{context}</option>;
                                })}
                            </select>
                        </div>
                        <hr />
                        <div>{uploadMod === "handWrite" ? makeInput() : makeExcelInput() }</div>
                        <hr />
                        <div className="issuerI_submitBox">
                            <button className="issuerI_submitBtn" onClick={submit}>인증서 생성하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return {userIdInStore: state._id}
}
function mapDispatchToProps(dispatch) {
    return {
        SignInToStore: (userObj) => dispatch(actionCreators.SignIn(userObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (IssuerIssue)