import { defineComponent, PropType } from 'vue'
import { FieldPropsDefine, Schema, SelectionWidgetNames } from '../types'
import { useVJSFContext } from '../context'
import { createUseStyles } from 'vue-jss'
// import Selection from '../widgets/Selection'
import { getWidget } from '../theme'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
  },
  actions: {
    background: '#eee',
    padding: 10,
    textAlign: 'right',
  },
  action: {
    '&+&': {
      marginLeft: 10,
    },
  },
  content: {
    padding: 10,
  },
})

const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classesRef = useStyles()
    const handleAdd = () => (props as any).onAdd(props.index)
    const handleDelete = () => (props as any).onDelete(props.index)
    const handleUp = () => (props as any).onUp(props.index)
    const handleDown = () => (props as any).onDown(props.index)
    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={handleAdd}>
              新增
            </button>
            <button class={classes.action} onClick={handleDelete}>
              删除
            </button>
            <button class={classes.action} onClick={handleUp}>
              上移
            </button>
            <button class={classes.action} onClick={handleDown}>
              下移
            </button>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})

export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext()
    const handleArrayItemChange = (v: any, index: number) => {
      const { value, onChange } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      onChange(arr)
    }
    const handleAdd = (index: number) => {
      const { value, onChange } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index + 1, 0, undefined)
      onChange(arr)
    }

    const handleDelete = (index: number) => {
      const { value, onChange } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index, 1)
      onChange(arr)
    }

    const handleUp = (index: number) => {
      if (index === 0) return
      const { value, onChange } = props
      const arr = Array.isArray(value) ? value : []
      const item = arr.splice(index, 1)
      arr.splice(index - 1, 0, item[0])
      onChange(arr)
    }

    const handleDown = (index: number) => {
      const { value, onChange } = props
      const arr = Array.isArray(value) ? value : []
      if (index === arr.length - 1) return
      const item = arr.splice(index, 1)
      arr.splice(index + 1, 0, item[0])
      onChange(arr)
    }

    const SelectionWidgetRef = getWidget(SelectionWidgetNames.SelectionWidget)

    return () => {
      // const SelectionWidget = context.theme.widgets.selectionWidget
      const SelectionWidget = SelectionWidgetRef.value
      const { schema, rootSchema, value, errorSchema, uiSchema } = props
      const { SchemaItem } = context
      const isMultiType = Array.isArray(schema.items)
      const isSelect = schema.items && (schema.items as any).enum
      if (isMultiType) {
        const items: Schema[] = schema.items as any
        const arr = Array.isArray(value) ? value : []
        return items.map((s: Schema, index: number) => {
          const itemsUiSchema = uiSchema?.items
          const us = Array.isArray(itemsUiSchema)
            ? itemsUiSchema[index] || {}
            : itemsUiSchema || {}
          return (
            <SchemaItem
              schema={s}
              key={index}
              rootSchema={rootSchema}
              uiSchema={us}
              value={arr[index]}
              onChange={(v: any) => handleArrayItemChange(v, index)}
              errorSchema={errorSchema[index] || {}}
            />
          )
        })
      } else if (!isSelect) {
        const arr = Array.isArray(value) ? value : []
        return arr.map((v: any, index: number) => {
          return (
            <ArrayItemWrapper
              index={index}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onUp={handleUp}
              onDown={handleDown}
            >
              <SchemaItem
                schema={schema.items as Schema}
                value={v}
                key={index}
                rootSchema={rootSchema}
                uiSchema={(uiSchema?.items as any) || {}}
                onChange={(v: any) => handleArrayItemChange(v, index)}
                errorSchema={errorSchema[index] || {}}
              ></SchemaItem>
            </ArrayItemWrapper>
          )
        })
      } else {
        const enumOptions = (schema as any).items.enum
        const options = enumOptions.map((e: any) => ({ key: e, value: e }))
        return (
          <SelectionWidget
            schema={schema}
            onChange={() => props.onChange}
            value={props.value}
            options={options}
            errors={errorSchema.__errors}
          ></SelectionWidget>
        )
      }
    }
  },
})
