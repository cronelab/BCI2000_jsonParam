const fs = require('fs');

let file = fs.readFileSync('CCEPS_old.prm', 'utf-8');
let allData = file.split('\n')
let data = {}

let entryCountHolder = []
allData.forEach((line, i) => {
    let entry = line.split('=')[0].split(':');
    let firstEntry = entry[0]
    entryCountHolder.push(1)
    data[firstEntry] = {}
});
allData.forEach((line, i) => {
    let entry = line.split('=')[0].split(':');
    let firstEntry = entry[0];
    let secondEntry = entry[1];
    if (secondEntry.split(' ').length < 2) {
        entryCountHolder[i] = 2
        data[firstEntry][secondEntry] = {}
    } else {
        data[firstEntry][secondEntry.split(' ')[0]] = {}
    }
});
allData.forEach((line, i) => {
    let entry = line.split('=')[0].split(':');
    let firstEntry = entry[0];
    let secondEntry = entry[1];
    let thirdEntry = entry[2];
    if (thirdEntry != undefined) {
        if (secondEntry.split(' ').length < 2) {
            entryCountHolder[i] = 3
            data[firstEntry][secondEntry][thirdEntry.split(' ')[0]] = {}
        } else {
            data[firstEntry][secondEntry.split(' ')[0]][thirdEntry.split(' ')[0]] = {}
        }
    }
});
allData.forEach((line, i) => {
    let entry = line.split('=')[0].split(':');
    let firstEntry = entry[0];
    let secondEntry = entry[1];
    let thirdEntry = entry[2];

    let fourthEntry = line.split('=')[0].split(' ')[line.split('=')[0].split(' ').length - 1];
    if (entryCountHolder[i] == 1) {
        data[firstEntry][secondEntry.split(' ')[0]][fourthEntry] = {}
    } else {
        if (thirdEntry != undefined) {
            if (secondEntry.split(' ').length < 2) {
                data[firstEntry][secondEntry][thirdEntry.split(' ')[0]][fourthEntry] = {}
            } else {
                data[firstEntry][secondEntry.split(' ')[0]][thirdEntry.split(' ')[0]][fourthEntry] = {}
            }
        }
    }
    let NfirstEntry = line.split('=')[1].split(':');
    // let NlastEntry = NfirstEntry[2].split(' ');
    console.log(NfirstEntry)
});

// // console.log(firstEntry[2].split('=')[1].split('//')[0].trim(' ').split(' '))

// if (lastEntry[1] == 'int' || lastEntry[1] == 'float' || lastEntry[1] == 'string') {
//     data[firstEntry[0]][firstEntry[1]][firstEntry[2].split(' ')[0]][lastEntry[2].split('=')[0]] = {
//         DataType: lastEntry[1],
//         Value: firstEntry[2].split('=')[1].split('//')[0].trim(' ').split(' ')[0],
//         DefaultValue: firstEntry[2].split('=')[1].split('//')[0].trim(' ').split(' ')[1],
//         LowRange: firstEntry[2].split('=')[1].split('//')[0].trim(' ').split(' ')[2],
//         HighRange: firstEntry[2].split('=')[1].split('//')[0].trim(' ').split(' ')[3]
//     }
// } else if (lastEntry[1] == 'intlist') {
//     let dataValues = firstEntry[2].split('=')[1].split('//')[0].trim(' ').split(' ')
//     dataValues.shift()
//     console.log()
//     data[firstEntry[0]][firstEntry[1]][firstEntry[2].split(' ')[0]][lastEntry[2].split('=')[0]] = {
//         DataType: lastEntry[1],
//         NumValue: firstEntry[2].split('=')[1].split('//')[0].trim(' ').split(' ')[0],
//         Values: dataValues.join(' ')
//     }
// }


fs.writeFileSync('CCEPS_old.json', JSON.stringify(data));