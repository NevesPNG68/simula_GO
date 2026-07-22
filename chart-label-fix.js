(function(){
  const BLUE='#245786';
  const POSITIVE='#d6a02e';
  const NEGATIVE='#c9352b';
  const defaultGenerateLabels=Chart.defaults.plugins.legend.labels.generateLabels;

  const resultLegendFix={
    id:'resultLegendFix',
    beforeInit(chart){
      const resultDataset=chart.data.datasets.find(dataset=>dataset.label==='Resultado'&&Array.isArray(dataset.backgroundColor));
      if(!resultDataset)return;

      chart.options.plugins=chart.options.plugins||{};
      chart.options.plugins.legend=chart.options.plugins.legend||{};
      chart.options.plugins.legend.labels=chart.options.plugins.legend.labels||{};
      chart.options.plugins.legend.labels.generateLabels=currentChart=>{
        const resultIndex=currentChart.data.datasets.indexOf(resultDataset);
        const labels=defaultGenerateLabels(currentChart).filter(item=>item.datasetIndex!==resultIndex);
        const values=resultDataset.data.map(Number).filter(Number.isFinite);

        if(values.some(value=>value>=0)){
          labels.push({
            text:'Resultado positivo',
            fillStyle:POSITIVE,
            strokeStyle:POSITIVE,
            lineWidth:0,
            hidden:false,
            datasetIndex:resultIndex,
            pointStyle:'rect'
          });
        }
        if(values.some(value=>value<0)){
          labels.push({
            text:'Resultado negativo',
            fillStyle:NEGATIVE,
            strokeStyle:NEGATIVE,
            lineWidth:0,
            hidden:false,
            datasetIndex:resultIndex,
            pointStyle:'rect'
          });
        }
        return labels;
      };
    }
  };

  const annualValueLabels={
    id:'annualValueLabels',
    beforeInit(chart){
      if(chart.canvas&&chart.canvas.id==='chartAnnual'){
        chart.options.layout=chart.options.layout||{};
        const current=chart.options.layout.padding||{};
        chart.options.layout.padding={
          top:Math.max(Number(current.top)||0,26),
          right:Number(current.right)||0,
          bottom:Math.max(Number(current.bottom)||0,26),
          left:Number(current.left)||0
        };
      }
    },
    afterDatasetsDraw(chart){
      if(!chart.canvas||chart.canvas.id!=='chartAnnual')return;
      const ctx=chart.ctx;
      const dark=document.body.classList.contains('dark');

      chart.data.datasets.forEach((dataset,datasetIndex)=>{
        const meta=chart.getDatasetMeta(datasetIndex);
        if(meta.hidden)return;

        meta.data.forEach((element,index)=>{
          const value=Number(dataset.data[index]);
          if(!Number.isFinite(value))return;

          const position=element.tooltipPosition();
          const isLine=dataset.type==='line';
          const isNegative=value<0;
          let y=position.y;

          ctx.save();
          ctx.font='600 10px Segoe UI, Arial, sans-serif';
          ctx.textAlign='center';
          ctx.fillStyle=dark?'#eef4ff':'#172033';

          if(isLine){
            y-=10;
            ctx.textBaseline='bottom';
          }else if(isNegative){
            y+=8;
            ctx.textBaseline='top';
          }else{
            y-=7;
            ctx.textBaseline='bottom';
          }

          ctx.fillText(money(value),position.x,y);
          ctx.restore();
        });
      });
    }
  };

  Chart.register(resultLegendFix,annualValueLabels);
  if(typeof renderAll==='function')renderAll();
})();
