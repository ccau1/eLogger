import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    Meteor.startup(() => {
        // code to run on server at startup
    });

    Meteor.methods({
        addUser: (credentials, roles) => {
            if (credentials.password != credentials.confirmPassword)
            {
                throw new Meteor.Error(500, 'Password must match Confirm Password', 'Password must match Confirm Password');
            }

            let id = Accounts.createUser(credentials);
            if (roles && roles.length) {
                lodash.each(roles, function (role) {
                    Roles.addUsersToRoles(id, role, 'default');
                });
            }
        },
        setUsername: function (newName, callback) {
            //console.log(Accounts.setUsername);
            //console.log('setUsername', newName, this.userId, Accounts.setUsername(this.userId, newName));
            var userWithName = Meteor.users.findOne({
                'profile.name': {$regex: new RegExp('^' + newName + '$', 'i')},
                _id: {$ne: this.userId}
            });
            if (!userWithName) {
                Meteor.users.update({_id: this.userId}, {$set: {'profile.name': newName}});
                Accounts.setUsername(this.userId, newName);
            } else {
                throw new Meteor.Error(500, 'Username already exists', 'Username already exists');
            }
        },
        updateUserProfile: function (user) {
            if (user._id != this.userId && !Roles.userIsInRole(user, Constants.Roles.ELC, 'default-group')) {
                throw new Meteor.Error(500, 'You do not have permission', 'You do not have permission');
            }

            Meteor.users.update({_id: user._id}, {$set: {'profile': user.profile}});
        }
    });


    Meteor.publish("users", function (query) {

        return Meteor.users.find(query, {fields: {_id: 1, emails: 1, profile: 1, status: 1, roles: 1}});
    });

    Meteor.publish("currentUser", function () {
        if (this.userId) {
            return Meteor.users.find({_id: this.userId});
        } else {
            this.ready();
        }
    });
}