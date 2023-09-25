console.log('hello');


// without events on battery, this method runs only on load/refresh page :(
navigator.getBattery()
    .then(battery => {
        // battery info in battery object :)
        console.log(battery);
        console.log(`${battery.level * 100}%`);
        if (battery.charging) {
            console.log('battery on charge');
        } else {
            console.log('battery NOT on charge');
        }

        //but...we can use battery events :)
        //ex: when change battery level...
        battery.addEventListener('levelchange', () => {
            //this runs when battery level change....
            console.log('battery level changed!');
            console.log(`new level: ${battery.level}`);
        });

        // or ex: when charging change...
        battery.addEventListener('chargingchange', () => {
            if (battery.charging) {
                console.log('now battery is on charge..');
            } else {
                console.log('now battery is NOT on charge..');
            }
        });

        /*
        * when battery is disconnected..dischargintime is valued
        * when battery is plugged in, dischargingTime is Infinity

        * in the next part we display this information in the screen :D
        */

    });