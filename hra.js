'use strict';

let tah = 'kruzok';

const pridajZnak = (event) => {
  const hracNaTahu = document.querySelector('.symbolHraca');
  if (tah === 'kruzok') {
    event.target.classList.add('hraciePoleKruzok');
    event.target.disabled = true;
    if (jeToVitaznyTah(event.target) === true) {
      const potvrdenie = confirm('Vyhral krúžok. Spustiť novú hru?');
      if (potvrdenie === true) {
        location.reload();
      }
    }
    hracNaTahu.src = 'Podklady-obrazky/cross.svg';
    tah = 'krizik';
  } else {
    event.target.classList.add('hraciePoleKrizik');
    event.target.disabled = true;
    if (jeToVitaznyTah(event.target) === true) {
      const potvrdenie = confirm('Vyhral krížik. Spustiť novú hru?');
      if (potvrdenie === true) {
        location.reload();
      }
    }
    hracNaTahu.src = 'Podklady-obrazky/circle.svg';
    tah = 'kruzok';
  }
};
const policko = document.querySelectorAll('.hraciePole__tlacitko');
policko.forEach((policko) => policko.addEventListener('click', pridajZnak));

const ziskajSymbol = (pole) => {
  if (pole.classList.contains('hraciePoleKruzok')) {
    return 'kruh';
  } else if (pole.classList.contains('hraciePoleKrizik')) {
    return 'kriz';
  }
};

const velkostPola = 10; // 10x10
const polia = document.querySelectorAll('.hraciePole__tlacitko');
const ziskajPole = (riadok, stlpec) => polia[riadok * velkostPola + stlpec];

const ziskajPolohu = (pole) => {
  let poleIndex = 0;
  while (poleIndex < polia.length && pole !== polia[poleIndex]) {
    poleIndex++;
  }
  return {
    riadok: Math.floor(poleIndex / velkostPola),
    stlpec: poleIndex % velkostPola,
  };
};

const vitazneSymboly = 5;

const jeToVitaznyTah = (pole) => {
  const symbol = ziskajSymbol(pole);
  const zakladna = ziskajPolohu(pole);

  let i;
  let a;

  //Kontrola riadkov:
  let vRiadku = 1;
  i = zakladna.stlpec;
  while (i > 0 && symbol === ziskajSymbol(ziskajPole(zakladna.riadok, i - 1))) {
    vRiadku++;
    i--;
  }

  i = zakladna.stlpec;
  while (
    i < velkostPola - 1 &&
    symbol === ziskajSymbol(ziskajPole(zakladna.riadok, i + 1))
  ) {
    vRiadku++;
    i++;
  }

  if (vRiadku >= vitazneSymboly) {
    return true;
  }

  //Kontrola stlpcov:
  let vStlpci = 1;
  i = zakladna.riadok;
  while (i > 0 && symbol === ziskajSymbol(ziskajPole(i - 1, zakladna.stlpec))) {
    vStlpci++;
    i--;
  }

  i = zakladna.riadok;
  while (
    i < velkostPola - 1 &&
    symbol === ziskajSymbol(ziskajPole(i + 1, zakladna.stlpec))
  ) {
    vStlpci++;
    i++;
  }

  if (vStlpci >= vitazneSymboly) {
    return true;
  }

  //Kontrola diagonal:
  //sikmo hore dolava:
  let diagonalneLavo = 1;
  i = zakladna.riadok;
  a = zakladna.stlpec;
  while (i > 0 && a > 0 && symbol === ziskajSymbol(ziskajPole(i - 1, a - 1))) {
    diagonalneLavo++;
    i--;
    a--;
  }

  //sikmo dole doprava
  i = zakladna.riadok;
  a = zakladna.stlpec;
  while (
    i < velkostPola - 1 &&
    a < velkostPola - 1 &&
    symbol === ziskajSymbol(ziskajPole(i + 1, a + 1))
  ) {
    diagonalneLavo++;
    i++;
    a++;
  }
  if (diagonalneLavo >= vitazneSymboly) {
    return true;
  }

  //sikmo hore doprava
  let diagonalnePravo = 1;
  i = zakladna.riadok;
  a = zakladna.stlpec;
  while (
    a < velkostPola - 1 &&
    i > 0 &&
    symbol === ziskajSymbol(ziskajPole(i - 1, a + 1))
  ) {
    diagonalnePravo++;
    i--;
    a++;
  }

  //sikmo dole dolava
  i = zakladna.riadok;
  a = zakladna.stlpec;
  while (
    i < velkostPola - 1 &&
    a > 0 &&
    symbol === ziskajSymbol(ziskajPole(i + 1, a - 1))
  ) {
    diagonalnePravo++;
    i++;
    a--;
  }
  if (diagonalnePravo >= vitazneSymboly) {
    return true;
  }

  return false;
};
