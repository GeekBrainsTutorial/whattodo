/**
 * Task collection
 * @type {Mongo.Collection}
 */
Task = new Mongo.Collection("task");

/**
 * Permissions db actions
 */
Task.allow({
    insert: function () {
        return true;
    },
    update: function (userId, doc) {
        return userId == doc.creator._id || userId == doc.userId;
    },
    remove: function (userId, doc) {
        return userId == doc.creator;
    }
});

Meteor.methods({
    /**
     * Create new task
     * @param orgId
     * @param userId
     * @param task
     * @constructor
     */
    "Task.create": function (orgId, userId, task, deadline) {
        check(orgId, String);
        check(userId, String);
        check(task, String);

        //Find organizations and set status visible
        var org = Organization.find({_id: orgId});

        Task.insert({
            orgId: orgId,
            is_public: org.is_public,
            is_complete: false,
            userId: userId,
            task: task,
            deadline: deadline,
            creator: {
                _id: Meteor.userId(),
                name: Meteor.user().profile.name,
                surname: Meteor.user().profile.surname
            }
        });
    },
    /**
     * Remove the task
     * @param taskId
     * @constructor
     */
    "Task.remove": function (taskId) {
        check(taskId, String);

        Task.remove({_id: taskId});
    },
    /**
     * Toggle the is_complete status
     * @param taskId
     * @constructor
     */
    "Task.toggleIsComplete": function (taskId) {
        check(taskId, String);

        //Find task and invert is_complete status
        var task = Task.find({_id: taskId});

        Organization.update({_id: taskId}, {
            $set: {
                is_complete: !task.is_complete
            }
        });
    }
});