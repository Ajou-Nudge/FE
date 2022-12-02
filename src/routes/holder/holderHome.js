import { Link } from "react-router-dom";

function HolderHome() {
    return(   
    <div>
        <h1>HolderHome</h1>
        <Link to="/holder/vcList">
            <button>증명서 리스트</button>
        </Link>
        <Link to="/holder/postingList">
            <button>채용공고 리스트</button>
        </Link>
        <Link to="/holder/submittedList">
            <button>제출된 증명서 리스트</button>
        </Link>
    </div>
    )
}

export default HolderHome