import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn){
    return (
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p onClick={() => onRouteChange('signout')} className ='link dim f9 underline pa1 pointer white ' >Sign Out</p>
    </div>);
  } else {
    return (
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('signin')} className ='link dim f9 underline pa1 pointer white ' >Sign In</p>
        <p onClick={() => onRouteChange('register')} className ='link dim f9 underline pa1 pointer white ' >Register</p>
      </div>);

  }
  
};
export default Navigation;
