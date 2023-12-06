import { VNode } from "vue"
import { getTypes } from '../../utils/types'
import { FormInstance } from "element-plus"
interface Slots extends Record<string, () => any> {
  default: () => string | VNode
}
type Next = (formData: Props['modelValue']) => FormItemConfig[] | FormItemConfig
export interface FormItemConfig<T = Props['modelValue']> {
  type?: any
  formConfig?: Record<string, any>
  formDataKey?: keyof T
  formItemConfig?: Record<string, any>
  children?: FormItemConfig<T>[] | string
  slots?: Slots
  next?: Next
  needFormItem?: boolean
}
interface Props {
  modelValue: Record<string, any>
  dyFormConfig: FormItemConfig[]
  formConfig: Record<string, any>
}
export const dynamicForm = () => {
  const DyForm = defineComponent<Props>(
    (props, { emit, expose }) => {
      expose({
        getFormData: () => {
          return props.modelValue
        },
        getFormRef: (): any => formRef
      })
      const rederChild = () => props.dyFormConfig.map((item: FormItemConfig) => {
        const traverChildren = (child: FormItemConfig['children']): any => {
          return child && typeof child !== 'string' && child.map(
            item => {
              if (typeof item.children === 'string') {
                return h(item.type, item.children)
              }
              const childeVnode = h(item.type, item.formDataKey ?
                {
                  ...item.formConfig,
                  modelValue: props.modelValue[item.formDataKey],
                  'onUpdate:modelValue': (value: any) => emit('update:modelValue', { ...props.modelValue, [item.formDataKey as string]: value })
                } :
                item.formConfig,
                [item.children && traverChildren(item.children), item.slots && renderSlots(item)])
              if (item.needFormItem) {
                return h(ElFormItem, { ...item?.formItemConfig, prop:item?.formConfig?.prop || item.formDataKey , },childeVnode)
              }
              return childeVnode
            }
          )
        }
        const renderSlots = (options: FormItemConfig): any => {
          return Object.keys(options.slots || {}).map((slot: any) => {
            return options.slots![slot]()
          })
        }
        const render = (options: FormItemConfig): any => {
          return h(ElFormItem, { ...options.formItemConfig,prop:options?.formConfig?.prop || options.formDataKey  }, [
            h(
              options.type,
              options.formDataKey ?
                {
                  ...options.formConfig,
                  modelValue: props.modelValue[options.formDataKey],
                  'onUpdate:modelValue': (value: any) => emit('update:modelValue', { ...props.modelValue, [options.formDataKey as string]: value })
                } : options.formConfig,
              options.slots ? renderSlots(options) : traverChildren(options.children || [])
            )
          ])
        }
        const renderNext = (item: FormItemConfig): FormItemConfig[] | [] => {
          const nextOptions = item.next?.(props.modelValue) as FormItemConfig
          if (!nextOptions) {
            console.error(`请检查next函数返回值是否有误,目前返回值为${nextOptions}`)
            return []
          }
          if (getTypes(nextOptions) === 'Object' && nextOptions?.next) {
            return renderNext(nextOptions)
          }
          return Array.isArray(nextOptions) ? nextOptions.map(option => render(option)) : render(nextOptions)
        }
        const renderVnode = render(item)
        return item.next ? [renderVnode,renderNext(item)] : [renderVnode]
      })
      const formRef = ref<FormInstance>()
  
      return () => {
        return h(ElForm, {
          ref: formRef,
          model: props.modelValue,
          ...props.formConfig
        }, {
          default: rederChild()
        })
      }
    },
    {
      props: {
        modelValue: {
          type: Object,
          required:true,
        },
        dyFormConfig: {
          type: Object,
          required:true,
        },
        formConfig: {
          type: Object,
          default:()=>{}
        }
      },
      emits: ['update:modelValue']
    }
  )
  return {
    DyForm
  }
}