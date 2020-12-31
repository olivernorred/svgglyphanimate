const svgcontainer = document.querySelector("#svgglyphanimate");

function opentypeLoad(text) {
    opentype.load(text.fontfile, function (err, font) {
        if (err) {
            console.error("font not loaded");
        }

        text.font = font;
        onFontLoaded(text); //defines text.Path
    });
}

function onFontLoaded(text) {
    text.Path = text.font.getPath(text.content, text.x, text.y, text.size);
    console.log(text.Path);
    text.points = text.Path.commands;
    init(text);
}

function init(text) {
    //declare vars
    text.init_x = [];
    text.init_x1 = [];
    text.init_x2 = [];
    text.init_y = [];
    text.init_y1 = [];
    text.init_y2 = [];
    for (let i = 0; i < text.Path.commands.length; i++) {
        const item = text.Path.commands[i];
        text.init_x.push(item.x);
        text.init_x1.push(item.x1);
        text.init_x2.push(item.x2);
        text.init_y.push(item.y);
        text.init_y1.push(item.y1);
        text.init_y2.push(item.y2);
        item.v = 1;
    }
    animateSVG(text);
}

function renderText(text) {
    text.Path.fill = text.fill;
    text.Path.stroke = text.stroke;
    text.Path.strokeWidth = text.strokewidth;
    svgcontainer.innerHTML = text.Path.toSVG();
}
