'use strict';

let tah = 'kruzok';

const pridajZnak = (event) => {
  const hracNaTahu = document.querySelector('.symbolHraca');
  if (tah === 'kruzok') {
    event.target.classList.add('hraciePoleKruzok');
    event.target.disabled = true;
    tah = 'krizik';
    hracNaTahu.src = 'Podklady-obrazky/cross.svg';
  } else {
    event.target.classList.add('hraciePoleKrizik');
    event.target.disabled = true;
    tah = 'kruzok';
    hracNaTahu.src = 'Podklady-obrazky/circle.svg';
  }
};
const policko = document.querySelectorAll('.hraciePole__tlacitko');
policko.forEach((policko) => policko.addEventListener('click', pridajZnak));
