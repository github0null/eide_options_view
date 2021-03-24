<template>
  <div id="app">
    <section class="section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <!-- Tabs with icons -->
                    <div class="mb-4">
                        <small class="text-uppercase font-weight-bold">Builder Options</small>
                    </div>
                    <tabs fill class="flex-column flex-md-row">
                        <card shadow>
                            <tab-pane key="tab1">
                                <template slot="title">
                                    <i class="ni ni-user-run mr-2"></i>User Task
                                </template>

                                <fieldset>
                                  <div class="row mb-3 mt-4">
                                    <legend class="col-2">Prebuild Task</legend>
                                    <base-button class="col-1" size="sm" type="success" @click="add_prebuild_task">Add</base-button>
                                  </div>
                                  <div class="container">
                                    <ul class="list-group">
                                      <li class="list-group-item" v-for="(item, index) in task.before" :key="index">
                                        <form class="pt-4 pb-4">
                                          <div class="form-group row">
                                            <label class="col-2 col-form-label">Task Name</label>
                                            <div class="col-10">
                                              <base-input v-model="item.name"></base-input>
                                            </div>
                                          </div>
                                          <div class="form-group row">
                                            <label class="col-2 col-form-label">Command</label>
                                            <div class="col-10">
                                              <base-input v-model="item.command"></base-input>
                                            </div>
                                          </div>
                                          <fieldset class="form-group row">
                                            <legend class="col-form-label col-2 float-left pt-0">Options</legend>
                                            <div class="col-10">
                                              <base-checkbox class="mt-3 mb-3" v-model="item.disable">Disable</base-checkbox>
                                              <base-checkbox class="mt-3 mb-3" v-model="item.abortAfterFailed">Abort If Failed</base-checkbox>
                                              <base-checkbox class="mt-3 mb-3" v-model="item.stopBuildAfterFailed">Stop Build If Failed</base-checkbox>
                                            </div>
                                          </fieldset>
                                          <div class="form-group">
                                            <div class="col-12">
                                              <base-button class="float-right" size="sm" type="danger" @click="delete_prebuild_task(item)">Delete</base-button>
                                            </div>
                                          </div>
                                        </form>
                                      </li>
                                    </ul>
                                  </div>
                                </fieldset>

                                <fieldset class="mt-4">
                                  <div class="row mb-3 mt-4">
                                    <legend class="col-2">Post-build Task</legend>
                                    <base-button class="col-1" size="sm" type="success" @click="add_postbuild_task">Add</base-button>
                                  </div>
                                  <div class="container">
                                    <ul class="list-group">
                                      <li class="list-group-item" v-for="(item, index) in task.after" :key="index">
                                        <form class="pt-4 pb-4">
                                          <div class="form-group row">
                                            <label class="col-2 col-form-label">Task Name</label>
                                            <div class="col-10">
                                              <base-input v-model="item.name"></base-input>
                                            </div>
                                          </div>
                                          <div class="form-group row">
                                            <label class="col-2 col-form-label">Command</label>
                                            <div class="col-10">
                                              <base-input v-model="item.command"></base-input>
                                            </div>
                                          </div>
                                          <fieldset class="form-group row">
                                            <legend class="col-form-label col-2 float-left pt-0">Options</legend>
                                            <div class="col-10">
                                              <base-checkbox class="mt-3 mb-3" v-model="item.disable">Disable</base-checkbox>
                                              <base-checkbox class="mt-3 mb-3" v-model="item.abortAfterFailed">Abort If Failed</base-checkbox>
                                            </div>
                                          </fieldset>
                                          <div class="form-group">
                                            <div class="col-12">
                                              <base-button class="float-right" size="sm" type="danger" @click="delete_postbuild_task(item)">Delete</base-button>
                                            </div>
                                          </div>
                                        </form>
                                      </li>
                                    </ul>
                                  </div>
                                </fieldset>
                            </tab-pane>

                            <tab-pane key="tab2">
                                <template slot="title">
                                    <i class="ni ni-world mr-2"></i>Global
                                </template>

                                <div class="container">
                                    <div class="col">
                                        <!--dynamic element-->
                                        <div v-for="(item, index) in global.option_list" :key="index">
                                            <div v-if="item.type == 'bool'">
                                                <base-checkbox class="mt-3 mb-3" v-model="item.checked">
                                                    {{item.name}}
                                                </base-checkbox>
                                            </div>
                                            <div v-else-if="item.type == 'enum'">
                                                <base-dropdown class="mt-3 mb-3">
                                                    <a class="mr-2 align-middle">{{ item.name }}</a>
                                                    <base-button outline
                                                        size="sm" type="default" 
                                                        class="dropdown-toggle align-middle"
                                                        data-toggle="dropdown"
                                                    >{{ item.value }}</base-button>
                                                    <div class="dropdown-menu">
                                                        <div v-for="enum_item in item.enums" :key="enum_item">
                                                            <a class="dropdown-item" @click="item.value = enum_item">
                                                                {{enum_item}}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </base-dropdown>
                                            </div>
                                            <div v-else-if="item.type == 'input'">
                                              <div class="mt-2 mb-2 form-group">
                                                <a>{{item.name}}</a>
                                                <base-input class="mt-2" :placeholder="item.placeHolder" v-model="item.value">
                                                </base-input>
                                              </div>
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
                                        <div v-for="(item, index) in cpp.option_list" :key="index">
                                            <div v-if="item.type == 'bool'">
                                                <base-checkbox class="mt-3 mb-3" v-model="item.checked">
                                                    {{item.name}}
                                                </base-checkbox>
                                            </div>
                                            <div v-else-if="item.type == 'enum'">
                                                <base-dropdown class="mt-3 mb-3">
                                                    <label class="mr-2 align-middle">{{ item.name }}</label>
                                                    <base-button outline
                                                        size="sm" type="default" 
                                                        class="dropdown-toggle align-middle"
                                                        data-toggle="dropdown"
                                                    >{{ item.value }}</base-button>
                                                    <div class="dropdown-menu" v-for="enum_item in item.enums" :key="enum_item">
                                                      <a class="dropdown-item" @click="item.value = enum_item">{{enum_item}}</a>
                                                    </div>
                                                </base-dropdown>
                                            </div>
                                            <div v-else-if="item.type == 'input'">
                                              <div class="mt-2 mb-2 form-group">
                                                <a>{{item.name}}</a>
                                                <base-input class="mt-2" :placeholder="item.placeHolder" :value="item.value">
                                                </base-input>
                                              </div>
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
                                        <div v-for="(item, index) in asm.option_list" :key="index">
                                            <div v-if="item.type == 'bool'">
                                                <base-checkbox class="mt-3 mb-3" v-model="item.checked">
                                                    {{item.name}}
                                                </base-checkbox>
                                            </div>
                                            <div v-else-if="item.type == 'enum'">
                                                <base-dropdown class="mt-3 mb-3">
                                                    <a class="mr-2 align-middle">{{ item.name }}</a>
                                                    <base-button outline
                                                        size="sm" type="default" 
                                                        class="dropdown-toggle align-middle"
                                                        data-toggle="dropdown"
                                                    >{{ item.value }}</base-button>
                                                    <div class="dropdown-menu">
                                                        <div v-for="enum_item in item.enums" :key="enum_item">
                                                            <a class="dropdown-item" @click="item.value = enum_item">
                                                                {{enum_item}}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </base-dropdown>
                                            </div>
                                            <div v-else-if="item.type == 'input'">
                                              <div class="mt-2 mb-2 form-group">
                                                <a>{{item.name}}</a>
                                                <base-input class="mt-2" :placeholder="item.placeHolder" :value="item.value">
                                                </base-input>
                                              </div>
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
                                        <div v-for="(item, index) in linker.option_list" :key="index">
                                            <div v-if="item.type == 'bool'">
                                                <base-checkbox class="mt-3 mb-3" v-model="item.checked">
                                                    {{item.name}}
                                                </base-checkbox>
                                            </div>
                                            <div v-else-if="item.type == 'enum'">
                                                <base-dropdown class="mt-3 mb-3">
                                                    <a class="mr-2 align-middle">{{ item.name }}</a>
                                                    <base-button outline
                                                        size="sm" type="default" 
                                                        class="dropdown-toggle align-middle"
                                                        data-toggle="dropdown"
                                                    >{{ item.value }}</base-button>
                                                    <div class="dropdown-menu">
                                                        <div v-for="enum_item in item.enums" :key="enum_item">
                                                            <a class="dropdown-item" @click="item.value = enum_item">
                                                                {{enum_item}}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </base-dropdown>
                                            </div>
                                            <div v-else-if="item.type == 'input'">
                                              <div class="mt-2 mb-2 form-group">
                                                <a>{{item.name}}</a>
                                                <base-input class="mt-2" :placeholder="item.placeHolder" :value="item.value">
                                                </base-input>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tab-pane>
                        </card>
                    </tabs>
                </div>
                <div class="mt-3 col-lg-12">
                    <base-button type="success" class="float-right" @click="onSave">Save All</base-button>
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
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseDropdown from "@/components/BaseDropdown.vue";
import Card from "@/components/Card.vue";

