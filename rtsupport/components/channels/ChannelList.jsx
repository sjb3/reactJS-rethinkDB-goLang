import React, {Component} from 'react';
import Channel from './channel.jsx';

class ChannelList extends Component {
    render (){
        return(
            <ul>{
                this.props.channels.map( chan =>{
                    return <Channel
                    channel={chan}
                    key={chan.id}
                    // setChannel={this.props.setChannel}
                    // activeChannel={this.props.activeChannel}
                    {...this.props}
                    />
                })
            }</ul>
        )
    }

}

ChannelList.propTypes = {
    channels: React.PropTypes.array.isRequired,
    setChannel: React.PropTypes.func.isRequired,
    activeChannel: React.PropTypes.object.isRequired

}

export default ChannelList