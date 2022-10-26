import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Button, Table, Input } from "antd";
import "./css/issuerPostingList.css"
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { message } from "antd";
import DummyVerifierPostingList from "../../dummy/dummyVerifierPostingList";
import { Link } from "react-router-dom";

function IssuerPostingList({userIdInStore}) {

    const [ postingList, setPostingList ] = useState([])
    const[ widthHandle, setWidthHandle ] = useState("")

    
    // 창 가로크기 측정 코드, inner 850px 기준, className으로 반응
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
    
    // const navigate = useNavigate()

    // useEffect(() => {
    //     // redux에 저장되어있는 issuer 아이디로 발행된 vc 요청
    //     axios({
    //         url: `/verifier/postList/:${userIdInStore}`,
    //         method: "GET",
    //         withCredentials: true,
    //     })
    //     // setVcList에 저장
    //     .then((res) => {
    //         setPostingList(res)
    //     })
    //     // 오류핸들링
    //     .catch(() => {
    //         message.error("채용공고 가져오기 실패");
    //         navigate("/issuer/issue")
    //     });
    // }, [navigate, userIdInStore])

    useEffect(() => {
        setPostingList(DummyVerifierPostingList)
    },[])
    

    function makePostingList() {
        
        const lengthCounter = postingList.length
        const PLdata = []
        for (let i=0; i < lengthCounter; i++) {
            PLdata.push({
                key: i,
                num: i+1,
                title: postingList[i].name,
                applicant: `${postingList[i].people} 명`,
                verifiy: <Link><Button className="issuerPL_btn">상세보기</Button></Link>,
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
                    title: "공고사항",
                    dataIndex: "title",
                    key: "title",
                },
                {
                    title: "지원자",
                    dataIndex: "applicant",
                    key: "applicant",
                },
                {
                    title: "",
                    dataIndex: "verifiy",
                    key: "verifiy",
                },
            ])
        }
        return <Table scroll={{x:500}} pagination={{position: ["bottomCenter"]}} className="issuerPL_PLtext" columns={columns()} dataSource={PLdata} />
    }
    
    return(
        <div className="issuerPL_bg">
            <div className="issuerPL_headLineBox">
                <div className={`issuerPL_headLine${widthHandle}`}>
                    채용공고{">"} 
                    <span style={{color: "#0bb38e"}}>공고내역</span>
                </div>
            </div>
            <div className={`issuerPL_searchBox${widthHandle}`}>
                <p style={{maxWidth: '60vw'}}>
                    등록한 채용공고를 확인할 수 있습니다.
                </p>
                <div style={(widthHandle === "") ? {} : {display:"none"}}>
                    <Input className="issuerPL_search"/>
                    <Button className="issuerPL_searchBtn">검색</Button>
                </div>
            </div>
            <div className="issuerPL_vcButtonBar_bg">
                <div className="issuerPL_vcButtonBar_btn">
                    <p className="issuerPL_vcButtonBar_text">총 {postingList.length}건</p>
                </div>
                <Button className="issuerPL_vcButtonBar_btn" style={{width:"50px", marginLeft:"15px"}}>
                    <Link to="/issuer/post">
                        <p className="issuerPL_vcButtonBar_post">+</p>
                    </Link>
                </Button>
            </div>
            <div className="issuerPL_PLbg">
                <div className="issuerPL_PLmargin">
                    <div>{makePostingList()}</div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {userIdInStore: state._id}
}

export default connect(mapStateToProps, null) (IssuerPostingList)