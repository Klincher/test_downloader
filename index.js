const fs = require('fs');

var courses = require('./course.json');

let currentChapter;
const countAll = courses.length;

courses.forEach(element => {
    if (element.type === 'chapter') {
        currentChapter = element;
        let dir = './' + (countAll - parseInt(element.order)) + ' - ' + element.title;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        console.log('Folders is created');
        return;
    }

    let lectureOrder = ((countAll - parseInt(element.order)) - (countAll - parseInt(currentChapter.order)));

    let dirTitle = './' + (countAll - parseInt(currentChapter.order)) + ' - ' + currentChapter.title + '/' + lectureOrder  + ' - ' + element.title;

    if (!fs.existsSync(dirTitle)){
        fs.mkdirSync(dirTitle);
    }
});
