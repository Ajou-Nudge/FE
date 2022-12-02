import Caver from "caver-js"
import abi from "./abi.json"
window.Buffer = window.Buffer || require("buffer").Buffer;

async function ConnectCaver(provider) {
  const caver = new Caver("https://api.baobab.klaytn.net:8651/")  
  const contractAddress = "0x967FE285D361601FA7b8C6559d6FaC34b189E956";

  const did=`did:vone:${provider.selectedAddress.slice(2)}`
  const privateKey="0xb6909ca94f5836ab7dd43b4551b47c92cde8dc4ae0ad9e5585ec5218b975525b0x000x96ca4062191621d35384e90f08b8587564f8feea"
  const vcId="test14"
  const hashed="test14"

  let keyring

  const keyringFromPrivateKey = caver.wallet.keyring.createFromPrivateKey(
    privateKey
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

  return console.log("make vc")
}

export default ConnectCaver