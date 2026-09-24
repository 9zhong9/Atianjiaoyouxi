const characters={zhou:{name:'周钟辰',role:'校草学霸'},zhu:{name:'祝嘉',role:'田径体育生'},bai:{name:'白传成',role:'游戏��爷'},wang:{name:'王子俊',role:'学生干部'},zhong:{name:'钟景皓',role:'高冷男神'},zhang:{name:'张凌川',role:'帅气男模'},luo:{name:'罗景熙',role:'清瘦公子'}};
const scenes={
 start:{chapter:'第一天 · 傍晚',text:'你拖着行李来到新宿舍。窗外刚下过雨，地面反着淡淡的光。几位室友都在房间里，各自忙着自己的事。周钟辰抬起头，给你让出一把椅子。\n\n“新室友？先坐吧。需要我介绍一下这里的规矩吗？”',choices:[['礼貌打招呼','你先向大家问好，并询问每个人是否需要帮忙。','zhou',4,3,'hall'],['先整理行李','你决定先把自己的东西安顿好，不打扰大家。','wang',1,2,'room'],['直接询问宿舍安排','你认真询问作息、卫生和公共空间的安排。','wang',3,5,'rules']]},
 hall:{chapter:'第一天 · 宿舍客厅',text:'大家简单介绍了自己。祝嘉刚训练回来，白传成正戴着耳机打游戏。周钟辰把一杯温水放到你手边。\n\n“刚搬来可能有点乱。你想先熟悉谁？”',choices:[['关心祝嘉的训练','你问祝嘉今天训练累不累，并表示如果他想安静休息，你不会打扰。','zhu',4,4,'night'],['加入白传成的游戏','你先询问他是否愿意带你玩一局，而不是直接拿起手柄。','bai',3,3,'game'],['和周钟辰聊学习','你请周钟辰推荐附近适合学习的地方。','zhou',3,4,'study']]},
 room:{chapter:'第一天 · 整理时间',text:'你整理床铺时，发现公共柜子里放着一盏备用台灯。王子俊走过来说明：公共物品可以使用，但用完要放回原处。\n\n他停了一下：“如果有任何不方便，直接说就好。”',choices:[['认真记下规则','你表示理解，并主动提出做一份公共物品清单。','wang',4,5,'rules'],['询问大家的边界','你问每个人是否有需要提前告知的生活习惯，并承诺尊重。','wang',3,6,'night'],['先自己适应','你说暂时没问题，等熟悉后再沟通。','luo',1,1,'night']]},
 rules:{chapter:'第一天 · 宿舍会议',text:'大家围坐在桌边，开始确定宿舍公约。有人习惯早睡，有人晚上学习；每个人都希望自己的空间被尊重。\n\n王子俊问：“关于公共空间和私人时间，你有什么建议？”',choices:[['提议先征得同意','你建议进入别人的床位或借用物品前先询问，任何人说“不”都应被接受。','wang',6,7,'night'],['提议制定安静时段','你提出晚上十一点后降低音量，并保留特殊情况的沟通空间。','wang',4,4,'night'],['说不用太复杂','你认为室友之间随和一点就好，但愿意听听大家的想法。','bai',1,0,'night']]},
 game:{chapter:'第一天 · 游戏时间',text:'白传成暂停了游戏，认真看着你。“第一次玩不用紧张，随时想停都可以。”你们配合完成了一局。\n\n胜负不重要，重要的是你们开始找到了共同话题。',choices:[['感谢他的耐心','你告诉他刚才的讲解很清楚，并问他是否想一起吃夜宵。','bai',5,4,'night'],['提出再玩一局','你先确认他还有时间和精力，再决定是否继续。','bai',3,3,'night'],['主动结束游戏','你说今天已经很开心了，尊重他的休息时间。','bai',4,5,'night']]},
 study:{chapter:'第一天 · 校园夜路',text:'周钟辰带你走到教学楼附近。夜风很轻，他保持着适当的距离。\n\n“如果你不习惯和别人单独走，也可以现在回宿舍。”他补充道。',choices:[['说谢谢并继续聊天','你确认自己愿意继续，并聊起各自喜欢的课程。','zhou',4,5,'night'],['选择回宿舍','你告诉他今天信息已经够多了，想回去休息。','zhou',3,5,'night'],['询问他的界限','你也问他是否有不想聊的话题，并约定彼此都可以暂停。','zhou',6,7,'night']]},
 night:{chapter:'第一天 · 夜晚',text:'宿舍逐渐安静下来。你回想起今天的相处：没有人强迫你融入，也没有人把好意���成理所当然。\n\n你可以选择继续了解一位室友，或者先休息，为明天保留精力。',choices:[['写下今天的观察','你在日记里记下：信任不是一次交换，而是持续尊重选择。','luo',4,5,'end'],['和一位室友道晚安','你先询问对方是否方便聊天，得到回应后再说晚安。','zhou',3,4,'end'],['安静休息','你告诉大家自己要睡了，并感谢他们今天的照顾。','wang',4,5,'end']]},
 end:{chapter:'第一天 · 日记结尾',text:'你关掉台灯，听见宿舍里平稳的呼吸声。明天还有新的相处和选择，但今天的第一步已经走得很好。',choices:[]}
};
const defaultState=()=>({scene:'start',turn:1,stats:Object.fromEntries(Object.keys(characters).map(id=>[id,{affection:10,trust:10}])),paused:false});
let state=load();
const $=s=>document.querySelector(s);
function load(){try{return {...defaultState(),...JSON.parse(localStorage.getItem('dorm-story-save'))}}catch{return defaultState()}}
function save(){localStorage.setItem('dorm-story-save',JSON.stringify(state));}
function clamp(n){return Math.max(0,Math.min(100,n))}
function render(){const scene=scenes[state.scene];$('#chapter').textContent=scene.chapter;$('#turn').textContent=`第 ${state.turn} 回合`;$('#story').innerHTML=scene.text.split('\n\n').map((p,i)=>`<p class="${i?'':'system'}">${escape(p)}</p>`).join('');
 const choices=scene.choices;$('#choices').innerHTML=state.paused?'<div class="ending"><h3>游戏已暂停</h3><p>你的进度已保存在本地。准备好后点击“继续游戏”。</p><button id="resume" class="choice" type="button">继续游戏</button></div>':choices.length?choices.map((c,i)=>`<button class="choice" data-index="${i}" type="button"><strong>${i+1}. ${escape(c[0])}</strong>${escape(c[1])}</button>`).join(''):'<div class="ending"><h3>本章结束</h3><p>你可以点击“重新开始”再次体验不同路线。</p></div>';
 document.querySelectorAll('.choice').forEach(b=>b.onclick=()=>{if(b.id==='resume'){state.paused=false;save();render();return} choose(Number(b.dataset.index))});renderRelationships();renderStatus();}
