import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { fetchMessages } from '../actions';

class ChannelList extends Component {

  componentDidUpdate() {
    this.props.fetchMessages(this.props.channelFromParams);
  }

  renderChannels = () => {
    return this.props.channels.map(channel => {
      const active = this.props.channelFromParams === channel ? ' active' : '';

      return (
        <Link to={`/${channel}`}>
          <div className={`item channel${active}`} key={channel} >
            {channel}
          </div>
        </Link>
      );
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
  return { channels: state.channels };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchMessages }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);