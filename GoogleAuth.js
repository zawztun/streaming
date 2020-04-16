import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';
class GoogleAuth extends React.Component {

//review=> state = {isSignedIn: null}

    componentDidMount () {
        window.gapi.load ('client: auth2', ()=>{
            window.gapi.client.init({
                clientId :'494177959708-661rb7g7f74nor8apd4lh17sl4se774c.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
               // review=>  this.setState({isSignnedIn: this.auth.isSignedIn.get()});
               this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) =>{
       if(isSignedIn){
           this.props.signIn(this.auth.currentUser.get().getId());
       }else {
           this.props.signOut();
       }
    }

    onSignInClick = ()=>{
        this.auth.signIn();
    }
    
    onSignOutClick = ()=>{
        this.auth.signOut();
    }
    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null;
        }else if (this.props.isSignedIn){
            return (
                <button onClick ={this.onSignOutClick} className = "ui blue google button">
                    <i className = "google icon"/>
                    Sign out
                </button>
            )
        }else{
            return (
                <button onClick = {this.onSignInClick}className = "ui blue google button">
                    <i className = "google icon" />
                    Sign in with Google
                </button>
            )
        }
    }

    render(){
        return <div>{this.renderAuthButton()}</div>
    }   
};
    const mapStateToProps = (state) => {
        return {isSignedIn: state.auth.isSignedIn};
    }

export default connect(
   mapStateToProps, 
    {signIn, signOut})
    (GoogleAuth);