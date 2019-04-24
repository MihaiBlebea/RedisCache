interface ICache
{
    exists(key : string) : Promise<boolean>

    set(key : string, value : string) : Promise<boolean>

    get(key : string) : Promise<string | number | null>

    remove(key : string) : Promise<boolean>

    rename(key : string, newKey : string) : Promise<any>
}

export default ICache
