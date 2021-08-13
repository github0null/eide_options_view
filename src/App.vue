<template>
  <div id="app">
    <section class="section">
        <div class="container col-10">
            <div class="row justify-content-center">
                <div class="col-12">
                    <!-- Tabs with icons -->
                    <div class="mb-4">
                        <big class="text-uppercase font-weight-bold">{{ get_str('title') }}</big>
                        <base-button type="success" class="float-right" @click="onSave">{{ get_str('title.btn.save') }}</base-button>
                        <base-button outline type="primary" class="float-right mr-4" @click="onOpenConfig">{{ get_str('title.btn.open.config') }}</base-button>
                    </div>
                    <tabs fill class="flex-column flex-md-row">
                        <card shadow>
                            <tab-pane key="tab1">
                                <span slot="title">
                                    <i class="ni ni-user-run mr-2"></i>{{ get_str('title.task') }}
                                </span>

                                <div class="p-4">
                                    <fieldset>
                                        <div class="row mb-3 mt-4">
                                            <legend class="col-3"
                                                data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                :title="get_str('prompt.task.prebuild')"
                                            >{{ get_str('title.task.prebuild') }}</legend>
                                            <div class="col-1">
                                                <base-button  size="sm" type="success" @click="add_prebuild_task">{{ get_str('title.btn.add') }}</base-button>
                                            </div>
                                        </div>
                                        <div class="pr-3 pl-3">
                                            <ul class="list-group">
                                            <li class="list-group-item" v-for="(item, index) in task.before" :key="index">
                                                <form class="pt-4 pb-4">
                                                <div class="form-group row">
                                                    <label class="col-2 col-form-label"
                                                        data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                        :title="get_str('prompt.task.name')">{{ get_str('title.task.name') }}</label>
                                                    <div class="col-5">
                                                    <base-input v-model="item.name"></base-input>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-2 col-form-label"
                                                        data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                        :title="get_str('prompt.task.command')">{{ get_str('title.task.command') }}</label>
                                                    <div class="col-10">
                                                        <textarea class="form-control form-control-alternative mt-2" 
                                                            :style="style.textarea"
                                                            :rows="get_rows_by_value(item.command)" 
                                                            :placeholder="get_str('placeholder.task.command')"
                                                            v-model="item.command">
                                                        </textarea>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <legend class="col-form-label col-2 float-left pt-0">{{ get_str('title.task.options') }}</legend>
                                                    <div class="col-6">
                                                        <base-checkbox class="mt-1 mb-3" v-model="item.disable" 
                                                            data-toggle="tooltip" :data-placement="location.tooltip.options"
                                                            :title="get_str('prompt.task.disable')">Disable</base-checkbox>
                                                        <base-checkbox class="mt-1 mb-3" v-model="item.abortAfterFailed" 
                                                            data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                            :title="get_str('prompt.task.aif')">Abort If Failed</base-checkbox>
                                                        <base-checkbox class="mt-1 mb-3" v-model="item.stopBuildAfterFailed"
                                                            data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                            :title="get_str('prompt.task.sbif')">Stop Build If Failed</base-checkbox>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-12">
                                                    <base-button class="float-right" size="sm" type="danger" @click="delete_prebuild_task(item)">{{ get_str('title.btn.del') }}</base-button>
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
                                                :title="get_str('prompt.task.posbuild')"
                                            >{{ get_str('title.task.posbuild') }}</legend>
                                            <div class="col-1">
                                                <base-button size="sm" type="success" @click="add_postbuild_task">{{ get_str('title.btn.add') }}</base-button>
                                            </div>
                                        </div>
                                        <div class="pr-3 pl-3">
                                            <ul class="list-group">
                                                <li class="list-group-item" v-for="(item, index) in task.after" :key="index">
                                                    <form class="pt-4 pb-4">
                                                        <div class="form-group row">
                                                            <label class="col-2 col-form-label"
                                                                data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                                :title="get_str('prompt.task.name')">{{ get_str('title.task.name') }}</label>
                                                            <div class="col-5">
                                                            <base-input v-model="item.name"></base-input>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-2 col-form-label"
                                                                data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                                :title="get_str('prompt.task.command')">{{ get_str('title.task.command') }}</label>
                                                            <div class="col-10">
                                                                <textarea class="form-control form-control-alternative mt-2" 
                                                                    :style="style.textarea"
                                                                    :rows="get_rows_by_value(item.command)" 
                                                                    :placeholder="get_str('placeholder.task.command')"
                                                                    v-model="item.command">
                                                                </textarea>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <legend class="col-form-label col-2 float-left pt-0">{{ get_str('title.task.options') }}</legend>
                                                            <div class="col-6">
                                                                <base-checkbox class="mt-1 mb-3" v-model="item.disable"
                                                                    data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                                    :title="get_str('prompt.task.disable')">Disable</base-checkbox>
                                                                <base-checkbox class="mt-1 mb-3" v-model="item.abortAfterFailed"
                                                                    data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                                    :title="get_str('prompt.task.aif')">Abort If Failed</base-checkbox>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <div class="col-12">
                                                            <base-button class="float-right" size="sm" type="danger" @click="delete_postbuild_task(item)">{{ get_str('title.btn.del') }}</base-button>
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
                                <span slot="title">
                                    <i class="ni ni-world mr-2"></i>{{ get_str('title.global') }}
                                </span>

                                <div class="container">
                                    <div class="col">
                                        <!--dynamic element-->
                                        <div v-for="(item, index) in global" :key="index">
                                            <div v-if="item.type == 'bool'">
                                                <base-checkbox 
                                                    class="mt-3 mb-3 col-12" 
                                                    v-model="item.value"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                    :title="item.description||''"
                                                >
                                                    {{ get_readable_name(item) }}
                                                </base-checkbox>
                                            </div>
                                            <div class="form-inline mt-1 mb-1" v-else-if="item.type == 'enum'">
                                                <select class="col-2 custom-select custom-select-sm" 
                                                    v-model="item.value">
                                                    <option v-for="(enum_item, enum_index) in item.enums" :key="enum_index" :value="enum_item">
                                                        {{enum_item}}
                                                    </option>
                                                </select>
                                                <a 
                                                    class="col-10 col-form-label"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</a>
                                            </div>
                                            <div class="mt-3 mb-1 form-group row" v-else-if="item.type == 'short_input'">
                                                <label class="col-3 col-form-label pr-0 mr-0"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</label>
                                                <div class="col-5">
                                                    <base-input 
                                                        :placeholder="item.placeHolder || ''" 
                                                        v-model="item.value">
                                                    </base-input>
                                                </div>
                                            </div>
                                            <div class="mt-4 mb-2 form-group" v-else-if="item.type == 'input'">
                                                <a data-toggle="tooltip" :data-placement="location.tooltip.title" 
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</a>
                                                <base-input class="mt-2" :placeholder="item.placeHolder || ''" 
                                                    v-model="item.value">
                                                </base-input>
                                            </div>
                                            <div class="mt-4 mb-2 form-group" v-else-if="item.type == 'textarea'">
                                                <a data-toggle="tooltip" :data-placement="location.tooltip.title" 
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</a>
                                                <textarea class="form-control form-control-alternative mt-2" 
                                                    :style="style.textarea"
                                                    :rows="get_rows_by_value(item.value)" 
                                                    :placeholder="item.placeHolder || ''"
                                                    v-model="item.value">
                                                </textarea>
                                            </div>
                                            <div class="mb-2" v-else-if="item.type == 'array'">
                                                <div class="form-inline mb-2 mt-2">
                                                    <a class="mr-4" data-toggle="tooltip" 
                                                        :data-placement="location.tooltip.options" 
                                                        :title="item.description||''"
                                                    >{{ get_readable_name(item) }}</a>
                                                    <base-button class="float-right" size="sm" type="success" @click="add_to_list(item.value, '')">{{ get_str('title.btn.add') }}</base-button>
                                                </div>
                                                <ul class="list-group">
                                                    <li class="list-group-item" v-for="(ele, ele_index) in item.value" :key="ele_index">
                                                        <div class="form-inline">
                                                            <div class="input-group input-group-sm w-50">
                                                                <input type="text" class="form-control" v-model="ele.value">
                                                            </div>
                                                            <base-button class="ml-4" size="sm" type="danger" 
                                                                @click="delete_from_list(item.value, ele.value)"
                                                            >{{ get_str('title.btn.del') }}</base-button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tab-pane>

                            <tab-pane key="tab3">
                                <span slot="title">
                                    <i class="ni ni-settings mr-2"></i>{{ get_str('title.c/c++') }}
                                </span>

                                <div class="container">
                                    <div class="col">
                                        <!--dynamic element-->
                                        <div v-for="(item, index) in cpp" :key="index">
                                            <div v-if="item.type == 'bool'">
                                                <base-checkbox 
                                                    class="mt-3 mb-3 col-12" 
                                                    v-model="item.value"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                    :title="item.description||''"
                                                >
                                                    {{ get_readable_name(item) }}
                                                </base-checkbox>
                                            </div>
                                            <div class="form-inline mt-1 mb-1" v-else-if="item.type == 'enum'">
                                                <select class="col-2 custom-select custom-select-sm" 
                                                    v-model="item.value">
                                                    <option v-for="(enum_item, enum_index) in item.enums" :key="enum_index" :value="enum_item">
                                                        {{enum_item}}
                                                    </option>
                                                </select>
                                                <a 
                                                    class="col-10 col-form-label"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</a>
                                            </div>
                                            <div class="mt-3 mb-1 form-group row" v-else-if="item.type == 'short_input'">
                                                <label class="col-3 col-form-label pr-0 mr-0"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</label>
                                                <div class="col-5">
                                                    <base-input 
                                                        :placeholder="item.placeHolder || ''" 
                                                        v-model="item.value">
                                                    </base-input>
                                                </div>
                                            </div>
                                            <div class="mt-4 mb-2 form-group" v-else-if="item.type == 'input'">
                                                <a data-toggle="tooltip" :data-placement="location.tooltip.title" 
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</a>
                                                <base-input class="mt-2" :placeholder="item.placeHolder || ''" 
                                                    v-model="item.value">
                                                </base-input>
                                            </div>
                                            <div class="mt-4 mb-2 form-group" v-else-if="item.type == 'textarea'">
                                                <a data-toggle="tooltip" :data-placement="location.tooltip.title" 
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</a>
                                                <textarea class="form-control form-control-alternative mt-2" 
                                                    :style="style.textarea"
                                                    :rows="get_rows_by_value(item.value)" 
                                                    :placeholder="item.placeHolder || ''"
                                                    v-model="item.value">
                                                </textarea>
                                            </div>
                                            <div class="mb-2" v-else-if="item.type == 'array'">
                                                <div class="form-inline mb-2 mt-2">
                                                    <a class="mr-4" data-toggle="tooltip" 
                                                        :data-placement="location.tooltip.options" 
                                                        :title="item.description||''"
                                                    >{{ get_readable_name(item) }}</a>
                                                    <base-button class="float-right" size="sm" type="success" @click="add_to_list(item.value, '')">{{ get_str('title.btn.add') }}</base-button>
                                                </div>
                                                <ul class="list-group">
                                                    <li class="list-group-item" v-for="(ele, ele_index) in item.value" :key="ele_index">
                                                        <div class="form-inline">
                                                            <div class="input-group input-group-sm w-50">
                                                                <input type="text" class="form-control" v-model="ele.value">
                                                            </div>
                                                            <base-button class="ml-4" size="sm" type="danger" 
                                                                @click="delete_from_list(item.value, ele.value)"
                                                            >{{ get_str('title.btn.del') }}</base-button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tab-pane>

                            <tab-pane key="tab4">
                                <span slot="title">
                                    <i class="ni ni-settings mr-2"></i>{{ get_str('title.asmber') }}
                                </span>

                                <div class="container">
                                    <div class="col">
                                        <!--dynamic element-->
                                        <div v-for="(item, index) in asm" :key="index">
                                            <div v-if="item.type == 'bool'">
                                                <base-checkbox 
                                                    class="mt-3 mb-3 col-12" 
                                                    v-model="item.value"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                    :title="item.description||''"
                                                >
                                                    {{ get_readable_name(item) }}
                                                </base-checkbox>
                                            </div>
                                            <div class="form-inline mt-1 mb-1" v-else-if="item.type == 'enum'">
                                                <select class="col-2 custom-select custom-select-sm" 
                                                    v-model="item.value">
                                                    <option v-for="(enum_item, enum_index) in item.enums" :key="enum_index" :value="enum_item">
                                                        {{enum_item}}
                                                    </option>
                                                </select>
                                                <a 
                                                    class="col-10 col-form-label"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</a>
                                            </div>
                                            <div class="mt-3 mb-1 form-group row" v-else-if="item.type == 'short_input'">
                                                <label class="col-3 col-form-label pr-0 mr-0"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</label>
                                                <div class="col-5">
                                                    <base-input 
                                                        :placeholder="item.placeHolder || ''" 
                                                        v-model="item.value">
                                                    </base-input>
                                                </div>
                                            </div>
                                            <div class="mt-4 mb-2 form-group" v-else-if="item.type == 'input'">
                                                <a data-toggle="tooltip" :data-placement="location.tooltip.title" 
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</a>
                                                <base-input class="mt-2" :placeholder="item.placeHolder || ''" 
                                                    v-model="item.value">
                                                </base-input>
                                            </div>
                                            <div class="mt-4 mb-2 form-group" v-else-if="item.type == 'textarea'">
                                                <a data-toggle="tooltip" :data-placement="location.tooltip.title" 
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</a>
                                                <textarea class="form-control form-control-alternative mt-2" 
                                                    :style="style.textarea"
                                                    :rows="get_rows_by_value(item.value)" 
                                                    :placeholder="item.placeHolder || ''"
                                                    v-model="item.value">
                                                </textarea>
                                            </div>
                                            <div class="mb-2" v-else-if="item.type == 'array'">
                                                <div class="form-inline mb-2 mt-2">
                                                    <a class="mr-4" data-toggle="tooltip" 
                                                        :data-placement="location.tooltip.options" 
                                                        :title="item.description||''"
                                                    >{{ get_readable_name(item) }}</a>
                                                    <base-button class="float-right" size="sm" type="success" @click="add_to_list(item.value, '')">{{ get_str('title.btn.add') }}</base-button>
                                                </div>
                                                <ul class="list-group">
                                                    <li class="list-group-item" v-for="(ele, ele_index) in item.value" :key="ele_index">
                                                        <div class="form-inline">
                                                            <div class="input-group input-group-sm w-50">
                                                                <input type="text" class="form-control" v-model="ele.value">
                                                            </div>
                                                            <base-button class="ml-4" size="sm" type="danger" 
                                                                @click="delete_from_list(item.value, ele.value)"
                                                            >{{ get_str('title.btn.del') }}</base-button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tab-pane>

                            <tab-pane key="tab5">
                                <span slot="title">
                                    <i class="ni ni-settings mr-2"></i>{{ get_str('title.linker') }}
                                </span>

                                <div class="container">
                                    <div class="col">
                                        <!--dynamic element-->
                                        <div v-for="(item, index) in linker" :key="index">
                                            <div v-if="item.type == 'bool'">
                                                <base-checkbox 
                                                    class="mt-3 mb-3 col-12" 
                                                    v-model="item.value"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                    :title="item.description||''"
                                                >
                                                    {{ get_readable_name(item) }}
                                                </base-checkbox>
                                            </div>
                                            <div class="form-inline mt-1 mb-1" v-else-if="item.type == 'enum'">
                                                <select class="col-2 custom-select custom-select-sm" 
                                                    v-model="item.value">
                                                    <option v-for="(enum_item, enum_index) in item.enums" :key="enum_index" :value="enum_item">
                                                        {{enum_item}}
                                                    </option>
                                                </select>
                                                <a 
                                                    class="col-10 col-form-label"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.options" 
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</a>
                                            </div>
                                            <div class="mt-3 mb-1 form-group row" v-else-if="item.type == 'short_input'">
                                                <label class="col-3 col-form-label pr-0 mr-0"
                                                    data-toggle="tooltip" :data-placement="location.tooltip.title"
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</label>
                                                <div class="col-5">
                                                    <base-input 
                                                        :placeholder="item.placeHolder || ''" 
                                                        v-model="item.value">
                                                    </base-input>
                                                </div>
                                            </div>
                                            <div class="mt-4 mb-2 form-group" v-else-if="item.type == 'input'">
                                                <a data-toggle="tooltip" :data-placement="location.tooltip.title" 
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</a>
                                                <base-input class="mt-2" :placeholder="item.placeHolder || ''" 
                                                    v-model="item.value">
                                                </base-input>
                                            </div>
                                            <div class="mt-4 mb-2 form-group" v-else-if="item.type == 'textarea'">
                                                <a data-toggle="tooltip" :data-placement="location.tooltip.title" 
                                                    :title="item.description||''"
                                                >{{ get_readable_name(item) }}</a>
                                                <textarea class="form-control form-control-alternative mt-2" 
                                                    :style="style.textarea"
                                                    :rows="get_rows_by_value(item.value)" 
                                                    :placeholder="item.placeHolder || ''"
                                                    v-model="item.value">
                                                </textarea>
                                            </div>
                                            <div class="mb-2" v-else-if="item.type == 'array'">
                                                <div class="form-inline mb-2 mt-2">
                                                    <a class="mr-4" data-toggle="tooltip" 
                                                        :data-placement="location.tooltip.options" 
                                                        :title="item.description||''"
                                                    >{{ get_readable_name(item) }}</a>
                                                    <base-button class="float-right" size="sm" type="success" @click="add_to_list(item.value, '')">{{ get_str('title.btn.add') }}</base-button>
                                                </div>
                                                <ul class="list-group">
                                                    <li class="list-group-item" v-for="(ele, ele_index) in item.value" :key="ele_index">
                                                        <div class="form-inline">
                                                            <div class="input-group input-group-sm w-50">
                                                                <input type="text" class="form-control" v-model="ele.value">
                                                            </div>
                                                            <base-button class="ml-4" size="sm" type="danger" 
                                                                @click="delete_from_list(item.value, ele.value)"
                                                            >{{ get_str('title.btn.del') }}</base-button>
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
@font-face {
    font-family: Consolas;
    src: url("assets/fonts/consola.ttf");
}

