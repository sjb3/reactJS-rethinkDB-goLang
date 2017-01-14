import React, {Component} from 'react';
import ChannelForm from './ChannelForm.jsx';
import ChannelList from './ChannelList.jsx';

class ChannelSection extends Component{
  render(){
    return (
      <div>
        <ChannelList {...this.props}
          // channels={this.props.channels}// these are replaced by above
          // setChannel={this.props.setChannel}
        />
        <ChannelForm {...this.props}/>
      </div>
    )
  }
}

ChannelSection.propTypes = {
  channels: React.PropTypes.array.isRequired,
  setChannel: React.PropTypes.func.isRequired,
  addChannel: React.Proptypes.func.isRequired
}

export default ChannelSection