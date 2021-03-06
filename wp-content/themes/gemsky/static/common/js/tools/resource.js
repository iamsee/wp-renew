/**
 * A utility function to load JSON or other text documents
 * before running a callback, with resource as an argument.
 * Usage:
 * Res.LoadResource( [some,list,of,json], function( resources ){ } );
 *
 * ...
 * var obj = resources.get( 'someResourceName' );
 */

/* global console, $ */
/* exported RES */

'use strict';

var RES = {};

RES.LoadResource = function( resourceList, callback ){
  console.log('go->loading resources',resourceList);

  var resources = resourceList;

  function getFilenameNoExtension( string ){
    return string.match(/([^\/]+)(?=\.\w+$)/)[0];
  }

  function getResourceLoadCommand( resources ){
    var commands = [];
    for( var i in resources ){
      commands.push( $.get( resources[i] ) );
    }
    return commands;
  }

  var resourceCommands = getResourceLoadCommand( resources );
  console.log('go->resourceCommands',resourceCommands)
  console.log('go->$.when.apply',this)
  $.when.apply( this, resourceCommands )
  .done( function(){
      console.log('go->$.when.apply.done',arguments)
    //  todo:
    //  handle failure cases

    var resourceCollection = {};
    //  Warning: this breaks if less than two resources loaded...
    for( var i in arguments ){
      if( resources[i] === undefined ){
        continue;
      }
      var filename = getFilenameNoExtension( resources[i] );
      console.log( 'go->..loaded', filename );
      if( resourceList.length === 1 ){
        resourceCollection[ filename ] = arguments[0];
      }
      else{
        resourceCollection[ filename ] = arguments[i][0];
      }
    }

    console.log( 'go->finished loading resources' );
    callback( (new RES.Resource(resourceCollection) ) );
  })
  .fail(function(){
    console.warn('failed to load resources');
    console.log(arguments);
  });

};

/*
  Resource objects loaded from JSON.
  Usage:
  if the dereference in the json is newGameSettings.standard:

  resource.get( 'newgamesettings', 'standard' );
*/

RES.Resource = function( resources ){
  console.log('go->RES.Resource')
  this.get = function(){
    if( arguments.length === 0 ){
      return resources;
    }
    var depth = resources[arguments[0]];
    for( var i=1; i<arguments.length; i++ ){
      depth = depth[ arguments[i] ];
    }

    if( ( typeof depth ) === 'string' ){
      try{
        return JSON.parse( depth );
      }
      catch( e ){
        return depth;
      }
    }
    return depth;
  };
};