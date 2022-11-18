import { useReactToPrint } from "react-to-print";
import Pdf from "./pdf";

function VcCard(vc, logo, componentRef) {

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    return (
        <div onClick={handlePrint} id={vc.id} key={vc.id} className="holderVL_vcBox_card">
            <img className="holderVL_vcBox_card_img" alt="logo" src={logo}></img>
            <p className="holderVL_vcBox_card_text">{vc.credentialSubject.title}</p>
            <div style={{ display:"none" }}>
                <Pdf
                    ref={ rf => (componentRef.current) = rf}
                    title={vc.context}
                    content={"content"}
                    type={"type"}
                    getDate={vc.credentialSubject.date}
                    user={vc.credentialSubject.name}
                    organization={vc.issuer}
                />
            </div>
        </div>
    )
}

export default VcCard