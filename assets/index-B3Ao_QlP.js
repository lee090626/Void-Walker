(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const h of document.querySelectorAll('link[rel="modulepreload"]'))c(h);new MutationObserver(h=>{for(const x of h)if(x.type==="childList")for(const A of x.addedNodes)A.tagName==="LINK"&&A.rel==="modulepreload"&&c(A)}).observe(document,{childList:!0,subtree:!0});function f(h){const x={};return h.integrity&&(x.integrity=h.integrity),h.referrerPolicy&&(x.referrerPolicy=h.referrerPolicy),h.crossOrigin==="use-credentials"?x.credentials="include":h.crossOrigin==="anonymous"?x.credentials="omit":x.credentials="same-origin",x}function c(h){if(h.ep)return;h.ep=!0;const x=f(h);fetch(h.href,x)}})();function gy(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Pc={exports:{}},Li={};var Lp;function yy(){if(Lp)return Li;Lp=1;var i=Symbol.for("react.transitional.element"),s=Symbol.for("react.fragment");function f(c,h,x){var A=null;if(x!==void 0&&(A=""+x),h.key!==void 0&&(A=""+h.key),"key"in h){x={};for(var Y in h)Y!=="key"&&(x[Y]=h[Y])}else x=h;return h=x.ref,{$$typeof:i,type:c,key:A,ref:h!==void 0?h:null,props:x}}return Li.Fragment=s,Li.jsx=f,Li.jsxs=f,Li}var Gp;function xy(){return Gp||(Gp=1,Pc.exports=yy()),Pc.exports}var u=xy(),eu={exports:{}},ye={};var Yp;function vy(){if(Yp)return ye;Yp=1;var i=Symbol.for("react.transitional.element"),s=Symbol.for("react.portal"),f=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),h=Symbol.for("react.profiler"),x=Symbol.for("react.consumer"),A=Symbol.for("react.context"),Y=Symbol.for("react.forward_ref"),k=Symbol.for("react.suspense"),y=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),C=Symbol.for("react.activity"),V=Symbol.iterator;function H(p){return p===null||typeof p!="object"?null:(p=V&&p[V]||p["@@iterator"],typeof p=="function"?p:null)}var U={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},P=Object.assign,J={};function le(p,b,E){this.props=p,this.context=b,this.refs=J,this.updater=E||U}le.prototype.isReactComponent={},le.prototype.setState=function(p,b){if(typeof p!="object"&&typeof p!="function"&&p!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,p,b,"setState")},le.prototype.forceUpdate=function(p){this.updater.enqueueForceUpdate(this,p,"forceUpdate")};function he(){}he.prototype=le.prototype;function Z(p,b,E){this.props=p,this.context=b,this.refs=J,this.updater=E||U}var ae=Z.prototype=new he;ae.constructor=Z,P(ae,le.prototype),ae.isPureReactComponent=!0;var te=Array.isArray;function ee(){}var q={H:null,A:null,T:null,S:null},fe=Object.prototype.hasOwnProperty;function xe(p,b,E){var O=E.ref;return{$$typeof:i,type:p,key:b,ref:O!==void 0?O:null,props:E}}function me(p,b){return xe(p.type,b,p.props)}function Ee(p){return typeof p=="object"&&p!==null&&p.$$typeof===i}function we(p){var b={"=":"=0",":":"=2"};return"$"+p.replace(/[=:]/g,function(E){return b[E]})}var Ve=/\/+/g;function $e(p,b){return typeof p=="object"&&p!==null&&p.key!=null?we(""+p.key):b.toString(36)}function Pe(p){switch(p.status){case"fulfilled":return p.value;case"rejected":throw p.reason;default:switch(typeof p.status=="string"?p.then(ee,ee):(p.status="pending",p.then(function(b){p.status==="pending"&&(p.status="fulfilled",p.value=b)},function(b){p.status==="pending"&&(p.status="rejected",p.reason=b)})),p.status){case"fulfilled":return p.value;case"rejected":throw p.reason}}throw p}function R(p,b,E,O,N){var I=typeof p;(I==="undefined"||I==="boolean")&&(p=null);var F=!1;if(p===null)F=!0;else switch(I){case"bigint":case"string":case"number":F=!0;break;case"object":switch(p.$$typeof){case i:case s:F=!0;break;case _:return F=p._init,R(F(p._payload),b,E,O,N)}}if(F)return N=N(p),F=O===""?"."+$e(p,0):O,te(N)?(E="",F!=null&&(E=F.replace(Ve,"$&/")+"/"),R(N,b,E,"",function(ce){return ce})):N!=null&&(Ee(N)&&(N=me(N,E+(N.key==null||p&&p.key===N.key?"":(""+N.key).replace(Ve,"$&/")+"/")+F)),b.push(N)),1;F=0;var Q=O===""?".":O+":";if(te(p))for(var $=0;$<p.length;$++)O=p[$],I=Q+$e(O,$),F+=R(O,b,E,I,N);else if($=H(p),typeof $=="function")for(p=$.call(p),$=0;!(O=p.next()).done;)O=O.value,I=Q+$e(O,$++),F+=R(O,b,E,I,N);else if(I==="object"){if(typeof p.then=="function")return R(Pe(p),b,E,O,N);throw b=String(p),Error("Objects are not valid as a React child (found: "+(b==="[object Object]"?"object with keys {"+Object.keys(p).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.")}return F}function W(p,b,E){if(p==null)return p;var O=[],N=0;return R(p,O,"","",function(I){return b.call(E,I,N++)}),O}function v(p){if(p._status===-1){var b=p._result;b=b(),b.then(function(E){(p._status===0||p._status===-1)&&(p._status=1,p._result=E)},function(E){(p._status===0||p._status===-1)&&(p._status=2,p._result=E)}),p._status===-1&&(p._status=0,p._result=b)}if(p._status===1)return p._result.default;throw p._result}var S=typeof reportError=="function"?reportError:function(p){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var b=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof p=="object"&&p!==null&&typeof p.message=="string"?String(p.message):String(p),error:p});if(!window.dispatchEvent(b))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",p);return}console.error(p)},m={map:W,forEach:function(p,b,E){W(p,function(){b.apply(this,arguments)},E)},count:function(p){var b=0;return W(p,function(){b++}),b},toArray:function(p){return W(p,function(b){return b})||[]},only:function(p){if(!Ee(p))throw Error("React.Children.only expected to receive a single React element child.");return p}};return ye.Activity=C,ye.Children=m,ye.Component=le,ye.Fragment=f,ye.Profiler=h,ye.PureComponent=Z,ye.StrictMode=c,ye.Suspense=k,ye.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=q,ye.__COMPILER_RUNTIME={__proto__:null,c:function(p){return q.H.useMemoCache(p)}},ye.cache=function(p){return function(){return p.apply(null,arguments)}},ye.cacheSignal=function(){return null},ye.cloneElement=function(p,b,E){if(p==null)throw Error("The argument must be a React element, but you passed "+p+".");var O=P({},p.props),N=p.key;if(b!=null)for(I in b.key!==void 0&&(N=""+b.key),b)!fe.call(b,I)||I==="key"||I==="__self"||I==="__source"||I==="ref"&&b.ref===void 0||(O[I]=b[I]);var I=arguments.length-2;if(I===1)O.children=E;else if(1<I){for(var F=Array(I),Q=0;Q<I;Q++)F[Q]=arguments[Q+2];O.children=F}return xe(p.type,N,O)},ye.createContext=function(p){return p={$$typeof:A,_currentValue:p,_currentValue2:p,_threadCount:0,Provider:null,Consumer:null},p.Provider=p,p.Consumer={$$typeof:x,_context:p},p},ye.createElement=function(p,b,E){var O,N={},I=null;if(b!=null)for(O in b.key!==void 0&&(I=""+b.key),b)fe.call(b,O)&&O!=="key"&&O!=="__self"&&O!=="__source"&&(N[O]=b[O]);var F=arguments.length-2;if(F===1)N.children=E;else if(1<F){for(var Q=Array(F),$=0;$<F;$++)Q[$]=arguments[$+2];N.children=Q}if(p&&p.defaultProps)for(O in F=p.defaultProps,F)N[O]===void 0&&(N[O]=F[O]);return xe(p,I,N)},ye.createRef=function(){return{current:null}},ye.forwardRef=function(p){return{$$typeof:Y,render:p}},ye.isValidElement=Ee,ye.lazy=function(p){return{$$typeof:_,_payload:{_status:-1,_result:p},_init:v}},ye.memo=function(p,b){return{$$typeof:y,type:p,compare:b===void 0?null:b}},ye.startTransition=function(p){var b=q.T,E={};q.T=E;try{var O=p(),N=q.S;N!==null&&N(E,O),typeof O=="object"&&O!==null&&typeof O.then=="function"&&O.then(ee,S)}catch(I){S(I)}finally{b!==null&&E.types!==null&&(b.types=E.types),q.T=b}},ye.unstable_useCacheRefresh=function(){return q.H.useCacheRefresh()},ye.use=function(p){return q.H.use(p)},ye.useActionState=function(p,b,E){return q.H.useActionState(p,b,E)},ye.useCallback=function(p,b){return q.H.useCallback(p,b)},ye.useContext=function(p){return q.H.useContext(p)},ye.useDebugValue=function(){},ye.useDeferredValue=function(p,b){return q.H.useDeferredValue(p,b)},ye.useEffect=function(p,b){return q.H.useEffect(p,b)},ye.useEffectEvent=function(p){return q.H.useEffectEvent(p)},ye.useId=function(){return q.H.useId()},ye.useImperativeHandle=function(p,b,E){return q.H.useImperativeHandle(p,b,E)},ye.useInsertionEffect=function(p,b){return q.H.useInsertionEffect(p,b)},ye.useLayoutEffect=function(p,b){return q.H.useLayoutEffect(p,b)},ye.useMemo=function(p,b){return q.H.useMemo(p,b)},ye.useOptimistic=function(p,b){return q.H.useOptimistic(p,b)},ye.useReducer=function(p,b,E){return q.H.useReducer(p,b,E)},ye.useRef=function(p){return q.H.useRef(p)},ye.useState=function(p){return q.H.useState(p)},ye.useSyncExternalStore=function(p,b,E){return q.H.useSyncExternalStore(p,b,E)},ye.useTransition=function(){return q.H.useTransition()},ye.version="19.2.3",ye}var Xp;function Hu(){return Xp||(Xp=1,eu.exports=vy()),eu.exports}var re=Hu();const ct=gy(re);var tu={exports:{}},Gi={},au={exports:{}},nu={};var Ip;function by(){return Ip||(Ip=1,(function(i){function s(R,W){var v=R.length;R.push(W);e:for(;0<v;){var S=v-1>>>1,m=R[S];if(0<h(m,W))R[S]=W,R[v]=m,v=S;else break e}}function f(R){return R.length===0?null:R[0]}function c(R){if(R.length===0)return null;var W=R[0],v=R.pop();if(v!==W){R[0]=v;e:for(var S=0,m=R.length,p=m>>>1;S<p;){var b=2*(S+1)-1,E=R[b],O=b+1,N=R[O];if(0>h(E,v))O<m&&0>h(N,E)?(R[S]=N,R[O]=v,S=O):(R[S]=E,R[b]=v,S=b);else if(O<m&&0>h(N,v))R[S]=N,R[O]=v,S=O;else break e}}return W}function h(R,W){var v=R.sortIndex-W.sortIndex;return v!==0?v:R.id-W.id}if(i.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var x=performance;i.unstable_now=function(){return x.now()}}else{var A=Date,Y=A.now();i.unstable_now=function(){return A.now()-Y}}var k=[],y=[],_=1,C=null,V=3,H=!1,U=!1,P=!1,J=!1,le=typeof setTimeout=="function"?setTimeout:null,he=typeof clearTimeout=="function"?clearTimeout:null,Z=typeof setImmediate<"u"?setImmediate:null;function ae(R){for(var W=f(y);W!==null;){if(W.callback===null)c(y);else if(W.startTime<=R)c(y),W.sortIndex=W.expirationTime,s(k,W);else break;W=f(y)}}function te(R){if(P=!1,ae(R),!U)if(f(k)!==null)U=!0,ee||(ee=!0,we());else{var W=f(y);W!==null&&Pe(te,W.startTime-R)}}var ee=!1,q=-1,fe=5,xe=-1;function me(){return J?!0:!(i.unstable_now()-xe<fe)}function Ee(){if(J=!1,ee){var R=i.unstable_now();xe=R;var W=!0;try{e:{U=!1,P&&(P=!1,he(q),q=-1),H=!0;var v=V;try{t:{for(ae(R),C=f(k);C!==null&&!(C.expirationTime>R&&me());){var S=C.callback;if(typeof S=="function"){C.callback=null,V=C.priorityLevel;var m=S(C.expirationTime<=R);if(R=i.unstable_now(),typeof m=="function"){C.callback=m,ae(R),W=!0;break t}C===f(k)&&c(k),ae(R)}else c(k);C=f(k)}if(C!==null)W=!0;else{var p=f(y);p!==null&&Pe(te,p.startTime-R),W=!1}}break e}finally{C=null,V=v,H=!1}W=void 0}}finally{W?we():ee=!1}}}var we;if(typeof Z=="function")we=function(){Z(Ee)};else if(typeof MessageChannel<"u"){var Ve=new MessageChannel,$e=Ve.port2;Ve.port1.onmessage=Ee,we=function(){$e.postMessage(null)}}else we=function(){le(Ee,0)};function Pe(R,W){q=le(function(){R(i.unstable_now())},W)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function(R){R.callback=null},i.unstable_forceFrameRate=function(R){0>R||125<R?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):fe=0<R?Math.floor(1e3/R):5},i.unstable_getCurrentPriorityLevel=function(){return V},i.unstable_next=function(R){switch(V){case 1:case 2:case 3:var W=3;break;default:W=V}var v=V;V=W;try{return R()}finally{V=v}},i.unstable_requestPaint=function(){J=!0},i.unstable_runWithPriority=function(R,W){switch(R){case 1:case 2:case 3:case 4:case 5:break;default:R=3}var v=V;V=R;try{return W()}finally{V=v}},i.unstable_scheduleCallback=function(R,W,v){var S=i.unstable_now();switch(typeof v=="object"&&v!==null?(v=v.delay,v=typeof v=="number"&&0<v?S+v:S):v=S,R){case 1:var m=-1;break;case 2:m=250;break;case 5:m=1073741823;break;case 4:m=1e4;break;default:m=5e3}return m=v+m,R={id:_++,callback:W,priorityLevel:R,startTime:v,expirationTime:m,sortIndex:-1},v>S?(R.sortIndex=v,s(y,R),f(k)===null&&R===f(y)&&(P?(he(q),q=-1):P=!0,Pe(te,v-S))):(R.sortIndex=m,s(k,R),U||H||(U=!0,ee||(ee=!0,we()))),R},i.unstable_shouldYield=me,i.unstable_wrapCallback=function(R){var W=V;return function(){var v=V;V=W;try{return R.apply(this,arguments)}finally{V=v}}}})(nu)),nu}var Qp;function Sy(){return Qp||(Qp=1,au.exports=by()),au.exports}var lu={exports:{}},zt={};var Vp;function wy(){if(Vp)return zt;Vp=1;var i=Hu();function s(k){var y="https://react.dev/errors/"+k;if(1<arguments.length){y+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)y+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+k+"; visit "+y+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function f(){}var c={d:{f,r:function(){throw Error(s(522))},D:f,C:f,L:f,m:f,X:f,S:f,M:f},p:0,findDOMNode:null},h=Symbol.for("react.portal");function x(k,y,_){var C=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:h,key:C==null?null:""+C,children:k,containerInfo:y,implementation:_}}var A=i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Y(k,y){if(k==="font")return"";if(typeof y=="string")return y==="use-credentials"?y:""}return zt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c,zt.createPortal=function(k,y){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!y||y.nodeType!==1&&y.nodeType!==9&&y.nodeType!==11)throw Error(s(299));return x(k,y,null,_)},zt.flushSync=function(k){var y=A.T,_=c.p;try{if(A.T=null,c.p=2,k)return k()}finally{A.T=y,c.p=_,c.d.f()}},zt.preconnect=function(k,y){typeof k=="string"&&(y?(y=y.crossOrigin,y=typeof y=="string"?y==="use-credentials"?y:"":void 0):y=null,c.d.C(k,y))},zt.prefetchDNS=function(k){typeof k=="string"&&c.d.D(k)},zt.preinit=function(k,y){if(typeof k=="string"&&y&&typeof y.as=="string"){var _=y.as,C=Y(_,y.crossOrigin),V=typeof y.integrity=="string"?y.integrity:void 0,H=typeof y.fetchPriority=="string"?y.fetchPriority:void 0;_==="style"?c.d.S(k,typeof y.precedence=="string"?y.precedence:void 0,{crossOrigin:C,integrity:V,fetchPriority:H}):_==="script"&&c.d.X(k,{crossOrigin:C,integrity:V,fetchPriority:H,nonce:typeof y.nonce=="string"?y.nonce:void 0})}},zt.preinitModule=function(k,y){if(typeof k=="string")if(typeof y=="object"&&y!==null){if(y.as==null||y.as==="script"){var _=Y(y.as,y.crossOrigin);c.d.M(k,{crossOrigin:_,integrity:typeof y.integrity=="string"?y.integrity:void 0,nonce:typeof y.nonce=="string"?y.nonce:void 0})}}else y==null&&c.d.M(k)},zt.preload=function(k,y){if(typeof k=="string"&&typeof y=="object"&&y!==null&&typeof y.as=="string"){var _=y.as,C=Y(_,y.crossOrigin);c.d.L(k,_,{crossOrigin:C,integrity:typeof y.integrity=="string"?y.integrity:void 0,nonce:typeof y.nonce=="string"?y.nonce:void 0,type:typeof y.type=="string"?y.type:void 0,fetchPriority:typeof y.fetchPriority=="string"?y.fetchPriority:void 0,referrerPolicy:typeof y.referrerPolicy=="string"?y.referrerPolicy:void 0,imageSrcSet:typeof y.imageSrcSet=="string"?y.imageSrcSet:void 0,imageSizes:typeof y.imageSizes=="string"?y.imageSizes:void 0,media:typeof y.media=="string"?y.media:void 0})}},zt.preloadModule=function(k,y){if(typeof k=="string")if(y){var _=Y(y.as,y.crossOrigin);c.d.m(k,{as:typeof y.as=="string"&&y.as!=="script"?y.as:void 0,crossOrigin:_,integrity:typeof y.integrity=="string"?y.integrity:void 0})}else c.d.m(k)},zt.requestFormReset=function(k){c.d.r(k)},zt.unstable_batchedUpdates=function(k,y){return k(y)},zt.useFormState=function(k,y,_){return A.H.useFormState(k,y,_)},zt.useFormStatus=function(){return A.H.useHostTransitionStatus()},zt.version="19.2.3",zt}var Zp;function Ch(){if(Zp)return lu.exports;Zp=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(s){console.error(s)}}return i(),lu.exports=wy(),lu.exports}var Kp;function zy(){if(Kp)return Gi;Kp=1;var i=Sy(),s=Hu(),f=Ch();function c(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function h(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function x(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function A(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Y(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function k(e){if(x(e)!==e)throw Error(c(188))}function y(e){var t=e.alternate;if(!t){if(t=x(e),t===null)throw Error(c(188));return t!==e?null:e}for(var a=e,n=t;;){var l=a.return;if(l===null)break;var r=l.alternate;if(r===null){if(n=l.return,n!==null){a=n;continue}break}if(l.child===r.child){for(r=l.child;r;){if(r===a)return k(l),e;if(r===n)return k(l),t;r=r.sibling}throw Error(c(188))}if(a.return!==n.return)a=l,n=r;else{for(var o=!1,d=l.child;d;){if(d===a){o=!0,a=l,n=r;break}if(d===n){o=!0,n=l,a=r;break}d=d.sibling}if(!o){for(d=r.child;d;){if(d===a){o=!0,a=r,n=l;break}if(d===n){o=!0,n=r,a=l;break}d=d.sibling}if(!o)throw Error(c(189))}}if(a.alternate!==n)throw Error(c(190))}if(a.tag!==3)throw Error(c(188));return a.stateNode.current===a?e:t}function _(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=_(e),t!==null)return t;e=e.sibling}return null}var C=Object.assign,V=Symbol.for("react.element"),H=Symbol.for("react.transitional.element"),U=Symbol.for("react.portal"),P=Symbol.for("react.fragment"),J=Symbol.for("react.strict_mode"),le=Symbol.for("react.profiler"),he=Symbol.for("react.consumer"),Z=Symbol.for("react.context"),ae=Symbol.for("react.forward_ref"),te=Symbol.for("react.suspense"),ee=Symbol.for("react.suspense_list"),q=Symbol.for("react.memo"),fe=Symbol.for("react.lazy"),xe=Symbol.for("react.activity"),me=Symbol.for("react.memo_cache_sentinel"),Ee=Symbol.iterator;function we(e){return e===null||typeof e!="object"?null:(e=Ee&&e[Ee]||e["@@iterator"],typeof e=="function"?e:null)}var Ve=Symbol.for("react.client.reference");function $e(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Ve?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case P:return"Fragment";case le:return"Profiler";case J:return"StrictMode";case te:return"Suspense";case ee:return"SuspenseList";case xe:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case U:return"Portal";case Z:return e.displayName||"Context";case he:return(e._context.displayName||"Context")+".Consumer";case ae:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case q:return t=e.displayName||null,t!==null?t:$e(e.type)||"Memo";case fe:t=e._payload,e=e._init;try{return $e(e(t))}catch{}}return null}var Pe=Array.isArray,R=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,W=f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,v={pending:!1,data:null,method:null,action:null},S=[],m=-1;function p(e){return{current:e}}function b(e){0>m||(e.current=S[m],S[m]=null,m--)}function E(e,t){m++,S[m]=e.current,e.current=t}var O=p(null),N=p(null),I=p(null),F=p(null);function Q(e,t){switch(E(I,t),E(N,e),E(O,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?cp(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=cp(t),e=up(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}b(O),E(O,e)}function $(){b(O),b(N),b(I)}function ce(e){e.memoizedState!==null&&E(F,e);var t=O.current,a=up(t,e.type);t!==a&&(E(N,e),E(O,a))}function ge(e){N.current===e&&(b(O),b(N)),F.current===e&&(b(F),Ri._currentValue=v)}var de,K;function oe(e){if(de===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);de=t&&t[1]||"",K=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+de+e+K}var je=!1;function Je(e,t){if(!e||je)return"";je=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(t){var X=function(){throw Error()};if(Object.defineProperty(X.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(X,[])}catch(B){var D=B}Reflect.construct(e,[],X)}else{try{X.call()}catch(B){D=B}e.call(X.prototype)}}else{try{throw Error()}catch(B){D=B}(X=e())&&typeof X.catch=="function"&&X.catch(function(){})}}catch(B){if(B&&D&&typeof B.stack=="string")return[B.stack,D.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var r=n.DetermineComponentFrameRoot(),o=r[0],d=r[1];if(o&&d){var g=o.split(`
`),j=d.split(`
`);for(l=n=0;n<g.length&&!g[n].includes("DetermineComponentFrameRoot");)n++;for(;l<j.length&&!j[l].includes("DetermineComponentFrameRoot");)l++;if(n===g.length||l===j.length)for(n=g.length-1,l=j.length-1;1<=n&&0<=l&&g[n]!==j[l];)l--;for(;1<=n&&0<=l;n--,l--)if(g[n]!==j[l]){if(n!==1||l!==1)do if(n--,l--,0>l||g[n]!==j[l]){var L=`
`+g[n].replace(" at new "," at ");return e.displayName&&L.includes("<anonymous>")&&(L=L.replace("<anonymous>",e.displayName)),L}while(1<=n&&0<=l);break}}}finally{je=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?oe(a):""}function ra(e,t){switch(e.tag){case 26:case 27:case 5:return oe(e.type);case 16:return oe("Lazy");case 13:return e.child!==t&&t!==null?oe("Suspense Fallback"):oe("Suspense");case 19:return oe("SuspenseList");case 0:case 15:return Je(e.type,!1);case 11:return Je(e.type.render,!1);case 1:return Je(e.type,!0);case 31:return oe("Activity");default:return""}}function Mt(e){try{var t="",a=null;do t+=ra(e,a),a=e,e=e.return;while(e);return t}catch(n){return`
Error generating stack: `+n.message+`
`+n.stack}}var Ea=Object.prototype.hasOwnProperty,xa=i.unstable_scheduleCallback,Ta=i.unstable_cancelCallback,en=i.unstable_shouldYield,oa=i.unstable_requestPaint,se=i.unstable_now,et=i.unstable_getCurrentPriorityLevel,va=i.unstable_ImmediatePriority,ba=i.unstable_UserBlockingPriority,Qt=i.unstable_NormalPriority,Et=i.unstable_LowPriority,ja=i.unstable_IdlePriority,Rt=i.log,dt=i.unstable_setDisableYieldValue,St=null,Ie=null;function pt(e){if(typeof Rt=="function"&&dt(e),Ie&&typeof Ie.setStrictMode=="function")try{Ie.setStrictMode(St,e)}catch{}}var Ze=Math.clz32?Math.clz32:Lo,Dn=Math.log,No=Math.LN2;function Lo(e){return e>>>=0,e===0?32:31-(Dn(e)/No|0)|0}var Vt=256,Sa=262144,tn=4194304;function nt(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function sa(e,t,a){var n=e.pendingLanes;if(n===0)return 0;var l=0,r=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var d=n&134217727;return d!==0?(n=d&~r,n!==0?l=nt(n):(o&=d,o!==0?l=nt(o):a||(a=d&~e,a!==0&&(l=nt(a))))):(d=n&~r,d!==0?l=nt(d):o!==0?l=nt(o):a||(a=n&~e,a!==0&&(l=nt(a)))),l===0?0:t!==0&&t!==l&&(t&r)===0&&(r=l&-l,a=t&-t,r>=a||r===32&&(a&4194048)!==0)?t:l}function wt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function wa(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ka(){var e=tn;return tn<<=1,(tn&62914560)===0&&(tn=4194304),e}function tl(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function Zt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function ca(e,t,a,n,l,r){var o=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var d=e.entanglements,g=e.expirationTimes,j=e.hiddenUpdates;for(a=o&~a;0<a;){var L=31-Ze(a),X=1<<L;d[L]=0,g[L]=-1;var D=j[L];if(D!==null)for(j[L]=null,L=0;L<D.length;L++){var B=D[L];B!==null&&(B.lane&=-536870913)}a&=~X}n!==0&&Go(e,n,0),r!==0&&l===0&&e.tag!==0&&(e.suspendedLanes|=r&~(o&~t))}function Go(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-Ze(t);e.entangledLanes|=t,e.entanglements[n]=e.entanglements[n]|1073741824|a&261930}function Jl(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var n=31-Ze(a),l=1<<n;l&t|e[n]&t&&(e[n]|=t),a&=~l}}function Vu(e,t){var a=t&-t;return a=(a&42)!==0?1:Yo(a),(a&(e.suspendedLanes|t))!==0?0:a}function Yo(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Xo(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Zu(){var e=W.p;return e!==0?e:(e=window.event,e===void 0?32:Op(e.type))}function Ku(e,t){var a=W.p;try{return W.p=e,t()}finally{W.p=a}}var an=Math.random().toString(36).slice(2),gt="__reactFiber$"+an,Tt="__reactProps$"+an,al="__reactContainer$"+an,Io="__reactEvents$"+an,im="__reactListeners$"+an,rm="__reactHandles$"+an,$u="__reactResources$"+an,Wl="__reactMarker$"+an;function Qo(e){delete e[gt],delete e[Tt],delete e[Io],delete e[im],delete e[rm]}function nl(e){var t=e[gt];if(t)return t;for(var a=e.parentNode;a;){if(t=a[al]||a[gt]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=yp(e);e!==null;){if(a=e[gt])return a;e=yp(e)}return t}e=a,a=e.parentNode}return null}function ll(e){if(e=e[gt]||e[al]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Fl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(c(33))}function il(e){var t=e[$u];return t||(t=e[$u]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function ht(e){e[Wl]=!0}var Ju=new Set,Wu={};function On(e,t){rl(e,t),rl(e+"Capture",t)}function rl(e,t){for(Wu[e]=t,e=0;e<t.length;e++)Ju.add(t[e])}var om=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Fu={},Pu={};function sm(e){return Ea.call(Pu,e)?!0:Ea.call(Fu,e)?!1:om.test(e)?Pu[e]=!0:(Fu[e]=!0,!1)}function Pi(e,t,a){if(sm(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var n=t.toLowerCase().slice(0,5);if(n!=="data-"&&n!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function er(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function Ca(e,t,a,n){if(n===null)e.removeAttribute(a);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+n)}}function Kt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ef(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function cm(e,t,a){var n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,r=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(o){a=""+o,r.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(o){a=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Vo(e){if(!e._valueTracker){var t=ef(e)?"checked":"value";e._valueTracker=cm(e,t,""+e[t])}}function tf(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),n="";return e&&(n=ef(e)?e.checked?"true":"false":e.value),e=n,e!==a?(t.setValue(e),!0):!1}function tr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var um=/[\n"\\]/g;function $t(e){return e.replace(um,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Zo(e,t,a,n,l,r,o,d){e.name="",o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.type=o:e.removeAttribute("type"),t!=null?o==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Kt(t)):e.value!==""+Kt(t)&&(e.value=""+Kt(t)):o!=="submit"&&o!=="reset"||e.removeAttribute("value"),t!=null?Ko(e,o,Kt(t)):a!=null?Ko(e,o,Kt(a)):n!=null&&e.removeAttribute("value"),l==null&&r!=null&&(e.defaultChecked=!!r),l!=null&&(e.checked=l&&typeof l!="function"&&typeof l!="symbol"),d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"?e.name=""+Kt(d):e.removeAttribute("name")}function af(e,t,a,n,l,r,o,d){if(r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.type=r),t!=null||a!=null){if(!(r!=="submit"&&r!=="reset"||t!=null)){Vo(e);return}a=a!=null?""+Kt(a):"",t=t!=null?""+Kt(t):a,d||t===e.value||(e.value=t),e.defaultValue=t}n=n??l,n=typeof n!="function"&&typeof n!="symbol"&&!!n,e.checked=d?e.checked:!!n,e.defaultChecked=!!n,o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(e.name=o),Vo(e)}function Ko(e,t,a){t==="number"&&tr(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function ol(e,t,a,n){if(e=e.options,t){t={};for(var l=0;l<a.length;l++)t["$"+a[l]]=!0;for(a=0;a<e.length;a++)l=t.hasOwnProperty("$"+e[a].value),e[a].selected!==l&&(e[a].selected=l),l&&n&&(e[a].defaultSelected=!0)}else{for(a=""+Kt(a),t=null,l=0;l<e.length;l++){if(e[l].value===a){e[l].selected=!0,n&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function nf(e,t,a){if(t!=null&&(t=""+Kt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+Kt(a):""}function lf(e,t,a,n){if(t==null){if(n!=null){if(a!=null)throw Error(c(92));if(Pe(n)){if(1<n.length)throw Error(c(93));n=n[0]}a=n}a==null&&(a=""),t=a}a=Kt(t),e.defaultValue=a,n=e.textContent,n===a&&n!==""&&n!==null&&(e.value=n),Vo(e)}function sl(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var fm=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function rf(e,t,a){var n=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?n?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":n?e.setProperty(t,a):typeof a!="number"||a===0||fm.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function of(e,t,a){if(t!=null&&typeof t!="object")throw Error(c(62));if(e=e.style,a!=null){for(var n in a)!a.hasOwnProperty(n)||t!=null&&t.hasOwnProperty(n)||(n.indexOf("--")===0?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="");for(var l in t)n=t[l],t.hasOwnProperty(l)&&a[l]!==n&&rf(e,l,n)}else for(var r in t)t.hasOwnProperty(r)&&rf(e,r,t[r])}function $o(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var dm=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),pm=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ar(e){return pm.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Da(){}var Jo=null;function Wo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var cl=null,ul=null;function sf(e){var t=ll(e);if(t&&(e=t.stateNode)){var a=e[Tt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Zo(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+$t(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var n=a[t];if(n!==e&&n.form===e.form){var l=n[Tt]||null;if(!l)throw Error(c(90));Zo(n,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(t=0;t<a.length;t++)n=a[t],n.form===e.form&&tf(n)}break e;case"textarea":nf(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&ol(e,!!a.multiple,t,!1)}}}var Fo=!1;function cf(e,t,a){if(Fo)return e(t,a);Fo=!0;try{var n=e(t);return n}finally{if(Fo=!1,(cl!==null||ul!==null)&&(Xr(),cl&&(t=cl,e=ul,ul=cl=null,sf(t),e)))for(t=0;t<e.length;t++)sf(e[t])}}function Pl(e,t){var a=e.stateNode;if(a===null)return null;var n=a[Tt]||null;if(n===null)return null;a=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(c(231,t,typeof a));return a}var Oa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Po=!1;if(Oa)try{var ei={};Object.defineProperty(ei,"passive",{get:function(){Po=!0}}),window.addEventListener("test",ei,ei),window.removeEventListener("test",ei,ei)}catch{Po=!1}var nn=null,es=null,nr=null;function uf(){if(nr)return nr;var e,t=es,a=t.length,n,l="value"in nn?nn.value:nn.textContent,r=l.length;for(e=0;e<a&&t[e]===l[e];e++);var o=a-e;for(n=1;n<=o&&t[a-n]===l[r-n];n++);return nr=l.slice(e,1<n?1-n:void 0)}function lr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ir(){return!0}function ff(){return!1}function jt(e){function t(a,n,l,r,o){this._reactName=a,this._targetInst=l,this.type=n,this.nativeEvent=r,this.target=o,this.currentTarget=null;for(var d in e)e.hasOwnProperty(d)&&(a=e[d],this[d]=a?a(r):r[d]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?ir:ff,this.isPropagationStopped=ff,this}return C(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=ir)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=ir)},persist:function(){},isPersistent:ir}),t}var Bn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},rr=jt(Bn),ti=C({},Bn,{view:0,detail:0}),hm=jt(ti),ts,as,ai,or=C({},ti,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ls,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ai&&(ai&&e.type==="mousemove"?(ts=e.screenX-ai.screenX,as=e.screenY-ai.screenY):as=ts=0,ai=e),ts)},movementY:function(e){return"movementY"in e?e.movementY:as}}),df=jt(or),mm=C({},or,{dataTransfer:0}),gm=jt(mm),ym=C({},ti,{relatedTarget:0}),ns=jt(ym),xm=C({},Bn,{animationName:0,elapsedTime:0,pseudoElement:0}),vm=jt(xm),bm=C({},Bn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Sm=jt(bm),wm=C({},Bn,{data:0}),pf=jt(wm),zm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_m={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Mm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Am(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Mm[e])?!!t[e]:!1}function ls(){return Am}var Em=C({},ti,{key:function(e){if(e.key){var t=zm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=lr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?_m[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ls,charCode:function(e){return e.type==="keypress"?lr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?lr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Tm=jt(Em),jm=C({},or,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),hf=jt(jm),km=C({},ti,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ls}),Cm=jt(km),Dm=C({},Bn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Om=jt(Dm),Bm=C({},or,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),qm=jt(Bm),Rm=C({},Bn,{newState:0,oldState:0}),Hm=jt(Rm),Um=[9,13,27,32],is=Oa&&"CompositionEvent"in window,ni=null;Oa&&"documentMode"in document&&(ni=document.documentMode);var Nm=Oa&&"TextEvent"in window&&!ni,mf=Oa&&(!is||ni&&8<ni&&11>=ni),gf=" ",yf=!1;function xf(e,t){switch(e){case"keyup":return Um.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function vf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var fl=!1;function Lm(e,t){switch(e){case"compositionend":return vf(t);case"keypress":return t.which!==32?null:(yf=!0,gf);case"textInput":return e=t.data,e===gf&&yf?null:e;default:return null}}function Gm(e,t){if(fl)return e==="compositionend"||!is&&xf(e,t)?(e=uf(),nr=es=nn=null,fl=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return mf&&t.locale!=="ko"?null:t.data;default:return null}}var Ym={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function bf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Ym[e.type]:t==="textarea"}function Sf(e,t,a,n){cl?ul?ul.push(n):ul=[n]:cl=n,t=Jr(t,"onChange"),0<t.length&&(a=new rr("onChange","change",null,a,n),e.push({event:a,listeners:t}))}var li=null,ii=null;function Xm(e){np(e,0)}function sr(e){var t=Fl(e);if(tf(t))return e}function wf(e,t){if(e==="change")return t}var zf=!1;if(Oa){var rs;if(Oa){var os="oninput"in document;if(!os){var _f=document.createElement("div");_f.setAttribute("oninput","return;"),os=typeof _f.oninput=="function"}rs=os}else rs=!1;zf=rs&&(!document.documentMode||9<document.documentMode)}function Mf(){li&&(li.detachEvent("onpropertychange",Af),ii=li=null)}function Af(e){if(e.propertyName==="value"&&sr(ii)){var t=[];Sf(t,ii,e,Wo(e)),cf(Xm,t)}}function Im(e,t,a){e==="focusin"?(Mf(),li=t,ii=a,li.attachEvent("onpropertychange",Af)):e==="focusout"&&Mf()}function Qm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return sr(ii)}function Vm(e,t){if(e==="click")return sr(t)}function Zm(e,t){if(e==="input"||e==="change")return sr(t)}function Km(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ht=typeof Object.is=="function"?Object.is:Km;function ri(e,t){if(Ht(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),n=Object.keys(t);if(a.length!==n.length)return!1;for(n=0;n<a.length;n++){var l=a[n];if(!Ea.call(t,l)||!Ht(e[l],t[l]))return!1}return!0}function Ef(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Tf(e,t){var a=Ef(e);e=0;for(var n;a;){if(a.nodeType===3){if(n=e+a.textContent.length,e<=t&&n>=t)return{node:a,offset:t-e};e=n}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Ef(a)}}function jf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?jf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function kf(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=tr(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=tr(e.document)}return t}function ss(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var $m=Oa&&"documentMode"in document&&11>=document.documentMode,dl=null,cs=null,oi=null,us=!1;function Cf(e,t,a){var n=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;us||dl==null||dl!==tr(n)||(n=dl,"selectionStart"in n&&ss(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),oi&&ri(oi,n)||(oi=n,n=Jr(cs,"onSelect"),0<n.length&&(t=new rr("onSelect","select",null,t,a),e.push({event:t,listeners:n}),t.target=dl)))}function qn(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var pl={animationend:qn("Animation","AnimationEnd"),animationiteration:qn("Animation","AnimationIteration"),animationstart:qn("Animation","AnimationStart"),transitionrun:qn("Transition","TransitionRun"),transitionstart:qn("Transition","TransitionStart"),transitioncancel:qn("Transition","TransitionCancel"),transitionend:qn("Transition","TransitionEnd")},fs={},Df={};Oa&&(Df=document.createElement("div").style,"AnimationEvent"in window||(delete pl.animationend.animation,delete pl.animationiteration.animation,delete pl.animationstart.animation),"TransitionEvent"in window||delete pl.transitionend.transition);function Rn(e){if(fs[e])return fs[e];if(!pl[e])return e;var t=pl[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in Df)return fs[e]=t[a];return e}var Of=Rn("animationend"),Bf=Rn("animationiteration"),qf=Rn("animationstart"),Jm=Rn("transitionrun"),Wm=Rn("transitionstart"),Fm=Rn("transitioncancel"),Rf=Rn("transitionend"),Hf=new Map,ds="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");ds.push("scrollEnd");function ua(e,t){Hf.set(e,t),On(t,[e])}var cr=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Jt=[],hl=0,ps=0;function ur(){for(var e=hl,t=ps=hl=0;t<e;){var a=Jt[t];Jt[t++]=null;var n=Jt[t];Jt[t++]=null;var l=Jt[t];Jt[t++]=null;var r=Jt[t];if(Jt[t++]=null,n!==null&&l!==null){var o=n.pending;o===null?l.next=l:(l.next=o.next,o.next=l),n.pending=l}r!==0&&Uf(a,l,r)}}function fr(e,t,a,n){Jt[hl++]=e,Jt[hl++]=t,Jt[hl++]=a,Jt[hl++]=n,ps|=n,e.lanes|=n,e=e.alternate,e!==null&&(e.lanes|=n)}function hs(e,t,a,n){return fr(e,t,a,n),dr(e)}function Hn(e,t){return fr(e,null,null,t),dr(e)}function Uf(e,t,a){e.lanes|=a;var n=e.alternate;n!==null&&(n.lanes|=a);for(var l=!1,r=e.return;r!==null;)r.childLanes|=a,n=r.alternate,n!==null&&(n.childLanes|=a),r.tag===22&&(e=r.stateNode,e===null||e._visibility&1||(l=!0)),e=r,r=r.return;return e.tag===3?(r=e.stateNode,l&&t!==null&&(l=31-Ze(a),e=r.hiddenUpdates,n=e[l],n===null?e[l]=[t]:n.push(t),t.lane=a|536870912),r):null}function dr(e){if(50<ji)throw ji=0,zc=null,Error(c(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ml={};function Pm(e,t,a,n){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ut(e,t,a,n){return new Pm(e,t,a,n)}function ms(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ba(e,t){var a=e.alternate;return a===null?(a=Ut(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Nf(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function pr(e,t,a,n,l,r){var o=0;if(n=e,typeof e=="function")ms(e)&&(o=1);else if(typeof e=="string")o=ly(e,a,O.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case xe:return e=Ut(31,a,t,l),e.elementType=xe,e.lanes=r,e;case P:return Un(a.children,l,r,t);case J:o=8,l|=24;break;case le:return e=Ut(12,a,t,l|2),e.elementType=le,e.lanes=r,e;case te:return e=Ut(13,a,t,l),e.elementType=te,e.lanes=r,e;case ee:return e=Ut(19,a,t,l),e.elementType=ee,e.lanes=r,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Z:o=10;break e;case he:o=9;break e;case ae:o=11;break e;case q:o=14;break e;case fe:o=16,n=null;break e}o=29,a=Error(c(130,e===null?"null":typeof e,"")),n=null}return t=Ut(o,a,t,l),t.elementType=e,t.type=n,t.lanes=r,t}function Un(e,t,a,n){return e=Ut(7,e,n,t),e.lanes=a,e}function gs(e,t,a){return e=Ut(6,e,null,t),e.lanes=a,e}function Lf(e){var t=Ut(18,null,null,0);return t.stateNode=e,t}function ys(e,t,a){return t=Ut(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Gf=new WeakMap;function Wt(e,t){if(typeof e=="object"&&e!==null){var a=Gf.get(e);return a!==void 0?a:(t={value:e,source:t,stack:Mt(t)},Gf.set(e,t),t)}return{value:e,source:t,stack:Mt(t)}}var gl=[],yl=0,hr=null,si=0,Ft=[],Pt=0,ln=null,za=1,_a="";function qa(e,t){gl[yl++]=si,gl[yl++]=hr,hr=e,si=t}function Yf(e,t,a){Ft[Pt++]=za,Ft[Pt++]=_a,Ft[Pt++]=ln,ln=e;var n=za;e=_a;var l=32-Ze(n)-1;n&=~(1<<l),a+=1;var r=32-Ze(t)+l;if(30<r){var o=l-l%5;r=(n&(1<<o)-1).toString(32),n>>=o,l-=o,za=1<<32-Ze(t)+l|a<<l|n,_a=r+e}else za=1<<r|a<<l|n,_a=e}function xs(e){e.return!==null&&(qa(e,1),Yf(e,1,0))}function vs(e){for(;e===hr;)hr=gl[--yl],gl[yl]=null,si=gl[--yl],gl[yl]=null;for(;e===ln;)ln=Ft[--Pt],Ft[Pt]=null,_a=Ft[--Pt],Ft[Pt]=null,za=Ft[--Pt],Ft[Pt]=null}function Xf(e,t){Ft[Pt++]=za,Ft[Pt++]=_a,Ft[Pt++]=ln,za=t.id,_a=t.overflow,ln=e}var yt=null,Le=null,Te=!1,rn=null,ea=!1,bs=Error(c(519));function on(e){var t=Error(c(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ci(Wt(t,e)),bs}function If(e){var t=e.stateNode,a=e.type,n=e.memoizedProps;switch(t[gt]=e,t[Tt]=n,a){case"dialog":_e("cancel",t),_e("close",t);break;case"iframe":case"object":case"embed":_e("load",t);break;case"video":case"audio":for(a=0;a<Ci.length;a++)_e(Ci[a],t);break;case"source":_e("error",t);break;case"img":case"image":case"link":_e("error",t),_e("load",t);break;case"details":_e("toggle",t);break;case"input":_e("invalid",t),af(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0);break;case"select":_e("invalid",t);break;case"textarea":_e("invalid",t),lf(t,n.value,n.defaultValue,n.children)}a=n.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||n.suppressHydrationWarning===!0||op(t.textContent,a)?(n.popover!=null&&(_e("beforetoggle",t),_e("toggle",t)),n.onScroll!=null&&_e("scroll",t),n.onScrollEnd!=null&&_e("scrollend",t),n.onClick!=null&&(t.onclick=Da),t=!0):t=!1,t||on(e,!0)}function Qf(e){for(yt=e.return;yt;)switch(yt.tag){case 5:case 31:case 13:ea=!1;return;case 27:case 3:ea=!0;return;default:yt=yt.return}}function xl(e){if(e!==yt)return!1;if(!Te)return Qf(e),Te=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Uc(e.type,e.memoizedProps)),a=!a),a&&Le&&on(e),Qf(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(317));Le=gp(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(317));Le=gp(e)}else t===27?(t=Le,Sn(e.type)?(e=Xc,Xc=null,Le=e):Le=t):Le=yt?aa(e.stateNode.nextSibling):null;return!0}function Nn(){Le=yt=null,Te=!1}function Ss(){var e=rn;return e!==null&&(Ot===null?Ot=e:Ot.push.apply(Ot,e),rn=null),e}function ci(e){rn===null?rn=[e]:rn.push(e)}var ws=p(null),Ln=null,Ra=null;function sn(e,t,a){E(ws,t._currentValue),t._currentValue=a}function Ha(e){e._currentValue=ws.current,b(ws)}function zs(e,t,a){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===a)break;e=e.return}}function _s(e,t,a,n){var l=e.child;for(l!==null&&(l.return=e);l!==null;){var r=l.dependencies;if(r!==null){var o=l.child;r=r.firstContext;e:for(;r!==null;){var d=r;r=l;for(var g=0;g<t.length;g++)if(d.context===t[g]){r.lanes|=a,d=r.alternate,d!==null&&(d.lanes|=a),zs(r.return,a,e),n||(o=null);break e}r=d.next}}else if(l.tag===18){if(o=l.return,o===null)throw Error(c(341));o.lanes|=a,r=o.alternate,r!==null&&(r.lanes|=a),zs(o,a,e),o=null}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===e){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}}function vl(e,t,a,n){e=null;for(var l=t,r=!1;l!==null;){if(!r){if((l.flags&524288)!==0)r=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var o=l.alternate;if(o===null)throw Error(c(387));if(o=o.memoizedProps,o!==null){var d=l.type;Ht(l.pendingProps.value,o.value)||(e!==null?e.push(d):e=[d])}}else if(l===F.current){if(o=l.alternate,o===null)throw Error(c(387));o.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(e!==null?e.push(Ri):e=[Ri])}l=l.return}e!==null&&_s(t,e,a,n),t.flags|=262144}function mr(e){for(e=e.firstContext;e!==null;){if(!Ht(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Gn(e){Ln=e,Ra=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function xt(e){return Vf(Ln,e)}function gr(e,t){return Ln===null&&Gn(e),Vf(e,t)}function Vf(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Ra===null){if(e===null)throw Error(c(308));Ra=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ra=Ra.next=t;return a}var eg=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},tg=i.unstable_scheduleCallback,ag=i.unstable_NormalPriority,lt={$$typeof:Z,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ms(){return{controller:new eg,data:new Map,refCount:0}}function ui(e){e.refCount--,e.refCount===0&&tg(ag,function(){e.controller.abort()})}var fi=null,As=0,bl=0,Sl=null;function ng(e,t){if(fi===null){var a=fi=[];As=0,bl=jc(),Sl={status:"pending",value:void 0,then:function(n){a.push(n)}}}return As++,t.then(Zf,Zf),t}function Zf(){if(--As===0&&fi!==null){Sl!==null&&(Sl.status="fulfilled");var e=fi;fi=null,bl=0,Sl=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function lg(e,t){var a=[],n={status:"pending",value:null,reason:null,then:function(l){a.push(l)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var l=0;l<a.length;l++)(0,a[l])(t)},function(l){for(n.status="rejected",n.reason=l,l=0;l<a.length;l++)(0,a[l])(void 0)}),n}var Kf=R.S;R.S=function(e,t){C0=se(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&ng(e,t),Kf!==null&&Kf(e,t)};var Yn=p(null);function Es(){var e=Yn.current;return e!==null?e:Ne.pooledCache}function yr(e,t){t===null?E(Yn,Yn.current):E(Yn,t.pool)}function $f(){var e=Es();return e===null?null:{parent:lt._currentValue,pool:e}}var wl=Error(c(460)),Ts=Error(c(474)),xr=Error(c(542)),vr={then:function(){}};function Jf(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Wf(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(Da,Da),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Pf(e),e;default:if(typeof t.status=="string")t.then(Da,Da);else{if(e=Ne,e!==null&&100<e.shellSuspendCounter)throw Error(c(482));e=t,e.status="pending",e.then(function(n){if(t.status==="pending"){var l=t;l.status="fulfilled",l.value=n}},function(n){if(t.status==="pending"){var l=t;l.status="rejected",l.reason=n}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Pf(e),e}throw In=t,wl}}function Xn(e){try{var t=e._init;return t(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(In=a,wl):a}}var In=null;function Ff(){if(In===null)throw Error(c(459));var e=In;return In=null,e}function Pf(e){if(e===wl||e===xr)throw Error(c(483))}var zl=null,di=0;function br(e){var t=di;return di+=1,zl===null&&(zl=[]),Wf(zl,e,t)}function pi(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Sr(e,t){throw t.$$typeof===V?Error(c(525)):(e=Object.prototype.toString.call(t),Error(c(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function ed(e){function t(M,w){if(e){var T=M.deletions;T===null?(M.deletions=[w],M.flags|=16):T.push(w)}}function a(M,w){if(!e)return null;for(;w!==null;)t(M,w),w=w.sibling;return null}function n(M){for(var w=new Map;M!==null;)M.key!==null?w.set(M.key,M):w.set(M.index,M),M=M.sibling;return w}function l(M,w){return M=Ba(M,w),M.index=0,M.sibling=null,M}function r(M,w,T){return M.index=T,e?(T=M.alternate,T!==null?(T=T.index,T<w?(M.flags|=67108866,w):T):(M.flags|=67108866,w)):(M.flags|=1048576,w)}function o(M){return e&&M.alternate===null&&(M.flags|=67108866),M}function d(M,w,T,G){return w===null||w.tag!==6?(w=gs(T,M.mode,G),w.return=M,w):(w=l(w,T),w.return=M,w)}function g(M,w,T,G){var ue=T.type;return ue===P?L(M,w,T.props.children,G,T.key):w!==null&&(w.elementType===ue||typeof ue=="object"&&ue!==null&&ue.$$typeof===fe&&Xn(ue)===w.type)?(w=l(w,T.props),pi(w,T),w.return=M,w):(w=pr(T.type,T.key,T.props,null,M.mode,G),pi(w,T),w.return=M,w)}function j(M,w,T,G){return w===null||w.tag!==4||w.stateNode.containerInfo!==T.containerInfo||w.stateNode.implementation!==T.implementation?(w=ys(T,M.mode,G),w.return=M,w):(w=l(w,T.children||[]),w.return=M,w)}function L(M,w,T,G,ue){return w===null||w.tag!==7?(w=Un(T,M.mode,G,ue),w.return=M,w):(w=l(w,T),w.return=M,w)}function X(M,w,T){if(typeof w=="string"&&w!==""||typeof w=="number"||typeof w=="bigint")return w=gs(""+w,M.mode,T),w.return=M,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case H:return T=pr(w.type,w.key,w.props,null,M.mode,T),pi(T,w),T.return=M,T;case U:return w=ys(w,M.mode,T),w.return=M,w;case fe:return w=Xn(w),X(M,w,T)}if(Pe(w)||we(w))return w=Un(w,M.mode,T,null),w.return=M,w;if(typeof w.then=="function")return X(M,br(w),T);if(w.$$typeof===Z)return X(M,gr(M,w),T);Sr(M,w)}return null}function D(M,w,T,G){var ue=w!==null?w.key:null;if(typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint")return ue!==null?null:d(M,w,""+T,G);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case H:return T.key===ue?g(M,w,T,G):null;case U:return T.key===ue?j(M,w,T,G):null;case fe:return T=Xn(T),D(M,w,T,G)}if(Pe(T)||we(T))return ue!==null?null:L(M,w,T,G,null);if(typeof T.then=="function")return D(M,w,br(T),G);if(T.$$typeof===Z)return D(M,w,gr(M,T),G);Sr(M,T)}return null}function B(M,w,T,G,ue){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return M=M.get(T)||null,d(w,M,""+G,ue);if(typeof G=="object"&&G!==null){switch(G.$$typeof){case H:return M=M.get(G.key===null?T:G.key)||null,g(w,M,G,ue);case U:return M=M.get(G.key===null?T:G.key)||null,j(w,M,G,ue);case fe:return G=Xn(G),B(M,w,T,G,ue)}if(Pe(G)||we(G))return M=M.get(T)||null,L(w,M,G,ue,null);if(typeof G.then=="function")return B(M,w,T,br(G),ue);if(G.$$typeof===Z)return B(M,w,T,gr(w,G),ue);Sr(w,G)}return null}function ne(M,w,T,G){for(var ue=null,ke=null,ie=w,be=w=0,Ae=null;ie!==null&&be<T.length;be++){ie.index>be?(Ae=ie,ie=null):Ae=ie.sibling;var Ce=D(M,ie,T[be],G);if(Ce===null){ie===null&&(ie=Ae);break}e&&ie&&Ce.alternate===null&&t(M,ie),w=r(Ce,w,be),ke===null?ue=Ce:ke.sibling=Ce,ke=Ce,ie=Ae}if(be===T.length)return a(M,ie),Te&&qa(M,be),ue;if(ie===null){for(;be<T.length;be++)ie=X(M,T[be],G),ie!==null&&(w=r(ie,w,be),ke===null?ue=ie:ke.sibling=ie,ke=ie);return Te&&qa(M,be),ue}for(ie=n(ie);be<T.length;be++)Ae=B(ie,M,be,T[be],G),Ae!==null&&(e&&Ae.alternate!==null&&ie.delete(Ae.key===null?be:Ae.key),w=r(Ae,w,be),ke===null?ue=Ae:ke.sibling=Ae,ke=Ae);return e&&ie.forEach(function(An){return t(M,An)}),Te&&qa(M,be),ue}function pe(M,w,T,G){if(T==null)throw Error(c(151));for(var ue=null,ke=null,ie=w,be=w=0,Ae=null,Ce=T.next();ie!==null&&!Ce.done;be++,Ce=T.next()){ie.index>be?(Ae=ie,ie=null):Ae=ie.sibling;var An=D(M,ie,Ce.value,G);if(An===null){ie===null&&(ie=Ae);break}e&&ie&&An.alternate===null&&t(M,ie),w=r(An,w,be),ke===null?ue=An:ke.sibling=An,ke=An,ie=Ae}if(Ce.done)return a(M,ie),Te&&qa(M,be),ue;if(ie===null){for(;!Ce.done;be++,Ce=T.next())Ce=X(M,Ce.value,G),Ce!==null&&(w=r(Ce,w,be),ke===null?ue=Ce:ke.sibling=Ce,ke=Ce);return Te&&qa(M,be),ue}for(ie=n(ie);!Ce.done;be++,Ce=T.next())Ce=B(ie,M,be,Ce.value,G),Ce!==null&&(e&&Ce.alternate!==null&&ie.delete(Ce.key===null?be:Ce.key),w=r(Ce,w,be),ke===null?ue=Ce:ke.sibling=Ce,ke=Ce);return e&&ie.forEach(function(my){return t(M,my)}),Te&&qa(M,be),ue}function Ue(M,w,T,G){if(typeof T=="object"&&T!==null&&T.type===P&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case H:e:{for(var ue=T.key;w!==null;){if(w.key===ue){if(ue=T.type,ue===P){if(w.tag===7){a(M,w.sibling),G=l(w,T.props.children),G.return=M,M=G;break e}}else if(w.elementType===ue||typeof ue=="object"&&ue!==null&&ue.$$typeof===fe&&Xn(ue)===w.type){a(M,w.sibling),G=l(w,T.props),pi(G,T),G.return=M,M=G;break e}a(M,w);break}else t(M,w);w=w.sibling}T.type===P?(G=Un(T.props.children,M.mode,G,T.key),G.return=M,M=G):(G=pr(T.type,T.key,T.props,null,M.mode,G),pi(G,T),G.return=M,M=G)}return o(M);case U:e:{for(ue=T.key;w!==null;){if(w.key===ue)if(w.tag===4&&w.stateNode.containerInfo===T.containerInfo&&w.stateNode.implementation===T.implementation){a(M,w.sibling),G=l(w,T.children||[]),G.return=M,M=G;break e}else{a(M,w);break}else t(M,w);w=w.sibling}G=ys(T,M.mode,G),G.return=M,M=G}return o(M);case fe:return T=Xn(T),Ue(M,w,T,G)}if(Pe(T))return ne(M,w,T,G);if(we(T)){if(ue=we(T),typeof ue!="function")throw Error(c(150));return T=ue.call(T),pe(M,w,T,G)}if(typeof T.then=="function")return Ue(M,w,br(T),G);if(T.$$typeof===Z)return Ue(M,w,gr(M,T),G);Sr(M,T)}return typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint"?(T=""+T,w!==null&&w.tag===6?(a(M,w.sibling),G=l(w,T),G.return=M,M=G):(a(M,w),G=gs(T,M.mode,G),G.return=M,M=G),o(M)):a(M,w)}return function(M,w,T,G){try{di=0;var ue=Ue(M,w,T,G);return zl=null,ue}catch(ie){if(ie===wl||ie===xr)throw ie;var ke=Ut(29,ie,null,M.mode);return ke.lanes=G,ke.return=M,ke}}}var Qn=ed(!0),td=ed(!1),cn=!1;function js(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ks(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function un(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function fn(e,t,a){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,(De&2)!==0){var l=n.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),n.pending=t,t=dr(e),Uf(e,null,a),t}return fr(e,n,t,a),dr(e)}function hi(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,Jl(e,a)}}function Cs(e,t){var a=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,a===n)){var l=null,r=null;if(a=a.firstBaseUpdate,a!==null){do{var o={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};r===null?l=r=o:r=r.next=o,a=a.next}while(a!==null);r===null?l=r=t:r=r.next=t}else l=r=t;a={baseState:n.baseState,firstBaseUpdate:l,lastBaseUpdate:r,shared:n.shared,callbacks:n.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var Ds=!1;function mi(){if(Ds){var e=Sl;if(e!==null)throw e}}function gi(e,t,a,n){Ds=!1;var l=e.updateQueue;cn=!1;var r=l.firstBaseUpdate,o=l.lastBaseUpdate,d=l.shared.pending;if(d!==null){l.shared.pending=null;var g=d,j=g.next;g.next=null,o===null?r=j:o.next=j,o=g;var L=e.alternate;L!==null&&(L=L.updateQueue,d=L.lastBaseUpdate,d!==o&&(d===null?L.firstBaseUpdate=j:d.next=j,L.lastBaseUpdate=g))}if(r!==null){var X=l.baseState;o=0,L=j=g=null,d=r;do{var D=d.lane&-536870913,B=D!==d.lane;if(B?(Me&D)===D:(n&D)===D){D!==0&&D===bl&&(Ds=!0),L!==null&&(L=L.next={lane:0,tag:d.tag,payload:d.payload,callback:null,next:null});e:{var ne=e,pe=d;D=t;var Ue=a;switch(pe.tag){case 1:if(ne=pe.payload,typeof ne=="function"){X=ne.call(Ue,X,D);break e}X=ne;break e;case 3:ne.flags=ne.flags&-65537|128;case 0:if(ne=pe.payload,D=typeof ne=="function"?ne.call(Ue,X,D):ne,D==null)break e;X=C({},X,D);break e;case 2:cn=!0}}D=d.callback,D!==null&&(e.flags|=64,B&&(e.flags|=8192),B=l.callbacks,B===null?l.callbacks=[D]:B.push(D))}else B={lane:D,tag:d.tag,payload:d.payload,callback:d.callback,next:null},L===null?(j=L=B,g=X):L=L.next=B,o|=D;if(d=d.next,d===null){if(d=l.shared.pending,d===null)break;B=d,d=B.next,B.next=null,l.lastBaseUpdate=B,l.shared.pending=null}}while(!0);L===null&&(g=X),l.baseState=g,l.firstBaseUpdate=j,l.lastBaseUpdate=L,r===null&&(l.shared.lanes=0),gn|=o,e.lanes=o,e.memoizedState=X}}function ad(e,t){if(typeof e!="function")throw Error(c(191,e));e.call(t)}function nd(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)ad(a[e],t)}var _l=p(null),wr=p(0);function ld(e,t){e=Va,E(wr,e),E(_l,t),Va=e|t.baseLanes}function Os(){E(wr,Va),E(_l,_l.current)}function Bs(){Va=wr.current,b(_l),b(wr)}var Nt=p(null),ta=null;function dn(e){var t=e.alternate;E(tt,tt.current&1),E(Nt,e),ta===null&&(t===null||_l.current!==null||t.memoizedState!==null)&&(ta=e)}function qs(e){E(tt,tt.current),E(Nt,e),ta===null&&(ta=e)}function id(e){e.tag===22?(E(tt,tt.current),E(Nt,e),ta===null&&(ta=e)):pn()}function pn(){E(tt,tt.current),E(Nt,Nt.current)}function Lt(e){b(Nt),ta===e&&(ta=null),b(tt)}var tt=p(0);function zr(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Gc(a)||Yc(a)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ua=0,ve=null,Re=null,it=null,_r=!1,Ml=!1,Vn=!1,Mr=0,yi=0,Al=null,ig=0;function We(){throw Error(c(321))}function Rs(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!Ht(e[a],t[a]))return!1;return!0}function Hs(e,t,a,n,l,r){return Ua=r,ve=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,R.H=e===null||e.memoizedState===null?Yd:Fs,Vn=!1,r=a(n,l),Vn=!1,Ml&&(r=od(t,a,n,l)),rd(e),r}function rd(e){R.H=bi;var t=Re!==null&&Re.next!==null;if(Ua=0,it=Re=ve=null,_r=!1,yi=0,Al=null,t)throw Error(c(300));e===null||rt||(e=e.dependencies,e!==null&&mr(e)&&(rt=!0))}function od(e,t,a,n){ve=e;var l=0;do{if(Ml&&(Al=null),yi=0,Ml=!1,25<=l)throw Error(c(301));if(l+=1,it=Re=null,e.updateQueue!=null){var r=e.updateQueue;r.lastEffect=null,r.events=null,r.stores=null,r.memoCache!=null&&(r.memoCache.index=0)}R.H=Xd,r=t(a,n)}while(Ml);return r}function rg(){var e=R.H,t=e.useState()[0];return t=typeof t.then=="function"?xi(t):t,e=e.useState()[0],(Re!==null?Re.memoizedState:null)!==e&&(ve.flags|=1024),t}function Us(){var e=Mr!==0;return Mr=0,e}function Ns(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function Ls(e){if(_r){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}_r=!1}Ua=0,it=Re=ve=null,Ml=!1,yi=Mr=0,Al=null}function At(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return it===null?ve.memoizedState=it=e:it=it.next=e,it}function at(){if(Re===null){var e=ve.alternate;e=e!==null?e.memoizedState:null}else e=Re.next;var t=it===null?ve.memoizedState:it.next;if(t!==null)it=t,Re=e;else{if(e===null)throw ve.alternate===null?Error(c(467)):Error(c(310));Re=e,e={memoizedState:Re.memoizedState,baseState:Re.baseState,baseQueue:Re.baseQueue,queue:Re.queue,next:null},it===null?ve.memoizedState=it=e:it=it.next=e}return it}function Ar(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function xi(e){var t=yi;return yi+=1,Al===null&&(Al=[]),e=Wf(Al,e,t),t=ve,(it===null?t.memoizedState:it.next)===null&&(t=t.alternate,R.H=t===null||t.memoizedState===null?Yd:Fs),e}function Er(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return xi(e);if(e.$$typeof===Z)return xt(e)}throw Error(c(438,String(e)))}function Gs(e){var t=null,a=ve.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var n=ve.alternate;n!==null&&(n=n.updateQueue,n!==null&&(n=n.memoCache,n!=null&&(t={data:n.data.map(function(l){return l.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=Ar(),ve.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),n=0;n<e;n++)a[n]=me;return t.index++,a}function Na(e,t){return typeof t=="function"?t(e):t}function Tr(e){var t=at();return Ys(t,Re,e)}function Ys(e,t,a){var n=e.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=a;var l=e.baseQueue,r=n.pending;if(r!==null){if(l!==null){var o=l.next;l.next=r.next,r.next=o}t.baseQueue=l=r,n.pending=null}if(r=e.baseState,l===null)e.memoizedState=r;else{t=l.next;var d=o=null,g=null,j=t,L=!1;do{var X=j.lane&-536870913;if(X!==j.lane?(Me&X)===X:(Ua&X)===X){var D=j.revertLane;if(D===0)g!==null&&(g=g.next={lane:0,revertLane:0,gesture:null,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null}),X===bl&&(L=!0);else if((Ua&D)===D){j=j.next,D===bl&&(L=!0);continue}else X={lane:0,revertLane:j.revertLane,gesture:null,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null},g===null?(d=g=X,o=r):g=g.next=X,ve.lanes|=D,gn|=D;X=j.action,Vn&&a(r,X),r=j.hasEagerState?j.eagerState:a(r,X)}else D={lane:X,revertLane:j.revertLane,gesture:j.gesture,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null},g===null?(d=g=D,o=r):g=g.next=D,ve.lanes|=X,gn|=X;j=j.next}while(j!==null&&j!==t);if(g===null?o=r:g.next=d,!Ht(r,e.memoizedState)&&(rt=!0,L&&(a=Sl,a!==null)))throw a;e.memoizedState=r,e.baseState=o,e.baseQueue=g,n.lastRenderedState=r}return l===null&&(n.lanes=0),[e.memoizedState,n.dispatch]}function Xs(e){var t=at(),a=t.queue;if(a===null)throw Error(c(311));a.lastRenderedReducer=e;var n=a.dispatch,l=a.pending,r=t.memoizedState;if(l!==null){a.pending=null;var o=l=l.next;do r=e(r,o.action),o=o.next;while(o!==l);Ht(r,t.memoizedState)||(rt=!0),t.memoizedState=r,t.baseQueue===null&&(t.baseState=r),a.lastRenderedState=r}return[r,n]}function sd(e,t,a){var n=ve,l=at(),r=Te;if(r){if(a===void 0)throw Error(c(407));a=a()}else a=t();var o=!Ht((Re||l).memoizedState,a);if(o&&(l.memoizedState=a,rt=!0),l=l.queue,Vs(fd.bind(null,n,l,e),[e]),l.getSnapshot!==t||o||it!==null&&it.memoizedState.tag&1){if(n.flags|=2048,El(9,{destroy:void 0},ud.bind(null,n,l,a,t),null),Ne===null)throw Error(c(349));r||(Ua&127)!==0||cd(n,t,a)}return a}function cd(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=ve.updateQueue,t===null?(t=Ar(),ve.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function ud(e,t,a,n){t.value=a,t.getSnapshot=n,dd(t)&&pd(e)}function fd(e,t,a){return a(function(){dd(t)&&pd(e)})}function dd(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!Ht(e,a)}catch{return!0}}function pd(e){var t=Hn(e,2);t!==null&&Bt(t,e,2)}function Is(e){var t=At();if(typeof e=="function"){var a=e;if(e=a(),Vn){pt(!0);try{a()}finally{pt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Na,lastRenderedState:e},t}function hd(e,t,a,n){return e.baseState=a,Ys(e,Re,typeof n=="function"?n:Na)}function og(e,t,a,n,l){if(Cr(e))throw Error(c(485));if(e=t.action,e!==null){var r={payload:l,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(o){r.listeners.push(o)}};R.T!==null?a(!0):r.isTransition=!1,n(r),a=t.pending,a===null?(r.next=t.pending=r,md(t,r)):(r.next=a.next,t.pending=a.next=r)}}function md(e,t){var a=t.action,n=t.payload,l=e.state;if(t.isTransition){var r=R.T,o={};R.T=o;try{var d=a(l,n),g=R.S;g!==null&&g(o,d),gd(e,t,d)}catch(j){Qs(e,t,j)}finally{r!==null&&o.types!==null&&(r.types=o.types),R.T=r}}else try{r=a(l,n),gd(e,t,r)}catch(j){Qs(e,t,j)}}function gd(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(n){yd(e,t,n)},function(n){return Qs(e,t,n)}):yd(e,t,a)}function yd(e,t,a){t.status="fulfilled",t.value=a,xd(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,md(e,a)))}function Qs(e,t,a){var n=e.pending;if(e.pending=null,n!==null){n=n.next;do t.status="rejected",t.reason=a,xd(t),t=t.next;while(t!==n)}e.action=null}function xd(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function vd(e,t){return t}function bd(e,t){if(Te){var a=Ne.formState;if(a!==null){e:{var n=ve;if(Te){if(Le){t:{for(var l=Le,r=ea;l.nodeType!==8;){if(!r){l=null;break t}if(l=aa(l.nextSibling),l===null){l=null;break t}}r=l.data,l=r==="F!"||r==="F"?l:null}if(l){Le=aa(l.nextSibling),n=l.data==="F!";break e}}on(n)}n=!1}n&&(t=a[0])}}return a=At(),a.memoizedState=a.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:vd,lastRenderedState:t},a.queue=n,a=Nd.bind(null,ve,n),n.dispatch=a,n=Is(!1),r=Ws.bind(null,ve,!1,n.queue),n=At(),l={state:t,dispatch:null,action:e,pending:null},n.queue=l,a=og.bind(null,ve,l,r,a),l.dispatch=a,n.memoizedState=e,[t,a,!1]}function Sd(e){var t=at();return wd(t,Re,e)}function wd(e,t,a){if(t=Ys(e,t,vd)[0],e=Tr(Na)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var n=xi(t)}catch(o){throw o===wl?xr:o}else n=t;t=at();var l=t.queue,r=l.dispatch;return a!==t.memoizedState&&(ve.flags|=2048,El(9,{destroy:void 0},sg.bind(null,l,a),null)),[n,r,e]}function sg(e,t){e.action=t}function zd(e){var t=at(),a=Re;if(a!==null)return wd(t,a,e);at(),t=t.memoizedState,a=at();var n=a.queue.dispatch;return a.memoizedState=e,[t,n,!1]}function El(e,t,a,n){return e={tag:e,create:a,deps:n,inst:t,next:null},t=ve.updateQueue,t===null&&(t=Ar(),ve.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(n=a.next,a.next=e,e.next=n,t.lastEffect=e),e}function _d(){return at().memoizedState}function jr(e,t,a,n){var l=At();ve.flags|=e,l.memoizedState=El(1|t,{destroy:void 0},a,n===void 0?null:n)}function kr(e,t,a,n){var l=at();n=n===void 0?null:n;var r=l.memoizedState.inst;Re!==null&&n!==null&&Rs(n,Re.memoizedState.deps)?l.memoizedState=El(t,r,a,n):(ve.flags|=e,l.memoizedState=El(1|t,r,a,n))}function Md(e,t){jr(8390656,8,e,t)}function Vs(e,t){kr(2048,8,e,t)}function cg(e){ve.flags|=4;var t=ve.updateQueue;if(t===null)t=Ar(),ve.updateQueue=t,t.events=[e];else{var a=t.events;a===null?t.events=[e]:a.push(e)}}function Ad(e){var t=at().memoizedState;return cg({ref:t,nextImpl:e}),function(){if((De&2)!==0)throw Error(c(440));return t.impl.apply(void 0,arguments)}}function Ed(e,t){return kr(4,2,e,t)}function Td(e,t){return kr(4,4,e,t)}function jd(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function kd(e,t,a){a=a!=null?a.concat([e]):null,kr(4,4,jd.bind(null,t,e),a)}function Zs(){}function Cd(e,t){var a=at();t=t===void 0?null:t;var n=a.memoizedState;return t!==null&&Rs(t,n[1])?n[0]:(a.memoizedState=[e,t],e)}function Dd(e,t){var a=at();t=t===void 0?null:t;var n=a.memoizedState;if(t!==null&&Rs(t,n[1]))return n[0];if(n=e(),Vn){pt(!0);try{e()}finally{pt(!1)}}return a.memoizedState=[n,t],n}function Ks(e,t,a){return a===void 0||(Ua&1073741824)!==0&&(Me&261930)===0?e.memoizedState=t:(e.memoizedState=a,e=O0(),ve.lanes|=e,gn|=e,a)}function Od(e,t,a,n){return Ht(a,t)?a:_l.current!==null?(e=Ks(e,a,n),Ht(e,t)||(rt=!0),e):(Ua&42)===0||(Ua&1073741824)!==0&&(Me&261930)===0?(rt=!0,e.memoizedState=a):(e=O0(),ve.lanes|=e,gn|=e,t)}function Bd(e,t,a,n,l){var r=W.p;W.p=r!==0&&8>r?r:8;var o=R.T,d={};R.T=d,Ws(e,!1,t,a);try{var g=l(),j=R.S;if(j!==null&&j(d,g),g!==null&&typeof g=="object"&&typeof g.then=="function"){var L=lg(g,n);vi(e,t,L,Xt(e))}else vi(e,t,n,Xt(e))}catch(X){vi(e,t,{then:function(){},status:"rejected",reason:X},Xt())}finally{W.p=r,o!==null&&d.types!==null&&(o.types=d.types),R.T=o}}function ug(){}function $s(e,t,a,n){if(e.tag!==5)throw Error(c(476));var l=qd(e).queue;Bd(e,l,t,v,a===null?ug:function(){return Rd(e),a(n)})}function qd(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:v,baseState:v,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Na,lastRenderedState:v},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Na,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Rd(e){var t=qd(e);t.next===null&&(t=e.alternate.memoizedState),vi(e,t.next.queue,{},Xt())}function Js(){return xt(Ri)}function Hd(){return at().memoizedState}function Ud(){return at().memoizedState}function fg(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=Xt();e=un(a);var n=fn(t,e,a);n!==null&&(Bt(n,t,a),hi(n,t,a)),t={cache:Ms()},e.payload=t;return}t=t.return}}function dg(e,t,a){var n=Xt();a={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Cr(e)?Ld(t,a):(a=hs(e,t,a,n),a!==null&&(Bt(a,e,n),Gd(a,t,n)))}function Nd(e,t,a){var n=Xt();vi(e,t,a,n)}function vi(e,t,a,n){var l={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Cr(e))Ld(t,l);else{var r=e.alternate;if(e.lanes===0&&(r===null||r.lanes===0)&&(r=t.lastRenderedReducer,r!==null))try{var o=t.lastRenderedState,d=r(o,a);if(l.hasEagerState=!0,l.eagerState=d,Ht(d,o))return fr(e,t,l,0),Ne===null&&ur(),!1}catch{}if(a=hs(e,t,l,n),a!==null)return Bt(a,e,n),Gd(a,t,n),!0}return!1}function Ws(e,t,a,n){if(n={lane:2,revertLane:jc(),gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Cr(e)){if(t)throw Error(c(479))}else t=hs(e,a,n,2),t!==null&&Bt(t,e,2)}function Cr(e){var t=e.alternate;return e===ve||t!==null&&t===ve}function Ld(e,t){Ml=_r=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function Gd(e,t,a){if((a&4194048)!==0){var n=t.lanes;n&=e.pendingLanes,a|=n,t.lanes=a,Jl(e,a)}}var bi={readContext:xt,use:Er,useCallback:We,useContext:We,useEffect:We,useImperativeHandle:We,useLayoutEffect:We,useInsertionEffect:We,useMemo:We,useReducer:We,useRef:We,useState:We,useDebugValue:We,useDeferredValue:We,useTransition:We,useSyncExternalStore:We,useId:We,useHostTransitionStatus:We,useFormState:We,useActionState:We,useOptimistic:We,useMemoCache:We,useCacheRefresh:We};bi.useEffectEvent=We;var Yd={readContext:xt,use:Er,useCallback:function(e,t){return At().memoizedState=[e,t===void 0?null:t],e},useContext:xt,useEffect:Md,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,jr(4194308,4,jd.bind(null,t,e),a)},useLayoutEffect:function(e,t){return jr(4194308,4,e,t)},useInsertionEffect:function(e,t){jr(4,2,e,t)},useMemo:function(e,t){var a=At();t=t===void 0?null:t;var n=e();if(Vn){pt(!0);try{e()}finally{pt(!1)}}return a.memoizedState=[n,t],n},useReducer:function(e,t,a){var n=At();if(a!==void 0){var l=a(t);if(Vn){pt(!0);try{a(t)}finally{pt(!1)}}}else l=t;return n.memoizedState=n.baseState=l,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:l},n.queue=e,e=e.dispatch=dg.bind(null,ve,e),[n.memoizedState,e]},useRef:function(e){var t=At();return e={current:e},t.memoizedState=e},useState:function(e){e=Is(e);var t=e.queue,a=Nd.bind(null,ve,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:Zs,useDeferredValue:function(e,t){var a=At();return Ks(a,e,t)},useTransition:function(){var e=Is(!1);return e=Bd.bind(null,ve,e.queue,!0,!1),At().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var n=ve,l=At();if(Te){if(a===void 0)throw Error(c(407));a=a()}else{if(a=t(),Ne===null)throw Error(c(349));(Me&127)!==0||cd(n,t,a)}l.memoizedState=a;var r={value:a,getSnapshot:t};return l.queue=r,Md(fd.bind(null,n,r,e),[e]),n.flags|=2048,El(9,{destroy:void 0},ud.bind(null,n,r,a,t),null),a},useId:function(){var e=At(),t=Ne.identifierPrefix;if(Te){var a=_a,n=za;a=(n&~(1<<32-Ze(n)-1)).toString(32)+a,t="_"+t+"R_"+a,a=Mr++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=ig++,t="_"+t+"r_"+a.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Js,useFormState:bd,useActionState:bd,useOptimistic:function(e){var t=At();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=Ws.bind(null,ve,!0,a),a.dispatch=t,[e,t]},useMemoCache:Gs,useCacheRefresh:function(){return At().memoizedState=fg.bind(null,ve)},useEffectEvent:function(e){var t=At(),a={impl:e};return t.memoizedState=a,function(){if((De&2)!==0)throw Error(c(440));return a.impl.apply(void 0,arguments)}}},Fs={readContext:xt,use:Er,useCallback:Cd,useContext:xt,useEffect:Vs,useImperativeHandle:kd,useInsertionEffect:Ed,useLayoutEffect:Td,useMemo:Dd,useReducer:Tr,useRef:_d,useState:function(){return Tr(Na)},useDebugValue:Zs,useDeferredValue:function(e,t){var a=at();return Od(a,Re.memoizedState,e,t)},useTransition:function(){var e=Tr(Na)[0],t=at().memoizedState;return[typeof e=="boolean"?e:xi(e),t]},useSyncExternalStore:sd,useId:Hd,useHostTransitionStatus:Js,useFormState:Sd,useActionState:Sd,useOptimistic:function(e,t){var a=at();return hd(a,Re,e,t)},useMemoCache:Gs,useCacheRefresh:Ud};Fs.useEffectEvent=Ad;var Xd={readContext:xt,use:Er,useCallback:Cd,useContext:xt,useEffect:Vs,useImperativeHandle:kd,useInsertionEffect:Ed,useLayoutEffect:Td,useMemo:Dd,useReducer:Xs,useRef:_d,useState:function(){return Xs(Na)},useDebugValue:Zs,useDeferredValue:function(e,t){var a=at();return Re===null?Ks(a,e,t):Od(a,Re.memoizedState,e,t)},useTransition:function(){var e=Xs(Na)[0],t=at().memoizedState;return[typeof e=="boolean"?e:xi(e),t]},useSyncExternalStore:sd,useId:Hd,useHostTransitionStatus:Js,useFormState:zd,useActionState:zd,useOptimistic:function(e,t){var a=at();return Re!==null?hd(a,Re,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Gs,useCacheRefresh:Ud};Xd.useEffectEvent=Ad;function Ps(e,t,a,n){t=e.memoizedState,a=a(n,t),a=a==null?t:C({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var ec={enqueueSetState:function(e,t,a){e=e._reactInternals;var n=Xt(),l=un(n);l.payload=t,a!=null&&(l.callback=a),t=fn(e,l,n),t!==null&&(Bt(t,e,n),hi(t,e,n))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var n=Xt(),l=un(n);l.tag=1,l.payload=t,a!=null&&(l.callback=a),t=fn(e,l,n),t!==null&&(Bt(t,e,n),hi(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=Xt(),n=un(a);n.tag=2,t!=null&&(n.callback=t),t=fn(e,n,a),t!==null&&(Bt(t,e,a),hi(t,e,a))}};function Id(e,t,a,n,l,r,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,r,o):t.prototype&&t.prototype.isPureReactComponent?!ri(a,n)||!ri(l,r):!0}function Qd(e,t,a,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,n),t.state!==e&&ec.enqueueReplaceState(t,t.state,null)}function Zn(e,t){var a=t;if("ref"in t){a={};for(var n in t)n!=="ref"&&(a[n]=t[n])}if(e=e.defaultProps){a===t&&(a=C({},a));for(var l in e)a[l]===void 0&&(a[l]=e[l])}return a}function Vd(e){cr(e)}function Zd(e){console.error(e)}function Kd(e){cr(e)}function Dr(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function $d(e,t,a){try{var n=e.onCaughtError;n(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function tc(e,t,a){return a=un(a),a.tag=3,a.payload={element:null},a.callback=function(){Dr(e,t)},a}function Jd(e){return e=un(e),e.tag=3,e}function Wd(e,t,a,n){var l=a.type.getDerivedStateFromError;if(typeof l=="function"){var r=n.value;e.payload=function(){return l(r)},e.callback=function(){$d(t,a,n)}}var o=a.stateNode;o!==null&&typeof o.componentDidCatch=="function"&&(e.callback=function(){$d(t,a,n),typeof l!="function"&&(yn===null?yn=new Set([this]):yn.add(this));var d=n.stack;this.componentDidCatch(n.value,{componentStack:d!==null?d:""})})}function pg(e,t,a,n,l){if(a.flags|=32768,n!==null&&typeof n=="object"&&typeof n.then=="function"){if(t=a.alternate,t!==null&&vl(t,a,l,!0),a=Nt.current,a!==null){switch(a.tag){case 31:case 13:return ta===null?Ir():a.alternate===null&&Fe===0&&(Fe=3),a.flags&=-257,a.flags|=65536,a.lanes=l,n===vr?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([n]):t.add(n),Ac(e,n,l)),!1;case 22:return a.flags|=65536,n===vr?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([n]):a.add(n)),Ac(e,n,l)),!1}throw Error(c(435,a.tag))}return Ac(e,n,l),Ir(),!1}if(Te)return t=Nt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=l,n!==bs&&(e=Error(c(422),{cause:n}),ci(Wt(e,a)))):(n!==bs&&(t=Error(c(423),{cause:n}),ci(Wt(t,a))),e=e.current.alternate,e.flags|=65536,l&=-l,e.lanes|=l,n=Wt(n,a),l=tc(e.stateNode,n,l),Cs(e,l),Fe!==4&&(Fe=2)),!1;var r=Error(c(520),{cause:n});if(r=Wt(r,a),Ti===null?Ti=[r]:Ti.push(r),Fe!==4&&(Fe=2),t===null)return!0;n=Wt(n,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=l&-l,a.lanes|=e,e=tc(a.stateNode,n,e),Cs(a,e),!1;case 1:if(t=a.type,r=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||r!==null&&typeof r.componentDidCatch=="function"&&(yn===null||!yn.has(r))))return a.flags|=65536,l&=-l,a.lanes|=l,l=Jd(l),Wd(l,e,a,n),Cs(a,l),!1}a=a.return}while(a!==null);return!1}var ac=Error(c(461)),rt=!1;function vt(e,t,a,n){t.child=e===null?td(t,null,a,n):Qn(t,e.child,a,n)}function Fd(e,t,a,n,l){a=a.render;var r=t.ref;if("ref"in n){var o={};for(var d in n)d!=="ref"&&(o[d]=n[d])}else o=n;return Gn(t),n=Hs(e,t,a,o,r,l),d=Us(),e!==null&&!rt?(Ns(e,t,l),La(e,t,l)):(Te&&d&&xs(t),t.flags|=1,vt(e,t,n,l),t.child)}function Pd(e,t,a,n,l){if(e===null){var r=a.type;return typeof r=="function"&&!ms(r)&&r.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=r,e0(e,t,r,n,l)):(e=pr(a.type,null,n,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(r=e.child,!uc(e,l)){var o=r.memoizedProps;if(a=a.compare,a=a!==null?a:ri,a(o,n)&&e.ref===t.ref)return La(e,t,l)}return t.flags|=1,e=Ba(r,n),e.ref=t.ref,e.return=t,t.child=e}function e0(e,t,a,n,l){if(e!==null){var r=e.memoizedProps;if(ri(r,n)&&e.ref===t.ref)if(rt=!1,t.pendingProps=n=r,uc(e,l))(e.flags&131072)!==0&&(rt=!0);else return t.lanes=e.lanes,La(e,t,l)}return nc(e,t,a,n,l)}function t0(e,t,a,n){var l=n.children,r=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.mode==="hidden"){if((t.flags&128)!==0){if(r=r!==null?r.baseLanes|a:a,e!==null){for(n=t.child=e.child,l=0;n!==null;)l=l|n.lanes|n.childLanes,n=n.sibling;n=l&~r}else n=0,t.child=null;return a0(e,t,r,a,n)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&yr(t,r!==null?r.cachePool:null),r!==null?ld(t,r):Os(),id(t);else return n=t.lanes=536870912,a0(e,t,r!==null?r.baseLanes|a:a,a,n)}else r!==null?(yr(t,r.cachePool),ld(t,r),pn(),t.memoizedState=null):(e!==null&&yr(t,null),Os(),pn());return vt(e,t,l,a),t.child}function Si(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function a0(e,t,a,n,l){var r=Es();return r=r===null?null:{parent:lt._currentValue,pool:r},t.memoizedState={baseLanes:a,cachePool:r},e!==null&&yr(t,null),Os(),id(t),e!==null&&vl(e,t,n,!0),t.childLanes=l,null}function Or(e,t){return t=qr({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function n0(e,t,a){return Qn(t,e.child,null,a),e=Or(t,t.pendingProps),e.flags|=2,Lt(t),t.memoizedState=null,e}function hg(e,t,a){var n=t.pendingProps,l=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Te){if(n.mode==="hidden")return e=Or(t,n),t.lanes=536870912,Si(null,e);if(qs(t),(e=Le)?(e=mp(e,ea),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ln!==null?{id:za,overflow:_a}:null,retryLane:536870912,hydrationErrors:null},a=Lf(e),a.return=t,t.child=a,yt=t,Le=null)):e=null,e===null)throw on(t);return t.lanes=536870912,null}return Or(t,n)}var r=e.memoizedState;if(r!==null){var o=r.dehydrated;if(qs(t),l)if(t.flags&256)t.flags&=-257,t=n0(e,t,a);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(c(558));else if(rt||vl(e,t,a,!1),l=(a&e.childLanes)!==0,rt||l){if(n=Ne,n!==null&&(o=Vu(n,a),o!==0&&o!==r.retryLane))throw r.retryLane=o,Hn(e,o),Bt(n,e,o),ac;Ir(),t=n0(e,t,a)}else e=r.treeContext,Le=aa(o.nextSibling),yt=t,Te=!0,rn=null,ea=!1,e!==null&&Xf(t,e),t=Or(t,n),t.flags|=4096;return t}return e=Ba(e.child,{mode:n.mode,children:n.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Br(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(c(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function nc(e,t,a,n,l){return Gn(t),a=Hs(e,t,a,n,void 0,l),n=Us(),e!==null&&!rt?(Ns(e,t,l),La(e,t,l)):(Te&&n&&xs(t),t.flags|=1,vt(e,t,a,l),t.child)}function l0(e,t,a,n,l,r){return Gn(t),t.updateQueue=null,a=od(t,n,a,l),rd(e),n=Us(),e!==null&&!rt?(Ns(e,t,r),La(e,t,r)):(Te&&n&&xs(t),t.flags|=1,vt(e,t,a,r),t.child)}function i0(e,t,a,n,l){if(Gn(t),t.stateNode===null){var r=ml,o=a.contextType;typeof o=="object"&&o!==null&&(r=xt(o)),r=new a(n,r),t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=ec,t.stateNode=r,r._reactInternals=t,r=t.stateNode,r.props=n,r.state=t.memoizedState,r.refs={},js(t),o=a.contextType,r.context=typeof o=="object"&&o!==null?xt(o):ml,r.state=t.memoizedState,o=a.getDerivedStateFromProps,typeof o=="function"&&(Ps(t,a,o,n),r.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(o=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),o!==r.state&&ec.enqueueReplaceState(r,r.state,null),gi(t,n,r,l),mi(),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308),n=!0}else if(e===null){r=t.stateNode;var d=t.memoizedProps,g=Zn(a,d);r.props=g;var j=r.context,L=a.contextType;o=ml,typeof L=="object"&&L!==null&&(o=xt(L));var X=a.getDerivedStateFromProps;L=typeof X=="function"||typeof r.getSnapshotBeforeUpdate=="function",d=t.pendingProps!==d,L||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(d||j!==o)&&Qd(t,r,n,o),cn=!1;var D=t.memoizedState;r.state=D,gi(t,n,r,l),mi(),j=t.memoizedState,d||D!==j||cn?(typeof X=="function"&&(Ps(t,a,X,n),j=t.memoizedState),(g=cn||Id(t,a,g,n,D,j,o))?(L||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"&&(t.flags|=4194308)):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=j),r.props=n,r.state=j,r.context=o,n=g):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{r=t.stateNode,ks(e,t),o=t.memoizedProps,L=Zn(a,o),r.props=L,X=t.pendingProps,D=r.context,j=a.contextType,g=ml,typeof j=="object"&&j!==null&&(g=xt(j)),d=a.getDerivedStateFromProps,(j=typeof d=="function"||typeof r.getSnapshotBeforeUpdate=="function")||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(o!==X||D!==g)&&Qd(t,r,n,g),cn=!1,D=t.memoizedState,r.state=D,gi(t,n,r,l),mi();var B=t.memoizedState;o!==X||D!==B||cn||e!==null&&e.dependencies!==null&&mr(e.dependencies)?(typeof d=="function"&&(Ps(t,a,d,n),B=t.memoizedState),(L=cn||Id(t,a,L,n,D,B,g)||e!==null&&e.dependencies!==null&&mr(e.dependencies))?(j||typeof r.UNSAFE_componentWillUpdate!="function"&&typeof r.componentWillUpdate!="function"||(typeof r.componentWillUpdate=="function"&&r.componentWillUpdate(n,B,g),typeof r.UNSAFE_componentWillUpdate=="function"&&r.UNSAFE_componentWillUpdate(n,B,g)),typeof r.componentDidUpdate=="function"&&(t.flags|=4),typeof r.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof r.componentDidUpdate!="function"||o===e.memoizedProps&&D===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&D===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=B),r.props=n,r.state=B,r.context=g,n=L):(typeof r.componentDidUpdate!="function"||o===e.memoizedProps&&D===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&D===e.memoizedState||(t.flags|=1024),n=!1)}return r=n,Br(e,t),n=(t.flags&128)!==0,r||n?(r=t.stateNode,a=n&&typeof a.getDerivedStateFromError!="function"?null:r.render(),t.flags|=1,e!==null&&n?(t.child=Qn(t,e.child,null,l),t.child=Qn(t,null,a,l)):vt(e,t,a,l),t.memoizedState=r.state,e=t.child):e=La(e,t,l),e}function r0(e,t,a,n){return Nn(),t.flags|=256,vt(e,t,a,n),t.child}var lc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function ic(e){return{baseLanes:e,cachePool:$f()}}function rc(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=Yt),e}function o0(e,t,a){var n=t.pendingProps,l=!1,r=(t.flags&128)!==0,o;if((o=r)||(o=e!==null&&e.memoizedState===null?!1:(tt.current&2)!==0),o&&(l=!0,t.flags&=-129),o=(t.flags&32)!==0,t.flags&=-33,e===null){if(Te){if(l?dn(t):pn(),(e=Le)?(e=mp(e,ea),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ln!==null?{id:za,overflow:_a}:null,retryLane:536870912,hydrationErrors:null},a=Lf(e),a.return=t,t.child=a,yt=t,Le=null)):e=null,e===null)throw on(t);return Yc(e)?t.lanes=32:t.lanes=536870912,null}var d=n.children;return n=n.fallback,l?(pn(),l=t.mode,d=qr({mode:"hidden",children:d},l),n=Un(n,l,a,null),d.return=t,n.return=t,d.sibling=n,t.child=d,n=t.child,n.memoizedState=ic(a),n.childLanes=rc(e,o,a),t.memoizedState=lc,Si(null,n)):(dn(t),oc(t,d))}var g=e.memoizedState;if(g!==null&&(d=g.dehydrated,d!==null)){if(r)t.flags&256?(dn(t),t.flags&=-257,t=sc(e,t,a)):t.memoizedState!==null?(pn(),t.child=e.child,t.flags|=128,t=null):(pn(),d=n.fallback,l=t.mode,n=qr({mode:"visible",children:n.children},l),d=Un(d,l,a,null),d.flags|=2,n.return=t,d.return=t,n.sibling=d,t.child=n,Qn(t,e.child,null,a),n=t.child,n.memoizedState=ic(a),n.childLanes=rc(e,o,a),t.memoizedState=lc,t=Si(null,n));else if(dn(t),Yc(d)){if(o=d.nextSibling&&d.nextSibling.dataset,o)var j=o.dgst;o=j,n=Error(c(419)),n.stack="",n.digest=o,ci({value:n,source:null,stack:null}),t=sc(e,t,a)}else if(rt||vl(e,t,a,!1),o=(a&e.childLanes)!==0,rt||o){if(o=Ne,o!==null&&(n=Vu(o,a),n!==0&&n!==g.retryLane))throw g.retryLane=n,Hn(e,n),Bt(o,e,n),ac;Gc(d)||Ir(),t=sc(e,t,a)}else Gc(d)?(t.flags|=192,t.child=e.child,t=null):(e=g.treeContext,Le=aa(d.nextSibling),yt=t,Te=!0,rn=null,ea=!1,e!==null&&Xf(t,e),t=oc(t,n.children),t.flags|=4096);return t}return l?(pn(),d=n.fallback,l=t.mode,g=e.child,j=g.sibling,n=Ba(g,{mode:"hidden",children:n.children}),n.subtreeFlags=g.subtreeFlags&65011712,j!==null?d=Ba(j,d):(d=Un(d,l,a,null),d.flags|=2),d.return=t,n.return=t,n.sibling=d,t.child=n,Si(null,n),n=t.child,d=e.child.memoizedState,d===null?d=ic(a):(l=d.cachePool,l!==null?(g=lt._currentValue,l=l.parent!==g?{parent:g,pool:g}:l):l=$f(),d={baseLanes:d.baseLanes|a,cachePool:l}),n.memoizedState=d,n.childLanes=rc(e,o,a),t.memoizedState=lc,Si(e.child,n)):(dn(t),a=e.child,e=a.sibling,a=Ba(a,{mode:"visible",children:n.children}),a.return=t,a.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=a,t.memoizedState=null,a)}function oc(e,t){return t=qr({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function qr(e,t){return e=Ut(22,e,null,t),e.lanes=0,e}function sc(e,t,a){return Qn(t,e.child,null,a),e=oc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function s0(e,t,a){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),zs(e.return,t,a)}function cc(e,t,a,n,l,r){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:a,tailMode:l,treeForkCount:r}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=n,o.tail=a,o.tailMode=l,o.treeForkCount=r)}function c0(e,t,a){var n=t.pendingProps,l=n.revealOrder,r=n.tail;n=n.children;var o=tt.current,d=(o&2)!==0;if(d?(o=o&1|2,t.flags|=128):o&=1,E(tt,o),vt(e,t,n,a),n=Te?si:0,!d&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&s0(e,a,t);else if(e.tag===19)s0(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(l){case"forwards":for(a=t.child,l=null;a!==null;)e=a.alternate,e!==null&&zr(e)===null&&(l=a),a=a.sibling;a=l,a===null?(l=t.child,t.child=null):(l=a.sibling,a.sibling=null),cc(t,!1,l,a,r,n);break;case"backwards":case"unstable_legacy-backwards":for(a=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&zr(e)===null){t.child=l;break}e=l.sibling,l.sibling=a,a=l,l=e}cc(t,!0,a,null,r,n);break;case"together":cc(t,!1,null,null,void 0,n);break;default:t.memoizedState=null}return t.child}function La(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),gn|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(vl(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(c(153));if(t.child!==null){for(e=t.child,a=Ba(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Ba(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function uc(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&mr(e)))}function mg(e,t,a){switch(t.tag){case 3:Q(t,t.stateNode.containerInfo),sn(t,lt,e.memoizedState.cache),Nn();break;case 27:case 5:ce(t);break;case 4:Q(t,t.stateNode.containerInfo);break;case 10:sn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,qs(t),null;break;case 13:var n=t.memoizedState;if(n!==null)return n.dehydrated!==null?(dn(t),t.flags|=128,null):(a&t.child.childLanes)!==0?o0(e,t,a):(dn(t),e=La(e,t,a),e!==null?e.sibling:null);dn(t);break;case 19:var l=(e.flags&128)!==0;if(n=(a&t.childLanes)!==0,n||(vl(e,t,a,!1),n=(a&t.childLanes)!==0),l){if(n)return c0(e,t,a);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),E(tt,tt.current),n)break;return null;case 22:return t.lanes=0,t0(e,t,a,t.pendingProps);case 24:sn(t,lt,e.memoizedState.cache)}return La(e,t,a)}function u0(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)rt=!0;else{if(!uc(e,a)&&(t.flags&128)===0)return rt=!1,mg(e,t,a);rt=(e.flags&131072)!==0}else rt=!1,Te&&(t.flags&1048576)!==0&&Yf(t,si,t.index);switch(t.lanes=0,t.tag){case 16:e:{var n=t.pendingProps;if(e=Xn(t.elementType),t.type=e,typeof e=="function")ms(e)?(n=Zn(e,n),t.tag=1,t=i0(null,t,e,n,a)):(t.tag=0,t=nc(null,t,e,n,a));else{if(e!=null){var l=e.$$typeof;if(l===ae){t.tag=11,t=Fd(null,t,e,n,a);break e}else if(l===q){t.tag=14,t=Pd(null,t,e,n,a);break e}}throw t=$e(e)||e,Error(c(306,t,""))}}return t;case 0:return nc(e,t,t.type,t.pendingProps,a);case 1:return n=t.type,l=Zn(n,t.pendingProps),i0(e,t,n,l,a);case 3:e:{if(Q(t,t.stateNode.containerInfo),e===null)throw Error(c(387));n=t.pendingProps;var r=t.memoizedState;l=r.element,ks(e,t),gi(t,n,null,a);var o=t.memoizedState;if(n=o.cache,sn(t,lt,n),n!==r.cache&&_s(t,[lt],a,!0),mi(),n=o.element,r.isDehydrated)if(r={element:n,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=r,t.memoizedState=r,t.flags&256){t=r0(e,t,n,a);break e}else if(n!==l){l=Wt(Error(c(424)),t),ci(l),t=r0(e,t,n,a);break e}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Le=aa(e.firstChild),yt=t,Te=!0,rn=null,ea=!0,a=td(t,null,n,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Nn(),n===l){t=La(e,t,a);break e}vt(e,t,n,a)}t=t.child}return t;case 26:return Br(e,t),e===null?(a=Sp(t.type,null,t.pendingProps,null))?t.memoizedState=a:Te||(a=t.type,e=t.pendingProps,n=Wr(I.current).createElement(a),n[gt]=t,n[Tt]=e,bt(n,a,e),ht(n),t.stateNode=n):t.memoizedState=Sp(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ce(t),e===null&&Te&&(n=t.stateNode=xp(t.type,t.pendingProps,I.current),yt=t,ea=!0,l=Le,Sn(t.type)?(Xc=l,Le=aa(n.firstChild)):Le=l),vt(e,t,t.pendingProps.children,a),Br(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Te&&((l=n=Le)&&(n=Qg(n,t.type,t.pendingProps,ea),n!==null?(t.stateNode=n,yt=t,Le=aa(n.firstChild),ea=!1,l=!0):l=!1),l||on(t)),ce(t),l=t.type,r=t.pendingProps,o=e!==null?e.memoizedProps:null,n=r.children,Uc(l,r)?n=null:o!==null&&Uc(l,o)&&(t.flags|=32),t.memoizedState!==null&&(l=Hs(e,t,rg,null,null,a),Ri._currentValue=l),Br(e,t),vt(e,t,n,a),t.child;case 6:return e===null&&Te&&((e=a=Le)&&(a=Vg(a,t.pendingProps,ea),a!==null?(t.stateNode=a,yt=t,Le=null,e=!0):e=!1),e||on(t)),null;case 13:return o0(e,t,a);case 4:return Q(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=Qn(t,null,n,a):vt(e,t,n,a),t.child;case 11:return Fd(e,t,t.type,t.pendingProps,a);case 7:return vt(e,t,t.pendingProps,a),t.child;case 8:return vt(e,t,t.pendingProps.children,a),t.child;case 12:return vt(e,t,t.pendingProps.children,a),t.child;case 10:return n=t.pendingProps,sn(t,t.type,n.value),vt(e,t,n.children,a),t.child;case 9:return l=t.type._context,n=t.pendingProps.children,Gn(t),l=xt(l),n=n(l),t.flags|=1,vt(e,t,n,a),t.child;case 14:return Pd(e,t,t.type,t.pendingProps,a);case 15:return e0(e,t,t.type,t.pendingProps,a);case 19:return c0(e,t,a);case 31:return hg(e,t,a);case 22:return t0(e,t,a,t.pendingProps);case 24:return Gn(t),n=xt(lt),e===null?(l=Es(),l===null&&(l=Ne,r=Ms(),l.pooledCache=r,r.refCount++,r!==null&&(l.pooledCacheLanes|=a),l=r),t.memoizedState={parent:n,cache:l},js(t),sn(t,lt,l)):((e.lanes&a)!==0&&(ks(e,t),gi(t,null,null,a),mi()),l=e.memoizedState,r=t.memoizedState,l.parent!==n?(l={parent:n,cache:n},t.memoizedState=l,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=l),sn(t,lt,n)):(n=r.cache,sn(t,lt,n),n!==l.cache&&_s(t,[lt],a,!0))),vt(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(c(156,t.tag))}function Ga(e){e.flags|=4}function fc(e,t,a,n,l){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(l&335544128)===l)if(e.stateNode.complete)e.flags|=8192;else if(H0())e.flags|=8192;else throw In=vr,Ts}else e.flags&=-16777217}function f0(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Ap(t))if(H0())e.flags|=8192;else throw In=vr,Ts}function Rr(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?ka():536870912,e.lanes|=t,Cl|=t)}function wi(e,t){if(!Te)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var n=null;a!==null;)a.alternate!==null&&(n=a),a=a.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function Ge(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,n=0;if(t)for(var l=e.child;l!==null;)a|=l.lanes|l.childLanes,n|=l.subtreeFlags&65011712,n|=l.flags&65011712,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)a|=l.lanes|l.childLanes,n|=l.subtreeFlags,n|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=n,e.childLanes=a,t}function gg(e,t,a){var n=t.pendingProps;switch(vs(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ge(t),null;case 1:return Ge(t),null;case 3:return a=t.stateNode,n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Ha(lt),$(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(xl(t)?Ga(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Ss())),Ge(t),null;case 26:var l=t.type,r=t.memoizedState;return e===null?(Ga(t),r!==null?(Ge(t),f0(t,r)):(Ge(t),fc(t,l,null,n,a))):r?r!==e.memoizedState?(Ga(t),Ge(t),f0(t,r)):(Ge(t),t.flags&=-16777217):(e=e.memoizedProps,e!==n&&Ga(t),Ge(t),fc(t,l,e,n,a)),null;case 27:if(ge(t),a=I.current,l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&Ga(t);else{if(!n){if(t.stateNode===null)throw Error(c(166));return Ge(t),null}e=O.current,xl(t)?If(t):(e=xp(l,n,a),t.stateNode=e,Ga(t))}return Ge(t),null;case 5:if(ge(t),l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&Ga(t);else{if(!n){if(t.stateNode===null)throw Error(c(166));return Ge(t),null}if(r=O.current,xl(t))If(t);else{var o=Wr(I.current);switch(r){case 1:r=o.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:r=o.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":r=o.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":r=o.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":r=o.createElement("div"),r.innerHTML="<script><\/script>",r=r.removeChild(r.firstChild);break;case"select":r=typeof n.is=="string"?o.createElement("select",{is:n.is}):o.createElement("select"),n.multiple?r.multiple=!0:n.size&&(r.size=n.size);break;default:r=typeof n.is=="string"?o.createElement(l,{is:n.is}):o.createElement(l)}}r[gt]=t,r[Tt]=n;e:for(o=t.child;o!==null;){if(o.tag===5||o.tag===6)r.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break e;for(;o.sibling===null;){if(o.return===null||o.return===t)break e;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=r;e:switch(bt(r,l,n),l){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}n&&Ga(t)}}return Ge(t),fc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,a),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==n&&Ga(t);else{if(typeof n!="string"&&t.stateNode===null)throw Error(c(166));if(e=I.current,xl(t)){if(e=t.stateNode,a=t.memoizedProps,n=null,l=yt,l!==null)switch(l.tag){case 27:case 5:n=l.memoizedProps}e[gt]=t,e=!!(e.nodeValue===a||n!==null&&n.suppressHydrationWarning===!0||op(e.nodeValue,a)),e||on(t,!0)}else e=Wr(e).createTextNode(n),e[gt]=t,t.stateNode=e}return Ge(t),null;case 31:if(a=t.memoizedState,e===null||e.memoizedState!==null){if(n=xl(t),a!==null){if(e===null){if(!n)throw Error(c(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(557));e[gt]=t}else Nn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ge(t),e=!1}else a=Ss(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return t.flags&256?(Lt(t),t):(Lt(t),null);if((t.flags&128)!==0)throw Error(c(558))}return Ge(t),null;case 13:if(n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(l=xl(t),n!==null&&n.dehydrated!==null){if(e===null){if(!l)throw Error(c(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(c(317));l[gt]=t}else Nn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ge(t),l=!1}else l=Ss(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),l=!0;if(!l)return t.flags&256?(Lt(t),t):(Lt(t),null)}return Lt(t),(t.flags&128)!==0?(t.lanes=a,t):(a=n!==null,e=e!==null&&e.memoizedState!==null,a&&(n=t.child,l=null,n.alternate!==null&&n.alternate.memoizedState!==null&&n.alternate.memoizedState.cachePool!==null&&(l=n.alternate.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==l&&(n.flags|=2048)),a!==e&&a&&(t.child.flags|=8192),Rr(t,t.updateQueue),Ge(t),null);case 4:return $(),e===null&&Oc(t.stateNode.containerInfo),Ge(t),null;case 10:return Ha(t.type),Ge(t),null;case 19:if(b(tt),n=t.memoizedState,n===null)return Ge(t),null;if(l=(t.flags&128)!==0,r=n.rendering,r===null)if(l)wi(n,!1);else{if(Fe!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(r=zr(e),r!==null){for(t.flags|=128,wi(n,!1),e=r.updateQueue,t.updateQueue=e,Rr(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)Nf(a,e),a=a.sibling;return E(tt,tt.current&1|2),Te&&qa(t,n.treeForkCount),t.child}e=e.sibling}n.tail!==null&&se()>Gr&&(t.flags|=128,l=!0,wi(n,!1),t.lanes=4194304)}else{if(!l)if(e=zr(r),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,Rr(t,e),wi(n,!0),n.tail===null&&n.tailMode==="hidden"&&!r.alternate&&!Te)return Ge(t),null}else 2*se()-n.renderingStartTime>Gr&&a!==536870912&&(t.flags|=128,l=!0,wi(n,!1),t.lanes=4194304);n.isBackwards?(r.sibling=t.child,t.child=r):(e=n.last,e!==null?e.sibling=r:t.child=r,n.last=r)}return n.tail!==null?(e=n.tail,n.rendering=e,n.tail=e.sibling,n.renderingStartTime=se(),e.sibling=null,a=tt.current,E(tt,l?a&1|2:a&1),Te&&qa(t,n.treeForkCount),e):(Ge(t),null);case 22:case 23:return Lt(t),Bs(),n=t.memoizedState!==null,e!==null?e.memoizedState!==null!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?(a&536870912)!==0&&(t.flags&128)===0&&(Ge(t),t.subtreeFlags&6&&(t.flags|=8192)):Ge(t),a=t.updateQueue,a!==null&&Rr(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),n=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),n!==a&&(t.flags|=2048),e!==null&&b(Yn),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Ha(lt),Ge(t),null;case 25:return null;case 30:return null}throw Error(c(156,t.tag))}function yg(e,t){switch(vs(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ha(lt),$(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ge(t),null;case 31:if(t.memoizedState!==null){if(Lt(t),t.alternate===null)throw Error(c(340));Nn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Lt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(c(340));Nn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return b(tt),null;case 4:return $(),null;case 10:return Ha(t.type),null;case 22:case 23:return Lt(t),Bs(),e!==null&&b(Yn),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ha(lt),null;case 25:return null;default:return null}}function d0(e,t){switch(vs(t),t.tag){case 3:Ha(lt),$();break;case 26:case 27:case 5:ge(t);break;case 4:$();break;case 31:t.memoizedState!==null&&Lt(t);break;case 13:Lt(t);break;case 19:b(tt);break;case 10:Ha(t.type);break;case 22:case 23:Lt(t),Bs(),e!==null&&b(Yn);break;case 24:Ha(lt)}}function zi(e,t){try{var a=t.updateQueue,n=a!==null?a.lastEffect:null;if(n!==null){var l=n.next;a=l;do{if((a.tag&e)===e){n=void 0;var r=a.create,o=a.inst;n=r(),o.destroy=n}a=a.next}while(a!==l)}}catch(d){qe(t,t.return,d)}}function hn(e,t,a){try{var n=t.updateQueue,l=n!==null?n.lastEffect:null;if(l!==null){var r=l.next;n=r;do{if((n.tag&e)===e){var o=n.inst,d=o.destroy;if(d!==void 0){o.destroy=void 0,l=t;var g=a,j=d;try{j()}catch(L){qe(l,g,L)}}}n=n.next}while(n!==r)}}catch(L){qe(t,t.return,L)}}function p0(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{nd(t,a)}catch(n){qe(e,e.return,n)}}}function h0(e,t,a){a.props=Zn(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(n){qe(e,t,n)}}function _i(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;case 30:n=e.stateNode;break;default:n=e.stateNode}typeof a=="function"?e.refCleanup=a(n):a.current=n}}catch(l){qe(e,t,l)}}function Ma(e,t){var a=e.ref,n=e.refCleanup;if(a!==null)if(typeof n=="function")try{n()}catch(l){qe(e,t,l)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(l){qe(e,t,l)}else a.current=null}function m0(e){var t=e.type,a=e.memoizedProps,n=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break e;case"img":a.src?n.src=a.src:a.srcSet&&(n.srcset=a.srcSet)}}catch(l){qe(e,e.return,l)}}function dc(e,t,a){try{var n=e.stateNode;Ng(n,e.type,a,t),n[Tt]=t}catch(l){qe(e,e.return,l)}}function g0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sn(e.type)||e.tag===4}function pc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||g0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sn(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function hc(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Da));else if(n!==4&&(n===27&&Sn(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(hc(e,t,a),e=e.sibling;e!==null;)hc(e,t,a),e=e.sibling}function Hr(e,t,a){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(n!==4&&(n===27&&Sn(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Hr(e,t,a),e=e.sibling;e!==null;)Hr(e,t,a),e=e.sibling}function y0(e){var t=e.stateNode,a=e.memoizedProps;try{for(var n=e.type,l=t.attributes;l.length;)t.removeAttributeNode(l[0]);bt(t,n,a),t[gt]=e,t[Tt]=a}catch(r){qe(e,e.return,r)}}var Ya=!1,ot=!1,mc=!1,x0=typeof WeakSet=="function"?WeakSet:Set,mt=null;function xg(e,t){if(e=e.containerInfo,Rc=lo,e=kf(e),ss(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var n=a.getSelection&&a.getSelection();if(n&&n.rangeCount!==0){a=n.anchorNode;var l=n.anchorOffset,r=n.focusNode;n=n.focusOffset;try{a.nodeType,r.nodeType}catch{a=null;break e}var o=0,d=-1,g=-1,j=0,L=0,X=e,D=null;t:for(;;){for(var B;X!==a||l!==0&&X.nodeType!==3||(d=o+l),X!==r||n!==0&&X.nodeType!==3||(g=o+n),X.nodeType===3&&(o+=X.nodeValue.length),(B=X.firstChild)!==null;)D=X,X=B;for(;;){if(X===e)break t;if(D===a&&++j===l&&(d=o),D===r&&++L===n&&(g=o),(B=X.nextSibling)!==null)break;X=D,D=X.parentNode}X=B}a=d===-1||g===-1?null:{start:d,end:g}}else a=null}a=a||{start:0,end:0}}else a=null;for(Hc={focusedElem:e,selectionRange:a},lo=!1,mt=t;mt!==null;)if(t=mt,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,mt=e;else for(;mt!==null;){switch(t=mt,r=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)l=e[a],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&r!==null){e=void 0,a=t,l=r.memoizedProps,r=r.memoizedState,n=a.stateNode;try{var ne=Zn(a.type,l);e=n.getSnapshotBeforeUpdate(ne,r),n.__reactInternalSnapshotBeforeUpdate=e}catch(pe){qe(a,a.return,pe)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)Lc(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Lc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(c(163))}if(e=t.sibling,e!==null){e.return=t.return,mt=e;break}mt=t.return}}function v0(e,t,a){var n=a.flags;switch(a.tag){case 0:case 11:case 15:Ia(e,a),n&4&&zi(5,a);break;case 1:if(Ia(e,a),n&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(o){qe(a,a.return,o)}else{var l=Zn(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(l,t,e.__reactInternalSnapshotBeforeUpdate)}catch(o){qe(a,a.return,o)}}n&64&&p0(a),n&512&&_i(a,a.return);break;case 3:if(Ia(e,a),n&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{nd(e,t)}catch(o){qe(a,a.return,o)}}break;case 27:t===null&&n&4&&y0(a);case 26:case 5:Ia(e,a),t===null&&n&4&&m0(a),n&512&&_i(a,a.return);break;case 12:Ia(e,a);break;case 31:Ia(e,a),n&4&&w0(e,a);break;case 13:Ia(e,a),n&4&&z0(e,a),n&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Eg.bind(null,a),Zg(e,a))));break;case 22:if(n=a.memoizedState!==null||Ya,!n){t=t!==null&&t.memoizedState!==null||ot,l=Ya;var r=ot;Ya=n,(ot=t)&&!r?Qa(e,a,(a.subtreeFlags&8772)!==0):Ia(e,a),Ya=l,ot=r}break;case 30:break;default:Ia(e,a)}}function b0(e){var t=e.alternate;t!==null&&(e.alternate=null,b0(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Qo(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Qe=null,kt=!1;function Xa(e,t,a){for(a=a.child;a!==null;)S0(e,t,a),a=a.sibling}function S0(e,t,a){if(Ie&&typeof Ie.onCommitFiberUnmount=="function")try{Ie.onCommitFiberUnmount(St,a)}catch{}switch(a.tag){case 26:ot||Ma(a,t),Xa(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:ot||Ma(a,t);var n=Qe,l=kt;Sn(a.type)&&(Qe=a.stateNode,kt=!1),Xa(e,t,a),Oi(a.stateNode),Qe=n,kt=l;break;case 5:ot||Ma(a,t);case 6:if(n=Qe,l=kt,Qe=null,Xa(e,t,a),Qe=n,kt=l,Qe!==null)if(kt)try{(Qe.nodeType===9?Qe.body:Qe.nodeName==="HTML"?Qe.ownerDocument.body:Qe).removeChild(a.stateNode)}catch(r){qe(a,t,r)}else try{Qe.removeChild(a.stateNode)}catch(r){qe(a,t,r)}break;case 18:Qe!==null&&(kt?(e=Qe,pp(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Nl(e)):pp(Qe,a.stateNode));break;case 4:n=Qe,l=kt,Qe=a.stateNode.containerInfo,kt=!0,Xa(e,t,a),Qe=n,kt=l;break;case 0:case 11:case 14:case 15:hn(2,a,t),ot||hn(4,a,t),Xa(e,t,a);break;case 1:ot||(Ma(a,t),n=a.stateNode,typeof n.componentWillUnmount=="function"&&h0(a,t,n)),Xa(e,t,a);break;case 21:Xa(e,t,a);break;case 22:ot=(n=ot)||a.memoizedState!==null,Xa(e,t,a),ot=n;break;default:Xa(e,t,a)}}function w0(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Nl(e)}catch(a){qe(t,t.return,a)}}}function z0(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Nl(e)}catch(a){qe(t,t.return,a)}}function vg(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new x0),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new x0),t;default:throw Error(c(435,e.tag))}}function Ur(e,t){var a=vg(e);t.forEach(function(n){if(!a.has(n)){a.add(n);var l=Tg.bind(null,e,n);n.then(l,l)}})}function Ct(e,t){var a=t.deletions;if(a!==null)for(var n=0;n<a.length;n++){var l=a[n],r=e,o=t,d=o;e:for(;d!==null;){switch(d.tag){case 27:if(Sn(d.type)){Qe=d.stateNode,kt=!1;break e}break;case 5:Qe=d.stateNode,kt=!1;break e;case 3:case 4:Qe=d.stateNode.containerInfo,kt=!0;break e}d=d.return}if(Qe===null)throw Error(c(160));S0(r,o,l),Qe=null,kt=!1,r=l.alternate,r!==null&&(r.return=null),l.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)_0(t,e),t=t.sibling}var fa=null;function _0(e,t){var a=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Ct(t,e),Dt(e),n&4&&(hn(3,e,e.return),zi(3,e),hn(5,e,e.return));break;case 1:Ct(t,e),Dt(e),n&512&&(ot||a===null||Ma(a,a.return)),n&64&&Ya&&(e=e.updateQueue,e!==null&&(n=e.callbacks,n!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:var l=fa;if(Ct(t,e),Dt(e),n&512&&(ot||a===null||Ma(a,a.return)),n&4){var r=a!==null?a.memoizedState:null;if(n=e.memoizedState,a===null)if(n===null)if(e.stateNode===null){e:{n=e.type,a=e.memoizedProps,l=l.ownerDocument||l;t:switch(n){case"title":r=l.getElementsByTagName("title")[0],(!r||r[Wl]||r[gt]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=l.createElement(n),l.head.insertBefore(r,l.querySelector("head > title"))),bt(r,n,a),r[gt]=e,ht(r),n=r;break e;case"link":var o=_p("link","href",l).get(n+(a.href||""));if(o){for(var d=0;d<o.length;d++)if(r=o[d],r.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&r.getAttribute("rel")===(a.rel==null?null:a.rel)&&r.getAttribute("title")===(a.title==null?null:a.title)&&r.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){o.splice(d,1);break t}}r=l.createElement(n),bt(r,n,a),l.head.appendChild(r);break;case"meta":if(o=_p("meta","content",l).get(n+(a.content||""))){for(d=0;d<o.length;d++)if(r=o[d],r.getAttribute("content")===(a.content==null?null:""+a.content)&&r.getAttribute("name")===(a.name==null?null:a.name)&&r.getAttribute("property")===(a.property==null?null:a.property)&&r.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&r.getAttribute("charset")===(a.charSet==null?null:a.charSet)){o.splice(d,1);break t}}r=l.createElement(n),bt(r,n,a),l.head.appendChild(r);break;default:throw Error(c(468,n))}r[gt]=e,ht(r),n=r}e.stateNode=n}else Mp(l,e.type,e.stateNode);else e.stateNode=zp(l,n,e.memoizedProps);else r!==n?(r===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):r.count--,n===null?Mp(l,e.type,e.stateNode):zp(l,n,e.memoizedProps)):n===null&&e.stateNode!==null&&dc(e,e.memoizedProps,a.memoizedProps)}break;case 27:Ct(t,e),Dt(e),n&512&&(ot||a===null||Ma(a,a.return)),a!==null&&n&4&&dc(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Ct(t,e),Dt(e),n&512&&(ot||a===null||Ma(a,a.return)),e.flags&32){l=e.stateNode;try{sl(l,"")}catch(ne){qe(e,e.return,ne)}}n&4&&e.stateNode!=null&&(l=e.memoizedProps,dc(e,l,a!==null?a.memoizedProps:l)),n&1024&&(mc=!0);break;case 6:if(Ct(t,e),Dt(e),n&4){if(e.stateNode===null)throw Error(c(162));n=e.memoizedProps,a=e.stateNode;try{a.nodeValue=n}catch(ne){qe(e,e.return,ne)}}break;case 3:if(eo=null,l=fa,fa=Fr(t.containerInfo),Ct(t,e),fa=l,Dt(e),n&4&&a!==null&&a.memoizedState.isDehydrated)try{Nl(t.containerInfo)}catch(ne){qe(e,e.return,ne)}mc&&(mc=!1,M0(e));break;case 4:n=fa,fa=Fr(e.stateNode.containerInfo),Ct(t,e),Dt(e),fa=n;break;case 12:Ct(t,e),Dt(e);break;case 31:Ct(t,e),Dt(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,Ur(e,n)));break;case 13:Ct(t,e),Dt(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Lr=se()),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,Ur(e,n)));break;case 22:l=e.memoizedState!==null;var g=a!==null&&a.memoizedState!==null,j=Ya,L=ot;if(Ya=j||l,ot=L||g,Ct(t,e),ot=L,Ya=j,Dt(e),n&8192)e:for(t=e.stateNode,t._visibility=l?t._visibility&-2:t._visibility|1,l&&(a===null||g||Ya||ot||Kn(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){g=a=t;try{if(r=g.stateNode,l)o=r.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none";else{d=g.stateNode;var X=g.memoizedProps.style,D=X!=null&&X.hasOwnProperty("display")?X.display:null;d.style.display=D==null||typeof D=="boolean"?"":(""+D).trim()}}catch(ne){qe(g,g.return,ne)}}}else if(t.tag===6){if(a===null){g=t;try{g.stateNode.nodeValue=l?"":g.memoizedProps}catch(ne){qe(g,g.return,ne)}}}else if(t.tag===18){if(a===null){g=t;try{var B=g.stateNode;l?hp(B,!0):hp(g.stateNode,!1)}catch(ne){qe(g,g.return,ne)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}n&4&&(n=e.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,Ur(e,a))));break;case 19:Ct(t,e),Dt(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,Ur(e,n)));break;case 30:break;case 21:break;default:Ct(t,e),Dt(e)}}function Dt(e){var t=e.flags;if(t&2){try{for(var a,n=e.return;n!==null;){if(g0(n)){a=n;break}n=n.return}if(a==null)throw Error(c(160));switch(a.tag){case 27:var l=a.stateNode,r=pc(e);Hr(e,r,l);break;case 5:var o=a.stateNode;a.flags&32&&(sl(o,""),a.flags&=-33);var d=pc(e);Hr(e,d,o);break;case 3:case 4:var g=a.stateNode.containerInfo,j=pc(e);hc(e,j,g);break;default:throw Error(c(161))}}catch(L){qe(e,e.return,L)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function M0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;M0(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Ia(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)v0(e,t.alternate,t),t=t.sibling}function Kn(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:hn(4,t,t.return),Kn(t);break;case 1:Ma(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&h0(t,t.return,a),Kn(t);break;case 27:Oi(t.stateNode);case 26:case 5:Ma(t,t.return),Kn(t);break;case 22:t.memoizedState===null&&Kn(t);break;case 30:Kn(t);break;default:Kn(t)}e=e.sibling}}function Qa(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var n=t.alternate,l=e,r=t,o=r.flags;switch(r.tag){case 0:case 11:case 15:Qa(l,r,a),zi(4,r);break;case 1:if(Qa(l,r,a),n=r,l=n.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(j){qe(n,n.return,j)}if(n=r,l=n.updateQueue,l!==null){var d=n.stateNode;try{var g=l.shared.hiddenCallbacks;if(g!==null)for(l.shared.hiddenCallbacks=null,l=0;l<g.length;l++)ad(g[l],d)}catch(j){qe(n,n.return,j)}}a&&o&64&&p0(r),_i(r,r.return);break;case 27:y0(r);case 26:case 5:Qa(l,r,a),a&&n===null&&o&4&&m0(r),_i(r,r.return);break;case 12:Qa(l,r,a);break;case 31:Qa(l,r,a),a&&o&4&&w0(l,r);break;case 13:Qa(l,r,a),a&&o&4&&z0(l,r);break;case 22:r.memoizedState===null&&Qa(l,r,a),_i(r,r.return);break;case 30:break;default:Qa(l,r,a)}t=t.sibling}}function gc(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&ui(a))}function yc(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ui(e))}function da(e,t,a,n){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)A0(e,t,a,n),t=t.sibling}function A0(e,t,a,n){var l=t.flags;switch(t.tag){case 0:case 11:case 15:da(e,t,a,n),l&2048&&zi(9,t);break;case 1:da(e,t,a,n);break;case 3:da(e,t,a,n),l&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ui(e)));break;case 12:if(l&2048){da(e,t,a,n),e=t.stateNode;try{var r=t.memoizedProps,o=r.id,d=r.onPostCommit;typeof d=="function"&&d(o,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(g){qe(t,t.return,g)}}else da(e,t,a,n);break;case 31:da(e,t,a,n);break;case 13:da(e,t,a,n);break;case 23:break;case 22:r=t.stateNode,o=t.alternate,t.memoizedState!==null?r._visibility&2?da(e,t,a,n):Mi(e,t):r._visibility&2?da(e,t,a,n):(r._visibility|=2,Tl(e,t,a,n,(t.subtreeFlags&10256)!==0||!1)),l&2048&&gc(o,t);break;case 24:da(e,t,a,n),l&2048&&yc(t.alternate,t);break;default:da(e,t,a,n)}}function Tl(e,t,a,n,l){for(l=l&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var r=e,o=t,d=a,g=n,j=o.flags;switch(o.tag){case 0:case 11:case 15:Tl(r,o,d,g,l),zi(8,o);break;case 23:break;case 22:var L=o.stateNode;o.memoizedState!==null?L._visibility&2?Tl(r,o,d,g,l):Mi(r,o):(L._visibility|=2,Tl(r,o,d,g,l)),l&&j&2048&&gc(o.alternate,o);break;case 24:Tl(r,o,d,g,l),l&&j&2048&&yc(o.alternate,o);break;default:Tl(r,o,d,g,l)}t=t.sibling}}function Mi(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,n=t,l=n.flags;switch(n.tag){case 22:Mi(a,n),l&2048&&gc(n.alternate,n);break;case 24:Mi(a,n),l&2048&&yc(n.alternate,n);break;default:Mi(a,n)}t=t.sibling}}var Ai=8192;function jl(e,t,a){if(e.subtreeFlags&Ai)for(e=e.child;e!==null;)E0(e,t,a),e=e.sibling}function E0(e,t,a){switch(e.tag){case 26:jl(e,t,a),e.flags&Ai&&e.memoizedState!==null&&iy(a,fa,e.memoizedState,e.memoizedProps);break;case 5:jl(e,t,a);break;case 3:case 4:var n=fa;fa=Fr(e.stateNode.containerInfo),jl(e,t,a),fa=n;break;case 22:e.memoizedState===null&&(n=e.alternate,n!==null&&n.memoizedState!==null?(n=Ai,Ai=16777216,jl(e,t,a),Ai=n):jl(e,t,a));break;default:jl(e,t,a)}}function T0(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ei(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];mt=n,k0(n,e)}T0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)j0(e),e=e.sibling}function j0(e){switch(e.tag){case 0:case 11:case 15:Ei(e),e.flags&2048&&hn(9,e,e.return);break;case 3:Ei(e);break;case 12:Ei(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Nr(e)):Ei(e);break;default:Ei(e)}}function Nr(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var n=t[a];mt=n,k0(n,e)}T0(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:hn(8,t,t.return),Nr(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,Nr(t));break;default:Nr(t)}e=e.sibling}}function k0(e,t){for(;mt!==null;){var a=mt;switch(a.tag){case 0:case 11:case 15:hn(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var n=a.memoizedState.cachePool.pool;n!=null&&n.refCount++}break;case 24:ui(a.memoizedState.cache)}if(n=a.child,n!==null)n.return=a,mt=n;else e:for(a=e;mt!==null;){n=mt;var l=n.sibling,r=n.return;if(b0(n),n===a){mt=null;break e}if(l!==null){l.return=r,mt=l;break e}mt=r}}}var bg={getCacheForType:function(e){var t=xt(lt),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a},cacheSignal:function(){return xt(lt).controller.signal}},Sg=typeof WeakMap=="function"?WeakMap:Map,De=0,Ne=null,ze=null,Me=0,Be=0,Gt=null,mn=!1,kl=!1,xc=!1,Va=0,Fe=0,gn=0,$n=0,vc=0,Yt=0,Cl=0,Ti=null,Ot=null,bc=!1,Lr=0,C0=0,Gr=1/0,Yr=null,yn=null,ut=0,xn=null,Dl=null,Za=0,Sc=0,wc=null,D0=null,ji=0,zc=null;function Xt(){return(De&2)!==0&&Me!==0?Me&-Me:R.T!==null?jc():Zu()}function O0(){if(Yt===0)if((Me&536870912)===0||Te){var e=Sa;Sa<<=1,(Sa&3932160)===0&&(Sa=262144),Yt=e}else Yt=536870912;return e=Nt.current,e!==null&&(e.flags|=32),Yt}function Bt(e,t,a){(e===Ne&&(Be===2||Be===9)||e.cancelPendingCommit!==null)&&(Ol(e,0),vn(e,Me,Yt,!1)),Zt(e,a),((De&2)===0||e!==Ne)&&(e===Ne&&((De&2)===0&&($n|=a),Fe===4&&vn(e,Me,Yt,!1)),Aa(e))}function B0(e,t,a){if((De&6)!==0)throw Error(c(327));var n=!a&&(t&127)===0&&(t&e.expiredLanes)===0||wt(e,t),l=n?_g(e,t):Mc(e,t,!0),r=n;do{if(l===0){kl&&!n&&vn(e,t,0,!1);break}else{if(a=e.current.alternate,r&&!wg(a)){l=Mc(e,t,!1),r=!1;continue}if(l===2){if(r=t,e.errorRecoveryDisabledLanes&r)var o=0;else o=e.pendingLanes&-536870913,o=o!==0?o:o&536870912?536870912:0;if(o!==0){t=o;e:{var d=e;l=Ti;var g=d.current.memoizedState.isDehydrated;if(g&&(Ol(d,o).flags|=256),o=Mc(d,o,!1),o!==2){if(xc&&!g){d.errorRecoveryDisabledLanes|=r,$n|=r,l=4;break e}r=Ot,Ot=l,r!==null&&(Ot===null?Ot=r:Ot.push.apply(Ot,r))}l=o}if(r=!1,l!==2)continue}}if(l===1){Ol(e,0),vn(e,t,0,!0);break}e:{switch(n=e,r=l,r){case 0:case 1:throw Error(c(345));case 4:if((t&4194048)!==t)break;case 6:vn(n,t,Yt,!mn);break e;case 2:Ot=null;break;case 3:case 5:break;default:throw Error(c(329))}if((t&62914560)===t&&(l=Lr+300-se(),10<l)){if(vn(n,t,Yt,!mn),sa(n,0,!0)!==0)break e;Za=t,n.timeoutHandle=fp(q0.bind(null,n,a,Ot,Yr,bc,t,Yt,$n,Cl,mn,r,"Throttled",-0,0),l);break e}q0(n,a,Ot,Yr,bc,t,Yt,$n,Cl,mn,r,null,-0,0)}}break}while(!0);Aa(e)}function q0(e,t,a,n,l,r,o,d,g,j,L,X,D,B){if(e.timeoutHandle=-1,X=t.subtreeFlags,X&8192||(X&16785408)===16785408){X={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Da},E0(t,r,X);var ne=(r&62914560)===r?Lr-se():(r&4194048)===r?C0-se():0;if(ne=ry(X,ne),ne!==null){Za=r,e.cancelPendingCommit=ne(X0.bind(null,e,t,r,a,n,l,o,d,g,L,X,null,D,B)),vn(e,r,o,!j);return}}X0(e,t,r,a,n,l,o,d,g)}function wg(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var n=0;n<a.length;n++){var l=a[n],r=l.getSnapshot;l=l.value;try{if(!Ht(r(),l))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function vn(e,t,a,n){t&=~vc,t&=~$n,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var l=t;0<l;){var r=31-Ze(l),o=1<<r;n[r]=-1,l&=~o}a!==0&&Go(e,a,t)}function Xr(){return(De&6)===0?(ki(0),!1):!0}function _c(){if(ze!==null){if(Be===0)var e=ze.return;else e=ze,Ra=Ln=null,Ls(e),zl=null,di=0,e=ze;for(;e!==null;)d0(e.alternate,e),e=e.return;ze=null}}function Ol(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,Yg(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Za=0,_c(),Ne=e,ze=a=Ba(e.current,null),Me=t,Be=0,Gt=null,mn=!1,kl=wt(e,t),xc=!1,Cl=Yt=vc=$n=gn=Fe=0,Ot=Ti=null,bc=!1,(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var l=31-Ze(n),r=1<<l;t|=e[l],n&=~r}return Va=t,ur(),a}function R0(e,t){ve=null,R.H=bi,t===wl||t===xr?(t=Ff(),Be=3):t===Ts?(t=Ff(),Be=4):Be=t===ac?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Gt=t,ze===null&&(Fe=1,Dr(e,Wt(t,e.current)))}function H0(){var e=Nt.current;return e===null?!0:(Me&4194048)===Me?ta===null:(Me&62914560)===Me||(Me&536870912)!==0?e===ta:!1}function U0(){var e=R.H;return R.H=bi,e===null?bi:e}function N0(){var e=R.A;return R.A=bg,e}function Ir(){Fe=4,mn||(Me&4194048)!==Me&&Nt.current!==null||(kl=!0),(gn&134217727)===0&&($n&134217727)===0||Ne===null||vn(Ne,Me,Yt,!1)}function Mc(e,t,a){var n=De;De|=2;var l=U0(),r=N0();(Ne!==e||Me!==t)&&(Yr=null,Ol(e,t)),t=!1;var o=Fe;e:do try{if(Be!==0&&ze!==null){var d=ze,g=Gt;switch(Be){case 8:_c(),o=6;break e;case 3:case 2:case 9:case 6:Nt.current===null&&(t=!0);var j=Be;if(Be=0,Gt=null,Bl(e,d,g,j),a&&kl){o=0;break e}break;default:j=Be,Be=0,Gt=null,Bl(e,d,g,j)}}zg(),o=Fe;break}catch(L){R0(e,L)}while(!0);return t&&e.shellSuspendCounter++,Ra=Ln=null,De=n,R.H=l,R.A=r,ze===null&&(Ne=null,Me=0,ur()),o}function zg(){for(;ze!==null;)L0(ze)}function _g(e,t){var a=De;De|=2;var n=U0(),l=N0();Ne!==e||Me!==t?(Yr=null,Gr=se()+500,Ol(e,t)):kl=wt(e,t);e:do try{if(Be!==0&&ze!==null){t=ze;var r=Gt;t:switch(Be){case 1:Be=0,Gt=null,Bl(e,t,r,1);break;case 2:case 9:if(Jf(r)){Be=0,Gt=null,G0(t);break}t=function(){Be!==2&&Be!==9||Ne!==e||(Be=7),Aa(e)},r.then(t,t);break e;case 3:Be=7;break e;case 4:Be=5;break e;case 7:Jf(r)?(Be=0,Gt=null,G0(t)):(Be=0,Gt=null,Bl(e,t,r,7));break;case 5:var o=null;switch(ze.tag){case 26:o=ze.memoizedState;case 5:case 27:var d=ze;if(o?Ap(o):d.stateNode.complete){Be=0,Gt=null;var g=d.sibling;if(g!==null)ze=g;else{var j=d.return;j!==null?(ze=j,Qr(j)):ze=null}break t}}Be=0,Gt=null,Bl(e,t,r,5);break;case 6:Be=0,Gt=null,Bl(e,t,r,6);break;case 8:_c(),Fe=6;break e;default:throw Error(c(462))}}Mg();break}catch(L){R0(e,L)}while(!0);return Ra=Ln=null,R.H=n,R.A=l,De=a,ze!==null?0:(Ne=null,Me=0,ur(),Fe)}function Mg(){for(;ze!==null&&!en();)L0(ze)}function L0(e){var t=u0(e.alternate,e,Va);e.memoizedProps=e.pendingProps,t===null?Qr(e):ze=t}function G0(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=l0(a,t,t.pendingProps,t.type,void 0,Me);break;case 11:t=l0(a,t,t.pendingProps,t.type.render,t.ref,Me);break;case 5:Ls(t);default:d0(a,t),t=ze=Nf(t,Va),t=u0(a,t,Va)}e.memoizedProps=e.pendingProps,t===null?Qr(e):ze=t}function Bl(e,t,a,n){Ra=Ln=null,Ls(t),zl=null,di=0;var l=t.return;try{if(pg(e,l,t,a,Me)){Fe=1,Dr(e,Wt(a,e.current)),ze=null;return}}catch(r){if(l!==null)throw ze=l,r;Fe=1,Dr(e,Wt(a,e.current)),ze=null;return}t.flags&32768?(Te||n===1?e=!0:kl||(Me&536870912)!==0?e=!1:(mn=e=!0,(n===2||n===9||n===3||n===6)&&(n=Nt.current,n!==null&&n.tag===13&&(n.flags|=16384))),Y0(t,e)):Qr(t)}function Qr(e){var t=e;do{if((t.flags&32768)!==0){Y0(t,mn);return}e=t.return;var a=gg(t.alternate,t,Va);if(a!==null){ze=a;return}if(t=t.sibling,t!==null){ze=t;return}ze=t=e}while(t!==null);Fe===0&&(Fe=5)}function Y0(e,t){do{var a=yg(e.alternate,e);if(a!==null){a.flags&=32767,ze=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){ze=e;return}ze=e=a}while(e!==null);Fe=6,ze=null}function X0(e,t,a,n,l,r,o,d,g){e.cancelPendingCommit=null;do Vr();while(ut!==0);if((De&6)!==0)throw Error(c(327));if(t!==null){if(t===e.current)throw Error(c(177));if(r=t.lanes|t.childLanes,r|=ps,ca(e,a,r,o,d,g),e===Ne&&(ze=Ne=null,Me=0),Dl=t,xn=e,Za=a,Sc=r,wc=l,D0=n,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,jg(Qt,function(){return K0(),null})):(e.callbackNode=null,e.callbackPriority=0),n=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||n){n=R.T,R.T=null,l=W.p,W.p=2,o=De,De|=4;try{xg(e,t,a)}finally{De=o,W.p=l,R.T=n}}ut=1,I0(),Q0(),V0()}}function I0(){if(ut===1){ut=0;var e=xn,t=Dl,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=R.T,R.T=null;var n=W.p;W.p=2;var l=De;De|=4;try{_0(t,e);var r=Hc,o=kf(e.containerInfo),d=r.focusedElem,g=r.selectionRange;if(o!==d&&d&&d.ownerDocument&&jf(d.ownerDocument.documentElement,d)){if(g!==null&&ss(d)){var j=g.start,L=g.end;if(L===void 0&&(L=j),"selectionStart"in d)d.selectionStart=j,d.selectionEnd=Math.min(L,d.value.length);else{var X=d.ownerDocument||document,D=X&&X.defaultView||window;if(D.getSelection){var B=D.getSelection(),ne=d.textContent.length,pe=Math.min(g.start,ne),Ue=g.end===void 0?pe:Math.min(g.end,ne);!B.extend&&pe>Ue&&(o=Ue,Ue=pe,pe=o);var M=Tf(d,pe),w=Tf(d,Ue);if(M&&w&&(B.rangeCount!==1||B.anchorNode!==M.node||B.anchorOffset!==M.offset||B.focusNode!==w.node||B.focusOffset!==w.offset)){var T=X.createRange();T.setStart(M.node,M.offset),B.removeAllRanges(),pe>Ue?(B.addRange(T),B.extend(w.node,w.offset)):(T.setEnd(w.node,w.offset),B.addRange(T))}}}}for(X=[],B=d;B=B.parentNode;)B.nodeType===1&&X.push({element:B,left:B.scrollLeft,top:B.scrollTop});for(typeof d.focus=="function"&&d.focus(),d=0;d<X.length;d++){var G=X[d];G.element.scrollLeft=G.left,G.element.scrollTop=G.top}}lo=!!Rc,Hc=Rc=null}finally{De=l,W.p=n,R.T=a}}e.current=t,ut=2}}function Q0(){if(ut===2){ut=0;var e=xn,t=Dl,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=R.T,R.T=null;var n=W.p;W.p=2;var l=De;De|=4;try{v0(e,t.alternate,t)}finally{De=l,W.p=n,R.T=a}}ut=3}}function V0(){if(ut===4||ut===3){ut=0,oa();var e=xn,t=Dl,a=Za,n=D0;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?ut=5:(ut=0,Dl=xn=null,Z0(e,e.pendingLanes));var l=e.pendingLanes;if(l===0&&(yn=null),Xo(a),t=t.stateNode,Ie&&typeof Ie.onCommitFiberRoot=="function")try{Ie.onCommitFiberRoot(St,t,void 0,(t.current.flags&128)===128)}catch{}if(n!==null){t=R.T,l=W.p,W.p=2,R.T=null;try{for(var r=e.onRecoverableError,o=0;o<n.length;o++){var d=n[o];r(d.value,{componentStack:d.stack})}}finally{R.T=t,W.p=l}}(Za&3)!==0&&Vr(),Aa(e),l=e.pendingLanes,(a&261930)!==0&&(l&42)!==0?e===zc?ji++:(ji=0,zc=e):ji=0,ki(0)}}function Z0(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ui(t)))}function Vr(){return I0(),Q0(),V0(),K0()}function K0(){if(ut!==5)return!1;var e=xn,t=Sc;Sc=0;var a=Xo(Za),n=R.T,l=W.p;try{W.p=32>a?32:a,R.T=null,a=wc,wc=null;var r=xn,o=Za;if(ut=0,Dl=xn=null,Za=0,(De&6)!==0)throw Error(c(331));var d=De;if(De|=4,j0(r.current),A0(r,r.current,o,a),De=d,ki(0,!1),Ie&&typeof Ie.onPostCommitFiberRoot=="function")try{Ie.onPostCommitFiberRoot(St,r)}catch{}return!0}finally{W.p=l,R.T=n,Z0(e,t)}}function $0(e,t,a){t=Wt(a,t),t=tc(e.stateNode,t,2),e=fn(e,t,2),e!==null&&(Zt(e,2),Aa(e))}function qe(e,t,a){if(e.tag===3)$0(e,e,a);else for(;t!==null;){if(t.tag===3){$0(t,e,a);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(yn===null||!yn.has(n))){e=Wt(a,e),a=Jd(2),n=fn(t,a,2),n!==null&&(Wd(a,n,t,e),Zt(n,2),Aa(n));break}}t=t.return}}function Ac(e,t,a){var n=e.pingCache;if(n===null){n=e.pingCache=new Sg;var l=new Set;n.set(t,l)}else l=n.get(t),l===void 0&&(l=new Set,n.set(t,l));l.has(a)||(xc=!0,l.add(a),e=Ag.bind(null,e,t,a),t.then(e,e))}function Ag(e,t,a){var n=e.pingCache;n!==null&&n.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Ne===e&&(Me&a)===a&&(Fe===4||Fe===3&&(Me&62914560)===Me&&300>se()-Lr?(De&2)===0&&Ol(e,0):vc|=a,Cl===Me&&(Cl=0)),Aa(e)}function J0(e,t){t===0&&(t=ka()),e=Hn(e,t),e!==null&&(Zt(e,t),Aa(e))}function Eg(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),J0(e,a)}function Tg(e,t){var a=0;switch(e.tag){case 31:case 13:var n=e.stateNode,l=e.memoizedState;l!==null&&(a=l.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error(c(314))}n!==null&&n.delete(t),J0(e,a)}function jg(e,t){return xa(e,t)}var Zr=null,ql=null,Ec=!1,Kr=!1,Tc=!1,bn=0;function Aa(e){e!==ql&&e.next===null&&(ql===null?Zr=ql=e:ql=ql.next=e),Kr=!0,Ec||(Ec=!0,Cg())}function ki(e,t){if(!Tc&&Kr){Tc=!0;do for(var a=!1,n=Zr;n!==null;){if(e!==0){var l=n.pendingLanes;if(l===0)var r=0;else{var o=n.suspendedLanes,d=n.pingedLanes;r=(1<<31-Ze(42|e)+1)-1,r&=l&~(o&~d),r=r&201326741?r&201326741|1:r?r|2:0}r!==0&&(a=!0,ep(n,r))}else r=Me,r=sa(n,n===Ne?r:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),(r&3)===0||wt(n,r)||(a=!0,ep(n,r));n=n.next}while(a);Tc=!1}}function kg(){W0()}function W0(){Kr=Ec=!1;var e=0;bn!==0&&Gg()&&(e=bn);for(var t=se(),a=null,n=Zr;n!==null;){var l=n.next,r=F0(n,t);r===0?(n.next=null,a===null?Zr=l:a.next=l,l===null&&(ql=a)):(a=n,(e!==0||(r&3)!==0)&&(Kr=!0)),n=l}ut!==0&&ut!==5||ki(e),bn!==0&&(bn=0)}function F0(e,t){for(var a=e.suspendedLanes,n=e.pingedLanes,l=e.expirationTimes,r=e.pendingLanes&-62914561;0<r;){var o=31-Ze(r),d=1<<o,g=l[o];g===-1?((d&a)===0||(d&n)!==0)&&(l[o]=wa(d,t)):g<=t&&(e.expiredLanes|=d),r&=~d}if(t=Ne,a=Me,a=sa(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n=e.callbackNode,a===0||e===t&&(Be===2||Be===9)||e.cancelPendingCommit!==null)return n!==null&&n!==null&&Ta(n),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||wt(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(n!==null&&Ta(n),Xo(a)){case 2:case 8:a=ba;break;case 32:a=Qt;break;case 268435456:a=ja;break;default:a=Qt}return n=P0.bind(null,e),a=xa(a,n),e.callbackPriority=t,e.callbackNode=a,t}return n!==null&&n!==null&&Ta(n),e.callbackPriority=2,e.callbackNode=null,2}function P0(e,t){if(ut!==0&&ut!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Vr()&&e.callbackNode!==a)return null;var n=Me;return n=sa(e,e===Ne?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n===0?null:(B0(e,n,t),F0(e,se()),e.callbackNode!=null&&e.callbackNode===a?P0.bind(null,e):null)}function ep(e,t){if(Vr())return null;B0(e,t,!0)}function Cg(){Xg(function(){(De&6)!==0?xa(va,kg):W0()})}function jc(){if(bn===0){var e=bl;e===0&&(e=Vt,Vt<<=1,(Vt&261888)===0&&(Vt=256)),bn=e}return bn}function tp(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ar(""+e)}function ap(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function Dg(e,t,a,n,l){if(t==="submit"&&a&&a.stateNode===l){var r=tp((l[Tt]||null).action),o=n.submitter;o&&(t=(t=o[Tt]||null)?tp(t.formAction):o.getAttribute("formAction"),t!==null&&(r=t,o=null));var d=new rr("action","action",null,n,l);e.push({event:d,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(bn!==0){var g=o?ap(l,o):new FormData(l);$s(a,{pending:!0,data:g,method:l.method,action:r},null,g)}}else typeof r=="function"&&(d.preventDefault(),g=o?ap(l,o):new FormData(l),$s(a,{pending:!0,data:g,method:l.method,action:r},r,g))},currentTarget:l}]})}}for(var kc=0;kc<ds.length;kc++){var Cc=ds[kc],Og=Cc.toLowerCase(),Bg=Cc[0].toUpperCase()+Cc.slice(1);ua(Og,"on"+Bg)}ua(Of,"onAnimationEnd"),ua(Bf,"onAnimationIteration"),ua(qf,"onAnimationStart"),ua("dblclick","onDoubleClick"),ua("focusin","onFocus"),ua("focusout","onBlur"),ua(Jm,"onTransitionRun"),ua(Wm,"onTransitionStart"),ua(Fm,"onTransitionCancel"),ua(Rf,"onTransitionEnd"),rl("onMouseEnter",["mouseout","mouseover"]),rl("onMouseLeave",["mouseout","mouseover"]),rl("onPointerEnter",["pointerout","pointerover"]),rl("onPointerLeave",["pointerout","pointerover"]),On("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),On("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),On("onBeforeInput",["compositionend","keypress","textInput","paste"]),On("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),On("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),On("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ci="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),qg=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ci));function np(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var n=e[a],l=n.event;n=n.listeners;e:{var r=void 0;if(t)for(var o=n.length-1;0<=o;o--){var d=n[o],g=d.instance,j=d.currentTarget;if(d=d.listener,g!==r&&l.isPropagationStopped())break e;r=d,l.currentTarget=j;try{r(l)}catch(L){cr(L)}l.currentTarget=null,r=g}else for(o=0;o<n.length;o++){if(d=n[o],g=d.instance,j=d.currentTarget,d=d.listener,g!==r&&l.isPropagationStopped())break e;r=d,l.currentTarget=j;try{r(l)}catch(L){cr(L)}l.currentTarget=null,r=g}}}}function _e(e,t){var a=t[Io];a===void 0&&(a=t[Io]=new Set);var n=e+"__bubble";a.has(n)||(lp(t,e,2,!1),a.add(n))}function Dc(e,t,a){var n=0;t&&(n|=4),lp(a,e,n,t)}var $r="_reactListening"+Math.random().toString(36).slice(2);function Oc(e){if(!e[$r]){e[$r]=!0,Ju.forEach(function(a){a!=="selectionchange"&&(qg.has(a)||Dc(a,!1,e),Dc(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[$r]||(t[$r]=!0,Dc("selectionchange",!1,t))}}function lp(e,t,a,n){switch(Op(t)){case 2:var l=cy;break;case 8:l=uy;break;default:l=Kc}a=l.bind(null,t,a,e),l=void 0,!Po||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),n?l!==void 0?e.addEventListener(t,a,{capture:!0,passive:l}):e.addEventListener(t,a,!0):l!==void 0?e.addEventListener(t,a,{passive:l}):e.addEventListener(t,a,!1)}function Bc(e,t,a,n,l){var r=n;if((t&1)===0&&(t&2)===0&&n!==null)e:for(;;){if(n===null)return;var o=n.tag;if(o===3||o===4){var d=n.stateNode.containerInfo;if(d===l)break;if(o===4)for(o=n.return;o!==null;){var g=o.tag;if((g===3||g===4)&&o.stateNode.containerInfo===l)return;o=o.return}for(;d!==null;){if(o=nl(d),o===null)return;if(g=o.tag,g===5||g===6||g===26||g===27){n=r=o;continue e}d=d.parentNode}}n=n.return}cf(function(){var j=r,L=Wo(a),X=[];e:{var D=Hf.get(e);if(D!==void 0){var B=rr,ne=e;switch(e){case"keypress":if(lr(a)===0)break e;case"keydown":case"keyup":B=Tm;break;case"focusin":ne="focus",B=ns;break;case"focusout":ne="blur",B=ns;break;case"beforeblur":case"afterblur":B=ns;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":B=df;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":B=gm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":B=Cm;break;case Of:case Bf:case qf:B=vm;break;case Rf:B=Om;break;case"scroll":case"scrollend":B=hm;break;case"wheel":B=qm;break;case"copy":case"cut":case"paste":B=Sm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":B=hf;break;case"toggle":case"beforetoggle":B=Hm}var pe=(t&4)!==0,Ue=!pe&&(e==="scroll"||e==="scrollend"),M=pe?D!==null?D+"Capture":null:D;pe=[];for(var w=j,T;w!==null;){var G=w;if(T=G.stateNode,G=G.tag,G!==5&&G!==26&&G!==27||T===null||M===null||(G=Pl(w,M),G!=null&&pe.push(Di(w,G,T))),Ue)break;w=w.return}0<pe.length&&(D=new B(D,ne,null,a,L),X.push({event:D,listeners:pe}))}}if((t&7)===0){e:{if(D=e==="mouseover"||e==="pointerover",B=e==="mouseout"||e==="pointerout",D&&a!==Jo&&(ne=a.relatedTarget||a.fromElement)&&(nl(ne)||ne[al]))break e;if((B||D)&&(D=L.window===L?L:(D=L.ownerDocument)?D.defaultView||D.parentWindow:window,B?(ne=a.relatedTarget||a.toElement,B=j,ne=ne?nl(ne):null,ne!==null&&(Ue=x(ne),pe=ne.tag,ne!==Ue||pe!==5&&pe!==27&&pe!==6)&&(ne=null)):(B=null,ne=j),B!==ne)){if(pe=df,G="onMouseLeave",M="onMouseEnter",w="mouse",(e==="pointerout"||e==="pointerover")&&(pe=hf,G="onPointerLeave",M="onPointerEnter",w="pointer"),Ue=B==null?D:Fl(B),T=ne==null?D:Fl(ne),D=new pe(G,w+"leave",B,a,L),D.target=Ue,D.relatedTarget=T,G=null,nl(L)===j&&(pe=new pe(M,w+"enter",ne,a,L),pe.target=T,pe.relatedTarget=Ue,G=pe),Ue=G,B&&ne)t:{for(pe=Rg,M=B,w=ne,T=0,G=M;G;G=pe(G))T++;G=0;for(var ue=w;ue;ue=pe(ue))G++;for(;0<T-G;)M=pe(M),T--;for(;0<G-T;)w=pe(w),G--;for(;T--;){if(M===w||w!==null&&M===w.alternate){pe=M;break t}M=pe(M),w=pe(w)}pe=null}else pe=null;B!==null&&ip(X,D,B,pe,!1),ne!==null&&Ue!==null&&ip(X,Ue,ne,pe,!0)}}e:{if(D=j?Fl(j):window,B=D.nodeName&&D.nodeName.toLowerCase(),B==="select"||B==="input"&&D.type==="file")var ke=wf;else if(bf(D))if(zf)ke=Zm;else{ke=Qm;var ie=Im}else B=D.nodeName,!B||B.toLowerCase()!=="input"||D.type!=="checkbox"&&D.type!=="radio"?j&&$o(j.elementType)&&(ke=wf):ke=Vm;if(ke&&(ke=ke(e,j))){Sf(X,ke,a,L);break e}ie&&ie(e,D,j),e==="focusout"&&j&&D.type==="number"&&j.memoizedProps.value!=null&&Ko(D,"number",D.value)}switch(ie=j?Fl(j):window,e){case"focusin":(bf(ie)||ie.contentEditable==="true")&&(dl=ie,cs=j,oi=null);break;case"focusout":oi=cs=dl=null;break;case"mousedown":us=!0;break;case"contextmenu":case"mouseup":case"dragend":us=!1,Cf(X,a,L);break;case"selectionchange":if($m)break;case"keydown":case"keyup":Cf(X,a,L)}var be;if(is)e:{switch(e){case"compositionstart":var Ae="onCompositionStart";break e;case"compositionend":Ae="onCompositionEnd";break e;case"compositionupdate":Ae="onCompositionUpdate";break e}Ae=void 0}else fl?xf(e,a)&&(Ae="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(Ae="onCompositionStart");Ae&&(mf&&a.locale!=="ko"&&(fl||Ae!=="onCompositionStart"?Ae==="onCompositionEnd"&&fl&&(be=uf()):(nn=L,es="value"in nn?nn.value:nn.textContent,fl=!0)),ie=Jr(j,Ae),0<ie.length&&(Ae=new pf(Ae,e,null,a,L),X.push({event:Ae,listeners:ie}),be?Ae.data=be:(be=vf(a),be!==null&&(Ae.data=be)))),(be=Nm?Lm(e,a):Gm(e,a))&&(Ae=Jr(j,"onBeforeInput"),0<Ae.length&&(ie=new pf("onBeforeInput","beforeinput",null,a,L),X.push({event:ie,listeners:Ae}),ie.data=be)),Dg(X,e,j,a,L)}np(X,t)})}function Di(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Jr(e,t){for(var a=t+"Capture",n=[];e!==null;){var l=e,r=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||r===null||(l=Pl(e,a),l!=null&&n.unshift(Di(e,l,r)),l=Pl(e,t),l!=null&&n.push(Di(e,l,r))),e.tag===3)return n;e=e.return}return[]}function Rg(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function ip(e,t,a,n,l){for(var r=t._reactName,o=[];a!==null&&a!==n;){var d=a,g=d.alternate,j=d.stateNode;if(d=d.tag,g!==null&&g===n)break;d!==5&&d!==26&&d!==27||j===null||(g=j,l?(j=Pl(a,r),j!=null&&o.unshift(Di(a,j,g))):l||(j=Pl(a,r),j!=null&&o.push(Di(a,j,g)))),a=a.return}o.length!==0&&e.push({event:t,listeners:o})}var Hg=/\r\n?/g,Ug=/\u0000|\uFFFD/g;function rp(e){return(typeof e=="string"?e:""+e).replace(Hg,`
`).replace(Ug,"")}function op(e,t){return t=rp(t),rp(e)===t}function He(e,t,a,n,l,r){switch(a){case"children":typeof n=="string"?t==="body"||t==="textarea"&&n===""||sl(e,n):(typeof n=="number"||typeof n=="bigint")&&t!=="body"&&sl(e,""+n);break;case"className":er(e,"class",n);break;case"tabIndex":er(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":er(e,a,n);break;case"style":of(e,n,r);break;case"data":if(t!=="object"){er(e,"data",n);break}case"src":case"href":if(n===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(n==null||typeof n=="function"||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=ar(""+n),e.setAttribute(a,n);break;case"action":case"formAction":if(typeof n=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof r=="function"&&(a==="formAction"?(t!=="input"&&He(e,t,"name",l.name,l,null),He(e,t,"formEncType",l.formEncType,l,null),He(e,t,"formMethod",l.formMethod,l,null),He(e,t,"formTarget",l.formTarget,l,null)):(He(e,t,"encType",l.encType,l,null),He(e,t,"method",l.method,l,null),He(e,t,"target",l.target,l,null)));if(n==null||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(a);break}n=ar(""+n),e.setAttribute(a,n);break;case"onClick":n!=null&&(e.onclick=Da);break;case"onScroll":n!=null&&_e("scroll",e);break;case"onScrollEnd":n!=null&&_e("scrollend",e);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(c(61));if(a=n.__html,a!=null){if(l.children!=null)throw Error(c(60));e.innerHTML=a}}break;case"multiple":e.multiple=n&&typeof n!="function"&&typeof n!="symbol";break;case"muted":e.muted=n&&typeof n!="function"&&typeof n!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(n==null||typeof n=="function"||typeof n=="boolean"||typeof n=="symbol"){e.removeAttribute("xlink:href");break}a=ar(""+n),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""+n):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":n===!0?e.setAttribute(a,""):n!==!1&&n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(a,n):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":n!=null&&typeof n!="function"&&typeof n!="symbol"&&!isNaN(n)&&1<=n?e.setAttribute(a,n):e.removeAttribute(a);break;case"rowSpan":case"start":n==null||typeof n=="function"||typeof n=="symbol"||isNaN(n)?e.removeAttribute(a):e.setAttribute(a,n);break;case"popover":_e("beforetoggle",e),_e("toggle",e),Pi(e,"popover",n);break;case"xlinkActuate":Ca(e,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":Ca(e,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":Ca(e,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":Ca(e,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":Ca(e,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":Ca(e,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":Ca(e,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":Ca(e,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":Ca(e,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":Pi(e,"is",n);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=dm.get(a)||a,Pi(e,a,n))}}function qc(e,t,a,n,l,r){switch(a){case"style":of(e,n,r);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(c(61));if(a=n.__html,a!=null){if(l.children!=null)throw Error(c(60));e.innerHTML=a}}break;case"children":typeof n=="string"?sl(e,n):(typeof n=="number"||typeof n=="bigint")&&sl(e,""+n);break;case"onScroll":n!=null&&_e("scroll",e);break;case"onScrollEnd":n!=null&&_e("scrollend",e);break;case"onClick":n!=null&&(e.onclick=Da);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Wu.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(l=a.endsWith("Capture"),t=a.slice(2,l?a.length-7:void 0),r=e[Tt]||null,r=r!=null?r[a]:null,typeof r=="function"&&e.removeEventListener(t,r,l),typeof n=="function")){typeof r!="function"&&r!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,n,l);break e}a in e?e[a]=n:n===!0?e.setAttribute(a,""):Pi(e,a,n)}}}function bt(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":_e("error",e),_e("load",e);var n=!1,l=!1,r;for(r in a)if(a.hasOwnProperty(r)){var o=a[r];if(o!=null)switch(r){case"src":n=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(c(137,t));default:He(e,t,r,o,a,null)}}l&&He(e,t,"srcSet",a.srcSet,a,null),n&&He(e,t,"src",a.src,a,null);return;case"input":_e("invalid",e);var d=r=o=l=null,g=null,j=null;for(n in a)if(a.hasOwnProperty(n)){var L=a[n];if(L!=null)switch(n){case"name":l=L;break;case"type":o=L;break;case"checked":g=L;break;case"defaultChecked":j=L;break;case"value":r=L;break;case"defaultValue":d=L;break;case"children":case"dangerouslySetInnerHTML":if(L!=null)throw Error(c(137,t));break;default:He(e,t,n,L,a,null)}}af(e,r,d,g,j,o,l,!1);return;case"select":_e("invalid",e),n=o=r=null;for(l in a)if(a.hasOwnProperty(l)&&(d=a[l],d!=null))switch(l){case"value":r=d;break;case"defaultValue":o=d;break;case"multiple":n=d;default:He(e,t,l,d,a,null)}t=r,a=o,e.multiple=!!n,t!=null?ol(e,!!n,t,!1):a!=null&&ol(e,!!n,a,!0);return;case"textarea":_e("invalid",e),r=l=n=null;for(o in a)if(a.hasOwnProperty(o)&&(d=a[o],d!=null))switch(o){case"value":n=d;break;case"defaultValue":l=d;break;case"children":r=d;break;case"dangerouslySetInnerHTML":if(d!=null)throw Error(c(91));break;default:He(e,t,o,d,a,null)}lf(e,n,l,r);return;case"option":for(g in a)a.hasOwnProperty(g)&&(n=a[g],n!=null)&&(g==="selected"?e.selected=n&&typeof n!="function"&&typeof n!="symbol":He(e,t,g,n,a,null));return;case"dialog":_e("beforetoggle",e),_e("toggle",e),_e("cancel",e),_e("close",e);break;case"iframe":case"object":_e("load",e);break;case"video":case"audio":for(n=0;n<Ci.length;n++)_e(Ci[n],e);break;case"image":_e("error",e),_e("load",e);break;case"details":_e("toggle",e);break;case"embed":case"source":case"link":_e("error",e),_e("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(j in a)if(a.hasOwnProperty(j)&&(n=a[j],n!=null))switch(j){case"children":case"dangerouslySetInnerHTML":throw Error(c(137,t));default:He(e,t,j,n,a,null)}return;default:if($o(t)){for(L in a)a.hasOwnProperty(L)&&(n=a[L],n!==void 0&&qc(e,t,L,n,a,void 0));return}}for(d in a)a.hasOwnProperty(d)&&(n=a[d],n!=null&&He(e,t,d,n,a,null))}function Ng(e,t,a,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,r=null,o=null,d=null,g=null,j=null,L=null;for(B in a){var X=a[B];if(a.hasOwnProperty(B)&&X!=null)switch(B){case"checked":break;case"value":break;case"defaultValue":g=X;default:n.hasOwnProperty(B)||He(e,t,B,null,n,X)}}for(var D in n){var B=n[D];if(X=a[D],n.hasOwnProperty(D)&&(B!=null||X!=null))switch(D){case"type":r=B;break;case"name":l=B;break;case"checked":j=B;break;case"defaultChecked":L=B;break;case"value":o=B;break;case"defaultValue":d=B;break;case"children":case"dangerouslySetInnerHTML":if(B!=null)throw Error(c(137,t));break;default:B!==X&&He(e,t,D,B,n,X)}}Zo(e,o,d,g,j,L,r,l);return;case"select":B=o=d=D=null;for(r in a)if(g=a[r],a.hasOwnProperty(r)&&g!=null)switch(r){case"value":break;case"multiple":B=g;default:n.hasOwnProperty(r)||He(e,t,r,null,n,g)}for(l in n)if(r=n[l],g=a[l],n.hasOwnProperty(l)&&(r!=null||g!=null))switch(l){case"value":D=r;break;case"defaultValue":d=r;break;case"multiple":o=r;default:r!==g&&He(e,t,l,r,n,g)}t=d,a=o,n=B,D!=null?ol(e,!!a,D,!1):!!n!=!!a&&(t!=null?ol(e,!!a,t,!0):ol(e,!!a,a?[]:"",!1));return;case"textarea":B=D=null;for(d in a)if(l=a[d],a.hasOwnProperty(d)&&l!=null&&!n.hasOwnProperty(d))switch(d){case"value":break;case"children":break;default:He(e,t,d,null,n,l)}for(o in n)if(l=n[o],r=a[o],n.hasOwnProperty(o)&&(l!=null||r!=null))switch(o){case"value":D=l;break;case"defaultValue":B=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(c(91));break;default:l!==r&&He(e,t,o,l,n,r)}nf(e,D,B);return;case"option":for(var ne in a)D=a[ne],a.hasOwnProperty(ne)&&D!=null&&!n.hasOwnProperty(ne)&&(ne==="selected"?e.selected=!1:He(e,t,ne,null,n,D));for(g in n)D=n[g],B=a[g],n.hasOwnProperty(g)&&D!==B&&(D!=null||B!=null)&&(g==="selected"?e.selected=D&&typeof D!="function"&&typeof D!="symbol":He(e,t,g,D,n,B));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var pe in a)D=a[pe],a.hasOwnProperty(pe)&&D!=null&&!n.hasOwnProperty(pe)&&He(e,t,pe,null,n,D);for(j in n)if(D=n[j],B=a[j],n.hasOwnProperty(j)&&D!==B&&(D!=null||B!=null))switch(j){case"children":case"dangerouslySetInnerHTML":if(D!=null)throw Error(c(137,t));break;default:He(e,t,j,D,n,B)}return;default:if($o(t)){for(var Ue in a)D=a[Ue],a.hasOwnProperty(Ue)&&D!==void 0&&!n.hasOwnProperty(Ue)&&qc(e,t,Ue,void 0,n,D);for(L in n)D=n[L],B=a[L],!n.hasOwnProperty(L)||D===B||D===void 0&&B===void 0||qc(e,t,L,D,n,B);return}}for(var M in a)D=a[M],a.hasOwnProperty(M)&&D!=null&&!n.hasOwnProperty(M)&&He(e,t,M,null,n,D);for(X in n)D=n[X],B=a[X],!n.hasOwnProperty(X)||D===B||D==null&&B==null||He(e,t,X,D,n,B)}function sp(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Lg(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,a=performance.getEntriesByType("resource"),n=0;n<a.length;n++){var l=a[n],r=l.transferSize,o=l.initiatorType,d=l.duration;if(r&&d&&sp(o)){for(o=0,d=l.responseEnd,n+=1;n<a.length;n++){var g=a[n],j=g.startTime;if(j>d)break;var L=g.transferSize,X=g.initiatorType;L&&sp(X)&&(g=g.responseEnd,o+=L*(g<d?1:(d-j)/(g-j)))}if(--n,t+=8*(r+o)/(l.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Rc=null,Hc=null;function Wr(e){return e.nodeType===9?e:e.ownerDocument}function cp(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function up(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Uc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Nc=null;function Gg(){var e=window.event;return e&&e.type==="popstate"?e===Nc?!1:(Nc=e,!0):(Nc=null,!1)}var fp=typeof setTimeout=="function"?setTimeout:void 0,Yg=typeof clearTimeout=="function"?clearTimeout:void 0,dp=typeof Promise=="function"?Promise:void 0,Xg=typeof queueMicrotask=="function"?queueMicrotask:typeof dp<"u"?function(e){return dp.resolve(null).then(e).catch(Ig)}:fp;function Ig(e){setTimeout(function(){throw e})}function Sn(e){return e==="head"}function pp(e,t){var a=t,n=0;do{var l=a.nextSibling;if(e.removeChild(a),l&&l.nodeType===8)if(a=l.data,a==="/$"||a==="/&"){if(n===0){e.removeChild(l),Nl(t);return}n--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")n++;else if(a==="html")Oi(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Oi(a);for(var r=a.firstChild;r;){var o=r.nextSibling,d=r.nodeName;r[Wl]||d==="SCRIPT"||d==="STYLE"||d==="LINK"&&r.rel.toLowerCase()==="stylesheet"||a.removeChild(r),r=o}}else a==="body"&&Oi(e.ownerDocument.body);a=l}while(a);Nl(t)}function hp(e,t){var a=e;e=0;do{var n=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),n&&n.nodeType===8)if(a=n.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=n}while(a)}function Lc(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Lc(a),Qo(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function Qg(e,t,a,n){for(;e.nodeType===1;){var l=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(n){if(!e[Wl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(r=e.getAttribute("rel"),r==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(r!==l.rel||e.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||e.getAttribute("title")!==(l.title==null?null:l.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(r=e.getAttribute("src"),(r!==(l.src==null?null:l.src)||e.getAttribute("type")!==(l.type==null?null:l.type)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&r&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var r=l.name==null?null:""+l.name;if(l.type==="hidden"&&e.getAttribute("name")===r)return e}else return e;if(e=aa(e.nextSibling),e===null)break}return null}function Vg(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=aa(e.nextSibling),e===null))return null;return e}function mp(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=aa(e.nextSibling),e===null))return null;return e}function Gc(e){return e.data==="$?"||e.data==="$~"}function Yc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Zg(e,t){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||a.readyState!=="loading")t();else{var n=function(){t(),a.removeEventListener("DOMContentLoaded",n)};a.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}function aa(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Xc=null;function gp(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(t===0)return aa(e.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}e=e.nextSibling}return null}function yp(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return e;t--}else a!=="/$"&&a!=="/&"||t++}e=e.previousSibling}return null}function xp(e,t,a){switch(t=Wr(a),e){case"html":if(e=t.documentElement,!e)throw Error(c(452));return e;case"head":if(e=t.head,!e)throw Error(c(453));return e;case"body":if(e=t.body,!e)throw Error(c(454));return e;default:throw Error(c(451))}}function Oi(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Qo(e)}var na=new Map,vp=new Set;function Fr(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Ka=W.d;W.d={f:Kg,r:$g,D:Jg,C:Wg,L:Fg,m:Pg,X:ty,S:ey,M:ay};function Kg(){var e=Ka.f(),t=Xr();return e||t}function $g(e){var t=ll(e);t!==null&&t.tag===5&&t.type==="form"?Rd(t):Ka.r(e)}var Rl=typeof document>"u"?null:document;function bp(e,t,a){var n=Rl;if(n&&typeof t=="string"&&t){var l=$t(t);l='link[rel="'+e+'"][href="'+l+'"]',typeof a=="string"&&(l+='[crossorigin="'+a+'"]'),vp.has(l)||(vp.add(l),e={rel:e,crossOrigin:a,href:t},n.querySelector(l)===null&&(t=n.createElement("link"),bt(t,"link",e),ht(t),n.head.appendChild(t)))}}function Jg(e){Ka.D(e),bp("dns-prefetch",e,null)}function Wg(e,t){Ka.C(e,t),bp("preconnect",e,t)}function Fg(e,t,a){Ka.L(e,t,a);var n=Rl;if(n&&e&&t){var l='link[rel="preload"][as="'+$t(t)+'"]';t==="image"&&a&&a.imageSrcSet?(l+='[imagesrcset="'+$t(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(l+='[imagesizes="'+$t(a.imageSizes)+'"]')):l+='[href="'+$t(e)+'"]';var r=l;switch(t){case"style":r=Hl(e);break;case"script":r=Ul(e)}na.has(r)||(e=C({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),na.set(r,e),n.querySelector(l)!==null||t==="style"&&n.querySelector(Bi(r))||t==="script"&&n.querySelector(qi(r))||(t=n.createElement("link"),bt(t,"link",e),ht(t),n.head.appendChild(t)))}}function Pg(e,t){Ka.m(e,t);var a=Rl;if(a&&e){var n=t&&typeof t.as=="string"?t.as:"script",l='link[rel="modulepreload"][as="'+$t(n)+'"][href="'+$t(e)+'"]',r=l;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":r=Ul(e)}if(!na.has(r)&&(e=C({rel:"modulepreload",href:e},t),na.set(r,e),a.querySelector(l)===null)){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(qi(r)))return}n=a.createElement("link"),bt(n,"link",e),ht(n),a.head.appendChild(n)}}}function ey(e,t,a){Ka.S(e,t,a);var n=Rl;if(n&&e){var l=il(n).hoistableStyles,r=Hl(e);t=t||"default";var o=l.get(r);if(!o){var d={loading:0,preload:null};if(o=n.querySelector(Bi(r)))d.loading=5;else{e=C({rel:"stylesheet",href:e,"data-precedence":t},a),(a=na.get(r))&&Ic(e,a);var g=o=n.createElement("link");ht(g),bt(g,"link",e),g._p=new Promise(function(j,L){g.onload=j,g.onerror=L}),g.addEventListener("load",function(){d.loading|=1}),g.addEventListener("error",function(){d.loading|=2}),d.loading|=4,Pr(o,t,n)}o={type:"stylesheet",instance:o,count:1,state:d},l.set(r,o)}}}function ty(e,t){Ka.X(e,t);var a=Rl;if(a&&e){var n=il(a).hoistableScripts,l=Ul(e),r=n.get(l);r||(r=a.querySelector(qi(l)),r||(e=C({src:e,async:!0},t),(t=na.get(l))&&Qc(e,t),r=a.createElement("script"),ht(r),bt(r,"link",e),a.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},n.set(l,r))}}function ay(e,t){Ka.M(e,t);var a=Rl;if(a&&e){var n=il(a).hoistableScripts,l=Ul(e),r=n.get(l);r||(r=a.querySelector(qi(l)),r||(e=C({src:e,async:!0,type:"module"},t),(t=na.get(l))&&Qc(e,t),r=a.createElement("script"),ht(r),bt(r,"link",e),a.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},n.set(l,r))}}function Sp(e,t,a,n){var l=(l=I.current)?Fr(l):null;if(!l)throw Error(c(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=Hl(a.href),a=il(l).hoistableStyles,n=a.get(t),n||(n={type:"style",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Hl(a.href);var r=il(l).hoistableStyles,o=r.get(e);if(o||(l=l.ownerDocument||l,o={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},r.set(e,o),(r=l.querySelector(Bi(e)))&&!r._p&&(o.instance=r,o.state.loading=5),na.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},na.set(e,a),r||ny(l,e,a,o.state))),t&&n===null)throw Error(c(528,""));return o}if(t&&n!==null)throw Error(c(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Ul(a),a=il(l).hoistableScripts,n=a.get(t),n||(n={type:"script",instance:null,count:0,state:null},a.set(t,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(c(444,e))}}function Hl(e){return'href="'+$t(e)+'"'}function Bi(e){return'link[rel="stylesheet"]['+e+"]"}function wp(e){return C({},e,{"data-precedence":e.precedence,precedence:null})}function ny(e,t,a,n){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?n.loading=1:(t=e.createElement("link"),n.preload=t,t.addEventListener("load",function(){return n.loading|=1}),t.addEventListener("error",function(){return n.loading|=2}),bt(t,"link",a),ht(t),e.head.appendChild(t))}function Ul(e){return'[src="'+$t(e)+'"]'}function qi(e){return"script[async]"+e}function zp(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+$t(a.href)+'"]');if(n)return t.instance=n,ht(n),n;var l=C({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return n=(e.ownerDocument||e).createElement("style"),ht(n),bt(n,"style",l),Pr(n,a.precedence,e),t.instance=n;case"stylesheet":l=Hl(a.href);var r=e.querySelector(Bi(l));if(r)return t.state.loading|=4,t.instance=r,ht(r),r;n=wp(a),(l=na.get(l))&&Ic(n,l),r=(e.ownerDocument||e).createElement("link"),ht(r);var o=r;return o._p=new Promise(function(d,g){o.onload=d,o.onerror=g}),bt(r,"link",n),t.state.loading|=4,Pr(r,a.precedence,e),t.instance=r;case"script":return r=Ul(a.src),(l=e.querySelector(qi(r)))?(t.instance=l,ht(l),l):(n=a,(l=na.get(r))&&(n=C({},a),Qc(n,l)),e=e.ownerDocument||e,l=e.createElement("script"),ht(l),bt(l,"link",n),e.head.appendChild(l),t.instance=l);case"void":return null;default:throw Error(c(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(n=t.instance,t.state.loading|=4,Pr(n,a.precedence,e));return t.instance}function Pr(e,t,a){for(var n=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=n.length?n[n.length-1]:null,r=l,o=0;o<n.length;o++){var d=n[o];if(d.dataset.precedence===t)r=d;else if(r!==l)break}r?r.parentNode.insertBefore(e,r.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function Ic(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Qc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var eo=null;function _p(e,t,a){if(eo===null){var n=new Map,l=eo=new Map;l.set(a,n)}else l=eo,n=l.get(a),n||(n=new Map,l.set(a,n));if(n.has(e))return n;for(n.set(e,null),a=a.getElementsByTagName(e),l=0;l<a.length;l++){var r=a[l];if(!(r[Wl]||r[gt]||e==="link"&&r.getAttribute("rel")==="stylesheet")&&r.namespaceURI!=="http://www.w3.org/2000/svg"){var o=r.getAttribute(t)||"";o=e+o;var d=n.get(o);d?d.push(r):n.set(o,[r])}}return n}function Mp(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function ly(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Ap(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function iy(e,t,a,n){if(a.type==="stylesheet"&&(typeof n.media!="string"||matchMedia(n.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var l=Hl(n.href),r=t.querySelector(Bi(l));if(r){t=r._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=to.bind(e),t.then(e,e)),a.state.loading|=4,a.instance=r,ht(r);return}r=t.ownerDocument||t,n=wp(n),(l=na.get(l))&&Ic(n,l),r=r.createElement("link"),ht(r);var o=r;o._p=new Promise(function(d,g){o.onload=d,o.onerror=g}),bt(r,"link",n),a.instance=r}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,t),(t=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=to.bind(e),t.addEventListener("load",a),t.addEventListener("error",a))}}var Vc=0;function ry(e,t){return e.stylesheets&&e.count===0&&no(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var n=setTimeout(function(){if(e.stylesheets&&no(e,e.stylesheets),e.unsuspend){var r=e.unsuspend;e.unsuspend=null,r()}},6e4+t);0<e.imgBytes&&Vc===0&&(Vc=62500*Lg());var l=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&no(e,e.stylesheets),e.unsuspend)){var r=e.unsuspend;e.unsuspend=null,r()}},(e.imgBytes>Vc?50:800)+t);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(n),clearTimeout(l)}}:null}function to(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)no(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var ao=null;function no(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ao=new Map,t.forEach(oy,e),ao=null,to.call(e))}function oy(e,t){if(!(t.state.loading&4)){var a=ao.get(e);if(a)var n=a.get(null);else{a=new Map,ao.set(e,a);for(var l=e.querySelectorAll("link[data-precedence],style[data-precedence]"),r=0;r<l.length;r++){var o=l[r];(o.nodeName==="LINK"||o.getAttribute("media")!=="not all")&&(a.set(o.dataset.precedence,o),n=o)}n&&a.set(null,n)}l=t.instance,o=l.getAttribute("data-precedence"),r=a.get(o)||n,r===n&&a.set(null,l),a.set(o,l),this.count++,n=to.bind(this),l.addEventListener("load",n),l.addEventListener("error",n),r?r.parentNode.insertBefore(l,r.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(l,e.firstChild)),t.state.loading|=4}}var Ri={$$typeof:Z,Provider:null,Consumer:null,_currentValue:v,_currentValue2:v,_threadCount:0};function sy(e,t,a,n,l,r,o,d,g){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=tl(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=tl(0),this.hiddenUpdates=tl(null),this.identifierPrefix=n,this.onUncaughtError=l,this.onCaughtError=r,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=g,this.incompleteTransitions=new Map}function Ep(e,t,a,n,l,r,o,d,g,j,L,X){return e=new sy(e,t,a,o,g,j,L,X,d),t=1,r===!0&&(t|=24),r=Ut(3,null,null,t),e.current=r,r.stateNode=e,t=Ms(),t.refCount++,e.pooledCache=t,t.refCount++,r.memoizedState={element:n,isDehydrated:a,cache:t},js(r),e}function Tp(e){return e?(e=ml,e):ml}function jp(e,t,a,n,l,r){l=Tp(l),n.context===null?n.context=l:n.pendingContext=l,n=un(t),n.payload={element:a},r=r===void 0?null:r,r!==null&&(n.callback=r),a=fn(e,n,t),a!==null&&(Bt(a,e,t),hi(a,e,t))}function kp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function Zc(e,t){kp(e,t),(e=e.alternate)&&kp(e,t)}function Cp(e){if(e.tag===13||e.tag===31){var t=Hn(e,67108864);t!==null&&Bt(t,e,67108864),Zc(e,67108864)}}function Dp(e){if(e.tag===13||e.tag===31){var t=Xt();t=Yo(t);var a=Hn(e,t);a!==null&&Bt(a,e,t),Zc(e,t)}}var lo=!0;function cy(e,t,a,n){var l=R.T;R.T=null;var r=W.p;try{W.p=2,Kc(e,t,a,n)}finally{W.p=r,R.T=l}}function uy(e,t,a,n){var l=R.T;R.T=null;var r=W.p;try{W.p=8,Kc(e,t,a,n)}finally{W.p=r,R.T=l}}function Kc(e,t,a,n){if(lo){var l=$c(n);if(l===null)Bc(e,t,n,io,a),Bp(e,n);else if(dy(l,e,t,a,n))n.stopPropagation();else if(Bp(e,n),t&4&&-1<fy.indexOf(e)){for(;l!==null;){var r=ll(l);if(r!==null)switch(r.tag){case 3:if(r=r.stateNode,r.current.memoizedState.isDehydrated){var o=nt(r.pendingLanes);if(o!==0){var d=r;for(d.pendingLanes|=2,d.entangledLanes|=2;o;){var g=1<<31-Ze(o);d.entanglements[1]|=g,o&=~g}Aa(r),(De&6)===0&&(Gr=se()+500,ki(0))}}break;case 31:case 13:d=Hn(r,2),d!==null&&Bt(d,r,2),Xr(),Zc(r,2)}if(r=$c(n),r===null&&Bc(e,t,n,io,a),r===l)break;l=r}l!==null&&n.stopPropagation()}else Bc(e,t,n,null,a)}}function $c(e){return e=Wo(e),Jc(e)}var io=null;function Jc(e){if(io=null,e=nl(e),e!==null){var t=x(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=A(t),e!==null)return e;e=null}else if(a===31){if(e=Y(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return io=e,null}function Op(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(et()){case va:return 2;case ba:return 8;case Qt:case Et:return 32;case ja:return 268435456;default:return 32}default:return 32}}var Wc=!1,wn=null,zn=null,_n=null,Hi=new Map,Ui=new Map,Mn=[],fy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Bp(e,t){switch(e){case"focusin":case"focusout":wn=null;break;case"dragenter":case"dragleave":zn=null;break;case"mouseover":case"mouseout":_n=null;break;case"pointerover":case"pointerout":Hi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ui.delete(t.pointerId)}}function Ni(e,t,a,n,l,r){return e===null||e.nativeEvent!==r?(e={blockedOn:t,domEventName:a,eventSystemFlags:n,nativeEvent:r,targetContainers:[l]},t!==null&&(t=ll(t),t!==null&&Cp(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function dy(e,t,a,n,l){switch(t){case"focusin":return wn=Ni(wn,e,t,a,n,l),!0;case"dragenter":return zn=Ni(zn,e,t,a,n,l),!0;case"mouseover":return _n=Ni(_n,e,t,a,n,l),!0;case"pointerover":var r=l.pointerId;return Hi.set(r,Ni(Hi.get(r)||null,e,t,a,n,l)),!0;case"gotpointercapture":return r=l.pointerId,Ui.set(r,Ni(Ui.get(r)||null,e,t,a,n,l)),!0}return!1}function qp(e){var t=nl(e.target);if(t!==null){var a=x(t);if(a!==null){if(t=a.tag,t===13){if(t=A(a),t!==null){e.blockedOn=t,Ku(e.priority,function(){Dp(a)});return}}else if(t===31){if(t=Y(a),t!==null){e.blockedOn=t,Ku(e.priority,function(){Dp(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ro(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=$c(e.nativeEvent);if(a===null){a=e.nativeEvent;var n=new a.constructor(a.type,a);Jo=n,a.target.dispatchEvent(n),Jo=null}else return t=ll(a),t!==null&&Cp(t),e.blockedOn=a,!1;t.shift()}return!0}function Rp(e,t,a){ro(e)&&a.delete(t)}function py(){Wc=!1,wn!==null&&ro(wn)&&(wn=null),zn!==null&&ro(zn)&&(zn=null),_n!==null&&ro(_n)&&(_n=null),Hi.forEach(Rp),Ui.forEach(Rp)}function oo(e,t){e.blockedOn===t&&(e.blockedOn=null,Wc||(Wc=!0,i.unstable_scheduleCallback(i.unstable_NormalPriority,py)))}var so=null;function Hp(e){so!==e&&(so=e,i.unstable_scheduleCallback(i.unstable_NormalPriority,function(){so===e&&(so=null);for(var t=0;t<e.length;t+=3){var a=e[t],n=e[t+1],l=e[t+2];if(typeof n!="function"){if(Jc(n||a)===null)continue;break}var r=ll(a);r!==null&&(e.splice(t,3),t-=3,$s(r,{pending:!0,data:l,method:a.method,action:n},n,l))}}))}function Nl(e){function t(g){return oo(g,e)}wn!==null&&oo(wn,e),zn!==null&&oo(zn,e),_n!==null&&oo(_n,e),Hi.forEach(t),Ui.forEach(t);for(var a=0;a<Mn.length;a++){var n=Mn[a];n.blockedOn===e&&(n.blockedOn=null)}for(;0<Mn.length&&(a=Mn[0],a.blockedOn===null);)qp(a),a.blockedOn===null&&Mn.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(n=0;n<a.length;n+=3){var l=a[n],r=a[n+1],o=l[Tt]||null;if(typeof r=="function")o||Hp(a);else if(o){var d=null;if(r&&r.hasAttribute("formAction")){if(l=r,o=r[Tt]||null)d=o.formAction;else if(Jc(l)!==null)continue}else d=o.action;typeof d=="function"?a[n+1]=d:(a.splice(n,3),n-=3),Hp(a)}}}function Up(){function e(r){r.canIntercept&&r.info==="react-transition"&&r.intercept({handler:function(){return new Promise(function(o){return l=o})},focusReset:"manual",scroll:"manual"})}function t(){l!==null&&(l(),l=null),n||setTimeout(a,20)}function a(){if(!n&&!navigation.transition){var r=navigation.currentEntry;r&&r.url!=null&&navigation.navigate(r.url,{state:r.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var n=!1,l=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){n=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),l!==null&&(l(),l=null)}}}function Fc(e){this._internalRoot=e}co.prototype.render=Fc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(c(409));var a=t.current,n=Xt();jp(a,n,e,t,null,null)},co.prototype.unmount=Fc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;jp(e.current,2,null,e,null,null),Xr(),t[al]=null}};function co(e){this._internalRoot=e}co.prototype.unstable_scheduleHydration=function(e){if(e){var t=Zu();e={blockedOn:null,target:e,priority:t};for(var a=0;a<Mn.length&&t!==0&&t<Mn[a].priority;a++);Mn.splice(a,0,e),a===0&&qp(e)}};var Np=s.version;if(Np!=="19.2.3")throw Error(c(527,Np,"19.2.3"));W.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(c(188)):(e=Object.keys(e).join(","),Error(c(268,e)));return e=y(t),e=e!==null?_(e):null,e=e===null?null:e.stateNode,e};var hy={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:R,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var uo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!uo.isDisabled&&uo.supportsFiber)try{St=uo.inject(hy),Ie=uo}catch{}}return Gi.createRoot=function(e,t){if(!h(e))throw Error(c(299));var a=!1,n="",l=Vd,r=Zd,o=Kd;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onUncaughtError!==void 0&&(l=t.onUncaughtError),t.onCaughtError!==void 0&&(r=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=Ep(e,1,!1,null,null,a,n,null,l,r,o,Up),e[al]=t.current,Oc(e),new Fc(t)},Gi.hydrateRoot=function(e,t,a){if(!h(e))throw Error(c(299));var n=!1,l="",r=Vd,o=Zd,d=Kd,g=null;return a!=null&&(a.unstable_strictMode===!0&&(n=!0),a.identifierPrefix!==void 0&&(l=a.identifierPrefix),a.onUncaughtError!==void 0&&(r=a.onUncaughtError),a.onCaughtError!==void 0&&(o=a.onCaughtError),a.onRecoverableError!==void 0&&(d=a.onRecoverableError),a.formState!==void 0&&(g=a.formState)),t=Ep(e,1,!0,t,a??null,n,l,g,r,o,d,Up),t.context=Tp(null),a=t.current,n=Xt(),n=Yo(n),l=un(n),l.callback=null,fn(a,l,n),a=n,t.current.lanes=a,Zt(t,a),Aa(t),e[al]=t.current,Oc(e),new co(t)},Gi.version="19.2.3",Gi}var $p;function _y(){if($p)return tu.exports;$p=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(s){console.error(s)}}return i(),tu.exports=zy(),tu.exports}var My=_y(),_t=function(){return _t=Object.assign||function(s){for(var f,c=1,h=arguments.length;c<h;c++){f=arguments[c];for(var x in f)Object.prototype.hasOwnProperty.call(f,x)&&(s[x]=f[x])}return s},_t.apply(this,arguments)};function Il(i,s,f){if(f||arguments.length===2)for(var c=0,h=s.length,x;c<h;c++)(x||!(c in s))&&(x||(x=Array.prototype.slice.call(s,0,c)),x[c]=s[c]);return i.concat(x||Array.prototype.slice.call(s))}var Ye="-ms-",Ki="-moz-",Oe="-webkit-",Dh="comm",Oo="rule",Uu="decl",Ay="@import",Ey="@namespace",Oh="@keyframes",Ty="@layer",Bh=Math.abs,Nu=String.fromCharCode,Eu=Object.assign;function jy(i,s){return ft(i,0)^45?(((s<<2^ft(i,0))<<2^ft(i,1))<<2^ft(i,2))<<2^ft(i,3):0}function qh(i){return i.trim()}function Wa(i,s){return(i=s.exec(i))?i[0]:i}function Se(i,s,f){return i.replace(s,f)}function zo(i,s,f){return i.indexOf(s,f)}function ft(i,s){return i.charCodeAt(s)|0}function el(i,s,f){return i.slice(s,f)}function ga(i){return i.length}function Rh(i){return i.length}function Zi(i,s){return s.push(i),i}function ky(i,s){return i.map(s).join("")}function Jp(i,s){return i.filter(function(f){return!Wa(f,s)})}var Bo=1,Ql=1,Hh=0,ia=0,st=0,$l="";function qo(i,s,f,c,h,x,A,Y){return{value:i,root:s,parent:f,type:c,props:h,children:x,line:Bo,column:Ql,length:A,return:"",siblings:Y}}function jn(i,s){return Eu(qo("",null,null,"",null,null,0,i.siblings),i,{length:-i.length},s)}function Ll(i){for(;i.root;)i=jn(i.root,{children:[i]});Zi(i,i.siblings)}function Cy(){return st}function Dy(){return st=ia>0?ft($l,--ia):0,Ql--,st===10&&(Ql=1,Bo--),st}function ya(){return st=ia<Hh?ft($l,ia++):0,Ql++,st===10&&(Ql=1,Bo++),st}function kn(){return ft($l,ia)}function _o(){return ia}function Ro(i,s){return el($l,i,s)}function Ji(i){switch(i){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Oy(i){return Bo=Ql=1,Hh=ga($l=i),ia=0,[]}function By(i){return $l="",i}function iu(i){return qh(Ro(ia-1,Tu(i===91?i+2:i===40?i+1:i)))}function qy(i){for(;(st=kn())&&st<33;)ya();return Ji(i)>2||Ji(st)>3?"":" "}function Ry(i,s){for(;--s&&ya()&&!(st<48||st>102||st>57&&st<65||st>70&&st<97););return Ro(i,_o()+(s<6&&kn()==32&&ya()==32))}function Tu(i){for(;ya();)switch(st){case i:return ia;case 34:case 39:i!==34&&i!==39&&Tu(st);break;case 40:i===41&&Tu(i);break;case 92:ya();break}return ia}function Hy(i,s){for(;ya()&&i+st!==57;)if(i+st===84&&kn()===47)break;return"/*"+Ro(s,ia-1)+"*"+Nu(i===47?i:ya())}function Uy(i){for(;!Ji(kn());)ya();return Ro(i,ia)}function Ny(i){return By(Mo("",null,null,null,[""],i=Oy(i),0,[0],i))}function Mo(i,s,f,c,h,x,A,Y,k){for(var y=0,_=0,C=A,V=0,H=0,U=0,P=1,J=1,le=1,he=0,Z="",ae=h,te=x,ee=c,q=Z;J;)switch(U=he,he=ya()){case 40:if(U!=108&&ft(q,C-1)==58){zo(q+=Se(iu(he),"&","&\f"),"&\f",Bh(y?Y[y-1]:0))!=-1&&(le=-1);break}case 34:case 39:case 91:q+=iu(he);break;case 9:case 10:case 13:case 32:q+=qy(U);break;case 92:q+=Ry(_o()-1,7);continue;case 47:switch(kn()){case 42:case 47:Zi(Ly(Hy(ya(),_o()),s,f,k),k),(Ji(U||1)==5||Ji(kn()||1)==5)&&ga(q)&&el(q,-1,void 0)!==" "&&(q+=" ");break;default:q+="/"}break;case 123*P:Y[y++]=ga(q)*le;case 125*P:case 59:case 0:switch(he){case 0:case 125:J=0;case 59+_:le==-1&&(q=Se(q,/\f/g,"")),H>0&&(ga(q)-C||P===0&&U===47)&&Zi(H>32?Fp(q+";",c,f,C-1,k):Fp(Se(q," ","")+";",c,f,C-2,k),k);break;case 59:q+=";";default:if(Zi(ee=Wp(q,s,f,y,_,h,Y,Z,ae=[],te=[],C,x),x),he===123)if(_===0)Mo(q,s,ee,ee,ae,x,C,Y,te);else{switch(V){case 99:if(ft(q,3)===110)break;case 108:if(ft(q,2)===97)break;default:_=0;case 100:case 109:case 115:}_?Mo(i,ee,ee,c&&Zi(Wp(i,ee,ee,0,0,h,Y,Z,h,ae=[],C,te),te),h,te,C,Y,c?ae:te):Mo(q,ee,ee,ee,[""],te,0,Y,te)}}y=_=H=0,P=le=1,Z=q="",C=A;break;case 58:C=1+ga(q),H=U;default:if(P<1){if(he==123)--P;else if(he==125&&P++==0&&Dy()==125)continue}switch(q+=Nu(he),he*P){case 38:le=_>0?1:(q+="\f",-1);break;case 44:Y[y++]=(ga(q)-1)*le,le=1;break;case 64:kn()===45&&(q+=iu(ya())),V=kn(),_=C=ga(Z=q+=Uy(_o())),he++;break;case 45:U===45&&ga(q)==2&&(P=0)}}return x}function Wp(i,s,f,c,h,x,A,Y,k,y,_,C){for(var V=h-1,H=h===0?x:[""],U=Rh(H),P=0,J=0,le=0;P<c;++P)for(var he=0,Z=el(i,V+1,V=Bh(J=A[P])),ae=i;he<U;++he)(ae=qh(J>0?H[he]+" "+Z:Se(Z,/&\f/g,H[he])))&&(k[le++]=ae);return qo(i,s,f,h===0?Oo:Y,k,y,_,C)}function Ly(i,s,f,c){return qo(i,s,f,Dh,Nu(Cy()),el(i,2,-2),0,c)}function Fp(i,s,f,c,h){return qo(i,s,f,Uu,el(i,0,c),el(i,c+1,-1),c,h)}function Uh(i,s,f){switch(jy(i,s)){case 5103:return Oe+"print-"+i+i;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return Oe+i+i;case 4855:return Oe+i.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+i;case 4789:return Ki+i+i;case 5349:case 4246:case 4810:case 6968:case 2756:return Oe+i+Ki+i+Ye+i+i;case 5936:switch(ft(i,s+11)){case 114:return Oe+i+Ye+Se(i,/[svh]\w+-[tblr]{2}/,"tb")+i;case 108:return Oe+i+Ye+Se(i,/[svh]\w+-[tblr]{2}/,"tb-rl")+i;case 45:return Oe+i+Ye+Se(i,/[svh]\w+-[tblr]{2}/,"lr")+i}case 6828:case 4268:case 2903:return Oe+i+Ye+i+i;case 6165:return Oe+i+Ye+"flex-"+i+i;case 5187:return Oe+i+Se(i,/(\w+).+(:[^]+)/,Oe+"box-$1$2"+Ye+"flex-$1$2")+i;case 5443:return Oe+i+Ye+"flex-item-"+Se(i,/flex-|-self/g,"")+(Wa(i,/flex-|baseline/)?"":Ye+"grid-row-"+Se(i,/flex-|-self/g,""))+i;case 4675:return Oe+i+Ye+"flex-line-pack"+Se(i,/align-content|flex-|-self/g,"")+i;case 5548:return Oe+i+Ye+Se(i,"shrink","negative")+i;case 5292:return Oe+i+Ye+Se(i,"basis","preferred-size")+i;case 6060:return Oe+"box-"+Se(i,"-grow","")+Oe+i+Ye+Se(i,"grow","positive")+i;case 4554:return Oe+Se(i,/([^-])(transform)/g,"$1"+Oe+"$2")+i;case 6187:return Se(Se(Se(i,/(zoom-|grab)/,Oe+"$1"),/(image-set)/,Oe+"$1"),i,"")+i;case 5495:case 3959:return Se(i,/(image-set\([^]*)/,Oe+"$1$`$1");case 4968:return Se(Se(i,/(.+:)(flex-)?(.*)/,Oe+"box-pack:$3"+Ye+"flex-pack:$3"),/space-between/,"justify")+Oe+i+i;case 4200:if(!Wa(i,/flex-|baseline/))return Ye+"grid-column-align"+el(i,s)+i;break;case 2592:case 3360:return Ye+Se(i,"template-","")+i;case 4384:case 3616:return f&&f.some(function(c,h){return s=h,Wa(c.props,/grid-\w+-end/)})?~zo(i+(f=f[s].value),"span",0)?i:Ye+Se(i,"-start","")+i+Ye+"grid-row-span:"+(~zo(f,"span",0)?Wa(f,/\d+/):+Wa(f,/\d+/)-+Wa(i,/\d+/))+";":Ye+Se(i,"-start","")+i;case 4896:case 4128:return f&&f.some(function(c){return Wa(c.props,/grid-\w+-start/)})?i:Ye+Se(Se(i,"-end","-span"),"span ","")+i;case 4095:case 3583:case 4068:case 2532:return Se(i,/(.+)-inline(.+)/,Oe+"$1$2")+i;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(ga(i)-1-s>6)switch(ft(i,s+1)){case 109:if(ft(i,s+4)!==45)break;case 102:return Se(i,/(.+:)(.+)-([^]+)/,"$1"+Oe+"$2-$3$1"+Ki+(ft(i,s+3)==108?"$3":"$2-$3"))+i;case 115:return~zo(i,"stretch",0)?Uh(Se(i,"stretch","fill-available"),s,f)+i:i}break;case 5152:case 5920:return Se(i,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(c,h,x,A,Y,k,y){return Ye+h+":"+x+y+(A?Ye+h+"-span:"+(Y?k:+k-+x)+y:"")+i});case 4949:if(ft(i,s+6)===121)return Se(i,":",":"+Oe)+i;break;case 6444:switch(ft(i,ft(i,14)===45?18:11)){case 120:return Se(i,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Oe+(ft(i,14)===45?"inline-":"")+"box$3$1"+Oe+"$2$3$1"+Ye+"$2box$3")+i;case 100:return Se(i,":",":"+Ye)+i}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Se(i,"scroll-","scroll-snap-")+i}return i}function To(i,s){for(var f="",c=0;c<i.length;c++)f+=s(i[c],c,i,s)||"";return f}function Gy(i,s,f,c){switch(i.type){case Ty:if(i.children.length)break;case Ay:case Ey:case Uu:return i.return=i.return||i.value;case Dh:return"";case Oh:return i.return=i.value+"{"+To(i.children,c)+"}";case Oo:if(!ga(i.value=i.props.join(",")))return""}return ga(f=To(i.children,c))?i.return=i.value+"{"+f+"}":""}function Yy(i){var s=Rh(i);return function(f,c,h,x){for(var A="",Y=0;Y<s;Y++)A+=i[Y](f,c,h,x)||"";return A}}function Xy(i){return function(s){s.root||(s=s.return)&&i(s)}}function Iy(i,s,f,c){if(i.length>-1&&!i.return)switch(i.type){case Uu:i.return=Uh(i.value,i.length,f);return;case Oh:return To([jn(i,{value:Se(i.value,"@","@"+Oe)})],c);case Oo:if(i.length)return ky(f=i.props,function(h){switch(Wa(h,c=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Ll(jn(i,{props:[Se(h,/:(read-\w+)/,":"+Ki+"$1")]})),Ll(jn(i,{props:[h]})),Eu(i,{props:Jp(f,c)});break;case"::placeholder":Ll(jn(i,{props:[Se(h,/:(plac\w+)/,":"+Oe+"input-$1")]})),Ll(jn(i,{props:[Se(h,/:(plac\w+)/,":"+Ki+"$1")]})),Ll(jn(i,{props:[Se(h,/:(plac\w+)/,Ye+"input-$1")]})),Ll(jn(i,{props:[h]})),Eu(i,{props:Jp(f,c)});break}return""})}}var Qy={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},It={},Vl=typeof process<"u"&&It!==void 0&&(It.REACT_APP_SC_ATTR||It.SC_ATTR)||"data-styled",Nh="active",Lh="data-styled-version",Ho="6.3.8",Lu=`/*!sc*/
`,jo=typeof window<"u"&&typeof document<"u",Pa=ct.createContext===void 0,Vy=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&It!==void 0&&It.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&It.REACT_APP_SC_DISABLE_SPEEDY!==""?It.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&It.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&It!==void 0&&It.SC_DISABLE_SPEEDY!==void 0&&It.SC_DISABLE_SPEEDY!==""&&It.SC_DISABLE_SPEEDY!=="false"&&It.SC_DISABLE_SPEEDY),Zy={},Uo=Object.freeze([]),Zl=Object.freeze({});function Gh(i,s,f){return f===void 0&&(f=Zl),i.theme!==f.theme&&i.theme||s||f.theme}var Yh=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]),Ky=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,$y=/(^-|-$)/g;function Pp(i){return i.replace(Ky,"-").replace($y,"")}var Jy=/(a)(d)/gi,eh=function(i){return String.fromCharCode(i+(i>25?39:97))};function ju(i){var s,f="";for(s=Math.abs(i);s>52;s=s/52|0)f=eh(s%52)+f;return(eh(s%52)+f).replace(Jy,"$1-$2")}var ru,Gl=function(i,s){for(var f=s.length;f;)i=33*i^s.charCodeAt(--f);return i},Xh=function(i){return Gl(5381,i)};function Gu(i){return ju(Xh(i)>>>0)}function Wy(i){return i.displayName||i.name||"Component"}function ou(i){return typeof i=="string"&&!0}var Ih=typeof Symbol=="function"&&Symbol.for,Qh=Ih?Symbol.for("react.memo"):60115,Fy=Ih?Symbol.for("react.forward_ref"):60112,Py={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},e1={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Vh={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},t1=((ru={})[Fy]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},ru[Qh]=Vh,ru);function th(i){return("type"in(s=i)&&s.type.$$typeof)===Qh?Vh:"$$typeof"in i?t1[i.$$typeof]:Py;var s}var a1=Object.defineProperty,n1=Object.getOwnPropertyNames,ah=Object.getOwnPropertySymbols,l1=Object.getOwnPropertyDescriptor,i1=Object.getPrototypeOf,nh=Object.prototype;function Zh(i,s,f){if(typeof s!="string"){if(nh){var c=i1(s);c&&c!==nh&&Zh(i,c,f)}var h=n1(s);ah&&(h=h.concat(ah(s)));for(var x=th(i),A=th(s),Y=0;Y<h.length;++Y){var k=h[Y];if(!(k in e1||f&&f[k]||A&&k in A||x&&k in x)){var y=l1(s,k);try{a1(i,k,y)}catch{}}}}return i}function Kl(i){return typeof i=="function"}function Yu(i){return typeof i=="object"&&"styledComponentId"in i}function Jn(i,s){return i&&s?"".concat(i," ").concat(s):i||s||""}function ko(i,s){if(i.length===0)return"";for(var f=i[0],c=1;c<i.length;c++)f+=i[c];return f}function Wi(i){return i!==null&&typeof i=="object"&&i.constructor.name===Object.name&&!("props"in i&&i.$$typeof)}function ku(i,s,f){if(f===void 0&&(f=!1),!f&&!Wi(i)&&!Array.isArray(i))return s;if(Array.isArray(s))for(var c=0;c<s.length;c++)i[c]=ku(i[c],s[c]);else if(Wi(s))for(var c in s)i[c]=ku(i[c],s[c]);return i}function Xu(i,s){Object.defineProperty(i,"toString",{value:s})}function Fi(i){for(var s=[],f=1;f<arguments.length;f++)s[f-1]=arguments[f];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(i," for more information.").concat(s.length>0?" Args: ".concat(s.join(", ")):""))}var r1=(function(){function i(s){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=s}return i.prototype.indexOfGroup=function(s){for(var f=0,c=0;c<s;c++)f+=this.groupSizes[c];return f},i.prototype.insertRules=function(s,f){if(s>=this.groupSizes.length){for(var c=this.groupSizes,h=c.length,x=h;s>=x;)if((x<<=1)<0)throw Fi(16,"".concat(s));this.groupSizes=new Uint32Array(x),this.groupSizes.set(c),this.length=x;for(var A=h;A<x;A++)this.groupSizes[A]=0}for(var Y=this.indexOfGroup(s+1),k=(A=0,f.length);A<k;A++)this.tag.insertRule(Y,f[A])&&(this.groupSizes[s]++,Y++)},i.prototype.clearGroup=function(s){if(s<this.length){var f=this.groupSizes[s],c=this.indexOfGroup(s),h=c+f;this.groupSizes[s]=0;for(var x=c;x<h;x++)this.tag.deleteRule(c)}},i.prototype.getGroup=function(s){var f="";if(s>=this.length||this.groupSizes[s]===0)return f;for(var c=this.groupSizes[s],h=this.indexOfGroup(s),x=h+c,A=h;A<x;A++)f+="".concat(this.tag.getRule(A)).concat(Lu);return f},i})(),Ao=new Map,Co=new Map,Eo=1,Yl=function(i){if(Ao.has(i))return Ao.get(i);for(;Co.has(Eo);)Eo++;var s=Eo++;return Ao.set(i,s),Co.set(s,i),s},o1=function(i,s){Eo=s+1,Ao.set(i,s),Co.set(s,i)},s1="style[".concat(Vl,"][").concat(Lh,'="').concat(Ho,'"]'),c1=new RegExp("^".concat(Vl,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),u1=function(i,s,f){for(var c,h=f.split(","),x=0,A=h.length;x<A;x++)(c=h[x])&&i.registerName(s,c)},f1=function(i,s){for(var f,c=((f=s.textContent)!==null&&f!==void 0?f:"").split(Lu),h=[],x=0,A=c.length;x<A;x++){var Y=c[x].trim();if(Y){var k=Y.match(c1);if(k){var y=0|parseInt(k[1],10),_=k[2];y!==0&&(o1(_,y),u1(i,_,k[3]),i.getTag().insertRules(y,h)),h.length=0}else h.push(Y)}}},lh=function(i){for(var s=document.querySelectorAll(s1),f=0,c=s.length;f<c;f++){var h=s[f];h&&h.getAttribute(Vl)!==Nh&&(f1(i,h),h.parentNode&&h.parentNode.removeChild(h))}};function d1(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var Kh=function(i){var s=document.head,f=i||s,c=document.createElement("style"),h=(function(Y){var k=Array.from(Y.querySelectorAll("style[".concat(Vl,"]")));return k[k.length-1]})(f),x=h!==void 0?h.nextSibling:null;c.setAttribute(Vl,Nh),c.setAttribute(Lh,Ho);var A=d1();return A&&c.setAttribute("nonce",A),f.insertBefore(c,x),c},p1=(function(){function i(s){this.element=Kh(s),this.element.appendChild(document.createTextNode("")),this.sheet=(function(f){if(f.sheet)return f.sheet;for(var c=document.styleSheets,h=0,x=c.length;h<x;h++){var A=c[h];if(A.ownerNode===f)return A}throw Fi(17)})(this.element),this.length=0}return i.prototype.insertRule=function(s,f){try{return this.sheet.insertRule(f,s),this.length++,!0}catch{return!1}},i.prototype.deleteRule=function(s){this.sheet.deleteRule(s),this.length--},i.prototype.getRule=function(s){var f=this.sheet.cssRules[s];return f&&f.cssText?f.cssText:""},i})(),h1=(function(){function i(s){this.element=Kh(s),this.nodes=this.element.childNodes,this.length=0}return i.prototype.insertRule=function(s,f){if(s<=this.length&&s>=0){var c=document.createTextNode(f);return this.element.insertBefore(c,this.nodes[s]||null),this.length++,!0}return!1},i.prototype.deleteRule=function(s){this.element.removeChild(this.nodes[s]),this.length--},i.prototype.getRule=function(s){return s<this.length?this.nodes[s].textContent:""},i})(),m1=(function(){function i(s){this.rules=[],this.length=0}return i.prototype.insertRule=function(s,f){return s<=this.length&&(this.rules.splice(s,0,f),this.length++,!0)},i.prototype.deleteRule=function(s){this.rules.splice(s,1),this.length--},i.prototype.getRule=function(s){return s<this.length?this.rules[s]:""},i})(),ih=jo,g1={isServer:!jo,useCSSOMInjection:!Vy},Do=(function(){function i(s,f,c){s===void 0&&(s=Zl),f===void 0&&(f={});var h=this;this.options=_t(_t({},g1),s),this.gs=f,this.names=new Map(c),this.server=!!s.isServer,!this.server&&jo&&ih&&(ih=!1,lh(this)),Xu(this,function(){return(function(x){for(var A=x.getTag(),Y=A.length,k="",y=function(C){var V=(function(le){return Co.get(le)})(C);if(V===void 0)return"continue";var H=x.names.get(V),U=A.getGroup(C);if(H===void 0||!H.size||U.length===0)return"continue";var P="".concat(Vl,".g").concat(C,'[id="').concat(V,'"]'),J="";H!==void 0&&H.forEach(function(le){le.length>0&&(J+="".concat(le,","))}),k+="".concat(U).concat(P,'{content:"').concat(J,'"}').concat(Lu)},_=0;_<Y;_++)y(_);return k})(h)})}return i.registerId=function(s){return Yl(s)},i.prototype.rehydrate=function(){!this.server&&jo&&lh(this)},i.prototype.reconstructWithOptions=function(s,f){return f===void 0&&(f=!0),new i(_t(_t({},this.options),s),this.gs,f&&this.names||void 0)},i.prototype.allocateGSInstance=function(s){return this.gs[s]=(this.gs[s]||0)+1},i.prototype.getTag=function(){return this.tag||(this.tag=(s=(function(f){var c=f.useCSSOMInjection,h=f.target;return f.isServer?new m1(h):c?new p1(h):new h1(h)})(this.options),new r1(s)));var s},i.prototype.hasNameForId=function(s,f){return this.names.has(s)&&this.names.get(s).has(f)},i.prototype.registerName=function(s,f){if(Yl(s),this.names.has(s))this.names.get(s).add(f);else{var c=new Set;c.add(f),this.names.set(s,c)}},i.prototype.insertRules=function(s,f,c){this.registerName(s,f),this.getTag().insertRules(Yl(s),c)},i.prototype.clearNames=function(s){this.names.has(s)&&this.names.get(s).clear()},i.prototype.clearRules=function(s){this.getTag().clearGroup(Yl(s)),this.clearNames(s)},i.prototype.clearTag=function(){this.tag=void 0},i})(),y1=/&/g,Xl=47;function rh(i){if(i.indexOf("}")===-1)return!1;for(var s=i.length,f=0,c=0,h=!1,x=0;x<s;x++){var A=i.charCodeAt(x);if(c!==0||h||A!==Xl||i.charCodeAt(x+1)!==42)if(h)A===42&&i.charCodeAt(x+1)===Xl&&(h=!1,x++);else if(A!==34&&A!==39||x!==0&&i.charCodeAt(x-1)===92){if(c===0){if(A===123)f++;else if(A===125&&--f<0)return!0}}else c===0?c=A:c===A&&(c=0);else h=!0,x++}return f!==0||c!==0}function $h(i,s){return i.map(function(f){return f.type==="rule"&&(f.value="".concat(s," ").concat(f.value),f.value=f.value.replaceAll(",",",".concat(s," ")),f.props=f.props.map(function(c){return"".concat(s," ").concat(c)})),Array.isArray(f.children)&&f.type!=="@keyframes"&&(f.children=$h(f.children,s)),f})}function x1(i){var s,f,c,h=Zl,x=h.options,A=x===void 0?Zl:x,Y=h.plugins,k=Y===void 0?Uo:Y,y=function(V,H,U){return U.startsWith(f)&&U.endsWith(f)&&U.replaceAll(f,"").length>0?".".concat(s):V},_=k.slice();_.push(function(V){V.type===Oo&&V.value.includes("&")&&(V.props[0]=V.props[0].replace(y1,f).replace(c,y))}),A.prefix&&_.push(Iy),_.push(Gy);var C=function(V,H,U,P){H===void 0&&(H=""),U===void 0&&(U=""),P===void 0&&(P="&"),s=P,f=H,c=new RegExp("\\".concat(f,"\\b"),"g");var J=(function(Z){if(!rh(Z))return Z;for(var ae=Z.length,te="",ee=0,q=0,fe=0,xe=!1,me=0;me<ae;me++){var Ee=Z.charCodeAt(me);if(fe!==0||xe||Ee!==Xl||Z.charCodeAt(me+1)!==42)if(xe)Ee===42&&Z.charCodeAt(me+1)===Xl&&(xe=!1,me++);else if(Ee!==34&&Ee!==39||me!==0&&Z.charCodeAt(me-1)===92){if(fe===0)if(Ee===123)q++;else if(Ee===125){if(--q<0){for(var we=me+1;we<ae;){var Ve=Z.charCodeAt(we);if(Ve===59||Ve===10)break;we++}we<ae&&Z.charCodeAt(we)===59&&we++,q=0,me=we-1,ee=we;continue}q===0&&(te+=Z.substring(ee,me+1),ee=me+1)}else Ee===59&&q===0&&(te+=Z.substring(ee,me+1),ee=me+1)}else fe===0?fe=Ee:fe===Ee&&(fe=0);else xe=!0,me++}if(ee<ae){var $e=Z.substring(ee);rh($e)||(te+=$e)}return te})((function(Z){if(Z.indexOf("//")===-1)return Z;for(var ae=Z.length,te=[],ee=0,q=0,fe=0,xe=0;q<ae;){var me=Z.charCodeAt(q);if(me!==34&&me!==39||q!==0&&Z.charCodeAt(q-1)===92)if(fe===0)if(me===40&&q>=3&&(32|Z.charCodeAt(q-1))==108&&(32|Z.charCodeAt(q-2))==114&&(32|Z.charCodeAt(q-3))==117)xe=1,q++;else if(xe>0)me===41?xe--:me===40&&xe++,q++;else if(me===Xl&&q+1<ae&&Z.charCodeAt(q+1)===Xl){for(q>ee&&te.push(Z.substring(ee,q));q<ae&&Z.charCodeAt(q)!==10;)q++;ee=q}else q++;else q++;else fe===0?fe=me:fe===me&&(fe=0),q++}return ee===0?Z:(ee<ae&&te.push(Z.substring(ee)),te.join(""))})(V)),le=Ny(U||H?"".concat(U," ").concat(H," { ").concat(J," }"):J);A.namespace&&(le=$h(le,A.namespace));var he=[];return To(le,Yy(_.concat(Xy(function(Z){return he.push(Z)})))),he};return C.hash=k.length?k.reduce(function(V,H){return H.name||Fi(15),Gl(V,H.name)},5381).toString():"",C}var v1=new Do,Cu=x1(),Du={shouldForwardProp:void 0,styleSheet:v1,stylis:Cu},Jh=Pa?{Provider:function(i){return i.children},Consumer:function(i){return(0,i.children)(Du)}}:ct.createContext(Du);Jh.Consumer;Pa||ct.createContext(void 0);function Ou(){return Pa?Du:ct.useContext(Jh)}var Wh=(function(){function i(s,f){var c=this;this.inject=function(h,x){x===void 0&&(x=Cu);var A=c.name+x.hash;h.hasNameForId(c.id,A)||h.insertRules(c.id,A,x(c.rules,A,"@keyframes"))},this.name=s,this.id="sc-keyframes-".concat(s),this.rules=f,Xu(this,function(){throw Fi(12,String(c.name))})}return i.prototype.getName=function(s){return s===void 0&&(s=Cu),this.name+s.hash},i})();function b1(i,s){return s==null||typeof s=="boolean"||s===""?"":typeof s!="number"||s===0||i in Qy||i.startsWith("--")?String(s).trim():"".concat(s,"px")}var S1=function(i){return i>="A"&&i<="Z"};function oh(i){for(var s="",f=0;f<i.length;f++){var c=i[f];if(f===1&&c==="-"&&i[0]==="-")return i;S1(c)?s+="-"+c.toLowerCase():s+=c}return s.startsWith("ms-")?"-"+s:s}var Fh=function(i){return i==null||i===!1||i===""},Ph=function(i){var s=[];for(var f in i){var c=i[f];i.hasOwnProperty(f)&&!Fh(c)&&(Array.isArray(c)&&c.isCss||Kl(c)?s.push("".concat(oh(f),":"),c,";"):Wi(c)?s.push.apply(s,Il(Il(["".concat(f," {")],Ph(c),!1),["}"],!1)):s.push("".concat(oh(f),": ").concat(b1(f,c),";")))}return s};function Cn(i,s,f,c){if(Fh(i))return[];if(Yu(i))return[".".concat(i.styledComponentId)];if(Kl(i)){if(!Kl(x=i)||x.prototype&&x.prototype.isReactComponent||!s)return[i];var h=i(s);return Cn(h,s,f,c)}var x;return i instanceof Wh?f?(i.inject(f,c),[i.getName(c)]):[i]:Wi(i)?Ph(i):Array.isArray(i)?Array.prototype.concat.apply(Uo,i.map(function(A){return Cn(A,s,f,c)})):[i.toString()]}function em(i){for(var s=0;s<i.length;s+=1){var f=i[s];if(Kl(f)&&!Yu(f))return!1}return!0}var w1=Xh(Ho),z1=(function(){function i(s,f,c){this.rules=s,this.staticRulesId="",this.isStatic=(c===void 0||c.isStatic)&&em(s),this.componentId=f,this.baseHash=Gl(w1,f),this.baseStyle=c,Do.registerId(f)}return i.prototype.generateAndInjectStyles=function(s,f,c){var h=this.baseStyle?this.baseStyle.generateAndInjectStyles(s,f,c).className:"";if(this.isStatic&&!c.hash)if(this.staticRulesId&&f.hasNameForId(this.componentId,this.staticRulesId))h=Jn(h,this.staticRulesId);else{var x=ko(Cn(this.rules,s,f,c)),A=ju(Gl(this.baseHash,x)>>>0);if(!f.hasNameForId(this.componentId,A)){var Y=c(x,".".concat(A),void 0,this.componentId);f.insertRules(this.componentId,A,Y)}h=Jn(h,A),this.staticRulesId=A}else{for(var k=Gl(this.baseHash,c.hash),y="",_=0;_<this.rules.length;_++){var C=this.rules[_];if(typeof C=="string")y+=C;else if(C){var V=ko(Cn(C,s,f,c));k=Gl(k,V+_),y+=V}}if(y){var H=ju(k>>>0);if(!f.hasNameForId(this.componentId,H)){var U=c(y,".".concat(H),void 0,this.componentId);f.insertRules(this.componentId,H,U)}h=Jn(h,H)}}return{className:h,css:typeof window>"u"?f.getTag().getGroup(Yl(this.componentId)):""}},i})(),Iu=Pa?{Provider:function(i){return i.children},Consumer:function(i){return(0,i.children)(void 0)}}:ct.createContext(void 0);Iu.Consumer;var su={};function _1(i,s,f){var c=Yu(i),h=i,x=!ou(i),A=s.attrs,Y=A===void 0?Uo:A,k=s.componentId,y=k===void 0?(function(ae,te){var ee=typeof ae!="string"?"sc":Pp(ae);su[ee]=(su[ee]||0)+1;var q="".concat(ee,"-").concat(Gu(Ho+ee+su[ee]));return te?"".concat(te,"-").concat(q):q})(s.displayName,s.parentComponentId):k,_=s.displayName,C=_===void 0?(function(ae){return ou(ae)?"styled.".concat(ae):"Styled(".concat(Wy(ae),")")})(i):_,V=s.displayName&&s.componentId?"".concat(Pp(s.displayName),"-").concat(s.componentId):s.componentId||y,H=c&&h.attrs?h.attrs.concat(Y).filter(Boolean):Y,U=s.shouldForwardProp;if(c&&h.shouldForwardProp){var P=h.shouldForwardProp;if(s.shouldForwardProp){var J=s.shouldForwardProp;U=function(ae,te){return P(ae,te)&&J(ae,te)}}else U=P}var le=new z1(f,V,c?h.componentStyle:void 0);function he(ae,te){return(function(ee,q,fe){var xe=ee.attrs,me=ee.componentStyle,Ee=ee.defaultProps,we=ee.foldedComponentIds,Ve=ee.styledComponentId,$e=ee.target,Pe=Pa?void 0:ct.useContext(Iu),R=Ou(),W=ee.shouldForwardProp||R.shouldForwardProp,v=Gh(q,Pe,Ee)||Zl,S=(function(Q,$,ce){for(var ge,de=_t(_t({},$),{className:void 0,theme:ce}),K=0;K<Q.length;K+=1){var oe=Kl(ge=Q[K])?ge(de):ge;for(var je in oe)je==="className"?de.className=Jn(de.className,oe[je]):je==="style"?de.style=_t(_t({},de.style),oe[je]):de[je]=oe[je]}return"className"in $&&typeof $.className=="string"&&(de.className=Jn(de.className,$.className)),de})(xe,q,v),m=S.as||$e,p={};for(var b in S)S[b]===void 0||b[0]==="$"||b==="as"||b==="theme"&&S.theme===v||(b==="forwardedAs"?p.as=S.forwardedAs:W&&!W(b,m)||(p[b]=S[b]));var E=(function(Q,$){var ce=Ou(),ge=Q.generateAndInjectStyles($,ce.styleSheet,ce.stylis);return ge})(me,S),O=E.className,N=E.css,I=Jn(we,Ve);O&&(I+=" "+O),S.className&&(I+=" "+S.className),p[ou(m)&&!Yh.has(m)?"class":"className"]=I,fe&&(p.ref=fe);var F=re.createElement(m,p);return Pa&&N?ct.createElement(ct.Fragment,null,ct.createElement("style",{precedence:"styled-components",href:"sc-".concat(Ve,"-").concat(O),children:N}),F):F})(Z,ae,te)}he.displayName=C;var Z=ct.forwardRef(he);return Z.attrs=H,Z.componentStyle=le,Z.displayName=C,Z.shouldForwardProp=U,Z.foldedComponentIds=c?Jn(h.foldedComponentIds,h.styledComponentId):"",Z.styledComponentId=V,Z.target=c?h.target:i,Object.defineProperty(Z,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(ae){this._foldedDefaultProps=c?(function(te){for(var ee=[],q=1;q<arguments.length;q++)ee[q-1]=arguments[q];for(var fe=0,xe=ee;fe<xe.length;fe++)ku(te,xe[fe],!0);return te})({},h.defaultProps,ae):ae}}),Xu(Z,function(){return".".concat(Z.styledComponentId)}),x&&Zh(Z,i,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),Z}function sh(i,s){for(var f=[i[0]],c=0,h=s.length;c<h;c+=1)f.push(s[c],i[c+1]);return f}var ch=function(i){return Object.assign(i,{isCss:!0})};function Qu(i){for(var s=[],f=1;f<arguments.length;f++)s[f-1]=arguments[f];if(Kl(i)||Wi(i))return ch(Cn(sh(Uo,Il([i],s,!0))));var c=i;return s.length===0&&c.length===1&&typeof c[0]=="string"?Cn(c):ch(Cn(sh(c,s)))}function Bu(i,s,f){if(f===void 0&&(f=Zl),!s)throw Fi(1,s);var c=function(h){for(var x=[],A=1;A<arguments.length;A++)x[A-1]=arguments[A];return i(s,f,Qu.apply(void 0,Il([h],x,!1)))};return c.attrs=function(h){return Bu(i,s,_t(_t({},f),{attrs:Array.prototype.concat(f.attrs,h).filter(Boolean)}))},c.withConfig=function(h){return Bu(i,s,_t(_t({},f),h))},c}var tm=function(i){return Bu(_1,i)},z=tm;Yh.forEach(function(i){z[i]=tm(i)});var M1=(function(){function i(s,f){this.rules=s,this.componentId=f,this.isStatic=em(s),Do.registerId(this.componentId+1)}return i.prototype.createStyles=function(s,f,c,h){var x=h(ko(Cn(this.rules,f,c,h)),""),A=this.componentId+s;c.insertRules(A,A,x)},i.prototype.removeStyles=function(s,f){f.clearRules(this.componentId+s)},i.prototype.renderStyles=function(s,f,c,h){s>2&&Do.registerId(this.componentId+s);var x=this.componentId+s;this.isStatic?c.hasNameForId(x,x)||this.createStyles(s,f,c,h):(this.removeStyles(s,c),this.createStyles(s,f,c,h))},i})();function A1(i){for(var s=[],f=1;f<arguments.length;f++)s[f-1]=arguments[f];var c=Qu.apply(void 0,Il([i],s,!1)),h="sc-global-".concat(Gu(JSON.stringify(c))),x=new M1(c,h),A=new WeakMap,Y=function(k){var y=Ou(),_=Pa?void 0:ct.useContext(Iu),C=A.get(y.styleSheet);if(C===void 0&&(C=y.styleSheet.allocateGSInstance(h),A.set(y.styleSheet,C)),(typeof window>"u"||!y.styleSheet.server)&&(function(J,le,he,Z,ae){if(x.isStatic)x.renderStyles(J,Zy,he,ae);else{var te=_t(_t({},le),{theme:Gh(le,Z,Y.defaultProps)});x.renderStyles(J,te,he,ae)}})(C,k,y.styleSheet,_,y.stylis),!Pa){var V=ct.useRef(!0);ct.useLayoutEffect(function(){return V.current=!1,function(){V.current=!0,queueMicrotask(function(){V.current&&(x.removeStyles(C,y.styleSheet),typeof document<"u"&&document.querySelectorAll('style[data-styled-global="'.concat(h,'"]')).forEach(function(J){return J.remove()}))})}},[C,y.styleSheet])}if(Pa){var H=h+C,U=typeof window>"u"?y.styleSheet.getTag().getGroup(Yl(H)):"";if(U){var P="".concat(h,"-").concat(C);return ct.createElement("style",{key:P,"data-styled-global":h,precedence:"styled-components",href:P,children:U})}}return null};return ct.memo(Y)}function am(i){for(var s=[],f=1;f<arguments.length;f++)s[f-1]=arguments[f];var c=ko(Qu.apply(void 0,Il([i],s,!1))),h=Gu(c);return new Wh(h,c)}const E1=A1`
  :root {
    --bg-color: #000000;
    --primary-color: #ffd700;
    --secondary-color: #c0c0c0;
    --text-color: #ffffff;
    --accent-color: #ff4500;
    --panel-bg: rgba(30, 30, 30, 0.85);
    --border-color: #444;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  canvas {
    display: block;
    image-rendering: pixelated;
  }
`,T1="modulepreload",j1=function(i){return"/Void-Walker/"+i},uh={},k1=function(s,f,c){let h=Promise.resolve();if(f&&f.length>0){let k=function(y){return Promise.all(y.map(_=>Promise.resolve(_).then(C=>({status:"fulfilled",value:C}),C=>({status:"rejected",reason:C}))))};document.getElementsByTagName("link");const A=document.querySelector("meta[property=csp-nonce]"),Y=A?.nonce||A?.getAttribute("nonce");h=k(f.map(y=>{if(y=j1(y),y in uh)return;uh[y]=!0;const _=y.endsWith(".css"),C=_?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${C}`))return;const V=document.createElement("link");if(V.rel=_?"stylesheet":T1,_||(V.as="script"),V.crossOrigin="",V.href=y,Y&&V.setAttribute("nonce",Y),document.head.appendChild(V),_)return new Promise((H,U)=>{V.addEventListener("load",H),V.addEventListener("error",()=>U(new Error(`Unable to preload CSS for ${y}`)))})}))}function x(A){const Y=new Event("vite:preloadError",{cancelable:!0});if(Y.payload=A,window.dispatchEvent(Y),!Y.defaultPrevented)throw A}return h.then(A=>{for(const Y of A||[])Y.status==="rejected"&&x(Y.reason);return s().catch(x)})},qu={critDamage:0,attackSpeed:0,maxHpBonus:0,defenseBonus:0,hpRegen:0,expBonus:0,dropRate:0,goldBonus:0,moveSpeed:0},nm=[{id:"critDamage",name:"Crit Damage",category:"combat",description:"Increases extra damage dealt on critical hits.",maxLevel:20,effectPerLevel:10,effectUnit:"%"},{id:"attackSpeed",name:"Attack Speed",category:"combat",description:"Decreases attack cooldown.",maxLevel:20,effectPerLevel:4,effectUnit:"%"},{id:"maxHpBonus",name:"Max HP",category:"survival",description:"Increases maximum Health Points.",maxLevel:30,effectPerLevel:100,effectUnit:"HP"},{id:"defenseBonus",name:"Defense",category:"survival",description:"Increases defense by a percentage.",maxLevel:20,effectPerLevel:5,effectUnit:"%"},{id:"hpRegen",name:"HP Regen",category:"survival",description:"Increases health regeneration per second.",maxLevel:20,effectPerLevel:1,effectUnit:"HP/s"},{id:"expBonus",name:"EXP Bonus",category:"utility",description:"Increases experience gains.",maxLevel:20,effectPerLevel:10,effectUnit:"%"},{id:"dropRate",name:"Drop Rate",category:"utility",description:"Increases item drop probability.",maxLevel:20,effectPerLevel:10,effectUnit:"%"},{id:"goldBonus",name:"Gold Bonus",category:"utility",description:"Increases gold gains.",maxLevel:20,effectPerLevel:15,effectUnit:"%"},{id:"moveSpeed",name:"Move Speed",category:"utility",description:"Increases character movement speed.",maxLevel:10,effectPerLevel:8,effectUnit:"%"}],C1=i=>nm.filter(s=>s.category===i);function la(i,s,f,c,h){const{str:x=1,dex:A=1,int:Y=1,vit:k=1,def:y=1}=i;let _=10+x*6+f*4,C=10+y*4+f*.5,V=100+k*150+f*60,H=50+Y*25+f*2,U=200+A*5;if(s.weapon&&(_+=s.weapon.atk||0),s.armor&&(C+=s.armor.def||0),s.helmet&&(C+=s.helmet.def||0),s.weapon?.enhanceLevel){const P=(s.weapon.atk||0)*s.weapon.enhanceLevel*.1;_+=P}if(s.armor?.enhanceLevel){const P=(s.armor.def||0)*s.armor.enhanceLevel*.1;C+=P}if(s.helmet?.enhanceLevel){const P=(s.helmet.def||0)*s.helmet.enhanceLevel*.1;C+=P}if(h){V+=h.maxHpBonus*100;const P=1+h.defenseBonus*.05;C=Math.floor(C*P);const J=1+h.moveSpeed*.08;U=Math.floor(U*J)}return c?.startsWith("proxima_")&&(U*=1.2),{atk:_,def:C,maxHp:V,maxMp:H,speed:U}}const Yi={player:{id:"player",position:{x:650,y:450},velocity:{x:0,y:0},size:{x:128,y:128},level:1,exp:0,maxExp:100,statPoints:0,stats:{str:1,dex:1,int:1,vit:1,def:1},equipment:{weapon:null,armor:null,helmet:null},...la({str:1,dex:1,int:1,vit:1,def:1},{weapon:null,armor:null,helmet:null},1,"town",qu),hp:290,mp:77,attack:{isAttacking:!1,angle:0,targetAngle:0,progress:0,hitEnemies:[]},direction:0,lastDamageTime:0,inventory:[{itemId:"basic_sword",quantity:1}],gold:0,acquiredEquipment:["basic_sword"],moveSpeedMultiplier:1,slowEndTime:0,skillPoints:0,skills:{critDamage:0,attackSpeed:0,maxHpBonus:0,defenseBonus:0,hpRegen:0,expBonus:0,dropRate:0,goldBonus:0,moveSpeed:0},defeatedBosses:[]},enemies:[],droppedItems:[],damageNumbers:[],glacierFalls:[],orbitalLasers:[],currentMapId:"town",bestiary:{},lastUpdate:Date.now(),activeUI:"None",currentDialog:null,quickBar:[null,null,null,null,null],settings:{showRange:!0,showHitbox:!0,cooldownVisualMode:1,playerStyle:4,showCoordinates:!0},toasts:[],lastBossKillTime:0,lastSpawnTime:0,respawnQueue:[]},Pn={town:{id:"town",name:"Peaceful Village",bgColor:"#1a2a1a",canSpawnMonsters:!1,portals:[{id:"t-to-m",x:1190,y:960/2-50,width:40,height:100,targetMapId:"meadow",targetX:100,targetY:960/2},{id:"t-to-ss",x:20,y:960/2-50,width:40,height:100,targetMapId:"star_station",targetX:1130,targetY:960/2}],npcs:[{id:"merchant_town",name:"Merchant",type:"Merchant",position:{x:250,y:300},size:{x:220,y:270},nameOffset:{x:-5,y:-80},velocity:{x:0,y:0},speed:0,shopItems:["iron_sword","red_potion","blue_potion","old_armor","leather_cap","iron_helmet","return_scroll"]},{id:"blacksmith_town",name:"Blacksmith",type:"Blacksmith",position:{x:400,y:300},size:{x:250,y:300},nameOffset:{x:5,y:-90},velocity:{x:0,y:0},speed:0},{id:"village_head",name:"Village Head",type:"Quest",position:{x:550,y:250},size:{x:250,y:270},nameOffset:{x:0,y:-100},velocity:{x:0,y:0},speed:0,spriteUrl:"assets/Npc/village_head.png",dialogues:["Welcome to our peaceful village.","The world outside has become quite dangerous lately.","If you need anything, please talk to the merchants.","Good luck on your journey, traveler."]},{id:"town_cat",name:"Town Cat",type:"Quest",position:{x:700,y:300},size:{x:128,y:128},nameOffset:{x:0,y:-40},velocity:{x:0,y:0},spriteUrl:"assets/Npc/town_cat.png",speed:0,dialogues:["Meow...","(The cat seems to be enjoying the sunlight.)","Purr...","Meow! (It wants a treats?)"]},{id:"town_sign",name:"Town Sign",type:"Quest",position:{x:900,y:350},size:{x:128,y:128},nameOffset:{x:0,y:-60},velocity:{x:0,y:0},speed:0,dialogueMode:"sequential",dialogues:["Welcome to Peaceful Village.","East: Slime Grasslands","West: Star Station"]}],fixedSpawns:[{monsterId:"training_dummy",x:895,y:200},{monsterId:"training_dummy",x:1025,y:200}]},meadow:{id:"meadow",name:"Slime Grasslands",bgColor:"#111811",canSpawnMonsters:!0,spawnInterval:1,portals:[{id:"m-to-t",x:20,y:960/2-50,width:40,height:100,targetMapId:"town",targetX:1160,targetY:960/2},{id:"m-to-f",x:1280/2-50,y:20,width:100,height:40,targetMapId:"forest",targetX:1280/2,targetY:860}],npcs:[]},forest:{id:"forest",name:"Goblin Forest",bgColor:"#0d1a0d",canSpawnMonsters:!0,spawnInterval:1,portals:[{id:"f-to-m",x:1280/2-50,y:900,width:100,height:40,targetMapId:"meadow",targetX:1280/2,targetY:100},{id:"f-to-c",x:1220,y:960/2-50,width:40,height:100,targetMapId:"cave",targetX:100,targetY:960/2}],npcs:[]},cave:{id:"cave",name:"Dark Cave",bgColor:"#1a1a1a",canSpawnMonsters:!0,spawnInterval:.3,portals:[{id:"c-to-f",x:20,y:960/2-50,width:40,height:100,targetMapId:"forest",targetX:1160,targetY:960/2},{id:"c-to-fc",x:1220,y:960/2-50,width:40,height:100,targetMapId:"frozen_cliff",targetX:100,targetY:960/2}],npcs:[]},frozen_cliff:{id:"frozen_cliff",name:"Frozen Cliff",bgColor:"#e0f7fa",canSpawnMonsters:!0,spawnInterval:2,portals:[{id:"fc-to-c",x:20,y:960/2-50,width:40,height:100,targetMapId:"cave",targetX:1160,targetY:960/2},{id:"fc-to-ic",x:1280/2-50,y:20,width:100,height:40,targetMapId:"ice_cave",targetX:1280/2,targetY:860}],npcs:[]},ice_cave:{id:"ice_cave",name:"Ice Cave",bgColor:"#3e2723",canSpawnMonsters:!0,portals:[{id:"ic-to-fc",x:1280/2-50,y:900,width:100,height:40,targetMapId:"frozen_cliff",targetX:1280/2,targetY:100}],npcs:[]},star_station:{id:"star_station",name:"Stellar Station",bgColor:"#0a0a1a",canSpawnMonsters:!1,portals:[{id:"ss-to-t",x:1220,y:960/2-50,width:40,height:100,targetMapId:"town",targetX:150,targetY:960/2},{id:"ss-to-pl",x:590,y:20,width:100,height:60,targetMapId:"proxima_station",targetX:640,targetY:850,requiredBossId:"frost_dragon"},{id:"ss-to-aeth",x:590,y:900,width:100,height:60,targetMapId:"aetheria",targetX:640,targetY:850,requiredBossId:"luna_overseer"}],npcs:[{id:"exploration_spaceship",name:"Galactic Explorer",type:"Spaceship",position:{x:640,y:480},size:{x:120,y:160},velocity:{x:0,y:0},speed:0},{id:"station_guide",name:"Station Guide AI",type:"Guide",position:{x:800,y:480},size:{x:60,y:100},nameOffset:{x:0,y:-80},velocity:{x:0,y:0},speed:0}]},proxima_station:{id:"proxima_station",name:"Proxima Station",bgColor:"#050525",canSpawnMonsters:!1,portals:[{id:"ps-to-ss",x:590,y:900,width:100,height:60,targetMapId:"star_station",targetX:640,targetY:800},{id:"ps-to-pp",x:20,y:430,width:60,height:100,targetMapId:"proxima_plains",targetX:1100,targetY:480},{id:"ps-to-pr",x:1220,y:430,width:60,height:100,targetMapId:"proxima_ruins",targetX:100,targetY:480},{id:"ps-to-pv",x:590,y:20,width:100,height:60,targetMapId:"proxima_void",targetX:640,targetY:850}],npcs:[{id:"robot-rx7",name:"Exploration Robot RX-7",type:"Merchant",position:{x:640,y:480},size:{x:240,y:290},nameOffset:{x:0,y:-80},velocity:{x:0,y:0},speed:0,spriteUrl:"assets/Npc/Robot_RX7.png",shopItems:["pulse_blade","titanium_armor","luna_goggles","enhance_stone","red_potion","blue_potion"]}]},proxima_plains:{id:"proxima_plains",name:"Moon Plains",bgColor:"#02021a",canSpawnMonsters:!0,spawnInterval:1.5,portals:[{id:"pp-to-ps",x:1220,y:430,width:60,height:100,targetMapId:"proxima_station",targetX:100,targetY:480}],npcs:[]},proxima_ruins:{id:"proxima_ruins",name:"Lunar Ruins",bgColor:"#0a0a20",canSpawnMonsters:!0,spawnInterval:3,portals:[{id:"pr-to-ps",x:20,y:430,width:60,height:100,targetMapId:"proxima_station",targetX:1100,targetY:480},{id:"pr-to-pc",x:590,y:20,width:100,height:60,targetMapId:"proxima_core",targetX:640,targetY:850}],npcs:[]},proxima_void:{id:"proxima_void",name:"Lunar Void",bgColor:"#00000a",canSpawnMonsters:!0,spawnInterval:2,portals:[{id:"pv-to-ps",x:590,y:900,width:100,height:60,targetMapId:"proxima_station",targetX:640,targetY:100}],npcs:[]},proxima_core:{id:"proxima_core",name:"Lunar Core",bgColor:"#150015",canSpawnMonsters:!0,spawnInterval:2,portals:[{id:"pc-to-pr",x:590,y:900,width:100,height:60,targetMapId:"proxima_ruins",targetX:640,targetY:100}],npcs:[]},aetheria:{id:"aetheria",name:"Aetheria",bgColor:"#b3e5fc",canSpawnMonsters:!1,portals:[{id:"aeth-to-ss",x:1280/2-50,y:900,width:100,height:40,targetMapId:"star_station",targetX:640,targetY:600},{id:"aeth-to-upper",x:1280/2-50,y:20,width:100,height:40,targetMapId:"aetheria_upper",targetX:640,targetY:850},{id:"aeth-to-gardens",x:20,y:430,width:40,height:100,targetMapId:"sky_gardens",targetX:1200,targetY:480},{id:"aeth-to-workshop",x:1240,y:430,width:40,height:100,targetMapId:"wind_workshop",targetX:80,targetY:480}],npcs:[{id:"wind_merchant",name:"Wind Merchant",type:"Merchant",position:{x:640,y:400},size:{x:200,y:250},nameOffset:{x:0,y:-80},velocity:{x:0,y:0},speed:0,spriteUrl:"assets/Npc/WindMerchant.png",shopItems:["wind_blade","cloud_armor","wind_circlet","red_potion","blue_potion","wind_essence"],dialogues:["The winds are strong today.","Would you like to see my collection of rare items?","Safe travels through the clouds.","Come back anytime!","May the gale guide you."]},{id:"sky_sage",name:"Sky Sage",type:"Quest",position:{x:500,y:350},size:{x:180,y:220},nameOffset:{x:0,y:-90},velocity:{x:0,y:0},speed:0,spriteUrl:"assets/Npc/SkySage.png",dialogues:["Patience is the key to wisdom.","Aetheria holds many secrets.","Observe the stars, and you shall find the way.","The ancient architect left us a legacy.","Knowledge is power, young one.","Be careful in the Mystic Grove."]},{id:"crystal_researcher",name:"Crystal Researcher",type:"Quest",position:{x:780,y:380},size:{x:160,y:200},nameOffset:{x:0,y:-70},velocity:{x:0,y:0},speed:0,spriteUrl:"assets/Npc/CrystalResearcher.png",dialogues:["These crystals hum with an interesting frequency.","I need more samples from the forge.","Do you have any spare aether gems?","Nature and magic are one in this place.","Fascinating... simply fascinating."]}]},sky_gardens:{id:"sky_gardens",name:"Sky Gardens",bgColor:"#e8f5e8",canSpawnMonsters:!0,spawnInterval:10,portals:[{id:"sg-to-aeth",x:1240,y:430,width:40,height:100,targetMapId:"aetheria",targetX:80,targetY:480},{id:"sg-to-grove",x:590,y:20,width:100,height:40,targetMapId:"mystic_grove",targetX:640,targetY:880}],npcs:[],fixedSpawns:[{monsterId:"sky_wisp",x:300,y:300,level:110},{monsterId:"cloud_guardian",x:800,y:600,level:110}]},wind_workshop:{id:"wind_workshop",name:"Wind Workshop",bgColor:"#f0f4f8",canSpawnMonsters:!1,portals:[{id:"ww-to-aeth",x:20,y:430,width:40,height:100,targetMapId:"aetheria",targetX:1200,targetY:480},{id:"ww-to-forge",x:590,y:20,width:100,height:40,targetMapId:"crystal_forge",targetX:640,targetY:880},{id:"ww-to-hunting",x:1240,y:430,width:40,height:100,targetMapId:"wind_hunting_grounds",targetX:80,targetY:480}],npcs:[{id:"master_craftsman",name:"Master Craftsman",type:"Blacksmith",position:{x:640,y:480},size:{x:420,y:480},nameOffset:{x:15,y:-120},velocity:{x:0,y:0},speed:0,spriteUrl:"assets/Npc/MasterCraftsman.png",dialogues:["A blade is only as good as the soul who wields it.","I can make anything if you have the materials.","Focus on your craft.","The workshop is always open for those who seek to create."]},{id:"wind_apprentice",name:"Wind Apprentice",type:"Quest",position:{x:400,y:600},size:{x:160,y:200},nameOffset:{x:0,y:-70},velocity:{x:0,y:0},speed:0,spriteUrl:"assets/Npc/WindApprentice.png",dialogues:["I still have so much to learn.","Master is very strict, but he is the best.","Have you seen any rare materials lately?","Someday, I will craft a legendary sword."]}]},mystic_grove:{id:"mystic_grove",name:"Mystic Forest",bgColor:"#2d5a2d",canSpawnMonsters:!0,spawnInterval:6,portals:[{id:"mg-to-sg",x:590,y:920,width:100,height:40,targetMapId:"sky_gardens",targetX:640,targetY:80}],npcs:[{id:"ancient_treant",name:"Ancient Treant",type:"Quest",position:{x:640,y:480},size:{x:250,y:300},nameOffset:{x:0,y:-120},velocity:{x:0,y:0},speed:0,spriteUrl:"assets/Npc/AncientTreant.png",dialogues:["I have seen centuries pass like autumn leaves.","The forest mourns for the lost ones.","Nature will reclaim what was taken.","Speak softly, traveler.","May the roots hold you steady."]}],fixedSpawns:[{monsterId:"cloud_guardian",x:300,y:300,level:150},{monsterId:"storm_elemental",x:800,y:600,level:150},{monsterId:"aether_drake",x:640,y:200,level:160}]},crystal_forge:{id:"crystal_forge",name:"Crystal Forge",bgColor:"#4a148c",canSpawnMonsters:!1,portals:[{id:"cf-to-ww",x:590,y:920,width:100,height:40,targetMapId:"wind_workshop",targetX:640,targetY:80},{id:"cf-to-caves",x:20,y:430,width:40,height:100,targetMapId:"crystal_caves",targetX:1200,targetY:480},{id:"cf-to-depths",x:1240,y:430,width:40,height:100,targetMapId:"forge_depths",targetX:80,targetY:480}],npcs:[{id:"crystal_master",name:"Crystal Master",type:"Blacksmith",position:{x:640,y:480},size:{x:420,y:480},nameOffset:{x:15,y:-120},velocity:{x:0,y:0},speed:0,spriteUrl:"assets/Npc/CrystalMaster.png",shopItems:["storm_spear","storm_mail","storm_crown","enhance_stone","aether_gem"],dialogues:["The crystals here are pure and powerful.","I can forge the strongest equipment with these.","Bring me Aether Gems if you want the best.","The forge never sleeps."]}]},crystal_caves:{id:"crystal_caves",name:"Crystal Caves",bgColor:"#1a0d26",canSpawnMonsters:!0,spawnInterval:8,portals:[{id:"cc-to-cf",x:1240,y:430,width:40,height:100,targetMapId:"crystal_forge",targetX:80,targetY:480}],npcs:[],fixedSpawns:[{monsterId:"cloud_guardian",x:300,y:300,level:200},{monsterId:"storm_elemental",x:600,y:200,level:200},{monsterId:"aether_drake",x:900,y:700,level:200}]},aetheria_upper:{id:"aetheria_upper",name:"Aetheria Upper",bgColor:"#e1f5fe",canSpawnMonsters:!0,spawnInterval:12,portals:[{id:"au-to-aeth",x:1280/2-50,y:900,width:100,height:60,targetMapId:"aetheria",targetX:640,targetY:100},{id:"au-to-sanctum",x:1280/2-50,y:20,width:100,height:40,targetMapId:"celestial_sanctum",targetX:640,targetY:850},{id:"au-to-observatory",x:20,y:430,width:40,height:100,targetMapId:"star_observatory",targetX:1200,targetY:480}],npcs:[{id:"storm_blacksmith",name:"Storm Blacksmith",type:"Blacksmith",position:{x:640,y:480},size:{x:220,y:280},nameOffset:{x:0,y:-100},velocity:{x:0,y:0},speed:0,dialogues:["Can you hear the thunder?","My hammer moves with the lightning.","Forging in the storm requires great focus.","Behold the power of the sky!"]},{id:"wind_guardian",name:"Wind Guardian",type:"Quest",position:{x:400,y:400},size:{x:200,y:250},nameOffset:{x:0,y:-90},velocity:{x:0,y:0},speed:0,dialogues:["Only those with a pure heart may pass.","The winds protect this sacred place.","Are you a friend or a foe of Aetheria?","The architect is watching.","May your spirit fly high."]}],fixedSpawns:[{monsterId:"storm_elemental",x:300,y:300,level:250},{monsterId:"aether_drake",x:900,y:400,level:250}]},star_observatory:{id:"star_observatory",name:"Star Observatory",bgColor:"#0d1421",canSpawnMonsters:!0,spawnInterval:18,portals:[{id:"so-to-au",x:1240,y:430,width:40,height:100,targetMapId:"aetheria_upper",targetX:80,targetY:480}],npcs:[{id:"star_astronomer",name:"Star Astronomer",type:"Quest",position:{x:640,y:480},size:{x:180,y:220},nameOffset:{x:0,y:-90},velocity:{x:0,y:0},speed:0,dialogues:["The alignment of the stars is strange today.","I see a great destiny in your path.","The cosmic energy is flowing through everything.","Have you looked through the telescope?","The universe is vast and full of wonders."]},{id:"cosmic_merchant",name:"Cosmic Merchant",type:"Merchant",position:{x:400,y:400},size:{x:200,y:250},nameOffset:{x:0,y:-80},velocity:{x:0,y:0},speed:0,shopItems:["celestial_blade","sky_weaver_robe","aether_gem","architect_core","enhance_stone"],dialogues:["Rare goods from across the galaxy!","Interested in some celestial artifacts?","My prices are out of this world!"]}],fixedSpawns:[{monsterId:"aether_drake",x:300,y:300,level:300},{monsterId:"storm_elemental",x:800,y:600,level:300}]},celestial_sanctum:{id:"celestial_sanctum",name:"Celestial Sanctum",bgColor:"#f3e5f5",canSpawnMonsters:!0,spawnInterval:20,portals:[{id:"cs-to-au",x:1280/2-50,y:900,width:100,height:60,targetMapId:"aetheria_upper",targetX:640,targetY:100}],npcs:[{id:"architect_altar",name:"Architect Altar",type:"Quest",position:{x:640,y:300},size:{x:150,y:100},nameOffset:{x:0,y:-60},velocity:{x:0,y:0},speed:0,dialogueMode:"sequential",dialogues:["(An ancient altar dedicated to the Celestial Architect.)","(It glows with a faint, divine light.)","(You feel a strange presence nearby...)"]}],fixedSpawns:[{monsterId:"celestial_architect",x:640,y:480,level:400}]},ignis_prime:{id:"ignis_prime",name:"Ignis Prime",bgColor:"#4e342e",canSpawnMonsters:!0,spawnInterval:8,portals:[{id:"ignis-to-ss",x:1280/2-50,y:900,width:100,height:40,targetMapId:"star_station",targetX:640,targetY:600}],npcs:[]},wind_hunting_grounds:{id:"wind_hunting_grounds",name:"Wind Hunting Grounds",bgColor:"#e1f5fe",canSpawnMonsters:!0,spawnInterval:8,maxMonsters:10,portals:[{id:"whg-to-ww",x:20,y:430,width:40,height:100,targetMapId:"wind_workshop",targetX:1200,targetY:480}],npcs:[],fixedSpawns:[{monsterId:"sky_wisp",x:300,y:300,level:130},{monsterId:"storm_elemental",x:800,y:600,level:130},{monsterId:"sky_wisp",x:600,y:200,level:130}]},forge_depths:{id:"forge_depths",name:"Forge Depths",bgColor:"#311b92",canSpawnMonsters:!0,spawnInterval:10,maxMonsters:8,portals:[{id:"fd-to-cf",x:20,y:430,width:40,height:100,targetMapId:"crystal_forge",targetX:1200,targetY:480}],npcs:[],fixedSpawns:[{monsterId:"storm_elemental",x:300,y:300,level:180},{monsterId:"aether_drake",x:800,y:600,level:180},{monsterId:"storm_elemental",x:600,y:700,level:180}]},xylos:{id:"xylos",name:"Xylos",bgColor:"#1b5e20",canSpawnMonsters:!0,spawnInterval:10,portals:[{id:"xylos-to-ss",x:1280/2-50,y:900,width:100,height:40,targetMapId:"star_station",targetX:640,targetY:600}],npcs:[]}},Xe={basic_sword:{id:"basic_sword",name:"Old Sword",type:"Weapon",description:"A worn-out sword, heavy but still sharp enough to cut.",price:10,stackable:!1,atk:12,range:85,speed:.4,weaponType:"Sword",icon:"assets/Items/BasicSword.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},long_spear:{id:"long_spear",name:"Broken Spear",type:"Weapon",description:"A broken wooden spear with decent reach.",price:15,stackable:!1,atk:18,range:200,speed:2.5,weaponType:"Spear",icon:"assets/Items/LongSpear.png",size:{x:40,y:40},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},iron_sword:{id:"iron_sword",name:"Iron Sword",type:"Weapon",description:"A well-forged, sturdy iron sword.",price:100,stackable:!1,atk:80,range:110,speed:4,weaponType:"Sword",icon:"assets/Items/IronSword.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},old_armor:{id:"old_armor",name:"Old Armor",type:"Armor",description:"Rusty in places, but enough to provide some protection.",price:50,stackable:!1,def:10,icon:"assets/Items/OldArmor.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},slime_jelly:{id:"slime_jelly",name:"Slime Jelly",type:"Material",description:"Sticky remains of a defeated slime.",price:60,stackable:!0,icon:"assets/Items/SlimeJelly.png",size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:128,y:128}},bat_wing:{id:"bat_wing",name:"Bat Wing",type:"Material",description:"Thin, leathery wing from a bat.",price:100,stackable:!0,icon:"assets/Items/BatWing.png",size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},phase_lens:{id:"phase_lens",name:"Phase Lens",type:"Material",description:"A lens extracted from a Quantum Wraith. It refracts light strangely.",price:200,stackable:!0,icon:"assets/Items/PhaseLens.png",size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},plasma_core:{id:"plasma_core",name:"Plasma Core",type:"Material",description:"The power source of an Optical Sentinel. It still hums with energy.",price:300,stackable:!0,icon:"assets/Items/PlasmaCore.png",size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},grav_essence:{id:"grav_essence",name:"Gravity Essence",type:"Material",description:"Condensed essence of Gravity Drifter fluids. It has the property of attracting surrounding objects.",price:350,stackable:!0,icon:"assets/Items/GravEssence.png",size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},void_shard:{id:"void_shard",name:"Void Shard",type:"Material",description:"A shard left behind by a Star Eater. It exudes a chilling darkness.",price:500,stackable:!0,icon:"assets/Items/VoidShard.png",size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},overseer_heart:{id:"overseer_heart",name:"Overseer's Heart",type:"Material",description:"The central control unit of the Luna Overseer. It emits a faint light as if it's pulsing.",price:5e3,stackable:!0,icon:"assets/Items/OverseerHeart.png",size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},red_potion:{id:"red_potion",name:"Red Potion",type:"Potion",description:"A potion that restores 10% of Max HP.",price:30,stackable:!0,hpRestorePercent:.1,icon:"assets/Items/RedPotion.png",size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},blue_potion:{id:"blue_potion",name:"Blue Potion",type:"Potion",description:"A potion that restores 50 MP.",price:30,stackable:!0,mpRestore:50,icon:"assets/Items/BluePotion.png",size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},return_scroll:{id:"return_scroll",name:"Return Scroll",type:"Potion",description:"Instantly transports you back to the village.",price:50,stackable:!0,icon:"assets/Items/ReturnScroll.png",size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},enhance_stone:{id:"enhance_stone",name:"Enhancement Stone",type:"Material",description:"A mysterious stone used to enhance equipment.",price:100,stackable:!0,icon:"assets/Items/EnhanceStone.png",size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},frost_blade:{id:"frost_blade",name:"Frost Blade",type:"Weapon",description:"A cold sword covered in frost. You can feel the breath of the Frost Dragon.",price:5500,stackable:!1,atk:380,range:150,speed:5,weaponType:"Sword",icon:"assets/Items/FrostBlade.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},frost_armor:{id:"frost_armor",name:"Frost Armor",type:"Armor",description:"Sturdy armor made from the scales of a Frost Dragon.",price:5200,stackable:!1,def:45,icon:"assets/Items/FrostArmor.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},pulse_blade:{id:"pulse_blade",name:"Pulse Blade",type:"Weapon",description:"A pulse sword for apprentice cadets, flowing with blue energy.",price:800,stackable:!1,atk:200,range:150,speed:4.5,weaponType:"Sword",swingArc:90,icon:"assets/Items/PulseBlade.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},titanium_armor:{id:"titanium_armor",name:"Titanium Armor",type:"Armor",description:"Lightweight and durable titanium alloy armor for space exploration.",price:600,stackable:!1,def:20,icon:"assets/Items/TitaniumArmor.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},luna_goggles:{id:"luna_goggles",name:"Luna Goggles",type:"Helmet",description:"Exploration goggles that provide visibility even in the darkness of Proxima Luna.",price:300,stackable:!1,def:15,icon:"assets/Items/LunaGoggles.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},leather_cap:{id:"leather_cap",name:"Leather Cap",type:"Helmet",description:"A simple protective cap made of leather.",price:50,stackable:!1,def:6,icon:"assets/Items/LeatherCap.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},iron_helmet:{id:"iron_helmet",name:"Iron Helmet",type:"Helmet",description:"A sturdy helmet made of iron.",price:200,stackable:!1,def:10,icon:"assets/Items/IronHelmet.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},frost_helmet:{id:"frost_helmet",name:"Frost Helmet",type:"Helmet",description:"A cold helmet made from Frost Dragon scales.",price:2800,stackable:!1,def:45,icon:"assets/Items/FrostHelmet.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},wind_essence:{id:"wind_essence",name:"Wind Essence",type:"Material",description:"Pure wind power extracted from the core of a Sky Wisp.",price:180,stackable:!0,size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},cloud_crystal:{id:"cloud_crystal",name:"Cloud Crystal",type:"Material",description:"Crystallized water vapor from a Cloud Guardian.",price:250,stackable:!0,size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},storm_core:{id:"storm_core",name:"Storm Core",type:"Material",description:"A lump of energy obtained from the center of a Storm Elemental.",price:400,stackable:!0,size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},lightning_shard:{id:"lightning_shard",name:"Lightning Shard",type:"Material",description:"A shard of solidified lightning. It tingles when touched.",price:320,stackable:!0,size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},drake_scale:{id:"drake_scale",name:"Drake Scale",type:"Material",description:"Beautiful purple scales of an Aether Drake.",price:600,stackable:!0,size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},aether_gem:{id:"aether_gem",name:"Aether Gem",type:"Material",description:"A rare gem condensed from the pure magic energy of Aetheria.",price:800,stackable:!0,size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},architect_core:{id:"architect_core",name:"Architect's Core",type:"Material",description:"A core component of the Celestial Architect. It contains the power to manipulate space.",price:8e3,stackable:!0,size:{x:20,y:20},worldSize:{x:76,y:96},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},wind_blade:{id:"wind_blade",name:"Wind Blade",type:"Weapon",description:"A lightweight sword crafted from Wind Essence.",price:1200,stackable:!1,atk:180,range:130,speed:6,weaponType:"Sword",swingArc:85,icon:"assets/Items/WindBlade.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},storm_spear:{id:"storm_spear",name:"Storm Spear",type:"Weapon",description:"A spear imbued with the power of lightning.",price:1800,stackable:!1,atk:220,range:250,speed:4.8,weaponType:"Spear",swingArc:45,icon:"assets/Items/StormSpear.png",size:{x:40,y:40},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},celestial_blade:{id:"celestial_blade",name:"Celestial Blade",type:"Weapon",description:"A holy sword used by the Celestial Architect.",price:12e3,stackable:!1,atk:650,range:200,speed:7.5,weaponType:"Sword",swingArc:100,icon:"assets/Items/CelestialBlade.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},cloud_armor:{id:"cloud_armor",name:"Cloud Armor",type:"Armor",description:"Lightweight armor made from Cloud Crystals.",price:2200,stackable:!1,def:35,icon:"assets/Items/CloudArmor.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},storm_mail:{id:"storm_mail",name:"Storm Mail",type:"Armor",description:"Chainmail enhanced by the power of lightning.",price:3500,stackable:!1,def:45,icon:"assets/Items/StormMail.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},sky_weaver_robe:{id:"sky_weaver_robe",name:"Sky Weaver Robe",type:"Armor",description:"A divine robe worn by the Celestial Architect.",price:15e3,stackable:!1,def:120,icon:"assets/Items/SkyWeaverRobe.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},wind_circlet:{id:"wind_circlet",name:"Wind Circlet",type:"Helmet",description:"A lightweight headpiece made from Wind Essence.",price:800,stackable:!1,def:12,icon:"assets/Items/WindCirclet.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},storm_crown:{id:"storm_crown",name:"Storm Crown",type:"Helmet",description:"A crown imbued with the power of a Storm Elemental.",price:2800,stackable:!1,def:40,icon:"assets/Items/StormCrown.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},celestial_crown:{id:"celestial_crown",name:"Celestial Crown",type:"Helmet",description:"A holy crown used by the Celestial Architect.",price:2e4,stackable:!1,def:60,icon:"assets/Items/CelestialCrown.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},inferno_blade:{id:"inferno_blade",name:"Inferno Blade",type:"Weapon",description:"A powerful sword containing the heat of lava.",price:25e3,stackable:!1,atk:450,range:160,speed:5.5,weaponType:"Sword",swingArc:90,icon:"assets/Items/InfernoBlade.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},magma_armor:{id:"magma_armor",name:"Magma Armor",type:"Armor",description:"Powerful armor forged from magma.",price:22e3,stackable:!1,def:130,icon:"assets/Items/MagmaArmor.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},inferno_crown:{id:"inferno_crown",name:"Inferno Crown",type:"Helmet",description:"A crown containing the heat of Ignis.",price:18e3,stackable:!1,def:40,icon:"assets/Items/InfernoCrown.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},jungle_blade:{id:"jungle_blade",name:"Jungle Blade",type:"Weapon",description:"A mysterious sword used by the Jungle King.",price:35e3,stackable:!1,atk:550,range:170,speed:6,weaponType:"Sword",swingArc:95,icon:"assets/Items/JungleBlade.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},jungle_armor:{id:"jungle_armor",name:"Jungle Armor",type:"Armor",description:"Armor filled with the vitality of the jungle.",price:32e3,stackable:!1,def:160,icon:"assets/Items/JungleArmor.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}},jungle_crown:{id:"jungle_crown",name:"Jungle Crown",type:"Helmet",description:"A holy crown used by the Jungle King.",price:28e3,stackable:!1,def:50,icon:"assets/Items/JungleCrown.png",size:{x:32,y:32},worldSize:{x:128,y:128},inventorySize:{x:128,y:128},quickBarSize:{x:54,y:54}}},$i=(i,s)=>{const f=s-1,c=1+f*.2,h=1+f*.12,x=1+f*.25,A=1+f*.08,Y=1+f*.1,k=1+f*.1;return{maxHp:Math.floor(i.maxHp*c),atk:Math.floor(i.atk*h),def:Math.floor((i.def||0)*A),expValue:Math.floor(i.expValue*x),shield:i.shield?Math.floor(i.shield*Y):void 0,glacierFallDamage:i.glacierFallDamage?Math.floor(i.glacierFallDamage*k):void 0,tailSwipeDamage:i.tailSwipeDamage?Math.floor(i.tailSwipeDamage*k):void 0,orbitalLaserDamage:i.orbitalLaserDamage?Math.floor(i.orbitalLaserDamage*k):void 0,energyPulseDamage:i.energyPulseDamage?Math.floor(i.energyPulseDamage*k):void 0}},Fa={slime:{id:"slime",name:"Slime",description:"A common sticky creature found everywhere.",maxHp:45,atk:4,def:0,expValue:25,color:"#00ff00",speed:80,attackRange:40,attackCooldown:1.5,spriteUrl:"assets/Monsters/Slime.png",size:{x:140,y:70},hitboxSize:{x:50,y:40},hitboxOffset:{x:5,y:0},hpBarWidth:80,hpBarOffset:{x:0,y:-45},attackPreDelay:.6,drops:[{itemId:"slime_jelly",chance:8},{itemId:"red_potion",chance:1},{itemId:"long_spear",chance:1}]},goblin:{id:"goblin",name:"Goblin",description:"A greedy and vile humanoid monster.",maxHp:180,atk:10,def:3,expValue:40,color:"#3cb371",speed:120,attackRange:50,attackCooldown:1.2,spriteUrl:"assets/Monsters/Goblin.png",size:{x:200,y:140},hitboxSize:{x:100,y:120},hitboxOffset:{x:0,y:0},hpBarWidth:100,hpBarOffset:{x:0,y:-85},attackPreDelay:.5,drops:[{itemId:"iron_sword",chance:3},{itemId:"red_potion",chance:4},{itemId:"old_armor",chance:3}]},bat:{id:"bat",name:"Bat",description:"A small, fast monster living in the darkness of caves.",maxHp:60,atk:13,def:2,expValue:60,color:"#4b0082",speed:400,attackRange:30,attackCooldown:1,spriteUrl:"assets/Monsters/Bat.png",size:{x:80,y:70},hitboxSize:{x:50,y:40},hitboxOffset:{x:0,y:0},hpBarWidth:60,hpBarOffset:{x:0,y:-25},attackPreDelay:.3,drops:[{itemId:"red_potion",chance:1},{itemId:"blue_potion",chance:1},{itemId:"bat_wing",chance:8}]},yeti:{id:"yeti",name:"Yeti",description:"A giant and powerful snow creature living in the mountains.",maxHp:450,atk:26,def:15,expValue:100,color:"#f0f8ff",speed:100,attackRange:60,attackCooldown:2,spriteUrl:"assets/Monsters/Yeti.png",size:{x:375,y:400},hpBarWidth:180,hpBarOffset:{x:0,y:-100},hitboxSize:{x:200,y:200},hitboxOffset:{x:0,y:0},drops:[{itemId:"red_potion",chance:.5},{itemId:"enhance_stone",chance:.05}]},ice_spirit:{id:"ice_spirit",name:"Ice Spirit",description:"A mysterious spirit made of pure cold.",maxHp:300,atk:24,def:8,expValue:100,color:"#070707ff",speed:150,attackRange:100,attackCooldown:1.5,spriteUrl:"assets/Monsters/IceSpirit.png",size:{x:150,y:150},hpBarWidth:100,hpBarOffset:{x:0,y:-40},hitboxSize:{x:64,y:64},hitboxOffset:{x:0,y:0},drops:[{itemId:"blue_potion",chance:.5},{itemId:"enhance_stone",chance:.05}]},frost_dragon:{id:"frost_dragon",name:"Frost Dragon",description:"An ancient ice dragon that slept deep within the ice caves.",maxHp:35e3,atk:40,def:30,expValue:5e3,color:"#87CEEB",speed:80,attackRange:200,attackCooldown:2.5,spriteUrl:"assets/Monsters/FrostDragon.png",size:{x:500,y:400},hitboxSize:{x:300,y:250},hitboxOffset:{x:0,y:0},hpBarWidth:300,hpBarOffset:{x:0,y:-220},drops:[{itemId:"frost_blade",chance:.1},{itemId:"frost_armor",chance:.1},{itemId:"frost_helmet",chance:.1},{itemId:"enhance_stone",chance:.7}],isBoss:!0,isStationary:!0,shield:1e4,enrageThreshold:.25,enrageAtkMultiplier:2,enrageSpeedMultiplier:1.6,glacierFallCooldown:4,glacierFallDamage:150,glacierFallRadius:150,glacierFallImpactTime:700,tailSwipeCooldown:10,tailSwipeDamage:200,tailSwipeRange:200,tailSwipePreDelay:1,skillDescriptions:[{name:"Glacier Fall",description:"Summons giant ice chunks from the ceiling that crash down on the intruder."},{name:"Tail Swipe",description:"Swiftly swings its massive tail, dealing heavy damage to anything behind it."},{name:"Frost Armor",description:"Creates a thick layer of ice shield that absorbs a significant amount of damage."}]},quantum_wraith:{id:"quantum_wraith",name:"Quantum Wraith",description:"A transparent being with an unclear physical form.",maxHp:1050,atk:35,def:15,expValue:300,color:"#aaffff",speed:140,attackRange:60,attackCooldown:1.5,spriteUrl:"assets/Monsters/QuantumGhost.png",size:{x:150,y:150},hpBarWidth:100,hpBarOffset:{x:0,y:-40},hitboxSize:{x:64,y:64},hitboxOffset:{x:0,y:0},drops:[{itemId:"phase_lens",chance:.15},{itemId:"blue_potion",chance:.2}]},optical_sentinel:{id:"optical_sentinel",name:"Optical Sentinel",description:"An automated mechanical guard protecting the ancient ship.",maxHp:2900,atk:55,def:30,expValue:400,color:"#ff4444",speed:100,attackRange:200,attackCooldown:3,spriteUrl:"assets/Monsters/OpticalSentinel.png",size:{x:350,y:350},hpBarWidth:100,hpBarOffset:{x:0,y:-100},hitboxSize:{x:150,y:150},hitboxOffset:{x:0,y:0},drops:[{itemId:"plasma_core",chance:.15},{itemId:"enhance_stone",chance:.05}]},grav_drifter:{id:"grav_drifter",name:"Gravity Drifter",description:"A mysterious jellyfish-like creature that floats by manipulating gravity.",maxHp:1750,atk:45,def:25,expValue:350,color:"#aa88ff",speed:120,attackRange:150,attackCooldown:2,spriteUrl:"assets/Monsters/GravDrifter.png",size:{x:150,y:150},hpBarWidth:100,hpBarOffset:{x:0,y:-40},hitboxSize:{x:64,y:64},hitboxOffset:{x:0,y:0},drops:[{itemId:"grav_essence",chance:.12},{itemId:"red_potion",chance:.2}]},star_eater:{id:"star_eater",name:"Star Eater",description:"A dark parasitic creature that devours surrounding energy.",maxHp:2500,atk:85,def:35,expValue:450,color:"#111111",speed:90,attackRange:150,attackCooldown:2.5,spriteUrl:"assets/Monsters/StarEater.png",size:{x:400,y:400},hitboxSize:{x:170,y:170},hitboxOffset:{x:0,y:0},hpBarWidth:90,hpBarOffset:{x:0,y:-55},drops:[{itemId:"void_shard",chance:.08},{itemId:"enhance_stone",chance:.03}]},summoned_star_eater:{id:"summoned_star_eater",name:"Star Eater (Summon)",description:"A parasitic creature summoned to protect its master.",maxHp:2500,atk:85,def:35,expValue:0,color:"#331133",speed:110,attackRange:150,attackCooldown:2.5,spriteUrl:"assets/Monsters/StarEater.png",size:{x:400,y:400},hitboxSize:{x:170,y:170},hitboxOffset:{x:0,y:0},hpBarWidth:90,hpBarOffset:{x:0,y:-55},drops:[]},luna_overseer:{id:"luna_overseer",name:"Luna Overseer",description:"A giant mechanical weapon guarding the heart of Proxima Luna.",maxHp:4e4,atk:150,def:50,expValue:1e4,color:"#ffff00",speed:120,attackRange:250,attackCooldown:3.5,spriteUrl:"assets/Monsters/LunaOverseer.png",isBoss:!0,shield:2e4,enrageThreshold:.3,enrageAtkMultiplier:1.8,enrageSpeedMultiplier:1.5,size:{x:600,y:500},hitboxSize:{x:250,y:250},hitboxOffset:{x:0,y:0},hpBarWidth:400,hpBarOffset:{x:0,y:-280},attackPreDelay:.8,orbitalLaserCooldown:8,orbitalLaserDamage:450,orbitalLaserRadius:120,orbitalLaserPreDelay:1.5,energyPulseCooldown:12,energyPulseDamage:300,energyPulseRadius:350,skillDescriptions:[{name:"Orbital Laser",description:"Targets the player with a high-intensity laser from orbit. Move quickly to avoid the impact zone."},{name:"Energy Pulse",description:"Releases a massive electromagnetic shockwave that deals damage and knocks back nearby intruders."},{name:"Iron Shield",description:"Generates a heavy metallic shield to absorb incoming attacks."}],drops:[{itemId:"overseer_heart",chance:1},{itemId:"pulse_blade",chance:.4},{itemId:"titanium_armor",chance:.3},{itemId:"enhance_stone",chance:1}]},sky_wisp:{id:"sky_wisp",name:"Sky Wisp",description:"A pure wind spirit born within the clouds of Aetheria.",maxHp:3500,atk:110,def:35,expValue:1200,color:"#87ceeb",speed:180,attackRange:70,attackCooldown:1.8,spriteUrl:"assets/Monsters/SkyWisp.png",size:{x:80,y:80},hitboxSize:{x:50,y:50},hitboxOffset:{x:0,y:0},hpBarWidth:70,hpBarOffset:{x:0,y:-45},drops:[{itemId:"wind_essence",chance:.4},{itemId:"blue_potion",chance:.2}]},cloud_guardian:{id:"cloud_guardian",name:"Cloud Guardian",description:"A giant cloud creature guarding Aetheria's floating islands.",maxHp:5200,atk:140,def:60,expValue:1800,color:"#f0f8ff",speed:100,attackRange:120,attackCooldown:2.2,spriteUrl:"assets/Monsters/CloudGuardian.png",size:{x:120,y:100},hitboxSize:{x:80,y:70},hitboxOffset:{x:0,y:0},hpBarWidth:100,hpBarOffset:{x:0,y:-60},drops:[{itemId:"cloud_crystal",chance:.25},{itemId:"wind_essence",chance:.3},{itemId:"enhance_stone",chance:.08}]},storm_elemental:{id:"storm_elemental",name:"Storm Elemental",description:"A powerful atmospheric spirit that controls lightning and wind.",maxHp:7500,atk:180,def:50,expValue:2500,color:"#4169e1",speed:140,attackRange:150,attackCooldown:2.5,spriteUrl:"assets/Monsters/StormElemental.png",size:{x:100,y:120},hitboxSize:{x:70,y:90},hitboxOffset:{x:0,y:0},hpBarWidth:120,hpBarOffset:{x:0,y:-70},drops:[{itemId:"storm_core",chance:.15},{itemId:"lightning_shard",chance:.2},{itemId:"wind_essence",chance:.4}],debuffType:"slow"},aether_drake:{id:"aether_drake",name:"Aether Drake",description:"An elegant dragonoid ruling the skies of Aetheria.",maxHp:11e3,atk:250,def:80,expValue:4e3,color:"#9370db",speed:160,attackRange:180,attackCooldown:3,spriteUrl:"assets/Monsters/AetherDrake.png",size:{x:150,y:120},hitboxSize:{x:100,y:80},hitboxOffset:{x:0,y:0},hpBarWidth:140,hpBarOffset:{x:0,y:-80},drops:[{itemId:"drake_scale",chance:.3},{itemId:"aether_gem",chance:.12},{itemId:"storm_core",chance:.08},{itemId:"enhance_stone",chance:.15}]},celestial_architect:{id:"celestial_architect",name:"Celestial Architect",description:"The remains of an ancient being that created Aetheria. It can manipulate space.",maxHp:35e4,atk:1200,def:280,expValue:2e5,color:"#ffd700",speed:110,attackRange:300,attackCooldown:4,isBoss:!0,isStationary:!0,shield:5e4,enrageThreshold:.35,enrageAtkMultiplier:1.6,enrageSpeedMultiplier:1.4,size:{x:400,y:350},hitboxSize:{x:250,y:200},hitboxOffset:{x:0,y:0},hpBarWidth:300,hpBarOffset:{x:0,y:-200},skillDescriptions:[{name:"Dimension Blade",description:"Strikes through space to hit targets from a distance."},{name:"Void Pull",description:"Creates a gravitational anomaly that pulls stars and enemies alike."},{name:"Architect's Will",description:"The ancient creator's presence strengthens its own defenses."}],drops:[{itemId:"architect_core",chance:1},{itemId:"celestial_blade",chance:.3},{itemId:"sky_weaver_robe",chance:.25},{itemId:"aether_gem",chance:.8},{itemId:"enhance_stone",chance:1}]},training_dummy:{id:"training_dummy",name:"Training Dummy",description:"A dummy made for target practice.",maxHp:1e7,atk:0,def:0,expValue:0,color:"#8b4513",speed:0,attackRange:0,attackCooldown:0,spriteUrl:"assets/Monsters/TrainingDummy.png",size:{x:250,y:250},hitboxSize:{x:80,y:120},hitboxOffset:{x:0,y:0},hpBarWidth:100,hpBarOffset:{x:0,y:-60},isStationary:!0,drops:[]}},D1={frost_dragon:{id:"frost_dragon",name:"Frost Dragon",mapId:"ice_cave",setItemId:"frost_dragon_set",rewards:{exp:3e3,gold:1e3}},luna_overseer:{id:"luna_overseer",name:"Luna Overseer",mapId:"proxima_core",setItemId:"luna_overseer_set",rewards:{exp:5e3,gold:2e3}},luna_overseer_final:{id:"luna_overseer_final",name:"Luna Overseer (Final)",mapId:"proxima_core",setItemId:"luna_overseer_final_set",rewards:{exp:1e4,gold:5e3}},celestial_architect:{id:"celestial_architect",name:"Celestial Architect",mapId:"celestial_sanctum",setItemId:"celestial_architect_set",rewards:{exp:2e4,gold:1e4}},aetheria_supreme:{id:"aetheria_supreme",name:"Aetheria Supreme Being",mapId:"celestial_sanctum",setItemId:"aetheria_supreme_set",rewards:{exp:3e4,gold:15e3}},ignis_overlord:{id:"ignis_overlord",name:"Ignis Overlord",mapId:"ignis_prime",setItemId:"ignis_overlord_set",rewards:{exp:5e4,gold:25e3}},ignis_emperor:{id:"ignis_emperor",name:"Ignis Emperor",mapId:"ignis_prime",setItemId:"ignis_emperor_set",rewards:{exp:75e3,gold:4e4}},xylos_guardian:{id:"xylos_guardian",name:"Xylos Guardian",mapId:"xylos",setItemId:"xylos_guardian_set",rewards:{exp:1e5,gold:6e4}},xylos_sovereign:{id:"xylos_sovereign",name:"Xylos Sovereign",mapId:"xylos",setItemId:"xylos_sovereign_set",rewards:{exp:15e4,gold:1e5}}};function O1(i){return D1[i]}const fo=16,Wn=80,Fn=60,En=0,qt=1,B1=2,cu=3,po=4,ho=5,mo=6;let lm=42;const fh=()=>{const i=Math.sin(lm++)*1e4;return i-Math.floor(i)},Ke=(i,s,f,c,h,x)=>{for(let A=f;A<f+h;A++)for(let Y=s;Y<s+c;Y++)A>=0&&A<Fn&&Y>=0&&Y<Wn&&(i[A][Y]=x)},uu=(i,s,f,c,h,x)=>{Ke(i,s,f,c,1,x),Ke(i,s,f+h-1,c,1,x),Ke(i,s,f,1,h,x),Ke(i,s+c-1,f,1,h,x)},q1=()=>{lm=42;const i=Array(Fn).fill(0).map(()=>Array(Wn).fill(En));Ke(i,36,26,8,8,qt),Ke(i,0,28,80,4,qt),Ke(i,38,0,4,60,qt),uu(i,10,10,20,16,cu),Ke(i,12,12,16,12,po),Ke(i,20,24,2,2,po),Ke(i,20,26,2,4,qt),Ke(i,12,27,8,2,mo),Ke(i,22,27,8,2,mo),uu(i,50,10,20,16,cu),Ke(i,52,12,16,12,po),Ke(i,60,24,2,2,po),Ke(i,60,26,2,4,qt),Ke(i,56,40,16,12,B1),Ke(i,54,40,2,12,mo),Ke(i,72,40,2,12,mo),uu(i,10,40,20,16,cu),Ke(i,20,40,2,2,qt),Ke(i,0,0,80,4,ho),Ke(i,0,56,80,4,ho),Ke(i,0,4,4,52,ho),Ke(i,76,4,4,52,ho);for(let f=1;f<Fn-1;f++)for(let c=1;c<Wn-1;c++){const h=i[f][c];if(h===En||h===qt){const x=[i[f-1][c],i[f+1][c],i[f][c-1],i[f][c+1]];h===En&&x.includes(qt)?fh()<.4&&(i[f][c]=qt):h===qt&&x.includes(En)&&fh()<.4&&(i[f][c]=En)}}const s=4;for(let f=0;f<s;f++){const c=i.map(h=>[...h]);for(let h=1;h<Fn-1;h++)for(let x=1;x<Wn-1;x++){const A=i[h][x];if(A!==En&&A!==qt)continue;let Y=0;for(let k=-1;k<=1;k++)for(let y=-1;y<=1;y++)y===0&&k===0||i[h+k][x+y]===qt&&Y++;A===En?Y>4&&(c[h][x]=qt):A===qt&&Y<4&&(c[h][x]=En)}for(let h=0;h<Fn;h++)for(let x=0;x<Wn;x++)i[h][x]=c[h][x]}return i},Db=q1(),dh=i=>{const s=Pn[i];return!s||!s.fixedSpawns?[]:s.fixedSpawns.map((f,c)=>{const h=Fa[f.monsterId];if(!h)return console.warn(`Monster template not found for fixed spawn: ${f.monsterId}`),null;const x=f.level||1,A=$i(h,x),Y=A?.maxHp||h.maxHp,k=A?.expValue||h.expValue,y=A?.atk||h.atk;return{id:`fixed-${f.monsterId}-${Date.now()}-${c}`,type:h.id,position:{x:f.x,y:f.y},velocity:{x:0,y:0},size:{...h.size},speed:h.speed,hp:Y,maxHp:Y,level:x,expValue:k,atk:y,def:A?.def||h.def||0,attackRange:h.attackRange||0,attackCooldown:h.attackCooldown||999999,lastAttackTime:0,hitboxSize:h.hitboxSize||{x:32,y:32},hitboxOffset:h.hitboxOffset||{x:0,y:0},shield:A?.shield,glacierFallDamage:A?.glacierFallDamage,tailSwipeDamage:A?.tailSwipeDamage}}).filter(f=>f!==null)},R1=()=>{const[i,s]=re.useState(Yi),f=re.useRef(Yi),c=re.useRef(!1),h=re.useCallback((v,S=1e3)=>{const m=`toast-${Date.now()}-${Math.random()}`;s(p=>({...p,toasts:[...p.toasts,{id:m,message:v,duration:S}]})),setTimeout(()=>{s(p=>({...p,toasts:p.toasts.filter(b=>b.id!==m)}))},S)},[]),x=re.useCallback((v=!1)=>{const S=f.current,m={player:{...S.player},bestiary:S.bestiary,settings:S.settings,quickBar:S.quickBar,currentMapId:"town"},{position:p,...b}=m.player;m.player=b;try{localStorage.setItem("void_walker_save",JSON.stringify(m)),console.log(v?"Autosave completed":"Manual save completed"),h(v?"Game auto-saved":"Game saved successfully")}catch(E){console.error("Failed to save game:",E),h("Failed to save game")}},[h]),A=re.useCallback((v=!1)=>{const S=localStorage.getItem("void_walker_save");if(S)try{const m=JSON.parse(S);if(m.enemies=dh(m.currentMapId||"town"),m.droppedItems=[],m.damageNumbers=[],m.glacierFalls=[],m.orbitalLasers=[],m.activeUI="None",m.currentDialog=null,m.lastUpdate=Date.now(),m.toasts=[],m.glacierFalls=[],m.lastSpawnTime===void 0&&(m.lastSpawnTime=0),m.lastBossKillTime===void 0&&(m.lastBossKillTime=0),m.respawnQueue===void 0&&(m.respawnQueue=[]),!m.player.acquiredEquipment){const N=[];m.player.equipment.weapon&&N.push(m.player.equipment.weapon.id),m.player.equipment.armor&&N.push(m.player.equipment.armor.id),m.player.equipment.helmet&&N.push(m.player.equipment.helmet.id),m.player.inventory&&m.player.inventory.forEach(I=>{const F=Xe[I.itemId];F&&(F.type==="Weapon"||F.type==="Armor"||F.type==="Helmet")&&(N.includes(I.itemId)||N.push(I.itemId),I.quantity=1)}),m.player.acquiredEquipment=N,console.log("Migrated acquiredEquipment:",N)}m.player.skills||(m.player.skills={critDamage:0,attackSpeed:0,maxHpBonus:0,defenseBonus:0,hpRegen:0,expBonus:0,dropRate:0,goldBonus:0,moveSpeed:0},console.log("Migrated skills: initialized to 0")),m.player.skillPoints===void 0&&(m.player.skillPoints=0,console.log("Migrated skillPoints: initialized to 0"));const p=m.player.level||1,b=p<50?0:Math.floor(p/10-4)*5,E=Object.values(m.player.skills||{}).reduce((N,I)=>N+(typeof I=="number"?I:0),0),O=Math.max(0,b-E);m.player.skillPoints!==O&&(console.log(`Skill Points recalibrated: ${m.player.skillPoints} -> ${O} (Level: ${p}, Spent: ${E})`),m.player.skillPoints=O),m.player.position={...Yi.player.position},m.currentMapId=Yi.currentMapId,m.currentMapId==="proxima_luna"&&(m.currentMapId="proxima_station"),m.player.stats.def===void 0&&(m.player.stats.def=1),s(m),v||alert("Game loaded successfully")}catch(m){console.error("Failed to load game",m),v||alert("Failed to load game")}else v||alert("No save data found")},[]),Y=re.useCallback(v=>{console.log("handleChangeMap",v),s(m=>({...m,currentMapId:v.mapId,player:{...m.player,position:{x:v.x,y:v.y}},enemies:[],droppedItems:[],glacierFalls:[],orbitalLasers:[]}));const S=dh(v.mapId);S.length>0&&s(m=>({...m,enemies:S}))},[]),k=re.useCallback(v=>{s(S=>{if(S.activeUI==="Dialog")return S;const{player:m}=S,p=v.x,b=v.y,E=v.direction!==void 0?v.direction:S.player.direction,O=S.droppedItems.filter(Q=>Math.sqrt(Math.pow(p-Q.position.x,2)+Math.pow(b-Q.position.y,2))>50),N=S.droppedItems.filter(Q=>Math.sqrt(Math.pow(p-Q.position.x,2)+Math.pow(b-Q.position.y,2))<=50);let I=[...m.inventory],F=[...m.acquiredEquipment];return N.forEach(Q=>{const $=Xe[Q.itemId];if($)if(($.type==="Weapon"||$.type==="Armor"||$.type==="Helmet")&&!F.includes(Q.itemId)&&F.push(Q.itemId),$.stackable){const ge=I.findIndex(de=>de.itemId===Q.itemId);ge!==-1?I[ge]={...I[ge],quantity:I[ge].quantity+1}:I.push({itemId:Q.itemId,quantity:1})}else I.push({itemId:Q.itemId,quantity:1,enhanceLevel:0})}),{...S,player:{...m,position:{x:p,y:b},direction:E,inventory:I,acquiredEquipment:F},droppedItems:O}})},[]),y=re.useCallback(()=>{s(v=>{if(v.player.attack.isAttacking||!v.player.equipment.weapon)return v;const S=v.player.equipment.weapon;return{...v,player:{...v.player,attack:{isAttacking:!0,progress:0,angle:-S.swingArc/2,targetAngle:S.swingArc/2,hitEnemies:[]}}}})},[]);re.useEffect(()=>{f.current=i,c.current&&(c.current=!1,x(!0)),!i.player.attack.isAttacking&&i.player.equipment.weapon&&y()},[i,y,x]);const _=re.useCallback(v=>{s(S=>{if(!S.player.attack.isAttacking||!S.player.equipment.weapon)return S;const{player:m,enemies:p}=S,b=m.equipment.weapon,E=.5,O=1+Math.log(m.stats.dex)*2;let N=E*O*v;N>.2&&(N=.2);const I=m.attack.progress+N;if(I<1)return{...S,player:{...m,attack:{...m.attack,progress:I}}};window.dispatchEvent(new CustomEvent("attack-ready"));let F=m.level,Q=m.exp,$=m.maxExp,ce=m.statPoints,ge=m.skillPoints,de=m.hp,K={...S.bestiary};const oe=[...S.damageNumbers],je=[...S.droppedItems];let Je=S.lastBossKillTime;const ra=[...S.respawnQueue],Mt=b.range,Ea=p.filter(se=>!m.attack.hitEnemies.includes(se.id)).map(se=>{const et=se.hitboxSize?.x??se.size.x,va=se.hitboxSize?.y??se.size.y,ba=se.hitboxOffset?.x??0,Qt=se.hitboxOffset?.y??0,Et=et/2,ja=va/2,Rt=se.position.x+ba,dt=se.position.y+Qt,St=Math.max(Rt-Et,Math.min(m.position.x,Rt+Et)),Ie=Math.max(dt-ja,Math.min(m.position.y,dt+ja)),pt=St-m.position.x,Ze=Ie-m.position.y,Dn=Math.sqrt(pt*pt+Ze*Ze);return{enemy:se,dist:Dn}}).filter(se=>se.dist<=Mt).sort((se,et)=>se.dist-et.dist);let xa=[...p];if(Ea.length>0){const se=Ea[0].enemy,et=Fa[se.type];let va=se.def;const ba=Math.pow(Math.max(0,m.atk-Math.pow(va,1.1)),1.5)/5,Qt=m.atk*.05,Et=Math.max(Qt,ba),ja=.9+Math.random()*.2;let Rt=Math.floor(Et*ja),dt=!1;const St=m.stats.dex*.005;if(Math.random()<St){dt=!0;const Vt=1.5,Sa=m.skills.critDamage*.1,tn=Vt+Sa;Rt=Math.floor(Rt*tn)}let Ie=0,pt=se.shield??0;pt>0&&(Ie=Math.min(pt,Rt),pt-=Ie,Rt-=Ie);const Ze=Math.max(0,se.hp-Rt);let Dn=se.isEnraged??!1;et?.enrageThreshold&&!Dn&&Ze/se.maxHp<=et.enrageThreshold&&(Dn=!0);const No=Ie>0?Ie:Rt,Lo=Ie>0?"#00ffff":dt?"#ff00ff":"#ffd700";if(oe.push({id:`dmg-${Date.now()}-${Math.random()}`,value:No,vx:(Math.random()-.5)*4,position:{x:se.position.x+(Math.random()-.5)*20,y:se.position.y-20-Math.random()*20},color:Lo,createdAt:Date.now()}),xa=xa.map(Vt=>Vt.id===se.id?{...Vt,hp:Ze,shield:pt,isEnraged:Dn}:Vt),Ze<=0){const Vt=1+m.skills.expBonus*.1;Q+=Math.floor(se.expValue*Vt),K[se.type]=(K[se.type]||0)+1,et?.isBoss&&(Je=Date.now(),c.current=!0);const Sa=O1(se.type);if(Sa){m.defeatedBosses.includes(se.type)||m.defeatedBosses.push(se.type);const nt=1+m.skills.goldBonus*.15;Q+=Sa.rewards.exp,m.gold+=Math.floor(Sa.rewards.gold*nt)}if(et&&et.drops&&et.drops.length>0){const nt=et.drops.filter(sa=>{const wt=Xe[sa.itemId];return!(wt&&(wt.type==="Weapon"||wt.type==="Armor"||wt.type==="Helmet"))||!m.acquiredEquipment.includes(sa.itemId)});if(nt.length>0){const sa=1+m.skills.dropRate*.1,wt=Math.min(...nt.map(ca=>ca.chance));let wa=0;const ka=nt.map(ca=>{const Jl=ca.chance===wt?ca.chance*sa:ca.chance;return wa+=Jl,{...ca,adjustedWeight:Jl}}),tl=Math.random()*wa;let Zt=0;for(const ca of ka)if(Zt+=ca.adjustedWeight,tl<=Zt){je.push({id:`drop-${Date.now()}-${Math.random()}`,itemId:ca.itemId,position:{...se.position},droppedAt:Date.now()});break}}}if(se.id.startsWith("fixed-")){const nt=se.id.split("-"),sa=nt[nt.length-1],wt=parseInt(sa,10),wa=Pn[S.currentMapId];if(!isNaN(wt)&&wa&&wa.fixedSpawns&&wa.fixedSpawns[wt]){const ka=wa.fixedSpawns[wt];if(!ra.some(Zt=>Zt.monsterId===se.id)){const Zt=ka.respawnCooldown||60;ra.push({monsterId:se.id,templateId:se.type,level:ka.level||se.level||1,position:{x:ka.x,y:ka.y},respawnTime:Date.now()+Zt*1e3})}}}const tn=m.level;for(;Q>=$;){F+=1,Q-=$,$=Math.floor(Math.pow(F-1,1.5)*150)+100,ce+=5;let nt=0;F>=50&&F%10===0&&(nt=5),ge+=nt}F>tn&&(de=la(m.stats,m.equipment,F,S.currentMapId,m.skills).maxHp)}}const Ta=xa.filter(se=>se.hp>0),en=Q-m.exp,oa=en>0?{amount:en,timestamp:Date.now()}:S.lastExpGain;return{...S,player:{...m,level:F,exp:Q,maxExp:$,statPoints:ce,skillPoints:ge,hp:de,gold:m.gold,defeatedBosses:m.defeatedBosses,attack:{...m.attack,isAttacking:!1,progress:0,hitEnemies:[]}},enemies:Ta,bestiary:K,damageNumbers:oe,droppedItems:je,lastBossKillTime:Je,respawnQueue:ra,lastExpGain:oa}})},[]),C=re.useCallback(()=>{s(v=>{const S=Pn[v.currentMapId];if(!S.canSpawnMonsters)return v;const m=Date.now(),p=v.respawnQueue.filter(Q=>Q.respawnTime<=m),b=v.respawnQueue.filter(Q=>Q.respawnTime>m);let E=[];if(p.length>0&&(E=p.map(Q=>{const $=Fa[Q.templateId];if(!$)return null;const ce=$i($,Q.level),ge=ce?.maxHp||$.maxHp,de=ce?.expValue||$.expValue,K=ce?.atk||$.atk;return{id:Q.monsterId,type:$.id,position:Q.position,velocity:{x:0,y:0},size:{...$.size},speed:$.speed,hp:ge,maxHp:ge,level:Q.level,expValue:de,atk:K,def:ce?.def||$.def||0,attackRange:$.attackRange||0,attackCooldown:$.attackCooldown||999999,lastAttackTime:0,hitboxSize:$.hitboxSize||{x:32,y:32},hitboxOffset:$.hitboxOffset||{x:0,y:0},shield:ce?.shield,glacierFallDamage:ce?.glacierFallDamage,tailSwipeDamage:ce?.tailSwipeDamage}}).filter(Q=>Q!==null)),E.length>0)return{...v,enemies:[...v.enemies,...E],respawnQueue:b};const O=S.maxMonsters||10;if(v.enemies.length>=O)return v;if(v.currentMapId==="ice_cave"){const Q="frost_dragon",$=v.enemies.some(Je=>Je.type===Q),ce=Date.now(),ge=30*1e3;if($||ce-v.lastBossKillTime<ge)return v;const de=Fa.frost_dragon;if(!de)return v;const K=30,oe=$i(de,K),je={id:`boss-frost-dragon-${Date.now()}`,type:de.id,position:{x:Wn*fo/2,y:Fn*fo/2},velocity:{x:0,y:0},size:{...de.size},speed:de.speed,hp:oe?.maxHp||de.maxHp,maxHp:oe?.maxHp||de.maxHp,level:K,expValue:oe?.expValue||de.expValue,atk:oe?.atk||de.atk,def:oe?.def||de.def||0,attackRange:de.attackRange,attackCooldown:de.attackCooldown,lastAttackTime:0,hitboxSize:{...de.hitboxSize},hitboxOffset:{...de.hitboxOffset},shield:oe?.shield||de.shield,isEnraged:!1,lastGlacierFallTime:0,lastTailSwipeTime:0,glacierFallDamage:oe?.glacierFallDamage,tailSwipeDamage:oe?.tailSwipeDamage};return{...v,enemies:[je]}}const N=[];if(v.currentMapId==="frozen_cliff")N.push({id:"yeti",level:20},{id:"ice_spirit",level:20});else if(v.currentMapId==="proxima_plains")N.push({id:"quantum_wraith",level:50});else if(v.currentMapId==="proxima_ruins"){const Q=Math.random()<.5?"grav_drifter":"optical_sentinel";N.push({id:Q,level:60})}else if(v.currentMapId==="proxima_void")N.push({id:"star_eater",level:80});else if(v.currentMapId==="proxima_core"){const Q=v.enemies.some(ge=>ge.type==="luna_overseer"),$=Date.now(),ce=60*1e3;!Q&&$-v.lastBossKillTime>ce?N.push({id:"luna_overseer",level:100}):Q?N.push({id:"summoned_star_eater",level:80}):N.push({id:"star_eater",level:80})}else if(v.currentMapId==="aetheria"){const Q=Math.random()<.6?"sky_wisp":"cloud_guardian";N.push({id:Q,level:120})}else if(v.currentMapId==="sky_gardens")N.push({id:"sky_wisp",level:110});else if(v.currentMapId==="wind_workshop"){const Q=Math.random()<.7?"sky_wisp":"storm_elemental";N.push({id:Q,level:130})}else if(v.currentMapId==="mystic_grove"){const Q=Math.random();Q<.4?N.push({id:"cloud_guardian",level:150}):Q<.8?N.push({id:"storm_elemental",level:150}):N.push({id:"aether_drake",level:160})}else if(v.currentMapId==="crystal_forge"){const Q=Math.random()<.6?"storm_elemental":"aether_drake";N.push({id:Q,level:180})}else if(v.currentMapId==="crystal_caves"){const Q=Math.random();let $="cloud_guardian";Q>.6?$="aether_drake":Q>.3&&($="storm_elemental"),N.push({id:$,level:200})}else if(v.currentMapId==="aetheria_upper"){const Q=Math.random();Q<.4?N.push({id:"storm_elemental",level:250}):Q<.8?N.push({id:"aether_drake",level:250}):N.push({id:"storm_elemental",level:250},{id:"aether_drake",level:250})}else if(v.currentMapId==="star_observatory"){const Q=Math.random()<.5?"aether_drake":"storm_elemental";N.push({id:Q,level:300})}else if(v.currentMapId==="celestial_sanctum"){const Q=v.enemies.some(ge=>ge.type==="celestial_architect"),$=Date.now(),ce=300*1e3;if(!Q&&$-v.lastBossKillTime>ce)N.push({id:"celestial_architect",level:400});else{const ge=Math.random()<.5?"storm_elemental":"aether_drake";N.push({id:ge,level:300})}}else{let Q="slime",$=1;v.currentMapId==="meadow"?(Q="slime",$=1):v.currentMapId==="forest"?(Q="goblin",$=5):v.currentMapId==="cave"&&(Q="bat",$=10),N.push({id:Q,level:$})}const I=[],F={x:Math.random()*(Wn*fo-200)+100,y:Math.random()*(Fn*fo-200)+100};return N.forEach((Q,$)=>{const ce=Fa[Q.id];if(!ce)return;const ge=N.length>1?{x:F.x+$*60-30,y:F.y+$*60-30}:F,de=Q.level,K=$i(ce,de);I.push({id:`enemy-${Date.now()}-${$}`,type:ce.id,position:ge,velocity:{x:0,y:0},size:{...ce.size},speed:ce.speed,hp:K?.maxHp||ce.maxHp,maxHp:K?.maxHp||ce.maxHp,level:de,expValue:K?.expValue||ce.expValue,atk:K?.atk||ce.atk,def:K?.def||ce.def||0,attackRange:ce.attackRange,attackCooldown:ce.attackCooldown,lastAttackTime:0,hitboxSize:{...ce.hitboxSize},hitboxOffset:{...ce.hitboxOffset},shield:K?.shield,glacierFallDamage:K?.glacierFallDamage,tailSwipeDamage:K?.tailSwipeDamage,orbitalLaserDamage:K?.orbitalLaserDamage,energyPulseDamage:K?.energyPulseDamage})}),{...v,enemies:[...v.enemies,...I],lastSpawnTime:Date.now()}})},[]),V=re.useCallback(v=>{s(S=>{const{player:m,enemies:p}=S;let b=m.hp,E=m.lastDamageTime,O=m.moveSpeedMultiplier,N=m.slowEndTime;const I=Date.now(),F=[...S.damageNumbers],Q=[...S.glacierFalls];O<1&&I>N&&(O=1);const $=Q.filter(K=>{if(I-K.createdAt>=K.impactTime){const je=m.position.x-K.position.x,Je=m.position.y-K.position.y;return Math.sqrt(je*je+Je*Je)<=K.radius&&(b-=K.damage,E=I,F.push({id:`dmg-glacier-${Date.now()}-${Math.random()}`,value:K.damage,vx:(Math.random()-.5)*3,position:{x:m.position.x+(Math.random()-.5)*15,y:m.position.y-10-Math.random()*10},color:"#00aaff",createdAt:Date.now()})),!1}return!0}),ge=[...S.orbitalLasers].filter(K=>{if(I-K.createdAt>=K.impactTime){const je=m.position.x-K.position.x,Je=m.position.y-K.position.y;return Math.sqrt(je*je+Je*Je)<=K.radius&&(b-=K.damage,E=I,F.push({id:`dmg-laser-${Date.now()}-${Math.random()}`,value:K.damage,vx:(Math.random()-.5)*3,position:{x:m.position.x+(Math.random()-.5)*15,y:m.position.y-10-Math.random()*10},color:"#ffff00",createdAt:Date.now()})),!1}return!0}),de=p.map(K=>{const oe=Fa[K.type];let je=K.speed;K.isEnraged&&oe?.enrageSpeedMultiplier&&(je*=oe.enrageSpeedMultiplier);const Je=m.position.x-K.position.x,ra=m.position.y-K.position.y,Mt=Math.sqrt(Je*Je+ra*ra);let Ea=0,xa=0;Mt>5&&!oe?.isStationary&&(Ea=Je/Mt*je,xa=ra/Mt*je);let Ta=K.lastGlacierFallTime??0;if(oe?.glacierFallCooldown&&I-Ta>=oe.glacierFallCooldown*1e3){const dt=(Math.random()-.5)*150,St=(Math.random()-.5)*150;$.push({id:`glacier-${I}-${Math.random()}`,position:{x:m.position.x+dt,y:m.position.y+St},createdAt:I,damage:K.glacierFallDamage??oe.glacierFallDamage??30,radius:oe.glacierFallRadius??60,impactTime:oe.glacierFallImpactTime??1500}),Ta=I}let en=K.lastTailSwipeTime??0,oa=K.tailSwipeStartTime??0;if(oe?.tailSwipeCooldown&&(oa===0&&Mt<=oe.tailSwipeRange&&I-en>=oe.tailSwipeCooldown*1e3&&(oa=I),oa>0)){const dt=(oe.tailSwipePreDelay||0)*1e3;if(I-oa>=dt){if(Mt<=oe.tailSwipeRange){const St=K.tailSwipeDamage??oe.tailSwipeDamage??200;b-=St,E=I,F.push({id:`dmg-tail-${I}-${Math.random()}`,value:St,vx:(Math.random()-.5)*4,position:{x:m.position.x,y:m.position.y-20},color:"#ff8800",createdAt:I})}en=I,oa=0}}let se=K.lastOrbitalLaserTime??0,et=K.orbitalLaserStartTime??0;if(oe?.orbitalLaserCooldown&&(et===0&&Mt<=(oe.orbitalLaserRadius||0)*4&&I-se>=oe.orbitalLaserCooldown*1e3&&(et=I),et>0)){const dt=(oe.orbitalLaserPreDelay||0)*1e3;I-et>=dt&&(ge.push({id:`laser-${I}-${Math.random()}`,position:{...m.position},createdAt:I,damage:K.orbitalLaserDamage??oe.orbitalLaserDamage??400,radius:oe.orbitalLaserRadius??100,impactTime:1e3}),se=I,et=0)}let va=K.lastEnergyPulseTime??0;if(oe?.energyPulseCooldown&&I-va>=oe.energyPulseCooldown*1e3){if(Mt<=oe.energyPulseRadius){const dt=K.energyPulseDamage??oe.energyPulseDamage??300;b-=dt,E=I,F.push({id:`dmg-pulse-${I}-${Math.random()}`,value:dt,vx:Je/Mt*5,position:{x:m.position.x,y:m.position.y},color:"#00ffff",createdAt:I})}va=I}let ba=K.atk;K.isEnraged&&oe?.enrageAtkMultiplier&&(ba=Math.floor(K.atk*oe.enrageAtkMultiplier));let Qt=K.lastAttackTime,Et=K.attackStartTime??0;const ja=oe?.attackPreDelay??.4,Rt=Math.min(ja,K.attackCooldown*.5)*1e3;if(Et===0&&Mt<=K.attackRange&&I-Qt>=K.attackCooldown*1e3&&(Et=I),Et>0&&I-Et>=Rt){if(Mt<=K.attackRange){const dt=Math.pow(Math.max(0,ba-Math.pow(m.def,1.1)),1.5)/5,St=ba*.05,Ie=Math.max(St,dt),pt=.9+Math.random()*.2,Ze=Math.floor(Ie*pt);b-=Ze,oe?.debuffType==="slow"&&(O=.6,N=I+2e3),F.push({id:`dmg-p-${Date.now()}-${Math.random()}`,value:Ze,vx:(Math.random()-.5)*3,position:{x:m.position.x+(Math.random()-.5)*15,y:m.position.y-10-Math.random()*10},color:K.isEnraged?"#ff0000":"#ff4b2b",createdAt:Date.now()}),E=I}Qt=I,Et=0}return{...K,position:{x:K.position.x+Ea*v,y:K.position.y+xa*v},lastAttackTime:Qt,attackStartTime:Et===0?void 0:Et,lastGlacierFallTime:Ta,lastTailSwipeTime:en,tailSwipeStartTime:oa===0?void 0:oa,lastOrbitalLaserTime:se,orbitalLaserStartTime:et===0?void 0:et,lastEnergyPulseTime:va}});return b<=0?{...S,currentMapId:"town",enemies:[],droppedItems:[],glacierFalls:[],player:{...m,hp:m.maxHp,position:{x:400,y:300},lastDamageTime:0,moveSpeedMultiplier:1,slowEndTime:0}}:{...S,player:{...m,hp:Math.max(0,b),lastDamageTime:E,moveSpeedMultiplier:O,slowEndTime:N},enemies:de,damageNumbers:F,glacierFalls:$,orbitalLasers:ge}})},[]),H=re.useCallback((v,S=1)=>{s(m=>{const p=Math.min(S,m.player.statPoints);if(p<=0)return m;const b={...m.player.stats};b[v]+=p;const E=la(b,m.player.equipment,m.player.level,m.currentMapId,m.player.skills);let O=m.player.hp,N=m.player.mp;return m.player.hp===m.player.maxHp&&(O=E.maxHp),m.player.mp===m.player.maxMp&&(N=E.maxMp),{...m,player:{...m.player,stats:b,statPoints:m.player.statPoints-p,...E,hp:Math.min(O,E.maxHp),mp:Math.min(N,E.maxMp)}}})},[]),U=re.useCallback(v=>{s(S=>{const m=S.player.skills[v],p=nm.find(E=>E.id===v);if(!p||m>=p.maxLevel||S.player.skillPoints<1)return S;const b={...S.player.skills};return b[v]=m+1,{...S,player:{...S.player,skills:b,skillPoints:S.player.skillPoints-1}}})},[]),P=re.useCallback(v=>{s(S=>{const m=S.player.inventory[v];if(!m)return S;const p=Xe[m.itemId];if(!p)return S;let{player:b}=S,E=[...b.inventory],O=b.hp,N=b.equipment.weapon,I=b.equipment.armor,F=b.equipment.helmet,Q=[...b.acquiredEquipment];const $=v;if(p.type==="Potion"){const ge=S.quickBar.indexOf(null);if(S.quickBar.indexOf(p.id)!==-1)return S;const K=[...S.quickBar];return ge!==-1?K[ge]=p.id:K[0]=p.id,{...S,quickBar:K}}else p.type==="Weapon"?(N&&E.push({itemId:N.id,quantity:1,enhanceLevel:N.enhanceLevel||0}),N={...p,enhanceLevel:m.enhanceLevel||0},Q.includes(p.id)||Q.push(p.id),E.splice($,1)):p.type==="Armor"?(I&&E.push({itemId:I.id,quantity:1,enhanceLevel:I.enhanceLevel||0}),I={...p,enhanceLevel:m.enhanceLevel||0},Q.includes(p.id)||Q.push(p.id),E.splice($,1)):p.type==="Helmet"&&(F&&E.push({itemId:F.id,quantity:1,enhanceLevel:F.enhanceLevel||0}),F={...p,enhanceLevel:m.enhanceLevel||0},Q.includes(p.id)||Q.push(p.id),E.splice($,1));const ce=la(b.stats,{weapon:N,armor:I,helmet:F},b.level,S.currentMapId,b.skills);return{...S,player:{...b,hp:Math.min(O,ce.maxHp),inventory:E,acquiredEquipment:Q,equipment:{...b.equipment,weapon:N,armor:I,helmet:F},...ce}}})},[]),J=re.useCallback(v=>{s(S=>{const{player:m}=S,p=v==="Weapon"?m.equipment.weapon:v==="Armor"?m.equipment.armor:m.equipment.helmet;if(!p)return S;const b=[...m.inventory];b.push({itemId:p.id,quantity:1,enhanceLevel:p.enhanceLevel||0});const E={...m.equipment,[v.toLowerCase()]:null},O=la(m.stats,E,m.level,S.currentMapId,m.skills);return{...S,player:{...m,inventory:b,equipment:E,...O,hp:Math.min(m.hp,O.maxHp)}}})},[]),le=re.useCallback(()=>{s(v=>{const{player:S}=v,m=(S.level-1)*5,p={str:1,dex:1,int:1,vit:1,def:1},b=la(p,S.equipment,S.level,v.currentMapId,S.skills);return{...v,player:{...S,stats:p,statPoints:m,...b,hp:b.maxHp,mp:b.maxMp}}}),c.current=!0},[la,s]),he=re.useCallback(()=>{s(v=>{const{player:S}=v,m=S.level,p=m<50?0:Math.floor(m/10-4)*5,b=la(S.stats,S.equipment,m,v.currentMapId,qu);return{...v,player:{...S,skills:{...qu},skillPoints:p,...b,hp:Math.min(S.hp,b.maxHp),mp:Math.min(S.mp,b.maxMp)}}}),c.current=!0},[la,s]),Z=re.useCallback(v=>{s(S=>{const m=S.quickBar[v];if(!m)return S;const p=S.player.inventory.findIndex(K=>K.itemId===m);if(p===-1)return S;const b=S.player.inventory[p],E=Xe[m];if(!E)return S;let{player:O}=S,N=[...O.inventory],I=O.hp,F=O.mp;if(E.id==="return_scroll"){b.quantity>1?N[p]={...b,quantity:b.quantity-1}:N.splice(p,1);const K=[...S.quickBar];return N.some(je=>je.itemId===m)||(K[v]=null),{...S,currentMapId:"town",enemies:[],droppedItems:[],player:{...O,position:{x:window.innerWidth/2,y:window.innerHeight/2},inventory:N},quickBar:K}}const Q=!!(E.hpRestore||E.hpRestorePercent),$=!!(E.mpRestore||E.mpRestorePercent);if(Q&&!$&&O.hp>=O.maxHp||$&&!Q&&O.mp>=O.maxMp||Q&&$&&O.hp>=O.maxHp&&O.mp>=O.maxMp)return S;E.hpRestore&&(I=Math.min(O.maxHp,O.hp+E.hpRestore)),E.hpRestorePercent&&(I=Math.min(O.maxHp,O.hp+Math.floor(O.maxHp*E.hpRestorePercent))),E.mpRestore&&(F=Math.min(O.maxMp,O.mp+E.mpRestore)),E.mpRestorePercent&&(F=Math.min(O.maxMp,O.mp+Math.floor(O.maxMp*E.mpRestorePercent))),b.quantity>1?N[p]={...b,quantity:b.quantity-1}:N.splice(p,1);const ce=[...S.quickBar];N.some(K=>K.itemId===m)||(ce[v]=null);const de=la(O.stats,O.equipment,O.level,S.currentMapId,O.skills);return{...S,player:{...O,hp:Math.min(I,de.maxHp),mp:Math.min(F,de.maxMp),inventory:N},quickBar:ce}})},[]),ae=re.useCallback(v=>{s(S=>{const m=[...S.quickBar];return m[v]=null,{...S,quickBar:m}}),c.current=!0},[s]),te=re.useCallback(v=>{s(S=>{const m=Xe[v];if(!m||S.player.gold<m.price||(m.type==="Weapon"||m.type==="Armor"||m.type==="Helmet")&&S.player.acquiredEquipment.includes(v))return S;let p=[...S.player.inventory],b=[...S.player.acquiredEquipment];if(m.stackable){const E=p.findIndex(O=>O.itemId===v);E!==-1?p[E]={...p[E],quantity:p[E].quantity+1}:p.push({itemId:v,quantity:1})}else p.push({itemId:v,quantity:1,enhanceLevel:0}),b.push(v);return{...S,player:{...S.player,gold:S.player.gold-m.price,inventory:p,acquiredEquipment:b}}}),c.current=!0},[Xe,s]),ee=re.useCallback((v,S=!1)=>{s(m=>{const p=m.player.inventory[v];if(!p)return m;const b=Xe[p.itemId];if(!b)return m;const E=S?p.quantity:1,O=Math.floor(b.price*.5)*E;let N=[...m.player.inventory];return!S&&p.quantity>1?N[v]={...p,quantity:p.quantity-1}:N.splice(v,1),{...m,player:{...m.player,gold:m.player.gold+O,inventory:N}}}),c.current=!0},[Xe,s]),q=re.useCallback(()=>{s(v=>({...v,activeUI:"None"}))},[s]),fe=re.useCallback(v=>{s(S=>({...S,activeUI:v}))},[s]),xe=re.useCallback(()=>{s(v=>({...v,activeUI:"Shop"}))},[]),me=re.useCallback(()=>{s(v=>{const S=Date.now(),m=(S-v.lastUpdate)/1e3;if(m<.1)return v;const p=v.player,b=p.skills.hpRegen*1;let E=p.hp;return b>0&&p.hp<p.maxHp&&(E=Math.min(p.hp+b*m,p.maxHp)),{...v,player:{...p,hp:E},lastUpdate:S}})},[]),Ee=re.useCallback(v=>{s(S=>{const{player:m}=S;let p,b=!1;if(v===-1?(p=m.equipment.weapon?{itemId:m.equipment.weapon.id,quantity:1,enhanceLevel:m.equipment.weapon.enhanceLevel||0}:null,b=!0):v===-2?(p=m.equipment.armor?{itemId:m.equipment.armor.id,quantity:1,enhanceLevel:m.equipment.armor.enhanceLevel||0}:null,b=!0):v===-3?(p=m.equipment.helmet?{itemId:m.equipment.helmet.id,quantity:1,enhanceLevel:m.equipment.helmet.enhanceLevel||0}:null,b=!0):p=m.inventory[v],!p)return S;const E=Xe[p.itemId];if(!E||E.type!=="Weapon"&&E.type!=="Armor"&&E.type!=="Helmet")return S;const O=p.enhanceLevel||0,N=m.inventory.findIndex(je=>je.itemId==="enhance_stone"),I=(O+1)*500;if(N===-1||m.gold<I)return S;let F=[...m.inventory];F[N].quantity>1?F[N]={...F[N],quantity:F[N].quantity-1}:F.splice(N,1);const Q=Math.max(.3,1-O*.1),$=Math.random()<Q;let ce=O;if($?ce=O+1:O>3&&(ce=Math.max(0,O-1)),!b){const je=F.findIndex(Je=>Je.itemId===p.itemId&&(Je.enhanceLevel||0)===O);je!==-1&&(F[je]={...F[je],enhanceLevel:ce})}let ge=m.equipment.weapon,de=m.equipment.armor,K=m.equipment.helmet;(v===-1||ge&&p.itemId===ge.id&&(p.enhanceLevel||0)===(ge.enhanceLevel||0))&&(ge=ge?{...ge,enhanceLevel:ce}:null),(v===-2||de&&p.itemId===de.id&&(p.enhanceLevel||0)===(de.enhanceLevel||0))&&(de=de?{...de,enhanceLevel:ce}:null),(v===-3||K&&p.itemId===K.id&&(p.enhanceLevel||0)===(K.enhanceLevel||0))&&(K=K?{...K,enhanceLevel:ce}:null);const oe=la(m.stats,{weapon:ge,armor:de,helmet:K},m.level,S.currentMapId,m.skills);return{...S,player:{...m,gold:m.gold-I,inventory:F,equipment:{weapon:ge,armor:de,helmet:K},...oe}}}),c.current=!0},[Xe,la,s]),we=re.useCallback(v=>{console.log("useGameState: Interact with",v.name,v.type);let S="......",m,p,b,E;v.dialogues&&v.dialogues.length>0?v.dialogueMode==="sequential"?(b=v.dialogues,E=0,b&&b.length>0&&(S=b[0])):S=v.dialogues[Math.floor(Math.random()*v.dialogues.length)]:v.type==="Merchant"?(S="Welcome! I have many good items for you.",m="Shop",p="Open Shop"):v.type==="Blacksmith"?(S="Need some equipment enhancement? I can hammer it out for you!",m="Enhance",p="Enhance"):v.type==="Guide"?S="Greetings, explorer. Welcome to Stellar Station.":v.type==="Spaceship"&&(S="System active. Please set your destination.",m="PlanetSelect",p="Launch"),s(O=>({...O,activeUI:"Dialog",currentDialog:{speaker:v.name,text:S,action:m,actionLabel:p,messages:b,messageIndex:E}}))},[]),Ve=re.useCallback(()=>{s(v=>{const{currentDialog:S}=v;if(!S||!S.messages||S.messageIndex===void 0)return{...v,activeUI:"None",currentDialog:null};const m=S.messageIndex+1;return m<S.messages.length?{...v,currentDialog:{...S,messageIndex:m,text:S.messages[m]}}:{...v,activeUI:"None",currentDialog:null}})},[]),$e=re.useCallback(()=>{s(v=>({...v,activeUI:"None",currentDialog:null}))},[]),Pe=re.useCallback(()=>{const v=f.current,S=Pn[v.currentMapId];if(!S)return;const m=S.npcs.find(p=>{const b=p.position.x-v.player.position.x,E=p.position.y-v.player.position.y;return Math.sqrt(b*b+E*E)<100});m&&we(m)},[we]),R=re.useCallback(v=>{s(S=>v==="cooldownVisualMode"?{...S,settings:{...S.settings,cooldownVisualMode:(S.settings.cooldownVisualMode+1)%4}}:{...S,settings:{...S.settings,[v]:!S.settings[v]}})},[]);re.useEffect(()=>{A(!0)},[A]),re.useEffect(()=>{const v=setInterval(()=>{x(!0)},15e3);return()=>clearInterval(v)},[x]);const W=re.useCallback(()=>{window.confirm("Are you sure you want to reset all data?")&&(localStorage.removeItem("void_walker_save"),s(Yi),alert("Data has been reset."))},[]);return{state:i,stateRef:f,updateEnemies:V,spawnEnemy:C,updateAttack:_,updateStats:me,triggerAttack:y,allocateStat:H,upgradeSkill:U,useItem:P,unEquip:J,resetStats:le,resetSkills:he,buyItem:te,sellItem:ee,closeUI:q,openShop:xe,handleInteraction:Pe,setUI:fe,enhanceEquipment:Ee,useQuickBarItem:Z,unassignQuickBarItem:ae,handleChangeMap:Y,handlePlayerPosition:k,toggleSetting:R,handleOpenDialog:we,handleCloseDialog:$e,handleNextDialog:Ve,saveGame:x,loadGame:A,resetGame:W,addToast:h}};var H1=Ch();const U1=z.div`
  display: inline-block;
`,N1=z.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 215, 0, 0.2);
  border: 1px solid rgba(255, 215, 0, 0.4);
  color: #ffd700;
  font-size: 0.75rem;
  font-weight: bold;
  margin-left: 6px;
  cursor: help;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 215, 0, 0.3);
    border-color: rgba(255, 215, 0, 0.6);
    transform: scale(1.1);
  }
`,L1=z.div`
  position: fixed;
  top: ${i=>i.top}px;
  left: ${i=>i.left}px;
  transform: ${i=>i.placement==="top"?"translate(-50%, -100%)":"translate(-50%, 0)"};
  background: linear-gradient(
    135deg,
    rgba(20, 20, 20, 0.98),
    rgba(30, 30, 30, 0.98)
  );
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  padding: 12px;
  min-width: 240px;
  max-width: 320px;
  width: max-content;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8);
  z-index: 10000;
  pointer-events: none;
  opacity: ${i=>i.visible?1:0};
  visibility: ${i=>i.visible?"visible":"hidden"};
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;
  white-space: normal;
  word-break: keep-all;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;

    ${i=>i.placement==="top"?`
      top: 100%;
      border-top-color: rgba(255, 215, 0, 0.3);
    `:`
      bottom: 100%;
      border-bottom-color: rgba(255, 215, 0, 0.3);
    `}
  }
`,G1=z.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  white-space: normal;
`,fu=z.div`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`,Tn=z.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  font-size: 0.85rem;
  color: ${i=>i.highlight?"#ffd700":"#ddd"};
  font-weight: ${i=>i.highlight?"bold":"normal"};
  gap: 12px;
`,$a=z.span`
  color: ${i=>i.color||"#ddd"};
  padding-left: ${i=>i.indent?"12px":"0"};
  font-size: 0.8rem;
  flex: 1;
  min-width: 0;
`,Ja=z.span`
  color: ${i=>i.color||"#fff"};
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
`,go=z.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 6px 0;
`,Xi=({statName:i,breakdown:s,includePercentage:f=!1})=>{const[c,h]=re.useState(!1),[x,A]=re.useState({top:0,left:0}),[Y,k]=re.useState("top"),y=re.useRef(null),_=re.useRef(null);re.useLayoutEffect(()=>{if(c&&y.current){const U=y.current.getBoundingClientRect(),P=_.current?.offsetHeight||200;U.top-P-10>0?(k("top"),A({top:U.top-8,left:U.left+U.width/2})):(k("bottom"),A({top:U.bottom+8,left:U.left+U.width/2}))}},[c]);const C=s.equipment.total>0,V=s.skills.total>0,H=u.jsxs(L1,{ref:_,visible:c,top:x.top,left:x.left,placement:Y,children:[u.jsxs(G1,{children:[i," ","Details"]}),u.jsx(fu,{children:u.jsxs(Tn,{children:[u.jsx($a,{color:"#fff",children:"Base"}),u.jsx(Ja,{color:"#fff",children:s.base})]})}),C&&u.jsxs(u.Fragment,{children:[u.jsx(go,{}),u.jsxs(fu,{children:[u.jsxs(Tn,{children:[u.jsx($a,{color:"#ffa500",children:"Equipment"}),u.jsxs(Ja,{color:"#ffa500",children:["+",s.equipment.total]})]}),u.jsx($a,{indent:!0,color:"#ffa500",children:"Weapon"}),u.jsxs(Ja,{color:"#ffa500",children:["+",s.equipment.weapon]}),s.equipment.armor>0&&u.jsxs(Tn,{children:[u.jsx($a,{indent:!0,color:"#ffa500",children:"Armor"}),u.jsxs(Ja,{color:"#ffa500",children:["+",s.equipment.armor]})]}),s.equipment.helmet>0&&u.jsxs(Tn,{children:[u.jsx($a,{indent:!0,color:"#ffa500",children:"Helmet"}),u.jsxs(Ja,{color:"#ffa500",children:["+",s.equipment.helmet]})]})]})]}),V&&u.jsxs(u.Fragment,{children:[u.jsx(go,{}),u.jsx(go,{}),u.jsxs(fu,{children:[u.jsxs(Tn,{children:[u.jsx($a,{color:"#4af",children:"Skills"}),u.jsxs(Ja,{color:"#4af",children:["+",s.skills.total]})]}),Object.entries(s.skills).map(([U,P])=>U==="total"||P===0?null:u.jsxs(Tn,{children:[u.jsx($a,{indent:!0,color:"#4af",children:U}),u.jsxs(Ja,{color:"#4af",children:["+",P]})]},U))]})]}),u.jsx(go,{}),u.jsxs(Tn,{highlight:!0,children:[u.jsx($a,{color:"#ffd700",children:"Total"}),u.jsx(Ja,{color:"#ffd700",children:s.total})]}),f&&s.base>0&&u.jsxs(Tn,{children:[u.jsx($a,{color:"#888",children:"Increase Rate"}),u.jsxs(Ja,{color:"#888",children:["+",Math.round((s.total-s.base)/s.base*100),"%"]})]})]});return u.jsxs(U1,{onMouseEnter:()=>h(!0),onMouseLeave:()=>h(!1),children:[u.jsx(N1,{ref:y,children:"ⓘ"}),H1.createPortal(H,document.body)]})};function ph(i){const{stats:s={str:1,dex:1,int:1,vit:1,def:1},equipment:f,skills:c,level:h=1}=i,{str:x=1,dex:A=1,int:Y=1,vit:k=1,def:y=1}=s,_=10+x*6+h*4,C=f.weapon?.atk||0,V=f.weapon?.enhanceLevel?C*f.weapon.enhanceLevel*.1:0,H=C+V,U={base:_,equipment:{weapon:H,armor:0,helmet:0,total:H},skills:{total:0},total:_+H},P=10+y*2+h*.5,J=f.armor?.def||0,le=f.armor?.enhanceLevel?J*f.armor.enhanceLevel*.1:0,he=J+le,Z=f.helmet?.def||0,ae=f.helmet?.enhanceLevel?Z*f.helmet.enhanceLevel*.1:0,te=Z+ae,ee=P+he+te,q=1+c.defenseBonus*.05,fe=Math.floor(ee*(q-1)),xe={base:P,equipment:{weapon:0,armor:he,helmet:te,total:he+te},skills:{"Defense Skill":fe,total:fe},total:Math.floor(ee*q)},me=100+k*150+h*60,Ee=c.maxHpBonus*100,we={base:me,equipment:{weapon:0,armor:0,helmet:0,total:0},skills:{"Max HP Skill":Ee,total:Ee},total:me+Ee},Ve=50+Y*25+h*2,$e={base:Ve,equipment:{weapon:0,armor:0,helmet:0,total:0},skills:{total:0},total:Ve},Pe=200+A*5,R=1+c.moveSpeed*.08,W=Math.floor(Pe*(R-1)),v={base:Pe,equipment:{weapon:0,armor:0,helmet:0,total:0},skills:{"Move Speed Skill":W,total:W},total:Math.floor(Pe*R)},S=c.critDamage*10,m=c.attackSpeed*4,p=c.hpRegen*1,b=c.expBonus*10,E=c.dropRate*10,O=c.goldBonus*15;return{atk:U,def:xe,maxHp:we,maxMp:$e,speed:v,critDamage:{current:150+S,base:150},attackSpeed:{current:m,base:0},hpRegen:{current:p},expBonus:{current:b},dropRate:{current:E},goldBonus:{current:O}}}const Y1=am`
  from { opacity: 0; transform: translate(-50%, -45%); }
  to { opacity: 1; transform: translate(-50%, -50%); }
`,X1=am`
  0% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.2); }
  50% { box-shadow: 0 0 15px rgba(255, 215, 0, 0.4); }
  100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.2); }
`,I1=z.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 950px;
  background: linear-gradient(
    135deg,
    rgba(20, 20, 20, 0.9) 0%,
    rgba(40, 40, 40, 0.85) 100%
  );
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 20px;
  padding: 30px;
  color: white;
  pointer-events: auto;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.9),
    inset 0 0 20px rgba(255, 215, 0, 0.05);
  backdrop-filter: blur(15px);
  max-height: 90vh;
  overflow-y: auto;
  animation: ${Y1} 0.3s ease-out;
  z-index: 1000;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 3px;
  }
`,Q1=z.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  padding-bottom: 15px;
`,V1=z.h2`
  color: var(--primary-color);
  margin: 0;
  font-size: 1.8rem;
  font-family: 'Outfit', sans-serif;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
`,Z1=z.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 25px;
  align-items: start;
`,du=z.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,yo=z.div`
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 5px;
  font-weight: 600;
`,K1=z.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 215, 0, 0.05);
    border-color: rgba(255, 215, 0, 0.2);
    transform: translateX(5px);
  }
`,$1=z.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`,J1=z.span`
  font-weight: 500;
  font-size: 0.95rem;
  color: #ddd;
`,W1=z.span`
  color: var(--primary-color);
  font-size: 1.1rem;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
`,F1=z.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`,P1=z.button`
  background: ${i=>i.$amount>=1e3?"linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)":i.$amount>=100?"linear-gradient(135deg, #c0c0c0 0%, #708090 100%)":i.$amount>=10?"linear-gradient(135deg, #cd7f32 0%, #8b4513 100%)":"rgba(255, 255, 255, 0.1)"};
  color: ${i=>i.$amount>=10?"black":"var(--primary-color)"};
  border: 1px solid
    ${i=>i.$amount>=10?"rgba(0,0,0,0.2)":"rgba(255, 215, 0, 0.3)"};
  min-width: 42px;
  height: 28px;
  font-size: 0.7rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 800;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;

  &::before {
    content: '+';
    font-size: 0.8rem;
    opacity: 0.7;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.2);
    box-shadow: 0 4px 12px
      ${i=>i.$amount>=1e3?"rgba(255, 215, 0, 0.4)":i.$amount>=100?"rgba(192, 192, 192, 0.4)":i.$amount>=10?"rgba(205, 127, 50, 0.4)":"rgba(255, 215, 0, 0.2)"};
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.95);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.05);
    color: #555;
    border-color: rgba(255, 255, 255, 0.05);
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`,hh=z.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`,pa=z.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }
`,ha=z.span`
  font-size: 0.85rem;
  color: #aaa;
`,ma=z.span`
  font-size: 0.9rem;
  color: #eee;
  font-weight: 600;
`,ex=z.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`,pu=z.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.03);
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`,hu=z.div`
  position: relative;
  width: 64px;
  height: 64px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  border: 1px solid #444;
  display: flex;
  justify-content: center;
  align-items: center;
`,mu=z.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 2px ${i=>i.$rarity});
`,gu=z.div`
  width: 100%;
  height: 100%;
  background:
    linear-gradient(
      45deg,
      transparent 45%,
      rgba(255, 255, 255, 0.1) 49%,
      transparent 51%
    ),
    linear-gradient(
      -45deg,
      transparent 45%,
      rgba(255, 255, 255, 0.1) 49%,
      transparent 51%
    );
`,yu=z.div`
  position: absolute;
  top: -4px;
  right: -4px;
  background: #000;
  color: #ffd700;
  border: 1px solid #ffd700;
  font-size: 0.6rem;
  padding: 1px 3px;
  border-radius: 4px;
  font-weight: bold;
`,xu=z.div`
  display: flex;
  flex-direction: column;
`,vu=z.span`
  font-size: 0.75rem;
  color: #888;
  text-transform: uppercase;
  margin-bottom: 4px;
`,bu=z.span`
  font-size: 1rem;
  font-weight: bold;
  color: ${i=>i.$active?"#fff":"#555"};
`,tx=z.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`,ax=z.div`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid var(--primary-color);
  padding: 12px;
  border-radius: 10px;
  text-align: center;
  font-size: 0.9rem;
  animation: ${X1} 2s infinite ease-in-out;

  span {
    color: var(--primary-color);
    font-weight: bold;
    font-size: 1.1rem;
    margin-left: 8px;
  }
`,nx=z.div`
  padding: 12px 16px;
  background: rgba(255, 215, 0, 0.03);
  border-radius: 10px;
  font-size: 0.85rem;
  color: #bbb;
  line-height: 1.5;
  min-height: 60px;
  border-left: 3px solid var(--primary-color);
`,lx=z.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`,ix=z.button`
  background: rgba(255, 75, 43, 0.1);
  color: #ff4b2b;
  border: 1px solid rgba(255, 75, 43, 0.3);
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s;

  &:hover {
    background: #ff4b2b;
    color: white;
  }
`,rx=z.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  text-transform: uppercase;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`,Su=z.button`
  background: rgba(255, 68, 68, 0.8);
  border: none;
  border-radius: 4px;
  color: white;
  padding: 2px 6px;
  font-size: 0.7rem;
  cursor: pointer;
  margin-top: 4px;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 68, 68, 1);
    transform: scale(1.05);
  }
`,ox=({player:i,onAllocate:s,onReset:f,onUnequip:c,onClose:h})=>{const[x,A]=ct.useState(null),Y=["str","dex","int","vit","def"],k={str:"STR",dex:"DEX",int:"INT",vit:"VIT",def:"DEF"},y={str:"Increases Attack Power and physical damage.",dex:"Increases Critical Rate, Speed, and Evasion.",int:"Increases Magic Power and Max Mana.",vit:"Increases Max HP and Health Regeneration.",def:"Increases Defense and reduces incoming damage."};return u.jsxs(I1,{children:[u.jsx(Q1,{children:u.jsx(V1,{children:"Status"})}),u.jsxs(Z1,{children:[u.jsxs(du,{children:[u.jsx(yo,{children:"Base Stats"}),Y.map(_=>u.jsxs(K1,{onMouseEnter:()=>A(_),onMouseLeave:()=>A(null),children:[u.jsxs($1,{children:[u.jsx(J1,{children:k[_]}),u.jsx(W1,{children:i.stats[_]})]}),u.jsx(F1,{children:[1,5,10,100,1e3].map(C=>u.jsx(P1,{$amount:C,disabled:i.statPoints<C,onClick:V=>{V.stopPropagation(),s(_,C)},children:C>=1e3?"1k":C},C))})]},_)),u.jsxs(ax,{style:{marginTop:"auto"},children:["Available Points"," ",u.jsx("span",{children:i.statPoints})]})]}),u.jsxs(du,{children:[u.jsx(yo,{children:"Combat Details"}),u.jsx(hh,{children:(()=>{const _=ph(i);return u.jsxs(u.Fragment,{children:[u.jsxs(pa,{children:[u.jsxs(ha,{children:["ATK",u.jsx(Xi,{statName:"ATK",breakdown:_.atk,includePercentage:!0})]}),u.jsx(ma,{children:_.atk.total.toFixed(1)})]}),u.jsxs(pa,{children:[u.jsxs(ha,{children:["DEF",u.jsx(Xi,{statName:"DEF",breakdown:_.def,includePercentage:!0})]}),u.jsx(ma,{children:_.def.total.toFixed(1)})]}),u.jsxs(pa,{children:[u.jsxs(ha,{children:["SPD",u.jsx(Xi,{statName:"SPD",breakdown:_.speed,includePercentage:!0})]}),u.jsx(ma,{children:_.speed.total.toFixed(0)})]}),u.jsxs(pa,{children:[u.jsxs(ha,{children:["Max HP",u.jsx(Xi,{statName:"Max HP",breakdown:_.maxHp,includePercentage:!0})]}),u.jsx(ma,{children:_.maxHp.total})]}),u.jsxs(pa,{children:[u.jsxs(ha,{children:["Max MP",u.jsx(Xi,{statName:"Max MP",breakdown:_.maxMp,includePercentage:!0})]}),u.jsx(ma,{children:_.maxMp.total})]})]})})()}),u.jsx(yo,{style:{marginTop:"10px"},children:"Skill Bonuses"}),u.jsx(hh,{children:(()=>{const _=ph(i);return u.jsxs(u.Fragment,{children:[u.jsxs(pa,{children:[u.jsx(ha,{children:"Crit Damage"}),u.jsxs(ma,{children:[_.critDamage.current,"%",_.critDamage.current>_.critDamage.base&&u.jsxs("span",{style:{color:"#4af",fontSize:"0.8rem",marginLeft:"6px"},children:["(+",_.critDamage.current-_.critDamage.base,"%)"]})]})]}),u.jsxs(pa,{children:[u.jsx(ha,{children:"Attack Speed"}),u.jsx(ma,{children:_.attackSpeed.current>0?`+${_.attackSpeed.current}%`:"0%"})]}),u.jsxs(pa,{children:[u.jsx(ha,{children:"HP Regen"}),u.jsx(ma,{children:_.hpRegen.current>0?`+${_.hpRegen.current} HP/s`:"0 HP/s"})]}),u.jsxs(pa,{children:[u.jsx(ha,{children:"EXP Bonus"}),u.jsx(ma,{children:_.expBonus.current>0?`+${_.expBonus.current}%`:"0%"})]}),u.jsxs(pa,{children:[u.jsx(ha,{children:"Drop Rate"}),u.jsx(ma,{children:_.dropRate.current>0?`+${_.dropRate.current}%`:"0%"})]}),u.jsxs(pa,{children:[u.jsx(ha,{children:"Gold Bonus"}),u.jsx(ma,{children:_.goldBonus.current>0?`+${_.goldBonus.current}%`:"0%"})]})]})})()})]}),u.jsxs(du,{children:[u.jsx(yo,{children:"Equipped Items"}),u.jsxs(ex,{children:[u.jsxs(pu,{children:[u.jsxs(hu,{children:[i.equipment.weapon?u.jsx(mu,{src:i.equipment.weapon.icon,$rarity:"gold"}):u.jsx(gu,{}),i.equipment.weapon?.enhanceLevel?u.jsxs(yu,{children:["+",i.equipment.weapon.enhanceLevel]}):null]}),u.jsxs(xu,{children:[u.jsx(vu,{children:"Main Weapon"}),u.jsx(bu,{$active:!!i.equipment.weapon,children:i.equipment.weapon?i.equipment.weapon.name:"No Weapon equipped"}),i.equipment.weapon&&u.jsx(Su,{onClick:()=>c("Weapon"),children:"Unequip"})]})]}),u.jsxs(pu,{children:[u.jsxs(hu,{children:[i.equipment.helmet?u.jsx(mu,{src:i.equipment.helmet.icon,$rarity:"#ff6b6b"}):u.jsx(gu,{}),i.equipment.helmet?.enhanceLevel?u.jsxs(yu,{children:["+",i.equipment.helmet.enhanceLevel]}):null]}),u.jsxs(xu,{children:[u.jsx(vu,{children:"Helmet"}),u.jsx(bu,{$active:!!i.equipment.helmet,children:i.equipment.helmet?i.equipment.helmet.name:"No Helmet equipped"}),i.equipment.helmet&&u.jsx(Su,{onClick:()=>c("Helmet"),children:"Unequip"})]})]}),u.jsxs(pu,{children:[u.jsxs(hu,{children:[i.equipment.armor?u.jsx(mu,{src:i.equipment.armor.icon,$rarity:"#00ced1"}):u.jsx(gu,{}),i.equipment.armor?.enhanceLevel?u.jsxs(yu,{children:["+",i.equipment.armor.enhanceLevel]}):null]}),u.jsxs(xu,{children:[u.jsx(vu,{children:"Armor"}),u.jsx(bu,{$active:!!i.equipment.armor,children:i.equipment.armor?i.equipment.armor.name:"No Armor equipped"}),i.equipment.armor&&u.jsx(Su,{onClick:()=>c("Armor"),children:"Unequip"})]})]})]})]})]}),u.jsxs(tx,{children:[u.jsx(nx,{children:x?y[x]:"Hover over a stat to see details"}),u.jsxs(lx,{children:[u.jsx(ix,{onClick:()=>{window.confirm("Are you sure you want to reset all stat points?")&&f()},children:"Reset Stats"}),u.jsx(rx,{onClick:h,children:"Close"})]})]})]})},sx=z.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(4px);
`,cx=z.div`
  background: var(--panel-bg);
  width: 900px;
  height: 750px;
  border-radius: 12px;
  border: 1px solid var(--primary-color);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
`,ux=z.h2`
  color: var(--primary-color);
  margin: 0 0 15px 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`,fx=z.div`
  display: flex;
  gap: 5px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
`,xo=z.button`
  flex: 1;
  background: ${i=>i.active?"var(--primary-color)":"rgba(255, 255, 255, 0.05)"};
  color: ${i=>i.active?"#000":"#ccc"};
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    background: ${i=>i.active?"var(--primary-color)":"rgba(255, 255, 255, 0.1)"};
  }
`,dx=z.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: min-content;
  gap: 15px;
  overflow-y: auto;
  padding: 10px;
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`,mh=z.div`
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid
    ${i=>i.active?"var(--primary-color)":"rgba(255, 255, 255, 0.1)"};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--primary-color);
  }
`,px=z.div`
  width: ${i=>i.size?`${i.size.x}px`:"32px"};
  height: ${i=>i.size?`${i.size.y}px`:"32px"};
  max-width: 100%;
  max-height: 100%;
  background: ${i=>i.icon?`url(${i.icon})`:i.color};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 4px;
  box-sizing: border-box;
`,hx=z.div`
  position: absolute;
  top: 2px;
  left: 4px;
  font-size: 10px;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px black;
`,mx=z.div`
  position: absolute;
  top: 2px;
  right: 4px;
  font-size: 10px;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 1px 1px 2px black;
`,gx=z.div`
  background: rgba(0, 0, 0, 0.3);
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  min-height: 120px;
`,yx=z.div`
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 5px;
`,xx=z.div`
  font-size: 0.85rem;
  color: #ccc;
  font-style: italic;
`,vo=z.button`
  margin-top: 10px;
  width: 100%;
  background: var(--primary-color);
  color: #000;
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    filter: brightness(1.2);
  }
`,vx=z.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #666;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: white;
  }
`,bx=({items:i,equipment:s,onUse:f,onUnEquip:c,onClose:h})=>{const[x,A]=re.useState("All"),[Y,k]=re.useState(null),y=i.map((H,U)=>({invItem:H,item:Xe[H.itemId],originalIndex:U})).filter(({item:H})=>H?x==="All"?!0:x==="Equipment"?H.type==="Weapon"||H.type==="Armor"||H.type==="Helmet":x==="Potions"?H.type==="Potion":x==="Materials"?H.type==="Material":H.type===x:!1),_=Y!==null?y[Y]:null,C=H=>{A(H),k(null)},V=(H,U)=>{let P=`${H.name}
${H.description}`;if(H.type==="Weapon"){const J=H;P+=`

ATK: ${J.atk}`,P+=`
Range: ${J.range}`,P+=`
Speed: ${J.speed}`,P+=`
Type: ${J.weaponType}`}else if(H.type==="Armor"||H.type==="Helmet")P+=`

DEF: ${H.def}`;else if(H.type==="Potion"){const J=H;J.hpRestore&&(P+=`

HP Restore: ${J.hpRestore}`),J.mpRestore&&(P+=`
MP Restore: ${J.mpRestore}`)}if(U.enhanceLevel&&U.enhanceLevel>0)if(H.type==="Weapon"){const J=H.atk*U.enhanceLevel*.1;P+=`
Enhance: +${U.enhanceLevel} (ATK +${J.toFixed(1)})`}else if(H.type==="Armor"||H.type==="Helmet"){const J=H.def*U.enhanceLevel*.1;P+=`
Enhance: +${U.enhanceLevel} (DEF +${J.toFixed(1)})`}else P+=`
Enhance: +${U.enhanceLevel}`;return P+=`
Price: ${H.price} Gold`,P};return u.jsx(sx,{onClick:h,children:u.jsxs(cx,{onClick:H=>H.stopPropagation(),children:[u.jsx(vx,{onClick:h,children:"×"}),u.jsx(ux,{children:"Inventory"}),u.jsxs(fx,{children:[u.jsx(xo,{active:x==="All",onClick:()=>C("All"),children:"All"}),u.jsx(xo,{active:x==="Equipment",onClick:()=>C("Equipment"),children:"Equipment"}),u.jsx(xo,{active:x==="Potions",onClick:()=>C("Potions"),children:"Potions"}),u.jsx(xo,{active:x==="Materials",onClick:()=>C("Materials"),children:"Materials"})]}),u.jsxs(dx,{children:[y.map(({item:H,invItem:U,originalIndex:P},J)=>u.jsxs(mh,{active:Y===J,onClick:()=>k(J),title:H?V(H,U):"",children:[H&&u.jsx(px,{icon:H.icon,size:H.inventorySize||H.size,color:H.type==="Weapon"?"#ffd700":H.type==="Armor"?"#00ced1":H.type==="Helmet"?"#ff6b6b":H.type==="Potion"?"#ff4b2b":"#aaa"}),U.quantity>1&&u.jsxs(hx,{children:["x",U.quantity]}),Number(U.enhanceLevel)>0&&u.jsxs(mx,{children:["+",U.enhanceLevel]}),(s.weapon&&U.itemId===s.weapon.id&&H?.type==="Weapon"||s.armor&&U.itemId===s.armor.id&&H?.type==="Armor"||s.helmet&&U.itemId===s.helmet.id&&H?.type==="Helmet")&&u.jsx("div",{style:{position:"absolute",bottom:"2px",right:"2px",fontSize:"8px",background:"var(--primary-color)",color:"black",padding:"1px 2px",fontWeight:"bold",borderRadius:"2px"},children:"E"})]},`${U.itemId}-${P}`)),y.length<25&&Array.from({length:25-y.length}).map((H,U)=>u.jsx(mh,{style:{cursor:"default"}},`empty-${U}`))]}),u.jsx(gx,{children:_&&_.item?u.jsxs(u.Fragment,{children:[u.jsxs(yx,{children:[_.item.name," ",_.invItem.enhanceLevel?`(+${_.invItem.enhanceLevel})`:""]}),_.item.type==="Weapon"&&u.jsxs("div",{style:{color:"#ffd700",fontWeight:"bold",marginBottom:"5px"},children:["ATK"," +",(_.item.atk*(1+(_.invItem.enhanceLevel||0)*.1)).toFixed(1),u.jsxs("span",{style:{fontSize:"0.8rem",color:"#888",marginLeft:"5px"},children:["(","Base"," ",_.item.atk," + ","Enhance"," ",(_.item.atk*(_.invItem.enhanceLevel||0)*.1).toFixed(1),")"]})]}),(_.item.type==="Armor"||_.item.type==="Helmet")&&u.jsxs("div",{style:{color:_.item.type==="Armor"?"#00ced1":"#ff6b6b",fontWeight:"bold",marginBottom:"5px"},children:["DEF"," +",(_.item.def*(1+(_.invItem.enhanceLevel||0)*.1)).toFixed(1),u.jsxs("span",{style:{fontSize:"0.8rem",color:"#888",marginLeft:"5px"},children:["(","Base"," ",_.item.def," + ","Enhance"," ",(_.item.def*(_.invItem.enhanceLevel||0)*.1).toFixed(1),")"]})]}),u.jsx(xx,{children:_.item.description}),u.jsxs("div",{style:{fontSize:"0.8rem",marginTop:"5px",color:"#999"},children:["Price",": ",_.item.price," Gold | ","Quantity",":"," ",_.invItem.quantity]}),_.item.type==="Weapon"||_.item.type==="Armor"||_.item.type==="Helmet"?(()=>{const H=_.item.type,U=H==="Weapon"?s.weapon:H==="Armor"?s.armor:s.helmet;return U&&U.id===_.item.id&&(U.enhanceLevel||0)===(_.invItem.enhanceLevel||0)?u.jsx(vo,{onClick:()=>c(H),children:"Unequip"}):U?u.jsx(vo,{disabled:!0,style:{opacity:.5,cursor:"not-allowed"},children:"Cannot Equip"}):u.jsx(vo,{onClick:()=>f(_.originalIndex),children:"Equip"})})():u.jsx(vo,{onClick:()=>f(_.originalIndex),children:"Use"})]}):u.jsx("div",{style:{color:"#666",textAlign:"center",paddingTop:"40px"},children:"Select an item to see details"})})]})})},Sx=(i,s=!1)=>s?"Tier ✦":i<=10?"Tier I":i<=30?"Tier II":i<=60?"Tier III":i<=100?"Tier IV":i<=200?"Tier V":i<=350?"Tier VI":"Tier VII",Ob=(i,s,f=!1)=>{if(f)return"#ffd700";const c=s-i;return c>=10?"#ff4444":c>=5?"#ffa500":c<=-10?"#44ff44":"#ffffff"},wx=z.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(4px);
`,zx=z.div`
  background: linear-gradient(145deg, #1a1a2e, #16213e);
  width: 500px;
  height: 700px;
  border-radius: 16px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  box-shadow:
    0 0 50px rgba(0, 0, 0, 0.9),
    inset 0 0 20px rgba(255, 215, 0, 0.05);
  display: flex;
  flex-direction: column;
  padding: 25px;
  position: relative;
  color: #e0e0e0;
`,_x=z.h2`
  color: #ffd700;
  margin: 0 0 25px 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 1.5rem;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`,Mx=z.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-right: 12px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(#ffd700, #ff8c00);
    border-radius: 10px;
  }
`,Ax=z.div`
  background: ${i=>i.unlocked?"linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)":"rgba(0, 0, 0, 0.4)"};
  border: 1px solid
    ${i=>i.isBoss?"rgba(255, 215, 0, 0.4)":i.unlocked?"rgba(255, 255, 255, 0.1)":"rgba(255, 255, 255, 0.05)"};
  border-radius: 12px;
  padding: 18px;
  display: flex;
  gap: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease-out;
  filter: ${i=>i.unlocked?"none":"grayscale(100%) opacity(0.4)"};

  &:hover {
    ${i=>i.unlocked&&`
      transform: translateY(-2px);
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%);
      border-color: ${i.isBoss?"#ffd700":"rgba(255, 255, 255, 0.2)"};
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `}
  }
`,Ex=z.div`
  width: 72px;
  height: 72px;
  background: ${i=>i.spriteUrl?`url(${i.spriteUrl}) center/contain no-repeat`:i.color};
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
`,Tx=z.div`
  flex: 1;
`,jx=z.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`,kx=z.h3`
  margin: 0;
  color: #fff;
  font-size: 1.15rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`,Cx=z.div`
  font-size: 0.7rem;
  color: #888;
  background: rgba(0, 0, 0, 0.3);
  padding: 3px 8px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`,Dx=z.span`
  font-size: 0.65rem;
  color: #000;
  background: #ff4d4d;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 900;
  text-transform: uppercase;
`,wu=z.p`
  margin: 5px 0;
  font-size: 0.85rem;
  color: #aaa;
  line-height: 1.4;
`,Ox=z.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 8px;
`,bo=z.div`
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;
  padding: 0 4px;

  span:first-child {
    color: #666;
    text-transform: uppercase;
    font-size: 0.65rem;
    font-weight: 600;
  }
  span:last-child {
    color: #ddd;
    font-weight: 500;
  }
`,gh=z.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`,yh=z.h4`
  font-size: 0.75rem;
  color: #555;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`,xh=z.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,vh=z.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 0.75rem;
  color: #bbb;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #eee;
  }
`,bh=z.span`
  color: #ffd700;
  font-weight: 600;
  font-size: 0.7rem;
`,Bx=z.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: #888;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 77, 77, 0.2);
    color: #ff4d4d;
    transform: rotate(90deg);
  }
`,So=[{id:"terran",name:"Terra",regions:[{id:"slime_grasslands",name:"Slime Grasslands",monsters:[{id:"slime",level:1}]},{id:"goblin_forest",name:"Goblin Forest",monsters:[{id:"goblin",level:5}]},{id:"dark_cave",name:"Dark Cave",monsters:[{id:"bat",level:8}]},{id:"frozen_zone",name:"Frozen Zone",monsters:[{id:"yeti",level:20},{id:"ice_spirit",level:20},{id:"frost_dragon",level:30}]}]},{id:"proxima",name:"Proxima",regions:[{id:"moon_plains",name:"Moon Plains",monsters:[{id:"quantum_wraith",level:50}]},{id:"lunar_ruins",name:"Lunar Ruins",monsters:[{id:"grav_drifter",level:60},{id:"optical_sentinel",level:60}]},{id:"lunar_void",name:"Lunar Void",monsters:[{id:"star_eater",level:80}]},{id:"lunar_core",name:"Lunar Core",monsters:[{id:"luna_overseer",level:100}]}]},{id:"aetheria",name:"Aetheria",regions:[{id:"aetheria_island",name:"Aetheria Island",monsters:[{id:"sky_wisp",level:120},{id:"cloud_guardian",level:120}]},{id:"wind_crystal",name:"Wind Crystal",monsters:[{id:"storm_elemental",level:130}]},{id:"mystic_forest",name:"Mystic Forest",monsters:[{id:"aether_drake",level:160}]},{id:"celestial_sanctuary",name:"Celestial Sanctuary",monsters:[{id:"celestial_architect",level:400}]}]}],qx=z.div`
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  padding: 4px;
  border-radius: 10px;
  margin-bottom: 25px;
  gap: 4px;
`,Rx=z.button`
  background: ${i=>i.active?"#ffd700":"transparent"};
  color: ${i=>i.active?"#000":"#888"};
  border: none;
  flex: 1;
  padding: 8px 0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    ${i=>!i.active&&"color: #fff;"}
  }
`,Hx=z.div`
  margin-bottom: 25px;
`,Ux=z.div`
  font-size: 0.75rem;
  color: #ffd700;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 800;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 215, 0, 0.2), transparent);
  }
`,Nx=z.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, #1e1e30 0%, #0a0a0f 100%);
  border-radius: 16px;
  z-index: 150;
  display: flex;
  flex-direction: column;
  padding: 30px;
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`,Lx=z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
`,Gx=z.div`
  width: 140px;
  height: 140px;
  background: ${i=>i.spriteUrl?`url(${i.spriteUrl}) center/contain no-repeat`:i.color};
  border-radius: 20px;
  margin-bottom: 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 160%;
    height: 160%;
    background: radial-gradient(
      circle,
      ${i=>i.color}22 0%,
      transparent 70%
    );
    z-index: -1;
  }
`,Yx=z.div`
  background: linear-gradient(90deg, #ffd700, #ff8c00);
  color: #000;
  padding: 4px 14px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 0.7rem;
  letter-spacing: 1px;
  margin-bottom: 15px;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  text-transform: uppercase;
`,Xx=z.h2`
  color: #fff;
  margin: 0 0 10px 0;
  font-size: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`,Ix=z.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
`,Qx=z.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(255, 215, 0, 0.3);
  }
`,Vx=z.div`
  color: #ffd700;
  font-weight: 700;
  margin-bottom: 6px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #ffd700;
    border-radius: 50%;
    box-shadow: 0 0 8px #ffd700;
  }
`,Zx=z.div`
  color: #aaa;
  font-size: 0.85rem;
  line-height: 1.6;
`,Kx=z.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #eee;
  padding: 12px 0;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: rgba(211, 47, 47, 0.1);
    border-color: rgba(211, 47, 47, 0.3);
    color: #ff4d4d;
  }
`,$x=z.div`
  cursor: pointer;
  transition: transform 0.1s;
  &:active {
    transform: scale(0.98);
  }
`,Jx=({bestiary:i,acquiredEquipment:s,dropRateSkillLevel:f,onClose:c})=>{const[h,x]=ct.useState(So[0].id),[A,Y]=ct.useState(null),k=So.find(C=>C.id===h)||So[0],y=A?Fa[A]:null,_=A&&i[A]||0;return u.jsx(wx,{onClick:c,children:u.jsxs(zx,{onClick:C=>C.stopPropagation(),children:[u.jsx(Bx,{onClick:c,children:"×"}),u.jsx(_x,{children:"Monster Book"}),u.jsx(qx,{children:So.map(C=>u.jsx(Rx,{active:h===C.id,onClick:()=>{x(C.id),Y(null)},children:C.name},C.id))}),u.jsx(Mx,{children:k.regions.map((C,V)=>u.jsxs(Hx,{children:[u.jsx(Ux,{children:C.name||C.id}),u.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"15px"},children:C.monsters.map(H=>{const U=Fa[H.id];if(!U)return null;const P=i[U.id]||0,J=P>0,le=$i(U,H.level);return u.jsx($x,{onClick:()=>J&&U.isBoss&&Y(U.id),children:u.jsxs(Ax,{unlocked:J,isBoss:U.isBoss,style:{cursor:U.isBoss?"pointer":"default"},children:[u.jsx(Ex,{color:J?U.color:"#222",spriteUrl:J?U.spriteUrl:void 0}),u.jsxs(Tx,{children:[u.jsxs(jx,{children:[u.jsx(kx,{children:J?u.jsxs(u.Fragment,{children:[u.jsxs(Dx,{children:["T",Sx(H.level,U.isBoss)]}),U.name]}):"Unknown Entity"}),J&&u.jsxs(Cx,{children:["Kills",": ",P]})]}),J?u.jsxs(u.Fragment,{children:[u.jsx(wu,{children:U.description}),u.jsxs(Ox,{children:[u.jsxs(bo,{children:[u.jsx("span",{children:"HP"})," ",u.jsx("span",{children:le.maxHp.toLocaleString()})]}),u.jsxs(bo,{children:[u.jsx("span",{children:"ATK"})," ",u.jsx("span",{children:le.atk.toLocaleString()})]}),u.jsxs(bo,{children:[u.jsx("span",{children:"DEF"})," ",u.jsx("span",{children:le.def.toLocaleString()})]}),u.jsxs(bo,{children:[u.jsx("span",{children:"EXP"})," ",u.jsx("span",{children:le.expValue.toLocaleString()})]})]}),U.isBoss&&u.jsx("div",{style:{marginTop:"12px",fontSize:"0.65rem",color:"#ffd700",fontWeight:800,textAlign:"right",textTransform:"uppercase",letterSpacing:"1px"},children:"View Master Files"}),!U.isBoss&&U.drops&&U.drops.length>0&&u.jsxs(gh,{children:[u.jsx(yh,{children:"Potential Yield"}),u.jsxs(xh,{children:[(()=>{const he=1+f*.1,Z=U.drops.filter(q=>{const fe=Xe[q.itemId];return!(fe&&(fe.type==="Weapon"||fe.type==="Armor"||fe.type==="Helmet"))||!s.includes(q.itemId)}),ae=Z.length>0?Math.min(...Z.map(q=>q.chance)):0,te=U.drops.map(q=>{const fe=s.includes(q.itemId),xe=Xe[q.itemId],me=xe&&(xe.type==="Weapon"||xe.type==="Armor"||xe.type==="Helmet");if(fe&&me)return{...q,weight:0,isAcquired:fe};const we=q.chance===ae?q.chance*he:q.chance;return{...q,weight:we,isAcquired:fe}}),ee=te.reduce((q,fe)=>q+fe.weight,0);return U.drops.slice(0,3).map((q,fe)=>{const xe=Xe[q.itemId],me=te.find($e=>$e.itemId===q.itemId),Ee=me?.isAcquired,we=me?.weight||0,Ve=ee>0&&we>0?we/ee*100:0;return u.jsxs(vh,{style:{opacity:Ee?.4:1,textDecoration:Ee?"line-through":"none"},children:[xe?xe.name:q.itemId,!Ee&&Ve>0&&u.jsxs(bh,{children:[Ve.toFixed(1),"%"]})]},fe)})})(),U.drops.length>3&&u.jsx("span",{style:{fontSize:"0.7rem",color:"#444"},children:"..."})]})]})]}):u.jsx(wu,{style:{color:"#444"},children:"Insufficient combat data to formulate patterns."})]})]})},U.id)})})]},V))}),y&&u.jsxs(Nx,{children:[u.jsxs(Lx,{children:[u.jsx(Yx,{children:"Priority Threat"}),u.jsx(Gx,{color:y.color,spriteUrl:y.spriteUrl}),u.jsx(Xx,{children:y.name}),u.jsx(wu,{style:{fontSize:"0.95rem",color:"#aaa",maxWidth:"400px",textAlign:"center"},children:y.description})]}),u.jsx("h3",{style:{color:"#fff",fontSize:"0.85rem",textTransform:"uppercase",letterSpacing:"2px",borderBottom:"1px solid rgba(255,255,255,0.05)",paddingBottom:"10px",marginBottom:"15px"},children:"Tactical Patterns"}),u.jsx(Ix,{children:_>=3?y.skillDescriptions?.map((C,V)=>u.jsxs(Qx,{children:[u.jsx(Vx,{children:C.name}),u.jsx(Zx,{children:C.description})]},V))||u.jsx("div",{style:{color:"#444",fontStyle:"italic",fontSize:"0.85rem"},children:"Insufficient combat data to formulate patterns."}):u.jsxs("div",{style:{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:"12px",padding:"30px 20px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:"15px"},children:[u.jsx("div",{style:{fontSize:"2rem",filter:"grayscale(1)"},children:"👁️‍🗨️"}),u.jsxs("div",{style:{color:"#666",fontSize:"0.9rem"},children:[u.jsx("b",{children:"Data Encrypted"}),u.jsx("div",{style:{marginTop:"5px",fontSize:"0.8rem"},children:"Analyze 3 specimens to decode combat patterns."})]}),u.jsx("div",{style:{background:"rgba(255,255,255,0.05)",height:"4px",width:"100px",borderRadius:"2px",overflow:"hidden",position:"relative"},children:u.jsx("div",{style:{background:"#ffd700",height:"100%",width:`${_/3*100}%`,transition:"width 0.5s ease-out"}})}),u.jsxs("div",{style:{fontSize:"0.7rem",color:"#ffd700"},children:["Progress",": ",_," / 3"]})]})}),y.drops&&y.drops.length>0&&u.jsxs(gh,{style:{marginTop:"20px"},children:[u.jsx(yh,{style:{color:"#888"},children:"Drop Manifest"}),u.jsx(xh,{children:(()=>{const C=1+f*.1,V=y.drops.filter(J=>{const le=Xe[J.itemId];return!(le&&(le.type==="Weapon"||le.type==="Armor"||le.type==="Helmet"))||!s.includes(J.itemId)}),H=V.length>0?Math.min(...V.map(J=>J.chance)):0,U=y.drops.map(J=>{const le=s.includes(J.itemId),he=Xe[J.itemId]?.type==="Weapon"||Xe[J.itemId]?.type==="Armor"||Xe[J.itemId]?.type==="Helmet";if(le&&he)return{...J,weight:0,isAcquired:le};const ae=J.chance===H?J.chance*C:J.chance;return{...J,weight:ae,isAcquired:le}}),P=U.reduce((J,le)=>J+le.weight,0);return y.drops.map((J,le)=>{const he=Xe[J.itemId],Z=U.find(q=>q.itemId===J.itemId),ae=Z?.isAcquired,te=Z?.weight||0,ee=P>0&&te>0?te/P*100:0;return u.jsxs(vh,{style:{background:ae?"rgba(255,255,255,0.05)":"rgba(255,215,0,0.05)",borderColor:ae?"rgba(255,255,255,0.1)":"rgba(255,215,0,0.2)",opacity:ae?.4:1,textDecoration:ae?"line-through":"none"},children:[he?he.name:J.itemId,!ae&&ee>0&&u.jsxs(bh,{children:[ee.toFixed(1),"%"]}),ae&&u.jsx("span",{style:{fontSize:"0.6rem",color:"#888",marginLeft:"5px",textDecoration:"none",display:"inline-block"},children:"Acquired"})]},le)})})()})]}),u.jsx(Kx,{onClick:()=>Y(null),children:"Return to Database"})]})]})})},Wx=({toasts:i})=>!i||i.length===0?null:u.jsxs("div",{className:"toast-container",children:[i.map(s=>u.jsxs("div",{className:"toast-item",style:{"--duration":`${s.duration||3e3}ms`},children:[u.jsx("div",{className:"toast-icon",children:u.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:u.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})}),u.jsx("div",{className:"toast-message",children:s.message})]},s.id)),u.jsx("style",{children:`
        .toast-container {
          position: fixed;
          top: 30px;
          right: 30px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: none;
        }

        .toast-item {
          background: rgba(10, 15, 30, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(100, 180, 255, 0.3);
          border-left: 5px solid #00d2ff;
          color: white;
          padding: 14px 24px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          min-width: 250px;
          
          /* Pop-in and Slide-out Unified Animation */
          animation: toast-lifecycle var(--duration) cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .toast-icon {
          width: 22px;
          height: 22px;
          color: #00d2ff;
          flex-shrink: 0;
          filter: drop-shadow(0 0 5px rgba(0, 210, 255, 0.5));
        }

        .toast-message {
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        @keyframes toast-lifecycle {
          /* Entry: 0% to 15% (Pop in with bounce) */
          0% { 
            transform: translateX(120%) scale(0.7); 
            opacity: 0; 
          }
          8% { 
            transform: translateX(-10%) scale(1.05); 
            opacity: 1; 
          }
          12% { 
            transform: translateX(0) scale(1); 
            opacity: 1; 
          }
          
          /* Stay: 12% to 88% */
          88% { 
            transform: translateX(0) scale(1); 
            opacity: 1; 
          }
          
          /* Exit: 88% to 100% (Smooth slide out) */
          100% { 
            transform: translateX(120%) scale(0.8); 
            opacity: 0; 
          }
        }
      `})]}),Fx=z.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2500;
  backdrop-filter: blur(8px);
`,Px=z.div`
  width: 700px;
  background: #0a0a20;
  border: 2px solid #303060;
  border-radius: 20px;
  padding: 30px;
  color: white;
  box-shadow: 0 0 50px rgba(0, 0, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
`,ev=z.h2`
  margin: 0;
  text-align: center;
  font-family: 'Outfit', sans-serif;
  letter-spacing: 4px;
  color: #a0c0ff;
  text-shadow: 0 0 10px rgba(160, 192, 255, 0.5);
`,tv=z.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 10px;
`,av=z.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  &:hover {
    background: ${i=>i.isLocked?"rgba(255, 0, 0, 0.05)":"rgba(255, 255, 255, 0.1)"};
    border-color: ${i=>i.isLocked?"#ff5050":"#5080ff"};
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  opacity: ${i=>i.isLocked?.6:1};
  cursor: ${i=>i.isLocked?"not-allowed":"pointer"};
`,nv=z.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ff5050;
  font-size: 1.2rem;
`,lv=z.div`
  font-size: 0.8rem;
  color: #ff8080;
  margin-top: 5px;
  font-weight: bold;
`,iv=z.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${i=>i.bg};
  box-shadow:
    inset -10px -10px 20px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(255, 255, 255, 0.1);
`,rv=z.div`
  font-size: 1.2rem;
  font-weight: bold;
`,ov=z.div`
  font-size: 0.9rem;
  color: #889;
  text-align: center;
`,sv=z.button`
  background: #202040;
  border: 1px solid #303060;
  color: #aad;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background: #303060;
    color: white;
  }
`,cv=[{id:"proxima_station",name:"Proxima Luna",desc:"Desolate moon where ancient ruins lie",color:"radial-gradient(circle at 30% 30%, #9e9e9e, #424242)",requiredBossId:"frost_dragon"},{id:"aetheria",name:"Aetheria",desc:"A fantastic artificial planet floating above the clouds",color:"radial-gradient(circle at 30% 30%, #4fc3f7, #0288d1)",requiredBossId:"luna_overseer"},{id:"ignis_prime",name:"Ignis Prime",desc:"Volcanic planet with constant lava eruptions",color:"radial-gradient(circle at 30% 30%, #f44336, #b71c1c)",requiredBossId:"celestial_architect"},{id:"xylos",name:"Xylos",desc:"Jungle filled with toxic spores and giant plants",color:"radial-gradient(circle at 30% 30%, #9c27b0, #4a148c)",requiredBossId:"ignis_overlord"}],uv=({onSelect:i,onClose:s,defeatedBosses:f})=>u.jsx(Fx,{onClick:c=>c.target===c.currentTarget&&s(),children:u.jsxs(Px,{children:[u.jsx(ev,{children:"Galactic Travel"}),u.jsx(tv,{children:cv.map(c=>{const h=c.requiredBossId&&!f.includes(c.requiredBossId),x=c.requiredBossId?Fa[c.requiredBossId]?.name||c.requiredBossId:"";return u.jsxs(av,{onClick:()=>!h&&i(c.id),isLocked:!!h,style:{position:"relative"},children:[h&&u.jsx(nv,{children:"🔒"}),u.jsx(iv,{bg:c.color}),u.jsx(rv,{children:c.name}),u.jsx(ov,{children:c.desc}),h&&u.jsx(lv,{children:`Defeat ${x} first to access this planet.`})]},c.id)})}),u.jsx(sv,{onClick:s,children:"Cancel"})]})}),fv=z.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 200px;
  background: rgba(0, 0, 0, 0.9);
  border: 4px solid #ffffff;
  border-radius: 8px;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
`,dv=z.div`
  font-size: 24px;
  font-weight: bold;
  color: #fbeb2b; /* Gold color for name */
  margin-bottom: 15px;
  text-shadow: 2px 2px 0 #000;
`,pv=z.div`
  font-size: 18px;
  line-height: 1.6;
  flex: 1;
`,hv=z.button`
  align-self: flex-end;
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 8px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: white;
    color: black;
  }
`,mv=z.button`
  align-self: flex-end;
  background: var(--primary-color);
  border: 2px solid var(--primary-color);
  color: black;
  padding: 8px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;

  &:hover {
    background: #e6c200;
  }
`,gv=z.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`,yv=({dialog:i,onClose:s,onNext:f,onAction:c})=>{if(!i)return null;const h=i.messages&&i.messageIndex!==void 0&&i.messageIndex<i.messages.length-1;return u.jsxs(fv,{children:[u.jsx(dv,{children:i.speaker}),u.jsx(pv,{children:i.text}),u.jsxs(gv,{children:[i.action&&i.actionLabel&&u.jsx(mv,{onClick:()=>c&&c(i.action),children:i.actionLabel}),u.jsx(hv,{onClick:h&&f?f:s,children:h?"Next":"End"})]})]})},xv=z.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(4px);
`,vv=z.div`
  background: var(--panel-bg);
  width: 350px;
  border-radius: 12px;
  border: 1px solid var(--primary-color);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
  padding: 20px;
  position: relative;
`,bv=z.h2`
  color: var(--primary-color);
  margin: 0 0 20px 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`,Sv=z.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #666;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: white;
  }
`,Ii=z.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`,Qi=z.span`
  color: #eee;
  font-size: 1rem;
`,wo=z.button`
  background: ${i=>i.active?"var(--primary-color)":"#444"};
  color: ${i=>i.active?"black":"#aaa"};
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    filter: brightness(1.1);
  }
`,zu=z.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid
    ${i=>i.variant==="danger"?"#ff4444":i.variant==="success"?"#44ff44":"var(--primary-color)"};
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 1px;

  &:hover {
    background: ${i=>i.variant==="danger"?"rgba(255, 68, 68, 0.2)":i.variant==="success"?"rgba(68, 255, 68, 0.2)":"rgba(255, 215, 0, 0.2)"};
  }
`,wv=({settings:i,onToggle:s,onClose:f,onSave:c,onLoad:h,onReset:x})=>{const A=k=>{switch(k){case 1:return"At Feet";case 2:return"On HUD";case 3:return"Glow Effect";default:return"Off"}},Y=()=>{s("cooldownVisualMode")};return u.jsx(xv,{onClick:f,children:u.jsxs(vv,{onClick:k=>k.stopPropagation(),children:[u.jsx(Sv,{onClick:f,children:"×"}),u.jsx(bv,{children:"Settings"}),u.jsx(Ii,{children:u.jsx(Qi,{children:"Language"})}),u.jsxs(Ii,{children:[u.jsx(Qi,{children:"Show Attack Range"}),u.jsx(wo,{active:i.showRange,onClick:()=>s("showRange"),children:i.showRange?"ON":"OFF"})]}),u.jsxs(Ii,{children:[u.jsx(Qi,{children:"Show Hitboxes"}),u.jsx(wo,{active:i.showHitbox,onClick:()=>s("showHitbox"),children:i.showHitbox?"ON":"OFF"})]}),u.jsxs(Ii,{children:[u.jsx(Qi,{children:"Cooldown Visual"}),u.jsx(wo,{active:i.cooldownVisualMode>0,onClick:Y,children:A(i.cooldownVisualMode)})]}),u.jsxs(Ii,{children:[u.jsx(Qi,{children:"Show Coordinates"}),u.jsx(wo,{active:i.showCoordinates,onClick:()=>s("showCoordinates"),children:i.showCoordinates?"ON":"OFF"})]}),u.jsxs("div",{style:{marginTop:"30px",display:"flex",flexDirection:"column",gap:"8px"},children:[u.jsx(zu,{variant:"success",onClick:c,children:"Save Game"}),u.jsx(zu,{onClick:h,children:"Load Game"}),u.jsx(zu,{variant:"danger",onClick:x,style:{marginTop:"20px"},children:"Reset Game"})]}),u.jsx("div",{style:{marginTop:"20px",fontSize:"0.8rem",color:"#666",textAlign:"center"},children:"Shortcuts"})]})})},zv=z.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,_v=z.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Mv=z.div`
  background: var(--panel-bg);
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  width: 250px;
`,Av=z.div`
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 5px;
  font-size: 0.9rem;
`,_u=z.div`
  width: 100%;
  height: 12px;
  background: #333;
  margin: 5px 0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
`,Mu=z.div`
  height: 100%;
  width: ${i=>i.$percent}%;
  background: ${i=>i.$color};
  transition: width 0.3s ease-out;
`,Sh=z.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.6rem;
  color: white;
  font-weight: bold;
  pointer-events: none;
`,Ev=z.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  padding-bottom: 20px;
  pointer-events: auto;
`,Vi=z.button`
  background: var(--panel-bg);
  color: var(--primary-color);
  border: 1px solid rgba(255, 215, 0, 0.3);
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  font-size: 0.85rem;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);

  &:hover {
    background: var(--primary-color);
    color: black;
    transform: translateY(-2px);
  }

  span {
    display: block;
    font-size: 0.6rem;
    opacity: 0.6;
    margin-bottom: 2px;
  }
`,Tv=z.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 64px;
  height: 64px;
  background: var(--panel-bg);
  border: 2px solid var(--primary-color);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  pointer-events: auto;
  overflow: hidden;
`,jv=z.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.5) 40%),
    conic-gradient(
      rgba(255, 255, 255, 0.3) ${i=>i.$progress*360}deg,
      transparent 0
    );
  pointer-events: none;
`,kv=z.div`
  font-size: 2rem;
  filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
`,Cv=({player:i,settings:s,onOpenStatus:f,onOpenInventory:c,onOpenSkills:h,onOpenBestiary:x,onOpenSettings:A})=>{const Y=i.hp/i.maxHp*100,k=i.mp/i.maxMp*100,y=i.exp/i.maxExp*100,_=i.attack.isAttacking?1-i.attack.progress:0;return u.jsxs(zv,{children:[u.jsx(_v,{children:u.jsxs(Mv,{children:[u.jsxs(Av,{children:["Level ",i.level]}),u.jsxs(_u,{children:[u.jsx(Mu,{$color:"#ff4b2b",$percent:Y}),u.jsxs(Sh,{children:["HP ",i.hp," / ",i.maxHp]})]}),u.jsxs(_u,{children:[u.jsx(Mu,{$color:"#2b86ff",$percent:k}),u.jsxs(Sh,{children:["MP ",i.mp," / ",i.maxMp]})]}),u.jsx(_u,{style:{height:"6px"},children:u.jsx(Mu,{$color:"#ffd700",$percent:y})}),u.jsxs("div",{style:{marginTop:"10px",fontSize:"0.8rem",color:"#999",textAlign:"right"},children:["Gold: ",i.gold]})]})}),u.jsxs(Tv,{children:[u.jsx(kv,{children:"⚔️"}),s.cooldownVisualMode===2&&_>0&&u.jsx(jv,{$progress:_})]}),u.jsxs(Ev,{children:[u.jsxs(Vi,{onClick:f,children:[u.jsx("span",{children:"[C]"})," Status"]}),u.jsxs(Vi,{onClick:c,children:[u.jsx("span",{children:"[I]"})," Inventory"]}),u.jsxs(Vi,{onClick:h,children:[u.jsx("span",{children:"[K]"})," Skills"]}),u.jsxs(Vi,{onClick:x,children:[u.jsx("span",{children:"[B]"})," Bestiary"]}),u.jsxs(Vi,{onClick:A,children:[u.jsx("span",{children:"[O]"})," Settings"]})]})]})},Dv=z.div`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  pointer-events: auto;
`,Ov=z.div`
  width: 70px;
  height: 70px;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid
    ${i=>i.$active?"var(--primary-color)":"rgba(255, 255, 255, 0.2)"};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  transition: all 0.2s;

  ${i=>i.$active&&`
    box-shadow: 0 0 15px var(--primary-color);
  `}
`,Bv=z.div`
  position: absolute;
  top: -10px;
  left: -10px;
  background: var(--primary-color);
  color: black;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
`,qv=z.div`
  position: absolute;
  bottom: 2px;
  right: 4px;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px black;
`,Rv=z.div`
  width: ${i=>i.$size?`${i.$size.x}px`:"44px"};
  height: ${i=>i.$size?`${i.$size.y}px`:"44px"};
  max-width: 100%;
  max-height: 100%;
  background: ${i=>i.$icon?`url(${i.$icon})`:i.$color};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 4px;
  box-sizing: border-box;
`,Hv=z.div`
  color: rgba(255, 255, 255, 0.2);
  font-size: 0.6rem;
  text-align: center;
`,Uv=({quickBar:i,inventory:s,onClick:f})=>u.jsx(Dv,{children:i.map((c,h)=>{const x=c?Xe[c]:null,A=c?s.find(Y=>Y.itemId===c):null;return u.jsxs(Ov,{$active:!!c,onClick:()=>f(h),children:[u.jsx(Bv,{children:h+1}),c&&x?u.jsxs(u.Fragment,{children:[u.jsx(Rv,{$icon:x.icon,$size:x.quickBarSize||x.size,$color:x.id==="red_potion"?"#ff4b2b":x.id==="blue_potion"?"#2b4bff":"#ff8c00"}),A&&A.quantity>1&&u.jsxs(qv,{children:["x",A.quantity]})]}):u.jsx(Hv,{children:"-"})]},h)})}),Nv=z.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
`,Lv=z.div`
  width: 1000px;
  height: 750px;
  background: #1a1a1a;
  border: 2px solid #444;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  color: white;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`,Gv=z.div`
  padding: 15px;
  background: #2a2a2a;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #444;
`,Yv=z.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 24px;
  &:hover {
    color: white;
  }
`,Xv=z.div`
  display: flex;
  background: #222;
`,wh=z.button`
  flex: 1;
  padding: 10px;
  background: ${i=>i.active?"#333":"transparent"};
  border: none;
  color: ${i=>i.active?"#ffd700":"#888"};
  cursor: pointer;
  border-bottom: 2px solid
    ${i=>i.active?"#ffd700":"transparent"};
  &:hover {
    background: #2a2a2a;
  }
`,Iv=z.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`,zh=z.div`
  background: #252525;
  border: 1px solid #333;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &:hover {
    border-color: #ffd700;
  }
`,_h=z.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Mh=z.div`
  width: ${i=>i.size?`${i.size.x}px`:"80px"};
  height: ${i=>i.size?`${i.size.y}px`:"80px"};
  max-width: 100%;
  max-height: 100%;
  background: ${i=>i.icon?`url(${i.icon})`:i.color||"#444"};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`,Ah=z.div`
  flex: 1;
`,Eh=z.div`
  font-weight: bold;
  color: #fff;
`,Th=z.div`
  font-size: 14px;
  color: #ffd700;
`,jh=z.div`
  font-size: 12px;
  color: #aaa;
  line-height: 1.4;
`,Ru=z.button`
  padding: 8px;
  background: #3a3a3a;
  border: 1px solid #555;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #4a4a4a;
    border-color: #ffd700;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Qv=z(Ru)`
  background: #4a3a3a;
  border-color: #664444;
  &:hover {
    background: #5a4a4a;
    border-color: #ff4444;
  }
`,Vv=z.div`
  display: flex;
  gap: 8px;
`,Zv=z.div`
  padding: 15px;
  background: #2a2a2a;
  text-align: right;
  font-size: 18px;
  color: #ffd700;
  border-top: 1px solid #444;
`,Kv=({state:i,onClose:s,onBuy:f,onSell:c})=>{const[h,x]=ct.useState("Buy"),k=Pn[i.currentMapId]?.npcs.find(y=>y.type==="Merchant")?.shopItems||[];return u.jsx(Nv,{onClick:y=>y.target===y.currentTarget&&s(),children:u.jsxs(Lv,{children:[u.jsxs(Gv,{children:["Shop",u.jsx(Yv,{onClick:s,children:"×"})]}),u.jsxs(Xv,{children:[u.jsx(wh,{active:h==="Buy",onClick:()=>x("Buy"),children:"Buy"}),u.jsx(wh,{active:h==="Sell",onClick:()=>x("Sell"),children:"Sell"})]}),u.jsx(Iv,{children:h==="Buy"?k.map(y=>{const _=Xe[y];return!_||(_.type==="Weapon"||_.type==="Armor"||_.type==="Helmet")&&i.player.acquiredEquipment.includes(y)?null:u.jsxs(zh,{children:[u.jsxs(_h,{children:[u.jsx(Mh,{icon:_.icon,size:_.inventorySize||_.size,color:"#334455"}),u.jsxs(Ah,{children:[u.jsx(Eh,{children:_.name}),u.jsxs(Th,{children:[_.price," ","Gold"]})]})]}),u.jsx(jh,{children:_.description}),u.jsx(Ru,{disabled:i.player.gold<_.price,onClick:()=>f(y),children:"Buy"})]},y)}):i.player.inventory.map((y,_)=>{const C=Xe[y.itemId];if(!C)return null;const V=Math.floor(C.price*.5);return u.jsxs(zh,{children:[u.jsxs(_h,{children:[u.jsx(Mh,{icon:C.icon,size:C.inventorySize||C.size,color:"#443333"}),u.jsxs(Ah,{children:[u.jsxs(Eh,{children:[C.name," (x",y.quantity,")"]}),u.jsxs(Th,{children:[V," ","Gold"]})]})]}),u.jsx(jh,{children:C.description}),u.jsxs(Vv,{children:[u.jsx(Ru,{onClick:()=>c(_),children:"Sell 1"}),y.quantity>1&&u.jsx(Qv,{onClick:()=>c(_,!0),children:"Sell All"})]})]},`${y.itemId}-${_}`)})}),u.jsxs(Zv,{children:["Gold",": ",i.player.gold," G"]})]})})},$v=z.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`,Jv=z.div`
  background: #222;
  border: 4px solid #444;
  padding: 20px;
  width: 500px;
  color: white;
  font-family: 'Inter', sans-serif;
`,Wv=z.h2`
  color: #ffd700;
  text-align: center;
  margin-top: 0;
  border-bottom: 2px solid #444;
  padding-bottom: 10px;
`,Fv=z.div`
  max-height: 300px;
  overflow-y: auto;
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`,Pv=z.div`
  background: ${i=>i.active?"#443":"#333"};
  border: 1px solid ${i=>i.active?"#ffd700":"#444"};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #444;
  }
`,kh=z.button`
  background: #ffd700;
  color: black;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;

  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`,eb=z.div`
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #aaa;
`,tb=({state:i,onClose:s,onEnhance:f})=>{const[c,h]=ct.useState(null),{equipment:x}=i.player,A=[];x.weapon&&A.push({inv:{itemId:x.weapon.id,quantity:1,enhanceLevel:x.weapon.enhanceLevel||0},idx:-1,isEquipped:!0}),x.armor&&A.push({inv:{itemId:x.armor.id,quantity:1,enhanceLevel:x.armor.enhanceLevel||0},idx:-2,isEquipped:!0}),x.helmet&&A.push({inv:{itemId:x.helmet.id,quantity:1,enhanceLevel:x.helmet.enhanceLevel||0},idx:-3,isEquipped:!0});const Y=A.find(H=>H.idx===c),k=Y?Y.inv:null,y=k?.enhanceLevel||0,_=(y+1)*500,C=i.player.inventory.find(H=>H.itemId==="enhance_stone")?.quantity||0,V=c!==null&&i.player.gold>=_&&C>0;return u.jsx($v,{onClick:s,children:u.jsxs(Jv,{onClick:H=>H.stopPropagation(),children:[u.jsx(Wv,{children:"Equipment Enhancement"}),u.jsxs(eb,{children:["Enhance your weapons and armor to increase their stats."," ",u.jsx("br",{}),"Requires Enhancement Stones and Gold."]}),u.jsx(Fv,{children:A.length>0?A.map(({inv:H,idx:U})=>u.jsxs(Pv,{active:c===U,onClick:()=>h(U),children:[u.jsxs("div",{children:[u.jsxs("strong",{children:[Xe[H.itemId]?.name||H.itemId," (+",H.enhanceLevel||0,")"]}),u.jsx("div",{style:{fontSize:"0.8rem",color:"#888"},children:Xe[H.itemId]?.description||""})]}),u.jsx("div",{style:{color:"#ffd700"},children:"Equipped"})]},U)):u.jsx("div",{style:{textAlign:"center",padding:"20px",color:"#888"},children:"No items available for enhancement."})}),k&&u.jsxs("div",{style:{marginBottom:"20px",padding:"10px",background:"#111"},children:[u.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"5px"},children:[u.jsxs("span",{children:["Required Gold",":"]}),u.jsxs("span",{style:{color:i.player.gold>=_?"#0f0":"#f00"},children:[_," G (","Owned",": ",i.player.gold," G)"]})]}),u.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[u.jsxs("span",{children:["Required Stones",":"]}),u.jsxs("span",{style:{color:C>0?"#0f0":"#f00"},children:["1 / ",C]})]}),u.jsxs("div",{style:{marginTop:"10px",textAlign:"center",fontSize:"1.1rem",color:"#ffd700"},children:["Success Rate",":"," ",Math.floor(Math.max(.3,1-y*.1)*100),"%"]})]}),u.jsxs("div",{style:{display:"flex",gap:"10px"},children:[u.jsx(kh,{disabled:!V,onClick:()=>c!==null&&f(c),children:"Enhance"}),u.jsx(kh,{style:{background:"#555",color:"white"},onClick:s,children:"Close"})]})]})})},ab=z.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: auto;
`,nb=z.div`
  width: 600px;
  max-height: 80vh;
  background: linear-gradient(
    135deg,
    rgba(20, 20, 20, 0.95) 0%,
    rgba(40, 40, 40, 0.9) 100%
  );
  border: 2px solid rgba(255, 215, 0, 0.4);
  border-radius: 16px;
  padding: 25px;
  color: white;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.8),
    inset 0 0 30px rgba(255, 215, 0, 0.05);
  backdrop-filter: blur(10px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
  }
`,lb=z.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.3);
`,ib=z.h2`
  color: var(--primary-color);
  margin: 0;
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`,rb=z.div`
  font-size: 1.2rem;
  color: #ffd700;
  background: rgba(255, 215, 0, 0.1);
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  font-weight: bold;
`,ob=z.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`,Au=z.button`
  flex: 1;
  padding: 12px;
  background: ${i=>i.active?"linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))":"rgba(255, 255, 255, 0.03)"};
  border: 1px solid
    ${i=>i.active?"rgba(255, 215, 0, 0.5)":"rgba(255, 255, 255, 0.1)"};
  border-radius: 8px;
  color: ${i=>i.active?"#ffd700":"#888"};
  font-size: 0.9rem;
  font-weight: ${i=>i.active?"bold":"normal"};
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${i=>i.active?"linear-gradient(135deg, rgba(255, 215, 0, 0.25), rgba(255, 215, 0, 0.15))":"rgba(255, 255, 255, 0.05)"};
    border-color: ${i=>i.active?"rgba(255, 215, 0, 0.6)":"rgba(255, 255, 255, 0.2)"};
  }
`,sb=z.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,cb=z.div`
  background: ${i=>i.maxed?"linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))":"rgba(255, 255, 255, 0.03)"};
  border: 1px solid
    ${i=>i.maxed?"rgba(255, 215, 0, 0.3)":"rgba(255, 255, 255, 0.1)"};
  border-radius: 12px;
  padding: 16px;
  transition: all 0.2s ease;

  &:hover {
    background: ${i=>i.maxed?"linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.08))":"rgba(255, 255, 255, 0.05)"};
    border-color: ${i=>i.maxed?"rgba(255, 215, 0, 0.4)":"rgba(255, 255, 255, 0.2)"};
  }
`,ub=z.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,fb=z.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffd700;
`,db=z.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,pb=z.span`
  font-size: 0.9rem;
  color: ${i=>i.maxed?"#00ff00":"#aaa"};
  font-weight: ${i=>i.maxed?"bold":"normal"};
`,hb=z.button`
  padding: 6px 16px;
  background: ${i=>i.disabled?"rgba(100, 100, 100, 0.2)":"linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0.2))"};
  border: 1px solid
    ${i=>i.disabled?"rgba(100, 100, 100, 0.3)":"rgba(255, 215, 0, 0.5)"};
  border-radius: 6px;
  color: ${i=>i.disabled?"#555":"#ffd700"};
  font-size: 0.85rem;
  font-weight: bold;
  cursor: ${i=>i.disabled?"not-allowed":"pointer"};
  transition: all 0.2s ease;

  &:hover {
    background: ${i=>i.disabled?"rgba(100, 100, 100, 0.2)":"linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(255, 215, 0, 0.3))"};
    border-color: ${i=>i.disabled?"rgba(100, 100, 100, 0.3)":"rgba(255, 215, 0, 0.6)"};
  }
`,mb=z.div`
  font-size: 0.85rem;
  color: #aaa;
  margin-bottom: 8px;
  line-height: 1.4;
`,gb=z.div`
  font-size: 0.9rem;
  color: #4af;
  font-weight: bold;
`,yb=z.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #666;
  font-size: 28px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ffd700;
  }
`,xb=z.button`
  background: rgba(255, 50, 50, 0.1);
  border: 1px solid rgba(255, 50, 50, 0.3);
  color: #ff4d4d;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 15px;

  &:hover {
    background: rgba(255, 50, 50, 0.2);
    border-color: rgba(255, 50, 50, 0.5);
    box-shadow: 0 0 10px rgba(255, 50, 50, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`,vb=({player:i,onClose:s,onUpgradeSkill:f,onResetSkills:c})=>{const[h,x]=re.useState("combat"),A=()=>{window.confirm("Are you sure you want to reset all skills? You will get all skill points back.")&&c()},Y=C1(h);return u.jsx(ab,{onClick:s,children:u.jsxs(nb,{onClick:k=>k.stopPropagation(),children:[u.jsx(yb,{onClick:s,children:"×"}),u.jsxs(lb,{children:[u.jsx(ib,{children:"Skills"}),u.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[u.jsx(xb,{onClick:A,children:"Reset Skills"}),u.jsxs(rb,{children:["Available Points",": ",u.jsx("span",{children:i.skillPoints})]})]})]}),u.jsxs(ob,{children:[u.jsxs(Au,{active:h==="combat",onClick:()=>x("combat"),children:["⚔️ ","Combat"]}),u.jsxs(Au,{active:h==="survival",onClick:()=>x("survival"),children:["🛡️ ","Survival"]}),u.jsxs(Au,{active:h==="utility",onClick:()=>x("utility"),children:["⚙️ ","Utility"]})]}),u.jsx(sb,{children:Y.map(k=>{const y=i.skills[k.id],_=y>=k.maxLevel,C=i.skillPoints>0&&!_,V=y*k.effectPerLevel,H=(y+1)*k.effectPerLevel;return u.jsxs(cb,{maxed:_,children:[u.jsxs(ub,{children:[u.jsx(fb,{children:k.name}),u.jsxs(db,{maxed:_,children:[u.jsxs(pb,{maxed:_,children:["Lv"," ",y,"/",k.maxLevel,_&&" MAX"]}),u.jsx(hb,{disabled:!C,onClick:()=>C&&f(k.id),children:"+"})]})]}),u.jsx(mb,{children:k.description}),u.jsxs(gb,{children:[y>0&&u.jsxs(u.Fragment,{children:["Current",": +",V,k.effectUnit]}),y===0&&u.jsx(u.Fragment,{children:"No bonus yet"}),!_&&y>0&&u.jsxs(u.Fragment,{children:[" ","→ ","Next",": +",H,k.effectUnit]}),!_&&y===0&&u.jsxs(u.Fragment,{children:[" ","→ ","Next",": +",H,k.effectUnit]})]})]},k.id)})})]})})},bb=z.div`
  width: 100vw;
  height: 100vh;
  background-color: #111;
  position: relative;
  overflow: hidden;
`,Sb=z.div`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  pointer-events: none;
  z-index: 10;
`,wb=z.div`
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.8rem;
  letter-spacing: 2px;
  background: rgba(0, 0, 0, 0.4);
  padding: 2px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 215, 0, 0.2);
`,zb=`
  @keyframes slideIn {
    0% { transform: translateX(100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
`,_b=`
  @keyframes slideOut {
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
  }
`,Mb=z.div`
  position: absolute;
  top: 120px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Right aligned */
  padding: 1.5rem 3rem 1.5rem 6rem; // Left padding for gradient fade
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.8) 40%,
    rgba(0, 0, 0, 0.9) 100%
  );
  pointer-events: none;
  z-index: 100;

  ${zb}
  ${_b}
  
  // Enter (0.5s) -> Wait (3s) -> Exit (0.5s)
  animation: slideIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, 
             slideOut 0.5s ease-in 3.5s forwards;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: var(--primary-color);
    box-shadow: 0 0 10px var(--primary-color);
  }
`,Ab=z.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 2.8rem;
  font-weight: 800;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin: 0;
  text-align: right;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  line-height: 1;
`,Eb=z.div`
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 2px;
  margin-top: 8px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 12px;
`,Tb=z.span`
  color: var(--primary-color);
  font-weight: bold;
  font-family: 'Courier New', monospace;
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`,jb=()=>{const i=re.useRef(null),s=re.useRef(null),[f,c]=re.useState(null),{state:h,stateRef:x,updateEnemies:A,spawnEnemy:Y,updateAttack:k,updateStats:y,allocateStat:_,upgradeSkill:C,triggerAttack:V,useItem:H,unEquip:U,resetStats:P,resetSkills:J,buyItem:le,sellItem:he,closeUI:Z,handleInteraction:ae,setUI:te,enhanceEquipment:ee,useQuickBarItem:q,unassignQuickBarItem:fe,handleChangeMap:xe,handlePlayerPosition:me,toggleSetting:Ee,handleOpenDialog:we,handleCloseDialog:Ve,handleNextDialog:$e,saveGame:Pe,loadGame:R,resetGame:W}=R1(),v=re.useRef(new Set),S=re.useRef(0),m=re.useRef(0);return re.useEffect(()=>{let p=!1;return(async()=>{if(!i.current||s.current)return;const{createPhaserGame:E}=await k1(async()=>{const{createPhaserGame:N}=await import("./PhaserGame-BdsUqxwH.js");return{createPhaserGame:N}},[]);if(p||!i.current||s.current)return;const O=E(i.current);s.current=O,c(O),O.events.once("scene-ready",()=>{O.events.emit("updateState",x.current)})})(),()=>{p=!0,s.current?.destroy(!0),s.current=null,c(null)}},[]),re.useEffect(()=>{f&&f.events.emit("updateState",h)},[f,h.currentMapId,h.player.position,h.player.hp,h.player.mp,h.enemies,h.droppedItems]),re.useEffect(()=>{if(f)return f.events.on("changeMap",xe),f.events.on("npcClicked",p=>{console.log("GameView: npcClicked received",p),we(p)}),()=>{f.events.off("changeMap",xe),f.events.off("npcClicked")}},[f,xe,te,we]),re.useEffect(()=>{if(f)return f.events.on("playerPosition",me),()=>{f.events.off("playerPosition",me)}},[f,me]),re.useEffect(()=>{const p=E=>{const O=E.key.toLowerCase();v.current.add(O),O==="c"&&te(h.activeUI==="Status"?"None":"Status"),O==="i"&&te(h.activeUI==="Inventory"?"None":"Inventory"),O==="b"&&te(h.activeUI==="MonsterBook"?"None":"MonsterBook"),O==="k"&&te(h.activeUI==="Skills"?"None":"Skills"),O==="o"&&te(h.activeUI==="Settings"?"None":"Settings"),O==="f"&&ae(),E.key==="1"&&q(0),E.key==="2"&&q(1),E.key==="3"&&q(2),E.key==="4"&&q(3),E.key==="5"&&q(4),E.key===" "&&V(),E.key==="Escape"&&Z()},b=E=>{v.current.delete(E.key.toLowerCase())};return window.addEventListener("keydown",p),window.addEventListener("keyup",b),()=>{window.removeEventListener("keydown",p),window.removeEventListener("keyup",b)}},[h.activeUI,ae,q,V,Z,te]),re.useEffect(()=>{const p=b=>{if(m.current===0){m.current=b,S.current=requestAnimationFrame(p);return}const E=(b-m.current)/1e3;m.current=b;const O=Math.min(E,.1);A(O),k(O),y();const N=Pn[x.current.currentMapId];if(N){const I=Date.now(),F=x.current.lastSpawnTime||0,Q=(N.spawnInterval||5)*1e3;N.canSpawnMonsters&&I-F>=Q&&Y()}S.current=requestAnimationFrame(p)};return S.current=requestAnimationFrame(p),()=>cancelAnimationFrame(S.current)},[A,k,y,Y,x]),re.useEffect(()=>{const p=()=>{s.current&&s.current.scale.resize(window.innerWidth,window.innerHeight)};return window.addEventListener("resize",p),()=>window.removeEventListener("resize",p)},[]),u.jsxs(bb,{children:[u.jsx("div",{ref:i,style:{width:"100%",height:"100%"}}),u.jsx(Sb,{children:h.settings.showCoordinates&&u.jsxs(wb,{children:["X: ",Math.round(h.player.position.x)," Y:"," ",Math.round(h.player.position.y)]})}),u.jsxs(Mb,{children:[u.jsx(Ab,{children:Pn[h.currentMapId]?.name||"Unknown Region"}),u.jsxs(Eb,{children:["Entering Zone",u.jsx(Tb,{children:"Area"})]})]},h.currentMapId),u.jsx(Cv,{player:h.player,settings:h.settings,onOpenStatus:()=>te("Status"),onOpenInventory:()=>te("Inventory"),onOpenSkills:()=>te("Skills"),onOpenBestiary:()=>te("MonsterBook"),onOpenSettings:()=>te("Settings")}),u.jsx(Uv,{quickBar:h.quickBar,inventory:h.player.inventory,onClick:fe}),h.activeUI==="Status"&&u.jsx(ox,{player:h.player,onAllocate:_,onReset:P,onUnequip:U,onClose:Z}),h.activeUI==="Inventory"&&u.jsx(bx,{items:h.player.inventory,equipment:h.player.equipment,onUse:H,onUnEquip:U,onClose:Z}),h.activeUI==="MonsterBook"&&u.jsx(Jx,{bestiary:h.bestiary,acquiredEquipment:h.player.acquiredEquipment,dropRateSkillLevel:h.player.skills.dropRate||0,onClose:Z}),h.activeUI==="Shop"&&u.jsx(Kv,{state:h,onClose:Z,onBuy:le,onSell:he}),h.activeUI==="Enhance"&&u.jsx(tb,{state:h,onClose:Z,onEnhance:ee}),h.activeUI==="PlanetSelect"&&u.jsx(uv,{defeatedBosses:h.player.defeatedBosses,onSelect:p=>{xe({mapId:p,x:1280/2,y:960/2}),Z()},onClose:Z}),h.activeUI==="Dialog"&&h.currentDialog&&u.jsx(yv,{dialog:h.currentDialog,onClose:Ve,onNext:$e,onAction:p=>te(p)}),h.activeUI==="Settings"&&u.jsx(wv,{settings:h.settings,onToggle:Ee,onClose:Z,onSave:Pe,onLoad:R,onReset:W}),h.activeUI==="Skills"&&u.jsx(vb,{player:h.player,onClose:Z,onUpgradeSkill:C,onResetSkills:J}),u.jsx(Wx,{toasts:h.toasts})]})},kb=z.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
`,Cb=()=>u.jsxs(u.Fragment,{children:[u.jsx(E1,{}),u.jsx(kb,{children:u.jsx(jb,{})})]});My.createRoot(document.getElementById("root")).render(u.jsx(re.StrictMode,{children:u.jsx(Cb,{})}));export{Xe as I,Fn as M,Db as T,Pn as W,Wn as a,Fa as b,fo as c,Ob as d,gy as g,Sx as l};
