"use strict";

module.exports = app => {

    app.get('/testconnection', (req, res) => {
        console.log("~~~GET TESTCONNECTION OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers.authorization);
        // res.status(200).send(JSON.parse('{"success": "succeeded"}'));
        res.sendStatus(200);
    });

    app.get('/test', (req, res) => {
        console.log("~~~GET TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers.authorization);
        // res.status(200).send(JSON.parse('{"success": "succeeded"}'));
        res.sendStatus(200);
    });

    app.get('/test/:drive/:file', (req, res) => {
        console.log("~~~GET FILE PICKER TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers.authorization);
        // res.status(200).send(JSON.parse('{"success": "succeeded"}'));
        res.sendStatus(200);
    });

    app.post('/connector/scripts', (req, res) => {
        console.log("~~~GET SCRIPTS~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
        const graphUrl = `https://graph.microsoft.com/v1.0/me`
        const graphHttp = new XMLHttpRequest()
        graphHttp.open("GET", graphUrl)
        graphHttp.setRequestHeader("Authorization", req.headers.authorization);
        graphHttp.send();
        graphHttp.onreadystatechange=(e)=>{
            if (graphHttp.readyState === graphHttp.DONE) {
                const userId = JSON.parse(graphHttp.responseText).id;
                // console.log(JSON.parse(graphHttp.responseText))
                // console.log("\n~~~~~~~~~~~~~~\n")
                // console.log(req.headers.authorization);
                // console.log("\n~~~~~~~~~~~~~~~~\n");
                console.log(JSON.stringify(req.query, null, 2));
                if (req.query.location.toLowerCase() === "redmond") {
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
    });

    app.post('/connector/execute', (req, res) => {
        console.log("~~~GET TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        res.status(200).send({success: "succeeded"});
    });

    app.post('/connector/user', (req, res) => {
        console.log("~~~GET TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        res.status(200).send({success: "succeeded"});
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

    app.post('/api/contacts/:name', (req, res) => {
        console.log("~~~GET TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        res.status(200).send({success: "succeeded"});
    });

    app.get('/api/schema', (req, res) => {
        console.log("~~~GET TEST SCHEMA~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        const resp = {
            Schema: {
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
            }
        }
        
        console.log("SENDING RESPONSE OBJECT");
        console.log(JSON.stringify(resp, null, 2));
        res.status(200).send(resp);
    });
};


