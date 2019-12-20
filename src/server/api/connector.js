const axios = require("axios");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

("use strict");

module.exports = app => {
    app.get("/flightingSchema", (req, res) => {
        console.log("~~~GET FLIGHTING SCHEMA PARAM~~~");
        if (!req.body || !req.query) {
            res.status(404).send({
                error: "no data"
            });
        } else {
            console.log(
                `RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`
            );
            console.log(
                `RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`
            );
            console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
            console.log(req.headers.authorization);
            res.status(200).send({
                Schema: {
                    type: "object",
                    properties: {
                        row: {
                            type: "string",
                            name: "Row"
                        },
                        column: {
                            type: "string"
                        }
                    }
                }
            });
        }
    });

    app.post("/WebHook/test", (req, res) => {
        console.log("~~~GET TEST TRIGGER OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers.authorization);
        // res.status(200).send(JSON.parse('{"success": "succeeded"}'));
        res.sendStatus(200);
    });

    app.post("/webhook/subscribe", (req, res) => {
        console.log("~~~GET TEST TRIGGER OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers.authorization);
        // res.status(200).send(JSON.parse('{"success": "succeeded"}'));
        res.sendStatus(200);
    });

    app.get("/onedit", (req, res) => {
        console.log("~~~GET ONEDIT~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);

        if (!req.query || !req.query.name) {
            res.status(400).send("No data");
        }

        const url = `https://graph.microsoft.com/beta/me/drive/items/01JASD364CH44JPTPRX5BI45G7UV6QTHVE/workbook/names('${req.query.name}')/range`;
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: fs.readFileSync(
                    path.join(__dirname, "../..", "token.txt")
                )
            }
        };

        axios
            .get(url, config)
            .then(graphRes => {
                const curRange = fs.readFileSync(
                    path.join(__dirname, "../..", "range.txt"),
                    "utf-8"
                );
                console.log(graphRes.data);
                console.log();
                const parsedVals = [].concat
                    .apply([], graphRes.data.text)
                    .join(" ");
                console.log(parsedVals);
                console.log();
                console.log(curRange);
                if (curRange !== parsedVals) {
                    res.status(200).send(true);
                } else {
                    res.status(200).send(false);
                }
            })
            .catch(err => {
                res.status(200).send({
                    success: false
                });
                console.log(err);
            });
    });

    app.post("/onedit", (req, res) => {
        console.log("~~~POST ONEDIT ITEM~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);

        if (!req.query || !req.query.name || !req.query.address) {
            res.status(400).send("No data");
        }

        const url = `https://graph.microsoft.com/beta/me/drive/items/01JASD364CH44JPTPRX5BI45G7UV6QTHVE/workbook/names/add`;
        const [sheet, cells] = req.query.address.split("!");
        const data = {
            name: req.query.name,
            reference: `=${sheet}!${cells}`,
            comment: "Comment for the named item"
        };
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: fs.readFileSync(
                    path.join(__dirname, "../..", "token.txt"),
                    "utf-8"
                )
            }
        };

        console.log("~~~DATA~~~");
        console.log(data);
        console.log("\n~~~HEADERS~~~");
        console.log(config.headers);

        axios
            .post(url, data, config)
            .then(graphRes => {
                res.status(200).send(graphRes.data);
                console.log(graphRes.data);
                console.log();
                const parsedVals = [].concat
                    .apply([], graphRes.data.text)
                    .join(" ");
                console.log(parsedVals);
                fs.writeFile(
                    path.join(__dirname, "../..", "range.txt"),
                    parsedVals,
                    (err, data) => console.log(err + "\n\n" + data)
                );
            })
            .catch(err => {
                res.status(200).send({
                    success: false
                });
                console.log(err);
            });
    });

    app.get("/nameditem", (req, res) => {
        console.log("~~~GET NAMED ITEM~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);

        const url =
            "https://graph.microsoft.com/beta/me/drive/items/01JASD364CH44JPTPRX5BI45G7UV6QTHVE/workbook/names('test2')/range";
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        axios
            .get(url, config)
            .then(graphRes => {
                res.status(200).send(graphRes.data);
                console.log(graphRes.data);
            })
            .catch(err => {
                res.status(200).send({
                    success: false
                });
                console.log(err);
            });
    });

    app.post("/nameditem", (req, res) => {
        console.log("~~~POST NAMED ITEM~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);

        const url =
            "https://graph.microsoft.com/beta/me/drive/items/01JASD364CH44JPTPRX5BI45G7UV6QTHVE/workbook/names/add";
        const data = {
            name: "test3",
            reference: "=Sheet1!$A$4:$B$5",
            comment: "Comment for the named item"
        };
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        };

        axios
            .post(url, data, config)
            .then(graphRes => {
                res.status(200).send(graphRes.data);
                console.log(graphRes.data);
            })
            .catch(err => {
                res.status(200).send({
                    success: false
                });
                console.log(err);
            });
    });

    app.post("/codeless/metadata/datasets/default/query/pq", (req, res) => {
        console.log("~~~POST POWERQUERY OTHER TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        // console.log(req.headers.authorization);
        res.status(200).send({
            success: true
        });
    });

    app.post("/codeless/datasets/default/query/pq", (req, res) => {
        console.log("~~~POST POWERQUERY TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        // console.log(req.headers.authorization);
        res.status(200).send({
            success: true
        });
    });

    app.get("/datasets/default/rootfolders", (req, res) => {
        console.log("~~~GET ROOTFOLDERS OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        // console.log(req.headers.authorization);
        res.status(200).send([
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
        ]);
    });

    app.get("/datasets/default/folders", (req, res) => {
        console.log("~~~GET FOLDERS OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        // console.log(req.headers.authorization);
        res.status(200).send([
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
        ]);
    });

    app.get("/testconnection", (req, res) => {
        console.log("~~~GET TESTCONNECTION OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers);
        // res.status(200).send(JSON.parse('{"success": "succeeded"}'));
        res.sendStatus(200);
    });

    app.post("/testconnection", (req, res) => {
        console.log("~~~POST TESTCONNECTION OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers);
        // res.status(200).send(JSON.parse('{"success": "succeeded"}'));
        res.sendStatus(200);
    });
 
    app.get("/test", (req, res) => {
        console.log("~~~GET TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers);
        // res.status(200).send(JSON.parse('{"success": "succeeded"}'));
        res.status(200).send({ test: "success" });
    });

    app.get("/test/:scriptId", (req, res) => {
        console.log("~~~GET TEST/:scriptId OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers);
        // res.status(200).send(JSON.parse('{"success": "succeeded"}'));
        res.status(200).send({ test: "success" });
    });

    app.post("/test", (req, res) => {
        console.log("~~~POST TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers);
        res.status(200).send({ test: "success" });
        // if (!req.body.scriptParameters || req.body.scriptParameters.length === 0) {
        //     console.log("~~~NO PARAMETERS~~~");
        //     res.status(200).send({
        //         "result": null,
        //         "logs": [
        //             "[2019-10-01T20:58:01.581Z] str",
        //             "[2019-10-01T20:58:01.581Z] undefined",
        //             "[2019-10-01T20:58:01.581Z] true",
        //             "[2019-10-01T20:58:01.581Z] arr1,arr2,arr3",
        //             "[2019-10-01T20:58:01.581Z] undefined"
        //         ]
        //     });
        // } else {
        //     console.log("~~~SOME PARAMETERS~~~");
        //     res.status(200).send({
        //             "result": JSON.parse("{\"r0\":\"str\",\"r1\":{\"r2\":{\"r3\":0}},\"r4\":true}"),
        //             "logs": [
        //                 "[2019-10-01T17:05:28.325Z] str",
        //                 "[2019-10-01T17:05:28.325Z] undefined",
        //                 "[2019-10-01T17:05:28.343Z] true",
        //                 "[2019-10-01T17:05:28.343Z] arr1,arr2,arr3",
        //                 "[2019-10-01T17:05:28.343Z] undefined"
        //             ]
        //         // main: { r0: 'str', r1: { r2: { r3: 0 } }, r4: true }
        //     });
        // }
    });

    app.get("/test/:drive/:file", (req, res) => {
        console.log("~~~GET FILE PICKER TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers.authorization);
        // res.status(200).send(JSON.parse('{"success": "succeeded"}'));
        res.sendStatus(200);
    });

    app.all("/api/unattended/run", (req, res) => {
        console.log("~~~DYNAMIC RETURN TEST~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers);
        // res.set({
        //     location: "http://13.58.89.80:8080/test",
        //     "retry-after": 5
        // });
        // res.sendStatus(202);
        // if (!req.body.scriptParameters || req.body.scriptParameters === "[]") {
        if (!req.body || req.body == {}) {            
            console.log("~~~NO PARAMETERS~~~");
            res.setHeader('geoff', 'geoff header');
            res.setHeader('x-ms-client-request-id', 'noParametersRequestId');
            res.status(400).send({
                result: null,
                logs: []
            });
        } else {
            console.log("~~~SOME PARAMETERS~~~");
            res.setHeader('geoff', 'geoff header');
            res.setHeader('x-ms-client-request-id', 'someParametersRequestId');
            res.status(200).send({
                result: "TEST STRING",
                logs: ["[2019-10-10T15:50:57.991Z] str"]
                // result: JSON.parse(
                //     '{"r0":"str","r1":{"r2":{"r3":0}},"r4":true}'
                // ),
                // logs: [
                //     "[2019-10-01T17:05:28.325Z] str",
                //     "[2019-10-01T17:05:28.325Z] undefined",
                //     "[2019-10-01T17:05:28.343Z] true",
                //     "[2019-10-01T17:05:28.343Z] arr1,arr2,arr3",
                //     "[2019-10-01T17:05:28.343Z] undefined"
                // ]
            });
        }
    });

    app.post("/api/unattended/run/:source", (req, res) => {
        console.log("~~~GET FILE PICKER TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers.authorization);
        // res.status(200).send(JSON.parse('{"success": "succeeded"}'));
        res.sendStatus(200);
    });

    app.post("/api/unattended/run/:drive/:file", (req, res) => {
        console.log("~~~GET FILE PICKER TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers.authorization);
        // res.status(200).send(JSON.parse('{"success": "succeeded"}'));
        res.sendStatus(200);
    });

    app.post("/api/api/unattended/run/:drive/:file", (req, res) => {
        console.log("~~~GET FILE PICKER TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers.authorization);
        // res.status(200).send(JSON.parse('{"success": "succeeded"}'));
        res.sendStatus(200);
    });

    app.post("/api/api/api/unattended/run/:drive/:file", (req, res) => {
        console.log("~~~GET FILE PICKER TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers.authorization);
        // res.status(200).send(JSON.parse('{"success": "succeeded"}'));
        res.sendStatus(200);
    });

    app.post("/api/api/api/api/unattended/run/:drive/:file", (req, res) => {
        console.log("~~~DYNAMIC~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers.authorization);
        res.status(200).send({
            retStr: "TEST RET STRING ",
            retInt: 2525
            // retArr: ["str1", "str2", "str3"]
        });
    });

    app.get("/connector/popup", (req, res) => {
        console.log("~~~GET POPUP PARAM~~~");
        if (!req.body || !req.query) {
            res.status(404).send({
                error: "no data"
            });
        } else {
            console.log(req.query);
            // res.status(200).send({
            //     Schema: {
            //         title: "email",
            //         type: "object",
            //         properties: {
            //             localPart: {
            //                 type: "string"
            //             },
            //             hostPart: {
            //                 type: "string"
            //             },
            //             displayName: {
            //                 type: "string"
            //             }
            //         }
            //     }
            // })
            // res.status(200).send({
            //     "Schema": {
            //         "name": "query",
            //         "in": "body",
            //         "description": "query body",
            //         "required": false,
            //         "schema": {
            //             "type": "object",
            //             "properties": {
            //                 "query": {
            //                     "description": "Query Text",
            //                     "type": "string",
            //                     "format": "mquery"
            //                 }
            //             }
            //         },
            //         "x-ms-summary": "Query"
            //     }
            // })

            res.status(200).send({
                Schema: {
                    type: "object",
                    properties: {
                        query: {
                            description: "Query Text",
                            type: "string",
                            format: "mquery"
                        }
                    }
                }
            });
        }
    });

    app.post("/connector/scripts", (req, res) => {
        console.log("~~~GET SCRIPTS~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        // var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
        // const graphUrl = `https://graph.microsoft.com/v1.0/me`
        // const graphHttp = new XMLHttpRequest()
        // graphHttp.open("GET", graphUrl)
        // graphHttp.setRequestHeader("Authorization", req.headers.authorization);
        // graphHttp.send();
        // graphHttp.onreadystatechange=(e)=>{
        //     if (graphHttp.readyState === graphHttp.DONE) {
        //         const userId = JSON.parse(graphHttp.responseText).id;
        // console.log(JSON.parse(graphHttp.responseText))
        // console.log("\n~~~~~~~~~~~~~~\n")
        console.log(req.headers);
        res.status(200).send({
            scripts: [
                {
                    Metadata: {
                        Name: "geoffScript"
                    },
                    Id: "someidthatdenotesgeoffscript"
                },
                {
                    Metadata: {
                        Name: "dynamicGeoffScript"
                    },
                    Id: "anotheridthatdenotesdynamicgeoffscript"
                }
            ]
        });
        // console.log("\n~~~~~~~~~~~~~~~~\n");
        // if (req.query.location.toLowerCase() === "redmond") {
        //     // if (userId === "1c889869-3278-480c-a242-7969a8224162") {
        //     //     res.status(200).send({scripts: [{script: "gerenRedmondScript1"}, {script: "dynamicSchema0"}]})
        //     // } else {
        //     res.status(200).send({
        //         scripts: [{
        //             Metadata: {
        //                 Name: "redScript"
        //             },
        //             Id: "soguh348tvb349vtge8rt"
        //         }, {
        //             Metadata: {
        //                 Name: "redDynamicSchema"
        //             },
        //             Id: "974fg8Dynamicf"
        //         }]
        //     })
        //     // }
        // } else {
        //     // if (userId === "1c889869-3278-480c-a242-7969a8224162") {
        //     //     res.status(200).send({scripts: [{script: "gerenScript1"}, {script: "dynamicSchema2"}]})
        //     // } else {
        //     res.status(200).send({
        //         scripts: [{
        //             Metadata: {
        //                 Name: "notRedScript"
        //             },
        //             Id: "hrf834g9tn48"
        //         }, {
        //             Metadata: {
        //                 Name: "notRedDynamicSchema"
        //             },
        //             Id: "4rcDynamicn348"
        //         }]
        //     })
        //     // }
        // }
        // if (req.query.location.toLowerCase() === "redmond") {
        //     // if (userId === "1c889869-3278-480c-a242-7969a8224162") {
        //     //     res.status(200).send({scripts: [{script: "gerenRedmondScript1"}, {script: "dynamicSchema0"}]})
        //     // } else {
        //     res.status(200).send({
        //         scripts: [{
        //             script: "redScript",
        //             id: "soguh348tvb349vtge8rt"
        //         }, {
        //             script: "redDynamicSchema",
        //             id: "974fg8Dynamicf"
        //         }]
        //     })
        //     // }
        // } else {
        //     // if (userId === "1c889869-3278-480c-a242-7969a8224162") {
        //     //     res.status(200).send({scripts: [{script: "gerenScript1"}, {script: "dynamicSchema2"}]})
        //     // } else {
        //     res.status(200).send({
        //         scripts: [{
        //             script: "notRedScript",
        //             id: "hrf834g9tn48"
        //         }, {
        //             script: "notRedDynamicSchema",
        //             id: "4rcDynamicn348"
        //         }]
        //     })
        //     // }
        // }
        // }
        // }
    });

    app.all("/api/storage", (req, res) => {
        console.log("~~~GET SCRIPTS API STORAGE~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers);
        res.status(200).send([
            {
                id: "0",
                name: "GeoffTestScript0",
            },
            {
                id: "1",
                name: "GeoffTestScript1",
            },
            {
                id: "2",
                name: "GeoffTestScript2",
            },
            {
                id: "3",
                name: "GeoffTestScript3",
            },
            {
                id: "4",
                name: "GeoffTestScript4",
            },
            {
                id: "5",
                name: "GeoffTestScript5",
            },
            {
                id: "6",
                name: "GeoffTestScript6",
            },
            {
                id: "7",
                name: "GeoffTestScript7",
            },
            {
                id: "8",
                name: "GeoffTestScript8",
            },
            {
                id: "9",
                name: "GeoffTestScript9",
            },
            {
                id: "10",
                name: "GeoffTestScript10",
            },
            {
                id: "11",
                name: "GeoffTestScript11",
            }
        ]);
    });

    app.all("/api/storage/:script", (req, res) => {
        console.log("~~~GET SINGLE SCRIPT API STORAGE~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        // console.log(req.headers);
        if ((req.query.scriptId && req.query.scriptId < 6) || (req.params.script && req.params.script < 6)) {
            console.log('~~~DOES NOT HAS STUFF~~~');
            // res.status(200).send();
            res.status(200).send({
                "parameterInfo":"{\"originalParameterOrder\":[],\"flowParameterSchema\":{\"type\":\"object\",\"default\":{},\"x-ms-visibility\":\"internal\"},\"flowReturnSchema\":{\"type\":\"object\",\"properties\":{},\"x-ms-visibility\":\"internal\"}}",
            });
        } else {
            console.log('~~~HAS STUFF~~~');
            res.status(200).send({
                // "parameterInfo":"{\"originalParameterOrder\":[{\"name\":\"p0\",\"index\":0}],\"flowParameterSchema\":{\"type\":\"object\",\"required\":[\"p0\"],\"properties\":{\"p0\":{\"type\":\"string\"}}},\"flowReturnSchema\":{\"type\":\"object\",\"properties\":{\"result\":{\"type\":\"string\"}}}}",
                parameterInfo: {
                    flowParameterSchema: {
                        type: "object",
                        properties: {
                            p0: {
                                type: "array",
                                items: {
                                    type: "string",
                                }
                            },
                            p1: {
                                type: "array",
                                items: {
                                    type: "number",
                                }
                            },
                            p2: {
                                type: "array",
                                items: {
                                    type: "boolean",
                                }
                            },
                            p3: {
                                type: "array",
                                items: {
                                    type: "object",
                                }
                            },
                            p4: {
                                AnyValue: {},
								default: 5
                            },
                            p5: {
                                AnyValue: {},
								default: "str"
                            },
                            p6: {
                                AnyValue: {},
								default: "[1, 2, 3]"
                            },
                            p7: {
                                AnyValue: {},
								default: "{p: 5}"
                            },
                            p8: {
                                AnyValue: {}
                            }
                        }
                    },
                    flowReturnSchema: {
                        type: "object",
                        properties: {},
                        "x-ms-visibility": "internal"
                    }
                }
            });
        }
    });

    app.post("/connector/user", (req, res) => {
        console.log("~~~GET TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        res.status(200).send({
            success: "succeeded"
        });
    });

    app.post("/connector/execute", (req, res) => {
        console.log("~~~POST EXECUTE OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers);
        res.status(200).send({
            retStr: "TEST RET STRING ",
            retInt: 2525,
            retArr: ["str1", "str2", "str3"]
        });
    });

    app.post("/connector/execute/:drive/:file", (req, res) => {
        console.log("~~~POST EXECUTE OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers);
        res.status(200).send({
            retStr: "TEST RET STRING ",
            retInt: 2525,
            retArr: ["str1", "str2", "str3"]
        });
    });

    app.all("/api/unattended/run/:drive/:file", (req, res) => {
        console.log("~~~POST EXECUTE OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        console.log(req.headers);
        res.status(200).send({
            retStr: "TEST RET STRING ",
            retInt: 2525,
            retArr: ["str1", "str2", "str3"]
        });
    });

    app.get(
        "/v1.0/drives/:drive/items/:file/workbook/worksheets",
        (req, res) => {
            console.log("~~~GET FILE PICKER OPERATION~~~");
            console.log(
                `RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`
            );
            console.log(
                `RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`
            );
            console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
            res.status(200).send({
                success: "succeeded"
            });
        }
    );

    app.get("/connector/schema", (req, res) => {
        console.log("~~~GET SCHEMA PARAM~~~");
        if (!req.body || !req.query) {
            res.status(404).send({
                error: "no data"
            });
        } else {
            console.log(req.query);
            if (req.query.scriptId.indexOf("ynamic") !== -1) {
                console.log("DYNAMIC");
                res.status(200).send({
                    // Schema: {
                    //   type: "object",
                    //   properties: {
                    //     p0: {
                    //       type: "string"
                    // },
                    // hostPart: {
                    //   type: "string"
                    // },
                    // displayName: {
                    //   type: "string"
                    // }
                    //   }
                    // }
                    Schema: {
                        type: "object",
                        properties: {
                            p0: {
                                type: "string"
                            },
                            P1: {
                                type: "number",
                                default: 5
                            },
                            p2: {
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            }
                        }
                    }
                });
            } else {
                res.status(200).send({
                    Schema: {
                        type: "object",
                        properties: {
                            p0: {
                                type: "string",
                                "x-ms-visibility": "internal"
                            }
                        }
                    },
                    flowReturnSchema: {
                        type: "object",
                        properties: {},
                        "x-ms-visibility": "internal"
                    },
                    flowParameterSchema: {
                        type: "object",
                        properties: {
                            p0: {
                                type: "string",
                                "x-ms-visibility": "internal"
                            }
                        }
                    }
                });
            }
        }
    });

    app.get("/connector/schemaresponse", (req, res) => {
        console.log("~~~GET SCHEMA RESPONSE~~~");
        if (!req.body || !req.query) {
            res.status(404).send({
                error: "no data"
            });
        } else {
            console.log(req.query);
            if (req.query.scriptId.indexOf("ynamic") !== -1) {
                console.log("~~~DYNAMIC~~~");
                res.status(200).send({
                    Schema: {
                        type: "object",
                        properties: {
                            result: {
                                type: "Object",
                                properties: {
                                    r0: {
                                        type: "String"
                                    },
                                    r1: {
                                        type: "Object",
                                        properties: {
                                            r2: {
                                                type: "Object",
                                                properties: {
                                                    r3: {
                                                        type: "Number"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    r4: {
                                        type: "Boolean"
                                    }
                                }
                            }
                        }
                    }
                });
            } else {
                console.log("~~~EMPTY~~~");
                res.status(200).send({
                    Schema: {
                        type: "object",
                        properties: {},
                        "x-ms-visibility": "internal"
                    },
                    flowReturnSchema: {
                        type: "object",
                        properties: {},
                        "x-ms-visibility": "internal"
                    },
                    flowParameterSchema: {
                        type: "object",
                        properties: {},
                        "x-ms-visibility": "internal"
                    }
                });
            }
        }
    });

    app.post("/api/contacts/:name", (req, res) => {
        console.log("~~~GET TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        res.status(200).send({
            success: "succeeded"
        });
    });

    app.get("/api/schema", (req, res) => {
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
        };

        console.log("SENDING RESPONSE OBJECT");
        console.log(JSON.stringify(resp, null, 2));
        res.status(200).send(resp);
    });
};
