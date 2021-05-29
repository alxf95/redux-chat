import React from 'react';
import MessageList from '../containers/MessageList';
import ChannelList from '../containers/ChannelList';
import '../application.css';

const App = () => {
  return (
    <div className="ui app">
      <div className="left-scene">
        <ChannelList />
      </div>
      <div className="right-scene">
        <MessageList />
      </div>
    </div>
  );
};

export default App;