import axios from "axios";
import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { logout } from "../components/login/LoginActions";

class AddProfilePicture extends Component {

    constructor() {
        super();
        this.state = {
            showButton: false,
            photo: null,
            profileImg: "https://media.istockphoto.com/vectors/woman-with-laptop-sitting-in-nature-and-leaves-concept-illustration-vector-id1139913278?k=6&m=1139913278&s=612x612&w=0&h=vDks140zgZAaCDrxSW0C4IabyHQI7aM8uw0MfM7gMrs="
        };
    }

    imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ profileImg: reader.result, showButton: true })
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        this.setState({
            photo: e.target.files[0]
        });

    };

    laterHandler = (e) => {
        e.preventDefault();
        let usertoken = localStorage.getItem("token");
        let form_data = new FormData();
        let user = JSON.parse(window.localStorage.getItem("user"))
        user = user["username"];
        console.log(user);
        form_data.append('username', user );
        console.log(form_data)
        axios.post('uploadprofilephoto', form_data,
        {
                    headers: {
                        'Authorization': 'Bearer '+ usertoken,
                        "Content-Type": "multipart/form-data"
                    }
                    
                }
        
        )
            .then(res => {
            console.log(res);
            this.props.history.push("/account");
        });
        
    }

    fileUploadHandler = (e) => {
        e.preventDefault();
        let usertoken = localStorage.getItem("token");
        let form_data = new FormData();
        let user = JSON.parse(window.localStorage.getItem("user"))
        user = user["username"];
        console.log(user);
        form_data.append('username', user );
        form_data.append('imagefile', this.state.photo, this.state.photo.name);
        console.log(form_data)
        axios.post('uploadprofilephoto', form_data,
        {
                    headers: {
                        'Authorization': 'Bearer '+ usertoken,
                        "Content-Type": "multipart/form-data"
                    }
                    
                }
        
        )
            .then(res => {
            console.log(res);
            this.props.history.push("/freelancer-myfeed");
        });
        
    }

    render() {
        const { profileImg } = this.state;
        const { showButton } = this.state;

        let theButton = <input name="profileImg" id="upprofilephoto" class="btn btn-sm btn-info col-lg-4" type="button" style={{ "marginLeft": "5px" }} value="Upload" onClick={this.fileUploadHandler} />
        return (
            <div class="center-block log-in border" style={{ "maxWidth": "500px", "padding": "10px", "marginTop": "30px", "paddingBottom": "2%" }}>
                <div class="log-in mt-4 mb-4 mx-auto rounded pt-4 ">
                    <div class="text-center col" >

                        <img src={profileImg} alt="" id="log-in-img" style={{ height: "300px" }} />
                        <div class="display-8" style={{ paddingBottom: "30px", paddingTop: "10px" }}><h2>Set Your Profile Picture</h2></div>
                    </div>

                    <input style={{ paddingBottom: "10px", paddingLeft: "5px" }} class="btn" type="file" onChange={this.imageHandler} />
                    {showButton ? theButton : ''}
                    <input class="btn btn-sm btn-info col-lg-4" style={{ "marginLeft": "5px" }} onClick={this.laterHandler} type="button" value="Later" />

                </div>
            </div>

        );
    }

}

AddProfilePicture.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    logout
})(withRouter(AddProfilePicture));