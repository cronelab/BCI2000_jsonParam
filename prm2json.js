const fs = require('fs');

let file = fs.readFileSync('example.prm', 'utf-8');
let allData = file.split('\n')
let data = {}
const map = new Map();

const distinctValues = input => {
    let result = [];
    for (const item of input) {
        if (!map.has(item)) {
            map.set(item, true); // set any value to Map
            result.push(item);
        }
    }
    return result
}


let mainSection = [];
allData.forEach(line => {
    let firstEntry = line.split(':');
    mainSection.push(firstEntry[0])
});
let mainSectionKeys = distinctValues(mainSection)
mainSectionKeys.forEach(name => {
    data[name] = {}
})
allData.forEach(line => {
    let firstEntry = line.split(':');
    data[firstEntry[0]][firstEntry[1]] = {}
});
allData.forEach(line => {
    let firstEntry = line.split(':');
    data[firstEntry[0]][firstEntry[1]][firstEntry[2].split(' ')[0]] = {}
});
allData.forEach(line => {
    let firstEntry = line.split(':');
    let lastEntry = firstEntry[2].split(' ');
    // console.log(firstEntry[2].split('=')[1].split('//')[0].trim(' ').split(' '))

    if (lastEntry[1] == 'int' || lastEntry[1] == 'float' || lastEntry[1] == 'string') {
        data[firstEntry[0]][firstEntry[1]][firstEntry[2].split(' ')[0]][lastEntry[2].split('=')[0]] = {
            DataType: lastEntry[1],
            Value: firstEntry[2].split('=')[1].split('//')[0].trim(' ').split(' ')[0],
            DefaultValue: firstEntry[2].split('=')[1].split('//')[0].trim(' ').split(' ')[1],
            LowRange: firstEntry[2].split('=')[1].split('//')[0].trim(' ').split(' ')[2],
            HighRange: firstEntry[2].split('=')[1].split('//')[0].trim(' ').split(' ')[3]
        }
    } else if (lastEntry[1] == 'intlist') {
        let dataValues = firstEntry[2].split('=')[1].split('//')[0].trim(' ').split(' ')
        dataValues.shift()
        console.log()
        data[firstEntry[0]][firstEntry[1]][firstEntry[2].split(' ')[0]][lastEntry[2].split('=')[0]] = {
            DataType: lastEntry[1],
            NumValue: firstEntry[2].split('=')[1].split('//')[0].trim(' ').split(' ')[0],
            Values: dataValues.join(' ')
        }
    }
});


fs.writeFileSync('pseudowords.json', JSON.stringify(data));