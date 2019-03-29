webpackJsonp([2],{319:function(t,e,n){var r=n(2)(n(541),n(839),null,null,null);t.exports=r.exports},418:function(t,e,n){function r(t){n(489)}var o=n(2)(n(420),n(495),r,"data-v-38dce782",null);t.exports=o.exports},420:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){n(120);e.default={props:{autoUpload:{type:Boolean,default:!0},defaultImage:{type:String,default:""},defaultFileType:{type:Array,default:function(){return[]}},defaultFileSize:{type:Number,default:100}},data:function(){return{remoteHost:"图片上传地址",remoteURL:"",uploadImage:""}},computed:{displayImage:function(){return this.defaultImage}},mounted:function(){this.getRemoteURL()},methods:{getRemoteURL:function(){this.remoteURL=this.remoteHost+"/upload"},afterAvatarSuccess:function(t,e){this.uploadImage=URL.createObjectURL(e.raw)},beforeAvatarUpload:function(t){var e=!0;this.defaultFileType.length>0&&0==this.defaultFileType.includes(t.type)&&(e=!1);var n=t.size/1024/1024<this.defaultFileSize;return e||this.$message.error("上传文件格式错误"),n||this.$message.error("上传文件大小超过限制"),e&&n},myUpload:function(e){var n=this,r=e.file,o=this.remoteURL,a=new FormData;a.append("op","upload"),a.append("fileContent",r),a.append("insertOnly","0");var i={async:!0,crossDomain:!0,url:o,method:"POST",processData:!1,contentType:!1,mimeType:"multipart/form-data",data:a};t.ajax(i).done(function(t){t=JSON.parse(t),t.data.access_url=t.data.access_url,t.data.source_url=t.data.source_url,t.data.url=t.data.url,n.uploadImage=t.data.source_url,n.$emit("upload",t.data),n.$message.success("文件上传成功")}).fail(function(t){n.$message.error("文件上传失败，请重新上传")})},commitForm:function(){this.$refs.upload.submit()}}}}.call(e,n(527))},432:function(t,e,n){e=t.exports=n(301)(!0),e.push([t.i,".avatar-uploader[data-v-38dce782]{margin-bottom:10px}.avatar-uploader-icon[data-v-38dce782]{border:1px double #8c939d;border-radius:10px;color:#8c939d;font-size:28px;width:178px;height:178px;line-height:178px;text-align:center}.avatar-uploader-icon[data-v-38dce782]:hover{border:1.5px dashed #20a0ff;color:#20a0ff}.avatar-uploader-image[data-v-38dce782]{width:178px;height:178px;display:block}","",{version:3,sources:["G:/tmp/vue--authority/src/components/Upload/oneFileUpload.vue"],names:[],mappings:"AACA,kCACI,kBAAoB,CACvB,AACD,uCACI,0BAA2B,AAC3B,mBAAoB,AACpB,cAAe,AACf,eAAgB,AAChB,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,iBAAmB,CACtB,AACD,6CACI,4BAA6B,AAC7B,aAAe,CAClB,AACD,wCACI,YAAa,AACb,aAAc,AACd,aAAe,CAClB",file:"oneFileUpload.vue",sourcesContent:["\n.avatar-uploader[data-v-38dce782] {\r\n    margin-bottom: 10px;\n}\n.avatar-uploader-icon[data-v-38dce782] {\r\n    border: 1px double #8c939d;\r\n    border-radius: 10px;\r\n    color: #8c939d;\r\n    font-size: 28px;\r\n    width: 178px;\r\n    height: 178px;\r\n    line-height: 178px;\r\n    text-align: center;\n}\n.avatar-uploader-icon[data-v-38dce782]:hover {\r\n    border: 1.5px dashed #20a0ff;\r\n    color: #20a0ff;\n}\n.avatar-uploader-image[data-v-38dce782] {\r\n    width: 178px;\r\n    height: 178px;\r\n    display: block;\n}\r\n"],sourceRoot:""}])},489:function(t,e,n){var r=n(432);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(302)("6a964d98",r,!0)},495:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-upload",{ref:"upload",staticClass:"avatar-uploader",attrs:{action:t.remoteURL,"auto-upload":t.autoUpload,"list-type":"picture","show-file-list":!1,"on-success":t.afterAvatarSuccess,"before-upload":t.beforeAvatarUpload,"http-request":t.myUpload}},[t.displayImage?n("img",{staticClass:"avatar-uploader-image",attrs:{src:t.displayImage}}):n("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),t._v(" "),t.autoUpload?t._e():n("el-button",{attrs:{type:"primary"},on:{click:t.commitForm}},[t._v("确 定")])],1)},staticRenderFns:[]}},541:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(418),o=n.n(r),a=n(545),i=n.n(a);e.default={components:{OneFileUpload:o.a},data:function(){return{responseImage:[]}},mounted:function(){new i.a(".clipboard")},methods:{getResponseImage:function(t){this.responseImage=[],this.responseImage.push({attribute:"CDN访问路径",id:"clipboard-access_url",value:t.access_url,operate:""}),this.responseImage.push({attribute:"资源相对路径",id:"clipboard-resource_path",value:t.resource_path,operate:""}),this.responseImage.push({attribute:"直接访问路径",id:"clipboard-source_url",value:t.source_url,operate:"download"}),this.responseImage.push({attribute:"文件存储路径",id:"clipboard-url",value:t.url,operate:""}),this.responseImage.push({attribute:"文件标识ID",id:"clipboard-vid",value:t.vid,operate:""})}}}},544:function(t,e,n){var r,o,a;!function(i,l){o=[t,n(822)],r=l,void 0!==(a="function"==typeof r?r.apply(e,o):r)&&(t.exports=a)}(0,function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=function(t){return t&&t.__esModule?t:{default:t}}(e),o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=function(){function t(e){n(this,t),this.resolveOptions(e),this.initSelection()}return a(t,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,r.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,r.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":o(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),t}();t.exports=i})},545:function(t,e,n){var r,o,a;!function(i,l){o=[t,n(544),n(823),n(818)],r=l,void 0!==(a="function"==typeof r?r.apply(e,o):r)&&(t.exports=a)}(0,function(t,e,n,r){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function l(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function s(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var u=o(e),c=o(n),d=o(r),f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),h=function(t){function e(t,n){a(this,e);var r=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return r.resolveOptions(n),r.listenClick(t),r}return l(e,t),p(e,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText,this.container="object"===f(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=(0,d.default)(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new u.default({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return s("action",t)}},{key:"defaultTarget",value:function(t){var e=s("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return s("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"==typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach(function(t){n=n&&!!document.queryCommandSupported(t)}),n}}]),e}(c.default);t.exports=h})},556:function(t,e){function n(t,e){for(;t&&t.nodeType!==r;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}var r=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var o=Element.prototype;o.matches=o.matchesSelector||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector||o.webkitMatchesSelector}t.exports=n},557:function(t,e,n){function r(t,e,n,r,o){var i=a.apply(this,arguments);return t.addEventListener(n,i,o),{destroy:function(){t.removeEventListener(n,i,o)}}}function o(t,e,n,o,a){return"function"==typeof t.addEventListener?r.apply(null,arguments):"function"==typeof n?r.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return r(t,e,n,o,a)}))}function a(t,e,n,r){return function(n){n.delegateTarget=i(n.target,e),n.delegateTarget&&r.call(t,n)}}var i=n(556);t.exports=o},817:function(t,e){e.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},e.nodeList=function(t){var n=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in t&&(0===t.length||e.node(t[0]))},e.string=function(t){return"string"==typeof t||t instanceof String},e.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},818:function(t,e,n){function r(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!l.string(e))throw new TypeError("Second argument must be a String");if(!l.fn(n))throw new TypeError("Third argument must be a Function");if(l.node(t))return o(t,e,n);if(l.nodeList(t))return a(t,e,n);if(l.string(t))return i(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function o(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function a(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function i(t,e,n){return s(document.body,t,e,n)}var l=n(817),s=n(557);t.exports=r},822:function(t,e){function n(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var r=window.getSelection(),o=document.createRange();o.selectNodeContents(t),r.removeAllRanges(),r.addRange(o),e=r.toString()}return e}t.exports=n},823:function(t,e){function n(){}n.prototype={on:function(t,e,n){var r=this.e||(this.e={});return(r[t]||(r[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function r(){o.off(t,r),e.apply(n,arguments)}var o=this;return r._=e,this.on(t,r,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),r=0,o=n.length;for(r;r<o;r++)n[r].fn.apply(n[r].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),r=n[t],o=[];if(r&&e)for(var a=0,i=r.length;a<i;a++)r[a].fn!==e&&r[a].fn._!==e&&o.push(r[a]);return o.length?n[t]=o:delete n[t],this}},t.exports=n},839:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"components-container"},[n("one-file-upload",{on:{upload:t.getResponseImage}}),t._v(" "),n("el-table",{staticStyle:{width:"70%"},attrs:{data:t.responseImage,"element-loading-text":"拼命加载中",stripe:"",border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"属性说明",align:"center",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.attribute))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"路径URL",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{attrs:{id:e.row.id}},[t._v(t._s(e.row.value))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center",width:"200px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticClass:"clipboard",attrs:{size:"small",type:"primary","data-clipboard-target":"#"+e.row.id}},[t._v(" 复制 ")]),t._v(" "),"download"==e.row.operate?n("el-button",{attrs:{size:"small",type:"primary"}},[n("a",{attrs:{href:e.row.value}},[t._v("下载")])]):t._e()]}}])})],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=2.545b243a124e253d8188.js.map