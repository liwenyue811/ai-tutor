const DATA_KEY = "freeAiTutorV3Data";
const BANK_KEY = "freeAiTutorV3QuestionBank";
const BANK_VERSION_KEY = "freeAiTutorV3QuestionBankVersion";
const BANK_VERSION = "math-bank-v5-dedupe";
const OLD_DATA_KEY = "freeAiTutorV2Data";
const DIFFICULTIES = ["基础题", "提高题", "易错题"];

const LEVELS = [
  { level: 1, name: "青铜学员", points: 0 },
  { level: 2, name: "白银学员", points: 500 },
  { level: 3, name: "黄金学员", points: 1500 },
  { level: 4, name: "铂金学员", points: 3000 },
  { level: 5, name: "学霸大师", points: 5000 }
];

const ACHIEVEMENTS = [
  { id: "streak-3", title: "连续学习3天", type: "streak", target: 3 },
  { id: "streak-7", title: "连续学习7天", type: "streak", target: 7 },
  { id: "streak-30", title: "连续学习30天", type: "streak", target: 30 },
  { id: "correct-50", title: "答对50题", type: "correct", target: 50 },
  { id: "correct-100", title: "答对100题", type: "correct", target: 100 },
  { id: "correct-500", title: "答对500题", type: "correct", target: 500 },
  { id: "correct-1000", title: "答对1000题", type: "correct", target: 1000 },
  { id: "points-500", title: "积分达到500", type: "points", target: 500 },
  { id: "points-2000", title: "积分达到2000", type: "points", target: 2000 },
  { id: "points-5000", title: "积分达到5000", type: "points", target: 5000 },
  { id: "master-view", title: "观察物体达人", type: "chapter", chapterId: "view", target: 50 },
  { id: "master-factor", title: "因数与倍数达人", type: "chapter", chapterId: "factor", target: 50 },
  { id: "master-cube", title: "长方体达人", type: "chapter", chapterId: "cube", target: 50 },
  { id: "master-fraction", title: "分数达人", type: "chapter", chapterId: "fraction", target: 50 }
];

const chapters = [
  { id: "view", name: "观察物体", desc: "从不同方向观察几何体，判断看到的形状。" },
  { id: "factor", name: "因数与倍数", desc: "认识因数、倍数、质数、合数、公因数和公倍数。" },
  { id: "cube", name: "长方体和正方体", desc: "学习表面积、体积、棱长和单位换算。" },
  { id: "fraction", name: "分数的意义和性质", desc: "理解分数意义、分数基本性质、约分和通分。" },
  { id: "motion", name: "图形的运动", desc: "认识平移、旋转和轴对称图形。" },
  { id: "fraction-add", name: "分数加减法", desc: "掌握同分母、异分母分数加减和混合运算。" },
  { id: "line-chart", name: "折线统计图", desc: "读懂折线统计图，分析变化趋势。" }
];

const defaultData = {
  totalAnswered: 0,
  totalCorrect: 0,
  points: 0,
  lastStudyTime: "",
  lastSignDate: "",
  streak: 0,
  wrongBook: [],
  chapterStats: {},
  achievements: {},
  studyLogs: {}
};

const appData = loadData();
let questionBank = loadQuestionBank();
let selectedChapterId = chapters[0].id;
let selectedDifficulty = DIFFICULTIES[0];
let currentQuestions = [];
let currentSubmitted = false;
let wrongOnlyMode = false;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const dom = {
  chapterHome: $("#chapterHome"),
  chapterGrid: $("#chapterGrid"),
  quizPanel: $("#quizPanel"),
  quizForm: $("#quizForm"),
  submitBtn: $("#submitBtn"),
  newQuizBtn: $("#newQuizBtn"),
  homeBtn: $("#homeBtn"),
  reportBtn: $("#reportBtn"),
  backHomeFromReportBtn: $("#backHomeFromReportBtn"),
  exportPdfBtn: $("#exportPdfBtn"),
  exportExcelBtn: $("#exportExcelBtn"),
  signBtn: $("#signBtn"),
  clearWrongBtn: $("#clearWrongBtn"),
  scoreText: $("#scoreText"),
  totalAnswered: $("#totalAnswered"),
  accuracyRate: $("#accuracyRate"),
  pointsText: $("#pointsText"),
  streakText: $("#streakText"),
  lastStudyTime: $("#lastStudyTime"),
  resultBox: $("#resultBox"),
  wrongBookList: $("#wrongBookList"),
  wrongCount: $("#wrongCount"),
  quizTitle: $("#quizTitle"),
  quizTip: $("#quizTip"),
  chapterBreadcrumb: $("#chapterBreadcrumb"),
  chapterRecordList: $("#chapterRecordList"),
  questionForm: $("#questionForm"),
  editQuestionId: $("#editQuestionId"),
  editChapter: $("#editChapter"),
  editDifficulty: $("#editDifficulty"),
  editTitle: $("#editTitle"),
  editOptions: $("#editOptions"),
  editAnswer: $("#editAnswer"),
  editKnowledge: $("#editKnowledge"),
  editExplanation: $("#editExplanation"),
  editCommonMistake: $("#editCommonMistake"),
  editEncouragement: $("#editEncouragement"),
  filterChapter: $("#filterChapter"),
  filterDifficulty: $("#filterDifficulty"),
  questionManageList: $("#questionManageList"),
  importFile: $("#importFile"),
  exportJsonBtn: $("#exportJsonBtn"),
  exportCsvBtn: $("#exportCsvBtn"),
  resetQuestionBtn: $("#resetQuestionBtn"),
  resetBankBtn: $("#resetBankBtn"),
  manageMessage: $("#manageMessage"),
  levelName: $("#levelName"),
  nextLevelText: $("#nextLevelText"),
  levelProgressBar: $("#levelProgressBar"),
  levelScale: $("#levelScale"),
  achievementSummary: $("#achievementSummary"),
  achievementList: $("#achievementList"),
  studyReport: $("#studyReport"),
  reportPage: $("#reportPage"),
  chapterAnalysis: $("#chapterAnalysis"),
  knowledgeTopList: $("#knowledgeTopList"),
  trendCharts: $("#trendCharts"),
  parentAdvice: $("#parentAdvice")
};

init();

function init() {
  ensureChapterStats();
  renderSelects();
  if (dom.chapterGrid) renderChapterHome();
  if (dom.totalAnswered) renderStats();
  if (dom.levelName) renderLevel();
  if (dom.chapterRecordList) renderChapterRecords();
  if (dom.achievementList) renderAchievements();
  if (dom.studyReport) renderStudyReport();
  if (dom.wrongBookList) renderWrongBook();
  if (dom.questionManageList) renderQuestionManager();
  renderWeakRecommendation();
  if (dom.signBtn) updateSignButton();

  if (dom.submitBtn) dom.submitBtn.addEventListener("click", gradeQuiz);
  if (dom.newQuizBtn) dom.newQuizBtn.addEventListener("click", createNewQuiz);
  if (dom.homeBtn) dom.homeBtn.addEventListener("click", showHome);
  if (dom.reportBtn) dom.reportBtn.addEventListener("click", showReportPage);
  if (dom.backHomeFromReportBtn) dom.backHomeFromReportBtn.addEventListener("click", showHome);
  if (dom.exportPdfBtn) dom.exportPdfBtn.addEventListener("click", exportReportPdf);
  if (dom.exportExcelBtn) dom.exportExcelBtn.addEventListener("click", exportStudyExcel);
  if (dom.signBtn) dom.signBtn.addEventListener("click", signToday);
  if (dom.clearWrongBtn) dom.clearWrongBtn.addEventListener("click", clearWrongBook);
  if (dom.questionForm) dom.questionForm.addEventListener("submit", saveQuestionFromForm);
  if (dom.resetQuestionBtn) dom.resetQuestionBtn.addEventListener("click", resetQuestionForm);
  if (dom.resetBankBtn) dom.resetBankBtn.addEventListener("click", resetDefaultBank);
  if (dom.filterChapter) dom.filterChapter.addEventListener("change", renderQuestionManager);
  if (dom.filterDifficulty) dom.filterDifficulty.addEventListener("change", renderQuestionManager);
  if (dom.importFile) dom.importFile.addEventListener("change", importQuestionFile);
  if (dom.exportJsonBtn) dom.exportJsonBtn.addEventListener("click", exportQuestionJson);
  if (dom.exportCsvBtn) dom.exportCsvBtn.addEventListener("click", exportQuestionCsv);
  const weakBtn = $("#weakPracticeBtn");
  if (weakBtn) weakBtn.addEventListener("click", startWeakChapterPractice);
  const wrongOnlyBtn = $("#wrongOnlyBtn");
  if (wrongOnlyBtn) wrongOnlyBtn.addEventListener("click", () => startWrongOnlyPractice());

  $$(".difficulty-btn").forEach((button) => {
    button.addEventListener("click", () => {
      selectedDifficulty = button.dataset.difficulty;
      wrongOnlyMode = false;
      $$(".difficulty-btn").forEach((item) => item.classList.toggle("active", item === button));
      createNewQuiz();
    });
  });
}

function renderSelects() {
  const chapterOptions = chapters.map((chapter) => `<option value="${chapter.id}">${chapter.name}</option>`).join("");
  if (dom.editChapter) dom.editChapter.innerHTML = chapterOptions;
  if (dom.filterChapter) dom.filterChapter.innerHTML = `<option value="all">全部章节</option>${chapterOptions}`;
  const difficultyOptions = DIFFICULTIES.map((item) => `<option value="${item}">${item}</option>`).join("");
  if (dom.editDifficulty) dom.editDifficulty.innerHTML = difficultyOptions;
  if (dom.filterDifficulty) dom.filterDifficulty.innerHTML = `<option value="all">全部难度</option>${difficultyOptions}`;
}

function showHome() {
  setReportMode(false);
  if (dom.chapterHome) dom.chapterHome.classList.remove("hidden");
  if (dom.quizPanel) dom.quizPanel.classList.add("hidden");
  if (dom.scoreText) dom.scoreText.textContent = "未提交";
}

