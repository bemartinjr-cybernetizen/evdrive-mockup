/* EVDrive AI assistant — polished demo (real LLM wired at delivery) */
(function(){
  var KB=[
    {k:['bms','battery management','better bms','aem','orion','vero'],a:"Our BMS is a new flagship, built over 5 years in our own packs. We sell it two ways: retail/individual (a better alternative to AEM, Vero, and Orion) at better-battery-management-system.com, and as an OEM solution under the EVDrive brand. Want the retail store, or the OEM path?"},
    {k:['module','pack','battery','21700','energy density','power density'],a:"Our high-performance battery modules are our core IP — ~10 years of iteration on standard 21700 cells, tuned for class-leading power and energy density. They're priced for performance buyers who need the headroom. Want specs, or to send a project brief?"},
    {k:['oem','volume','production','manufactur'],a:"For OEMs we supply battery modules, packs, and BMS for low-volume and prototype-to-production programs. The fastest path is a short project brief — I can capture it now or book a call with engineering."},
    {k:['convert','conversion','swap','my car','restomod'],a:"We focus on battery systems and BMS, and take on only select high-end custom builds (cost-no-object). For a standard EV conversion we're likely not the best fit. If it's a premium build, tell me about the vehicle and target."},
    {k:['price','cost','quote','rfq','how much'],a:"Pricing depends on chemistry, capacity, voltage, and volume. The quickest route is a quote request — share the application and target specs and our team responds fast. Shall I open the quote form?"},
    {k:['schedule','book','call','meeting','talk','demo'],a:"__SCHEDULE__"},
    {k:['contact','phone','email','reach'],a:"You can reach the team directly at (971) 754-0434, or I can take your details and have an engineer follow up. Which do you prefer?"},
    {k:['dyno','test','testing'],a:"We run in-house dyno and validation testing for powertrains and battery systems. Want to book testing time or ask about capabilities?"},
    {k:['who','what do you','about','company'],a:"EVDrive is a Portland-based high-performance EV battery and BMS engineering company — battery modules and packs, our new BMS line, plus engineering and dyno services. We've supplied systems for record-setting and OEM builds."}
  ];
  var GREET="Hi — I'm EVDrive's assistant. I can answer questions about our battery modules, packs, and BMS, scope a project, or book a call. What are you working on?";
  var CHIPS=["Tell me about your BMS","Battery module specs","Request a quote","Book a call"];
  function reply(t){t=t.toLowerCase();for(var i=0;i<KB.length;i++){for(var j=0;j<KB[i].k.length;j++){if(t.indexOf(KB[i].k[j])>-1)return KB[i].a;}}return "Good question — I can help with battery modules, packs, our BMS, engineering/dyno services, or booking a call. Could you tell me a bit more about your application?";}
  var el=document.createElement('div');el.innerHTML=
   '<button id="evd-chat-launch"><span class="dot"></span>Ask EVDrive AI</button>'+
   '<div id="evd-chat"><div class="ch-head"><div class="av">E</div><div><b>EVDrive Assistant</b><small>● ONLINE · replies instantly</small></div><button class="x" aria-label="close">×</button></div>'+
   '<div class="ch-body" id="evd-body"></div><div class="chips" id="evd-chips"></div>'+
   '<div class="ch-foot"><input id="evd-in" placeholder="Ask about batteries, BMS, a quote…" autocomplete="off"><button id="evd-send">↑</button></div></div>';
  document.body.appendChild(el);
  var panel=document.getElementById('evd-chat'),body=document.getElementById('evd-body'),input=document.getElementById('evd-in'),chips=document.getElementById('evd-chips');
  function add(txt,who){var m=document.createElement('div');m.className='msg '+who;m.textContent=txt;body.appendChild(m);body.scrollTop=body.scrollHeight;}
  function typing(){var t=document.createElement('div');t.className='msg bot typing';t.id='evd-typing';t.innerHTML='<span></span><span></span><span></span>';body.appendChild(t);body.scrollTop=body.scrollHeight;}
  function untype(){var t=document.getElementById('evd-typing');if(t)t.remove();}
  function botSay(txt){typing();setTimeout(function(){untype();if(txt==='__SCHEDULE__'){add("Happy to set that up. Here are the next open slots with our engineering team:","bot");scheduleUI();}else{add(txt,'bot');}},700);}
  function scheduleUI(){var d=document.createElement('div');d.className='chips';['Thu 2:00 PM','Thu 4:00 PM','Fri 10:30 AM'].forEach(function(s){var b=document.createElement('button');b.className='chip';b.textContent=s;b.onclick=function(){add(s,'user');botSay("Booked — you'll get a confirmation by text and email, and an engineer will join. Anything to send ahead (specs, vehicle, target)?");d.remove();};d.appendChild(b);});body.appendChild(d);body.scrollTop=body.scrollHeight;}
  function send(txt){if(!txt.trim())return;add(txt,'user');input.value='';botSay(reply(txt));}
  function renderChips(){chips.innerHTML='';CHIPS.forEach(function(c){var b=document.createElement('button');b.className='chip';b.textContent=c;b.onclick=function(){send(c);};chips.appendChild(b);});}
  var started=false;
  document.getElementById('evd-chat-launch').onclick=function(){panel.classList.add('open');document.getElementById('evd-chat-launch').style.display='none';if(!started){started=true;botSay(GREET);renderChips();}};
  panel.querySelector('.x').onclick=function(){panel.classList.remove('open');document.getElementById('evd-chat-launch').style.display='flex';};
  document.getElementById('evd-send').onclick=function(){send(input.value);};
  input.addEventListener('keydown',function(e){if(e.key==='Enter')send(input.value);});
})();
