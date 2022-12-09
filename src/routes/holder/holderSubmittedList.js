
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined  } from '@ant-design/icons';
import holderSVL_headLine from "../../img/headline/holderSVL_headline.png"
import Headline from "../../component/headline";
import "./css/holderSubmittedList.css"
import useResize from "../../component/useResize";

import DummySubmittedList from "../../dummy/dummySubmittedList";

// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { message } from "antd";

function HolderSubmittedList(userObjInStore) {

    const [ vcList, setVcList ] = useState([])
    const [ width ] = useResize()

    // const navigate = useNavigate()

    // useEffect(() => {
    //     // redux에 저장되어있는 issuer 아이디로 발행된 vc 요청
    //     axios({
    //         url: `http://localhost:8080/holder/submitted-vc-list/${userObjInStore.memberId}`,
    //         method: "GET",
    //         withCredentials: true,
    //     })
    //     // setVcList에 저장
    //     .then((res) => {
    //         setVcList(res.data)
    //     })
    //     // 오류핸들링
    //     .catch(() => {
    //         message.error("제출 이력 가져오기 실패");
    //         navigate("/holder")
    //     });
    // }, [navigate, userObjInStore])

    useEffect(() => {
        setVcList(DummySubmittedList)
    }, [])
    
    function makeVcList() {

        const lengthCounter = vcList.length
        const List = []
        for (let i=0; i < lengthCounter; i++){
            function icon(state) {
                switch(state) {
                    case "confirmed" :
                        return <CheckCircleOutlined className="holderSVL_icon1" />
                    case "pending" :
                        return <ClockCircleOutlined className="holderSVL_icon2" />
                    case "canceled" :
                        return <CloseCircleOutlined className="holderSVL_icon3" />
                    default :
                        return "err"
                }
            }
            List.push(
                <div key={i} className="holderSVL_SVlist">
                    {icon(vcList[i].status)}
                    <div className="holderSVL_spaceBetween">
                        <div className="holderSVL_verifierAndDate">
                            <p className="holderSVL_verifierAndTitle">{vcList[i].verifier}</p>
                            <p className="holderSVL_dateAndState">{vcList[i].date}</p>
                        </div>
                        <div className="holderSVL_titleAndState">
                            <p className="holderSVL_verifierAndTitle">{vcList[i].title}</p>
                            <p className="holderSVL_dateAndState">{vcList[i].status}</p>
                        </div>
                    </div>
                </div>
            )
        }
        return List
    }

    function makeVcList_min() {

        const lengthCounter = vcList.length
        const List = []
        for (let i=0; i < lengthCounter; i++){
            function icon(state) {
                switch(state) {
                    case "confirmed" :
                        return <p className="holderSVL_icon1">●</p>
                    case "pending" :
                        return <p className="holderSVL_icon2">●</p>
                    case "canceled" :
                        return <p className="holderSVL_icon3">●</p>
                    default :
                        return "err"
                }
            }
            List.push(
                <div key={i} className="holderSVL_SVlist">
                    {icon(vcList[i].status)}
                    <div className="holderSVL_spaceBetween_min">
                        <div className="holderSVL_verifierAndDate">
                            <p className="holderSVL_verifierAndTitle_min">{vcList[i].verifier}</p>
                            <p className="holderSVL_verifierAndTitle_min" style={{fontSize:"large", marginBottom:"20px"}}>{vcList[i].title}</p>
                            
                            <div className="holderSVL_titleAndState_min">
                                <p className="holderSVL_dateAndState">{vcList[i].date}</p>
                                <p className="holderSVL_dateAndState">{vcList[i].status}</p>
                            </div>
                        </div>
                    </div>
                </div> 
            )
        }
        return List
    }



    const subtitle = "여러분의 증명, 인증서 제출이력을 확인할 수 있습니다."
    
    return(
        <div className="holderSVL_bg">
            {Headline( holderSVL_headLine, 600, subtitle, 870 )}
            <div style={{backgroundColor: "rgb(250, 250, 250)"}}>
                <div className="holderSVL_SVL_outerbox">
                    <div className="holderSVL_SVL_innerbox">
                        {700 < width ? makeVcList() : makeVcList_min()}
                    </div>
                </div>
            </div>
            <div>{width}</div>
        </div>
    )
}

function mapStateToProps(state) {
    return {memberId: state.memberId}
}

export default connect(mapStateToProps, null) (HolderSubmittedList)