const http = require("http");
const fs = require("fs");

let host = "localhost";
let port = 80;

const server = http.createServer(function (request, response)
{
    response.statusCode = 200;
    console.log(request)
    let url = request.url;
    try
    {
        if (!fs.lstatSync(__dirname + url).isDirectory()) //Checks if the request is a file. If successful, responds with the file.
        {
            response.end(fs.readFileSync(__dirname + url));

        }
        else if (url == "/")
        {
            response.end(fs.readFileSync("./index.html"));
        }
    }
    catch (e)
    {
        console.log("An error occured when attempting to get a file:\n" + request.url)
    }
    response.end();
});

server.on("error", (err) =>
{
    console.log("An error occured");
})

server.listen(port, host, () => 
{
    console.log(`The server is up at http://${host}:${port}`);
});