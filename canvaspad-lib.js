'use strict';

CanvasRenderingContext2D.prototype.drawCircle = function (x, y, radius) {
    this.beginPath();
    this.arc(x, y, radius, 0, Math.PI * 2, false);
};

CanvasRenderingContext2D.prototype.drawEllipse = function (centreX, centreY, width, height) {
    // See http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
    var offset = 0.551784,
        offsetX = (width / 2) * offset,
        offsetY = (height / 2) * offset,
        x = centreX - (width / 2),
        y = centreY - (height / 2),
        endX = x + width,
        endY = y + height,
        midX = x + width / 2,
        midY = y + height / 2;

    this.beginPath();
    this.moveTo(x, midY);
    this.bezierCurveTo(x, midY - offsetY, midX - offsetX, y, midX, y);
    this.bezierCurveTo(midX + offsetX, y, endX, midY - offsetY, endX, midY);
    this.bezierCurveTo(endX, midY + offsetY, midX + offsetX, endY, midX, endY);
    this.bezierCurveTo(midX - offsetX, endY, x, midY + offsetY, x, midY);
};