legend {
    font-size: 1rem !important;
}

section {
    color: var(--vscode-editor-foreground) !important;
    background-color: var(--vscode-editor-background) !important;
}

.nav-link {
    color: var(--vscode-editor-foreground) !important;
    background-color: var(--vscode-editor-background) !important;
    border: 1px solid var(--vscode-button-background) !important;
}

.nav-pills,
.card,
.card-body,
.list-group-item,
.custom-select,
.custom-form {
    color: var(--vscode-editor-foreground) !important;
    background-color: var(--vscode-editor-background) !important;
}

.custom-checkbox .custom-control-label:before {
    background-color: var(--vscode-editor-background);
    border-color: var(--vscode-input-placeholderForeground);
}

.card-body {
    border-radius: 4px;
    box-shadow: 0 5px 15px var(--vscode-input-background);
}

.nav-pills.show>.nav-link {
    color: var(--vscode-editor-foreground) !important;
    background-color: var(--vscode-button-background) !important;
    border: 1px solid var(--vscode-button-background) !important;
}

base-input {
    color: var(--vscode-input-foreground) !important; /* set font color for input */
    background-color: var(--vscode-editor-background) !important;
    font-family: Consolas !important;
    border: 1px solid var(--vscode-input-placeholderForeground) !important;
    border-radius: .25rem !important;
}

