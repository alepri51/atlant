(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7fe3","chunk-1c81","4074"],{4074:function(t,e,s){"use strict";s.r(e),e["default"]={data(){let[t,e]=this.$options._componentTag.split("_");return{loaded:!1,events:{},entity:t,component_name:this.$options._componentTag,component_id:e||this.$store.state.route.id}},async created(){},watch:{"auth.signed":function(t,e){}},methods:{execute(...t){return this.$store._actions.execute[0](...t)},commit(...t){return this.$store.commit(...t)},registerComponent(t){this.commit("REGISTER_COMPONENT",t)}},computed:{state(){return this.$store.state},entities(){return this.$store.state.entities},auth(){return this.state.auth||{}},authenticated(){return!!this.auth&&(this.auth.signed&&0!==this.auth.signed)},route(){return this.state.route},BASE_URL(){return this.state.BASE_URL}}}},"7caa":function(t,e,s){"use strict";s.r(e);var i=s("4074");e["default"]={extends:i["default"],data(){return{form:{},options:{},defaults:{}}},computed:{},methods:{beforeSave(t){return t},submit(){let t=this.options.remove||this.$refs.form&&this.$refs.form.validate()||!this.$refs.form,e={},s=void 0;this.form=this.beforeSave(this.form),this.form.blob instanceof FormData&&(e={"content-type":"multipart/form-data"},s=Object.keys(this.form).reduce((t,e)=>{return"blob"!==e&&t.has(e)?t.set(e,this.form[e]):t.append(e,this.form[e]),t},this.form.blob)),t?this.execute({method:this.options.remove?"delete":"post",headers:e,endpoint:`${this.entity}.save`,payload:s||this.form,callback:t=>{t.error||(this.commit("HIDE_MODAL",{[this.entity]:void 0}),this.options.remove&&this.$emit("removed",this.form._id),!this.form._id&&this.$emit("appended",this.form._id),this.$refs.form&&this.commit("MUTATE_ENTITY",{entities:t.entities,entity:this.entity,id:this.form._id,deleted:this.options.remove}),this.form={},this.onSubmit&&this.onSubmit())}}):this.commit("SHOW_SNACKBAR",{text:"Не корректно введены данные"})}},computed:{visible:{get(){let{data:t,options:e={}}=this.state.modals[this.entity]||{data:void 0,options:void 0};this.options=e;let s=JSON.parse(JSON.stringify(this.defaults||{}));return t=t&&{...s,...t},this.form=Object.keys(this.form).length?this.form:JSON.parse(JSON.stringify(t||s)),!!t},set:()=>{}}},created(){},watch:{visible:function(t){t&&(this.defaults=this.entities.default&&this.entities.default[this.entity]||{})}}}},"9f54":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-dialog",{attrs:{persistent:"","max-width":"500px"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[s("v-card",[s("v-card-title",[s("v-icon",{staticClass:"mr-1 primary--text shadow"},[t._v("fas fa-donate")]),s("span",{staticClass:"headline primary--text"},[t._v("Клубный взнос")])],1),s("v-card-text",[t.visible?s("v-card-text",[t._v("\n                Для оплаты клубного взноса в течении 15 минут переведите сумму в размере "),s("b",{staticClass:"accent--text"},[t._v(t._s(t.form.amount)+" BTC")]),t._v(" \n                эквивалентную "),s("b",{staticClass:"accent--text"},[t._v("$"+t._s(t.form.cost))]),t._v(". по курсу "),s("b",{staticClass:"accent--text"},[t._v("$"+t._s(t.form.rate))]),t._v(" \n                за "),s("b",{staticClass:"accent--text"},[t._v("1 BTC")]),t._v(".\n                на кошелек с адресом: "),s("b",{staticClass:"accent--text"},[t._v(t._s(t.form.address))]),t._v(".\n                В случае если Вы не успеете сделать перевод в течении 15 минут, данная операция будет отменена автоматически.\n            ")]):t._e()],1),s("v-card-actions",[s("v-spacer"),s("v-btn",{attrs:{color:"unimportant",flat:""},nativeOn:{click:function(e){return t.cancel(e)}}},[t._v("Отменить")]),s("v-btn",{attrs:{dark:"",color:"secondary"},nativeOn:{click:function(e){return t.submit(e)}}},[t._v("ХОРОШО, ОЖИДАЙТЕ")])],1)],1)],1)},o=[],a=s("7caa"),n={extends:a["default"],data:()=>{return{}},methods:{onSubmit(){this.commit("RESET_CACHE_BY_GROUP","payment")},cancel(){this.execute({method:"post",endpoint:"donate.cancel",payload:this.form,callback:t=>{t.error||this.commit("HIDE_MODAL",{[this.entity]:void 0})}})}}},r=n,c=s("2877"),h=Object(c["a"])(r,i,o,!1,null,null,null);h.options.__file="donate.vue";e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-7fe3.28280d4a.js.map