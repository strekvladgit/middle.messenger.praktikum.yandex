import '../../style.css';
import '../../src/components/form/form.css';
import PagesList from './PagesList.ts';

const list = new PagesList();

function render(query, block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  return root;
}

render('#app', list);
