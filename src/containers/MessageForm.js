import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postMessage } from '../actions';

class MessageForm extends Component {

  constructor() {
    super();
    this.state = { term: '' };
    this.inputRef = React.createRef();
  }

  componentDidMount = () => {
    this.inputRef.current.focus();
  };
  
  componentDidUpdate = () => {
    this.inputRef.current.focus();
  };

  handleChange = event => {
    this.setState({ term: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.term.length > 0) {
      this.props.postMessage(this.props.channelFromParams, this.props.currentUser, this.state.term);
    }
    
    this.setState({ term: '' });
  };

  render() {
    return (
      <form className="ui fluid action input" onSubmit={this.handleSubmit}>
        <input 
          type="text"
          ref={this.inputRef}
          onChange={this.handleChange} 
          value={this.state.term} 
          placeholder="Start typing..."
        />
        <button className="ui button blue">Send</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { currentUser: state.currentUser };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ postMessage }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);