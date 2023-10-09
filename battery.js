const livelloBatteria = document.querySelector('#livelloBatteria');
const statoCarica = document.querySelector('#statoCarica');
const tempoScarica = document.querySelector('#tempoScarica');
const livelloBatteriaColore = document.querySelector('#livelloBatteriaColore');

navigator.getBattery().then(battery => {
    console.log(battery);
    aggiornaLivelloBatteria();
    aggiornaStatoCarica();
    aggiornaTempoScarica();


    // eventi
    battery.addEventListener('levelchange', () => {
        aggiornaLivelloBatteria();
    });

    battery.addEventListener('chargingchange', () => {
        aggiornaStatoCarica();
    });

    battery.addEventListener('dischargingtimechange', () => {
        aggiornaTempoScarica();
    });

    // funzioni
    function aggiornaLivelloBatteria() {
        livelloBatteria.innerText = `${battery.level * 100}%`;
        livelloBatteriaColore.style.height = `${battery.level * 100}%`;
        if(battery.level > 0.2 && battery.level < 0.65) {
            livelloBatteriaColore.style.backgroundColor = 'yellow'; 
        } else if(battery.level <= 0.2) {
            livelloBatteriaColore.style.backgroundColor = 'red';
        }
    }

    function aggiornaStatoCarica() {
        if(battery.charging) {
            statoCarica.innerText = 'batteria in carica...';
        } else {
            statoCarica.innerText = 'non in carica.';
        }
    }

    function aggiornaTempoScarica() {
        if(!battery.charging) {
            let tempoScaricaInOreMinuti = trasformaFromSecToHHMM(battery.dischargingTime);
            tempoScarica.innerText = 
                `la batteria si scaricherà fra ${tempoScaricaInOreMinuti}`;
        }
    }

    function trasformaFromSecToHHMM(secondi) {
        let ore = Math.floor(secondi / 3600);
        let minuti = Math.floor((secondi - (ore * 3600)) / 60);
      
        // Padding the values to ensure they are two digits
        if (ore < 10) { ore = "0" + ore; }
        if (minuti < 10) { minuti = "0" + minuti; }
      
        return `${ore}h ${minuti}`;
    }

});

