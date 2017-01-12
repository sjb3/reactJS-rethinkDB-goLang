import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      channels: []
    };
  }
  addChannel(name){
    let {channels} = this.state;
    channels.push({id: channels.length, name});
    this.setState({channels});
    //TODO: send to server
  }
  setChannel(activeChannel){
    this.setState({activeChannel});
    //TODO: Get Channels Messages
  }
  render(){
    return(
      <ChannelSection
        channels={this.state.channels}
        addChannels={this.addChannels.bind(this)}
        setChannel={this.setChannel.bind(this)}
      />
    )
  }
}

export default App 