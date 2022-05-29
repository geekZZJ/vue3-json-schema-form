import SelectionWidget from './Selection'

import { CommonWidgetPropsDefine } from '../types'
import { defineComponent } from 'vue'

const CommonWidget = defineComponent({
  props: CommonWidgetPropsDefine,
  setup() {
    return () => null
  },
})

export default {
  widgets: {
    SelectionWidget,
    TextWidget: CommonWidget,
    NumberWidget: CommonWidget,
  },
}
