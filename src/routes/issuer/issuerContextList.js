import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import "./css/issuerContextList.css"
import { Table, Button, Input } from "antd";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

// import DummyContextList from "../../dummy/dummyContextList";

function IssuerContextList({userIdInStore}) {

    const [ contextList, setContextList ] = useState([])
    // 창 가로크기 측정 코드, inner 850px 기준, className으로 반응
    const[ widthHandle, setWidthHandle ] = useState("")
    function handleResize() {
        if (window.innerWidth > 870) {
            setWidthHandle("")
        } else {
            setWidthHandle("_minmize")
        }
    }
    useEffect(() => {
        return window.addEventListener("resize", handleResize)
    })

    const navigate = useNavigate()

    useEffect(() => {
        // redux에 저장되어있는 issuer 아이디로 발행된 vc 요청
        axios({
            url: `http://localhost:8080/issuer/context-list`,
            method: "GET",
            withCredentials: true,
        })
        // setVcList에 저장
        .then((res) => {
            setContextList(res.data)
        })
        // 오류핸들링
        .catch(() => {
            message.error("양식 가져오기 실패");
            navigate("/issuer")
        });
    }, [navigate, userIdInStore])

    // useEffect(() => {
    //     setContextList(DummyContextList)
    // }, [])
    
    function makeContextList() {
        
        const lengthCounter = contextList.length
        const CLdata = []
        for (let i=0; i < lengthCounter; i++) {
            const values = Object.values(contextList[i].credentialSubject)
            const certificateValues = values.filter((value) => {
                return value !== null
            })
            CLdata.push({
                key: contextList[i].context,
                num: i+1,
                detail: 
                    <div>
                        {certificateValues.map((keys) => {
                            return <div key={`map${keys}`}>{keys}: 필수기재</div>
                        })}
                    </div>,
                link: 
                    <Link 
                        key={i} 
                        to={`/issuer/createContext}`}
                        state={{
                            context: contextList[i].context,
                            credentialSubject: contextList[i].credentialSubject,
                        }}
                    >
                        <Button className="issuerCL_btn">수정하기</Button>
                    </Link>
            })
        }

        function columns() {
            if (widthHandle === "") {
                return ([
                    {
                        title: "번호",
                        dataIndex: "num",
                        key: "num",
                    },
                    {
                        title: "인증서",
                        dataIndex: "key",
                        key: "key",
                    },
                    {
                        title: "기제정보",
                        dataIndex: "detail",
                        key: "detail",
                    },
                    {
                        title: "",
                        dataIndex: "link",
                        key: "link",
                    }
                ])
            } else {
                return ([
                    {
                        title: "번호",
                        dataIndex: "num",
                        key: "num",
                    },
                    {
                        title: "인증서",
                        dataIndex: "key",
                        key: "key",
                    },
                    {
                        title: "기제정보",
                        dataIndex: "detail",
                        key: "detail",
                    },
                ])
            }
        }
        

        return <Table pagination={{position: ["bottomCenter"]}} className="issuerCL_CLtext" columns={columns()} dataSource={CLdata} />
    }
    
    return(
        <div className="issuerCL_bg">
            <div className="issuerCL_headLineBox">
                <div className={`issuerCL_headLine${widthHandle}`}>
                    인증서양식{">"} 
                    <span style={{color: "#0bb38e"}}>양식관리</span>
                </div>
            </div>
            <div className={`issuerCL_searchBox${widthHandle}`}>
                <p style={{maxWidth: '60vw'}}>
                    등록한 인증서양식을 확인할 수 있습니다.
                </p>
                <div style={(widthHandle === "") ? {} : {display:"none"}}>
                    <Input className="issuerCL_search"/>
                    <Button className="issuerCL_searchBtn">검색</Button>
                    <Link to="/issuer/createContext">
                        <Button className="issuerCL_addBtn"> + </Button>
                    </Link>
                </div>
            </div>
            <div className="issuerCL_CLbg">
                <div className="issuerCL_CLmargin">
                    <ul>{makeContextList()}</ul>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {userIdInStore: state.userType}
}

export default connect(mapStateToProps, null) (IssuerContextList)