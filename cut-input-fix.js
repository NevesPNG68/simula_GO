(function(){
  function applyEditableFieldFixes(){
    document.querySelectorAll('[data-cv]').forEach(input=>{
      input.oninput=null;
      input.onchange=()=>{
        const i=Number(input.dataset.cv);
        costs[i].valor=Number(input.value)||0;
        save();
        renderAll();
      };
      input.onkeydown=e=>{if(e.key==='Enter') input.blur();};
    });

    document.querySelectorAll('[data-cc]').forEach(input=>{
      input.oninput=null;
      input.onchange=()=>{
        const i=Number(input.dataset.cc);
        const value=Math.max(0,Math.min(100,Number(input.value)||0));
        input.value=String(value);
        costs[i].corte=value/100;
        save();
        renderAll();
      };
      input.onkeydown=e=>{if(e.key==='Enter') input.blur();};
    });

    document.querySelectorAll('[data-ec]').forEach(input=>{
      input.oninput=null;
      input.onchange=()=>{
        const i=Number(input.dataset.ec);
        employees[i].custo=Number(input.value)||0;
        save();
        renderAll();
      };
      input.onkeydown=e=>{if(e.key==='Enter') input.blur();};
    });
  }

  if(typeof renderAll==='function'){
    const previousRenderAll=renderAll;
    renderAll=function(){
      previousRenderAll();
      applyEditableFieldFixes();
    };
  }

  applyEditableFieldFixes();
})();