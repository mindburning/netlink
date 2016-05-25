window.onload = function() {
  Crafty.init();

  Crafty.sprite(
      142,
      227,
      "assets/0001.png",
      {
        stone: [0,0,1,1]
      }
  );

  Crafty.sprite(
      142,
      227,
      "assets/0002.png",
      {
        server1: [0,0,1,1],
        server2: [1,0,1,1],
        server3: [2,0,1,1],
        server4: [3,0,1,1]
      }
  );

  Crafty.sprite(
      142,
      56,
      "assets/0002.png",
      {
        node1: [10,1,1,1],
        node2: [11,1,1,1],
        node3: [12,1,1,1],
        node4: [13,1,1,1]
      }
  );

  iso = Crafty.diamondIso;
  iso.init(142,142-94, 20, 20);
  Crafty.log("over");
  var z = 0;
  for(var i = 10; i >= 0; i--) {
    for(var y = 0; y < 20; y++) {
      var tile = Crafty.e("2D, DOM, stone, Mouse")
          .areaMap(new Crafty.polygon([71,130, 142,155, 142,200, 71,227, 0,200, 0,155]))
          .bind("click", function(e) {
            //destroy on right click
            if(e.button === 2) this.destroy();
          }).bind("MouseOver", function() {
            this.sprite(1,0,1,1);
          }).bind("MouseOut", function() {
            this.sprite(0,0,1,1);
          });
      iso.place(tile, i, y, 0);
      if (y%3==1) {
        var tile2 = Crafty.e("2D, DOM, server" + (i % 4 + 1));
        iso.place(tile2, i, y, 1);
        var tile3 = Crafty.e("2D, DOM, node" + (i % 4 + 1));
        iso.place(tile3, i, y, 2);
      }
    }
  }

  Crafty.addEvent(this, Crafty.stage.elem, "mousedown", function(e) {
    if(e.button > 1) return;
    var base = {x: e.clientX, y: e.clientY};

    function scroll(e) {
      var dx = base.x - e.clientX,
          dy = base.y - e.clientY;
      base = {x: e.clientX, y: e.clientY};
      Crafty.viewport.x -= dx;
      Crafty.viewport.y -= dy;
    };

    Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
    Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function() {
      Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", scroll);
    });
  });
};