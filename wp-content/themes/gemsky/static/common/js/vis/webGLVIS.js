
'use strict';
var VIS = {}
VIS.createObjField = function(texture,renderWebGL){

    // VIS.createGlobe( group, {


    //     scale: 18.0,
    //     outerColor: 0x444444,
    //     innerColor: 0x050505
    // });

    var innerSpace = new THREE.Mesh( new THREE.SphereGeometry( renderWebGL.threejs_dev.earthRadius+5, 128, 128 ,Math.PI/2), new THREE.MeshPhongMaterial({
        // map:texture,
        transparent:true,
        opacity:0.2,
        // color: 0x080808,
        // color: 0x4172DB,
        color: 0xffffff,
        // side: THREE.BackSide,
        // side: THREE.DoubleSide,
        // emissive: 0x030303,
        emissive: 0x4172DB,
        ambient:0x030303,
        // specular:0x000000,
        specular:new THREE.Color("rgb(0, 0, 0, 1)"),
        shininess:10
    }) );

    return innerSpace ;
};
VIS.createObj = function (renderWebGL) {
    var scale = renderWebGL.threejs_dev.earthRadius + 8; /* 18.0 */
    var outerColor = 0x444444 ; /* 0x444444 */
    var innerColor = 0x05050; /* 0x050505 */

    // new THREE.OBJLoader().load( 'obj/GlobePass1.obj', function( obj ){
    // var objUrl = proxy + '/static/common/obj/earth.obj'
    // console.log('objUrl',objUrl)
    new THREE.OBJLoader().load(earthObjUrl , function( obj ) {
        obj.rotation.y = Math.PI/2
        console.log('go-> VIS.createObj obj load done')
        console.log('obj',obj)

        obj.scale.setLength(scale);

        var outerMaterial = new THREE.MeshPhongMaterial({
            color: outerColor,
        });
        //
        var innerMaterial = new THREE.MeshPhongMaterial({
            color: innerColor,
            specular: 0x010101,
            shininess: 1
        });
        //
        var mesh = obj.children[0];
        //
        var material = new THREE.MeshFaceMaterial([outerMaterial, innerMaterial]);
        mesh.material = material;
        //
        //  convert into regular geometry so we can have faces
        var geometry = new THREE.Geometry().fromBufferGeometry( mesh.geometry );
        mesh.geometry = geometry;

         // color interior differently than exterior
        geometry.faces.forEach( function( face ){
          var a = geometry.vertices[ face.a ];
          var b = geometry.vertices[ face.b ];
          var c = geometry.vertices[ face.c ];
          var vx = ( a.x + b.x + c.x ) / 3;
          var vy = ( a.y + b.y + c.y ) / 3;
          var vz = ( a.z + b.z + c.z ) / 3;
          var v = new THREE.Vector3( vx, vy, vz );
          var normal = face.normal;
          v.normalize();
          var d = v.dot( normal.normalize() );
          if( d < -0.9 ){
            face.materialIndex = 1;
          }
          else{
            face.materialIndex = 0;
          }
        });

        // mesh.receiveShadow = true;
        renderWebGL.addGroupMeshToScene('obj','obj',obj)
    })
}

VIS.createLights = function( renderWebGL){
    var fixedLights = [];
    var followLights = [];
    var light1 = new THREE.PointLight( 0x97dbe6, 3.25, 200 );
    light1.position.set( 50, 60, 40 );
    var light2 = new THREE.PointLight( 0xD4EAC8, 30.0, 600 );
    light2.position.set( 150, 80, -200 );
    var light3 = new THREE.PointLight( 0x77FCFA, 1.8, 200 );
    light3.position.set( -20, -60, -50 );
    var spotLight = new THREE.SpotLight( 0xffffff, 2.0, 200, Math.PI / 5 );
    spotLight.position.set( -20, 50, 50 );
    spotLight.target.position.set( 0,0,0 );
    spotLight.castShadow = true;
    spotLight.shadowCameraVisible = false;
    spotLight.shadowCameraNear = 40;
    spotLight.shadowCameraFar = 60;
    spotLight.shadowCameraFov = 20;
    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;
    spotLight.shadowDarkness = 0.5;

    // fixedLights.push( light1, light3 );
    // fixedLights.forEach( function( light ){
    //     renderWebGL.addGroupMeshToScene('light','light',light)
    //     var sphereSize = 3;
    //     var pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
    //     renderWebGL.addGroupMeshToScene( 'pointLightHelper','pointLightHelper',pointLightHelper );
    // });
    //
    // followLights.push( light2, spotLight );
    // followLights.forEach( function( light ){
    //     renderWebGL.threejs_dev.camera.add( light );
    // });
    // renderWebGL.addGroupMeshToScene('light','light',light2)
    var sphereSize = 3;
    var pointLightHelper = new THREE.PointLightHelper( light2, sphereSize );
    // renderWebGL.addGroupMeshToScene( 'pointLightHelper','pointLightHelper',pointLightHelper );

    renderWebGL.threejs_dev.camera.add( spotLight );
    // renderWebGL.addGroupMeshToScene( 'spotLight','spotLight',spotLight );

    var spotLightHelper = new THREE.SpotLightHelper( spotLight );
    // renderWebGL.threejs_dev.camera.add( spotLightHelper );


};


