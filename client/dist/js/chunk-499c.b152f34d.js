(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-499c"],{abd7:function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-dialog",{attrs:{persistent:"","max-width":"700px"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[o("v-card",[o("v-card-title",[o("v-icon",{staticClass:"mr-1 primary--text shadow"},[e._v("fas fa-newspaper")]),o("span",{staticClass:"headline primary--text"},[e._v("Статья")])],1),o("v-card-text",[o("v-card-text",[o("v-form",{ref:"form",staticClass:"form",attrs:{"lazy-validation":""},on:{submit:function(e){e.preventDefault()}}},[o("v-file-upload",{staticClass:"mb-4",attrs:{disabled:e.options.remove,label:"Картинка",value:e.form.picture},on:{input:function(t){e.form.picture=arguments[0]},"form-data":function(t){e.form.blob=arguments[0]},clear:function(t){e.form.picture=""}}}),o("v-text-field",{attrs:{disabled:e.options.remove,label:"Видео",hint:"ссылка на видео",color:"primary","validate-on-blur":"",rules:[function(){return!!e.form.video_url&&["youtube","vimeo"].includes(e.form.video_provider)||!e.form.video_url||"Не поддерживаемое видео"}]},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.form.video_url,callback:function(t){e.$set(e.form,"video_url",t)},expression:"form.video_url"}}),o("v-text-field",{attrs:{autofocus:"",disabled:e.options.remove,label:"Заголовок",hint:"Например: Нас уже полмиллиона!",required:"",color:"primary",rules:[function(){return!!e.form.title||"This field is required"}],"validate-on-blur":""},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.submit(t):null}},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}}),o("vue-editor",{attrs:{disabled:e.options.remove,useMarkdownShortcuts:"",editorToolbar:e.toolbar},model:{value:e.form.text,callback:function(t){e.$set(e.form,"text",t)},expression:"form.text"}}),o("v-combobox",{attrs:{disabled:e.options.remove,label:"Новостные тэги",chips:"",clearable:"",multiple:""},scopedSlots:e._u([{key:"selection",fn:function(t){return[o("v-chip",{class:e.options.remove?"grey lighten-2 white--text":"secondary white--text",attrs:{small:"",selected:t.selected,close:""},on:{input:function(o){e.form.tags.splice(e.form.tags.indexOf(t.item),1)}}},[o("span",[e._v(e._s(t.item))])])]}}]),model:{value:e.form.tags,callback:function(t){e.$set(e.form,"tags",t)},expression:"form.tags"}})],1),o("small",[e._v("*Требуемые для заполнения поля")])],1)],1),o("v-card-actions",[o("v-spacer"),o("v-btn",{attrs:{color:"unimportant",flat:""},nativeOn:{click:function(t){var o;e.commit("HIDE_MODAL",(o={},o[e.entity]=void 0,o))}}},[e._v(e._s(e.options.remove?"Не удалять":"Не сохранять"))]),o("v-btn",{class:e.options.remove?"error":"secondary",attrs:{dark:"",flat:""},nativeOn:{click:function(t){return e.submit(t)}}},[e._v(e._s(e.options.remove?"Удалить":"Cохранить"))])],1)],1)],1)},i=[],n=o("7caa"),a=o("6564"),l=o("1979"),s=o.n(l),u=o("b3e9"),c={extends:n["default"],inheritAttrs:!1,components:{vFileUpload:a["default"],VueEditor:u["VueEditor"]},data(){return{toolbar:[["bold","italic","underline","strike"],[{align:""},{align:"center"},{align:"right"},{align:"justify"}],[{header:1},{header:2},{header:3}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],["link","image"],["clean"]]}},computed:{},methods:{beforeSave(e){return e.blob,FormData,e}},watch:{"form.video_url":function(e){let t=s.a.parse(e);t?(this.form.video_provider=t.provider,this.form.video_id=t.id):(this.form.video_provider=void 0,this.form.video_id=void 0)}}},d=c,f=(o("c1dd"),o("2877")),m=Object(f["a"])(d,r,i,!1,null,"7827423b",null);m.options.__file="manual.vue";t["default"]=m.exports},c1dd:function(e,t,o){"use strict";var r=o("e806"),i=o.n(r);i.a},e806:function(e,t,o){}}]);
//# sourceMappingURL=chunk-499c.b152f34d.js.map