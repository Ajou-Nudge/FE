const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");
const dotenv = require("dotenv");
dotenv.config();

const contractAddress = "0x967FE285D361601FA7b8C6559d6FaC34b189E956";
const abi = require("./abi.json");
const did = process.env.DID;
const vcId = process.env.VCID;
const privateKey = process.env.PRIVATEKEY;
const hashed = process.env.HASH;

/*
    @ dev : Issue VC
    @ desc : VC를 발급합니다.
    @param did : DID Document ID. (did:vone:'publicKey')
    @param vcID : VC Id. 인증서 일련번호
    @param hashed : hash화된 값
    @param signKey : 요청을 보내는 sender의 Private Key(클레이튼 프라이빗 키)
*/
const IssueVC = async (did, vcId, hashed, signKey) => {
  let keyring;

  const keyringFromPrivateKey = caver.wallet.keyring.createFromPrivateKey(
  signKey
  );
  caver.wallet.add(keyringFromPrivateKey);
  keyring = keyringFromPrivateKey;


  const contractInstance = new caver.contract(
    abi,
    contractAddress
  );
  await contractInstance.methods
    .issueVC(
      did,vcId,hashed
    )
    .send({
      from: keyring._address,
      gas: "7500000",
    });
}

IssueVC(did,vcId,hashed,privateKey);

// const getDocument = async (did) => {
//     const contractInstance = new caver.contract(
//         abi,
//         contractAddress
//       );
//     const temp = await contractInstance.methods
//     .getDocument(did).call();
//     return temp;
// };