input {
    color: var(--vscode-input-foreground) !important; /* set font color for input */
    background-color: var(--vscode-editor-background) !important;
    font-family: Consolas !important;
    border: 1px solid var(--vscode-input-placeholderForeground) !important;
    border-radius: .25rem !important;
}

.list-group-item {
    border: none !important;
    border-color: var(--vscode-input-placeholderForeground) !important;
}

.form-control-alternative {
    color: var(--vscode-input-foreground) !important; /* set font color for input */
    background-color: var(--vscode-editor-background) !important;
    border: 1px solid var(--vscode-input-placeholderForeground) !important;
    border-radius: .25rem !important;
}

.form-control {
    border: 1px solid var(--vscode-input-placeholderForeground) !important;
    border-radius: .25rem !important;
}

.form-control::-webkit-input-placeholder {
    color: var(--vscode-input-placeholderForeground) !important;
}

select,
.custom-select {
    border: 1px solid var(--vscode-input-placeholderForeground) !important;
    border-radius: .25rem !important;
}

/* actions */

.nav-pills.active,
.nav-link.active {
    color: var(--vscode-button-foreground) !important;
    background-color: var(--vscode-button-background) !important;
    border: 1px solid var(--vscode-button-background) !important;
}

a:focus,
input:focus,
select:focus,
.custom-select:focus {
    outline: none !important; /* remove outline when get focus */
}

