"use strict";

const APP_VERSION = "20260722-0115";
const EMBEDDED_MONTHS = [{"mes":"Jul/25","receita_bruta":37727.35,"receita_liquida":36504.98386,"fixos":14502.079999999998,"cmv":20651.28,"variaveis":1149.6700000000164,"total_despesas":36303.03000000001,"bonificacao":0.0,"resultado":201.9538599999869,"cmv_pct":0.5473822041569313,"markup":1.826877074931917,"mc_pct":0.4027952434218659,"break_even":36003.6029144746},{"mes":"Ago/25","receita_bruta":28024.110000000008,"receita_liquida":27116.128836,"fixos":16807.85,"cmv":10637.6,"variaveis":769.8000000000102,"total_despesas":28215.250000000007,"bonificacao":0.0,"resultado":-1099.1211640000074,"cmv_pct":0.37958743382037813,"markup":2.6344391592088447,"mc_pct":0.5793131066387587,"break_even":29013.412276344097},{"mes":"Set/25","receita_bruta":26463.799999999996,"receita_liquida":25606.37288,"fixos":15807.859999999999,"cmv":14787.25,"variaveis":310.9100000000162,"total_despesas":30906.020000000015,"bonificacao":0.0,"resultado":-5299.647120000016,"cmv_pct":0.5587727386089678,"markup":1.789636342119055,"mc_pct":0.41037490663925624,"break_even":38520.532674518625},{"mes":"Out/25","receita_bruta":23587.599999999995,"receita_liquida":22823.361760000003,"fixos":16300.119999999999,"cmv":7468.4800000000005,"variaveis":390.00000000000364,"total_despesas":24158.600000000002,"bonificacao":0.0,"resultado":-1335.2382399999988,"cmv_pct":0.3166273804880531,"markup":3.158286558978533,"mc_pct":0.6556826254328275,"break_even":24859.771126678865},{"mes":"Nov/25","receita_bruta":27014.7,"receita_liquida":26139.42372,"fixos":15939.76,"cmv":8886.34,"variaveis":1012.9999999999982,"total_despesas":25839.1,"bonificacao":0.0,"resultado":300.3237200000003,"cmv_pct":0.3289446116373678,"markup":3.0400254773056172,"mc_pct":0.6212869837514536,"break_even":25656.03403398632},{"mes":"Dez/25","receita_bruta":39608.1,"receita_liquida":38324.797560000006,"fixos":19252.32,"cmv":19113.059999999998,"variaveis":1339.6699999999983,"total_despesas":39705.049999999996,"bonificacao":0.0,"resultado":-1380.2524399999893,"cmv_pct":0.4825543260090739,"markup":2.072305533493852,"mc_pct":0.4663316885632626,"break_even":41284.605940709574},{"mes":"Jan/26","receita_bruta":60202.05000000001,"receita_liquida":58251.503580000004,"fixos":18694.13,"cmv":23849.553,"variaveis":2835.2499999999964,"total_despesas":45378.933,"bonificacao":0.0,"resultado":12872.570580000007,"cmv_pct":0.3961584862973935,"markup":2.5242422782515046,"mc_pct":0.5419036186190064,"break_even":34497.14923041176},{"mes":"Fev/26","receita_bruta":31055.700000000004,"receita_liquida":30742.03743,"fixos":18079.36,"cmv":7152.97,"variaveis":1752.5000000000036,"total_despesas":26984.830000000005,"bonificacao":0.0,"resultado":3757.207429999995,"cmv_pct":0.23032712191320753,"markup":4.3416510903862315,"mc_pct":0.7103162072364959,"break_even":25452.551716844857},{"mes":"Mar/26","receita_bruta":25780.930000000008,"receita_liquida":25520.542607000003,"fixos":16234.850000000002,"cmv":9572.05,"variaveis":482.40000000000146,"total_despesas":26289.300000000003,"bonificacao":0.0,"resultado":-768.7573929999999,"cmv_pct":0.37128412357506096,"markup":2.6933551329130134,"mc_pct":0.6060252262331532,"break_even":26789.066357699845},{"mes":"Abr/26","receita_bruta":25600.039999999997,"receita_liquida":25341.479596,"fixos":16501.43,"cmv":10696.68,"variaveis":1344.390000000003,"total_despesas":28542.500000000004,"bonificacao":0.0,"resultado":-3201.0204040000026,"cmv_pct":0.41783840962748503,"markup":2.39326968741703,"mc_pct":0.5248473967597136,"break_even":31440.43411832851},{"mes":"Mai/26","receita_bruta":25769.449999999997,"receita_liquida":25509.17855500001,"fixos":15152.18,"cmv":16521.879999999997,"variaveis":8346.795999999988,"total_despesas":40020.855999999985,"bonificacao":8374.96,"resultado":-6136.717444999977,"cmv_pct":0.6411421275968249,"markup":1.5597165697850366,"mc_pct":0.025108709542294563,"break_even":603463.1120518874},{"mes":"Jun/26","receita_bruta":24154.71,"receita_liquida":23910.747429,"fixos":16081.94,"cmv":12362.1,"variaveis":1066.5499999999975,"total_despesas":29510.589999999997,"bonificacao":9761.400000000001,"resultado":4161.557429000004,"cmv_pct":0.5117883841288097,"markup":1.9539325842696629,"mc_pct":0.43838434829882633,"break_even":36684.56700702664},{"mes":"Jul/26","receita_bruta":19426.1,"receita_liquida":19229.896389999998,"fixos":16660.21,"cmv":8003.780000000001,"variaveis":481.17000000000553,"total_despesas":25145.160000000003,"bonificacao":7806.05,"resultado":1890.7863899999948,"cmv_pct":0.41201167501454233,"markup":2.4271156878374964,"mc_pct":0.5587625732392203,"break_even":29816.259710127983}];
const DEFAULT_COSTS = [{"nome":"Pró-labore Natan","centro":"Pró-labore","valor":3500.0,"corte":0,"ativa":true},{"nome":"Aluguel","centro":"Aluguel","valor":2974.33,"corte":0,"ativa":true},{"nome":"Locação da cafeteira","centro":"Locação","valor":803.85,"corte":0,"ativa":true},{"nome":"Segurança","centro":"Administrativo","valor":152.0,"corte":0,"ativa":true},{"nome":"Internet","centro":"Administrativo","valor":223.59,"corte":0,"ativa":true},{"nome":"Contabilidade","centro":"Administrativo","valor":337.01,"corte":0,"ativa":true},{"nome":"Marketing","centro":"Marketing","valor":450.0,"corte":0,"ativa":true},{"nome":"Sistema Nexus","centro":"Administrativo","valor":468.9,"corte":0,"ativa":true},{"nome":"Estacionamento Natan","centro":"Administrativo","valor":150.0,"corte":0,"ativa":true},{"nome":"FGTS","centro":"Encargos","valor":300.44,"corte":0,"ativa":true},{"nome":"Receita Federal","centro":"Impostos","valor":292.1,"corte":0,"ativa":true},{"nome":"Simples Nacional","centro":"Impostos","valor":1057.65,"corte":0,"ativa":true},{"nome":"Energia elétrica","centro":"Utilidades","valor":1377.47,"corte":0,"ativa":true},{"nome":"Água","centro":"Utilidades","valor":251.49,"corte":0,"ativa":true}];
const HOUR_PROFILES = {"geral":[0,0.06347295846,0.09160397418,0.06935415748,0.05572155859,0.0655918883,0.09589268903,0.15274996863,0.1869045085,0.15854409783],"baixa":[0,0.0578576539,0.08977809141,0.06848172635,0.05516148863,0.06751683905,0.09582013532,0.16478183622,0.1981047735,0.15861401322],"alta":[0,0.0793118513,0.10642901069,0.07633984653,0.06368127051,0.06537627492,0.09458506071,0.12813269641,0.1537048269,0.14965629105]};
const DEFAULT_EMPLOYEES = [
  { id: 1, nome: "Fernando", custo: 2160.69, ativo: true, aplicacao: "todos" },
  { id: 2, nome: "Pedro", custo: 2160.69, ativo: true, aplicacao: "todos" },
  { id: 3, nome: "Funcionário extra alta", custo: 2160.69, ativo: false, aplicacao: "alta" }
];

