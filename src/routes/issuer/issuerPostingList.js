import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Button, Table } from "antd";
import "./css/issuerPostingList.css"
import { Link } from "react-router-dom";
import Headline from "../../component/headline"
import issuerPL_headline from "../../img/headline/issuerPL_headline.png"

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

// import DummyVerifierPostingList from "../../dummy/dummyVerifierPostingList";

function IssuerPostingList(userObjInStore) {

    const [ postingList, setPostingList ] = useState([])
    
    const navigate = useNavigate()
    useEffect(() => {
        // 채용공고 목록 불러오기
        axios({
            url: `http://localhost:8080/verifier/post-list/${userObjInStore.memberId}`,
            method: "GET",
            withCredentials: true,
        })
        // setPostingList에 저장
        .then((res) => {
            setPostingList(res.data)
        })
        // 오류핸들링
        .catch(() => {
            message.error("채용공고 가져오기 실패");
            navigate("/issuer/issue")
        });
    }, [navigate, userObjInStore])

    // useEffect(() => {
    //     setPostingList(DummyVerifierPostingList)
    // },[])
    

    function makePostingList() {
        
        const lengthCounter = postingList.length
        const PLdata = []
        for (let i=0; i < lengthCounter; i++) {
            PLdata.push({
                key: i,
                num: i+1,
                title: postingList[i].title,
                applicant: `${postingList[i].people} 명`,
                verifiy: 
                    <Link
                        key={i} 
                        to={`/issuer/verifiy/${postingList[i].id}`}
                        state={{
                            postId: postingList[i].id,
                            title: postingList[i].title,
                        }}
                    >
                        <Button className="issuerPL_btn">상세보기</Button>
                    </Link>,
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
    
    const subtitle = "등록한 채용공고를 확인할 수 있습니다."

    return(
        <div className="issuerPL_bg">
            {Headline(issuerPL_headline, 650, subtitle, 870)}
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
    return {memberId: state.memberId}
}

export default connect(mapStateToProps, null) (IssuerPostingList)