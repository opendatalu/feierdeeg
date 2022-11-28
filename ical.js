import Ical from 'date-holidays-ical'
import fs from 'fs'

const ical = new Ical()

const start = 2020
const year = new Date().getFullYear()
const nrYears = 10
const names = { 
    'de': 'Gesetzliche Feiertage in Luxemburg', 
    'en': 'Legal public holidays in Luxembourg', 
    'fr': 'Jours fériés légaux au Luxembourg', 
    'lb': 'Gesetzlech Feierdeeg zu Lëtzebuerg'
}

function cleanup(str) {
    return str.split(/\r?\n/).slice(4, -2).join('\n')+'\n'
}

['de', 'fr', 'lb', 'en'].forEach((lang) => {
    ical.init('LU', '', '', {'languages': [lang],'types': ['public']})
    let data = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//date/holidays//NONSGML v1.0//EN
NAME:${names[lang]}
X-WR-CALNAME:${names[lang]}
REFRESH-INTERVAL;VALUE=DURATION:PT24H
X-PUBLISHED-TTL:PT24H
METHOD:PUBLISH
`    
    for (let i=start; i<=year+nrYears; i++) {
        data += (cleanup(ical.calendar(i, {name: '', showcode: false, fullday:true})))
    }
    data += `END:VCALENDAR
`
    data = data.split(/\n/).join("\r\n")
    fs.writeFileSync('./out/'+lang+'.ics', data)    
})




