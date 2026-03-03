import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────
   TALENTOS · AI SOURCING HUB
   Professional Business UI — v3.0
   Light / Dark mode · Playfair Display + Plus Jakarta Sans
   Full Candidate Pool · Unlocked Profile Sample Data
───────────────────────────────────────────────── */

const FONT_URL = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap";

/* ── THEME TOKENS ── */
const THEMES = {
  dark: {
    bg:        "#0A0F1C",
    bg2:       "#0F1729",
    bg3:       "#131D32",
    bg4:       "#192240",
    surface:   "rgba(255,255,255,0.045)",
    surface2:  "rgba(255,255,255,0.08)",
    surface3:  "rgba(255,255,255,0.12)",
    border:    "rgba(255,255,255,0.08)",
    border2:   "rgba(255,255,255,0.15)",
    text:      "#EDF2FF",
    text2:     "#8B95A8",
    text3:     "#485060",
    teal:      "#00C9A7",
    tealDim:   "rgba(0,201,167,0.12)",
    tealBrd:   "rgba(0,201,167,0.28)",
    blue:      "#3B82F6",
    blueDim:   "rgba(59,130,246,0.12)",
    violet:    "#7C6FFF",
    violetDim: "rgba(124,111,255,0.12)",
    amber:     "#F59E0B",
    amberDim:  "rgba(245,158,11,0.1)",
    green:     "#10B981",
    greenDim:  "rgba(16,185,129,0.12)",
    red:       "#EF4444",
    redDim:    "rgba(239,68,68,0.1)",
    shadow:    "rgba(0,0,0,0.4)",
    navActive: "rgba(0,201,167,0.12)",
    cardHover: "rgba(0,201,167,0.06)",
    inputBg:   "rgba(255,255,255,0.04)",
    scoreHigh: ["rgba(16,185,129,0.15)","#10B981"],
    scoreMid:  ["rgba(245,158,11,0.15)","#F59E0B"],
    scoreLow:  ["rgba(239,68,68,0.15)","#EF4444"],
  },
  light: {
    bg:        "#F4F7FD",
    bg2:       "#FFFFFF",
    bg3:       "#F0F4FA",
    bg4:       "#E8EEF8",
    surface:   "rgba(255,255,255,0.9)",
    surface2:  "rgba(255,255,255,1)",
    surface3:  "rgba(240,244,250,0.8)",
    border:    "rgba(0,0,0,0.08)",
    border2:   "rgba(0,0,0,0.14)",
    text:      "#111827",
    text2:     "#4B5563",
    text3:     "#9CA3AF",
    teal:      "#00897B",
    tealDim:   "rgba(0,137,123,0.1)",
    tealBrd:   "rgba(0,137,123,0.25)",
    blue:      "#2563EB",
    blueDim:   "rgba(37,99,235,0.1)",
    violet:    "#6D28D9",
    violetDim: "rgba(109,40,217,0.1)",
    amber:     "#D97706",
    amberDim:  "rgba(217,119,6,0.1)",
    green:     "#059669",
    greenDim:  "rgba(5,150,105,0.1)",
    red:       "#DC2626",
    redDim:    "rgba(220,38,38,0.08)",
    shadow:    "rgba(0,0,0,0.08)",
    navActive: "rgba(0,137,123,0.1)",
    cardHover: "rgba(0,137,123,0.04)",
    inputBg:   "rgba(0,0,0,0.03)",
    scoreHigh: ["rgba(5,150,105,0.12)","#059669"],
    scoreMid:  ["rgba(217,119,6,0.12)","#D97706"],
    scoreLow:  ["rgba(220,38,38,0.1)","#DC2626"],
  }
};

/* ── DATA ── */
const SOURCES = [
  {id:"linkedin",   label:"LinkedIn",       ico:"in", color:"#0A66C2"},
  {id:"github",     label:"GitHub",         ico:"GH", color:"#238636"},
  {id:"indeed",     label:"Indeed",         ico:"id", color:"#2164F3"},
  {id:"xing",       label:"Xing",           ico:"Xi", color:"#006567"},
  {id:"glassdoor",  label:"Glassdoor",      ico:"Gd", color:"#0CAA41"},
  {id:"stackoverflow",label:"Stack Overflow",ico:"SO",color:"#EF8236"},
];

const JOBS = [
  {id:1, title:"Senior DevOps Engineer",      dept:"Engineering",    location:"Zürich",    open:3},
  {id:2, title:"Platform Engineer",            dept:"Infrastructure", location:"Basel",     open:2},
  {id:3, title:"Cloud Architect",              dept:"Architecture",   location:"Zürich",    open:1},
  {id:4, title:"Site Reliability Engineer",    dept:"Engineering",    location:"Geneva",    open:2},
  {id:5, title:"Infrastructure Lead",          dept:"Engineering",    location:"Bern",      open:1},
];

const PROFILES = [
  {id:1,  name:"Lena Müller",        title:"Senior DevOps Engineer",       employer:"Google Switzerland",    loc:"Zürich, CH",    yoe:9,  score:96, edu:"MSc Computer Science",       industry:"Large Technology Company",     skills:["Kubernetes","Terraform","AWS","Docker","CI/CD","Helm","Prometheus"], matched:6, avail:true,  email:"lena.muller@email.ch",       phone:"+41 79 234 5678", linkedin:"linkedin.com/in/lenamuller",   github:"github.com/lena-m",    av:0, source:"linkedin",   summary:"Highly experienced DevOps engineer with 9 years driving large-scale Kubernetes infrastructure at Google. Led migration of 200+ microservices to GKE. Certified Kubernetes Administrator and AWS Solutions Architect."},
  {id:2,  name:"Marco Bernasconi",   title:"Platform Engineer",            employer:"Zühlke Engineering",    loc:"Basel, CH",    yoe:7,  score:91, edu:"BSc Software Engineering",    industry:"Mid-sized SaaS Company",       skills:["Kubernetes","AWS","Docker","Python","Terraform","Prometheus"],        matched:5, avail:true,  email:"m.bernasconi@mail.ch",        phone:"+41 61 456 7890", linkedin:"linkedin.com/in/marco-b",      github:"github.com/marco-b",   av:1, source:"github",    summary:"Platform engineer specialising in infrastructure-as-code and developer productivity. Built internal Kubernetes platform used by 150+ engineers. Open-source contributor to Terraform providers."},
  {id:3,  name:"Sophie Dubois",      title:"Cloud Infrastructure Lead",    employer:"UBS Group AG",          loc:"Bern, CH",     yoe:11, score:88, edu:"MEng Software Systems",       industry:"Financial Services Group",     skills:["AWS","Terraform","Kubernetes","Security","Networking","Docker"],      matched:5, avail:false, email:"s.dubois@proton.me",          phone:"+41 31 567 8901", linkedin:"linkedin.com/in/sdubois",      github:"github.com/sdubois",   av:2, source:"linkedin",   summary:"Cloud infrastructure lead with 11 years across banking and fintech. Designed secure multi-account AWS architecture for UBS. Expert in cloud security and compliance frameworks (ISO 27001, SOC 2)."},
  {id:4,  name:"Adrian Keller",      title:"Site Reliability Engineer",    employer:"Teamsystems SA",        loc:"Geneva, CH",   yoe:6,  score:84, edu:"BSc Computer Science",        industry:"European Tech Scale-up",       skills:["Kubernetes","Prometheus","Python","Docker","GCP","Terraform"],        matched:5, avail:true,  email:"a.keller@gmail.com",          phone:"+41 22 678 9012", linkedin:"linkedin.com/in/adriankeller", github:"github.com/a-keller",  av:3, source:"stackoverflow",summary:"SRE with deep expertise in observability and incident response. Reduced MTTR by 65% through custom Prometheus alerting and runbook automation. Speaker at SREcon Europe 2023."},
  {id:5,  name:"Nadia Volkov",       title:"DevOps Engineer",              employer:"Digitec Galaxus AG",    loc:"Lausanne, CH", yoe:5,  score:79, edu:"BSc Information Technology",  industry:"E-commerce Technology Firm",   skills:["Docker","CI/CD","AWS","Python","Ansible"],                           matched:4, avail:true,  email:"n.volkov@fastmail.com",        phone:"+41 21 789 0123", linkedin:"linkedin.com/in/nadiav",       github:"github.com/nvolkov",   av:4, source:"indeed",     summary:"DevOps engineer focused on CI/CD pipeline optimisation at Digitec Galaxus. Cut deployment times from 45 minutes to 8 minutes. Certified AWS Developer. Passionate about GitOps methodologies."},
  {id:6,  name:"Fabian Meier",       title:"Infrastructure Engineer",      employer:"Accenture Switzerland", loc:"Lucerne, CH",  yoe:8,  score:76, edu:"MEng Distributed Systems",    industry:"Global Consulting Group",      skills:["Terraform","AWS","Docker","Linux","Networking"],                     matched:4, avail:false, email:"f.meier@bluewin.ch",           phone:"+41 41 890 1234", linkedin:"linkedin.com/in/fmeier",       github:"github.com/fmeier",    av:5, source:"xing",      summary:"Infrastructure engineer with consulting background across 12+ enterprise clients. Specialist in hybrid cloud architectures and network security. CCIE certified with deep Linux systems knowledge."},
  {id:7,  name:"Elena Rossi",        title:"Senior Cloud Engineer",        employer:"Swiss Re",              loc:"St. Gallen, CH",yoe:10, score:72, edu:"MSc IT Management",           industry:"Insurance Technology Firm",    skills:["Azure","Kubernetes","Terraform","DevOps","Python"],                  matched:3, avail:true,  email:"e.rossi@outlook.com",          phone:"+41 71 901 2345", linkedin:"linkedin.com/in/elena-r",      github:"github.com/erossi",    av:6, source:"glassdoor",  summary:"Senior cloud engineer at Swiss Re with a decade of experience building resilient insurance technology infrastructure. Azure expert with Kubernetes certifications. Led cloud-first transformation initiative."},
  {id:8,  name:"Jonas Weber",        title:"Platform Operations Engineer", employer:"AMAG Group",            loc:"Winterthur, CH",yoe:4,  score:68, edu:"BSc Systems Engineering",    industry:"Automotive Technology Group",  skills:["Kubernetes","Docker","Linux","Bash","Monitoring"],                   matched:3, avail:true,  email:"j.weber@gmail.com",            phone:"+41 52 012 3456", linkedin:"linkedin.com/in/jonasweber",   github:"github.com/jweber",    av:7, source:"github",    summary:"Platform operations engineer with strong Linux and containerisation skills. Manages Kubernetes clusters supporting AMAG's digital retail platform. Enthusiastic learner pursuing CKA certification."},
];

