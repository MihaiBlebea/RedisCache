import { Tedis } from 'tedis'
import { ICache } from './'


export default class RedisCache implements ICache
{
    private _tedis : Tedis


    constructor(host : string, port : number)
    {
        this._tedis = new Tedis({
            port: port,
            host: host
        })
    }

    async exists(key : string) : Promise<boolean>
    {
        return await this._tedis.exists(key) === 1 ? true : false
    }

    async set(key : string, value : string) : Promise<boolean>
    {
        return await this._tedis.set(key, value)
    }

    async get(key : string)
    {
        return await this._tedis.get(key)
    }

    async remove(key : string)
    {
        return await this._tedis.del(key) === 1 ? true : false
    }

    async rename(key : string, newKey : string) : Promise<any>
    {
        return await this._tedis.rename(key, newKey)
    }

    close()
    {
        this._tedis.close()
    }
}
