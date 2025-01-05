import '/style.css'
import '/src/components/form/form.css'
import Register from './Register'

const register = new Register()

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
  }

  render("#app", register);
