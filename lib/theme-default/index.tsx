import SelectionWidget from './SelectionWidget'
// import { CommonWidgetPropsDefine } from '../types'
// import { defineComponent } from 'vue'
import TextWidget from './TextWidget'
import NumberWidget from './NumberWidget'

// const CommonWidget = defineComponent({
//   props: CommonWidgetPropsDefine,
//   setup() {
//     return () => null
//   },
// })

export default {
  widgets: {
    SelectionWidget,
    TextWidget,
    NumberWidget,
  },
}
