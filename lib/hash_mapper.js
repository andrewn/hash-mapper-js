var HashMapper = (function () {
  
  // Constructor
  var IMPL = function () {
    this.parts = [];
  };
    
  // Instance
  IMPL.prototype = {
    normalize: function ( input ) {
      var output = {};
      this.parts.forEach( function ( item ) {
        try {
          var data,
              currentInputLevel = input;
              
          item.from.specParts.forEach( function ( p ) {
              data = currentInputLevel[p];
              currentInputLevel = currentInputLevel[p];
          });
                              
          var lastIndex = item.to.specParts.length,
              currentOutputLevel = output;
              
          item.to.specParts.forEach( function ( p, i ) {
            if (i != (lastIndex - 1) ) {
              currentOutputLevel[p] = currentOutputLevel[p] ? currentOutputLevel[p] : {};
              currentOutputLevel = currentOutputLevel[p];
            } else {
              currentOutputLevel[p] = data;
            }
            console.log('attachx', p, data, i , lastIndex)
          });
        } catch ( e ) {
          throw e;
        }
      });
      return output;
    },
    /*
    map: function () {
      
    }, 
    */
    from: function ( str ) {
      this.currentFromSpec = str;
      return this;
    }, 
    to: function ( str ) {
      if ( this.currentFromSpec ) {
        this.parts.push({
          from: new PathSpec( this.currentFromSpec ),
          to  : new PathSpec( str )
        });
        this.currentFromSpec = null;
      } else {
        throw new Error('No matching from() spec found');
      }
      return this;
    }
  }
  
  var PathSpec = function ( spec ) {
    this.specParts = spec.replace( PathSpec.REMOVE_INITIAL_SLASH, '' )
                         .split( PathSpec.PATH_DELIM );
  }
  PathSpec.PATH_DELIM = '/';
  PathSpec.REMOVE_INITIAL_SLASH = /^\//;
  
  return IMPL;
})();