import Vue from 'vue'
import App from './App.vue'
import Argon from './plugins/argon-kit'

// ====== Init ======

Vue.config.productionTip = false

/* enable components */
Vue.use(Argon)

new Vue({ render: h => h(App) }).$mount('#app')

const vueInstance = App.methods.getInstance()

// ====== App entry =======

let model_obj
let data_obj

// eslint-disable-next-line no-undef
const vscode = acquireVsCodeApi();

// receive event
vueInstance.$on('save-all', () => saveAll())
vueInstance.$on('open-config', () => vscode.postMessage('open-config'))

// receive vscode event
window.addEventListener('message', event => {

    // is a status message
    if (event.data.status) {

        const status = {
            success: event.data.status.success,
            msg: event.data.status.msg
        };

        showToast(status)
    }

    // is a data
    else {
        model_obj = event.data.model;
        data_obj = event.data.data;
        initAll(model_obj, data_obj);
    }
})

// ====== functions ======

function showToast(data) {

    const title = data.success ? 'Success' : 'Failed'

    // eslint-disable-next-line no-undef
    bootoast.toast({
        message: `<strong>${title}</strong><p class="mt-2">${data.msg}</p>`,
        type: data.success ? 'success' : 'danger',
        position: 'right-bottom',
        timeout: 3,
        animationDuration: 300,
        dismissible: true
    });
}

function saveAll() {

    console.log('[builder options view] start post data ...')

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
        const oldData = data_obj[opt_name_map[gName]]

        // get value from form items
        for (const data of vueData) {

            // convert data
            switch (data.type) {
                case 'array':
                    if (data.value.length > 0) {
                        oldData[data.name] = data.value.map((ele) => { return ele.value })
                    } else {
                        delete oldData[data.name] // delete empty array
                    }
                    break;
                case 'bool':
                    if (data.value) {
                        oldData[data.name] = data.value
                    } else {
                        delete oldData[data.name] // delete 'false' for boolean
                    }
                    break;
                default:
                    if (typeof data.value == 'string' && data.value.trim() == '') {
                        delete oldData[data.name] // delete empty fields
                    } else {
                        oldData[data.name] = data.value
                    }
                    break;
            }

            // deal data
            if (typeof oldData[data.name] == 'string') {
                oldData[data.name] = oldData[data.name]
                    .replace(/\r\n|\n/g, ' ')
                    .replace(/\s{2,}/g, ' ')
                    .trim()
            }
        }
    }

    // post data
    vscode.postMessage(data_obj)

    console.log('[builder options view] post data done !')
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
    if (field_info.isHugeText) {
        return 'textarea'
    } else if (Array.isArray(field_info.type)) {
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
        case 'string':
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
        case 'textarea': // textarea
            field.type = type;
            field.placeHolder = field.description
            break;
        default:
            console.warn(`[builder options view] [warn] not support this type: '${type}' for field !`)
            return false; // not support this type
    }

    // data is valid, set value
    if (data) {
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
            field.value = field_info.default || ''
        } else if (field.type == 'array') {
            field.value = []
        } else {
            field.value = ''
        }
    }

    return true;
}

function initAll(model, data) {

    console.log('[builder options view] start init page ...')

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
            if (setFieldValue(field_info, new_field, data_group[name])) {
                vueObj.push(new_field)
            }
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

    console.log('[builder options view] Init data done !')
}