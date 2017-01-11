class Channel extends React.Component{
  onClick(){
    console.log('clicked', this.props.name);
  }

  render(){
    return(
      <li onClick={this.onClick.bind(this)}>{this.props.name}</li>

    )
  }
}

class ChannelList extends React.Component {
  render(){
    return (
      <ul>


      
      </ul>
    )
  }
}

ReactDOM.render(
  <Channel name="Hardware Support" />,
  document.getElementById('app');
);