VIS.getQuestions = function( questionsCSV ){
    var csvStr = questionsCSV;
    var questions = Papa.parse( csvStr ).data;
    questions.splice( 0, 1 );

    var topics = {};
    questions.forEach( function( q ){
        var city = q[ 0 ];
        var topic = q[ 1 ];
        var question = q[ 2 ];
        var original = q[ 4 ];
        if( topics[ topic ] === undefined ){
            topics[ topic ] = [];
        }
        topics[ topic ].push({
            city: city,
            question: question,
            original: original
        });
    });

    var cities = {};
    questions.forEach( function( q ){
        var city = q[ 0 ];
        var topic = q[ 1 ];
        var question = q[ 2 ];
        var original = q[ 4 ];
        if( cities[ city ] === undefined ){
            cities[ city ] = [];
        }
        cities[ city ].push({
            topic: topic,
            question: question,
            original: original
        });
    });

    console.log( 'cities',cities );

    function getRandomFromArray( arr ){
        return arr[ Math.floor( Math.random() * arr.length ) ];
    }

    function getRandomEntry( obj ){
        console.log('getRandomEntry')
        var keys = Object.keys( obj );
        return getRandomFromArray( keys );
    }

    function getQuestionsFromCityWithTopic( city, topic ){
        return _.filter( cities[ city ], { topic: topic });
    }

    var that = {};

    that.getRandomtopic = function(){
        return getRandomEntry( topics );
    };

    that.getRandomCity = function(){
        return getRandomEntry( cities );
    };

    that.getRandomQuestionFromCity = function( cityName, topic ){
        var city = cities[ cityName ];
        if( city === undefined ){
            console.warn( 'unknown city', cityName );
            return {
                question: '',
                original: ''
            };
        }

        if( topic === undefined ){
            return getRandomFromArray( city );
        }
        else{
            var entries = getQuestionsFromCityWithTopic( cityName, topic );
            if( entries.length === 0 ){
                return {
                    question: '',
                    original: ''
                };
            }
            return getRandomFromArray( entries );
        }
    };


    return that;
};

VIS.createCityLookup = function( csvStr ){
    var citiesArray = Papa.parse( csvStr ).data;
    citiesArray.splice( 0, 1 );

    var cities = {};
    citiesArray.forEach( function( cityArr ){
        var cityName = cityArr[ 1 ];
        var type = cityArr[ 5 ];
        if( type !== 'major' ){
            return;
        }

        cities[ cityName ] = {
            lat: parseFloat( cityArr[ 3 ] ),
            long: parseFloat( cityArr[ 4 ] ),
        };


    });
    console.log('createCityLookup->',cities)
    var cityIds = {};
    citiesArray.forEach( function( cityArr ){
        var type = cityArr[ 5 ];
        if( type !== 'major' ){
            return;
        }

        cityIds[ cityArr[ 0 ] ] = cityArr[ 1 ];
    });

    var that = {};
    that.getCityCoordinates = function( name ){
        return cities[ name ];
    };

    that.getCityCoordinatesFromId = function( cityId ){
        return that.getCityCoordinates( cityIds[ cityId ] );
    };

    that.getList = function(){
        return cities;
    };

    return that;
};

VIS.abstractTopics = function( csvStr ){
    var topicsArray = Papa.parse( csvStr ).data;
    topicsArray.splice( 0, 1 );
    var topics = {};
    topicsArray.forEach( function( t ){
        topics[ t[ 0 ] ] = t[ 1 ];
    });

    return function( topicId ){
        return topics[ topicId ];
    };
};

