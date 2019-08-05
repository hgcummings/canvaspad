'use strict';

const editor = ace.edit("editor");
editor.setTheme("ace/theme/dracula");
editor.session.setMode("ace/mode/javascript");

const preview = document.getElementById('preview');
const unit = preview.clientWidth;

const canvas = document.createElement('canvas');
canvas.setAttribute('width', unit);
canvas.setAttribute('height', unit);
canvas.style.backgroundColor = '#CCCCCC';
preview.appendChild(canvas);

const context = canvas.getContext('2d');
context.translate(unit / 2, unit / 2);

const redraw = function redraw() {
    context.clearRect(-unit / 2, -unit / 2, unit, unit);

    context.save();
    context.strokeStyle = '#eeeeee';
    for (let i = -5; i < 6; ++i) {
        context.lineWidth = i === 0 ? 2 : 0.5;
        const lineCentre = (i * unit / 12) + 0.5 * Math.sign(i);
        context.beginPath();
        context.moveTo(lineCentre, -unit / 2);
        context.lineTo(lineCentre, unit / 2);
        context.stroke();
        context.closePath();

        context.moveTo(-unit / 2, lineCentre);
        context.lineTo(unit / 2, lineCentre);
        context.stroke();
    }
    context.restore();

    const func = eval(editor.getValue());
    context.save();
    func(context, unit);
    context.restore();
}

redraw();

let timeout;
editor.on('change', () => {
    clearTimeout(timeout);
    timeout = setTimeout(redraw, 500);
});
