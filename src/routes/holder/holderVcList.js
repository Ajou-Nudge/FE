import { connect } from "react-redux"
import { useState, useEffect } from "react";
import DummyVcList from "../../dummy/dummyVcList";
import { Button, Table, Switch } from "antd";
import Headline from "../../component/headline";
import holderVL_headline from "../../img/headline/holderVL_headline.png";
import logo1 from "../../img/상공회의소.png"
import logo2 from "../../img/ajou_log.png"

// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { message } from "antd";

import "./css/holderVcList.css"

function HolderVcList(userIdInStore) {

    //const navigate = useNavigate()
    const [ vcList, setVcList ] = useState([])
    const [ displayMod, setDisplayMod ] = useState("list")
    //const [ checked, setChecked ] = useState([])
    
    useEffect( () => {
        setVcList(DummyVcList)
    }, [] )

    // store.js에서 id 가져와 BE에 요청보내기
    // useEffect(() => {
    //     axios({
    //         url: `/holder/vc-list/:${userIdInStore}`,
    //         method: "GET",
    //         withCredentials: true,
    //     })
    //     .then((res) => {
    //         setVcList(res)
    //     })
    //     .catch(() => {
    //         messageError("자격증 가져오기 실패");
    //         navigate("/holder")
    //     });
    // })
    // function messageError(msg) {
    //     message.error(msg);
    // };

    // 더미데이터 주입

    // 받아온 vc 개수만큼 화면에 뿌려주기
    function makeVcList() {
        const data = []
        // title, date는 필수적으로 있을 것이라 가정하고 진행
        for (let i=0; i < vcList.length; i++) {
            data.push({
                key: i,
                num: i+1,
                title: vcList[i].credentialSubject.title,
                date: vcList[i].credentialSubject.date,
                issuer: vcList[i].issuer,
                check: <input disabled={(vcList[i].issuer === userIdInStore) ? false : true } type={"checkbox"} />
            })
        }

        const columns = [
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
                title: "조회 인증서",
                dataIndex: "title",
                key: "title",
            },
            {
                title: "발급자",
                dataIndex: "issuer",
                key: "issuer",
            },
            {
                title: "선택",
                dataIndex: "check",
                key: "check",
            }
        ]

        return <Table pagination={{position: ["bottomCenter"]}} columns={columns} dataSource={data} />
        
    }

    function makeVcCard() {
        return (
            <div className="holderVL_vcBox_cards">
                {vcList.map((vc) => {
                    return (
                        <div key={vc.id} className="holderVL_vcBox_card">
                            <img className="holderVL_vcBox_card_img" alt="logo" src={vc.issuer === "대한상공회의소" ? logo1 : logo2}></img>
                            <p className="holderVL_vcBox_card_text">{vc.credentialSubject.title}</p>
                        </div>
                    )
                })}
            </div>
        )
    }

    // 인증서 생성 방식 핸들링
    function onSwitch(e) {
        if (e === true) {
            setDisplayMod("pdf")
        } else if (e === false) {
            setDisplayMod("list")
        } else {
            console.log("switch err")
        }
    }
    
    function onDelete() {

    }

    const subtitle = "여러분의 인증서를 확인 및 다운로드 할 수 있습니다. 키워드를 입력하여 검색해보세요."

    return(
        <div className="holderVL_bg">
            {Headline( holderVL_headline, 600, subtitle, 870 )}
            <div className="holderVL_vcBox_bg">
                <div className="holderVL_vcBox">
                    <Switch 
                        style={{ marginBottom:"30px", marginTop:"30px" }}
                        unCheckedChildren="리스트" 
                        checkedChildren="카드"
                        onChange={onSwitch}
                    ></Switch>           
                    {(displayMod === "pdf") ? makeVcCard() : makeVcList()}
                </div>
            </div>
            <div className="holderVL_btnBox">                
                <div style={{float: 'left'}}><Button className="holderVL_btn">등록하기</Button></div>             
                <div style={{float: 'left'}} />
                <div style={{float: 'right'}}><Button onClick={onDelete} className="holderVL_btn">선택인증서 삭제</Button></div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {userIdInStore: state._id}
}
export default connect(mapStateToProps, null) (HolderVcList)