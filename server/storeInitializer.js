var seedStack = initFn();
if (Companies.find().count() == 0) {
    seedStack = seedStack.then(seedCompanies);
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