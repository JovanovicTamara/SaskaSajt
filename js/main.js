/* Osnovne funkcije: godina u podnožju, uvećanje slika */
document.getElementById('y').textContent=new Date().getFullYear();
const lb=document.getElementById('lb'),lbi=lb.querySelector('img');
document.querySelectorAll('#gallery img').forEach(i=>i.parentElement.addEventListener('click',()=>{lbi.src=i.src;lb.classList.add('open')}));
lb.addEventListener('click',()=>lb.classList.remove('open'));
document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open')});

/* Animacije, traka napretka, aktivan meni */
(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bar=document.createElement('div');bar.id='bar';document.body.prepend(bar);
  var hd=document.querySelector('header');
  function onScroll(){
    var h=document.documentElement.scrollHeight-innerHeight;
    bar.style.width=(h>0?scrollY/h*100:0)+'%';
    hd.classList.toggle('scrolled',scrollY>20);
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  if(!reduce&&'IntersectionObserver' in window){
    var els=[].slice.call(document.querySelectorAll('.head,.card,.about-grid>div,.step,.gallery button,details,.contact-grid>div,.row'));
    els.forEach(function(el){
      var i=[].indexOf.call(el.parentElement.children,el);
      el.style.transitionDelay=(i%4)*90+'ms';
      el.classList.add('reveal');
    });
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(!e.isIntersecting)return;
        var el=e.target;el.classList.add('in');io.unobserve(el);
        setTimeout(function(){el.classList.remove('reveal');el.style.transitionDelay='';},1400);
      });
    },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el);});
  }else{
    [].forEach.call(document.querySelectorAll('.head'),function(h){h.classList.add('in');});
  }

  var links=[].slice.call(document.querySelectorAll('nav a[href^="#"]:not(.nav-call)'));
  if('IntersectionObserver' in window){
    var so=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting)links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id);});
      });
    },{rootMargin:'-45% 0px -50% 0px'});
    links.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s)so.observe(s);});
  }
})();
