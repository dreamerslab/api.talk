var mongoose, Schema, ObjectId, Model, model;

mongoose = require( 'mongoose' );
Schema   = mongoose.Schema;
ObjectId = Schema.ObjectId;



Model = {
  
  Channel : new Schema({

    name : { type : String, required : true },

    url : { type : String, required : true, index: true },

    root : { type : String, required : true, index: true },
    
    protocol : { type : String, required : true },

    user_count : { type : Number, 'default' : 0, index: true },

    created_at : { type : Number, 'default' : Date.now, index: true },
    
    updated_at : { type : Number, 'default' : Date.now }

  }),
  
  ChannelUser : new Schema({

    channel_id : { type : String, required : true, index: true },

    user_id : { type : String, required : true, index: true },

    user_name : { type : String, required : true },

    created_at : { type : Number, 'default' : Date.now }

  }),
  
  Login : new Schema({

    user_id : { type : String, required : true },

    user_name : { type : String, required : true },

    action : { type : String, required : true },

    channel_id : { type : String, required : true },
    
    connection_id : { type : String, required : true, index: true },

    created_at : { type : Number, 'default' : Date.now }

  }),
  
  Msg : new Schema({

    sender_id : { type : String, required : true },

    sender_name : { type : String, required : true },

    receiver_id : { type : String, required : true, index: true },

    receiver_type : { type : String, required : true, index: true },

    content : { type : String, required : true },

    created_at : { type : Number, 'default' : Date.now, index: true }

  }),
  
  User : new Schema({

    name : { type : String, required : true, index: true },

    created_at : { type: Number, 'default' : Date.now },

    updated_at : { type : Number, 'default' : Date.now }

  })
};



for( model in Model ){
  if( Model[ model ].updated_at !== undefined ){
    model.pre( 'save', function( next ){
      this.updated_at = Date.now();
      next();
    });
  }
}



module.exports = Model;