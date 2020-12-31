const text1 = {
    fontfile: "fonts/Taters0.2-Baked.otf",
    content: "my name jeff",
    x: -290,
    y: 30,
    size: 100,
    fill: "#fff",
    stroke: "black",
    strokewidth: 2,
};
opentypeLoad(text1);

let h = 1;
let w = 0;
function animateSVG(text1) {
    w += 0.01;
    h += Math.sin(w);
    let g = h * 0.1 - 1;
    for (let i = 0; i < text1.points.length; i++) {
        const item = text1.points[i];

        item.x =
            text1.init_x[i] * Math.cos(g) - text1.init_y[i] * Math.sin(g) + 500;
        item.x1 =
            text1.init_x1[i] * Math.cos(g) -
            text1.init_y1[i] * Math.sin(g) +
            500;
        item.x2 =
            text1.init_x2[i] * Math.cos(g) -
            text1.init_y2[i] * Math.sin(g) +
            500;

        item.y =
            text1.init_x[i] * Math.sin(g) + text1.init_y[i] * Math.cos(g) + 300;
        item.y1 =
            text1.init_x1[i] * Math.sin(g) +
            text1.init_y1[i] * Math.cos(g) +
            300;
        item.y2 =
            text1.init_x2[i] * Math.sin(g) +
            text1.init_y2[i] * Math.cos(g) +
            300;
    }
    renderText(text1);
    requestAnimationFrame(() => {
        animateSVG(text1);
    });
}
