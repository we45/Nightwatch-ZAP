const ZapManager = require("../zap_manager");
const axios = require("axios");
const configs = require("../nightwatch.conf");
const zapApi = configs.other_settings.zap_jrpc_server;
const chalk = require("chalk");

module.exports = {
    before: function(client, done) {
        ZapManager.startZap(done);
        setTimeout(() => {
            done();
        }, 10000);
    },
    "Login to weCare App": function(client) {
        client
            .url(client.launchUrl + "/login/")
            .waitForElementVisible("body",1000)
            .assert.visible("input[type=email]")
            .assert.visible("input[type=password]")
            .setValue("input[type=email]", 'betty.ross@we45.com')
            .setValue("input[type=password]", 'secdevops')
            .click("button[id=submit]")
            .waitForElementVisible("body",1000)
            .pause(2000)
    },
    "Search For Tests": function(client) {
        client
            .url(client.launchUrl + "/tests/")
            .waitForElementVisible("body",1500)
            .setValue("input[name=search]", "Liver")
            .click("input[name=look]")
            .waitForElementVisible("body",1000)
    },
    after: function(client, done) {
        //Browser closes here
        client.end(function() {
            done();
        });
        let scan_id;
        let scan_status = 0;
        //ZAP Scan Starts here
        setTimeout(() => {
            axios.post(zapApi, {
                method: "start_zap_active_scan",
                params: {
                    baseUrl: client.launchUrl,
                    scan_policy: configs.other_settings.zap_policy_name,
                },
                jsonrpc: "2.0",
                id: 1
            })
                .then(res => {
                    scan_id = parseInt(res.data.result.scan_id);
                    console.log(chalk.green.bold("[+] ZAP Active Scan Started successfully with ID: " + chalk.blue.bold(scan_id)));
                    done();
                })
                .catch(err => {
                    console.log(chalk.red(err));
                })
        },1500);

        //ZAP Active Scan Status is queried every 10 seconds until scan status reaches 100%
        let timerId = setInterval(() => {
            axios.post(zapApi, {
                method: "get_ascan_status",
                params: [scan_id],
                jsonrpc: "2.0",
                id: 2
            })
                .then(res => {
                    scan_status = parseInt(res.data.result);
                    console.log(chalk.green.bold("[+] Scan Status: " + chalk.blue.bold(scan_status) + "%"));
                })
                .catch(err => {
                    console.error(err);
                });
            if (scan_status === 100) {
                clearInterval(timerId);
                //ZAP Report is written here
                setTimeout(() => {
                    axios.post(zapApi, {
                        method: "write_json_report",
                        params: {
                            fullpath: configs.other_settings.zap_report_path,
                            export_format: configs.other_settings.zap_report_format,
                            report_title: configs.other_settings.test_report_title,
                            report_author: configs.other_settings.test_report_author,

                        },
                        jsonrpc: "2.0",
                        id: 1
                    })
                        .then(res => {
                            console.log(chalk.green.bold("[+] " + res.data.result));
                            setTimeout(() => {
                                ZapManager.stopZap(done);
                            },400);
                            done();
                        })
                        .catch(err => {
                            console.error(err);
                        })
                },1000);
                done();
            }
        }, 10000);

        done();
    }
};