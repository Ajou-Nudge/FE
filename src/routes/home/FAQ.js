import "./css/FAQ.css"

function FAQ() {
    return(
        <div className="FAQ_bg">
            <div className="FAQ_margin">
                <h1 className="FAQ_title">FAQ</h1>
                <div>
                    <div className="FAQ_search_warp">
                        <select className="FAQ_select">
                            <option>전체</option>
                            <option>일반회원</option>
                            <option>기업회원</option>
                        </select>
                        <input className="FAQ_search" placeholder="검색어를 입력하세요."></input>
                    </div>
                </div>
                <div className="FAQ_tab_warp">
                    <button className="FAQ_tab1">전체</button>
                    <button className="FAQ_tab1">개인회원</button>
                    <button className="FAQ_tab1">기업회원</button>
                </div>
            </div>
        </div>
    )
}

export default FAQ