const AVCOLORS = ["#00C9A7","#7C6FFF","#EF4444","#F59E0B","#10B981","#3B82F6","#F97316","#A855F7"];

const TX_HISTORY = [
  {id:1,type:"unlock",   label:"Profile Unlocked — Senior DevOps Engineer",      cost:1,   date:"Today, 11:42",    icon:"🔓"},
  {id:2,type:"interview",label:"AI Interview Scheduled — Cloud Architect",        cost:3,   date:"Today, 09:15",    icon:"🎙"},
  {id:3,type:"unlock",   label:"Profile Unlocked — Platform Engineer",            cost:1,   date:"Yesterday",       icon:"🔓"},
  {id:4,type:"interview",label:"AI Interview Scheduled — SRE",                   cost:3,   date:"Yesterday",       icon:"🎙"},
  {id:5,type:"unlock",   label:"Profile Unlocked — Infrastructure Lead",          cost:1,   date:"Mon 14:30",       icon:"🔓"},
  {id:6,type:"topup",    label:"Credits Purchased — Growth Bundle (220 credits)", cost:-220,date:"Mon 09:00",       icon:"⬡"},
  {id:7,type:"unlock",   label:"Profile Unlocked — DevOps Engineer",              cost:1,   date:"Last Friday",     icon:"🔓"},
  {id:8,type:"interview",label:"AI Interview Scheduled — Cloud Infra Lead",       cost:3,   date:"Last Friday",     icon:"🎙"},
];

/* ── HELPERS ── */
const scoreColor = (s,T) => s>=85 ? T.scoreHigh[1] : s>=70 ? T.scoreMid[1] : T.scoreLow[1];
const scoreBg    = (s,T) => s>=85 ? T.scoreHigh[0] : s>=70 ? T.scoreMid[0] : T.scoreLow[0];
const formatDate = ()=> new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});

/* ── CSS GENERATION ── */
function makeCSS(T, isDark) {
  return `
@import url('${FONT_URL}');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body,#root{height:100%;font-family:'Plus Jakarta Sans',sans-serif;background:${T.bg}}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:${T.border2};border-radius:3px}

@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}

.card-hover{transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}
.card-hover:hover{transform:translateY(-2px);border-color:${T.tealBrd}!important;box-shadow:0 6px 28px ${T.shadow}!important}

.nav-item{
  display:flex;align-items:center;gap:10px;padding:9px 14px;border-radius:8px;
  cursor:pointer;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif;
  font-size:13px;font-weight:500;color:${T.text3};border:none;background:transparent;
  width:100%;text-align:left;letter-spacing:0.01em
}
.nav-item:hover{background:${T.surface2};color:${T.text2}}
.nav-item.active{background:${T.navActive};color:${T.teal};border-left:2.5px solid ${T.teal};font-weight:600}

.btn-primary{
  background:linear-gradient(135deg,${T.teal},${T.blue});
  color:#fff;border:none;cursor:pointer;
  font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;
  border-radius:9px;transition:all .2s;letter-spacing:0.02em
}
.btn-primary:hover{filter:brightness(1.08);transform:translateY(-1px);box-shadow:0 4px 16px ${T.teal}44}
.btn-primary:disabled{opacity:.38;cursor:default;filter:none;transform:none;box-shadow:none}

.btn-secondary{
  background:${T.surface};color:${T.text2};
  border:1px solid ${T.border};cursor:pointer;
  font-family:'Plus Jakarta Sans',sans-serif;font-weight:500;
  border-radius:9px;transition:all .15s
}
.btn-secondary:hover{background:${T.surface2};color:${T.text};border-color:${T.border2}}

.btn-teal-outline{
  background:${T.tealDim};color:${T.teal};
  border:1px solid ${T.tealBrd};cursor:pointer;
  font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;
  border-radius:9px;transition:all .15s
}
.btn-teal-outline:hover{background:${T.teal};color:#fff}

.input-field{
  background:${T.inputBg};border:1.5px solid ${T.border};
  color:${T.text};font-family:'Plus Jakarta Sans',sans-serif;
  font-size:14px;border-radius:9px;padding:10px 14px;
  outline:none;transition:border-color .2s,background .2s;width:100%
}
.input-field:focus{border-color:${T.teal};background:${T.tealDim}}
.input-field::placeholder{color:${T.text3}}
select.input-field option{background:${T.bg2};color:${T.text}}

.tag{
  display:inline-flex;align-items:center;gap:4px;
  padding:3px 9px;border-radius:20px;font-size:11px;
  font-weight:600;font-family:'Plus Jakarta Sans',sans-serif;letter-spacing:0.02em
}

.glass-card{
  background:${T.surface};border:1px solid ${T.border};
  border-radius:14px;backdrop-filter:blur(8px)
}

.pbar-track{height:6px;background:${T.surface2};border-radius:3px;overflow:hidden}

.section-title{
  font-family:'Playfair Display',serif;font-weight:700;
  color:${T.text};letter-spacing:-0.02em
}

.data-row{
  display:flex;align-items:center;gap:12px;padding:12px 0;
  border-bottom:1px solid ${T.border};transition:background .15s
}
.data-row:last-child{border-bottom:none}
.data-row:hover{background:${T.cardHover}}
`;
}

/* ── ATOMS ── */
function Avatar({idx, size=40, name, T}) {
  const c = AVCOLORS[idx % AVCOLORS.length];
  const ini = (name||"?").split(" ").map(n=>n[0]).join("").slice(0,2);
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:`${c}18`,border:`2px solid ${c}40`,display:"flex",alignItems:"center",justifyContent:"center",color:c,fontSize:size*0.33,fontWeight:700,fontFamily:"'Playfair Display',serif",flexShrink:0}}>
      {ini}
    </div>
  );
}

function ScoreBadge({score, T}) {
  return (
    <span className="tag" style={{background:scoreBg(score,T),color:scoreColor(score,T),border:`1px solid ${scoreColor(score,T)}40`,fontSize:12,padding:"4px 10px"}}>
      {score}% match
    </span>
  );
}

function SkillPill({skill, matched, T}) {
  return (
    <span className="tag" style={{background:matched?T.tealDim:T.surface2,color:matched?T.teal:T.text3,border:`1px solid ${matched?T.tealBrd:T.border}`}}>
      {matched && <span style={{fontSize:9,fontWeight:700}}>✓</span>}
      {skill}
    </span>
  );
}

function StatusDot({active, label, T}) {
  return (
    <span style={{display:"flex",alignItems:"center",gap:5,fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:active?T.green:T.text3}}>
      <span style={{width:7,height:7,borderRadius:"50%",background:active?T.green:T.text3,display:"inline-block",animation:active?"pulse 2s infinite":"none"}}/>
      {label}
    </span>
  );
}

function InfoRow({label, value, T}) {
  return (
    <div style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:9,padding:"11px 14px"}}>
      <div style={{fontSize:10,color:T.text3,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4,fontWeight:600}}>{label}</div>
      <div style={{fontSize:13,fontWeight:600,color:T.text,wordBreak:"break-all"}}>{value}</div>
    </div>
  );
}

