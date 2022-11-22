import { connect } from "react-redux";
import { actionCreators } from "../../component/store";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx"
import { Empty, Switch, Input } from "antd";
import Headline from "../../component/headline";
import holderVL_headline from "../../img/headline/holderVL_headline.png"
import "./css/holderIssue.css"

// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { message } from "antd"


function HolderIssue(userIdInStore) {
    
    // const navigate = useNavigate()
    // contextList는 받아온 formList에서 context만 추출한 것
    const [ uploadMod, setUploadMod ] = useState("handWrite")
    const [ fileName, setFileName ] = useState("")
    const [ issueVcs, setIssueVcs ] = useState([{
        holderId: "1",
        vc: {
            context: "",
            issuer: "",
            credentialSubject:{}
        }
    }])
    const [ category, setCategory ] = useState({
        성명: true,
        발급기관: false,
        발급일: false,
        만료일: false,
        PDF: false,
        기타: false,
    })

    
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
            <div className={`holderI_row${widthHandle}`}>
                <label 
                    htmlFor="getExcelFile"
                    className={`holderI_tag${widthHandle}`}
                    >
                    파일첨부
                </label>
                <div className={`holderI_excelBtn${widthHandle}`}>
                    <label
                        htmlFor="getExcelFile"
                        className="holderI_label"
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
    
    
    // 유저가 작성한 자격증 종류 핸들링
    function onContext (e) { 
        
        // context 이름 넣어주기
        const currentVcs = issueVcs
        const buffer = []
        currentVcs.map((issueVc) => {
            issueVc.vc.context = e.target.value
            return buffer.push(issueVc)
        })
        setIssueVcs(buffer)
    }
    
    // 유저가 선택한 기입요소 핸들링
    function onChecked(e) {
        const { id, checked } = e.target
        setCategory({
        ...category,
        [id]: checked 
        })
    } 

    // 선택한 기입요소에 따라 input 생성
    function makeInput() {

        // 선택된 값이 없으면 작동 정지, 빈값 반환
        if (issueVcs[0].vc.context === "") {
            return <Empty />
        } 

        // 디폴트값 아니면 input뿌려주기
        const inputs = []
        for (let key in category) {
            if (category[key] === true) {
                inputs.push(
                    <div className={`holderI_row${widthHandle}`} key={key}>
                        <div className={`holderI_tag${widthHandle}`}>{key}</div>
                        <input className={`holderI_input${widthHandle}`} id={key} onChange={inPutChange}></input>
                    </div>
                )
            }
        }
       
        // const inputs = []
        // for (let i in formSubject){
        //     inputs.push(
        //         <div className={`holderI_row${widthHandle}`} key={i}>
        //             <div className={`holderI_tag${widthHandle}`}></div>
        //             <input className={`holderI_input${widthHandle}`} id={i} onChange={inPutChange}></input>
        //         </div>
        //     )
        // }
        return   inputs

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
        // axios({
        //     url: `http://localhost:8080/holder/vc`,
        //     method: "POST",
        //     data: issueVcs,
        // })
        // .then((res) => {
        //     message.success("양식생성 성공");
        //     navigate("/issuer")
        // })
        // .catch(() => {
        //     message.error("양식생성 실패");
        // });
    }

    const subtitle = "자신의 인증서를 등록할 수 있습니다."

    return(
        <div className="holderI_bg">
            {Headline(holderVL_headline, 700, subtitle, 9999)}
            <div className="holderI_form_bg">
                <div className="holderI_form_outterBox">
                    <div className="holderI_form_innerBox">
                        <Switch 
                            unCheckedChildren="직접 작성하기" 
                            checkedChildren="excel 업로드"
                            onChange={onSwitch}
                        ></Switch>
                        <div className="holderI_title">
                            <p style={{lineHeight: "60px"}}>인증서 기재정보 입력</p>
                            <p style={{fontSize: "14px", lineHeight: "60px"}}><span style={{color: "red"}}>*</span>필수 입력항목</p>
                        </div>
                        <div className={`holderI_row${widthHandle}`}>
                            <div className={`holderI_tag${widthHandle}`}>자격증이름<span style={{color: "red"}}> *</span></div>
                            <input onChange={onContext} className={`holderI_input${widthHandle}`} /> 
                        </div>
                        <dl className={`holderI_row${widthHandle}`}>
                            <dt className={`holderI_tag${widthHandle}`}>카테고리 선택<span style={{color: "red"}}> *</span></dt>
                            <dd className={`holderI_select${widthHandle}`}>
                                <div style={{width: "100%"}}>
                                    <p className="IssuerP_form_infoBold">증명서 기입요소를 선택할 수 있습니다.</p>
                                    <div className="IssuerP_form_checkBoxList">
                                        <div className="IssuerP_form_checkBox_warp">
                                            <Input onChange={onChecked} id="성명" defaultChecked disabled className="IssuerP_form_checkBox" type="checkbox"></Input>
                                            <label htmlFor="성명" className="IssuerP_form_infoBold">성명</label>
                                        </div>
                                        <div className="IssuerP_form_checkBox_warp">
                                            <Input onChange={onChecked} id="발급기관" className="IssuerP_form_checkBox" type="checkbox"></Input>
                                            <label htmlFor="발급기관" className="IssuerP_form_infoBold">발급기관</label>
                                        </div>
                                        <div className="IssuerP_form_checkBox_warp">
                                            <Input onChange={onChecked} id="발급일" className="IssuerP_form_checkBox" type="checkbox"></Input>
                                            <label htmlFor="발급일" className="IssuerP_form_infoBold">발급일</label>
                                        </div>
                                        <div className="IssuerP_form_checkBox_warp">
                                            <Input onChange={onChecked} id="만료일" className="IssuerP_form_checkBox" type="checkbox"></Input>
                                            <label htmlFor="만료일" className="IssuerP_form_infoBold">만료일</label>
                                        </div>
                                        <div className="IssuerP_form_checkBox_warp">
                                            <input onChange={onChecked} id="PDF" className="IssuerP_form_checkBox" type="checkbox"></input>
                                            <label htmlFor="PDF" className="IssuerP_form_infoBold">PDF</label>
                                        </div>
                                        <div className="IssuerP_form_checkBox_warp">
                                            <Input onChange={onChecked} id="기타" className="IssuerP_form_checkBox" type="checkbox"></Input>
                                            <label htmlFor="기타" className="IssuerP_form_infoBold">기타</label>
                                        </div>
                                    </div>
                                </div>
                            </dd>
                        </dl>
                        <hr />
                        <div>{uploadMod === "handWrite" ? makeInput() : makeExcelInput() }</div>
                        <hr />
                        <div className="holderI_submitBox">
                            <button className="holderI_submitBtn" onClick={submit}>인증서 생성하기</button>
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

export default connect(mapStateToProps, mapDispatchToProps) (HolderIssue)