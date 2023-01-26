const fs = require("fs");

(function () {


  fs.readdir("./", { withFileTypes: true }, (err, files) => {
    if (err) {
      throw err;
    } else {
      const content = []
      files.forEach(item => {
        if (item.isDirectory()) {
          const dir = fs.readdirSync(`./${item.name}`);
          content.push(dir);
        } else {
          content.push(item.name);
        }
      })
      console.log(content);
    }
  })
})();

//For the next one, let's open a folder and read all it's files and the file's contents;
