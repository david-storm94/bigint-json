function parse (input) {
     if (!input) {
          throw new Error('Invalid input')
     }

     if (typeof input !== "string") {
          throw new Error('TypeError: Do not know to parse a ' + typeof input);
     }

     const parsed = JSON.parse(input);

     return stringToBigint(parsed);
}


function stringToBigint(o) {
     Object.keys(o).forEach(k => {
          if (typeof o[k] === 'object') {
               return stringToBigint(o[k]);
          }


          if (typeof o[k] === "string") {
               if (/^\d+n$/.test(o[k])) {
                    o[k] = BigInt(o[k].substring(0, o[k].length - 1));
                    // console.log(o[k]);
               }
          }
     });
     return o;
}


module.exports = parse;