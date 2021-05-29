import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Message from '../components/Message';
import MessageForm from '../containers/MessageForm';
import { fetchMessages } from '../actions/index';

class MessageList extends Component {

  constructor() {
    super();
    this.interval = null;
    this.messagesRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchMessages(this.props.channelFromParams);
    this.interval = setInterval(() => {
      this.props.fetchMessages(this.props.channelFromParams);
    }, 3000);
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.messages.length !== prevProps.messages.length){
      this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
    }
  }

  renderMessages = () => {
    if (!this.props.messages || this.props.messages.length === 0) return null;

    return (
      <div className="ui comments">
        {this.props.messages.map(message => {
          return <Message message={message} key={message.id} />;
        })}
      </div>
    )
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
    return (
      <div className="message-list">
        <h1>{this.props.channelFromParams}</h1>
        <div className="messages" ref={this.messagesRef}>
          {this.renderMessages()}
        </div>
        <div className="message-form">
          <MessageForm channelFromParams={this.props.channelFromParams} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchMessages }, dispatch);
};


const mapStateToProps = state => {
  return { messages: state.messages };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);