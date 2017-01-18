import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import UserSection from './users/UserSection.jsx';
import MessageSection from './messages/MessageSection.jsx';
import Socket from '../socket.js';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            channels: [],
            users: [],
            messages: [],
            activeChannel: {},
            connected: false
        };
    }

  componentDidMount(){
    let ws = new WebSocket('ws://localhost:4000');
    let socket = this.socket = new Socket(ws);
    socket.on('connect', this.onConnect.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));
    socket.on('channel add', this.onAddChannel.bind(this));
    socket.on('user add', this.onAddUser.bind(this));
    socket.on('user edit', this.onEditUser.bind(this));
    socket.on('user remove', this.onRemoveUser.bind(this));
    socket.on('message add', this.onMessageAdd.bind(this));
    // let ws = this.ws = new WebSocket('ws://echo.websocket.org');
    // ws.onmessage = this.message.bind(this);
    // ws.onopen = this.open.bind(this);
    // ws.onclose = this.close.bind(this);
    }

  onMessageAdd(message){
    // let {message} = this.state;
    messages.push(message);
    this.setState({messages})
  }
  onRemoveUser(removeUser){
    let {users} = this.state;
    users = users.filter( user => {
      return user.id !== removeUser.id
    });
    this.setState({users});
  }

  onEditUser(editUser){
    let {users} = this.state;
    users = users.map( user => {
      if(editUser.id === user.id){
        return editUser;
      }
      return user;
    })
    this.setState({users});
  }
  onAddUser(user){
    let {users} = this.state;
    users.push(user);
    this.setState({users});
  }
  onConnect(){
    this.setState({connected: true});
    this.socket.emit('channel subscribe');
    this.socket.emit('user subscribe');
  }
  onDisconnect(){
    this.setState({connected: false});
  }
  message(e){
    const event = JSON.parse(e.data);
    if(event.name === 'channel add'){
      this.newChannel(event.data);
    }
  }

  open(){
    this.setState({connected: true});
  }

  close(){
    this.setState({connected: false});
  }

  onAddChannel(channel){
    let {channels} = this.state;
    channels.push(channel);
    this.setState({channels});
  }

  addChannel(name){
      let {channels} = this.state;
      // channels.push({
      //     id: channels.length, name
      // });
      // this.setState({channels});
      //TODO: Send to Server
      let msg = {
        name: 'channel add',
        data: {
          id: channels.length,
          name
        }
      }
      this.ws.send(JSON.stringify(msg))
  }

  setChannel(activeChannel){
      this.setState({activeChannel});
      this.socket.emit('message unsubscribe');
      this.setState({messages: []});
      this.socket.emit('message subscribe',
        {channelId: activeChannel.id});
      //TODO: Get Channels Messages
  }

  setUserName(name){
    // let {users} = this.state;
    // users.push({id: users.length, name});
    // this.setState({users});
      //TODO: Get Channels Messages
      this.socket.emit('channel add', {name})
  }

  addMessage(body){
    // let {message, users} = this.state;
    // let createdAt = new Date;
    // let author = users.length > 0 ? users[0].name: 'anon';

    // messages.push({id: messages.length, body, createdAt, author});
    // this.setState({messages});
    //TODO: send to server
    let {activeChannel} = this.state;
    this.socket.emit('message add',
      {channelId: activeChannel.id, body});
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
                setUserName = {this.setUserName.bind(this)}
              />
              <MessageSection
              {...this.state}
                addMessage = {this.addMessage.bind(this)}
              />
            </div>
          </div>
        )
    }
}

export default App