function showReportPage() {
  renderStudyReport();
  setReportMode(true);
  if (dom.reportPage) dom.reportPage.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setReportMode(isReport) {
  const pageSections = [
    dom.chapterHome,
    dom.quizPanel,
    document.querySelector("[aria-labelledby='recommendTitle']"),
    document.querySelector("[aria-labelledby='wrongTitle']"),
    document.querySelector("[aria-labelledby='recordTitle']"),
    document.querySelector("[aria-labelledby='achievementTitle']")
  ];
  pageSections.forEach((section) => {
    if (section) section.classList.toggle("hidden", isReport);
  });
  if (dom.reportPage) dom.reportPage.classList.toggle("hidden", !isReport);
}

function openChapter(chapterId) {
  selectedChapterId = chapterId;
  selectedDifficulty = DIFFICULTIES[0];
  wrongOnlyMode = false;
  $$(".difficulty-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.difficulty === selectedDifficulty);
  });
  dom.chapterHome.classList.add("hidden");
  dom.quizPanel.classList.remove("hidden");
  createNewQuiz();
  dom.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function startWrongOnlyPractice(chapterId = selectedChapterId) {
  const targetChapter = chapterId || selectedChapterId;
  const hasWrong = getValidWrongBook().some((item) => item.chapterId === targetChapter);
  if (!hasWrong) {
    window.alert("这个章节暂时没有错题。");
    return;
  }
  selectedChapterId = targetChapter;
  wrongOnlyMode = true;
  if (dom.chapterHome) dom.chapterHome.classList.add("hidden");
  if (dom.quizPanel) dom.quizPanel.classList.remove("hidden");
  createNewQuiz();
  if (dom.quizPanel) dom.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function startWeakChapterPractice() {
  const weak = getWeakChapter();
  if (!weak) {
    window.alert("暂时没有明显薄弱章节，继续保持练习。");
    return;
  }
  openChapter(weak.id);
}

function getWeakChapter() {
  const studied = chapters.map((chapter) => {
    const stats = getChapterStats(chapter.id);
    const accuracy = stats.answered ? Math.round((stats.correct / stats.answered) * 100) : 100;
    const wrongTotal = countWrongByChapter(chapter.id);
    return { ...chapter, answered: stats.answered, accuracy, wrongTotal };
  }).filter((chapter) => chapter.answered > 0 || chapter.wrongTotal > 0);
  return studied.sort((a, b) => a.accuracy - b.accuracy || b.wrongTotal - a.wrongTotal)[0] || null;
}

function renderWeakRecommendation() {
  const box = $("#weakRecommendation");
  if (!box) return;
  const weak = getWeakChapter();
  if (!weak) {
    box.textContent = "完成几次练习后，我会自动推荐需要加强的章节。";
    return;
  }
  box.innerHTML = `推荐练习：<strong>${escapeHTML(weak.name)}</strong>，当前正确率 ${weak.accuracy}%，错题 ${weak.wrongTotal} 道。`;
}

function createNewQuiz() {
  const chapter = getChapter(selectedChapterId);
  const wrongIds = new Set(getValidWrongBook().map((item) => item.id));
  const pool = questionBank.filter((question) => {
    const chapterOk = question.chapterId === selectedChapterId;
    const difficultyOk = wrongOnlyMode || question.difficulty === selectedDifficulty;
    const wrongOk = !wrongOnlyMode || wrongIds.has(question.id);
    return chapterOk && difficultyOk && wrongOk;
  });
  currentQuestions = pickDiverseQuestions(pool, 10);
  currentSubmitted = false;
  dom.scoreText.textContent = "未提交";
  dom.resultBox.classList.add("hidden");
  dom.resultBox.textContent = "";
  dom.submitBtn.disabled = !currentQuestions.length;
  dom.quizTitle.textContent = wrongOnlyMode ? `${chapter.name} · 只练错题` : `${chapter.name} · ${selectedDifficulty}`;
  dom.chapterBreadcrumb.textContent = `章节题库 / ${chapter.name}`;
  dom.quizTip.textContent = wrongOnlyMode
    ? `本章节错题共 ${pool.length} 道，本次随机显示 ${currentQuestions.length} 道。答对错题后会自动移出错题本。`
    : `本章节 ${selectedDifficulty} 共 ${pool.length} 道，本次随机显示 ${currentQuestions.length} 道。答对 1 题获得 10 积分。`;
  renderQuestions();
}

function renderChapterHome() {
  dom.chapterGrid.innerHTML = chapters.map((chapter, index) => {
    const stats = getChapterStats(chapter.id);
    const wrongTotal = countWrongByChapter(chapter.id);
    const accuracy = stats.answered ? Math.round((stats.correct / stats.answered) * 100) : 0;
    const total = questionBank.filter((item) => item.chapterId === chapter.id).length;
    return `
      <button class="chapter-card ${stats.answered && accuracy < 60 ? "low-accuracy" : ""}" type="button" data-chapter="${chapter.id}">
        <h3>${index + 1}. ${escapeHTML(chapter.name)}</h3>
        <p>${escapeHTML(chapter.desc)}</p>
        <div class="chapter-mini-stats">
          <span class="pill">题目 ${total}</span>
          <span class="pill">做题 ${stats.answered}</span>
          <span class="pill">正确率 ${accuracy}%</span>
          <span class="pill">错题 ${wrongTotal}</span>
        </div>
      </button>
    `;
  }).join("");
  $$(".chapter-card").forEach((card) => {
    card.addEventListener("click", () => openChapter(card.dataset.chapter));
  });
}

function renderQuestions() {
  if (!currentQuestions.length) {
    dom.quizForm.innerHTML = `<div class="empty-state">这个分类暂时没有题目。可以在题目录入系统中新增题目。</div>`;
    return;
  }
  dom.quizForm.innerHTML = currentQuestions.map((question, questionIndex) => {
    const optionHTML = question.options.map((option, optionIndex) => `
      <label class="option">
        <input type="radio" name="question-${questionIndex}" value="${escapeHTML(option)}">
        <span>${String.fromCharCode(65 + optionIndex)}. ${escapeHTML(option)}</span>
      </label>
    `).join("");
    return `
      <article class="question-card" data-id="${question.id}">
        <span class="topic">${escapeHTML(question.chapter)} · ${escapeHTML(question.difficulty)} · ${escapeHTML(question.knowledgePoint)}</span>
        <h3 class="question-title">${questionIndex + 1}. ${escapeHTML(question.title)}</h3>
        <div class="options">${optionHTML}</div>
        <div class="question-actions">
          <button class="secondary-btn ai-explain-btn" data-id="${escapeHTML(question.id)}" data-teacher-mode="${currentSubmitted ? "full" : "hint"}" type="button">${currentSubmitted ? "AI老师讲解" : "学习提示"}</button>
          <button class="secondary-btn same-type-btn" data-id="${escapeHTML(question.id)}" type="button">再来一道同类型题</button>
        </div>
        <p class="answer-mark"></p>
        <div class="analysis ai-teacher">
          <h4>🤖 AI老师讲解</h4>
          <p><strong>知识点：</strong>${escapeHTML(question.knowledgePoint)}</p>
          <p><strong>详细步骤：</strong>${escapeHTML(question.explanation)}</p>
          <p><strong>常见错误：</strong>${escapeHTML(question.commonMistake)}</p>
          <p><strong>学习建议：</strong>${escapeHTML(question.encouragement)}</p>
        </div>
      </article>
    `;
  }).join("");
  bindQuestionActionButtons(dom.quizForm, currentQuestions);
}

function gradeQuiz() {
  if (currentSubmitted || !currentQuestions.length) return;

  let score = 0;
  let correctCount = 0;
  const cards = $$(".question-card");

  cards.forEach((card, index) => {
    const question = currentQuestions[index];
    const selected = card.querySelector("input[type='radio']:checked");
    const mark = card.querySelector(".answer-mark");
    const analysis = card.querySelector(".analysis");
    const studentAnswer = selected ? selected.value : "未作答";
    const isCorrect = selected && selected.value === question.answer;

    card.classList.remove("correct", "wrong");
    mark.className = "answer-mark";
    analysis.classList.add("show");

    if (isCorrect) {
      score += 10;
      correctCount += 1;
      card.classList.add("correct");
      mark.classList.add("good");
      mark.textContent = `答对了，正确答案：${question.answer}，获得 10 积分`;
      removeWrongQuestion(question.id);
    } else {
      card.classList.add("wrong");
      mark.classList.add("bad");
      mark.textContent = `答错了，你的答案：${studentAnswer}；正确答案：${question.answer}`;
      saveWrongQuestion(question, studentAnswer);
    }
  });

  const answeredCount = currentQuestions.length;
  const chapterStats = getChapterStats(selectedChapterId);
  appData.totalAnswered += answeredCount;
  appData.totalCorrect += correctCount;
  appData.points += correctCount * 10;
  appData.lastStudyTime = formatDateTime(new Date());
  chapterStats.answered += answeredCount;
  chapterStats.correct += correctCount;
  recordStudySession({
    answered: answeredCount,
    correct: correctCount,
    points: correctCount * 10,
    minutes: Math.max(1, Math.ceil(answeredCount * 1.5))
  });
  updateAchievements();
  saveData();

  currentSubmitted = true;
  $$(".question-card .ai-explain-btn").forEach((button) => {
    button.textContent = "AI老师讲解";
    button.dataset.teacherMode = "full";
  });
  dom.submitBtn.disabled = true;
  dom.scoreText.textContent = `${score} 分`;
  dom.resultBox.classList.remove("hidden");
  dom.resultBox.textContent = `本次得分：${score} 分。答对 ${correctCount} 道，答错 ${answeredCount - correctCount} 道，获得 ${correctCount * 10} 积分。错题已按章节保存。`;
  rerenderAll();
  dom.resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderStats() {
  if (!dom.totalAnswered) return;
  dom.totalAnswered.textContent = appData.totalAnswered;
  const rate = appData.totalAnswered ? Math.round((appData.totalCorrect / appData.totalAnswered) * 100) : 0;
  dom.accuracyRate.textContent = `${rate}%`;
  dom.pointsText.textContent = appData.points;
  dom.streakText.textContent = `${appData.streak} 天`;
  dom.lastStudyTime.textContent = appData.lastStudyTime || "暂无";
}

function renderLevel() {
  if (!dom.levelName) return;
  const current = getCurrentLevel();
  const next = LEVELS.find((item) => item.points > appData.points);
  const previousPoints = current.points;
  const nextPoints = next ? next.points : current.points;
  const progress = next ? Math.min(100, Math.round(((appData.points - previousPoints) / (nextPoints - previousPoints)) * 100)) : 100;
  dom.levelName.textContent = `Lv${current.level} ${current.name}`;
  dom.nextLevelText.textContent = next ? `距离 Lv${next.level} ${next.name} 还差 ${next.points - appData.points} 积分` : "已达到最高等级";
  if (dom.levelProgressBar) dom.levelProgressBar.style.width = `${progress}%`;
  if (dom.levelScale) {
    dom.levelScale.innerHTML = LEVELS.map((item) => `
      <span class="${appData.points >= item.points ? "active" : ""}">Lv${item.level}<small>${item.points}分</small></span>
    `).join("");
  }
}

function renderAchievements() {
  if (!dom.achievementList) return;
  updateAchievements();
  const achievedCount = ACHIEVEMENTS.filter((item) => appData.achievements[item.id]).length;
  if (dom.achievementSummary) dom.achievementSummary.textContent = `已获得 ${achievedCount} / ${ACHIEVEMENTS.length} 个成就`;
  dom.achievementList.innerHTML = ACHIEVEMENTS.map((item) => {
    const time = appData.achievements[item.id];
    return `
      <article class="achievement-card ${time ? "earned" : ""}">
        <strong>${escapeHTML(item.title)}</strong>
        <span>${time ? "已获得" : "未获得"}</span>
        <small>${time ? `获得时间：${escapeHTML(time)}` : escapeHTML(getAchievementHint(item))}</small>
      </article>
    `;
  }).join("");
}

function renderStudyReport() {
  if (!dom.studyReport) return;
  const today = summarizeLogs(getDateRange("today"));
  const week = summarizeLogs(getDateRange("week"));
  const month = summarizeLogs(getDateRange("month"));
  dom.studyReport.innerHTML = [
    renderReportCard("今日", today, ["answered", "accuracy", "points", "minutes"]),
    renderReportCard("本周", week, ["answered", "accuracy", "points", "streak"]),
    renderReportCard("本月", month, ["answered", "accuracy", "points"])
  ].join("");
  if (dom.chapterAnalysis) dom.chapterAnalysis.innerHTML = renderChapterAnalysis();
  if (dom.knowledgeTopList) dom.knowledgeTopList.innerHTML = renderKnowledgeTopList();
  if (dom.trendCharts) dom.trendCharts.innerHTML = renderTrendCharts();
  if (dom.parentAdvice) dom.parentAdvice.innerHTML = buildParentAdvice(week);
}

function renderReportCard(title, report, fields) {
  const fieldMap = {
    answered: ["做题数量", report.answered],
    accuracy: ["正确率", `${report.accuracy}%`],
    points: ["获得积分", report.points],
    minutes: ["学习时长", `${report.minutes} 分钟`],
    streak: ["连续学习天数", `${appData.streak} 天`]
  };
  return `
    <article class="report-card">
      <h3>${title}</h3>
      ${fields.map((field) => `<div class="report-line"><span>${fieldMap[field][0]}</span><strong>${fieldMap[field][1]}</strong></div>`).join("")}
    </article>
  `;
}

function renderChapterAnalysis() {
  const strongest = getStrongChapter();
  const weakest = getWeakReportChapter();
  return `
    <article class="analysis-card">
      <h3>最强章节</h3>
      <strong>${strongest ? `${escapeHTML(strongest.name)}（${strongest.accuracy}%）` : "暂无数据"}</strong>
      <p>${strongest ? "这部分掌握较好，可以进入提高题保持手感。" : "完成几组练习后会自动分析。"}</p>
    </article>
    <article class="analysis-card weak">
      <h3>最弱章节</h3>
      <strong>${weakest ? `${escapeHTML(weakest.name)}（${weakest.accuracy}%）` : "暂无数据"}</strong>
      <p>${weakest ? "建议优先复习本章节基础概念和易错题。" : "暂时没有薄弱章节记录。"}</p>
    </article>
  `;
}

function renderKnowledgeTopList() {
  const top = getTopWrongKnowledgePoints(5);
  return `
    <article class="knowledge-card">
      <h3>错误最多知识点 TOP5</h3>
      ${top.length ? `<ol>${top.map((item) => `<li><span>${escapeHTML(item.name)}</span><strong>${item.count} 次</strong></li>`).join("")}</ol>` : `<p>暂无错题知识点记录。完成练习后会自动统计。</p>`}
    </article>
  `;
}

function renderTrendCharts() {
  const sevenDays = getRecentDayReports(7);
  const thirtyDays = getRecentDayReports(30);
  return `
    <article class="trend-card">
      <h3>最近7天做题量变化</h3>
      ${renderLineChart(sevenDays.map((item) => item.answered), "做题量")}
    </article>
    <article class="trend-card">
      <h3>最近7天正确率变化</h3>
      ${renderLineChart(sevenDays.map((item) => item.accuracy), "正确率")}
    </article>
    <article class="trend-card">
      <h3>最近30天积分增长变化</h3>
      ${renderLineChart(thirtyDays.map((item) => item.points), "积分")}
    </article>
  `;
}

function renderChapterRecords() {
  if (!dom.chapterRecordList) return;
  dom.chapterRecordList.innerHTML = chapters.map((chapter) => {
    const stats = getChapterStats(chapter.id);
    const accuracy = stats.answered ? Math.round((stats.correct / stats.answered) * 100) : 0;
    const wrongTotal = countWrongByChapter(chapter.id);
    return `
      <article class="record-card ${stats.answered && accuracy < 60 ? "low-accuracy" : ""}">
        <h3>${escapeHTML(chapter.name)}</h3>
        <div class="record-line">
          <div><span>做题数</span><strong>${stats.answered}</strong></div>
          <div><span>正确率</span><strong>${accuracy}%</strong></div>
          <div><span>错题数</span><strong>${wrongTotal}</strong></div>
        </div>
      </article>
    `;
  }).join("");
}

function signToday() {
  const today = getDateKey(new Date());
  if (appData.lastSignDate === today) return;
  const yesterday = getDateKey(addDays(new Date(), -1));
  appData.streak = appData.lastSignDate === yesterday ? appData.streak + 1 : 1;
  appData.lastSignDate = today;
  updateAchievements();
  saveData();
  rerenderAll();
  updateSignButton();
}

function updateSignButton() {
  if (!dom.signBtn) return;
  const signed = appData.lastSignDate === getDateKey(new Date());
  dom.signBtn.disabled = signed;
  dom.signBtn.textContent = signed ? "今日已签到" : "今日签到";
}

function saveWrongQuestion(question, studentAnswer) {
  const record = {
    id: question.id,
    chapterId: question.chapterId,
    chapter: question.chapter,
    difficulty: question.difficulty,
    title: question.title,
    answer: question.answer,
    knowledgePoint: question.knowledgePoint,
    explanation: question.explanation,
    commonMistake: question.commonMistake,
    encouragement: question.encouragement,
    studentAnswer,
    time: formatDateTime(new Date())
  };
  const index = appData.wrongBook.findIndex((item) => item.id === question.id);
  if (index >= 0) appData.wrongBook[index] = record;
  else appData.wrongBook.unshift(record);
  saveData();
}

function removeWrongQuestion(questionId) {
  appData.wrongBook = getValidWrongBook().filter((item) => item.id !== questionId);
  saveData();
}

function renderWrongBook() {
  if (!dom.wrongBookList) return;
  const validWrongBook = getValidWrongBook();
  dom.wrongCount.textContent = validWrongBook.length ? `共 ${validWrongBook.length} 道错题，已按章节分类` : "暂无错题";
  if (!validWrongBook.length) {
    dom.wrongBookList.innerHTML = `<div class="empty-state">错题本还是空的。提交练习后，答错的题会自动保存到对应章节。</div>`;
    return;
  }
  dom.wrongBookList.innerHTML = chapters.map((chapter) => {
    const items = validWrongBook.filter((item) => item.chapterId === chapter.id);
    if (!items.length) return "";
    const cards = items.map((item, index) => `
      <article class="wrong-card">
        <span class="topic">${escapeHTML(item.chapter)} · ${escapeHTML(item.difficulty || "错题")}</span>
        <h3 class="wrong-title">${index + 1}. ${escapeHTML(item.title)}</h3>
        <p><strong>你的答案：</strong>${escapeHTML(item.studentAnswer)}</p>
        <p><strong>正确答案：</strong>${escapeHTML(item.answer)}</p>
        <p><strong>知识点：</strong>${escapeHTML(item.knowledgePoint || "综合练习")}</p>
        <p><strong>详细讲解：</strong>${escapeHTML(item.explanation || item.analysis || "")}</p>
        <p><strong>常见错误：</strong>${escapeHTML(item.commonMistake || "审题不细或计算过程省略。")}</p>
        <p><strong>学习建议：</strong>${escapeHTML(item.encouragement || "认真复盘这道题，下次会更稳。")}</p>
        <p><strong>保存时间：</strong>${escapeHTML(item.time)}</p>
        <div class="question-actions">
          <button class="secondary-btn ai-explain-btn" data-id="${escapeHTML(item.id)}" type="button">AI老师讲解</button>
          <button class="secondary-btn same-type-btn" data-id="${escapeHTML(item.id)}" type="button">再来一道同类型题</button>
          <button class="secondary-btn practice-wrong" data-chapter="${item.chapterId}" type="button">重新练习</button>
        </div>
      </article>
    `).join("");
    return `<div class="wrong-group"><h3 class="wrong-group-title">${escapeHTML(chapter.name)}</h3>${cards}</div>`;
  }).join("");
  $$(".practice-wrong").forEach((button) => {
    button.addEventListener("click", () => startWrongOnlyPractice(button.dataset.chapter));
  });
  bindQuestionActionButtons(dom.wrongBookList, validWrongBook);
}

function bindQuestionActionButtons(root, sourceList) {
  if (!root) return;
  root.querySelectorAll(".ai-explain-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const question = findQuestionForAction(button.dataset.id, sourceList);
      const mode = button.dataset.teacherMode || (root === dom.wrongBookList ? "full" : currentSubmitted ? "full" : "hint");
      if (question) openAiTeacherModal(question, mode);
    });
  });
  root.querySelectorAll(".same-type-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const question = findQuestionForAction(button.dataset.id, sourceList);
      if (question) createSameTypePractice(question);
    });
  });
}

