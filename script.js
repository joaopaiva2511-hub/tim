const slides=[
  {eyebrow:"TIM CONTROLE",title:"Seu pai com mais internet, pagando menos",copy:"46GB para navegar, WhatsApp ilimitado e ligações para qualquer operadora.",price:"59,99",note:"/mês",plan:"TIM Controle"},
  {eyebrow:"TIM ULTRAFIBRA",title:"Ultravelocidade para curtir em família",copy:"800 Mega com instalação grátis e Wi-Fi 6 para a casa toda.",price:"129,99",note:"/mês",plan:"TIM Ultrafibra"},
  {eyebrow:"TIM PRÉ XIP",title:"Recarregue e tenha internet o mês todo",copy:"Muita internet, WhatsApp à vontade e bônus nas recargas pelo app.",price:"30",note:"por recarga",plan:"TIM Pré XIP"}
];
let currentSlide=0;
const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];

function renderSlide(index){
  currentSlide=(index+slides.length)%slides.length;
  const slide=slides[currentSlide];
  $("#hero-eyebrow").textContent=slide.eyebrow;
  $("#hero-title").textContent=slide.title;
  $("#hero-copy").textContent=slide.copy;
  $("#hero-price").textContent=slide.price;
  $("#hero-note").textContent=slide.note;
  $$(".hero-actions [data-plan]").forEach(button=>button.dataset.plan=slide.plan);
  $$("#hero-dots button").forEach((dot,i)=>dot.classList.toggle("active",i===currentSlide));
}

slides.forEach((slide,index)=>{
  const dot=document.createElement("button");
  dot.setAttribute("aria-label",`Oferta ${index+1}`);
  dot.addEventListener("click",()=>renderSlide(index));
  $("#hero-dots").appendChild(dot);
});
renderSlide(0);
$("#prev-slide").addEventListener("click",()=>renderSlide(currentSlide-1));
$("#next-slide").addEventListener("click",()=>renderSlide(currentSlide+1));
setInterval(()=>renderSlide(currentSlide+1),6500);

const menu=$("#main-menu");
$("#menu-button").addEventListener("click",event=>{
  menu.classList.toggle("open");
  event.currentTarget.textContent=menu.classList.contains("open")?"×":"☰";
});
$$('#main-menu a').forEach(link=>link.addEventListener("click",()=>menu.classList.remove("open")));

function openModal(modal){ modal.hidden=false; document.body.style.overflow="hidden"; }
function closeModals(){ $$(".modal-backdrop").forEach(modal=>modal.hidden=true); document.body.style.overflow=""; }
$$('[data-plan]').forEach(button=>button.addEventListener("click",()=>{
  $("#modal-plan-title").textContent=button.dataset.plan;
  openModal($("#plan-modal"));
}));
$$('[data-account]').forEach(button=>button.addEventListener("click",()=>openModal($("#account-modal"))));
$$('[data-close]').forEach(button=>button.addEventListener("click",closeModals));
$$('.modal-backdrop').forEach(backdrop=>backdrop.addEventListener("click",event=>{if(event.target===backdrop)closeModals()}));
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeModals()});

$$('.faq-item>button').forEach(button=>button.addEventListener("click",()=>{
  const item=button.closest(".faq-item");
  item.classList.toggle("open");
  button.querySelector("i").textContent=item.classList.contains("open")?"−":"+";
}));

function hideCookies(){ $("#cookie-banner").hidden=true; }
$("#cookie-accept").addEventListener("click",hideCookies);
$("#cookie-settings").addEventListener("click",hideCookies);
