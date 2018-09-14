
const fs = require('fs');

const rl = fs.createReadStream('./input/Indicators.csv');

const j3 = [];
const arurban = [];
const arrural = [];
const finalar = [];
const coun = [];
const countr = [];
const finalc = [];

const countries = ['India', 'Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei',
  'Cambodia', 'China', 'Cyprus', 'Georgia', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan',
  'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'North Korea', 'Oman',
  'Pakistan', 'Palestine', 'Philippines', 'Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'South Korea',
  'Sri Lanka', 'Syria', 'Taiwan', 'Tajikistan', 'Thailand', 'Timor-Leste', 'Turkey', 'Turkmenistan',
  'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'];

rl.setEncoding('utf8');

let firstline = 0;
let Y;
let I;
let C;
let V;

rl.on('data', function (line) {
  const lineSplit = line.split('\n');

  if (firstline === 0) {
    Y = lineSplit[0].split(',').indexOf('Year');
    I = lineSplit[0].split(',').indexOf('IndicatorName');
    C = lineSplit[0].split(',').indexOf('CountryName');
    V = lineSplit[0].split(',').indexOf('Value');
    firstline+=1;
  }

  else {
    lineSplit.forEach(function (lin) {
    filterLine(lin);
    });

    }
});

function filterLine(lin) {
    let elements = lin.split(",");

    if (elements[C] == "India") {
        if (elements[Y] >= 1960 && elements[Y] <= 2015) {
            if (elements[I].includes("Urban population (% of total")) {
                let outobj = {
                    //country: elements[C].trim(),
                    //indicator: elements[I].trim(),
                    yr: elements[Y].trim(),
                    urban_value: elements[V].trim(),
                }
                arurban.push(outobj);

            }
            else if (elements[I].includes("Rural population (% of total populat")) {
                let outobj = {
                    //country: elements[C].trim(),
                    //indicator: elements[I].trim(),
                    yr: elements[Y].trim(),
                    rural_val: elements[V].trim(),
                }
                arrural.push(outobj);
            }
            else if (elements[I].includes("Urban population growth (annual")) {
                let outobj = {
                    country: elements[C].trim(),
                    indicator: elements[I].trim(),
                    yr: elements[Y].trim(),
                    val: elements[V].trim(),
                }
                j3.push(outobj);
            }

        }
    }

    for (let i = 0; i < countries.length; i++) {
        if (countries[i] === elements[C]) {
            if (elements[I] === "Urban population") {
                let outobj = {
                    country: elements[C].trim(),
                    yr: elements[Y].trim(),
                    indicator1: elements[I].trim(),

                    uval: elements[V].trim(),
                }
                coun.push(outobj);
            }
            else if (elements[I] === "Rural population") {
                let outobj = {
                    country: elements[C].trim(),
                    yr: elements[Y].trim(),
                    indicator2: elements[I].trim(),

                    rval: elements[V].trim(),
                }
                countr.push(outobj);
            }

        }
    }
}

function writeToFile(filename, result) {
    var json = JSON.stringify(result);
    fs.writeFile(filename, json, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Check the graphs");
        }
    });
}

rl.on('end', function () {
    // console.log(arrural);
    // console.log(arurban);
    for (i = 0; i < arrural.length; i++) {
        for (j = 0; j < arurban.length; j++) {
            if (i === j) {
                let temp_Obj = Object.assign(arrural[j], arurban[j]);
                //console.log(temp_Obj);
                /**********  pushing the objects to Array of Objects  *********/
                finalar.push(temp_Obj);

            }
        }
    }
    for (i = 0; i < coun.length; i++) {
        for (j = 0; j < countr.length; j++) {
            if (i === j) {
                let temp_Obj = Object.assign(coun[j], countr[j]);
                //console.log(temp_Obj);
                /**********  pushing the objects to Array of Objects  *********/
                finalc.push(temp_Obj);

            }
        }
    }
    // console.log(finalar);

    var myJSON = JSON.stringify(finalar);
    var mJSON = JSON.stringify(finalc);
    fs.writeFile("./output/part1.json", myJSON, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        fs.writeFile("./output/part4.json", mJSON, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
    });

    // writeToFile("part1.json",j1);
    // writeToFile("part2.json",j2);
    writeToFile("./output/part3.json", j3);
    //writeToFile("part4.json",j4);
    // writeToFile("part5.json",j5);
    // console.log(j1.length);
    // console.log(j2.length);
    // console.log(j3.length);
    // console.log(j4.length);
    // console.log(j5.length);

});
//     var lineSplit = line.split(',');
//     let count1=0;
//     let count2=0;
//     if (firstline == 0) {
//         Y = lineSplit.indexOf('Year');
//         I = lineSplit.indexOf('IndicatorName');
//         C = lineSplit.indexOf('CountryName');
//         V = lineSplit.indexOf('Value');
//         firstline++;
//     }

//     else {

//         if (lineSplit[Y] >= 1960 && lineSplit[Y] <= 2015) {
//             if (lineSplit[C] === "India") {


//                 if (lineSplit[I].includes("Urban population (% of total")) {
//                     count1 +=1;
//                     // outobj = {
//                     //     country: lineSplit[C].trim(),
//                     //     indicator: lineSplit[I].trim(),
//                     //     yr: lineSplit[Y].trim(),
//                     //     val: lineSplit[V].trim()
//                     // }
//                 }

//                 else if (lineSplit[I].includes("Rural population (% of total")) {
//                    count2 +=1;

//                     // outobj = { console.log('rural population total');
//                     //     country: lineSplit[C].trim(),
//                     //     indicator: lineSplit[I].trim(),
//                     //     yr: lineSplit[Y].trim(),
//                     //     val: lineSplit[V].trim()
//                     }
//                 }


//             }

//         }
//         console.log(count1+"  "+count2);
// });


// rl.on('close', function (line) {
//     myWriteStream1.write(JSON.stringify(outobj, null, 2));
// });