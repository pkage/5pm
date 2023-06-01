import {DateTime, Duration} from 'https://moment.github.io/luxon/es6/luxon.js';


const resolve_zones = async () => {
    if (!('zones' in window)) {
        let body = await fetch('./zones.json')
        body =  await body.json()
        window.zones = body.zones
    }
    return window.zones
}

const get5pm = async () => {
    const zones = await resolve_zones()
    const fivepms = []

    for (let zone of zones) {
        try {
            let cand = DateTime.now().setZone(zone.iana)
            if (cand.hour >= 17 && cand.hour < 18) {
                fivepms.push(zone)
            }
        } catch (e) {
            console.log(e)
        }
    }
    
    return fivepms
}

const update = async () => {
    const fivepms = await get5pm()

    // get a random one based on the day of the month
    // this kind of works, zones with more than ~30 zones
    // skip some forever but i think it's fine
    let idx = DateTime.now().day % fivepms.length

    const zone = fivepms[idx]
    const time = DateTime.utc().setZone(zone.iana)

    document.querySelector('#where')
        .innerText = `in ${zone.name}`

    document.querySelector('#time')
        .innerText = `${time.hour % 12}:${time.minute < 10 ? '0' + time.minute : time.minute} ${time.hour > 12 ? 'pm' : 'am'} (${zone.iana})`
        

    setTimeout(update, 1000)
}

window.onload = update()

