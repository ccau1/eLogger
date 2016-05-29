var seedStack = initFn();

if (Meteor.users.find().count() == 0) {
    seedStack = seedStack.then(seedUsers);
}

if (Companies.find().count() == 0) {
    seedStack = seedStack.then(seedCompanies);
    seedStack = seedStack.then(seedUserCompanies);
}

if (Vehicles.find().count() == 0) {
    seedStack = seedStack.then(seedVehicles);
}

function initFn() {
    return new Promise(function(resolve, reject){
        setTimeout(function() {
            resolve();
        }, 10);
    });
}


function seedUsers() {
    return new Promise(function(resolve, reject){
        var sList = [
            {
                username: 'admin 1',
                email: 'admin1@demo.com',
                password: '4r3e2w!Q',
                profile: {
                    company: ''
                },
                roles: [
                    Constants.Role.ADMIN
                ]
            },
            {
                username: 'driver 1',
                email: 'driver1@demo.com',
                password: '4r3e2w!Q',
                profile: {
                    company: ''
                },
                roles: [
                    Constants.Role.DRIVER
                ]
            }
        ]

        lodash.each(sList, function(v, i) {
            var roles = v.roles;
            delete v.roles;
            v.confirmPassword = v.password;
            Meteor.call('addUser', v, roles, function(err) {
                if (!err) {

                } else {
                    console.log('ERROR: ' + err.reason);
                }
                if (i + 1 == sList.length) resolve();
            });
        });
    });
}

function seedUserCompanies() {
    return new Promise(function(resolve, reject) {
        var sList = [
            {
                findQuery: {username: 'driver 1'},
                setProfile: {company: Companies.findOne({name: 'Company 1'})._id}
            },
            {
                findQuery: {username: 'admin 1'},
                setProfile: {company: Companies.findOne({name: 'Company 1'})._id}
            }
        ];

        lodash.each(sList, function (v, i) {
            var user = Meteor.users.findOne(v.findQuery);
            user.profile = lodash.assign(user.profile, v.setProfile);
            Meteor.users.update({_id: user._id}, {$set: {'profile': user.profile}});
            if (i + 1 == sList.length) resolve();
        });
    });
}

function seedVehicles() {
    return new Promise(function(resolve, reject){
        var sList = [
            {
                companyId: Companies.findOne()._id,
                owner: Meteor.users.findOne()._id,
                vin: '29G2928H9FJ98JU8Y',
                year: '2005',
                manufacturer: 'Honda',
                model: 'Civic',
                licensePlate: 'Ontario',
                licensePlateNumber: '23RU839',
                isMetric: true
            },
            {
                companyId: Companies.findOne()._id,
                owner: Meteor.users.findOne()._id,
                vin: 'FE9I922FJ9RI8JU8Y',
                year: '2005',
                manufacturer: 'Toyota',
                model: 'Camry',
                licensePlate: 'Ontario',
                licensePlateNumber: '23RU839',
                isMetric: true
            }
        ]

        lodash.each(sList, function(v, i) {
            Vehicles.insert(v);
            if (i + 1 == sList.length) resolve();
        });
    });
}

function seedCompanies() {
    return new Promise(function(resolve, reject) {
        var sList = [
            {
                name: 'Company 1',
                addr: {
                    "text": "North York, 3089 Dufferin Street, Toronto, ON M6A 3C8, Canada",
                    "lat": 43.8255481,
                    "lng": -79.53824420000001,
                    "streetNumber": "3089",
                    "streetName": "Dufferin",
                    "neighborhood": "North York",
                    "city": "Toronto",
                    "state": "Ontario",
                    "country": "Canada",
                    "postalCode": "M6A 3C8"
                },
                owner: Meteor.users.findOne()._id
            },
            {
                name: 'Company 2',
                addr: {
                    "text": "North York, 3089 Dufferin Street, Toronto, ON M6A 3C8, Canada",
                    "lat": 43.8255481,
                    "lng": -79.53824420000001,
                    "streetNumber": "3089",
                    "streetName": "Dufferin",
                    "neighborhood": "North York",
                    "city": "Toronto",
                    "state": "Ontario",
                    "country": "Canada",
                    "postalCode": "M6A 3C8"
                },
                owner: Meteor.users.findOne()._id
            }
        ];

        lodash.each(sList, function (v, i) {
            Companies.insert(v);
            if (i + 1 == sList.length) resolve();
        });
    });
}