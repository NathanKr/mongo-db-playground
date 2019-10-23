const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.json());

const routerHelper = require("./library_engine");

app.get("/books", (req, res) => {
  routerHelper.handleGet(req, res);
});

app.delete("/books/:id", (req, res) => {
  routerHelper.handleDelete(req, res);
});


app.post("/books", (req, res) => {
  routerHelper.handlePost(req, res);
});

app.listen(PORT, () => {
  console.log(`app is listening on port : ${PORT}`);
});
