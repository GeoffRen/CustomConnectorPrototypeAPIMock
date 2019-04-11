const axios = require("axios");
"use strict";

const token = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFEQ29NcGpKWHJ4VHE5Vkc5dGUtN0ZYTHRGZGtVT0J0LXlONm9XMjFaS1c0TzNhRUVURFlGdkdHUV9hdnlZa0NzVzhFM2RfR1ExZE1UQUVLUzNqdDdzSEhaWDZING0zUEFjS0llSEY1eXdpT2lBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiTi1sQzBuLTlEQUxxd2h1SFluSFE2M0dlQ1hjIiwia2lkIjoiTi1sQzBuLTlEQUxxd2h1SFluSFE2M0dlQ1hjIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwiaWF0IjoxNTU0OTk3NzY2LCJuYmYiOjE1NTQ5OTc3NjYsImV4cCI6MTU1NTAwMTY2NiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFVUUF1LzhMQUFBQXdZczd4VDFrTWI3ZUcvTC9YRWVJTTdNM1h4SzlFc1gvaXcwR04rRVFteVBYK2JDQ0E3bElKL0dBaE81UzJXWEpENFRGbUc5aVhPQUlxMGlXSnNLSHBRPT0iLCJhbXIiOlsicnNhIiwid2lhIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6IkFwcCBTZXJ2aWNlIiwiYXBwaWQiOiI3YWI3ODYyYy00YzU3LTQ5MWUtOGE0NS1kNTJhN2UwMjM5ODMiLCJhcHBpZGFjciI6IjIiLCJmYW1pbHlfbmFtZSI6IlJlbiIsImdpdmVuX25hbWUiOiJHZW9mZiIsImluX2NvcnAiOiJ0cnVlIiwiaXBhZGRyIjoiMTY3LjIyMC4yLjE2OCIsIm5hbWUiOiJHZW9mZiBSZW4iLCJvaWQiOiIxYzg4OTg2OS0zMjc4LTQ4MGMtYTI0Mi03OTY5YTgyMjQxNjIiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjEyNzUyMTE4NC0xNjA0MDEyOTIwLTE4ODc5Mjc1MjctMzI4NzUwNjgiLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDAyNjlCRDAzMiIsInJoIjoiSSIsInNjcCI6IkNhbGVuZGFycy5SZWFkV3JpdGUgQ2FsZW5kYXJzLlJlYWRXcml0ZS5TaGFyZWQgQ29udGFjdHMuUmVhZFdyaXRlIEVkdUFkbWluaXN0cmF0aW9uLlJlYWQgRWR1QWRtaW5pc3RyYXRpb24uUmVhZFdyaXRlIEVkdVJvc3Rlci5SZWFkIEVkdVJvc3Rlci5SZWFkV3JpdGUgRmlsZXMuUmVhZFdyaXRlLkFsbCBHcm91cC5SZWFkV3JpdGUuQWxsIE1haWwuUmVhZFdyaXRlIE1haWwuUmVhZFdyaXRlLlNoYXJlZCBNYWlsLlNlbmQgTWFpbC5TZW5kLlNoYXJlZCBNYWlsYm94U2V0dGluZ3MuUmVhZFdyaXRlIFBlb3BsZS5SZWFkIFBlb3BsZS5SZWFkLkFsbCBTaXRlcy5SZWFkLkFsbCBUYXNrcy5SZWFkV3JpdGUgVXNlci5SZWFkIFVzZXIuUmVhZC5BbGwgVXNlci5SZWFkV3JpdGUiLCJzaWduaW5fc3RhdGUiOlsiaW5rbm93bm50d2siLCJrbXNpIl0sInN1YiI6IkdweUZlaFhjU01JTWl3TEVzY0dEMldwb2RYN0NfcXBudENTSHBKS21kckEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1bmlxdWVfbmFtZSI6ImdlcmVuQG1pY3Jvc29mdC5jb20iLCJ1cG4iOiJnZXJlbkBtaWNyb3NvZnQuY29tIiwidXRpIjoiSmFxdm1DWnVBVXFlZWVqd1ZvMEdBQSIsInZlciI6IjEuMCIsInhtc190Y2R0IjoxMjg5MjQxNTQ3fQ.kEAiJ74deZSf8sDnj4TD-fKUsTixD-uvh1twhjrofexdeseTU2clzZkGH0q7Ksy1ydXjksOL0YC7ukI0-2HaaapZaY-Wwam4U1GtJ3btPZN2VNr-UdSwycbbLpBb2Npg9KvWBq3Nx2_x8cfKFl2OL_G8POlDHRWQW7Ol6aCNPcp9V7CPPaVg-9N2AMvmIBbnWpQxOvtVe5v5kEZsUDKUiUx2TAfMCsZTNOk1gIs7xJllPjWhFkcX95u4Pny-nli21UGWTiPf7BYBzMEJzZ6v7N9TYRWzhzEcsGIOihFfSv7Ntds8uM3gmjcPDphQbCamsw5cKY_p7Bt9aTHZPcDZrw";

