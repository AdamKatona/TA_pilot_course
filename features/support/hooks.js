'use strict';

require('chromedriver');
require('cucumber').Util.Colors(true);

var fs = require('fs');
var path = require('path');
var cucumberJunit = require('cucumber-junit');
//https://www.npmjs.com/package/cucumber-html-reporter
var reporter = require('cucumber-html-reporter');
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

    this.registerHandler('AfterFeatures', function () {
        // console.log(cucumberJunit(JSON.stringify(require('../../reports/cucumber_report.json'))));
        fs.writeFileSync(path.resolve('./reports/cucumber_junit.xml'),cucumberJunit(JSON.stringify(require('../../reports/cucumber_report.json'))),'utf8');
        reporter.generate(options);
        return global.driver.quit();
    });
};