import abi from "./abi.json"

async function KaikasCaver(vcId, hashed) {

    const caver = window.caver
    let provider = null

    if (typeof window.klaytn !== "undefined") {
        // Kaikas user detected. You can now use the provider.
        provider = window["klaytn"];
    }

    try {
        const wallet = await window.klaytn.enable()
        console.log(wallet)
        // const did=`did:vone:${provider.selectedAddress.slice(2)}`
        // const contractAddress = "0x967FE285D361601FA7b8C6559d6FaC34b189E956";
        // // const vcId="caverTest4"
        // // const hashed="caverTest4"
    
        // const myContract = new caver.klay.Contract(abi, contractAddress)
        
    
        // myContract.methods
        // .issueVC(
        //     did,vcId,hashed
        // )
        // .send({
        //     from: provider.selectedAddress,
        //     gas: "7500000",
        // })
        // .then(() => {
        //     return "블록체인 등록 성공"
        // })
        // .catch((err) => {
        //     return `블록체인 등록 오류: ${err}` 
        // })
        
    } catch (error) {
        console.log("카이카스 로그인 에러: "+error)
    }


}

export default KaikasCaver