(() => {
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const money = n => '$' + Number(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const signed = n => (n>=0?'+':'')+n.toFixed(2)+'%';
const assets = [
 {id:'NVC',name:'Nova Coin',symbol:'NVC/USD',type:'crypto',price:128.40,vol:'High',icon:'N'},
 {id:'AUR',name:'Aurora Labs',symbol:'AUR/USD',type:'crypto',price:74.28,vol:'Extreme',icon:'A'},
 {id:'VTX',name:'Vertex Systems',symbol:'VTX',type:'stocks',price:246.15,vol:'Medium',icon:'V'},
 {id:'ORB',name:'Orbit Dynamics',symbol:'ORB',type:'stocks',price:91.62,vol:'High',icon:'O'},
 {id:'EURX',name:'Euro / Dollar',symbol:'EURX',type:'fx',price:1.0842,vol:'Low',icon:'€'},
 {id:'JPYQ',name:'Yen / Dollar',symbol:'JPYQ',type:'fx',price:0.0067,vol:'Medium',icon:'¥'},
 {id:'KRY',name:'Kryo Network',symbol:'KRY/USD',type:'crypto',price:18.96,vol:'Extreme',icon:'K'},
 {id:'PLSX',name:'Pulse Index',symbol:'PLSX',type:'stocks',price:512.70,vol:'Medium',icon:'P'},
 // Added company instruments with locally generated starting prices.
 {id:'AAPL',name:'Apple',symbol:'AAPL',type:'stocks',price:258.40,vol:'Medium',icon:'A'},
 {id:'MSFT',name:'Microsoft',symbol:'MSFT',type:'stocks',price:512.30,vol:'Medium',icon:'M'},
 {id:'NVDA',name:'NVIDIA',symbol:'NVDA',type:'stocks',price:184.70,vol:'High',icon:'N'},
 {id:'AMZN',name:'Amazon',symbol:'AMZN',type:'stocks',price:228.50,vol:'Medium',icon:'A'},
 {id:'GOOGL',name:'Alphabet (Google)',symbol:'GOOGL',type:'stocks',price:251.20,vol:'Medium',icon:'G'},
 {id:'META',name:'Meta Platforms',symbol:'META',type:'stocks',price:716.80,vol:'High',icon:'M'},
 {id:'TSLA',name:'Tesla',symbol:'TSLA',type:'stocks',price:438.60,vol:'Extreme',icon:'T'},
 {id:'AMD',name:'AMD',symbol:'AMD',type:'stocks',price:202.70,vol:'High',icon:'A'},
 {id:'INTC',name:'Intel',symbol:'INTC',type:'stocks',price:38.40,vol:'High',icon:'I'},
 {id:'NFLX',name:'Netflix',symbol:'NFLX',type:'stocks',price:1248.00,vol:'High',icon:'N'},
 {id:'ADBE',name:'Adobe',symbol:'ADBE',type:'stocks',price:358.40,vol:'Medium',icon:'A'},
 {id:'ORCL',name:'Oracle',symbol:'ORCL',type:'stocks',price:293.50,vol:'Medium',icon:'O'},
 {id:'CRM',name:'Salesforce',symbol:'CRM',type:'stocks',price:267.80,vol:'Medium',icon:'S'},
 {id:'PLTR',name:'Palantir',symbol:'PLTR',type:'stocks',price:178.60,vol:'Extreme',icon:'P'},
 {id:'AVGO',name:'Broadcom',symbol:'AVGO',type:'stocks',price:341.20,vol:'High',icon:'B'},
 {id:'QCOM',name:'Qualcomm',symbol:'QCOM',type:'stocks',price:169.40,vol:'Medium',icon:'Q'},
 {id:'CSCO',name:'Cisco Systems',symbol:'CSCO',type:'stocks',price:70.80,vol:'Low',icon:'C'},
 {id:'IBM',name:'IBM',symbol:'IBM',type:'stocks',price:287.30,vol:'Medium',icon:'I'},
 {id:'DELL',name:'Dell Technologies',symbol:'DELL',type:'stocks',price:124.60,vol:'High',icon:'D'},
 {id:'HPQ',name:'HP Inc.',symbol:'HPQ',type:'stocks',price:27.40,vol:'Medium',icon:'H'},
 {id:'MU',name:'Micron Technology',symbol:'MU',type:'stocks',price:166.80,vol:'High',icon:'M'},
 {id:'SMCI',name:'Super Micro Computer',symbol:'SMCI',type:'stocks',price:49.20,vol:'Extreme',icon:'S'},
 {id:'SHOP',name:'Shopify',symbol:'SHOP',type:'stocks',price:156.40,vol:'High',icon:'S'},
 {id:'UBER',name:'Uber',symbol:'UBER',type:'stocks',price:93.70,vol:'Medium',icon:'U'},
 {id:'ABNB',name:'Airbnb',symbol:'ABNB',type:'stocks',price:132.50,vol:'Medium',icon:'A'},
 {id:'JPM',name:'JPMorgan Chase',symbol:'JPM',type:'stocks',price:301.40,vol:'Medium',icon:'J'},
 {id:'BAC',name:'Bank of America',symbol:'BAC',type:'stocks',price:51.80,vol:'Medium',icon:'B'},
 {id:'GS',name:'Goldman Sachs',symbol:'GS',type:'stocks',price:765.20,vol:'Medium',icon:'G'},
 {id:'MS',name:'Morgan Stanley',symbol:'MS',type:'stocks',price:160.30,vol:'Medium',icon:'M'},
 {id:'C',name:'Citigroup',symbol:'C',type:'stocks',price:106.70,vol:'Medium',icon:'C'},
 {id:'V',name:'Visa',symbol:'V',type:'stocks',price:352.60,vol:'Low',icon:'V'},
 {id:'MA',name:'Mastercard',symbol:'MA',type:'stocks',price:584.20,vol:'Low',icon:'M'},
 {id:'AXP',name:'American Express',symbol:'AXP',type:'stocks',price:320.80,vol:'Medium',icon:'A'},
 {id:'PYPL',name:'PayPal',symbol:'PYPL',type:'stocks',price:72.30,vol:'High',icon:'P'},
 {id:'BRKB',name:'Berkshire Hathaway B',symbol:'BRK.B',type:'stocks',price:498.50,vol:'Low',icon:'B'},
 {id:'WMT',name:'Walmart',symbol:'WMT',type:'stocks',price:101.20,vol:'Low',icon:'W'},
 {id:'COST',name:'Costco',symbol:'COST',type:'stocks',price:962.40,vol:'Low',icon:'C'},
 {id:'KO',name:'Coca-Cola',symbol:'KO',type:'stocks',price:71.30,vol:'Low',icon:'C'},
 {id:'PEP',name:'PepsiCo',symbol:'PEP',type:'stocks',price:142.60,vol:'Low',icon:'P'},
 {id:'MCD',name:"McDonald's",symbol:'MCD',type:'stocks',price:310.20,vol:'Low',icon:'M'},
 {id:'NKE',name:'Nike',symbol:'NKE',type:'stocks',price:74.80,vol:'Medium',icon:'N'},
 {id:'DIS',name:'Walt Disney Company',symbol:'DIS',type:'stocks',price:119.40,vol:'Medium',icon:'D'},
 {id:'PG',name:'Procter & Gamble',symbol:'PG',type:'stocks',price:156.70,vol:'Low',icon:'P'},
 {id:'CMCSA',name:'Comcast',symbol:'CMCSA',type:'stocks',price:34.60,vol:'Medium',icon:'C'},
 {id:'BKNG',name:'Booking Holdings',symbol:'BKNG',type:'stocks',price:5630.00,vol:'Medium',icon:'B'},
 {id:'LLY',name:'Eli Lilly',symbol:'LLY',type:'stocks',price:798.40,vol:'High',icon:'L'},
 {id:'JNJ',name:'Johnson & Johnson',symbol:'JNJ',type:'stocks',price:164.50,vol:'Low',icon:'J'},
 {id:'PFE',name:'Pfizer',symbol:'PFE',type:'stocks',price:25.80,vol:'Medium',icon:'P'},
 {id:'XOM',name:'ExxonMobil',symbol:'XOM',type:'stocks',price:112.30,vol:'Medium',icon:'X'},
 {id:'CVX',name:'Chevron',symbol:'CVX',type:'stocks',price:158.70,vol:'Medium',icon:'C'},
 {id:'SHEL',name:'Shell',symbol:'SHEL',type:'stocks',price:71.40,vol:'Medium',icon:'S'},
 {id:'BA',name:'Boeing',symbol:'BA',type:'stocks',price:204.60,vol:'High',icon:'B'},
 {id:'CAT',name:'Caterpillar',symbol:'CAT',type:'stocks',price:409.30,vol:'Medium',icon:'C'},
 {id:'GE',name:'General Electric',symbol:'GE',type:'stocks',price:287.60,vol:'Medium',icon:'G'},
 {id:'LMT',name:'Lockheed Martin',symbol:'LMT',type:'stocks',price:476.80,vol:'Low',icon:'L'},
 {id:'TSM',name:'TSMC ADR',symbol:'TSM',type:'stocks',price:246.50,vol:'High',icon:'T'},
 {id:'005930KS',name:'Samsung Electronics',symbol:'005930.KS',type:'stocks',price:58.20,vol:'Medium',icon:'S'},
 {id:'TM',name:'Toyota Motor ADR',symbol:'TM',type:'stocks',price:195.80,vol:'Medium',icon:'T'},
 {id:'BABA',name:'Alibaba',symbol:'BABA',type:'stocks',price:126.40,vol:'High',icon:'A'},
 {id:'TCEHY',name:'Tencent ADR',symbol:'TCEHY',type:'stocks',price:69.30,vol:'Medium',icon:'T'},
 {id:'ASML',name:'ASML',symbol:'ASML',type:'stocks',price:782.60,vol:'High',icon:'A'},
 {id:'SAP',name:'SAP',symbol:'SAP',type:'stocks',price:278.40,vol:'Medium',icon:'S'},
 {id:'SONY',name:'Sony Group ADR',symbol:'SONY',type:'stocks',price:28.70,vol:'Medium',icon:'S'},
 {id:'BYDDY',name:'BYD ADR',symbol:'BYDDY',type:'stocks',price:14.60,vol:'High',icon:'B'},
 {id:'LVMUY',name:'LVMH ADR',symbol:'LVMUY',type:'stocks',price:139.80,vol:'Medium',icon:'L'},
 // Additional FX pairs, indices, commodities, and cryptocurrencies from the suggested market categories.
 {id:'EURUSD',name:'Euro / US Dollar',symbol:'EUR/USD',type:'fx',price:1.1624,vol:'Low',icon:'€'},
 {id:'GBPUSD',name:'British Pound / US Dollar',symbol:'GBP/USD',type:'fx',price:1.3370,vol:'Medium',icon:'£'},
 {id:'USDJPY',name:'US Dollar / Japanese Yen',symbol:'USD/JPY',type:'fx',price:151.80,vol:'Medium',icon:'¥'},
 {id:'USDINR',name:'US Dollar / Indian Rupee',symbol:'USD/INR',type:'fx',price:88.70,vol:'Medium',icon:'₹'},
 {id:'AUDUSD',name:'Australian Dollar / US Dollar',symbol:'AUD/USD',type:'fx',price:0.6530,vol:'Medium',icon:'A'},
 {id:'SPX',name:'S&P 500 Index',symbol:'SPX',type:'indices',price:6650.00,vol:'Medium',icon:'S'},
 {id:'NDX',name:'Nasdaq-100 Index',symbol:'NDX',type:'indices',price:24500.00,vol:'High',icon:'N'},
 {id:'DJI',name:'Dow Jones Industrial Average',symbol:'DJI',type:'indices',price:46300.00,vol:'Medium',icon:'D'},
 {id:'UKX',name:'FTSE 100 Index',symbol:'UKX',type:'indices',price:9250.00,vol:'Low',icon:'F'},
 {id:'NI225',name:'Nikkei 225 Index',symbol:'NI225',type:'indices',price:47500.00,vol:'High',icon:'N'},
 {id:'GOLD',name:'Gold',symbol:'XAU/USD',type:'commodities',price:3980.00,vol:'Medium',icon:'Au'},
 {id:'SILVER',name:'Silver',symbol:'XAG/USD',type:'commodities',price:48.20,vol:'High',icon:'Ag'},
 {id:'WTI',name:'Crude Oil (WTI)',symbol:'WTI',type:'commodities',price:61.80,vol:'High',icon:'O'},
 {id:'NATGAS',name:'Natural Gas',symbol:'NATGAS',type:'commodities',price:3.40,vol:'Extreme',icon:'G'},
 {id:'BTC',name:'Bitcoin',symbol:'BTC/USD',type:'crypto',price:112500.00,vol:'Extreme',icon:'₿'},
 {id:'ETH',name:'Ethereum',symbol:'ETH/USD',type:'crypto',price:4100.00,vol:'Extreme',icon:'Ξ'},
 {id:'SOL',name:'Solana',symbol:'SOL/USD',type:'crypto',price:218.00,vol:'Extreme',icon:'S'},
 {id:'XRP',name:'XRP',symbol:'XRP/USD',type:'crypto',price:2.85,vol:'Extreme',icon:'X'}
].map(a=>({...a, start:a.price, prev:a.price, history:Array.from({length:40},(_,i)=>a.price*(1+(Math.random()-.5)*.025)), change:0, dayStart:a.price}));
let balance=0, positions=[], history=[], nextId=1, side='buy', selected='NVC', closedCount=0, timeframe='1m', chartStyle='candles', accountLocked=false;
const FOLDER_SCOPE=window.location.pathname.slice(0,window.location.pathname.lastIndexOf('/')+1)||'/';
const STORAGE_KEY='novacoin-account-v1:'+FOLDER_SCOPE;
const FUNDS_CHANNEL='novacoin-funds-live:'+FOLDER_SCOPE;
const getAsset=id=>assets.find(a=>a.id===id);
// Keep the account session consistent when the user moves between pages or reloads.
try {
 const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
 if(saved){
  if(Number.isFinite(saved.balance)) balance=saved.balance;
  if(Array.isArray(saved.positions)) positions=saved.positions;
  if(Array.isArray(saved.closed)) history=saved.closed;
  if(Number.isFinite(saved.nextId)) nextId=saved.nextId;
  accountLocked=saved.accountLocked===true;
  if(Array.isArray(saved.assets)) saved.assets.forEach(old=>{const a=getAsset(old.id);if(a&&Number.isFinite(old.price)){a.price=old.price;a.prev=old.prev||old.price;a.change=old.change||0;if(Array.isArray(old.history)&&old.history.length>5)a.history=old.history.slice(-90)}});
 }
} catch(e) { /* Start a clean account session if saved data is unavailable. */ }
function persist(){const state={balance,positions,closed:history,nextId,accountLocked,updatedAt:Date.now(),assets:assets.map(a=>({id:a.id,price:a.price,prev:a.prev,change:a.change,history:a.history}))};try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch(e){};try{window.NOVACOIN_FIREBASE?.saveAccountState(state)}catch(e){}}
// Live-sync wallet changes made by the private addfund.html page in another tab.
function applyExternalWalletState(raw){if(!raw)return;try{const saved=typeof raw==='string'?JSON.parse(raw):raw;if(!saved||!Number.isFinite(saved.balance))return;balance=saved.balance;if(Array.isArray(saved.positions))positions=saved.positions;if(Array.isArray(saved.closed))history=saved.closed;if(Number.isFinite(saved.nextId))nextId=saved.nextId;accountLocked=saved.accountLocked===true;renderShared();renderTrade();renderPortfolio();updateOrderAccess();}catch(e){/* Ignore invalid external storage updates. */}}
window.addEventListener('storage',event=>{if(event.key===STORAGE_KEY)applyExternalWalletState(event.newValue)});
 window.addEventListener('novacoin-remote-state',event=>applyExternalWalletState(event.detail));
try{if('BroadcastChannel' in window){const fundsChannel=new BroadcastChannel(FUNDS_CHANNEL);fundsChannel.onmessage=()=>{try{applyExternalWalletState(localStorage.getItem(STORAGE_KEY))}catch(e){}}}}catch(e){/* localStorage storage events remain the fallback. */}
function updateOrderAccess(){const btn=$('#place-order');if(!btn)return;const amount=Number($('#amount')?.value||0);const unavailable=accountLocked||balance<1;btn.disabled=unavailable;btn.classList.toggle('disabled',unavailable);btn.innerHTML=unavailable?'Trading unavailable — add funds':'Place order <span>↗</span>';const msg=$('#order-message');if(unavailable&&msg){msg.textContent='Your account has no available funds. Add funds in Wallet activity to continue. Existing open positions can still be closed.';msg.className='order-message error';}updateLeveragePreview();}
function selectedLeverage(){const value=Number($('#leverage')?.value||1);return Number.isInteger(value)&&value>=1&&value<=100?value:1}
function updateLeveragePreview(){const amount=Number($('#amount')?.value||0),lev=selectedLeverage();const l=$('#leverage-preview');if(l)l.textContent=lev+'×';const pv=$('#position-value');if(pv)pv.textContent=money(Math.max(0,amount)*lev);const mr=$('#margin-required');if(mr)mr.textContent=money(Math.max(0,amount));}

function fmtPrice(a,p=a.price){return p<.01?'$'+p.toFixed(5):p<10?'$'+p.toFixed(4):money(p)}
function pnlFor(pos){const a=getAsset(pos.asset);return (pos.side==='buy'?1:-1)*((a.price-pos.entry)/pos.entry)*pos.size}
function totalUnrealized(){return positions.reduce((s,p)=>s+pnlFor(p),0)}
// Automatic account liquidation: if open-trade losses consume the entire wallet equity,
// close every open position and set the account wallet to zero.
function enforceWalletLiquidation(){
 // Keep monitoring open positions even when free cash is below the minimum order size.
 if(positions.length===0)return false;
 const marginAtRisk=positions.reduce((sum,p)=>sum+Math.max(0,Number(p.margin)||0),0);
 const walletEquity=Math.max(0,balance)+marginAtRisk+totalUnrealized();
 // A small cent tolerance prevents floating-point rounding from leaving negative equity.
 if(walletEquity>0.01)return false;
 positions.forEach(p=>{
  const asset=getAsset(p.asset);
  const gross=pnlFor(p),exitFee=(Number(p.size)||0)*0.0005;
  history.push({...p,exit:asset?asset.price:p.entry,pnl:gross-(Number(p.fee)||0)-exitFee,grossPnl:gross,exitFee,autoLiquidated:true});
 });
 positions=[];balance=0;accountLocked=true;
 const msg=$('#order-message');
 if(msg){msg.textContent='AUTO-LIQUIDATION: Account equity reached zero. All open trades were closed and the wallet balance is now $0.00. Trading is locked.';msg.className='order-message error';}
 persist();renderShared();renderTrade();renderPortfolio();
 return true;
}
function updateClock(){const el=$('#clock');if(el)el.textContent=new Date().toLocaleTimeString('en-GB',{hour12:false})}
function tick(){
 // Synthetic geometric price process: small noisy returns, momentum, mean reversion,
 // cross-asset market shocks and occasional jumps. This is deliberately not a real feed.
 const commonShock=(Math.random()-.5)*.0015;
 assets.forEach(a=>{
  a.prev=a.price;
  const last=a.history.at(-1)||a.price, prior=a.history.at(-2)||last;
  const momentum=Math.max(-.004,Math.min(.004,(last/prior-1)*.12));
  const anchorPull=Math.log(a.start/a.price)*.0007;
  const sigma=a.vol==='Extreme'?.009:a.vol==='High'?.0055:a.vol==='Medium'?.003:.0011;
  const noise=(Math.random()+Math.random()+Math.random()-1.5)*sigma;
  const jump=Math.random()<(a.vol==='Extreme'?.025:.009)?(Math.random()-.5)*(a.vol==='Extreme'?.045:.018):0;
  const ret=Math.max(-.07,Math.min(.07,commonShock+momentum+anchorPull+noise+jump));
  a.price=Math.max(a.start*.08,a.price*Math.exp(ret));
  a.change=(a.price/a.dayStart-1)*100;
  a.history.push(a.price);if(a.history.length>90)a.history.shift();
 });
 enforceWalletLiquidation();
 persist();renderShared();
 const page=document.body.dataset.page;
 if(page==='markets')renderMarkets();
 if(page==='trade')renderTrade();
 if(page==='portfolio')renderPortfolio();
 if(page==='dashboard')renderDashboard();
}

function spark(values,cls=''){const w=84,h=27;let min=Math.min(...values),max=Math.max(...values);if(max===min)max=min+1;const pts=values.map((v,i)=>`${i/(values.length-1)*w},${h-2-(v-min)/(max-min)*(h-4)}`).join(' ');const up=values.at(-1)>=values[0];return `<svg class="sparkline ${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><polyline points="${pts}" fill="none" stroke="${up?'#5df0c2':'#ff6b85'}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
function renderShared(){const b=$('#balance');if(b)b.textContent=money(balance);const pc=$('#position-count');if(pc)pc.textContent=positions.length;const p=$('#pnl');if(p){const n=totalUnrealized()+history.reduce((s,x)=>s+x.pnl,0);p.textContent=money(n);p.className='stat-value '+(n>=0?'positive':'negative')}const un=$('#unrealized');if(un){const n=totalUnrealized();un.textContent=money(n);un.className='stat-value '+(n>=0?'positive':'negative')}const cc=$('#closed-count');if(cc)cc.textContent=history.length;const wins=history.filter(x=>x.pnl>0).length,losses=history.filter(x=>x.pnl<0).length,closed=history.length;const wr=$('#win-rate');if(wr)wr.textContent=(closed?wins/closed*100:0).toFixed(1)+'%';const lr=$('#loss-rate');if(lr)lr.textContent=(closed?losses/closed*100:0).toFixed(1)+'%';const fees=$('#fees-paid');if(fees)fees.textContent=money(history.reduce((sum,x)=>sum+(x.fee||0)+(x.exitFee||0),0)+positions.reduce((sum,x)=>sum+(x.fee||0),0))}
function renderDashboard(){const el=$('#dashboard-markets');if(!el)return;el.innerHTML=assets.slice(0,4).map(a=>`<a class="asset-card" href="trade.html" data-asset="${a.id}"><div class="asset-head"><div class="asset-icon">${a.icon}</div><div class="asset-name">${a.name}<span class="asset-symbol">${a.symbol}</span></div></div><div class="asset-price">${fmtPrice(a)}</div><div class="asset-foot"><span class="${a.change>=0?'positive':'negative'}">${signed(a.change)}</span>${spark(a.history.slice(-18))}</div></a>`).join('')}
let marketFilter='all';
function renderMarkets(){const body=$('#markets-body');if(!body)return;const query=($('#market-search')?.value||'').toLowerCase();const list=assets.filter(a=>(marketFilter==='all'||a.type===marketFilter)&&(a.name+' '+a.id+' '+a.symbol).toLowerCase().includes(query));body.innerHTML=list.map(a=>`<tr><td><div class="instrument-cell"><div class="asset-icon">${a.icon}</div><div><b>${a.name}</b><small>${a.symbol}</small></div></div></td><td class="mono">${fmtPrice(a)}</td><td class="mono ${a.change>=0?'positive':'negative'}">${signed(a.change)}</td><td><span class="vol-tag">${a.vol}</span></td><td>${spark(a.history.slice(-20))}</td><td><a class="text-link" href="trade.html" onclick="sessionStorage.setItem('novaSelected','${a.id}')">Trade ↗</a></td></tr>`).join('')||'<tr><td colspan="6">No instruments match your search.</td></tr>'}
function renderTrade(){const a=getAsset(selected)||assets[0];const name=$('#trade-name');if(name)name.innerHTML=`${a.name} <span class="symbol-tag">${a.id}</span>`;const price=$('#trade-price');if(price)price.textContent=fmtPrice(a);const ch=$('#trade-change');if(ch){ch.textContent=signed(a.change);ch.className=a.change>=0?'positive':'negative'}const ep=$('#entry-price');if(ep)ep.textContent=fmtPrice(a);const dir=$('#direction-label');if(dir)dir.textContent=side==='buy'?'Long / Buy':'Short / Sell';const avail=$('#available');if(avail)avail.textContent=money(balance);updateLeveragePreview();drawChart(a);renderRecent();updateOrderAccess()}
function makeCandles(a){
 const vals=a.history.slice(-90); const group=timeframe==='1m'?1:timeframe==='5m'?5:timeframe==='15m'?10:18; const out=[];
 for(let i=1;i<vals.length;i+=group){
  const slice=vals.slice(i,Math.min(vals.length,i+group)); if(!slice.length)continue;
  const open=vals[i-1], close=slice[slice.length-1];
  const spread=Math.max(Math.abs(close-open)*.55,open*(a.vol==='Extreme' ? .0028 : a.vol==='High' ? .0018 : .0008));
  const high=Math.max(open,close,...slice)+spread*Math.random()*.8;
  const low=Math.max(0,Math.min(open,close,...slice)-spread*Math.random()*.8);
  out.push({o:open,c:close,h:high,l:low});
 }
 return out;
}
function detectPatterns(cs){
 const out=[]; if(cs.length<3)return out; const c=cs.at(-1),p=cs.at(-2),pp=cs.at(-3);const body=x=>Math.abs(x.c-x.o),range=x=>Math.max(x.h-x.l,1e-10),upper=x=>x.h-Math.max(x.o,x.c),lower=x=>Math.min(x.o,x.c)-x.l, bull=x=>x.c>x.o,bear=x=>x.c<x.o;
 const add=(name,kind,detail)=>out.push({name,kind,detail}); const r=range(c),b=body(c),u=upper(c),l=lower(c),tiny=b/r<.1;
 if(tiny){if(l/r>.6&&u/r<.12)add('Dragonfly Doji','bull','Long lower shadow with open and close near the high.');else if(u/r>.6&&l/r<.12)add('Gravestone Doji','bear','Long upper shadow with open and close near the low.');else if((u/r>.25&&l/r>.25))add('Long-Legged Doji','neutral','Small body with long shadows on both sides.');else add('Doji','neutral','Open and close are very close; indecision candle.');}
 if(b/r>.88&&u/r<.07&&l/r<.07)add('Marubozu','bullish',bull(c)?'Strong bullish body with tiny shadows.':'Strong bearish body with tiny shadows.');
 if(b/r<.3&&u/r>.2&&l/r>.2&&!tiny)add('Spinning Top','neutral','Small real body with shadows on both sides.');
 if(l>2.1*Math.max(b,r*.015)&&u/r<.22&&b/r<.42)add('Hammer / Hanging Man','bull', 'Long lower shadow; context determines hammer (downtrend) vs hanging man (uptrend).');
 if(u>2.1*Math.max(b,r*.015)&&l/r<.22&&b/r<.42)add('Inverted Hammer / Shooting Star','bear','Long upper shadow; context determines reversal interpretation.');
 if(bull(c)&&bear(p)&&c.o<=p.c&&c.c>=p.o)add('Bullish Engulfing','bull','Current bullish body engulfs the previous bearish body.');
 if(bear(c)&&bull(p)&&c.o>=p.c&&c.c<=p.o)add('Bearish Engulfing','bear','Current bearish body engulfs the previous bullish body.');
 if(bull(c)&&bear(p)&&c.o>p.c&&c.o<p.o&&c.c<p.o&&c.c>p.c)add('Bullish Harami','bull','Small bullish body sits within the prior bearish body.');
 if(bear(c)&&bull(p)&&c.o<p.c&&c.o>p.o&&c.c>p.o&&c.c<p.c)add('Bearish Harami','bear','Small bearish body sits within the prior bullish body.');
 if(bull(c)&&bear(p)&&c.c>(p.o+p.c)/2&&c.o<=p.c)add('Piercing Line','bull','Bullish close recovers above the prior candle midpoint.');
 if(bear(c)&&bull(p)&&c.c<(p.o+p.c)/2&&c.o>=p.c)add('Dark Cloud Cover','bear','Bearish close falls below the prior candle midpoint.');
 if(Math.abs(c.l-p.l)/Math.max(c.l,p.l)<.0015&&bear(p)&&bull(c))add('Tweezer Bottom','bull','Two candles test a similar low and reverse upward.');
 if(Math.abs(c.h-p.h)/Math.max(c.h,p.h)<.0015&&bull(p)&&bear(c))add('Tweezer Top','bear','Two candles test a similar high and reverse downward.');
 if(c.h<p.h&&c.l>p.l)add('Inside Bar','neutral','Latest candle range sits inside the previous range.');
 if(c.h>p.h&&c.l<p.l)add('Outside Bar','neutral','Latest candle expands beyond the previous candle range.');
 if(bull(c)&&bull(p)&&bull(pp)&&c.c>p.c&&p.c>pp.c&&body(c)>range(c)*.35&&body(p)>range(p)*.35&&body(pp)>range(pp)*.35)add('Three White Soldiers','bull','Three consecutive advancing bullish candles.');
 if(bear(c)&&bear(p)&&bear(pp)&&c.c<p.c&&p.c<pp.c&&body(c)>range(c)*.35&&body(p)>range(p)*.35&&body(pp)>range(pp)*.35)add('Three Black Crows','bear','Three consecutive declining bearish candles.');
 if(bear(pp)&&body(p)<body(pp)*.6&&bull(c)&&c.c>(pp.o+pp.c)/2)add('Morning Star (possible)','bull','Three-candle bullish reversal structure.');
 if(bull(pp)&&body(p)<body(pp)*.6&&bear(c)&&c.c<(pp.o+pp.c)/2)add('Evening Star (possible)','bear','Three-candle bearish reversal structure.');
 if(bear(pp)&&bull(p)&&bear(c)&&p.c>pp.c&&c.c<pp.c)add('Three Inside Up/Down (watch)','neutral','Three-candle compression structure; confirm trend context.');
 if(out.length===0)add('No clear pattern','neutral','No high-confidence named formation detected in the latest candle.');
 return out.slice(0,6);
}
function renderPatternScanner(cs){const el=$('#pattern-results');if(!el)return;const pats=detectPatterns(cs);el.innerHTML=pats.map(p=>`<div class="pattern-result"><span class="pattern-bullet ${p.kind}"></span><div class="pattern-copy"><b>${p.name}</b><small>${p.detail}</small></div><span class="pattern-bias ${p.kind}">${p.kind==='bull'||p.kind==='bullish'?'BULLISH':p.kind==='bear'?'BEARISH':'NEUTRAL'}</span></div>`).join('');}
function heikinAshi(cs){
 let prevOpen,prevClose;
 return cs.map((v,i)=>{const close=(v.o+v.h+v.l+v.c)/4;const open=i===0?(v.o+v.c)/2:(prevOpen+prevClose)/2;const ha={o:open,c:close,h:Math.max(v.h,open,close),l:Math.min(v.l,open,close)};prevOpen=open;prevClose=close;return ha;});
}
function drawChart(a){
 const canvas=$('#trade-chart');if(!canvas)return;const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;
 const dpr=window.devicePixelRatio||1;if(canvas.width!==Math.round(rect.width*dpr)||canvas.height!==Math.round(rect.height*dpr)){canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr)}
 const c=canvas.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,rect.width,rect.height);
 const w=rect.width,h=rect.height,pad=10,raw=makeCandles(a);const candles=raw.slice(-Math.max(18,Math.floor((w-pad*2)/7)));if(!candles.length)return;
 const plotted=chartStyle==='heikin'?heikinAshi(candles):candles;
 const vals=plotted.flatMap(v=>[v.h,v.l,v.o,v.c]);let min=Math.min(...vals),max=Math.max(...vals);const range=(max-min)||1;const y=v=>h-pad-(v-min)/range*(h-pad*2);const slot=(w-pad*2)/plotted.length,cw=Math.max(2,Math.min(10,slot*.62));
 c.strokeStyle='#283342';c.lineWidth=1;for(let i=1;i<5;i++){const yy=h*i/5;c.beginPath();c.moveTo(0,yy);c.lineTo(w,yy);c.stroke()}
 const points=plotted.map((v,i)=>({x:pad+i*slot+slot/2,y:y(v.c),v}));
 if(chartStyle==='line'||chartStyle==='area'||chartStyle==='baseline'){
  const baseline=y((min+max)/2);
  if(chartStyle==='baseline'){c.strokeStyle='#526176';c.setLineDash([3,4]);c.beginPath();c.moveTo(0,baseline);c.lineTo(w,baseline);c.stroke();c.setLineDash([])}
  c.beginPath();points.forEach((pt,i)=>i===0?c.moveTo(pt.x,pt.y):c.lineTo(pt.x,pt.y));
  if(chartStyle==='area'){c.lineTo(points.at(-1).x,h-pad);c.lineTo(points[0].x,h-pad);c.closePath();const g=c.createLinearGradient(0,pad,0,h-pad);g.addColorStop(0,'#5df0c240');g.addColorStop(1,'#5df0c202');c.fillStyle=g;c.fill();c.beginPath();points.forEach((pt,i)=>i===0?c.moveTo(pt.x,pt.y):c.lineTo(pt.x,pt.y));}
  c.strokeStyle=points.at(-1).v.c>=points[0].v.c?'#5df0c2':'#ff6b85';c.lineWidth=2;c.lineJoin='round';c.lineCap='round';c.stroke();
 } else {
  plotted.forEach((v,i)=>{const x=pad+i*slot+slot/2,up=v.c>=v.o,color=up?'#5df0c2':'#ff6b85';c.strokeStyle=color;c.fillStyle=color;c.lineWidth=1.2;
   if(chartStyle==='bars'){
    c.beginPath();c.moveTo(x,y(v.h));c.lineTo(x,y(v.l));c.moveTo(x-slot*.22,y(v.o));c.lineTo(x,y(v.o));c.moveTo(x,y(v.c));c.lineTo(x+slot*.22,y(v.c));c.stroke();
   }else{
    c.beginPath();c.moveTo(x,y(v.h));c.lineTo(x,y(v.l));c.stroke();const top=y(Math.max(v.o,v.c)),bottom=y(Math.min(v.o,v.c));
    if(chartStyle==='heikin'&&up){c.strokeStyle=color;c.strokeRect(x-cw/2,top,cw,Math.max(1,bottom-top))}else c.fillRect(x-cw/2,top,cw,Math.max(1,bottom-top));
    if(bottom-top<1){c.beginPath();c.moveTo(x-cw/2,top);c.lineTo(x+cw/2,top);c.stroke()}
   }
  });
 }
 const last=plotted.at(-1),yy=y(last.c);c.setLineDash([4,4]);c.strokeStyle='#5df0c277';c.beginPath();c.moveTo(0,yy);c.lineTo(w,yy);c.stroke();c.setLineDash([]);
 const desc=$('#chart-description');if(desc)desc.textContent=({candles:'Candlesticks',heikin:'Heikin-Ashi candles',line:'Line chart',area:'Area chart',bars:'OHLC bars',baseline:'Baseline chart'}[chartStyle]+' · synthetic data');
 // Scan original OHLC candles so chart style changes do not alter scanner signals.
 renderPatternScanner(candles);
}
function renderRecent(){const body=$('#recent-positions');if(!body)return;const recent=positions.slice(-5).reverse();body.innerHTML=recent.map(p=>{const a=getAsset(p.asset),n=pnlFor(p);return `<tr><td>${a.name}</td><td class="${p.side==='buy'?'positive':'negative'}">${p.side==='buy'?'LONG':'SHORT'}</td><td class="mono">${money(p.size)}</td><td class="mono">${fmtPrice(a,p.entry)}</td><td class="mono">${fmtPrice(a)}</td><td class="mono ${n>=0?'positive':'negative'}">${money(n)}</td></tr>`}).join('')||'<tr><td colspan="6">No positions yet. Place an order above.</td></tr>'}
function renderPortfolio(){const body=$('#portfolio-body');if(!body)return;body.innerHTML=positions.map(p=>{const a=getAsset(p.asset),n=pnlFor(p);return `<tr><td><div class="instrument-cell"><div class="asset-icon">${a.icon}</div><div><b>${a.name}</b><small>${a.id}</small></div></div></td><td class="${p.side==='buy'?'positive':'negative'}">${p.side==='buy'?'LONG':'SHORT'}</td><td class="mono">${money(p.size)}</td><td class="mono">${fmtPrice(a,p.entry)}</td><td class="mono">${fmtPrice(a)}</td><td class="mono ${n>=0?'positive':'negative'}">${money(n)}</td><td><button class="filter" data-close="${p.id}">Close ×</button></td></tr>`}).join('')||'<tr><td colspan="7">No open positions. Visit the trade terminal to place an order.</td></tr>';
const hb=$('#history-body');if(hb)hb.innerHTML=history.slice().reverse().map(p=>{const a=getAsset(p.asset);return `<tr><td>${a.name}</td><td>${p.side.toUpperCase()}</td><td class="mono">${money(p.size)}</td><td class="mono">${fmtPrice(a,p.entry)}</td><td class="mono">${fmtPrice(a,p.exit)}</td><td class="mono ${p.pnl>=0?'positive':'negative'}">${money(p.pnl)}</td></tr>`}).join('')||'<tr><td colspan="6">No closed positions yet.</td></tr>'}
function placeOrder(){const amount=Number($('#amount')?.value||0),leverage=selectedLeverage(),msg=$('#order-message');if(accountLocked||balance<1){accountLocked=true;persist();updateOrderAccess();return}if(!Number.isFinite(amount)||amount<1){msg.textContent='Enter a margin amount of at least $1. There is no fixed maximum; your available balance and fees apply.';msg.className='order-message error';return}const positionSize=amount*leverage;const fee=positionSize*0.0005;if(amount+fee>balance){msg.textContent=`Insufficient cash for this margin and its opening fee. Available: ${money(balance)}; required: ${money(amount+fee)}.`;msg.className='order-message error';return}const a=getAsset(selected);const slippage=0.0002;const entry=a.price*(side==='buy'?1+slippage:1-slippage);/* Position results follow the selected direction and price movement, minus fees. */positions.push({id:nextId++,asset:a.id,side,size:positionSize,margin:amount,leverage,entry,fee,slippage});balance-=amount+fee;if(balance<1)accountLocked=true;msg.textContent=`${side==='buy'?'Long':'Short'} position opened for ${money(positionSize)} of ${a.name} at ${leverage}× leverage (${money(amount)} margin). Fees and slippage apply. Order recorded in your NOVACOIN account.`;msg.className='order-message';persist();renderShared();renderTrade()}
function closePosition(id){const idx=positions.findIndex(p=>p.id===id);if(idx<0)return;const p=positions[idx],gross=pnlFor(p),exitFee=p.size*0.0005;const netPnl=gross-p.fee-exitFee;balance=Math.max(0,balance+(p.margin??p.size)+gross-exitFee);history.push({...p,exit:getAsset(p.asset).price,pnl:netPnl,grossPnl:gross,exitFee});positions.splice(idx,1);accountLocked=balance<1;enforceWalletLiquidation();persist();renderShared();renderPortfolio();renderTrade();}
function init(){
 updateClock();setInterval(updateClock,1000);
 const page=document.body.dataset.page;
 if(page==='dashboard')renderDashboard();
 if(page==='markets'){renderMarkets();$('#market-search')?.addEventListener('input',renderMarkets);$$('.filter').forEach(b=>b.addEventListener('click',()=>{marketFilter=b.dataset.filter;$$('.filter').forEach(x=>x.classList.toggle('active',x===b));renderMarkets()}))}
 if(page==='trade'){
 selected=sessionStorage.getItem('novaSelected')||'NVC';sessionStorage.removeItem('novaSelected');
 $$('[data-timeframe]').forEach(b=>b.addEventListener('click',()=>{timeframe=b.dataset.timeframe;$$('[data-timeframe]').forEach(x=>x.classList.toggle('active',x===b));renderTrade()}));
 const chartSel=$('#chart-style');if(chartSel){chartSel.value=chartStyle;chartSel.addEventListener('change',()=>{chartStyle=chartSel.value;drawChart(getAsset(selected))})}
 const sel=$('#trade-select');sel.innerHTML=assets.map(a=>`<option value="${a.id}">${a.name} (${a.id})</option>`).join('');sel.value=selected;sel.addEventListener('change',()=>{selected=sel.value;renderTrade()});
 $$('[data-side]').forEach(b=>b.addEventListener('click',()=>{side=b.dataset.side;$$('[data-side]').forEach(x=>x.classList.toggle('active',x===b));renderTrade()}));
 $$('[data-amount]').forEach(b=>b.addEventListener('click',()=>{$('#amount').value=b.dataset.amount;$$('[data-amount]').forEach(x=>x.classList.toggle('active',x===b));updateOrderAccess()}));
 const levSel=$('#leverage');if(levSel){levSel.innerHTML=Array.from({length:100},(_,i)=>`<option value="${i+1}">${i+1}×</option>`).join('');levSel.value='1';levSel.addEventListener('change',updateLeveragePreview)}$('#place-order')?.addEventListener('click',placeOrder);$('#amount')?.addEventListener('input',updateOrderAccess);renderTrade();window.addEventListener('resize',()=>drawChart(getAsset(selected)));
 }
 if(page==='portfolio'){renderPortfolio();$('#portfolio-body')?.addEventListener('click',e=>{const b=e.target.closest('[data-close]');if(b)closePosition(Number(b.dataset.close))})}
 renderShared();persist();setInterval(tick,1000);
}
document.addEventListener('DOMContentLoaded',async()=>{try{await (window.NOVACOIN_FIREBASE_READY||Promise.resolve())}catch(e){console.error('Firebase setup error:',e)}init();});
})();