function findQuestionForAction(questionId, sourceList = []) {
  return sourceList.find((item) => item.id === questionId)
    || currentQuestions.find((item) => item.id === questionId)
    || getValidWrongBook().find((item) => item.id === questionId)
    || questionBank.find((item) => item.id === questionId);
}

function openAiTeacherModal(question, mode = "full") {
  const modal = ensureTeacherModal();
  const analysis = question.analysis || question.explanation || "先读题，找出已知条件、问题和关键词。";
  const idea = buildSolvingIdea(question);
  const steps = question.explanation || question.analysis || "根据知识点列式，再逐步计算并检查单位或答案形式。";
  const mistake = question.commonMistake || "容易审题不细，忽略单位、关键词或答案是否需要化简。";
  const tip = question.encouragement || buildStudyTip(question);
  const isHint = mode === "hint";
  modal.querySelector(".teacher-modal-title").textContent = isHint ? "学习提示" : "AI老师讲解";
  modal.querySelector(".teacher-modal-body").innerHTML = isHint ? `
    <div class="teacher-question">
      <span class="topic">${escapeHTML(question.chapter || getChapter(question.chapterId).name)} · ${escapeHTML(question.difficulty || "练习题")} · ${escapeHTML(question.knowledgePoint || "综合练习")}</span>
      <h3>${escapeHTML(question.title || question.question)}</h3>
    </div>
    <div class="teacher-step"><strong>知识点</strong><p>${escapeHTML(question.knowledgePoint || "综合练习")}</p></div>
    <div class="teacher-step"><strong>思考方向</strong><p>${escapeHTML(idea)}</p></div>
    <div class="teacher-step"><strong>解题提示</strong><p>${escapeHTML(buildProblemHint(question))}</p></div>
  ` : `
    <div class="teacher-question">
      <span class="topic">${escapeHTML(question.chapter || getChapter(question.chapterId).name)} · ${escapeHTML(question.difficulty || "练习题")} · ${escapeHTML(question.knowledgePoint || "综合练习")}</span>
      <h3>${escapeHTML(question.title || question.question)}</h3>
      <p><strong>正确答案：</strong>${escapeHTML(question.answer)}</p>
    </div>
    <div class="teacher-step"><strong>题目分析</strong><p>${escapeHTML(analysis)}</p></div>
    <div class="teacher-step"><strong>解题思路</strong><p>${escapeHTML(idea)}</p></div>
    <div class="teacher-step"><strong>详细步骤</strong><p>${escapeHTML(steps)}</p></div>
    <div class="teacher-step"><strong>易错点</strong><p>${escapeHTML(mistake)}</p></div>
    <div class="teacher-step"><strong>学习技巧</strong><p>${escapeHTML(tip)}</p></div>
  `;
  modal.classList.add("show");
  modal.querySelector(".teacher-modal-close").focus();
}

function ensureTeacherModal() {
  let modal = $("#teacherModal");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.id = "teacherModal";
  modal.className = "teacher-modal";
  modal.innerHTML = `
    <div class="teacher-modal-backdrop" data-close="true"></div>
    <section class="teacher-modal-panel" role="dialog" aria-modal="true" aria-labelledby="teacherModalTitle">
      <div class="teacher-modal-head">
        <h2 id="teacherModalTitle" class="teacher-modal-title">AI老师讲解</h2>
        <button class="teacher-modal-close" type="button" aria-label="关闭讲题窗口">×</button>
      </div>
      <div class="teacher-modal-body"></div>
    </section>
  `;
  document.body.appendChild(modal);
  modal.querySelector(".teacher-modal-close").addEventListener("click", closeTeacherModal);
  modal.querySelector(".teacher-modal-backdrop").addEventListener("click", closeTeacherModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeTeacherModal();
  });
  return modal;
}

function closeTeacherModal() {
  const modal = $("#teacherModal");
  if (modal) modal.classList.remove("show");
}

function buildSolvingIdea(question) {
  const point = question.knowledgePoint || "综合练习";
  return `这道题考查“${point}”。先判断题目属于哪一类，再选择对应的方法；如果有单位、分数或倍数关系，要先统一条件，再计算或判断。`;
}

function buildStudyTip(question) {
  const point = question.knowledgePoint || "这个知识点";
  return `练习“${point}”时，建议先圈出关键词，再写出理由。做完后用答案反推一次，能减少粗心错误。`;
}

function buildProblemHint(question) {
  const point = question.knowledgePoint || "";
  if (point.includes("因数")) return "先想“哪些数能整除题目中的数”，可以从 1 和它本身开始成对寻找，不要急着看选项。";
  if (point.includes("倍数")) return "先判断题目问的是某个数的几倍，或是否能被 2、3、5 整除，再用倍数特征快速筛选。";
  if (point.includes("表面积")) return "先分清需要计算几个面，再确认单位是面积单位；遇到无盖、贴墙等情境时要少算相应的面。";
  if (point.includes("体积") || point.includes("容积")) return "先找长、宽、高或棱长，再判断题目问的是占空间大小还是最多能装多少，注意体积单位和容积单位。";
  if (point.includes("分数")) return "先看分母是否相同；如果不同，先想通分或约分，再比较、计算或化简。";
  if (point.includes("观察") || point.includes("三视图")) return "先确定观察方向，再想哪些小正方体会被挡住，避免把看到的平面图直接当成立体数量。";
  if (point.includes("旋转") || point.includes("平移") || point.includes("对称")) return "先判断图形运动类型，再看形状、大小、方向和位置分别有没有变化。";
  if (point.includes("折线") || point.includes("统计")) return "先看横轴、纵轴和单位，再读点的位置与折线升降趋势。";
  return "先圈出题目中的关键词，判断考查的知识点，再列出已知条件和要求的问题。";
}

function createSameTypePractice(question) {
  const currentIds = new Set(currentQuestions.map((item) => item.id));
  const sameTypePool = questionBank.filter((item) => {
    if (item.id === question.id || currentIds.has(item.id)) return false;
    return item.chapterId === question.chapterId && item.knowledgePoint === question.knowledgePoint;
  });
  const fallbackPool = questionBank.filter((item) => {
    if (item.id === question.id || currentIds.has(item.id)) return false;
    return item.chapterId === question.chapterId;
  });
  const next = pickDiverseQuestions(sameTypePool.length ? sameTypePool : fallbackPool, 1)[0];
  if (!next) {
    window.alert("暂时没有可生成的同类型题了，可以先换一组练习。");
    return;
  }
  selectedChapterId = next.chapterId;
  selectedDifficulty = next.difficulty;
  wrongOnlyMode = false;
  currentQuestions = [next];
  currentSubmitted = false;
  if (dom.chapterHome) dom.chapterHome.classList.add("hidden");
  if (dom.quizPanel) dom.quizPanel.classList.remove("hidden");
  if (dom.submitBtn) dom.submitBtn.disabled = false;
  if (dom.scoreText) dom.scoreText.textContent = "未提交";
  if (dom.resultBox) {
    dom.resultBox.classList.add("hidden");
    dom.resultBox.textContent = "";
  }
  const chapter = getChapter(next.chapterId);
  if (dom.quizTitle) dom.quizTitle.textContent = `${chapter.name} · 同类型练习`;
  if (dom.chapterBreadcrumb) dom.chapterBreadcrumb.textContent = `章节题库 / ${chapter.name}`;
  if (dom.quizTip) dom.quizTip.textContent = `已为你生成 1 道“${next.knowledgePoint}”同类型练习题。`;
  $$(".difficulty-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.difficulty === selectedDifficulty);
  });
  renderQuestions();
  if (dom.quizPanel) dom.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearWrongBook() {
  if (!appData.wrongBook.length) return;
  if (!window.confirm("确定要清空错题本吗？")) return;
  appData.wrongBook = [];
  saveData();
  rerenderAll();
}

