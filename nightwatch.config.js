module.exports = {
  selenium: {
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path,
      'webdriver.gecko.driver': require('geckodriver').path,
    },
  },
  test_settings: {
    default: {
      "desiredCapabilities": {
        "browserName": "firefox"
      },
    },
    Firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        acceptInsecureCerts: true,
      },
    },
    FirefoxHeadless: {
      desiredCapabilities: {
        browserName: 'firefox',
        acceptInsecureCerts: true,
        'moz:firefoxOptions': {
          args: ['--headless'],
        },
      },
    },
  },
}
