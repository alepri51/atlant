(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71b3"],{"25bb":function(t,a,c){"use strict";c.r(a);var o=function(){var t=this,a=t.$createElement,c=t._self._c||a;return c("div",{staticClass:"chacheli-layout"},t._l(t.components,function(a){return a.available?t._e():c("div",{key:a.id,staticClass:"chacheli",style:{top:a.y*t.v+"%",left:a.x*t.h+"%",width:a.w*t.h+"%",height:a.h*t.v+"%"}},[c("keep-alive",[c(a.comp,t._g(t._b({tag:"component",attrs:{meta:a,data:t.data?t.data[a.id]:{}}},"component",t.$attrs,!1),t.$listeners))],1)],1)}))},e=[],s={name:"chacheli-layout",props:["layout","components","data"],data(){return{v:0,h:0}},watch:{"layout.cols"(){this.calc()},"layout.rows"(){this.calc()}},created(){this.calc(),this.components.forEach(t=>{this.$emit("REGISTER-COMPONENT",t.comp)})},watch:{components:function(){this.components.forEach(t=>{this.$emit("REGISTER-COMPONENT",t.comp)})}},methods:{calc(){this.v=100/this.layout.rows,this.h=100/this.layout.cols}}},n=s,i=(c("c34f"),c("2877")),l=Object(i["a"])(n,o,e,!1,null,null,null);l.options.__file="dashboard.vue";a["default"]=l.exports},8794:function(t,a,c){},c34f:function(t,a,c){"use strict";var o=c("8794"),e=c.n(o);e.a}}]);
//# sourceMappingURL=chunk-71b3.d40811cb.js.map