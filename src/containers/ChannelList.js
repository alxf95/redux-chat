import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChannel, fetchMessages } from '../actions';

class ChannelList extends Component {

  handleClick = event => {
    this.props.selectChannel(event.target.innerHTML);
    this.props.fetchMessages(event.target.innerHTML);
  }

  renderChannels = () => {
    return this.props.channels.map(channel => {
      const active = this.props.selectedChannel === channel ? ' active' : '';

      return <div className={`item channel${active}`} onClick={this.handleClick}>{channel}</div>;
    })
  };
  
  render() {
    return (
      <div>
        <h4>Redux Chat</h4>
        <div className="ui list">
          {this.renderChannels()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    channels: state.channels,
    selectedChannel: state.selectedChannel
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectChannel, fetchMessages }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);