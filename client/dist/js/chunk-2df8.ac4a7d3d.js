(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2df8","chunk-1c5c","4074"],{"15b1":function(t,e,i){},4074:function(t,e,i){"use strict";i.r(e),e["default"]={data(){let[t,e]=this.$options._componentTag.split("_");return{loaded:!1,events:{},entity:t,component_name:this.$options._componentTag,component_id:e||this.$store.state.route.id}},async created(){},watch:{"auth.signed":function(t,e){}},methods:{execute(...t){return this.$store._actions.execute[0](...t)},commit(...t){return this.$store.commit(...t)},registerComponent(t){this.commit("REGISTER_COMPONENT",t)}},computed:{state(){return this.$store.state},entities(){return this.$store.state.entities},auth(){return this.state.auth||{}},authenticated(){return!!this.auth&&(this.auth.signed&&0!==this.auth.signed)},route(){return this.state.route},BASE_URL(){return this.state.BASE_URL}}}},5324:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("widget",{attrs:{name:"список"}},[i("div",{attrs:{slot:"header"},slot:"header"},[i("v-layout",{staticClass:"ma-2"},[i("h3",{staticClass:"primary--text"},[i("v-icon",{staticClass:"mr-2 shadow",attrs:{color:"primary"}},[t._v("fas fa-list")]),t._v("\n                "+t._s("Список "+t.member.name+":")+"\n            ")],1)])],1),i("v-divider",{attrs:{slot:"divider"},slot:"divider"}),i("div",{staticClass:"ui list ma-2 primary--text"},t._l(t.filter,function(e,s){return i("div",{key:s,staticClass:"item"},[i("i",{staticClass:"far fa-user-circle icon shadow"}),i("div",{staticClass:"content"},[i("div",{staticClass:"header primary--text"},[t._v(t._s(s+1+". "+e.name))]),i("div",{staticClass:"description"},[t._v(t._s("email: "+e.email+"; реферальный код: "+e.ref))])])])}))],1)},n=[],a=i("a8bd"),r={extends:a["default"],props:["selected"],data:()=>{return{entity:"member"}},computed:{member(){return this.entities.member?this.entities.member[this.selected]:{}},endpoint(){return`${this.component_name}${this.component_id?":"+this.component_id:""}`},filter(){let t=this.raw_data.find(t=>t._id===this.selected);return t&&t.list&&t.list.members&&t.list.members.map(t=>this.entities.member[t])}},methods:{},watch:{}},o=r,c=(i("b4cb"),i("2877")),h=Object(c["a"])(o,s,n,!1,null,"8d98bfc2",null);h.options.__file="reflist.vue";e["default"]=h.exports},a8bd:function(t,e,i){"use strict";i.r(e);var s=i("4074");e["default"]={extends:s["default"],components:{widget:()=>i.e("chunk-6ce8").then(i.bind(null,"a739"))},data(){return{active:!1}},activated(){this.active=!0,this.load()},deactivated(){this.active=!1},methods:{load(){if(this.active&&this.execute({endpoint:this.endpoint,method:"get",cache:this.cache}),1===this.auth.signed&&this.auth.member){console.log("REGISTER EVENT:",`${this.auth.member}:update:${this.entity}`),this.$socket.off(this.events.update);let t=`${this.auth.member}:update:${this.entity}`;this.$socket.on(t,t=>{this.onEvent(t)});this.events.update=t}},onEvent(t){console.log("SOCKET UPDATE DATA:",t),this.commit("SET_ENTITIES",{method:"GET",...t})}},computed:{cache(){return!0},endpoint(){return`${this.entity}${this.component_id?":"+this.component_id:""}`},raw_data(){return this.$store.state.entities[this.entity]?Object.values(this.$store.state.entities[this.entity]):[]},filter(){return this.raw_data}},watch:{"auth.signed":function(t,e){1===t&&this.load()},"auth.member":function(t,e){!t&&this.$socket.off(this.events.update)}}}},b4cb:function(t,e,i){"use strict";var s=i("15b1"),n=i.n(s);n.a}}]);
//# sourceMappingURL=chunk-2df8.ac4a7d3d.js.map