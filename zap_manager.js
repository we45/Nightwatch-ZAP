const axios = require("axios");
const configs = require("./nightwatch.conf");
const zapApi = configs.other_settings.zap_jrpc_server;
const chalk = require("chalk");

module.exports.startZap = async function(done) {
    await axios.post(zapApi, {
        method: "start_zap_scanner",
        jsonrpc: "2.0",
        id: 0
    })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.error(err);
        });
};

module.exports.stopZap = async function(done) {
    await axios.post(zapApi, {
        method: "kill_zap",
        jsonrpc: "2.0",
        id: 0
    })
        .then(res => {
            console.log(chalk.green.bold("[+] ZAP has been shutdown successfully"));
        })
        .catch(err => {
            console.error(err);
        });
};

