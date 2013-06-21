/*
 * grunt-upyun
 * https://github.com/gock/grunt-upyun
 *
 * Copyright (c) 2013 gock
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Configuration to be run (and then tested).
	upyun: {

		options: {
			//endpoint: 'http://v3.api.upyun.com',
			username : 'admin',
			password : '123456',
			bucket: 'test'
		},	
		test: {
			dest :'/webapp',
			src :['test/fixtures/*'],

		},
	}

  });

  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['upyun']);

};
