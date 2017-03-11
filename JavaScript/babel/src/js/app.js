const myLib = require('./myLib');

const main = () => {
  const h1 = document.getElementsByTagName('h1')[0];
  h1.textContent = myLib.message;
};

main();
