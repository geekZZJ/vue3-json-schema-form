import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine } from '../types'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  containers: {},
  label: {
    display: 'block',
    color: '#777',
  },
  errorText: {
    color: 'red',
    fontSize: '12px',
    margin: '5px 0',
    paddingLeft: '20px',
  },
})

export default defineComponent({
  name: 'FormItem',
  props: CommonWidgetPropsDefine,
  setup(props, { slots }) {
    const classesRef = useStyles()
    return () => {
      const { schema, errors } = props
      const classes = classesRef.value
      return (
        <div class={classes.containers}>
          <label class={classes.label}>{schema.title}</label>
          {slots.default && slots.default()}
          <ul class={classes.errorText}>
            {errors?.map((item) => {
              return <li>{item}</li>
            })}
          </ul>
        </div>
      )
    }
  },
})
