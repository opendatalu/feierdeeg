import { uploadFile } from './odp.js'
import * as fs from 'fs';
import process from 'node:process';

const config = {
    'de.ics': {'id': process.env.deIcs, 'mime': 'text/calendar'},
    'en.ics': {'id': process.env.enIcs, 'mime': 'text/calendar'},
    'fr.ics': {'id': process.env.frIcs, 'mime': 'text/calendar'},
    'lb.ics': {'id': process.env.lbIcs, 'mime': 'text/calendar'},
    'holidays.csv':  {'id': process.env.csv, 'mime': 'text/csv'},
    'holidays.json': {'id': process.env.json, 'mime': 'application/json'}
}

async function main() {
    console.log((new Date()).toLocaleString(), 'Syncing starts...')
    try {
        await Promise.all(Object.keys(config).map(k => { return uploadFile(k, fs.readFileSync(`./out/${k}`), process.env.datasetId, config[k].id, config[k].mime)}))
    } catch (e) {
        console.error(e)
    }
}

main().then(() => {console.log((new Date()).toLocaleString(), 'Sync successful')}).catch(e => {console.error(e); process.exitCode = 1;})
