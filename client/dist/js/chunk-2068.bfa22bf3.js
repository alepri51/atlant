(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2068"],{"5a9b":function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-dialog",{attrs:{persistent:"","max-width":"500px"},model:{value:t.visible,callback:function(i){t.visible=i},expression:"visible"}},[e("v-card",[e("v-card-title",[e("v-icon",{staticClass:"mr-1 primary--text shadow"},[t._v("fas fa-user-circle")]),e("span",{staticClass:"headline primary--text"},[t._v("Выход")])],1),e("v-card-text",[e("v-card-text",[t._v("\n                Вы покидаете личный кабинет. Пожалуйста подтвердите Ваше решение\n            ")])],1),e("v-card-actions",[e("v-spacer"),e("v-btn",{attrs:{color:"unimportant",flat:""},nativeOn:{click:function(i){t.commit("HIDE_MODAL",{signout:void 0})}}},[t._v("Не выходить")]),e("v-btn",{attrs:{dark:"",color:"secondary"},nativeOn:{click:function(i){return t.submit(i)}}},[t._v("Выйти")])],1)],1)],1)},o=[],r=e("7caa"),a={extends:r["default"],data:()=>{return{}},methods:{submit(){this.execute({method:"post",endpoint:"signout.submit",callback:()=>{this.commit("HIDE_MODAL",{[this.entity]:void 0})}})}}},n=a,d=e("2877"),h=Object(d["a"])(n,s,o,!1,null,null,null);h.options.__file="signout.vue";i["default"]=h.exports},"7caa":function(t,i,e){"use strict";e.r(i);var s=e("4074");i["default"]={extends:s["default"],data(){return{form:{},options:{},defaults:{}}},computed:{},methods:{beforeSave(t){return t},submit(){let t=this.options.remove||this.$refs.form&&this.$refs.form.validate()||!this.$refs.form,i={},e=void 0;this.form=this.beforeSave(this.form),this.form.blob instanceof FormData&&(i={"content-type":"multipart/form-data"},e=Object.keys(this.form).reduce((t,i)=>{return"blob"!==i&&t.has(i)?t.set(i,this.form[i]):t.append(i,this.form[i]),t},this.form.blob)),t?this.execute({method:this.options.remove?"delete":"post",headers:i,endpoint:`${this.entity}.save`,payload:e||this.form,callback:t=>{t.error||(this.commit("HIDE_MODAL",{[this.entity]:void 0}),this.options.remove&&this.$emit("removed",this.form._id),!this.form._id&&this.$emit("appended",this.form._id),this.$refs.form&&this.commit("MUTATE_ENTITY",{entities:t.entities,entity:this.entity,id:this.form._id,deleted:this.options.remove}),this.form={},this.onSubmit&&this.onSubmit())}}):this.commit("SHOW_SNACKBAR",{text:"Не корректно введены данные"})}},computed:{visible:{get(){let{data:t,options:i={}}=this.state.modals[this.entity]||{data:void 0,options:void 0};this.options=i;let e=JSON.parse(JSON.stringify(this.defaults||{}));return t=t&&{...e,...t},this.form=Object.keys(this.form).length?this.form:JSON.parse(JSON.stringify(t||e)),!!t},set:()=>{}}},created(){},watch:{visible:function(t){t&&(this.defaults=this.entities.default&&this.entities.default[this.entity]||{})}}}}}]);
//# sourceMappingURL=chunk-2068.bfa22bf3.js.map