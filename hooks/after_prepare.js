var path = require('path');
var fs = require('fs');
var preferencesParser = require('./lib/preferences-parser');

module.exports = function (ctx) {

	if (ctx.opts.platforms.indexOf('android') === -1) {
		return;
	}

	var glob = ctx.requireCordovaModule('glob');
  	var projectRoot = ctx.opts.projectRoot;
	var configXml = path.join(projectRoot, 'config.xml');
	var preferences = preferencesParser.parseConfigXml(configXml);
    var platformRoot = path.join(projectRoot, 'platforms/android');

	var colorsFile = preferences['cordova-android-colors-file'];
	var stylesFile = preferences['cordova-android-styles-file'];

	if (!(colorsFile || stylesFile)) {
		console.error("cordova-android-resources: NO FILES WERE DEFINED");
		return;
	}
	
	var colorsContent = fs.readFileSync(path.join(projectRoot, colorsFile),'utf8');
	var stylesContent = fs.readFileSync(path.join(projectRoot, stylesFile),'utf8');

	var colorsDestFilePath = path.join(platformRoot, '/res/values/colors.xml');
	var stylesDestFilePath = path.join(platformRoot, '/res/values/styles.xml');

  	fs.writeFileSync(colorsDestFilePath, colorsContent);
  	fs.writeFileSync(stylesDestFilePath, stylesContent);
};