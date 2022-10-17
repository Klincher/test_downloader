const fs = require("fs");
const https = require("https");
// const download = require("download");

var courses = require("./course.json");

let currentChapter;
const countAll = courses.length;

courses.forEach((element) => {
  if (element.type === "chapter") {
    currentChapter = element;
    let dir =
      "./" + (countAll - parseInt(element.order)) + " - " + element.title;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    console.log("Folders is created");
    return;
  }

  let lectureOrder =
    countAll -
    parseInt(element.order) -
    (countAll - parseInt(currentChapter.order));

  let dirTitle =
    "./" +
    (countAll - parseInt(currentChapter.order)) +
    " - " +
    currentChapter.title +
    "/" +
    lectureOrder +
    " - " +
    element.title;

   https.get(element.url, (response) => {
    console.log('dirTitle + ".mp4" :>> ', dirTitle + ".mp4");
    const file = fs.createWriteStream(dirTitle + ".mp4");
    response.pipe(file);

    // after download completed close filestream
    file.on("finish", () => {
      file.close();
      console.log("Download Completed");
    });
  });
});
