<template>
    <div class="json-editor">
        <textarea ref="textarea"></textarea>
    </div>
</template>


<script>
import CodeMirror from 'codemirror';

import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/display/fullscreen.js';


import 'codemirror/addon/lint/lint.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neat.css';

require('script-loader!jsonlint');
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint';

export default {
    name: 'jsonEditor',
    data() {
        return {
            jsonEditor: false
        }
    },
    props: ['value'],
    watch: {
        value(value) {
            const editor_value = this.jsonEditor.getValue();
            if (value !== editor_value) {
                this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
            }
        }
    },
    mounted() {
        this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
            // json 高亮显示
            mode: 'application/json',

            // 显示行号
            lineNumbers: true,

            // 括号匹配
            matchBrackets: true,

            // 全屏模式
            fullScreen: true,

            gutters: ['CodeMirror-lint-markers'],

            foldGutter: true,

            // 设置主题
            theme: 'mdn-like',

            lint: true
        });

        this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
        this.jsonEditor.on('change', cm => {
            this.$emit('changed', cm.getValue())
            this.$emit('input', cm.getValue())
        })
    },
    methods: {
        getValue() {
            return this.jsonEditor.getValue()
        }
    }
}
</script>

<style>
.CodeMirror {
    height: 100%;
}

.json-editor .cm-s-rubyblue span.cm-string {
    color: #F08047;
}
</style>
