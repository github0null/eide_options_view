<template>
  <div id="app">
    <section class="section">
        <div class="container col-10">
            <div class="row justify-content-center">
                <div class="col-12">
                    <!-- Tabs with icons -->
                    <div class="mb-4">
                        <big class="text-uppercase font-weight-bold">{{title}}</big>
                        <base-button type="success" class="float-right" @click="onSave">Save All</base-button>
                    </div>
                    <tabs fill class="flex-column flex-md-row">
                        <card shadow>
                            <tab-pane key="tab1">
                                <template slot="title">
                                    <i class="ni ni-user-run mr-2"></i>User Task
                                </template>

                                <div class="p-4">
                                    <fieldset>
                                        <div class="row mb-3 mt-4">
                                            <legend class="col-3"
                                                data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                title="Run some commands before build">Prebuild Task</legend>
                                            <div class="col-1">
                                                <base-button  size="sm" type="success" @click="add_prebuild_task">Add</base-button>
                                            </div>
                                        </div>
                                        <div class="pr-3 pl-3">
                                            <ul class="list-group">
                                            <li class="list-group-item" v-for="(item, index) in task.before" :key="index">
                                                <form class="pt-4 pb-4">
                                                <div class="form-group row">
                                                    <label class="col-2 col-form-label"
                                                        data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                        title="A readable name for display">Task Name</label>
                                                    <div class="col-10">
                                                    <base-input v-model="item.name"></base-input>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-2 col-form-label"
                                                        data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                        title="Command line">Command</label>
                                                    <div class="col-10">
                                                    <base-input v-model="item.command"></base-input>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <legend class="col-form-label col-2 float-left pt-0">Options</legend>
                                                    <div class="col-3">
                                                        <base-checkbox class="mt-1 mb-3" v-model="item.disable" 
                                                            data-toggle="tooltip" :data-placement="location.tooltip.options"
                                                            title="Disable this command">Disable</base-checkbox>
                                                        <base-checkbox class="mt-1 mb-3" v-model="item.abortAfterFailed" 
                                                            data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                            title="Whether to skip subsequent commands if this command is failed">Abort If Failed</base-checkbox>
                                                        <base-checkbox class="mt-1 mb-3" v-model="item.stopBuildAfterFailed"
                                                            data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                            title="Whether to stop building directly when this command is failed">Stop Build If Failed</base-checkbox>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-12">
                                                    <base-button class="float-right" size="sm" type="danger" @click="delete_prebuild_task(item)"> Delete</base-button>
                                                    </div>
                                                </div>
                                                </form>
                                            </li>
                                            </ul>
                                        </div>
                                    </fieldset>

                                    <fieldset class="mt-4">
                                        <div class="row mb-3 mt-4">
                                            <legend class="col-3"
                                                data-toggle="tooltip" :data-placement="location.tooltip.title" 
                                                title="Run some commands after build"
                                            >Post-build Task</legend>
                                            <div class="col-1">
                                                <base-button size="sm" type="success" @click="add_postbuild_task">Add</base-button>
                                            </div>
                                        </div>
                                        <div class="pr-3 pl-3">
                                            <ul class="list-group">
                                                <li class="list-group-item" v-for="(item, index) in task.after" :key="index">
                                                    <form class="pt-4 pb-4">
                                                        <div class="form-group row">
                                                            <label class="col-2 col-form-label"
                                                                data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                                title="A readable name for display">Task Name</label>
                                                            <div class="col-10">
                                                            <base-input v-model="item.name"></base-input>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-2 col-form-label"
                                                                data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                                title="Command line">Command</label>
                                                            <div class="col-10">
                                                            <base-input v-model="item.command"></base-input>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <legend class="col-form-label col-2 float-left pt-0">Options</legend>
                                                            <div class="col-3">
                                                                <base-checkbox class="mt-1 mb-3" v-model="item.disable"
                                                                    data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                                    title="Disable this command">Disable</base-checkbox>
                                                                <base-checkbox class="mt-1 mb-3" v-model="item.abortAfterFailed"
                                                                    data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                                    title="Whether to skip subsequent commands if this command is failed">Abort If Failed</base-checkbox>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <div class="col-12">
                                                            <base-button class="float-right" size="sm" type="danger" @click="delete_postbuild_task(item)"> Delete</base-button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </li>
                                            </ul>
                                        </div>
                                    </fieldset>
                                </div>

                            </tab-pane>

                            <tab-pane key="tab2">
                                <template slot="title">
                                    <i class="ni ni-world mr-2"></i>Global
                                </template>

                                <div class="container">
                                    <div class="col">
                                        <!--dynamic element-->
                                        <div v-for="(item, index) in global" :key="index">
                                            <div v-if="item.type == 'bool'">
                                                <base-checkbox 
                                                    class="mt-3 mb-3 col-8" 
                                                    v-model="item.value"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                    :title="item.description||''"
                                                >
                                                    {{item.name}}
                                                </base-checkbox>
                                            </div>
                                            <div class="form-inline" v-else-if="item.type == 'enum'">
                                                <select class="col-2 custom-select custom-select-sm" v-model="item.value">
                                                    <option v-for="(enum_item, enum_index) in item.enums" :key="enum_index" :value="enum_item">
                                                        {{enum_item}}
                                                    </option>
                                                </select>
                                                <a 
                                                    class="col-6 col-form-label"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                    :title="item.description||''"
                                                >{{ item.name }}</a>
                                            </div>
                                            <div class="mt-4 mb-2 form-group" v-else-if="item.type == 'input'">
                                                <a data-toggle="tooltip" :data-placement="location.tooltip.title" 
                                                    :title="item.description||''">{{item.name}}</a>
                                                <base-input class="mt-2" :placeholder="item.placeHolder || ''" 
                                                    v-model="item.value">
                                                </base-input>
                                            </div>
                                            <div class="mb-2" v-else-if="item.type == 'array'">
                                                <div class="form-inline mb-2 mt-2">
                                                    <a class="mr-4" data-toggle="tooltip" 
                                                        :data-placement="location.tooltip.options" 
                                                        :title="item.description||''"
                                                    >{{ item.name }}</a>
                                                    <base-button class="mt-2 float-right" size="sm" type="success" @click="add_to_list(item.value, '')">Add</base-button>
                                                </div>
                                                <ul class="list-group">
                                                    <li class="list-group-item" v-for="(ele, ele_index) in item.value" :key="ele_index">
                                                        <div class="form-inline">
                                                            <div class="input-group input-group-sm w-50">
                                                                <input type="text" class="form-control" v-model="ele.value">
                                                            </div>
                                                            <base-button class="ml-4" size="sm" type="danger" 
                                                                @click="delete_from_list(item.value, ele.value)"
                                                            >Delete</base-button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tab-pane>

                            <tab-pane key="tab3">
                                <template slot="title">
                                    <i class="ni ni-settings mr-2"></i>C/Cpp
                                    Compiler
                                </template>

                                <div class="container">
                                    <div class="col">
                                        <!--dynamic element-->
                                        <div v-for="(item, index) in cpp" :key="index">
                                            <div v-if="item.type == 'bool'">
                                                <base-checkbox 
                                                    class="mt-3 mb-3 col-8" 
                                                    v-model="item.value"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                    :title="item.description||''"
                                                >
                                                    {{item.name}}
                                                </base-checkbox>
                                            </div>
                                            <div class="form-inline" v-else-if="item.type == 'enum'">
                                                <select class="col-2 custom-select custom-select-sm" v-model="item.value">
                                                    <option v-for="(enum_item, enum_index) in item.enums" :key="enum_index" :value="enum_item">
                                                        {{enum_item}}
                                                    </option>
                                                </select>
                                                <a 
                                                    class="col-6 col-form-label"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                    :title="item.description||''"
                                                >{{ item.name }}</a>
                                            </div>
                                            <div class="mt-4 mb-2 form-group" v-else-if="item.type == 'input'">
                                                <a data-toggle="tooltip" :data-placement="location.tooltip.title" 
                                                    :title="item.description||''">{{item.name}}</a>
                                                <base-input class="mt-2" :placeholder="item.placeHolder || ''" 
                                                    v-model="item.value">
                                                </base-input>
                                            </div>
                                            <div class="mb-2" v-else-if="item.type == 'array'">
                                                <div class="form-inline mb-2 mt-2">
                                                    <a class="mr-4" data-toggle="tooltip" 
                                                        :data-placement="location.tooltip.options" 
                                                        :title="item.description||''"
                                                    >{{ item.name }}</a>
                                                    <base-button class="mt-2 float-right" size="sm" type="success" @click="add_to_list(item.value, '')">Add</base-button>
                                                </div>
                                                <ul class="list-group">
                                                    <li class="list-group-item" v-for="(ele, ele_index) in item.value" :key="ele_index">
                                                        <div class="form-inline">
                                                            <div class="input-group input-group-sm w-50">
                                                                <input type="text" class="form-control" v-model="ele.value">
                                                            </div>
                                                            <base-button class="ml-4" size="sm" type="danger" 
                                                                @click="delete_from_list(item.value, ele.value)"
                                                            >Delete</base-button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tab-pane>

                            <tab-pane key="tab4">
                                <template slot="title">
                                    <i class="ni ni-settings mr-2"></i>Assembler
                                </template>

                                <div class="container">
                                    <div class="col">
                                        <!--dynamic element-->
                                        <div v-for="(item, index) in asm" :key="index">
                                            <div v-if="item.type == 'bool'">
                                                <base-checkbox 
                                                    class="mt-3 mb-3 col-8" 
                                                    v-model="item.value"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                    :title="item.description||''"
                                                >
                                                    {{item.name}}
                                                </base-checkbox>
                                            </div>
                                            <div class="form-inline" v-else-if="item.type == 'enum'">
                                                <select class="col-2 custom-select custom-select-sm" v-model="item.value">
                                                    <option v-for="(enum_item, enum_index) in item.enums" :key="enum_index" :value="enum_item">
                                                        {{enum_item}}
                                                    </option>
                                                </select>
                                                <a 
                                                    class="col-6 col-form-label"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                    :title="item.description||''"
                                                >{{ item.name }}</a>
                                            </div>
                                            <div class="mt-4 mb-2 form-group" v-else-if="item.type == 'input'">
                                                <a data-toggle="tooltip" :data-placement="location.tooltip.title" 
                                                    :title="item.description||''">{{item.name}}</a>
                                                <base-input class="mt-2" :placeholder="item.placeHolder || ''" 
                                                    v-model="item.value">
                                                </base-input>
                                            </div>
                                            <div class="mb-2" v-else-if="item.type == 'array'">
                                                <div class="form-inline mb-2 mt-2">
                                                    <a class="mr-4" data-toggle="tooltip" 
                                                        :data-placement="location.tooltip.options" 
                                                        :title="item.description||''"
                                                    >{{ item.name }}</a>
                                                    <base-button class="mt-2 float-right" size="sm" type="success" @click="add_to_list(item.value, '')">Add</base-button>
                                                </div>
                                                <ul class="list-group">
                                                    <li class="list-group-item" v-for="(ele, ele_index) in item.value" :key="ele_index">
                                                        <div class="form-inline">
                                                            <div class="input-group input-group-sm w-50">
                                                                <input type="text" class="form-control" v-model="ele.value">
                                                            </div>
                                                            <base-button class="ml-4" size="sm" type="danger" 
                                                                @click="delete_from_list(item.value, ele.value)"
                                                            >Delete</base-button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tab-pane>

                            <tab-pane key="tab5">
                                <template slot="title">
                                    <i class="ni ni-settings mr-2"></i>Linker
                                </template>

                                <div class="container">
                                    <div class="col">
                                        <!--dynamic element-->
                                        <div v-for="(item, index) in linker" :key="index">
                                            <div v-if="item.type == 'bool'">
                                                <base-checkbox 
                                                    class="mt-3 mb-3 col-8" 
                                                    v-model="item.value"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                    :title="item.description||''"
                                                >
                                                    {{item.name}}
                                                </base-checkbox>
                                            </div>
                                            <div class="form-inline" v-else-if="item.type == 'enum'">
                                                <select class="col-2 custom-select custom-select-sm" v-model="item.value">
                                                    <option v-for="(enum_item, enum_index) in item.enums" :key="enum_index" :value="enum_item">
                                                        {{enum_item}}
                                                    </option>
                                                </select>
                                                <a 
                                                    class="col-6 col-form-label"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                    :title="item.description||''"
                                                >{{ item.name }}</a>
                                            </div>
                                            <div class="mt-4 mb-2 form-group" v-else-if="item.type == 'input'">
                                                <a data-toggle="tooltip" :data-placement="location.tooltip.title" 
                                                    :title="item.description||''">{{item.name}}</a>
                                                <base-input class="mt-2" :placeholder="item.placeHolder || ''" 
                                                    v-model="item.value">
                                                </base-input>
                                            </div>
                                            <div class="mb-2" v-else-if="item.type == 'array'">
                                                <div class="form-inline mb-2 mt-2">
                                                    <a class="mr-4" data-toggle="tooltip" 
                                                        :data-placement="location.tooltip.options" 
                                                        :title="item.description||''"
                                                    >{{ item.name }}</a>
                                                    <base-button class="mt-2 float-right" size="sm" type="success" @click="add_to_list(item.value, '')">Add</base-button>
                                                </div>
                                                <ul class="list-group">
                                                    <li class="list-group-item" v-for="(ele, ele_index) in item.value" :key="ele_index">
                                                        <div class="form-inline">
                                                            <div class="input-group input-group-sm w-50">
                                                                <input type="text" class="form-control" v-model="ele.value">
                                                            </div>
                                                            <base-button class="ml-4" size="sm" type="danger" 
                                                                @click="delete_from_list(item.value, ele.value)"
                                                            >Delete</base-button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tab-pane>
                        </card>
                    </tabs>
                </div>
                <div>
                    <modal :show.sync="dialog.visible"
                        :gradient="dialog.theme"
                        modal-classes="modal-danger modal-dialog-centered">

                        <h5 slot="header" class="modal-title" id="modal-title-notification">{{dialog.title}}</h5>

                        <div class="py-3 text-center">

                            <div v-if="dialog.theme=='success'">
                                <i class="bi-check2" style="font-size: 4rem;"></i>
                                <!-- <h4 class="heading text-uppercase">success</h4> -->
                            </div>
                            <div v-else-if="dialog.theme=='danger'">
                                <i class="bi-x" style="font-size: 4rem;"></i>
                                <!-- <h4 class="heading text-uppercase">failed</h4> -->
                            </div>
                            <div v-else>
                                <i class="ni ni-bell-55 ni-3x"></i>
                                <!-- <h4 class="heading text-uppercase">notification</h4> -->
                            </div>

                            <p>{{dialog.msg}}</p>

                        </div>

                        <template slot="footer">
                            <base-button class="text-uppercase" 
                                type="white"
                                @click="dialog.visible = false"
                            >Ok</base-button>
                            <base-button type="link"
                                text-color="white"
                                class="ml-auto text-uppercase"
                                @click="dialog.visible = false"
                            >Close</base-button>
                        </template>
                    </modal>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<style>
