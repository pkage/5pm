import {DateTime, Duration} from 'https://moment.github.io/luxon/es6/luxon.js';

// one hour in milliseconds
const ONE_HOUR = 1000 * 60 * 60

const zones = {
    '-12': 'the United States Minor Outlying Islands',
    '-11': 'American Samoa',
    '-10': 'Honolulu, Hawaii',
     '-9': 'Anchorage, Alaska',
     '-8': 'Los Angeles, California',
     '-7': 'Denver, Colorado',
     '-6': 'Chicago, Illinois',
     '-5': 'Boston, Massachusetts',
     '-4': 'Santiago, Chile',
     '-3': 'Rio de Janeiro, Brazil',
     '-2': 'South Georgia and the South Sandwich Islands',
     '-1': 'Nuuk, Greenland',
      '0': 'London, England',
      '1': 'Warsaw, Poland',
      '2': 'Vilnius, Lithuania',
      '3': 'Moscow, Russia',
      '4': 'Tbilisi, Georgia',
      '5': 'Tashkent, Uzbekistan',
      '6': 'Almaty, Kazakhstan',
      '7': 'Bangkok, Thailand',
      '8': 'Hong Kong',
      '9': 'Seoul, South Korea',
     '10': 'Sydney, Australia',
     '11': 'Port Moresby, Papua New Guinea',
     '12': 'Auckland, New Zealand'
}

const get5pm = () => {
    let i = -12;
    while (i <= 12) {
        let search = DateTime.utc().plus(i * ONE_HOUR)
        if (search.hour >= 17 && search.hour < 18) {
            return i
        }
        i++
    }

    return i
}

const update = () => {
    const offset = get5pm()
    const place = zones[offset.toString()]


    const time = DateTime.utc().plus(offset * ONE_HOUR)

    document.querySelector('#where')
        .innerText = `in ${place}`

    document.querySelector('#time')
        .innerText = `${time.hour % 12}:${time.minute < 10 ? '0' + time.minute : time.minute} ${time.hour > 12 ? 'pm' : 'am'} (UTC${offset > 0 ? '+' : ''}${offset})`
        

    setTimeout(update, 1000)
}

window.onload = update()

