import { useState } from "react";

const Link = (props) => {
    const [copyBtn, setCopyBtn] = useState("Copy to Clipboard")

    const copyLink = () => {
        navigator.clipboard.writeText(props.link);
        setCopyBtn("Copied!")
            setTimeout(() => {
                setCopyBtn("Copy to Clipboard")
            }, 5000);
    }
    
    return(
        <div className="links linkDiv">
            <h5>Link Generated!</h5>
            <a className="link wordwrap new-link" href={props.link} target="_blank" rel="noreferrer">{props.link}</a>
            <button className="copy" onClick={copyLink}>{copyBtn}</button>
            <a className="link wordwrap original-link" href={props.originalLink} target="_blank" rel="noreferrer">{props.originalLink}</a>
        </div>
    )
}

export default Link;