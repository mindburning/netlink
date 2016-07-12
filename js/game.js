window.onload = function() {
  var camera, scene, renderer;
  var mesh;
  var t = Math.PI/4;
  var zoom = 3/8;

  var server = [];

  function setCam(zoom) {
    return new THREE.OrthographicCamera( window.innerWidth / - 100 * zoom, window.innerWidth / 100 * zoom, window.innerHeight / 100 * zoom, window.innerHeight / - 100 * zoom, -1000, 1000 );
  }

  camera = setCam(zoom);

  scene = new THREE.Scene();

  var loader = new THREE.ObjectLoader();
  loader.load('assets/models/assets.json',
      // Function when resource is loaded
      function ( geometry ) {
        scene = geometry;
        var g = geometry.getObjectByName("grounds").clone();
        var rack = geometry.getObjectByName("racks").clone();
        var serv = geometry.getObjectByName("server.1he").clone();
        var serv2he = geometry.getObjectByName("server.2he").clone();

        var Arbeitsbereich = geometry.getObjectByName("Arbeitsbereich").clone();
        var Videowall = geometry.getObjectByName("Videowall").clone();
        var Werkstatt = geometry.getObjectByName("Werkstatt").clone();

        geometry.traverse( function ( object ) { if( object instanceof THREE.Mesh) { object.visible = false; } } );
        /*
        var object = geometry.scene;
        object.scale.set(200, 200, 200);
        scene.add( object );
        */

        var texture = new THREE.ImageUtils.loadTexture( 'assets/models/jpg/MetalFloorsBare0063_2_400.jpg' );
        for (var x=-10;x<10;x++) {
          for (var y=-10;y<10;y++) {
            var material = new THREE.MeshBasicMaterial( { map: texture } );
            var materialP = new THREE.MeshPhongMaterial( { map: texture } );
            //scene.overrideMaterial = material;
            /*
            var geometry = new THREE.BoxGeometry( 100, 0.01, 100 );
            mesh = new THREE.Mesh( geometry, materialP );
            mesh.translateX(x*101);
            mesh.translateY(0);
            mesh.translateZ(y*101);
            */
            mesh = g.clone();
            mesh.translateX(x * 1.40);
            mesh.translateZ(0);
            mesh.translateY(y * 1.40);
            //mesh.rotateX( -Math.PI / 2);
            scene.add( mesh );

            if(Math.random()<0.4) {
              var b = rack.clone();
              for(var d=0;d<12;d++) {
                var is2HE = d%2 == 1 && Math.random()<0.2;
                var serv1 = is2HE ? serv2he.clone() : serv.clone();
                serv1.getObjectByName('server.' + (is2HE ? "2he" : "1he") + '.0').visible = Math.round((d+y*y)/2)%4==0;
                serv1.getObjectByName('server.' + (is2HE ? "2he" : "1he") + '.25').visible = Math.round((d+y*y)/2)%4==1;
                serv1.getObjectByName('server.' + (is2HE ? "2he" : "1he") + '.50').visible = Math.round((d+y*y)/2)%4==2;
                serv1.getObjectByName('server.' + (is2HE ? "2he" : "1he") + '.100').visible = Math.round((d+y*y)/2)%4==3;
                serv1.getObjectByName('server.' + (is2HE ? "2he" : "1he") + '.base').visible = true;
                server.push([serv1, 'server.' + (is2HE ? "2he" : "1he")]);
                b.getObjectByName('server.' + Math.floor(100 + y*2 + Math.random() * 2 + d) % 20).add(serv1);
              }
              mesh.getObjectByName('rack.' + (y + 20) % 4).add(b);
            } else if(Math.random()<0.2) {
              mesh.getObjectByName('rack.' + (y + 20) % 4).add(Arbeitsbereich.clone());
              if(Math.random()<0.4) {
                mesh.getObjectByName('rack.' + (y + 20) % 4).add(Videowall.clone());
              }
            } else if(Math.random()<0.2) {
              mesh.getObjectByName('rack.' + (y + 20) % 4).add(Werkstatt.clone());
            }

            //mesh.add( b );
          }
        }

      });

  /*
  scene.add( new THREE.AmbientLight( 0xaaaaaa ) );
  var directionalLight = new THREE.DirectionalLightShadow(0xffffff, 1);
  directionalLight.castShadow = true;
  directionalLight.shadowCameraVisible = true;
  //directionalLight.position.set(90,90,90);
  scene.add( directionalLight );
  */
  //scene.add( new THREE.DirectionalLightHelper(directionalLight, 0.2) );

  renderer = new THREE.WebGLRenderer({alpha : true, antialias: true});
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  function animate() {
    for (var n = server.length-1; n > 0 ; n-=Math.floor(Math.random()*12 + 1)) {
      var iShow = Math.round(n+t*6 + Math.random()*1.9)%4;
      server[n][0].visible = Math.cos(t+n)<0;
      server[n][0].getObjectByName(server[n][1] + '.0').visible = iShow ==0;
      server[n][0].getObjectByName(server[n][1] + '.25').visible = iShow==1;
      server[n][0].getObjectByName(server[n][1] + '.50').visible = iShow==2;
      server[n][0].getObjectByName(server[n][1] + '.100').visible = iShow==3;
    }
    //t+=0.005;
    //mesh.rotation.x += 0.005;
    //mesh.rotation.z += 0.001;
    camera.position.set(2.00*Math.cos(t),1.00,2.00*Math.sin(t));
    camera.up = new THREE.Vector3(0,1,0);
    camera.lookAt(new THREE.Vector3(0,0,0));

    renderer.render( scene, camera );
    setTimeout(function(){
      requestAnimationFrame( animate )
    },25);
  }
  animate();
  document.querySelectorAll('[data-action]').forEach(function() {
    this.addEventListener("click", function(ev) {
      switch(ev.target.getAttribute('data-action')) {
        case "view.zoom":
          zoom*=parseFloat(ev.target.getAttribute('data-param'));
          break;
        case "view.rotate":
          t+=parseFloat(ev.target.getAttribute('data-param')/360*Math.PI);
          break;
      }
      camera = setCam(zoom);
      renderer.setSize( window.innerWidth, window.innerHeight );
    });
  });
};