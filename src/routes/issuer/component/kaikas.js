import abi from "./abi.json"

async function ConnectKaikas(res) {

    const vcId = Object.keys(res)
    const hashed = Object.values(res)

    const caver = window.caver
    let provider = null

    if (typeof window.klaytn !== "undefined") {
        // Kaikas user detected. You can now use the provider.
        provider = window["klaytn"];
    }

    try {
        const wallet = await window.klaytn.enable()
        const userAdress = await provider.selectedAddress
        const did=`did:vone:${userAdress.slice(2)}`
        const contractAddress = "0x967FE285D361601FA7b8C6559d6FaC34b189E956";
    
        const myContract = new caver.klay.Contract(abi, contractAddress)
        
        myContract.methods
        .issueVCs(
            did,vcId,hashed
        )
        .send({
            from: provider.selectedAddress,
            gas: "7500000",
        })
        .then(() => {
            return console.log(`블록체인 등록 성공: ${wallet}`)
        })
        .catch((err) => {
            return console.log(`블록체인 등록 오류: ${err}` )
        })
        
    } catch (error) {
        console.log("카이카스 로그인 에러: "+error)
    }


}

export default ConnectKaikas