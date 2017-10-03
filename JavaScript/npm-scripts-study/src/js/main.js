import lib from './lib';

const main = () => {
  const h1 = document.getElementsByTagName('h1')[0];
  h1.textContent = lib.message;
};

main();
