import React from "react"

function Container() {
  return (
    <div className="container"style={{ "marginBottom": "300px" }} >
      <div class="" style={{ "paddingTop": "20px" }}>
        <h1 class="big-heading" style={{ "paddingBottom": "10px", "MarginRight": "100px", "fontFamily": "Georgia", "fontSize": "43px" }}>Join the world's work marketplace</h1>
        <div style={{"maxWidth":"700px"}}>
        <p class="letter" style={{ "fontSize": "18px"}} >Join millions of businesses and independent pros
          who do great work together. Grab the opportunities to work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations. Meet clients you’re excited to work with and take your career or business to new heights.
        </p>
        </div >
        <a class="btn btn-lg btn-dark about-btn" href="findWork" type="submit" style={{marginRight:"10px","marginTop": "30px"}}>Find Work</a>
        <a class="btn btn-lg btn-dark about-btn" href="findTalent" style={{marginLeft:"10px","marginTop": "30px"}} type="submit">Find Talent</a>
      </div>

      <div class="col-lg-6" style={{ "paddingTop": "150px" }}>
        <img  class="title-image" style={{"marginLeft":"30px"}} src="https://media.istockphoto.com/vectors/woman-with-laptop-sitting-in-nature-and-leaves-concept-illustration-vector-id1139913278?k=6&m=1139913278&s=612x612&w=0&h=vDks140zgZAaCDrxSW0C4IabyHQI7aM8uw0MfM7gMrs=" alt="iphone-mockup" />
      </div>

    </div>
  );
}
export default Container;