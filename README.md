## OWASP ZAP with NightwatchJS Example

### Why?

- I strongly believe that Software Test Automation when used for DAST (Dynamic App Security Testing)
can produce powerful results, namely:
    - Allow testing of REST API that can't be typically "spidered"
    - Allow the testing of SPAs and Front-end JS heavy apps that cant be crawled
    - Modularizing DAST coverage areas and providing a specific focus
    - among others....
- Thus far, most of my work in this space was with Java or Python, where I had leveraged Selenium Webdriver Libs to perform a similar set of things that I have done with this example.
- However, this time I thought I would give it a whirl with JS, and some popular JS End-to-End Testing Frameworks
- I liked NightWatch, because it seems simple to use and has Test hooks that are useful to structure stuff with the tests


### Instructions

> Please be advised. There are a few....

- I am using our (we45's) Intentionally vulnerable app for this example. You can use it too.
    - `docker pull nithinwe45/wecare`
    - `docker run -d -p 9000:80 nithinwe45/wecare`
    - I am using port 9000 here, but you don't have to. Just make the changes in the conf as required
- Install and run my ZAP-JSON-RPC Library. It is [here](https://github.com/we45/OWASP-ZAP-JSON-RPC-Service)
    - This makes it easier to manage ZAP. ZAP does have a direct REST API, and a Node API, but I found the Node one difficult to use
    - I went with JSON-RPC as it is more "command-focused" and directly converts python functions to methods to call with JSON-RPC.
- Install deps of this project
    - `npm install`
- Setup specific configuration params as you like in `nightwatch.conf.js`
- Make sure you have ZAP 2.7.X installed with the following additions:
    - Export Report
    - Ensure that API is enabled. I have enabled API and disabled API Key in this simulation
    - I am running ZAP on port `8090` as opposed to the standard `8080`


#### Sequence of Events
- Run the ZAP JSON RPC service first. Follow instructions in git repo
- Run Example here


### Video
[![asciicast](https://asciinema.org/a/qTF3MXXNHuLrUNxaPZxcQ8IQi.png)](https://asciinema.org/a/qTF3MXXNHuLrUNxaPZxcQ8IQi)