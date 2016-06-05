ELD_Adaptor.Connected_Telematics = {
    name: 'Connected Telematics',
    icon: 'http://connectedtelematics.com/wp-content/uploads/2015/12/connect-telematics-logo.png',
    dataFields: [ // FOLLOW 'ANGULAR FORMLY' STRUCTURE
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
    token: '',
    setToken: function(data) {
        return new Promise(function(resolve, reject) {
            var headers = {};
            headers['Content-Type'] = "application/x-www-form-urlencoded";

            Http.call('POST', 'http://a1.geotrack.co/token', {
                headers: headers,
                content: lodash.map(data, function(v,k) { return k + '=' + v; }).join('&')
            }, function (err, result) {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    },
    get: function(deviceId) {
        if (!this.token) {
            this.setToken().then(function() {
                return this.get(deviceId);
            });
        } else {
            return new Promise(function (resolve, reject) {
                var headers = {};
                headers['Content-Type'] = "application/json; charset=utf-8";
                Http.call('GET', 'http://a1.geotrack.co/api/ClientAssets/' + deviceId, {
                    data: {},
                    headers: {
                        Authorization: 'bearer ' + this.token
                    }
                }, function (err, result) {
                    if (!err) {
                        var log = {};
                        // TODO:: render result into log obj in 'collections/EldLogs.js' structure
                        resolve(log);
                    } else {
                        // if err is token invalid, might be expired, lets try to get token
                        this.setToken().then(function(token) {
                            this.get(deviceId).then(function(log) {
                                resolve(log);
                            }).catch(function(reason) {
                                reject(reason);
                            })
                        }).catch(function(reason) {
                            reject(reason);
                        });
                    }
                });
            });
        }
    },
};