module.exports = app => {
    app.get('/nameditem', (req, res) => {
        console.log("~~~GET NAMED ITEM~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);

        const url = "https://graph.microsoft.com/beta/me/drive/items/01JASD364CH44JPTPRX5BI45G7UV6QTHVE/workbook/names('test2')/range";
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };
    
        axios.get(url, config)
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

    app.post('/nameditem', (req, res) => {
        console.log("~~~POST NAMED ITEM~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);

        const url = "https://graph.microsoft.com/beta/me/drive/items/01JASD364CH44JPTPRX5BI45G7UV6QTHVE/workbook/names/add";
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: {
                "name": "test",
                "reference": "=Sheet1!$A$1:$B$2",
                "comment": "Comment for the named item"
            }
        };
    
        axios.post(url, config)
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

    app.post('/codeless/metadata/datasets/default/query/pq', (req, res) => {
        console.log("~~~POST POWERQUERY OTHER TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        // console.log(req.headers.authorization);
        res.status(200).send({
            success: true
        });
    });

    app.post('/codeless/datasets/default/query/pq', (req, res) => {
        console.log("~~~POST POWERQUERY TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        // console.log(req.headers.authorization);
        res.status(200).send({
            success: true
        });
    });

    app.get('/datasets/default/rootfolders', (req, res) => {
        console.log("~~~GET ROOTFOLDERS OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        // console.log(req.headers.authorization);
        res.status(200).send(
            [{
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
            [{
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

    app.get('/connector/popup', (req, res) => {
        console.log("~~~GET POPUP PARAM~~~");
        if (!req.body || !req.query) {
            res.status(404).send({
                error: 'no data'
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
            })
        }
    });

    app.post('/connector/scripts', (req, res) => {
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
        // console.log("\n~~~~~~~~~~~~~~~~\n");
        if (req.query.location.toLowerCase() === "redmond") {
            // if (userId === "1c889869-3278-480c-a242-7969a8224162") {
            //     res.status(200).send({scripts: [{script: "gerenRedmondScript1"}, {script: "dynamicSchema0"}]})
            // } else {
            res.status(200).send({
                scripts: [{
                    script: "someoneRedmondScript1",
                    id: "soguh348tvb349vtge8rt"
                }, {
                    script: "dynamicSchema1",
                    id: "974fg843gf843g4f"
                }]
            })
            // }
        } else {
            // if (userId === "1c889869-3278-480c-a242-7969a8224162") {
            //     res.status(200).send({scripts: [{script: "gerenScript1"}, {script: "dynamicSchema2"}]})
            // } else {
            res.status(200).send({
                scripts: [{
                    script: "script1",
                    id: "hrf834g9tn48"
                }, {
                    script: "dynamicSchema3",
                    id: "4rcn438tvn348"
                }]
            })
            // }
        }
        // }
        // }
    });

    app.post('/connector/user', (req, res) => {
        console.log("~~~GET TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        res.status(200).send({
            success: "succeeded"
        });
    });

    app.post('/connector/execute', (req, res) => {
        console.log("~~~POST EXECUTE OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        res.status(200).send({
            retStr: "TEST RET STRING ",
            retInt: 2525,
            retArr: ["str1", "str2", "str3"]
        });
    });

    app.post('/connector/execute/:drive/:file', (req, res) => {
        console.log("~~~POST EXECUTE OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        res.status(200).send({
            retStr: "TEST RET STRING ",
            retInt: 2525,
            retArr: ["str1", "str2", "str3"]
        });
    });

    app.get('/v1.0/drives/:drive/items/:file/workbook/worksheets', (req, res) => {
        console.log("~~~GET FILE PICKER OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        res.status(200).send({
            success: "succeeded"
        });
    });

    app.get('/connector/schema', (req, res) => {
        console.log("~~~GET SCHEMA PARAM~~~");
        if (!req.body || !req.query) {
            res.status(404).send({
                error: 'no data'
            });
        } else {
            console.log(req.query);
            if (req.query.schemaScript.indexOf("redmond") !== -1) {
                res.status(200).send({
                    Schema: {
                        type: "object",
                        properties: {
                            tableName: {
                                type: "string",
                                "x-ms-summary": "Table Name"
                            },
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
            } else {
                res.status(200).send({
                    Schema: {
                        type: "object",
                        properties: {
                            consent: {
                                description: "You need to give consent",
                                type: "string",
                                enum: [
                                    "Yes",
                                    "No"
                                ],
                                "x-ms-summary": "You have not consented to this script"
                            },
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
        }
    });

    app.get('/connector/schemaresponse', (req, res) => {
        console.log("~~~GET SCHEMA RESPONSE~~~");
        if (!req.body || !req.query) {
            res.status(404).send({
                error: 'no data'
            });
        } else {
            console.log(req.query);
            if (req.query.schemaScript.indexOf("dynamicSchema") !== -1) {
                res.status(200).send({
                    Schema: {
                        type: "object",
                        properties: {
                            retStr: {
                                type: "string"
                            },
                            retInt: {
                                type: "integer"
                            },
                            retArr: {
                                type: "array"
                            }
                        }
                    }
                });
            } else {
                res.status(200).send({
                    Schema: {
                        type: "object",
                        properties: {
                            otherRetStr: {
                                type: "string"
                            },
                            otherRetInt: {
                                type: "integer"
                            },
                            otherRetArr: {
                                type: "array"
                            }
                        }
                    }
                });
            }
        }
    });

    app.post('/api/contacts/:name', (req, res) => {
        console.log("~~~GET TEST OPERATION~~~");
        console.log(`RECEIVED QUERY: ${JSON.stringify(req.query, null, 2)}`);
        console.log(`RECEIVED PARAM: ${JSON.stringify(req.params, null, 2)}`);
        console.log(`RECEIVED BODY: ${JSON.stringify(req.body, null, 2)}`);
        res.status(200).send({
            success: "succeeded"
        });
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