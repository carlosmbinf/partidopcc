import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from "meteor/meteor";


SimpleSchema.extendOptions(['autoform']);

export const OnlineCollection = new Mongo.Collection('online');
export const MensajesCollection = new Mongo.Collection('mensajes');
export const LogsCollection = new Mongo.Collection('Logs');



Meteor.methods({
 async exportDataTo(urlMongoDB) {
  var mi = require("mongoimport");
   
  
 
  // try {
  //   await mi({
  //     fields: OnlineCollection.find().fetch(), // {array} data to import
  //     db: "meteor", // {string} name of db
  //     collection: 'online', // {string|function} name of collection, or use a function to
  //     //  return a name, accept one param - [fields] the fields to import
  //     host: urlMongoDB,
  //     callback: (err, db) => {
  //       err && console.error(err);
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
    
  // }

  try {
    await mi({
      fields: MensajesCollection.find().fetch(), // {array} data to import
      db: "meteor", // {string} name of db
      collection: 'mensajes', // {string|function} name of collection, or use a function to
      //  return a name, accept one param - [fields] the fields to import
      host: urlMongoDB,
      callback: (err, db) => {
        err && console.error(err);
      },
    });
  } catch (error) {
    console.log(error);
    
  }

  try {
    await mi({
      fields: LogsCollection.find().fetch(), // {array} data to import
      db: "meteor", // {string} name of db
      collection: 'Logs', // {string|function} name of collection, or use a function to
      //  return a name, accept one param - [fields] the fields to import
      host: urlMongoDB,
      callback: (err, db) => {
        err && console.error(err);
      },
    });
  } catch (error) {
    console.log(error);
    
  }


  try {
    await mi({
      fields: Meteor.users.find().fetch(), // {array} data to import
      db: "meteor", // {string} name of db
      collection: 'users', // {string|function} name of collection, or use a function to
      //  return a name, accept one param - [fields] the fields to import
      host: urlMongoDB,
      callback: (err, db) => {
        err && console.error(err);
      },
    });
  } catch (error) {
    console.log(error);
    
  }
    

  },
});


export const SchemaOnlineCollection = new SimpleSchema({
  address: {
    type: String,
  },
  connectionId: {
    type: String,
    optional: true,
  },
  userId: {
    type: String,
    optional: true,
  },
  loginAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    },
    optional: true,
  },
  hostname: {
    type: String,
    optional: true,
  },
  megasGastadosinBytes: {
    type: Number,
    defaultValue: 0,
    optional: true,
  },
  megasGastadosinBytesGeneral: {
    type: Number,
    defaultValue: 0,
    optional: true,
  },
});

OnlineCollection.attachSchema(SchemaOnlineCollection);

export const SchemaMensajesCollection = new SimpleSchema({
  from : {
    type: String,
  },
  to : {
    type: String,
  },
  mensaje : {
    type: String,
    optional: true,
  },
  leido : {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  type:{
    type: String,
    defaultValue: "text",
    optional: true,
  }
});

MensajesCollection.attachSchema(SchemaMensajesCollection);


LogsCollection.allow({
  insert(doc) {
    // The user must be logged in and the document must be owned by the user.
    return true;
  },

  update() {
    // Can only change your own documents.
    return true;
  },

  remove(userId, doc) {
    // Can only remove your own documents.
    return true;
  },
});

OnlineCollection.allow({
  insert(doc) {
      // The user must be logged in and the document must be owned by the user.
      return true;
    },
  
    update() {
      // Can only change your own documents.
      return true;
    },
  
    remove(userId, doc) {
      // Can only remove your own documents.
      return true;
    },
})

Meteor.users.allow({
  insert(doc) {
      // The user must be logged in and the document must be owned by the user.
      return true;
    },
  
    update(userId, doc, fields, modifier) {
      // Can only change your own documents.
      return true;
    },
  
    remove(userId, doc) {
      // Can only remove your own documents.
      return Meteor.users.findOne({_id:Meteor.userId()}).profile.role == "admin";
    },
})
MensajesCollection.allow({
  insert(doc) {
      // The user must be logged in and the document must be owned by the user.
      return true;
    },
  
    update(userId, doc, fields, modifier) {
      // Can only change your own documents.
      return true;
    },
  
    remove(userId, doc) {
      // Can only remove your own documents.
      return true;
    },
})