import '../../style.css';
import '../../src/components/form/form.css';
import '../../src/components/modal/modal.css';

import Profile from './Profile.ts';

const profile = new Profile();

function render(query, block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  return root;
}

render('#app', profile);
