//not going to install grunt, but just in case...
module.exports = function foo(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			scripts: {
				files: ["**/lib/*.js", "!node_modules/**/*.js"], //changed to lib file
				tasks: ["eslint", "uglify","browserify"], //added uglify task
				options: {
					spawn: false,
				},
			},
		},
		uglify: {
			options: {
				banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
			},
			build: {
				files: [{
					expand: true,
					cwd: "build",
					src: "bundle.js",
					dest: "build",
					ext: ".min.js"
				}]
			}
		},
		browserify: {
			dist: {
				files: {
					"build/bundle.js": ["app/EmployeeCtrl.js"], //changed from main.js
				},
				options: {
					browserifyOptions: {
						debug: true,
					},
				},
			},
		},
		eslint: {
			src: [
				"**/lib/*.js", //changed to lib file
				"!node_modules/**/*.js",
			],
		},
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-browserify");

	// Default task(s).
	grunt.registerTask("default", ["eslint", "browserify", "uglify", "watch"]);
};