function saveQuestionFromForm(event) {
  event.preventDefault();
  const chapter = getChapter(dom.editChapter.value);
  const options = dom.editOptions.value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
  const answer = dom.editAnswer.value.trim();

  if (options.length < 2) {
    setManageMessage("请至少输入 2 个选项。");
    return;
  }
  if (!options.includes(answer)) {
    setManageMessage("正确答案必须和某个选项完全一致。");
    return;
  }

  const id = dom.editQuestionId.value || createQuestionId();
  const question = normalizeQuestion({
    id,
    chapterId: chapter.id,
    chapter: chapter.name,
    difficulty: dom.editDifficulty.value,
    title: dom.editTitle.value.trim(),
    options,
    answer,
    explanation: dom.editExplanation.value.trim(),
    analysis: dom.editExplanation.value.trim(),
    knowledgePoint: dom.editKnowledge.value.trim(),
    commonMistake: dom.editCommonMistake.value.trim(),
    encouragement: dom.editEncouragement.value.trim()
  });

  const index = questionBank.findIndex((item) => item.id === id);
  if (index >= 0) questionBank[index] = question;
  else questionBank.unshift(question);

  saveQuestionBank();
  resetQuestionForm();
  setManageMessage("题目已保存。");
  rerenderAll();
  if (dom.quizPanel && !dom.quizPanel.classList.contains("hidden")) createNewQuiz();
}

function resetQuestionForm() {
  if (!dom.questionForm) return;
  dom.questionForm.reset();
  dom.editQuestionId.value = "";
  dom.editChapter.value = selectedChapterId;
  dom.editDifficulty.value = selectedDifficulty;
  $("#saveQuestionBtn").textContent = "保存题目";
}

function renderQuestionManager() {
  if (!dom.questionManageList) return;
  const chapterFilter = dom.filterChapter.value || "all";
  const difficultyFilter = dom.filterDifficulty.value || "all";
  const list = questionBank.filter((question) => {
    const chapterOk = chapterFilter === "all" || question.chapterId === chapterFilter;
    const difficultyOk = difficultyFilter === "all" || question.difficulty === difficultyFilter;
    return chapterOk && difficultyOk;
  });

  if (!list.length) {
    dom.questionManageList.innerHTML = `<div class="empty-state">暂无题目。可以先新增或导入题库。</div>`;
    return;
  }

  dom.questionManageList.innerHTML = list.map((question, index) => `
    <article class="manage-card">
      <div class="manage-meta">
        <span class="pill">${escapeHTML(question.chapter)}</span>
        <span class="pill">${escapeHTML(question.difficulty)}</span>
        <span class="pill">${escapeHTML(question.knowledgePoint)}</span>
        <span class="pill">${index + 1}</span>
      </div>
      <h3>${escapeHTML(question.title)}</h3>
      <p><strong>答案：</strong>${escapeHTML(question.answer)}</p>
      <p><strong>选项：</strong>${escapeHTML(question.options.join(" / "))}</p>
      <div class="manage-actions">
        <button class="secondary-btn edit-question" data-id="${question.id}" type="button">修改</button>
        <button class="danger-btn delete-question" data-id="${question.id}" type="button">删除</button>
      </div>
    </article>
  `).join("");

  $$(".edit-question").forEach((button) => button.addEventListener("click", () => editQuestion(button.dataset.id)));
  $$(".delete-question").forEach((button) => button.addEventListener("click", () => deleteQuestion(button.dataset.id)));
}

function editQuestion(id) {
  const question = questionBank.find((item) => item.id === id);
  if (!question) return;
  dom.editQuestionId.value = question.id;
  dom.editChapter.value = question.chapterId;
  dom.editDifficulty.value = question.difficulty;
  dom.editTitle.value = question.title;
  dom.editOptions.value = question.options.join("\n");
  dom.editAnswer.value = question.answer;
  dom.editKnowledge.value = question.knowledgePoint;
  dom.editExplanation.value = question.explanation;
  dom.editCommonMistake.value = question.commonMistake;
  dom.editEncouragement.value = question.encouragement;
  $("#saveQuestionBtn").textContent = "保存修改";
  dom.questionForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteQuestion(id) {
  if (!window.confirm("确定要删除这道题吗？")) return;
  questionBank = questionBank.filter((item) => item.id !== id);
  removeWrongQuestion(id);
  saveQuestionBank();
  setManageMessage("题目已删除。");
  rerenderAll();
  if (dom.quizPanel && !dom.quizPanel.classList.contains("hidden")) createNewQuiz();
}

function importQuestionFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const text = String(reader.result || "");
      const imported = file.name.toLowerCase().endsWith(".json")
        ? parseJsonQuestions(text)
        : parseCsvQuestions(text);
      if (!imported.length) throw new Error("没有读取到有效题目");
      questionBank = imported.map(normalizeQuestion);
      saveQuestionBank();
      setManageMessage(`已导入 ${questionBank.length} 道题。`);
      rerenderAll();
      if (dom.quizPanel && !dom.quizPanel.classList.contains("hidden")) createNewQuiz();
    } catch (error) {
      setManageMessage(`导入失败：${error.message}`);
    } finally {
      dom.importFile.value = "";
    }
  };
  reader.readAsText(file, "utf-8");
}

function parseJsonQuestions(text) {
  const value = JSON.parse(text);
  return Array.isArray(value) ? value : value.questions || [];
}

function parseCsvQuestions(text) {
  const rows = parseCsv(text).filter((row) => row.some(Boolean));
  if (rows.length < 2) return [];
  const headers = rows[0].map((item) => item.trim());
  return rows.slice(1).map((row) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = row[index] || "";
    });
    const chapter = findChapterByNameOrId(record.章节 || record.chapter || record.chapterId);
    return {
      id: record.id || createQuestionId(),
      chapterId: chapter.id,
      chapter: chapter.name,
      difficulty: record.难度 || record.difficulty || DIFFICULTIES[0],
      knowledgePoint: record.知识点 || record.knowledgePoint || "",
      title: record.题目 || record.title,
      options: String(record.选项 || record.options || "").split("|").map((item) => item.trim()).filter(Boolean),
      answer: record.答案 || record.answer,
      explanation: record.详细讲解 || record.explanation || record.解析 || record.analysis,
      analysis: record.详细讲解 || record.explanation || record.解析 || record.analysis,
      commonMistake: record.常见错误 || record.commonMistake,
      encouragement: record.鼓励语 || record.encouragement
    };
  }).filter((item) => item.title && item.options.length && item.answer && (item.explanation || item.analysis));
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      field += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  row.push(field);
  rows.push(row);
  return rows;
}

function exportQuestionJson() {
  downloadFile("question-bank.json", JSON.stringify({ questions: questionBank }, null, 2), "application/json;charset=utf-8");
}

function exportQuestionCsv() {
  const header = ["章节", "难度", "知识点", "题目", "选项", "答案", "详细讲解", "常见错误", "鼓励语"];
  const rows = questionBank.map((item) => [
    item.chapter,
    item.difficulty,
    item.knowledgePoint,
    item.title,
    item.options.join("|"),
    item.answer,
    item.explanation,
    item.commonMistake,
    item.encouragement
  ]);
  const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
  downloadFile("question-bank.csv", `\ufeff${csv}`, "text/csv;charset=utf-8");
}

function resetDefaultBank() {
  if (!window.confirm("确定要恢复默认题库吗？当前自定义题库会被覆盖。")) return;
  questionBank = buildDefaultQuestionBank();
  saveQuestionBank();
  resetQuestionForm();
  setManageMessage("已恢复默认题库。");
  rerenderAll();
  if (dom.quizPanel && !dom.quizPanel.classList.contains("hidden")) createNewQuiz();
}

function rerenderAll() {
  if (dom.chapterGrid) renderChapterHome();
  if (dom.totalAnswered) renderStats();
  if (dom.levelName) renderLevel();
  if (dom.chapterRecordList) renderChapterRecords();
  if (dom.wrongBookList) renderWrongBook();
  if (dom.achievementList) renderAchievements();
  if (dom.studyReport) renderStudyReport();
  if (dom.questionManageList) renderQuestionManager();
  renderWeakRecommendation();
}

function buildDefaultQuestionBank() {
  if (Array.isArray(window.V5_QUESTION_BANK) && window.V5_QUESTION_BANK.length) {
    return dedupeQuestionBank(window.V5_QUESTION_BANK.map(normalizeQuestion));
  }
  return dedupeQuestionBank(getDefaultQuestionRows().trim().split("\n").map((line, index) => {
    const [chapterId, difficulty, knowledgePoint, title, optionsText, answer, explanation] = line.split("\t");
    const chapter = getChapter(chapterId);
    return normalizeQuestion({
      id: `default-${String(index + 1).padStart(3, "0")}`,
      chapterId,
      chapter: chapter.name,
      difficulty,
      knowledgePoint,
      title,
      options: optionsText.split("|"),
      answer,
      explanation,
      analysis: explanation
    });
  }));
}

