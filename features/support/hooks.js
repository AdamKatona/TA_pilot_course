'use strict';

require('chromedriver');
require('cucumber').Util.Colors(true);

var fs = require('fs');
var path = require('path');
var cucumberJunit = require('cucumber-junit');
//https://www.npmjs.com/package/cucumber-html-reporter
var reporter = require('cucumber-html-reporter');
var eachStepScreensArr = [];
var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
global.expect = chai.expect;

var options = {
    theme: 'bootstrap',
    jsonFile: './reports/cucumber_report.json',
    output: './reports/cucumber_report.html',
    reportSuiteAsScenarios: true
};

var webdriver = require('selenium-webdriver');
global.by = webdriver.By;
module.exports = function () {
    this.setDefaultTimeout(60000);

    this.Before(function () {
        //Reset Array with Step screenshots
        eachStepScreensArr = [];
    });

    this.registerHandler('BeforeFeatures', function () {

        global.driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
        global.driver.isElementVisible = function (locator) {
            return driver.isElementPresent(locator).then(function (present) {
                if (!present) {
                    return false;
                }
                return driver.findElement(locator).isDisplayed().then(null, function () {
                    return false;
                });
            });
        };
        return global.driver.manage().window().maximize();
    });

    this.registerHandler('StepResult', function (result) {
        if (result.getStatus() === "failed") {
            return global.driver.takeScreenshot().then(function (png) {
                eachStepScreensArr.push(new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64'));
            });
        }
        return Promise.resolve();
    });

    this.After(function (scenario){
        var today = new Date();
        var screenshotName = today.getUTCFullYear().toString() + '_' + today.toLocaleDateString("en-us", {month: "long"}) + '_' + today.getUTCDate().toString() + '_'
                            + Date.parse(today).toString();
        //Attach any step screenshots to the scenario metadata
        for (var key in eachStepScreensArr) {
            scenario.attach(eachStepScreensArr[key], 'image/png');
            fs.writeFileSync(path.resolve('./screenshots/' + screenshotName + '.png'), eachStepScreensArr[key], 'base64');
        }
        return Promise.resolve();
    });

    this.registerHandler('AfterFeatures', function () {
        fs.writeFileSync(path.resolve('./reports/cucumber_junit.xml'), cucumberJunit(JSON.stringify(require('../../reports/cucumber_report.json'))), 'utf8');
        reporter.generate(options);
        return global.driver.quit();
    });
};