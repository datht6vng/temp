var express = require('express');
var router = express.Router();
var connection = require("../model/connect.js");
var path = require("path");
var shortid = require('shortid');
var validUrl = require('valid-url');
var { findLongUrl, findShortUrl } = require('../model/findUrl.js');
var saveUrl = require('../model/saveUrl.js');
var baseUrl = "http://localhost:8080/"
/* GET home page. */
router.get('/', (req, res) => {
  res.render("index");
});
router.get('/check-db', (req, res) => {
  connection.query(`SELECT NOW()`, (err, result) => {
    if (err) return res.status(200).send(err);
    res.status(200).send(result);
  });
});
router.post('/gen-url', (req, res) => {
  findLongUrl(connection, req.body.url, (err, result) => {
    if (err) res.send(err);
    if (result.length > 0) return res.send(baseUrl + result[0].SHORT_URL);
    if (!validUrl.isUri(req.body.url)) res.send("Invalid URL");
    let shortUrl = shortid.generate();
    saveUrl(connection, shortUrl, req.body.url, (err, result) => {
      if (err) return res.send("Error\n");
      res.send(baseUrl + shortUrl);
    });
  });
});
router.get('/init-db', (req, res) => {
  connection.query(
    `
  CREATE TABLE IF NOT EXISTS URL (
    SHORT_URL VARCHAR(500) PRIMARY KEY,
    LONG_URL VARCHAR(500)
  )
  `,
    // CREATE INDEX LONG_URL_INDEX ON URL(LONG_URL) USING HASH;
    (err, result) => {
      if (err) return res.send("Error!\n" + err.sqlMessage);
      res.send(result);
    });
});
router.get('/:url', (req, res) => {
  findShortUrl(connection, req.params.url, (err, result) => {
    if (err) return res.send("Error!\n" + err.sqlMessage);
    if (result.length == 0) return res.send("Not Found!");
    res.redirect(result[0].LONG_URL);
  });
});
module.exports = router;
