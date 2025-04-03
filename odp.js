import dotenv from 'dotenv'
import { fetchThrottle } from './utils.js'
import { FormData, File } from 'node-fetch'
import { HttpsProxyAgent } from 'https-proxy-agent'

dotenv.config()

const odpURL = process.env.odpURL
const odpAPIKey = process.env.odpAPIKey
let proxyAgent = null
if (process.env.https_proxy !== undefined) {
  proxyAgent = new HttpsProxyAgent(process.env.https_proxy)
  console.log('Proxy set to:' + process.env.https_proxy)
}

async function uploadFile(filename, data, ds_id, res_id, mime) {
    try {
        const formData = new FormData()
        const file = new File([data], filename, {'type': mime})

        formData.set('filename', filename)
        formData.set('file', file, filename)

        const url = (res_id !== undefined)?(odpURL+'/datasets/'+ds_id+'/resources/'+res_id+'/upload/'):(odpURL+'/datasets/'+ds_id+'/upload/')

        const params = {
            "headers": {
                "Accept": "application/json",
                "Cache-Control": "no-cache",
                'X-API-KEY': odpAPIKey
            },
            "body": formData,
            "method": "POST"
        }
        if (proxyAgent !== null) {
            params.agent = proxyAgent
        }

        const res = await fetchThrottle(url, params)
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