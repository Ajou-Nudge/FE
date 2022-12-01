import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Table } from "antd";
import "./css/issuerVcList.css"
import Headline from "../../component/headline";
import issuerVL_headline from "../../img/headline/issuerVL_headline.png"

// // 더미
// import DummyVcList from "../../dummy/dummyVcList";
// import DummyContextList from "../../dummy/dummyContextList";

// 백엔드
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

function IssuerVcList({userObjInStore}) {

    const [ vcList, setVcList ] = useState([])
    const [ contextList, setContextList ] = useState([])
    const [ selectedContext, setSelectedContext ] = useState("인증서를 선택해주세요.")


    // 백엔드 연결
    useEffect(() => {
        // redux에 저장되어있는 issuer 아이디로 발행된 모든vc 요청
        axios({
            url: `http://localhost:8080/issuer/vc-list`,
            method: "GET",
            withCredentials: true,
        })
        // setVcList에 저장
        .then((res) => {
            setVcList(res.data)
        })
        // 오류핸들링
        .catch(() => {
            message.error("자격증 가져오기 실패");
        });
    }, [userObjInStore])
    
    // 서버에서 issuer의 context정보 불러오기
    useEffect(() => {
        axios({
            url: `http://localhost:8080/issuer/context-list`,
            method: "GET",
            withCredentials: true,
        })
        .then((res) => {
            setContextList(res.data)
        })
        .catch(() => {
            message.error("자격증 양식 가져오기 실패");
        });
    }, [userObjInStore])

    // // 더미 연결
    // useEffect(() => {
    //     setVcList(DummyVcList)
    //     setContextList([...DummyContextList])
    // }, [])

    // 유저가 선택한 자격증 종류 핸들링
    function contextSelect (e) { 
        setSelectedContext(e.target.value)
    }
    

    // vc 리스트 뿌려주기
    function makeVCList() {    
        const VLdata = []

        // 사용자가 설정한 필터 걸러주기, "인증서를 선택해주세요."는 기본값, 예외처리
        if (selectedContext === "인증서를 선택해주세요.") {
            for (let i=0; i < vcList.length; i++) {
                VLdata.push({
                    key: i,
                    num: i+1,
                    date: vcList[i].vc.credentialSubject["value2"],
                    title: vcList[i].vc.context,
                    name: vcList[i].vc.credentialSubject["value1"],
                })
            }
        } else {
            const selectedList = vcList.filter((vc) => 
                vc.vc.context === selectedContext
            )
            for (let i=0; i < selectedList.length; i++) {
                VLdata.push({
                    key: i,
                    num: i+1,
                    date: selectedList[i].vc.credentialSubject["value2"],
                    title: selectedList[i].vc.context,
                    name: selectedList[i].holderId,
                })
            }
        }

        function columns() {
                return ([
                {
                    title: "번호",
                    dataIndex: "num",
                    key: "num",
                },
                {
                    title: "발급일자",
                    dataIndex: "date",
                    key: "date",
                },
                {
                    title: "인증서종류",
                    dataIndex: "title",
                    key: "title",
                },
                {
                    title: "이름",
                    dataIndex: "name",
                    key: "name",
                }
            ])
        }
        return <Table scroll={{x:420}} pagination={{position: ["bottomCenter"]}} className="issuerVL_VLtext" columns={columns()} dataSource={VLdata} />
    }

    const subtitle = "등록한 인증서양식을 확인할 수 있습니다."

    return(
        <div className="issuerVL_bg">
            {Headline(issuerVL_headline, 650, subtitle, 870)}
            <div className="issuerVL_vcCounter_bg">
                <div className="issuerVL_vcCounter_Counter">
                    <p className="issuerVL_vcCounter_text">
                        총 {vcList.length}건 {(selectedContext === "인증서를 선택해주세요.") ? "" : `중 ${vcList.filter(vc => vc.context === selectedContext).length}건`}
                    </p> 
                </div>
                <select
                    onChange={contextSelect}
                    className={`issuerVL_switch`}
                >   
                    <option id="default">인증서를 선택해주세요.</option>
                    {contextList.map((vc) => {
                        return <option key = {vc.context}>{vc.context}</option>;
                    })}
                </select>
            </div>
            <div className="issuerVL_VLbg">
                <div className="issuerVL_VLmargin">
                    <div>{makeVCList()}</div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {memberId: state.memberId}
}

export default connect(mapStateToProps, null) (IssuerVcList)