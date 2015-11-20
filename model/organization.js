/**
 * Create new collections
 * @type {Mongo.Collection}
 */
Organization = new Mongo.Collection("organization");

/**
 * Permissions db actions
 */
Organization.allow({
    insert: function () {
        return true;
    },
    update: function (userId, doc) {
        return userId == doc.creator;
    },
    remove: function (userId, doc) {
        return userId == doc.creator;
    }
});

Meteor.methods({
    /**
     * Create the organization
     * @param name
     * @param is_public
     * @param slogan
     * @param users
     * @constructor
     */
    "Organization.create": function (name, is_public, slogan, users) {
        check(name, String);
        check(slogan, String);
        check(is_public, Boolean);
        check(users, Array);

        Organization.insert({
            name: name,
            slogan: slogan,
            is_public: is_public,
            creator: {
                _id: Meteor.userId(),
                name: Meteor.user().profile.name,
                surname: Meteor.user().profile.surname
            },
            users: users
        });
    },
    /**
     * Remove the organization
     * @param orgId
     * @constructor
     */
    "Organization.remove": function (orgId) {
        check(orgId, String);

        Organization.remove({_id: orgId});
    },
    /**
     * Change the organization
     * @param orgId
     * @param name
     * @param is_public
     * @param slogan
     * @param users
     * @constructor
     */
    "Organization.change": function (orgId, name, is_public, slogan, users) {
        check(orgId, String);
        check(name, String);
        check(slogan, String);
        check(is_public, Boolean);
        check(users, Array);

        Organization.update({_id: orgId}, {
            name: name,
            slogan: slogan,
            is_public: is_public,
            creator: {
                _id: Meteor.userId(),
                name: Meteor.user().profile.name,
                surname: Meteor.user().profile.surname
            },
            users: users
        });
    }
});