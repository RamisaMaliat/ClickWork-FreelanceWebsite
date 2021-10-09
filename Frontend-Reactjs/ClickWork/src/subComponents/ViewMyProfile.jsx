import React from "react";
import Header2 from "./Header2";
import Container2 from "./Container2";
import Footer from "./Footer";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ViewMyProfile extends React.Component{
  constructor(){
      super();
      this.state={
          freelancers:[],
      };
  }
  
  fetchData(){
      let usertoken = localStorage.getItem("token");
      fetch(process.env.REACT_APP_API+"freelancer/profile/"+usertoken, 
      {
        headers: {
          'Authorization': 'Bearer ' + usertoken
        }
      }
      )
      .then(response=>response.json())
      .then((data)=>{
          this.setState({
            freelancers:data
          });
      });
  }

  componentDidMount(){
      this.fetchData();
  }

  render(){
    
    const profiles=this.state.freelancers;
    
    const items = profiles.map((profile)=>
    <div className="term">   
    <dt>
    <span>{profile.Name}</span>
    </dt>
    <dd> <b>{"Name"+ " "+ ":"+" "+ " "}</b>{profile.Name}</dd>
    <dd> <b>{"Username"+ " "+ ":"+" "+ " "}</b>{profile.Username}</dd>
    <dd><b>{"City"+ " "+ ":"+" "+ " "}</b> {profile.City}</dd>
    <dd><b>{"Country"+ " "+ ":"+" "+ " "}</b> {profile.Country}</dd>
    <dd><b>{"Educational Institution"+ " "+ ":"+" "+ " "}</b> {profile.EducationalInstitution}</dd>
    <dd><b>{"Educational Qualifications"+ " "+ ":"+" "+ " "}</b> {profile.EducationalQualifications}</dd>
    <dd><b>{"Employment"+ " "+ ":"+" "+ " "}</b> {profile.Employment}</dd>
    <dd><b>{"Company Name"+ " "+ ":"+" "+ " "}</b> {profile.CompanyName}</dd>
    <dd><b>{"Field of work"+ " "+ ":"+" "+ " "}</b> {profile.CategoryName}</dd>
    <dd><b>{"Skills"+ " "+ ":"+" "+ " "}</b> {profile.Skills}</dd>
    <dd><b>{"Email"+ " "+ ":"+" "+ " "}</b> {profile.Email}</dd>
    <dd><b>{"Additional Contact Details"+ " "+ ":"+" "+ " "}</b></dd>
    <dd>{profile.AdditionalContactDetails}</dd>
   
    </div>
    );

    return (
      <app>
        <Header2/>
        <div style={{marginTop: "80px"}}>
       <dl className="dictionary">{items}</dl>
       </div>
        <Footer/>
     </app> 
    );
    
  }
  
}


export default ViewMyProfile;