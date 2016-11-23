module.exports = function () {

    var Site = require('../page_objects/career_site');

    this.Given(/^the EPAM career page is opened$/, function () {
        driver.get('https://www.epam.com/careers');
        return driver.wait(function () {
            return Site.isSloganVisible();
        });
    });

    this.When(/^the (Location|Teams and Roles) filter box is clicked$/, function (box) {
        if (box == 'Location') {
            return Site.clickLocationFilterBox();
        }
        return Site.clickRoleFilterBox();
    });

    this.When(/^the (country|city|role) "([^"].*)" is selected$/, function (type, name) {
        if (type == 'country') {
            return Site.selectCountry(name);
        } else if (type == 'city') {
            return Site.selectCity(name);
        }
        return Site.selectRole(name);
    });

    this.When(/^the Search button is clicked$/, function () {
        return Site.clickSearchButton();
    });

    this.Then(/^the position "([^"].*)" should be (visible|hidden)$/, function (name, visibility) {
        return expect(Site.isPositionNameVisible(name)).to.eventually.equal(visibility === 'visible');
    });

    this.Then(/^the priority of the position "([^"].*)" should be (normal|high)$/, function (position, prio) {
        return expect(Site.isPriorityHigh(position)).to.eventually.equal(prio == 'high');
    });

    this.Then(/^the (category|location) of "([^"].*)" position should be "([^"].*)"$/, function (type, position, text) {
        if (type == 'category') {
            return expect(Site.getCategoryText(position)).to.eventually.equal(text);
        }
        return expect(Site.getLocationText(position)).to.eventually.equal(text);
    });

    this.Then(/^the Apply button for "([^"].*)" position should be (visible|hidden)$/, function (position, visibility) {
        return expect(Site.isApplyButtonVisible(position)).to.eventually.equal(visibility == 'visible');
    });

    this.When(/^the Apply button for "([^"].*)" position is clicked$/, function (position) {
        return Site.clickApplyButton(position);
    });

    this.Then(/^the job description should contain the following text: "([^"].*)"$/, function (text) {
        return expect(Site.isDescriptionVisible(text)).to.eventually.be.true;
    });

};

