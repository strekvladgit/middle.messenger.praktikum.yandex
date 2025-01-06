import '../../style.css';
import './chat.css';

import Chat from './Chat.ts';

const chat = new Chat({ username: 'MyUserName' });

function render(query, block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  return root;
}

render('#app', chat);
