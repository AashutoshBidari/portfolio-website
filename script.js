(function(){
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* hero name: letters swell near the cursor */
var h1=$('#name');
['Aashutosh','Bidari'].forEach(function(w,i){
  var line=document.createElement('span');line.className=i?'l2':'';line.style.display='block';line.setAttribute('aria-hidden','true');
  w.split('').forEach(function(ch){var s=document.createElement('span');s.textContent=ch;line.appendChild(s)});
  h1.appendChild(line);
});
var letters=$$('#name span span');
var colors=['--coral','--sun','--mint','--sky','--violet'];
function swell(x,y){
  letters.forEach(function(el){
    var r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
    var d=Math.hypot(x-cx,y-cy),t=Math.max(0,1-d/260);
    el.style.fontVariationSettings="'wght' "+Math.round(300+t*500);
    el.style.color=t>.15?'var('+colors[Math.floor(cy+cx)%5<0?0:letters.indexOf(el)%5]+')':'';
  });
}
/* idle wave so touch users see it too */
var t0=0;
function wave(ts){
  if(!reduce&&!pointerActive){
    var W=innerWidth,H=innerHeight;
    swell((Math.sin(ts/1400)*.5+.5)*W,H*.35);
  }
  requestAnimationFrame(wave);
}
var pointerActive=false;
requestAnimationFrame(wave);

/* cursor + shapes parallax */
var cur=$('#cur'),shapes=$$('.shape');
addEventListener('pointermove',function(e){
  cur.style.transform='translate('+(e.clientX-cur.offsetWidth/2)+'px,'+(e.clientY-cur.offsetHeight/2)+'px)';
  if(e.pointerType==='mouse'&&scrollY<innerHeight){
    pointerActive=true;swell(e.clientX,e.clientY);
    var nx=e.clientX/innerWidth-.5,ny=e.clientY/innerHeight-.5;
    shapes.forEach(function(s){var d=+s.dataset.d;s.style.transform='translate('+nx*d*2+'px,'+ny*d*2+'px)'});
  } else pointerActive=false;
});
$$('a,button').forEach(function(a){
  a.addEventListener('pointerenter',function(){cur.classList.add('big')});
  a.addEventListener('pointerleave',function(){cur.classList.remove('big')});
});

/* magnetic buttons */
$$('.mag').forEach(function(b){
  b.addEventListener('pointermove',function(e){
    var r=b.getBoundingClientRect();
    b.style.transform='translate('+(e.clientX-r.left-r.width/2)*.35+'px,'+(e.clientY-r.top-r.height/2)*.5+'px)';
  });
  b.addEventListener('pointerleave',function(){b.style.transform=''});
});

/* about: words light up on scroll */
var rv=$('#reveal'),words=[];
rv.dataset.text.split(' ').forEach(function(w,i){
  var s=document.createElement('span');s.className='w';s.textContent=w+' ';
  if(/B\.Tech|Artificial|Intelligence|Nepal|apps/.test(w))s.classList.add('hl');
  rv.appendChild(s);words.push(s);
});
var about=$('#about');

/* skills */
var skills=['Python','Machine Learning','Vibe Coding','Prompt Design','HTML & CSS','JavaScript','Git & GitHub','Data Handling','Problem Solving'];
$$('.row').forEach(function(row){
  for(var k=0;k<3;k++)skills.forEach(function(s){var c=document.createElement('span');c.className='chip';c.textContent=s;row.appendChild(c)});
});
var rows=$$('.row'),sk=$('.skills'),lastY=scrollY,vel=0,off=[0,0];

/* work: horizontal scroll */
var work=$('#work'),track=$('#track');
function sizeWork(){work.style.height=(track.scrollWidth-innerWidth+innerHeight*1.1)+'px'}
sizeWork();addEventListener('resize',sizeWork);addEventListener('load',sizeWork);

var bg=[['#top','#FBF9FF'],['#about','#FFF3D6'],['#work','#E6F8F3'],['.skills','#F0EBFF']];
function frame(){
  var y=scrollY,max=document.documentElement.scrollHeight-innerHeight;
  $('#bar').style.transform='scaleX('+(max>0?y/max:0)+')';
  /* about */
  var ar=about.getBoundingClientRect(),p=Math.min(1,Math.max(0,-ar.top/(ar.height-innerHeight)));
  var n=Math.round(p*1.15*words.length);
  words.forEach(function(w,i){w.classList.toggle('on',reduce||i<n)});
  /* work */
  var wr=work.getBoundingClientRect(),wp=Math.min(1,Math.max(0,-wr.top/(wr.height-innerHeight)));
  track.style.transform='translateX('+(-wp*(track.scrollWidth-innerWidth))+'px)';
  /* skills marquee driven by scroll */
  vel+=(Math.abs(y-lastY)-vel)*.1;lastY=y;
  rows.forEach(function(r,i){
    off[i]+=(+r.dataset.s)*(0.6+vel*.5);
    var w=r.scrollWidth/3;if(off[i]>w)off[i]-=w;if(off[i]<-w)off[i]+=w;
    r.style.transform='translateX('+(-w+off[i])+'px) skewX('+(-Math.min(vel,20)*(+r.dataset.s)*.5)+'deg)';
  });
  /* background color mood */
  if(!reduce){
    var mid=innerHeight*.5,col=bg[0][1];
    bg.forEach(function(b){var e=$(b[0]);if(e&&e.getBoundingClientRect().top<mid)col=b[1]});
    if(!matchMedia('(prefers-color-scheme:dark)').matches)document.body.style.background=col;
  }
  requestAnimationFrame(frame);
}
if(reduce){words.forEach(function(w){w.classList.add('on')})}
requestAnimationFrame(frame);
})();

/* loading screen: waits for font + page, then slides away */
(function(){
  var L=document.getElementById('loader');if(!L)return;
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,done=false;
  document.documentElement.classList.add('loading');
  function finish(){
    if(done)return;done=true;
    L.classList.add('out');document.documentElement.classList.remove('loading');
    setTimeout(function(){L.remove()},1200);
  }
  var font=(document.fonts&&document.fonts.load)?Promise.race([document.fonts.load('700 100px Kalam','\u0928\u092E\u0938\u094D\u0924\u0947'),new Promise(function(r){setTimeout(r,2500)})]):Promise.resolve();
  var page=new Promise(function(r){if(document.readyState==='complete')r();else addEventListener('load',r)});
  var anim=font.then(function(){L.classList.add('go');return new Promise(function(r){setTimeout(r,reduce?400:4000)})});
  Promise.all([anim,page]).then(finish);
  setTimeout(finish,9000);
})();