(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42f6","chunk-1c5c","4074","chunk-16da"],{"3c08":function(t,e,n){"use strict";n.r(e);var i=n("a8bd");e["default"]={extends:i["default"],components:{dashboard:()=>n.e("chunk-71b3").then(n.bind(null,"25bb"))},computed:{layout(){return this.layouts[this.current_layout].layout},components(){return this.layouts[this.current_layout].components},title(){this.route.view===this.component_name&&(document.title=this.getTitle())}},methods:{getTitle(){return"atlant.club"}},watch:{"$vuetify.breakpoint":function(t){this.current_layout=t.name},route:function(){}},created(){this.layouts=Object.keys(this.layouts).reduce((t,e,n,i)=>{let s=e.split(",");return s.forEach(n=>{t[n]=this.layouts[e]}),t},{})},activated(){},data(){return{current_layout:this.$vuetify.breakpoint.name,layouts:{}}}}},4074:function(t,e,n){"use strict";n.r(e),e["default"]={data(){let[t,e]=this.$options._componentTag.split("_");return{loaded:!1,events:{},entity:t,component_name:this.$options._componentTag,component_id:e||this.$store.state.route.id}},async created(){},watch:{"auth.signed":function(t,e){}},methods:{execute(...t){return this.$store._actions.execute[0](...t)},commit(...t){return this.$store.commit(...t)},registerComponent(t){this.commit("REGISTER_COMPONENT",t)}},computed:{state(){return this.$store.state},entities(){return this.$store.state.entities},auth(){return this.state.auth||{}},authenticated(){return!!this.auth&&(this.auth.signed&&0!==this.auth.signed)},route(){return this.state.route},BASE_URL(){return this.state.BASE_URL}}}},"77b0":function(t,e,n){},a8bd:function(t,e,n){"use strict";n.r(e);var i=n("4074");e["default"]={extends:i["default"],components:{widget:()=>n.e("chunk-6ce8").then(n.bind(null,"a739"))},data(){return{active:!1}},activated(){this.active=!0,this.load()},deactivated(){this.active=!1},methods:{load(){if(this.active&&this.execute({endpoint:this.endpoint,method:"get",cache:this.cache}),1===this.auth.signed&&this.auth.member){console.log("REGISTER EVENT:",`${this.auth.member}:update:${this.entity}`),this.$socket.off(this.events.update);let t=`${this.auth.member}:update:${this.entity}`;this.$socket.on(t,t=>{this.onEvent(t)});this.events.update=t}},onEvent(t){console.log("SOCKET UPDATE DATA:",t),this.commit("SET_ENTITIES",{method:"GET",...t})}},computed:{cache(){return!0},endpoint(){return`${this.entity}${this.component_id?":"+this.component_id:""}`},raw_data(){return this.$store.state.entities[this.entity]?Object.values(this.$store.state.entities[this.entity]):[]},filter(){return this.raw_data}},watch:{"auth.signed":function(t,e){1===t&&this.load()},"auth.member":function(t,e){!t&&this.$socket.off(this.events.update)}}}},c7fe:function(t,e,n){"use strict";var i=n("77b0"),s=n.n(i);s.a},e277:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("dashboard",{attrs:{title:t.title,layout:t.layout,components:t.components,data:{}},on:{"REGISTER-COMPONENT":t.registerComponent}})},s=[],a=n("3c08"),o={extends:a["default"],computed:{title(){document.title=this.entities.manual&&this.entities.manual[this.component_id]&&"Статья: "+this.entities.manual[this.component_id].title||"Чтение"}},data(){return{selected_date:void 0,layouts:{"xs,sm":{layout:{cols:10,rows:15},components:[{id:2,x:0,y:0,w:10,h:15,available:!1,comp:"singlemanual"}]},"md,lg,xl":{layout:{cols:10,rows:15},components:[{id:2,x:2,y:0,w:6,h:15,available:!1,comp:"singlemanual"}]}}}}},u=o,c=(n("c7fe"),n("2877")),r=Object(c["a"])(u,i,s,!1,null,"1b3033ea",null);r.options.__file="readmanual.vue";e["default"]=r.exports}}]);
//# sourceMappingURL=chunk-42f6.e7375879.js.map