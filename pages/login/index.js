import '../../style.css';
import '../../src/components/form/form.css';
import Login from './Login.ts';

const login = new Login();

function render(query, block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  return root;
}

render('#app', login);
