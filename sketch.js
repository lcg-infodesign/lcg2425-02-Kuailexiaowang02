let colors = ["#FF3C3C", "#FFD93D", "#3CDFFF", "#3CFF8F", "#D93DFF"];
let cols = 8; 
let rows = 6;  

function setup() {
  createCanvas(windowWidth, windowHeight);
  // put setup code here
  noLoop();
}

function draw() {
    background(0); 
    let margin = 25; 
    let cellSize = min((width - margin * (cols + 1)) / cols, 
                       (height - margin * (rows + 1)) / rows); 
  
    // 计算整体网格的偏移量，使其居中
    let offsetX = (width - (cellSize * cols + margin * (cols - 1))) / 2;
    let offsetY = (height - (cellSize * rows + margin * (rows - 1))) / 2;
  
    // 遍历每个单元格位置，绘制图案
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let posX = offsetX + x * (cellSize + margin) + cellSize / 2;
        let posY = offsetY + y * (cellSize + margin) + cellSize / 2;
  
        push();
        translate(posX, posY); 
        rotate(random()); 
        drawComplexGlyph(cellSize * 0.5); 
        pop();
      }
    }
  }
  
  // 绘制复杂图案的函数
  function drawComplexGlyph(maxRadius) {
    let layers = int(random(3, 6)); 
    for (let i = 0; i < layers; i++) {
      let shapeType = int(random(3)); 
      let size = maxRadius * random(0.3, 0.8); 
      let layerColor = color(random(colors));
      layerColor.setAlpha(random(100, 290)); // 设置不同的透明度
  
      // 绘制不同的形状
      fill(layerColor);
      noStroke();
      switch (shapeType) {
        case 0:
          ellipse(0, 0, size * 2); 
          break;
          case 1:
            push();
            rotate(PI / 4); // 将矩形旋转45度，变成菱形
            rectMode(CENTER);
            rect(0, 0, size, size); 
            pop();
            break;
        case 2:
          rectMode(CENTER);
          rect(0, 0, size, size); 
          break;
      }
    }
  
    // 在图案上层叠加发光效果
    drawGlowEffect(maxRadius);
  }
  
  // 绘制发光效果的函数
  function drawGlowEffect(radius) {
    let glowLayers = 5;
    for (let i = glowLayers; i > 0; i--) {
      let alpha = map(i, 0, glowLayers, 30, 70);
      let glowRadius = map(i, 0, glowLayers, radius * 0.5, radius * 1.2);
      fill(255, 255, 255, alpha);
      ellipse(0, 0, glowRadius * 2);
    }
  }
  
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    redraw(); 
  }