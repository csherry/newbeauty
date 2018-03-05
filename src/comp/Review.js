import React, { Component } from 'react';
import {
  Row,
  Col,
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/Review.css';
import StarRatingComponent from 'react-star-rating-component';
import logo from "./css/img/logo.png";
import plder from"./css/img/placeholder.png";
import Homepage from './Homepage';
import AWS from 'aws-sdk';

const config = {
    region: 'us-west-1',
    accessKeyId: 'AKIAJ75XDZ4Q6G6KM47Q',
    secretAccessKey: 'O+DmXNACZ19ZQP4sc8vNfOhjp+NojBUPj/ZF9Cep'
}

var s3 = new AWS.S3(config);

class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            picture:plder,
            description:"",
            name:"",
            Pname:"",
            color:"",
            rating:0,
			modal: false,
            page:false
            
        }
        this.changeMode=this.changeMode.bind(this);
        this.saveimage=this.saveimage.bind(this);
        this.savename=this.savename.bind(this);
        this.savePname=this.savePname.bind(this);
        this.savecolor=this.savecolor.bind(this);
        this.savedesc=this.savedesc.bind(this);
        this.onStarClick=this.onStarClick.bind(this);
        this.onImageChange=this.onImageChange.bind(this);
        this.insertData=this.insertData.bind(this);
    }

  changeMode(){
      this.setState({
          mode:false
      })
  }
    
	/*toggle=()=>{
		this.setState({
			modal:!this.state.modal
		})
	}*/
    
    saveimage(image){
        var myimage = image.target.value;
        this.setState({
            picture:myimage
        });
        console.log(this.state.picture);
    } 
    
    savename(evt){
        var myname = evt.target.value;
        
        this.setState({
            name:myname
        })
        console.log(this.state.name);
    }  
    
    savePname(evt){
        var myPname = evt.target.value;
        
        this.setState({
            Pname:myPname
        })
        console.log(this.state.Pname);
    }  
    
    savedesc(evt){
        var mydescription = evt.target.value;
        
        this.setState({
            description:mydescription
        })
        console.log(this.state.description);
    }  
    
    savecolor(evt){
        var mycolor = evt.target.value;
        
        this.setState({
            color:mycolor
        })
        console.log(this.state.color);
    }  
    
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }
    
    onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            /*let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({
					picture: e.target.result
				});
            };
            reader.readAsDataURL(event.target.files[0]);*/
            console.log(event.target.files[0]);
            var params = {Bucket:"beauty-twin", Key:"review/review1.jpg", Body: event.target.files[0], ACL:'public-read'};
            s3.putObject(params, (err, data)=>{
                console.log(err,data);
                //https://s3-us-west-1.amazonaws.com/beauty-twin/test/test.jpg
                this.setState({
					picture: "https://s3-us-west-1.amazonaws.com/beauty-twin/review/review1.jpg?"+Math.random()
				});
            });
            /*ReactS3.upload(event.target.files[0], config)
                .then((data) => console.log(data))
                .catch((err) => console.error(err))*/

//            });
        }
    }
    
    
    
    insertData=()=>{
        var fd = new FormData();
        fd.append('brandName', this.state.name);
        fd.append('productName', this.state.Pname);
        fd.append('color', this.state.color);
        fd.append('description', this.state.description);
        fd.append('rating', this.state.rating);
        fd.append('picture', this.state.picture);
//        fd.append('userNameFB', this.props.fbName);
        fd.append('userNameG', this.props.gName);
        
        fetch("http://sherrychenxy.com/beautytwin/review.php",{
            method:'POST',
            body: fd 
        })
    }
    
	multiFunc=()=>{
		this.insertData();
		this.setState({
			modal:!this.state.modal
		})
        console.log("multifunc is clicked");
	}
    
    backToHome=()=>{
        this.setState({
			modal:!this.state.modal,
            page: true
		})
        
    }
	
    render() {
        
        const { rating } = this.state;
        
		var comp = null;
        
            if(this.state.page === false){
            comp=(
                <div id="main-review">
		   <h2 >ADD YOUR RATE AND REVIEW</h2>
            <Row>

                <Col sm="4">
                <img id="target" alt="no image yet" src={this.state.picture}/>
		         <br/>
				<input type="file" id="input-image" onChange={this.onImageChange.bind(this)}/>
                </Col>
                    
		       	
                <Col sm="4">
                <h6>Rating: {rating} stars</h6>
                <StarRatingComponent 
                    name="rating" 
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
				<br/>
				<br/>
				<input type="text" placeholder="Brand Name" onChange={this.savePname}/>
				<br/>
				<br/>	
                <input type="text" placeholder="Product Name" onChange={this.savename}/>
				<br/>
				<br/>	
                <input type="text" placeholder="Color" onChange={this.savecolor}/>
				<br/>
				<br/>		
                </Col>
            
			<Col  sm="4">
                <textarea id="review" type="text" maxLength="400" placeholder="Review" onChange={this.savedesc}></textarea>
                <p id="text">Max: 200 words</p>
				
				<br/>
				
                </Col>
			
			</Row>
			<Row>
			
				<Col sm="12">
					<button className="uploadBtn" onClick={this.multiFunc}>Add my Review</button>
				
					

				<Modal className="modalDiv"
                    isOpen={this.state.modal} 
                    toggle={this.toggle}>
					
                    <ModalHeader toggle={this.toggle}>Success!</ModalHeader>
				
                    <ModalBody>Your review has been added.</ModalBody>
					
                    <ModalFooter>
						<button onClick={this.backToHome}>Close</button>
				    </ModalFooter>
					
				</Modal>
               </Col>
				
							
			</Row>
				
        
				
        </div>
            )
            } else if(this.state.page === true){
                comp=(
                <Homepage/>
                )
            }
        
        
    return (
       <div>
        {comp}
        </div>
        );
    }
}

export default Review;