let MONTHS = structuredClone(EMBEDDED_MONTHS);
let costs = loadState("goCostsV3", DEFAULT_COSTS);
let employees = loadState("goEmployeesV3", DEFAULT_EMPLOYEES);
let charts = {};

const $ = (id) => document.getElementById(id);
const money = (value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value) || 0);
const pct = (value) => new Intl.NumberFormat("pt-BR", { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value) || 0);
const sum = (items, key) => items.reduce((total, item) => total + (Number(item[key]) || 0), 0);
const avg = (items, key) => items.length ? sum(items, key) / items.length : 0;
const colors = { geral: "#245786", baixa: "#d97706", alta: "#087a55" };
const cls = (value) => value >= 1000 ? "good" : value >= 0 ? "warn" : "bad";
const status = (value) => value >= 5000 ? "Muito saudável" : value >= 1000 ? "Aceitável" : value >= 0 ? "Margem apertada" : "Deficitário";

function loadState(key, fallback) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key));
    return Array.isArray(parsed) ? parsed : structuredClone(fallback);
  } catch (_) {
    return structuredClone(fallback);
  }
}

function saveState() {
  localStorage.setItem("goCostsV3", JSON.stringify(costs));
  localStorage.setItem("goEmployeesV3", JSON.stringify(employees));
}

