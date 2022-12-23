import dotenv from 'dotenv'
import { fetchThrottle } from './utils.js'
import { FormData, File } from 'node-fetch'

dotenv.config()

const odpURL = process.env.odpURL
const odpAPIKey = process.env.odpAPIKey

async function uploadFile(filename, data, ds_id, res_id, mime) {
    try {
        const formData = new FormData()
        const file = new File([data], filename, {'type': mime})

        formData.set('filename', filename)
        formData.set('file', file, filename)

        const url = (res_id !== undefined)?(odpURL+'/datasets/'+ds_id+'/resources/'+res_id+'/upload/'):(odpURL+'/datasets/'+ds_id+'/upload/')

        const res = await fetchThrottle(url, {
        "headers": {
            "Accept": "application/json",
            "Cache-Control": "no-cache",
            'X-API-KEY': odpAPIKey
        },
        "body": formData,
        "method": "POST"
        })
        if (!res.ok) {
            res.text().then(t => { throw t})
        }
        return res.json()
    } catch (e) {
        console.error(e)
        return {}
    }

}


export { uploadFile }