import { connect } from "react-redux";
import { useState, useEffect } from "react";
import "./css/issuerVerifiy.css"
import issuerV_headline from "../../img/headline/issuerV_headline.png"
import Headline from "../../component/headline"

// import { StarOutlined, FileOutlined } from '@ant-design/icons'
// import DummyApplicantList from "../../dummy/dummyApplicantList";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { message } from "antd";
import axios from "axios";

function IssuerVerifiy(userIdInStore) {

    const [ applicantList, setApplicantList ] = useState([])

    const navigate = useNavigate()
    const location = useLocation()
    const posting = location.state

    // BE에서 제출된 vc 리스트 가져오기
    useEffect(() => {
        axios({
            url: `http://localhost:8080/verifier/submitted-vc-list/sjh3922@naver.com/${posting.postId}`,
            method: "GET",
            withCredentials: true,
        })
        .then((res) => {
            setApplicantList(res.data)
        })
        .catch(() => {
            messageError("검증목록 가져오기 실패");
            // navigate("/issuer")
        });
    }, [navigate, posting.postId])

    function messageError(msg) {
        message.error(msg);
    };

    // // 더미 vc가져오기
    // useEffect(() => {
    //     setApplicantList(DummyApplicantList)
    // }, [])
    
    // const today = new Date()

    // function makeVcList() {
    //     const lengthCounter = applicantList.length
    //     const List = []
    //     for (let i=0; i < lengthCounter; i++){
    //         List.push(
    //             <dl className="IssuerV_table_row" key={`row${i}`}>
    //                 <dt className="IssuerV_table_tag">
    //                     <p className="IssuerV_table_tagText">{applicantList[i].name}</p>
    //                     <p className="IssuerV_table_tagText">{"("}{applicantList[i].gender
    //                     } {"|"} {applicantList[i].birth}, {today.getFullYear() - parseInt(applicantList[i].birth) }세{")"}</p>
    //                 </dt>
    //                 <dd className="IssuerV_table_applicantBox">
    //                     <div>
    //                         <p>
    //                             <span className="IssuerV_table_career">경력 {parseInt(applicantList[i].career/12)}년 {parseInt(applicantList[i].career%12)}개월</span>
    //                             <span className="IssuerV_table_title">{applicantList[i].title}</span>
    //                         </p>
    //                         <p className="IssuerV_table_info">
    //                             {applicantList[i].education}<br />
    //                             {(applicantList[i].vc.length === 0) ? 
    //                                 "자격증 해당사항 없음" 
    //                                 : (applicantList[i].vc.length === 1) ?
    //                                     applicantList[i].vc["title"]
    //                                     : `인증서 ${applicantList[i].vc.length}개 `
    //                             }
    //                             {(applicantList[i].salary === "") ? "| 회사내규에 따름 " : `| ${applicantList[i].salary}만원 `}
    //                             {(applicantList[i].location === "") ? "| 전국" : `| ${applicantList[i].location.map((location) => { return ` ${location}`})}`}
    //                         </p>    
    //                     </div>
    //                     <div style={{height: "100%"}}>
    //                         <p className="IssuerV_table_submitDate">{applicantList[i].date}</p>
    //                         <p className="IssuerV_table_icons"><StarOutlined />{" | "}<FileOutlined /></p>
    //                     </div>
    //                 </dd>
    //             </dl>
    //         )
    //     }
    //     return List
        
    // }


    function onClick() {
        let vcIds = []
        applicantList.map((applicant) => {
            return vcIds.push(applicant.vcId)
        })

        axios({
            url: `http://localhost:8080/verifier/verify`,
            method: "POST",
            data: vcIds,
            withCredentials: true,
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
            messageError("검증 실패");
        });

    }

    const subtitle = "등록한 채용공고에 지원한 인원을 확인할 수 있습니다."

    return(
        <div className="issuerV_bg">
            {Headline(issuerV_headline, 600, subtitle, 870)}
            <div className="issuerV_vcButtonBar_bg">
                <div className="issuerV_vcButtonBar_btn">
                    <p className="issuerV_vcButtonBar_text">총 {applicantList.length}건</p>
                </div>
            </div>
            <div className="issuerV_table_margin">
                <hr />
                {/* <div>{makeVcList()}</div> */}
            </div>
            <div className="IssuerV_submitBox">
                <button className="IssuerV_submitBtn" onClick={onClick}>인증서 검증하기</button>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {userIdInStore: state.userType}
}

export default connect(mapStateToProps, null) (IssuerVerifiy)