import { FormItemConfig } from "../components/DyForm/DyForm"

export class UserForm {
    name?: string
    organization?: string
    date1?: string
    date2?: string
    delivery?: boolean
    type?: []
    resource?: string
    desc?: string
    personInfo?: string
    developerName?: string
    sponsorName?: string
}

export function useDyFormConfig(dyForm: any) {

    const dyFormConfig: FormItemConfig[] = [
        {
            type: ElInput,
            formItemConfig: {
                label: '请输入姓名',
                prop: "name"
            },
            formConfig: {
                placeholder: '请输入姓名',
            },
            formDataKey: 'name'
        },
        {
            type: ElSelect,
            formItemConfig: {
                label: '请选择组织',
                prop:'organization'
            },
            formConfig: {
                placeholder: '请选择您的组织'
            },
            formDataKey: 'organization',
            children: [
                {
                    type: ElOption,
                    formConfig: { label: '个人', value: 'person' },

                },
                {
                    type: ElOption,
                    formConfig: { label: '公司', value: 'company' }
                },
                {
                    type: ElOption,
                    formConfig: { label: '无', value: 'none' }
                }
            ],
            next(formData) {
                if (formData.organization === 'none') {
                    return {
                        next() {
                            return {
                                type: ElInput,
                                formItemConfig: {
                                    label: '请输入您所属组织'
                                },
                            }
                        }
                    }
                } else if (formData.organization === 'company') {
                    return [
                        {
                            type: 'div',
                            formConfig: {
                                style: {
                                    width: '100%',
                                    display: 'flex'
                                }
                            },
                            formItemConfig: {
                                label: '请选择日期', 
                            },
                            children: [
                                {
                                    type: ElCol,
                                    formConfig: {
                                        span: 11
                                    },
                                    children: [
                                        {
                                            needFormItem: true,
                                            formItemConfig: {
                                                prop: 'date1', 
                                            },
                                            type: ElDatePicker,
                                            formDataKey: 'date1',
                                            formConfig: {
                                                type: "date",
                                                placeholder: "请选择进入公司日期",
                                                style: "width: 100%"
                                            },
                                        }
                                    ]
                                },
                                {
                                    type: ElCol,
                                    formConfig: {
                                        span: 2
                                    },
                                    children: [
                                        {
                                            type: 'span',
                                            children: '-'
                                        }
                                    ]
                                },
                                {
                                    type: ElCol,
                                    formConfig: {
                                        span: 11
                                    },
                                    children: [
                                        {
                                            needFormItem: true,
                                            formItemConfig: {
                                                prop: 'date2', 
                                            },
                                            type: ElDatePicker,
                                            formDataKey: 'date2',
                                            formConfig: {
                                                type: "date",
                                                placeholder: "请选择毕业日期",
                                                style: "width: 100%"
                                            },
                                        }
                                    ]
                                },

                            ],
                            next(formData) {
                                console.log(formData)
                                return [{
                                    type: ElInput,
                                    formItemConfig: {
                                        label: '请输入个人信息'
                                    },
                                    formConfig: {
                                        placeholder: '请输入个人信息'
                                    }
                                }]
                            }
                        },
                    ]
                } else {
                    return [{
                        type: ElInput,
                        formDataKey: 'personInfo',
                        formItemConfig: {
                            label: '请输入个人信息'
                        },
                        formConfig: {
                            placeholder: '请输入个人信息'
                        }
                    }]
                }

            }
        },
        {
            type: ElSwitch,
            formDataKey: 'delivery',
            formItemConfig: {
                label: 'Instant delivery',
                prop:'delivery'
            }
        },
        {
            type: ElCheckboxGroup,
            formDataKey: 'type',
            formItemConfig: {
                label: 'Activity type',
            },
            children: [
                { type: ElCheckbox, slots: { default: () => '活动1' }, formConfig: { name: 'type', label: '活动1' } },
                { type: ElCheckbox, slots: { default: () => '活动2' }, formConfig: { name: 'type', label: '活动2' } },
                { type: ElCheckbox, slots: { default: () => '活动3' }, formConfig: { name: 'type', label: '活动3' } },
                { type: ElCheckbox, slots: { default: () => '活动4' }, formConfig: { name: 'type', label: '活动4' } }
            ],

        },
        {
            type: ElRadioGroup,
            formDataKey: 'resource',
            formItemConfig: {
                label: 'Resources'
            },
            children: [
                {
                    type: ElRadio,
                    formConfig: {
                        label: 'Sponsor'
                    }
                },
                {
                    type: ElRadio,
                    formConfig: {
                        label: 'Developer'
                    }
                },
            ],
            next(formData) {
                const resource = formData.resource
                const obj = {
                    'Sponsor': [
                        {
                            type: ElInput,
                            formDataKey: 'sponsorName',
                            formItemConfig: {
                                label: '请输入赞助商名称'
                            },
                        }
                    ],
                    'Developer': [
                        {
                            type: ElInput,
                            formDataKey: 'developerName',
                            formItemConfig: {
                                label: '请输入开发商名称'
                            },
                        }
                    ],
                } as Record<string, FormItemConfig[]>
                if (!resource) {
                    return []
                } else {
                    return obj[resource]
                }
            },
        },
        {
            type: ElInput,
            formConfig: {
                type: 'textarea'
            },
            formDataKey: 'desc',
            formItemConfig: {
                label: 'Activity form',
                prop: "desc"
            }
        },
        {
            type: 'div',
            formConfig: {
                style: {
                    width: "100%",
                    display: "flex"
                }
            },
            children: [
                {
                    type: ElCol,
                    formConfig: {
                        span: 6
                    },
                    children: [
                        {
                            type: ElButton,
                            formConfig: {
                                type: 'warning',
                                onClick: async () => {
                                    const formRef = dyForm!.value!.getFormRef()
                                    formRef.value.validate()
                                }
                            },
                            slots: {
                                default: () => '确认'
                            }
                        }
                    ]
                },
                {
                    type: ElCol,
                    formConfig: {
                        span: 18
                    },
                    children: [
                        {
                            type: ElButton,
                            formConfig: {
                                type: 'danger',
                                onClick: () => {
                                    const formRef = dyForm!.value!.getFormRef()
                                    formRef.value.resetFields()
                                }
                            },
                            slots: {
                                default: () => '取消'
                            }
                        }
                    ]
                }
            ]
        }
    ];
    return {
        dyFormConfig
    }
}