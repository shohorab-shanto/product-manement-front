import React, { Component } from 'react'

export default class Notification extends Component {

    componentDidMount()
    {
     Pusher.logToConsole = true;

    var pusher = new Pusher('31b9b8a1eb615e3700b9', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('requisition.created');
    channel.bind('requisition-create', function(data) {
      alert(JSON.stringify(data));
    });
    }

    
  render() {
    return (
      <div>Notification</div>
    )
  }
}
