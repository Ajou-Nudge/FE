import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd"

function VerifierPost(userObjInStore) {

    const navigate = useNavigate();
    const[posting, setPosting] = useState({})
    const userId = userObjInStore

    useEffect( () => {
        setPosting(
            {
                verifierId: userId,
                name: "",
                expired: "",
                required: [],
                url: ""
            }
        )}
    , [userId])

    function onChange(e) {
        const modified = posting
        const key = e.target.id
        modified[key] = e.target.value
        setPosting(modified)
    }

    function onClick() {
        axios({
            url: "/verifier/post",
            method: "POST",
            data: posting,
            withCredentials: true,
        })
        .then((res) => {
            message.success("공고 업로드 성공")
            navigate("/verifier")
        })
        .catch(() => {
            message.error("업로드 실패");
        });
    }

    return(
        <div>
            <h1>VerifierPost</h1>
            <hr />
            <div>제목</div>
            <input id="name" onChange={onChange}></input>
            <div>만료일</div>
            <input id="expired" onChange={onChange} type={"date"}></input>
            <div>요구증명서</div>
            <input id="required" onChange={onChange}></input>
            <div>url</div>
            <input id="url" onChange={onChange}></input>
            <hr />
            <button onClick={onClick}>업로드</button>
            <Link to="/verifier">
                <button>홈으로</button>
            </Link>
        </div>
    )
}

function mapStateToProps(state) {
    return {userObjInStore: state._id}
}

export default connect(mapStateToProps, null) (VerifierPost)