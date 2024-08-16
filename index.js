const express = require("express");
const axios = require("axios");
const serverless = require("serverless-http");
require("dotenv").config();

const app = express();
app.use(express.json());

const API_URL = "https://api.manyapis.com/v1-create-short-url";
const API_KEY = process.env.API_KEY;

app.post("/url", async (req, res) => {
  try {
    const { url, expiry } = req.body; //Take body from POSTMAN/from frontend

    //check if url or expiry field is empty
    if (!url || !expiry) {
      return res
        .status(400)
        .json({ error: "Please provide valid URL and expiry time" });
    }

    //API body and headers
    const inputBody = { url, expiry };
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-api-key": API_KEY,
    };

    //Use axios to connect/send request to external api
    const response = await axios.post(API_URL, inputBody, { headers });

    //send back status and response
    return res.status(response.status).json(response.data);

  } catch (error) {

    //send back error status
    return res.status(500).json({ error: "Failed to shorten URL." });
  }
});

module.exports.handler = serverless(app);
