const csv = require('csv-parser');
const fs = require('fs');

const results = []
const dirname = './input/'
const output = './output/'

fs.readdir(dirname, function(err, filenames) {
    if (err) {
        console.log("error", error)
    }
    filenames.forEach(function(filename) {
        fs.createReadStream(dirname + filename)
            .pipe(csv({separator: '\t'}))
            .on('data', (row) => {
                console.log('row1', row);
                results.push(row)
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                const stringifiedResults = JSON.stringify(results)
                fs.writeFile(`${output}${filename.substr(0, filename.lastIndexOf(".")) + ".txt"}`, stringifiedResults, (err) => {
                    if (err) console.log(err);
                    console.log("Successfully Written to File.");
                });
            });
    });
});


