import { Link } from "react-router-dom";

function VerifierHome() {
    return(
        <div>
            <h1>IssuerHome</h1>
            <Link to="/verifier/post">
                <button>채용공고 등록</button>
            </Link>
            <Link to="/verifier/PostingList">
                <button>제출받은 인증서 목록</button>
            </Link>
        </div>
    )
}

export default VerifierHome