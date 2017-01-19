package main

import (
  "github.com/mitchellh/mapstructure"
  r "gopkg.in/gorethink/gorethink.v2"
  "fmt"
)

const (
  ChannelStop = iota
  UserStop
  MessageStop
)

func addChannel(client *Client, data interface{}){
  var channel Channel

  // var message Message
  err := mapstructure.Decode(data, &channel)
    if err !=nil{
      client.send <- Message{"error", err.Error()}
      return
    }
go func(){
  // fmt.Printf("%#v\n", channel)
  //TODO: insert into RethinkDB
  err := r.Table("channel").
    Insert(channel).
    Exec(client.session)
    if err !=nil{
      client.send <- Message{"error", err.Error()}
    }
  }()
}

func subscribeChannel(client *Client, data interface{}){
  // stop := client.NewStopChannel(ChannelStop)
  result := make(chan r.ChangeResponse)
  cursor, err :=r.Table("channel").
    Changes(r.ChangesOpts{IncludeInitial: true}).
    Run(client.session)
  if err != nil{
    client.send <- Message{"error", err.Error()}
    return
  }

  go func(){
    var change r.ChangeResponse
    for cursor.Next(&change){
      result <- change
      if change.NewValue != nil && change.OldValue == nil{
        client.send <- Message{"channel add", change.NewValue}
        fmt.Println("sent channel add msg")
      }
    }
    go func(){
      for {
        select {
          case <- stop:
            cursor.Close()
            return
          case change := <-result:
            if change.NewValue != nil && change.OldValue == nil{
              client.send <- Message{"channel add", change.NewValue}
              fmt.Println("sent channel add msg")
            }
        }
      }

    }()
  }()
}

func unsubscribeChannel(client *Client, data interface{}){
  client.StopForKey(ChannelStop)
}