select:focus,
.custom-select:focus {
    border: 1px solid var(--vscode-focusBorder) !important;
    border-radius: .25rem !important;
}

base-input:focus,
input:focus,
.form-control:focus,
.form-control-alternative:focus {
    border: 1px solid var(--vscode-focusBorder) !important;
    border-radius: .25rem !important;
    box-shadow: 0 1px 3px var(--vscode-focusBorder);
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
            lang: 'default',
            strs: {
                'default': {
                    'title': 'Builder Options',

                    'title.task': 'User Task',
                    'title.global': 'Global',
                    'title.c/c++': 'C/C++ Compiler',
                    'title.asmber': 'Assembler',
                    'title.linker': 'Linker',

                    'title.task.prebuild': 'Prebuild Task',
                    'title.task.posbuild': 'Post Build Task',
                    'title.task.name': 'Task Name',
                    'title.task.command': 'Command',
                    'title.task.options': 'Options',
                    
                    'prompt.task.prebuild': 'Run some shell task before build',
                    'prompt.task.posbuild': 'Run some shell task after build done',
                    'prompt.task.name': 'A Human-Readable Name',
                    'prompt.task.command': 'Shell Command Line',
                    'prompt.task.disable': 'Disable this command',
                    'prompt.task.aif': 'Whether to skip subsequent commands if this command is failed',
                    'prompt.task.sbif': 'Whether to stop building directly when this command is failed',
                    'placeholder.task.command': 'Input shell commands',

                    'title.btn.add': 'Add',
                    'title.btn.del': 'Delete',
                    'title.btn.save': 'Save All',
                    'title.btn.open.config': 'Open Config',
                },
                'zh-cn': {
                    'title': '构建器选项',

                    'title.task': '用户任务',
                    'title.global': '全局',
                    'title.c/c++': 'C/C++ 编译器',
                    'title.asmber': '汇编器',
                    'title.linker': '链接器',
                    
                    'title.task.prebuild': '构建前任务',
                    'title.task.posbuild': '构建后任务',
                    'title.task.name': '任务名称',
                    'title.task.command': '命令',
                    'title.task.options': '选项',

                    'prompt.task.prebuild': '指定一些任务，将在构建开始前运行',
                    'prompt.task.posbuild': '指定一些任务，将在构建完成后运行',
                    'prompt.task.name': '用于显示的只读名称',
                    'prompt.task.command': 'Shell 命令行',
                    'prompt.task.disable': '禁用该任务',
                    'prompt.task.aif': '如果失败，则跳过后续命令',
                    'prompt.task.sbif': '如果失败，则停止构建',
                    'placeholder.task.command': '输入 Shell 命令行',

                    'title.btn.add': '添加',
                    'title.btn.del': '删除',
                    'title.btn.save': '全部保存',
                    'title.btn.open.config': '打开配置',
                }
            },
            style: {
                textarea: 'font-family: Consolas'
            },
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

        forceUpdate: function() {
            this.$forceUpdate()
        },

        // event
        onSave: function () {
            _instance.$emit('save-all')
        },

        onOpenConfig: function () {
            _instance.$emit('open-config')
        },

        // resource
        get_str: function(label) {

            if (this.strs[this.lang] && this.strs[this.lang][label] !== undefined) { 
                return this.strs[this.lang][label]; 
            }

            return this.strs['default'][label] || label;
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
        },

        get_readable_name: function (item) {

            if (item.disable_readable_name) {
                return this.to_readable_name(item.name)
            }

            return item.readable_name
                || item.description
                || this.to_readable_name(item.name)
        },

        to_readable_name: function (name) {

            const str = name.replace(/-/g, ' ').replace(/#/g, '/').replace(/\$/g, '')

            let result = ''
            let prev_char = ''

            const isLower = (str) => { return str >= 'a' && str <= 'z' }
            const isUpper = (str) => { return str >= 'A' && str <= 'Z' }

            for (const char of str) {
                if (isUpper(char) && isLower(prev_char)) result += ' '
                result += char
                prev_char = char
            }

            return result
        },

        get_rows_by_value: function (value) {
            const rows = value.length / 60 + (value.length % 60 > 0)
            return rows || 1
        }
    },
};

/* active bootstrap components */

// eslint-disable-next-line no-undef
$(function () { $('[data-toggle="popover"]').popover() });
// eslint-disable-next-line no-undef
$(function () { $('[data-toggle="tooltip"]').tooltip() });

</script>
