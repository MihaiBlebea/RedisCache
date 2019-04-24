type Params = { [key : string] : string | number | boolean }

type Keys = { [key : string] : string }


export default abstract class Template
{
    private static _templates : Keys = {
        MEMBER:      'v1:member:$ID',
        MEMBER_NAME: 'v1:member_name:$ID:$NAME'
    }

    static generate(key : string, params : Params) : string
    {
        // 1, Find key if it exists
        let foundKey = this.exists(key)

        // 2. Get template from key
        let template = this.getTemplate(foundKey)

        // 3. Replace template with dinamic params
        return this.replace(template, params)
    }

    private static exists(key : string) : string
    {
        let found = Object.keys(this._templates).filter((templateKey)=> {
            return templateKey.includes(key.toUpperCase())
        })[0]

        if(!found)
        {
            throw Error('Could not find template key')
        }

        return found
    }

    private static getTemplate(foundKey : string) : string
    {
        return this._templates[foundKey]
    }

    private static replace(template : string, params : Params)
    {
        this.assertNoMissingParams(template, params)

        Object.keys(params).forEach((keyParam)=> {
            template = template.replace(`$${ keyParam.toUpperCase() }`, params[keyParam].toString())
        })
        return template
    }

    private static assertNoMissingParams(template : string, params : Params)
    {
        let found : RegExpMatchArray | null = template.match(/[$A-Z]+/g)

        if(found === null)
        {
            throw Error('Supplied params do not match the template replaceble params')
        }

        let upperCaseKeys = Object.keys(params).map(key => key.toUpperCase())

        found.map((item)=> {
            let noPrefixKey = item.replace('$', '')
            if(!upperCaseKeys.includes(noPrefixKey))
            {
                throw Error(`Missing param ${ noPrefixKey }`)
            }
        })
    }
}
