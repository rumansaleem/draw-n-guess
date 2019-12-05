let canvasEl = document.querySelector('canvas');
let context = canvasEl.getContext('2d');

let pendown = false;
let brushSize = 10;
let prev = null;
let foreground = '#000000';

// window.addEventListener('pointerdown', () => {console.log('down');pendown = true});
// window.addEventListener('pointerup', () => {console.log('up');pendown = false});

canvas.addEventListener('pointermove', event => {
	switch(event.buttons) {
		case 1: return onCanvasDraw(event);
		default: prev = null;
	}
});
canvas.addEventListener('pointerout', event => {
	if(event.buttons == 1 && prev) {
		connect(prev, event);
		prev = null;
	}
})

function onCanvasDraw({offsetX, offsetY, clientX, clientY}) {
	fillCircle(context, offsetX, offsetY, brushSize/2);
	if(prev && prev.offsetX && prev.offsetY) {
		connect(prev, {offsetX, offsetY});
	}
	prev = {offsetX, offsetY}
}

function connect(prev, curr) {
	console.log('connecting')
	context.lineWidth = brushSize;
	context.beginPath();
	context.moveTo(prev.offsetX, prev.offsetY);
	context.lineTo(curr.offsetX, curr.offsetY);
	context.stroke();
}

function fillCircle(ctx, x, y, r) {
	oldFill = ctx.fillStyle;
	ctx.fillStyle = foreground;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.fill();
	ctx.fillStyle = oldFill;
}