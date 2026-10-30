/* Canvas-based PNG export. The card remains downloadable even if remote avatar CORS fails. */
const CardTools = (() => {
  function rounded(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
  function loadImage(src){return new Promise(resolve=>{const i=new Image();i.crossOrigin="anonymous";i.onload=()=>resolve(i);i.onerror=()=>resolve(null);i.src=src;});}
  async function download(data, avatarUrl) {
    const c=document.createElement("canvas");c.width=1200;c.height=760;
    const x=c.getContext("2d");
    const g=x.createLinearGradient(0,0,1200,760);g.addColorStop(0,"#142746");g.addColorStop(1,"#070d19");x.fillStyle=g;x.fillRect(0,0,1200,760);
    x.strokeStyle="#00eaff";x.lineWidth=3;rounded(x,24,24,1152,712,28);
    x.fillStyle="#00f0ff";x.font="bold 24px Arial";x.fillText("IGNROAST // AURA DIVISION",70,90);
    x.fillStyle="#8ba5c3";x.font="18px Arial";x.fillText("OFFICIAL UNOFFICIAL AUDIT",70,125);
    const img=await loadImage(avatarUrl);
    if(img){x.save();x.beginPath();x.roundRect(70,175,190,190,25);x.clip();x.drawImage(img,70,175,190,190);x.restore();}
    else {x.fillStyle="#12314a";rounded(x,70,175,190,190,25);x.fillStyle="#00f0ff";x.font="90px Arial";x.fillText("✦",125,300);}
    x.fillStyle="#fff";x.font="bold 48px Arial";x.fillText(data.name.slice(0,22),300,235);
    x.fillStyle="#9dfaff";x.font="bold 22px Arial";x.fillText(data.title,300,285);
    x.fillStyle="#00f0ff";x.font="bold 100px Arial";x.fillText(String(data.score),930,260);
    x.fillStyle="#8ba5c3";x.font="18px Arial";x.fillText("CRINGE INDEX / 100",925,295);
    x.fillStyle="#263c58";rounded(x,70,405,1060,10,5);x.fillStyle="#00eaff";rounded(x,70,405,1060*data.score/100,10,5);
    x.fillStyle="#dce9f8";x.font="bold 23px Arial";x.fillText("THE DAMAGE REPORT",70,475);
    x.font="20px Arial";
    data.lines.forEach((line,i)=>{const words=line.split(" ");let row="",y=525+i*58;for(const word of words){const test=row+word+" ";if(x.measureText(test).width>1020){x.fillText("• "+row,75,y);row=word+" ";y+=25;}else row=test;}x.fillText("• "+row,75,y);});
    x.fillStyle="#7990aa";x.font="15px Arial";x.fillText("FOR ENTERTAINMENT ONLY • KEEP IT KIND • IGNROAST",70,700);
    const a=document.createElement("a");a.download="ignroast-"+data.name.replace(/[^a-z0-9]/gi,"-").toLowerCase()+".png";a.href=c.toDataURL("image/png");a.click();
  }
  return {download};
})();