VIS.createCityMarkers = function( cities , earthRadius){

    var material = new THREE.MeshPhongMaterial({
        // color: 0x444444,
        color: 0x107DD3,
        specular: 0x107DD3,
        emissive: 0x107DD3,
        // emissive:0x000000,
        shininess: 15,
        shading: THREE.FlatShading
    });

    var baseMesh = new THREE.Mesh( new THREE.CylinderGeometry( 0.2, 0.0, 0.8, 3, 1 ), material );
    baseMesh.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI * 0.5 ) );
    // baseMesh.geometry.computeFaceNormals();
    // baseMesh.geometry.computeVertexNormals();
    //

    var cityLookup = {};

    var group = new THREE.Group();
    _.each( cities, function( cc, name ){
        var g = new THREE.Group();
        var material = new THREE.MeshPhongMaterial({
            // color: 0x444444,
            color: 0x107DD3,
            specular: 0x107DD3,
            emissive: 0x107DD3,
            // emissive:0x000000,
            shininess: 15,
            shading: THREE.FlatShading
        });

        var baseMesh = new THREE.Mesh( new THREE.CylinderGeometry( 0.2, 0.0, 0.8, 3, 1 ), material );
        baseMesh.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI * 0.5 ) );
        var m = baseMesh.clone();
        g.add( m );
        // console.log('go->name:',name,'lat',cc.lat,'long',cc.long)
        // var p = Coordinates.latLongToVector3( cc.lat, cc.long + Math.PI/2 , earthRadius.threejs_dev.earthRadius + 1 );
        var p = earthRadius.getPos({lng: parseFloat(cc.long), lat:parseFloat(cc.lat), r:earthRadius.threejs_dev.earthRadius + 1 });
        console.log('p',p)
        g.position.copy( p );
        g.lookAt( group.position );
        m.name = name;
        g.name = name
        // g.rotation.y = Math.PI/2
        group.add( g );

        cityLookup[ name ] = m;
        // highlightCityMesh(m)
    });

    var HighLightTween,deHighLightTween
    function highlightCityMesh(m){

        var s = {
            scale: 1.0,
            up: 0.0
        };
        HighLightTween = new TWEEN.Tween( s )
            .to({
                scale: 3.0,
                up: 2.0
            }, 2000 )
            .easing( TWEEN.Easing.Elastic.Out )
            .onUpdate( function(){
                m.scale.set( s.scale, s.scale, s.scale );
                m.position.z = -s.up;
                if(s.up == 2.0){
                    lastHighlighted = m
                }
            })
            .start();

        m.update = function(){
            this.rotation.z = Date.now() * 0.001;
        };



    }

    function deHighlightCityMesh(m){
        if(HighLightTween){
            TWEEN.remove(HighLightTween)
        }
        var s = {
            scale: 3.0,
            up: 2.0
        };
        deHighLightTween = new TWEEN.Tween( s )
            .to({
                scale: 1.0,
                up: 0.0
            }, 1500 )
            .easing( TWEEN.Easing.Elastic.Out )
            .onUpdate( function(){

                m.scale.set( s.scale, s.scale, s.scale );
                m.position.z = -s.up;
            })
            .start();

        m.update = undefined;
    }

    var lastHighlighted,newHighlighted

    var that = {};

    that.getView = function(){
        return group;
    };

    that.highlightCity = function( cityName ){
        // if(lastHighlighted){
        //     console.log('lastHighlighted->',lastHighlighted,lastHighlighted.name || "无" ,cityName)
        //
        // }
        if( lastHighlighted  ){
            if(lastHighlighted.name == cityName){

            }
            else{
                deHighlightCityMesh( lastHighlighted );
                lastHighlighted = cityLookup[cityName];
                highlightCityMesh(lastHighlighted);
            }



        }
        else{
            lastHighlighted = cityLookup[cityName];
            highlightCityMesh(lastHighlighted);
        }


    };

    that.hide = function(){
        group.traverse( function( m ){
            m.visible = false;
        });
    };

    that.show = function(){
        group.traverse( function( m ){
            m.visible = true;
        });
    };
    return that;
};