legend {
    font-size: 16px !important;
}

th {
    white-space: nowrap;
}

.form-control {
    color: #52577f !important;
}
</style>

<script>
// components
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import Card from "@/components/Card.vue";
import Modal from "@/components/Modal.vue";

// css
import "bootstrap-icons/font/bootstrap-icons.css"

let _instance;

export default {
    name: "App",

    components: {
        Tabs,
        TabPane,
        BaseButton,
        BaseInput,
        Card,
        Modal
    },

    // data
    data() {
        return {
            title: 'Builder Options',
            dialog: {
                title: '',
                msg: '',
                visible: false,
                theme: 'success'
            },
            location: {
                tooltip: {
                    title: 'top',
                    options: 'right'
                }
            },
            task: {
                before: [],
                after: [],
            },
            global: [],
            cpp: [],
            asm: [],
            linker: [],
        };
    },

    // mount object
    mounted() {

        // save instance
        _instance = this

        // event
        this.$on('save-status', (status) => {
            this.dialog.title = status.title || this.title;
            this.dialog.msg = status.msg
            this.dialog.theme = status.success ? 'success' : 'danger'
            this.dialog.visible = true
        })
    },

    // global methods
    methods: {
        // interface
        getInstance: function () {
            return _instance
        },

        // event
        onSave: function () {
            _instance.$emit('save-all')
        },

        // operations
        add_prebuild_task: function () {
            this.task.before.push({
                name: "new_prebuild_task",
                disable: false,
                abortAfterFailed: false,
                stopBuildAfterFailed: true,
                command: 'echo "test"',
            });
        },
        delete_prebuild_task: function (item) {

            const index = this.task.before.findIndex((ele) => {
                return ele.name == item.name && ele.command == item.command;
            });

            if (index != -1) {
                this.task.before.splice(index, 1);
            }
        },
        add_postbuild_task: function () {
            this.task.after.push({
                name: "new_postbuild_task",
                disable: false,
                abortAfterFailed: false,
                command: 'echo "test"',
            });
        },
        delete_postbuild_task: function (item) {

            const index = this.task.after.findIndex((ele) => {
                return ele.name == item.name && ele.command == item.command;
            });

            if (index != -1) {
                this.task.after.splice(index, 1);
            }
        },

        add_to_list: function (list, value) {
            list.push({ value: value })
        },

        delete_from_list: function (list, value) {

            const index = list.findIndex((ele) => {
                return ele.value == value;
            });

            if (index != -1) {
                list.splice(index, 1);
            }
        }
    },
};
</script>