import React, {Component} from 'react';

class User extends React.Component{
  // onClick(e){
  //   e.preventDefault();
  //   const {setUser, user} = this.props;
  //   setUser(user);
  // }

  render(){
    // const {user, activeUser} = this.props;
    // const active = user ===activeUser ? 'active' : '';
    return (
      <li>
          {this.props.user.name}
      </li>
    )
  }
}

User.propTypes = {
  user: React.PropTypes.object.isRequired,
  // setUser: React.PropTypes.func.isRequired,
  // activeUser: React.PropTypes.object.isRequired
}

export default User