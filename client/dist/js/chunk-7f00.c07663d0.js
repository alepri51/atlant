(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7f00","chunk-1c5c","4074","chunk-16da"],{"3c08":function(t,e,n){"use strict";n.r(e);var s=n("a8bd");e["default"]={extends:s["default"],components:{dashboard:()=>n.e("chunk-71b3").then(n.bind(null,"25bb"))},computed:{layout(){return this.layouts[this.current_layout].layout},components(){return this.layouts[this.current_layout].components},title(){this.route.view===this.component_name&&(document.title=this.getTitle())}},methods:{getTitle(){return"atlant.club"}},watch:{"$vuetify.breakpoint":function(t){this.current_layout=t.name},route:function(){}},created(){this.layouts=Object.keys(this.layouts).reduce((t,e,n,s)=>{let i=e.split(",");return i.forEach(n=>{t[n]=this.layouts[e]}),t},{})},activated(){},data(){return{current_layout:this.$vuetify.breakpoint.name,layouts:{}}}}},4074:function(t,e,n){"use strict";n.r(e),e["default"]={data(){let[t,e]=this.$options._componentTag.split("_");return{loaded:!1,events:{},entity:t,component_name:this.$options._componentTag,component_id:e||this.$store.state.route.id}},async created(){},watch:{"auth.signed":function(t,e){}},methods:{execute(...t){return this.$store._actions.execute[0](...t)},commit(...t){return this.$store.commit(...t)},registerComponent(t){this.commit("REGISTER_COMPONENT",t)}},computed:{state(){return this.$store.state},entities(){return this.$store.state.entities},auth(){return this.state.auth||{}},authenticated(){return!!this.auth&&(this.auth.signed&&0!==this.auth.signed)},route(){return this.state.route},BASE_URL(){return this.state.BASE_URL}}}},"52f2":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.authenticated?n("dashboard",{attrs:{title:t.title,layout:t.layout,components:t.components,data:{},date:t.selected_date},on:{"REGISTER-COMPONENT":t.registerComponent,"date-changed":function(e){t.selected_date=arguments[0]}}}):n("div",[t._v("\n    ДОСТУП ЗАКРЫТ\n")])},i=[],a=n("3c08"),o={extends:a["default"],methods:{getTitle(){return"Новости"}},data(){return{selected_date:void 0,layouts:{md:{layout:{cols:10,rows:15},components:[{id:2,x:1,y:0,w:8,h:15,available:!1,comp:"news"}]},"sm,xs":{layout:{cols:10,rows:15},components:[{id:2,x:0,y:0,w:10,h:15,available:!1,comp:"news"}]},"lg,xl":{layout:{cols:10,rows:15},components:[{id:2,x:1,y:0,w:6,h:15,available:!1,comp:"news"},{id:4,x:7,y:0,w:2,h:9,available:!1,comp:"calendar"}]}}}}},u=o,c=(n("6508"),n("2877")),r=Object(c["a"])(u,s,i,!1,null,"16fa9173",null);r.options.__file="newslayout.vue";e["default"]=r.exports},6508:function(t,e,n){"use strict";var s=n("b6f0"),i=n.n(s);i.a},a8bd:function(t,e,n){"use strict";n.r(e);var s=n("4074");e["default"]={extends:s["default"],components:{widget:()=>n.e("chunk-6ce8").then(n.bind(null,"a739"))},data(){return{active:!1}},activated(){this.active=!0,this.load()},deactivated(){this.active=!1},methods:{load(){if(this.active&&this.execute({endpoint:this.endpoint,method:"get",cache:this.cache}),1===this.auth.signed&&this.auth.member){console.log("REGISTER EVENT:",`${this.auth.member}:update:${this.entity}`),this.$socket.off(this.events.update);let t=`${this.auth.member}:update:${this.entity}`;this.$socket.on(t,t=>{this.onEvent(t)});this.events.update=t}},onEvent(t){console.log("SOCKET UPDATE DATA:",t),this.commit("SET_ENTITIES",{method:"GET",...t})}},computed:{cache(){return!0},endpoint(){return`${this.entity}${this.component_id?":"+this.component_id:""}`},raw_data(){return this.$store.state.entities[this.entity]?Object.values(this.$store.state.entities[this.entity]):[]},filter(){return this.raw_data}},watch:{"auth.signed":function(t,e){1===t&&this.load()},"auth.member":function(t,e){!t&&this.$socket.off(this.events.update)}}}},b6f0:function(t,e,n){}}]);
//# sourceMappingURL=chunk-7f00.c07663d0.js.map