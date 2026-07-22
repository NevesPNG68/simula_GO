(function(){
  function monthName(item){
    return String(item?.mes || '').split('/')[0];
  }

  function calendarGroups(){
    const complete = MONTHS.filter(item => item.receita_liquida > 0 && item.mes !== 'Jul/26');
    const highMonths = new Set(['Dez','Jan']);

    return {
      geral: complete,
      baixa: complete.filter(item => !highMonths.has(monthName(item))),
      alta: complete.filter(item => highMonths.has(monthName(item)))
    };
  }

  if(typeof engine === 'object' && engine){
    engine.groups = calendarGroups;
  }

  if(typeof renderAll === 'function'){
    renderAll();
  }
})();
