import React from "react"

function Header2(){
  return (<header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="#">Clickwork</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item ">
              <a class="nav-link" href="#">Home </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">My Jobs</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">Find work<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
            <div class="dropdown show">
<a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<i class="fas fa-briefcase"></i>Search
</a>

<div class="dropdown-menu">
<a class="dropdown-item" href="#">Projects</a>
<a class="dropdown-item" href="#">Jobs</a>
<a class="dropdown-item" href="#">Something else here</a>
<div class="dropdown-divider"></div>
<a class="dropdown-item" href="#">Talent</a>
</div>
</div>
            </li>
          </ul>
          <form class="form-inline mt-2 mt-md-0">
            
            <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit">Log out</button>
            
          </form>
        </div>
      </nav>
    </header>
  

  );
}
export default Header2;