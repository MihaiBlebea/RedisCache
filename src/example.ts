import { RedisCache, Template } from './'


let key = Template.generate('MEMBER_NAME', { id: 1234, name: 'Mihai' })
console.log(key)

let cache = new RedisCache('127.0.0.1', 32768)

const run = async ()=> {
    await cache.set(key, JSON.stringify({ name: 'Mihai', age :29 }))
    let result = await cache.get(key)
    console.log(JSON.parse(<string>result))
}

run()
