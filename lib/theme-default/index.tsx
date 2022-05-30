import SelectionWidget from './SelectionWidget'
import { CommonWidgetPropsDefine } from '../types'
import { defineComponent } from 'vue'
import TextWidget from './TextWidget'

const CommonWidget = defineComponent({
  props: CommonWidgetPropsDefine,
  setup() {
    return () => null
  },
})

export default {
  widgets: {
    SelectionWidget,
    TextWidget,
    NumberWidget: CommonWidget,
  },
}