function Toast({msg, type, T, onClose}) {
  useEffect(()=>{const t=setTimeout(onClose,4000);return()=>clearTimeout(t);},[]);
  const typeColors={success:T.green,info:T.teal,warning:T.amber,error:T.red};
  const c=typeColors[type]||T.teal;
  return (
    <div style={{background:T.bg2,border:`1px solid ${c}30`,borderRadius:11,padding:"13px 18px",maxWidth:420,display:"flex",alignItems:"center",gap:12,boxShadow:`0 8px 32px ${T.shadow}`,animation:"fadeUp .3s ease",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <span style={{width:8,height:8,borderRadius:"50%",background:c,flexShrink:0,animation:"pulse 2s infinite"}}/>
      <span style={{fontSize:13,color:T.text,lineHeight:1.5,flex:1}}>{msg}</span>
      <button onClick={onClose} style={{background:"none",border:"none",color:T.text3,cursor:"pointer",fontSize:17,flexShrink:0,padding:0}}>×</button>
    </div>
  );
}

/* ── SIDEBAR ── */
function Sidebar({page, setPage, credits, isDark, toggleTheme, T}) {
  const nav = [
    {id:"sourcing",   ico:"◎", label:"AI Sourcing Hub"},
    {id:"pipeline",   ico:"⟳", label:"Job Pipelines"},
    {id:"pool",       ico:"❑", label:"Candidate Pool"},
    {id:"interviews", ico:"◷", label:"AI Interviews"},
    {id:"jobs",       ico:"≡", label:"Jobs"},
    {id:"credits",    ico:"⬡", label:"Credits Dashboard"},
    {id:"settings",   ico:"⚙", label:"Settings"},
  ];
  return (
    <div style={{width:224,background:T.bg2,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",flexShrink:0,height:"100vh"}}>
      {/* Logo */}
      <div style={{padding:"20px 18px 16px",borderBottom:`1px solid ${T.border}`}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:19,background:`linear-gradient(120deg,${T.teal},${T.blue})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:"-0.01em"}}>TalentOS</div>
        <div style={{fontSize:11,color:T.text3,marginTop:2,fontFamily:"'Plus Jakarta Sans',sans-serif",letterSpacing:"0.02em"}}>AI Hiring Platform</div>
      </div>
      {/* User */}
      <div style={{padding:"12px 14px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg,${T.teal},${T.blue})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:12,fontFamily:"'Playfair Display',serif",flexShrink:0}}>SK</div>
        <div>
          <div style={{color:T.text,fontSize:13,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Sarah Kessler</div>
          <div style={{color:T.text3,fontSize:11,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>HR Manager · Novartis AG</div>
        </div>
      </div>
      {/* Nav */}
      <nav style={{flex:1,padding:"8px 8px",overflowY:"auto"}}>
        {nav.map(it => (
          <button key={it.id} onClick={()=>setPage(it.id)} className={`nav-item${page===it.id?" active":""}`}>
            <span style={{fontSize:14,flexShrink:0}}>{it.ico}</span>
            <span>{it.label}</span>
            {it.id==="credits" && (
              <span style={{marginLeft:"auto",fontSize:11,fontWeight:700,color:T.teal,background:T.tealDim,borderRadius:10,padding:"1px 8px"}}>{credits}</span>
            )}
          </button>
        ))}
      </nav>
      {/* Theme toggle + footer */}
      <div style={{padding:"12px 14px",borderTop:`1px solid ${T.border}`}}>
        <button onClick={toggleTheme} style={{width:"100%",padding:"9px 14px",background:T.surface2,border:`1px solid ${T.border}`,borderRadius:9,cursor:"pointer",display:"flex",alignItems:"center",gap:10,marginBottom:10,transition:"all .15s",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          <span style={{fontSize:15}}>{isDark?"☀️":"🌙"}</span>
          <span style={{fontSize:12,fontWeight:600,color:T.text2}}>{isDark?"Switch to Light Mode":"Switch to Dark Mode"}</span>
        </button>
        <div style={{fontSize:10,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif",display:"flex",alignItems:"center",gap:5}}>
          <span>🛡</span>
          <span>GDPR · Swiss nDSG · v3.0</span>
        </div>
      </div>
    </div>
  );
}

/* ── TOPBAR ── */
function Topbar({page, credits, unlocked, pooled, piped, T}) {
  const titles = {sourcing:"AI Sourcing Hub",pipeline:"Job Pipelines",pool:"Candidate Pool",interviews:"AI Interviews",credits:"Credits Dashboard",jobs:"Jobs",settings:"Settings"};
  return (
    <div style={{height:54,background:T.bg2,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",padding:"0 28px",gap:20,flexShrink:0}}>
      <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:17,color:T.text,flex:1,letterSpacing:"-0.01em"}}>{titles[page]||"—"}</span>
      <div style={{display:"flex",gap:20,alignItems:"center"}}>
        {[["🔓",unlocked,"Unlocked"],["❑",pooled,"In Pool"],["⟳",piped,"Pipeline"]].map(([ico,v,l])=>(
          <div key={l} style={{display:"flex",alignItems:"center",gap:5}}>
            <span style={{fontSize:13}}>{ico}</span>
            <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text,fontWeight:700}}>{v}</span>
            <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3}}>{l}</span>
          </div>
        ))}
        <div style={{height:18,width:1,background:T.border}}/>
        <div style={{display:"flex",alignItems:"center",gap:7,background:T.tealDim,border:`1px solid ${T.tealBrd}`,borderRadius:20,padding:"5px 14px"}}>
          <span style={{fontSize:14}}>⬡</span>
          <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,color:T.teal,fontSize:14}}>{credits}</span>
          <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3}}>credits</span>
        </div>
      </div>
    </div>
  );
}

/* ── SEARCH PAGE ── */
function SearchPage({onSearch, T}) {
  const [mode, setMode] = useState("ai");
  const [prompt, setPrompt] = useState("");
  const [sources, setSources] = useState(SOURCES.map(s=>s.id));
  const [searching, setSearching] = useState(false);
  const [role, setRole] = useState("Senior DevOps Engineer");
  const [skills, setSkills] = useState(["Kubernetes","Terraform","AWS","Docker"]);
  const [exp, setExp] = useState("Senior (6–10 yrs)");
  const [location, setLocation] = useState("Switzerland");

  const ALL_SK = ["Kubernetes","Terraform","AWS","Docker","CI/CD","Helm","Python","Prometheus","GCP","Azure","Linux","Ansible","Go","Rust"];
  const QP = [
    "Find senior DevOps engineers in Switzerland with Kubernetes and Terraform experience, open to new roles",
    "Cloud architects with 8+ years in financial services, based in Zürich or Geneva",
    "Platform engineers experienced with large-scale distributed systems and infrastructure-as-code",
  ];

  function go() {
    if(mode==="ai" && !prompt.trim()) return;
    setSearching(true);
    setTimeout(()=>{setSearching(false);onSearch();},1800);
  }

  return (
    <div style={{flex:1,overflowY:"auto",padding:"36px 48px"}}>
      <div style={{maxWidth:720,margin:"0 auto",animation:"fadeUp .5s ease"}}>
        <div style={{marginBottom:32}}>
          <h1 className="section-title" style={{fontSize:28,marginBottom:8}}>Find Passive Candidates</h1>
          <p style={{fontSize:14,color:T.text2,lineHeight:1.65,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>AI searches millions of external profiles across selected sources. All results are anonymised until you choose to unlock a profile.</p>
        </div>

        {/* Mode tabs */}
        <div style={{display:"flex",gap:3,padding:4,background:T.surface2,borderRadius:11,border:`1px solid ${T.border}`,marginBottom:26,width:"fit-content"}}>
          {[["ai","✦ AI Prompt","Default"],["manual","⊞ Manual Filters","Advanced"]].map(([m,label,sub])=>(
            <button key={m} onClick={()=>setMode(m)} style={{padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:13,transition:"all .2s",background:mode===m?`linear-gradient(135deg,${T.teal},${T.blue})`:"transparent",color:mode===m?"#fff":T.text3,letterSpacing:"0.01em"}}>
              {label} <span style={{opacity:.65,fontWeight:400,fontSize:11,marginLeft:4}}>{sub}</span>
            </button>
          ))}
        </div>

        {/* AI Prompt */}
        {mode==="ai" && (
          <div className="glass-card" style={{padding:24,marginBottom:18,animation:"fadeIn .3s ease"}}>
            <label style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:"0.09em",display:"block",marginBottom:10}}>Describe What You're Looking For</label>
            <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="e.g. Find senior DevOps engineers in Switzerland with at least 7 years of Kubernetes experience who are open to new opportunities..." style={{width:"100%",minHeight:100,background:T.inputBg,border:`1.5px solid ${T.border}`,borderRadius:9,padding:"14px",color:T.text,fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",resize:"vertical",outline:"none",lineHeight:1.65,transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor=T.teal} onBlur={e=>e.target.style.borderColor=T.border}/>
            <div style={{marginTop:14}}>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3,marginBottom:9,fontWeight:500}}>Suggested prompts:</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {QP.map(q=>(
                  <button key={q} onClick={()=>setPrompt(q)} style={{background:T.surface2,border:`1px solid ${T.border}`,color:T.text3,borderRadius:20,padding:"5px 13px",fontSize:12,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all .15s",textAlign:"left"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.tealBrd;e.currentTarget.style.color=T.text2;e.currentTarget.style.background=T.tealDim;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.text3;e.currentTarget.style.background=T.surface2;}}>
                    {q.length>58?q.slice(0,58)+"…":q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Manual */}
        {mode==="manual" && (
          <div className="glass-card" style={{padding:24,marginBottom:18,animation:"fadeIn .3s ease"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
              <div>
                <label style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:"0.09em",display:"block",marginBottom:7}}>Job Title *</label>
                <input className="input-field" value={role} onChange={e=>setRole(e.target.value)} placeholder="e.g. Senior DevOps Engineer"/>
              </div>
              <div>
                <label style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:"0.09em",display:"block",marginBottom:7}}>Location</label>
                <input className="input-field" value={location} onChange={e=>setLocation(e.target.value)} placeholder="e.g. Switzerland"/>
              </div>
            </div>
            <div style={{marginBottom:14}}>
              <label style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:"0.09em",display:"block",marginBottom:8}}>Required Skills</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
                {skills.map(s=>(
                  <span key={s} className="tag" style={{background:T.tealDim,color:T.teal,border:`1px solid ${T.tealBrd}`}}>
                    {s}
                    <button onClick={()=>setSkills(sk=>sk.filter(x=>x!==s))} style={{background:"none",border:"none",color:T.teal,cursor:"pointer",fontSize:13,padding:0,marginLeft:3,lineHeight:1}}>×</button>
                  </span>
                ))}
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {ALL_SK.filter(s=>!skills.includes(s)).map(s=>(
                  <button key={s} onClick={()=>setSkills(sk=>[...sk,s])} style={{background:T.surface2,border:`1px solid ${T.border}`,color:T.text3,borderRadius:20,padding:"3px 10px",fontSize:12,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.tealBrd;e.currentTarget.style.color=T.teal;e.currentTarget.style.background=T.tealDim;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.text3;e.currentTarget.style.background=T.surface2;}}>
                    + {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:"0.09em",display:"block",marginBottom:7}}>Experience Level</label>
              <select className="input-field" value={exp} onChange={e=>setExp(e.target.value)} style={{width:"50%"}}>
                {["Junior (0–2 yrs)","Mid (3–5 yrs)","Senior (6–10 yrs)","Lead/Principal (10+ yrs)"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Sources */}
        <div className="glass-card" style={{padding:22,marginBottom:22}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:"0.09em"}}>Search Sources <span style={{color:T.text3,fontWeight:400,textTransform:"none",letterSpacing:0}}>({sources.length}/{SOURCES.length} selected)</span></span>
            <div style={{display:"flex",gap:12}}>
              <button onClick={()=>setSources(SOURCES.map(s=>s.id))} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,color:T.teal,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600}}>Select All</button>
              <span style={{color:T.text3,fontSize:12}}>·</span>
              <button onClick={()=>setSources([])} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Clear</button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
            {SOURCES.map(src=>{
              const on=sources.includes(src.id);
              return (
                <button key={src.id} onClick={()=>setSources(s=>s.includes(src.id)?s.filter(x=>x!==src.id):[...s,src.id])} style={{padding:"11px 14px",borderRadius:10,border:`1.5px solid ${on?src.color+"35":T.border}`,background:on?`${src.color}0C`:T.surface,cursor:"pointer",display:"flex",alignItems:"center",gap:10,transition:"all .2s",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                  <div style={{width:28,height:28,borderRadius:7,background:on?`${src.color}20`:T.surface2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:on?src.color:T.text3,fontFamily:"'Playfair Display',serif",transition:"all .2s",letterSpacing:.3}}>{src.ico.toUpperCase()}</div>
                  <span style={{fontSize:13,fontWeight:500,color:on?T.text:T.text3,transition:"color .2s"}}>{src.label}</span>
                  {on && <span style={{marginLeft:"auto",width:7,height:7,borderRadius:"50%",background:T.green,flexShrink:0}}/>}
                </button>
              );
            })}
          </div>
          <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3,marginTop:12}}>Publicly available professional data only · Certified third-party providers · GDPR & nDSG compliant</p>
        </div>

        {/* Privacy notice */}
        <div style={{background:T.violetDim,border:`1px solid ${T.violet}25`,borderRadius:10,padding:"12px 16px",marginBottom:24,display:"flex",gap:12,alignItems:"flex-start"}}>
          <span style={{fontSize:16,flexShrink:0}}>🛡</span>
          <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text2,lineHeight:1.65,margin:0}}>All results are fully anonymised. Names, employers, contact details and social profiles remain hidden until you explicitly unlock a profile. Each unlock costs <strong style={{color:T.teal}}>1 credit</strong> and automatically triggers a GDPR/nDSG candidate notification.</p>
        </div>

        <button className="btn-primary" onClick={go} disabled={searching||(mode==="ai"&&!prompt.trim())} style={{width:"100%",padding:"15px",fontSize:15,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",gap:10,letterSpacing:"0.02em"}}>
          {searching
            ? <><span style={{animation:"spin .9s linear infinite",display:"inline-block",fontSize:16}}>↻</span> Scanning {sources.length} sources…</>
            : <>✦ {mode==="ai"?"Run AI Search":"Find Candidates"}</>
          }
        </button>
      </div>
    </div>
  );
}

/* ── RESULTS PAGE ── */
function ResultsPage({profiles, onProfile, onNewSearch, T}) {
  const [sort, setSort] = useState("score");
  const [minScore, setMinScore] = useState(0);
  const [availOnly, setAvailOnly] = useState(false);
  const [shortlist, setShortlist] = useState([]);

  let list = [...profiles].filter(p=>p.score>=minScore&&(availOnly?p.avail:true));
  list.sort((a,b)=>sort==="score"?b.score-a.score:b.yoe-a.yoe);

  return (
    <div style={{flex:1,display:"flex",overflow:"hidden"}}>
      {/* Filter panel */}
      <div style={{width:216,background:T.bg2,borderRight:`1px solid ${T.border}`,padding:"18px 12px",overflowY:"auto",flexShrink:0}}>
        <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:T.text3,textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:16}}>Refine Results</div>
        <div style={{marginBottom:20}}>
          <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text2,fontWeight:600,marginBottom:9}}>Sort by</div>
          {[["score","Match Score"],["yoe","Experience"]].map(([v,l])=>(
            <button key={v} onClick={()=>setSort(v)} style={{display:"block",width:"100%",padding:"8px 12px",borderRadius:8,border:`1px solid ${sort===v?T.tealBrd:T.border}`,background:sort===v?T.tealDim:T.surface,color:sort===v?T.teal:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,cursor:"pointer",marginBottom:5,textAlign:"left",transition:"all .15s",fontWeight:sort===v?600:400}}>
              {sort===v&&"● "}{l}
            </button>
          ))}
        </div>
        <div style={{marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text2,fontWeight:600,marginBottom:8}}>
            <span>Min. Score</span><span style={{color:T.teal,fontWeight:700}}>{minScore}%</span>
          </div>
          <input type="range" min={0} max={90} step={5} value={minScore} onChange={e=>setMinScore(+e.target.value)} style={{width:"100%",accentColor:T.teal,cursor:"pointer"}}/>
        </div>
        <div style={{marginBottom:20}}>
          <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text2,fontWeight:600,marginBottom:10}}>Availability</div>
          <label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
            <div onClick={()=>setAvailOnly(!availOnly)} style={{width:36,height:20,borderRadius:10,background:availOnly?T.teal:T.surface2,border:`1px solid ${availOnly?T.teal:T.border}`,position:"relative",transition:"all .2s",cursor:"pointer",flexShrink:0}}>
              <span style={{position:"absolute",top:2,left:availOnly?16:2,width:16,height:16,borderRadius:"50%",background:"#fff",transition:"left .2s",display:"block",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
            </div>
            <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text2}}>Open signals only</span>
          </label>
        </div>
        {shortlist.length>0 && (
          <div style={{background:T.greenDim,border:`1px solid ${T.green}30`,borderRadius:10,padding:"12px",textAlign:"center"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:22,color:T.green}}>{shortlist.length}</div>
            <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text2,marginTop:2}}>shortlisted</div>
          </div>
        )}
      </div>

      {/* Grid */}
      <div style={{flex:1,overflowY:"auto",padding:"24px 28px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
          <div>
            <h2 className="section-title" style={{fontSize:20,marginBottom:3}}>{list.length} Anonymised Profiles Found</h2>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text3}}>Click any card to preview full details · Unlock to reveal contact information</p>
          </div>
          <button className="btn-secondary" onClick={onNewSearch} style={{padding:"9px 18px",fontSize:13}}>← New Search</button>
        </div>

        <div style={{background:T.amberDim,border:`1px solid ${T.amber}30`,borderRadius:10,padding:"10px 16px",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:15}}>🔒</span>
          <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.amber}}>All profiles are anonymised. Names, employers, and contact details are hidden until you unlock. Each unlock costs 1 credit and triggers GDPR notification.</span>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
          {list.map((p,i)=>(
            <div key={p.id} className="card-hover glass-card" onClick={()=>onProfile(p)} style={{padding:20,cursor:"pointer",animation:`fadeUp .35s ease ${i*.04}s both`,position:"relative",overflow:"hidden",boxShadow:`0 2px 12px ${T.shadow}`}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${scoreColor(p.score,T)}40,${scoreColor(p.score,T)})`}}/>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:11}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:T.surface2,border:`2px dashed ${T.border2}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.text3,fontSize:18,flexShrink:0}}>?</div>
                  <div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,color:T.text,marginBottom:2}}>{p.title}</div>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.text3}}>{p.industry}</div>
                  </div>
                </div>
                <ScoreBadge score={p.score} T={T}/>
              </div>
              <div style={{display:"flex",gap:14,marginBottom:12,flexWrap:"wrap"}}>
                {[["📍",p.loc],["⏱",`${p.yoe} yrs`],["🎓",p.edu.split(" ").slice(0,2).join(" ")]].map(([ico,v])=>(
                  <span key={v} style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3,display:"flex",alignItems:"center",gap:4}}><span>{ico}</span>{v}</span>
                ))}
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>
                {p.skills.slice(0,4).map((s,si)=><SkillPill key={s} skill={s} matched={si<p.matched} T={T}/>)}
                {p.skills.length>4 && <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.text3,alignSelf:"center"}}>+{p.skills.length-4} more</span>}
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <StatusDot active={p.avail} label={p.avail?"Open to opportunities":"Not indicated"} T={T}/>
                <button onClick={e=>{e.stopPropagation();setShortlist(sl=>sl.includes(p.id)?sl.filter(x=>x!==p.id):[...sl,p.id]);}} style={{background:shortlist.includes(p.id)?T.tealDim:T.surface2,border:`1px solid ${shortlist.includes(p.id)?T.tealBrd:T.border}`,color:shortlist.includes(p.id)?T.teal:T.text3,borderRadius:8,padding:"4px 12px",fontSize:12,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,transition:"all .15s"}}>
                  {shortlist.includes(p.id)?"✓ Saved":"☆ Save"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── PROFILE MODAL (with full unlocked sample data) ── */
function ProfileModal({profile, credits, onClose, onUnlock, onPool, onPipeline, onInterview, T, _startUnlocked}) {
  const [tab, setTab] = useState("overview");
  const [unlocked, setUnlocked] = useState(_startUnlocked || false);
  const [inPool, setInPool] = useState(false);
  const [inPipe, setInPipe] = useState(false);
  const [intDone, setIntDone] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);
  const [showInt, setShowInt] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [aChecked, setAChecked] = useState(false);
  const [iChecked, setIChecked] = useState(false);
  const [assignJob, setAssignJob] = useState("");

  if(!profile) return null;

  const TABS=[{id:"overview",l:"Overview"},{id:"skills",l:"Skills"},{id:"career",l:"Career"},{id:"insights",l:"AI Insights"}];

  function doUnlock() {
    setUnlocking(true);
    setTimeout(()=>{setUnlocking(false);setUnlocked(true);setShowUnlock(false);setTab("overview");onUnlock(profile);},1600);
  }
  function doInt() {
    setScheduling(true);
    setTimeout(()=>{setScheduling(false);setIntDone(true);setShowInt(false);onInterview(profile);},1700);
  }

  const sourceLabel = SOURCES.find(s=>s.id===profile.source)?.label || "External";

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(10px)",animation:"fadeIn .2s ease"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:"min(920px,96vw)",maxHeight:"92vh",background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:18,display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:`0 32px 80px ${T.shadow}`,animation:"fadeUp .3s ease",position:"relative"}}>

        {/* Modal Header */}
        <div style={{background:`linear-gradient(135deg,${T.tealDim},${T.blueDim})`,borderBottom:`1px solid ${T.border}`,padding:"24px 28px",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:16}}>
            {unlocked
              ? <Avatar idx={profile.av} size={58} name={profile.name} T={T}/>
              : <div style={{width:58,height:58,borderRadius:"50%",background:T.surface2,border:`2px dashed ${T.border2}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.text3,fontSize:22,flexShrink:0}}>?</div>
            }
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5,flexWrap:"wrap"}}>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:22,color:T.text,letterSpacing:"-0.01em"}}>
                  {unlocked ? profile.name : profile.title}
                </h2>
                <ScoreBadge score={profile.score} T={T}/>
                {unlocked && <span className="tag" style={{background:T.greenDim,color:T.green,border:`1px solid ${T.green}30`,fontSize:11}}>🔓 Unlocked</span>}
                <span className="tag" style={{background:T.surface2,color:T.text3,border:`1px solid ${T.border}`,fontSize:11}}>via {sourceLabel}</span>
              </div>
              <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.text2,marginBottom:8}}>
                {unlocked ? `${profile.title} · ${profile.employer}` : `${profile.yoe} yrs experience · ${profile.industry}`}
              </p>
              <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3}}>📍 {profile.loc}</span>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3}}>🎓 {profile.edu}</span>
                <StatusDot active={profile.avail} label={profile.avail?"Open to opportunities":"Availability not indicated"} T={T}/>
              </div>
            </div>
            <button onClick={onClose} className="btn-secondary" style={{width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,borderRadius:8,padding:0,flexShrink:0}}>×</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",borderBottom:`1px solid ${T.border}`,background:T.bg3,flexShrink:0}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"12px 0",border:"none",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,fontWeight:600,transition:"all .15s",color:tab===t.id?T.teal:T.text3,background:tab===t.id?T.bg2:"transparent",borderBottom:`2.5px solid ${tab===t.id?T.teal:"transparent"}`,letterSpacing:"0.01em"}}>
              {t.l}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{flex:1,overflowY:"auto",padding:"24px 28px"}}>

          {/* ── OVERVIEW TAB ── */}
          {tab==="overview" && (
            <div style={{animation:"fadeIn .3s ease"}}>
              {/* UNLOCKED STATE — full sample data */}
              {unlocked ? (
                <div>
                  {/* Contact info block */}
                  <div style={{background:`linear-gradient(135deg,${T.tealDim},${T.greenDim})`,border:`1px solid ${T.tealBrd}`,borderRadius:12,padding:"18px 20px",marginBottom:20}}>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,fontWeight:700,color:T.teal,textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:14}}>🔓 Contact Information — Revealed</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
                      {[
                        ["Full Name", profile.name,"👤"],
                        ["Email Address", profile.email,"📧"],
                        ["Phone Number", profile.phone,"📞"],
                        ["LinkedIn Profile", profile.linkedin,"🔗"],
                        ["GitHub Profile", profile.github,"💻"],
                        ["Current Employer", profile.employer,"🏢"],
                      ].map(([k,v,ico])=>(
                        <div key={k} style={{background:T.bg2,borderRadius:9,padding:"11px 14px",border:`1px solid ${T.tealBrd}`}}>
                          <div style={{fontSize:10,color:T.text3,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4,fontWeight:600}}>{ico} {k}</div>
                          <div style={{fontSize:13,fontWeight:600,color:T.teal,wordBreak:"break-all"}}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Profile summary */}
                  <div style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:11,padding:"16px 18px",marginBottom:18}}>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:8}}>Professional Summary</div>
                    <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text2,lineHeight:1.7,margin:0}}>{profile.summary}</p>
                  </div>

                  {/* Details grid */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:18}}>
                    {[
                      ["Experience",`${profile.yoe} years total`],
                      ["Current Location",profile.loc],
                      ["Education",profile.edu],
                      ["Industry Background",profile.industry],
                      ["Current Employer",profile.employer],
                      ["Availability",profile.avail?"Open to opportunities":"Not actively looking"],
                    ].map(([k,v])=><InfoRow key={k} label={k} value={v} T={T}/>)}
                  </div>

                  {/* Languages & certs */}
                  <div style={{marginBottom:16}}>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:10}}>Languages & Certifications</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                      {["English (Fluent)","German (Native)","French (B2)","CKA Certified","AWS Solutions Architect","HashiCorp Terraform Associate"].map(c=>(
                        <span key={c} className="tag" style={{background:T.violetDim,color:T.violet,border:`1px solid ${T.violet}25`,padding:"5px 12px",fontSize:12}}>{c}</span>
                      ))}
                    </div>
                  </div>

                  {/* Outreach status */}
                  <div style={{background:T.amberDim,border:`1px solid ${T.amber}25`,borderRadius:10,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.amber,fontWeight:600}}>📧 Outreach Status: <span style={{fontWeight:400}}>Not Contacted</span></div>
                    <span className="tag" style={{background:T.amberDim,color:T.amber,border:`1px solid ${T.amber}30`}}>Action Required</span>
                  </div>
                </div>
              ) : (
                /* LOCKED STATE */
                <div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:18}}>
                    {[
                      ["Experience",`${profile.yoe} years total`],
                      ["Location",profile.loc],
                      ["Education",profile.edu],
                      ["Industry",profile.industry],
                    ].map(([k,v])=><InfoRow key={k} label={k} value={v} T={T}/>)}
                  </div>
                  <div style={{background:T.amberDim,border:`1px solid ${T.amber}30`,borderRadius:11,padding:"16px 18px",marginBottom:18}}>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,fontWeight:700,color:T.amber,marginBottom:5}}>🔒 Hidden Until Unlocked</div>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text2,lineHeight:1.65}}>Full name · Email address · Phone number · LinkedIn & GitHub profiles · Current employer name · Professional summary</div>
                  </div>
                  <div>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:10}}>Languages & Certifications</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                      {["English (Fluent)","German (Native)","French (B2)","CKA Certified","AWS Solutions Architect"].map(c=>(
                        <span key={c} className="tag" style={{background:T.violetDim,color:T.violet,border:`1px solid ${T.violet}25`,padding:"5px 12px",fontSize:12}}>{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── SKILLS TAB ── */}
          {tab==="skills" && (
            <div style={{animation:"fadeIn .3s ease"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:16,color:T.text,marginBottom:16,letterSpacing:"-0.01em"}}>Skills Match Analysis</div>
              {profile.skills.map((s,i)=>{
                const m=i<profile.matched;
                const pct=m?70+Math.floor(Math.abs(Math.sin(i*2.1))*25):12+Math.floor(Math.abs(Math.sin(i))*20);
                return (
                  <div key={s} style={{marginBottom:14}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                      <div style={{display:"flex",alignItems:"center",gap:9}}>
                        <span style={{width:8,height:8,borderRadius:"50%",background:m?T.green:T.border2,display:"inline-block"}}/>
                        <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,fontWeight:600,color:m?T.text:T.text3}}>{s}</span>
                      </div>
                      <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:m?T.green:T.text3,fontWeight:600}}>{m?`✓ Matched · ${pct}%`:"Not indicated"}</span>
                    </div>
                    <div className="pbar-track">
                      <div style={{width:`${pct}%`,height:"100%",background:m?`linear-gradient(90deg,${T.teal},${T.green})`:T.border2,borderRadius:3,transition:"width .6s ease"}}/>
                    </div>
                  </div>
                );
              })}
              <div style={{marginTop:20,background:T.surface2,border:`1px solid ${T.border}`,borderRadius:10,padding:"13px 16px"}}>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text2,lineHeight:1.65}}>
                  <strong style={{color:T.text}}>Match Summary:</strong> {profile.matched} of {profile.skills.length} required skills matched. {profile.matched>=5?"Strong technical alignment with the role requirements.":profile.matched>=4?"Good technical fit with minor gaps to assess.":"Review skills gaps carefully before proceeding."}
                </div>
              </div>
            </div>
          )}

          {/* ── CAREER TAB ── */}
          {tab==="career" && (
            <div style={{animation:"fadeIn .3s ease"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:16,color:T.text,marginBottom:18,letterSpacing:"-0.01em"}}>
                Career Timeline {!unlocked && <span style={{fontSize:12,fontWeight:400,fontFamily:"'Plus Jakarta Sans',sans-serif",color:T.text3}}>(anonymised — unlock to view employer names)</span>}
              </div>
              {[
                {p:"2021 – Present",r:profile.title,          c:unlocked?profile.employer:"Current Employer (Confidential)",dur:"3+ years",cur:true},
                {p:"2018 – 2021",   r:"Mid-level DevOps Engineer",c:unlocked?"Zühlke Engineering AG":"European Technology Consultancy",dur:"3 years"},
                {p:"2015 – 2018",   r:"Junior Software Engineer",  c:unlocked?"Ergon Informatik AG":"Swiss Software Consultancy",     dur:"3 years"},
              ].map((item,i)=>(
                <div key={i} style={{display:"flex",gap:16,marginBottom:4}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <div style={{width:12,height:12,borderRadius:"50%",background:item.cur?T.teal:T.border2,border:`2.5px solid ${item.cur?T.teal:T.border2}`,flexShrink:0,marginTop:3}}/>
                    {i<2 && <div style={{width:2,flex:1,background:T.border,margin:"4px 0"}}/>}
                  </div>
                  <div style={{paddingBottom:20,flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:3}}>
                      <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.text3,fontWeight:500}}>{item.p}</span>
                      <span className="tag" style={{background:item.cur?T.tealDim:T.surface2,color:item.cur?T.teal:T.text3,border:`1px solid ${item.cur?T.tealBrd:T.border}`,fontSize:10}}>{item.dur}</span>
                    </div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontWeight:600,fontSize:15,color:T.text,marginBottom:3}}>{item.r}</div>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:unlocked?T.teal:T.text3,fontStyle:unlocked?"normal":"italic"}}>{item.c}</div>
                  </div>
                </div>
              ))}
              <div style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 16px",marginTop:4}}>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text2}}>🎓 {profile.edu} — {unlocked?"ETH Zürich":"Top European Technical University"}, 2015</span>
              </div>
            </div>
          )}

          {/* ── AI INSIGHTS TAB ── */}
          {tab==="insights" && (
            <div style={{animation:"fadeIn .3s ease"}}>
              <div style={{background:`linear-gradient(135deg,${T.tealDim},${T.blueDim})`,border:`1px solid ${T.tealBrd}`,borderRadius:12,padding:"18px 20px",marginBottom:22}}>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,fontWeight:700,color:T.teal,textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:10}}>✦ AI Suitability Analysis</div>
                <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text2,lineHeight:1.7,margin:0}}>This profile is a <strong style={{color:T.text}}>strong match</strong> for the specified role. The candidate demonstrates {profile.matched}/{profile.skills.length} required technical skills with evidence of hands-on production deployment at scale. Their {profile.yoe}-year career trajectory shows consistent progression toward infrastructure leadership roles. Swiss-based location eliminates relocation complexity and cost.</p>
              </div>
              {[["Skills Alignment",92,T.teal],["Experience Level",88,T.green],["Location Match",100,T.blue],["Industry Background",74,T.amber],["Education Fit",82,T.teal]].map(([l,v,c])=>(
                <div key={l} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text2,fontWeight:500}}>{l}</span>
                    <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:c,fontWeight:700}}>{v}%</span>
                  </div>
                  <div className="pbar-track"><div style={{width:`${v}%`,height:"100%",background:c,borderRadius:3,opacity:.85}}/></div>
                </div>
              ))}
              {profile.score<75 && (
                <div style={{background:T.redDim,border:`1px solid ${T.red}25`,borderRadius:10,padding:"12px 16px",marginTop:16}}>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,fontWeight:700,color:T.red,marginBottom:4}}>⚠ Gap Detected</div>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text2}}>{profile.skills.length-profile.matched} required skills not evidenced in this profile. Review the Skills tab carefully before committing a credit to unlock.</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div style={{borderTop:`1px solid ${T.border}`,padding:"16px 28px",flexShrink:0,background:T.bg3}}>
          {!unlocked ? (
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <div style={{display:"flex",gap:9,flex:1}}>
                <button className="btn-secondary" onClick={()=>setInPool(p=>!p)} style={{flex:1,padding:"10px 0",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,borderColor:inPool?T.tealBrd:undefined,color:inPool?T.teal:undefined,background:inPool?T.tealDim:undefined}}>
                  {inPool?"✓ Shortlisted for Pool":"❑ Add to Pool"}
                </button>
                <button className="btn-secondary" onClick={()=>setInPipe(p=>!p)} style={{flex:1,padding:"10px 0",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,borderColor:inPipe?T.tealBrd:undefined,color:inPipe?T.teal:undefined,background:inPipe?T.tealDim:undefined}}>
                  {inPipe?"✓ In Pipeline":"⟳ Add to Pipeline"}
                </button>
              </div>
              <button className="btn-primary" onClick={()=>setShowUnlock(true)} style={{padding:"10px 28px",fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,flexShrink:0}}>
                🔓 Unlock Profile — 1 credit
              </button>
            </div>
          ) : (
            <div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:12}}>
                <button className="btn-secondary" onClick={()=>{setInPool(true);onPool(profile);}} style={{padding:"11px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,borderColor:inPool?T.tealBrd:undefined,color:inPool?T.teal:undefined,background:inPool?T.tealDim:undefined}}>
                  {inPool?"✓ In Candidate Pool":"❑ Add to Pool"}
                </button>
                <button className="btn-secondary" onClick={()=>{setInPipe(true);onPipeline(profile);}} style={{padding:"11px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,borderColor:inPipe?T.tealBrd:undefined,color:inPipe?T.teal:undefined,background:inPipe?T.tealDim:undefined}}>
                  {inPipe?"✓ In Pipeline":"⟳ Add to Pipeline"}
                </button>
                <button onClick={()=>setShowInt(true)} disabled={intDone} style={{padding:"11px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,borderRadius:9,border:`1px solid ${T.violet}30`,background:intDone?T.violetDim:`${T.violet}10`,color:T.violet,cursor:intDone?"default":"pointer",transition:"all .15s"}}>
                  {intDone?"✓ Interview Scheduled":"◷ AI Interview — 3 credits"}
                </button>
              </div>
              {/* Job assignment */}
              <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:12}}>
                <select value={assignJob} onChange={e=>setAssignJob(e.target.value)} className="input-field" style={{flex:1,padding:"9px 14px"}}>
                  <option value="">Assign to a Job Pipeline…</option>
                  {JOBS.map(j=><option key={j.id} value={j.id}>{j.title} · {j.location} ({j.open} open)</option>)}
                </select>
                <button onClick={()=>{if(assignJob){onPipeline(profile);setInPipe(true);setAssignJob("");} }} className="btn-teal-outline" style={{padding:"9px 20px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,flexShrink:0}} disabled={!assignJob}>
                  Assign →
                </button>
              </div>
              <div style={{background:T.greenDim,border:`1px solid ${T.green}25`,borderRadius:9,padding:"10px 14px",fontSize:12,fontFamily:"'Plus Jakarta Sans',sans-serif",color:T.green}}>
                ✓ Profile unlocked on {formatDate()}. GDPR notification sent automatically. Source: AI Sourcing Hub.
              </div>
            </div>
          )}
        </div>

        {/* ── UNLOCK CONFIRMATION MODAL ── */}
        {showUnlock && (
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.72)",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:18,backdropFilter:"blur(8px)",zIndex:10,animation:"fadeIn .2s ease"}}>
            <div style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:16,padding:"32px 36px",width:"min(440px,90%)",boxShadow:`0 24px 64px ${T.shadow}`}}>
              <div style={{textAlign:"center",marginBottom:24}}>
                <div style={{fontSize:40,marginBottom:10}}>🔓</div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:20,color:T.text,marginBottom:8,letterSpacing:"-0.01em"}}>Unlock Profile</h3>
                <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text2,lineHeight:1.6}}>You are about to reveal the full contact details for this candidate. This action cannot be undone.</p>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",background:T.surface2,border:`1px solid ${T.border}`,borderRadius:11,padding:"16px 20px",marginBottom:20}}>
                <div>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.text3,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4,fontWeight:600}}>Credit Cost</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:28,color:T.teal}}>1 credit</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.text3,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4,fontWeight:600}}>Balance After</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:28,color:credits-1<10?T.red:T.text}}>{credits-1}</div>
                </div>
              </div>
              <label style={{display:"flex",gap:12,alignItems:"flex-start",cursor:"pointer",marginBottom:22,padding:"13px 16px",background:T.amberDim,border:`1px solid ${T.amber}25`,borderRadius:10}}>
                <input type="checkbox" checked={aChecked} onChange={e=>setAChecked(e.target.checked)} style={{accentColor:T.teal,width:15,height:15,marginTop:1,flexShrink:0,cursor:"pointer"}}/>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text2,lineHeight:1.65}}><strong style={{color:T.amber}}>Compliance Attestation:</strong> I confirm I will only contact this candidate for legitimate recruitment purposes and that all data processing complies with GDPR and Swiss nDSG requirements. I acknowledge this candidate will be automatically notified of my data access.</span>
              </label>
              <div style={{display:"flex",gap:10}}>
                <button className="btn-secondary" onClick={()=>{setShowUnlock(false);setAChecked(false);}} style={{flex:1,padding:"12px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Cancel</button>
                <button className="btn-primary" onClick={doUnlock} disabled={!aChecked||unlocking} style={{flex:2,padding:"12px",fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  {unlocking?<><span style={{animation:"spin .8s linear infinite",display:"inline-block"}}>↻</span> Unlocking…</>:"Confirm & Unlock"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── AI INTERVIEW MODAL ── */}
        {showInt && (
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.72)",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:18,backdropFilter:"blur(8px)",zIndex:10,animation:"fadeIn .2s ease"}}>
            <div style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:16,padding:"32px 36px",width:"min(440px,90%)",boxShadow:`0 24px 64px ${T.shadow}`}}>
              <div style={{textAlign:"center",marginBottom:24}}>
                <div style={{fontSize:40,marginBottom:10}}>🎙</div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:20,color:T.text,marginBottom:8,letterSpacing:"-0.01em"}}>Schedule AI Interview</h3>
                <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text2,lineHeight:1.6}}>An AI-powered screening interview will be sent to the candidate automatically. Results are available within 24 hours.</p>
              </div>
              <div style={{background:T.surface2,border:`1px solid ${T.violet}20`,borderRadius:11,padding:"16px 20px",marginBottom:20}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                  <div>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.text3,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4,fontWeight:600}}>Credit Cost</div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:28,color:T.violet}}>3 credits</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.text3,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4,fontWeight:600}}>Balance After</div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:28,color:credits-3<10?T.red:T.text}}>{credits-3}</div>
                  </div>
                </div>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3,lineHeight:1.6}}>Includes: Custom screening questions · Automated scoring · Video response analysis · Written assessment report</div>
              </div>
              <label style={{display:"flex",gap:12,alignItems:"flex-start",cursor:"pointer",marginBottom:22,padding:"13px 16px",background:T.violetDim,border:`1px solid ${T.violet}20`,borderRadius:10}}>
                <input type="checkbox" checked={iChecked} onChange={e=>setIChecked(e.target.checked)} style={{accentColor:T.violet,width:15,height:15,marginTop:1,flexShrink:0,cursor:"pointer"}}/>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text2,lineHeight:1.65}}>I confirm this candidate has been informed this is an AI-conducted interview and I have the right to process their responses under GDPR and Swiss nDSG.</span>
              </label>
              <div style={{display:"flex",gap:10}}>
                <button className="btn-secondary" onClick={()=>{setShowInt(false);setIChecked(false);}} style={{flex:1,padding:"12px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Cancel</button>
                <button onClick={doInt} disabled={!iChecked||scheduling} style={{flex:2,padding:"12px",fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,borderRadius:9,border:"none",cursor:iChecked?"pointer":"default",background:iChecked?`linear-gradient(135deg,${T.violet},#a855f7)`:T.surface2,color:iChecked?"#fff":T.text3,display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all .2s"}}>
                  {scheduling?<><span style={{animation:"spin .8s linear infinite",display:"inline-block"}}>↻</span> Scheduling…</>:"◷ Confirm & Schedule"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── CANDIDATE POOL PAGE ── */
function CandidatePoolPage({poolCandidates, onProfile, onRemoveFromPool, T}) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("dateAdded");
  const [filterJob, setFilterJob] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [assignJobId, setAssignJobId] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignSuccess, setAssignSuccess] = useState(false);

  const filtered = poolCandidates
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase()))
    .filter(c => filterJob==="all" || c.assignedJob===filterJob);

  const toggleSelect = (id) => setSelectedIds(sel => sel.includes(id) ? sel.filter(x=>x!==id) : [...sel,id]);
  const selectAll = () => setSelectedIds(filtered.map(c=>c.id));
  const clearSel = () => setSelectedIds([]);

  function doBulkAssign() {
    setAssignSuccess(true);
    setTimeout(()=>{setShowAssignModal(false);setAssignSuccess(false);setSelectedIds([]);setAssignJobId("");},1500);
  }

  if(poolCandidates.length===0) {
    return (
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40}}>
        <div style={{fontSize:52,marginBottom:16,opacity:.25}}>❑</div>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:T.text2,marginBottom:8}}>Candidate Pool is Empty</h3>
        <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.text3,textAlign:"center",maxWidth:360,lineHeight:1.6}}>Unlock profiles from the AI Sourcing Hub and add them to your pool to manage them here.</p>
      </div>
    );
  }

  return (
    <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <div>
            <h2 className="section-title" style={{fontSize:22,marginBottom:4}}>Candidate Pool</h2>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text3}}>{poolCandidates.length} candidate{poolCandidates.length!==1?"s":""} in pool · {selectedIds.length} selected</p>
          </div>
          <div style={{display:"flex",gap:10}}>
            {selectedIds.length>0 && (
              <>
                <button className="btn-secondary" onClick={clearSel} style={{padding:"9px 16px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Clear Selection</button>
                <button className="btn-primary" onClick={()=>setShowAssignModal(true)} style={{padding:"9px 20px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700}}>
                  Assign {selectedIds.length} to Job →
                </button>
              </>
            )}
          </div>
        </div>

        {/* Controls row */}
        <div style={{display:"flex",gap:12,marginBottom:20,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{position:"relative",flex:1,minWidth:220}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:T.text3,fontSize:14}}>🔍</span>
            <input className="input-field" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or role…" style={{paddingLeft:36}}/>
          </div>
          <select className="input-field" value={filterJob} onChange={e=>setFilterJob(e.target.value)} style={{width:220,padding:"10px 14px"}}>
            <option value="all">All Candidates</option>
            <option value="unassigned">Unassigned</option>
            {JOBS.map(j=><option key={j.id} value={String(j.id)}>{j.title}</option>)}
          </select>
          <select className="input-field" value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{width:180,padding:"10px 14px"}}>
            <option value="dateAdded">Date Added</option>
            <option value="score">Match Score</option>
            <option value="name">Name</option>
          </select>
          <button className="btn-secondary" onClick={selectedIds.length===filtered.length?clearSel:selectAll} style={{padding:"10px 16px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,whiteSpace:"nowrap"}}>
            {selectedIds.length===filtered.length?"Deselect All":"Select All"}
          </button>
        </div>

        {/* Stats strip */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:22}}>
          {[
            ["Total in Pool", poolCandidates.length, T.teal],
            ["Assigned to Job", poolCandidates.filter(c=>c.assignedJob).length, T.blue],
            ["Unassigned", poolCandidates.filter(c=>!c.assignedJob).length, T.amber],
            ["Avg. Match Score", Math.round(poolCandidates.reduce((a,c)=>a+c.score,0)/poolCandidates.length)+"%", T.green],
          ].map(([l,v,c])=>(
            <div key={l} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:11,padding:"14px 16px"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:22,color:c,marginBottom:3}}>{v}</div>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3,fontWeight:500}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Candidate Table */}
        <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden",boxShadow:`0 2px 12px ${T.shadow}`}}>
          {/* Table header */}
          <div style={{display:"grid",gridTemplateColumns:"36px 44px 1fr 130px 120px 130px 160px 80px",gap:12,padding:"12px 18px",background:T.bg3,borderBottom:`1px solid ${T.border}`,alignItems:"center"}}>
            {["","","Candidate","Score","Location","Experience","Assigned Job",""].map((h,i)=>(
              <div key={i} style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:T.text3,textTransform:"uppercase",letterSpacing:"0.08em"}}>{h}</div>
            ))}
          </div>

          {/* Rows */}
          {filtered.length===0 ? (
            <div style={{padding:"32px",textAlign:"center",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.text3}}>No candidates match your filters</div>
          ) : (
            filtered.map((c,i)=>{
              const job = JOBS.find(j=>String(j.id)===String(c.assignedJob));
              const sel = selectedIds.includes(c.id);
              return (
                <div key={c.id} style={{display:"grid",gridTemplateColumns:"36px 44px 1fr 130px 120px 130px 160px 80px",gap:12,padding:"12px 18px",borderBottom:i<filtered.length-1?`1px solid ${T.border}`:"none",alignItems:"center",background:sel?T.tealDim:"transparent",transition:"background .15s",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=sel?T.tealDim:T.cardHover} onMouseLeave={e=>e.currentTarget.style.background=sel?T.tealDim:"transparent"}>
                  <input type="checkbox" checked={sel} onChange={()=>toggleSelect(c.id)} onClick={e=>e.stopPropagation()} style={{accentColor:T.teal,width:15,height:15,cursor:"pointer"}}/>
                  <div onClick={()=>onProfile(c)}><Avatar idx={c.av} size={36} name={c.name} T={T}/></div>
                  <div onClick={()=>onProfile(c)}>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,fontWeight:600,color:T.text,marginBottom:2}}>{c.name}</div>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3}}>{c.title}</div>
                  </div>
                  <div><ScoreBadge score={c.score} T={T}/></div>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3}}>📍 {c.loc.split(",")[0]}</div>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3}}>⏱ {c.yoe} yrs</div>
                  <div>
                    {job
                      ? <span className="tag" style={{background:T.blueDim,color:T.blue,border:`1px solid ${T.blue}25`,fontSize:11,maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block"}}>{job.title}</span>
                      : <span className="tag" style={{background:T.amberDim,color:T.amber,border:`1px solid ${T.amber}25`,fontSize:11}}>Unassigned</span>
                    }
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={e=>{e.stopPropagation();onProfile(c);}} className="btn-teal-outline" style={{padding:"5px 10px",fontSize:11,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,borderRadius:7}}>View</button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Assign Modal */}
        {showAssignModal && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)",animation:"fadeIn .2s ease"}}>
            <div style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:16,padding:"32px 36px",width:"min(460px,92vw)",boxShadow:`0 24px 64px ${T.shadow}`}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:20,color:T.text,marginBottom:6,letterSpacing:"-0.01em"}}>Assign to Job Pipeline</h3>
              <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text2,marginBottom:20,lineHeight:1.6}}>{selectedIds.length} candidate{selectedIds.length!==1?"s":""} will be assigned to the selected job pipeline.</p>

              {/* Selected candidates preview */}
              <div style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 14px",marginBottom:18,maxHeight:140,overflowY:"auto"}}>
                {selectedIds.map(id=>{const c=poolCandidates.find(x=>x.id===id);return c?(
                  <div key={id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:7}}>
                    <Avatar idx={c.av} size={28} name={c.name} T={T}/>
                    <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text,fontWeight:500}}>{c.name}</span>
                    <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.text3,marginLeft:"auto"}}>{c.title}</span>
                  </div>
                ):null;})}
              </div>

              <div style={{marginBottom:20}}>
                <label style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:"0.09em",display:"block",marginBottom:8}}>Select Target Job</label>
                <select className="input-field" value={assignJobId} onChange={e=>setAssignJobId(e.target.value)} style={{padding:"11px 14px"}}>
                  <option value="">Choose a job role…</option>
                  {JOBS.map(j=><option key={j.id} value={j.id}>{j.title} · {j.location} · {j.dept} ({j.open} open slots)</option>)}
                </select>
              </div>

              {assignSuccess && (
                <div style={{background:T.greenDim,border:`1px solid ${T.green}30`,borderRadius:9,padding:"10px 14px",marginBottom:14,fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.green}}>
                  ✓ Candidates successfully assigned to pipeline!
                </div>
              )}

              <div style={{display:"flex",gap:10}}>
                <button className="btn-secondary" onClick={()=>{setShowAssignModal(false);setAssignJobId("");}} style={{flex:1,padding:"12px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Cancel</button>
                <button className="btn-primary" onClick={doBulkAssign} disabled={!assignJobId||assignSuccess} style={{flex:2,padding:"12px",fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  {assignSuccess?<><span style={{animation:"spin .8s linear infinite",display:"inline-block"}}>↻</span> Assigning…</>:"Confirm Assignment →"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── CREDITS DASHBOARD ── */
function CreditsDash({credits, unlocked, interviews, T}) {
  const TOTAL=220, used=TOTAL-credits, ulCost=unlocked, inCost=interviews*3;
  const pct=v=>Math.min(100,Math.round((v/TOTAL)*100));
  return (
    <div style={{flex:1,overflowY:"auto",padding:"32px 40px"}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <div style={{marginBottom:26}}>
          <h2 className="section-title" style={{fontSize:24,marginBottom:5}}>Credits Dashboard</h2>
          <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.text2}}>Track your credit balance and usage across sourcing and AI interviews</p>
        </div>

        {/* Balance hero */}
        <div style={{background:`linear-gradient(135deg,${T.tealDim},${T.blueDim})`,border:`1px solid ${T.tealBrd}`,borderRadius:18,padding:"28px 32px",marginBottom:22}}>
          <div style={{display:"flex",alignItems:"center",gap:40,flexWrap:"wrap"}}>
            <div style={{flexShrink:0}}>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.text3,textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:5,fontWeight:600}}>Available Balance</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:60,color:T.teal,lineHeight:1}}>{credits}</div>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text2,marginTop:4}}>credits remaining of {TOTAL} purchased</div>
            </div>
            <div style={{flex:1,minWidth:260}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3}}>Used: {used} credits</span>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.teal,fontWeight:600}}>{100-pct(used)}% remaining</span>
              </div>
              <div style={{height:10,background:T.surface2,borderRadius:5,overflow:"hidden",marginBottom:18}}>
                <div style={{width:`${pct(used)}%`,height:"100%",background:`linear-gradient(90deg,${T.teal},${T.blue})`,borderRadius:5}}/>
              </div>
              {[["Profile Unlocks",ulCost,T.teal,`${unlocked} × 1 credit`],["AI Interviews",inCost,T.violet,`${interviews} × 3 credits`]].map(([l,v,c,s])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <div style={{width:9,height:9,borderRadius:2,background:c,flexShrink:0}}/>
                  <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text2,width:130}}>{l}</span>
                  <div style={{flex:1,height:5,background:T.surface2,borderRadius:3,overflow:"hidden"}}><div style={{width:`${pct(v)}%`,height:"100%",background:c,borderRadius:3}}/></div>
                  <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.text3,width:90,textAlign:"right"}}>{s}</span>
                  <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:15,color:c,width:30,textAlign:"right"}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:22}}>
          {[["⬡","Total Purchased",TOTAL,T.text2,"Growth Bundle"],["🔓","Profiles Unlocked",unlocked,T.teal,`${ulCost} credits used`],["🎙","AI Interviews",interviews,T.violet,`${inCost} credits used`],["💰","Balance",credits,T.green,"Current balance"]].map(([ico,l,v,c,s])=>(
            <div key={l} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"18px 18px"}}>
              <div style={{fontSize:18,marginBottom:9}}>{ico}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:26,color:c,marginBottom:3}}>{v}</div>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text,fontWeight:600,marginBottom:2}}>{l}</div>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.text3}}>{s}</div>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:22}}>
          {/* Pricing */}
          <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,padding:"22px"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:16,color:T.text,marginBottom:16,letterSpacing:"-0.01em"}}>Credit Pricing</div>
            {[["🔍","Search & Preview","Free","Unlimited searches, anonymised results"],["🔓","Unlock Profile","1 credit","Full contact info revealed"],["🎙","AI Screening Interview","3 credits","Automated scoring + video report"],["📋","AI Skills Interview","5 credits","Deep technical assessment + report"]].map(([ico,l,cost,d])=>(
              <div key={l} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 0",borderBottom:`1px solid ${T.border}`}}>
                <span style={{fontSize:16,flexShrink:0}}>{ico}</span>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,fontWeight:600,color:T.text}}>{l}</span>
                    <span className="tag" style={{background:T.tealDim,color:T.teal,border:`1px solid ${T.tealBrd}`,fontSize:12,padding:"3px 10px"}}>{cost}</span>
                  </div>
                  <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.text3}}>{d}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Top-up */}
          <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,padding:"22px"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:16,color:T.text,marginBottom:16,letterSpacing:"-0.01em"}}>Purchase Credits</div>
            {[["Starter","50 credits","CHF 49",null],["Growth","220 credits","CHF 179","Best Value"],["Professional","500 credits","CHF 369","+15% Bonus"],["Enterprise","Custom","Custom","Volume Pricing"]].map(([n,cr,p,badge])=>(
              <div key={n} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderRadius:10,border:`1px solid ${T.border}`,marginBottom:8,background:T.surface2,transition:"all .2s",cursor:"pointer"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.tealBrd;e.currentTarget.style.background=T.tealDim;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.background=T.surface2;}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                    <span style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:T.text}}>{n}</span>
                    {badge && <span className="tag" style={{background:T.amberDim,color:T.amber,border:`1px solid ${T.amber}25`,fontSize:10}}>{badge}</span>}
                  </div>
                  <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3}}>{cr}</span>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:16,color:T.teal}}>{p}</div>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.text3}}>per bundle</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction history */}
        <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,padding:"22px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:16,color:T.text,letterSpacing:"-0.01em"}}>Transaction History</div>
            <button className="btn-secondary" style={{padding:"7px 14px",fontSize:12,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>⬇ Export CSV</button>
          </div>
          {TX_HISTORY.map((tx,i)=>(
            <div key={tx.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:i<TX_HISTORY.length-1?`1px solid ${T.border}`:"none"}}>
              <div style={{width:36,height:36,borderRadius:10,background:tx.type==="topup"?T.greenDim:tx.type==="interview"?T.violetDim:T.tealDim,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{tx.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text,fontWeight:500,marginBottom:2}}>{tx.label}</div>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.text3}}>{tx.date}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:15,color:tx.type==="topup"?T.green:T.text2}}>{tx.type==="topup"?`+${Math.abs(tx.cost)}`:`−${tx.cost}`}</div>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.text3}}>credits</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({title, T}) {
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <div style={{fontSize:48,marginBottom:14,opacity:.2}}>◎</div>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:T.text2,marginBottom:6}}>{title}</div>
      <div style={{fontSize:14}}>Module coming soon</div>
    </div>
  );
}

