import { useState, useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg:#080C14; --bg2:#0D1220; --bg3:#111827; --bg4:#161E2E;
    --glass:rgba(255,255,255,0.04); --glass2:rgba(255,255,255,0.07); --glass3:rgba(255,255,255,0.11);
    --border:rgba(255,255,255,0.08); --border2:rgba(255,255,255,0.14);
    --teal:#00D4B4; --teal2:#00B89A;
    --violet:#7C6FFF; --violet2:#6055E8;
    --amber:#FFB547; --red:#FF5572; --green:#22D88F;
    --text:#F0F4FF; --text2:#8892A4; --text3:#4E5A6E;
    --font-head:'Syne',sans-serif; --font-body:'DM Sans',sans-serif;
  }
  ::-webkit-scrollbar{width:4px;height:4px}
  ::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb{background:var(--glass3);border-radius:2px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(0,212,180,0.12)}50%{box-shadow:0 0 40px rgba(0,212,180,0.3)}}
  @keyframes orbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
  @keyframes slideRight{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
  .card-hover{transition:transform .2s,box-shadow .2s,border-color .2s}
  .card-hover:hover{transform:translateY(-3px);border-color:rgba(0,212,180,0.28)!important;box-shadow:0 8px 36px rgba(0,212,180,0.07)!important}
  .nav-item{display:flex;align-items:center;gap:10px;padding:9px 14px;border-radius:8px;cursor:pointer;transition:all .15s;font-family:var(--font-body);font-size:13px;font-weight:500;color:var(--text3);border:none;background:transparent;width:100%;text-align:left}
  .nav-item:hover{background:var(--glass2);color:var(--text2)}
  .nav-item.active{background:linear-gradient(90deg,rgba(0,212,180,0.13),rgba(124,111,255,0.06));color:var(--teal);border-left:2px solid var(--teal)}
  .glass{background:var(--glass);border:1px solid var(--border);border-radius:14px}
  .btn-p{background:linear-gradient(135deg,var(--teal),var(--violet));color:#fff;border:none;cursor:pointer;font-family:var(--font-body);font-weight:600;border-radius:10px;transition:all .2s;position:relative;overflow:hidden}
  .btn-p:hover{filter:brightness(1.1)}
  .btn-p:disabled{opacity:.4;cursor:default;filter:none}
  .btn-g{background:var(--glass);color:var(--text2);border:1px solid var(--border);cursor:pointer;font-family:var(--font-body);font-weight:500;border-radius:10px;transition:all .2s}
  .btn-g:hover{background:var(--glass2);color:var(--text);border-color:var(--border2)}
  .inp{background:var(--glass);border:1px solid var(--border);color:var(--text);font-family:var(--font-body);font-size:14px;border-radius:10px;padding:11px 16px;outline:none;transition:border-color .2s,background .2s;width:100%}
  .inp:focus{border-color:var(--teal);background:rgba(0,212,180,0.04)}
  .inp::placeholder{color:var(--text3)}
  select.inp option{background:#1a2236}
  .tag{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600;font-family:var(--font-body);letter-spacing:.3px}
  .pbar-track{height:6px;background:var(--glass2);border-radius:3px;overflow:hidden}
  .orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;animation:orbFloat 8s ease-in-out infinite}
`;

const SOURCES = [
  {id:"linkedin",label:"LinkedIn",   ico:"in",color:"#0A66C2"},
  {id:"github",  label:"GitHub",     ico:"GH",color:"#3FB950"},
  {id:"indeed",  label:"Indeed",     ico:"id",color:"#2164F3"},
  {id:"xing",    label:"Xing",       ico:"Xi",color:"#006567"},
  {id:"glassdoor",label:"Glassdoor", ico:"Gd",color:"#0CAA41"},
  {id:"stackoverflow",label:"Stack Overflow",ico:"SO",color:"#EF8236"},
];

const AVCS = ["#00D4B4","#7C6FFF","#FF5572","#FFB547","#22D88F","#5B8EFF","#FF7B47","#D47CFF"];

const PROFILES = [
  {id:1,name:"Lena Müller",      title:"Senior DevOps Engineer",       employer:"Google Switzerland",   loc:"Zürich, CH",    yoe:9, score:96,edu:"MSc Computer Science",     industry:"Large Technology Company",   skills:["Kubernetes","Terraform","AWS","Docker","CI/CD","Helm","Prometheus"],  matched:6,avail:true, email:"l.muller@email.ch",linkedin:"linkedin.com/in/lenamuller",  github:"github.com/lena-m",  av:0},
  {id:2,name:"Marco Bernasconi", title:"Platform Engineer",            employer:"Zühlke Engineering",   loc:"Basel, CH",     yoe:7, score:91,edu:"BSc Software Engineering", industry:"Mid-sized SaaS Company",     skills:["Kubernetes","AWS","Docker","Python","Terraform","Prometheus"],        matched:5,avail:true, email:"m.bern@mail.ch",   linkedin:"linkedin.com/in/marco-b",     github:"github.com/marco-b", av:1},
  {id:3,name:"Sophie Dubois",    title:"Cloud Infrastructure Lead",    employer:"UBS Group AG",         loc:"Bern, CH",      yoe:11,score:88,edu:"MEng Software Systems",    industry:"Financial Services Group",   skills:["AWS","Terraform","Kubernetes","Security","Networking","Docker"],      matched:5,avail:false,email:"s.dubois@proton.me",linkedin:"linkedin.com/in/sdubois",     github:"github.com/sdubois", av:2},
  {id:4,name:"Adrian Keller",    title:"Site Reliability Engineer",    employer:"Teamsystems SA",       loc:"Geneva, CH",    yoe:6, score:84,edu:"BSc Computer Science",     industry:"European Tech Scale-up",     skills:["Kubernetes","Prometheus","Python","Docker","GCP","Terraform"],        matched:5,avail:true, email:"a.keller@gmail.com",linkedin:"linkedin.com/in/adriankeller", github:"github.com/a-keller",av:3},
  {id:5,name:"Nadia Volkov",     title:"DevOps Engineer",              employer:"Digitec Galaxus AG",   loc:"Lausanne, CH",  yoe:5, score:79,edu:"BSc Information Tech",     industry:"E-commerce Technology Firm", skills:["Docker","CI/CD","AWS","Python","Ansible"],                           matched:4,avail:true, email:"n.volkov@fastmail.com",linkedin:"linkedin.com/in/nadiav",      github:"github.com/nvolkov", av:4},
  {id:6,name:"Fabian Meier",     title:"Infrastructure Engineer",      employer:"Accenture Switzerland", loc:"Lucerne, CH",  yoe:8, score:76,edu:"MEng Distributed Systems", industry:"Global Consulting Group",    skills:["Terraform","AWS","Docker","Linux","Networking"],                     matched:4,avail:false,email:"f.meier@bluewin.ch", linkedin:"linkedin.com/in/fmeier",      github:"github.com/fmeier",  av:5},
  {id:7,name:"Elena Rossi",      title:"Senior Cloud Engineer",        employer:"Swiss Re",             loc:"St. Gallen, CH",yoe:10,score:72,edu:"MSc IT Management",         industry:"Insurance Technology Firm",  skills:["Azure","Kubernetes","Terraform","DevOps","Python"],                  matched:3,avail:true, email:"e.rossi@outlook.com",linkedin:"linkedin.com/in/elena-r",     github:"github.com/erossi",  av:6},
  {id:8,name:"Jonas Weber",      title:"Platform Operations Engineer", employer:"AMAG Group",           loc:"Winterthur, CH",yoe:4, score:68,edu:"BSc Systems Engineering",   industry:"Automotive Technology Group",skills:["Kubernetes","Docker","Linux","Bash","Monitoring"],                   matched:3,avail:true, email:"j.weber@gmail.com",  linkedin:"linkedin.com/in/jonasweber",  github:"github.com/jweber",  av:7},
];

const TX_HISTORY = [
  {id:1,type:"unlock",   label:"Profile Unlocked — Senior DevOps Engineer",       cost:1,  date:"Today 11:42",  icon:"🔓"},
  {id:2,type:"interview",label:"AI Interview Scheduled — Cloud Architect",         cost:3,  date:"Today 09:15",  icon:"🎙"},
  {id:3,type:"unlock",   label:"Profile Unlocked — Platform Engineer",             cost:1,  date:"Yesterday",    icon:"🔓"},
  {id:4,type:"interview",label:"AI Interview Scheduled — SRE role",                cost:3,  date:"Yesterday",    icon:"🎙"},
  {id:5,type:"unlock",   label:"Profile Unlocked — Infrastructure Lead",           cost:1,  date:"Mon 14:30",    icon:"🔓"},
  {id:6,type:"topup",    label:"Credits Purchased — Growth Bundle (220 credits)",  cost:-220,date:"Mon 09:00",   icon:"⬡"},
  {id:7,type:"unlock",   label:"Profile Unlocked — DevOps Engineer",               cost:1,  date:"Last Friday",  icon:"🔓"},
  {id:8,type:"interview",label:"AI Interview Scheduled — Cloud Infra Lead",        cost:3,  date:"Last Friday",  icon:"🎙"},
];

const sc  = s => s>=85?"#22D88F":s>=70?"#FFB547":"#FF5572";
const scb = s => s>=85?"rgba(34,216,143,.12)":s>=70?"rgba(255,181,71,.12)":"rgba(255,85,114,.12)";

function ScoreBadge({score}){return <span className="tag" style={{background:scb(score),color:sc(score),border:`1px solid ${sc(score)}44`}}>{score}%</span>;}

function Av({idx,size=42,name}){
  const c=AVCS[idx%AVCS.length];
  const ini=(name||"?").split(" ").map(n=>n[0]).join("").slice(0,2);
  return <div style={{width:size,height:size,borderRadius:"50%",background:`${c}1A`,border:`2px solid ${c}44`,display:"flex",alignItems:"center",justifyContent:"center",color:c,fontSize:size*.34,fontWeight:700,fontFamily:"var(--font-head)",flexShrink:0}}>{ini}</div>;
}

function SkPill({skill,matched}){
  return <span className="tag" style={{background:matched?"rgba(0,212,180,.1)":"var(--glass)",color:matched?"var(--teal)":"var(--text3)",border:`1px solid ${matched?"rgba(0,212,180,.22)":"var(--border)"}`}}>
    {matched&&<span style={{fontSize:8}}>✓</span>} {skill}
  </span>;
}

function Toast({msg,type,onClose}){
  useEffect(()=>{const t=setTimeout(onClose,3500);return()=>clearTimeout(t);},[]);
  const c={success:"var(--green)",info:"var(--teal)",warning:"var(--amber)"}[type]||"var(--teal)";
  return <div style={{background:"var(--bg3)",border:`1px solid ${c}33`,borderRadius:12,padding:"13px 18px",maxWidth:400,display:"flex",alignItems:"center",gap:12,boxShadow:"0 16px 48px rgba(0,0,0,.5)",animation:"fadeUp .3s ease",fontFamily:"var(--font-body)"}}>
    <span style={{width:8,height:8,borderRadius:"50%",background:c,flexShrink:0,animation:"pulse 1.5s infinite"}}/>
    <span style={{fontSize:13,color:"var(--text)",lineHeight:1.5,flex:1}}>{msg}</span>
    <button onClick={onClose} style={{background:"none",border:"none",color:"var(--text3)",cursor:"pointer",fontSize:16,flexShrink:0}}>×</button>
  </div>;
}

function Sidebar({page,setPage,credits}){
  const nav=[
    {id:"sourcing",  ico:"◎",label:"AI Sourcing Hub"},
    {id:"pipeline",  ico:"⟳",label:"Job Pipelines"},
    {id:"pool",      ico:"❑",label:"Candidate Pool"},
    {id:"interviews",ico:"◷",label:"AI Interviews"},
    {id:"jobs",      ico:"≡",label:"Jobs"},
    {id:"credits",   ico:"⬡",label:"Credits Dashboard"},
    {id:"settings",  ico:"⚙",label:"Settings"},
  ];
  return(
    <div style={{width:218,background:"var(--bg2)",borderRight:"1px solid var(--border)",display:"flex",flexDirection:"column",flexShrink:0,height:"100vh"}}>
      <div style={{padding:"20px 18px 16px",borderBottom:"1px solid var(--border)"}}>
        <div style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:20,background:"linear-gradient(90deg,var(--teal),var(--violet))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>TalentOS</div>
        <div style={{fontSize:11,color:"var(--text3)",marginTop:1,fontFamily:"var(--font-body)"}}>AI Hiring Platform · Switzerland</div>
      </div>
      <div style={{padding:"10px 12px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,var(--teal),var(--violet))",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:12,fontFamily:"var(--font-head)",flexShrink:0}}>SK</div>
        <div>
          <div style={{color:"var(--text)",fontSize:12,fontWeight:600,fontFamily:"var(--font-body)"}}>Sarah Kessler</div>
          <div style={{color:"var(--text3)",fontSize:11,fontFamily:"var(--font-body)"}}>HR Manager · Novartis</div>
        </div>
      </div>
      <nav style={{flex:1,padding:"8px 8px",overflowY:"auto"}}>
        {nav.map(it=>(
          <button key={it.id} onClick={()=>setPage(it.id)} className={`nav-item ${page===it.id?"active":""}`}>
            <span style={{fontSize:14}}>{it.ico}</span>
            <span>{it.label}</span>
            {it.id==="credits"&&<span style={{marginLeft:"auto",fontSize:11,fontWeight:700,color:"var(--teal)",background:"rgba(0,212,180,.1)",borderRadius:10,padding:"1px 7px"}}>{credits}</span>}
          </button>
        ))}
      </nav>
      <div style={{padding:"12px 14px",borderTop:"1px solid var(--border)"}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
          <span style={{fontSize:11}}>🛡</span>
          <span style={{fontSize:11,color:"var(--text3)",fontFamily:"var(--font-body)"}}>GDPR · Swiss nDSG</span>
        </div>
        <div style={{fontSize:10,color:"var(--text3)",fontFamily:"var(--font-body)"}}>v2.5.0 · Certified Data Providers</div>
      </div>
    </div>
  );
}

function Topbar({page,credits,unlocked,pooled,piped}){
  const titles={sourcing:"AI Sourcing Hub",pipeline:"Job Pipelines",pool:"Candidate Pool",interviews:"AI Interviews",credits:"Credits Dashboard",jobs:"Jobs",settings:"Settings"};
  return(
    <div style={{height:54,background:"var(--bg2)",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",padding:"0 28px",gap:16,flexShrink:0}}>
      <span style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:16,color:"var(--text)",flex:1}}>{titles[page]}</span>
      <div style={{display:"flex",gap:20,alignItems:"center"}}>
        {[["🔓",unlocked,"Unlocked"],["❑",pooled,"In Pool"],["⟳",piped,"Pipeline"]].map(([ico,v,l])=>(
          <div key={l} style={{display:"flex",alignItems:"center",gap:5}}>
            <span style={{fontSize:13}}>{ico}</span>
            <span style={{fontFamily:"var(--font-body)",fontSize:13,color:"var(--text)",fontWeight:700}}>{v}</span>
            <span style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text3)"}}>{l}</span>
          </div>
        ))}
        <div style={{height:18,width:1,background:"var(--border)"}}/>
        <div style={{display:"flex",alignItems:"center",gap:7,background:"rgba(0,212,180,.07)",border:"1px solid rgba(0,212,180,.2)",borderRadius:20,padding:"5px 14px"}}>
          <span style={{fontSize:14}}>⬡</span>
          <span style={{fontFamily:"var(--font-body)",fontWeight:700,color:"var(--teal)",fontSize:14}}>{credits}</span>
          <span style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text3)"}}>credits</span>
        </div>
      </div>
    </div>
  );
}

/* ─── SEARCH ─── */
function SearchPage({onSearch}){
  const [mode,setMode]=useState("ai");
  const [prompt,setPrompt]=useState("");
  const [sources,setSources]=useState(SOURCES.map(s=>s.id));
  const [searching,setSearching]=useState(false);
  const [role,setRole]=useState("Senior DevOps Engineer");
  const [skills,setSkills]=useState(["Kubernetes","Terraform","AWS","Docker"]);
  const [exp,setExp]=useState("Senior (6–10 yrs)");
  const [location,setLocation]=useState("Switzerland");
  const ALL_SK=["Kubernetes","Terraform","AWS","Docker","CI/CD","Helm","Python","Prometheus","GCP","Azure","Linux","Ansible","Go","Rust"];
  const QS=["Find senior DevOps engineers in Switzerland with Kubernetes + Terraform, open to new roles","Cloud architects with 8+ years in fintech, based in Zürich or Geneva","Platform engineers experienced with large-scale distributed systems"];
  const tog=id=>setSources(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  function go(){if(mode==="ai"&&!prompt.trim())return;setSearching(true);setTimeout(()=>{setSearching(false);onSearch();},1900);}
  return(
    <div style={{flex:1,overflowY:"auto",padding:"36px 44px",position:"relative"}}>
      <div className="orb" style={{width:420,height:420,background:"rgba(0,212,180,.05)",top:-120,right:-100}}/>
      <div className="orb" style={{width:320,height:320,background:"rgba(124,111,255,.05)",bottom:80,left:-60,animationDelay:"4s"}}/>
      <div style={{maxWidth:700,margin:"0 auto",position:"relative",animation:"fadeUp .5s ease"}}>
        <div style={{marginBottom:30}}>
          <h1 style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:30,color:"var(--text)",lineHeight:1.2,marginBottom:8}}>Find Passive Candidates</h1>
          <p style={{fontFamily:"var(--font-body)",fontSize:14,color:"var(--text2)",lineHeight:1.6}}>AI searches millions of external profiles. All results are anonymised until unlocked.</p>
        </div>

        {/* Mode tabs */}
        <div style={{display:"flex",gap:3,padding:4,background:"var(--bg3)",borderRadius:12,border:"1px solid var(--border)",marginBottom:24,width:"fit-content"}}>
          {[["ai","✦ AI Prompt","Default"],["manual","⊞ Manual Filters","Advanced"]].map(([m,label,sub])=>(
            <button key={m} onClick={()=>setMode(m)} style={{padding:"9px 22px",borderRadius:9,border:"none",cursor:"pointer",fontFamily:"var(--font-body)",fontWeight:600,fontSize:13,transition:"all .2s",background:mode===m?"linear-gradient(135deg,var(--teal),var(--violet))":"transparent",color:mode===m?"#fff":"var(--text3)"}}>
              {label} <span style={{opacity:.65,fontWeight:400,fontSize:11,marginLeft:4}}>{sub}</span>
            </button>
          ))}
        </div>

        {mode==="ai"&&(
          <div className="glass" style={{padding:22,marginBottom:18,animation:"fadeIn .3s ease"}}>
            <label style={{fontFamily:"var(--font-head)",fontSize:11,fontWeight:700,color:"var(--text2)",textTransform:"uppercase",letterSpacing:.9,display:"block",marginBottom:10}}>Describe what you're looking for</label>
            <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="e.g. Find senior DevOps engineers in Switzerland with 7+ years of Kubernetes experience who are open to new opportunities..." style={{width:"100%",minHeight:96,background:"rgba(255,255,255,.02)",border:"1px solid var(--border)",borderRadius:10,padding:14,color:"var(--text)",fontSize:15,fontFamily:"var(--font-body)",resize:"vertical",outline:"none",lineHeight:1.65,transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor="var(--teal)"} onBlur={e=>e.target.style.borderColor="var(--border)"}/>
            <div style={{marginTop:12}}>
              <div style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text3)",marginBottom:7}}>✦ Quick prompts:</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {QS.map(q=>(
                  <button key={q} onClick={()=>setPrompt(q)} style={{background:"var(--glass)",border:"1px solid var(--border)",color:"var(--text3)",borderRadius:20,padding:"5px 12px",fontSize:12,cursor:"pointer",fontFamily:"var(--font-body)",transition:"all .15s",textAlign:"left"}} onMouseEnter={e=>{e.currentTarget.style.background="var(--glass2)";e.currentTarget.style.color="var(--text2)";}} onMouseLeave={e=>{e.currentTarget.style.background="var(--glass)";e.currentTarget.style.color="var(--text3)";}}>
                    {q.length>56?q.slice(0,56)+"…":q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {mode==="manual"&&(
          <div className="glass" style={{padding:22,marginBottom:18,animation:"fadeIn .3s ease"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
              <div><label style={{fontFamily:"var(--font-head)",fontSize:11,fontWeight:700,color:"var(--text2)",textTransform:"uppercase",letterSpacing:.9,display:"block",marginBottom:7}}>Job Title *</label><input className="inp" value={role} onChange={e=>setRole(e.target.value)} placeholder="e.g. Senior DevOps Engineer"/></div>
              <div><label style={{fontFamily:"var(--font-head)",fontSize:11,fontWeight:700,color:"var(--text2)",textTransform:"uppercase",letterSpacing:.9,display:"block",marginBottom:7}}>Location</label><input className="inp" value={location} onChange={e=>setLocation(e.target.value)} placeholder="e.g. Switzerland"/></div>
            </div>
            <div style={{marginBottom:14}}>
              <label style={{fontFamily:"var(--font-head)",fontSize:11,fontWeight:700,color:"var(--text2)",textTransform:"uppercase",letterSpacing:.9,display:"block",marginBottom:8}}>Required Skills</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
                {skills.map(s=><span key={s} className="tag" style={{background:"rgba(0,212,180,.1)",color:"var(--teal)",border:"1px solid rgba(0,212,180,.22)"}}>{s}<button onClick={()=>setSkills(sk=>sk.filter(x=>x!==s))} style={{background:"none",border:"none",color:"var(--teal)",cursor:"pointer",fontSize:12,padding:0,marginLeft:3}}>×</button></span>)}
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {ALL_SK.filter(s=>!skills.includes(s)).map(s=><button key={s} onClick={()=>setSkills(sk=>[...sk,s])} style={{background:"var(--glass)",border:"1px solid var(--border)",color:"var(--text3)",borderRadius:20,padding:"3px 10px",fontSize:12,cursor:"pointer",fontFamily:"var(--font-body)",transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(0,212,180,.3)";e.currentTarget.style.color="var(--text2)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text3)";}}>+ {s}</button>)}
              </div>
            </div>
            <div><label style={{fontFamily:"var(--font-head)",fontSize:11,fontWeight:700,color:"var(--text2)",textTransform:"uppercase",letterSpacing:.9,display:"block",marginBottom:7}}>Experience Level</label>
              <select className="inp" value={exp} onChange={e=>setExp(e.target.value)} style={{width:"50%"}}>
                {["Junior (0–2 yrs)","Mid (3–5 yrs)","Senior (6–10 yrs)","Lead/Principal (10+ yrs)"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Sources */}
        <div className="glass" style={{padding:20,marginBottom:22}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:13}}>
            <span style={{fontFamily:"var(--font-head)",fontSize:12,fontWeight:700,color:"var(--text2)",textTransform:"uppercase",letterSpacing:.9}}>Search Sources <span style={{color:"var(--text3)",fontWeight:400,fontSize:11,textTransform:"none",letterSpacing:0}}>({sources.length}/{SOURCES.length} selected)</span></span>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setSources(SOURCES.map(s=>s.id))} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,color:"var(--teal)",fontFamily:"var(--font-body)",fontWeight:600}}>Select All</button>
              <span style={{color:"var(--text3)"}}>·</span>
              <button onClick={()=>setSources([])} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,color:"var(--text3)",fontFamily:"var(--font-body)"}}>Clear</button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
            {SOURCES.map(src=>{
              const on=sources.includes(src.id);
              return(
                <button key={src.id} onClick={()=>tog(src.id)} style={{padding:"11px 14px",borderRadius:10,border:`1.5px solid ${on?src.color+"3A":"var(--border)"}`,background:on?`${src.color}0C`:"var(--glass)",cursor:"pointer",display:"flex",alignItems:"center",gap:10,transition:"all .2s",fontFamily:"var(--font-body)"}}>
                  <div style={{width:28,height:28,borderRadius:7,background:on?`${src.color}20`:"var(--glass2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:on?src.color:"var(--text3)",fontFamily:"var(--font-head)",transition:"all .2s",letterSpacing:.5}}>{src.ico.toUpperCase()}</div>
                  <span style={{fontSize:13,fontWeight:500,color:on?"var(--text)":"var(--text3)",transition:"color .2s"}}>{src.label}</span>
                  {on&&<span style={{marginLeft:"auto",width:7,height:7,borderRadius:"50%",background:"var(--green)",flexShrink:0,animation:"pulse 2s infinite"}}/>}
                </button>
              );
            })}
          </div>
          <p style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text3)",marginTop:11}}>Only publicly available professional data · Certified 3rd-party providers · GDPR compliant</p>
        </div>

        {/* Notice */}
        <div style={{background:"rgba(124,111,255,.06)",border:"1px solid rgba(124,111,255,.18)",borderRadius:10,padding:"11px 16px",marginBottom:22,display:"flex",gap:10,alignItems:"flex-start"}}>
          <span style={{fontSize:15,flexShrink:0}}>🛡</span>
          <p style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text2)",lineHeight:1.6,margin:0}}>All results are fully anonymised. Names, employers, contact details and social profiles are hidden until you unlock a profile. Each unlock uses <strong style={{color:"var(--teal)"}}>1 credit</strong>. GDPR & Swiss nDSG notification is sent automatically on every unlock.</p>
        </div>

        <button className="btn-p" onClick={go} disabled={searching||(mode==="ai"&&!prompt.trim())} style={{width:"100%",padding:"15px",fontSize:15,fontFamily:"var(--font-head)",fontWeight:700,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",gap:10,letterSpacing:.3,animation:searching?"none":"glow 3s infinite"}}>
          {searching?<><span style={{animation:"spin .8s linear infinite",display:"inline-block"}}>↻</span> Scanning {sources.length} sources…</>:<>✦ {mode==="ai"?"Run AI Search":"Find Candidates"} →</>}
        </button>
      </div>
    </div>
  );
}

/* ─── RESULTS ─── */
function ResultsPage({profiles,onProfile,onNewSearch}){
  const [sort,setSort]=useState("score");
  const [minScore,setMinScore]=useState(0);
  const [availOnly,setAvailOnly]=useState(false);
  const [shortlist,setShortlist]=useState([]);
  let list=[...profiles].filter(p=>p.score>=minScore&&(availOnly?p.avail:true));
  list.sort((a,b)=>sort==="score"?b.score-a.score:b.yoe-a.yoe);
  return(
    <div style={{flex:1,display:"flex",overflow:"hidden"}}>
      {/* Filter */}
      <div style={{width:210,background:"var(--bg2)",borderRight:"1px solid var(--border)",padding:"18px 12px",overflowY:"auto",flexShrink:0}}>
        <div style={{fontFamily:"var(--font-head)",fontSize:11,fontWeight:700,color:"var(--text3)",textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>Refine</div>
        <div style={{marginBottom:18}}>
          <div style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text2)",fontWeight:500,marginBottom:8}}>Sort by</div>
          {[["score","Match Score"],["yoe","Experience"]].map(([v,l])=>(
            <button key={v} onClick={()=>setSort(v)} style={{display:"block",width:"100%",padding:"8px 12px",borderRadius:8,border:`1px solid ${sort===v?"rgba(0,212,180,.28)":"var(--border)"}`,background:sort===v?"rgba(0,212,180,.07)":"var(--glass)",color:sort===v?"var(--teal)":"var(--text3)",fontFamily:"var(--font-body)",fontSize:13,cursor:"pointer",marginBottom:5,textAlign:"left",transition:"all .15s"}}>{sort===v&&"● "}{l}</button>
          ))}
        </div>
        <div style={{marginBottom:18}}>
          <div style={{display:"flex",justifyContent:"space-between",fontFamily:"var(--font-body)",fontSize:12,color:"var(--text2)",marginBottom:7}}>Min score<span style={{color:"var(--teal)",fontWeight:700}}>{minScore}%</span></div>
          <input type="range" min={0} max={90} step={5} value={minScore} onChange={e=>setMinScore(+e.target.value)} style={{width:"100%",accentColor:"var(--teal)",cursor:"pointer"}}/>
        </div>
        <div style={{marginBottom:18}}>
          <div style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text2)",fontWeight:500,marginBottom:9}}>Availability</div>
          <label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
            <div onClick={()=>setAvailOnly(!availOnly)} style={{width:34,height:20,borderRadius:10,background:availOnly?"var(--teal)":"var(--glass2)",border:`1px solid ${availOnly?"var(--teal)":"var(--border)"}`,position:"relative",transition:"all .2s",cursor:"pointer",flexShrink:0}}>
              <span style={{position:"absolute",top:2,left:availOnly?14:2,width:16,height:16,borderRadius:"50%",background:"#fff",transition:"left .2s",display:"block"}}/>
            </div>
            <span style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text2)"}}>Open signals only</span>
          </label>
        </div>
        {shortlist.length>0&&<div style={{background:"rgba(34,216,143,.07)",border:"1px solid rgba(34,216,143,.2)",borderRadius:10,padding:"12px",textAlign:"center"}}>
          <div style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:22,color:"var(--green)"}}>{shortlist.length}</div>
          <div style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text2)",marginTop:1}}>shortlisted</div>
        </div>}
      </div>
      {/* Grid */}
      <div style={{flex:1,overflowY:"auto",padding:"22px 28px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
          <div>
            <h2 style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:20,color:"var(--text)",marginBottom:3}}>{list.length} Anonymised Profiles Found</h2>
            <p style={{fontFamily:"var(--font-body)",fontSize:13,color:"var(--text3)"}}>Click a card to preview · Personal details hidden · Unlock to reveal</p>
          </div>
          <button className="btn-g" onClick={onNewSearch} style={{padding:"9px 18px",fontSize:13}}>← New Search</button>
        </div>
        <div style={{background:"rgba(255,181,71,.06)",border:"1px solid rgba(255,181,71,.18)",borderRadius:10,padding:"10px 14px",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
          <span>🔒</span><span style={{fontFamily:"var(--font-body)",fontSize:12,color:"rgba(255,181,71,.9)"}}>All profiles are anonymised. Names, employers, and contact details are hidden until you unlock. Each unlock costs 1 credit.</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(295px,1fr))",gap:14}}>
          {list.map((p,i)=>(
            <div key={p.id} className="card-hover glass" onClick={()=>onProfile(p)} style={{padding:20,cursor:"pointer",animation:`fadeUp .4s ease ${i*.05}s both`,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${sc(p.score)}33,${sc(p.score)})`}}/>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:42,height:42,borderRadius:"50%",background:"var(--glass2)",border:"2px dashed var(--border2)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text3)",fontSize:16,flexShrink:0}}>?</div>
                  <div>
                    <div style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:14,color:"var(--text)",marginBottom:1}}>{p.title}</div>
                    <div style={{fontFamily:"var(--font-body)",fontSize:11,color:"var(--text3)"}}>{p.industry}</div>
                  </div>
                </div>
                <ScoreBadge score={p.score}/>
              </div>
              <div style={{display:"flex",gap:14,marginBottom:12}}>
                {[["📍",p.loc],["⏱",`${p.yoe} yrs`]].map(([ico,v])=><span key={v} style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text3)",display:"flex",alignItems:"center",gap:3}}><span>{ico}</span>{v}</span>)}
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:13}}>
                {p.skills.slice(0,4).map((s,si)=><SkPill key={s} skill={s} matched={si<p.matched}/>)}
                {p.skills.length>4&&<span style={{fontFamily:"var(--font-body)",fontSize:11,color:"var(--text3)",alignSelf:"center"}}>+{p.skills.length-4}</span>}
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <span style={{width:7,height:7,borderRadius:"50%",background:p.avail?"var(--green)":"var(--text3)",display:"inline-block",animation:p.avail?"pulse 2s infinite":"none"}}/>
                  <span style={{fontFamily:"var(--font-body)",fontSize:11,color:p.avail?"var(--green)":"var(--text3)"}}>{p.avail?"Open to opportunities":"Not indicated"}</span>
                </div>
                <button onClick={e=>{e.stopPropagation();setShortlist(sl=>sl.includes(p.id)?sl.filter(x=>x!==p.id):[...sl,p.id]);}} style={{background:shortlist.includes(p.id)?"rgba(34,216,143,.1)":"var(--glass)",border:`1px solid ${shortlist.includes(p.id)?"rgba(34,216,143,.28)":"var(--border)"}`,color:shortlist.includes(p.id)?"var(--green)":"var(--text3)",borderRadius:8,padding:"4px 11px",fontSize:12,cursor:"pointer",fontFamily:"var(--font-body)",fontWeight:600,transition:"all .15s"}}>
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

