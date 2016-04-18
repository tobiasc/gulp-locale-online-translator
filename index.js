var _ = require('lodash');
var request = require('request');
var async = require('async');
var fs = require('fs');
var gutil = require('gulp-util');

module.exports = function (original, translations, callback) {
    translate(original, translations, function (err, data) {
        if (err) {
            callback(new gutil.PluginError('gulp-locale-online-translator', err));
        } else {
            callback();
        }
    });
};

function translate(original, translations, callback) {
    try {
        fs.readFile(original.filename, 'utf8', function (err, text) {
            if (err) {
                callback(err);

            } else {
                var originalObj = JSON.parse(text);
                var keys = Object.keys(originalObj);

                async.each(translations, function (translation, cb) {
                    var translationObj = {};

                    async.each(keys, function (key, cb1) {
                        request(translation.url + originalObj[key], function (err, response, body) {
                            if (err) {
                                cb1(err);

                            } else {
                                if (!err && response.statusCode == 200) {
                                    translationObj[key] = body;
                                }
                                cb1();
                            } 
                        });  

                    }, function (err) {
                        if (err) {
                            cb(err);

                        } else {
                            fs.writeFile(original.filename.replace('-' + original.locale + '.json', '-' + translation.locale + '.json'), JSON.stringify(translationObj, null, '\t'), function (err) {
                                if (err) {
                                    cb(err);
                                } else {
                                    cb();
                                }
                            }); 
                        }
                    });

                }, function (err) {
                    if (err) {
                        callback(err);

                    } else {
                        callback();
                    }
                });
            }
        });

    } catch (err) {
        callback(err);
    }
} 
