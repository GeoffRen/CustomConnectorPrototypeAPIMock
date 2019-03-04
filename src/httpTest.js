var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

console.log("\n~~~STARTING TEST~~~\n")

const ip = "13.58.89.80"
// const ip = "10.122.13.61"

// const url1 = `http://${ip}:8080/connector/scripts`
// const Http1 = new XMLHttpRequest()
// Http1.open("POST", url1)
// Http1.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
// Http1.send(JSON.stringify({user: "geren"}));
// Http1.onreadystatechange=(e)=>{
//     console.log(e)
//     console.log(Http1.responseText)
// }

// const url2 = `http://${ip}:8080/connector/functions`
// const Http2 = new XMLHttpRequest()
// Http2.open("POST", url2)
// Http2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
// Http2.send(JSON.stringify({script: "script1"}));
// Http2.onreadystatechange=(e)=>{
//     console.log(e)
//     console.log(Http2.responseText)
// }

// const url3 = `http://${ip}:8080/connector/execute`
// const Http3 = new XMLHttpRequest()
// Http3.open("POST", url3)
// Http3.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
// Http3.send(JSON.stringify({script: "script1"}));
// Http3.onreadystatechange=(e)=>{
//     console.log(e)
//     console.log(Http3.responseText)
// }

const graphUrl = `https://graph.microsoft.com/v1.0/me`
const graphHttp = new XMLHttpRequest()
graphHttp.open("GET", graphUrl)
// graphHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
graphHttp.send();
graphHttp.onreadystatechange=(e)=>{
    console.log(e)
    console.log(graphHttp.responseText)
}