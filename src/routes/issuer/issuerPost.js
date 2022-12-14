import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message, Input } from "antd"
import Headline from "../../component/headline";
import issuerP_headline from "../../img/headline/issuerP_headline.png"
import "./css/issuerPost.css"

function IssuerPost(userObjInStore) {

    const navigate = useNavigate();
    const[ posting, setPosting ] = useState({})
    const[ category, setCategory ] = useState({
        basicInfo: true,
        personalInfo: false,
        educationalHistory: false,
        languageSkills: false,
        otherVc: false,
        selfIntroduction: false,
    })

    useEffect( () => {
        setPosting(
            {
                verifierId: userObjInStore.memberId,
                title: "",
                expired: "",
                required: [],
                url: ""
            }
        )}
    , [userObjInStore.memberId])

    function onChange(e) {
        const modified = posting
        const key = e.target.id
        if (key === "required") {
            modified[key] = [e.target.value]
        } else {
            modified[key] = e.target.value
            return setPosting(modified)
        }
    }

    function onChecked(e) {
        const { id, checked } = e.target
        setCategory({
            ...category,
            [id]: checked
        })      
    }

    function theCategory() {
        
        const form = []

        if (category["otherVc"] === true) {
            form.push(
                <div key={"otherVc"}>
                    <dl className="IssuerP_form_row">
                    <dt className="IssuerP_form_tag">{">"}기타 증명서</dt>
                    <dd className="IssuerP_form_inputBox">
                        <Input id="required" onChange={onChange} className="IssuerP_form_inputStyle" />
                    </dd>
                    </dl>
                </div>
            )

            return form
        } else {
            return
        }
        
    }


    function onSubmit() {
        console.log(posting)
        axios({
            url: "http://localhost:8080/verifier/post",
            method: "POST",
            data: posting,
            withCredentials: true,
        })
        .then((res) => {
            message.success("공고 업로드 성공")
            navigate("/issuer")
        })
        .catch(() => {
            message.error("업로드 실패");
        });
    }

    const subtitle = "등록한 채용공고를 확인할 수 있습니다."

    return(
        <div className="issuerP_bg">
            {Headline(issuerP_headline, 650, subtitle, 870)}
            <div className="IssuerP_formBox">
                <form>
                    <div className="IssuerP_formTitle">
                        <span>채용공고 기본설정</span>
                        <span style={{fontSize: 18}}>
                            <span style={{color: "red"}}>*</span>
                            필수 입력항목
                        </span>
                    </div>
                    <hr />
                    <dl className="IssuerP_form_row">
                        <dt className="IssuerP_form_tag">기업로고</dt>
                        <dd className="IssuerP_form_inputBox">
                            <div style={{width: "50%"}}>
                                <p className="IssuerP_form_infoBold">사진등록</p> 
                                <p className="IssuerP_form_info">
                                    ※ 입사페이지에 들어갈 로고를 삽입합니다.<br />
                                    ※ 로고 미삽입 시 로고란은 기본로고로 대체됩니다.<br />
                                    ※ 확장자 jpg만 가능하고 파일 당 최대 1MB 가능.
                                </p>
                                <div style={{display: "flex"}}>
                                    <label htmlFor="logo" className="IssuerP_fileInputBtn">찾아보기</label>
                                    <input id="logo" type="file" style={{display: "none"}}/>
                                </div>
                            </div>
                            <div style={{width: "50%"}}>
                                <div className="IssuerP_form_dummyLogo"></div>
                            </div>
                        </dd>
                    </dl>
                    <dl className="IssuerP_form_row">
                        <dt className="IssuerP_form_tag">공고제목</dt>
                        <dd className="IssuerP_form_inputBox">
                            <Input className="IssuerP_form_inputStyle" id="title" onChange={onChange}/>
                        </dd>
                    </dl>
                    <dl className="IssuerP_form_row">
                        <dt className="IssuerP_form_tag">지원기간</dt>
                        <dd className="IssuerP_form_inputBox">
                            <Input placeholder="시작일" type="date" className="IssuerP_form_inputStyle" />
                            {"\u00a0\u00a0  ~  \u00a0\u00a0"}
                            <Input placeholder="종료일" type="date" className="IssuerP_form_inputStyle" id="expired" onChange={onChange}/>
                        </dd>
                    </dl>
                    <dl className="IssuerP_form_row">
                        <dt className="IssuerP_form_tag">채용공지</dt>
                        <dd className="IssuerP_form_inputBox">
                            <div>
                                <p className="IssuerP_form_infoBold">채용공고내용, 주의사항 등을 기입합니다.</p>
                                <Input className="IssuerP_form_inputStyle" />
                            </div>
                        </dd>
                    </dl>
                    <dl className="IssuerP_form_row">
                        <dt className="IssuerP_form_tag">카테고리 선택</dt>
                        <dd className="IssuerP_form_inputBox">
                            <div style={{width: "100%"}}>
                                <p className="IssuerP_form_infoBold">이력서 내 구성요소들을 선택할 수 있습니다.</p>
                                <div className="IssuerP_form_checkBoxList">
                                    <div className="IssuerP_form_checkBox_warp">
                                        <Input onChange={onChecked} id="basicInfo" defaultChecked disabled className="IssuerP_form_checkBox" type="checkbox"></Input>
                                        <label htmlFor="basicInfo" className="IssuerP_form_infoBold">기본정보</label>
                                    </div>
                                    <div className="IssuerP_form_checkBox_warp">
                                        <Input onChange={onChecked} id="personalInfo" className="IssuerP_form_checkBox" type="checkbox"></Input>
                                        <label htmlFor="personalInfo" className="IssuerP_form_infoBold">인적사항</label>
                                    </div>
                                    <div className="IssuerP_form_checkBox_warp">
                                        <Input onChange={onChecked} id="educationalHistory" className="IssuerP_form_checkBox" type="checkbox"></Input>
                                        <label htmlFor="educationalHistory" className="IssuerP_form_infoBold">학력정보</label>
                                    </div>
                                    <div className="IssuerP_form_checkBox_warp">
                                        <Input onChange={onChecked} id="languageSkills" className="IssuerP_form_checkBox" type="checkbox"></Input>
                                        <label htmlFor="languageSkills" className="IssuerP_form_infoBold">어학능력</label>
                                    </div>
                                    <div className="IssuerP_form_checkBox_warp">
                                        <input onChange={onChecked} id="otherVc" className="IssuerP_form_checkBox" type="checkbox"></input>
                                        <label htmlFor="otherVc" className="IssuerP_form_infoBold">기타증명서</label>
                                    </div>
                                    <div className="IssuerP_form_checkBox_warp">
                                        <Input onChange={onChecked} id="selfIntroduction" className="IssuerP_form_checkBox" type="checkbox"></Input>
                                        <label htmlFor="selfIntroduction" className="IssuerP_form_infoBold">자기소개서</label>
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>
                    {theCategory()}
                    <dl className="IssuerP_form_row">
                        <dt className="IssuerP_form_tag">완료링크</dt>
                        <dd className="IssuerP_form_inputBox">
                            <Input id="url" placeholder="채용관련 자사 홈페이지 링크주소" onChange={onChange} className="IssuerP_form_inputStyle" />
                        </dd>
                    </dl>
                </form>
            </div>        
            <div className="issuerI_submitBox">
                <button className="issuerI_submitBtn" onClick={onSubmit}>채용공고 등록하기</button>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {memberId: state.memberId}
}

export default connect(mapStateToProps, null) (IssuerPost)