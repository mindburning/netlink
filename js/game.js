window.onload = function() {
  var camera, scene, renderer;
  var mesh;
  var t = 0;

  camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1000, 1000 );

  scene = new THREE.Scene();

  var texture = new THREE.ImageUtils.loadTexture( 'assets/models/textures/MetalFloorsBare0063_2_400.jpg' );
  for (var x=-10;x<10;x++) {
    for (var y=-10;y<10;y++) {
      var geometry = new THREE.BoxGeometry( 100, 100, 0.1 );
      var material = new THREE.MeshBasicMaterial( { map: texture } );
      mesh = new THREE.Mesh( geometry, material );
      mesh.translateX(x*101);
      mesh.translateY(y*101);
      scene.add( mesh );
    }
  }
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  function animate() {
    t+=0.0015;
    requestAnimationFrame( animate );
    //mesh.rotation.x += 0.005;
    //mesh.rotation.z += 0.001;
    camera.position.set(200*Math.sin(t),200*Math.cos(t),100);
    camera.up = new THREE.Vector3(0,0,1);
    camera.lookAt(new THREE.Vector3(0,0,0));
    renderer.render( scene, camera );
  }
  animate();
};