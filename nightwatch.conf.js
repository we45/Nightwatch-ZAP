const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");

const SELENIUM_CONFIGURATION = {
    start_process: true,
    server_path: seleniumServer.path,
    host: '127.0.0.1',
    port: 4444,
    cli_args : {
        "webdriver.chrome.driver" : chromedriver.path
    },
};

const CHROME_CONFIGURATION = {
    browserName: 'chrome',
    javascriptEnabled: true,
    acceptSslCerts: true,
    chromeOptions: {
        args: [
            '--proxy-server=http://127.0.0.1:8090',
            '--no-sandbox'
        ]
    }
};

const DEFAULT_CONFIGURATION = {
    launch_url: 'http://localhost:9000',
    selenium_port: 4444,
    selenium_host: 'localhost',
    desiredCapabilities: CHROME_CONFIGURATION,
    globals: {
        asyncHookTimeout: 50000
    }
};

const ENVIRONMENTS = {
    default: DEFAULT_CONFIGURATION
};

//These are ZAP Specific Settings
const OTHER_SETTINGS = {
    zap_jrpc_server:  "http://localhost:4000/jsonrpc",
    zap_report_path: "/Users/abhaybhargav/Documents/Code/node/nightwatch_zap/report.json",
    zap_report_format: "json",
    test_report_title: "ZAP Test for weCare Application",
    test_report_author: "Abhay Bhargav",
    zap_policy_name: "Light"
};

module.exports = {
    src_folders: ['tests'],
    selenium: SELENIUM_CONFIGURATION,
    test_settings: ENVIRONMENTS,
    other_settings: OTHER_SETTINGS
};