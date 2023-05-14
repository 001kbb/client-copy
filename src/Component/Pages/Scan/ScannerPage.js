import { useEffect, useState } from "react"
import Html5QrcodePlugin from "../../../plugin/ScannerPlugin"
import ResultContainerPlugin from "../../../plugin/FilterPlugin";


export default function ScannerPage() {
    const [decodedResults, setDecodedResults] = useState([]);
    const onNewScanResult = (decodedText, decodedResult) => {
        setDecodedResults(prev => [...prev, decodedResult]);
    }


    return (
        <>
        <div className='scanner-page-container'>
            {decodedResults.length < 10 && <Html5QrcodePlugin
            fps={20}
            qrbox={350}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
            />}
            <ResultContainerPlugin clearResult={() => setDecodedResults([])} results={decodedResults}/>
        </div>
        </>
    )
}