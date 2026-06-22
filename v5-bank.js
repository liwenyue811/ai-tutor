(function () {
  const chapters = {
    view: "观察物体",
    factor: "因数与倍数",
    cube: "长方体和正方体",
    fraction: "分数的意义和性质",
    motion: "图形的运动",
    "fraction-add": "分数加减法",
    "line-chart": "折线统计图"
  };
  const targets = {
    view: 100,
    factor: 180,
    cube: 180,
    fraction: 200,
    motion: 100,
    "fraction-add": 180,
    "line-chart": 100
  };
  const difficulties = ["基础题", "提高题", "易错题"];
  const bank = [];

  const add = (chapterId, difficulty, knowledgePoint, question, options, answer, explanation, commonMistake, encouragement) => {
    bank.push({
      id: `v5-${chapterId}-${String(bank.length + 1).padStart(4, "0")}`,
      chapterId,
      chapter: chapters[chapterId],
      difficulty,
      knowledgePoint,
      question,
      title: question,
      options: uniqueOptions(options, answer),
      answer: String(answer),
      explanation,
      commonMistake,
      encouragement
    });
  };

  function uniqueOptions(options, answer) {
    const result = [];
    [...options, answer].forEach((item) => {
      const text = String(item);
      if (text && !result.includes(text)) result.push(text);
    });
    let i = 1;
    while (result.length < 4) {
      const text = `选项${i}`;
      if (!result.includes(text)) result.push(text);
      i += 1;
    }
    return result.slice(0, 4);
  }

  const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
  const lcm = (a, b) => a * b / gcd(a, b);
  const simp = (n, d) => {
    const g = gcd(n, d);
    return [n / g, d / g];
  };
  const frac = (n, d) => {
    const [a, b] = simp(n, d);
    return b === 1 ? `${a}` : `${a}/${b}`;
  };
  const mixed = (n, d) => {
    const whole = Math.floor(n / d);
    const r = n % d;
    return r === 0 ? `${whole}` : `${whole}又${r}/${d}`;
  };
  const diff = (i) => difficulties[i % 3];
  const cheer = (d) => d === "易错题" ? "把易错点记下来，下次遇到同类题会更稳。" : d === "提高题" ? "你已经在练综合思考了，保持步骤清楚。" : "基础很关键，继续保持认真审题。";
  const scenes = [
    "课本例题", "课堂练习", "周末作业", "单元复习", "错题整理", "数学社团", "生活购物", "手工制作", "体育活动", "科学实验",
    "班级统计", "图书整理", "校园测量", "家庭劳动", "旅行计划", "劳动实践", "小组讨论", "期末复习", "每日一练", "拓展挑战",
    "学习单", "作业订正", "课堂抢答", "数学日记", "实践记录", "课后巩固", "能力提升", "易错辨析", "综合应用", "思维训练"
  ];
  const withScene = (question, i) => `${question}（${scenes[i % scenes.length]}）`;

  const viewMakers = [
    (i) => {
      const bottom = 2 + i % 4, top = 1 + i % 2, ans = bottom + top;
      return ["三视图", `从正面看下层有${bottom}个小正方形，上层有${top}个小正方形，这个几何体最少需要多少个小正方体？`, [`${ans - 1}个`, `${ans}个`, `${ans + 1}个`, `${bottom * 2}个`], `${ans}个`, `每个看到的位置至少有1个小正方体，所以最少是${bottom}+${top}=${ans}个。`, "容易把看到的正方形误认为一定是全部小正方体。"];
    },
    (i) => {
      const n = 3 + i % 5;
      return ["遮挡关系", `${n}个小正方体前后排成一列，从正面最多能看到几个正方形？`, ["1个", `${n - 1}个`, `${n}个`, `${n + 1}个`], "1个", "前后完全重叠时，后面的被前面的挡住，从正面只看到1个。", "容易忽略前后遮挡。"];
    },
    (i) => {
      const n = 4 + i % 4;
      return ["俯视图", `从上面看到${n}个位置，且正面最高是2层，至少需要几个小正方体？`, [`${n}个`, `${n + 1}个`, `${n + 2}个`, `${n * 2}个`], `${n + 1}个`, `上面${n}个位置至少${n}个；最高2层说明至少有一个位置再叠1个，共${n + 1}个。`, "容易认为俯视图能看出每个位置有几层。"];
    },
    (i) => {
      const n = 2 + i % 4;
      return ["最多可见", `用${n + 3}个小正方体摆一层，从正面最多能看到几个？`, [`${n}个`, `${n + 1}个`, `${n + 3}个`, `${n + 4}个`], `${n + 3}个`, "全部横向排开且不互相遮挡时，从正面看到的最多。", "容易把“最多”和“最少”混淆。"];
    },
    (i) => ["方向判断", `判断一个几何体左右是否对称，最应该比较哪两个方向看到的图形？`, ["正面和上面", "左面和右面", "正面和后面", "上面和下面"], "左面和右面", "左右是否对称，要比较左面和右面的观察结果。", "容易只看正面就下结论。"],
    (i) => ["视图唯一性", `只知道一个几何体的正面图，能唯一确定它的摆法吗？`, ["一定能", "不能", "只要有4个就能", "只要高度相同就能"], "不能", "同一个正面图可能有不同的前后摆法，所以不能唯一确定。", "容易把平面视图当成立体本身。"]
  ];

  const factorMakers = [
    (i) => { const n = [18, 24, 30, 36, 42, 48][i % 6]; const factors = Array.from({length:n},(_,k)=>k+1).filter(x=>n%x===0); return ["找因数", `${n}的因数有几个？`, [`${factors.length - 1}个`, `${factors.length}个`, `${factors.length + 1}个`, `${Math.floor(n/2)}个`], `${factors.length}个`, `${n}的因数是${factors.join("、")}，共${factors.length}个。`, "容易漏掉1和它本身。"]; },
    (i) => { const base = [6,7,8,9,12,15][i%6], m = 3 + i%5, ans = base*m; return ["找倍数", `下面哪个数是${base}的倍数？`, [`${ans-1}`, `${ans}`, `${ans+2}`, `${base+m}`], `${ans}`, `${ans}÷${base}=${m}，所以${ans}是${base}的倍数。`, "容易把倍数和因数说反。"]; },
    (i) => { const primes=[2,3,5,7,11,13,17,19,23,29]; const p=primes[i%primes.length]; return ["质数合数", `下面哪个数是质数？`, [`${p}`, `${p*2}`, `${p*3}`, `${p+1}`], `${p}`, `${p}只有1和${p}两个因数，是质数。`, "容易把1当成质数。"]; },
    (i) => { const a=[12,18,24,30,36][i%5], b=[18,24,30,42,48][i%5], g=gcd(a,b); return ["最大公因数", `${a}和${b}的最大公因数是？`, [`${g}`, `${g+2}`, `${Math.min(a,b)}`, `${a+b}`], `${g}`, `分别找公因数，最大的公因数是${g}。`, "容易把最大公因数和最小公倍数混淆。"]; },
    (i) => { const a=[4,6,8,9,10][i%5], b=[6,8,12,15,14][i%5], v=lcm(a,b); return ["最小公倍数", `${a}和${b}的最小公倍数是？`, [`${v}`, `${a*b}`, `${Math.max(a,b)}`, `${gcd(a,b)}`], `${v}`, `同时是${a}和${b}倍数的数中，最小的是${v}。`, "容易找到公倍数后没有取最小。"]; },
    (i) => { const n=[120,135,246,375,510,726][i%6]; const ans = n%2===0 && n%3===0 && n%5===0 ? "2、3、5" : n%3===0 && n%5===0 ? "3、5" : n%2===0 && n%3===0 ? "2、3" : "5"; return ["2、3、5倍数特征", `${n}是下面哪些数的倍数？`, ["2、3、5", "2、3", "3、5", "5"], ans, "看个位判断2和5的倍数，看各位数字和判断3的倍数。", "容易只看个位，忘记3的倍数要看数字和。"]; },
    (i) => { const n=[42,58,64,76,81,95][i%6]; const ans=n%2===0?"是":"不是"; return ["2倍数特征", `${n}是不是2的倍数？`, ["是", "不是", "无法判断", "只有个位是5才是"], ans, "个位是0、2、4、6、8的数是2的倍数。", "容易看十位而不是个位。"]; },
    (i) => { const n=[123,247,408,516,731,999][i%6]; const ans=String(n).split("").reduce((s,x)=>s+Number(x),0)%3===0?"是":"不是"; return ["3倍数特征", `${n}是不是3的倍数？`, ["是", "不是", "只看个位", "只看百位"], ans, "各位数字和是3的倍数，这个数就是3的倍数。", "容易只看个位，忘记数字和。"]; },
    (i) => { const n=[40,55,68,75,82,100][i%6]; const ans=n%5===0?"是":"不是"; return ["5倍数特征", `${n}是不是5的倍数？`, ["是", "不是", "只要是偶数就是", "只要数字和是5就是"], ans, "个位是0或5的数是5的倍数。", "容易把5的倍数和3的倍数特征混淆。"]; },
    (i) => { const people=[24,30,36,42,48][i%5], group=[4,5,6,7,8][i%5]; const ans=people%group===0?"能":"不能"; return ["实际应用题", `${people}名同学每${group}人一组，能正好分完吗？`, ["能", "不能", "一定剩1人", "无法判断"], ans, `${people}÷${group}${people%group===0?"没有余数":"有余数"}，所以${ans}正好分完。`, "容易不看是否有余数。"]; }
  ];

  const cubeMakers = [
    (i) => { const l=6+i%6,w=3+i%4,h=2+i%5, ans=(l+w+h)*4; return ["棱长总和", `长方体长${l}cm、宽${w}cm、高${h}cm，棱长总和是多少？`, [`${ans}cm`, `${l*w*h}cm`, `${2*(l+w+h)}cm`, `${l+w+h}cm`], `${ans}cm`, `长方体棱长总和=(长+宽+高)×4=(${l}+${w}+${h})×4=${ans}cm。`, "容易只算长+宽+高，忘记每种棱各有4条。"]; },
    (i) => { const l=5+i%5,w=4+i%4,h=3+i%3, ans=2*(l*w+l*h+w*h); return ["表面积", `长方体长${l}cm、宽${w}cm、高${h}cm，表面积是多少？`, [`${ans}cm²`, `${l*w*h}cm²`, `${l*w+l*h+w*h}cm²`, `${ans+20}cm²`], `${ans}cm²`, `表面积=2×(${l}×${w}+${l}×${h}+${w}×${h})=${ans}cm²。`, "容易漏算相对的另一个面。"]; },
    (i) => { const a=3+i%6, ans=a*a*a; return ["体积", `正方体棱长${a}cm，体积是多少？`, [`${a*a}cm³`, `${ans}cm³`, `${6*a*a}cm³`, `${12*a}cm³`], `${ans}cm³`, `正方体体积=棱长×棱长×棱长=${a}×${a}×${a}=${ans}cm³。`, "容易把表面积公式当成体积公式。"]; },
    (i) => { const l=4+i%5,w=3+i%3,h=2+i%4, ans=l*w*h; return ["容积", `长方体水箱内部长${l}dm、宽${w}dm、高${h}dm，最多能装多少升水？`, [`${ans}L`, `${ans*10}L`, `${l+w+h}L`, `${2*(l*w+l*h+w*h)}L`], `${ans}L`, `容积=${l}×${w}×${h}=${ans}dm³=${ans}L。`, "容易忘记1dm³=1L。"]; },
    (i) => { const v=[0.08,0.36,1.2,2.5,4.8][i%5]; const ans=v*1000; return ["单位换算", `${v}m³等于多少dm³？`, [`${ans}dm³`, `${ans/10}dm³`, `${ans*10}dm³`, `${v*100}dm³`], `${ans}dm³`, `1m³=1000dm³，所以${v}m³=${ans}dm³。`, "容易把进率1000记成100。"]; },
    (i) => ["展开图", `正方体展开图一定由几个正方形组成？`, ["4个", "5个", "6个", "8个"], "6个", "正方体有6个面，展开后就是6个正方形。", "容易认为任意6个正方形都能折成正方体。"],
    (i) => { const n=3+i%4, ans=8; const none=(n-2)**3; return ["涂色小正方体", `棱长${n}的大正方体表面涂色后切成棱长1的小正方体，三面涂色的有几个？`, [`${ans}个`, `${none}个`, `${6*(n-2)}个`, `${n*n}个`], `${ans}个`, "三面涂色的小正方体在8个顶点处，所以总是8个。", "容易把棱上的两面涂色也算进去。"]; },
    (i) => { const l=8+i%5,w=5+i%4,h=3+i%3, ans=2*(l*h+w*h); return ["生活应用题", `粉刷长${l}m、宽${w}m、高${h}m的教室四壁，不刷地面和天花板，面积是多少？`, [`${ans}m²`, `${l*w*h}m²`, `${2*(l*w+l*h+w*h)}m²`, `${l*w}m²`], `${ans}m²`, `四壁面积=2×(${l}×${h}+${w}×${h})=${ans}m²。`, "容易把地面和天花板也算进去。"]; }
  ];

  const fractionMakers = [
    (i) => { const d=5+i%8,n=1+i%(d-1); return ["分数意义", `把单位“1”平均分成${d}份，取其中${n}份，用分数表示是？`, [`${n}/${d}`, `${d}/${n}`, `${n}/${d+1}`, `${d-n}/${d}`], `${n}/${d}`, "平均分成的份数作分母，取的份数作分子。", "容易把分子和分母写反。"]; },
    (i) => { const d=8+i%9,n=2+i%5; const a=n*3,b=d*3, f=frac(a,b); return ["约分", `${a}/${b}约成最简分数是？`, [f, `${a}/${b}`, `${n}/${b}`, `${a}/${d}`], f, `分子分母同时除以最大公因数，${a}/${b}=${f}。`, "容易只除分子或只除分母。"]; },
    (i) => { const a=2+i%5,b=3+i%6, c=lcm(a,b); return ["通分", `给1/${a}和1/${b}通分，最小公分母是多少？`, [`${c}`, `${a+b}`, `${a*b+1}`, `${gcd(a,b)}`], `${c}`, `最小公分母就是${a}和${b}的最小公倍数${c}。`, "容易直接把两个分母相加。"]; },
    (i) => { const a=2+i%5,b=5+i%7,c=3+i%5,d=6+i%7; const left=a/b,right=c/d; const ans=left>right?`${a}/${b}`:`${c}/${d}`; return ["比大小", `${a}/${b}和${c}/${d}哪个大？`, [`${a}/${b}`, `${c}/${d}`, "一样大", "无法比较"], ans, "可以通分或化成小数比较，较大的分数是正确答案。", "容易只看分子大小，不看整体分数。"]; },
    (i) => { const d=3+i%6,n=d*(2+i%3)+(1+i%(d-1)); return ["假分数带分数", `${n}/${d}化成带分数是？`, [mixed(n,d), `${n-d}/${d}`, `${Math.floor(n/d)}/${d}`, `${n}/${d}`], mixed(n,d), `${n}÷${d}，商是整数部分，余数作分子。`, "容易把余数写成分母。"]; },
    (i) => { const d=6+i%7,a=1+i%3,b=2+i%3; const ans=frac(a+b,d); return ["分数加减法", `${a}/${d}+${b}/${d}等于？`, [ans, `${a+b}/${d*2}`, `${a*b}/${d}`, `${a}/${d}`], ans, "同分母分数相加，分母不变，分子相加，最后能约分要约分。", "容易把分母也相加。"]; },
    (i) => { const d=7+i%6,n=2+i%4; const m=2+i%3; return ["分数基本性质", `${n}/${d}的分子分母同时乘${m}后是？`, [`${n*m}/${d*m}`, `${n+m}/${d+m}`, `${n*m}/${d}`, `${n}/${d*m}`], `${n*m}/${d*m}`, "分子分母同时乘同一个非零数，分数大小不变。", "容易只乘分子。"]; },
    (i) => { const d=8+i%8,n=1+i%(d-1); return ["分数单位", `${n}/${d}里面有几个1/${d}？`, [`${n}个`, `${d}个`, `${d-n}个`, "1个"], `${n}个`, `${n}/${d}表示${n}个1/${d}。`, "容易把分母当作分数单位的个数。"]; }
  ];

  const motionMakers = [
    (i) => { const step=1+i%6; return ["平移", `图形向右平移${step}格，图形上每个点向右移动几格？`, [`${step}格`, "1格", `${step+1}格`, `${step*2}格`], `${step}格`, "平移时所有对应点移动方向和距离都相同。", "容易只看某一个顶点。"]; },
    (i) => { const k=[1,2,3,4,6][i%5], ans=k*30; return ["旋转", `钟面分针从12走到${k}，顺时针旋转了多少度？`, [`${ans}°`, `${ans/2}°`, "180°", "360°"], `${ans}°`, `钟面每大格30°，走${k}格就是${ans}°。`, "容易把一大格看成10°。"]; },
    (i) => ["轴对称", `补全轴对称图形时，对应点到对称轴的距离应怎样？`, ["相等", "左边更远", "右边更远", "没有关系"], "相等", "轴对称图形的对应点到对称轴距离相等。", "容易只看形状，不数距离。"],
    (i) => ["旋转中心", `图形旋转时固定不动的点叫做什么？`, ["顶点", "旋转中心", "边长", "对称轴"], "旋转中心", "旋转是围绕一个固定点转动，这个点叫旋转中心。", "容易把旋转中心和对称轴混淆。"],
    (i) => ["运动判断", `推拉抽屉主要属于哪种运动？`, ["平移", "旋转", "轴对称", "放大"], "平移", "抽屉整体沿直线移动，形状和方向不变。", "容易把生活动作都看成旋转。"]
  ];

  const addMakers = [
    (i) => { const d=7+i%8,a=1+i%3,b=2+i%4; const ans=frac(a+b,d); return ["同分母加法", `${a}/${d}+${b}/${d}=?`, [ans, `${a+b}/${d*2}`, `${a*b}/${d}`, `${a}/${d}`], ans, "同分母分数相加，分母不变，分子相加。", "容易把分母也相加。"]; },
    (i) => { const d=8+i%7,a=5+i%4,b=1+i%3; const ans=frac(a-b,d); return ["同分母减法", `${a}/${d}-${b}/${d}=?`, [ans, `${a-b}/${d*2}`, `${a+b}/${d}`, `${b}/${d}`], ans, "同分母分数相减，分母不变，分子相减。", "容易用大分母减小分母。"]; },
    (i) => { const a=2+i%4,b=3+i%5; const ans=frac(1*b+1*a,a*b); return ["异分母加法", `1/${a}+1/${b}=?`, [ans, `2/${a+b}`, `1/${a+b}`, `${a+b}/${a*b}`], ans, "异分母先通分，再相加。", "容易直接分母相加。"]; },
    (i) => { const a=2+i%4,b=4+i%5; const ans=frac(b-a,a*b); return ["异分母减法", `1/${a}-1/${b}=?`, [ans, `0`, `1/${a-b || 1}`, `${b-a}/${a+b}`], ans, "异分母先通分，再相减。", "容易没有统一分数单位就计算。"]; },
    (i) => { const d=5+i%6; return ["单位1", `1-${2}/${d}=?`, [frac(d-2,d), `${2}/${d}`, `${d-2}/${d+1}`, `${d}/${d}`], frac(d-2,d), `把1看成${d}/${d}，再减去2/${d}。`, "容易忘记把1化成同分母分数。"]; },
    (i) => { const d=4+i%5,a=1+i%2,b=2+i%2; const ans=mixed((2*d+a)+(1*d+b),d); return ["带分数加法", `2又${a}/${d}+1又${b}/${d}=?`, [ans, `3又${a+b}/${d}`, `2又${a+b}/${d}`, `4又1/${d}`], ans, "整数部分和分数部分分别相加，满1要进位。", "容易忘记分数部分满1要进位。"]; }
  ];

  const chartMakers = [
    (i) => { const a=20+i%12,b=a+3+i%5; return ["读数比较", `折线统计图中周一是${a}，周二是${b}，周二比周一增加多少？`, [`${b-a}`, `${b}`, `${a}`, `${a+b}`], `${b-a}`, `增加量=${b}-${a}=${b-a}。`, "容易把周二的数值当成增加量。"]; },
    (i) => ["变化趋势", `折线从左到右持续向上，表示数据整体怎样？`, ["增加", "减少", "不变", "无法判断"], "增加", "折线向上说明后一个数据比前一个数据大。", "容易只看某一个点，不看整体趋势。"],
    (i) => { const nums=[12+i,18+i,15+i,22+i]; return ["最高点", `数据${nums.join("、")}中，折线统计图最高点对应多少？`, [`${Math.max(...nums)}`, `${Math.min(...nums)}`, `${nums[1]}`, `${nums[2]}`], `${Math.max(...nums)}`, "最高点对应这组数据中的最大值。", "容易把最后一个点当最高点。"]; },
    (i) => { const total=40+i*2; return ["平均数", `四天用水量合计${total}吨，平均每天多少吨？`, [`${total/4}吨`, `${total/2}吨`, `${total}吨`, `${total-4}吨`], `${total/4}吨`, `平均数=总量÷天数=${total}÷4=${total/4}吨。`, "容易只看最大值，不计算平均数。"]; },
    (i) => ["复式折线", `比较两个班一周跳绳成绩变化，最适合用什么统计图？`, ["单式条形统计图", "复式折线统计图", "扇形统计图", "象形统计图"], "复式折线统计图", "复式折线统计图适合比较两组数据随时间变化的趋势。", "容易只画一条折线，无法比较两组数据。"]
  ];

  function fill(chapterId, target, makers) {
    for (let i = 0; i < target; i += 1) {
      const d = difficulties[Math.floor(i / makers.length) % difficulties.length];
      const [kp, q, opts, ans, exp, mistake] = makers[i % makers.length](i);
      add(chapterId, d, kp, withScene(q, i), opts, ans, exp, mistake, cheer(d));
    }
  }

  fill("view", targets.view, viewMakers);
  fill("factor", targets.factor, factorMakers);
  fill("cube", targets.cube, cubeMakers);
  fill("fraction", targets.fraction, fractionMakers);
  fill("motion", targets.motion, motionMakers);
  fill("fraction-add", targets["fraction-add"], addMakers);
  fill("line-chart", targets["line-chart"], chartMakers);

  window.V5_QUESTION_BANK = bank;
})();
