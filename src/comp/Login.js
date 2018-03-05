import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './css/Login.css';
import 'bootstrap/dist/css/bootstrap.css';
import Homepage from './Homepage.js';
import Review from './Review';

window.fbAsyncInit = function() {
    window.FB.init({
        appId            : '1549676605130843',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.12'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

class Login extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            fbName:"",
            fbPic:"",
            redirectToReferrer:false,
            mode: 0,
            gName:""
        }
        
        this.fbLogin = this.fbLogin.bind(this);
        this.googleLogin=this.googleLogin.bind(this);
//        this.changeMode=this.changeMode.bind(this);
//        this.signup = this.signup.bind(this);
    }
    
   changeModeto1=()=>{
      this.setState({
          mode:1
      })
  }
    changeModeto2=()=>{
      this.setState({
          mode:2
      })
  }
    changeModeto3=()=>{
      this.setState({
          mode:3
      })
  }
    
    componentDidMount(){
        (function() {
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        })(); 
    }
    
    fbLogin(bool){
        console.log(window.FB);
        window.FB.login((resp)=>{
            console.log(resp);
            if(resp.status == 'connected'){
//                alert("You are connect to my app");
                var token = resp.authResponse.accessToken;
                
                //fetch user's info
                fetch("https://graph.facebook.com/me?fields=name,email,picture.height(100)&access_token="+token).then((resp)=>{
                    return resp.json();
                }).then((json)=>{
                    console.log(json);
                    
                    this.setState({
                        fbName:json.name,
                        fbPic:json.picture.data.url,
                        mode:1
                    })
                    
                    console.log(this.state.fbName);
                    console.log(this.state.fbPic);
                    
                    var fd = new FormData();

                    fd.append('fbName', this.state.fbName);
                    fd.append('fbPic', this.state.fbPic);

                    console.log(fd);
                    fetch('http://sherrychenxy.com/beautytwin/insert.php', {
                        method:'POST',
                        body:fd
                    })
                })   
            }
        })    
    }
    
    googleLogin = (bool) => {
        let response = null;
        window.gapi.auth.signIn({
            callback: function(authResponse) {
                this.googleSignInCallback( authResponse )
            }.bind( this ),
            clientid: "962926778609-k57n1g2cok3k2v0ta00pb7gblq6fkvas.apps.googleusercontent.com", //Google client Id
            cookiepolicy: "single_host_origin",
            requestvisibleactions: "http://schema.org/AddAction",
            scope: "https://www.googleapis.com/auth/plus.login email"
        });
        
        /*var gfd = new FormData();
        
        gfd.append("name", userId);
        console.log(gfd);
        fetch("http://sherrychenxy.com/beautytwin/ginsert.php", {
            method:"POST",
            body:gfd
        }).then((resp)=>{
             console.log(resp);
            return resp.text();
         }).then((text)=>{
            console.log(text);
         }).catch((err)=>{
            console.log(err); 
        })*/
    }
    
    googleSignInCallback = (e) => {
        console.log( e )
        if (e["status"]["signed_in"]) {
            window.gapi.client.load("plus", "v1", function() {
                if (e["access_token"]) {
                    this.getUserGoogleProfile( e["access_token"] )
                    
                    /*var fd1 = new FormData();

                    fd1.append('gName', e.displayName);


                    console.log(e);
                    fetch('http://sherrychenxy.com/beautytwin/ginset.php', {
                        method:'POST',
                        body:fd1
                    })*/
                } else if (e["error"]) {
                    console.log('Import error', 'Error occured while importing data')
                }
            }.bind(this));
        } else {
            console.log('Oops... Error occured while importing data')
        }
    }

    getUserGoogleProfile = accesstoken => {
        var e = window.gapi.client.plus.people.get({
            userId: "me"
        });
        e.execute(function(e) {
            if (e.error) {
                console.log(e.message);
                console.log('Import error - Error occured while importing data')
                return
            
           } else if (e.id) {
                //Profile data
//                alert("Successfull login from google : "+ e.displayName )
                console.log( "WUPS"+e.displayName );
                this.setState({
                    gName:e.displayName,
                    mode:1
                })
                return;
            }
            
        }.bind(this));
    }
    
  render() {
        
        var comp = null;
        
        if(this.state.mode === 0 ){
            comp = (
         <div id="main">
                <Row id="row1"> 
                    <Col sm="12">
                        <h2 id="header1">Login</h2>
                        <Button id="fb" className="buttonclass"  onClick={this.fbLogin}>Login with Facebook</Button>
                    </Col>

                    <Col sm="12">
                        <Button id="google" className="buttonclass" onClick={this.googleLogin}>Login with Google</Button>
                    </Col>
                </Row>
        </div>
        );
        }
        else if(this.state.mode === 1){
         comp = (
             <Homepage 
                changeModeto2 = {this.changeModeto2}
                changeModeto1 = {this.changeModeto1}
                fbName = {this.state.fbName}
                gName = {this.state.gName}
                fbPic = {this.state.fbPic}
             />
                );
        } else if(this.state.mode === 2){
             comp = (
             <Review 
                fbName = {this.state.fbName}
                gName = {this.state.gName}
				changeModeto2 = {this.changeModeto2}
                changeModeto1 = {this.changeModeto1}
                changeModeto3 = {this.changeModeto3}
                 />
             )
         }
    
    
    
        
    return (
       <div className="Login Container-fluid ">
          {comp}
        </div>
        );
    }
}

export default Login;