function getDefaultQuestionRows() {
  return `
view	基础题	三视图	从正面看一个几何体，看到上下两层，上层1个、下层3个，说明至少有几个小正方体？	3个|4个|5个|6个	4个	下层3个位置至少各1个，上层还要在某个位置叠1个，所以至少4个。
view	基础题	正面观察	一个几何体从正面看到“田”字形，最少需要几个小正方体？	2个|3个|4个|5个	4个	正面有4个可见位置，每个位置至少需要1个小正方体。
view	基础题	上面观察	从上面看到4个小正方形排成一行，最少需要几个小正方体？	3个|4个|5个|8个	4个	上面看到的每个位置至少有1个小正方体，所以最少4个。
view	基础题	左面观察	从左面看到2列且高度都是1层，从正面看到3列且高度都是1层，最少需要几个小正方体？	2个|3个|5个|6个	3个	正面有3列，每列1个即可，同时从左面可安排成2列，最少3个。
view	基础题	遮挡关系	两个小正方体前后摆成一列，从正面最多看到几个正方形？	1个|2个|3个|4个	1个	前后重叠时，后面的会被前面的挡住，从正面只看到1个。
view	基础题	观察方向	判断几何体左右是否相同，最适合比较哪两个方向看到的图形？	正面和上面|左面和右面|正面和后面|上面和下面	左面和右面	左右是否相同，要比较左面和右面观察到的图形。
view	基础题	数量判断	从上面看到5个位置，从正面最高2层，这个几何体的小正方体个数至少是？	5个|6个|7个|10个	6个	上面5个位置至少5个；最高2层说明至少有一个位置再叠1个，共6个。
view	基础题	形状辨认	从正面看到一行3个，从左面看到一行1个，这个几何体可能是？	3个排成一排|3个叠成一列|摆成L形|摆成正方形	3个排成一排	正面看到3个，左面只看到1个，说明它们横向排成一排。
view	基础题	方向转换	同一个几何体，从不同方向观察，看到的图形一定怎样？	完全相同|可能不同|一定更大|一定更小	可能不同	观察方向不同，遮挡和投影不同，看到的平面图形可能不同。
view	基础题	最少个数	从正面看到2层，下层2个，上层在左边；从上面看到2个位置，最少几个小正方体？	2个|3个|4个|5个	3个	上面2个位置先各放1个，上层左边还要叠1个，所以最少3个。
view	提高题	三视图推理	从正面看到3列高度分别为1、2、1，从左面看到最高2层，最少需要几个小正方体？	3个|4个|5个|6个	4个	正面三列至少1+2+1=4个，且左面最高2层满足条件。
view	提高题	俯视图推理	从上面看到一个L形共4格，从正面看到3列，最少小正方体个数是？	3个|4个|5个|6个	4个	俯视图4格表示至少4个位置各有1个，正面3列可以由这4个位置满足。
view	提高题	最多可见	用6个小正方体摆成一层，从正面最多能看到几个小正方形？	3个|4个|5个|6个	6个	全部摆成横向一排且不遮挡，正面最多看到6个。
view	提高题	最少可见	用5个小正方体全部前后排成一列，从正面能看到几个小正方形？	1个|2个|4个|5个	1个	前后完全重叠时，从正面只看到最前面的1个。
view	提高题	补成立方体	一个2×2×2的正方体缺少1个角上的小正方体，从上面最多看到几个小正方形？	3个|4个|6个|7个	4个	2×2×2从上面投影仍在2×2范围内，最多看到4个位置。
view	提高题	观察一致	从正面和左面都看到一列2个小正方形，最少需要几个小正方体？	2个|3个|4个|5个	2个	把2个小正方体竖直叠放，正面和左面都看到一列2个。
view	提高题	空间想象	从上面看到2行3列的长方形，从正面看到3列高度都是1，最少需要几个小正方体？	3个|5个|6个|9个	6个	上面有2×3共6个位置，每个位置至少1个，正面高度1层满足。
view	提高题	遮挡推理	从正面看到4个小正方形，但实际用了7个小正方体，原因可能是？	有小正方体被前面遮挡|所有都在一层|从上面看错了|小正方体变小了	有小正方体被前面遮挡	正面看到的是投影，前后重叠会让部分小正方体被遮挡。
view	提高题	组合判断	从上面看到3个位置，从正面最高3层，至少需要几个小正方体？	3个|4个|5个|6个	5个	三个位置先各1个，为出现3层，需要在一个位置再叠2个，共5个。
view	提高题	方向关系	同一几何体从正面看到的宽度，与从上面看到的哪个量有关？	左右长度|前后长度|高度|体积	左右长度	正面图的宽度对应几何体左右方向的长度。
view	易错题	最少与最多	从上面看到4个位置，并不表示几何体一定只有4个小正方体，原因是？	每个位置可能叠多层|小正方体会变形|上面看到的是正面|只能看见一半	每个位置可能叠多层	俯视图只说明占了几个位置，不能确定每个位置有几层。
view	易错题	观察误区	从正面看到2个正方形，实际小正方体个数可能是多少？	只能是2个|可能多于2个|一定少于2个|一定是4个	可能多于2个	前后重叠的小正方体可能被遮挡，所以实际个数可能更多。
view	易错题	方向混淆	从左面看到的图形主要反映哪两个方向？	左右和高度|前后和高度|左右和前后|面积和体积	前后和高度	左面观察时，看到的是前后方向长度和高度。
view	易错题	三视图判断	只知道正面图，能唯一确定几何体吗？	一定能|一定不能|只要有4个就能|只看高度就能	一定不能	同一个正面图可能对应多种前后摆法，所以不能唯一确定。
view	易错题	重叠判断	从上面看到1个正方形，从正面看到3个竖着排列，几何体最少几个小正方体？	1个|2个|3个|4个	3个	上面1个位置说明竖直叠放，正面3层表示有3个小正方体。
view	易错题	平面与立体	观察物体得到的是几何体的什么？	立体模型|平面图形|体积|重量	平面图形	从某方向观察，得到的是这个方向的平面视图。
view	易错题	最多最少	从正面看到3个，从上面看到3个，实际小正方体最少和最多一定相同吗？	一定相同|不一定相同|都等于3|都等于9	不一定相同	不同摆法会导致前后叠放数量不同，最少最多可能不同。
view	易错题	位置关系	从正面看左右相邻的两个正方形，实际一定左右相邻吗？	一定|不一定|一定上下相邻|一定前后相邻	不一定	正面投影相邻，实际可能在不同前后位置。
view	易错题	补图判断	一个图形从正面看到2层，从上面看到1个位置，说明它一定怎样摆？	横着摆|竖着叠|前后摆|摆成L形	竖着叠	上面只有1个位置，正面有2层，说明至少竖直叠放。
view	易错题	读图习惯	解决观察物体题时，第一步最好做什么？	直接猜答案|分清观察方向|只数最高层|只看选项	分清观察方向	方向不同看到的图形不同，先分清方向才能判断。
factor	基础题	找因数	18的因数有几个？	3个|4个|6个|9个	6个	18的因数是1、2、3、6、9、18，共6个。
factor	基础题	找因数	下面哪个数是24的因数？	5|7|8|10	8	24÷8=3，所以8是24的因数。
factor	基础题	找倍数	下面哪个数是9的倍数？	26|36|44|52	36	36÷9=4，所以36是9的倍数。
factor	基础题	倍数概念	一个数的倍数个数是怎样的？	有限的|无限的|只有一个|最多10个	无限的	一个非零自然数可以不断乘1、2、3……所以倍数有无限个。
factor	基础题	因数概念	一个非零自然数最小的因数是？	0|1|它本身|2	1	任何非零自然数都能被1整除，所以最小因数是1。
factor	基础题	质数合数	下面哪个数是质数？	1|9|13|21	13	13只有1和13两个因数，是质数。
factor	基础题	质数合数	下面哪个数是合数？	2|3|17|21	21	21除了1和21，还有3和7等因数，是合数。
factor	基础题	2的倍数	下面哪个数一定是2的倍数？	个位是0的数|个位是3的数|十位是2的数|百位是2的数	个位是0的数	个位是0、2、4、6、8的数都是2的倍数。
factor	基础题	5的倍数	下面哪个数是5的倍数？	42|55|68|73	55	个位是0或5的数是5的倍数。
factor	基础题	3的倍数	判断一个数是不是3的倍数，要看什么？	个位|十位|各位数字和|最高位	各位数字和	各位数字和是3的倍数，这个数就是3的倍数。
factor	提高题	最大公因数	12和18的最大公因数是？	3|6|9|12	6	12和18的公因数有1、2、3、6，最大是6。
factor	提高题	最小公倍数	6和8的最小公倍数是？	12|18|24|48	24	6的倍数有6、12、18、24；8的倍数有8、16、24，最小公倍数是24。
factor	提高题	找因数	36的因数中，既是偶数又大于10的是？	6|9|12|15	12	36的因数有12、18、36等，选项中符合的是12。
factor	提高题	找倍数	50以内7的倍数有几个？	5个|6个|7个|8个	7个	7、14、21、28、35、42、49，共7个。
factor	提高题	质数合数	两个质数的积一定是？	质数|合数|奇数|偶数	合数	两个质数的积至少有1、两个质数和它本身等因数，所以是合数。
factor	提高题	公因数	甲数=2×3×5，乙数=2×3×7，它们的最大公因数是？	2|3|6|30	6	共同的质因数是2和3，乘积为6。
factor	提高题	公倍数	甲数=2×3，乙数=2×5，它们的最小公倍数是？	6|10|15|30	30	取所有出现过的质因数2、3、5，乘积为30。
factor	提高题	倍数特征	一个三位数个位是0，各位数字和是12，这个数一定是哪些数的倍数？	2和5|3和5|2、3、5|只有10	2、3、5	个位0说明是2和5的倍数，数字和12说明是3的倍数。
factor	提高题	奇偶性	两个奇数相加的和一定是？	奇数|偶数|质数|无法判断	偶数	奇数+奇数=偶数。
factor	提高题	质数判断	下面哪个数不是质数？	29|31|39|41	39	39=3×13，所以不是质数。
factor	易错题	特殊数1	1是质数还是合数？	质数|合数|既是质数又是合数|既不是质数也不是合数	既不是质数也不是合数	质数有且只有两个因数，合数至少三个因数；1只有一个因数。
factor	易错题	最大因数	一个数最大的因数和最小的倍数相比怎样？	最大因数大|最小倍数大|相等|无法比较	相等	一个非零自然数最大的因数和最小的倍数都是它本身。
factor	易错题	公因数误区	8和12的公因数有？	1、2、4|1、2、3|2、4、8|1、4、12	1、2、4	8的因数是1、2、4、8；12的因数是1、2、3、4、6、12。
factor	易错题	公倍数误区	4和6的最小公倍数不是24，原因是？	24不是公倍数|12更小且是公倍数|4和6没有公倍数|6比4大	12更小且是公倍数	最小公倍数要求在公倍数中取最小，12已经能同时被4和6整除。
factor	易错题	2的倍数	个位是2的数一定是2的倍数吗？	一定|不一定|只有两位数一定|只有偶数位一定	一定	个位是0、2、4、6、8的数都是2的倍数。
factor	易错题	3的倍数	12345是不是3的倍数？	是|不是|只看个位无法判断|只看首位无法判断	是	1+2+3+4+5=15，15是3的倍数，所以12345是3的倍数。
factor	易错题	5的倍数	一个数是5的倍数，它一定是10的倍数吗？	一定|不一定|一定是2的倍数|一定是3的倍数	不一定	个位是5的数是5的倍数，但不是10的倍数，如15。
factor	易错题	质数误区	所有奇数都是质数吗？	是|不是|只有一位奇数是|大于10的是	不是	9、15、21等奇数都是合数。
factor	易错题	合数误区	所有偶数都是合数吗？	是|不是|只有大于2的偶数是|只有两位偶数是	不是	2是偶数，但2是质数。
factor	易错题	倍数关系	如果A是B的倍数，那么B一定是A的什么？	倍数|因数|质数|合数	因数	A能被B整除时，B就是A的因数。
cube	基础题	棱长总和	长方体长8cm、宽5cm、高3cm，棱长总和是多少？	16cm|32cm|64cm|120cm	64cm	长方体棱长总和=(长+宽+高)×4=(8+5+3)×4=64cm。
cube	基础题	表面积	长方体长6cm、宽4cm、高3cm，表面积是多少？	72cm²|84cm²|108cm²|144cm²	108cm²	表面积=2×(6×4+6×3+4×3)=2×54=108cm²。
cube	基础题	体积	正方体棱长5cm，体积是多少？	25cm³|30cm³|125cm³|150cm³	125cm³	正方体体积=棱长×棱长×棱长=5×5×5=125cm³。
cube	基础题	容积	一个长方体水箱内部长4dm、宽3dm、高2dm，容积是多少？	9L|12L|24L|30L	24L	容积=4×3×2=24dm³，1dm³=1L，所以是24L。
cube	基础题	单位换算	3.6m³等于多少dm³？	36dm³|360dm³|3600dm³|36000dm³	3600dm³	1m³=1000dm³，3.6m³=3600dm³。
cube	基础题	展开图	正方体展开图由几个完全相同的正方形组成？	4个|5个|6个|8个	6个	正方体有6个面，展开图由6个正方形组成。
cube	基础题	涂色小正方体	把棱长2的大正方体切成棱长1的小正方体，共有几个小正方体？	4个|6个|8个|12个	8个	每条棱切成2份，小正方体个数=2×2×2=8。
cube	基础题	生活应用题	做一个无盖长方体鱼缸，需要计算哪几个面的玻璃面积？	1个底面和4个侧面|6个面|只有底面|只有4个侧面	1个底面和4个侧面	无盖鱼缸没有上面，需要底面和四个侧面。
cube	基础题	表面积	正方体棱长4cm，表面积是多少？	16cm²|64cm²|96cm²|128cm²	96cm²	正方体表面积=4×4×6=96cm²。
cube	基础题	体积单位	1L等于多少cm³？	10cm³|100cm³|1000cm³|10000cm³	1000cm³	1L=1dm³=1000cm³。
cube	提高题	棱长总和	长方体棱长总和72cm，长8cm、宽6cm，高是多少？	2cm|4cm|6cm|8cm	4cm	长+宽+高=72÷4=18，高=18-8-6=4cm。
cube	提高题	表面积	把两个棱长3cm的正方体拼成长方体，表面积减少多少？	9cm²|18cm²|27cm²|36cm²	18cm²	拼接后两个接触面不露出，每个面3×3=9cm²，共减少18cm²。
cube	提高题	体积	长方体体积120cm³，长10cm、宽4cm，高是多少？	2cm|3cm|4cm|5cm	3cm	高=体积÷长÷宽=120÷10÷4=3cm。
cube	提高题	容积	水箱长5dm、宽4dm，倒入60L水，水深多少dm？	2dm|3dm|4dm|5dm	3dm	60L=60dm³，水深=60÷(5×4)=3dm。
cube	提高题	单位换算	4800cm³等于多少L？	0.48L|4.8L|48L|480L	4.8L	1000cm³=1L，4800cm³=4.8L。
cube	提高题	展开图	一个正方体展开图中，和中间正方形相邻的最多有几个正方形？	2个|3个|4个|5个	4个	一个正方形最多有上下左右4条边，所以最多相邻4个正方形。
cube	提高题	涂色小正方体	棱长3的大正方体表面涂色后切成27个小正方体，三面涂色的有几个？	4个|6个|8个|12个	8个	三面涂色的小正方体在8个顶点处。
cube	提高题	生活应用题	给长8m、宽5m、高3m的房间四壁刷漆，不刷地面和天花板，面积是多少？	39m²|78m²|120m²|158m²	78m²	四壁面积=2×(8×3+5×3)=78m²。
cube	提高题	切割变化	把长方体切成两个完全相同的小长方体，表面积通常会怎样？	减少|不变|增加|变成0	增加	切开后多出两个切面，所以表面积增加。
cube	提高题	容积比较	甲容器2L，乙容器1800mL，哪个容积大？	甲大|乙大|一样大|无法比较	甲大	2L=2000mL，2000mL>1800mL。
cube	易错题	棱长总和	计算长方体棱长总和时，为什么不能只算长+宽+高？	单位不同|每种棱都有4条|体积要乘3次|表面积要乘6	每种棱都有4条	长方体有4条长、4条宽、4条高，所以要乘4。
cube	易错题	表面积	求长方体表面积时，哪一项容易漏掉？	相对的两个面|长度单位|体积公式|棱长总和	相对的两个面	表面积包括6个面，三组相对面都要算两次。
cube	易错题	体积	正方体棱长扩大到原来的2倍，体积扩大到原来的几倍？	2倍|4倍|6倍|8倍	8倍	体积与棱长的三次方有关，2×2×2=8倍。
cube	易错题	容积	容积一般指什么？	物体表面大小|容器能装多少东西|棱长总和|物体重量	容器能装多少东西	容积表示容器内部所能容纳物体的体积。
cube	易错题	单位换算	0.08m³等于多少L？	8L|80L|800L|8000L	80L	1m³=1000L，0.08m³=80L。
cube	易错题	展开图	正方体展开图任意6个正方形连在一起都可以折成正方体吗？	一定可以|不一定可以|只要面积相等就可以|只要颜色一样就可以	不一定可以	展开图还要满足折叠后6个面位置不重叠。
cube	易错题	涂色小正方体	棱长4的大正方体表面涂色后，完全不涂色的小正方体有几个？	4个|8个|16个|24个	8个	内部不涂色个数=(4-2)³=8。
cube	易错题	生活应用题	求游泳池能装多少水，应该主要用哪个量？	表面积|体积或容积|棱长总和|底面周长	体积或容积	能装多少水是容积问题，用内部长宽高计算。
cube	易错题	表面积与体积	表面积和体积的单位分别是？	cm和cm²|cm²和cm³|cm³和cm²|cm和cm³	cm²和cm³	表面积用平方单位，体积用立方单位。
cube	易错题	单位换算	把cm³换算成dm³，应该怎样？	乘1000|除以1000|乘100|除以100	除以1000	1dm³=1000cm³，所以cm³换成dm³要除以1000。
fraction	基础题	分数意义	把一个蛋糕平均分成8份，取其中3份，用分数表示是？	3/8|5/8|8/3|3/5	3/8	平均分成8份作分母，取3份作分子。
fraction	基础题	分数单位	5/9的分数单位是？	5|9|1/9|5/1	1/9	分母是9，分数单位就是1/9。
fraction	基础题	约分	12/16约成最简分数是？	3/4|4/3|6/8|2/3	3/4	12和16的最大公因数是4，同时除以4得3/4。
fraction	基础题	通分	1/3和1/4通分后，公分母可以是？	7|10|12|24	12	3和4的最小公倍数是12，可以作公分母。
fraction	基础题	比大小	比较2/5和3/5，哪个大？	2/5大|3/5大|一样大|无法比较	3/5大	同分母分数，分子大的分数大。
fraction	基础题	假分数带分数	7/3化成带分数是？	1又1/3|2又1/3|3又1/2|2又2/3	2又1/3	7÷3=2余1，所以是2又1/3。
fraction	基础题	分数加减法	2/9+5/9等于？	7/9|3/9|10/9|7/18	7/9	同分母相加，分母不变，分子相加。
fraction	基础题	分数性质	3/4的分子分母同时乘2，得到？	3/8|6/4|6/8|5/6	6/8	分子分母同时乘2，分数大小不变，得到6/8。
fraction	基础题	真分数	下面哪个是真分数？	5/4|7/7|3/8|9/5	3/8	分子比分母小的分数是真分数。
fraction	基础题	分数减法	7/10-3/10等于？	4/10|10/10|4/20|3/10	4/10	同分母相减，分母不变，分子相减。
fraction	提高题	约分	把45/60约成最简分数是？	3/4|4/5|5/6|9/12	3/4	45和60的最大公因数是15，同时除以15得3/4。
fraction	提高题	通分	比较5/6和7/9，通分后的分母最好用？	15|18|36|54	18	6和9的最小公倍数是18，用18最简便。
fraction	提高题	比大小	5/8和3/5哪个大？	5/8大|3/5大|一样大|无法比较	5/8大	通分为25/40和24/40，所以5/8更大。
fraction	提高题	假分数带分数	3又2/5化成假分数是？	5/17|15/5|17/5|13/5	17/5	整数3化为15/5，再加2/5，得17/5。
fraction	提高题	分数加减法	1/2+1/3等于？	2/5|5/6|1/6|3/6	5/6	通分为3/6+2/6=5/6。
fraction	提高题	分数意义	一根绳子用去全长的3/7，还剩几分之几？	3/7|4/7|1/7|10/7	4/7	单位“1”减去3/7，剩下4/7。
fraction	提高题	约分判断	下面哪个分数已经是最简分数？	6/9|8/12|7/11|15/20	7/11	7和11只有公因数1，所以7/11是最简分数。
fraction	提高题	通分应用	2/3和3/4相加，先通分成？	8/12和9/12|4/6和6/8|2/12和3/12|6/7和7/7	8/12和9/12	3和4的公分母是12，2/3=8/12，3/4=9/12。
fraction	提高题	带分数计算	2又1/4比1又3/4多多少？	1/2|1|1又1/2|2	1/2	2又1/4-1又3/4=9/4-7/4=2/4=1/2。
fraction	提高题	分数性质	如果a/b=2/5，那么a和b同时乘3后分数值怎样？	变大|变小|不变|无法判断	不变	分子分母同时乘同一个非零数，分数大小不变。
fraction	易错题	分数意义	分母表示什么？	取了几份|平均分成几份|分数大小|整数部分	平均分成几份	分母表示把单位“1”平均分成的份数。
fraction	易错题	约分	约分时分子分母应该怎样？	只除分子|只除分母|同时除以公因数|同时加同一个数	同时除以公因数	约分要保持分数大小不变，必须分子分母同时除以公因数。
fraction	易错题	通分	通分会改变分数大小吗？	会|不会|分子变大就会|分母变大就会	不会	通分是利用分数基本性质改变形式，不改变大小。
fraction	易错题	比大小	1/4和1/5哪个大？	1/4大|1/5大|一样大|无法比较	1/4大	同分子分数，分母越小，分数越大。
fraction	易错题	假分数	分子等于分母的分数是？	真分数|假分数|带分数|最简分数	假分数	分子大于或等于分母的分数是假分数。
fraction	易错题	分数加减法	异分母分数相加能直接加分母吗？	能|不能|只加大分母|只加小分母	不能	异分母分数必须先通分，再加减分子。
fraction	易错题	最简分数	10/15不是最简分数，原因是？	分子小|分母大|10和15有公因数5|它是真分数	10和15有公因数5	最简分数要求分子分母只有公因数1。
fraction	易错题	带分数	1又2/3中的1表示什么？	分母|分子|整数部分|分数单位	整数部分	带分数由整数部分和真分数部分组成。
fraction	易错题	分数单位	4/7里面有几个1/7？	1个|3个|4个|7个	4个	4/7表示4个1/7。
fraction	易错题	比大小	7/8和8/9比较，哪个大？	7/8大|8/9大|一样大|无法比较	8/9大	7/8=63/72，8/9=64/72，所以8/9大。
motion	基础题	平移	图形平移后，什么不变？	位置|形状和大小|所在格子编号|到原点距离	形状和大小	平移只改变位置，不改变形状和大小。
motion	基础题	旋转	钟面分针从12走到3，旋转了多少度？	30°|60°|90°|120°	90°	钟面每大格30°，从12到3走3格，3×30°=90°。
motion	基础题	轴对称	下面哪个图形通常有4条对称轴？	长方形|正方形|平行四边形|普通三角形	正方形	正方形有两条对角线和两条中线共4条对称轴。
motion	基础题	旋转中心	图形旋转时，固定不动的点叫做什么？	顶点|旋转中心|边长|轴线	旋转中心	旋转时围绕的固定点叫旋转中心。
motion	基础题	平移距离	方格纸上图形向右平移5格，每个点都向右移动几格？	1格|3格|5格|10格	5格	图形平移时，每个对应点移动的方向和距离相同。
motion	基础题	方向	顺时针旋转是按什么方向？	钟表指针方向|相反方向|向左方向|向上方向	钟表指针方向	顺时针就是与钟表指针转动相同的方向。
motion	基础题	对称轴	圆有多少条对称轴？	1条|2条|4条|无数条	无数条	过圆心的任意直线都是圆的对称轴。
motion	基础题	旋转角	直角对应的旋转角是多少？	45°|60°|90°|180°	90°	直角的度数是90°。
motion	基础题	平移判断	电梯上下运动可以看成什么？	旋转|平移|轴对称|缩小	平移	电梯整体沿竖直方向移动，形状方向不变，是平移。
motion	基础题	轴对称判断	等腰三角形通常有几条对称轴？	0条|1条|2条|3条	1条	一般等腰三角形有一条经过顶角和底边中点的对称轴。
motion	提高题	旋转	一个图形绕点O顺时针旋转90°后，再顺时针旋转90°，共旋转多少？	90°|180°|270°|360°	180°	两次90°相加是180°。
motion	提高题	平移坐标	点A向右平移3格，再向上平移2格，方向变化了吗？	变了|没变|旋转了|变大了	没变	平移只改变位置，不改变方向。
motion	提高题	对称补全	补全轴对称图形时，对应点到对称轴的距离应怎样？	相等|左边更远|右边更远|没有关系	相等	轴对称图形对应点到对称轴的距离相等。
motion	提高题	旋转性质	图形旋转后，下面哪项保持不变？	位置|方向|形状和大小|所在象限	形状和大小	旋转不改变图形的形状和大小。
motion	提高题	组合运动	先向右平移4格，再向左平移4格，结果怎样？	回到原位置|向右8格|向左8格|旋转180°	回到原位置	方向相反、距离相同的两次平移互相抵消。
motion	提高题	旋转方向	从数字3旋转到数字6，顺时针转过多少度？	30°|60°|90°|120°	90°	钟面上3到6相隔3大格，3×30°=90°。
motion	提高题	轴对称	长方形有几条对称轴？	1条|2条|4条|无数条	2条	长方形有经过两组对边中点的两条对称轴。
motion	提高题	图形运动	风车叶片转动主要属于什么运动？	平移|旋转|轴对称|拉伸	旋转	风车叶片绕中心点转动，是旋转。
motion	提高题	对应点	平移后连接对应点的线段通常怎样？	互相垂直|平行且相等|越来越短|没有规律	平行且相等	平移中所有对应点移动方向和距离相同。
motion	提高题	旋转中心	同一个图形绕不同中心旋转，旋转后位置一定相同吗？	一定相同|不一定相同|一定重合|一定变小	不一定相同	旋转中心不同，旋转后的位置可能不同。
motion	易错题	平移误区	图形平移后，大小会改变吗？	会|不会|向右会变大|向左会变小	不会	平移不改变图形大小。
motion	易错题	旋转误区	旋转一定要改变图形的形状吗？	一定|不一定|会变成长方形|会变成圆	不一定	旋转只改变位置和方向，不改变形状。
motion	易错题	轴对称误区	平行四边形一定是轴对称图形吗？	一定|不一定|有4条对称轴|有无数条	不一定	一般平行四边形没有对称轴，特殊的菱形或矩形另说。
motion	易错题	角度	钟面从12到9，逆时针旋转多少度？	90°|180°|270°|360°	90°	从12逆时针到9只经过3大格，即90°。
motion	易错题	对应点	轴对称图形中，对应点连线与对称轴通常怎样？	平行|垂直|重合|无关系	垂直	对应点连线被对称轴垂直平分。
motion	易错题	方向	顺时针旋转90°和逆时针旋转270°效果怎样？	相同|相反|都不动|无法比较	相同	逆时针270°等于顺时针90°。
motion	易错题	运动判断	推拉抽屉属于什么运动？	平移|旋转|翻折|对称	平移	抽屉沿直线移动，方向不变，是平移。
motion	易错题	补图	画轴对称图形时，只看图形大小可以吗？	可以|不可以|只看颜色|只看面积	不可以	还要看对应点到对称轴的距离和方向。
motion	易错题	旋转角	半周旋转是多少度？	90°|180°|270°|360°	180°	一周是360°，半周是180°。
motion	易错题	平移距离	图形向上平移3格，是指每个点都向上移动几格？	1格|2格|3格|6格	3格	平移距离对图形上每个点都相同。
fraction-add	基础题	同分母加法	3/11+5/11等于？	8/11|8/22|2/11|15/11	8/11	同分母分数相加，分母不变，分子相加。
fraction-add	基础题	同分母减法	7/12-5/12等于？	2/12|12/12|2/24|5/12	2/12	同分母分数相减，分母不变，分子相减。
fraction-add	基础题	异分母加法	1/2+1/4等于？	1/6|2/6|3/4|1/8	3/4	1/2=2/4，2/4+1/4=3/4。
fraction-add	基础题	异分母减法	3/4-1/2等于？	1/4|2/2|2/4|1/2	1/4	1/2=2/4，3/4-2/4=1/4。
fraction-add	基础题	带分数加法	1又1/3+2又1/3等于？	3又1/3|3又2/3|4又1/3|2又2/3	3又2/3	整数部分1+2=3，分数部分1/3+1/3=2/3。
fraction-add	基础题	带分数减法	4又3/5-1又1/5等于？	3又2/5|2又2/5|3又4/5|5又4/5	3又2/5	整数部分4-1=3，分数部分3/5-1/5=2/5。
fraction-add	基础题	单位1	1-2/7等于？	2/7|5/7|7/7|9/7	5/7	把1看成7/7，7/7-2/7=5/7。
fraction-add	基础题	最简结果	2/6+1/6的最简结果是？	3/6|1/2|2/3|1/6	1/2	2/6+1/6=3/6，约分得1/2。
fraction-add	基础题	通分	1/3+1/6先把1/3化成？	1/6|2/6|3/6|6/3	2/6	以6为公分母，1/3=2/6。
fraction-add	基础题	混合运算	5/8-1/8+2/8等于？	4/8|6/8|8/8|2/8	6/8	同分母按顺序计算，5-1+2=6。
fraction-add	提高题	异分母加法	2/3+1/5等于？	3/8|7/15|13/15|2/15	13/15	通分为10/15+3/15=13/15。
fraction-add	提高题	异分母减法	5/6-1/4等于？	2/10|7/12|3/12|1/2	7/12	5/6=10/12，1/4=3/12，差为7/12。
fraction-add	提高题	带分数计算	2又1/2+1又3/4等于？	3又1/4|4又1/4|3又5/4|4又3/4	4又1/4	2又1/2=2又2/4，分数部分2/4+3/4=5/4=1又1/4，总共4又1/4。
fraction-add	提高题	借位减法	3又1/5-1又4/5等于？	1又2/5|1又3/5|2又2/5|2又3/5	1又2/5	从3借1成2，1又1/5=6/5，6/5-4/5=2/5，整数剩1。
fraction-add	提高题	连续加减	1/2+3/4-1/8等于？	7/8|9/8|5/8|11/8	9/8	通分为4/8+6/8-1/8=9/8。
fraction-add	提高题	应用题	一根绳子用去1/3，又用去1/4，一共用去几分之几？	2/7|7/12|5/12|1/12	7/12	1/3=4/12，1/4=3/12，共7/12。
fraction-add	提高题	应用题	一桶油有5/6L，倒出1/3L，还剩多少L？	1/2L|2/3L|1/3L|4/9L	1/2L	1/3=2/6，5/6-2/6=3/6=1/2。
fraction-add	提高题	简便计算	3/7+2/5+4/7中，先算哪两个更方便？	3/7和4/7|2/5和4/7|3/7和2/5|任意两个	3/7和4/7	同分母先加，3/7+4/7=1，计算更简便。
fraction-add	提高题	结果判断	两个真分数相加，结果一定是真分数吗？	一定|不一定|一定是假分数|一定是整数	不一定	如3/4+2/3大于1，结果是假分数。
fraction-add	提高题	估算	1/2+2/5的结果比1大还是小？	比1大|比1小|等于1|无法判断	比1小	1/2=0.5，2/5=0.4，和为0.9，小于1。
fraction-add	易错题	分母误加	1/3+1/3能算成2/6吗？	能|不能|有时能|只在应用题能	不能	同分母相加分母不变，应为2/3。
fraction-add	易错题	通分误区	异分母分数相加前，为什么要通分？	让分数单位相同|让分子相同|让数字变大|让答案变小	让分数单位相同	分母不同表示分数单位不同，必须化成相同单位再加减。
fraction-add	易错题	约分	计算结果6/8，最后应化简为？	6/8|3/4|2/4|1/2	3/4	6和8的最大公因数是2，约分得3/4。
fraction-add	易错题	带分数	带分数相减分数部分不够减时怎么办？	直接减|向整数部分借1|分母相减|答案为0	向整数部分借1	借1化成同分母假分数后再减。
fraction-add	易错题	单位1	1-3/8不能算成多少？	5/8|8/8-3/8|3/7|0.625	3/7	1应看成8/8，不能把分母变成7。
fraction-add	易错题	应用题	一段路走了2/5，还剩多少？	2/5|3/5|5/5|7/5	3/5	全程是单位1，剩下1-2/5=3/5。
fraction-add	易错题	运算顺序	1-1/4-1/4等于？	1/2|0|1/4|2/4	1/2	1=4/4，4/4-1/4-1/4=2/4=1/2。
fraction-add	易错题	比较结果	1/6+1/7的结果比1/3大还是小？	大|小|相等|无法判断	小	1/6+1/7=13/42，1/3=14/42，所以更小。
fraction-add	易错题	混合数	2又1/3-1/3等于？	1|2|2又0/3|1又2/3	2	分数部分相减为0，剩下整数2。
fraction-add	易错题	验算	分数减法可以用什么方法验算？	差+减数=被减数|差-减数=被减数|被减数+减数=差|只看分母	差+减数=被减数	减法验算可用加法：差加减数应等于被减数。
line-chart	基础题	读数	折线统计图上某点对应纵轴40，表示该时刻数据是多少？	20|30|40|50	40	点对应纵轴的数值就是该时刻的数据。
line-chart	基础题	变化趋势	折线从左到右向上升，表示数据怎样变化？	增加|减少|不变|无法判断	增加	折线向上说明后面的数据比前面的数据大。
line-chart	基础题	变化趋势	折线水平，表示数据怎样？	增加|减少|不变|翻倍	不变	水平线表示前后数据相等。
line-chart	基础题	比较	周一25℃，周二28℃，升高了多少？	2℃|3℃|5℃|28℃	3℃	28-25=3℃。
line-chart	基础题	最高点	一组数据12、18、15、20中，最高点对应多少？	12|15|18|20	20	最高点对应最大数据20。
line-chart	基础题	最低点	一周销售量中最低是35，折线图最低点表示什么？	销售最多|销售最少|平均销售|无法确定	销售最少	最低点表示该组数据中的最小值。
line-chart	基础题	标题	折线统计图的标题主要说明什么？	统计内容|颜色|纸张大小|计算公式	统计内容	标题告诉我们统计的对象和内容。
line-chart	基础题	横轴	表示日期的一般是哪条轴？	横轴|纵轴|对称轴|旋转轴	横轴	折线统计图通常用横轴表示时间或类别。
line-chart	基础题	纵轴	表示数量的一般是哪条轴？	横轴|纵轴|对称轴|边线	纵轴	纵轴通常表示数量或数值。
line-chart	基础题	连接点	折线统计图为什么要把点连起来？	看变化趋势|让图更大|减少数据|改变单位	看变化趋势	连线能直观看出数据升降变化。
line-chart	提高题	增减比较	数据20、25、23、30中，哪一段增加最多？	20到25|25到23|23到30|都一样	23到30	20到25增加5，23到30增加7，增加最多。
line-chart	提高题	平均数	四天用水量为8、10、12、10吨，平均每天多少吨？	8吨|9吨|10吨|12吨	10吨	总量40吨，4天平均为10吨。
line-chart	提高题	预测	连续三天数据为10、15、20，若趋势不变，第四天可能是？	15|20|25|30	25	每次增加5，下一次可能是25。
line-chart	提高题	双折线	比较两个班成绩变化，最适合用什么统计图？	单式条形|复式折线|扇形|象形	复式折线	复式折线统计图适合比较两组数据随时间变化的趋势。
line-chart	提高题	变化幅度	数据30降到18，减少了多少？	8|10|12|18	12	减少量=30-18=12。
line-chart	提高题	趋势分析	折线先升后降，说明数据怎样？	一直增加|一直减少|先增加后减少|没有变化	先增加后减少	折线的方向先向上后向下，对应先增后减。
line-chart	提高题	间隔读图	纵轴每格表示5，点在第6格，对应数值是？	6|11|25|30	30	每格5，第6格是6×5=30。
line-chart	提高题	局部比较	某商品销量从40到55，再到50，总体比开始怎样？	增加10|增加15|减少5|不变	增加10	最后50比开始40多10。
line-chart	提高题	数据补全	折线图中前后数据为18和26，中间若平均变化，中间值应是？	20|22|24|25	22	18到26相差8，中间平均位置是18+4=22。
line-chart	提高题	应用判断	要观察体温一天内变化，适合用折线统计图吗？	适合|不适合|只能用表格|只能用文字	适合	体温随时间变化，折线统计图能清楚显示趋势。
line-chart	易错题	读点	读折线统计图时，应先看点还是先看线的粗细？	看点的位置|看线的粗细|看颜色深浅|看纸张大小	看点的位置	数据由点对应的坐标确定，线粗细不表示数值。
line-chart	易错题	趋势误区	折线越陡，表示什么？	变化越快|数量一定最大|数量一定最小|单位错误	变化越快	折线陡说明单位时间内变化幅度较大。
line-chart	易错题	最高点误区	最高点一定表示最后一天吗？	一定|不一定|一定是第一天|一定是平均数	不一定	最高点表示数值最大，可能出现在任意时间。
line-chart	易错题	横纵轴	横轴和纵轴可以随便读吗？	可以|不可以|只读横轴|只读纵轴	不可以	读图时要分清横轴表示什么、纵轴表示什么。
line-chart	易错题	单位	纵轴单位是“万人”，读数30表示什么？	30人|300人|30万人|无法读	30万人	数值要结合单位，30表示30万人。
line-chart	易错题	平均数	折线统计图最高值不能直接代表什么？	最大值|最高点|平均数|某时刻数据	平均数	平均数需要计算，不能只看最高点。
line-chart	易错题	预测误区	根据折线趋势预测，结果一定准确吗？	一定准确|不一定准确|等于最后数据|等于平均数	不一定准确	预测只是根据已有趋势估计，实际可能受其他因素影响。
line-chart	易错题	连接线	折线中两个点之间的线段表示什么？	两点间变化趋势|两个点相等|中间没有数据|单位变了	两点间变化趋势	线段表示相邻两个数据之间的变化方向和幅度。
line-chart	易错题	比较	两条折线比较时，必须注意什么？	单位和刻度相同|颜色一样|线条一样粗|标题一样长	单位和刻度相同	单位和刻度不同会影响比较判断。
line-chart	易错题	数据表	根据折线统计图填写数据表，关键是？	找每个点对应的数值|数线条数量|看背景颜色|看标题字体	找每个点对应的数值	每个点对应横轴项目和纵轴数值，读准即可。
`;
}

