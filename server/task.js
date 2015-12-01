Meteor.publish("task", function (selector, options) {
    return Task.find(selector, options);
});