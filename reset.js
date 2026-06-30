module.exports = {
  run: [{
    method: "script.stop",
    params: {
      uri: ["start.js"]
    }
  }, {
    method: "fs.rm",
    params: {
      path: "app"
    }

  }]
}
