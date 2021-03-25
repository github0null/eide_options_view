import Vue from 'vue'
import App from './App.vue'
import Argon from './plugins/argon-kit'

// ====== Init ======

Vue.config.productionTip = false

Vue.use(Argon)

new Vue({ render: h => h(App) }).$mount('#app')

const vueInstance = App.methods.getInstance()

// ====== App entry =======

let model_obj
let data_obj

// eslint-disable-next-line no-undef
const vscode = acquireVsCodeApi();

// on save btn clicked
vueInstance.$on('save-all', () => saveAll())

// receive vscode event
window.addEventListener('message', event => {

    // is a status message
    if (event.data.status) {

        const status = {
            success: event.data.status.success,
            msg: event.data.status.msg
        };

        vueInstance.$emit('save-status', status)
    }

    // is a data
    else {
        model_obj = event.data.model;
        data_obj = event.data.data;
        initAll(model_obj, data_obj);
    }
})

// ====== functions ======

function saveAll() {

    // update tasks
    const task_name_map = {
        'before': 'beforeBuildTasks',
        'after': 'afterBuildTasks'
    }
    for (const gName in task_name_map) {
        const vueData = vueInstance.task[gName]
        data_obj[task_name_map[gName]] = vueData
    }

    // update options
    const opt_name_map = {
        'global': 'global',
        'cpp': 'c/cpp-compiler',
        'asm': 'asm-compiler',
        'linker': 'linker'
    }
    for (const gName in opt_name_map) {
        const vueData = vueInstance[gName]
        const oldData = data_obj[gName]
        for (const data of vueData) {
            switch (data.type) {
                case 'array':
                    oldData[data.name] = data.value.map((ele) => { return ele.value })
                    break;
                default:
                    oldData[data.name] = data.value
                    break;
            }
        }
    }

    // post data
    vscode.postMessage(data_obj)
}

function getObjectByPath(root, path) {

    const nList = path.split('/')
    let result = root;

    for (const name of nList) {
        if (name == '') continue;
        if (result == undefined) break;
        result = result[name]
    }

    return result;
}

function getFieldInfo(model, fieldObj) {

    if (fieldObj['$ref']) {
        const obj = getObjectByPath(model, fieldObj['$ref'].replace('#/', ''))
        for (const key in obj) {
            if (fieldObj[key] === undefined) {
                fieldObj[key] = obj[key]
            }
        }
    }

    return fieldObj;
}

function getFieldType(field_info) {

    if (Array.isArray(field_info.type)) {
        return 'string'
    } else {
        return field_info.type
    }
}

function setFieldValue(field_info, field, data) {

    const type = getFieldType(field_info)

    // set description
    field.description = field_info.markdownDescription || field_info.description

    // set type
    switch (type) {
        case 'array':
            field.type = type
            break;
        case 'boolean':
            field.type = 'bool'
            break;
        default: // string
            if (field_info['enum']) {
                field.type = 'enum'
                field.enums = field_info['enum']
                // set enumDesc
                if (field_info['enumDescriptions']) {
                    field.enumDesc = field_info['enumDescriptions']
                }
            } else {
                field.type = 'input'
                field.placeHolder = field.description
            }
            break;
    }

    // set value
    if (data) { // data is valid
        switch (type) {
            case 'array':
                field.value = (Array.isArray(data) ? data : [data])
                    .map((val) => { return { value: val } })
                break;
            case 'boolean':
                field.value = data
                break;
            default: // string
                field.value = Array.isArray(data) ? data.join(' ') : data
                break;
        }
    }

    // data is null, use default value
    else {
        if (field.type == 'bool') {
            field.value = false
        } else if (field.type == 'enum') {
            field.value = field_info.default
        } else {
            field.value = ''
        }
    }
}

function initAll(model, data) {

    const props = model.properties;

    // init options
    const props_map = {
        'global': 'global',
        'cpp': 'c/cpp-compiler',
        'asm': 'asm-compiler',
        'linker': 'linker'
    }

    for (const prop_name in props_map) {

        const props_group = props[props_map[prop_name]].properties
        const data_group = data[props_map[prop_name]]
        const vueObj = vueInstance[prop_name]

        for (const name in props_group) {
            const field_info = getFieldInfo(model, props_group[name])
            const new_field = { name: name }
            setFieldValue(field_info, new_field, data_group[name])
            vueObj.option_list.push(new_field)
        }
    }

    // init tasks
    const task_name_map = {
        'before': 'beforeBuildTasks',
        'after': 'afterBuildTasks'
    }

    for (const prop_name in task_name_map) {

        const vueObjList = vueInstance.task[prop_name]
        const taskDatas = data[task_name_map[prop_name]]

        if (taskDatas && Array.isArray(taskDatas)) {
            for (const task of taskDatas) {
                vueObjList.push(task)
            }
        }
    }
}