function monthName(record) {
  return String(record.mes || "").split("/")[0];
}

function completeTwelveMonths() {
  const valid = MONTHS.filter((m) => Number(m.receita_liquida) > 0);
  const complete = valid.length > 12 ? valid.slice(0, -1) : valid;
  return complete.slice(-12);
}

const engine = {
  groups() {
    const geral = completeTwelveMonths();
    const alta = geral.filter((m) => ["Dez", "Jan"].includes(monthName(m)));
    const baixa = geral.filter((m) => !["Dez", "Jan"].includes(monthName(m)));
    return { geral, baixa, alta };
  },

  weightedMC(items) {
    const revenue = sum(items, "receita_liquida");
    return revenue ? items.reduce((total, item) => total + Number(item.receita_liquida) * Number(item.mc_pct), 0) / revenue : 0;
  },

  expenseTotal() {
    return costs.reduce((total, item) => {
      if (!item.ativa) return total;
      const cut = Math.max(0, Math.min(1, Number(item.corte) || 0));
      return total + Number(item.valor || 0) * (1 - cut);
    }, 0);
  },

  employeeTotal(type = "geral") {
    return employees
      .filter((item) => item.ativo && (item.aplicacao === "todos" || item.aplicacao === type))
      .reduce((total, item) => total + Number(item.custo || 0), 0);
  },

  fixedCost(type = "geral") {
    return this.expenseTotal() + this.employeeTotal(type);
  },

  utilityTotal() {
    return costs
      .filter((item) => item.ativa && ["Energia elétrica", "Água"].includes(item.nome))
      .reduce((total, item) => total + Number(item.valor || 0) * (1 - Number(item.corte || 0)), 0);
  },

  retainedRevenue(type, open, close) {
    return HOUR_PROFILES[type].reduce((total, value, index) => {
      const hour = 8 + index;
      return total + (hour >= open && hour < close ? Number(value) : 0);
    }, 0);
  },

  scenario(type, customOpen, customClose) {
    const group = this.groups()[type] || [];
    const manualRevenue = Number($("manualRevenue").value);
    const manualMC = Number($("manualMC").value);
    const baseRevenue = manualRevenue || avg(group, "receita_liquida");
    const margin = manualMC || this.weightedMC(group);
    const open = Number(customOpen ?? $("openHour").value);
    const close = Number(customClose ?? $("closeHour").value);
    const retained = this.retainedRevenue(type, open, close);
    const revenue = baseRevenue * retained;
    const hours = close - open;
    const utilitySaving = Math.max(0, this.utilityTotal() * Number($("utility").value || 0.6) * (1 - hours / 8));
    const sundayCost = Number($("sundays").value || 0) * Number($("sundayRate").value || 0);
    const fixedCost = this.fixedCost(type);
    const total = fixedCost - utilitySaving + sundayCost;
    const result = revenue * margin - total;
    return {
      type, open, close, retained, revenue, margin, fixedCost, utilitySaving, sundayCost,
      total, result, breakEven: margin ? total / margin : 0
    };
  }
};

