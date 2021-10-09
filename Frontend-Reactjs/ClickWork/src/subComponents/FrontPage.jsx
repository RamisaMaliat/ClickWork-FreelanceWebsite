import React from "react";
import Header from "./Header";
import Container from "./Container";
import Footer from "./Footer";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function FrontPage(){
    return (<div>
       <Header/>
       <Container/>
       <footer className="footer" style={{"marginTop":"0px","paddingLeft":"100px"}}>
        <p>&copy; 2020-2021 ClickWork, Inc. &middot; <a href="">Privacy</a> &middot; <a href="">Terms</a></p>
      </footer>
    </div>
    );
}
export default FrontPage;