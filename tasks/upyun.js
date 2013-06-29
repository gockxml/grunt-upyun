/*
 * grunt-upyun
 * https://github.com/gock/grunt-upyun
 *
 * Copyright (c) 2013 gock
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('upyun', 'Your task description goes here.', function() {

	var done = this.async();
	var async = grunt.util.async;
    var options = this.options();
	var upyun = require("upyun"), client = upyun(options["bucket"], options["username"], options["password"]);	
	var path = require('path');
	var all = []

    // Iterate over all specified file groups.
	this.files.forEach(function(f) {
		var paths = f.src.filter(function(filepath) {
			// Warn on and remove invalid source files (if nonull was set).
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

		var dest = file[0], filepath = file[1];
		client.uploadFile(dest, grunt.file.read(filepath, , { encoding : null }), function(err, status, data){
			grunt.log.writeln(dest, status, data);
			cb();	
		})
	}, function(error){
		done(!error)
	})

  });

};
