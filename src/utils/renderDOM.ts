import Block from "../framework/Block";

export function renderDOM(query: string, block: Block) {
    const root: HTMLElement | null = document.querySelector(query);
    const content = block.getContent();
    

    if (root && content) {
        root.innerHTML = '';
        root.appendChild(content);
    }

    return root;
}
