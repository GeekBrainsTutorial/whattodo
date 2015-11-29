Meteor.publish("organization", function (options) {
    return Organization.find({}, options);
});