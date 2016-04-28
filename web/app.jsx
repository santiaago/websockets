var Root = React.createClass({

	getInitialState: function(){
		return {
			messages: [],
		};
	},

	 componentDidMount: function() { 
		 this.serverSocket = new WebSocket("ws://http://santiaago-websockets.herokuapp.com/echo");
		 this.serverSocket.onopen = function() {
			 this.serverSocket.send("Connection init");
		 }.bind(this);

		 this.serverSocket.onmessage = function(e) {
			 var messages = this.state.messages;
			 messages.push("Received: " + e.data);
			 this.setState({messages: messages});
		 }.bind(this);
	 },
	
	
	sendData: function(e){
		
		if (e && e.keyCode === 13) {
			var data = this.refs.userInput.getDOMNode().value;
			console.log(data);

			this.serverSocket.send(data);
			 var messages = this.state.messages;
			this.state.messages.push("Sent: " + data);
			 this.setState({messages: messages});
		}
		return;
	},
	
	render: function(){

		var messages = this.state.messages.map(function (message) {
			return (
				<div>{message}</div>
			);
		}, this);

		
		return (
			<div className="root-container">
				<input id="sendtext" ref="userInput" type="text" onKeyDown={this.sendData} />
				{messages}
			</div>
		);
	}
});

React.render(
	<Root />,
	document.getElementById('app-container')
);
