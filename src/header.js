
const Header = (props) => {
    
    return(
        <div>
            <h1>Link Shortener</h1>
            <div>
                <h3>Shorten any URL!</h3>
                <p>With this free Link Shortener you can make Links shorter and easier to remember.<br/> 
                Just enter a Link into the form and click on the above Button to generate a short Link. <br/>
                When visiting the short-Link, the short-Link will immediately redirect you to the long Link.</p>
                <h6>This site uses <a className="link" href="https://shrtco.de/docs/" target="_Blank" rel="noreferrer">Shrtcode API</a></h6>
            </div>
        </div>
    )
}

export default Header;