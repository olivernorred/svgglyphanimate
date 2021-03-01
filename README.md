# svgglyphanimate
animate glyphs with javascript and render them in an svg viewbox


The skeleton of an svgglyphanimate script is:
1. Define the `text` object and ask opentype.js to read it
2. Define the `animateSVG(text)` function with a `for` loop, and
3. End the `animateSVG(text)` function with the `renderText(text)` function and a `requestAnimationFrame(() => animateSVG(text))`

In your HTML, create an SVG element and define the viewbox, then fetch the scripts, as follows:
```
<svg
    id="svgglyphanimate"
    version="1.1"
    baseProfile="full"
    xmlns="http://www.w3.org/2000/svg"
    viewbox="0 -100 1000 1000"
></svg>
<script src="https://cdn.jsdelivr.net/npm/opentype.js@latest/dist/opentype.min.js"></script>
<script src="svgglyphanimate.js"></script>
<script src="yourscript.js"></script>
```


Here's an example script:
```
const text = {
    fontfile:"fonts/Taters0.2-Baked.otf",
    content: "my name jeff",
    x: 0,
    y: 200,
    size: 150,
    fill: "#fff",
    stroke: "black",
    strokewidth: 2
};
opentypeLoad(text);


let g=5;

function animateSVG(text) {
    g+=.2;
    for (let i = 0; i < text.points.length; i++) {
        const item = text.points[i];

        item.y += .3*Math.sin(item.x+g);

    }
    renderText(text);
    requestAnimationFrame(() => animateSVG(text))
}
```

`opentypeLoad(text)` defines an array of points, `text.points` in an SVG-path-like object. Each `item` in the set has an `x`, `y`, `x1`, `y1`, `x2`, and `y2` property that can be accessed and changed. The `1`s and `2`s are for SVG path curves.

`opentypeLoad(text)` also defines `text.init_x`, `text.init_y`, `text.init_x1`, `text.init_y1`, `text.init_x2`, `text.init_y2` arrays, for the *initial* values of `x`, `y`, etc. 

In example2, those initial values are used to determine present values after a certain rotation: 

```
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
```

The x and y values for every path are rotated from their initial values via a rotation matrix in 2d.