function loadQuestionBank() {
  try {
    const bankVersion = localStorage.getItem(BANK_VERSION_KEY);
    const stored = localStorage.getItem(BANK_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const list = Array.isArray(parsed) ? parsed : parsed.questions;
      if (shouldKeepStoredBank(list, bankVersion)) {
        const normalized = dedupeQuestionBank(list.map(normalizeQuestion));
        localStorage.setItem(BANK_KEY, JSON.stringify(normalized));
        localStorage.setItem(BANK_VERSION_KEY, BANK_VERSION);
        return normalized;
      }
    }
  } catch (error) {
    return buildDefaultQuestionBank();
  }
  const bank = buildDefaultQuestionBank();
  localStorage.setItem(BANK_KEY, JSON.stringify(bank));
  localStorage.setItem(BANK_VERSION_KEY, BANK_VERSION);
  return bank;
}

function shouldKeepStoredBank(list, bankVersion) {
  if (!Array.isArray(list) || !list.length) return false;
  return bankVersion === BANK_VERSION;
}

function saveQuestionBank() {
  questionBank = dedupeQuestionBank(questionBank.map(normalizeQuestion));
  localStorage.setItem(BANK_KEY, JSON.stringify(questionBank));
  localStorage.setItem(BANK_VERSION_KEY, BANK_VERSION);
}

