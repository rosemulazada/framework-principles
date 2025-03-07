export default class Button extends HTMLButtonElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log(this.closest('canvas'));
    }

    saveDrawing() {
        console.log(this.closest('canvas'));
    }
}

customElements.define('button-element', Button, { extends: 'button' });