function choose(index){const c=scenes[state.scene].choices[index];if(!c)return;const [title,desc,target,a,t,next]=c;const s=state.stats[target];s.affection=clamp(s.affection+a);s.trust=clamp(s.trust+t);state.scene=next;state.turn++;save();render()}
function renderRelationships(){$('#relationship-list').innerHTML=Object.entries(characters).map(([id,c])=>{const s=state.stats[id];return`<div class="relationship"><b>${c.name}</b><small>${c.role} · 好感 ${s.affection}</small><div class="meter"><i style="width:${s.affection}%"></i></div></div>`}).join('')}
function renderStatus(){const total=Object.values(state.stats).reduce((n,s)=>n+s.trust,0);const avg=Math.round(total/Object.keys(characters).length);$('#player-status').innerHTML=`<div class="stat"><div class="stat-label"><span>整体信任</span><b>${avg}/100</b></div><div class="meter"><i style="width:${avg}%"></i></div></div><div class="stat"><span class="tag">${state.scene==='end'?'第一天完成':'建立室友关系中'}</span></div><div class="stat-label"><span>已完成回合</span><b>${state.turn-1}</b></div>`}
function escape(text){return text.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
$('#restart').onclick=()=>{if(confirm('确定重新开始并清除当前进度吗？')){state=defaultState();save();render()}};$('#pause').onclick=()=>{state.paused=!state.paused;save();render()};$('#save').onclick=()=>{save();alert('进度已保存在当前浏览器。')};
render();