VIS.createQueryCanvas = function(){
    var $canvas = $( '<canvas>' );
    $canvas.css({
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: 500
    });

    var canvas = $canvas[ 0 ];
    canvas.width = canvas.height = 256;
    var context = canvas.getContext( '2d' );

    var font = 'bold 70px Roboto';

    //  debug
    // $canvas.appendTo( $( document.body ) );

    var texture = new THREE.Texture( canvas );
    texture.minFilter = THREE.LinearFilter;

    var that = {};

    that.getTexture = function(){
        return texture;
    };

    that.update = function( cityOrigin, str, originalStr, width, height, radius, thickness, alpha ){

        var totalLetters = str.length;
        var cutPoint = Math.floor( alpha * totalLetters );
        var outStr = str.substring( 0, ( cutPoint ) ) + originalStr.substring( Math.min( cutPoint, originalStr.length ), originalStr.length );

        if( alpha > 0.95 ){
            outStr = str;
        }

        if( alpha < 0.95 && Math.sin( Date.now() * 0.01 ) > 0.0 ){
            outStr += '|';
        }

        //  recalculate canvas size
        var circumference = Math.PI * 2 * radius;
        var radialHeight = circumference * ( height ) / Math.PI * radius;
        var radialWidth = circumference * ( width ) / Math.PI * radius;
        canvas.width = ( radialWidth ) * 4;
        canvas.height = ( radialHeight * 2 + thickness ) * 4;
        context.fillStyle = 'white';
        context.fillRect( 0, 0, canvas.width, canvas.height );
        context.font = font;
        context.fillStyle = 'black';
        context.fillText( outStr, 100, canvas.height * 0.87 );

        context.font = 'bold 40px Roboto';
        context.fillStyle = '#444444';
        context.fillText( 'from ' + cityOrigin, 90, canvas.height * 0.68 );

        context.lineWidth = 3.0;
        context.strokeStyle = '#333333';
        context.strokeRect( 80, canvas.height * 0.87 - 75, canvas.width - 160, 100 );

        texture.needsUpdate = true;
    };

    that.getTextWidth = function( text ){
        context.font = font;
        return context.measureText( text );
    };

    return that;
};

VIS.meshGenerator = function(){

    var mesh = new THREE.Mesh();
    // mesh.rotation.x = -Math.PI * 0.5;
    // mesh.rotation.x = Math.PI * 0.5;
    mesh.rotation.y = Math.PI * 0.5;
    console.log('go->mesh.rotation',mesh.rotation)

    var outerArc = new THREE.ArcCurve( 0, 0, 0, 0, 0, false );
    var innerArc = new THREE.ArcCurve( 0, 0, 0, 0, 0, false );

    return function( options ){
        var radius = options.radius;
        var thickness = options.thickness;
        var startAngleV = options.startAngleV;
        var sliceHeight = options.sliceHeight;
        var endAngleV = startAngleV + sliceHeight;
        var startAngleU = options.startAngleU;
        var sliceWidth = options.sliceWidth;
        var arcSegments = options.arcSegments;
        var material = options.material;
        // material = new THREE.MeshPhongMaterial({
        //     // map:texture,
        //     transparent:false,
        //     opacity:0.1,
        //     // color: 0x080808,
        //     // color: 0x4172DB,
        //     color: 0xffff00,
        //     // side: THREE.BackSide,
        //     // side: THREE.DoubleSide,
        //     // emissive: 0x030303,
        //     emissive: 0x4172DB,
        //     ambient:0x030303,
        //     // specular:0x000000,
        //     specular:new THREE.Color("rgb(0, 0, 0, 1)"),
        //     shininess:10
        // })
        outerArc.xRadius = outerArc.yRadius = radius + thickness;
        innerArc.xRadius = innerArc.yRadius = radius;

        outerArc.aStartAngle = startAngleV;
        innerArc.aStartAngle = endAngleV;

        outerArc.aEndAngle = endAngleV;
        innerArc.aEndAngle = endAngleV;

        var points = [];

        outerArc.getSpacedPoints( 6 ).forEach( function( p ){
            points.push( new THREE.Vector3( p.x,  p.y ,0 ) );
        });
        innerArc.getSpacedPoints( 6 ).reverse().forEach( function( p ){
            points.push( new THREE.Vector3( p.x,  p.y , 0) );
        });
        points.push( points[ 0 ].clone() );
        // console.log('go->points',outerArc.getSpacedPoints( 6 ),potins)
        // var points = [];
        // for ( var i = 0; i < 2; i ++ ) {
        //     points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
        // }
        mesh.geometry.dispose();
        delete mesh.geometry;
        mesh.geometry = undefined;

        mesh.geometry = new THREE.LatheGeometry( points, arcSegments, startAngleU, sliceWidth );
        mesh.material = material;

        return mesh;
    };


    // points.splice( points.length-1, 1 );

    // var shape = new THREE.Shape();
    // shape.moveTo( points[ 0 ].x, points[ 0 ].z );
    // points.forEach( function( p ){
    //   shape.lineTo( p.x, -p.z );
    // });
    // var shapeMesh = new THREE.Mesh( new THREE.ShapeGeometry( shape ), new THREE.MeshPhongMaterial({
    //   color: 0xeeeeee,
    //   side: THREE.BackSide
    // }));
    // shapeMesh.rotation.y = -startAngleU;
    // shapeMesh.rotation.x = startAngleV;
    // // lathed.add( shapeMesh );

    // var shapeMesh2 = shapeMesh.clone();
    // shapeMesh2.material = new THREE.MeshPhongMaterial({
    //   color: 0xeeeeee
    // });
    // shapeMesh2.rotation.y = - startAngleU - sliceWidth;
    // shapeMesh2.rotation.x = startAngleV;
    // // lathed.add( shapeMesh2 );

    // return new THREE.Group();

};

