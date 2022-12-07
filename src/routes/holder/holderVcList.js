import { connect } from "react-redux"
import { useState, useEffect, useRef } from "react";
import { Button, Table, Switch } from "antd";
import { FilePdfOutlined } from "@ant-design/icons"
import { useReactToPrint } from "react-to-print";
import Pdf from "./component/pdf";
import Headline from "../../component/headline";
import holderVL_headline from "../../img/headline/holderVL_headline.png";
import logo1 from "../../img/상공회의소.png"
import logo2 from "../../img/ajou_log.png"
import "./css/holderVcList.css"

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

// import DummyVcList from "../../dummy/dummyVcList";

function HolderVcList(userObjInStore) {

    
    const componentRef = useRef([])
    const [ vcList, setVcList ] = useState([])
    const [ displayMod, setDisplayMod ] = useState("list")
    const [ cursor, setCursor ] = useState(1)
    //const [ checked, setChecked ] = useState([])
    
    // // 더미데이터 주입
    // useEffect( () => {
    //     setVcList(DummyVcList)
    // }, [] )


    const navigate = useNavigate()
    // store.js에서 id 가져와 BE에 요청보내기
    useEffect(() => {
        axios({
            url: `http://localhost:8080/holder/vc-list/${userObjInStore.memberId}`,
            method: "GET",
            withCredentials: true,
        })
        .then((res) => {
            setVcList(res.data)
        })
        .catch(() => {
            messageError("자격증 가져오기 실패");
            navigate("/holder")
        });
    },[navigate, userObjInStore.memberId])

    function messageError(msg) {
        message.error(msg);
    };
    function messageSuccess(msg) {
        message.success(msg);
    };

    function onMouse(e) {
        setCursor(e.target.id)
    }

    function onPrint(i) {
        return(
            (vcList[i].issuer === userObjInStore.memberId) ?
            handleSelfVcPrint : handlePrint
        )
    }

    // 해당 hook은 반드시 onClick에 위치하며 선택대상의 id 따오는 것이 불가능 -> onMouse 이벤트리스너로 cursor에 선택대상 id 따오기
    const handlePrint = useReactToPrint({
        // content : pdf로 뿌려줄 대상의 위치를 ref로 요구
        content: () => componentRef.current[cursor]
    })

    function handleSelfVcPrint() {
        axios({
            url: `http://localhost:8080/holder/file/3`,
            method: "GET",
            withCredentials: true,
            responseType: "blob"
        })
        .then((res) => {
            const name = res.headers["content-disposition"]
            .split("filename=")[1]
            .replace(/"/g, "");
            console.log(name)
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", name);
            link.style.cssText = "display:none";
            document.body.appendChild(link);
            link.click();
            link.remove();
            messageSuccess("자격증 가져오기 성공")
        })
        .catch(() => {
            messageError("자격증 가져오기 실패");
        });
    }
    
    // 받아온 vc 개수만큼 화면에 뿌려주기
    function makeVcList() {
        const data = []
        // title, date는 필수적으로 있을 것이라 가정하고 진행
        for (let i=0; i < vcList.length; i++) {
            data.push({
                key: i,
                num: i+1,
                title: vcList[i].context,
                date: vcList[i].credentialSubject.value2,
                issuer: vcList[i].issuer,
                // pdf 인쇄버튼 란 추가, component로 분리하려했으나, useRef 훅 사용 제약으로 통합하여 진행함.
                pdf: 
                    <div className="holderVL_vcBox_print" id={i} onMouseEnter={onMouse}>
                        <label htmlFor={`button${i}`}><FilePdfOutlined /></label>
                        <div style={{ display:"none" }}>
                            <div ref={ rf => (componentRef.current[i] = rf)}>
                                {/* // pdf 모듈이 반드시 onclick에 위치해야하는 hook 사용, event 사용 불가능함으로 마우스가 위치한 곳의 id 추출하는 로직 추가 */}
                                <button id={`button${i}`} onClick={onPrint(i)} />
                                <Pdf
                                    title={vcList[i].context}
                                    content={vcList[i].context}
                                    getDate={vcList[i].credentialSubject.value2}
                                    user={vcList[i].credentialSubject.value1}
                                    organization={vcList[i].issuer}
                                    logo={(vcList[i].issuer === "대한상공회의소") ? logo1 : logo2}
                                />
                            </div>
                        </div>
                    </div>,
                check: <input disabled={(vcList[i].issuer === userObjInStore) ? false : true } type={"checkbox"} />
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
                title: "pdf",
                dataIndex: "pdf",
                key: "pdf",
            },
            {
                title: "선택",
                dataIndex: "check",
                key: "check",
            }
        ]

        return <Table pagination={{position: ["bottomCenter"]}} columns={columns} dataSource={data} />
        
    }


    // vc 리스트 카드 형식으로 뿌려주기
    function makeVcCard() {
        return (
            <div className="holderVL_vcBox_cards">
                {/* // i는 리스트 안 요소의 순번의미 */}
                {vcList.map((vc, i) => {
                    return (
                        // pdf 모듈이 반드시 onclick에 위치해야하는 hook 사용, event 사용 불가능함으로 마우스가 위치한 곳의 id 추출하는 로직 추가
                        <div onClick={handlePrint} onMouseEnter={(e) => {setCursor(e.target.id)}} id={vcList.length + 1 + i} key={i} className="holderVL_vcBox_card">
                            <img className="holderVL_vcBox_card_img" alt="logo" src={(vc.issuer === "대한상공회의소") ? logo1 : logo2}></img>
                            <div className="holderVL_vcBox_card_text">
                                {`발급기관: ${vc.issuer}`}<br />
                                {`직무분야: ${vc.context}`} <br />
                                {`취득일자: ${vc.credentialSubject.value2}`}
                            </div>
                            <div style={{ display:"none" }}>
                                <div ref={ rf => (componentRef.current[vcList.length + 1 + i]) = rf}>
                                <Pdf
                                    title={vcList[i].context}
                                    content={vcList[i].context}
                                    getDate={vcList[i].credentialSubject.value2}
                                    user={vcList[i].credentialSubject.value1}
                                    organization={vcList[i].issuer}
                                    logo={(vcList[i].issuer === "대한상공회의소") ? logo1 : logo2}
                                />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
 


    // 인증서 생성 방식 핸들링
    function onSwitch(e) {
        if (e === true) {
            setDisplayMod("card")
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
                    {(displayMod === "card") ? makeVcCard() : makeVcList()}
                </div>
                <div className="holderVL_btnBox">                
                    <div style={{float: 'left'}}><a href="/holder/issue"><Button className="holderVL_btn">등록하기</Button></a></div>             
                    <div style={{float: 'left'}} />
                    <div style={{float: 'right'}}><Button onClick={onDelete} className="holderVL_btn">선택인증서 삭제</Button></div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {memberId: state.memberId}
}
export default connect(mapStateToProps, null) (HolderVcList)