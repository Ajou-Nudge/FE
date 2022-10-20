import { Link } from "react-router-dom";

function IssuerHome() {
    return(
        <div>
            <h1>IssuerHome</h1>
            <Link to="/issuer/createContext">
                <button>자격증 양식 등록</button>
            </Link>
            <Link to="/issuer/Issue">
                <button>자격증 발행</button>
            </Link>
            <Link to="/issuer/vcList">
                <button>발행이력 조회</button>
            </Link>
        </div>
    )
}

export default IssuerHome