/*
 * Created by dsichau on 04.05.15.
 */

var LogSchemas = {};

/**
 * The collection for the Logs
 * @class Logging
 * @type Mongo.Collection
 */
LogSchemas.Logs = new SimpleSchema({
    /**
     * The time of creation
     * @property createdAt
     * @type Date
     * @required
     * @default The timepoint of the creation
     */
    createdAt: {
        type: Date,
        denyUpdate: true,
        autoValue: function() {
            return new Date();
        }
    },
    /**
     * The anonymous identifier of an user
     * @property userIdentifier
     * @type String
     * @required
     * @default The SHA256 Hash of the userId
     */
    userIdentifier: {
        type: String,
        autoValue: function() {
            var user = this.userId;
            if(!user) {
                return "anonymous";
            }
            return Package.sha.SHA256(user);
        }
    },
    /**
     * The type of the logged event
     * @property type
     * @type String
     * @required
     */
    type: {
        type: String
    },
    /**
     * The actual logged information
     * @property log
     * @type Object
     * @required
     */
    log: {
        type: Object,
        blackbox: true
    }
});


Logging = new Mongo.Collection("logging_log");
Logging.attachSchema(LogSchemas.Logs);


Meteor.methods({
    /**
     * Method to add a log file
     * @method addLog
     * @param logging The log Object
     */
    addLog: function(type, logging) {
        check(type, String);
        check(logging, Object);
        Logging.insert({type: type, log: logging});
    }
});
