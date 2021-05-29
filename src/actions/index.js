export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const POST_MESSAGE = 'POST_MESSAGE';

export const fetchMessages = channel => {
  const messages = fetch(`https://wagon-chat.herokuapp.com/${channel}/messages`)
    .then(response => response.json())
    .then(data => data.messages);

  return { type: FETCH_MESSAGES, payload: messages };
};

export const postMessage = (channel, author, content) => {
  const body = { channel, author, content };
  const message = fetch(`https://wagon-chat.herokuapp.com/${channel}/messages`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json()).then(data => data);
  
  return { type: POST_MESSAGE, payload: message };
};
