import React, {useState, useEffect, useRef} from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import './App.css';
import HandleError from "./handleError";
import Link from "./link";
import Spinner from 'react-bootstrap/Spinner';

const MainForm = (props) => {
    const [inputLink, setInputLink] = useState("");
    const [shortDomain, setShortDomain] = useState("shrtco.de");
    const [errorMsg, setErrorMsg] = useState("");
    const [hideSpinner, setHideSpinner] = useState(true);
    const [submitBtn, setSubmitBtn] = useState("Shorten it!");
    const [linksArray, setLinksArray] = useState([])

    const linkRef = useRef(null);

    useEffect(()=>{
        if(localStorage.getItem('linksArray') !== null){
            setLinksArray([...JSON.parse(localStorage.getItem('linksArray'))])
        };
    },[]);

    useEffect(()=>{
        localStorage.setItem('linksArray', JSON.stringify(linksArray));
    },[linksArray])

    const handleInput = (e) => {
        setInputLink(e.target.value);
        setErrorMsg("");
    }

    const handleSetShortDomain = (e) => {
        setShortDomain(e.target.value);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(inputLink && typeof inputLink === "string"){
            let submitBtnArr = ["Shortening...","Getting there...", "Working on it...", "Sorry for the delay..."];
            setErrorMsg("");            // clears any error message 
            setHideSpinner(false);      // shows the spinner
            setSubmitBtn(submitBtnArr[0])  // submit button message reset to beginning 
            let num = 0;
            let msgChange = () => {
                num = num === 3 ? 0 : num+1;
                setSubmitBtn(submitBtnArr[num])  // rotating through submit button messages
            }
            let submitBtnChg = setInterval(msgChange, 3000);    
            const start = 'https://api.shrtco.de/v2/shorten?url=';
            const longLink = inputLink;
            const response = await fetch(start + longLink);
            const data = await response.json();
            setSubmitBtn("Shorten it!");    // reset submit button message
            clearInterval(submitBtnChg);    // stops button message changing 
            setHideSpinner(true)            // hide spinner
            if(!data.ok){
                setErrorMsg(HandleError(data.error_code));
            } else{
                let display = shortDomain === "shrtco.de" ? data.result.short_link
                    : shortDomain === "9qr.de" ? data.result.short_link2
                        : data.result.short_link3;
                let newLink = {
                    shortLink: display,
                    longLink: data.result.original_link,
                }
                setInputLink("");
                let arr = linksArray;
                arr.unshift(newLink);
                setLinksArray([...arr]);  // using spread operator to trigger re-render
                linkRef.current.scrollIntoView();
            }
      
        } else {
            setErrorMsg(HandleError(2))
        }
    }

    const clearLinks = async () => {
        setLinksArray([]);
        firstLink = [];
        restOfLinks = [];
    }

    let clearLinksBtn = linksArray.length === 0 ? null
        : <button id="clearLinks" className="link" onClick={()=>clearLinks()}>Clear Links</button>

    
    let firstLink = linksArray.length === 0 ? [] : linksArray[0];
    let restOfLinks = linksArray.length < 1 ? [] : linksArray.filter((item,index) => index>0);

    return(
        <div>
            <form id="input" action="">
                <h2>Type or paste any link in the box below.</h2>
                <div id="inputDiv">
                    <input id="urlInput" type="url" placeholder="www.example.com" value={inputLink} onChange={e => handleInput(e)}/>
                    <button id="urlSubmit" onClick={event=> handleSubmit(event)}>
                        <span id="urlSubmit-text">{submitBtn}</span>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            hidden={hideSpinner}
                            />
                    </button>
                </div>
                <div id="errorMsg">{errorMsg}</div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Short Domain:</FormLabel>
                    <RadioGroup aria-label="shortDomain" name="gender1" value={shortDomain} onChange={e => handleSetShortDomain(e)}>
                        <FormControlLabel value="shrtco.de" control={<Radio />} label="shrtco.de" checked={shortDomain==="shrtco.de"}/>
                        <FormControlLabel value="9qr.de" control={<Radio />} label="9qr.de" checked={shortDomain==="9qr.de"}/>
                        <FormControlLabel value="shiny.link" control={<Radio />} label="shiny.link" checked={shortDomain==="shiny.link"}/>
                    </RadioGroup>
                </FormControl>
            </form>
            {clearLinksBtn}
            <div>{firstLink.length === 0 ? null : 
                <div ref={linkRef}>
                    <Link 
                        link={firstLink.shortLink}
                        originalLink={firstLink.longLink}
                    />
                </div>
            }
            </div>
            <div>{restOfLinks.map((item,index) => (<div key={index}>
                <Link 
                    link={item.shortLink}
                    originalLink={item.longLink}
                />
                </div>))}</div>
        </div>
    )
}

export default MainForm;