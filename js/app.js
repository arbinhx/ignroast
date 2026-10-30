(() => {
  const $ = id => document.getElementById(id);
  const input=$("nameInput"), roastBtn=$("roastBtn"), loading=$("loading"), result=$("resultSection");
  let lastData=null,lastAvatar="";
  $("year").textContent=new Date().getFullYear();
  const modes={gamer:"gamer",uncle:"uncle",random:"random"};
  function setMode(mode){$("nameInput").dataset.mode=mode;if(mode==="gamer")input.placeholder="Enter your gamer tag...";else if(mode==="uncle")input.placeholder="Enter the uncle's legendary name...";else input.placeholder="Anything goes. Absolutely anything...";}
  document.querySelectorAll("[data-preset]").forEach(b=>b.addEventListener("click",()=>{setMode(b.dataset.preset);if(b.dataset.preset==="random")input.value=["xX_DarkLegend_Xx","UncleBreakingNews","Potato.exe","AuraKing404"][Math.floor(Math.random()*4)];input.focus();}));
  $("randomBtn").addEventListener("click",()=>{input.value=["xX_DarkLegend_Xx","UncleBreakingNews","Potato.exe","AuraKing404","NoScopeNoodle","CaptainBuffering"][Math.floor(Math.random()*6)];input.dataset.mode="random";});
  function show(data,info){
    lastData=data;lastAvatar=info.avatar;
    $("subjectName").textContent=data.name.toUpperCase();$("auraTitle").textContent=data.title;
    $("score").textContent=data.score;$("sweatScore").textContent=data.sweat+"%";$("boomerScore").textContent=data.boomer+"%";$("auraScore").textContent=data.aura+"%";
    $("scoreLabel").textContent=data.score>75?"MAXIMUM CRINGE":"CRINGE INDEX";
    $("meterFill").style.width=data.score+"%";$("roastList").replaceChildren(...data.lines.map(t=>{const li=document.createElement("li");li.textContent=t;return li;}));
    $("avatar").src=info.avatar;$("cardDate").textContent=new Date().toLocaleDateString();
    $("apiNote").textContent=info.note+(info.advice?" Wisdom drop: "+info.advice:"");
    loading.hidden=true;result.hidden=false;result.scrollIntoView({behavior:"smooth",block:"start"});
  }
  async function roast(){
    const name=input.value.trim();$("errorMsg").hidden=true;
    if(!name){$("errorMsg").textContent="Type a name first. The scanner can't roast invisible targets."; $("errorMsg").hidden=false;input.focus();return;}
    if(name.length>32){$("errorMsg").textContent="Keep it under 32 characters."; $("errorMsg").hidden=false;return;}
    roastBtn.disabled=true;result.hidden=true;loading.hidden=false;
    const titles=["ANALYZING AURA...","CHECKING COFFEE LEVELS...","CONSULTING THE VIBE COUNCIL..."];
    let n=0;$("loadingTitle").textContent=titles[n];
    const cycle=setInterval(()=>{$("loadingTitle").textContent=titles[++n%titles.length];},650);
    try{
      const mode=input.dataset.mode||"general";
      const apiMode=mode==="gamer"&&/^[a-zA-Z0-9_]{3,16}$/.test(name)?"minecraft":name.startsWith("@")?"github":"none";
      const info=await PublicAPIs.enrich(apiMode==="github"?name.slice(1):name,apiMode);
      const data=RoastEngine.generate(name,mode==="random"?"general":mode,info.extra||"");
      show(data,info);
    }catch(e){
      const data=RoastEngine.generate(name,input.dataset.mode||"general");
      show(data,{avatar:PublicAPIs.avatarUrl(name),note:"Offline fallback engine active."});
    }finally{clearInterval(cycle);roastBtn.disabled=false;}
  }
  roastBtn.addEventListener("click",roast);input.addEventListener("keydown",e=>{if(e.key==="Enter")roast();});
  $("againBtn").addEventListener("click",()=>{if(lastData){input.value=lastData.name;roast();}});
  $("downloadBtn").addEventListener("click",()=>lastData&&CardTools.download(lastData,lastAvatar));
  $("copyBtn").addEventListener("click",async()=>{if(!lastData)return;const text=`${lastData.name} — ${lastData.title} (${lastData.score}/100)\n${lastData.lines.join("\n")}\nMade with IGNRoast`;try{await navigator.clipboard.writeText(text);$("copyBtn").textContent="✓ Copied";setTimeout(()=>$("copyBtn").textContent="▣ Copy roast",1600);}catch(e){alert(text);}});
  $("shareBtn").addEventListener("click",async()=>{if(!lastData)return;const text=`${lastData.name}: ${lastData.title} — ${lastData.score}/100. Roasted by IGNRoast!`;if(navigator.share){try{await navigator.share({title:"My IGNRoast verdict",text,url:location.href});}catch(e){}}else{await navigator.clipboard.writeText(text);$("shareBtn").textContent="✓ Link copied";}});
  $("creatorToggle").addEventListener("click",()=>{const body=$("creatorBody"),open=body.hidden;body.hidden=!open;$("creatorToggle").setAttribute("aria-expanded",String(open));$("creatorChevron").textContent=open?"−":"＋";});
  const creatorImg=$("creatorAvatar");creatorImg.addEventListener("error",()=>{if(!creatorImg.dataset.fallback){creatorImg.dataset.fallback="png";creatorImg.src="./image.png";}else{creatorImg.onerror=null;creatorImg.src="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="#10243d"/><text x="50" y="62" font-size="38" text-anchor="middle" fill="#00f0ff" font-family="Arial">A</text></svg>');}});
  if(CONFIG.ENABLE_ADS)document.querySelectorAll(".ad-slot").forEach(el=>{el.hidden=false;el.classList.add("is-enabled");});
  document.querySelectorAll(".coffee-link,.coffee-btn").forEach(a=>a.href=CONFIG.BUY_ME_A_COFFEE_URL);
})();