let _instance;

export default {
    name: "App",

    components: {
        Tabs,
        TabPane,
        BaseButton,
        BaseInput,
        BaseDropdown,
        Card,
    },

    // data
    data() {
        return {
            task: {
                before: [
                    {
                        name: "task_before_1",
                        disable: false,
                        abortAfterFailed: false,
                        stopBuildAfterFailed: false,
                        command:
                            "command hjhajskdhajsdh jkahs lkh ashjjkhdsa line",
                    },
                ],
                after: [
                    {
                        name: "task_after_1",
                        disable: false,
                        abortAfterFailed: false,
                        command: "command line",
                    },
                    {
                        name: "task_after_2",
                        disable: true,
                        abortAfterFailed: true,
                        command: "command line",
                    },
                ],
            },
            global: {
                option_list: [
                    {
                        name: "Test 1",
                        type: "bool",
                        checked: false,
                    },
                    {
                        name: "Test 212123131",
                        type: "bool",
                        checked: true,
                    },
                    {
                        name: "Test 3asdasdsadasd",
                        type: "bool",
                        checked: false,
                    },
                    {
                        name: "Test 3",
                        type: "enum",
                        value: "Default",
                        enums: ["Default", "Value_1", "Value_2", "Value_3"],
                    },
                    {
                        name: "Testhsjdfhkjasf 4",
                        type: "bool",
                        checked: false,
                    },
                    {
                        name: "Test 6",
                        type: "bool",
                        checked: false,
                    },
                    {
                        name: "Test 6",
                        type: "input",
                        placeHolder: "input something",
                        value: "hello",
                    },
                ],
            },
            cpp: {
                option_list: [],
            },
            asm: {
                option_list: [],
            },
            linker: {
                option_list: [],
            },
        };
    },

    // mount object
    mounted() {
        _instance = this
    },

    // global methods
    methods: {
        // interface
        getInstance: function () {
            return _instance
        },

        // event
        onSave: function() {
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
    },
};
</script>