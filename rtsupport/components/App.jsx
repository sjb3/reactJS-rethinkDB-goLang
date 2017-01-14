import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import UserSection from './users/UserSection.jsx';
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            channels: [],
            users: []
        };
    }

  addChannel(name){
      let {channels} = this.state;
      channels.push({
          id: channels.length, name
      });
      this.setState({channels});
      //TODO: Send to Server
  }

  setChannel(activeChannel){
      this.setState({activeChannel});
      //TODO: Get Channels Messages
  }
/////////////////////////////////////

  setUser(name){
    let {users} = this.state;
    users.push({id: users.length, name});
    this.setState({users});
      //TODO: Get Channels Messages
  }
  render(){
        return(
          <div className='app'>
            <div className='nav'>
               <ChannelSection
                // channels = {this.state.channels}
                {...this.state}
                addChannel = {this.addChannel.bind(this)}
                setChannel = {this.setChannel.bind(this)}
             />
              <UserSection
              {...this.state}
                setUserName = {this.setUser.bind(this)}
              />
            </div>
          </div>
        )
    }
}

export default App