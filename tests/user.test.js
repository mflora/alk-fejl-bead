var Browser = require('zombie');

describe('User visits website', function() {
    var browser = new Browser();
    
    before(function() {
        return browser.visit('http://localhost:3333/');
    });
    
    it('should be successful', function() {
        browser.assert.success();
    });
    
    it('should see front page', function() {
        browser.assert.text('title', 'Családi ToDo');
    });
});

describe('User logs in', function() {
    var browser = new Browser();
    
    before(function() {
        return browser.visit('http://localhost:3333/');
    });

    it('should not log in', function() {
        browser.clickLink('Belépés')
        browser.clickLink('Belépés')

        browser.assert.text('div.alert', 'A megadott adatok hibásak!')
    });

    it('should log in', function() {
        browser.clickLink('Belépés')
        browser
            .fill('username', 'asdasd')
            .fill('password', '111AAA')
            .pressButton('button[type=submit]')
            .then(function () {
                browser.assert.redirected();
                browser.assert.success();
                browser.assert.url({ pathname: '/todoes' });
                done();
            });
    });
});
