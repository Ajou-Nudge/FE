import { connect } from "react-redux";
import { useState, useEffect } from "react";
import DummyVcList from "../../dummy/dummyVcList";
import { Table } from "antd";
import "./css/issuerVcList.css"
import Headline from "../../component/headline";
import issuerVL_headline from "../../img/headline/issuerVL_headline.png"

// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { message } from "antd";

function IssuerVcList({userIdInStore}) {

    const [ vcList, setVcList ] = useState([])

    // const navigate = useNavigate()

    // useEffect(() => {
    //     // redux에 저장되어있는 issuer 아이디로 발행된 vc 요청
    //     axios({
    //         url: `/issuer/vc-list/:${userIdInStore}`,
    //         method: "GET",
    //         withCredentials: true,
    //     })
    //     // setVcList에 저장
    //     .then((res) => {
    //         setVcList(res)
    //     })
    //     // 오류핸들링
    //     .catch(() => {
    //         message.error("자격증 가져오기 실패");
    //         navigate("/issuer")
    //     });
    // }, [navigate, userIdInStore])

    useEffect(() => {
        setVcList(DummyVcList)
    }, [])
    
    function makeVCList() {
        
        const lengthCounter = vcList.length
        const VLdata = []
        for (let i=0; i < lengthCounter; i++) {
            VLdata.push({
                key: i,
                num: i+1,
                date: vcList[i].credentialSubject["date"],
                title: vcList[i].credentialSubject["title"],
                name: vcList[i].credentialSubject["name"],
            })
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
                <div className="issuerVL_vcCounter_margin">
                    <p className="issuerVL_vcCounter_text">총 {vcList.length}건</p>
                </div>
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
    return {userIdInStore: state._id}
}

export default connect(mapStateToProps, null) (IssuerVcList)