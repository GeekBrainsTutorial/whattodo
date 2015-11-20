Meteor.methods({
    /**
     * Find user by name, surname, email.
     * Exclude current user and exists users
     * @param $query
     * @param selectedUsers
     * @returns {any}
     */
    searchByQuery: function ($query, selectedUsers) {
        return Meteor.users.find({
            $or: [
                {"profile.name": {$regex: $query + "*"}},
                {"profile.surname": {$regex: $query + "*"}},
                {"emails.address": {$regex: $query + "*"}}
            ],
            _id: {
                $nin: selectedUsers.map(function (c, index) { return c._id; }),
                $ne: Meteor.userId()
            }
        }).map(function (c, index) {
            var contacts = {
                _id: c._id,
                name: c.profile.name + " " + c.profile.surname,
                email: c.emails[0].address
            };
            contacts._lowername = contacts.name.toLowerCase();
            return contacts;
        });
    }
});