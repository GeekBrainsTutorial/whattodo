Meteor.publish("organization", function () {
    return Organization.find({
        _id: {$in: Meteor.user().profile.organizations}
    });
});