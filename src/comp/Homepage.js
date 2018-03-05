import React, { Component } from 'react';
import {
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Homepage.css';
import logo from "./css/img/logo.png";
import landImg from "./css/img/landingPageBG2.jpg";
import Review from "./Review";
import MakeupImg from "./css/img/01.jpg";
import MakeupImg02 from "./css/img/02.jpeg";
import MakeupImg03 from "./css/img/03.png";
import StarRatingComponent from 'react-star-rating-component';

class Homepage extends Component {
constructor(props){
        super(props);
        
        this.state = {
            data:[],
			page:false,
            servMsg:"",
            url:"",
        }
    this.speakServer = this.speakServer.bind(this);
    this.changePage = this.changePage.bind(this);
    }
    	
    componentDidMount(){
        /*var fd = new FormData();
        fd.append("fbName", this.props.fbName);
        fd.append("fbPic", this.props.fbPic);
        fetch('http://sherrychenxy.com/beautytwin/insert.php', {
            method:'POST',
            body:fd
        })*/
        console.log(this.props.fbPic);
        console.log(this.props.gName);
        
        
        var fd1 = new FormData();

        fd1.append('gName', this.props.gName);

        fetch('http://sherrychenxy.com/beautytwin/ginset.php', {
            method:'POST',
            body:fd1
        })
        
        fetch("http://sherrychenxy.com/beautytwin/reviewPost.php").then((resp)=>{
           console.log(resp); 
            return resp.json();
        }).then ((json)=>{
            
            this.setState({
                data:json
            })
        });
        
       console.log(this.state.data.productName);
    }

    speakServer(obj){
            console.log("Speak");
            
            fetch("https://newbeautyserver.herokuapp.com/search/"+obj.brandName+"-"+obj.productName+"-"+obj.color).then((resp)=>{
                return resp.json();
            }).then((response)=>{
                this.setState({
                    servMsg:response,
                    url:response.ItemSearchResponse.Items.MoreSearchResultsUrl 
                })
                
                console.log(response.ItemSearchResponse
.Items);
                console.log(this.state.url);
                
                window.open(this.state.url, "_blank");
            })
         
        }
    changePage(bool){
		this.setState({
			page:bool
		})
	}
    
  render() {
      
	  var list = this.state.data.map((obj,i)=>{
         return(
            <div className="postCard" key={i} className="col-lg-3 col-md-6 col-sm-6">
                            
            <div id="Nbox" >
          <div  className="card h-100">
		    <div className="card-img-top">
            <img className="img-fluid" alt="Responsive image"  src={obj.picture}  />
		     </div>
            <div className="card-body">
		      <p className= "productName"> {obj.brandName} {obj.productName} {obj.color}
             </p>
              <p className="usersName">
                  {obj.userNameG}
              </p>
            <StarRatingComponent 
                    name="rating" 
                    starCount={5}
                    value={obj.rating}
            />
              <p className="card-text">{obj.description}</p>
				<button className="shopBtn" onClick={this.speakServer.bind(this,obj)}>Find Online</button>
            </div>
          </div>
        </div>
      
        </div>
         )
     })
	  var comp = null;
	   
	  if(this.state.page === false){
		  comp = (
		<div>
		<div id= "homepageBG" >
		
		<p id="slogan" >We’re your Personal Cosmetic Lab,<br/> Helping Test and Find Makeup at a Fraction of the Price</p>
		<button className="addRBtn" onClick={this.changePage.bind(this,true)}> ADD A REVIEW</button>
		</div>
	
	
		<div id="wrap" className="wrap">
		<div>           
		<h2>Top Reviews</h2>
		</div>
		</div>
		
		<div className="row">
        <div id="box" className="col-lg-3 col-md-6 col-sm-6 ">
          <div className="card h-100">
		    <div className="card-img-top">
            <img className="img-fluid rounded mx-auto d-block" alt="Responsive image" src={MakeupImg}  />
		     </div>
            <div className="card-body">
		      <p className= "productName"> YSL Couture Palette</p>
              <p className="usersName">
                  Tiffanytt
              </p>
              <p className="card-text">This is a really beautiful palette and I’m happy I bought it. The standout product is the highlighter.</p>
				<a className="shopBtn" href="#">Find Online</a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 ">
          <div className="card h-100">
		    <div className="card-img-top">
            <img className="img-fluid" alt="Responsive image" src={MakeupImg02} />
		    </div>
            <div className="card-body">
				<p className= "productName">
				MAC Viva Glam Lipstick 
				</p>
              <p className="usersName">
               Caizi
              </p>
              <p className="card-text">Love it ! Leaves My Skin Feeling Soft And Glowing. Takes The Powder Look AwAy. Makes My Make-up Look And Feel Flawless .</p>
				<a className="shopBtn" href="#">Find Online</a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 ">
          <div className="card h-100">
			<div className="card-img-top">	
           <img  className="img-fluid" alt="Responsive image" src={MakeupImg03} />
		    </div>
            <div className="card-body">
				<p className= "productName">
				TOO FACED Born This Way Foundation 
				</p>
              <p className="usersName">
               Pony
              </p>
              <p className="card-text">
		      I have extremely extremely oily skin and I bought this because I heard many great reviews but I am thinking about returning it because of the lasting power.  
		      </p>
		 		<a className="shopBtn" href="#">Find Online</a>
            </div>
          </div>
        </div>
        
		  <div id="box" className="col-lg-3 col-md-6 col-sm-6 ">
          <div className="card h-100">
		    <div className="card-img-top">
            <img className="img-fluid" alt="Responsive image" src={MakeupImg}  />
		     </div>
            <div className="card-body">
		      <p className= "productName"> YSL Couture Palette</p>
              <p className="usersName">
                  Tiffanytt
              </p>
              <p className="card-text">This is a really beautiful palette and I’m happy I bought it. The standout product is the highlighter.</p>
				<a className="shopBtn" href="#">Find Online</a>
            </div>
          </div>
        </div>
        
     
	</div>	
		
	<div className="row">
		
		{list}
		</div>
		</div>
		
		  )
	  }
      else{
		  comp = (
			  <div>
			  	 <Review 
			  		changePage = {this.state.changePage}/>
			  </div>
			  
		  )
	  }
      
    return (
      <div id="HP-container">
      <div id="header">
		
		  <Navbar color="faded" light expand="md">
          <NavbarBrand>
				<span className="navbar-brand">
				<img src={logo} id="Brandlogo" alt="logo" />
				 </span>
			 </NavbarBrand>
     
       
            <Nav id="menu" className="mr-auto" navbar>
              <NavItem>
                <NavLink onClick={this.changePage.bind(this, false)}>Home</NavLink>
              </NavItem>
              <NavItem>
               <NavLink onClick={this.changePage.bind(this,true)}>My Review</NavLink>
              </NavItem>
			<NavItem id="uName" className="mr-auto">
				 <p>Hello, {this.props.fbName}!</p>
			</NavItem>
              
            </Nav>
         
        </Navbar>
		
		<hr/> 
		
		</div>
		
		
		
		{comp}
		
		
		
		
	<footer className="footer text-center text-white">
		
			<h6 id="h6-footer">Copyright © BeautyTwin 2018</h6>
			
			
		</footer>
		</div>
    );
  }
}

export default Homepage;
