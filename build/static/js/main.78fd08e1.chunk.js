(this["webpackJsonptodo-list"]=this["webpackJsonptodo-list"]||[]).push([[0],{41:function(t,n,e){},42:function(t,n,e){"use strict";e.r(n);var c=e(2),o=e(17),r=e.n(o),i=e(8),a=e(6),u=e(0),s=function(t){var n=t.note,e=t.toggleImportance,c=n.important?"make not important":"make important";return Object(u.jsxs)("li",{children:[n.content,Object(u.jsx)("button",{onClick:e,children:c})]})},f=e(5),j=e.n(f),d="https://young-depths-75578.herokuapp.com/api/notes",l=function(){return j.a.get(d).then((function(t){return t.data}))},b=function(t){return j.a.post(d,t).then((function(t){return t.data}))},h=function(t,n){return j.a.put("".concat(d,"/").concat(t),n).then((function(t){return t.data}))},p=function(){var t=Object(c.useState)([]),n=Object(a.a)(t,2),e=n[0],o=n[1],r=Object(c.useState)(""),f=Object(a.a)(r,2),j=f[0],d=f[1],p=Object(c.useState)(!1),m=Object(a.a)(p,2),O=m[0],v=m[1];Object(c.useEffect)((function(){l().then((function(t){o(t)}))}),[]);var g=O?e:e.filter((function(t){return t.important}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Notes"}),Object(u.jsx)("div",{children:Object(u.jsxs)("button",{onClick:function(){return v(!O)},children:["show ",O?"important":"all"]})}),Object(u.jsx)("ul",{children:g.map((function(t){return Object(u.jsx)(s,{note:t,toggleImportance:function(){return function(t){var n=e.find((function(n){return n.id===t})),c=Object(i.a)(Object(i.a)({},n),{},{important:!n.important});h(t,c).then((function(n){o(e.map((function(e){return e.id!==t?e:n})))})).catch((function(c){alert("the note '".concat(n.content,"' was already deleted from server")),o(e.filter((function(n){return n.id!==t})))}))}(t.id)}},t.id)}))}),Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={content:j,date:(new Date).toISOString(),important:Math.random()>.5};b(n).then((function(t){o(e.concat(t)),d("")}))},children:[Object(u.jsx)("input",{value:j,onChange:function(t){console.log(t.target.value),d(t.target.value)}}),Object(u.jsx)("button",{type:"submit",children:"save"})]})]})};e(41);r.a.render(Object(u.jsx)(p,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.78fd08e1.chunk.js.map