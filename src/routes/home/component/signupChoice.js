
const SignUpChoice = ({ setWay }) => {
  const choice = (e) => {
    setWay(e.currentTarget.id);
  };
  return (
    <>
      <h1>SignUp</h1>
      <button id="holder" onClick={choice}>hodler</button>
      <button id="verifier" onClick={choice}>verifier</button>
      <button id="issuer" onClick={choice}>issuer</button>
    </>
  );
};

export default SignUpChoice;