function normalizeQuestion(question) {
  const chapter = findChapterByNameOrId(question.chapterId || question.chapter);
  const difficulty = DIFFICULTIES.includes(question.difficulty) ? question.difficulty : DIFFICULTIES[0];
  const answer = String(question.answer || question.答案 || "").trim();
  const options = Array.isArray(question.options)
    ? question.options.map(String).filter(Boolean)
    : String(question.options || "").split("|").map((item) => item.trim()).filter(Boolean);
  const title = String(question.title || question.question || question.题目 || "").trim();
  return {
    id: String(question.id || createQuestionId()),
    chapterId: chapter.id,
    chapter: chapter.name,
    difficulty,
    question: title,
    title,
    options: uniqueOptions(options, answer),
    answer,
    analysis: String(question.explanation || question.analysis || question.详细讲解 || question.解析 || "").trim(),
    explanation: String(question.explanation || question.analysis || question.详细讲解 || question.解析 || "").trim(),
    knowledgePoint: String(question.knowledgePoint || question.知识点 || "综合练习").trim(),
    commonMistake: String(question.commonMistake || question.常见错误 || makeDefaultMistake(difficulty)).trim(),
    encouragement: String(question.encouragement || question.鼓励语 || makeDefaultEncouragement(difficulty)).trim()
  };
}

function makeDefaultMistake(difficulty) {
  if (difficulty === "易错题") return "容易忽略题目中的关键词，或把相似概念混在一起。";
  if (difficulty === "提高题") return "容易跳过中间步骤，导致通分、单位换算或数量关系判断出错。";
  return "容易审题不细，直接套公式而没有先确认题目问的是什么。";
}

function makeDefaultEncouragement(difficulty) {
  if (difficulty === "易错题") return "这类题错了很正常，记住错误原因，下次就能避开。";
  if (difficulty === "提高题") return "你已经在挑战更高层次的思考了，保持步骤清楚就会越来越稳。";
  return "基础题做扎实很重要，继续保持认真审题的好习惯。";
}

