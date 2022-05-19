// or ESM/TypeScript import
const Ajv = require('ajv')

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const schema = {
  type: 'object',
  properties: {
    age: { type: 'number' },
    name: { type: 'string' },
    isWorker: { type: 'boolean' },
    pets: { type: 'array', items: { type: 'string' } },
  },
  required: ['name', 'age'],
}

const data = {
  // age: 12,
  name: 'zzj',
  isWorker: true,
  pets: ['a', 'b', 'c'],
}

const validate = ajv.compile(schema)
const valid = validate(data)
if (!valid) console.log(validate.errors)
