webpackJsonp([7],{311:function(t,e,n){function r(t){n(390)}var i=n(2)(n(367),n(405),r,"data-v-00bac891",null);t.exports=i.exports},319:function(t,e,n){"use strict";function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"记录",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"永久删除";return new o.a(function(r,i){a.MessageBox.confirm("此操作将"+e+t+", 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r()}).catch(function(){n.i(a.Message)({type:"info",message:"已取消此操作"})})})}e.a=r;var i=n(26),o=n.n(i),a=n(38);n.n(a)},367:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(120),i=n.n(r),o=n(122),a=n.n(o),c=n(26),s=n.n(c),l=n(375),u=n.n(l),h=n(374),f=n.n(h),d=n(319);e.default={data:function(){return{tableData:[],menuIdOptions:[],tabActiveName:"0",tabActiveIndex:0,formTitle:null,formVisible:!1,formSubmiting:!1,createdItem:{id:null,parent_id:null,uri:null,description:null},deletedForm:{id:null},batchFormTitle:null,batchFormVisible:!1,batchFormSubmiting:!1,classLists:[],controller:"",resList:[],expandedKeys:[],checkedKeys:[],methodsList:{},defaultProps:{label:"title"}}},computed:{sonList:function(){return Array.isArray(this.tableData)&&0==this.tableData.length?[]:this.tableData[this.tabActiveIndex].children}},watch:{tabActiveName:function(){this.tabActiveIndex=Number(this.tabActiveName)}},mounted:function(){this.dataInit(),this.classList()},methods:{classList:function(){var t=this;this.$api.system.action.getClasses({}).then(function(e){t.classLists=e.data.data})},dataInit:function(){var t=this;return f()(u.a.mark(function e(){var n,r,i;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getMenuList().catch(function(t){console.log(t)});case 2:return n=e.sent,e.next=5,t.getResourceList().catch(function(t){console.log(t)});case 5:r=e.sent,r.forEach(function(t){var e=n.map(function(t){return t.id}).indexOf(t.parent_id);e<0||(void 0===n[e].children&&(n[e].children=[]),n[e].children.push(t))}),i=n.filter(function(t){return 0==t.parent_id}),n.forEach(function(t){var e=i.map(function(t){return t.id}).indexOf(t.parent_id);e<0||(void 0===i[e].children&&(i[e].children=[]),i[e].children.push(t))}),t.tableData=i,console.log(t.tableData);case 11:case"end":return e.stop()}},e,t)}))()},getMenuList:function(){var t=this;return new s.a(function(e,n){t.$api.system.menu.list({data:{limit:100,current_page:1,parent_id:null}}).then(function(n){var r=n.data.data;t.menuIdOptions=a()(r).map(function(t){return{label:r[t].title,value:r[t].id}}),e(n.data.data)}).catch(function(t){n(t)})})},getResourceList:function(){var t=this;return new s.a(function(e,n){t.$api.system.action.all({}).then(function(t){e(t.data.data)}).catch(function(t){n(t)})})},clearDialog:function(){console.log(this.resList),this.createdItem.id=null,this.createdItem.parent_id=null,this.createdItem.uri=null,this.createdItem.description=null,this.controller="",this.resList=[],this.checkedKeys=[]},showDialog:function(t,e){"create"===t?(this.batchFormVisible=!0,this.clearDialog(),this.batchFormTitle="新建URI资源",this.createdItem.parent_id=e.id,this.getAlreadyChecked(e)):(this.formVisible=!0,this.clearDialog(),this.formTitle="修改URI资源",i()(this.createdItem,e))},commitForm:function(){var t=this;this.formSubmiting=!0,this.$api.system.action.save({data:this.createdItem}).then(function(e){t.formSubmiting=!1,t.formVisible=!1,t.$notify({title:"成功",message:"保存成功",type:"success",duration:1500}),console.log(e),t.dataInit()}).catch(function(e){t.formSubmiting=!1,t.$notify({title:"错误",message:"保存失败",type:"error",duration:3e3}),console.log(e)})},batchCommitForm:function(){var t=this,e=this.$refs.tree.getCheckedKeys();console.log(e),this.batchFormSubmiting=!0,this.$api.system.action.batchSave({data:{parent_id:this.createdItem.parent_id,resources:e,class_name:this.controller}}).then(function(e){t.batchFormSubmiting=!1,t.batchFormVisible=!1,t.$notify({title:"成功",message:"保存成功",type:"success",duration:1500}),t.dataInit(),t.$refs.tree.setCheckedKeys([]),console.log(e)}).catch(function(e){t.batchFormSubmiting=!1,t.$notify({title:"错误",message:"保存失败",type:"error",duration:3e3}),t.$refs.tree.setCheckedKeys([]),console.log(e)})},deleteRecord:function(t){var e=this;n.i(d.a)(" uri资源 "+t.uri).then(function(){e.deletedForm.id=t.id,e.$api.system.action.delete({data:e.deletedForm}).then(function(t){e.$notify({title:"成功",message:"删除成功",type:"success",duration:1500}),e.dataInit(),console.log(t)}).catch(function(t){e.formSubmiting=!1,e.$notify({title:"错误",message:"删除失败",type:"error",duration:3e3}),console.log(t)})})},getResources:function(t){var e=this;if(!t)return!1;this.$api.system.action.getResources({data:{class_name:t}}).then(function(t){e.methodsList=t.data.data;var n=[];for(var r in e.methodsList)e.methodsList.hasOwnProperty(r)&&n.push({title:e.methodsList[r].uri+" 【"+e.methodsList[r].desc+"】",uri:e.methodsList[r].uri});e.resList=n})},getAlreadyChecked:function(t){var e=[];if(t.hasOwnProperty("children")&&t.children.constructor===Array)for(var n=0;n<t.children.length;n++)e.push(t.children[n].uri);this.checkedKeys=e},cancel:function(){this.batchFormVisible=!1,console.log(this.$refs.tree.getCheckedKeys()),this.$refs.tree.setCheckedKeys([])},handleClose:function(){this.cancel()}}}},374:function(t,e,n){"use strict";e.__esModule=!0;var r=n(26),i=function(t){return t&&t.__esModule?t:{default:t}}(r);e.default=function(t){return function(){var e=t.apply(this,arguments);return new i.default(function(t,n){function r(o,a){try{var c=e[o](a),s=c.value}catch(t){return void n(t)}if(!c.done)return i.default.resolve(s).then(function(t){r("next",t)},function(t){r("throw",t)});t(s)}return r("next")})}}},375:function(t,e,n){t.exports=n(399)},382:function(t,e,n){e=t.exports=n(301)(!0),e.push([t.i,".el-menu[data-v-00bac891]{background-color:#fff}.is-active[data-v-00bac891]{font-weight:600}.box-card[data-v-00bac891]{margin:10px;max-height:200px;overflow:auto}.pull-right[data-v-00bac891]{float:right}.list-item[data-v-00bac891]{margin:5px 0}.item-content[data-v-00bac891]{line-height:22px;font-size:12px}","",{version:3,sources:["H:/back-new/temp-permission-vue/permission-vue/src/views/system/action.vue"],names:[],mappings:"AACA,0BACI,qBAAuB,CAC1B,AACD,4BACI,eAAiB,CACpB,AACD,2BACI,YAAa,AACb,iBAAkB,AAClB,aAAe,CAClB,AACD,6BACI,WAAa,CAChB,AACD,4BACI,YAAgB,CACnB,AACD,+BACI,iBAAkB,AAClB,cAAgB,CACnB",file:"action.vue",sourcesContent:["\n.el-menu[data-v-00bac891] {\r\n    background-color: #fff;\n}\n.is-active[data-v-00bac891] {\r\n    font-weight: 600;\n}\n.box-card[data-v-00bac891] {\r\n    margin: 10px;\r\n    max-height: 200px;\r\n    overflow: auto;\n}\n.pull-right[data-v-00bac891] {\r\n    float: right;\n}\n.list-item[data-v-00bac891] {\r\n    margin: 5px 0px;\n}\n.item-content[data-v-00bac891] {\r\n    line-height: 22px;\r\n    font-size: 12px;\n}\r\n\r\n"],sourceRoot:""}])},390:function(t,e,n){var r=n(382);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(302)("0b0562fa",r,!0)},399:function(t,e,n){var r=function(){return this}()||Function("return this")(),i=r.regeneratorRuntime&&Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime")>=0,o=i&&r.regeneratorRuntime;if(r.regeneratorRuntime=void 0,t.exports=n(400),i)r.regeneratorRuntime=o;else try{delete r.regeneratorRuntime}catch(t){r.regeneratorRuntime=void 0}},400:function(t,e){!function(e){"use strict";function n(t,e,n,r){var o=e&&e.prototype instanceof i?e:i,a=Object.create(o.prototype),c=new d(r||[]);return a._invoke=l(t,n,c),a}function r(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}function i(){}function o(){}function a(){}function c(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function s(t){function e(n,i,o,a){var c=r(t[n],t,i);if("throw"!==c.type){var s=c.arg,l=s.value;return l&&"object"==typeof l&&y.call(l,"__await")?Promise.resolve(l.__await).then(function(t){e("next",t,o,a)},function(t){e("throw",t,o,a)}):Promise.resolve(l).then(function(t){s.value=t,o(s)},a)}a(c.arg)}function n(t,n){function r(){return new Promise(function(r,i){e(t,n,r,i)})}return i=i?i.then(r,r):r()}var i;this._invoke=n}function l(t,e,n){var i=L;return function(o,a){if(i===I)throw new Error("Generator is already running");if(i===F){if("throw"===o)throw a;return p()}for(n.method=o,n.arg=a;;){var c=n.delegate;if(c){var s=u(c,n);if(s){if(s===B)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(i===L)throw i=F,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);i=I;var l=r(t,e,n);if("normal"===l.type){if(i=n.done?F:k,l.arg===B)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(i=F,n.method="throw",n.arg=l.arg)}}}function u(t,e){var n=t.iterator[e.method];if(n===v){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=v,u(t,e),"throw"===e.method))return B;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return B}var i=r(n,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,B;var o=i.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=v),e.delegate=null,B):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,B)}function h(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function f(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function d(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(h,this),this.reset(!0)}function m(t){if(t){var e=t[x];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,r=function e(){for(;++n<t.length;)if(y.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=v,e.done=!0,e};return r.next=r}}return{next:p}}function p(){return{value:v,done:!0}}var v,g=Object.prototype,y=g.hasOwnProperty,b="function"==typeof Symbol?Symbol:{},x=b.iterator||"@@iterator",_=b.asyncIterator||"@@asyncIterator",w=b.toStringTag||"@@toStringTag",A="object"==typeof t,C=e.regeneratorRuntime;if(C)return void(A&&(t.exports=C));C=e.regeneratorRuntime=A?t.exports:{},C.wrap=n;var L="suspendedStart",k="suspendedYield",I="executing",F="completed",B={},E={};E[x]=function(){return this};var O=Object.getPrototypeOf,$=O&&O(O(m([])));$&&$!==g&&y.call($,x)&&(E=$);var R=a.prototype=i.prototype=Object.create(E);o.prototype=R.constructor=a,a.constructor=o,a[w]=o.displayName="GeneratorFunction",C.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===o||"GeneratorFunction"===(e.displayName||e.name))},C.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,a):(t.__proto__=a,w in t||(t[w]="GeneratorFunction")),t.prototype=Object.create(R),t},C.awrap=function(t){return{__await:t}},c(s.prototype),s.prototype[_]=function(){return this},C.AsyncIterator=s,C.async=function(t,e,r,i){var o=new s(n(t,e,r,i));return C.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},c(R),R[w]="Generator",R[x]=function(){return this},R.toString=function(){return"[object Generator]"},C.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},C.values=m,d.prototype={constructor:d,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=v,this.done=!1,this.delegate=null,this.method="next",this.arg=v,this.tryEntries.forEach(f),!t)for(var e in this)"t"===e.charAt(0)&&y.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=v)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){function e(e,r){return o.type="throw",o.arg=t,n.next=e,r&&(n.method="next",n.arg=v),!!r}if(this.done)throw t;for(var n=this,r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],o=i.completion;if("root"===i.tryLoc)return e("end");if(i.tryLoc<=this.prev){var a=y.call(i,"catchLoc"),c=y.call(i,"finallyLoc");if(a&&c){if(this.prev<i.catchLoc)return e(i.catchLoc,!0);if(this.prev<i.finallyLoc)return e(i.finallyLoc)}else if(a){if(this.prev<i.catchLoc)return e(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return e(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&y.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=e,i?(this.method="next",this.next=i.finallyLoc,B):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),B},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),f(n),B}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;f(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:m(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=v),B}}}(function(){return this}()||Function("return this")())},405:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"components-container"},[n("el-tabs",{model:{value:t.tabActiveName,callback:function(e){t.tabActiveName=e},expression:"tabActiveName"}},t._l(t.tableData,function(t,e){return n("el-tab-pane",{key:e,attrs:{label:t.title,name:String(e)}})})),t._v(" "),n("el-row",t._l(t.sonList,function(e,r){return n("el-col",{key:r,attrs:{sm:12,md:8}},[n("el-card",{staticClass:"box-card"},[n("div",{attrs:{slot:"header"},slot:"header"},[n("span",[t._v(t._s(e.title))]),t._v(" "),n("el-button",{staticClass:"pull-right",attrs:{size:"small",type:"primary"},on:{click:function(n){t.showDialog("create",e)}}},[t._v("新增配置")])],1),t._v(" "),t._l(e.children,function(e,r){return n("div",{key:r,staticClass:"list-item"},[n("el-tag",{attrs:{type:"gray"}},[t._v("\n                        "+t._s(e.uri)+"\n                    ")]),t._v(" "),n("span",{staticClass:"item-content"},[t._v(t._s(e.description))]),t._v(" "),n("el-button",{staticClass:"pull-right",staticStyle:{"margin-left":"10px"},attrs:{size:"mini",type:"primary",icon:"delete"},on:{click:function(n){t.deleteRecord(e)}}},[n("i",{staticClass:"el-icon-delete"})]),t._v(" "),n("el-button",{staticClass:"pull-right",attrs:{size:"mini",type:"primary",icon:"edit"},on:{click:function(n){t.showDialog("update",e)}}},[n("i",{staticClass:"el-icon-edit"})])],1)})],2)],1)})),t._v(" "),n("el-dialog",{attrs:{title:t.formTitle,visible:t.formVisible},on:{"update:visible":function(e){t.formVisible=e}}},[n("el-form",{staticStyle:{width:"80%","margin-left":"0px"},attrs:{"label-position":"left","label-width":"70px"}},[n("el-form-item",{attrs:{label:"父菜单"}},[n("el-select",{attrs:{clearable:"",disabled:!0,placeholder:"请选择父菜单"},model:{value:t.createdItem.parent_id,callback:function(e){t.$set(t.createdItem,"parent_id",e)},expression:"createdItem.parent_id"}},t._l(t.menuIdOptions,function(t){return n("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),n("el-form-item",{attrs:{label:"资源URI"}},[n("el-input",{attrs:{placeholder:"请填写URI"},model:{value:t.createdItem.uri,callback:function(e){t.$set(t.createdItem,"uri",e)},expression:"createdItem.uri"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"资源说明"}},[n("el-input",{attrs:{placeholder:"请填写资源说明"},model:{value:t.createdItem.description,callback:function(e){t.$set(t.createdItem,"description",e)},expression:"createdItem.description"}})],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.formVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary",loading:t.formSubmiting},on:{click:t.commitForm}},[t._v("确 定")])],1)],1),t._v(" "),n("el-dialog",{attrs:{title:t.batchFormTitle,visible:t.batchFormVisible,"before-close":t.handleClose},on:{"update:visible":function(e){t.batchFormVisible=e}}},[n("el-form",{staticStyle:{width:"80%","margin-left":"0px"},attrs:{"label-position":"left","label-width":"70px"}},[n("el-form-item",{attrs:{label:"父菜单"}},[n("el-select",{attrs:{clearable:"",disabled:!0,placeholder:"请选择父菜单"},model:{value:t.createdItem.parent_id,callback:function(e){t.$set(t.createdItem,"parent_id",e)},expression:"createdItem.parent_id"}},t._l(t.menuIdOptions,function(t){return n("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),n("el-form-item",{attrs:{label:"控制器"}},[n("el-select",{attrs:{placeholder:"选择控制器"},on:{change:function(e){t.getResources(t.controller)}},model:{value:t.controller,callback:function(e){t.controller=e},expression:"controller"}},t._l(t.classLists,function(t,e){return n("el-option",{key:e,attrs:{label:e,value:t}})}))],1),t._v(" "),n("el-tree",{ref:"tree",attrs:{data:t.resList,"show-checkbox":"","node-key":"uri","default-expanded-keys":t.expandedKeys,"default-checked-keys":t.checkedKeys,props:t.defaultProps}})],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.cancel}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary",loading:t.batchFormSubmiting},on:{click:t.batchCommitForm}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=7.cf5496a5258dda891823.js.map