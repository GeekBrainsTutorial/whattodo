Organization = new Mongo.Collection("organization");

Organization.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});

Meteor.methods({
    create: function (name, slogan, users) {

    }
});