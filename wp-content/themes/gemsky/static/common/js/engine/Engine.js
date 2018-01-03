/* exported Engine */

'use strict';
var Engine = {};
Engine.createLogic = function(){
    console.log('go->Engine.createLogic')
    var updateFunctions = [];
    var delta = null;
    var lastMsec = Date.now();
    (function updateLoop( nowMsec )
    {
        delta = nowMsec - lastMsec;

        for( var i=0; i<updateFunctions.length; i++ ){
            var update = updateFunctions[ i ];
            var fnDelta = nowMsec - update.lastTime;
            if( fnDelta > update.frequency ){
                update.fn( delta );
                update.lastTime = nowMsec;
            }
        }

        lastMsec = nowMsec;
        requestAnimationFrame( updateLoop );
    })( Date.now() );


    var that = {};
    that.add = function( fn, frequency ){
        if( frequency === undefined ){
            frequency = 0;
        }

        updateFunctions.push( {
            lastTime: 0,
            frequency: frequency,
            fn: fn
        });
    };

    return that;
};
Engine.createControl = function( view, logic ){
    console.log('go->Engine.createControl')

    var camera = view.getCamera();
    var domElement = view.getDomElement();

    var orbitControls = new THREE.OrbitControls( camera, domElement );
    orbitControls.target.set( 0, 0, 0 );

    //  values for debug only
    orbitControls.noPan = false;
    orbitControls.userPanSpeed = 0.3;
    orbitControls.keyPanSpeed = 30.0;

    orbitControls.noZoom = false;
    orbitControls.zoomSpeed = 4.0;

    orbitControls.update();

    var that = {};

    // expose some control-related stuff

    that.getOrbitControls = function(){
        return orbitControls;
    };

    logic.add( function(){
        orbitControls.update();
    });

    return that;
};
Engine.createRenderer = function( camera, scene ){

    var renderWidth = window.innerWidth;
    var renderHeight = window.innerHeight;

    var renderer = new THREE.WebGLRenderer({
        antialias: false
    });

    renderer.setSize( renderWidth, renderHeight );

    renderer.shadowMapEnabled = false;
    // renderer.shadowMapType = THREE.PCFSoftShadowMap;
    renderer.shadowMapCullFace = THREE.CullFaceBack;


    var composer = new THREE.EffectComposer( renderer );
    composer.setSize( renderer.domElement.width, renderer.domElement.height );

    //  take care of window resizing
    window.addEventListener( 'resize', function () {

        camera.aspect = window.innerWidth / window.innerHeight;

        if( viewControl ){
            viewControl.updateViewport();
        }

        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
        composer.setSize( window.innerWidth, window.innerHeight );
        composer.reset();
        ssao.uniforms[ 'size' ].value.set( window.innerWidth, window.innerHeight );
        fxaa.uniforms[ 'resolution' ].value = new THREE.Vector2( 1/window.innerWidth, 1/window.innerHeight );

    }, false );


    var depthShader = THREE.ShaderLib[ 'depthRGBA' ];
    var depthUniforms = THREE.UniformsUtils.clone( depthShader.uniforms );

    var depthMaterial = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms } );
    depthMaterial.blending = THREE.NoBlending;

    var depthTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        antialias: true
    });

    var ssao = new THREE.ShaderPass( THREE.SSAOShader );
    ssao.uniforms[ 'tDepth' ].value = depthTarget;
    ssao.uniforms[ 'size' ].value.set( 1024, 1024 );
    ssao.uniforms[ 'cameraNear' ].value = camera.near;
    ssao.uniforms[ 'cameraFar' ].value = camera.far * 0.8;
    ssao.uniforms[ 'aoClamp' ].value = 0.3;
    ssao.uniforms[ 'lumInfluence' ].value = 0.1;

    var fxaa = new THREE.ShaderPass( THREE.FXAAShader );
    fxaa.uniforms[ 'resolution' ].value = new THREE.Vector2( 1/window.innerWidth, 1/window.innerHeight );

    var renderPass = new THREE.RenderPass( scene, camera );

    var effectCopy = new THREE.ShaderPass( THREE.CopyShader );
    effectCopy.renderToScreen = true;


    composer.addPass( renderPass );
    composer.addPass( ssao );
    composer.addPass( fxaa );
    composer.addPass( effectCopy );


    var that = {};

    that.getDomElement = function(){
        return renderer.domElement;
    };

    that.render = function( delta, zoomCenter ){
        scene.overrideMaterial = depthMaterial;
        renderer.render( scene, camera, depthTarget );
        scene.overrideMaterial = null;

        composer.render( delta );
    };

    var viewControl;
    that.setViewControl = function( vc ){
        viewControl = vc;
    };

    return that;
};
Engine.createView = function( /* options */ ){
    console.log('go->Engine.createView')

    var stats = new Stats();
    stats.setMode( 1 ); // 0: fps, 1: ms, 2: mb

    // align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    // document.body.appendChild( stats.domElement );

    var renderWidth = window.innerWidth;
    var renderHeight = window.innerHeight;

    var camera = new THREE.PerspectiveCamera( 45, renderWidth/renderHeight, 0.25, 2000 );
    camera.position.set( 1, 1, 1 );
    camera.position.normalize().multiplyScalar( 80 );

    var scene = new THREE.Scene();
    // scene.add( camera );

    var renderer = Engine.createRenderer( camera, scene );
    $( '#globe' ).append( $( renderer.getDomElement() ) );

    var space = new THREE.Group();
    scene.add( space );
    // space.rotation.x = Math.PI * 0.5;

    var zoomCenter = new THREE.Vector3();

    var clock = new THREE.Clock( true );

    function render( delta, zoomCenter ){
        renderer.render( delta, zoomCenter );
    }

    (function drawLoop( time )
    {
        stats.begin();
        TWEEN.update( time );

        var delta = clock.getDelta();

        scene.traverse( function( o ){
            if( o.update ){
                if( o instanceof THREE.LOD ){
                    o.update( camera );
                }
                else{
                    o.update( delta, camera );
                }
            }
        });

        render( delta, zoomCenter );
        stats.end();

        requestAnimationFrame( drawLoop );

    })( Date.now() );


    //  public accessors...

    var that = {};

    that.getRenderer = function(){
        return renderer;
    };

    that.getSpace = function(){
        return space;
    };

    that.getScene = function(){
        return scene;
    };

    that.getCamera = function(){
        return camera;
    };

    that.getDomElement = function(){
        return renderer.getDomElement();
    };

    that.setZoomCenter = function( zc ){
        zoomCenter.copy( zc );
    };

    that.setFov = function( fov ){
        camera.fov = fov;
        camera.updateProjectionMatrix();
    };

    that.overrideViewport = function( viewControl ){
        renderer.setViewControl( viewControl );
    };

    return that;
};