"use strict";

module.exports = app => {

    app.post('/connector/scripts', (req, res) => {
        console.log("~~~POST SCRIPTS~~~");
        if (!req.body || !req.body.location) {
            res.status(404).send({error: 'no data'});
        } else {
            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
            const graphUrl = `https://graph.microsoft.com/v1.0/me`
            const graphHttp = new XMLHttpRequest()
            graphHttp.open("GET", graphUrl)
            // graphHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            graphHttp.setRequestHeader("Authorization", req.headers.authorization);
            graphHttp.send();
            graphHttp.onreadystatechange=(e)=>{
                if (graphHttp.readyState === graphHttp.DONE) {
                    const userId = JSON.parse(graphHttp.responseText).id;
                    console.log(JSON.parse(graphHttp.responseText))
                    console.log("\n~~~~~~~~~~~~~~\n")
                    console.log(req.headers.authorization);
                    console.log("\n~~~~~~~~~~~~~~~~\n");
                    console.log(req.body.location);
                    if (req.body.location.toLowerCase() === "redmond") {
                        if (userId === "1c889869-3278-480c-a242-7969a8224162") {
                            res.status(200).send({scripts: [{script: "gerenRedmondScript1"}, {script: "gerenRedmondScript2"}]})
                        } else {
                            res.status(200).send({scripts: [{script: "someoneRedmondScript1"}, {script: "someoneRedmondScript2"}]})
                        }
                    } else {
                        if (userId === "1c889869-3278-480c-a242-7969a8224162") {
                            res.status(200).send({scripts: [{script: "gerenScript1"}, {script: "gerenScript2"}]})
                        } else {
                            res.status(200).send({scripts: [{script: "script1"}, {script: "script2"}]})
                        }
                    }
                }
            }
        }
    });

    // app.post('/connector/functions', (req, res) => {
    //     console.log("~~~POST FUNCTIONS~~~");
    //     if (!req.body || !req.body.script) {
    //         res.status(404).send({error: 'no data'});
    //     } else {
    //         console.log(req.body.script);
    //         res.status(200).send({functions: ["func1, func2"]})
    //     }
    // });

    app.post('/connector/execute', (req, res) => {
        console.log("~~~POST EXECUTE~~~");
        if (!req.body || !req.body.executeScript) {
            res.status(404).send({error: 'no data'});
        } else {
            console.log(req.body.location);
            console.log(req.body.executeScript);
            res.status(200).send({success: "succeeded"})
        }
    });

    app.get('connector/user', (req, res) => {
        console.log("~~~GET USER~~~");
        console.log(req.query);
        res.status(200).send({Schema: {
            title: "email",
            type: "object",
            properties: {
                localPart: {
                    type: "string"
                },
                hostPart: {
                    type: "string"
                },
                displayName: {
                    type: "string"
                }
            }
        }})
    });

    app.post('/connector/deploy', (req, res) => {
        console.log("~~~POST DEPLOY~~~");
        if (!req.body || !req.body.script) {
            res.status(404).send({error: 'no data'});
        } else {
            console.log(req.body.script);
            res.status(200).send({success: "succeeded"})
        }
    });

    app.get('/connector/schema', (req, res) => {
        console.log("~~~GET SCHEMA~~~");
        if (!req.body || !req.query) {
            res.status(404).send({error: 'no data'});
        } else {
            console.log(req.query);
            res.status(200).send({Schema: {
                title: "email",
                type: "object",
                properties: {
                    localPart: {
                        type: "string"
                    },
                    hostPart: {
                        type: "string"
                    },
                    displayName: {
                        type: "string"
                    }
                }
            }})
        }
    });
};
