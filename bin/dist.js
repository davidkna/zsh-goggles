"use strict";function n(n){return n&&n.__esModule?n:{default:n}}function t(n){if(Array.isArray(n)){for(var t=0,e=Array(n.length);t<n.length;t++)e[t]=n[t];return e}return Array.from(n)}function e(n){return function(){var t=n.apply(this,arguments);return new Promise(function(n,e){function r(i,u){try{var a=t[i](u),o=a.value}catch(n){return void e(n)}return a.done?void n(o):Promise.resolve(o).then(function(n){return r("next",n)},function(n){return r("throw",n)})}return r("next")})}}var r=require("path"),i=n(r),u=require("execa"),a=n(u),o=require("findup-sync"),l=n(o),c=require("fs-jetpack"),f=n(c),s=require("lodash.includes"),d=n(s),h=require("listr"),g=n(h),p=require("mkdirp"),m=n(p),w=require("xdg-basedir"),y=n(w);const v=i.default.join(y.default.data,"zsh_plugins");(0,m.default)(v);const q=require(i.default.join(y.default.config,"zsh-plugin-manager","config.js")),j=new Array(q.length),k=new Array(q.length);class z{constructor(n){this.name=n,this.uniqueName=n.split("/")[1],this.clonePath=i.default.join(v,this.uniqueName)}download(){var n=this;return e(function*(){const t=n.name,e=n.clonePath;switch(f.default.exists(i.default.join(e,".git"))){case!1:f.default.exists(e)&&f.default.remove(e),yield(0,a.default)("git",["clone","--recursive","--",`https://github.com/${t}.git`,e]);break;case"dir":yield(0,a.default)("git",["fetch","--all"],{cwd:e}),yield(0,a.default)("git",["reset","--hard","origin/master","--"],{cwd:e});break;default:throw new Error("Invalid clone target!")}})()}getFpath(){return this.clonePath}getSourceFile(){const n=this.name.split("/")[1],t=[`${n}?(.plugin).?(z)sh`,"*.plugin.zsh","init.zsh","*.zsh","*.sh"];return(0,l.default)(t,{cwd:this.clonePath,nocase:!0})}}const A=new g.default([{title:"Downloading plugins…",task:function(){return new g.default(q.map((n,t)=>{return{title:`Downloading ${n}...`,task:function(){return e(function*(){"string"==typeof q[t]&&(q[t]=new z(n));const e=q[t];yield e.download(),j[t]=e.getSourceFile(),k[t]=e.getFpath()})()}}}),{concurrent:!0})}},{title:`Writing to ${i.default.join(v,"plugins.zsh")}…`,task:function(){return e(function*(){const n=i.default.join(v,"plugins.zsh"),t=j.filter(function(n){return n}).map(function(n){return`source ${n}`}).join("\n"),e=k.filter(function(n){return n}).map(function(n){return`fpath+=${n}`}).join("\n");yield f.default.writeAsync(n,`${t}
${e}`)})()}},{title:"Cleaning up old plugins…",task:function(){return e(function*(){const n=[].concat(t(q.map(function(n){return n.uniqueName})),["plugins.zsh"]),e=f.default.list(v);e&&e.filter(function(t){return!(0,d.default)(n,t)}).forEach(function(n){return f.default.remove(i.default.join(v,n))})})()}}]);A.run();
