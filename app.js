let channels = [
  {name: 'Hardware Support'},
  {name: 'Software Support'}
];

class Channel extends React.Component{
  onClick(){
    console.log('I am clicked', this.props.name);
  }

  render(){
    return(
      <li onClick={this.onClick.bind(this)}>{this.props.name}</li>

    )
  }
}

class ChannelForm extends React.Component{
  
}

class ChannelList extends React.Component {
  render(){
    return (
      <ul>
        {this.props.channels.map(function(channel){
          return (
            <Channel name={channel.name} />
            )
          }
        )}
      </ul>
    )
  }
}

ReactDOM.render(
  <ChannelList channels={channels} />,
  document.getElementById('app');
);
