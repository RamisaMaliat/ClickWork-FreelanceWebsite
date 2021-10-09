import React from "react"
function Carousel(){
    return (
    <carousel>
    <div  class="carousel slide myCarousel" data-ride="carousel" style={{"marginBottom":"100px"}}>
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" >
          <div class="carousel-item active" data-interval="5000" style={{"height":"500px"}} >
            <img class="first-slide" src="images/freelancewebsite.jpg" alt="First slide"/>
            <div class="container">
              <div class="carousel-caption text-left">
                <h1>Find great work</h1>
                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                <p><a class="btn btn-lg btn-primary" href="#" role="button">Sign up today</a></p>
              </div>
            </div>
          </div>
          <div class="carousel-item" data-interval="5000" style={{"height":"500px"}}>
            <img class="second-slide" src="" alt="Second slide"/>
            <div class="container">
              <div class="carousel-caption text-left">
                <h1>Find talent your way</h1>
                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                <p><a class="btn btn-lg btn-primary btn-space" href="#" role="button">Learn more</a></p>
              </div>
            </div>
          </div>
          <div class="carousel-item" data-interval="5000" style={{"height":"500px"}}> 
            <img class="third-slide" src="" alt="Third slide"/>
            <div class="container">
              <div class="carousel-caption text-left">
                <h1>Hire a pro for any skill</h1>
                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                <p><a class="btn btn-lg btn-primary" href="#" role="button">Browse gallery</a></p>
              </div>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    
    </carousel>
    );
}
export default Carousel;