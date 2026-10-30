/* Optional public endpoints. Every request is bounded by a timeout and safe fallback. */
const PublicAPIs = (() => {
  async function timedFetch(url, options={}) {
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(), CONFIG.API_TIMEOUT_MS);
    try {
      const response = await fetch(url,{...options,signal:controller.signal});
      if(!response.ok) throw new Error("HTTP "+response.status);
      return await response.json();
    } finally { clearTimeout(timer); }
  }
  function avatarUrl(name) {
    return "https://api.dicebear.com/9.x/bottts-neutral/svg?seed="+encodeURIComponent(name)+"&backgroundColor=0a0f1d,111d35&eyes=bulging,shade";
  }
  async function enrich(name, mode) {
    const info = {avatar:avatarUrl(name), note:"Local roast engine active. Public profile lookup is optional."};
    if(mode==="github" && CONFIG.ENABLE_GITHUB_LOOKUP) {
      try {
        const u = await timedFetch("https://api.github.com/users/"+encodeURIComponent(name));
        info.extra = `Public GitHub scan: ${Number(u.public_repos)||0} public repos and ${Number(u.followers)||0} followers.`;
        info.note = "GitHub public profile data found.";
      } catch(e) { info.note = "GitHub lookup unavailable; local roast engine took over."; }
    }
    if(mode==="minecraft" && CONFIG.ENABLE_MINECRAFT_LOOKUP) {
      try {
        const d = await timedFetch("https://api.mojang.com/users/profiles/minecraft/"+encodeURIComponent(name));
        if(d && d.name) { info.extra = "Minecraft profile confirmed. The block universe knows this name."; info.note="Minecraft profile found."; }
      } catch(e) { info.note = "No public Minecraft profile found; local engine active."; }
    }
    if(CONFIG.ENABLE_ADVICE_SLIP) {
      try {
        const a = await timedFetch("https://api.adviceslip.com/advice",{cache:"no-store"});
        if(a?.slip?.advice) info.advice = a.slip.advice;
      } catch(e) { /* optional API: silently skip */ }
    }
    return info;
  }
  return {avatarUrl,enrich};
})();
