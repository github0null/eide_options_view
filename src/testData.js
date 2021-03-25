

export default {

    modelObj: {
        "title":"IAR for STM8 Options",
        "$schema":"http://json-schema.org/draft-04/schema#",
        "type":"object",
        "definitions":{
            "misc-controls":{
                "markdownDescription":"自定义选项 (custom options)",
                "type":[
                    "string",
                    "array"
                ],
                "items":{
                    "type":"string"
                },
                "default":""
            }
        },
        "properties":{
            "beforeBuildTasks":{
                "markdownDescription":"编译前要执行的命令列表 (List of commands to execute before compiling)",
                "type":"array",
                "default":[
                    {
                        "name":"clean",
                        "command":"del /Q \"${OutDir}\\*.*\""
                    }
                ],
                "items":{
                    "type":"object",
                    "required":[
                        "name",
                        "command"
                    ],
                    "properties":{
                        "name":{
                            "markdownDescription":"用于显示的可读名称 (A readable name for display)",
                            "type":"string"
                        },
                        "command":{
                            "markdownDescription":"CMD 命令行 (CMD command line)",
                            "type":"string"
                        },
                        "disable":{
                            "markdownDescription":"禁用此命令 (disable this command)",
                            "type":"boolean",
                            "enum":[
                                true,
                                false
                            ]
                        },
                        "abortAfterFailed":{
                            "markdownDescription":"是否在此命令失败时，跳过后续的命令 (Whether to skip subsequent commands if this command fails)",
                            "type":"boolean",
                            "default":true,
                            "enum":[
                                true,
                                false
                            ]
                        },
                        "stopBuildAfterFailed":{
                            "markdownDescription":"是否在此命令失败时，直接停止编译 (Whether to stop compiling directly when this command fails)",
                            "type":"boolean",
                            "default":true,
                            "enum":[
                                true,
                                false
                            ]
                        }
                    }
                }
            },
            "afterBuildTasks":{
                "markdownDescription":"编译结束后要执行的命令列表 (List of commands to execute after compilation)",
                "type":"array",
                "default":[
                    {
                        "name":"clean",
                        "command":"del \"${OutDir}\\*._*\""
                    }
                ],
                "items":{
                    "type":"object",
                    "required":[
                        "name",
                        "command"
                    ],
                    "properties":{
                        "name":{
                            "markdownDescription":"用于显示的可读名称 (A readable name for display)",
                            "type":"string"
                        },
                        "command":{
                            "markdownDescription":"CMD 命令行 (CMD command line)",
                            "type":"string"
                        },
                        "disable":{
                            "markdownDescription":"禁用此命令 (disable this command)",
                            "type":"boolean",
                            "enum":[
                                true,
                                false
                            ]
                        },
                        "abortAfterFailed":{
                            "markdownDescription":"是否在此命令失败时，跳过后续的命令 (Whether to skip subsequent commands if this command fails)",
                            "type":"boolean",
                            "default":true,
                            "enum":[
                                true,
                                false
                            ]
                        }
                    }
                }
            },
            "global":{
                "markdownDescription":"全局选项 (Global options)",
                "type":"object",
                "properties":{
                    "misc-controls":{
                        "$ref":"#/definitions/misc-controls"
                    },
                    "data-mode":{
                        "description":"data mode",
                        "type":"string",
                        "default":"medium",
                        "enum":[
                            "small",
                            "medium",
                            "large"
                        ]
                    },
                    "code-mode":{
                        "description":"code mode",
                        "type":"string",
                        "default":"small",
                        "enum":[
                            "small",
                            "medium",
                            "large"
                        ]
                    },
                    "output-debug-info":{
                        "markdownDescription":"输出调试信息 (Output debug information)",
                        "type":"string",
                        "default":"enable",
                        "enum":[
                            "disable",
                            "enable"
                        ],
                        "enumDescriptions":[
                            "禁用 (disable)",
                            "开启 (enable)"
                        ]
                    },
                    "printf-formatter":{
                        "type":"string",
                        "description":"printf formatter option",
                        "default":"tiny",
                        "enum":[
                            "auto",
                            "tiny",
                            "small",
                            "small-without-multibyte",
                            "large",
                            "large-without-multibyte",
                            "full",
                            "full-without-multibyte"
                        ],
                        "enumDescriptions":[
                            "Automatic choice of formatter.",
                            "No specifier a or A, no specifier n, no float, no flags.",
                            "No specifier a or A, no specifier n, no float.",
                            "No specifier a or A, no specifier n, no float, without multibytes",
                            "No specifier a or A.",
                            "No specifier a or A, without multibytes.",
                            "Full formatting.",
                            "Full formatting, without multibytes."
                        ]
                    },
                    "scanf-formatter":{
                        "type":"string",
                        "description":"scanf formatter option",
                        "default":"small",
                        "enum":[
                            "auto",
                            "small",
                            "small-without-multibyte",
                            "large",
                            "large-without-multibyte",
                            "full",
                            "full-without-multibyte"
                        ],
                        "enumDescriptions":[
                            "Automatic choice of formatter.",
                            "No specifier n, no float, no scan set, no assignment suppressing.",
                            "No specifier n, no float, no scan set, no assignment suppressing, without multibytes.",
                            "No specifier n, no float.",
                            "No specifier n, no float, without multibytes.",
                            "Full formatting.",
                            "Full formatting, without multibytes."
                        ]
                    },
                    "math-functions":{
                        "type":"string",
                        "description":"math functions option",
                        "default":"smaller",
                        "enum":[
                            "default",
                            "smaller"
                        ],
                        "enumDescriptions":[
                            "Default variants of cos, sin, tan, log, log10, pow, and exp.",
                            "Smaller size, higher execution speed, less precision, smaller input range."
                        ]
                    }
                }
            },
            "c/cpp-compiler":{
                "markdownDescription":"c/c++ 编译器选项 (C/C++ Compiler options)",
                "type":"object",
                "properties":{
                    "misc-controls":{
                        "$ref":"#/definitions/misc-controls"
                    },
                    "language-c":{
                        "markdownDescription":"要使用的 C 标准 (C standard)",
                        "type":"string",
                        "default":"c99",
                        "enum":[
                            "c89",
                            "c99"
                        ]
                    },
                    "language-cpp":{
                        "markdownDescription":"要使用的 C++ 标准 (C++ standard)",
                        "type":"string",
                        "default":"Extended-EC++",
                        "enum":[
                            "Embedded-C++",
                            "Extended-EC++"
                        ]
                    },
                    "optimization":{
                        "markdownDescription":"代码优化级别 (optimization level)",
                        "type":"string",
                        "default":"low",
                        "enum":[
                            "no",
                            "low",
                            "medium",
                            "high",
                            "size",
                            "speed",
                            "speed-no-size-constraints"
                        ],
                        "enumDescriptions":[
                            "不优化 (not optimize)",
                            "低 (low)",
                            "中 (medium)",
                            "高, 平衡 (high, balanced)",
                            "高, 侧重于大小 (high, size)",
                            "高, 侧重于速度 (high, speed)",
                            "高, 侧重于速度, 不限制大小 (high, speed, no size constraints)"
                        ]
                    },
                    "runtime-lib":{
                        "description":"The C/EC++ runtime library configuration",
                        "type":"string",
                        "default":"normal",
                        "enum":[
                            "normal",
                            "full",
                            "null"
                        ],
                        "enumDescriptions":[
                            "No locale interface, C locale, no file descriptor support, no multibytes in printf and scanf, and no hex floats in strtod.",
                            "Full locale interface, C locale, file descriptor support, multibytes in printf and scanf, and hex floats in strtod.",
                            "No use"
                        ]
                    },
                    "destroy-cpp-static-object":{
                        "description":"destroy c++ static object",
                        "type":"boolean",
                        "default":true,
                        "enum":[
                            true,
                            false
                        ]
                    },
                    "allow-VLA":{
                        "description":"allow VLA, for language c",
                        "type":"boolean",
                        "enum":[
                            true,
                            false
                        ]
                    },
                    "use-cpp-inline-semantics":{
                        "description":"use c++ inline semantics, for language c++",
                        "type":"boolean",
                        "enum":[
                            true,
                            false
                        ]
                    },
                    "require-prototypes":{
                        "description":"require prototypes",
                        "type":"boolean",
                        "enum":[
                            true,
                            false
                        ]
                    },
                    "language-conformance":{
                        "description":"language conformance",
                        "type":"string",
                        "enum":[
                            "strict",
                            "standard",
                            "IAR-extensions"
                        ]
                    },
                    "floating-point":{
                        "description":"floating point",
                        "type":"boolean",
                        "enum":[
                            true,
                            false
                        ]
                    },
                    "multibyte-support":{
                        "description":"multibyte support",
                        "type":"boolean",
                        "enum":[
                            true,
                            false
                        ]
                    },
                    "virtual-bytes":{
                        "description":"virtual bytes",
                        "type":"string",
                        "default":"16",
                        "enum":[
                            "16",
                            "12"
                        ]
                    },
                    "plain-char-is-signed":{
                        "markdownDescription":"Plain Char is Signed",
                        "type":"boolean",
                        "enum":[
                            true,
                            false
                        ]
                    },
                    "turn-Warning-into-errors":{
                        "markdownDescription":"将警告转化为错误 (Turn warnings into errors)",
                        "type":"boolean",
                        "default":true,
                        "enum":[
                            true,
                            false
                        ]
                    }
                }
            },
            "asm-compiler":{
                "markdownDescription":"汇编器选项 (Assembler options)",
                "type":"object",
                "properties":{
                    "misc-controls":{
                        "$ref":"#/definitions/misc-controls"
                    },
                    "case-sensitive-user-symbols":{
                        "description":"case sensitive user symbols",
                        "type":"boolean",
                        "enum":[
                            true,
                            false
                        ]
                    },
                    "multibyte-support":{
                        "description":"multibyte support",
                        "type":"boolean",
                        "enum":[
                            true,
                            false
                        ]
                    },
                    "allow-mnemonics-first-column":{
                        "description":"allow mnemonics first column",
                        "type":"boolean",
                        "enum":[
                            true,
                            false
                        ]
                    },
                    "allow-directives-first-column":{
                        "description":"allow directives first column",
                        "type":"boolean",
                        "enum":[
                            true,
                            false
                        ]
                    }
                }
            },
            "linker":{
                "markdownDescription":"链接器选项 (Linker options)",
                "type":"object",
                "required":[
                    "linker-config"
                ],
                "dependencies":{
                    "use-C_SPY-debug-lib":[
                        "auto-search-runtime-lib"
                    ]
                },
                "properties":{
                    "misc-controls":{
                        "$ref":"#/definitions/misc-controls"
                    },
                    "auto-search-runtime-lib":{
                        "description":"auto search runtime lib",
                        "type":"boolean",
                        "default":true,
                        "enum":[
                            true,
                            false
                        ]
                    },
                    "use-C_SPY-debug-lib":{
                        "description":"Use C-SPY debug library",
                        "type":"boolean",
                        "default":true,
                        "enum":[
                            true,
                            false
                        ]
                    },
                    "merge-duplicate-sections":{
                        "description":"merge duplicate sections",
                        "type":"boolean",
                        "default":true,
                        "enum":[
                            true,
                            false
                        ]
                    },
                    "linker-config":{
                        "description":"linker config file path.\n Example: \"lnkstm8s103f3.icf\"\n or \"./lnkstm8s103f3.icf\" (relative by workspace folder)\n or \"${ToolDir}/stm8/config/lnkstm8s103f3.icf\"",
                        "type":"string",
                        "default":"lnkstm8s103f3.icf"
                    },
                    "config-defines":{
                        "description":"define some config symbols",
                        "type":"array",
                        "default":[
                            "_CSTACK_SIZE=0x0200",
                            "_HEAP_SIZE=0x0000"
                        ],
                        "items":{
                            "type":"string"
                        }
                    },
                    "program-entry":{
                        "description":"program entry",
                        "type":"string",
                        "default":"__iar_program_start"
                    },
                    "output-format":{
                        "type":"string",
                        "default":"elf",
                        "description":"输出格式 (output format)",
                        "enum":[
                            "elf",
                            "lib"
                        ],
                        "enumDescriptions":[
                            "可执行文件 (executable file)",
                            "静态库 (static library)"
                        ]
                    }
                }
            }
        }
    },

    testData: {
        "beforeBuildTasks":[
    
        ],
        "afterBuildTasks":[
            {
                "name":"clean",
                "command":"del \"${OutDir}\\*._*\""
            }
        ],
        "global":{
            "printf-formatter":"tiny",
            "scanf-formatter":"small",
            "math-functions":"default",
            "output-debug-info":"enable",
            "data-mode":"medium",
            "code-mode":"small"
        },
        "c/cpp-compiler":{
            "optimization":"no",
            "destroy-cpp-static-object":true,
            "runtime-lib":"normal"
        },
        "asm-compiler":{
            "case-sensitive-user-symbols":true
        },
        "linker":{
            "linker-config":"lnkstm8s103f3.icf",
            "config-defines":[
                "_CSTACK_SIZE=0x0200",
                "_HEAP_SIZE=0x0000"
            ],
            "auto-search-runtime-lib":true,
            "use-C_SPY-debug-lib":true,
            "output-format":"elf"
        },
        "version":5
    }
}