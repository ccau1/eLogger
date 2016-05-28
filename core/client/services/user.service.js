angular.module(Constants.Module).factory('user', ['$rootScope', '$reactive', '$log', function($rootScope, $reactive, $log) {
    $reactive(this).attach($rootScope);
    var onReadyFnList = [];
    var curUserRoles = [];
    var isReady = false;
    //var _currentUser = undefined;
    var returnObj = {};


    var onReadyFn = function(fn) {
        if (isReady) {
            fn();
        }
        onReadyFnList.push(fn);
    }


    var ensureUserReady = function(callback) {
        if (returnObj.currentUser === undefined) {
            // not ready
            setTimeout(function() {
                ensureUserReady(callback);
            }, 500);
        } else {
            callback();
        }
    }

    $rootScope.subscribe('currentUser', function() {
        return [];
    }, {
        onReady: function() {

            ensureUserReady(function() {
                isReady = true;
                _.each(onReadyFnList, function(v) {
                    v();
                });
            });
        }
    });



    $rootScope.helpers({
        currentUser: function() {
            var curUser = Meteor.user();
            returnObj.currentUser = curUser;
            this.currentUser = curUser;
            curUserRoles = Roles.getRolesForUser(Meteor.userId(), 'default-group');
            return curUser;
            //return Meteor.users.findOne({ _id: Meteor.userId() });
        }
    });

    //var currentUser = function() {
    //    if (!_currentUser) _currentUser = Meteor.user();
    //
    //}

    var getUser = function(id) {
        var usr = undefined;
        if (!id) {
            usr = this.currentUser;
        } else {
            usr = Meteor.users.findOne({ _id: id });
        }
        return usr;
    }

    var getUsername = function(id) {
        var usr = getUser(id);
        return usr ? usr.profile.name : '';
    };

    var getCurrentAsc = function (id) {
        var usr = getUser(id);
        var ascId = usr ? usr.profile.assistanceServiceId : '';

        return AssistanceServices.findOne({_id: ascId});
    }

    var isCurrentUser = function(id) {
        return this.currentUser ? this.currentUser._id == id : false;
    }

    var isCurrentUserInRole = function(roleName) {
        if (typeof roleName === 'string' ) {
            return curUserRoles.indexOf(roleName) > -1;
        } else if (lodash.isArray(roleName)) {
            return lodash.intersection(curUserRoles, roleName).length > 0;
        } else {
            $log.error('roleName must be a string or an array of string');
        }
        //return Roles.userIsInRole(Meteor.userId(), roleName, 'default-group');
    };

    lodash.assign(returnObj, {
        onReady: onReadyFn,
        getUser: getUser,
        getUsername: getUsername,
        getCurrentAsc: getCurrentAsc,
        isCurrentUser: isCurrentUser,
        isCurrentUserInRole: isCurrentUserInRole
    });

    return returnObj;
}]);