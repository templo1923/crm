function n(e, t, o) {
  chrome.tabs.query({ url: e }, function (a) {
    a.length > 0 && a.forEach((s) => {
      chrome.tabs.sendMessage(s.id, { action: t, dados: o });
    });
  });
}
async function h(e) {
  return new Promise((t, o) => {
    chrome.storage.local.get([e], function (a) {
      a[e] === void 0 ? o() : t(a[e]);
    });
  });
}
function d(e) {
  const t = new Date(e), o = /* @__PURE__ */ new Date(), a = t.getTime() - o.getTime();
  return a <= 12e4 || a < 0;
}
async function f() {
  const e = await h("notifications"), t = [], o = [];
  let a = 0;
  for (let s of e)
    !s.timeOut && d(`${s.date}T${s.time}`) && (s.timeOut = !0, o.push(s)), s.timeOut && !s.read && a++, t.push(s);
  n("https://web.whatsapp.com/*", "Update_Notificação", { update: t, dispart: o, tam: a });
}

// --- CONFIGURACIÓN DE TU MARCA (KIAMBER CRM) ---
const w = {
  name: "KiamberCRM PRO",
  version: "7.4.2.19",
  cript_key: "ffce211a-7b07-4d91-ba5d-c40bb4034a83",
  
  // TU BACKEND: Aquí es donde se verifican tus usuarios
  backend: "https://catalogo.alwaysdata.net/",
  
  // Backend técnico (compartido para utilidades)
  backend_utils: "https://backend-utils.wascript.com.br/",
  
  // WebSockets (necesarios para funciones en tiempo real)
  webSocket: {
    "multi-atendimento": "https://multi-atendimento.wascript.com.br",
    "api-whatsapp": "https://api-whatsapp.wascript.com.br"
  },
  
  // TU Panel de gestión
  painel_Gestor: "https://catalogo.alwaysdata.net/",
  
  audio_transcriber: "https://audio-transcriber.wascript.com.br/transcription",
  
  // IMPORTANTE: Esta URL es SOLO técnica. Sirve para leer el HTML de WhatsApp.
  // NO envía datos de tus clientes aquí. Es obligatorio para la v7.4.2.19.
  domSelector: "https://domselector.watidy.com/index.php",
  
  midiaLimit: 50
};

async function b() {
  try {
    const t = await (await fetch(w.domSelector)).json();
    typeof t == "object" && typeof t.version == "string" && n("https://web.whatsapp.com/*", "Update_DomSelector", { version: t.version });
  } catch (e) {
    console.error("Error al obtener DomSelector:", e);
  }
}

function c() {
  chrome.alarms.get("One_Minute", (e) => {
    e || chrome.alarms.create("One_Minute", { periodInMinutes: 1 });
  }), chrome.alarms.get("Five_Minutes", (e) => {
    e || chrome.alarms.create("Five_Minutes", { periodInMinutes: 5 });
  }), chrome.alarms.get("Ten_Minutes", (e) => {
    e || chrome.alarms.create("Ten_Minutes", { periodInMinutes: 10 });
  }), chrome.alarms.get("Thirty_Minutes", (e) => {
    e || chrome.alarms.create("Thirty_Minutes", { periodInMinutes: 30 });
  });
}

chrome.alarms.onAlarm.addListener((e) => {
  switch (e.name) {
    case "One_Minute":
      n("https://web.whatsapp.com/*", "Update_Agendamento", {}), n("https://web.whatsapp.com/*", "Update_Status", {}), n("https://web.whatsapp.com/*", "Update_BackupAutomatico", {}), n("https://web.whatsapp.com/*", "Update_MeetAoVivo", {}), f();
      break;
    case "Five_Minutes":
      n("https://web.whatsapp.com/*", "license_update", {}), n("https://web.whatsapp.com/*", "dispatch_timing_follow", {});
      break;
    case "Ten_Minutes":
      b();
      break;
    case "Thirty_Minutes":
      n("https://web.whatsapp.com/*", "Remote-Notificacao", {});
      break;
    case "keepAwake":
      chrome.runtime.getPlatformInfo();
      break;
  }
});

