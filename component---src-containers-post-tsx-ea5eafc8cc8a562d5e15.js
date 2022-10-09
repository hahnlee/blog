(self.webpackChunkblog=self.webpackChunkblog||[]).push([[813],{8309:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});var n=r(9953),o=r(2174);function a(e){var t=e.children;return(0,o.W0)(),n.createElement(n.Fragment,null,t)}},8188:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});var n=r(2174),o=r(9953);function a(){return o.createElement(l,null,o.createElement(i,{src:"/images/profile.png",draggable:!1,alt:""}),o.createElement(c,null,o.createElement(u,null,"이한"),o.createElement(m,null,"Coding a Better World Together"),o.createElement(p,{role:"menuitem",href:"https://hanlee.io"},"About"),o.createElement(p,{role:"menuitem",href:"https://github.com/hahnlee"},"GitHub"),o.createElement(p,{role:"menuitem",href:"/rss.xml"},"RSS")))}var l=(0,n.zo)("div",{display:"flex",alignItems:"center",marginTop:24,backgroundColor:"$gray000",borderRadius:16,padding:16}),i=(0,n.zo)("img",{width:72,height:72,borderRadius:"50%"}),c=(0,n.zo)("div",{flex:1,marginLeft:24}),u=(0,n.zo)("h2",{margin:0,fontSize:"1.25rem",color:"$gray700",fontWeight:600}),m=(0,n.zo)("p",{margin:"6px 0",fontWeight:400,color:"$gray600"}),p=(0,n.zo)("a",{fontSize:"0.85rem",color:"$gray600",marginRight:8})},6013:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var n=r(9953);function o(e){var t=e.children,r=e.type,o=void 0===r?"website":r,a=e.title,l=e.description,i=void 0===l?"기록할 수 있는 지식을 나눕니다":l,c=e.image,u=void 0===c?"/images/og.png":c;return n.createElement(n.Fragment,null,n.createElement("title",null,a?a+" | ":"","명시지(明示知)"),n.createElement("meta",{property:"og:type",content:o}),n.createElement("meta",{property:"og:title",content:null!=a?a:"명시지(明示知)"}),n.createElement("meta",{property:"og:description",content:i}),n.createElement("meta",{property:"og:image",content:u}),n.createElement("meta",{property:"og:author",content:"이한"}),n.createElement("meta",{property:"og:site_name",content:"명시지(明示知) - 기록할 수 있는 지식을 나눕니다"}),n.createElement("link",{rel:"alternate",type:"application/rss+xml",title:"명시지(明示知) - 기록할 수 있는 지식을 나눕니다",href:"/rss.xml"}),n.createElement("link",{rel:"apple-touch-icon",sizes:"180x180",href:"/favicon/apple-touch-icon.png"}),n.createElement("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"/favicon/favicon-32x32.png"}),n.createElement("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/favicon/favicon-16x16.png"}),n.createElement("link",{rel:"manifest",href:"/favicon/site.webmanifest"}),n.createElement("meta",{name:"msapplication-TileColor",content:"#000000"}),n.createElement("meta",{name:"theme-color",content:"#000000"}),t)}},8200:function(e,t,r){"use strict";r.r(t),r.d(t,{Head:function(){return x},default:function(){return g}});var n=r(8309),o=r(8283),a=r(9953),l=r(2174),i=(0,l.zo)("article",{fontSize:18,lineHeight:1.8,wordBreak:"keep-all","h1, h2, h3, p":{marginTop:0,marginBottom:12},"h1, h2, h3":{fontWeight:600},h1:{fontSize:"1.5rem"},h2:{fontSize:"1.25rem"},h3:{fontSize:"1.15rem"},p:{code:{fontSize:16,lineHight:16,padding:"1px 4px",borderRadius:4,marginRight:2,backgroundColor:"$gray000",border:"1px solid $gray200"}},a:{color:"$blue700",textDecoration:"none"},blockquote:{margin:"12px 0",padding:"1px 16px",color:"$gray600",borderLeft:"5px solid $gray200",p:{margin:"4px 0"}},iframe:{display:"block",maxWidth:"100%",margin:"0 auto",marginBottom:18},'pre[class*="language-"]':{fontSize:16,borderRadius:8,border:"1px solid $gray200",backgroundColor:"$gray000",".token.operator":{backgroundColor:"transparent"},".gatsby-highlight-code-line":{display:"block",backgroundColor:"$gray200",marginLeft:-16,marginRight:-16,paddingLeft:16}},".footnotes":{hr:{borderTop:"none",borderColor:"$gray200"}}});function c(e){var t=e.title,r=e.date,n=e.children;return a.createElement(i,null,a.createElement(u,null,t),a.createElement("p",null,r),a.createElement(o.MDXRenderer,null,n))}var u=(0,l.zo)("h1",{fontSize:"2rem",fontWeight:600,marginBottom:"0 !important"}),m=r(8188),p=r(5024);function s(){return a.createElement("header",null,a.createElement(p.rU,{to:"/"},a.createElement(f,{src:"/images/logo.png",draggable:!1,alt:"블로그 로고",width:36,height:36})))}var f=(0,l.zo)("img",{width:36,height:36}),d=r(6013);function g(e){var t=e.data;return a.createElement(n.Z,null,a.createElement(h,null,a.createElement(s,null),a.createElement(c,{title:t.mdx.frontmatter.title,date:t.mdx.frontmatter.date},t.mdx.body),a.createElement(m.Z,null)))}var h=(0,l.zo)("main",{maxWidth:1e3,padding:24,margin:"0 auto"});function x(e){var t,r=e.data,n=null===(t=r.mdx.frontmatter.thumbnail.childImageSharp.gatsbyImageData.images.fallback)||void 0===t?void 0:t.src;return a.createElement(d.Z,{title:r.mdx.frontmatter.title,description:r.mdx.frontmatter.summary,type:"article",image:n},a.createElement("meta",{property:"article:author",content:"이한"}),a.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),a.createElement("meta",{name:"twitter:creator",content:"@hanleedev"}),a.createElement("meta",{name:"twitter:image",content:n}),a.createElement("meta",{name:"twitter:label1",content:"읽는 시간"}),a.createElement("meta",{name:"twitter:data1",content:r.mdx.timeToRead+"분"}))}},8283:function(e,t,r){var n=r(8821);e.exports={MDXRenderer:n}},8821:function(e,t,r){var n=r(6501),o=r(2937),a=r(6994),l=r(912),i=["scope","children"];function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m=r(9953),p=r(8294).mdx,s=r(2154).useMDXScope;e.exports=function(e){var t=e.scope,r=e.children,a=l(e,i),c=s(t),f=m.useMemo((function(){if(!r)return null;var e=u({React:m,mdx:p},c),t=Object.keys(e),a=t.map((function(t){return e[t]}));return o(Function,["_fn"].concat(t,[""+r])).apply(void 0,[{}].concat(n(a)))}),[r,t]);return m.createElement(f,u({},a))}},261:function(e,t,r){var n=r(8181);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.__esModule=!0,e.exports.default=e.exports},2937:function(e,t,r){var n=r(4223),o=r(9467);function a(t,r,l){return o()?(e.exports=a=Reflect.construct.bind(),e.exports.__esModule=!0,e.exports.default=e.exports):(e.exports=a=function(e,t,r){var o=[null];o.push.apply(o,t);var a=new(Function.bind.apply(e,o));return r&&n(a,r.prototype),a},e.exports.__esModule=!0,e.exports.default=e.exports),a.apply(null,arguments)}e.exports=a,e.exports.__esModule=!0,e.exports.default=e.exports},6994:function(e){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.__esModule=!0,e.exports.default=e.exports},9467:function(e){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.__esModule=!0,e.exports.default=e.exports},1798:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.__esModule=!0,e.exports.default=e.exports},7837:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},912:function(e){e.exports=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o},e.exports.__esModule=!0,e.exports.default=e.exports},6501:function(e,t,r){var n=r(261),o=r(1798),a=r(1209),l=r(7837);e.exports=function(e){return n(e)||o(e)||a(e)||l()},e.exports.__esModule=!0,e.exports.default=e.exports}}]);
//# sourceMappingURL=component---src-containers-post-tsx-ea5eafc8cc8a562d5e15.js.map