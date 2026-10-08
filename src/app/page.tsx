"use client";
import { useEffect, useRef, useState } from "react";
import { BookOpen, Guitar, Laptop, Leaf, Lightbulb, Moon, Sun, RotateCcw, Download } from "lucide-react";
type ItemId = "laptop"|"books"|"guitar"|"plant"|"lights";
const ITEMS: {id:ItemId;title:string;subtitle:string;category:string;Icon:typeof Laptop}[] = [
{id:"laptop",title:"প্রথম ল্যাপটপ",subtitle:"নিজের প্রথম ডিভাইস",category:"Achievements",Icon:Laptop},
{id:"books",title:"বইয়ের নেশা",subtitle:"পাতায় পাতায় গল্প",category:"Hobbies",Icon:BookOpen},
{id:"guitar",title:"গান ভালোবাসি",subtitle:"সুরের সাথে থাকা",category:"Hobbies",Icon:Guitar},
{id:"plant",title:"গাছের যত্ন",subtitle:"একটু সবুজের ছোঁয়া",category:"Little joys",Icon:Leaf},
{id:"lights",title:"রাত জাগা গল্প",subtitle:"আলোয় ভরা স্মৃতি",category:"Memories",Icon:Lightbulb},
];
const categories=["All","Memories","Hobbies","Achievements","Little joys"];
const storageKey="amar-ghor:v1";
export default function Home(){
const [selected,setSelected]=useState<ItemId[]>([]),[night,setNight]=useState(false),[tab,setTab]=useState("All"),[ready,setReady]=useState(false);
const svgRef=useRef<SVGSVGElement>(null);
useEffect(()=>{try{const raw=JSON.parse(localStorage.getItem(storageKey)||"{}");if(Array.isArray(raw.selected))setSelected(raw.selected.filter((id:unknown)=>ITEMS.some(item=>item.id===id)));if(typeof raw.night==="boolean")setNight(raw.night)}catch{}setReady(true)},[]);
useEffect(()=>{if(ready)localStorage.setItem(storageKey,JSON.stringify({selected,night}))},[selected,night,ready]);
const has=(id:ItemId)=>selected.includes(id);
const toggle=(id:ItemId)=>setSelected(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
const decor=(id:ItemId)=>"decor "+(has(id)?"shown":"hidden");
async function exportPng(){
 const svg=svgRef.current;if(!svg)return;
 const copy=svg.cloneNode(true) as SVGSVGElement;copy.setAttribute("xmlns","http://www.w3.org/2000/svg");copy.setAttribute("width","900");copy.setAttribute("height","675");
 // Explicit styles ensure the exported SVG matches current selection without external CSS.
 copy.querySelectorAll("[data-decor]").forEach(el=>{const id=el.getAttribute("data-decor") as ItemId;el.setAttribute("opacity",has(id)?"1":"0");el.removeAttribute("class")});
 const blob=new Blob([new XMLSerializer().serializeToString(copy)],{type:"image/svg+xml;charset=utf-8"});const url=URL.createObjectURL(blob);
 try{const img=new Image();img.src=url;await img.decode();const canvas=document.createElement("canvas");canvas.width=1800;canvas.height=1350;const ctx=canvas.getContext("2d");if(!ctx)throw new Error("Canvas unavailable");ctx.drawImage(img,0,0,canvas.width,canvas.height);const png=await new Promise<Blob|null>(resolve=>canvas.toBlob(resolve,"image/png"));if(!png)throw new Error("PNG unavailable");const href=URL.createObjectURL(png);const a=document.createElement("a");a.href=href;a.download="amar-ghor.png";a.click();setTimeout(()=>URL.revokeObjectURL(href),1500)}catch{alert("PNG export failed. Please try again.")}finally{URL.revokeObjectURL(url)}
}
return <main className="shell">
<section className="stage"><header className="brand"><div><h1>আমার ঘর <span aria-hidden>🏡</span></h1><p>ছোট ছোট স্মৃতিতে সাজানো আমার পৃথিবী</p></div><div className="switch" aria-label="Lighting mode"><button className={!night?"active":""} onClick={()=>setNight(false)} aria-pressed={!night}><Sun size={15} style={{display:"inline",marginRight:4}}/>দিন</button><button className={night?"active":""} onClick={()=>setNight(true)} aria-pressed={night}><Moon size={15} style={{display:"inline",marginRight:4}}/>রাত</button></div></header>
<div className="room-wrap"><svg ref={svgRef} viewBox="0 0 800 600" role="img" aria-label="Miniature isometric bedroom with interactive decorations" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="wall" x1="0" y1="0" x2="1" y2="1"><stop stopColor={night?"#55546b":"#e4d3a5"}/><stop offset="1" stopColor={night?"#6a6070":"#b7aa7f"}/></linearGradient>
<linearGradient id="wood" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c18b56"/><stop offset="1" stopColor="#795036"/></linearGradient>
<linearGradient id="window" x1="0" y1="0" x2="0" y2="1"><stop stopColor={night?"#273052":"#f4c2a0"}/><stop offset="1" stopColor={night?"#676084":"#ffdfaa"}/></linearGradient>
<filter id="shadow"><feGaussianBlur stdDeviation="13"/></filter>
</defs>
<ellipse cx="409" cy="527" rx="300" ry="55" fill="#080609" opacity=".5" filter="url(#shadow)"/>
{/* Isometric platform, walls, window */}
<path d="M91 400L410 525L732 393L410 265Z" fill="#6e452f"/>
<path d="M91 400L410 525V552L91 428Z" fill="#9b653d"/>
<path d="M410 525L732 393V420L410 552Z" fill="#b37b49"/>
<path d="M91 158L410 38L410 364L91 483Z" fill="url(#wall)" stroke="#8d7758" strokeWidth="4"/>
<path d="M410 38L732 158V483L410 364Z" fill="url(#wall)" stroke="#8d7758" strokeWidth="4"/>
<path d="M91 483L410 364L732 483L410 602Z" fill="url(#wood)" stroke="#9c6a42" strokeWidth="5"/>
{Array.from({length:9},(_,i)=><path key={i} d={`M${110+i*35} ${475-i*13}L${429+i*34} ${590-i*13}`} stroke="#e6b37a" strokeOpacity=".23" strokeWidth="3"/>)}
<path d="M494 139L661 203V345L494 282Z" fill="#755d4d" stroke="#c7a77d" strokeWidth="10"/>
<path d="M507 154L649 207V327L507 274Z" fill="url(#window)"/>
<path d="M578 180V302M507 215L649 269" stroke="#f0dfbc" strokeWidth="8"/>
<path d="M507 169L649 222" stroke="#fff2d6" strokeWidth="2" opacity=".8"/>
{/* shelf */}
<path d="M140 230L314 165L327 175L152 242Z" fill="#91613e"/>
<path d="M140 306L314 241L327 251L152 317Z" fill="#91613e"/>
{/* bed */}
<path d="M256 374L423 311L550 361L378 429Z" fill="#825a3d"/>
<path d="M256 374L378 429V456L256 402Z" fill="#62442f"/>
<path d="M378 429L550 361V388L378 456Z" fill="#795139"/>
<path d="M272 369L425 314L532 360L377 417Z" fill="#8da78c" stroke="#e8d8b3" strokeWidth="7"/>
<path d="M393 334L430 320L469 336L433 350Z" fill="#f4e8cb"/>
<path d="M336 355L373 341L410 357L372 371Z" fill="#e8ddc8"/>
<path d="M292 379L375 412L511 361" stroke="#c4d5ad" strokeWidth="4" fill="none" opacity=".7"/>
{/* desk and monitor */}
<path d="M492 391L624 342L697 371L563 421Z" fill="#d8a66a" stroke="#93633d" strokeWidth="4"/>
<path d="M507 401L525 407V476L507 470ZM665 391L682 384V452L665 460Z" fill="#8c5939"/>
<path d="M553 315L609 293L649 309L592 332Z" fill="#e8d5b3"/>
<path d="M554 258L610 238L647 251L591 272V331L554 309Z" fill="#f4f1df" stroke="#ad9f8a" strokeWidth="5"/>
<path d="M562 266L610 248L639 258L592 276V315L562 297Z" fill={night?"#36485b":"#9ab2b5"}/>
{/* chair */}
<ellipse cx="540" cy="463" rx="47" ry="14" fill="#4a332d" opacity=".32"/>
<path d="M485 394Q490 360 518 364L548 379Q555 394 539 423L515 444Q494 431 485 394Z" fill="#b8b58a" stroke="#827b59" strokeWidth="6"/>
<path d="M507 431L553 449L535 473L490 454Z" fill="#c7c59a" stroke="#81795a" strokeWidth="4"/>
<path d="M527 464V491M527 490L495 504M527 490L562 506" stroke="#51463e" strokeWidth="7" strokeLinecap="round"/>
{/* layers */}
<g data-decor="books" className={decor("books")}>
{[0,1,2,3,4,5,6].map((i)=><g key={i}><path d={`M${171+i*18} ${282-i*7}l10 -4v-45l-10 4Z`} fill={["#b46f51","#597b6c","#e6c58a","#9c655b"][i%4]} stroke="#654c3c" strokeWidth="1.5"/></g>)}
</g>
<g data-decor="laptop" className={decor("laptop")}>
<path d="M542 373L579 360L607 371L569 386Z" fill="#a8a9a5" stroke="#4b4b4e" strokeWidth="2"/>
<path d="M544 331L580 319L581 364L544 376Z" fill="#41454e" stroke="#b2b4b1" strokeWidth="3"/>
<path d="M549 336L575 327V357L549 366Z" fill="#79a8b0"/>
</g>
<g data-decor="guitar" className={decor("guitar")}>
<path d="M187 360L212 341L225 344L204 365Z" fill="#4d382b" opacity=".25"/>
<path d="M198 354L207 304L217 266" fill="none" stroke="#8e5a32" strokeWidth="10" strokeLinecap="round"/>
<path d="M196 350C173 329 164 376 184 394C197 407 226 392 221 369C218 355 211 347 196 350Z" fill="#c28b50" stroke="#67422d" strokeWidth="4"/>
<ellipse cx="200" cy="371" rx="9" ry="12" fill="#65442e"/>
<path d="M203 367L220 266" stroke="#f7ddae" strokeWidth="1.8"/>
</g>
<g data-decor="plant" className={decor("plant")}>
<path d="M625 429L673 410L688 441L643 459Z" fill="#bb7958" stroke="#79513f" strokeWidth="3"/>
{[[649,418,640,374],[653,420,672,365],[654,420,682,393],[652,419,621,393],[650,420,655,348]].map((p,i)=><g key={i}><path d={`M${p[0]} ${p[1]}Q${p[2]} ${p[3]+22} ${p[2]} ${p[3]}`} stroke="#506d47" strokeWidth="4" fill="none"/><ellipse cx={p[2]} cy={p[3]} rx="17" ry="9" fill={i%2?"#779c5d":"#537b4f"} transform={`rotate(-27 ${p[2]} ${p[3]})`}/></g>)}
</g>
<g data-decor="lights" className={decor("lights")}>
<path d="M119 210Q261 155 416 121Q520 117 691 185" fill="none" stroke="#6d543d" strokeWidth="2"/>
{Array.from({length:17},(_,i)=>{const x=130+i*33;const y=x<416?205-(x-130)*.3:122+(x-416)*.22;return <g key={i}><circle cx={x} cy={y} r="11" fill="#ffe39d" opacity=".22"/><circle cx={x} cy={y} r="4" fill="#fff1b8"/></g>})}
</g>
{night&&<path d="M91 158L410 38L732 158V483L410 602L91 483Z" fill="#18233c" opacity=".12" pointerEvents="none"/>}
</svg></div><p className="footnote">✦ YOUR LITTLE WORLD ✦ &nbsp; • &nbsp; Miniature room prototype</p></section>
<aside className="panel"><div><div className="progress-head"><div><strong>{selected.length} / 5</strong><div className="muted">স্মৃতি যোগ হয়েছে</div></div><span>{selected.length*20}%</span></div><div className="track"><div className="fill" style={{width:`${selected.length*20}%`}}/></div></div>
<div className="tabs">{categories.map(c=><button key={c} className={"tab "+(tab===c?"selected":"")} onClick={()=>setTab(c)} aria-pressed={tab===c}>{c}</button>)}</div>
<div className="items">{ITEMS.filter(item=>tab==="All"||item.category===tab).map(item=><button key={item.id} className={"item "+(has(item.id)?"on":"")} onClick={()=>toggle(item.id)} aria-pressed={has(item.id)}><div className="item-art"><item.Icon size={58} strokeWidth={1.25}/></div><span className="check">{has(item.id)?"✓":"+"}</span><div className="item-label"><b>{item.title}</b><small>{item.subtitle}</small></div></button>)}</div>
<p className="hint">একটা স্মৃতি বেছে নে। ঘরে সেই decoration যোগ হবে। সব changes automatically save হয়। এই artwork SVG prototype; final realistic diorama assets এখনো তৈরি হয়নি।</p>
<div className="actions"><button className="reset" onClick={()=>{if(confirm("সব decoration reset করবি?"))setSelected([])}}><RotateCcw size={16} style={{display:"inline",marginRight:7}}/>রিসেট</button><button className="export" onClick={exportPng}><Download size={16} style={{display:"inline",marginRight:7}}/>আমার ঘর ডাউনলোড</button></div>
</aside></main>
}