import React from "react";
const { renderToString } = require("react-dom/server");
const { ServerStyleSheet } = require("styled-components");
const Html = require("../../static/html");
const NotFound = require("../../views/notFound");

const notFoundPage = (req, res) => {
  const title = "Server side Rendering with Styled Components";
  const sheet = new ServerStyleSheet(); // <-- creating out stylesheet
  const body = renderToString(sheet.collectStyles(<NotFound />));
  const styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet

  const content = Html({ body, title, styles });

  res.send(content);
};

module.exports = notFoundPage;
