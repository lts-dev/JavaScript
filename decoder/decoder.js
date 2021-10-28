const dictionary = ['','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function decoder(input) {
    let charArr = String(input).split('');
    const codes = [];
    const possibleCodes = {};
    for(let i = 0; i < charArr.length; i++) {
        possibleCodes[i] = [];
        const joinChar = parseInt(charArr[i] + charArr[i + 1]);
        if (joinChar <= 26) {
            if (i > 0) {
                for(let j = 0; j < i; j++) {
                    possibleCodes[i].push(charArr[j]);
                }
            }

            possibleCodes[i].push(joinChar);

            if ((i + 2) < charArr.length) {
                for(let k = i + 2; k < charArr.length; k++) {
                    possibleCodes[i].push(charArr[k]);
                }
            }
        }
    }

    const keys = Object.keys(possibleCodes);
    for (let x = 0; x < keys.length; x++) {
        const item = possibleCodes[keys[x]];
        item.length > 0 && codes.push(getCode(item));
    }
    
    return codes;
}

function getCode(item) {
    const code = [];
    for(let i = 0; i < item.length; i++) {            
        code.push(dictionary[parseInt(item[i])]);
    }

    return code.join('');
}


decoder(1221);

function decoderPlus(input) {
    const charArr = String(input).split('');
    let codes = [];
    const mapedArr = charArr.map((i, j) =>  [i, charArr[j + 1] ? i + charArr[j + 1] : '']);
    const comb = getCombinations([...mapedArr.flat(1)]);
    const matchedString = charArr.join('');

    comb.forEach((item) => {
        const combString = item.join('');
        if (combString === matchedString) {
            codes.push(item);
        }
    });

    const decoded = [];
    codes.forEach((item) => {
        decoded.push(getCode(item));
    });

    return [...new Set(decoded)];
}

function getCombinations(valuesArray) {
    const combi = [];
    let temp = [];
    const slent = Math.pow(2, valuesArray.length);

    for (var i = 0; i < slent; i++) {
        temp = [];
        for (var j = 0; j < valuesArray.length; j++)  {
            if ((i & Math.pow(2, j)) && valuesArray[j]) {
                temp.push(valuesArray[j]);
            }
        }
        if (temp.length > 0) {
            combi.push(temp);
        }
    }

    return combi;
}

decoderPlus(1221);