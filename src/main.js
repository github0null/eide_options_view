import Vue from 'vue'
import App from './App.vue'
import Argon from './plugins/argon-kit'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// ====== Init ======

/* config */
Vue.config.productionTip = false
Vue.use(Argon)
Vue.use(ElementUI)

// ====== App entry =======

let appInstance = undefined
let data_obj = undefined
let inited = false
let appData = App.data()

// eslint-disable-next-line no-undef
const vscode = acquireVsCodeApi();

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
        data_obj = event.data.data;
        initAll(event.data.model, data_obj, event.data.info); /* init app data */
        initApp() /* init vue app if we have not do it ! */
    }
})

// add ctrl+s event callbk
document.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() == 's' && e.ctrlKey) {
        e.preventDefault();
        saveAll();
    }
});

/* launch done, notify to vscode */
vscode.postMessage('eide.options_view.launched')

// ====== functions ======

function initApp() {
    if (inited) return
    inited = true; /* set init flag */
    console.log('[builder options view] start init and create page ...')
    new Vue({ render: h => h(App) }).$mount('#app') /* create and init page */
    appInstance = App.methods.getInstance()
    appInstance.$on('save-all', () => saveAll())
    appInstance.$on('open-config', () => vscode.postMessage('open-config'))
    console.log('[builder options view] app inited done !')
}

function showToast(data) {

    App.methods.notify({
        type: data.success ? 'success' : 'error',
        title: data.success ? 'Success' : 'Failed',
        message: data.msg,
        position: 'bottom-right'
    });

    /* App.methods.message({
        type: data.success ? 'success' : 'error',
        message: data.msg,
        showClose: true
    }); */
}

function saveAll() {

    if (!appInstance) {
        showToast({ success: false, msg: 'App have not inited !' })
        return
    }

    console.log('[builder options view] start post data ...')

    // update tasks
    const task_name_map = {
        'before': 'beforeBuildTasks',
        'after': 'afterBuildTasks'
    }
    for (const gName in task_name_map) {
        const vueData = appInstance.task[gName]
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

        const vueData = appInstance[gName]
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
    if (field_info['size'] == 'huge') {
        return 'textarea'
    } else if (field_info['size'] == 'small') {
        return 'short_input'
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
    if (lang && field_info[`description.${lang}`]) {
        field.description = field_info[`description.${lang}`];
    }

    // other
    field.disable_readable_name = field_info.disable_readable_name
    field.readable_name = field_info.readable_name
    if (lang && field_info[`readable_name.${lang}`]) {
        field.readable_name = field_info[`readable_name.${lang}`];
    }

    field.auto_complete_ctx = field_info['auto_complete_ctx'];

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
                field.enumDesc = field_info['enumDescriptions'] || []
            } else {
                field.type = 'input'
                field.placeHolder = field.description
            }
            break;
        case 'short_input':
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

let lang = undefined; /* language */

function initAll(model, data, info) {

    console.log('[builder options view] start init data ...')

    const props = model.properties;

    // init options
    const props_map = {
        'global': 'global',
        'cpp': 'c/cpp-compiler',
        'asm': 'asm-compiler',
        'linker': 'linker'
    }

    // init info
    if (info) {
        lang = info.lang;
        appData.lang = lang;
        appData.prjEnvList = info.envList;
        appData.contextData = info.contextData || {};
    }

    for (const prop_name in props_map) {

        const props_group = props[props_map[prop_name]].properties
        const data_group = data[props_map[prop_name]]
        const vueObj = appData[prop_name]

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

        const vueObjList = appData.task[prop_name]
        const taskDatas = data[task_name_map[prop_name]]

        if (taskDatas && Array.isArray(taskDatas)) {
            for (const task of taskDatas) {
                vueObjList.push(task)
            }
        }
    }

    console.log('[builder options view] Init data done !')
}