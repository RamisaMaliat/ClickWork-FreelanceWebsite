import React from "react"

function Container2() {
  return (
    <div className="container" >

      <div class="col-lg-6">
        <h1 class="big-heading" style={{"fontFamily":"Georgia","color":"black"}}>Find your desired work!</h1>
        <p class="letter" style={{"fontSize":"16px"}}>Join millions of businesses and independent pros who do great work together. Meet clients you’re excited to work with and take
          your career or business to new heights.

        </p>
        {window.location.pathname=="/findWork" ? <div>
          <a class="btn btn-lg btn-dark about-btn" href="signup" type="submit" style={{marginRight:"10px","fontSize":"16px"}}>Sign Up</a>
          <a class="btn btn-lg btn-dark about-btn" href="login" style={{marginLeft:"10px","fontSize":"16px"}} type="submit">Log In</a></div>
          : ""}
        

      </div>

      <div class="col-lg-6">
        <img src="https://media.istockphoto.com/vectors/freelance-occupation-concept-relaxed-man-freelancer-character-sitting-vector-id1189735603?k=6&m=1189735603&s=612x612&w=0&h=WY1sIHzsDSljpCL_fQl3N1ADsYqQWUvITaMigdAtkJ0=" alt="iphone-mockup" />
      </div>


    </div>
  );
}
export default Container2;