const g = () => {
  const e = /* @__PURE__ */ new Date();
  e.setDate(e.getDate() + 1);
  const t = e.getFullYear(), o = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${o}-${a}`;
}, M = {
  date: g(),
  items: [
    "respostasRapidas", "respostasRapidasAcao", "categoria", "agendamentos",
    "agendamentosNaoDisparados", "sendAfterWhatsAppOpens", "crm", "contatos",
    "notes", "notifications", "perfil", "userTabs", "agrupamentos",
    "relatorio", "encomendas", "autoatendimento", "webhook", "IA",
    "status", "pinChat", "atendimento", "backupAutomatico", "whatsApi",
    "FollowUp", "fluxo"
  ],
  recurrency: "diario",
  time: "10:30"
};

async function k() {
  chrome.storage.local.get(null, (e) => {
    // INYECCIÓN DE SEGURIDAD:
    // Aseguramos que si el frontend busca la config en storage, encuentre la tuya.
    const systemConfig = {
       backend: w.backend,
       painel_Gestor: w.painel_Gestor,
       name: w.name,
       version: w.version
    };

    chrome.storage.local.set({
      config: systemConfig, // Guardamos tu config explícitamente
      agendamentos: e.agendamentos || [],
      agendamentosNaoDisparados: e.agendamentosNaoDisparados || [],
      sendAfterWhatsAppOpens: e.sendAfterWhatsAppOpens || !1,
      notifications: e.notifications || [],
      userTabs: e.userTabs || [],
      contatos: e.contatos || [],
      notes: e.notes || [],
      agendaMsg: e.agendaMsg || [],
      perfil: e.perfil || [],
      categoria: e.categoria || [],
      initSystem: e.initSystem || !1,
      backupAutomatico: e.backupAutomatico || M,
      crm: e.crm || [],
      fluxo: e.fluxo || { workflows: [], currentWorkflow: null },
      fluxoFiles: e.fluxoFiles || [],
      agrupamentos: e.agrupamentos || [],
      relatorio: e.relatorio || [],
      encomendas: e.encomendas || [],
      autoatendimento: e.autoatendimento || [],
      FollowUp: e.FollowUp || [],
      webhook: e.webhook || [],
      IA: e.IA || { activeIA: null, keyGemini: "", keyGPT: "" },
      status: e.status || [],
      pinChat: e.pinChat || [],
      atendimento: e.atendimento || void 0,
      whatsApi: e.whatsApi || { active: !1, token: "", userID: "" },
      initDate: e.initDate || !1,
      modalLead: e.modalLead || {},
      guardaMsg: e.guardaMsg || [],
      medias: e.medias || [],
      respostasRapidas: e.respostasRapidas || [],
      respostasRapidasAcao: e.respostasRapidasAcao || []
    });
  });
}

function u() {
  chrome.tabs.query({ url: "https://web.whatsapp.com/*" }, function (e) {
    e.length > 0 && e[0].id !== void 0 ? chrome.tabs.reload(e[0].id) : chrome.tabs.create({ url: "https://web.whatsapp.com" });
  });
}

// URL de Desinstalación (Tuya)
function A() {
  chrome.runtime.setUninstallURL(`https://miquetools.com/contact`); 
}

// Evento de Instalación (Tu URL de bienvenida)
function _(e) {
  if (e.reason === "install") {
     chrome.tabs.create({ url: "https://kb.miquehosting.com/mique-crm/crm-extension-master" });
  }
}

function r(e) {
  const t = chrome.runtime.getURL(e + "/src/index.html");
  chrome.tabs.query({ url: t }, function (o) {
    o.length > 0 && o.forEach((a) => {
      a.id !== void 0 && chrome.tabs.remove(a.id);
    }), chrome.tabs.create({ url: t });
  });
}
const i = /* @__PURE__ */ new Map(), p = (e, t, o) => {
  o.url && i.set(e, o.url);
}, l = (e) => {
  const t = i.get(e);
  i.delete(e), t && t.includes("https://web.whatsapp") && chrome.runtime.sendMessage({ action: "whatsIsClosed" });
}, m = () => {
  try {
    chrome.tabs.onUpdated.removeListener(p), chrome.tabs.onRemoved.removeListener(l);
  } catch (e) {
    console.error("error listener", e);
  } finally {
    chrome.tabs.onUpdated.addListener(p), chrome.tabs.onRemoved.addListener(l);
  }
};
c();
m();
chrome.action.onClicked.addListener(() => {
  c(), m(), u();
});
chrome.runtime.onInstalled.addListener(async function (e) {
  _(e), u(), c(), k(), m(), A();
});
chrome.runtime.onMessage.addListener((e, t, o) => {
  switch (e.message) {
    case "CRM":
      r("crm");
      break;
    case "FLOW":
      r("fluxo");
      break;
    case "funnil":
      r("funnil");
      break;
    case "promotional":
      chrome.tabs.create({ url: e.path });
      break;
  }
});