import Holidays from 'date-holidays'
import fs from 'fs'

const start = 2020
const year = new Date().getFullYear()
const filename = 'holidays'
const nrYears = 10

function cleanup(array) {
    return array.map(e => { 
        e.date = e.date.replace(/\s.+$/, '')
        return e
    }).reduce((obj, item) => {
        return {...obj, [item['date']]: item}
    }, {})
}
  
const hd = new Holidays('LU', '', '', {types: ['public']})

let data = []
for (let i=start; i<=year+nrYears; i++) {

    const currentYear = {}
    hd.setLanguages('en')
    currentYear['en'] = cleanup(hd.getHolidays(i))

    hd.setLanguages('fr')
    currentYear['fr'] = cleanup(hd.getHolidays(i))
    
    hd.setLanguages('de')
    currentYear['de'] = cleanup(hd.getHolidays(i))

    hd.setLanguages('lb')
    currentYear['lb'] = cleanup(hd.getHolidays(i))

    data = data.concat(Object.keys(currentYear['en']).map(e => { 
        return {
            'year': i, 
            'date': e,
            'dayOfWeek': new Date(e).toLocaleString('default', {weekday:'long'}), 
            'en': currentYear['en'][e].name, 
            'fr': currentYear['fr'][e].name, 
            'de': currentYear['de'][e].name, 
            'lb': currentYear['lb'][e].name
        }
    }))
}

fs.writeFileSync('./out/'+filename+'.json', JSON.stringify(data, null, 2))
let csv = 'year, date, day of week, name in english, name in french, name in german, name in luxembourgish'+ "\r\n"
csv += data.map(e => {
     return `${e['year']}, ${e['date']}, ${e['dayOfWeek']}, ${e['en']}, ${e['fr']}, ${e['de']}, ${e['lb']}` + "\r\n"
}).reduce((o,e) => {
    return o+e
}, "")
fs.writeFileSync('./out/'+filename+'.csv', csv)