/* ─── PROFILE MODAL ─── */
function ProfileModal({profile,credits,onClose,onUnlock,onPool,onPipeline,onInterview}){
  const [tab,setTab]=useState("overview");
  const [unlocked,setUnlocked]=useState(false);
  const [inPool,setInPool]=useState(false);
  const [inPipe,setInPipe]=useState(false);
  const [intDone,setIntDone]=useState(false);
  const [showUnlock,setShowUnlock]=useState(false);
  const [showInt,setShowInt]=useState(false);
  const [unlocking,setUnlocking]=useState(false);
  const [scheduling,setScheduling]=useState(false);
  const [aChecked,setAChecked]=useState(false);
  const [iChecked,setIChecked]=useState(false);
  if(!profile)return null;
  const TABS=[{id:"overview",l:"Overview"},{id:"skills",l:"Skills"},{id:"career",l:"Career"},{id:"insights",l:"AI Insights"}];

  function doUnlock(){setUnlocking(true);setTimeout(()=>{setUnlocking(false);setUnlocked(true);setShowUnlock(false);onUnlock(profile);},1500);}
  function doInt(){setScheduling(true);setTimeout(()=>{setScheduling(false);setIntDone(true);setShowInt(false);onInterview(profile);},1700);}

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(8,12,20,.88)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(10px)",animation:"fadeIn .2s ease"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:"min(900px,95vw)",maxHeight:"90vh",background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:20,display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:"0 40px 120px rgba(0,0,0,.65)",animation:"fadeUp .3s ease",position:"relative"}}>

        {/* Header */}
        <div style={{background:"linear-gradient(135deg,rgba(0,212,180,.08),rgba(124,111,255,.06))",borderBottom:"1px solid var(--border)",padding:"24px 28px",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:16}}>
            {unlocked?<Av idx={profile.av} size={58} name={profile.name}/>:<div style={{width:58,height:58,borderRadius:"50%",background:"var(--glass2)",border:"2px dashed var(--border2)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text3)",fontSize:22,flexShrink:0}}>?</div>}
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5,flexWrap:"wrap"}}>
                <h2 style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:21,color:"var(--text)"}}>{unlocked?profile.name:profile.title}</h2>
                <ScoreBadge score={profile.score}/>
                {unlocked&&<span className="tag" style={{background:"rgba(34,216,143,.1)",color:"var(--green)",border:"1px solid rgba(34,216,143,.22)"}}>🔓 Unlocked</span>}
              </div>
              <p style={{fontFamily:"var(--font-body)",fontSize:14,color:"var(--text2)",marginBottom:8}}>{unlocked?`${profile.title} · ${profile.employer}`:`${profile.yoe} yrs experience · ${profile.industry}`}</p>
              <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                {[["📍",profile.loc],["🎓",profile.edu.split(" ").slice(0,3).join(" ")]].map(([ico,v])=><span key={v} style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text3)",display:"flex",alignItems:"center",gap:4}}><span>{ico}</span>{v}</span>)}
                <span style={{display:"flex",alignItems:"center",gap:5,fontFamily:"var(--font-body)",fontSize:12,color:profile.avail?"var(--green)":"var(--text3)"}}>
                  <span style={{width:6,height:6,borderRadius:"50%",background:profile.avail?"var(--green)":"var(--text3)",display:"inline-block",animation:profile.avail?"pulse 2s infinite":"none"}}/>
                  {profile.avail?"Open to opportunities":"Availability not indicated"}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="btn-g" style={{width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,borderRadius:8,padding:0,flexShrink:0}}>×</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",borderBottom:"1px solid var(--border)",background:"var(--bg3)",flexShrink:0}}>
          {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"12px 0",border:"none",cursor:"pointer",fontFamily:"var(--font-body)",fontSize:13,fontWeight:600,transition:"all .15s",color:tab===t.id?"var(--teal)":"var(--text3)",background:tab===t.id?"var(--bg2)":"transparent",borderBottom:tab===t.id?"2px solid var(--teal)":"2px solid transparent"}}>{t.l}</button>)}
        </div>

        {/* Content */}
        <div style={{flex:1,overflowY:"auto",padding:"22px 28px"}}>
          {tab==="overview"&&(
            <div style={{animation:"fadeIn .3s ease"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:18}}>
                {[["Experience",`${profile.yoe} years total`],["Location",profile.loc],["Education",profile.edu],["Industry",profile.industry],...(unlocked?[["Email",profile.email],["LinkedIn",profile.linkedin],["GitHub",profile.github]]:[] )].map(([k,v])=>(
                  <div key={k} style={{background:"var(--glass)",border:"1px solid var(--border)",borderRadius:10,padding:"12px 14px"}}>
                    <div style={{fontFamily:"var(--font-body)",fontSize:10,color:"var(--text3)",textTransform:"uppercase",letterSpacing:.8,marginBottom:4}}>{k}</div>
                    <div style={{fontFamily:"var(--font-body)",fontSize:13,fontWeight:600,color:k==="Email"||k==="LinkedIn"||k==="GitHub"?"var(--teal)":"var(--text)",wordBreak:"break-all"}}>{v}</div>
                  </div>
                ))}
              </div>
              {!unlocked&&<div style={{background:"rgba(255,181,71,.06)",border:"1px solid rgba(255,181,71,.2)",borderRadius:10,padding:"13px 16px",marginBottom:18}}>
                <div style={{fontFamily:"var(--font-head)",fontSize:13,fontWeight:700,color:"var(--amber)",marginBottom:4}}>🔒 Hidden Until Unlocked</div>
                <div style={{fontFamily:"var(--font-body)",fontSize:13,color:"rgba(255,181,71,.8)",lineHeight:1.6}}>Full name · Email address · Phone number · LinkedIn & GitHub profiles · Current employer name</div>
              </div>}
              <div>
                <div style={{fontFamily:"var(--font-head)",fontSize:13,fontWeight:700,color:"var(--text)",marginBottom:9}}>Languages & Certifications</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {["English (Fluent)","German (Native)","French (B2)","CKA Certified","AWS Solutions Architect"].map(c=><span key={c} className="tag" style={{background:"rgba(124,111,255,.1)",color:"var(--violet)",border:"1px solid rgba(124,111,255,.22)"}}>{c}</span>)}
                </div>
              </div>
            </div>
          )}
          {tab==="skills"&&(
            <div style={{animation:"fadeIn .3s ease"}}>
              <div style={{fontFamily:"var(--font-head)",fontSize:14,fontWeight:700,color:"var(--text)",marginBottom:14}}>Skills Match Breakdown</div>
              {profile.skills.map((s,i)=>{const m=i<profile.matched;const pct=m?70+Math.floor(Math.abs(Math.sin(i*2))*25):12+Math.floor(Math.abs(Math.sin(i))*20);
                return <div key={s} style={{marginBottom:13}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{width:7,height:7,borderRadius:"50%",background:m?"var(--green)":"var(--text3)",display:"inline-block"}}/><span style={{fontFamily:"var(--font-body)",fontSize:13,fontWeight:600,color:m?"var(--text)":"var(--text3)"}}>{s}</span></div>
                    <span style={{fontFamily:"var(--font-body)",fontSize:12,color:m?"var(--green)":"var(--text3)",fontWeight:600}}>{m?`✓ ${pct}%`:"Not indicated"}</span>
                  </div>
                  <div className="pbar-track"><div style={{width:`${pct}%`,height:"100%",background:m?"linear-gradient(90deg,var(--teal),var(--green))":"var(--glass2)",borderRadius:3}}/></div>
                </div>;
              })}
            </div>
          )}
          {tab==="career"&&(
            <div style={{animation:"fadeIn .3s ease"}}>
              <div style={{fontFamily:"var(--font-head)",fontSize:14,fontWeight:700,color:"var(--text)",marginBottom:16}}>Career Timeline {!unlocked&&<span style={{fontSize:11,fontWeight:400,color:"var(--text3)"}}>(anonymised until unlocked)</span>}</div>
              {[{p:"2021 – Present",r:profile.title,c:unlocked?profile.employer:profile.industry,cur:true},{p:"2018 – 2021",r:"Mid-level DevOps Engineer",c:unlocked?"Zühlke Engineering AG":"European Technology Consultancy"},{p:"2015 – 2018",r:"Junior Software Engineer",c:unlocked?"Ergon Informatik AG":"Swiss Software Consultancy"}].map((item,i)=>(
                <div key={i} style={{display:"flex",gap:14,marginBottom:4}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <div style={{width:11,height:11,borderRadius:"50%",background:item.cur?"var(--teal)":"var(--glass2)",border:`2px solid ${item.cur?"var(--teal)":"var(--border)"}`,flexShrink:0,marginTop:3}}/>
                    {i<2&&<div style={{width:2,flex:1,background:"var(--border)",margin:"4px 0"}}/>}
                  </div>
                  <div style={{paddingBottom:18}}>
                    <div style={{fontFamily:"var(--font-body)",fontSize:11,color:"var(--text3)",marginBottom:3}}>{item.p}</div>
                    <div style={{fontFamily:"var(--font-head)",fontSize:14,fontWeight:700,color:"var(--text)",marginBottom:2}}>{item.r}</div>
                    <div style={{fontFamily:"var(--font-body)",fontSize:13,color:unlocked?"var(--teal)":"var(--text3)",fontStyle:unlocked?"normal":"italic"}}>{item.c}</div>
                  </div>
                </div>
              ))}
              <div style={{background:"var(--glass)",border:"1px solid var(--border)",borderRadius:10,padding:"12px 14px"}}>
                <span style={{fontFamily:"var(--font-body)",fontSize:13,color:"var(--text2)"}}>🎓 {profile.edu} — {unlocked?"ETH Zürich":"Top European Technical University"}, 2015</span>
              </div>
            </div>
          )}
          {tab==="insights"&&(
            <div style={{animation:"fadeIn .3s ease"}}>
              <div style={{background:"linear-gradient(135deg,rgba(0,212,180,.07),rgba(124,111,255,.07))",border:"1px solid rgba(0,212,180,.18)",borderRadius:12,padding:"18px 20px",marginBottom:20}}>
                <div style={{fontFamily:"var(--font-head)",fontSize:13,fontWeight:700,color:"var(--teal)",marginBottom:9}}>✦ AI Suitability Analysis</div>
                <p style={{fontFamily:"var(--font-body)",fontSize:13,color:"var(--text2)",lineHeight:1.7,margin:0}}>This profile is a <strong style={{color:"var(--text)"}}>strong match</strong> for the role. The candidate demonstrates {profile.matched}/{profile.skills.length} required skills with evidence of hands-on deployment at scale. Their {profile.yoe}-year career shows progressive infrastructure leadership. Location in Switzerland eliminates relocation friction.</p>
              </div>
              {[["Skills Alignment",92,"var(--teal)"],["Experience Level",88,"var(--green)"],["Location Fit",100,"var(--violet)"],["Industry Background",74,"var(--amber)"],["Education",82,"var(--teal)"]].map(([l,v,c])=>(
                <div key={l} style={{marginBottom:13}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontFamily:"var(--font-body)",fontSize:13,color:"var(--text2)",fontWeight:500}}>{l}</span>
                    <span style={{fontFamily:"var(--font-body)",fontSize:13,color:c,fontWeight:700}}>{v}%</span>
                  </div>
                  <div className="pbar-track"><div style={{width:`${v}%`,height:"100%",background:c,borderRadius:3,opacity:.8}}/></div>
                </div>
              ))}
              {profile.score<75&&<div style={{background:"rgba(255,85,114,.07)",border:"1px solid rgba(255,85,114,.2)",borderRadius:10,padding:"12px 14px",marginTop:14}}>
                <div style={{fontFamily:"var(--font-head)",fontSize:12,fontWeight:700,color:"var(--red)",marginBottom:3}}>⚠ Gap Detected</div>
                <div style={{fontFamily:"var(--font-body)",fontSize:12,color:"rgba(255,85,114,.8)"}}>Missing {profile.skills.length-profile.matched} required skills. Review Skills tab before unlocking.</div>
              </div>}
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div style={{borderTop:"1px solid var(--border)",padding:"16px 28px",flexShrink:0,background:"var(--bg3)"}}>
          {!unlocked?(
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <div style={{display:"flex",gap:8,flex:1}}>
                <button className="btn-g" onClick={()=>setInPool(p=>!p)} style={{flex:1,padding:"10px 0",fontSize:13,borderColor:inPool?"rgba(34,216,143,.3)":undefined,color:inPool?"var(--green)":undefined,background:inPool?"rgba(34,216,143,.07)":undefined}}>
                  {inPool?"✓ Shortlisted for Pool":"❑ Add to Pool"}
                </button>
                <button className="btn-g" onClick={()=>setInPipe(p=>!p)} style={{flex:1,padding:"10px 0",fontSize:13,borderColor:inPipe?"rgba(0,212,180,.3)":undefined,color:inPipe?"var(--teal)":undefined,background:inPipe?"rgba(0,212,180,.07)":undefined}}>
                  {inPipe?"✓ In Pipeline":"⟳ Add to Pipeline"}
                </button>
              </div>
              <button className="btn-p" onClick={()=>setShowUnlock(true)} style={{padding:"10px 26px",fontSize:14,fontFamily:"var(--font-head)",fontWeight:700,flexShrink:0}}>🔓 Unlock — 1 credit</button>
            </div>
          ):(
            <div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9,marginBottom:10}}>
                <button className="btn-g" onClick={()=>{setInPool(true);onPool(profile);}} style={{padding:"11px",fontSize:13,fontWeight:600,borderColor:inPool?"rgba(34,216,143,.3)":undefined,color:inPool?"var(--green)":undefined,background:inPool?"rgba(34,216,143,.07)":undefined}}>{inPool?"✓ In Candidate Pool":"❑ Add to Pool"}</button>
                <button className="btn-g" onClick={()=>{setInPipe(true);onPipeline(profile);}} style={{padding:"11px",fontSize:13,fontWeight:600,borderColor:inPipe?"rgba(0,212,180,.3)":undefined,color:inPipe?"var(--teal)":undefined,background:inPipe?"rgba(0,212,180,.07)":undefined}}>{inPipe?"✓ In Pipeline":"⟳ Add to Pipeline"}</button>
                <button onClick={()=>setShowInt(true)} style={{padding:"11px",fontSize:13,fontWeight:600,borderRadius:10,border:`1px solid ${intDone?"rgba(124,111,255,.3)":"rgba(124,111,255,.2)"}`,background:intDone?"rgba(124,111,255,.1)":"rgba(124,111,255,.06)",color:"var(--violet)",cursor:"pointer",fontFamily:"var(--font-body)",transition:"all .15s"}}>{intDone?"✓ Interview Scheduled":"◷ Schedule AI Interview — 3 cr"}</button>
              </div>
              <div style={{background:"rgba(34,216,143,.05)",border:"1px solid rgba(34,216,143,.15)",borderRadius:9,padding:"9px 14px",fontSize:12,fontFamily:"var(--font-body)",color:"rgba(34,216,143,.8)"}}>✓ Profile unlocked. GDPR notification sent to candidate automatically. Source: AI Sourcing Hub.</div>
            </div>
          )}
        </div>

        {/* Unlock modal */}
        {showUnlock&&(
          <div style={{position:"absolute",inset:0,background:"rgba(8,12,20,.85)",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:20,backdropFilter:"blur(6px)",zIndex:10,animation:"fadeIn .2s ease"}}>
            <div style={{background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:16,padding:"30px 34px",width:"min(430px,90%)",boxShadow:"0 24px 64px rgba(0,0,0,.6)"}}>
              <div style={{textAlign:"center",marginBottom:22}}>
                <div style={{fontSize:38,marginBottom:8}}>🔓</div>
                <h3 style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:19,color:"var(--text)",marginBottom:6}}>Unlock Profile</h3>
                <p style={{fontFamily:"var(--font-body)",fontSize:13,color:"var(--text2)",lineHeight:1.5}}>Full contact details will be revealed immediately.</p>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",background:"var(--glass)",border:"1px solid var(--border)",borderRadius:12,padding:"14px 18px",marginBottom:18}}>
                <div><div style={{fontFamily:"var(--font-body)",fontSize:11,color:"var(--text3)",textTransform:"uppercase",letterSpacing:.7,marginBottom:3}}>Cost</div><div style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:26,color:"var(--teal)"}}>1 credit</div></div>
                <div style={{textAlign:"right"}}><div style={{fontFamily:"var(--font-body)",fontSize:11,color:"var(--text3)",textTransform:"uppercase",letterSpacing:.7,marginBottom:3}}>Remaining After</div><div style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:26,color:credits-1<10?"var(--red)":"var(--text)"}}>{credits-1}</div></div>
              </div>
              <label style={{display:"flex",gap:11,alignItems:"flex-start",cursor:"pointer",marginBottom:20,padding:"13px 14px",background:"rgba(255,181,71,.05)",border:"1px solid rgba(255,181,71,.18)",borderRadius:10}}>
                <input type="checkbox" checked={aChecked} onChange={e=>setAChecked(e.target.checked)} style={{accentColor:"var(--teal)",width:15,height:15,marginTop:1,flexShrink:0,cursor:"pointer"}}/>
                <span style={{fontFamily:"var(--font-body)",fontSize:12,color:"rgba(255,181,71,.9)",lineHeight:1.55}}>I confirm I will only contact this candidate for legitimate recruitment purposes and comply with GDPR & Swiss nDSG requirements. I acknowledge the candidate will be notified automatically.</span>
              </label>
              <div style={{display:"flex",gap:9}}>
                <button className="btn-g" onClick={()=>{setShowUnlock(false);setAChecked(false);}} style={{flex:1,padding:"12px"}}>Cancel</button>
                <button className="btn-p" onClick={doUnlock} disabled={!aChecked||unlocking} style={{flex:2,padding:"12px",fontSize:14,fontFamily:"var(--font-head)",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  {unlocking?<><span style={{animation:"spin .8s linear infinite",display:"inline-block"}}>↻</span> Unlocking…</>:"Confirm Unlock"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI Interview modal */}
        {showInt&&(
          <div style={{position:"absolute",inset:0,background:"rgba(8,12,20,.85)",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:20,backdropFilter:"blur(6px)",zIndex:10,animation:"fadeIn .2s ease"}}>
            <div style={{background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:16,padding:"30px 34px",width:"min(430px,90%)",boxShadow:"0 24px 64px rgba(0,0,0,.6)"}}>
              <div style={{textAlign:"center",marginBottom:22}}>
                <div style={{fontSize:38,marginBottom:8}}>🎙</div>
                <h3 style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:19,color:"var(--text)",marginBottom:6}}>Schedule AI Interview</h3>
                <p style={{fontFamily:"var(--font-body)",fontSize:13,color:"var(--text2)",lineHeight:1.5}}>An AI-powered screening interview will be sent to the candidate automatically.</p>
              </div>
              <div style={{background:"var(--glass)",border:"1px solid rgba(124,111,255,.2)",borderRadius:12,padding:"14px 18px",marginBottom:18}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                  <div><div style={{fontFamily:"var(--font-body)",fontSize:11,color:"var(--text3)",textTransform:"uppercase",letterSpacing:.7,marginBottom:3}}>Cost</div><div style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:26,color:"var(--violet)"}}>3 credits</div></div>
                  <div style={{textAlign:"right"}}><div style={{fontFamily:"var(--font-body)",fontSize:11,color:"var(--text3)",textTransform:"uppercase",letterSpacing:.7,marginBottom:3}}>Remaining After</div><div style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:26,color:credits-3<10?"var(--red)":"var(--text)"}}>{credits-3}</div></div>
                </div>
                <div style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text3)",lineHeight:1.55}}>Includes: AI screening questions · Automated scoring · Video response analysis · Written report</div>
              </div>
              <label style={{display:"flex",gap:11,alignItems:"flex-start",cursor:"pointer",marginBottom:20,padding:"13px 14px",background:"rgba(124,111,255,.05)",border:"1px solid rgba(124,111,255,.18)",borderRadius:10}}>
                <input type="checkbox" checked={iChecked} onChange={e=>setIChecked(e.target.checked)} style={{accentColor:"var(--violet)",width:15,height:15,marginTop:1,flexShrink:0,cursor:"pointer"}}/>
                <span style={{fontFamily:"var(--font-body)",fontSize:12,color:"rgba(124,111,255,.9)",lineHeight:1.55}}>I confirm the candidate has consented to an AI-conducted interview and I have the right to process their responses under GDPR.</span>
              </label>
              <div style={{display:"flex",gap:9}}>
                <button className="btn-g" onClick={()=>{setShowInt(false);setIChecked(false);}} style={{flex:1,padding:"12px"}}>Cancel</button>
                <button onClick={doInt} disabled={!iChecked||scheduling} style={{flex:2,padding:"12px",fontSize:14,fontFamily:"var(--font-head)",fontWeight:700,borderRadius:10,border:"none",cursor:iChecked?"pointer":"default",background:iChecked?"linear-gradient(135deg,var(--violet),#a855f7)":"var(--glass)",color:iChecked?"#fff":"var(--text3)",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all .2s"}}>
                  {scheduling?<><span style={{animation:"spin .8s linear infinite",display:"inline-block"}}>↻</span> Scheduling…</>:"◷ Schedule Interview"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── CREDITS DASHBOARD ─── */
function CreditsDash({credits,unlocked,interviews}){
  const TOTAL=220;
  const used=TOTAL-credits;
  const ulCost=unlocked;
  const inCost=interviews*3;
  const pct=v=>Math.min(100,Math.round((v/TOTAL)*100));
  return(
    <div style={{flex:1,overflowY:"auto",padding:"32px 40px"}}>
      <div style={{maxWidth:880,margin:"0 auto"}}>
        <div style={{marginBottom:26}}>
          <h2 style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:26,color:"var(--text)",marginBottom:5}}>Credits Dashboard</h2>
          <p style={{fontFamily:"var(--font-body)",fontSize:14,color:"var(--text2)"}}>Track your credit balance and usage across sourcing and AI interviews</p>
        </div>

        {/* Balance hero */}
        <div style={{background:"linear-gradient(135deg,rgba(0,212,180,.09),rgba(124,111,255,.09))",border:"1px solid rgba(0,212,180,.18)",borderRadius:20,padding:"28px 32px",marginBottom:22,position:"relative",overflow:"hidden"}}>
          <div className="orb" style={{width:280,height:280,background:"rgba(0,212,180,.04)",top:-80,right:-60}}/>
          <div style={{display:"flex",alignItems:"center",gap:36,flexWrap:"wrap"}}>
            <div style={{flexShrink:0}}>
              <div style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text3)",textTransform:"uppercase",letterSpacing:.9,marginBottom:5}}>Available Balance</div>
              <div style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:58,color:"var(--teal)",lineHeight:1}}>{credits}</div>
              <div style={{fontFamily:"var(--font-body)",fontSize:13,color:"var(--text2)",marginTop:3}}>credits remaining of {TOTAL} purchased</div>
            </div>
            <div style={{flex:1,minWidth:240}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text3)"}}>Used: {used} credits</span>
                <span style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--teal)"}}>{100-pct(used)}% remaining</span>
              </div>
              <div style={{height:10,background:"var(--glass2)",borderRadius:5,overflow:"hidden",marginBottom:18}}>
                <div style={{width:`${pct(used)}%`,height:"100%",background:"linear-gradient(90deg,var(--teal),var(--violet))",borderRadius:5}}/>
              </div>
              {[["Profile Unlocks",ulCost,"var(--teal)",`${unlocked} × 1 cr`],["AI Interviews",inCost,"var(--violet)",`${interviews} × 3 cr`]].map(([l,v,c,s])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:10,marginBottom:7}}>
                  <div style={{width:9,height:9,borderRadius:2,background:c,flexShrink:0}}/>
                  <span style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text2)",width:120}}>{l}</span>
                  <div style={{flex:1,height:5,background:"var(--glass2)",borderRadius:3,overflow:"hidden"}}><div style={{width:`${pct(v)}%`,height:"100%",background:c,borderRadius:3}}/></div>
                  <span style={{fontFamily:"var(--font-body)",fontSize:11,color:"var(--text3)",width:80,textAlign:"right"}}>{s}</span>
                  <span style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:14,color:c,width:28,textAlign:"right"}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:22}}>
          {[["⬡","Purchased",TOTAL,"var(--text2)","Growth Bundle"],["🔓","Unlocked",unlocked,"var(--teal)",`${ulCost} credits used`],["🎙","AI Interviews",interviews,"var(--violet)",`${inCost} credits used`],["💰","Balance",credits,"var(--green)","Current balance"]].map(([ico,l,v,c,s])=>(
            <div key={l} style={{background:"var(--glass)",border:"1px solid var(--border)",borderRadius:12,padding:"18px 18px"}}>
              <div style={{fontSize:18,marginBottom:9}}>{ico}</div>
              <div style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:26,color:c,marginBottom:3}}>{v}</div>
              <div style={{fontFamily:"var(--font-body)",fontSize:13,color:"var(--text)",fontWeight:500,marginBottom:2}}>{l}</div>
              <div style={{fontFamily:"var(--font-body)",fontSize:11,color:"var(--text3)"}}>{s}</div>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:22}}>
          {/* Pricing */}
          <div style={{background:"var(--glass)",border:"1px solid var(--border)",borderRadius:14,padding:"22px"}}>
            <div style={{fontFamily:"var(--font-head)",fontSize:14,fontWeight:700,color:"var(--text)",marginBottom:14}}>Credit Costs</div>
            {[["🔍","Search & Preview","Free","Unlimited, anonymised"],["🔓","Unlock Profile","1 credit","Full PII revealed"],["🎙","AI Screening Interview","3 credits","Scoring + video report"],["📋","AI Skills Interview","5 credits","Deep technical assessment"]].map(([ico,l,cost,d])=>(
              <div key={l} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"11px 0",borderBottom:"1px solid var(--border)"}}>
                <span style={{fontSize:16,flexShrink:0}}>{ico}</span>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2}}>
                    <span style={{fontFamily:"var(--font-body)",fontSize:13,fontWeight:600,color:"var(--text)"}}>{l}</span>
                    <span className="tag" style={{background:"rgba(0,212,180,.1)",color:"var(--teal)",border:"1px solid rgba(0,212,180,.2)"}}>{cost}</span>
                  </div>
                  <span style={{fontFamily:"var(--font-body)",fontSize:11,color:"var(--text3)"}}>{d}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Top-up */}
          <div style={{background:"var(--glass)",border:"1px solid var(--border)",borderRadius:14,padding:"22px"}}>
            <div style={{fontFamily:"var(--font-head)",fontSize:14,fontWeight:700,color:"var(--text)",marginBottom:14}}>Top Up Credits</div>
            {[["Starter","50 credits","CHF 49",null],["Growth","220 credits","CHF 179","Best value"],["Professional","500 credits","CHF 369","+15% bonus"],["Enterprise","Custom","Custom","Volume pricing"]].map(([n,cr,p,badge])=>(
              <div key={n} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",borderRadius:10,border:"1px solid var(--border)",marginBottom:7,background:"var(--glass)",transition:"all .2s",cursor:"pointer"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(0,212,180,.28)";e.currentTarget.style.background="rgba(0,212,180,.04)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--glass)";}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
                    <span style={{fontFamily:"var(--font-head)",fontSize:14,fontWeight:700,color:"var(--text)"}}>{n}</span>
                    {badge&&<span className="tag" style={{background:"rgba(255,181,71,.1)",color:"var(--amber)",border:"1px solid rgba(255,181,71,.22)",fontSize:10}}>{badge}</span>}
                  </div>
                  <span style={{fontFamily:"var(--font-body)",fontSize:12,color:"var(--text3)"}}>{cr}</span>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:15,color:"var(--teal)"}}>{p}</div>
                  <div style={{fontFamily:"var(--font-body)",fontSize:11,color:"var(--text3)"}}>per bundle</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction history */}
        <div style={{background:"var(--glass)",border:"1px solid var(--border)",borderRadius:14,padding:"22px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div style={{fontFamily:"var(--font-head)",fontSize:14,fontWeight:700,color:"var(--text)"}}>Transaction History</div>
            <button className="btn-g" style={{padding:"7px 14px",fontSize:12}}>⬇ Export CSV</button>
          </div>
          {TX_HISTORY.map((tx,i)=>(
            <div key={tx.id} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:i<TX_HISTORY.length-1?"1px solid var(--border)":"none"}}>
              <div style={{width:34,height:34,borderRadius:9,background:tx.type==="topup"?"rgba(34,216,143,.1)":tx.type==="interview"?"rgba(124,111,255,.1)":"rgba(0,212,180,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{tx.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"var(--font-body)",fontSize:13,color:"var(--text)",fontWeight:500,marginBottom:1}}>{tx.label}</div>
                <div style={{fontFamily:"var(--font-body)",fontSize:11,color:"var(--text3)"}}>{tx.date}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"var(--font-head)",fontWeight:700,fontSize:14,color:tx.type==="topup"?"var(--green)":"var(--text2)"}}>{tx.type==="topup"?`+${Math.abs(tx.cost)}`:`−${tx.cost}`}</div>
                <div style={{fontFamily:"var(--font-body)",fontSize:11,color:"var(--text3)"}}>credits</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({title}){return<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"var(--text3)",fontFamily:"var(--font-body)"}}><div style={{fontSize:44,marginBottom:14,opacity:.25}}>◎</div><div style={{fontFamily:"var(--font-head)",fontSize:18,color:"var(--text2)",marginBottom:6}}>{title}</div><div style={{fontSize:13}}>Coming soon</div></div>;}

/* ─── APP ─── */
export default function App(){
  const [page,setPage]=useState("sourcing");
  const [sub,setSub]=useState("search");
  const [credits,setCredits]=useState(47);
  const [selected,setSelected]=useState(null);
  const [unlocked,setUnlocked]=useState(0);
  const [pooled,setPooled]=useState(0);
  const [piped,setPiped]=useState(0);
  const [interviews,setInterviews]=useState(0);
  const [toasts,setToasts]=useState([]);
  function toast(msg,type="info"){const id=Date.now();setToasts(t=>[...t,{id,msg,type}]);}
  function rmToast(id){setToasts(t=>t.filter(x=>x.id!==id));}
  function goPage(p){setPage(p);if(p==="sourcing")setSub("search");}
  return(
    <div style={{display:"flex",height:"100vh",background:"var(--bg)",overflow:"hidden"}}>
      <style>{css}</style>
      <Sidebar page={page} setPage={goPage} credits={credits}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <Topbar page={page} credits={credits} unlocked={unlocked} pooled={pooled} piped={piped}/>
        <div style={{flex:1,display:"flex",overflow:"hidden"}}>
          {page==="sourcing"&&sub==="search"&&<SearchPage onSearch={()=>setSub("results")}/>}
          {page==="sourcing"&&sub==="results"&&<ResultsPage profiles={PROFILES} onProfile={setSelected} onNewSearch={()=>setSub("search")}/>}
          {page==="credits"&&<CreditsDash credits={credits} unlocked={unlocked} interviews={interviews}/>}
          {["pipeline","pool","interviews","jobs","settings"].includes(page)&&<PlaceholderPage title={{pipeline:"Job Pipelines",pool:"Candidate Pool",interviews:"AI Interviews",jobs:"Jobs",settings:"Settings"}[page]}/>}
        </div>
      </div>
      {selected&&<ProfileModal profile={selected} credits={credits} onClose={()=>setSelected(null)} onUnlock={p=>{setCredits(c=>c-1);setUnlocked(c=>c+1);toast(`Profile unlocked — 1 credit used. GDPR notification sent to ${p.name}.`,"success");}} onPool={p=>{setPooled(c=>c+1);toast(`${p.name} added to Candidate Pool ✓`,"success");}} onPipeline={p=>{setPiped(c=>c+1);toast(`${p.name} added to Job Pipeline ✓`,"info");}} onInterview={p=>{setCredits(c=>c-3);setInterviews(c=>c+1);toast(`AI Interview scheduled for ${p.name} — 3 credits used ✓`,"success");}}/>}
      <div style={{position:"fixed",bottom:24,right:24,zIndex:9999,display:"flex",flexDirection:"column",gap:9,alignItems:"flex-end"}}>
        {toasts.map(t=><Toast key={t.id} msg={t.msg} type={t.type} onClose={()=>rmToast(t.id)}/>)}
      </div>
    </div>
  );
}