import { Link } from "react-router-dom";
import ConnectCaver from "./component/connectCaver";
import abi from "./component/abi.json"

function VerifierHome() {

    let provider = null

    if (typeof window.klaytn !== "undefined") {
        // Kaikas user detected. You can now use the provider.
        provider = window["klaytn"];
    }

    async function onKaikas() {
        try {
            const wallet = await window.klaytn.enable()
            console.log(wallet)
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
        return ConnectCaver(provider)
    }
    function onKaikasCaver() {
        
        const did=`did:vone:${provider.selectedAddress.slice(2)}`
        const vcId="caverTest1"
        const hashed="caverTest1"
        const contractAddress ="0x967FE285D361601FA7b8C6559d6FaC34b189E956";
        
        const myContract = new window.caver.klay.Contract(abi, contractAddress)
        
        myContract.methods
        .issueVC(
            did,vcId,hashed
        )
        .send({
            from: provider.selectedAddress,
            gas: "7500000",
        });
    
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
            <button onClick={onKaikasCaver}>kaikas.caver</button>
        </div>
    )
}

export default VerifierHome