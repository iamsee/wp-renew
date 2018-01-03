'use strict';
(function () {

    var iamseeJSUtil = {},
        bind = function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
        },
        extend = function (child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }

            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        hasProp = {}.hasOwnProperty;

    iamseeJSUtil.getURLQuery = function () {
        var i, key, len, params, query, raw_vars, ref, v, val;
        query = window.location.search.substring(1);
        raw_vars = query.split("&");
        params = {};
        for (i = 0, len = raw_vars.length; i < len; i++) {
            v = raw_vars[i];
            ref = v.split("="), key = ref[0], val = ref[1];
            params[key] = decodeURIComponent(val);
        }
        return params;
    };

    var ThreeJS = {}

    ThreeJS.getPos = function (v) { /*{v.lng,v.lat,v.radius}*/
        var theta = (v.lng + 180) * (Math.PI / 180),
            phi = (90 - v.lat) * (Math.PI / 180),
            radius = v.r;
        return (new THREE.Vector3()).setFromSpherical(new THREE.Spherical(radius, phi, theta));
    }
    ThreeJS.getBaseLightHelper = function () { /*{v.lng,v.lat,v.radius}*/
        var g = new THREE.Group()
        g.name = 'BaseLightHelper'
        console.log('getBaseLightHelper')
        var light = new THREE.AmbientLight(0x3367D6, 1); // soft white light
        g.add(light)
        return g

    }
    ThreeJS.getBaseHelper = function () {
        console.log('getBaseHelper')
        var g = new THREE.Group()
        g.name = 'BaseHelper'
        var axisHelper = new THREE.AxisHelper(1500);
        g.add(axisHelper);
        return g
    }
    /*
    * LLR = {lng,lat,radius}
    * LLRS = [LLR,···]
    * type = arc || curve
    * */
    ThreeJS.getLines = function (fromLLR, toLLR, type) {
        type = type || 'arc'

        var curve,
            delta = ThreeJS.getPos(fromLLR).angvaro(ThreeJS.getPos(toLLR)),
            source = fromLLR.name,
            target = toLLR.name,
            r = fromLLR.r,
            dr = (fromLLR.r * delta * delta * 0.6) / Math.PI,

            v1 = ThreeJS.getPos(fromLLR),
            v2 = ThreeJS.getPos(toLLR);


        if ('curve' == type || 1 == type) {
            var p1 = ThreeJS.getPos({
                    lng: fromLLR.lng,
                    lat: fromLLR.lat,
                    r: fromLLR.r + dr
                }),
                p2 = ThreeJS.getPos({
                    lng: toLLR.lng,
                    lat: toLLR.lat,
                    r: toLLR.r + dr
                })
            var intetPoints = ThreeJS.interVector3({
                v1: p1,
                v2: p2,
                nums: 2,
                vertices: [p1, p2]
            })
            curve = ThreeJS.createCurveLine(v1, v2, intetPoints)
        }
        else {
            var p1 = ThreeJS.getPos(fromLLR),
                p2 = ThreeJS.getPos(toLLR)
            var intetPoints = ThreeJS.interVector3({
                v1: p1,
                v2: p2,
                nums: 2,
                vertices: [p1, p2]
            })
            curve = ThreeJS.createArcLine(intetPoints)
        }

        var geometry = new THREE.Geometry();
        geometry.v = curve.getPoints(200);
        geometry.index = 0;
        for (var i = 0, len = geometry.v.length; i < len; ++i) {
            geometry.vertices.push(geometry.v[geometry.index])
        }
        var material = new THREE.LineBasicMaterial({
            color: new THREE.Color(0xffffff * Math.random()),
            linewidth: 10
        });

        // Create the final object to add to the scene
        var curveObject = new THREE.Line(geometry, material);
        return curveObject


    }
    ThreeJS.createArcLine = function (intetPoints) {

        return new THREE.CatmullRomCurve3(intetPoints.vertices);
    }
    ThreeJS.createCurveLine = function (v1, v2, intetPoints) {

        var curve = new THREE.CubicBezierCurve3(
            v1,
            intetPoints.vertices[1],
            intetPoints.vertices[3],
            v2
        );
        return curve;
    }
    /*
    * l = {v1,v2,nums,vertices}
    * */
    ThreeJS.interVector3 = function (l) {
        if (l.v1.angvaro(l.v2) == 0) return l;		// 1
        if (l.v1.angvaro(l.v2) == Math.PI) l.v1.x--;  	// 2
        for (var i = 0; i < l.nums; ++i) {
            var newArr = [],
                j = 0;
            do {
                var newV,
                    v_t1 = (new THREE.Vector3()).copy(l.vertices[j]),  // 3
                    v_t2 = (new THREE.Vector3()).copy(l.vertices[j + 1]),
                    m = v_t1.length() / v_t2.add(v_t1).length();  	// 4
                newV = v_t1.add(l.vertices[j + 1]).multiplyScalar(m);
                newArr.push((new THREE.Vector3()).copy(l.vertices[j]));
                newArr.push((new THREE.Vector3()).copy(newV));
                j++;
            } while (j < l.vertices.length - 1)
            newArr.push((new THREE.Vector3()).copy(l.vertices[j]));
            l.vertices = newArr;
        }
        return l;
    }

    ThreeJS.toSpherical = function (lat, lng, r) {
        return {
            lat: lat,
            lng: lng,
            radius: r
        };
    }
    ThreeJS.sphericalToXYZ = function( spherical ){
        return {
            x: spherical.radius * Math.cos(spherical.lng) * Math.sin(spherical.lat),
            y: spherical.radius * Math.cos(spherical.lat),
            z: spherical.radius * Math.sin(spherical.lng) * Math.sin(spherical.lat)
        };
    },
    ThreeJS.rotateTo = function (lat, lng, duration, camera, controls) {
        lng += 180
        var curPhi, curTheta, ll, self, thetaDiff;
        var cameraDistance = camera.position.length();
        ll = ThreeJS.toSpherical(lat, lng, cameraDistance);
        lat = ll.lat;
        lng = ll.lng - (Math.PI * 0.5);
        curPhi = controls.getPolarAngle();
        curTheta = -controls.getAzimuthalAngle();
        thetaDiff = lng - curTheta;
        while (thetaDiff > Math.PI) {
            thetaDiff -= Math.PI * 2;
        }
        while (thetaDiff < -Math.PI) {
            thetaDiff += Math.PI * 2;
        }
        lng = curTheta + thetaDiff;
        self = this;
        var center = new THREE.Vector3();

        return new TWEEN.Tween({
            phi: curPhi,
            theta: curTheta
        })
            .to({
                phi: lat,
                theta: lng
            }, duration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function () {
                var xyz;
                this.theta += Math.PI / 2;
                xyz = ThreeJS.sphericalToXYZ({
                    radius: cameraDistance,
                    lat: this.phi,
                    lng: this.theta
                });
                camera.position.set(xyz.x, xyz.y, xyz.z);
                camera.lookAt(center);
                return controls.update();
            }).start();
    }

    iamseeJSUtil.ThreeJS = ThreeJS


    window.iamseeJSUtil = iamseeJSUtil;

}).call(this);

