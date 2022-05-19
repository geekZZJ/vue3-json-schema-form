const Ajv = require('ajv').default
const localize = require('ajv-i18n')

const ajv = new Ajv({ allErrors: true }) // options can be passed, e.g. {allErrors: true}
require('ajv-errors')(ajv)

const schema = {
  type: 'object',
  properties: {
    age: { type: 'number' },
    name: {
      type: 'string',
      test: false,
      errorMessage: '这是错误的',
      minLength: 10,
    },
    isWorker: { type: 'boolean' },
    pets: { type: 'array', items: { type: 'string' } },
  },
  required: ['name', 'age'],
}

const data = {
  age: 12,
  name: 'zzj',
  isWorker: true,
  pets: ['a', 'b', 'c'],
}

ajv.addKeyword({
  keyword: 'test',
  macro() {
    return {
      minLength: 10,
    }
  },
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
  // localize.ru(validate.errors)
  console.log(validate.errors)
}
