import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Footer from "../subComponents/Footer";
import { logout } from "./login/LoginActions";
import { Col, Row } from "react-bootstrap";


class Account extends React.Component {
    constructor() {
        super();
        this.state = {
            acc: ""
        };
    }

    onLogout = (e) => {
        e.preventDefault();
        this.props.logout();
      };

    fetchData() {
        let usertoken = localStorage.getItem("token");
        fetch(process.env.REACT_APP_API + "GetAccount",
            {
                headers: {
                    'Authorization': 'Bearer ' + usertoken
                }
            }
        )
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    acc: data[0].AccountType
                });
                console.log(this.state.acc);
                if(this.state.acc == "Freelancer") window.location.replace("/freelancer-myfeed");
                else window.location.replace("/client/postedjobs");
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <h3>Logged In! </h3>
        );
    }
}

Account.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    logout
})(withRouter(Account));