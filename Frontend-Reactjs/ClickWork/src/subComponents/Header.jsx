import React from "react"

function Header(){
    return (<header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="/">ClickWork</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="findTalent">Find Talent</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="findWork">Find work</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Help</a>
            </li>
          </ul>
          </div>
          <form class="form-inline mt-2 mt-md-0 ml-auto">
            

            <button class="btn my-2 my-sm-0" type="submit">
            <a class="nav-link btn btn-outline-secondary my-2 my-sm-0" href="signup" style={{ color: "white" }}>Sign Up</a>
            </button>

            <button class="btn my-2 my-sm-0" type="submit">
            <a class="nav-link btn btn-outline-secondary my-2 my-sm-0" href="login" style={{ color: "white" }}>Log In</a>
            </button>
            
          </form>
        
      </nav>
    </header>
    

    );
}
export default Header;