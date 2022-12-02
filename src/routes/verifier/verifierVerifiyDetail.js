import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


function VerifierVerifiyDetail() {
    
    const location = useLocation()
    const [vcDetail, setVcDetail] = useState({})
    
    useEffect(() => {
        setVcDetail(location.state)
    }, [location])

    function makeVcDetail() {
        const List = []
        const details = vcDetail.credentialSubject
        for (let i in details){

            List.push(
                <li key={i}>
                    {i} : {details[i]}
                </li>
            )
        }
        return List
    }

    return(
        <div>
            <h1>VerifierVerifiyDetail</h1>
            <div>종류: {vcDetail.context} / 발급자ID: {vcDetail.issuer}</div>
            <hr />
            <ul>{makeVcDetail()}</ul>
            <hr />
        </div>
    )
}

export default VerifierVerifiyDetail