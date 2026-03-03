import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════
   TALENTOS · AI SOURCING HUB  v5.0
   Light-default · LLM Prompt search · Smart Shortlist
   Bulk unlock · Grid/List results · Job Pipeline
   + Corporate Dashboard · Outreach Workflows
   + Candidate Notifications & Opt-out
═══════════════════════════════════════════════════ */

const GFONTS = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap";

const LT = {
  bg:"#F5F7FA",bg2:"#FFFFFF",bg3:"#EEF2F8",bg4:"#E4EAF5",
  surface:"rgba(255,255,255,0.95)",surface2:"#FFFFFF",
  border:"rgba(0,0,0,0.07)",border2:"rgba(0,0,0,0.13)",
  text:"#111827",text2:"#4B5563",text3:"#9CA3AF",
  teal:"#00897B",tealDim:"rgba(0,137,123,0.09)",tealBrd:"rgba(0,137,123,0.25)",
  blue:"#2563EB",blueDim:"rgba(37,99,235,0.09)",
  violet:"#6D28D9",violetDim:"rgba(109,40,217,0.09)",
  amber:"#D97706",amberDim:"rgba(217,119,6,0.09)",
  green:"#059669",greenDim:"rgba(5,150,105,0.09)",
  red:"#DC2626",redDim:"rgba(220,38,38,0.08)",
  shadow:"rgba(0,0,0,0.06)",shadow2:"rgba(0,0,0,0.14)",
  navActive:"rgba(0,137,123,0.09)",cardHover:"rgba(0,137,123,0.03)",
  inputBg:"rgba(0,0,0,0.025)",
  scoreHigh:["rgba(5,150,105,0.1)","#059669"],
  scoreMid:["rgba(217,119,6,0.1)","#D97706"],
  scoreLow:["rgba(220,38,38,0.09)","#DC2626"],
};
const DK = {
  bg:"#0A0F1C",bg2:"#0F1729",bg3:"#131D32",bg4:"#192240",
  surface:"rgba(255,255,255,0.045)",surface2:"rgba(255,255,255,0.08)",
  border:"rgba(255,255,255,0.08)",border2:"rgba(255,255,255,0.15)",
  text:"#EDF2FF",text2:"#8B95A8",text3:"#485060",
  teal:"#00C9A7",tealDim:"rgba(0,201,167,0.12)",tealBrd:"rgba(0,201,167,0.28)",
  blue:"#3B82F6",blueDim:"rgba(59,130,246,0.12)",
  violet:"#7C6FFF",violetDim:"rgba(124,111,255,0.12)",
  amber:"#F59E0B",amberDim:"rgba(245,158,11,0.1)",
  green:"#10B981",greenDim:"rgba(16,185,129,0.12)",
  red:"#EF4444",redDim:"rgba(239,68,68,0.1)",
  shadow:"rgba(0,0,0,0.35)",shadow2:"rgba(0,0,0,0.55)",
  navActive:"rgba(0,201,167,0.12)",cardHover:"rgba(0,201,167,0.05)",
  inputBg:"rgba(255,255,255,0.04)",
  scoreHigh:["rgba(16,185,129,0.15)","#10B981"],
  scoreMid:["rgba(245,158,11,0.15)","#F59E0B"],
  scoreLow:["rgba(239,68,68,0.15)","#EF4444"],
};

const SOURCES = [
  {id:"linkedin",     label:"LinkedIn",       color:"#0A66C2", emoji:"💼"},
  {id:"github",       label:"GitHub",         color:"#238636", emoji:"🐙"},
  {id:"indeed",       label:"Indeed",         color:"#2164F3", emoji:"🔍"},
  {id:"xing",         label:"Xing",           color:"#006567", emoji:"✦"},
  {id:"glassdoor",    label:"Glassdoor",      color:"#0CAA41", emoji:"🚪"},
  {id:"stackoverflow",label:"Stack Overflow", color:"#EF8236", emoji:"📚"},
];

const JOBS = [
  {id:1,title:"Senior DevOps Engineer",   dept:"Engineering",    location:"Zürich",  open:3,jd:"Senior DevOps Engineer with 7+ years experience in Kubernetes, Terraform and AWS. Switzerland-based preferred. Financial services background a plus."},
  {id:2,title:"Platform Engineer",        dept:"Infrastructure", location:"Basel",   open:2,jd:"Platform Engineer to build and maintain internal developer platform. Kubernetes, Python, CI/CD. Basel or remote CH."},
  {id:3,title:"Cloud Architect",          dept:"Architecture",   location:"Zürich",  open:1,jd:"Cloud Architect to lead multi-cloud strategy. 10+ years infrastructure, AWS/Azure certified. Experience with regulated industries essential."},
  {id:4,title:"Site Reliability Engineer",dept:"Engineering",    location:"Geneva",  open:2,jd:"SRE focused on observability and incident response. Prometheus, GCP, Python. 5+ years in high-availability production environments."},
  {id:5,title:"Infrastructure Lead",      dept:"Engineering",    location:"Bern",    open:1,jd:"Infrastructure Lead to manage team of 6 engineers. IaC, cloud migrations, vendor management. People leadership experience required."},
];

const AVCOLORS = ["#00C9A7","#7C6FFF","#EF4444","#F59E0B","#10B981","#3B82F6","#F97316","#A855F7"];

const PROFILES = [
  {id:1, name:"Lena Müller",       title:"Senior DevOps Engineer",       employer:"Google Switzerland",    loc:"Zürich, CH",     yoe:9,  score:96,edu:"MSc Computer Science",      industry:"Large Technology Company",    skills:["Kubernetes","Terraform","AWS","Docker","CI/CD","Helm","Prometheus"],matched:6,avail:true, email:"lena.muller@email.ch",    phone:"+41 79 234 5678",linkedin:"linkedin.com/in/lenamuller",  github:"github.com/lena-m",   av:0,source:"linkedin",   summary:"Highly experienced DevOps engineer with 9 years driving large-scale Kubernetes infrastructure at Google. Led migration of 200+ microservices to GKE. Certified Kubernetes Administrator and AWS Solutions Architect."},
  {id:2, name:"Marco Bernasconi",  title:"Platform Engineer",            employer:"Zühlke Engineering",    loc:"Basel, CH",      yoe:7,  score:91,edu:"BSc Software Engineering",   industry:"Mid-sized SaaS Company",      skills:["Kubernetes","AWS","Docker","Python","Terraform","Prometheus"],      matched:5,avail:true, email:"m.bernasconi@mail.ch",    phone:"+41 61 456 7890",linkedin:"linkedin.com/in/marco-b",     github:"github.com/marco-b",  av:1,source:"github",    summary:"Platform engineer specialising in infrastructure-as-code and developer productivity. Built internal Kubernetes platform used by 150+ engineers. Open-source contributor to Terraform providers."},
  {id:3, name:"Sophie Dubois",     title:"Cloud Infrastructure Lead",    employer:"UBS Group AG",          loc:"Bern, CH",       yoe:11, score:88,edu:"MEng Software Systems",      industry:"Financial Services Group",    skills:["AWS","Terraform","Kubernetes","Security","Networking","Docker"],    matched:5,avail:false,email:"s.dubois@proton.me",      phone:"+41 31 567 8901",linkedin:"linkedin.com/in/sdubois",     github:"github.com/sdubois",  av:2,source:"linkedin",   summary:"Cloud infrastructure lead with 11 years across banking and fintech. Designed secure multi-account AWS architecture for UBS. Expert in cloud security and compliance frameworks ISO 27001 and SOC 2."},
  {id:4, name:"Adrian Keller",     title:"Site Reliability Engineer",    employer:"Teamsystems SA",        loc:"Geneva, CH",     yoe:6,  score:84,edu:"BSc Computer Science",      industry:"European Tech Scale-up",      skills:["Kubernetes","Prometheus","Python","Docker","GCP","Terraform"],      matched:5,avail:true, email:"a.keller@gmail.com",      phone:"+41 22 678 9012",linkedin:"linkedin.com/in/adriankeller",github:"github.com/a-keller", av:3,source:"stackoverflow",summary:"SRE with deep expertise in observability and incident response. Reduced MTTR by 65% through custom Prometheus alerting and runbook automation. Speaker at SREcon Europe 2023."},
  {id:5, name:"Nadia Volkov",      title:"DevOps Engineer",              employer:"Digitec Galaxus AG",    loc:"Lausanne, CH",   yoe:5,  score:79,edu:"BSc Information Technology", industry:"E-commerce Technology Firm",  skills:["Docker","CI/CD","AWS","Python","Ansible"],                         matched:4,avail:true, email:"n.volkov@fastmail.com",   phone:"+41 21 789 0123",linkedin:"linkedin.com/in/nadiav",      github:"github.com/nvolkov",  av:4,source:"indeed",     summary:"DevOps engineer focused on CI/CD pipeline optimisation at Digitec Galaxus. Cut deployment times from 45 minutes to 8 minutes. Certified AWS Developer with strong GitOps background."},
  {id:6, name:"Fabian Meier",      title:"Infrastructure Engineer",      employer:"Accenture Switzerland", loc:"Lucerne, CH",    yoe:8,  score:76,edu:"MEng Distributed Systems",   industry:"Global Consulting Group",     skills:["Terraform","AWS","Docker","Linux","Networking"],                   matched:4,avail:false,email:"f.meier@bluewin.ch",       phone:"+41 41 890 1234",linkedin:"linkedin.com/in/fmeier",      github:"github.com/fmeier",   av:5,source:"xing",      summary:"Infrastructure engineer with consulting background across 12+ enterprise clients. Specialist in hybrid cloud architectures and CCIE-certified network security."},
  {id:7, name:"Elena Rossi",       title:"Senior Cloud Engineer",        employer:"Swiss Re",              loc:"St. Gallen, CH", yoe:10, score:72,edu:"MSc IT Management",          industry:"Insurance Technology Firm",   skills:["Azure","Kubernetes","Terraform","DevOps","Python"],                matched:3,avail:true, email:"e.rossi@outlook.com",     phone:"+41 71 901 2345",linkedin:"linkedin.com/in/elena-r",     github:"github.com/erossi",   av:6,source:"glassdoor",  summary:"Senior cloud engineer at Swiss Re with a decade of experience building resilient insurance technology infrastructure. Azure expert with Kubernetes certifications."},
  {id:8, name:"Jonas Weber",       title:"Platform Operations Engineer", employer:"AMAG Group",            loc:"Winterthur, CH", yoe:4,  score:68,edu:"BSc Systems Engineering",   industry:"Automotive Technology Group", skills:["Kubernetes","Docker","Linux","Bash","Monitoring"],                 matched:3,avail:true, email:"j.weber@gmail.com",       phone:"+41 52 012 3456",linkedin:"linkedin.com/in/jonasweber",  github:"github.com/jweber",   av:7,source:"github",    summary:"Platform operations engineer with strong Linux and containerisation skills managing Kubernetes clusters supporting AMAG's digital retail platform."},
  {id:9, name:"Petra Novak",       title:"DevOps Lead",                  employer:"Swisscom AG",           loc:"Zürich, CH",     yoe:12, score:93,edu:"MSc Software Engineering",   industry:"Telecommunications Group",    skills:["Kubernetes","Terraform","Azure","Docker","Python","Go","CI/CD"],    matched:6,avail:true, email:"p.novak@gmail.com",       phone:"+41 44 123 4567",linkedin:"linkedin.com/in/petranovak",  github:"github.com/pnovak",   av:0,source:"linkedin",   summary:"DevOps lead at Swisscom with 12 years managing mission-critical telecommunications infrastructure. Expert in large-scale Kubernetes deployments and cross-team engineering leadership."},
  {id:10,name:"Thomas Brunner",    title:"Cloud Infrastructure Engineer",employer:"Nestlé SA",             loc:"Vevey, CH",      yoe:7,  score:82,edu:"BSc Computer Engineering",   industry:"FMCG Technology Division",    skills:["AWS","Terraform","Docker","Python","Monitoring","Networking"],      matched:5,avail:true, email:"t.brunner@outlook.com",   phone:"+41 21 456 7890",linkedin:"linkedin.com/in/tbrunner",    github:"github.com/tbrunner",  av:2,source:"indeed",    summary:"Cloud infrastructure engineer at Nestlé. Led AWS migration of 300+ servers to cloud-native architecture across 15 countries in 18 months."},
];

const TX_HISTORY = [
  {id:1,type:"unlock",   label:"Profile Unlocked — Senior DevOps Engineer",  cost:1,  date:"Today, 11:42",icon:"🔓"},
  {id:2,type:"interview",label:"AI Interview Scheduled — Cloud Architect",    cost:3,  date:"Today, 09:15",icon:"🎙"},
  {id:3,type:"smartlist",label:"Smart Shortlist — DevOps search",             cost:10, date:"Yesterday",   icon:"✦"},
  {id:4,type:"unlock",   label:"Profile Unlocked — Platform Engineer",        cost:1,  date:"Yesterday",   icon:"🔓"},
  {id:5,type:"topup",    label:"Credits Purchased — Growth Bundle (220 cr)",  cost:-220,date:"Mon 09:00", icon:"⬡"},
  {id:6,type:"unlock",   label:"Profile Unlocked — Infrastructure Lead",      cost:1,  date:"Mon 14:30",  icon:"🔓"},
  {id:7,type:"interview",label:"AI Interview Scheduled — SRE",                cost:3,  date:"Last Friday", icon:"🎙"},
  {id:8,type:"unlock",   label:"Profile Unlocked — DevOps Engineer",          cost:1,  date:"Last Friday", icon:"🔓"},
];

/* ── OUTREACH DATA ── */
const OUTREACH_TEMPLATES = [
  {id:"intro",name:"Introduction",subject:"Exciting opportunity at {{company}}",body:"Hi {{name}},\n\nI came across your profile and was impressed by your experience in {{skills}}. We have an exciting {{role}} opportunity at {{company}} in {{location}} that I believe aligns well with your background.\n\nWould you be open to a brief conversation this week?\n\nBest regards,\nSarah Kessler\nHR Manager, Novartis AG"},
  {id:"role",name:"Role Pitch",subject:"{{role}} — {{company}} · {{location}}",body:"Hi {{name}},\n\nI'm reaching out regarding our {{role}} position based in {{location}}. Given your {{yoe}} years of experience and expertise in {{skills}}, I think you'd be a strong fit.\n\nKey highlights:\n• Competitive compensation package\n• Hybrid work model\n• Career growth in a leading organisation\n\nI'd love to share more details. Are you available for a quick call?\n\nBest,\nSarah Kessler"},
  {id:"followup",name:"Follow-up",subject:"Following up — {{role}} at {{company}}",body:"Hi {{name}},\n\nI wanted to follow up on my previous message about the {{role}} opportunity at {{company}}. I understand you may be busy, but I'd still love to connect if this interests you.\n\nNo pressure at all — just let me know either way.\n\nWarm regards,\nSarah Kessler"},
  {id:"schedule",name:"Schedule Meeting",subject:"Let's connect — {{role}} discussion",body:"Hi {{name}},\n\nThank you for your interest in the {{role}} position. I'd love to schedule a call to discuss the role in more detail.\n\nWould any of these times work for you?\n• [Suggested time 1]\n• [Suggested time 2]\n• [Suggested time 3]\n\nLooking forward to speaking with you.\n\nBest,\nSarah Kessler"},
];

const OUTREACH_STATUSES = ["Not Contacted","Contacted","Responded","Meeting Booked"];

const OUTREACH_RECORDS = [
  {id:1,candidateId:1,status:"Meeting Booked",lastAction:"Meeting confirmed for Thu 10:00",template:"schedule",sentDate:"2026-02-24",followUpDate:null,messages:[
    {dir:"out",date:"2026-02-22 09:15",subject:"Exciting opportunity at Novartis AG",preview:"Hi Lena, I came across your profile…"},
    {dir:"in",date:"2026-02-22 14:30",subject:"Re: Exciting opportunity at Novartis AG",preview:"Hi Sarah, thank you for reaching out. I'd be happy to learn more…"},
    {dir:"out",date:"2026-02-23 08:45",subject:"Let's connect — Senior DevOps Engineer discussion",preview:"Hi Lena, thank you for your interest…"},
    {dir:"in",date:"2026-02-23 11:20",subject:"Re: Let's connect",preview:"Thursday at 10:00 works perfectly for me…"},
  ]},
  {id:2,candidateId:2,status:"Responded",lastAction:"Candidate expressed interest",template:"intro",sentDate:"2026-02-23",followUpDate:"2026-02-26",messages:[
    {dir:"out",date:"2026-02-23 10:00",subject:"Platform Engineer opportunity at Novartis AG",preview:"Hi Marco, I came across your profile…"},
    {dir:"in",date:"2026-02-24 09:15",subject:"Re: Platform Engineer opportunity",preview:"Hi Sarah, sounds interesting. Could you share the JD?…"},
  ]},
  {id:3,candidateId:9,status:"Contacted",lastAction:"Initial outreach sent",template:"role",sentDate:"2026-02-24",followUpDate:"2026-02-27",messages:[
    {dir:"out",date:"2026-02-24 14:00",subject:"Senior DevOps Engineer — Novartis AG · Zürich",preview:"Hi Petra, I'm reaching out regarding our…"},
  ]},
  {id:4,candidateId:3,status:"Not Contacted",lastAction:"Added to outreach queue",template:null,sentDate:null,followUpDate:null,messages:[]},
  {id:5,candidateId:10,status:"Contacted",lastAction:"Follow-up sent",template:"followup",sentDate:"2026-02-21",followUpDate:"2026-02-28",messages:[
    {dir:"out",date:"2026-02-21 11:30",subject:"Cloud Infrastructure role at Novartis AG",preview:"Hi Thomas, I came across your profile…"},
    {dir:"out",date:"2026-02-24 09:00",subject:"Following up — Cloud Infrastructure Engineer",preview:"Hi Thomas, I wanted to follow up…"},
  ]},
];

/* ── CANDIDATE NOTIFICATION DATA ── */
const NOTIFICATION_LOG = [
  {id:1,candidateId:1,type:"unlock",date:"2026-02-24 11:42",status:"Delivered",org:"Novartis AG",recruiter:"Sarah Kessler",optedOut:false,email:"lena.muller@email.ch"},
  {id:2,candidateId:2,type:"unlock",date:"2026-02-24 09:30",status:"Delivered",org:"Novartis AG",recruiter:"Sarah Kessler",optedOut:false,email:"m.bernasconi@mail.ch"},
  {id:3,candidateId:9,type:"unlock",date:"2026-02-23 16:20",status:"Delivered",org:"Novartis AG",recruiter:"Sarah Kessler",optedOut:false,email:"p.novak@gmail.com"},
  {id:4,candidateId:3,type:"unlock",date:"2026-02-23 14:10",status:"Delivered",org:"Novartis AG",recruiter:"Sarah Kessler",optedOut:false,email:"s.dubois@proton.me"},
  {id:5,candidateId:10,type:"unlock",date:"2026-02-21 11:28",status:"Delivered",org:"Novartis AG",recruiter:"Sarah Kessler",optedOut:false,email:"t.brunner@outlook.com"},
  {id:6,candidateId:5,type:"smart_shortlist",date:"2026-02-20 15:00",status:"Delivered",org:"Novartis AG",recruiter:"Sarah Kessler",optedOut:false,email:"n.volkov@fastmail.com"},
  {id:7,candidateId:4,type:"smart_shortlist",date:"2026-02-20 15:00",status:"Bounced",org:"Novartis AG",recruiter:"Sarah Kessler",optedOut:false,email:"a.keller@old-email.com"},
  {id:8,candidateId:7,type:"unlock",date:"2026-02-19 10:45",status:"Opted Out",org:"Novartis AG",recruiter:"Sarah Kessler",optedOut:true,email:"e.rossi@outlook.com"},
];

