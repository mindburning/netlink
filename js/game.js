window.onload = function() {
  var camera, scene, renderer;
  var mesh;
  var t = 0;

  camera = new THREE.OrthographicCamera( window.innerWidth / - 200, window.innerWidth / 200, window.innerHeight / 200, window.innerHeight / - 200, -1000, 1000 );

  scene = new THREE.Scene();

  var loader = new THREE.ObjectLoader();
  loader.load('assets/models/assets.json',
      // Function when resource is loaded
      function ( geometry ) {
        scene = geometry;
        var s = geometry.getObjectByName("rack.simple").clone();
        var g = geometry.getObjectByName("grounds").clone();
        var serv = geometry.getObjectByName("server.simple").clone();

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
            mesh.translateX(x*1.01);
            mesh.translateZ(0);
            mesh.translateY(y*1.01);
            //mesh.rotateX( -Math.PI / 2);
            scene.add( mesh );
            var b = s.clone();
            mesh.getObjectByName('rack.' + (y+20)%4).add(b);
            var serv1 = serv.clone();
            b.add(serv1);
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

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  function animate() {
    t+=0.005;
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
};