function dedupeQuestionBank(list) {
  const exactByGroup = new Set();
  const templateByGroup = new Set();
  const result = [];
  list.forEach((item) => {
    const question = normalizeQuestion(item);
    if (!question.title) return;
    const group = `${question.chapterId}::${question.difficulty}`;
    const templateGroup = `${group}::${question.knowledgePoint}`;
    const exactKey = `${group}::${normalizeQuestionText(question.title)}`;
    const templateKey = `${templateGroup}::${normalizeQuestionTemplate(question.title)}`;
    if (exactByGroup.has(exactKey) || templateByGroup.has(templateKey)) return;
    exactByGroup.add(exactKey);
    templateByGroup.add(templateKey);
    result.push(question);
  });
  return result;
}

function normalizeQuestionText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[，。？！、；：,.?!;:"'“”‘’（）()【】\[\]{}<>《》]/g, "");
}

function normalizeQuestionTemplate(text) {
  return normalizeQuestionText(text)
    .replace(/\d+\s*\/\s*\d+/g, "#/#")
    .replace(/\d+(?:\.\d+)?/g, "#")
    .replace(/[一二三四五六七八九十百千万零两]+/g, "#");
}

function pickDiverseQuestions(pool, limit) {
  const selected = [];
  const usedExact = new Set();
  const usedTemplate = new Set();
  const knowledgeCounts = new Map();
  const poolKnowledgeTotals = new Map();

  pool.forEach((item) => {
    const key = item.knowledgePoint || "综合应用";
    poolKnowledgeTotals.set(key, (poolKnowledgeTotals.get(key) || 0) + 1);
  });

  const candidates = shuffle([...pool]).sort((a, b) => {
    const aKey = a.knowledgePoint || "综合应用";
    const bKey = b.knowledgePoint || "综合应用";
    return (poolKnowledgeTotals.get(aKey) || 0) - (poolKnowledgeTotals.get(bKey) || 0);
  });

  candidates.forEach((question) => {
    if (selected.length >= limit) return;
    const questionText = question.title || question.question || "";
    const exactKey = normalizeQuestionText(questionText);
    const templateKey = normalizeQuestionTemplate(questionText);
    const knowledgePoint = question.knowledgePoint || "综合应用";
    const currentCount = knowledgeCounts.get(knowledgePoint) || 0;
    if (usedExact.has(exactKey) || usedTemplate.has(templateKey) || currentCount >= 2) return;
    selected.push(question);
    usedExact.add(exactKey);
    usedTemplate.add(templateKey);
    knowledgeCounts.set(knowledgePoint, currentCount + 1);
  });

  return selected;
}

function getCurrentLevel() {
  return LEVELS.reduce((current, item) => appData.points >= item.points ? item : current, LEVELS[0]);
}

function updateAchievements() {
  appData.achievements = appData.achievements && typeof appData.achievements === "object" ? appData.achievements : {};
  let changed = false;
  ACHIEVEMENTS.forEach((item) => {
    if (appData.achievements[item.id]) return;
    if (isAchievementMet(item)) {
      appData.achievements[item.id] = formatDateTime(new Date());
      changed = true;
    }
  });
  if (changed) saveData();
}

function isAchievementMet(item) {
  if (item.type === "streak") return appData.streak >= item.target;
  if (item.type === "correct") return appData.totalCorrect >= item.target;
  if (item.type === "points") return appData.points >= item.target;
  if (item.type === "chapter") return getChapterStats(item.chapterId).correct >= item.target;
  return false;
}

function getAchievementHint(item) {
  if (item.type === "streak") return `连续学习达到 ${item.target} 天后获得`;
  if (item.type === "correct") return `累计答对 ${item.target} 题后获得`;
  if (item.type === "points") return `积分达到 ${item.target} 后获得`;
  if (item.type === "chapter") return `本章节累计答对 ${item.target} 题后获得`;
  return "继续练习即可获得";
}

function recordStudySession(session) {
  appData.studyLogs = appData.studyLogs && typeof appData.studyLogs === "object" ? appData.studyLogs : {};
  const key = getDateKey(new Date());
  const log = appData.studyLogs[key] || { answered: 0, correct: 0, points: 0, minutes: 0 };
  log.answered += Number(session.answered) || 0;
  log.correct += Number(session.correct) || 0;
  log.points += Number(session.points) || 0;
  log.minutes += Number(session.minutes) || 0;
  appData.studyLogs[key] = log;
}

function getDateRange(type) {
  const today = new Date();
  const start = new Date(today);
  if (type === "week") start.setDate(today.getDate() - 6);
  if (type === "month") start.setDate(today.getDate() - 29);
  return { start: getDateKey(start), end: getDateKey(today) };
}

function summarizeLogs(range) {
  const logs = appData.studyLogs && typeof appData.studyLogs === "object" ? appData.studyLogs : {};
  const report = Object.entries(logs).reduce((acc, [date, log]) => {
    if (date < range.start || date > range.end) return acc;
    acc.answered += Number(log.answered) || 0;
    acc.correct += Number(log.correct) || 0;
    acc.points += Number(log.points) || 0;
    acc.minutes += Number(log.minutes) || 0;
    return acc;
  }, { answered: 0, correct: 0, points: 0, minutes: 0 });
  report.accuracy = report.answered ? Math.round((report.correct / report.answered) * 100) : 0;
  return report;
}

function getChapterPerformance() {
  return chapters.map((chapter) => {
    const stats = getChapterStats(chapter.id);
    const accuracy = stats.answered ? Math.round((stats.correct / stats.answered) * 100) : 0;
    const wrongTotal = countWrongByChapter(chapter.id);
    return { ...chapter, answered: stats.answered, correct: stats.correct, accuracy, wrongTotal };
  });
}

function getStrongChapter() {
  return getChapterPerformance()
    .filter((item) => item.answered >= 5)
    .sort((a, b) => b.accuracy - a.accuracy || b.correct - a.correct)[0] || null;
}

function getWeakReportChapter() {
  return getChapterPerformance()
    .filter((item) => item.answered > 0 || item.wrongTotal > 0)
    .sort((a, b) => a.accuracy - b.accuracy || b.wrongTotal - a.wrongTotal)[0] || null;
}

function buildParentAdvice(weekReport) {
  const strong = getStrongChapter();
  const weak = getWeakReportChapter();
  const recommend = weak || getWeakChapter() || chapters[0];
  const weakPoints = getTopWrongKnowledgePoints(3);
  return `
    <article class="advice-card">
      <h3>AI学习建议</h3>
      <p>本周共完成 ${weekReport.answered} 题，正确率 ${weekReport.accuracy}%，获得 ${weekReport.points} 积分，累计学习约 ${weekReport.minutes} 分钟。</p>
      <p>${strong ? `${escapeHTML(strong.name)}掌握良好。` : "目前练习数据还不多，建议先保持每天稳定练习。"}</p>
      <p>${escapeHTML(recommend.name)}正确率偏低，建议重点练习：</p>
      ${weakPoints.length ? `<ul>${weakPoints.map((item) => `<li>${escapeHTML(item.name)}</li>`).join("")}</ul>` : "<p>基础概念、易错题复盘和同类型题巩固。</p>"}
      <p>建议每天练习 20 分钟，先做基础题，再做错题本和同类型题。</p>
    </article>
  `;
}

function getWeakKnowledgePoints(chapterId) {
  const wrongItems = getValidWrongBook().filter((item) => item.chapterId === chapterId);
  const counts = wrongItems.reduce((acc, item) => {
    const key = item.knowledgePoint || "综合练习";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([name]) => name);
}

function getTopWrongKnowledgePoints(limit = 5) {
  const counts = getValidWrongBook().reduce((acc, item) => {
    const key = item.knowledgePoint || "综合练习";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

function getRecentDayReports(days) {
  const result = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = getDateKey(addDays(new Date(), -i));
    const log = appData.studyLogs && appData.studyLogs[date] ? appData.studyLogs[date] : { answered: 0, correct: 0, points: 0, minutes: 0 };
    result.push({
      date,
      answered: Number(log.answered) || 0,
      correct: Number(log.correct) || 0,
      points: Number(log.points) || 0,
      minutes: Number(log.minutes) || 0,
      accuracy: log.answered ? Math.round((log.correct / log.answered) * 100) : 0
    });
  }
  return result;
}

function renderLineChart(values, label) {
  const width = 320;
  const height = 130;
  const padding = 22;
  const max = Math.max(...values, 1);
  const points = values.map((value, index) => {
    const x = padding + (values.length === 1 ? 0 : (index * (width - padding * 2)) / (values.length - 1));
    const y = height - padding - (value / max) * (height - padding * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return `
    <svg class="line-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHTML(label)}折线图">
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}"></line>
      <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}"></line>
      <polyline points="${points}"></polyline>
      ${values.map((value, index) => {
        const [x, y] = points.split(" ")[index].split(",");
        return `<circle cx="${x}" cy="${y}" r="3"><title>${value}</title></circle>`;
      }).join("")}
    </svg>
  `;
}

function exportReportPdf() {
  renderStudyReport();
  window.print();
}

function exportStudyExcel() {
  const rows = [["日期", "做题数量", "答对数量", "正确率", "获得积分", "学习时长"]];
  const logs = appData.studyLogs && typeof appData.studyLogs === "object" ? appData.studyLogs : {};
  Object.entries(logs).sort((a, b) => a[0].localeCompare(b[0])).forEach(([date, log]) => {
    const answered = Number(log.answered) || 0;
    const correct = Number(log.correct) || 0;
    rows.push([
      date,
      answered,
      correct,
      answered ? `${Math.round((correct / answered) * 100)}%` : "0%",
      Number(log.points) || 0,
      Number(log.minutes) || 0
    ]);
  });
  const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
  downloadFile("学习记录.csv", `\ufeff${csv}`, "text/csv;charset=utf-8");
}

function uniqueOptions(options, answer) {
  const seen = new Set();
  const result = [];
  [...options, answer].forEach((option) => {
    const text = String(option || "").trim();
    if (text && !seen.has(text)) {
      seen.add(text);
      result.push(text);
    }
  });
  let index = 1;
  while (result.length < 4 && index < 1000) {
    const text = `选项${index}`;
    if (!seen.has(text)) {
      seen.add(text);
      result.push(text);
    }
    index += 1;
  }
  return result.slice(0, 4);
}

function loadData() {
  try {
    const stored = localStorage.getItem(DATA_KEY);
    if (stored) return normalizeData(JSON.parse(stored));
    const oldStored = localStorage.getItem(OLD_DATA_KEY);
    if (oldStored) return normalizeData(JSON.parse(oldStored));
  } catch (error) {
    return { ...defaultData };
  }
  return { ...defaultData };
}

function normalizeData(data) {
  const normalized = { ...defaultData, ...data };
  normalized.totalAnswered = Number(normalized.totalAnswered) || 0;
  normalized.totalCorrect = Number(normalized.totalCorrect) || 0;
  normalized.points = Number(normalized.points) || 0;
  normalized.streak = Number(normalized.streak) || 0;
  normalized.lastStudyTime = typeof normalized.lastStudyTime === "string" ? normalized.lastStudyTime : "";
  normalized.lastSignDate = typeof normalized.lastSignDate === "string" ? normalized.lastSignDate : "";
  normalized.wrongBook = Array.isArray(normalized.wrongBook) ? normalized.wrongBook : [];
  normalized.chapterStats = normalized.chapterStats && typeof normalized.chapterStats === "object" ? normalized.chapterStats : {};
  normalized.achievements = normalized.achievements && typeof normalized.achievements === "object" ? normalized.achievements : {};
  normalized.studyLogs = normalized.studyLogs && typeof normalized.studyLogs === "object" ? normalized.studyLogs : {};
  return normalized;
}

function saveData() {
  localStorage.setItem(DATA_KEY, JSON.stringify(appData));
}

function ensureChapterStats() {
  appData.chapterStats = appData.chapterStats || {};
  chapters.forEach((chapter) => {
    const stats = appData.chapterStats[chapter.id];
    if (!stats || typeof stats !== "object") appData.chapterStats[chapter.id] = { answered: 0, correct: 0 };
    else {
      stats.answered = Number(stats.answered) || 0;
      stats.correct = Number(stats.correct) || 0;
    }
  });
}

function getChapterStats(chapterId) {
  ensureChapterStats();
  return appData.chapterStats[chapterId];
}

function getChapter(chapterId) {
  return chapters.find((chapter) => chapter.id === chapterId) || chapters[0];
}

function findChapterByNameOrId(value) {
  return chapters.find((chapter) => chapter.id === value || chapter.name === value) || chapters[0];
}

function countWrongByChapter(chapterId) {
  return getValidWrongBook().filter((item) => item.chapterId === chapterId).length;
}

function getValidWrongBook() {
  if (!Array.isArray(appData.wrongBook)) {
    appData.wrongBook = [];
    saveData();
    return [];
  }
  const valid = appData.wrongBook.filter((item) => item && item.chapterId && item.title && item.answer && (item.explanation || item.analysis));
  if (valid.length !== appData.wrongBook.length) {
    appData.wrongBook = valid;
    saveData();
  }
  return valid;
}

function createQuestionId() {
  return `q-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function setManageMessage(message) {
  dom.manageMessage.textContent = message;
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function csvEscape(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDateTime(date) {
  return `${getDateKey(date)} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
