
var PLANS = [
  { name: "Basic",      price: 550,   profili: 10   },
  { name: "Pro",        price: 1000,  profili: 20   },
  { name: "Business",   price: 1850,  profili: 50   },
  { name: "Prime",      price: 2200,  profili: 100  },
  { name: "Essentials", price: 3500,  profili: 250  },
  { name: "Company",    price: 4250,  profili: 450  },
  { name: "Team",       price: 6000,  profili: 950  },
  { name: "Growth",     price: 9000,  profili: 1500 },
  { name: "Enterprise", price: 10000, profili: 3000 }
];

var CERT = 1200, COEFF_SOST = 0.20, COSTO_SEL = 1500;
var PERC_ONBOARD = 0.03, MESI_ONBOARD = 3;
var RISP_TURN = 0.10, RISP_SEL = 0.30, RISP_ONB = 0.15;
var activePlan = 4;

var grid = document.getElementById("plan-grid");
PLANS.forEach(function(p, i) {
  var btn = document.createElement("button");
  btn.className = "plan-btn" + (i === activePlan ? " active" : "");
  var nameNode = document.createTextNode(p.name);
  var priceSpan = document.createElement("span");
  priceSpan.className = "plan-price";
  priceSpan.textContent = p.profili.toLocaleString("it-IT") + " profili";
  btn.appendChild(nameNode);
  btn.appendChild(priceSpan);
  btn.addEventListener("click", function() {
    activePlan = i;
    var btns = document.querySelectorAll(".plan-btn");
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.toggle("active", j === i);
    }
    calc();
  });
  grid.appendChild(btn);
});

function fmt(n) {
  return "€ " + Math.round(n).toLocaleString("it-IT");
}

function set(id, val) {
  var el = document.getElementById(id);
  if (el) el.textContent = val;
}

function calc() {
  var dip  = parseFloat(document.getElementById("dip").value)  || 0;
  var ass  = parseFloat(document.getElementById("ass").value)  || 0;
  var turn = parseFloat(document.getElementById("turn").value) / 100 || 0;
  var stip = parseFloat(document.getElementById("stip").value) || 0;
  var canone = PLANS[activePlan].price;

  var cTurn = dip * turn * stip * COEFF_SOST;
  var cSel  = ass * COSTO_SEL;
  var cOnb  = ass * (stip * PERC_ONBOARD) * MESI_ONBOARD;
  var cTot  = cTurn + cSel + cOnb;

  var sTurn = cTurn * RISP_TURN;
  var sSel  = cSel  * RISP_SEL;
  var sOnb  = cOnb  * RISP_ONB;
  var risp  = sTurn + sSel + sOnb;

  var inv1 = canone + CERT;
  var inv2 = canone;
  var roi1 = inv1 > 0 ? (risp - inv1) / inv1 : 0;
  var roi2 = inv2 > 0 ? (risp - inv2) / inv2 : 0;

  set("o-turn", fmt(cTurn));
  set("o-sel",  fmt(cSel));
  set("o-onb",  fmt(cOnb));
  set("o-tot",  fmt(cTot));
  set("o-canone",  fmt(canone));
  set("o-inv-tot", fmt(inv1));
  set("o-risp", fmt(risp));

  set("o-roi1",  Math.round(roi1 * 100) + "%");
  set("o-mult1", "Ogni €1 investito genera €" + roi1.toFixed(1));
  set("o-inv1",  "Investimento anno 1: " + fmt(inv1));

  set("o-roi2",  Math.round(roi2 * 100) + "%");
  set("o-mult2", "Ogni €1 investito genera €" + roi2.toFixed(1));
  set("o-inv2",  "Canone anno 2+: " + fmt(inv2));
}

calc();