const valueLabelsPlugin = {
  id: "valueLabels",
  afterDatasetsDraw(chart, _args, options) {
    if (!options || !options.enabled) return;
    const context = chart.ctx;
    context.save();
    context.font = "600 10px Segoe UI, Arial";
    context.textAlign = "center";
    context.fillStyle = getComputedStyle(document.body).getPropertyValue("--text").trim() || "#172033";
    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      if (meta.hidden) return;
      meta.data.forEach((element, index) => {
        const raw = dataset.data[index];
        if (raw === null || raw === undefined || !Number.isFinite(Number(raw))) return;
        const value = Number(raw);
        const isBar = dataset.type === "bar" || chart.config.type === "bar";
        let y = element.y - 10;
        if (isBar && value < 0) y = element.y + 14;
        context.textBaseline = isBar && value < 0 ? "top" : "bottom";
        context.fillText(money(value), element.x, y);
      });
    });
    context.restore();
  }
};
Chart.register(valueLabelsPlugin);

function draw(id, config) {
  if (charts[id]) charts[id].destroy();
  charts[id] = new Chart($(id), config);
}

function scenarioCard(type) {
  const data = engine.scenario(type);
  const name = { geral: "Geral (Jan–Dez)", baixa: "Baixa temporada (Fev–Nov)", alta: "Alta temporada (Dez–Jan)" }[type];
  return `<article class="scenario ${type}" data-result="${data.result}">
    <div class="scenarioHead"><b>${name}</b><span class="badge">${pct(data.retained)} da receita</span></div>
    <div class="metric"><span>Receita projetada</span><b>${money(data.revenue)}</b></div>
    <div class="metric"><span>MC</span><b>${pct(data.margin)}</b></div>
    <div class="metric"><span>Custos fixos</span><b>${money(data.fixedCost)}</b></div>
    <div class="metric"><span>Custo simulado</span><b>${money(data.total)}</b></div>
    <div class="metric"><span>Ponto de equilíbrio</span><b>${money(data.breakEven)}</b></div>
    <div class="metric"><span>Resultado mensal</span><b class="${cls(data.result)}">${money(data.result)}</b></div>
    <div class="metric"><span>Resultado anual</span><b class="${cls(data.result)}">${money(data.result * 12)}</b></div>
    <div class="metric"><span>Leitura</span><b class="${cls(data.result)}">${status(data.result)}</b></div>
  </article>`;
}

