export const getOdd = (x, y, z) => {
  console.log(x)
  console.log(y)
  console.log(z)
  let arrayOdds = []
  if (x.length) {
    console.log('oi')
    x.map((item) => {
      if (item[0].slug === y.code || item[0].name === y.name) {
        console.log([item[0].odd, item[1].odd])
        arrayOdds = [item[0].odd, item[1].odd];
      }
      else if (item[1].slug === y.code || item[1].name === y.name) {
        arrayOdds = [item[1].odd, item[0].odd];
      }
      else if (item[0].slug === z.code || item[0].name === z.name) {
        arrayOdds = [item[1].odd, item[0].odd];
      }
      else if (item[1].slug === z.code || item[1].name === z.name) {
        arrayOdds = [item[0].odd, item[1].odd];
      }
      else arrayOdds = ["——", "——"];
    });
  }
  return arrayOdds
};
