"use strict";

module.exports = app => {

    app.post('/connector/scripts', (req, res) => {
        console.log("~~~POST SCRIPTS~~~");
        if (!req.body || !req.body.location) {
            res.status(404).send({error: 'no data'});
        } else {
            console.log(req.headers.authorization);
            console.log("~~~~~~~~~~~~~~~~");
            console.log(req.body.location);
            if (req.body.location === "redmond") {
                res.status(200).send({scripts: [{script: "gerenScript1"}, {script: "gerenScript2"}]})
            } else {
                res.status(200).send({scripts: [{script: "script1"}, {script: "script2"}]})
            }


            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
            const graphUrl = `https://graph.microsoft.com/v1.0/me`
            const graphHttp = new XMLHttpRequest()
            graphHttp.open("GET", graphUrl)
            // graphHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            graphHttp.setRequestHeader("Authorization", req.headers.authorization);
            graphHttp.send();
            graphHttp.onreadystatechange=(e)=>{
                console.log(e)
                console.log(graphHttp.responseText)
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
        if (!req.body || !req.body.script) {
            res.status(404).send({error: 'no data'});
        } else {
            console.log(req.body.location);
            console.log(req.body.script);
            res.status(200).send({success: "succeeded"})
        }
    });

    app.get('/user', (req, res) => {
        console.log("~~~GET USER~~~");
        console.log(req.query);
        res.status(200).send({user: "geren"})
    });
};
