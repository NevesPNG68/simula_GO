let MONTHS=[];
const DEFAULT_COSTS=[
{nome:'Pró-labore Natan',centro:'Pró-labore',valor:3500,corte:1,ativa:true},
{nome:'Aluguel',centro:'Aluguel',valor:2974.33,corte:0,ativa:true},
{nome:'Locação da cafeteira',centro:'Locação',valor:803.85,corte:0,ativa:true},
{nome:'Segurança',centro:'Administrativo',valor:152,corte:0,ativa:true},
{nome:'Internet',centro:'Administrativo',valor:223.59,corte:0,ativa:true},
{nome:'Contabilidade',centro:'Administrativo',valor:337.01,corte:0,ativa:true},
{nome:'Marketing',centro:'Marketing',valor:450,corte:0,ativa:true},
{nome:'Sistema Nexus',centro:'Administrativo',valor:468.90,corte:0,ativa:true},
{nome:'Estacionamento Natan',centro:'Administrativo',valor:150,corte:1,ativa:true},
{nome:'FGTS',centro:'Encargos',valor:300.44,corte:0,ativa:true},
{nome:'Receita Federal',centro:'Impostos',valor:292.10,corte:0,ativa:true},
{nome:'Simples Nacional',centro:'Impostos',valor:1057.65,corte:0,ativa:true},
{nome:'Energia elétrica',centro:'Utilidades',valor:1377.47,corte:0,ativa:true},
{nome:'Água',centro:'Utilidades',valor:251.49,corte:0,ativa:true}
];
const H={
geral:[0,.06347295846,.09160397418,.06935415748,.05572155859,.0655918883,.09589268903,.15274996863,.1869045085,.15854409783],
baixa:[0,.0578576539,.08977809141,.06848172635,.05516148863,.06751683905,.09582013532,.16478183622,.1981047735,.15861401322],
alta:[0,.0793118513,.10642901069,.07633984653,.06368127051,.06537627492,.09458506071,.12813269641,.1537048269,.14965629105]
};
let costs=JSON.parse(localStorage.getItem('goCosts')||'null')||DEFAULT_COSTS.map(x=>({...x}));
let employees=JSON.parse(localStorage.getItem('goEmployees')||'null')||[
{nome:'Fernando',custo:2160.69,ativo:false,aplicacao:'todos'},
{nome:'Pedro',custo:2160.69,ativo:true,aplicacao:'todos'},
{nome:'Funcionário extra alta',custo:2160.69,ativo:true,aplicacao:'alta'}
];
let charts={};
const $=x=>document.getElementById(x);
const money=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(v)||0);
const pct=v=>new Intl.NumberFormat('pt-BR',{style:'percent',minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(v)||0);
const sum=(a,k)=>a.reduce((s,x)=>s+(+x[k]||0),0);
const avg=(a,k)=>a.length?sum(a,k)/a.length:0;

function groups(){
  const a=MONTHS.filter(m=>m.mes!=='Jul/26'&&m.receita_liquida>0);
  return{geral:a,baixa:a.filter(m=>m.receita_liquida<30000&&!['Dez/25','Jan/26'].includes(m.mes)),alta:a.filter(m=>['Dez/25','Jan/26'].includes(m.mes))};
}
function mc(a){const r=sum(a,'receita_liquida');return r?a.reduce((s,m)=>s+m.receita_liquida*m.mc_pct,0)/r:0}
function fixed(){return costs.reduce((s,c)=>s+(c.ativa?c.valor*(1-c.corte):0),0)}
function emp(t){return employees.filter(e=>e.ativo&&(e.aplicacao==='todos'||e.aplicacao===t)).reduce((s,e)=>s+(+e.custo||0),0)}
function utility(){return costs.filter(c=>c.ativa&&['Energia elétrica','Água'].includes(c.nome)).reduce((s,c)=>s+c.valor*(1-c.corte),0)}
function kept(t,o,c){return H[t].reduce((s,v,i)=>s+((8+i)>=o&&(8+i)<c?v:0),0)}
function scenario(t,o=+$('openHour').value||10,c=+$('closeHour').value||18){
  const a=groups()[t]||[];
  const base=+$('manualRevenue').value||avg(a,'receita_liquida');
  const margin=+$('manualMC').value||mc(a);
  const keep=kept(t,o,c),rev=base*keep,h=c-o;
  const save=Math.max(0,utility()*(+$('utility').value||.6)*(1-h/8));
  const sun=(+$('sundays').value||4.33)*(+$('sundayRate').value||80);
  const cost=fixed()+emp(t)-save+sun,res=rev*margin-cost;
  return{base,margin,keep,rev,cost,res,pe:margin?cost/margin:0};
}
const cls=v=>v>=1000?'good':v>=0?'warn':'bad';
const status=v=>v>=5000?'Muito saudável':v>=1000?'Aceitável':v>=0?'Margem apertada':'Deficitário';

function scenarioCard(t){
  const d=scenario(t),n={geral:'Geral',baixa:'Baixa temporada',alta:'Alta temporada'}[t];
  return `<article class="scenario" data-r="${d.res}"><div class="scenarioHead"><b>${n}</b><span class="badge">${pct(d.keep)} da receita</span></div><div class="metric"><span>Receita projetada</span><b>${money(d.rev)}</b></div><div class="metric"><span>MC</span><b>${pct(d.margin)}</b></div><div class="metric"><span>Custo total</span><b>${money(d.cost)}</b></div><div class="metric"><span>Ponto de equilíbrio</span><b>${money(d.pe)}</b></div><div class="metric"><span>Resultado mensal</span><b class="${cls(d.res)}">${money(d.res)}</b></div><div class="metric"><span>Resultado anual</span><b class="${cls(d.res)}">${money(d.res*12)}</b></div><div class="metric"><span>Leitura</span><b class="${cls(d.res)}">${status(d.res)}</b></div></article>`;
}
function draw(id,config){if(charts[id])charts[id].destroy();charts[id]=new Chart($(id),config)}
function dashboard(){
  const types=['geral','baixa','alta'],ds=types.map(scenario),best=ds.reduce((a,b)=>a.res>b.res?a:b);
  $('kpis').innerHTML=[['Melhor resultado',money(best.res),status(best.res)],['Custos ativos',money(fixed()+emp('geral')),'Despesas e equipe'],['PE geral',money(ds[0].pe),'Receita mínima'],['Projeção anual',money(ds[0].res*12),'Cenário geral']].map(x=>`<article class="kpi"><label>${x[0]}</label><strong>${x[1]}</strong><small>${x[2]}</small></article>`).join('');
  $('cards').innerHTML=types.map(scenarioCard).join('');
  const cs=[...document.querySelectorAll('.scenario')].sort((a,b)=>+b.dataset.r-+a.dataset.r);if(cs[0])cs[0].classList.add('best');
  draw('chartResult',{type:'bar',data:{labels:['Geral','Baixa','Alta'],datasets:[{type:'line',label:'Receita',data:ds.map(x=>x.rev),borderColor:'#245786',backgroundColor:'#245786',borderWidth:3,pointRadius:5,tension:.25,yAxisID:'y'},{type:'bar',label:'Resultado',data:ds.map(x=>x.res),backgroundColor:ds.map(x=>x.res<0?'#c9352b':'#d6a02e'),borderColor:ds.map(x=>x.res<0?'#a61f17':'#b27b12'),borderWidth:1,yAxisID:'y'}]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},scales:{y:{beginAtZero:true,grid:{color:'rgba(120,130,145,.18)'},ticks:{callback:v=>money(v)}},x:{grid:{display:false}}},plugins:{tooltip:{callbacks:{label:c=>`${c.dataset.label}: ${money(c.raw)}`}}}}});
  draw('chartPE',{type:'bar',data:{labels:['Geral','Baixa','Alta'],datasets:[{label:'Receita',data:ds.map(x=>x.rev),backgroundColor:'#245786'},{label:'Ponto de equilíbrio',data:ds.map(x=>x.pe),backgroundColor:'#c8912d'}]},options:{responsive:true,maintainAspectRatio:false,scales:{y:{beginAtZero:true,ticks:{callback:v=>money(v)}}}}});
}
function renderCosts(){
  $('costBody').innerHTML=costs.map((c,i)=>`<tr><td><input type="checkbox" data-ca="${i}" ${c.ativa?'checked':''}></td><td>${c.nome}</td><td>${c.centro}</td><td><input type="number" step=".01" data-cv="${i}" value="${c.valor}"></td><td><input type="number" min="0" max="100" data-cc="${i}" value="${Math.round(c.corte*100)}"></td><td>${money(c.ativa?c.valor*(1-c.corte):0)}</td><td>${money((c.ativa?c.valor*(1-c.corte):0)*12)}</td></tr>`).join('');
  const orig=costs.reduce((s,c)=>s+c.valor,0),rest=fixed();
  $('costFoot').innerHTML=`<tr><th colspan="3">TOTAL</th><th>${money(orig)}</th><th>${pct(orig?(orig-rest)/orig:0)}</th><th>${money(rest)}</th><th>${money(rest*12)}</th></tr>`;
  document.querySelectorAll('[data-ca]').forEach(e=>e.oninput=()=>{costs[+e.dataset.ca].ativa=e.checked;save();render()});
  document.querySelectorAll('[data-cv]').forEach(e=>e.oninput=()=>{costs[+e.dataset.cv].valor=+e.value||0;save();render()});
  document.querySelectorAll('[data-cc]').forEach(e=>e.oninput=()=>{costs[+e.dataset.cc].corte=Math.max(0,Math.min(100,+e.value||0))/100;save();render()});
}
function renderEmployees(){
  $('employeeBody').innerHTML=employees.map((e,i)=>`<tr><td><input type="checkbox" data-ea="${i}" ${e.ativo?'checked':''}></td><td><input data-en="${i}" value="${e.nome}"></td><td><input type="number" step=".01" data-ec="${i}" value="${e.custo}"></td><td><select data-eu="${i}"><option value="todos" ${e.aplicacao==='todos'?'selected':''}>Todos</option><option value="geral" ${e.aplicacao==='geral'?'selected':''}>Geral</option><option value="baixa" ${e.aplicacao==='baixa'?'selected':''}>Baixa</option><option value="alta" ${e.aplicacao==='alta'?'selected':''}>Alta</option></select></td><td><button class="danger" data-ed="${i}">Excluir</button></td></tr>`).join('');
  document.querySelectorAll('[data-ea]').forEach(x=>x.oninput=()=>{employees[+x.dataset.ea].ativo=x.checked;save();render()});
  document.querySelectorAll('[data-en]').forEach(x=>x.oninput=()=>{employees[+x.dataset.en].nome=x.value;save()});
  document.querySelectorAll('[data-ec]').forEach(x=>x.oninput=()=>{employees[+x.dataset.ec].custo=+x.value||0;save();render()});
  document.querySelectorAll('[data-eu]').forEach(x=>x.oninput=()=>{employees[+x.dataset.eu].aplicacao=x.value;save();render()});
  document.querySelectorAll('[data-ed]').forEach(x=>x.onclick=()=>{employees.splice(+x.dataset.ed,1);save();render()});
  $('employeeCards').innerHTML=['geral','baixa','alta'].map(t=>{const d=scenario(t);return `<article><h2>${t.toUpperCase()}</h2><div class="metric"><span>Equipe ativa</span><b>${money(emp(t))}</b></div><div class="metric"><span>Resultado</span><b class="${cls(d.res)}">${money(d.res)}</b></div></article>`}).join('');
}
function schedule(){const t=$('scheduleScenario').value,r=[];for(let o=8;o<=14;o++)for(let c=16;c<=18;c++)if(o<c)r.push({o,c,d:scenario(t,o,c)});r.sort((a,b)=>b.d.res-a.d.res);$('scheduleBody').innerHTML=r.map((x,i)=>`<tr><td>${i+1}${i===0?' ★':''}</td><td>${x.o}h</td><td>${x.c}h</td><td>${x.c-x.o}h</td><td>${pct(x.d.keep)}</td><td>${money(x.d.rev)}</td><td>${money(x.d.cost)}</td><td class="${cls(x.d.res)}"><b>${money(x.d.res)}</b></td><td>${money(x.d.pe)}</td><td class="${cls(x.d.res)}">${x.d.res>=0?'VIÁVEL':'DEFICITÁRIO'}</td></tr>`).join('')}
function history(){const s=+$('startMonth').value,e=+$('endMonth').value,a=MONTHS.slice(Math.min(s,e),Math.max(s,e)+1),bonus=$('bonus').value==='com';$('historyBody').innerHTML=a.map(m=>{const r=bonus?m.resultado:m.resultado-m.bonificacao;return `<tr><td>${m.mes}</td><td>${money(m.receita_liquida)}</td><td>${money(m.fixos)}</td><td>${money(m.cmv)}</td><td>${money(m.variaveis)}</td><td>${pct(m.mc_pct)}</td><td>${money(m.bonificacao)}</td><td class="${cls(r)}">${money(r)}</td><td>${money(m.break_even)}</td></tr>`}).join('');draw('chartHistory',{type:'line',data:{labels:a.map(m=>m.mes),datasets:[{label:'Receita',data:a.map(m=>m.receita_liquida),borderColor:'#245786',tension:.25},{label:'Resultado',data:a.map(m=>bonus?m.resultado:m.resultado-m.bonificacao),borderColor:'#087a55',tension:.25}]},options:{responsive:true,maintainAspectRatio:false}});draw('chartMargin',{type:'bar',data:{labels:a.map(m=>m.mes),datasets:[{label:'MC %',data:a.map(m=>m.mc_pct*100),backgroundColor:'#c8912d'}]},options:{responsive:true,maintainAspectRatio:false}})}
function annual(){const t=$('annualScenario').value,g=(+$('growth').value||0)/100,inf=(+$('inflation').value||0)/100,b=scenario(t);let rev=b.rev,c=b.cost,acc=0,r=[];for(let i=0;i<12;i++){if(i){rev*=1+g;c*=1+inf}const res=rev*b.margin-c;acc+=res;r.push({i,rev,c,res,acc})}$('annualKpis').innerHTML=[['Receita anual',money(r.reduce((s,x)=>s+x.rev,0))],['Custos anuais',money(r.reduce((s,x)=>s+x.c,0))],['Resultado anual',money(acc)],['Média mensal',money(acc/12)]].map(x=>`<article class="kpi"><label>${x[0]}</label><strong>${x[1]}</strong></article>`).join('');$('annualBody').innerHTML=r.map(x=>`<tr><td>${x.i+1}</td><td>${money(x.rev)}</td><td>${money(x.c)}</td><td class="${cls(x.res)}">${money(x.res)}</td><td class="${cls(x.acc)}">${money(x.acc)}</td></tr>`).join('');draw('chartAnnual',{type:'line',data:{labels:r.map(x=>'M'+(x.i+1)),datasets:[{label:'Receita',data:r.map(x=>x.rev),borderColor:'#245786'},{label:'Custos',data:r.map(x=>x.c),borderColor:'#b42318'},{label:'Acumulado',data:r.map(x=>x.acc),borderColor:'#087a55'}]},options:{responsive:true,maintainAspectRatio:false}})}
function save(){localStorage.setItem('goCosts',JSON.stringify(costs));localStorage.setItem('goEmployees',JSON.stringify(employees))}
function render(){if(!MONTHS.length)return;dashboard();renderCosts();renderEmployees();schedule();history();annual()}
function monthOptions(){$('startMonth').innerHTML='';$('endMonth').innerHTML='';MONTHS.forEach((m,i)=>{$('startMonth').add(new Option(m.mes,i));$('endMonth').add(new Option(m.mes,i))});$('endMonth').value=MONTHS.length-1}
function parse(data){const wb=XLSX.read(data,{type:'array'}),n=wb.SheetNames.find(x=>x.toLowerCase().includes('matriz'));if(!n)throw Error('Aba Matriz não encontrada');const rows=XLSX.utils.sheet_to_json(wb.Sheets[n],{header:1,raw:true}),out=[];for(const r of rows)if(typeof r[0]==='string'&&/^[A-Z][a-z]{2}\/\d{2}$/.test(r[0]))out.push({mes:r[0],receita_bruta:+r[1]||0,receita_liquida:+r[2]||0,fixos:+r[3]||0,cmv:+r[4]||0,variaveis:+r[5]||0,total_despesas:+r[6]||0,bonificacao:+r[7]||0,resultado:+r[8]||0,cmv_pct:+r[9]||0,markup:+r[10]||0,mc_pct:+r[11]||0,break_even:+r[12]||0});if(!out.length)throw Error('Nenhum mês reconhecido');MONTHS=out;monthOptions();render()}
for(let h=8;h<=17;h++)$('openHour').add(new Option(h+'h',h));for(let h=16;h<=18;h++)$('closeHour').add(new Option(h+'h',h));$('openHour').value=10;$('closeHour').value=18;
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));$(b.dataset.page).classList.add('active');$('title').textContent=b.querySelector('span').textContent;$('side').classList.remove('open')});
$('theme').onclick=()=>{document.body.classList.toggle('dark');render()};$('collapse').onclick=()=>{$('side').classList.toggle('collapsed');document.querySelector('.app').style.gridTemplateColumns=$('side').classList.contains('collapsed')?'78px minmax(0,1fr)':'250px minmax(0,1fr)'};$('mobile').onclick=()=>$('side').classList.toggle('open');$('pdf').onclick=()=>print();$('all').onclick=()=>{costs.forEach(c=>c.ativa=true);save();render()};$('reset').onclick=()=>{costs=DEFAULT_COSTS.map(x=>({...x}));save();render()};$('addEmployee').onclick=()=>{employees.push({nome:'Novo funcionário',custo:0,ativo:true,aplicacao:'todos'});save();render()};
['manualRevenue','manualMC','sundays','sundayRate','scheduleScenario','openHour','closeHour','utility','startMonth','endMonth','bonus','annualScenario','growth','inflation'].forEach(id=>{const el=$(id);el.addEventListener('input',render);el.addEventListener('change',render)});
$('excel').onclick=()=>{const w=XLSX.utils.book_new();XLSX.utils.book_append_sheet(w,XLSX.utils.json_to_sheet(MONTHS),'Historico');XLSX.utils.book_append_sheet(w,XLSX.utils.json_to_sheet(costs),'Despesas');XLSX.utils.book_append_sheet(w,XLSX.utils.json_to_sheet(employees),'Funcionarios');XLSX.utils.book_append_sheet(w,XLSX.utils.json_to_sheet(['geral','baixa','alta'].map(t=>({cenario:t,...scenario(t)}))),'Cenarios');XLSX.writeFile(w,'simulacao_go_coffee.xlsx')};
fetch('dados_go_coffee.xlsx',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error();return r.arrayBuffer()}).then(b=>{parse(b);$('loadStatus').textContent='Planilha atualizada';$('loadStatus').classList.add('ok')}).catch(()=>{$('loadStatus').textContent='Planilha não encontrada';$('loadStatus').classList.add('error')});