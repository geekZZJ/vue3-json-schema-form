const Ajv = require('ajv')
const localize = require('ajv-i18n')

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const schema = {
  type: 'object',
  properties: {
    age: { type: 'number' },
    name: { type: 'string', test: false },
    isWorker: { type: 'boolean' },
    pets: { type: 'array', items: { type: 'string' } },
  },
  required: ['name', 'age'],
}

const data = {
  age: '12',
  name: 'zzj',
  isWorker: true,
  pets: ['a', 'b', 'c'],
}

ajv.addKeyword({
  keyword: 'test',
  // validate: (schema, data) => {
  //   if (schema) return true
  //   else return data.length === 6
  // },
  compile: (sch, parentSchema) => {
    // console.log(sch, parentSchema)
    return () => true
  },
  errors: false,
})

const validate = ajv.compile(schema)
const valid = validate(data)
if (!valid) {
  localize.ru(validate.errors)
  console.log(validate.errors)
}
