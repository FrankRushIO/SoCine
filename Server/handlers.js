// const items = require("./data/items.json");

const getBacon = (req, res) => {
  res.status(200).json({ status: 200, data: "bacon is good" });
};

module.exports = {
  getBacon,
};