/* ── ROOT APP ── */
export default function App() {
  const [isDark, setIsDark] = useState(true);
  const T = isDark ? THEMES.dark : THEMES.light;
  const [page, setPage] = useState("sourcing");
  const [sub, setSub] = useState("search");
  const [credits, setCredits] = useState(47);
  const [selected, setSelected] = useState(null);
  const [unlocked, setUnlocked] = useState(0);
  const [pooled, setPooled] = useState(0);
  const [piped, setPiped] = useState(0);
  const [interviews, setInterviews] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [poolCandidates, setPoolCandidates] = useState([]);

  function addToast(msg, type="info") {
    const id = Date.now();
    setToasts(t=>[...t,{id,msg,type}]);
  }
  function rmToast(id) { setToasts(t=>t.filter(x=>x.id!==id)); }

  function goPage(p) { setPage(p); if(p==="sourcing") setSub("search"); }

  function handleUnlock(p) {
    setCredits(c=>c-1);
    setUnlocked(c=>c+1);
    addToast(`Profile unlocked — 1 credit used. GDPR notification sent to ${p.name}.`,"success");
  }
  function handlePool(p) {
    if(!poolCandidates.find(c=>c.id===p.id)) {
      setPoolCandidates(pc=>[...pc,{...p,dateAdded:new Date().toISOString(),assignedJob:null}]);
      setPooled(c=>c+1);
      addToast(`${p.name} added to Candidate Pool ✓`,"success");
    }
  }
  function handlePipeline(p) {
    setPiped(c=>c+1);
    setPoolCandidates(pc=>pc.map(c=>c.id===p.id?{...c,assignedJob:"1"}:c));
    addToast(`${p.name} added to Job Pipeline ✓`,"info");
  }
  function handleInterview(p) {
    setCredits(c=>c-3);
    setInterviews(c=>c+1);
    addToast(`AI Interview scheduled for ${p.name} — 3 credits deducted.`,"success");
  }
  function handleProfileFromPool(p) {
    // Show already-unlocked profile
    setSelected({...p, _forceUnlocked:true});
  }

  // Profile modal — handle pre-unlocked state from pool
  const modalProfile = selected;

  return (
    <div style={{display:"flex",height:"100vh",background:T.bg,overflow:"hidden"}}>
      <style>{makeCSS(T, isDark)}</style>

      <Sidebar page={page} setPage={goPage} credits={credits} isDark={isDark} toggleTheme={()=>setIsDark(d=>!d)} T={T}/>

      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <Topbar page={page} credits={credits} unlocked={unlocked} pooled={pooled} piped={piped} T={T}/>
        <div style={{flex:1,display:"flex",overflow:"hidden"}}>
          {page==="sourcing" && sub==="search" && <SearchPage onSearch={()=>setSub("results")} T={T}/>}
          {page==="sourcing" && sub==="results" && (
            <ResultsPage profiles={PROFILES} onProfile={setSelected} onNewSearch={()=>setSub("search")} T={T}/>
          )}
          {page==="pool" && (
            <CandidatePoolPage poolCandidates={poolCandidates} onProfile={handleProfileFromPool} onRemoveFromPool={id=>setPoolCandidates(pc=>pc.filter(c=>c.id!==id))} T={T}/>
          )}
          {page==="credits" && <CreditsDash credits={credits} unlocked={unlocked} interviews={interviews} T={T}/>}
          {["pipeline","interviews","jobs","settings"].includes(page) && (
            <PlaceholderPage title={{pipeline:"Job Pipelines",interviews:"AI Interviews",jobs:"Jobs",settings:"Settings"}[page]} T={T}/>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {modalProfile && (
        <ProfileModal
          profile={modalProfile}
          credits={credits}
          onClose={()=>setSelected(null)}
          onUnlock={handleUnlock}
          onPool={handlePool}
          onPipeline={handlePipeline}
          onInterview={handleInterview}
          T={T}
          _startUnlocked={modalProfile._forceUnlocked}
        />
      )}

      {/* Toasts */}
      <div style={{position:"fixed",bottom:24,right:24,zIndex:9999,display:"flex",flexDirection:"column",gap:9,alignItems:"flex-end"}}>
        {toasts.map(t=><Toast key={t.id} msg={t.msg} type={t.type} T={T} onClose={()=>rmToast(t.id)}/>)}
      </div>
    </div>
  );
}
