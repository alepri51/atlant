(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ee03","chunk-1c81","4074","chunk-68fe"],{1408:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-dialog",{attrs:{persistent:"","max-width":"500px"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[i("v-card",[i("v-card-title",[i("v-icon",{staticClass:"mr-1 primary--text shadow"},[t._v("far fa-user-circle")]),i("span",{staticClass:"headline primary--text"},[t._v("Регистрация")])],1),i("v-card-text",[i("v-card-text",[i("v-form",{ref:"form",staticClass:"form",attrs:{"lazy-validation":""},on:{submit:function(t){t.preventDefault()}}},[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-text-field",{staticClass:"ma-1",attrs:{label:"Реферер",required:"",autofocus:"",color:"primary",rules:[function(){return!!t.referer||"This field is required"}]},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.submit(e):null}},model:{value:t.referer,callback:function(e){t.referer=e},expression:"referer"}}),i("v-text-field",{staticClass:"ma-1",attrs:{label:"Name",required:"",color:"primary",rules:[function(){return!!t.name||"This field is required"}]},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.submit(e):null}},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),i("v-flex",{attrs:{xs12:""}},[i("v-text-field",{attrs:{label:"Wallet",required:"",color:"primary",rules:[function(){return!!t.address||"This field is required"}]},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.submit(e):null}},model:{value:t.address,callback:function(e){t.address=e},expression:"address"}})],1),i("v-text-field",{staticClass:"ma-1",attrs:{label:"Email",required:"",color:"primary",rules:[function(){return!!t.email||"This field is required"}]},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.submit(e):null}},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),i("v-text-field",{staticClass:"ma-1",attrs:{label:"Password",type:"password",required:"",color:"primary",rules:[function(){return!!t.password||"This field is required"}]},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.submit(e):null}},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1),i("small",[t._v("*indicates required field")])],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"unimportant",flat:""},nativeOn:{click:function(e){t.commit("HIDE_MODAL",{signup:void 0})}}},[t._v("Отменить")]),i("v-btn",{attrs:{dark:"",color:"secondary"},nativeOn:{click:function(e){return t.submit(e)}}},[t._v("Зарегистрироваться")])],1)],1)],1)},r=[],n=i("7caa"),o={extends:n["default"],data(){return{referer:"",name:"",email:"",password:"",address:""}},created(){this.referer=this.state.path_query.ref},methods:{submit(){this.$refs.form.validate()?this.execute({method:"post",endpoint:"signup.submit",payload:this.$data,callback:t=>{t.error||this.commit("HIDE_MODAL",{signup:void 0})}}):this.commit("SHOW_SNACKBAR",{text:"Не корректно введены данные"})}}},a=o,u=i("2877"),l=Object(u["a"])(a,s,r,!1,null,null,null);l.options.__file="signup.vue";e["default"]=l.exports},4074:function(t,e,i){"use strict";i.r(e),e["default"]={data(){let[t,e]=this.$options._componentTag.split("_");return{loaded:!1,events:{},entity:t,component_name:this.$options._componentTag,component_id:e||this.$store.state.route.id}},async created(){},watch:{"auth.signed":function(t,e){}},methods:{execute(...t){return this.$store._actions.execute[0](...t)},commit(...t){return this.$store.commit(...t)},registerComponent(t){this.commit("REGISTER_COMPONENT",t)}},computed:{state(){return this.$store.state},entities(){return this.$store.state.entities},auth(){return this.state.auth||{}},authenticated(){return!!this.auth&&(this.auth.signed&&0!==this.auth.signed)},route(){return this.state.route},BASE_URL(){return this.state.BASE_URL}}}},"7caa":function(t,e,i){"use strict";i.r(e);var s=i("4074");e["default"]={extends:s["default"],data(){return{form:{},options:{},defaults:{}}},computed:{},methods:{beforeSave(t){return t},submit(){let t=this.options.remove||this.$refs.form&&this.$refs.form.validate()||!this.$refs.form,e={},i=void 0;this.form=this.beforeSave(this.form),this.form.blob instanceof FormData&&(e={"content-type":"multipart/form-data"},i=Object.keys(this.form).reduce((t,e)=>{return"blob"!==e&&t.has(e)?t.set(e,this.form[e]):t.append(e,this.form[e]),t},this.form.blob)),t?this.execute({method:this.options.remove?"delete":"post",headers:e,endpoint:`${this.entity}.save`,payload:i||this.form,callback:t=>{t.error||(this.commit("HIDE_MODAL",{[this.entity]:void 0}),this.options.remove&&this.$emit("removed",this.form._id),!this.form._id&&this.$emit("appended",this.form._id),this.$refs.form&&this.commit("MUTATE_ENTITY",{entities:t.entities,entity:this.entity,id:this.form._id,deleted:this.options.remove}),this.form={},this.onSubmit&&this.onSubmit())}}):this.commit("SHOW_SNACKBAR",{text:"Не корректно введены данные"})}},computed:{visible:{get(){let{data:t,options:e={}}=this.state.modals[this.entity]||{data:void 0,options:void 0};this.options=e;let i=JSON.parse(JSON.stringify(this.defaults||{}));return t=t&&{...i,...t},this.form=Object.keys(this.form).length?this.form:JSON.parse(JSON.stringify(t||i)),!!t},set:()=>{}}},created(){},watch:{visible:function(t){t&&(this.defaults=this.entities.default&&this.entities.default[this.entity]||{})}}}}}]);
//# sourceMappingURL=chunk-ee03.9cdefab4.js.map