function Site() {

    var LOCATION_FILTER_BOX = '.select-box',
        ROLES_FILTER_BOX = '.multi-select-filter',
        SEARCH_BUTTON = '.career-apply-box',
        COUNTRY = '.option',
        CITY = 'li.option > ul.options nested > li.option',
        ROLE = 'ul.multi-select-column > li > label',
        FIND_YOUR_DREAM_JOB = '.job-search-title',
        DESCRIPTION = '.recruiting-details-description-header';

    this.isSloganVisible = function () {
        return driver.isElementVisible(by.css(FIND_YOUR_DREAM_JOB));
    };

    this.clickLocationFilterBox = function () {
        return driver.findElement(by.css(LOCATION_FILTER_BOX)).click();
    };

    this.clickRoleFilterBox = function () {
        return driver.findElement(by.css(ROLES_FILTER_BOX)).click();
    };

    this.selectCountry = function (country) {
        var cnt = driver.findElement(by.xpath('//li[contains(@aria-label,"' + country + '")]'));
        return cnt.getAttribute('class').then(function(text){
            if (text.indexOf('dropdown') == -1){
                return cnt.click();
            }
        });
    };

    this.selectCity = function (city) {
        return driver.findElement(by.xpath('//li[contains(@class,"dropdown-invisible-group")]/ul[contains(@class,"options")]/li[contains(text(),"' + city + '")]')).click();
    };

    this.selectRole = function (role) {
        return driver.findElement(by.xpath('//ul[contains(@class,"multi-select-column")]/li/label/span[contains(., "' + role + '")]')).click();
    };

    this.clickSearchButton = function () {
        return driver.findElement(by.css(SEARCH_BUTTON)).click();
    };

    this.isPositionNameVisible = function (position) {
        driver.sleep(3000);
        return driver.findElement(by.xpath(
            '//li[@class="search-result-item"]/div/a[.="' + position + '"]'
        )).isDisplayed();
    };

    this.getCategoryText = function (position) {
        return driver.findElement(by.xpath(
            '//li[@class="search-result-item"][./div/a[.="' + position + '"]]/div[@class="department"]'
        )).getText();
    };

    this.isPriorityHigh = function (position) {
        return driver.findElement(by.xpath(
            '//li[@class="search-result-item"]/div[./a[.="' + position + '"]]'
        )).getAttribute('class').then(function (attr) {
            return attr.indexOf('hot') > -1;
        });
    };

    this.getLocationText = function (position) {
        return driver.findElement(by.xpath(
            '//li[@class="search-result-item"][./div/a[.="' + position + '"]]/div[@class="location"]'
        )).getText().then(function(text){
            return text.replace('&ensp;', ' ');
        });
    };

    this.isApplyButtonVisible = function (position) {
        return driver.findElement(by.xpath(
            '//li[@class="search-result-item"][./div/a[.="' + position + '"]]/div[@class="button-apply"]/a'
        )).isDisplayed();
    };

    this.clickApplyButton = function (position) {
        return driver.findElement(by.xpath(
            '//li[@class="search-result-item"][./div/a[.="' + position + '"]]/div[@class="button-apply"]/a'
        )).click();
    };

    this.isDescriptionVisible = function (text) {
        return driver.findElement(by.css(DESCRIPTION)).getText().then(function (desc) {
            return desc.indexOf(text) > -1;
        });
    };
}

module.exports = new Site();