(function(){
  const MIGRATION_KEY='goBaselineExcelJul26_v1';

  function applyLabels(){
    document.querySelectorAll('.kpi label').forEach(label=>{
      if(label.textContent.trim()==='Custos ativos') label.textContent='Custos fixos atuais';
    });
    document.querySelectorAll('.kpi small').forEach(small=>{
      if(small.textContent.trim()==='Despesas e equipe') small.textContent='Base igual à planilha';
    });
    document.querySelectorAll('.metric span').forEach(label=>{
      if(label.textContent.trim()==='Custo total') label.textContent='Custo simulado';
    });
  }

  if(typeof renderAll==='function'){
    const originalRenderAll=renderAll;
    renderAll=function(){
      originalRenderAll();
      applyLabels();
    };
  }

  if(!localStorage.getItem(MIGRATION_KEY)){
    if(Array.isArray(costs)){
      costs.forEach(c=>{
        if(c.nome==='Pró-labore Natan'||c.nome==='Estacionamento Natan'){
          c.ativa=true;
          c.corte=0;
        }
      });
    }
    if(Array.isArray(employees)){
      const fernando=employees.find(e=>e.nome==='Fernando');
      if(fernando) fernando.ativo=true;
    }
    if(typeof save==='function') save();
    localStorage.setItem(MIGRATION_KEY,'1');
  }

  if(typeof renderAll==='function') renderAll();
  applyLabels();
})();