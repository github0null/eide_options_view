<template>
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

                                <div class="container"></div>
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
                                                <base-input class="mt-2" :placeholder="item.placeHolder" :value="item.value">
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
                    <base-button
                        type="success"
                        class="float-right"
                    >Save All</base-button>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
</style>

<script>
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";

export default {
    name: "MainView",
    components: {
        Tabs,
        TabPane,
    },
    data() {
        return {
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
};
</script>
