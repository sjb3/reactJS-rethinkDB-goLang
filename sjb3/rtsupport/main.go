package main

import (
  "net/http"
  r "gopkg.in/gorethink/gorethink.v2"
  "log"
)

type Channel struct {
  Id    string `json:"id" gorethink: "id, omitempty"`
  Name  string `json: name gorethink: "name"`
}

type User struct {
  Id    string `gorethink: "id,omitempty"`
  Name  string  `gorethink: "name"`
}

func main(){
  session, err := r.Connect(r.ConnectOpts{
    Address:  "localhost:28015",
    Database: "rtsupport",
  })
  if err != nil{
    log.Panic(err.Error())
  }


  router := NewRouter(session)
  // http.HandleFunc("/", handler)

  router.Handle("channel add", addChannel)
  router.Handle("channel subscribe", subscribeChannel)
  router.Handle("channel unsubscribe", unsubscribeChannel)
  http.Handle("/", router)
  http.ListenAndServe(":4000", nil)
}