/* ── CSS ── */
function makeCSS(T) {
  return `
@import url('${GFONTS}');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body,#root{height:100%;font-family:'Plus Jakarta Sans',sans-serif;background:${T.bg}}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:${T.border2};border-radius:3px}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes popIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}
.c-hover{transition:transform .18s,box-shadow .18s,border-color .18s}
.c-hover:hover{transform:translateY(-2px);border-color:${T.tealBrd}!important;box-shadow:0 6px 24px ${T.shadow2}!important}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 14px;border-radius:8px;cursor:pointer;transition:all .15s;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:500;color:${T.text3};border:none;background:transparent;width:100%;text-align:left}
.nav-item:hover{background:${T.surface2};color:${T.text2}}
.nav-item.active{background:${T.navActive};color:${T.teal};border-left:2.5px solid ${T.teal};font-weight:600}
.bp{background:linear-gradient(135deg,${T.teal},${T.blue});color:#fff;border:none;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;border-radius:9px;transition:all .2s;letter-spacing:.01em}
.bp:hover{filter:brightness(1.07);transform:translateY(-1px);box-shadow:0 4px 16px ${T.teal}44}
.bp:disabled{opacity:.36;cursor:default;filter:none;transform:none;box-shadow:none}
.bs{background:${T.surface};color:${T.text2};border:1px solid ${T.border};cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-weight:500;border-radius:9px;transition:all .15s}
.bs:hover{background:${T.surface2};color:${T.text};border-color:${T.border2}}
.bt{background:${T.tealDim};color:${T.teal};border:1px solid ${T.tealBrd};cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;border-radius:9px;transition:all .15s}
.bt:hover{background:${T.teal};color:#fff}
.inp{background:${T.inputBg};border:1.5px solid ${T.border};color:${T.text};font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;border-radius:9px;padding:10px 14px;outline:none;transition:border-color .2s,background .2s;width:100%}
.inp:focus{border-color:${T.teal};background:${T.tealDim}}
.inp::placeholder{color:${T.text3}}
select.inp option{background:${T.bg2};color:${T.text}}
.tag{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600;font-family:'Plus Jakarta Sans',sans-serif;letter-spacing:.02em}
.gh{background:${T.surface};border:1px solid ${T.border};border-radius:14px}
.pbt{height:6px;background:${T.surface2};border-radius:3px;overflow:hidden}
.htitle{font-family:'Playfair Display',serif;font-weight:700;color:${T.text};letter-spacing:-.02em}
`;
}

/* ── ATOMS ── */
const sColor = (s,T) => s>=85?T.scoreHigh[1]:s>=70?T.scoreMid[1]:T.scoreLow[1];
const sBg    = (s,T) => s>=85?T.scoreHigh[0]:s>=70?T.scoreMid[0]:T.scoreLow[0];

