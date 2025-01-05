import '/style.css'
import '/src/components/form/form.css'
import pagesList from './pagesList';

const list = new pagesList()

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
  }

  render("#app", list);
