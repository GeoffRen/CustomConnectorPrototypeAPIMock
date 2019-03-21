"use strict";

module.exports = app => {
    app.get('/datasets/default/rootfolders', (req, res) => {
        console.log("~~~GET ROOTFOLDERS OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        // console.log(req.headers.authorization);
        res.status(200).send(
            [
                {
                    Id: "idsomeid0",
                    Name: "geoff1",
                    DisplayName: "geren0",
                    Path: "/unattended/path0",
                    LastModified: "12-16-1995",
                    Size: "11",
                    MediaType: "picture",
                    IsFolder: true,
                    ETag: "tag",
                    FileLocator: "whatsthis"
                },
                {
                    Id: "idsomeid1",
                    Name: "geoff2",
                    DisplayName: "geren1",
                    Path: "/unattended/path1",
                    LastModified: "12-16-1995",
                    Size: "11",
                    MediaType: "picture",
                    IsFolder: false,
                    ETag: "tag",
                    FileLocator: "whatsthis"
                }
            ]
        );
    });

    app.get('/datasets/default/folders', (req, res) => {
        console.log("~~~GET FOLDERS OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        // console.log(req.headers.authorization);
        res.status(200).send(
            [
                {
                    Id: "idsomeid2",
                    Name: "geoff3",
                    DisplayName: "geren2",
                    Path: "/unattended/path2",
                    LastModified: "12-16-1995",
                    Size: "11",
                    MediaType: "picture",
                    IsFolder: false,
                    ETag: "tag",
                    FileLocator: "whatsthis"
                },
                {
                    Id: "idsomeid3",
                    Name: "geoff4",
                    DisplayName: "geren3",
                    Path: "/unattended/path3",
                    LastModified: "12-16-1995",
                    Size: "11",
                    MediaType: "picture",
                    IsFolder: false,
                    ETag: "tag",
                    FileLocator: "whatsthis"
                }
            ]
        );
    });

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
    });

    app.get('/connector/returntest0', (req, res) => {
        console.log("~~~GET EXECUTE OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        res.status(200).send("string ret test");
    });

    app.post('/connector/execute', (req, res) => {
        console.log("~~~GET EXECUTE OPERATION~~~");
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


