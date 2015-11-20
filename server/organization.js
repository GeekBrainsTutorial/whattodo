Meteor.publish("organization", function (options) {
    return Organization.find({
        $or: [
            { "creator._id": this.userId },
            { "users._id": this.userId }
        ]
    }, options);
});