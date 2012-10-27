module.exports = {

  time : function( req, res ){
    res( 200,{ time : Date.now()});
  }
};
