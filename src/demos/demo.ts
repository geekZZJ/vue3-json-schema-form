import PasswordWidget from '@/components/PasswordWidget'

export default {
  name: 'Demo',
  schema: {
    type: 'string',
    minLength: 10,
    title: 'demo',
  },
  uiSchema: {
    properties: {
      pass1: {
        widget: PasswordWidget,
      },
    },
  },
  default: 1,
}
