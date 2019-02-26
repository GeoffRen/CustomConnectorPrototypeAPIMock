var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

console.log("\n~~~STARTING TEST~~~\n")
// const url = "http://localhost:8080/connector/scripts"
// const url = "http://localhost:8080/connector/functions"
const url = "http://10.122.13.61:8080/connector/functions"
const Http = new XMLHttpRequest()
Http.open("POST", url)
Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
Http.send(JSON.stringify({script: "script1"}));
Http.onreadystatechange=(e)=>{
    console.log(e)
    console.log(Http.responseText)
}