
const fs = require("fs");
const http = require("http");
const url = require("url");
// //blocking - synchronous challenge 1
// const input = fs.readFileSync("./txt/input.txt", "utf-8");
//  console.log(input)

// const output = `hi write this in this in this file and this console ${input} \n created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', output)
// console.log("file written")
// //asynchronous code challenge 2
// fs.readFile("./txt/start.txt", 'utf-8', (err, data) => {
//     console.log(data)
//     fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data1) => {
//         console.log(data1)
// fs.readFile("./txt/append.txt", "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.writeFile("./txt/start.txt", `${data1},\n ${data2}`,"utf-8", err => {
//         console.log("file written")
//     })
// });
//     })
// })




//http requests
const overviewTemplates = fs.readFileSync("./templates/template-overview.html", "utf-8");
const cardTemplates = fs.readFileSync("./templates/card-overview.html", "utf-8");
const productTemplates = fs.readFileSync("./templates/template-product.html", "utf-8");
const data = fs.readFileSync("./dev-data/data.json", "utf-8")
const dataObj = JSON.parse(data)
const templateOverview = (temp,product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
   if (!product.organic)
     output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
       return output
}
const server = http.createServer((req, res) => {
    const{ query,pathname} = url.parse(req.url,true)
    if (pathname === "/overview" || pathname==="/") {
        res.writeHead(200, {
          "content-type": "text/html"
        });
     const tempHtml = dataObj
       .map((el) => templateOverview(cardTemplates, el))
       .join("");

        const output = overviewTemplates.replace("{%PRODUCTCARD%}", tempHtml);
        res.end(output)
    } else if (pathname === "/product") {
      console.log(pathname)
      res.end("welcome to the web server");
    } else if (pathname === "/api") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(data);
    } else {
      res.end("not found");
    }
})
server.listen(3000, "127.0.0.1", () => {
    console.log("listening on port 3000")
})