function renderDashboard() {
  const types = ["geral", "baixa", "alta"];
  const scenarios = types.map((type) => engine.scenario(type));
  const best = [...scenarios].sort((a, b) => b.result - a.result)[0];
  const spreadsheetFixed = MONTHS.at(-1)?.fixos || engine.fixedCost("geral");

  $("kpis").innerHTML = [
    ["Melhor resultado", money(best.result), status(best.result)],
    ["Custos fixos atuais", money(engine.fixedCost("geral")), `Planilha: ${money(spreadsheetFixed)}`],
    ["PE geral", money(scenarios[0].breakEven), "Receita mínima"],
    ["Projeção anual", money(scenarios[0].result * 12), "Base mensal linear"]
  ].map(([label, value, note]) => `<article class="kpi"><label>${label}</label><strong>${value}</strong><small>${note}</small></article>`).join("");

  $("cards").innerHTML = types.map(scenarioCard).join("");
  const cards = [...document.querySelectorAll("#cards .scenario")].sort((a, b) => Number(b.dataset.result) - Number(a.dataset.result));
  if (cards[0]) cards[0].classList.add("best");

  draw("chartResult", {
    type: "bar",
    data: {
      labels: ["Geral", "Baixa", "Alta"],
      datasets: [
        {
          type: "line", label: "Receita", data: scenarios.map((item) => item.revenue),
          borderColor: "#6b7280", backgroundColor: "#6b7280", borderWidth: 3, tension: 0.25,
          pointBackgroundColor: types.map((type) => colors[type]), pointBorderColor: types.map((type) => colors[type]),
          pointRadius: 7, pointBorderWidth: 3
        },
        {
          type: "bar", label: "Resultado", data: scenarios.map((item) => item.result),
          backgroundColor: scenarios.map((item) => item.result < 0 ? "#c9352b" : "#d6a02e")
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, ticks: { callback: (value) => money(value) } } },
      plugins: {
        legend: {
          labels: {
            generateLabels(chart) {
              return [
                { text: "Receita", fillStyle: "#6b7280", strokeStyle: "#6b7280", datasetIndex: 0 },
                { text: "Resultado positivo", fillStyle: "#d6a02e", strokeStyle: "#d6a02e", datasetIndex: 1 },
                { text: "Resultado negativo", fillStyle: "#c9352b", strokeStyle: "#c9352b", datasetIndex: 1 }
              ];
            }
          }
        },
        tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${money(context.raw)}` } }
      }
    }
  });

  draw("chartPE", {
    type: "bar",
    data: {
      labels: ["Geral", "Baixa", "Alta"],
      datasets: [
        { label: "Receita — Geral", data: [scenarios[0].revenue, null, null], backgroundColor: colors.geral },
        { label: "Receita — Baixa", data: [null, scenarios[1].revenue, null], backgroundColor: colors.baixa },
        { label: "Receita — Alta", data: [null, null, scenarios[2].revenue], backgroundColor: colors.alta },
        { label: "Ponto de equilíbrio", data: scenarios.map((item) => item.breakEven), backgroundColor: "#d6a02e" }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, ticks: { callback: (value) => money(value) } } }
    }
  });
}

function commitNumber(input, onCommit, min = -Infinity, max = Infinity) {
  const commit = () => {
    let value = Number(String(input.value).replace(",", "."));
    if (!Number.isFinite(value)) value = 0;
    value = Math.max(min, Math.min(max, value));
    input.value = String(value);
    onCommit(value);
    saveState();
    renderAll();
  };
  input.addEventListener("change", commit);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      input.blur();
    }
  });
}

function renderCosts() {
  $("costBody").innerHTML = costs.map((item, index) => `<tr>
    <td><input type="checkbox" data-cost-active="${index}" ${item.ativa ? "checked" : ""}></td>
    <td>${item.nome}</td><td>${item.centro}</td>
    <td><input type="number" step="0.01" data-cost-value="${index}" value="${item.valor}"></td>
    <td><input type="number" min="0" max="100" step="1" data-cost-cut="${index}" value="${Math.round(Number(item.corte || 0) * 100)}"></td>
    <td>${money(item.ativa ? Number(item.valor) * (1 - Number(item.corte || 0)) : 0)}</td>
    <td>${money((item.ativa ? Number(item.valor) * (1 - Number(item.corte || 0)) : 0) * 12)}</td>
  </tr>`).join("");

  const original = costs.reduce((total, item) => total + Number(item.valor || 0), 0);
  const considered = engine.expenseTotal();
  $("costFoot").innerHTML = `<tr><th colspan="3">TOTAL DAS DESPESAS</th><th>${money(original)}</th><th>${pct(original ? (original - considered) / original : 0)}</th><th>${money(considered)}</th><th>${money(considered * 12)}</th></tr>`;

  document.querySelectorAll("[data-cost-active]").forEach((input) => {
    input.addEventListener("change", () => {
      costs[Number(input.dataset.costActive)].ativa = input.checked;
      saveState();
      renderAll();
    });
  });
  document.querySelectorAll("[data-cost-value]").forEach((input) => {
    commitNumber(input, (value) => { costs[Number(input.dataset.costValue)].valor = value; }, 0);
  });
  document.querySelectorAll("[data-cost-cut]").forEach((input) => {
    commitNumber(input, (value) => { costs[Number(input.dataset.costCut)].corte = value / 100; }, 0, 100);
  });
}

function renderEmployees() {
  $("employeeBody").innerHTML = employees.map((item, index) => `<tr>
    <td><input type="checkbox" data-employee-active="${index}" ${item.ativo ? "checked" : ""}></td>
    <td><input data-employee-name="${index}" value="${item.nome}"></td>
    <td><input type="number" step="0.01" data-employee-cost="${index}" value="${item.custo}"></td>
    <td><select data-employee-use="${index}">
      <option value="todos" ${item.aplicacao === "todos" ? "selected" : ""}>Todos</option>
      <option value="geral" ${item.aplicacao === "geral" ? "selected" : ""}>Geral</option>
      <option value="baixa" ${item.aplicacao === "baixa" ? "selected" : ""}>Baixa</option>
      <option value="alta" ${item.aplicacao === "alta" ? "selected" : ""}>Alta</option>
    </select></td>
    <td><button class="danger" data-employee-delete="${index}">Excluir</button></td>
  </tr>`).join("");

  document.querySelectorAll("[data-employee-active]").forEach((input) => input.addEventListener("change", () => {
    employees[Number(input.dataset.employeeActive)].ativo = input.checked; saveState(); renderAll();
  }));
  document.querySelectorAll("[data-employee-name]").forEach((input) => input.addEventListener("change", () => {
    employees[Number(input.dataset.employeeName)].nome = input.value.trim() || "Funcionário"; saveState(); renderAll();
  }));
  document.querySelectorAll("[data-employee-cost]").forEach((input) => {
    commitNumber(input, (value) => { employees[Number(input.dataset.employeeCost)].custo = value; }, 0);
  });
  document.querySelectorAll("[data-employee-use]").forEach((select) => select.addEventListener("change", () => {
    employees[Number(select.dataset.employeeUse)].aplicacao = select.value; saveState(); renderAll();
  }));
  document.querySelectorAll("[data-employee-delete]").forEach((button) => button.addEventListener("click", () => {
    employees.splice(Number(button.dataset.employeeDelete), 1); saveState(); renderAll();
  }));

  $("employeeCards").innerHTML = ["geral", "baixa", "alta"].map((type) => {
    const data = engine.scenario(type);
    return `<article class="scenario ${type}"><div class="scenarioHead"><b>${type.toUpperCase()}</b></div>
      <div class="metric"><span>Funcionários ativos</span><b>${money(engine.employeeTotal(type))}</b></div>
      <div class="metric"><span>Custos fixos totais</span><b>${money(engine.fixedCost(type))}</b></div>
      <div class="metric"><span>Resultado</span><b class="${cls(data.result)}">${money(data.result)}</b></div></article>`;
  }).join("");
}

function renderSchedule() {
  const type = $("scheduleScenario").value;
  const rows = [];
  for (let open = 8; open <= 17; open += 1) {
    for (let close = 16; close <= 18; close += 1) {
      if (open < close) rows.push(engine.scenario(type, open, close));
    }
  }
  rows.sort((a, b) => b.result - a.result);
  $("scheduleBody").innerHTML = rows.map((item, index) => `<tr>
    <td>${index + 1}${index === 0 ? " ★" : ""}</td><td>${item.open}h</td><td>${item.close}h</td><td>${item.close - item.open}h</td>
    <td>${pct(item.retained)}</td><td>${money(item.revenue)}</td><td>${money(item.total)}</td>
    <td class="${cls(item.result)}"><b>${money(item.result)}</b></td><td>${money(item.breakEven)}</td>
    <td class="${cls(item.result)}">${item.result >= 0 ? "VIÁVEL" : "DEFICITÁRIO"}</td>
  </tr>`).join("");
}

function selectedMonths() {
  const start = Number($("startMonth").value);
  const end = Number($("endMonth").value);
  return MONTHS.slice(Math.min(start, end), Math.max(start, end) + 1);
}

function renderHistory() {
  const items = selectedMonths();
  const useBonus = $("bonus").value === "com";
  const results = items.map((item) => useBonus ? Number(item.resultado) : Number(item.resultado) - Number(item.bonificacao));
  $("historyBody").innerHTML = items.map((item, index) => `<tr>
    <td>${item.mes}</td><td>${money(item.receita_liquida)}</td><td>${money(item.fixos)}</td><td>${money(item.cmv)}</td>
    <td>${money(item.variaveis)}</td><td>${pct(item.mc_pct)}</td><td>${money(item.bonificacao)}</td>
    <td class="${cls(results[index])}">${money(results[index])}</td><td>${money(item.break_even)}</td>
  </tr>`).join("");

  draw("chartHistory", {
    type: "bar",
    data: {
      labels: items.map((item) => item.mes),
      datasets: [
        { type: "line", label: "Receita", data: items.map((item) => item.receita_liquida), borderColor: colors.geral, backgroundColor: colors.geral, borderWidth: 3, pointRadius: 3, tension: 0.25 },
        { type: "bar", label: "Resultado", data: results, backgroundColor: results.map((value) => value < 0 ? "#c9352b" : "#d6a02e") }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, ticks: { callback: (value) => money(value) } } },
      plugins: {
        legend: { labels: { generateLabels() { return [
          { text: "Receita", fillStyle: colors.geral, strokeStyle: colors.geral },
          { text: "Resultado positivo", fillStyle: "#d6a02e", strokeStyle: "#d6a02e" },
          { text: "Resultado negativo", fillStyle: "#c9352b", strokeStyle: "#c9352b" }
        ]; } } }
      }
    }
  });

  draw("chartMargin", {
    type: "bar",
    data: { labels: items.map((item) => item.mes), datasets: [{ label: "MC %", data: items.map((item) => Number(item.mc_pct) * 100), backgroundColor: "#d6a02e" }] },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

function renderAnnual() {
  const growth = Number($("growth").value || 0) / 100;
  const inflation = Number($("inflation").value || 0) / 100;
  const base = engine.scenario("geral");
  let revenue = base.revenue;
  let cost = base.total;
  let accumulated = 0;
  const monthLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const rows = [];

  for (let index = 0; index < 12; index += 1) {
    if (index > 0) {
      revenue *= 1 + growth;
      cost *= 1 + inflation;
    }
    const result = revenue * base.margin - cost;
    accumulated += result;
    rows.push({ month: monthLabels[index], revenue, cost, result, accumulated });
  }

  const annualRevenue = rows.reduce((total, item) => total + item.revenue, 0);
  const annualCosts = rows.reduce((total, item) => total + item.cost, 0);
  $("annualKpis").innerHTML = [
    ["Receita anual", money(annualRevenue)], ["Custos anuais", money(annualCosts)],
    ["Resultado anual", money(accumulated)], ["Média mensal", money(accumulated / 12)]
  ].map(([label, value]) => `<article class="kpi"><label>${label}</label><strong>${value}</strong></article>`).join("");

  $("annualBody").innerHTML = rows.map((item) => `<tr><td>${item.month}</td><td>${money(item.revenue)}</td><td>${money(item.cost)}</td><td class="${cls(item.result)}">${money(item.result)}</td><td class="${cls(item.accumulated)}">${money(item.accumulated)}</td></tr>`).join("");

  draw("chartAnnual", {
    type: "bar",
    data: {
      labels: rows.map((item) => item.month),
      datasets: [
        { type: "line", label: "Receita", data: rows.map((item) => item.revenue), borderColor: colors.geral, backgroundColor: colors.geral, borderWidth: 3, pointRadius: 4, tension: 0.25 },
        { type: "bar", label: "Resultado", data: rows.map((item) => item.result), backgroundColor: rows.map((item) => item.result < 0 ? "#c9352b" : "#d6a02e") }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      layout: { padding: { top: 24, bottom: 20 } },
      scales: { y: { beginAtZero: true, ticks: { callback: (value) => money(value) } } },
      plugins: {
        valueLabels: { enabled: true },
        legend: { labels: { generateLabels() { return [
          { text: "Receita", fillStyle: colors.geral, strokeStyle: colors.geral },
          { text: "Resultado positivo", fillStyle: "#d6a02e", strokeStyle: "#d6a02e" },
          { text: "Resultado negativo", fillStyle: "#c9352b", strokeStyle: "#c9352b" }
        ]; } } }
      }
    }
  });
}

function renderAll() {
  renderDashboard();
  renderCosts();
  renderEmployees();
  renderSchedule();
  renderHistory();
  renderAnnual();
}

function refreshMonthOptions() {
  const previousStart = $("startMonth").value;
  const previousEnd = $("endMonth").value;
  $("startMonth").innerHTML = "";
  $("endMonth").innerHTML = "";
  MONTHS.forEach((item, index) => {
    $("startMonth").add(new Option(item.mes, index));
    $("endMonth").add(new Option(item.mes, index));
  });
  $("startMonth").value = previousStart || "0";
  $("endMonth").value = previousEnd || String(MONTHS.length - 1);
}

function parseWorkbook(arrayBuffer) {
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = workbook.SheetNames.find((name) => name.toLowerCase().includes("matriz"));
  if (!sheetName) throw new Error("Aba Matriz não encontrada");
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: true });
  const output = [];
  const monthPattern = /^[A-Za-zÀ-ÿ]{3}\/\d{2}$/;

  rows.forEach((row) => {
    const monthIndex = row.findIndex((cell) => typeof cell === "string" && monthPattern.test(cell.trim()));
    if (monthIndex < 0) return;
    if (monthIndex === 2) {
      output.push({ mes: row[2], receita_bruta: +row[3] || 0, receita_liquida: +row[4] || 0, fixos: +row[5] || 0, cmv: +row[6] || 0, variaveis: +row[7] || 0, total_despesas: +row[8] || 0, bonificacao: +row[9] || 0, resultado: +row[10] || 0, cmv_pct: +row[11] || 0, markup: +row[12] || 0, mc_pct: +row[13] || 0, break_even: +row[14] || 0 });
    } else {
      output.push({ mes: row[0], receita_bruta: +row[1] || 0, receita_liquida: +row[2] || 0, fixos: +row[3] || 0, cmv: +row[4] || 0, variaveis: +row[5] || 0, total_despesas: +row[6] || 0, bonificacao: +row[7] || 0, resultado: +row[8] || 0, cmv_pct: +row[9] || 0, markup: +row[10] || 0, mc_pct: +row[11] || 0, break_even: +row[12] || 0 });
    }
  });

  if (output.length < 3) throw new Error("Nenhum dado mensal reconhecido");
  MONTHS = output;
  refreshMonthOptions();
  renderAll();
}

function setup() {
  for (let hour = 8; hour <= 17; hour += 1) $("openHour").add(new Option(`${hour}h`, hour));
  for (let hour = 16; hour <= 18; hour += 1) $("closeHour").add(new Option(`${hour}h`, hour));
  $("openHour").value = "10";
  $("closeHour").value = "18";
  refreshMonthOptions();

  document.querySelectorAll("nav button").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll("nav button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"));
    $(button.dataset.page).classList.add("active");
    $("title").textContent = button.querySelector("span").textContent;
    $("side").classList.remove("open");
  }));

  $("theme").addEventListener("click", () => { document.body.classList.toggle("dark"); renderAll(); });
  $("collapse").addEventListener("click", () => {
    $("side").classList.toggle("collapsed");
    document.querySelector(".app").style.gridTemplateColumns = $("side").classList.contains("collapsed") ? "78px minmax(0,1fr)" : "250px minmax(0,1fr)";
  });
  $("mobile").addEventListener("click", () => $("side").classList.toggle("open"));
  $("pdf").addEventListener("click", () => window.print());
  $("all").addEventListener("click", () => { costs.forEach((item) => { item.ativa = true; }); saveState(); renderAll(); });
  $("reset").addEventListener("click", () => { costs = structuredClone(DEFAULT_COSTS); saveState(); renderAll(); });
  $("addEmployee").addEventListener("click", () => { employees.push({ id: Date.now(), nome: "Novo funcionário", custo: 0, ativo: true, aplicacao: "todos" }); saveState(); renderAll(); });

  ["manualRevenue", "manualMC", "sundays", "sundayRate", "openHour", "closeHour", "utility", "scheduleScenario", "startMonth", "endMonth", "bonus", "growth", "inflation"].forEach((id) => {
    const element = $(id);
    element.addEventListener("input", renderAll);
    element.addEventListener("change", renderAll);
  });

  $("excel").addEventListener("click", () => {
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(MONTHS), "Historico");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(costs), "Despesas");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(employees), "Funcionarios");
    XLSX.writeFile(workbook, "simulacao_go_coffee.xlsx");
  });

  renderAll();
  fetch(`dados_go_coffee.xlsx?v=${APP_VERSION}`, { cache: "no-store" })
    .then((response) => { if (!response.ok) throw new Error("Planilha não encontrada"); return response.arrayBuffer(); })
    .then((buffer) => { parseWorkbook(buffer); $("loadStatus").textContent = "Planilha atualizada"; $("loadStatus").className = "status-pill ok"; })
    .catch(() => { $("loadStatus").textContent = "Base incorporada em uso"; $("loadStatus").className = "status-pill ok"; });
}

setup();
