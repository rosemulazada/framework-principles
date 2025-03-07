export default class Canvas extends HTMLElement {
    private canvas: HTMLCanvasElement;
    private button: HTMLButtonElement;

    constructor() {
        super();

        this.canvas = this.querySelector('[data-element="canvas"]')!;
        this.button = this.querySelector('[data-element="button"]')!;
    }

    connectedCallback() {
        console.log(this.canvas);
        let context = this.canvas.getContext('2d')!;
        context.lineWidth = 5;
        context.lineCap = 'round';

        let isMouseDown = false;
        let previous = { x: 0, y: 0 };

        this.canvas.addEventListener('mousemove', (event) => {
            if (isMouseDown) {
                let { pageX: x, pageY: y } = event;
                context.beginPath();
                context.moveTo(previous.x, previous.y);
                context.lineTo(x, y);
                context.stroke();

                previous = { x, y };
            }
        });

        this.canvas.addEventListener('mousedown', (event) => {
            let { pageX: x, pageY: y } = event;
            previous = { x, y };

            isMouseDown = true;
        });

        this.canvas.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        this.button.addEventListener('click', () => {
            this.saveDrawing();
        });
    }

    saveDrawing() {
        let saved = this.canvas.toDataURL();
        console.log('CONTEXT:', saved);
    }
}

customElements.define('canvas-element', Canvas);
