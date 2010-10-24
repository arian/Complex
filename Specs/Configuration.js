// Put this file in the parent directory of the runner folder. Also rename the file to Configuration.js

(function(context){

var Configuration = context.Configuration = {};

// Runner name
Configuration.name = 'Complex';


// Presets - combine the sets and the source to a preset to easily run a test
Configuration.presets = {

	'base': {
		sets: ['base'],
		source: ['core-1.3', 'base']
	}

};

// An object with default presets
Configuration.defaultPresets = {
	browser: 'base',
	nodejs: 'base',
	jstd: 'base'
};


/*
 * An object with sets. Each item in the object should have an path key,
 * that specifies where the spec files are and an array with all the files
 * without the .js extension relative to the given path
 */
Configuration.sets = {

	'base': {
		path: '',
		files: ['Complex', 'Number']
	}

};


/*
 * An object with the source files. Each item should have an path key,
 * that specifies where the source files are and an array with all the files
 * without the .js extension relative to the given path
 */
Configuration.source = {

	'core-1.3': {
		path: '../../mootools-core/Source/',
		files: [
			'Core/Core',
			'Types/Number'
		]
	},
	'base': {
		path: '../Source/',
		files: [
			'Complex'
		]
	}

};

})(typeof exports != 'undefined' ? exports : this);
