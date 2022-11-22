import { Link } from "react-router-dom";
import connectCaver from "./component/connectCaver";

function VerifierHome() {

    let provider = null

    if (typeof window.klaytn !== "undefined") {
        // Kaikas user detected. You can now use the provider.
        provider = window["klaytn"];
    }

    async function onKaikas() {
        try {
            const wallet = await window.klaytn.enable()
            const version = await window.klaytn.networkVerson
            console.log(wallet)
            console.log(version)
        } catch (error) {
            console.log(error)
        }
    }
    function onSend() {
        const transactionParameters = {
            gas: "21000",
            to: "0xe59b405A7153F6e48439c5b50B12a3b6AF028f3F",
            from: provider.selectedAddress,
            value: "1100000000000000",
        };
        provider.sendAsync(
            {
              method: "klay_sendTransaction",
              params: [transactionParameters],
              from: provider.selectedAddress,
            },
            () => {
                return console.log("작동함")
            }
        );
    }
    function onCaver() {
        return connectCaver()
    }

    return(
        <div>
            <h1>VerifierHome</h1>
            <Link to="/verifier/post">
                <button>채용공고 등록</button>
            </Link>
            <Link to="/verifier/PostingList">
                <button>제출받은 인증서 목록</button>
            </Link>
            <button onClick={onKaikas}>카이카스 로그인</button>
            <button onClick={onSend}>1 클레이튼 코인 전송</button>
            <button onClick={onCaver}>caver</button>
        </div>
    )
}

export default VerifierHome