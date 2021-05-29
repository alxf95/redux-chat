import React, { Component } from 'react';
import ReactEmoji from 'react-emoji';

class Message extends Component {

  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  intToRGB(i) {
    const c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  }

  parseDate(date) {
    const myDate = new Date(date);
    const dateHours = myDate.getHours();
    let dateMinutes = myDate.getMinutes();
    if (dateMinutes < 10) dateMinutes = '0' + dateMinutes;
    return dateHours + ':' + dateMinutes;
  }

  render() {
    const { author, content, created_at } = this.props.message;

    const hexcode = this.intToRGB(this.hashCode(author));

    return (
      <div className="comment">
        <div className="content">
          <p className="author" style={{ color: `#${hexcode}` }}>{author}
            <span className="metadata">
              <span className="date">{this.parseDate(created_at)}</span>
            </span>
          </p>
  
          <div className="text">{ReactEmoji.emojify(content)}</div>
        </div>
      </div>
    );
  }
}

export default Message;