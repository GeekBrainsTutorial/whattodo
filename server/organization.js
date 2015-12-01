Meteor.publish("organization", function (selector, options) {
    return Organization.find(selector, options)
});