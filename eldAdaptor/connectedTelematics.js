ELD_Adaptor.Connected_Telematics = {
    name: 'Connected Telematics',
    icon: 'http://connectedtelematics.com/wp-content/uploads/2015/12/connect-telematics-logo.png',
    fields: { // FOLLOW 'ANGULAR FORMLY' STRUCTURE
        global: [
            {
                key: 'username',
                type: 'input',
                templateOptions: {
                    label: 'Username',
                    required: true,

                }
            },
            {
                key: 'password',
                type: 'input',
                templateOptions: {
                    label: 'Password',
                    required: true,
                }
            },
            {
                key: 'database',
                type: 'input',
                templateOptions: {
                    label: 'Database',
                    required: true,
                }
            }
        ],
        device: [
            {
                key: 'deviceId',
                type: 'input',
                templateOptions: {
                    label: 'Device ID',
                    required: true,
                }
            }
        ]
    },
    token: '',
    tokenObj: {},
    handleToken: function(data) {
        return new Promise(function(resolve, reject) {
            if (this.token && new Date(this.tokenObj['.expires']) > new Date()) {
                // if token is already set and expiry date has not past, just resolve
                resolve(this.tokenObj);
            } else {
                var headers = {};
                headers['Content-Type'] = "application/x-www-form-urlencoded";

                var cred = data.global;
                var content = "username=" + cred.username + "&password=" + cred.password + "&scope=" + cred.database + "&grant_type=password";

                Http.call('POST', 'http://a1.geotrack.co/Token', {
                    headers: headers,
                    content: content
                }, function (err, result) {
                    if (!err) {
                        this.tokenObj = result;
                        this.token = result.access_token;
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
            }
        });
    },
    get: function(data) {
        console.log('get fn', this, data);
        return new Promise(function(resolve, reject) {
        //    console.log('getting token', this, data);
            this.handleToken(data).then(function (tokenObj) {
                console.log('done token', this.tokenObj, this.token);
                resolve();
            //    console.log('prepping get asset');
            //    var headers = {};
            //    headers['Content-Type'] = "application/json; charset=utf-8";
            //    Http.call('GET', 'http://a1.geotrack.co/api/ClientsAssets/' + data.device.deviceId, {
            //        data: {},
            //        headers: {
            //            Authorization: 'bearer ' + this.token
            //        }
            //    }, function (err, result) {
            //        console.log('got asset', err, result);
            //        if (!err) {
            //            var log = {};
            //            log.addr = {
            //                lat: result.Latitude,
            //                lng: result.Longitude,
            //                text: result.Address
            //            };
            //            log.status = "";
            //
            //            // TODO:: render result into log obj in 'collections/EldLogs.js' structure
            //            resolve(log);
            //        } else {
            //            reject(err);
            //        }
            //    });
            }).catch(function(err) {
                console.log('getting token error ' + err);
                reject(err);
            });
        });
    },
};