VIS.createSearchQuery = function(renderWebGL){

    var queryCanvas = VIS.createQueryCanvas();

    var options = {
        radius: renderWebGL.threejs_dev.earthRadius+5,
        thickness: 0.25,
        startAngleV: 0.3,
        sliceHeight: 0.14,
        startAngleU: 1,
        sliceWidth: 0.001,
        arcSegments: 15,
        text: '...',
        original: '...',
        cityName: 'Hong Kong',
    };


    var textTexture = queryCanvas.getTexture();

    var searchMeshMaterial = new THREE.MeshPhongMaterial({
        color: 0xeeeeee,
        specular: 0x131344,
        shininess: 2,
        emissive: 0x131313,
        map: textTexture
    });
    options.material = searchMeshMaterial;

    var group = new THREE.Group();

    var markerMaterial = new THREE.MeshPhongMaterial({
        color: 0xeeeeee,
        specular: 0x131344,
        shininess: 2,
        emissive: 0x131313,
    });

    var marker = new THREE.Mesh( new THREE.SphereGeometry( 0.4, 8, 8 ), markerMaterial );

    var pole = new THREE.Mesh( new THREE.CylinderGeometry( 0.15, 0.15, options.radius * 0.25, 8, 1 ), markerMaterial );
    pole.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, options.radius * 0.125 + 0.15, 0 ) );
    pole.rotation.x = Math.PI * 0.5;
    marker.add( pole );
    // group.add( marker );

    function hide(){
        searchMeshMaterial.visible = false;
        markerMaterial.visible = false;
    }

    function show(){
        searchMeshMaterial.visible = true;
        markerMaterial.visible = true;
    }

    var meshGenerator = VIS.meshGenerator();
    var searchMesh = meshGenerator( options );
    group.add( searchMesh );

    function getSearchMeshWidthViaText( text, radius ){
        var measure = queryCanvas.getTextWidth( text );
        return measure.width / radius / Math.PI / 28.0;
    }

    function getTargetTextWidth(){
        return Math.max( getSearchMeshWidthViaText( options.text, options.radius ), 0.1 );
    }

    function updateSearchMesh( alpha ){
        queryCanvas.update( options.cityName, options.text, options.original, options.sliceWidth, options.sliceHeight, options.radius, options.thickness, alpha );
        options.arcSegments = Math.round( options.sliceWidth * 10.0 );
        options.arcSegments = Math.min( Math.max( options.arcSegments, 15 ), 20 );
        options.arcSegments = 128

        // searchMesh.geometry.dispose();
        searchMesh = meshGenerator( options );
    }

    //  call once
    updateSearchMesh();


    var that = {};

    that.getView = function(){
        return group;
    };

    that.setAngles = function( up, right ){
        options.startAngleV = up ;
        options.startAngleU = right +Math.PI/2;

        marker.scale.multiplyScalar( 0.1 );
        var s = { scale: 0.1 };

        new TWEEN.Tween( s )
            .to({
                scale: 1.0
            }, 1200.0 )
            .easing( TWEEN.Easing.Elastic.Out )
            .onUpdate( function(){
                marker.scale.x = marker.scale.y = marker.scale.z = s.scale;

            })
            .start();

        marker.position.copy( Coordinates.latLongToVector3( up * 180 / Math.PI, right * 180 / Math.PI , options.radius * 1.0 ) );
        marker.lookAt( new THREE.Vector3( 0,0,0 ) );
    };

    that.setWidth = function( width ){
        options.sliceWidth = width;
    };

    that.setText = function( text ){
        if( text === '' ){
            text = ' ';
        }
        options.text = text;
    };

    that.setOriginal = function( text ){
        if( text === '' ){
            text = ' ';
        }
        options.original = text;
    };

    that.setCityName = function( text ){
        if( text === '' ){
            text = ' ';
        }
        options.cityName = text;
    };

    that.getTextScrollAngle = function(){
        var circumference = Math.PI * 2 * options.radius;
        //  ehhh this makes no sense but..
        return (queryCanvas.getTextWidth( options.text ).width / circumference ) * 2.0;
    };

    that.animateQuery = function(){
        console.log('animateQuery',options)

        show();
        var targetWidth = getTargetTextWidth();
        // options.startAngleU = 0
        // options.startAngleV = 0

        return new TWEEN.Tween( options )
            .to( {
                sliceWidth: targetWidth
            }, 500 )
            .easing( TWEEN.Easing.Quadratic.InOut )
            .onUpdate( function(){
                updateSearchMesh( 0.0 );
            })
            .onComplete( function(){
                var v = {
                    a: 0
                };

                new TWEEN.Tween( v )
                    .to({
                        a: 1.0
                    }, 2000 + Math.random() * 1000 )
                    .easing( TWEEN.Easing.Quadratic.InOut )
                    .onUpdate( function(){
                        updateSearchMesh( v.a );
                    })
                    .start();
            })
            .start();
    };

    that.hide = function(){
        var targetWidth = 0.001;
        return new TWEEN.Tween( options )
            .to( {
                sliceWidth: targetWidth
            }, 200 )
            .easing( TWEEN.Easing.Quadratic.InOut )
            .onUpdate( function(){
                var alpha = options.sliceWidth / targetWidth;
                updateSearchMesh( alpha );
                hide();
            })
            .start();
    };

    that.show = function(){
        options.sliceWidth = getTargetTextWidth();
        updateSearchMesh( 1.0 );
        show();
    };


    that.update = function(){
        updateSearchMesh( 1.0 );
    };
    return that;
};


