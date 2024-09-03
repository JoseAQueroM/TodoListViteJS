(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function d(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function c(n){if(n.ep)return;n.ep=!0;const l=d(n);fetch(n.href,l)}})();const w=`<section class="todoapp">\r
    <header class="header">\r
        <h1 style="color:white;">Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong class="conteo-pending" id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="selected filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
`;let h;const T=new Uint8Array(16);function v(){if(!h&&(h=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!h))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return h(T)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function L(e,t=0){return r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]}const S=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),y={randomUUID:S};function E(e,t,d){if(y.randomUUID&&!t&&!e)return y.randomUUID();e=e||{};const c=e.random||(e.rng||v)();return c[6]=c[6]&15|64,c[8]=c[8]&63|128,L(c)}class C{constructor(t){this.id=E(),this.description=t,this.done=!1,this.createAt=new Date}}const i={all:"All",completed:"Completed",pending:"Pending"},s={todos:[],filter:i.all},k=()=>{x(),console.log(" Store Creado ")},x=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=i.all}=JSON.parse(localStorage.getItem("state"));s.todos=e,s.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(s))},b=(e=i.all)=>{switch(e){case i.all:return[...s.todos];case i.completed:return s.todos.filter(t=>t.done===!0);case i.pending:return s.todos.filter(t=>t.done===!1);default:throw new Error(`El filtro ${e} no es valido`)}},U=e=>{if(!e)throw new Error("No existe descripcion");s.todos.push(new C(e)),g()},I=e=>{s.todos=s.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},P=e=>{s.todos=s.todos.filter(t=>t.id!==e),g()},A=()=>{s.todos=s.todos.filter(e=>!e.done),g()},f=(e=i.all)=>{s.filter=e,g()},N=()=>s.filter,q=e=>{const t=`
        <div class="view">
            <input class="toggle" type="checkbox" ${e.done?"checked":""}>
            <label>${e.description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit">
                 `,d=document.createElement("li");return d.innerHTML=t,d.setAttribute("data-id",e.id),e.done&&d.classList.add("completed"),d};let m;const D=(e,t=[])=>{if(m||(m=document.querySelector(e)),!m)throw new Error("Elemento id no encontrado");m.innerHTML="",t.forEach(d=>{m.append(q(d))})},p={ClearCompleted:".clear-completed",TodoList:".todo-list",NewTodo:"#new-todo-input",Filters:".filtro",ConteoPending:".conteo-pending"},M=e=>{const t=()=>{const o=b(N()),a=b(i.pending).length,u=document.querySelector(p.ConteoPending);u.innerHTML=a,D(p.TodoList,o)};(()=>{const o=document.createElement("div");o.innerHTML=w,document.querySelector(e).append(o),t()})();const d=document.querySelector(p.NewTodo),c=document.querySelector(p.TodoList),n=document.querySelector(p.ClearCompleted),l=document.querySelectorAll(p.Filters);d.addEventListener("keyup",o=>{o.keyCode===13&&o.target.value.trim().length!==0&&(U(o.target.value),t(),o.target.value="")}),c.addEventListener("click",o=>{const a=o.target.closest("[data-id]");I(a.getAttribute("data-id")),t()}),c.addEventListener("click",o=>{const a=o.target.className==="destroy",u=o.target.closest("[data-id]");!u||!a||(P(u.getAttribute("data-id")),t())}),n.addEventListener("click",o=>{console.log(o),A(),t()}),l.forEach(o=>{o.addEventListener("click",a=>{switch(l.forEach(u=>u.classList.remove("selected")),a.target.classList.add("selected"),a.target.text){case"Todos":f(i.all);break;case"Pendientes":f(i.pending);break;case"Completados":f(i.completed);break}t()})})};k();M("#app");
