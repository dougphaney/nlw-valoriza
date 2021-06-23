import express from 'express';

const app = express();

app.get("/", (request, response) => {
  return response.send("Hello World - Get");
});

app.post("/", (request, response) => {
  return response.send("Hello World - Post");
})

app.listen(3000, () => console.log("Server is running"))