function Av({idx,size=40,name,T}) {
  const c=AVCOLORS[idx%AVCOLORS.length];
  const ini=(name||"?").split(" ").map(n=>n[0]).join("").slice(0,2);
  return <div style={{width:size,height:size,borderRadius:"50%",background:`${c}18`,border:`2px solid ${c}38`,display:"flex",alignItems:"center",justifyContent:"center",color:c,fontSize:size*.33,fontWeight:700,fontFamily:"'Playfair Display',serif",flexShrink:0}}>{ini}</div>;
}
function ScB({score,T}) {
  return <span className="tag" style={{background:sBg(score,T),color:sColor(score,T),border:`1px solid ${sColor(score,T)}40`,fontSize:11,padding:"3px 9px"}}>{score}%</span>;
}
function SKPill({skill,matched,T}) {
  return <span className="tag" style={{background:matched?T.tealDim:T.surface2,color:matched?T.teal:T.text3,border:`1px solid ${matched?T.tealBrd:T.border}`}}>{matched&&<span style={{fontSize:8}}>✓</span>}{skill}</span>;
}
function IRow({label,value,T}) {
  return <div style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:9,padding:"10px 13px"}}>
    <div style={{fontSize:10,color:T.text3,textTransform:"uppercase",letterSpacing:".08em",marginBottom:3,fontWeight:600}}>{label}</div>
    <div style={{fontSize:13,fontWeight:600,color:T.text,wordBreak:"break-all"}}>{value}</div>
  </div>;
}
function Toast({msg,type,T,onClose}) {
  useEffect(()=>{const t=setTimeout(onClose,4000);return()=>clearTimeout(t);},[]);
  const c={success:T.green,info:T.teal,warning:T.amber,error:T.red}[type]||T.teal;
  return <div style={{background:T.bg2,border:`1px solid ${c}28`,borderRadius:11,padding:"12px 16px",maxWidth:400,display:"flex",alignItems:"center",gap:12,boxShadow:`0 8px 28px ${T.shadow2}`,animation:"fadeUp .3s ease",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
    <span style={{width:7,height:7,borderRadius:"50%",background:c,flexShrink:0,animation:"pulse 2s infinite"}}/>
    <span style={{fontSize:13,color:T.text,lineHeight:1.5,flex:1}}>{msg}</span>
    <button onClick={onClose} style={{background:"none",border:"none",color:T.text3,cursor:"pointer",fontSize:16,flexShrink:0,padding:0,lineHeight:1}}>×</button>
  </div>;
}

/* ── SIDEBAR ── */
function Sidebar({page,setPage,credits,isDark,toggleTheme,T}) {
  const nav=[
    {id:"dashboard", ico:"◉",label:"Dashboard"},
    {id:"sourcing",  ico:"◎",label:"AI Sourcing Hub"},
    {id:"pipeline",  ico:"⟳",label:"Job Pipelines"},
    {id:"pool",      ico:"❑",label:"Candidate Pool"},
    {id:"outreach",  ico:"✉",label:"Outreach"},
    {id:"interviews",ico:"◷",label:"AI Interviews"},
    {id:"jobs",      ico:"≡",label:"Jobs"},
    {id:"notifications",ico:"🔔",label:"Notifications"},
    {id:"credits",   ico:"⬡",label:"Credits"},
    {id:"settings",  ico:"⚙",label:"Settings"},
  ];
  return <div style={{width:220,background:T.bg2,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",flexShrink:0,height:"100vh"}}>
    <div style={{padding:"20px 18px 15px",borderBottom:`1px solid ${T.border}`}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:19,background:`linear-gradient(120deg,${T.teal},${T.blue})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>TalentOS</div>
      <div style={{fontSize:11,color:T.text3,marginTop:2,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>AI Hiring Platform</div>
    </div>
    <div style={{padding:"11px 13px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:33,height:33,borderRadius:"50%",background:`linear-gradient(135deg,${T.teal},${T.blue})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:12,fontFamily:"'Playfair Display',serif",flexShrink:0}}>SK</div>
      <div>
        <div style={{color:T.text,fontSize:13,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Sarah Kessler</div>
        <div style={{color:T.text3,fontSize:11,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>HR Manager · Novartis AG</div>
      </div>
    </div>
    <nav style={{flex:1,padding:"8px",overflowY:"auto"}}>
      {nav.map(it=><button key={it.id} onClick={()=>setPage(it.id)} className={`nav-item${page===it.id?" active":""}`}>
        <span style={{fontSize:14,flexShrink:0}}>{it.ico}</span>
        <span>{it.label}</span>
        {it.id==="credits"&&<span style={{marginLeft:"auto",fontSize:11,fontWeight:700,color:T.teal,background:T.tealDim,borderRadius:10,padding:"1px 7px"}}>{credits}</span>}
      </button>)}
    </nav>
    <div style={{padding:"12px 13px",borderTop:`1px solid ${T.border}`}}>
      <button onClick={toggleTheme} style={{width:"100%",padding:"8px 12px",background:T.surface2,border:`1px solid ${T.border}`,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",gap:8,marginBottom:9,transition:"all .15s",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
        <span style={{fontSize:14}}>{isDark?"☀️":"🌙"}</span>
        <span style={{fontSize:12,fontWeight:600,color:T.text2}}>{isDark?"Light Mode":"Dark Mode"}</span>
      </button>
      <div style={{fontSize:10,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif",display:"flex",alignItems:"center",gap:5}}><span>🛡</span><span>GDPR · Swiss nDSG · v5.0</span></div>
    </div>
  </div>;
}

/* ── TOPBAR ── */
function Topbar({page,credits,unlocked,pooled,piped,T}) {
  const titles={dashboard:"Dashboard",sourcing:"AI Sourcing Hub",pipeline:"Job Pipelines",pool:"Candidate Pool",outreach:"Outreach Hub",interviews:"AI Interviews",credits:"Credits Dashboard",jobs:"Jobs",notifications:"Candidate Notifications",settings:"Settings"};
  return <div style={{height:54,background:T.bg2,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",padding:"0 28px",gap:20,flexShrink:0}}>
    <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:17,color:T.text,flex:1,letterSpacing:"-.01em"}}>{titles[page]||"—"}</span>
    <div style={{display:"flex",gap:18,alignItems:"center"}}>
      {[["🔓",unlocked,"Unlocked"],["❑",pooled,"In Pool"],["⟳",piped,"Pipeline"]].map(([ico,v,l])=><div key={l} style={{display:"flex",alignItems:"center",gap:5}}>
        <span style={{fontSize:13}}>{ico}</span>
        <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text,fontWeight:700}}>{v}</span>
        <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3}}>{l}</span>
      </div>)}
      <div style={{height:18,width:1,background:T.border}}/>
      <div style={{display:"flex",alignItems:"center",gap:7,background:T.tealDim,border:`1px solid ${T.tealBrd}`,borderRadius:20,padding:"5px 14px"}}>
        <span style={{fontSize:14}}>⬡</span>
        <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,color:T.teal,fontSize:14}}>{credits}</span>
        <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text3}}>credits</span>
      </div>
    </div>
  </div>;
}

/* ── SEARCH PAGE ── */
function SearchPage({onSearch,onSmartShortlist,prefillPrompt,T}) {
  const [prompt,setPrompt]=useState(prefillPrompt||"");
  const [mode,setMode]=useState("ai");
  const [sources,setSources]=useState(SOURCES.map(s=>s.id));
  const [searching,setSearching]=useState(false);
  const [keyword,setKeyword]=useState("");
  const [location,setLocation]=useState("");
  const [skills,setSkills]=useState([]);
  const [exp,setExp]=useState("");
  const [newSkill,setNewSkill]=useState("");

  useEffect(()=>{ if(prefillPrompt){setPrompt(prefillPrompt);setMode("ai");} },[prefillPrompt]);

  const SUGG=[
    "Senior DevOps engineers in Switzerland, 7+ years Kubernetes and Terraform, open to new roles",
    "Cloud architects with fintech background in Zürich or Geneva, AWS certified, 10+ years exp",
    "Platform engineers with large-scale microservices and infrastructure-as-code experience",
    "Site reliability engineers with Prometheus and GCP expertise, 5+ years production SRE",
  ];

  function go(){
    if(mode==="ai"&&!prompt.trim())return;
    if(mode==="manual"&&!keyword.trim()&&skills.length===0)return;
    setSearching(true);
    setTimeout(()=>{setSearching(false);onSearch({prompt,keyword,location,skills,exp,sources,mode});},1800);
  }

  const srcToggle=id=>setSources(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);

  return <div style={{flex:1,overflowY:"auto",background:T.bg}}>
    {/* Page header */}
    <div style={{background:T.bg2,borderBottom:`1px solid ${T.border}`}}>
      <div style={{maxWidth:760,margin:"0 auto",padding:"26px 32px 0"}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:18}}>
          <div>
            <h1 className="htitle" style={{fontSize:24,marginBottom:5}}>Find Passive Candidates</h1>
            <p style={{fontSize:14,color:T.text2,lineHeight:1.6}}>Search millions of anonymised profiles. Unlock to reveal full contact details.</p>
          </div>
          {/* Mode toggle icons */}
          <div style={{display:"flex",alignItems:"center",gap:6,paddingBottom:4}}>
            <button onClick={()=>setMode("ai")} title="AI Prompt (default)" style={{width:36,height:36,borderRadius:9,border:`1.5px solid ${mode==="ai"?T.tealBrd:T.border}`,background:mode==="ai"?T.tealDim:T.surface,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,transition:"all .15s"}} >✦</button>
            <button onClick={()=>setMode("manual")} title="Manual / Boolean search" style={{width:36,height:36,borderRadius:9,border:`1.5px solid ${mode==="manual"?T.tealBrd:T.border}`,background:mode==="manual"?T.tealDim:T.surface,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,transition:"all .15s"}}>⊞</button>
          </div>
        </div>
        {/* Source pills */}
        <div style={{display:"flex",alignItems:"center",gap:7,paddingBottom:16,flexWrap:"wrap"}}>
          <span style={{fontSize:11,fontWeight:600,color:T.text3,textTransform:"uppercase",letterSpacing:".08em",marginRight:2}}>Sources</span>
          {SOURCES.map(src=>{
            const on=sources.includes(src.id);
            return <button key={src.id} onClick={()=>srcToggle(src.id)} style={{display:"flex",alignItems:"center",gap:5,padding:"4px 11px",borderRadius:20,border:`1.5px solid ${on?src.color+"44":T.border}`,background:on?`${src.color}0D`:T.surface,cursor:"pointer",transition:"all .15s",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              <span style={{fontSize:12}}>{src.emoji}</span>
              <span style={{fontSize:12,fontWeight:600,color:on?src.color:T.text3}}>{src.label}</span>
              {on&&<span style={{width:5,height:5,borderRadius:"50%",background:src.color}}/>}
            </button>;
          })}
          <button onClick={()=>setSources(SOURCES.map(s=>s.id))} style={{fontSize:11,color:T.teal,background:"none",border:"none",cursor:"pointer",fontWeight:600,padding:"3px 7px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>All</button>
          <button onClick={()=>setSources([])} style={{fontSize:11,color:T.text3,background:"none",border:"none",cursor:"pointer",padding:"3px 7px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>None</button>
        </div>
      </div>
    </div>

    {/* Input area */}
    <div style={{maxWidth:760,margin:"0 auto",padding:"28px 32px 24px"}}>
      {/* AI PROMPT MODE */}
      {mode==="ai"&&<div style={{animation:"fadeIn .25s ease"}}>
        <div style={{background:T.bg2,border:`1.5px solid ${T.border}`,borderRadius:16,overflow:"hidden",boxShadow:`0 4px 20px ${T.shadow}`,marginBottom:18}}>
          <textarea value={prompt} onChange={e=>setPrompt(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&(e.metaKey||e.ctrlKey))go();}}
            placeholder={"Describe who you're looking for…\ne.g. Senior DevOps engineers in Switzerland with 7+ years Kubernetes experience, open to new roles"}
            style={{width:"100%",minHeight:120,background:"transparent",border:"none",padding:"20px 22px 12px",color:T.text,fontSize:15,fontFamily:"'Plus Jakarta Sans',sans-serif",resize:"none",outline:"none",lineHeight:1.65}}
          />
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px 14px 22px",borderTop:`1px solid ${T.border}`}}>
            <span style={{fontSize:12,color:T.text3}}>⌘↵ to run · {sources.length} source{sources.length!==1?"s":""} active</span>
            <div style={{display:"flex",gap:8}}>
              <button onClick={onSmartShortlist} style={{padding:"9px 16px",borderRadius:9,border:`1.5px solid ${T.amber}44`,background:T.amberDim,color:T.amber,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:6,transition:"all .15s"}}
                onMouseEnter={e=>{e.currentTarget.style.background=T.amber;e.currentTarget.style.color="#fff";}}
                onMouseLeave={e=>{e.currentTarget.style.background=T.amberDim;e.currentTarget.style.color=T.amber;}}>
                ✦ Smart Shortlist
              </button>
              <button className="bp" onClick={go} disabled={searching||!prompt.trim()} style={{padding:"9px 24px",fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,borderRadius:9,display:"flex",alignItems:"center",gap:8}}>
                {searching?<><span style={{animation:"spin .9s linear infinite",display:"inline-block"}}>↻</span>Searching…</>:"Search →"}
              </button>
            </div>
          </div>
        </div>
        <div style={{marginTop:4}}>
          <div style={{fontSize:12,color:T.text3,marginBottom:9,fontWeight:500}}>Suggested searches:</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {SUGG.map(q=><button key={q} onClick={()=>setPrompt(q)} style={{background:T.bg2,border:`1px solid ${T.border}`,color:T.text2,borderRadius:20,padding:"6px 13px",fontSize:12,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all .15s",boxShadow:`0 1px 4px ${T.shadow}`}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=T.tealBrd;e.currentTarget.style.color=T.teal;e.currentTarget.style.background=T.tealDim;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.text2;e.currentTarget.style.background=T.bg2;}}>
              {q.length>60?q.slice(0,60)+"…":q}
            </button>)}
          </div>
        </div>
      </div>}

      {/* MANUAL / BOOLEAN MODE */}
      {mode==="manual"&&<div style={{animation:"fadeIn .25s ease"}}>
        <div className="gh" style={{padding:24,marginBottom:14,boxShadow:`0 2px 10px ${T.shadow}`}}>
          <div style={{fontSize:12,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:".09em",marginBottom:16,display:"flex",alignItems:"center",gap:7}}><span>⊞</span>Manual Search Filters</div>
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:".09em",marginBottom:7}}>Keyword / Boolean Search</label>
            <input className="inp" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`"DevOps" AND ("Kubernetes" OR "K8s") NOT "Junior"`}/>
            <div style={{fontSize:11,color:T.text3,marginTop:5}}>Supports AND, OR, NOT operators and quoted phrases</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
            <div>
              <label style={{display:"block",fontSize:11,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:".09em",marginBottom:7}}>Location</label>
              <input className="inp" value={location} onChange={e=>setLocation(e.target.value)} placeholder="e.g. Zürich, Switzerland"/>
            </div>
            <div>
              <label style={{display:"block",fontSize:11,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:".09em",marginBottom:7}}>Experience Level</label>
              <select className="inp" value={exp} onChange={e=>setExp(e.target.value)}>
                <option value="">Any level</option>
                {["Junior (0–2 yrs)","Mid (3–5 yrs)","Senior (6–10 yrs)","Lead / Principal (10+ yrs)"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:".09em",marginBottom:8}}>Required Skills</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
              {skills.map(s=><span key={s} className="tag" style={{background:T.tealDim,color:T.teal,border:`1px solid ${T.tealBrd}`}}>
                {s}<button onClick={()=>setSkills(sk=>sk.filter(x=>x!==s))} style={{background:"none",border:"none",color:T.teal,cursor:"pointer",fontSize:13,padding:"0 0 0 4px",lineHeight:1}}>×</button>
              </span>)}
            </div>
            <div style={{display:"flex",gap:8}}>
              <input className="inp" value={newSkill} onChange={e=>setNewSkill(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newSkill.trim()){setSkills(sk=>[...sk,newSkill.trim()]);setNewSkill("");}}} placeholder="Type a skill and press Enter…" style={{flex:1}}/>
              <button className="bt" onClick={()=>{if(newSkill.trim()){setSkills(sk=>[...sk,newSkill.trim()]);setNewSkill("");}}} style={{padding:"10px 16px",fontSize:13,whiteSpace:"nowrap"}}>+ Add</button>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:9,justifyContent:"flex-end"}}>
          <button onClick={onSmartShortlist} style={{padding:"10px 18px",borderRadius:9,border:`1.5px solid ${T.amber}44`,background:T.amberDim,color:T.amber,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:6,transition:"all .15s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=T.amber;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background=T.amberDim;e.currentTarget.style.color=T.amber;}}>
            ✦ Smart Shortlist
          </button>
          <button className="bp" onClick={go} disabled={searching||(!keyword.trim()&&skills.length===0)} style={{padding:"10px 28px",fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,display:"flex",alignItems:"center",gap:8}}>
            {searching?<><span style={{animation:"spin .9s linear infinite",display:"inline-block"}}>↻</span>Searching…</>:"Search →"}
          </button>
        </div>
      </div>}

      {/* Privacy note */}
      <div style={{marginTop:22,display:"flex",alignItems:"flex-start",gap:10,padding:"11px 15px",background:T.surface2,border:`1px solid ${T.border}`,borderRadius:10}}>
        <span style={{fontSize:15,flexShrink:0}}>🛡</span>
        <p style={{fontSize:12,color:T.text3,lineHeight:1.65,margin:0,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>All results are anonymised. Names, contact details, and employer are hidden until you unlock a profile (<strong style={{color:T.teal}}>1 credit each</strong>). GDPR Art. 14 and Swiss nDSG Art. 19 notification sent automatically on every unlock.</p>
      </div>
    </div>
  </div>;
}

/* ── SMART SHORTLIST CONFIRM MODAL ── */
function SmartShortlistModal({credits,T,onConfirm,onClose}) {
  const [gdpr,setGdpr]=useState(false);
  const [loading,setLoading]=useState(false);
  function confirm(){if(!gdpr)return;setLoading(true);setTimeout(()=>{setLoading(false);onConfirm();},1800);}
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:700,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)",animation:"fadeIn .2s ease"}} onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:18,padding:"34px 38px",width:"min(500px,94vw)",boxShadow:`0 32px 80px ${T.shadow2}`,animation:"popIn .25s ease"}}>
      <div style={{textAlign:"center",marginBottom:26}}>
        <div style={{width:58,height:58,borderRadius:"50%",background:T.amberDim,border:`2px solid ${T.amber}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,margin:"0 auto 14px"}}>✦</div>
        <h2 className="htitle" style={{fontSize:21,marginBottom:8}}>Smart Shortlist</h2>
        <p style={{fontSize:14,color:T.text2,lineHeight:1.65}}>Our AI selects the <strong style={{color:T.text}}>top 10 matching candidates</strong> and unlocks their full profiles instantly — ready to contact.</p>
      </div>
      <div style={{display:"flex",gap:0,background:T.bg3,border:`1px solid ${T.border}`,borderRadius:12,padding:"16px 20px",marginBottom:20}}>
        {[["Credit Cost","10",T.amber,"credits"],["Profiles Unlocked","10",T.teal,"full contacts"],["Balance After",String(Math.max(0,credits-10)),credits-10<10?T.red:T.text,"remaining"]].map(([l,v,c,sub],i)=><div key={l} style={{flex:1,textAlign:"center",borderRight:i<2?`1px solid ${T.border}`:"none"}}>
          <div style={{fontSize:11,color:T.text3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:4,fontWeight:600}}>{l}</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:30,color:c,lineHeight:1}}>{v}</div>
          <div style={{fontSize:12,color:T.text3,marginTop:3}}>{sub}</div>
        </div>)}
      </div>
      <div style={{background:T.bg3,borderRadius:11,padding:"13px 16px",marginBottom:18}}>
        <div style={{fontSize:12,fontWeight:700,color:T.text,marginBottom:8}}>What you get:</div>
        {["AI ranks all results and selects top 10 by suitability","All 10 profiles fully unlocked — name, email, phone, LinkedIn","Candidates ranked by overall match score","Ready to contact immediately","GDPR Art. 14 notification sent to all 10 automatically"].map(item=><div key={item} style={{display:"flex",gap:8,marginBottom:5}}>
          <span style={{color:T.teal,fontSize:13,flexShrink:0}}>✓</span>
          <span style={{fontSize:13,color:T.text2,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{item}</span>
        </div>)}
      </div>
      <label style={{display:"flex",gap:11,alignItems:"flex-start",cursor:"pointer",marginBottom:20,padding:"12px 14px",background:T.amberDim,border:`1px solid ${T.amber}28`,borderRadius:10}}>
        <input type="checkbox" checked={gdpr} onChange={e=>setGdpr(e.target.checked)} style={{accentColor:T.teal,width:15,height:15,marginTop:1,flexShrink:0,cursor:"pointer"}}/>
        <span style={{fontSize:12,color:T.text2,lineHeight:1.65,fontFamily:"'Plus Jakarta Sans',sans-serif"}}><strong style={{color:T.amber}}>GDPR & nDSG Compliance:</strong> I confirm I will only contact these candidates for legitimate recruitment purposes and acknowledge that all 10 will be automatically notified of my data access per GDPR Art. 14 and Swiss nDSG Art. 19.</span>
      </label>
      <div style={{display:"flex",gap:10}}>
        <button className="bs" onClick={onClose} style={{flex:1,padding:"12px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Cancel</button>
        <button onClick={confirm} disabled={!gdpr||loading} style={{flex:2,padding:"12px",fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,borderRadius:9,border:"none",cursor:gdpr?"pointer":"default",background:gdpr?`linear-gradient(135deg,${T.amber},#f97316)`:"rgba(0,0,0,0.07)",color:gdpr?"#fff":T.text3,display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all .2s"}}>
          {loading?<><span style={{animation:"spin .8s linear infinite",display:"inline-block"}}>↻</span>Building shortlist…</>:"✦ Confirm Smart Shortlist"}
        </button>
      </div>
    </div>
  </div>;
}

/* ── SMART SHORTLIST RESULTS ── */
function SmartShortlistPage({onProfile,onNewSearch,T}) {
  const SMART=PROFILES.map((p,i)=>({...p,score:Math.max(65,98-i*3),smartUnlocked:i<3}));
  const [selIds,setSelIds]=useState([]);
  const toggle=id=>setSelIds(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);

  return <div style={{flex:1,overflowY:"auto",padding:"26px 30px",background:T.bg}}>
    <div style={{maxWidth:940,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:22}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5}}>
            <h2 className="htitle" style={{fontSize:21}}>Smart Shortlist</h2>
            <span className="tag" style={{background:T.amberDim,color:T.amber,border:`1px solid ${T.amber}30`,fontSize:12}}>✦ 10 credits used</span>
            <span className="tag" style={{background:T.greenDim,color:T.green,border:`1px solid ${T.green}30`,fontSize:12}}>AI Selected</span>
          </div>
          <p style={{fontSize:13,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Top 10 candidates identified and ranked by AI · First 3 fully unlocked · Remaining profiles locked until manually unlocked</p>
        </div>
        <div style={{display:"flex",gap:8}}>
          {selIds.length>0&&<button className="bp" style={{padding:"8px 18px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600}}>Add {selIds.length} to Pool</button>}
          <button className="bs" onClick={onNewSearch} style={{padding:"8px 16px",fontSize:13}}>← New Search</button>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:11}}>
        {SMART.map((p,i)=>{
          const sel=selIds.includes(p.id);
          return <div key={p.id} style={{background:T.bg2,border:`1px solid ${sel?T.tealBrd:T.border}`,borderRadius:14,padding:"16px 20px",display:"flex",alignItems:"center",gap:15,transition:"all .15s",boxShadow:`0 2px 8px ${T.shadow}`,animation:`fadeUp .3s ease ${i*.04}s both`,cursor:"pointer",position:"relative",overflow:"hidden"}}
            onClick={()=>onProfile({...p,_forceUnlocked:p.smartUnlocked})}
            onMouseEnter={e=>{if(!sel)e.currentTarget.style.borderColor=T.tealBrd;}}
            onMouseLeave={e=>{if(!sel)e.currentTarget.style.borderColor=T.border;}}>
            {/* top accent */}
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${sColor(p.score,T)}44,${sColor(p.score,T)})`}}/>
            {/* rank badge */}
            <div style={{width:28,height:28,borderRadius:"50%",background:i<3?T.amberDim:T.surface2,border:`1px solid ${i<3?T.amber+"44":T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:i<3?T.amber:T.text3,flexShrink:0}}>#{i+1}</div>
            {/* avatar */}
            {p.smartUnlocked?<Av idx={p.av} size={44} name={p.name} T={T}/>:<div style={{width:44,height:44,borderRadius:"50%",background:T.surface2,border:`2px dashed ${T.border2}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.text3,fontSize:18,flexShrink:0}}>?</div>}
            {/* info */}
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3,flexWrap:"wrap"}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:15,color:T.text}}>{p.smartUnlocked?p.name:p.title}</span>
                <ScB score={p.score} T={T}/>
                {p.smartUnlocked?<span className="tag" style={{background:T.greenDim,color:T.green,border:`1px solid ${T.green}28`,fontSize:11}}>🔓 Unlocked</span>:<span className="tag" style={{background:T.surface2,color:T.text3,border:`1px solid ${T.border}`,fontSize:11}}>🔒 Locked</span>}
              </div>
              <div style={{fontSize:13,color:T.text2,marginBottom:6,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{p.smartUnlocked?`${p.title} · ${p.employer}`:p.industry} · {p.loc} · {p.yoe} yrs</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {p.skills.slice(0,5).map((s,si)=><SKPill key={s} skill={s} matched={si<p.matched} T={T}/>)}
              </div>
            </div>
            {/* contact preview if unlocked */}
            {p.smartUnlocked?<div style={{fontSize:12,color:T.text2,display:"flex",flexDirection:"column",gap:3,alignItems:"flex-end",flexShrink:0,minWidth:160,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              <span>{p.email}</span><span>{p.phone}</span>
            </div>:<div style={{fontSize:12,color:T.text3,textAlign:"right",flexShrink:0}}>
              <div style={{fontSize:11,marginBottom:5}}>Contact hidden</div>
              <button className="bt" onClick={e=>{e.stopPropagation();onProfile(p);}} style={{padding:"5px 12px",fontSize:12,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Unlock – 1 cr</button>
            </div>}
            {p.smartUnlocked&&<input type="checkbox" checked={sel} onChange={e=>{e.stopPropagation();toggle(p.id);}} onClick={e=>e.stopPropagation()} style={{accentColor:T.teal,width:15,height:15,cursor:"pointer",flexShrink:0}}/>}
          </div>;
        })}
      </div>
      <div style={{marginTop:14,padding:"11px 14px",background:T.surface2,border:`1px solid ${T.border}`,borderRadius:10,fontSize:12,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
        ✓ GDPR notifications sent to all 10 candidates · Shortlist generated {new Date().toLocaleDateString("en-GB")} · Profiles retained per 90-day data retention policy
      </div>
    </div>
  </div>;
}

/* ── RESULTS PAGE (grid + list, bulk unlock) ── */
function ResultsPage({profiles,onProfile,onNewSearch,onBulkUnlock,T}) {
  const [view,setView]=useState("grid");
  const [sort,setSort]=useState("score");
  const [minScore,setMinScore]=useState(0);
  const [availOnly,setAvailOnly]=useState(false);
  const [selIds,setSelIds]=useState([]);
  const [showBulk,setShowBulk]=useState(false);
  const [bulkDone,setBulkDone]=useState(false);
  const [gdpr,setGdpr]=useState(false);
  const [bulkLoading,setBulkLoading]=useState(false);

  let list=[...profiles].filter(p=>p.score>=minScore&&(availOnly?p.avail:true));
  list.sort((a,b)=>sort==="score"?b.score-a.score:b.yoe-a.yoe);

  const toggle=id=>setSelIds(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  const selAll=()=>setSelIds(list.map(p=>p.id));
  const clrSel=()=>setSelIds([]);

  function doBulkUnlock(){
    setBulkLoading(true);
    setTimeout(()=>{setBulkLoading(false);setBulkDone(true);onBulkUnlock(selIds.length);
      setTimeout(()=>{setShowBulk(false);setBulkDone(false);setGdpr(false);setSelIds([]);},1600);},1800);
  }

  const GridView=()=><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(288px,1fr))",gap:13}}>
    {list.map((p,i)=>{
      const sel=selIds.includes(p.id);
      return <div key={p.id} className="c-hover gh" onClick={()=>onProfile(p)} style={{padding:18,cursor:"pointer",animation:`fadeUp .3s ease ${i*.04}s both`,position:"relative",overflow:"hidden",background:sel?T.tealDim:T.surface,border:`1px solid ${sel?T.tealBrd:T.border}`,boxShadow:`0 2px 6px ${T.shadow}`}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${sColor(p.score,T)}44,${sColor(p.score,T)})`}}/>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <input type="checkbox" checked={sel} onChange={e=>{e.stopPropagation();toggle(p.id);}} onClick={e=>e.stopPropagation()} style={{accentColor:T.teal,width:14,height:14,cursor:"pointer",flexShrink:0}}/>
            <div style={{width:38,height:38,borderRadius:"50%",background:T.surface2,border:`2px dashed ${T.border2}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.text3,fontSize:15,flexShrink:0}}>?</div>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,color:T.text,marginBottom:1,lineHeight:1.2}}>{p.title}</div>
              <div style={{fontSize:11,color:T.text3}}>{p.industry}</div>
            </div>
          </div>
          <ScB score={p.score} T={T}/>
        </div>
        <div style={{display:"flex",gap:12,marginBottom:10,flexWrap:"wrap"}}>
          <span style={{fontSize:12,color:T.text3}}>📍 {p.loc.split(",")[0]}</span>
          <span style={{fontSize:12,color:T.text3}}>⏱ {p.yoe} yrs</span>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
          {p.skills.slice(0,4).map((s,si)=><SKPill key={s} skill={s} matched={si<p.matched} T={T}/>)}
          {p.skills.length>4&&<span style={{fontSize:11,color:T.text3,alignSelf:"center"}}>+{p.skills.length-4}</span>}
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:p.avail?T.green:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:p.avail?T.green:T.text3,display:"inline-block",animation:p.avail?"pulse 2s infinite":"none"}}/>
            {p.avail?"Open to roles":"Not indicated"}
          </span>
          <button onClick={e=>{e.stopPropagation();onProfile(p);}} className="bt" style={{padding:"4px 11px",fontSize:11,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,borderRadius:7}}>View →</button>
        </div>
      </div>;
    })}
  </div>;

  const ListView=()=><div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden",boxShadow:`0 2px 8px ${T.shadow}`}}>
    <div style={{display:"grid",gridTemplateColumns:"30px 1fr 110px 120px 110px 130px 74px",gap:10,padding:"10px 16px",background:T.bg3,borderBottom:`1px solid ${T.border}`,alignItems:"center"}}>
      <input type="checkbox" checked={selIds.length===list.length&&list.length>0} onChange={e=>e.target.checked?selAll():clrSel()} style={{accentColor:T.teal,width:13,height:13,cursor:"pointer"}}/>
      {["Candidate","Score","Location","Experience","Availability",""].map((h,i)=><div key={i} style={{fontSize:11,fontWeight:700,color:T.text3,textTransform:"uppercase",letterSpacing:".07em",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{h}</div>)}
    </div>
    {list.map((p,i)=>{
      const sel=selIds.includes(p.id);
      return <div key={p.id} style={{display:"grid",gridTemplateColumns:"30px 1fr 110px 120px 110px 130px 74px",gap:10,padding:"12px 16px",borderBottom:i<list.length-1?`1px solid ${T.border}`:"none",alignItems:"center",background:sel?T.tealDim:"transparent",transition:"background .12s",cursor:"pointer"}}
        onClick={()=>onProfile(p)}
        onMouseEnter={e=>{if(!sel)e.currentTarget.style.background=T.cardHover;}}
        onMouseLeave={e=>{if(!sel)e.currentTarget.style.background="transparent";}}>
        <input type="checkbox" checked={sel} onChange={e=>{e.stopPropagation();toggle(p.id);}} onClick={e=>e.stopPropagation()} style={{accentColor:T.teal,width:13,height:13,cursor:"pointer"}}/>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:13,color:T.text,marginBottom:1}}>{p.title}</div>
          <div style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{p.industry}</div>
        </div>
        <ScB score={p.score} T={T}/>
        <div style={{fontSize:12,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>📍 {p.loc.split(",")[0]}</div>
        <div style={{fontSize:12,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>⏱ {p.yoe} yrs</div>
        <span style={{fontSize:11,display:"flex",alignItems:"center",gap:4,color:p.avail?T.green:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:p.avail?T.green:T.text3,display:"inline-block"}}/>
          {p.avail?"Open":"—"}
        </span>
        <button onClick={e=>{e.stopPropagation();onProfile(p);}} className="bt" style={{padding:"5px 9px",fontSize:11,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,borderRadius:7}}>View</button>
      </div>;
    })}
  </div>;

  return <div style={{flex:1,display:"flex",overflow:"hidden"}}>
    {/* Sidebar filters */}
    <div style={{width:208,background:T.bg2,borderRight:`1px solid ${T.border}`,padding:"16px 10px",overflowY:"auto",flexShrink:0}}>
      <div style={{fontSize:11,fontWeight:700,color:T.text3,textTransform:"uppercase",letterSpacing:".09em",marginBottom:14,padding:"0 4px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Refine Results</div>
      <div style={{marginBottom:18}}>
        <div style={{fontSize:12,color:T.text2,fontWeight:600,marginBottom:8,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Sort by</div>
        {[["score","Match Score"],["yoe","Experience"]].map(([v,l])=><button key={v} onClick={()=>setSort(v)} style={{display:"block",width:"100%",padding:"8px 12px",borderRadius:8,border:`1px solid ${sort===v?T.tealBrd:T.border}`,background:sort===v?T.tealDim:T.surface,color:sort===v?T.teal:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,cursor:"pointer",marginBottom:5,textAlign:"left",transition:"all .15s",fontWeight:sort===v?600:400}}>{sort===v?"● ":" "}{l}</button>)}
      </div>
      <div style={{marginBottom:18}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontWeight:600,marginBottom:8,fontFamily:"'Plus Jakarta Sans',sans-serif",color:T.text2}}><span>Min Score</span><span style={{color:T.teal,fontWeight:700}}>{minScore}%</span></div>
        <input type="range" min={0} max={90} step={5} value={minScore} onChange={e=>setMinScore(+e.target.value)} style={{width:"100%",accentColor:T.teal,cursor:"pointer"}}/>
      </div>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:12,color:T.text2,fontWeight:600,marginBottom:10,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Availability</div>
        <label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
          <div onClick={()=>setAvailOnly(!availOnly)} style={{width:36,height:20,borderRadius:10,background:availOnly?T.teal:T.surface2,border:`1px solid ${availOnly?T.teal:T.border}`,position:"relative",transition:"all .2s",cursor:"pointer",flexShrink:0}}>
            <span style={{position:"absolute",top:2,left:availOnly?16:2,width:16,height:16,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
          </div>
          <span style={{fontSize:12,color:T.text2,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Open signals only</span>
        </label>
      </div>
      {selIds.length>0&&<div style={{background:T.tealDim,border:`1px solid ${T.tealBrd}`,borderRadius:10,padding:"12px",marginTop:8}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:22,color:T.teal,textAlign:"center",marginBottom:2}}>{selIds.length}</div>
        <div style={{fontSize:12,color:T.text2,textAlign:"center",fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:10}}>selected</div>
        <button className="bp" onClick={()=>setShowBulk(true)} style={{width:"100%",padding:"8px",fontSize:12,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,marginBottom:6}}>🔓 Bulk Unlock</button>
        <button className="bs" onClick={clrSel} style={{width:"100%",padding:"6px",fontSize:12,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Clear</button>
      </div>}
    </div>

    {/* Results */}
    <div style={{flex:1,overflowY:"auto",padding:"20px 24px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <div>
          <h2 className="htitle" style={{fontSize:18,marginBottom:2}}>{list.length} Anonymised Profiles</h2>
          <p style={{fontSize:12,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Click any card to preview · Tick checkboxes for bulk unlock</p>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {/* Grid/List toggle */}
          <div style={{display:"flex",border:`1px solid ${T.border}`,borderRadius:8,overflow:"hidden",background:T.surface}}>
            {[["grid","⊟","Grid"],["list","☰","List"]].map(([v,ico,label])=><button key={v} onClick={()=>setView(v)} title={label} style={{padding:"7px 13px",border:"none",cursor:"pointer",background:view===v?T.teal:"transparent",color:view===v?"#fff":T.text3,fontSize:15,transition:"all .15s"}}>{ico}</button>)}
          </div>
          {selIds.length>0&&<button className="bp" onClick={()=>setShowBulk(true)} style={{padding:"8px 18px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700}}>🔓 Unlock {selIds.length}</button>}
          <button onClick={selAll} className="bs" style={{padding:"8px 13px",fontSize:12,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Select All</button>
          <button className="bs" onClick={onNewSearch} style={{padding:"8px 14px",fontSize:13}}>← Back</button>
        </div>
      </div>
      <div style={{background:T.amberDim,border:`1px solid ${T.amber}30`,borderRadius:9,padding:"9px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
        <span>🔒</span><span style={{fontSize:12,color:T.amber,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>All profiles anonymised. Unlock individually (1 credit) or select multiple for bulk unlock.</span>
      </div>
      {view==="grid"?<GridView/>:<ListView/>}
    </div>

    {/* Bulk Unlock Modal */}
    {showBulk&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)",animation:"fadeIn .2s ease"}} onClick={()=>{setShowBulk(false);setGdpr(false);}}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:16,padding:"30px 34px",width:"min(450px,94vw)",boxShadow:`0 24px 64px ${T.shadow2}`,animation:"popIn .25s ease"}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:34,marginBottom:8}}>🔓</div>
          <h3 className="htitle" style={{fontSize:19,marginBottom:6}}>Bulk Unlock {selIds.length} Profiles</h3>
          <p style={{fontSize:13,color:T.text2,lineHeight:1.6,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>All selected profiles will be revealed simultaneously.</p>
        </div>
        {bulkDone?<div style={{background:T.greenDim,border:`1px solid ${T.green}30`,borderRadius:11,padding:"18px",textAlign:"center",marginBottom:18}}>
          <div style={{fontSize:22,marginBottom:6}}>✅</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:16,color:T.green}}>Profiles Unlocked!</div>
          <div style={{fontSize:13,color:T.text2,marginTop:4,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>GDPR notifications sent to all {selIds.length} candidates.</div>
        </div>:<>
          <div style={{display:"flex",justifyContent:"space-between",background:T.bg3,borderRadius:11,padding:"14px 18px",marginBottom:18}}>
            <div><div style={{fontSize:11,color:T.text3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:3,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Total Cost</div><div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:26,color:T.teal}}>{selIds.length} credits</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:11,color:T.text3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:3,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Profiles</div><div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:26,color:T.text}}>{selIds.length}</div></div>
          </div>
          <label style={{display:"flex",gap:11,alignItems:"flex-start",cursor:"pointer",marginBottom:20,padding:"12px 14px",background:T.amberDim,border:`1px solid ${T.amber}28`,borderRadius:10}}>
            <input type="checkbox" checked={gdpr} onChange={e=>setGdpr(e.target.checked)} style={{accentColor:T.teal,width:14,height:14,marginTop:1,flexShrink:0}}/>
            <span style={{fontSize:12,color:T.text2,lineHeight:1.6,fontFamily:"'Plus Jakarta Sans',sans-serif"}}><strong style={{color:T.amber}}>GDPR:</strong> I confirm legitimate recruitment purpose for all {selIds.length} candidates. All will be notified automatically per GDPR Art. 14.</span>
          </label>
        </>}
        {!bulkDone&&<div style={{display:"flex",gap:9}}>
          <button className="bs" onClick={()=>{setShowBulk(false);setGdpr(false);}} style={{flex:1,padding:"11px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Cancel</button>
          <button className="bp" onClick={doBulkUnlock} disabled={!gdpr||bulkLoading} style={{flex:2,padding:"11px",fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            {bulkLoading?<><span style={{animation:"spin .8s linear infinite",display:"inline-block"}}>↻</span>Unlocking…</>:`Unlock ${selIds.length} Profiles`}
          </button>
        </div>}
      </div>
    </div>}
  </div>;
}

/* ── PROFILE MODAL ── */
function ProfileModal({profile,credits,onClose,onUnlock,onPool,onPipeline,onInterview,onOutreach,T,_startUnlocked}) {
  const [tab,setTab]=useState("overview");
  const [unlocked,setUnlocked]=useState(_startUnlocked||false);
  const [inPool,setInPool]=useState(false);
  const [inPipe,setInPipe]=useState(false);
  const [intDone,setIntDone]=useState(false);
  const [showUnlock,setShowUnlock]=useState(false);
  const [showInt,setShowInt]=useState(false);
  const [unlocking,setUnlocking]=useState(false);
  const [scheduling,setScheduling]=useState(false);
  const [aC,setAC]=useState(false);
  const [iC,setIC]=useState(false);
  const [assignJob,setAssignJob]=useState("");
  if(!profile)return null;
  const TABS=[{id:"overview",l:"Overview"},{id:"skills",l:"Skills"},{id:"career",l:"Career"},{id:"insights",l:"AI Insights"}];
  const srcLabel=SOURCES.find(s=>s.id===profile.source)?.label||"External";
  function doUnlock(){setUnlocking(true);setTimeout(()=>{setUnlocking(false);setUnlocked(true);setShowUnlock(false);setAC(false);onUnlock(profile);},1500);}
  function doInt(){setScheduling(true);setTimeout(()=>{setScheduling(false);setIntDone(true);setShowInt(false);setIC(false);onInterview(profile);},1600);}

  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(10px)",animation:"fadeIn .2s ease"}} onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} style={{width:"min(900px,96vw)",maxHeight:"92vh",background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:18,display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:`0 32px 80px ${T.shadow2}`,animation:"fadeUp .3s ease",position:"relative"}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${T.tealDim},${T.blueDim})`,borderBottom:`1px solid ${T.border}`,padding:"20px 24px",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
          {unlocked?<Av idx={profile.av} size={54} name={profile.name} T={T}/>:<div style={{width:54,height:54,borderRadius:"50%",background:T.surface2,border:`2px dashed ${T.border2}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.text3,fontSize:22,flexShrink:0}}>?</div>}
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:4,flexWrap:"wrap"}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:20,color:T.text,letterSpacing:"-.01em"}}>{unlocked?profile.name:profile.title}</h2>
              <ScB score={profile.score} T={T}/>
              {unlocked&&<span className="tag" style={{background:T.greenDim,color:T.green,border:`1px solid ${T.green}30`,fontSize:11}}>🔓 Unlocked</span>}
              <span className="tag" style={{background:T.surface2,color:T.text3,border:`1px solid ${T.border}`,fontSize:11}}>via {srcLabel}</span>
            </div>
            <p style={{fontSize:13,color:T.text2,marginBottom:6,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{unlocked?`${profile.title} · ${profile.employer}`:`${profile.yoe} yrs · ${profile.industry}`}</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <span style={{fontSize:12,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>📍 {profile.loc}</span>
              <span style={{fontSize:12,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>🎓 {profile.edu}</span>
              <span style={{fontSize:12,color:profile.avail?T.green:T.text3,display:"flex",alignItems:"center",gap:4,fontFamily:"'Plus Jakarta Sans',sans-serif"}}><span style={{width:6,height:6,borderRadius:"50%",background:profile.avail?T.green:T.text3,display:"inline-block"}}/>{profile.avail?"Open to opportunities":"Not indicated"}</span>
            </div>
          </div>
          <button onClick={onClose} className="bs" style={{width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,borderRadius:8,padding:0,flexShrink:0,lineHeight:1}}>×</button>
        </div>
      </div>
      {/* Tabs */}
      <div style={{display:"flex",borderBottom:`1px solid ${T.border}`,background:T.bg3,flexShrink:0}}>
        {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"10px 0",border:"none",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,fontWeight:600,transition:"all .15s",color:tab===t.id?T.teal:T.text3,background:tab===t.id?T.bg2:"transparent",borderBottom:`2.5px solid ${tab===t.id?T.teal:"transparent"}`}}>{t.l}</button>)}
      </div>
      {/* Content */}
      <div style={{flex:1,overflowY:"auto",padding:"20px 24px"}}>
        {tab==="overview"&&<div style={{animation:"fadeIn .3s ease"}}>
          {unlocked?<div>
            <div style={{background:`linear-gradient(135deg,${T.tealDim},${T.greenDim})`,border:`1px solid ${T.tealBrd}`,borderRadius:12,padding:"16px 18px",marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:700,color:T.teal,textTransform:"uppercase",letterSpacing:".09em",marginBottom:11}}>🔓 Contact Information — Revealed</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                {[["Name",profile.name,"👤"],["Email",profile.email,"📧"],["Phone",profile.phone,"📞"],["LinkedIn",profile.linkedin,"🔗"],["GitHub",profile.github,"💻"],["Employer",profile.employer,"🏢"]].map(([k,v,ico])=><div key={k} style={{background:T.bg2,borderRadius:9,padding:"10px 13px",border:`1px solid ${T.tealBrd}`}}>
                  <div style={{fontSize:10,color:T.text3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:3,fontWeight:600}}>{ico} {k}</div>
                  <div style={{fontSize:13,fontWeight:600,color:T.teal,wordBreak:"break-all",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{v}</div>
                </div>)}
              </div>
            </div>
            <div style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:10,padding:"13px 16px",marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:700,color:T.text2,textTransform:"uppercase",letterSpacing:".09em",marginBottom:6}}>Professional Summary</div>
              <p style={{fontSize:13,color:T.text2,lineHeight:1.7,margin:0,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{profile.summary}</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {[["Experience",`${profile.yoe} years`],["Location",profile.loc],["Education",profile.edu],["Industry",profile.industry],["Employer",profile.employer],["Availability",profile.avail?"Open to opportunities":"Not actively looking"]].map(([k,v])=><IRow key={k} label={k} value={v} T={T}/>)}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {["English (Fluent)","German (Native)","French (B2)","CKA Certified","AWS Solutions Architect","HashiCorp Terraform Associate"].map(c=><span key={c} className="tag" style={{background:T.violetDim,color:T.violet,border:`1px solid ${T.violet}25`,padding:"5px 11px",fontSize:12}}>{c}</span>)}
            </div>
          </div>:<div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {[["Experience",`${profile.yoe} years`],["Location",profile.loc],["Education",profile.edu],["Industry",profile.industry]].map(([k,v])=><IRow key={k} label={k} value={v} T={T}/>)}
            </div>
            <div style={{background:T.amberDim,border:`1px solid ${T.amber}30`,borderRadius:10,padding:"13px 16px",marginBottom:14}}>
              <div style={{fontSize:13,fontWeight:700,color:T.amber,marginBottom:4}}>🔒 Hidden Until Unlocked</div>
              <div style={{fontSize:13,color:T.text2,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Full name · Email address · Phone · LinkedIn · GitHub · Employer · Professional summary</div>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {["English (Fluent)","German (Native)","French (B2)","CKA Certified","AWS Solutions Architect"].map(c=><span key={c} className="tag" style={{background:T.violetDim,color:T.violet,border:`1px solid ${T.violet}25`,padding:"5px 11px",fontSize:12}}>{c}</span>)}
            </div>
          </div>}
        </div>}
        {tab==="skills"&&<div style={{animation:"fadeIn .3s ease"}}>
          <div className="htitle" style={{fontSize:16,marginBottom:14}}>Skills Match Analysis</div>
          {profile.skills.map((s,i)=>{const m=i<profile.matched;const pct=m?70+Math.floor(Math.abs(Math.sin(i*2.1))*24):12+Math.floor(Math.abs(Math.sin(i))*18);return <div key={s} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontFamily:"'Plus Jakarta Sans',sans-serif"}}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{width:7,height:7,borderRadius:"50%",background:m?T.green:T.border2}}/><span style={{fontSize:13,fontWeight:600,color:m?T.text:T.text3}}>{s}</span></div><span style={{fontSize:12,color:m?T.green:T.text3,fontWeight:600}}>{m?`✓ ${pct}%`:"Not indicated"}</span></div>
            <div className="pbt"><div style={{width:`${pct}%`,height:"100%",background:m?`linear-gradient(90deg,${T.teal},${T.green})`:T.border2,borderRadius:3}}/></div>
          </div>;})}
        </div>}
        {tab==="career"&&<div style={{animation:"fadeIn .3s ease"}}>
          <div className="htitle" style={{fontSize:16,marginBottom:16}}>Career Timeline {!unlocked&&<span style={{fontSize:12,fontWeight:400,fontFamily:"'Plus Jakarta Sans',sans-serif",color:T.text3}}>(anonymised)</span>}</div>
          {[{p:"2021–Present",r:profile.title,c:unlocked?profile.employer:"Current Employer (confidential)",cur:true},{p:"2018–2021",r:"Mid-level DevOps Engineer",c:unlocked?"Zühlke Engineering AG":"European Technology Consultancy"},{p:"2015–2018",r:"Junior Software Engineer",c:unlocked?"Ergon Informatik AG":"Swiss Software Consultancy"}].map((item,i)=><div key={i} style={{display:"flex",gap:14,marginBottom:4}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{width:11,height:11,borderRadius:"50%",background:item.cur?T.teal:T.border2,border:`2.5px solid ${item.cur?T.teal:T.border2}`,flexShrink:0,marginTop:3}}/>{i<2&&<div style={{width:2,flex:1,background:T.border,margin:"4px 0"}}/>}</div>
            <div style={{paddingBottom:18}}><div style={{fontSize:11,color:T.text3,marginBottom:2,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{item.p}</div><div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,color:T.text,marginBottom:2}}>{item.r}</div><div style={{fontSize:13,color:unlocked?T.teal:T.text3,fontStyle:unlocked?"normal":"italic",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{item.c}</div></div>
          </div>)}
        </div>}
        {tab==="insights"&&<div style={{animation:"fadeIn .3s ease"}}>
          <div style={{background:`linear-gradient(135deg,${T.tealDim},${T.blueDim})`,border:`1px solid ${T.tealBrd}`,borderRadius:11,padding:"15px 18px",marginBottom:16}}>
            <div style={{fontSize:11,fontWeight:700,color:T.teal,textTransform:"uppercase",letterSpacing:".09em",marginBottom:8}}>✦ AI Suitability Analysis</div>
            <p style={{fontSize:13,color:T.text2,lineHeight:1.7,margin:0,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>This profile is a <strong style={{color:T.text}}>strong match</strong>. Demonstrates {profile.matched}/{profile.skills.length} required skills with production evidence. {profile.yoe}-year trajectory shows consistent progression. Swiss location eliminates relocation risk.</p>
          </div>
          {[["Skills Alignment",92,T.teal],["Experience Level",88,T.green],["Location Fit",100,T.blue],["Industry Background",74,T.amber],["Education",82,T.teal]].map(([l,v,c])=><div key={l} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontFamily:"'Plus Jakarta Sans',sans-serif"}}><span style={{fontSize:13,color:T.text2,fontWeight:500}}>{l}</span><span style={{fontSize:13,color:c,fontWeight:700}}>{v}%</span></div>
            <div className="pbt"><div style={{width:`${v}%`,height:"100%",background:c,borderRadius:3,opacity:.85}}/></div>
          </div>)}
          {profile.score<75&&<div style={{background:T.redDim,border:`1px solid ${T.red}25`,borderRadius:10,padding:"11px 14px",marginTop:14}}><div style={{fontSize:12,fontWeight:700,color:T.red,marginBottom:3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>⚠ Gap Detected</div><div style={{fontSize:12,color:T.text2,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{profile.skills.length-profile.matched} required skills not evidenced. Review carefully before unlocking.</div></div>}
        </div>}
      </div>
      {/* Action bar */}
      <div style={{borderTop:`1px solid ${T.border}`,padding:"13px 24px",flexShrink:0,background:T.bg3}}>
        {!unlocked?<div style={{display:"flex",gap:9,alignItems:"center"}}>
          <button className="bs" onClick={()=>setInPool(p=>!p)} style={{flex:1,padding:"9px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,borderColor:inPool?T.tealBrd:undefined,color:inPool?T.teal:undefined,background:inPool?T.tealDim:undefined}}>{inPool?"✓ Shortlisted":"❑ Shortlist"}</button>
          <button className="bs" onClick={()=>setInPipe(p=>!p)} style={{flex:1,padding:"9px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,borderColor:inPipe?T.tealBrd:undefined,color:inPipe?T.teal:undefined,background:inPipe?T.tealDim:undefined}}>{inPipe?"✓ In Pipeline":"⟳ Pipeline"}</button>
          <button className="bp" onClick={()=>setShowUnlock(true)} style={{padding:"9px 24px",fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,borderRadius:9,flexShrink:0}}>🔓 Unlock — 1 credit</button>
        </div>:<div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:9,marginBottom:9}}>
            <button className="bs" onClick={()=>{setInPool(true);onPool(profile);}} style={{padding:"9px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,borderColor:inPool?T.tealBrd:undefined,color:inPool?T.teal:undefined,background:inPool?T.tealDim:undefined}}>{inPool?"✓ In Pool":"❑ Add to Pool"}</button>
            <button className="bs" onClick={()=>{setInPipe(true);onPipeline(profile);}} style={{padding:"9px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,borderColor:inPipe?T.tealBrd:undefined,color:inPipe?T.teal:undefined,background:inPipe?T.tealDim:undefined}}>{inPipe?"✓ In Pipeline":"⟳ Add to Pipeline"}</button>
            <button onClick={()=>{if(onOutreach)onOutreach(profile);}} style={{padding:"9px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,borderRadius:9,border:`1px solid ${T.blue}30`,background:`${T.blue}0C`,color:T.blue,cursor:"pointer",transition:"all .15s"}}>✉ Outreach</button>
            <button onClick={()=>setShowInt(true)} disabled={intDone} style={{padding:"9px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,borderRadius:9,border:`1px solid ${T.violet}30`,background:intDone?T.violetDim:`${T.violet}0C`,color:T.violet,cursor:intDone?"default":"pointer",transition:"all .15s"}}>{intDone?"✓ Scheduled":"◷ AI Interview – 3 cr"}</button>
          </div>
          <div style={{display:"flex",gap:9}}>
            <select value={assignJob} onChange={e=>setAssignJob(e.target.value)} className="inp" style={{flex:1,padding:"8px 12px"}}>
              <option value="">Assign to a job pipeline…</option>
              {JOBS.map(j=><option key={j.id} value={j.id}>{j.title} · {j.location}</option>)}
            </select>
            <button onClick={()=>{if(assignJob){onPipeline(profile);setInPipe(true);setAssignJob("");}}} className="bt" disabled={!assignJob} style={{padding:"8px 18px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,flexShrink:0}}>Assign →</button>
          </div>
        </div>}
      </div>
      {/* Unlock sub-modal */}
      {showUnlock&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.68)",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:18,backdropFilter:"blur(6px)",zIndex:10,animation:"fadeIn .2s ease"}}>
        <div style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:15,padding:"28px 32px",width:"min(420px,90%)",boxShadow:`0 24px 64px ${T.shadow2}`}}>
          <div style={{textAlign:"center",marginBottom:18}}><div style={{fontSize:34,marginBottom:7}}>🔓</div><h3 className="htitle" style={{fontSize:18,marginBottom:5}}>Unlock Profile</h3><p style={{fontSize:13,color:T.text2,lineHeight:1.55,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Full contact details revealed immediately.</p></div>
          <div style={{display:"flex",justifyContent:"space-between",background:T.bg3,border:`1px solid ${T.border}`,borderRadius:10,padding:"13px 17px",marginBottom:16}}>
            <div><div style={{fontSize:11,color:T.text3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:3,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Cost</div><div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:24,color:T.teal}}>1 credit</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:11,color:T.text3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:3,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Balance After</div><div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:24,color:credits-1<10?T.red:T.text}}>{credits-1}</div></div>
          </div>
          <label style={{display:"flex",gap:10,alignItems:"flex-start",cursor:"pointer",marginBottom:18,padding:"11px 13px",background:T.amberDim,border:`1px solid ${T.amber}28`,borderRadius:9}}>
            <input type="checkbox" checked={aC} onChange={e=>setAC(e.target.checked)} style={{accentColor:T.teal,width:14,height:14,marginTop:1,flexShrink:0}}/>
            <span style={{fontSize:12,color:T.text2,lineHeight:1.6,fontFamily:"'Plus Jakarta Sans',sans-serif"}}><strong style={{color:T.amber}}>GDPR:</strong> I confirm legitimate recruitment purpose. Candidate will be notified automatically.</span>
          </label>
          <div style={{display:"flex",gap:9}}>
            <button className="bs" onClick={()=>{setShowUnlock(false);setAC(false);}} style={{flex:1,padding:"10px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Cancel</button>
            <button className="bp" onClick={doUnlock} disabled={!aC||unlocking} style={{flex:2,padding:"10px",fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
              {unlocking?<><span style={{animation:"spin .8s linear infinite",display:"inline-block"}}>↻</span>Unlocking…</>:"Confirm Unlock"}
            </button>
          </div>
        </div>
      </div>}
      {/* AI Interview sub-modal */}
      {showInt&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.68)",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:18,backdropFilter:"blur(6px)",zIndex:10,animation:"fadeIn .2s ease"}}>
        <div style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:15,padding:"28px 32px",width:"min(420px,90%)",boxShadow:`0 24px 64px ${T.shadow2}`}}>
          <div style={{textAlign:"center",marginBottom:18}}><div style={{fontSize:34,marginBottom:7}}>🎙</div><h3 className="htitle" style={{fontSize:18,marginBottom:5}}>Schedule AI Interview</h3></div>
          <div style={{background:T.bg3,border:`1px solid ${T.violet}22`,borderRadius:10,padding:"13px 17px",marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:9}}>
              <div><div style={{fontSize:11,color:T.text3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:3,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Cost</div><div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:24,color:T.violet}}>3 credits</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:11,color:T.text3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:3,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>After</div><div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:24,color:credits-3<10?T.red:T.text}}>{credits-3}</div></div>
            </div>
            <div style={{fontSize:12,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Custom screening · Auto scoring · Video analysis · Written report</div>
          </div>
          <label style={{display:"flex",gap:10,alignItems:"flex-start",cursor:"pointer",marginBottom:18,padding:"11px 13px",background:T.violetDim,border:`1px solid ${T.violet}20`,borderRadius:9}}>
            <input type="checkbox" checked={iC} onChange={e=>setIC(e.target.checked)} style={{accentColor:T.violet,width:14,height:14,marginTop:1,flexShrink:0}}/>
            <span style={{fontSize:12,color:T.text2,lineHeight:1.6,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>I confirm GDPR compliance and consent for AI interview processing.</span>
          </label>
          <div style={{display:"flex",gap:9}}>
            <button className="bs" onClick={()=>{setShowInt(false);setIC(false);}} style={{flex:1,padding:"10px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Cancel</button>
            <button onClick={doInt} disabled={!iC||scheduling} style={{flex:2,padding:"10px",fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,borderRadius:9,border:"none",cursor:iC?"pointer":"default",background:iC?`linear-gradient(135deg,${T.violet},#a855f7)`:"rgba(0,0,0,.07)",color:iC?"#fff":T.text3,display:"flex",alignItems:"center",justifyContent:"center",gap:7,transition:"all .2s"}}>
              {scheduling?<><span style={{animation:"spin .8s linear infinite",display:"inline-block"}}>↻</span>Scheduling…</>:"◷ Schedule Interview"}
            </button>
          </div>
        </div>
      </div>}
    </div>
  </div>;
}

/* ── CANDIDATE POOL PAGE ── */
function CandidatePoolPage({poolCandidates,onProfile,T}) {
  const [search,setSearch]=useState("");
  const [filterJob,setFilterJob]=useState("all");
  const [selIds,setSelIds]=useState([]);
  const [showAssign,setShowAssign]=useState(false);
  const [assignJobId,setAssignJobId]=useState("");
  const [assignDone,setAssignDone]=useState(false);
  const filtered=poolCandidates.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())||c.title.toLowerCase().includes(search.toLowerCase())).filter(c=>filterJob==="all"||(filterJob==="unassigned"?!c.assignedJob:String(c.assignedJob)===filterJob));
  const toggle=id=>setSelIds(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  function doAssign(){setAssignDone(true);setTimeout(()=>{setShowAssign(false);setAssignDone(false);setSelIds([]);setAssignJobId("");},1500);}
  if(!poolCandidates.length)return <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40,background:T.bg}}>
    <div style={{fontSize:50,marginBottom:14,opacity:.18}}>❑</div>
    <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:T.text2,marginBottom:8}}>Candidate Pool is Empty</h3>
    <p style={{fontSize:14,color:T.text3,textAlign:"center",maxWidth:340,lineHeight:1.6,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Unlock profiles in the AI Sourcing Hub and add them to your pool to manage them here.</p>
  </div>;
  return <div style={{flex:1,overflowY:"auto",padding:"24px 28px",background:T.bg}}>
    <div style={{maxWidth:1060,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div><h2 className="htitle" style={{fontSize:20,marginBottom:3}}>Candidate Pool</h2><p style={{fontSize:13,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{poolCandidates.length} candidates · {selIds.length} selected</p></div>
        {selIds.length>0&&<div style={{display:"flex",gap:8}}><button className="bs" onClick={()=>setSelIds([])} style={{padding:"8px 13px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Clear</button><button className="bp" onClick={()=>setShowAssign(true)} style={{padding:"8px 18px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700}}>Assign {selIds.length} to Job →</button></div>}
      </div>
      <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
        <div style={{position:"relative",flex:1,minWidth:200}}><span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:T.text3}}>🔍</span><input className="inp" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search candidates…" style={{paddingLeft:34}}/></div>
        <select className="inp" value={filterJob} onChange={e=>setFilterJob(e.target.value)} style={{width:200,padding:"9px 13px"}}><option value="all">All</option><option value="unassigned">Unassigned</option>{JOBS.map(j=><option key={j.id} value={String(j.id)}>{j.title}</option>)}</select>
        <button className="bs" onClick={()=>setSelIds(filtered.map(c=>c.id))} style={{padding:"9px 13px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Select All</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:18}}>
        {[["Total",poolCandidates.length,T.teal],["Assigned",poolCandidates.filter(c=>c.assignedJob).length,T.blue],["Unassigned",poolCandidates.filter(c=>!c.assignedJob).length,T.amber],["Avg Score",Math.round(poolCandidates.reduce((a,c)=>a+c.score,0)/poolCandidates.length)+"%",T.green]].map(([l,v,c])=><div key={l} style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:11,padding:"13px 15px",boxShadow:`0 1px 4px ${T.shadow}`}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:22,color:c,marginBottom:2}}>{v}</div>
          <div style={{fontSize:12,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{l}</div>
        </div>)}
      </div>
      <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:13,overflow:"hidden",boxShadow:`0 2px 8px ${T.shadow}`}}>
        <div style={{display:"grid",gridTemplateColumns:"30px 40px 1fr 110px 110px 100px 150px 70px",gap:10,padding:"10px 15px",background:T.bg3,borderBottom:`1px solid ${T.border}`,alignItems:"center"}}>
          <input type="checkbox" checked={selIds.length===filtered.length&&filtered.length>0} onChange={e=>e.target.checked?setSelIds(filtered.map(c=>c.id)):setSelIds([])} style={{accentColor:T.teal,width:13,height:13,cursor:"pointer"}}/>
          {["","Candidate","Score","Location","Exp","Assigned Job",""].map((h,i)=><div key={i} style={{fontSize:11,fontWeight:700,color:T.text3,textTransform:"uppercase",letterSpacing:".07em",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{h}</div>)}
        </div>
        {filtered.length===0?<div style={{padding:26,textAlign:"center",fontSize:14,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>No candidates match filters</div>:filtered.map((c,i)=>{
          const job=JOBS.find(j=>String(j.id)===String(c.assignedJob));const sel=selIds.includes(c.id);
          return <div key={c.id} style={{display:"grid",gridTemplateColumns:"30px 40px 1fr 110px 110px 100px 150px 70px",gap:10,padding:"11px 15px",borderBottom:i<filtered.length-1?`1px solid ${T.border}`:"none",alignItems:"center",background:sel?T.tealDim:"transparent",transition:"background .12s",cursor:"pointer"}}
            onClick={()=>onProfile(c)}
            onMouseEnter={e=>{if(!sel)e.currentTarget.style.background=T.cardHover;}}
            onMouseLeave={e=>{if(!sel)e.currentTarget.style.background="transparent";}}>
            <input type="checkbox" checked={sel} onChange={()=>toggle(c.id)} onClick={e=>e.stopPropagation()} style={{accentColor:T.teal,width:13,height:13,cursor:"pointer"}}/>
            <Av idx={c.av} size={32} name={c.name} T={T}/>
            <div><div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:13,color:T.text,marginBottom:1}}>{c.name}</div><div style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{c.title}</div></div>
            <ScB score={c.score} T={T}/>
            <div style={{fontSize:12,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>📍 {c.loc.split(",")[0]}</div>
            <div style={{fontSize:12,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>⏱ {c.yoe} yrs</div>
            <div>{job?<span className="tag" style={{background:T.blueDim,color:T.blue,border:`1px solid ${T.blue}25`,fontSize:11,maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block"}}>{job.title}</span>:<span className="tag" style={{background:T.amberDim,color:T.amber,border:`1px solid ${T.amber}25`,fontSize:11}}>Unassigned</span>}</div>
            <button onClick={e=>{e.stopPropagation();onProfile(c);}} className="bt" style={{padding:"4px 9px",fontSize:11,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,borderRadius:7}}>View</button>
          </div>;
        })}
      </div>
    </div>
    {showAssign&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)",animation:"fadeIn .2s ease"}} onClick={()=>setShowAssign(false)}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:16,padding:"28px 32px",width:"min(440px,94vw)",boxShadow:`0 24px 64px ${T.shadow2}`,animation:"popIn .25s ease"}}>
        <h3 className="htitle" style={{fontSize:18,marginBottom:5}}>Assign to Job Pipeline</h3>
        <p style={{fontSize:13,color:T.text2,marginBottom:16,lineHeight:1.6,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{selIds.length} candidate{selIds.length!==1?"s":""} will be added to the selected job pipeline.</p>
        <div style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:9,padding:"10px 12px",marginBottom:14,maxHeight:110,overflowY:"auto"}}>
          {selIds.map(id=>{const c=poolCandidates.find(x=>x.id===id);return c?<div key={id} style={{display:"flex",alignItems:"center",gap:9,marginBottom:5}}><Av idx={c.av} size={24} name={c.name} T={T}/><span style={{fontSize:13,color:T.text,fontWeight:500,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{c.name}</span><span style={{fontSize:11,color:T.text3,marginLeft:"auto",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{c.title}</span></div>:null;})}
        </div>
        <select className="inp" value={assignJobId} onChange={e=>setAssignJobId(e.target.value)} style={{marginBottom:16,padding:"10px 13px"}}><option value="">Choose a job role…</option>{JOBS.map(j=><option key={j.id} value={j.id}>{j.title} · {j.location} ({j.open} open)</option>)}</select>
        {assignDone&&<div style={{background:T.greenDim,border:`1px solid ${T.green}30`,borderRadius:9,padding:"10px 13px",marginBottom:13,fontSize:13,color:T.green,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>✓ Assigned successfully!</div>}
        <div style={{display:"flex",gap:9}}>
          <button className="bs" onClick={()=>setShowAssign(false)} style={{flex:1,padding:"10px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Cancel</button>
          <button className="bp" onClick={doAssign} disabled={!assignJobId||assignDone} style={{flex:2,padding:"10px",fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>{assignDone?<><span style={{animation:"spin .8s linear infinite",display:"inline-block"}}>↻</span>Assigning…</>:"Confirm →"}</button>
        </div>
      </div>
    </div>}
  </div>;
}

/* ── JOB PIPELINE PAGE ── */
function PipelinePage({pipelineCandidates,onStartSourcing,onProfile,T}) {
  const [activeJob,setActiveJob]=useState(JOBS[0].id);
  const job=JOBS.find(j=>j.id===activeJob)||JOBS[0];
  const candidates=pipelineCandidates.filter(c=>String(c.assignedJob)===String(activeJob));
  const STAGES=["Sourced","Contacted","Screening","Interview","Offer","Hired"];
  const stageColors=[T.teal,T.blue,T.violet,T.amber,T.green,T.green];
  // Demo: distribute however many candidates we have across stages
  function getStageCands(si) {
    return candidates.filter((_,ci)=>ci%STAGES.length===si);
  }
  // If no real candidates, show placeholder cards for first 3 stages
  const DEMO=PROFILES.slice(0,5).map(p=>({...p,assignedJob:activeJob}));
  const displayCandidates=candidates.length>0?candidates:DEMO;
  function getDisplayStage(si){return displayCandidates.filter((_,ci)=>ci%STAGES.length===si);}

  return <div style={{flex:1,display:"flex",overflow:"hidden",background:T.bg}}>
    {/* Job list sidebar */}
    <div style={{width:228,background:T.bg2,borderRight:`1px solid ${T.border}`,padding:"14px 9px",overflowY:"auto",flexShrink:0}}>
      <div style={{fontSize:11,fontWeight:700,color:T.text3,textTransform:"uppercase",letterSpacing:".09em",marginBottom:12,padding:"0 5px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Open Roles</div>
      {JOBS.map(j=><button key={j.id} onClick={()=>setActiveJob(j.id)} style={{width:"100%",padding:"11px 12px",borderRadius:9,border:`1px solid ${activeJob===j.id?T.tealBrd:T.border}`,background:activeJob===j.id?T.tealDim:T.surface,cursor:"pointer",textAlign:"left",marginBottom:6,transition:"all .15s",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
        <div style={{fontSize:13,fontWeight:700,color:activeJob===j.id?T.teal:T.text,marginBottom:2,fontFamily:"'Playfair Display',serif"}}>{j.title}</div>
        <div style={{fontSize:11,color:T.text3,marginBottom:5}}>{j.dept} · {j.location}</div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span className="tag" style={{background:T.greenDim,color:T.green,border:`1px solid ${T.green}28`,fontSize:10}}>{j.open} open</span>
          <span style={{fontSize:11,color:T.text3}}>{pipelineCandidates.filter(c=>String(c.assignedJob)===String(j.id)).length} candidates</span>
        </div>
      </button>)}
    </div>

    {/* Pipeline main */}
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      {/* Job header */}
      <div style={{background:T.bg2,borderBottom:`1px solid ${T.border}`,padding:"14px 22px",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16}}>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4,flexWrap:"wrap"}}>
              <h2 className="htitle" style={{fontSize:17}}>{job.title}</h2>
              <span className="tag" style={{background:T.greenDim,color:T.green,border:`1px solid ${T.green}28`}}>{job.open} open</span>
              <span style={{fontSize:13,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>📍 {job.location} · {job.dept}</span>
            </div>
            <div style={{padding:"9px 13px",background:T.bg3,border:`1px solid ${T.border}`,borderRadius:9,fontSize:12,color:T.text2,lineHeight:1.6,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              <strong style={{color:T.text}}>JD:</strong> {job.jd}
            </div>
          </div>
          {/* KEY FEATURE: Source Candidates for this Role */}
          <button className="bp" onClick={()=>onStartSourcing(job)} style={{padding:"10px 20px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,display:"flex",alignItems:"center",gap:8,flexShrink:0,borderRadius:9,whiteSpace:"nowrap"}}>
            ◎ Source Candidates for this Role
          </button>
        </div>
      </div>

      {/* Kanban board */}
      <div style={{flex:1,overflowX:"auto",overflowY:"hidden",padding:"18px 18px",display:"flex",gap:13,alignItems:"flex-start"}}>
        {STAGES.map((stage,si)=>{
          const stageCands=getDisplayStage(si);
          const col=stageColors[si];
          return <div key={stage} style={{minWidth:186,flexShrink:0,display:"flex",flexDirection:"column",gap:9}}>
            {/* Stage header */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:T.bg2,border:`1px solid ${T.border}`,borderRadius:9}}>
              <span style={{fontSize:11,fontWeight:700,color:col,textTransform:"uppercase",letterSpacing:".07em",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{stage}</span>
              <span style={{fontSize:11,background:`${col}18`,color:col,border:`1px solid ${col}30`,borderRadius:10,padding:"1px 8px",fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{stageCands.length}</span>
            </div>
            {/* Cards */}
            {stageCands.map(c=><div key={c.id} onClick={()=>onProfile({...c,_forceUnlocked:true})} style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:11,padding:"12px 13px",cursor:"pointer",transition:"all .15s",boxShadow:`0 1px 4px ${T.shadow}`}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=col+"44";e.currentTarget.style.boxShadow=`0 4px 14px ${T.shadow2}`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.boxShadow=`0 1px 4px ${T.shadow}`;}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                <Av idx={c.av} size={30} name={c.name} T={T}/>
                <div style={{minWidth:0}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:12,color:T.text,lineHeight:1.2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
                  <div style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.title}</div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <ScB score={c.score} T={T}/>
                <span style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>📍 {c.loc.split(",")[0]}</span>
              </div>
            </div>)}
            {/* Add card placeholder */}
            {stageCands.length===0&&<div style={{border:`1.5px dashed ${T.border}`,borderRadius:11,padding:"14px",textAlign:"center",cursor:"default"}}>
              <div style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>No candidates</div>
            </div>}
          </div>;
        })}
      </div>

      {/* Empty state sourcing CTA */}
      {candidates.length===0&&<div style={{position:"absolute",bottom:40,left:"50%",transform:"translateX(-50%)",background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 28px",boxShadow:`0 8px 32px ${T.shadow2}`,display:"flex",alignItems:"center",gap:16,pointerEvents:"none",zIndex:0}}>
        <span style={{fontSize:20,opacity:.5}}>💡</span>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,color:T.text,marginBottom:2}}>Demo data shown</div>
          <div style={{fontSize:12,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Add real candidates via Pool or Source Candidates button above</div>
        </div>
      </div>}
    </div>
  </div>;
}

/* ── CREDITS DASHBOARD ── */
function CreditsDash({credits,unlocked,interviews,T}) {
  const TOTAL=220,used=TOTAL-credits,ulCost=unlocked,inCost=interviews*3;
  const pct=v=>Math.min(100,Math.round((v/TOTAL)*100));
  return <div style={{flex:1,overflowY:"auto",padding:"28px 36px",background:T.bg}}>
    <div style={{maxWidth:880,margin:"0 auto"}}>
      <div style={{marginBottom:22}}><h2 className="htitle" style={{fontSize:22,marginBottom:4}}>Credits Dashboard</h2><p style={{fontSize:14,color:T.text2,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Track your credit balance and usage</p></div>
      {/* Balance hero */}
      <div style={{background:`linear-gradient(135deg,${T.tealDim},${T.blueDim})`,border:`1px solid ${T.tealBrd}`,borderRadius:18,padding:"26px 30px",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:36,flexWrap:"wrap"}}>
          <div style={{flexShrink:0}}>
            <div style={{fontSize:11,color:T.text3,textTransform:"uppercase",letterSpacing:".09em",marginBottom:4,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Available Balance</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:800,fontSize:56,color:T.teal,lineHeight:1}}>{credits}</div>
            <div style={{fontSize:13,color:T.text2,marginTop:3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>credits of {TOTAL} purchased</div>
          </div>
          <div style={{flex:1,minWidth:240}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontFamily:"'Plus Jakarta Sans',sans-serif"}}><span style={{fontSize:12,color:T.text3}}>Used: {used}</span><span style={{fontSize:12,color:T.teal,fontWeight:600}}>{100-pct(used)}% remaining</span></div>
            <div style={{height:9,background:T.surface2,borderRadius:5,overflow:"hidden",marginBottom:16}}><div style={{width:`${pct(used)}%`,height:"100%",background:`linear-gradient(90deg,${T.teal},${T.blue})`,borderRadius:5}}/></div>
            {[["Profile Unlocks",ulCost,T.teal,`${unlocked} × 1 cr`],["AI Interviews",inCost,T.violet,`${interviews} × 3 cr`]].map(([l,v,c,s])=><div key={l} style={{display:"flex",alignItems:"center",gap:10,marginBottom:7}}>
              <div style={{width:8,height:8,borderRadius:2,background:c,flexShrink:0}}/>
              <span style={{fontSize:12,color:T.text2,width:120,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{l}</span>
              <div style={{flex:1,height:5,background:T.surface2,borderRadius:3,overflow:"hidden"}}><div style={{width:`${pct(v)}%`,height:"100%",background:c,borderRadius:3}}/></div>
              <span style={{fontSize:11,color:T.text3,width:70,textAlign:"right",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{s}</span>
              <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,color:c,width:24,textAlign:"right"}}>{v}</span>
            </div>)}
          </div>
        </div>
      </div>
      {/* Stat cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:11,marginBottom:20}}>
        {[["⬡","Purchased",TOTAL,T.text2,"Growth Bundle"],["🔓","Unlocked",unlocked,T.teal,`${ulCost} credits`],["🎙","AI Interviews",interviews,T.violet,`${inCost} credits`],["💰","Balance",credits,T.green,"Current"]].map(([ico,l,v,c,s])=><div key={l} style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:12,padding:"16px 16px",boxShadow:`0 1px 4px ${T.shadow}`}}>
          <div style={{fontSize:17,marginBottom:8}}>{ico}</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:24,color:c,marginBottom:2}}>{v}</div>
          <div style={{fontSize:13,color:T.text,fontWeight:600,marginBottom:2,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{l}</div>
          <div style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{s}</div>
        </div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        {/* Pricing */}
        <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px",boxShadow:`0 1px 4px ${T.shadow}`}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:T.text,marginBottom:14}}>Credit Costs</div>
          {[["🔍","Search & Preview","Free","Unlimited, anonymised"],["🔓","Unlock Profile","1 credit","Full PII revealed"],["✦","Smart Shortlist","10 credits","Top 10 AI-selected, all unlocked"],["🎙","AI Screening","3 credits","Scoring + video report"],["📋","AI Skills Interview","5 credits","Deep technical assessment"]].map(([ico,l,cost,d])=><div key={l} style={{display:"flex",alignItems:"flex-start",gap:11,padding:"10px 0",borderBottom:`1px solid ${T.border}`}}>
            <span style={{fontSize:15,flexShrink:0}}>{ico}</span>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:13,fontWeight:600,color:T.text,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{l}</span><span style={{background:T.tealDim,color:T.teal,border:`1px solid ${T.tealBrd}`,borderRadius:20,padding:"2px 9px",fontSize:11,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{cost}</span></div>
              <span style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{d}</span>
            </div>
          </div>)}
        </div>
        {/* Top-up */}
        <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px",boxShadow:`0 1px 4px ${T.shadow}`}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:T.text,marginBottom:14}}>Top Up Credits</div>
          {[["Starter","50 credits","CHF 49",null],["Growth","220 credits","CHF 179","Best value"],["Professional","500 credits","CHF 369","+15% bonus"],["Enterprise","Custom","Custom","Volume pricing"]].map(([n,cr,p,badge])=><div key={n} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 13px",borderRadius:10,border:`1px solid ${T.border}`,marginBottom:7,background:T.bg3,transition:"all .2s",cursor:"pointer"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.tealBrd;e.currentTarget.style.background=T.tealDim;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.background=T.bg3;}}>
            <div><div style={{display:"flex",alignItems:"center",gap:7,marginBottom:2}}><span style={{fontSize:14,fontWeight:700,color:T.text,fontFamily:"'Playfair Display',serif"}}>{n}</span>{badge&&<span className="tag" style={{background:T.amberDim,color:T.amber,border:`1px solid ${T.amber}25`,fontSize:10}}>{badge}</span>}</div><span style={{fontSize:12,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{cr}</span></div>
            <div style={{textAlign:"right"}}><div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:15,color:T.teal}}>{p}</div><div style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>per bundle</div></div>
          </div>)}
        </div>
      </div>
      {/* Transactions */}
      <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px",boxShadow:`0 1px 4px ${T.shadow}`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:T.text}}>Transaction History</div>
          <button className="bs" style={{padding:"7px 13px",fontSize:12,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>⬇ Export CSV</button>
        </div>
        {TX_HISTORY.map((tx,i)=><div key={tx.id} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 0",borderBottom:i<TX_HISTORY.length-1?`1px solid ${T.border}`:"none"}}>
          <div style={{width:33,height:33,borderRadius:9,background:tx.type==="topup"?T.greenDim:tx.type==="interview"?T.violetDim:tx.type==="smartlist"?T.amberDim:T.tealDim,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{tx.icon}</div>
          <div style={{flex:1}}><div style={{fontSize:13,color:T.text,fontWeight:500,marginBottom:1,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{tx.label}</div><div style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{tx.date}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,color:tx.type==="topup"?T.green:T.text2}}>{tx.type==="topup"?`+${Math.abs(tx.cost)}`:`−${tx.cost}`}</div><div style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>credits</div></div>
        </div>)}
      </div>
    </div>
  </div>;
}

/* ── CORPORATE HR DASHBOARD ── */
function DashboardPage({credits,unlocked,pooled,piped,interviews,onNavigate,T}) {
  const totalOutreach=OUTREACH_RECORDS.length;
  const responded=OUTREACH_RECORDS.filter(r=>r.status==="Responded"||r.status==="Meeting Booked").length;
  const meetings=OUTREACH_RECORDS.filter(r=>r.status==="Meeting Booked").length;
  const notifCount=NOTIFICATION_LOG.length;
  const optOuts=NOTIFICATION_LOG.filter(n=>n.optedOut).length;
  const bounces=NOTIFICATION_LOG.filter(n=>n.status==="Bounced").length;

  return <div style={{flex:1,overflowY:"auto",padding:"28px 36px",background:T.bg}}>
    <div style={{maxWidth:960,margin:"0 auto"}}>
      {/* Welcome banner */}
      <div style={{background:`linear-gradient(135deg,${T.tealDim},${T.blueDim})`,border:`1px solid ${T.tealBrd}`,borderRadius:18,padding:"28px 32px",marginBottom:22}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
          <div>
            <h1 className="htitle" style={{fontSize:24,marginBottom:6}}>Welcome back, Sarah</h1>
            <p style={{fontSize:14,color:T.text2,lineHeight:1.6,fontFamily:"'Plus Jakarta Sans',sans-serif",maxWidth:480}}>Here's your recruitment sourcing overview for Novartis AG. Track your pipeline, outreach, and compliance status at a glance.</p>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button className="bp" onClick={()=>onNavigate("sourcing")} style={{padding:"10px 20px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,borderRadius:9,display:"flex",alignItems:"center",gap:7}}>◎ Source Candidates</button>
            <button className="bs" onClick={()=>onNavigate("credits")} style={{padding:"10px 16px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,display:"flex",alignItems:"center",gap:7}}>⬡ Buy Credits</button>
          </div>
        </div>
      </div>

      {/* KPI cards - row 1 */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:11,marginBottom:18}}>
        {[
          ["⬡","Credits",credits,T.teal,"Available"],
          ["🔓","Unlocked",unlocked,T.blue,`${unlocked} credits used`],
          ["❑","In Pool",pooled,T.green,"Candidates"],
          ["⟳","Pipeline",piped,T.violet,"Active"],
          ["🎙","Interviews",interviews,T.amber,`${interviews*3} credits`],
        ].map(([ico,l,v,c,s])=><div key={l} onClick={()=>onNavigate(l==="Credits"?"credits":l==="In Pool"?"pool":l==="Pipeline"?"pipeline":l==="Interviews"?"interviews":"sourcing")} style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:12,padding:"16px 16px",boxShadow:`0 1px 4px ${T.shadow}`,cursor:"pointer",transition:"all .15s"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=`${c}44`;e.currentTarget.style.transform="translateY(-2px)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.transform="none";}}>
          <div style={{fontSize:17,marginBottom:8}}>{ico}</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:24,color:c,marginBottom:2}}>{v}</div>
          <div style={{fontSize:13,color:T.text,fontWeight:600,marginBottom:2,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{l}</div>
          <div style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{s}</div>
        </div>)}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:18}}>
        {/* Outreach summary */}
        <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px",boxShadow:`0 1px 4px ${T.shadow}`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:T.text}}>Outreach Overview</div>
            <button className="bt" onClick={()=>onNavigate("outreach")} style={{padding:"5px 12px",fontSize:11,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600}}>View All →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
            {[["Contacted",totalOutreach,T.blue],["Responded",responded,T.green],["Meetings",meetings,T.teal]].map(([l,v,c])=><div key={l} style={{textAlign:"center",padding:"12px",background:`${c}0C`,border:`1px solid ${c}22`,borderRadius:10}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:22,color:c}}>{v}</div>
              <div style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif",marginTop:2}}>{l}</div>
            </div>)}
          </div>
          {/* Response rate bar */}
          <div style={{marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:5}}>
              <span style={{color:T.text2}}>Response Rate</span>
              <span style={{color:T.green,fontWeight:700}}>{totalOutreach?Math.round(responded/totalOutreach*100):0}%</span>
            </div>
            <div style={{height:7,background:T.surface2,borderRadius:4,overflow:"hidden"}}>
              <div style={{width:`${totalOutreach?Math.round(responded/totalOutreach*100):0}%`,height:"100%",background:`linear-gradient(90deg,${T.teal},${T.green})`,borderRadius:4}}/>
            </div>
          </div>
          {/* Funnel stages */}
          {OUTREACH_STATUSES.map((s,i)=>{
            const count=OUTREACH_RECORDS.filter(r=>r.status===s).length;
            return <div key={s} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderTop:i>0?`1px solid ${T.border}`:"none"}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:[T.text3,T.blue,T.green,T.teal][i],flexShrink:0}}/>
              <span style={{fontSize:12,color:T.text2,flex:1,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{s}</span>
              <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,color:T.text}}>{count}</span>
            </div>;
          })}
        </div>

        {/* Compliance & notifications */}
        <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px",boxShadow:`0 1px 4px ${T.shadow}`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:T.text}}>Compliance Status</div>
            <button className="bt" onClick={()=>onNavigate("notifications")} style={{padding:"5px 12px",fontSize:11,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600}}>View Log →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
            {[["Notifications",notifCount,T.blue],["Opt-outs",optOuts,T.amber],["Bounced",bounces,T.red]].map(([l,v,c])=><div key={l} style={{textAlign:"center",padding:"12px",background:`${c}0C`,border:`1px solid ${c}22`,borderRadius:10}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:22,color:c}}>{v}</div>
              <div style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif",marginTop:2}}>{l}</div>
            </div>)}
          </div>
          {/* Compliance checklist */}
          <div style={{fontSize:12,fontWeight:700,color:T.text,marginBottom:10,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>GDPR / nDSG Compliance Checklist</div>
          {[
            ["GDPR Art. 14 notifications active",true],
            ["Opt-out mechanism live & tested",true],
            ["Data retention policy enforced (12 mo)",true],
            ["DPA signed with data providers",true],
            ["Audit log operational (3-year retention)",true],
            [optOuts>0?`${optOuts} opt-out(s) processed & propagated`:"No opt-outs pending",optOuts>0],
            [bounces>0?`${bounces} bounced notification(s) — review required`:null,false],
          ].filter(([text])=>text).map(([text,ok],i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"6px 0"}}>
            <span style={{fontSize:12,flexShrink:0,marginTop:1}}>{ok?"✅":"⚠️"}</span>
            <span style={{fontSize:12,color:ok?T.text2:T.amber,fontFamily:"'Plus Jakarta Sans',sans-serif",lineHeight:1.5}}>{text}</span>
          </div>)}
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div style={{display:"grid",gridTemplateColumns:"1.4fr 0.6fr",gap:16}}>
        {/* Activity feed */}
        <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px",boxShadow:`0 1px 4px ${T.shadow}`}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:T.text,marginBottom:14}}>Recent Activity</div>
          {TX_HISTORY.slice(0,6).map((tx,i)=><div key={tx.id} style={{display:"flex",alignItems:"center",gap:11,padding:"9px 0",borderBottom:i<5?`1px solid ${T.border}`:"none"}}>
            <div style={{width:33,height:33,borderRadius:9,background:tx.type==="topup"?T.greenDim:tx.type==="interview"?T.violetDim:tx.type==="smartlist"?T.amberDim:T.tealDim,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{tx.icon}</div>
            <div style={{flex:1}}><div style={{fontSize:13,color:T.text,fontWeight:500,marginBottom:1,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{tx.label}</div><div style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{tx.date}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,color:tx.type==="topup"?T.green:T.text2}}>{tx.type==="topup"?`+${Math.abs(tx.cost)}`:`−${tx.cost}`}</div></div>
          </div>)}
        </div>

        {/* Quick actions */}
        <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px",boxShadow:`0 1px 4px ${T.shadow}`}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:T.text,marginBottom:14}}>Quick Actions</div>
          {[
            ["◎","Source Candidates","Search passive candidates","sourcing",T.teal],
            ["✉","Send Outreach","Contact unlocked profiles","outreach",T.blue],
            ["⟳","View Pipelines","Track candidate progress","pipeline",T.violet],
            ["🔔","Notification Log","GDPR compliance audit","notifications",T.amber],
            ["⬡","Buy Credits","Top up credit balance","credits",T.green],
          ].map(([ico,l,desc,target,c])=><button key={l} onClick={()=>onNavigate(target)} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"11px 13px",borderRadius:10,border:`1px solid ${T.border}`,background:T.bg3,cursor:"pointer",marginBottom:7,transition:"all .15s",fontFamily:"'Plus Jakarta Sans',sans-serif",textAlign:"left"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${c}44`;e.currentTarget.style.background=`${c}0C`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.background=T.bg3;}}>
            <span style={{fontSize:17,flexShrink:0}}>{ico}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600,color:T.text}}>{l}</div>
              <div style={{fontSize:11,color:T.text3}}>{desc}</div>
            </div>
            <span style={{fontSize:12,color:T.text3}}>→</span>
          </button>)}
        </div>
      </div>
    </div>
  </div>;
}

/* ── OUTREACH HUB PAGE ── */
function OutreachPage({onProfile,onNavigate,addToast,T}) {
  const [filter,setFilter]=useState("all");
  const [selected,setSelected]=useState(null);
  const [showCompose,setShowCompose]=useState(false);
  const [composeFor,setComposeFor]=useState(null);
  const [chosenTemplate,setChosenTemplate]=useState("intro");
  const [emailBody,setEmailBody]=useState("");
  const [emailSubject,setEmailSubject]=useState("");
  const [sending,setSending]=useState(false);
  const [sendDone,setSendDone]=useState(false);
  const [records,setRecords]=useState(OUTREACH_RECORDS);

  const filtered=filter==="all"?records:records.filter(r=>r.status===filter);
  const statusColors={"Not Contacted":T.text3,"Contacted":T.blue,"Responded":T.green,"Meeting Booked":T.teal};

  function openCompose(rec){
    const cand=PROFILES.find(p=>p.id===rec.candidateId);
    setComposeFor({rec,cand});
    const tpl=OUTREACH_TEMPLATES.find(t=>t.id==="intro");
    setChosenTemplate("intro");
    if(cand&&tpl){
      setEmailSubject(tpl.subject.replace(/\{\{company\}\}/g,"Novartis AG").replace(/\{\{role\}\}/g,cand.title).replace(/\{\{name\}\}/g,cand.name));
      setEmailBody(tpl.body.replace(/\{\{name\}\}/g,cand.name).replace(/\{\{company\}\}/g,"Novartis AG").replace(/\{\{role\}\}/g,cand.title).replace(/\{\{skills\}\}/g,cand.skills.slice(0,3).join(", ")).replace(/\{\{location\}\}/g,cand.loc).replace(/\{\{yoe\}\}/g,String(cand.yoe)));
    }
    setShowCompose(true);setSendDone(false);
  }

  function applyTemplate(tplId){
    const tpl=OUTREACH_TEMPLATES.find(t=>t.id===tplId);
    const cand=composeFor?.cand;
    if(!tpl||!cand)return;
    setChosenTemplate(tplId);
    setEmailSubject(tpl.subject.replace(/\{\{company\}\}/g,"Novartis AG").replace(/\{\{role\}\}/g,cand.title).replace(/\{\{name\}\}/g,cand.name));
    setEmailBody(tpl.body.replace(/\{\{name\}\}/g,cand.name).replace(/\{\{company\}\}/g,"Novartis AG").replace(/\{\{role\}\}/g,cand.title).replace(/\{\{skills\}\}/g,cand.skills.slice(0,3).join(", ")).replace(/\{\{location\}\}/g,cand.loc).replace(/\{\{yoe\}\}/g,String(cand.yoe)));
  }

  function doSend(){
    setSending(true);
    setTimeout(()=>{
      setSending(false);setSendDone(true);
      if(composeFor){
        setRecords(recs=>recs.map(r=>r.id===composeFor.rec.id?{...r,status:r.status==="Not Contacted"?"Contacted":r.status,lastAction:"Outreach sent",sentDate:new Date().toISOString().split("T")[0]}:r));
      }
      addToast("Outreach email sent successfully ✓","success");
      setTimeout(()=>{setShowCompose(false);setComposeFor(null);setSendDone(false);},1200);
    },1500);
  }

  function setFollowUp(recId,days){
    const d=new Date();d.setDate(d.getDate()+days);
    setRecords(recs=>recs.map(r=>r.id===recId?{...r,followUpDate:d.toISOString().split("T")[0]}:r));
    addToast(`Follow-up reminder set for ${days} day${days>1?"s":""} ✓`,"info");
  }

  return <div style={{flex:1,display:"flex",overflow:"hidden",background:T.bg}}>
    {/* Left panel: record list */}
    <div style={{width:380,background:T.bg2,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",flexShrink:0}}>
      <div style={{padding:"16px 16px 12px",borderBottom:`1px solid ${T.border}`}}>
        <h2 className="htitle" style={{fontSize:18,marginBottom:8}}>Outreach Hub</h2>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          {["all",...OUTREACH_STATUSES].map(s=><button key={s} onClick={()=>setFilter(s)} style={{padding:"4px 10px",borderRadius:20,border:`1px solid ${filter===s?T.tealBrd:T.border}`,background:filter===s?T.tealDim:T.surface,color:filter===s?T.teal:T.text3,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all .15s"}}>{s==="all"?"All":s}</button>)}
        </div>
      </div>
      {/* Outreach funnel summary */}
      <div style={{display:"flex",gap:0,padding:"10px 16px",borderBottom:`1px solid ${T.border}`}}>
        {OUTREACH_STATUSES.map((s,i)=>{
          const count=records.filter(r=>r.status===s).length;
          return <div key={s} style={{flex:1,textAlign:"center",borderRight:i<3?`1px solid ${T.border}`:"none",padding:"4px 0"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:16,color:statusColors[s]}}>{count}</div>
            <div style={{fontSize:9,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif",textTransform:"uppercase",letterSpacing:".06em"}}>{s.split(" ").map(w=>w[0]).join("")}</div>
          </div>;
        })}
      </div>
      <div style={{flex:1,overflowY:"auto"}}>
        {filtered.map((rec,i)=>{
          const cand=PROFILES.find(p=>p.id===rec.candidateId);
          if(!cand)return null;
          const isActive=selected===rec.id;
          return <div key={rec.id} onClick={()=>setSelected(rec.id)} style={{padding:"12px 16px",borderBottom:`1px solid ${T.border}`,cursor:"pointer",background:isActive?T.tealDim:"transparent",transition:"background .12s"}}
            onMouseEnter={e=>{if(!isActive)e.currentTarget.style.background=T.cardHover;}}
            onMouseLeave={e=>{if(!isActive)e.currentTarget.style.background="transparent";}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
              <Av idx={cand.av} size={32} name={cand.name} T={T}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:13,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{cand.name}</div>
                <div style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{cand.title}</div>
              </div>
              <span className="tag" style={{background:`${statusColors[rec.status]}12`,color:statusColors[rec.status],border:`1px solid ${statusColors[rec.status]}28`,fontSize:10,whiteSpace:"nowrap"}}>{rec.status}</span>
            </div>
            <div style={{fontSize:11,color:T.text2,fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:3}}>{rec.lastAction}</div>
            <div style={{display:"flex",gap:12,fontSize:10,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              {rec.sentDate&&<span>Sent: {rec.sentDate}</span>}
              {rec.followUpDate&&<span style={{color:T.amber}}>Follow-up: {rec.followUpDate}</span>}
            </div>
          </div>;
        })}
        {filtered.length===0&&<div style={{padding:30,textAlign:"center",fontSize:13,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>No records match filter</div>}
      </div>
    </div>

    {/* Right panel: detail view */}
    <div style={{flex:1,overflowY:"auto",padding:"22px 28px"}}>
      {selected?(() => {
        const rec=records.find(r=>r.id===selected);
        const cand=rec?PROFILES.find(p=>p.id===rec.candidateId):null;
        if(!rec||!cand)return null;
        return <div>
          {/* Candidate header */}
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <Av idx={cand.av} size={50} name={cand.name} T={T}/>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:4,flexWrap:"wrap"}}>
                  <h3 className="htitle" style={{fontSize:18}}>{cand.name}</h3>
                  <ScB score={cand.score} T={T}/>
                  <span className="tag" style={{background:`${statusColors[rec.status]}12`,color:statusColors[rec.status],border:`1px solid ${statusColors[rec.status]}28`,fontSize:11}}>{rec.status}</span>
                </div>
                <div style={{fontSize:13,color:T.text2,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{cand.title} · {cand.employer} · {cand.loc}</div>
                <div style={{display:"flex",gap:14,marginTop:5,fontSize:12,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                  <span>📧 {cand.email}</span><span>📞 {cand.phone}</span>
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="bp" onClick={()=>openCompose(rec)} style={{padding:"8px 18px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700}}>✉ Compose</button>
              <button className="bs" onClick={()=>onProfile({...cand,_forceUnlocked:true})} style={{padding:"8px 14px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>View Profile</button>
            </div>
          </div>

          {/* Follow-up reminder */}
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",background:T.amberDim,border:`1px solid ${T.amber}28`,borderRadius:10,marginBottom:18}}>
            <span style={{fontSize:15}}>⏰</span>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:600,color:T.amber,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Follow-up Reminder</div>
              <div style={{fontSize:11,color:T.text2,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{rec.followUpDate?`Scheduled for ${rec.followUpDate}`:"No follow-up set"}</div>
            </div>
            <div style={{display:"flex",gap:5}}>
              {[1,3,7].map(d=><button key={d} onClick={()=>setFollowUp(rec.id,d)} className="bs" style={{padding:"4px 8px",fontSize:10,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{d}d</button>)}
            </div>
          </div>

          {/* Message history */}
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:T.text,marginBottom:12}}>Message History</div>
          {rec.messages.length===0?<div style={{padding:24,textAlign:"center",background:T.bg2,border:`1px solid ${T.border}`,borderRadius:12}}>
            <div style={{fontSize:24,marginBottom:8,opacity:.3}}>✉</div>
            <div style={{fontSize:13,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:10}}>No messages yet</div>
            <button className="bp" onClick={()=>openCompose(rec)} style={{padding:"8px 18px",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600}}>Send First Outreach</button>
          </div>:
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {rec.messages.map((msg,mi)=><div key={mi} style={{background:T.bg2,border:`1px solid ${msg.dir==="out"?T.tealBrd:T.border}`,borderRadius:12,padding:"14px 16px",marginLeft:msg.dir==="in"?0:24,marginRight:msg.dir==="in"?24:0}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{width:7,height:7,borderRadius:"50%",background:msg.dir==="out"?T.teal:T.blue}}/>
                  <span style={{fontSize:11,fontWeight:600,color:msg.dir==="out"?T.teal:T.blue,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{msg.dir==="out"?"You":"Candidate"}</span>
                </div>
                <span style={{fontSize:10,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{msg.date}</span>
              </div>
              <div style={{fontSize:12,fontWeight:600,color:T.text,marginBottom:3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{msg.subject}</div>
              <div style={{fontSize:12,color:T.text2,fontFamily:"'Plus Jakarta Sans',sans-serif",lineHeight:1.5}}>{msg.preview}</div>
            </div>)}
          </div>}
        </div>;
      })():<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",opacity:.5}}>
        <div style={{fontSize:40,marginBottom:10}}>✉</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:T.text2}}>Select a candidate to view outreach details</div>
      </div>}
    </div>

    {/* Compose modal */}
    {showCompose&&composeFor&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:700,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)",animation:"fadeIn .2s ease"}} onClick={()=>setShowCompose(false)}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:18,padding:"28px 32px",width:"min(620px,96vw)",maxHeight:"90vh",overflow:"auto",boxShadow:`0 32px 80px ${T.shadow2}`,animation:"popIn .25s ease"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
          <h3 className="htitle" style={{fontSize:18}}>Compose Outreach</h3>
          <button onClick={()=>setShowCompose(false)} className="bs" style={{width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,borderRadius:8,padding:0}}>×</button>
        </div>
        {/* To field */}
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:T.bg3,border:`1px solid ${T.border}`,borderRadius:9,marginBottom:12}}>
          <span style={{fontSize:11,fontWeight:600,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>TO:</span>
          <Av idx={composeFor.cand.av} size={24} name={composeFor.cand.name} T={T}/>
          <span style={{fontSize:13,fontWeight:600,color:T.text,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{composeFor.cand.name}</span>
          <span style={{fontSize:12,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>({composeFor.cand.email})</span>
        </div>
        {/* Template selector */}
        <div style={{marginBottom:12}}>
          <div style={{fontSize:11,fontWeight:700,color:T.text3,textTransform:"uppercase",letterSpacing:".08em",marginBottom:7,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Template</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {OUTREACH_TEMPLATES.map(tpl=><button key={tpl.id} onClick={()=>applyTemplate(tpl.id)} style={{padding:"5px 12px",borderRadius:20,border:`1px solid ${chosenTemplate===tpl.id?T.tealBrd:T.border}`,background:chosenTemplate===tpl.id?T.tealDim:T.surface,color:chosenTemplate===tpl.id?T.teal:T.text3,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all .15s"}}>{tpl.name}</button>)}
            <button onClick={()=>{setChosenTemplate("");setEmailSubject("");setEmailBody("");}} style={{padding:"5px 12px",borderRadius:20,border:`1px solid ${!chosenTemplate?T.tealBrd:T.border}`,background:!chosenTemplate?T.tealDim:T.surface,color:!chosenTemplate?T.teal:T.text3,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all .15s"}}>Blank</button>
          </div>
        </div>
        {/* Subject */}
        <div style={{marginBottom:12}}>
          <div style={{fontSize:11,fontWeight:700,color:T.text3,textTransform:"uppercase",letterSpacing:".08em",marginBottom:5,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Subject</div>
          <input className="inp" value={emailSubject} onChange={e=>setEmailSubject(e.target.value)} placeholder="Email subject line…"/>
        </div>
        {/* Body */}
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:700,color:T.text3,textTransform:"uppercase",letterSpacing:".08em",marginBottom:5,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Message</div>
          <textarea value={emailBody} onChange={e=>setEmailBody(e.target.value)} style={{width:"100%",minHeight:200,background:T.inputBg,border:`1.5px solid ${T.border}`,color:T.text,fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",borderRadius:9,padding:"12px 14px",outline:"none",resize:"vertical",lineHeight:1.65}} placeholder="Write your message…"/>
        </div>
        {/* AI suggestion note */}
        <div style={{display:"flex",alignItems:"flex-start",gap:8,padding:"10px 13px",background:T.violetDim,border:`1px solid ${T.violet}22`,borderRadius:9,marginBottom:16}}>
          <span style={{fontSize:13,flexShrink:0}}>✦</span>
          <span style={{fontSize:12,color:T.text2,lineHeight:1.6,fontFamily:"'Plus Jakarta Sans',sans-serif"}}><strong style={{color:T.violet}}>AI Suggestion:</strong> This message has been personalised based on {composeFor.cand.name}'s skills in {composeFor.cand.skills.slice(0,2).join(" and ")} and their {composeFor.cand.yoe} years of experience.</span>
        </div>
        {sendDone?<div style={{background:T.greenDim,border:`1px solid ${T.green}30`,borderRadius:11,padding:"16px",textAlign:"center"}}>
          <div style={{fontSize:20,marginBottom:5}}>✅</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:15,color:T.green}}>Message Sent!</div>
        </div>:<div style={{display:"flex",gap:9}}>
          <button className="bs" onClick={()=>setShowCompose(false)} style={{flex:1,padding:"10px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Cancel</button>
          <button className="bp" onClick={doSend} disabled={sending||!emailSubject.trim()||!emailBody.trim()} style={{flex:2,padding:"10px",fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            {sending?<><span style={{animation:"spin .8s linear infinite",display:"inline-block"}}>↻</span>Sending…</>:"✉ Send Outreach"}
          </button>
        </div>}
      </div>
    </div>}
  </div>;
}

/* ── CANDIDATE NOTIFICATIONS & OPT-OUT PAGE ── */
function NotificationsPage({addToast,T}) {
  const [notifications,setNotifications]=useState(NOTIFICATION_LOG);
  const [selected,setSelected]=useState(null);
  const [showOptOut,setShowOptOut]=useState(false);
  const [optOutTarget,setOptOutTarget]=useState(null);
  const [optOutProcessing,setOptOutProcessing]=useState(false);
  const [filter,setFilter]=useState("all");
  const [showPreview,setShowPreview]=useState(false);

  const filtered=filter==="all"?notifications:notifications.filter(n=>n.status===filter);
  const statusColors={"Delivered":T.green,"Bounced":T.red,"Opted Out":T.amber,"Pending":T.blue};

  function simulateOptOut(notif){
    setOptOutTarget(notif);setShowOptOut(true);
  }

  function processOptOut(){
    setOptOutProcessing(true);
    setTimeout(()=>{
      setNotifications(ns=>ns.map(n=>n.id===optOutTarget.id?{...n,status:"Opted Out",optedOut:true}:n));
      setOptOutProcessing(false);setShowOptOut(false);setOptOutTarget(null);
      addToast("Opt-out processed. Candidate suppressed from all pools. Provider propagation initiated (72h).","warning");
    },1800);
  }

  function resendNotification(notif){
    setNotifications(ns=>ns.map(n=>n.id===notif.id?{...n,status:"Delivered"}:n));
    addToast(`Notification re-sent to ${notif.email} ✓`,"success");
  }

  const selNotif=selected?notifications.find(n=>n.id===selected):null;
  const selCand=selNotif?PROFILES.find(p=>p.id===selNotif.candidateId):null;

  return <div style={{flex:1,display:"flex",overflow:"hidden",background:T.bg}}>
    {/* Left: notification log */}
    <div style={{width:420,background:T.bg2,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",flexShrink:0}}>
      <div style={{padding:"16px 16px 12px",borderBottom:`1px solid ${T.border}`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
          <h2 className="htitle" style={{fontSize:18}}>GDPR Notification Log</h2>
          <button className="bs" onClick={()=>setShowPreview(true)} style={{padding:"5px 12px",fontSize:11,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>📋 Preview Email</button>
        </div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          {["all","Delivered","Bounced","Opted Out"].map(s=><button key={s} onClick={()=>setFilter(s)} style={{padding:"4px 10px",borderRadius:20,border:`1px solid ${filter===s?T.tealBrd:T.border}`,background:filter===s?T.tealDim:T.surface,color:filter===s?T.teal:T.text3,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all .15s"}}>{s==="all"?"All":s}</button>)}
        </div>
      </div>
      {/* Stats row */}
      <div style={{display:"flex",gap:0,padding:"8px 16px",borderBottom:`1px solid ${T.border}`}}>
        {[["Sent",notifications.filter(n=>n.status==="Delivered").length,T.green],["Bounced",notifications.filter(n=>n.status==="Bounced").length,T.red],["Opt-outs",notifications.filter(n=>n.optedOut).length,T.amber]].map(([l,v,c],i)=><div key={l} style={{flex:1,textAlign:"center",borderRight:i<2?`1px solid ${T.border}`:"none",padding:"4px 0"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:16,color:c}}>{v}</div>
          <div style={{fontSize:9,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif",textTransform:"uppercase",letterSpacing:".06em"}}>{l}</div>
        </div>)}
      </div>
      <div style={{flex:1,overflowY:"auto"}}>
        {filtered.map((notif,i)=>{
          const cand=PROFILES.find(p=>p.id===notif.candidateId);
          const isActive=selected===notif.id;
          return <div key={notif.id} onClick={()=>setSelected(notif.id)} style={{padding:"11px 16px",borderBottom:`1px solid ${T.border}`,cursor:"pointer",background:isActive?T.tealDim:"transparent",transition:"background .12s"}}
            onMouseEnter={e=>{if(!isActive)e.currentTarget.style.background=T.cardHover;}}
            onMouseLeave={e=>{if(!isActive)e.currentTarget.style.background="transparent";}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:statusColors[notif.status]||T.text3,flexShrink:0}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:13,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{cand?cand.name:"Unknown"}</div>
              </div>
              <span className="tag" style={{background:`${(statusColors[notif.status]||T.text3)}12`,color:statusColors[notif.status]||T.text3,border:`1px solid ${(statusColors[notif.status]||T.text3)}28`,fontSize:10}}>{notif.status}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              <span>{notif.type==="smart_shortlist"?"Smart Shortlist":"Profile Unlock"}</span>
              <span>{notif.date}</span>
            </div>
          </div>;
        })}
      </div>
    </div>

    {/* Right: detail panel */}
    <div style={{flex:1,overflowY:"auto",padding:"22px 28px"}}>
      {selNotif&&selCand?<div>
        {/* Notification detail header */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
              <Av idx={selCand.av} size={46} name={selCand.name} T={T}/>
              <div>
                <h3 className="htitle" style={{fontSize:18}}>{selCand.name}</h3>
                <div style={{fontSize:13,color:T.text2,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{selCand.email}</div>
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            {selNotif.status==="Bounced"&&<button className="bp" onClick={()=>resendNotification(selNotif)} style={{padding:"8px 16px",fontSize:12,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700}}>↻ Resend</button>}
            {!selNotif.optedOut&&<button onClick={()=>simulateOptOut(selNotif)} style={{padding:"8px 16px",borderRadius:9,border:`1px solid ${T.red}30`,background:T.redDim,color:T.red,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:12,transition:"all .15s"}}>Simulate Opt-Out</button>}
          </div>
        </div>

        {/* Notification details card */}
        <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px",boxShadow:`0 1px 4px ${T.shadow}`,marginBottom:18}}>
          <div style={{fontSize:12,fontWeight:700,color:T.text,marginBottom:14,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Notification Details</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            {[
              ["Status",selNotif.status,statusColors[selNotif.status]||T.text3],
              ["Type",selNotif.type==="smart_shortlist"?"Smart Shortlist":"Profile Unlock",T.text2],
              ["Date Sent",selNotif.date,T.text2],
              ["Organisation",selNotif.org,T.text2],
              ["Recruiter",selNotif.recruiter,T.text2],
              ["Candidate Email",selNotif.email,T.teal],
            ].map(([k,v,c])=><div key={k} style={{background:T.bg3,borderRadius:9,padding:"10px 12px",border:`1px solid ${T.border}`}}>
              <div style={{fontSize:10,color:T.text3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:3,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{k}</div>
              <div style={{fontSize:13,fontWeight:600,color:c,wordBreak:"break-all",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{v}</div>
            </div>)}
          </div>
        </div>

        {/* Notification content preview */}
        <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px",boxShadow:`0 1px 4px ${T.shadow}`,marginBottom:18}}>
          <div style={{fontSize:12,fontWeight:700,color:T.text,marginBottom:12,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Notification Content Sent</div>
          <div style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:10,padding:"16px 18px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text2,lineHeight:1.75}}>
            <p style={{margin:"0 0 10px"}}><strong style={{color:T.text}}>Subject:</strong> Your professional profile was accessed for recruitment purposes</p>
            <p style={{margin:"0 0 8px"}}>Dear {selCand.name},</p>
            <p style={{margin:"0 0 8px"}}>We are writing to inform you that <strong style={{color:T.text}}>{selNotif.org}</strong> accessed your publicly available professional profile through the TalentOS AI Sourcing Hub for the purpose of evaluating your suitability for a recruitment opportunity.</p>
            <p style={{margin:"0 0 8px"}}><strong style={{color:T.text}}>Data Controller:</strong> {selNotif.org}<br/><strong style={{color:T.text}}>Purpose:</strong> Recruitment outreach — legitimate interest (GDPR Art. 6(1)(f))<br/><strong style={{color:T.text}}>Data Categories:</strong> Name, contact information, professional experience, skills, education<br/><strong style={{color:T.text}}>Source:</strong> Publicly available professional data</p>
            <p style={{margin:"0 0 8px"}}><strong style={{color:T.text}}>Your Rights:</strong> Under GDPR and Swiss nDSG, you have the right to access, rectify, erase, object to, or port your data.</p>
            <p style={{margin:"0 0 0px",padding:"8px 12px",background:T.amberDim,border:`1px solid ${T.amber}28`,borderRadius:8}}><strong style={{color:T.amber}}>🔗 Opt-out:</strong> <span style={{textDecoration:"underline",color:T.teal}}>Click here to remove your data</span> — your profile will be immediately suppressed and the data provider notified within 72 hours.</p>
          </div>
        </div>

        {/* Data Subject Rights panel */}
        <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px",boxShadow:`0 1px 4px ${T.shadow}`,marginBottom:18}}>
          <div style={{fontSize:12,fontWeight:700,color:T.text,marginBottom:12,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Data Subject Rights (GDPR / nDSG)</div>
          {[
            ["Right of Access (Art. 15)","Candidate can request full disclosure of held data","📋"],
            ["Right to Erasure (Art. 17)","Opt-out triggers immediate erasure from all pools and pipelines","🗑"],
            ["Right to Rectification (Art. 16)","Candidate can request data correction","✏️"],
            ["Right to Object (Art. 21)","Objection treated as opt-out — immediate suppression","🚫"],
            ["Right to Data Portability (Art. 20)","Candidate can request export of data held","📦"],
          ].map(([right,desc,ico])=><div key={right} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:`1px solid ${T.border}`}}>
            <span style={{fontSize:15,flexShrink:0}}>{ico}</span>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:T.text,fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:2}}>{right}</div>
              <div style={{fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif",lineHeight:1.5}}>{desc}</div>
            </div>
          </div>)}
        </div>

        {/* Opt-out status if applicable */}
        {selNotif.optedOut&&<div style={{background:T.amberDim,border:`1px solid ${T.amber}30`,borderRadius:14,padding:"20px",marginBottom:18}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <span style={{fontSize:20}}>⚠️</span>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:15,color:T.amber}}>Candidate Has Opted Out</div>
              <div style={{fontSize:12,color:T.text2,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>This candidate's data has been suppressed from all active pools and pipelines.</div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            {[["Suppression","Immediate","Active"],["Provider Propagation","Within 72 hours","In Progress"],["Data Retention","Erased","Complete"]].map(([k,v,s])=><div key={k} style={{background:T.bg2,borderRadius:9,padding:"10px 12px",border:`1px solid ${T.amber}22`}}>
              <div style={{fontSize:10,color:T.text3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:3,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{k}</div>
              <div style={{fontSize:13,fontWeight:600,color:T.amber,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{v}</div>
              <div style={{fontSize:10,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{s}</div>
            </div>)}
          </div>
        </div>}
      </div>:<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",opacity:.5}}>
        <div style={{fontSize:40,marginBottom:10}}>🔔</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:T.text2}}>Select a notification to view details</div>
      </div>}
    </div>

    {/* Opt-out confirmation modal */}
    {showOptOut&&optOutTarget&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:700,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)",animation:"fadeIn .2s ease"}} onClick={()=>setShowOptOut(false)}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:18,padding:"28px 32px",width:"min(480px,94vw)",boxShadow:`0 32px 80px ${T.shadow2}`,animation:"popIn .25s ease"}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{width:58,height:58,borderRadius:"50%",background:T.amberDim,border:`2px solid ${T.amber}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,margin:"0 auto 14px"}}>🚫</div>
          <h3 className="htitle" style={{fontSize:18,marginBottom:6}}>Process Candidate Opt-Out</h3>
          <p style={{fontSize:13,color:T.text2,lineHeight:1.6,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>This will immediately suppress the candidate's data and initiate provider propagation.</p>
        </div>
        <div style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:11,padding:"14px 16px",marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:T.text,marginBottom:8,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Actions that will be taken:</div>
          {["Immediate suppression from all active candidate pools","Removal from all job pipelines","Outreach records archived (not deleted — audit trail)","Data provider notified within 72 hours","Profile will not appear in future searches","Audit log entry created"].map(item=><div key={item} style={{display:"flex",gap:7,marginBottom:5}}>
            <span style={{color:T.amber,fontSize:12,flexShrink:0}}>→</span>
            <span style={{fontSize:12,color:T.text2,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{item}</span>
          </div>)}
        </div>
        <div style={{display:"flex",gap:9}}>
          <button className="bs" onClick={()=>setShowOptOut(false)} style={{flex:1,padding:"10px",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Cancel</button>
          <button onClick={processOptOut} disabled={optOutProcessing} style={{flex:2,padding:"10px",fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,borderRadius:9,border:"none",cursor:"pointer",background:`linear-gradient(135deg,${T.amber},#f97316)`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all .2s"}}>
            {optOutProcessing?<><span style={{animation:"spin .8s linear infinite",display:"inline-block"}}>↻</span>Processing…</>:"Confirm Opt-Out"}
          </button>
        </div>
      </div>
    </div>}

    {/* Notification email preview modal */}
    {showPreview&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:700,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)",animation:"fadeIn .2s ease"}} onClick={()=>setShowPreview(false)}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.bg2,border:`1px solid ${T.border2}`,borderRadius:18,padding:"28px 32px",width:"min(560px,94vw)",maxHeight:"85vh",overflow:"auto",boxShadow:`0 32px 80px ${T.shadow2}`,animation:"popIn .25s ease"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <h3 className="htitle" style={{fontSize:18}}>GDPR Art. 14 Notification Template</h3>
          <button onClick={()=>setShowPreview(false)} className="bs" style={{width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,borderRadius:8,padding:0}}>×</button>
        </div>
        <div style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:12,padding:"20px 22px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text2,lineHeight:1.8}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,color:T.text,marginBottom:10}}>Subject: Your professional profile was accessed for recruitment purposes</div>
          <p style={{margin:"0 0 10px"}}>Dear [Candidate Name],</p>
          <p style={{margin:"0 0 10px"}}>Pursuant to Article 14 of the General Data Protection Regulation (GDPR) and Article 19 of the Swiss Federal Act on Data Protection (nDSG), we inform you that <strong style={{color:T.text}}>[Organisation Name]</strong> has accessed your professional profile data for recruitment purposes.</p>
          <p style={{margin:"0 0 6px"}}><strong style={{color:T.text}}>Data Controller:</strong> [Organisation Name]</p>
          <p style={{margin:"0 0 6px"}}><strong style={{color:T.text}}>Purpose of Processing:</strong> Evaluating suitability for employment opportunities</p>
          <p style={{margin:"0 0 6px"}}><strong style={{color:T.text}}>Legal Basis:</strong> Legitimate Interests (GDPR Art. 6(1)(f))</p>
          <p style={{margin:"0 0 6px"}}><strong style={{color:T.text}}>Data Categories:</strong> Name, email, phone, professional experience, skills, education, location</p>
          <p style={{margin:"0 0 6px"}}><strong style={{color:T.text}}>Data Source:</strong> Publicly available professional profiles</p>
          <p style={{margin:"0 0 10px"}}><strong style={{color:T.text}}>Retention Period:</strong> Maximum 12 months from date of access</p>
          <p style={{margin:"0 0 6px"}}><strong style={{color:T.text}}>Your Rights:</strong></p>
          <p style={{margin:"0 0 10px",paddingLeft:12}}>• Right of Access (Art. 15) • Right to Rectification (Art. 16) • Right to Erasure (Art. 17) • Right to Restriction (Art. 18) • Right to Data Portability (Art. 20) • Right to Object (Art. 21)</p>
          <div style={{padding:"10px 14px",background:T.amberDim,border:`1px solid ${T.amber}28`,borderRadius:8,marginTop:6}}>
            <strong style={{color:T.amber}}>To remove your data:</strong> Click the link below to immediately suppress your profile. Your data provider will be notified within 72 hours.<br/><span style={{color:T.teal,textDecoration:"underline"}}>[Opt-Out Link]</span>
          </div>
        </div>
        <div style={{marginTop:14,fontSize:11,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif",lineHeight:1.6}}>
          This template is automatically populated and sent at the point of profile unlock. Each notification is individual and personalised per candidate.
        </div>
      </div>
    </div>}
  </div>;
}

function PlaceholderPage({title,T}) {
  return <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:T.bg}}>
    <div style={{fontSize:44,marginBottom:14,opacity:.18}}>◎</div>
    <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:T.text2,marginBottom:6}}>{title}</div>
    <div style={{fontSize:13,color:T.text3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Module coming soon</div>
  </div>;
}

/* ═══════════════════════════════════
   ROOT APP
═══════════════════════════════════ */
export default function AppV5() {
  const [isDark,setIsDark]=useState(false); // light mode default
  const T=isDark?DK:LT;
  const [page,setPage]=useState("dashboard");
  const [sub,setSub]=useState("search");
  const [credits,setCredits]=useState(47);
  const [selected,setSelected]=useState(null);
  const [unlocked,setUnlocked]=useState(4);
  const [pooled,setPooled]=useState(3);
  const [piped,setPiped]=useState(2);
  const [interviews,setInterviews]=useState(2);
  const [toasts,setToasts]=useState([]);
  const [poolCandidates,setPoolCandidates]=useState(PROFILES.slice(0,3).map(p=>({...p,assignedJob:p.id===1?"1":null,dateAdded:new Date().toISOString()})));
  const [pipelineCandidates,setPipelineCandidates]=useState(PROFILES.slice(0,5).map((p,i)=>({...p,assignedJob:String(i<3?1:2)})));
  const [showSmartModal,setShowSmartModal]=useState(false);
  const [smartDone,setSmartDone]=useState(false);
  const [sourcingPrefill,setSourcingPrefill]=useState("");

  function addToast(msg,type="info"){const id=Date.now();setToasts(ts=>[...ts,{id,msg,type}]);}
  function rmToast(id){setToasts(ts=>ts.filter(x=>x.id!==id));}

  function goPage(p){setPage(p);if(p==="sourcing")setSub("search");}

  function handleUnlock(p){
    setCredits(c=>c-1);setUnlocked(c=>c+1);
    addToast(`Profile unlocked — 1 credit used. GDPR notification sent to candidate.`,"success");
  }
  function handlePool(p){
    if(!poolCandidates.find(c=>c.id===p.id)){
      setPoolCandidates(pc=>[...pc,{...p,assignedJob:null,dateAdded:new Date().toISOString()}]);
      setPooled(c=>c+1);
    }
    addToast(`${p.name||p.title} added to Candidate Pool ✓`,"success");
  }
  function handlePipeline(p){
    setPiped(c=>c+1);
    if(!pipelineCandidates.find(c=>c.id===p.id)){
      setPipelineCandidates(pc=>[...pc,{...p,assignedJob:"1"}]);
    }
    addToast(`Added to Job Pipeline ✓`,"info");
  }
  function handleInterview(p){setCredits(c=>c-3);setInterviews(c=>c+1);addToast(`AI Interview scheduled — 3 credits used ✓`,"success");}
  function handleBulkUnlock(count){setCredits(c=>c-count);setUnlocked(c=>c+count);addToast(`${count} profiles unlocked — ${count} credits used. GDPR notifications sent.`,"success");}
  function handleSmartConfirm(){setCredits(c=>c-10);setSmartDone(true);setShowSmartModal(false);setSub("smart");addToast("Smart Shortlist ready — 10 credits used, 10 profiles unlocked ✓","success");}

  // Called from Pipeline page to launch sourcing pre-filled with JD
  function handleStartSourcing(job){
    setSourcingPrefill(`${job.jd} Location: ${job.location}. Role: ${job.title}.`);
    setPage("sourcing");
    setSub("search");
    addToast(`Sourcing launched for: ${job.title}`,"info");
  }

  return <div style={{display:"flex",height:"100vh",background:T.bg,overflow:"hidden"}}>
    <style>{makeCSS(T)}</style>
    <Sidebar page={page} setPage={goPage} credits={credits} isDark={isDark} toggleTheme={()=>setIsDark(d=>!d)} T={T}/>
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <Topbar page={page} credits={credits} unlocked={unlocked} pooled={pooled} piped={piped} T={T}/>
      <div style={{flex:1,display:"flex",overflow:"hidden",position:"relative"}}>
        {page==="dashboard"&&<DashboardPage credits={credits} unlocked={unlocked} pooled={pooled} piped={piped} interviews={interviews} onNavigate={goPage} T={T}/>}
        {page==="sourcing"&&sub==="search"&&<SearchPage onSearch={()=>setSub("results")} onSmartShortlist={()=>setShowSmartModal(true)} prefillPrompt={sourcingPrefill} T={T}/>}
        {page==="sourcing"&&sub==="results"&&<ResultsPage profiles={PROFILES} onProfile={setSelected} onNewSearch={()=>setSub("search")} onBulkUnlock={handleBulkUnlock} T={T}/>}
        {page==="sourcing"&&sub==="smart"&&<SmartShortlistPage onProfile={setSelected} onNewSearch={()=>setSub("search")} T={T}/>}
        {page==="pool"&&<CandidatePoolPage poolCandidates={poolCandidates} onProfile={p=>setSelected({...p,_forceUnlocked:true})} T={T}/>}
        {page==="pipeline"&&<PipelinePage pipelineCandidates={pipelineCandidates} onStartSourcing={handleStartSourcing} onProfile={setSelected} T={T}/>}
        {page==="outreach"&&<OutreachPage onProfile={setSelected} onNavigate={goPage} addToast={addToast} T={T}/>}
        {page==="notifications"&&<NotificationsPage addToast={addToast} T={T}/>}
        {page==="credits"&&<CreditsDash credits={credits} unlocked={unlocked} interviews={interviews} T={T}/>}
        {["interviews","jobs","settings"].includes(page)&&<PlaceholderPage title={{interviews:"AI Interviews",jobs:"Jobs",settings:"Settings"}[page]} T={T}/>}
      </div>
    </div>

    {/* Smart Shortlist confirm modal */}
    {showSmartModal&&<SmartShortlistModal credits={credits} T={T} onConfirm={handleSmartConfirm} onClose={()=>setShowSmartModal(false)}/>}

    {/* Profile modal */}
    {selected&&<ProfileModal profile={selected} credits={credits} T={T} _startUnlocked={selected._forceUnlocked||false} onClose={()=>setSelected(null)} onUnlock={handleUnlock} onPool={handlePool} onPipeline={handlePipeline} onInterview={handleInterview} onOutreach={(p)=>{setSelected(null);setPage("outreach");addToast(`Outreach hub opened for ${p.name} ✓`,"info");}}/>}

    {/* Toasts */}
    <div style={{position:"fixed",bottom:22,right:22,zIndex:9999,display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end"}}>
      {toasts.map(t=><Toast key={t.id} msg={t.msg} type={t.type} T={T} onClose={()=>rmToast(t.id)}/>)}
    </div>
  </div>;
}
