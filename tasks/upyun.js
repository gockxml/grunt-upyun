/*
 * grunt-upyun
 * https://github.com/gock/grunt-upyun
 *
 * Copyright (c) 2013 gock
 * Licensed under the MIT license.
 */

'use strict';

var mime = require('mime');
var upyun = require("upyun");
var path = require('path');

module.exports = function(grunt) {

  grunt.registerMultiTask('upyun', 'Your task description goes here.', function() {

    var done = this.async();
    var async = grunt.util.async;
    var options = this.options();
    var all = [];

    var client = new upyun(options["bucket"], options["username"], options["password"], options['endpoint'], options['apiVersion'] || 'legacy');

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var paths = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (grunt.file.isDir(filepath)) return false;
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        all.push([f.orig.expand ? f.dest : path.join(f.dest, filepath), filepath]);
      })
    });

    async.forEach(all, function(file, cb) {

      var dest = file[0],
        filepath = file[1];
      client.uploadFile(dest, filepath, mime.lookup(dest), true, function(err, data) {
        if (err || (data && data.statusCode != 200)) {
          grunt.fail.fatal(err || JSON.stringify(data));
        } else {
          grunt.log.ok(dest, data.statusCode)
          cb();
        }
      })
    }, function(error) {
      done(!error)
    })

  });

};