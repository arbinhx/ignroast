/* Local-first roast generator. The combinations below produce well over 500 variations. */
const RoastEngine = (() => {
  const openers = [
    "Your username has the confidence of a final boss and the strategy of a loading screen.",
    "That name sounds like it was generated during a Wi-Fi outage.",
    "Your vibe is giving tutorial level that somehow needs a walkthrough.",
    "This username has three side quests and no main storyline.",
    "Your aura just asked the server if it can reconnect.",
    "That tag sounds like a keyboard fell down the stairs and called it branding.",
    "The name is bold. The execution is still buffering.",
    "You have the energy of someone who says 'one last game' at 2:47 AM.",
    "This name walked into the lobby and the lobby requested a transfer.",
    "Your profile looks like it has a premium subscription to confusion."
  ];
  const gamer = [
    "Your crosshair has trust issues and your aim is negotiating with the ceiling.",
    "You call it strategy; the replay calls it a sightseeing tour.",
    "Your rank is doing charity work for your confidence.",
    "The only thing you clutch consistently is the snack packet.",
    "Your gaming chair has more wins than your account.",
    "You warm up for 40 minutes to become the warm-up match.",
    "Your ping has a better reaction time than you do.",
    "Your loadout is legendary; your decision-making is still in beta."
  ];
  const uncle = [
    "You forward 'GOOD MORNING' images like it's a full-time government position.",
    "Your news source is a family group chat with 46 unread messages.",
    "You type 'share maximum' before checking whether the story is from 2014.",
    "Your phone gallery has 900 flowers and exactly zero free storage.",
    "You treat every forwarded message like it came from the national archive.",
    "Your Facebook comment starts with 'Nowadays generation...' and ends with a lecture."
  ];
  const general = [
    "Your bio says 'limited edition' but the factory forgot the instructions.",
    "You have the mysterious aura of a password hint nobody understands.",
    "Your notification sound probably has more personality than your profile.",
    "Your brand identity is still waiting for its identity.",
    "Even autocorrect saw this name and decided to stay out of it.",
    "Your vibe is a software update that asks to restart at the worst time.",
    "You bring background-character energy to your own highlight reel.",
    "Your name is memorable. The reason is currently under investigation."
  ];
  const endings = [
    "Verdict: harmless chaos with premium confidence.",
    "Final rating: needs a patch, not a personality transplant.",
    "The aura committee has requested a second opinion.",
    "Respectfully, the vibes are still installing.",
    "Official status: certified main-character-in-training."
  ];
  const titles = [
    "CERTIFIED SIDE-QUEST NPC","LEVEL 99 WIFI WARRIOR","CEO OF ALMOST READY",
    "PROFESSIONAL VIBE TESTER","CERTIFIED GROUP-CHAT LEGEND",
    "THE HUMAN LOADING SCREEN","DISCOUNT FINAL BOSS","AURA IN BETA"
  ];
  const pick = a => a[Math.floor(Math.random()*a.length)];
  const hash = s => [...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
  function generate(name, mode="general", extra="") {
    const seed = hash(name.toLowerCase());
    const pools = mode==="gamer" ? [gamer,general] : mode==="uncle" ? [uncle,general] : [general,gamer,uncle];
    const lines = [];
    for(let i=0;i<3;i++){
      const pool = pools[(seed+i)%pools.length];
      const index = (seed* (i+3) + i*17) % pool.length;
      lines.push(pool[index]);
    }
    if(extra) lines[2] += " " + extra;
    const score = 35 + (seed % 61);
    const sweat = 20 + ((seed*3)%81);
    const boomer = 15 + ((seed*7)%86);
    const aura = Math.max(1,100-score);
    return {
      name, score, sweat, boomer, aura, title: titles[seed%titles.length],
      lines: [pick(openers), ...lines.slice(0,2), pick(endings)].slice(0,3),
      mode
    };
  }
  return {generate};
})();