VIS.createViewControl = function (controls, camera) {

    var panning = {
        x: 0
    };

    function setPan(offset) {
        var w = window.innerWidth;
        var h = window.innerHeight;
        camera.setViewOffset(w, h, offset, 0, w, h);
        camera.updateProjectionMatrix();
    }

    function panTo(offset, duration) {
        return new TWEEN.Tween(panning)
            .to({
                x: offset
            }, duration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function () {
                setPan(panning.x);
            })
            .start();
    }

    function rotateTo(lat, long, duration) {
        var curPhi, curTheta, ll, self, thetaDiff;
        var cameraDistance = camera.position.length();
        ll = Coordinates.toSpherical(lat, long, cameraDistance);
        lat = ll.lat;
        long = ll.long - (Math.PI * 0.5);
        curPhi = controls.getPolarAngle();
        curTheta = -controls.getAzimuthalAngle();
        thetaDiff = long - curTheta;
        while (thetaDiff > Math.PI) {
            thetaDiff -= Math.PI * 2;
        }
        while (thetaDiff < -Math.PI) {
            thetaDiff += Math.PI * 2;
        }
        long = curTheta + thetaDiff;
        self = this;
        var center = new THREE.Vector3();

        return new TWEEN.Tween({
            phi: curPhi,
            theta: curTheta
        })
            .to({
                phi: lat,
                theta: long
            }, duration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function () {
                var xyz;
                this.theta += Math.PI / 2;
                xyz = Coordinates.sphericalToXYZ({
                    radius: cameraDistance,
                    lat: this.phi,
                    long: this.theta
                });
                camera.position.set(xyz.x, xyz.y, xyz.z);
                camera.lookAt(center);
                return controls.update();
            }).start();
    }

    var that = {};

    that.rotateTo = rotateTo;
    that.panTo = panTo;
    that.updateViewport = function () {
        var w = window.innerWidth;
        var h = window.innerHeight;
        camera.setViewOffset(w, h, panning.x, 0, w, h);
        camera.updateProjectionMatrix();
    };

    return that;
};