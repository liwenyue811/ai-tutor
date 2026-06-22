const DATA_KEY = "freeAiTutorV3Data";
const BANK_KEY = "freeAiTutorV3QuestionBank";
const BANK_VERSION_KEY = "freeAiTutorV3QuestionBankVersion";
const BANK_VERSION = "quality-fix-v18";
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
  { id: "medal-streak-star", title: "坚持之星", type: "medal-streak", target: 7 },
  { id: "medal-answer-master", title: "答题达人", type: "medal-answered", target: 100 },
  { id: "medal-diligent-learner", title: "勤学小能手", type: "medal-week", target: 50 },
  { id: "master-view", title: "观察物体达人", type: "chapter", chapterId: "view", target: 50 },
  { id: "master-factor", title: "因数与倍数达人", type: "chapter", chapterId: "factor", target: 50 },
  { id: "master-cube", title: "长方体达人", type: "chapter", chapterId: "cube", target: 50 },
  { id: "master-fraction", title: "分数达人", type: "chapter", chapterId: "fraction", target: 50 }
];

const subjects = [
  { id: "math", name: "数学", desc: "五年级下册数学章节练习" },
  { id: "chinese", name: "语文", desc: "人教版五年级下册八个单元同步练习" },
  { id: "english", name: "英语", desc: "五年级英语同步练习，覆盖单词、句型、阅读理解和考试高频题。" }
];

const subjectChapters = {
  math: [
  { id: "view", name: "观察物体", desc: "从不同方向观察几何体，判断看到的形状。" },
  { id: "factor", name: "因数与倍数", desc: "认识因数、倍数、质数、合数、公因数和公倍数。" },
  { id: "cube", name: "长方体和正方体", desc: "学习表面积、体积、棱长和单位换算。" },
  { id: "fraction", name: "分数的意义和性质", desc: "理解分数意义、分数基本性质、约分和通分。" },
  { id: "motion", name: "图形的运动", desc: "认识平移、旋转和轴对称图形。" },
  { id: "fraction-add", name: "分数加减法", desc: "掌握同分母、异分母分数加减和混合运算。" },
  { id: "line-chart", name: "折线统计图", desc: "读懂折线统计图，分析变化趋势。" }
  ],
  chinese: [
    { id: "chinese-u1", name: "第一单元", desc: "童年往事与家国情怀：生字词、课文理解、阅读理解、单元测试。" },
    { id: "chinese-u2", name: "第二单元", desc: "古典名著阅读：生字词、课文理解、阅读理解、单元测试。" },
    { id: "chinese-u3", name: "第三单元", desc: "综合性学习与汉字文化：生字词、课文理解、阅读理解、单元测试。" },
    { id: "chinese-u4", name: "第四单元", desc: "责任担当与人物品质：生字词、课文理解、阅读理解、单元测试。" },
    { id: "chinese-u5", name: "第五单元", desc: "习作单元与人物描写：生字词、课文理解、阅读理解、单元测试。" },
    { id: "chinese-u6", name: "第六单元", desc: "思维方法与故事阅读：生字词、课文理解、阅读理解、单元测试。" },
    { id: "chinese-u7", name: "第七单元", desc: "异域风情与景物描写：生字词、课文理解、阅读理解、单元测试。" },
    { id: "chinese-u8", name: "第八单元", desc: "语言智慧与幽默表达：生字词、课文理解、阅读理解、单元测试。" }
  ],
  english: [
    { id: "english-words", name: "单词", desc: "五年级常考单词含义、拼写、分类和词形变化。" },
    { id: "english-sentences", name: "句型", desc: "常见问答、时态、语序和情景交际句型。" },
    { id: "english-reading", name: "阅读理解", desc: "短文细节、推理判断、主旨理解和信息提取。" },
    { id: "english-exam", name: "考试高频", desc: "期中期末常见题型、易错语法和综合运用。" }
  ]
};

let selectedSubjectId = "math";
let chapters = subjectChapters[selectedSubjectId];

const defaultData = {
  totalAnswered: 0,
  totalCorrect: 0,
  points: 0,
  lastStudyTime: "",
  lastSignDate: "",
  streak: 0,
  wrongBook: [],
  chapterStats: {},
  completedQuestions: {},
  achievements: {},
  studyLogs: {}
};

const appData = loadData();
let questionBank = loadQuestionBank();
let selectedChapterId = chapters[0].id;
let selectedDifficulty = DIFFICULTIES[0];
let selectedChineseUnitId = "";
let selectedChineseModule = "";
let selectedExamType = "";
let currentQuestions = [];
let currentSubmitted = false;
let wrongOnlyMode = false;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const dom = {
  chapterHome: $("#chapterHome"),
  chapterGrid: $("#chapterGrid"),
  modulePanel: $("#modulePanel"),
  moduleGrid: $("#moduleGrid"),
  moduleTitle: $("#moduleTitle"),
  moduleBreadcrumb: $("#moduleBreadcrumb"),
  moduleBackBtn: $("#moduleBackBtn"),
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
  subjectTabs: $("#subjectTabs"),
  achievementSummary: $("#achievementSummary"),
  achievementList: $("#achievementList"),
  recentMedalList: $("#recentMedalList"),
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
  if (dom.subjectTabs) renderSubjectTabs();
  if (dom.chapterGrid) renderChapterHome();
  if (dom.totalAnswered) renderStats();
  if (dom.levelName) renderLevel();
  if (dom.chapterRecordList) renderChapterRecords();
  if (dom.achievementList) renderAchievements();
  if (dom.recentMedalList) renderRecentMedals();
  if (dom.studyReport) renderStudyReport();
  if (dom.wrongBookList) renderWrongBook();
  if (dom.questionManageList) renderQuestionManager();
  renderWeakRecommendation();
  if (dom.signBtn) updateSignButton();

  if (dom.submitBtn) dom.submitBtn.addEventListener("click", gradeQuiz);
  if (dom.newQuizBtn) dom.newQuizBtn.addEventListener("click", createNewQuiz);
  if (dom.homeBtn) dom.homeBtn.addEventListener("click", showHome);
  if (dom.moduleBackBtn) dom.moduleBackBtn.addEventListener("click", showHome);
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

function renderSubjectTabs() {
  dom.subjectTabs.innerHTML = subjects.map((subject) => `
    <button class="subject-tab ${subject.id === selectedSubjectId ? "active" : ""}" type="button" data-subject="${subject.id}">
      <strong>${escapeHTML(subject.name)}</strong>
      <span>${escapeHTML(subject.desc)}</span>
    </button>
  `).join("");
  $$(".subject-tab").forEach((button) => {
    button.addEventListener("click", () => switchSubject(button.dataset.subject));
  });
}

function switchSubject(subjectId) {
  if (!subjectChapters[subjectId]) return;
  selectedSubjectId = subjectId;
  chapters = subjectChapters[selectedSubjectId];
  selectedChapterId = chapters[0].id;
  selectedDifficulty = DIFFICULTIES[0];
  selectedChineseUnitId = "";
  selectedChineseModule = "";
  selectedExamType = "";
  wrongOnlyMode = false;
  currentQuestions = [];
  currentSubmitted = false;
  renderSubjectTabs();
  renderSelects();
  renderChapterHome();
  renderChapterRecords();
  renderWrongBook();
  renderWeakRecommendation();
  showHome();
}

function showHome() {
  setReportMode(false);
  if (dom.chapterHome) dom.chapterHome.classList.remove("hidden");
  if (dom.modulePanel) dom.modulePanel.classList.add("hidden");
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
    dom.modulePanel,
    dom.quizPanel,
    document.querySelector("[aria-labelledby='subjectTitle']"),
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
  if (chapterId.startsWith("exam-")) {
    startExamPaper(chapterId.replace("exam-", ""));
    return;
  }
  if (selectedSubjectId === "chinese") {
    openChineseUnit(chapterId);
    return;
  }
  selectedChapterId = chapterId;
  selectedDifficulty = DIFFICULTIES[0];
  selectedExamType = "";
  wrongOnlyMode = false;
  $$(".difficulty-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.difficulty === selectedDifficulty);
  });
  dom.chapterHome.classList.add("hidden");
  dom.quizPanel.classList.remove("hidden");
  createNewQuiz();
  dom.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openChineseUnit(chapterId) {
  selectedChineseUnitId = chapterId;
  selectedChapterId = chapterId;
  selectedChineseModule = "";
  selectedExamType = "";
  const unit = getChapter(chapterId);
  selectedDifficulty = DIFFICULTIES[0];
  wrongOnlyMode = false;
  currentSubmitted = false;
  if (dom.chapterHome) dom.chapterHome.classList.add("hidden");
  if (dom.quizPanel) dom.quizPanel.classList.remove("hidden");
  if (dom.modulePanel) dom.modulePanel.classList.remove("hidden");
  if (dom.moduleTitle) dom.moduleTitle.textContent = `${unit.name}专项训练`;
  if (dom.moduleBreadcrumb) dom.moduleBreadcrumb.textContent = `语文 / ${unit.name} / 可选专项`;
  renderChineseModules();
  createNewQuiz();
  if (dom.quizTitle) dom.quizTitle.textContent = `${unit.name} · 混合练习`;
  if (dom.chapterBreadcrumb) dom.chapterBreadcrumb.textContent = `语文 / ${unit.name} / 混合练习`;
  if (dom.quizPanel) dom.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function startExamPaper(examType) {
  selectedExamType = examType;
  selectedChapterId = `exam-${examType}`;
  selectedChineseUnitId = "";
  selectedChineseModule = "";
  wrongOnlyMode = false;
  currentSubmitted = false;
  if (dom.chapterHome) dom.chapterHome.classList.add("hidden");
  if (dom.modulePanel) dom.modulePanel.classList.add("hidden");
  if (dom.quizPanel) dom.quizPanel.classList.remove("hidden");
  createNewQuiz();
  if (dom.quizPanel) dom.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderChineseModules() {
  if (!dom.moduleGrid) return;
  const unit = getChapter(selectedChineseUnitId);
  const modules = Array.from(new Set(questionBank
    .filter((item) => item.subjectId === "chinese" && item.chapterId === selectedChineseUnitId)
    .map((item) => item.knowledgePoint)));
  dom.moduleGrid.innerHTML = modules.map((moduleName, index) => {
    const total = questionBank.filter((item) => item.subjectId === "chinese" && item.chapterId === selectedChineseUnitId && item.knowledgePoint === moduleName).length;
    return `
      <button class="chapter-card module-card" type="button" data-module="${escapeHTML(moduleName)}">
        <h3>${index + 1}. ${escapeHTML(moduleName)}</h3>
        <p>${escapeHTML(unit.name)} · ${escapeHTML(moduleName)}专项题库</p>
        <div class="chapter-mini-stats">
          <span class="pill">题目 ${total}</span>
          <span class="pill">随机练习</span>
        </div>
      </button>
    `;
  }).join("");
  dom.moduleGrid.querySelectorAll(".module-card").forEach((card) => {
    card.addEventListener("click", () => startChineseModulePractice(card.dataset.module));
  });
}

function startChineseModulePractice(moduleName) {
  const unit = getChapter(selectedChineseUnitId);
  selectedChapterId = selectedChineseUnitId;
  selectedChineseModule = moduleName;
  selectedExamType = "";
  selectedDifficulty = DIFFICULTIES[0];
  wrongOnlyMode = false;
  currentSubmitted = false;
  if (dom.modulePanel) dom.modulePanel.classList.add("hidden");
  if (dom.quizPanel) dom.quizPanel.classList.remove("hidden");
  createNewQuiz();
  if (dom.quizTitle) dom.quizTitle.textContent = `${unit.name} · ${moduleName}`;
  if (dom.chapterBreadcrumb) dom.chapterBreadcrumb.textContent = `语文 / ${unit.name} / ${moduleName}`;
  if (dom.quizPanel) dom.quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function startWrongOnlyPractice(chapterId = selectedChapterId) {
  const targetChapter = chapterId || selectedChapterId;
  const hasWrong = getValidWrongBook().some((item) => item.chapterId === targetChapter);
  if (!hasWrong) {
    window.alert("这个章节暂时没有错题。");
    return;
  }
  selectedSubjectId = findSubjectByChapterId(targetChapter).id;
  chapters = subjectChapters[selectedSubjectId];
  selectedChapterId = targetChapter;
  selectedExamType = "";
  wrongOnlyMode = true;
  if (dom.subjectTabs) renderSubjectTabs();
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
  const isExamPaper = Boolean(selectedExamType);
  const chapter = isExamPaper
    ? { name: selectedExamType === "midterm" ? "期中模拟卷" : "期末模拟卷" }
    : getChapter(selectedChapterId);
  const wrongIds = new Set(getValidWrongBook().map((item) => item.id));
  const pool = questionBank.filter((question) => {
    const subjectOk = (question.subjectId || "math") === selectedSubjectId;
    if (isExamPaper) {
      const examOk = Array.isArray(question.examTypes) && question.examTypes.includes(selectedExamType);
      const wrongOk = !wrongOnlyMode || wrongIds.has(question.id);
      return subjectOk && examOk && wrongOk;
    }
    const chapterOk = question.chapterId === selectedChapterId;
    const chineseModuleMode = selectedSubjectId === "chinese" && selectedChineseModule;
    const moduleOk = !chineseModuleMode || question.knowledgePoint === selectedChineseModule;
    const chineseMixedMode = selectedSubjectId === "chinese" && !selectedChineseModule;
    const difficultyOk = wrongOnlyMode || chineseModuleMode || chineseMixedMode || question.difficulty === selectedDifficulty;
    const wrongOk = !wrongOnlyMode || wrongIds.has(question.id);
    return subjectOk && chapterOk && moduleOk && difficultyOk && wrongOk;
  });
  const questionLimit = isExamPaper ? 20 : 10;
  const maxPerKnowledge = isExamPaper ? 6 : (selectedSubjectId === "chinese" && selectedChineseModule ? 10 : 2);
  currentQuestions = isExamPaper
    ? pickExamPaperQuestions(pool, selectedSubjectId, selectedExamType, questionLimit)
    : pickDiverseQuestions(pool, questionLimit, maxPerKnowledge);
  currentSubmitted = false;
  dom.scoreText.textContent = "未提交";
  dom.resultBox.classList.add("hidden");
  dom.resultBox.textContent = "";
  dom.submitBtn.disabled = !currentQuestions.length;
  const isChineseMixedQuiz = selectedSubjectId === "chinese" && !selectedChineseModule && !wrongOnlyMode;
  const quizLabel = isExamPaper ? chapter.name : (selectedChineseModule ? selectedChineseModule : (isChineseMixedQuiz ? "混合练习" : selectedDifficulty));
  dom.quizTitle.textContent = wrongOnlyMode ? `${chapter.name} · 只练错题` : `${chapter.name} · ${quizLabel}`;
  dom.chapterBreadcrumb.textContent = isExamPaper ? `${getSubjectName(selectedSubjectId)} / ${chapter.name}` : (selectedChineseModule ? `语文 / ${chapter.name} / ${selectedChineseModule}` : (isChineseMixedQuiz ? `语文 / ${chapter.name} / 混合练习` : `章节题库 / ${chapter.name}`));
  dom.quizTip.textContent = wrongOnlyMode
    ? `本章节错题共 ${pool.length} 道，本次随机显示 ${currentQuestions.length} 道。答对错题后会自动移出错题本。`
    : (isExamPaper
      ? `本套试卷共 20 题，按真实考试比例组卷。当前题库可选 ${pool.length} 题。`
      : `本章节 ${quizLabel} 共 ${pool.length} 道，本次随机显示 ${currentQuestions.length} 道。答对 1 题获得 10 积分。`);
  renderQuestions();
}

function renderChapterHome() {
  const subjectQuestionCount = questionBank.filter((item) => (item.subjectId || "math") === selectedSubjectId).length;
  const showExamCards = subjectQuestionCount >= 100;
  const examCards = showExamCards ? ["midterm", "final"].map((examType) => {
    const title = examType === "midterm" ? "期中模拟卷" : "期末模拟卷";
    const count = questionBank.filter((item) => {
      const subjectOk = (item.subjectId || "math") === selectedSubjectId;
      const types = item.examTypes || [];
      return subjectOk && types.includes(examType);
    }).length;
    return `
      <button class="chapter-card exam-card" type="button" data-chapter="exam-${examType}">
        <h3>${escapeHTML(title)}</h3>
        <p>按真实考试比例组卷，每套 20 题。</p>
        <div class="chapter-mini-stats">
          <span class="pill">题库 ${count}</span>
          <span class="pill">20 题</span>
          <span class="pill">真实组卷</span>
        </div>
      </button>
    `;
  }).join("") : "";
  const chapterCards = chapters.map((chapter, index) => {
    const stats = getChapterStats(chapter.id);
    const wrongTotal = countWrongByChapter(chapter.id);
    const accuracy = stats.answered ? Math.round((stats.correct / stats.answered) * 100) : 0;
    const total = questionBank.filter((item) => item.chapterId === chapter.id && (item.subjectId || "math") === selectedSubjectId).length;
    const completion = getChapterCompletion(chapter.id, total);
    const completionHTML = selectedSubjectId === "chinese" ? `<span class="pill">完成度 ${completion}%</span>` : "";
    return `
      <button class="chapter-card ${stats.answered && accuracy < 60 ? "low-accuracy" : ""}" type="button" data-chapter="${chapter.id}">
        <h3>${index + 1}. ${escapeHTML(chapter.name)}</h3>
        <p>${escapeHTML(chapter.desc)}</p>
        <div class="chapter-mini-stats">
          <span class="pill">题目 ${total}</span>
          <span class="pill">做题 ${stats.answered}</span>
          <span class="pill">正确率 ${accuracy}%</span>
          <span class="pill">错题 ${wrongTotal}</span>
          ${completionHTML}
        </div>
      </button>
    `;
  }).join("");
  dom.chapterGrid.innerHTML = examCards + chapterCards;
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
    const isChineseQuestion = (question.subjectId || selectedSubjectId) === "chinese";
    const showTeacherButton = !selectedExamType || currentSubmitted;
    const topicText = isChineseQuestion
      ? question.chapter
      : `${question.chapter} · ${question.difficulty} · ${question.knowledgePoint}`;
    const knowledgeText = isChineseQuestion ? "本单元语文字词与阅读能力" : question.knowledgePoint;
    const optionHTML = question.options.map((option, optionIndex) => `
      <label class="option">
        <input type="radio" name="question-${questionIndex}" value="${escapeHTML(option)}">
        <span>${String.fromCharCode(65 + optionIndex)}. ${escapeHTML(option)}</span>
      </label>
    `).join("");
    return `
      <article class="question-card" data-id="${question.id}">
        <span class="topic">${escapeHTML(topicText)}</span>
        <h3 class="question-title">${questionIndex + 1}. ${escapeHTML(question.title)}</h3>
        <div class="options">${optionHTML}</div>
        ${showTeacherButton ? `<div class="question-actions">
          <button class="secondary-btn ai-explain-btn" data-id="${escapeHTML(question.id)}" data-teacher-mode="${currentSubmitted ? "full" : "hint"}" type="button">${currentSubmitted ? "AI老师讲解" : "学习提示"}</button>
        </div>` : ""}
        <p class="answer-mark"></p>
        <div class="analysis ai-teacher">
          <h4>🤖 AI老师讲解</h4>
          <p><strong>知识点：</strong>${escapeHTML(knowledgeText)}</p>
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
  const chapterResultMap = new Map();

  cards.forEach((card, index) => {
    const question = currentQuestions[index];
    const selected = card.querySelector("input[type='radio']:checked");
    const mark = card.querySelector(".answer-mark");
    const analysis = card.querySelector(".analysis");
    const studentAnswer = selected ? selected.value : "未作答";
    const isCorrect = selected && selected.value === question.answer;
    const chapterResult = chapterResultMap.get(question.chapterId) || { answered: 0, correct: 0 };
    chapterResult.answered += 1;
    if (isCorrect) chapterResult.correct += 1;
    chapterResultMap.set(question.chapterId, chapterResult);
    markQuestionCompleted(question);

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
  appData.totalAnswered += answeredCount;
  appData.totalCorrect += correctCount;
  appData.points += correctCount * 10;
  appData.lastStudyTime = formatDateTime(new Date());
  chapterResultMap.forEach((result, chapterId) => {
    const chapterStats = getChapterStats(chapterId);
    chapterStats.answered += result.answered;
    chapterStats.correct += result.correct;
  });
  recordStudySession({
    answered: answeredCount,
    correct: correctCount,
    points: correctCount * 10,
    minutes: Math.max(1, Math.ceil(answeredCount * 1.5))
  });
  updateAchievements();
  saveData();

  currentSubmitted = true;
  if (selectedExamType) {
    cards.forEach((card, index) => {
      if (card.querySelector(".question-actions")) return;
      const mark = card.querySelector(".answer-mark");
      if (!mark) return;
      mark.insertAdjacentHTML("beforebegin", `
        <div class="question-actions">
          <button class="secondary-btn ai-explain-btn" data-id="${escapeHTML(currentQuestions[index].id)}" data-teacher-mode="full" type="button">AI老师讲解</button>
        </div>
      `);
    });
    bindQuestionActionButtons(dom.quizForm, currentQuestions);
  }
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

function renderRecentMedals() {
  if (!dom.recentMedalList) return;
  updateAchievements();
  const medals = getLearningMedals()
    .filter((item) => appData.achievements[item.id])
    .sort((a, b) => String(appData.achievements[b.id]).localeCompare(String(appData.achievements[a.id])))
    .slice(0, 3);
  dom.recentMedalList.innerHTML = medals.length ? medals.map((item) => `
    <article class="medal-card earned">
      <strong>${escapeHTML(item.title)}</strong>
      <span>${escapeHTML(getMedalDescription(item))}</span>
      <small>获得时间：${escapeHTML(appData.achievements[item.id])}</small>
    </article>
  `).join("") : `<div class="empty-state">暂无勋章。连续学习、完成练习后会自动点亮。</div>`;
}

function renderStudyReport() {
  if (!dom.studyReport) return;
  const today = summarizeLogs(getDateRange("today"));
  const week = summarizeLogs(getDateRange("week"));
  const month = summarizeLogs(getDateRange("month"));
  dom.studyReport.innerHTML = [
    renderReportCard("今日", today, ["answered", "accuracy", "points", "minutes"]),
    renderReportCard("本周", week, ["answered", "accuracy", "points", "streak"]),
    renderReportCard("本月", month, ["answered", "accuracy", "points"]),
    renderWeeklySummaryCard(week)
  ].join("");
  if (dom.chapterAnalysis) dom.chapterAnalysis.innerHTML = renderChapterAnalysis() + renderChineseSpecialReport();
  if (dom.knowledgeTopList) dom.knowledgeTopList.innerHTML = renderKnowledgeTopList();
  if (dom.trendCharts) dom.trendCharts.innerHTML = renderTrendCharts();
  if (dom.parentAdvice) dom.parentAdvice.innerHTML = buildParentAdvice(week);
}

function renderWeeklySummaryCard(week) {
  const strongest = getStrongChapter();
  const weakest = getWeakReportChapter();
  return `
    <article class="report-card weekly-summary-card">
      <h3>本周学习概览</h3>
      <div class="report-line"><span>本周完成题数</span><strong>${week.answered}</strong></div>
      <div class="report-line"><span>本周正确率</span><strong>${week.accuracy}%</strong></div>
      <div class="report-line"><span>最强章节</span><strong>${strongest ? `${escapeHTML(strongest.name)} ${strongest.accuracy}%` : "暂无"}</strong></div>
      <div class="report-line"><span>最弱章节</span><strong>${weakest ? `${escapeHTML(weakest.name)} ${weakest.accuracy}%` : "暂无"}</strong></div>
    </article>
  `;
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

function renderChineseSpecialReport() {
  const chineseUnits = subjectChapters.chinese || [];
  const unitRows = chineseUnits.map((chapter) => {
    const stats = getChapterStats(chapter.id);
    const accuracy = stats.answered ? Math.round((stats.correct / stats.answered) * 100) : 0;
    const total = questionBank.filter((item) => item.subjectId === "chinese" && item.chapterId === chapter.id).length;
    const completion = getChapterCompletion(chapter.id, total);
    return { chapter, stats, accuracy, completion, wrong: countWrongByChapter(chapter.id) };
  });
  const answeredRows = unitRows.filter((item) => item.stats.answered > 0);
  const totalAnswered = unitRows.reduce((sum, item) => sum + item.stats.answered, 0);
  const totalCorrect = unitRows.reduce((sum, item) => sum + item.stats.correct, 0);
  const overallAccuracy = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const strongest = answeredRows.slice().sort((a, b) => b.accuracy - a.accuracy)[0];
  const weakest = answeredRows.slice().sort((a, b) => a.accuracy - b.accuracy)[0];
  const wrongMap = getValidWrongBook()
    .filter((item) => item.subjectId === "chinese" || String(item.chapterId || "").startsWith("chinese-u"))
    .reduce((map, item) => {
      const key = item.knowledgePoint || "未分类";
      map[key] = (map[key] || 0) + 1;
      return map;
    }, {});
  const topWrong = Object.entries(wrongMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
  return `
    <article class="analysis-card chinese-report">
      <h3>语文专项学习报告</h3>
      <strong>累计完成 ${totalAnswered} 题，正确率 ${overallAccuracy}%</strong>
      <p>最强单元：${strongest ? `${escapeHTML(strongest.chapter.name)}（${strongest.accuracy}%）` : "暂无数据"}；最弱单元：${weakest ? `${escapeHTML(weakest.chapter.name)}（${weakest.accuracy}%）` : "暂无数据"}。</p>
      <div class="chapter-mini-stats">
        ${unitRows.map((item) => `<span class="pill">${escapeHTML(item.chapter.name)} 完成度 ${item.completion}%</span>`).join("")}
      </div>
      <p>${topWrong.length ? `语文错题集中在：${topWrong.map((item) => `${escapeHTML(item[0])} ${item[1]}次`).join("、")}。建议每天选择一个薄弱专项练习 10 题。` : "完成语文练习后，会自动统计生字词、课文理解、阅读理解和单元测试的薄弱点。"}</p>
    </article>
  `;
}

function renderKnowledgeTopList() {
  const top = getTopWrongKnowledgePoints(5);
  return `
    <article class="knowledge-card">
      <h3>薄弱知识点排行榜 TOP5</h3>
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
      <h3>学习成长曲线：最近7天正确率变化</h3>
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
    subjectId: question.subjectId || selectedSubjectId,
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
  dom.wrongBookList.innerHTML = subjects.map((subject) => {
    const groups = subjectChapters[subject.id].map((chapter) => {
      const items = validWrongBook.filter((item) => item.chapterId === chapter.id);
      if (!items.length) return "";
      const cards = items.map((item, index) => `
      <article class="wrong-card">
        <span class="topic">${escapeHTML((item.subjectId || findSubjectByChapterId(item.chapterId).id) === "chinese" ? item.chapter : `${item.chapter} · ${item.difficulty || "错题"}`)}</span>
        <h3 class="wrong-title">${index + 1}. ${escapeHTML(item.title)}</h3>
        <p><strong>你的答案：</strong>${escapeHTML(item.studentAnswer)}</p>
        <p><strong>正确答案：</strong>${escapeHTML(item.answer)}</p>
        <p><strong>知识点：</strong>${escapeHTML((item.subjectId || findSubjectByChapterId(item.chapterId).id) === "chinese" ? "本单元语文字词与阅读能力" : (item.knowledgePoint || "综合练习"))}</p>
        <p><strong>详细讲解：</strong>${escapeHTML(item.explanation || item.analysis || "")}</p>
        <p><strong>常见错误：</strong>${escapeHTML(item.commonMistake || "审题不细或计算过程省略。")}</p>
        <p><strong>学习建议：</strong>${escapeHTML(item.encouragement || "认真复盘这道题，下次会更稳。")}</p>
        <p><strong>保存时间：</strong>${escapeHTML(item.time)}</p>
        <div class="question-actions">
          <button class="secondary-btn ai-explain-btn" data-id="${escapeHTML(item.id)}" type="button">AI老师讲解</button>
          <button class="secondary-btn practice-wrong" data-chapter="${item.chapterId}" type="button">重新练习</button>
        </div>
      </article>
    `).join("");
      return `<div class="wrong-group"><h3 class="wrong-group-title">${escapeHTML(chapter.name)}</h3>${cards}</div>`;
    }).join("");
    return groups ? `<div class="wrong-subject"><h3>${escapeHTML(subject.name)}错题</h3>${groups}</div>` : "";
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
  const isChineseQuestion = (question.subjectId || findSubjectByChapterId(question.chapterId).id) === "chinese";
  const topicText = isChineseQuestion
    ? (question.chapter || getChapter(question.chapterId).name)
    : `${question.chapter || getChapter(question.chapterId).name} · ${question.difficulty || "练习题"} · ${question.knowledgePoint || "综合练习"}`;
  const knowledgeText = isChineseQuestion ? "本单元语文字词与阅读能力" : (question.knowledgePoint || "综合练习");
  modal.querySelector(".teacher-modal-title").textContent = isHint ? "学习提示" : "AI老师讲解";
  modal.querySelector(".teacher-modal-body").innerHTML = isHint ? `
    <div class="teacher-question">
      <span class="topic">${escapeHTML(topicText)}</span>
      <h3>${escapeHTML(question.title || question.question)}</h3>
    </div>
    <div class="teacher-step hint-only"><strong>解题提示</strong><p>${escapeHTML(buildProblemHint(question))}</p></div>
  ` : `
    <div class="teacher-question">
      <span class="topic">${escapeHTML(topicText)}</span>
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
  const subjectId = question.subjectId || findSubjectByChapterId(question.chapterId).id;
  if (subjectId === "chinese") {
    const title = question.title || "";
    if (point.includes("生字") || title.includes("读音") || title.includes("字形") || title.includes("错别字")) {
      return "先判断考读音还是字形。读音看声调，字形比关键部件，再逐项排除。";
    }
    if (point.includes("词语") || title.includes("近义词") || title.includes("反义词") || title.includes("词语")) {
      return "先理解词语大意，再放回句子语境判断，注意近义、反义和运用区别。";
    }
    if (point.includes("课文内容")) {
      return "先回忆课文人物、事件和结果，再看选项是否与原文内容一致，避免凭印象选。";
    }
    if (point.includes("阅读理解")) {
      return "先读完整材料，圈人物、事件和情感词，再判断题目问内容、原因还是态度。";
    }
    if (point.includes("古诗文")) {
      return "先看关键词和注释，理解句子大意，再联系语境或画面判断，不按字面硬猜。";
    }
    return "先判断考字词、课文还是阅读，再回到原文或语境中找依据，逐项排除。";
  }
  if (point.includes("因数")) return "先列能整除题中数字的数，再按题目条件筛选，不急着看选项，防止漏数。";
  if (point.includes("倍数")) return "先看是否考2、3、5倍数特征，再用个位或数字和快速排除，最后核对题意。";
  if (point.includes("表面积")) return "先判断要算几个面，再套面积公式；无盖、贴墙题要少算面并检查单位。";
  if (point.includes("体积") || point.includes("容积")) return "先找长宽高，判断问体积还是容积，再注意单位换算和结果单位。";
  if (point.includes("分数")) return "先看分母是否相同，不同先通分；结果能约分时要化简，再比较选项。";
  if (point.includes("观察") || point.includes("三视图")) return "先确定观察方向，再想遮挡关系，不把平面图直接当立体个数来数。";
  if (point.includes("旋转") || point.includes("平移") || point.includes("对称")) return "先判断运动类型，再看形状、大小、方向和位置哪些改变，哪些不变。";
  if (point.includes("折线") || point.includes("统计")) return "先看横轴、纵轴和单位，再读点的位置与折线升降趋势，别漏看标题。";
  if (point.includes("单词")) return "先看关键词中文意思或类别，再比较选项词义，排除不相关词和近形词。";
  if (point.includes("句型")) return "先判断问句类型和主语，再看时态、be动词或助动词是否匹配。";
  return "根据本题所属知识点选择对应方法，优先检查概念条件、单位或语境是否匹配。";
}

function buildProblemHint(question) {
  const subjectId = question.subjectId || findSubjectByChapterId(question.chapterId).id;
  const chapterId = question.chapterId || "";
  const point = `${question.knowledgePoint || ""} ${question.title || ""}`;
  const title = question.title || question.question || "";
  const hint = subjectId === "math"
    ? buildMathProblemHint(chapterId, point, title)
    : subjectId === "chinese"
      ? buildChineseProblemHint(point, title)
      : buildEnglishProblemHint(chapterId, point, title);
  return clampHint(hint);
}

function buildMathProblemHint(chapterId, point, title) {
  if (/因数|公因数|最大公因数|质数|合数/.test(point)) {
    return "把目标数分解成能整除它的数对，再按公因数或质合数条件筛选，注意1的特殊性。";
  }
  if (/倍数|公倍数|最小公倍数|2、3、5|2倍数|3倍数|5倍数/.test(point)) {
    return "倍数题看整除特征：个位判断2和5，数字和判断3；公倍数题可从较大数的倍数试起。";
  }
  if (/分数|约分|通分|假分数|带分数|异分母|单位1/.test(point) || /fraction/.test(chapterId)) {
    return "分数题先比较分母关系：能约分先化简，异分母先找公分母，应用题要确认单位1。";
  }
  if (/长方体|正方体|表面积|体积|容积|棱长|展开图|涂色|单位换算/.test(point) || chapterId === "cube") {
    return "几何体题先分清求表面积、体积还是棱长；无盖、贴墙、换单位时要单独处理。";
  }
  if (/观察|三视图|平移|旋转|轴对称|图形/.test(point) || ["view", "motion"].includes(chapterId)) {
    return "图形题先确定观察方向或运动方式，再看形状大小是否变化，避免把位置变化当成形状变化。";
  }
  if (/统计|折线|趋势|读图/.test(point) || chapterId === "line-chart") {
    return "统计图题先看横轴、纵轴和单位，再比较点的位置与折线升降，注意题目问的是数值还是趋势。";
  }
  return "按本章核心概念判断数量关系，再选择对应公式或性质，重点检查单位和题目问法是否一致。";
}

function buildChineseProblemHint(point, title) {
  if (/生字|拼音|字形|读音|错别字/.test(point + title)) {
    return "生字题看声母、韵母、声调和关键部件，形近字要比较偏旁与笔画位置。";
  }
  if (/词语|近义词|反义词|词语理解|词语运用|成语/.test(point + title)) {
    return "词语题要放回句子语境，比较感情色彩、搭配对象和前后意思是否连贯。";
  }
  if (/课文内容|人物|情节|中心|主题/.test(point + title)) {
    return "课文题回忆人物、事件、结果和表达情感，选项若偏离原文重点就要排除。";
  }
  if (/阅读理解|短文|段落|主旨|原因|情感/.test(point + title)) {
    return "阅读题分清问内容、原因、情感还是主旨，再到对应句段找依据，不凭单个词猜。";
  }
  if (/古诗|文言|诗句|注释|杨氏之子/.test(point + title)) {
    return "古诗文题结合注释、人物语言和画面理解句意，注意古今词义可能不同。";
  }
  return "语文题要结合语境和原文依据判断，重点看题目考字词、内容理解还是阅读分析。";
}

function buildEnglishProblemHint(chapterId, point, title) {
  if (/单词|含义|拼写|分类|反义词|词形|短语|易混|音形/.test(point) || chapterId === "english-words") {
    return "单词题看词义、词形或类别；形近词要比较字母差异，词形变化注意复数、三单和现在分词。";
  }
  if (/句型|问答|be动词|时态|疑问词|介词|情态|语序|语法/.test(point) || chapterId === "english-sentences") {
    return "句型题先看问句功能、主语和时间标志，再匹配系动词、助动词、时态或固定答语。";
  }
  if (/阅读|细节|推理|主旨|信息匹配|时间信息/.test(point) || chapterId === "english-reading") {
    return "英语阅读先看问题问人物、地点、时间还是原因，再到短文对应句找同义信息。";
  }
  if (/高频单词/.test(point)) {
    return "高频单词题多考校园、天气、职业、月份和交通，注意中文意思与词性类别。";
  }
  if (/高频句型|易错语法|情景交际/.test(point) || chapterId === "english-exam") {
    return "考试高频题先判断场景或语法点，再看主语、时间词和固定搭配是否匹配。";
  }
  return "英语题先辨认考单词、句型还是阅读，再按词义、语法结构或原文信息判断。";
}

function clampHint(text) {
  const value = String(text || "").replace(/\s+/g, "").trim();
  if (value.length <= 80) return value;
  return `${value.slice(0, 78)}。`;
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
  if (dom.recentMedalList) renderRecentMedals();
  if (dom.studyReport) renderStudyReport();
  if (dom.questionManageList) renderQuestionManager();
  renderWeakRecommendation();
}

function buildDefaultQuestionBank() {
  const supplemental = getSupplementalSubjectQuestions();
  if (Array.isArray(window.V5_QUESTION_BANK) && window.V5_QUESTION_BANK.length) {
    return dedupeQuestionBank([...window.V5_QUESTION_BANK, ...supplemental].map(normalizeQuestion));
  }
  const fallbackMath = getDefaultQuestionRows().trim().split("\n").map((line, index) => {
    const [chapterId, difficulty, knowledgePoint, title, optionsText, answer, explanation] = line.split("\t");
    const chapter = getChapter(chapterId);
    return {
      id: `default-${String(index + 1).padStart(3, "0")}`,
      subjectId: "math",
      chapterId,
      chapter: chapter.name,
      difficulty,
      knowledgePoint,
      title,
      options: optionsText.split("|"),
      answer,
      explanation,
      analysis: explanation
    };
  });
  return dedupeQuestionBank([...fallbackMath, ...supplemental].map(normalizeQuestion));
}

function getSupplementalSubjectQuestions() {
  return [...buildChineseTextbookQuestions(), ...getEnglishStarterQuestions()];
}

function buildChineseTextbookQuestions() {
  const units = [
    { id: "chinese-u1", name: "第一单元", theme: "童年往事", word: "昼夜、耘田、桑树", text: "课文常借童年生活表达真情实感。", read: "阅读写童年生活的文章，要抓住人物活动和情感变化。", test: "本单元复习重点是生字词、场景描写和情感体会。" },
    { id: "chinese-u2", name: "第二单元", theme: "古典名著", word: "妒忌、擂鼓、呐喊", text: "阅读名著节选要关注人物语言、动作和性格。", read: "遇到古白话词语，可以联系上下文猜意思。", test: "本单元复习重点是人物形象、故事情节和名著常识。" },
    { id: "chinese-u3", name: "第三单元", theme: "汉字文化", word: "谜语、楷书、篆刻", text: "综合性学习要搜集资料、整理信息并清楚表达。", read: "阅读汉字材料要抓住汉字演变、字谜和谐音特点。", test: "本单元复习重点是汉字文化、资料整理和活动表达。" },
    { id: "chinese-u4", name: "第四单元", theme: "责任担当", word: "拟定、锻炼、特殊", text: "理解人物品质时，要结合具体事例分析。", read: "阅读写人文章，要找出表现人物精神的关键句。", test: "本单元复习重点是人物品质、细节描写和主题理解。" },
    { id: "chinese-u5", name: "第五单元", theme: "人物描写", word: "摔跤、欺负、喉咙", text: "人物描写可以通过动作、语言、神态表现特点。", read: "阅读人物片段时，要抓住描写方法和人物性格。", test: "本单元复习重点是描写方法、人物特点和习作迁移。" },
    { id: "chinese-u6", name: "第六单元", theme: "思维方法", word: "引荐、放肆、桅杆", text: "故事中的矛盾和办法能体现人物思维。", read: "阅读故事要梳理起因、经过、结果和解决办法。", test: "本单元复习重点是情节梳理、思维过程和道理概括。" },
    { id: "chinese-u7", name: "第七单元", theme: "异域风情", word: "威尼斯、船艄、簇拥", text: "写景文章常通过动静结合展现景物特点。", read: "阅读景物描写，要抓住地点、景物和作者感受。", test: "本单元复习重点是景物特点、表达顺序和语言品味。" },
    { id: "chinese-u8", name: "第八单元", theme: "语言智慧", word: "造诣、家禽、拇指", text: "幽默风趣的语言常含有巧妙的表达和联想。", read: "阅读幽默文章，要理解言外之意和表达效果。", test: "本单元复习重点是语言智慧、风趣表达和主旨理解。" }
  ];
  return units.flatMap((unit, index) => [
    makeQuestion("chinese", unit.id, "基础题", "生字词", `${unit.name}“${unit.word.split("、")[0]}”一类词语复习时，第一步应重点关注什么？`, ["读音和字形", "只看标点", "只数段落", "直接背答案"], "读音和字形", `${unit.name}的生字词学习要先读准音、认清形，再理解词语在课文中的意思。`, "容易只会读不会写，或只记字形不理解词义。", "把生字放回课文句子里记，会更牢固。"),
    makeQuestion("chinese", unit.id, "基础题", "课文理解", `${unit.name}围绕“${unit.theme}”学习课文时，理解课文内容最重要的方法是？`, ["抓关键词句和主要事件", "只看课文标题", "只记页码", "跳过人物表现"], "抓关键词句和主要事件", unit.text, "容易只记故事表面内容，没有结合关键词句体会主题。", "读课文时给关键句做标记，再用自己的话复述。"),
    makeQuestion("chinese", unit.id, "提高题", "阅读理解", `阅读${unit.name}相关短文，下面对作者情感理解正确的一项是？`, ["联系上下文体会", "直接忽略", "只看字数", "改成反义句"], "联系上下文体会", unit.read, "容易脱离上下文，导致理解片面。", "先找描写对象，再看作者用了哪些词表达态度。"),
    makeQuestion("chinese", unit.id, "易错题", "单元测试", `${unit.name}单元测试前，下面哪一项最适合作为复习重点？`, ["生字词、课文内容、阅读方法综合复习", "只抄一遍目录", "只做最后一题", "完全不看错题"], "生字词、课文内容、阅读方法综合复习", unit.test, "容易只复习单个知识点，忽略综合运用。", "按“字词-课文-阅读-错题”顺序复习，效率更高。")
  ]);
}

function getEnglishStarterQuestions() {
  return [
    makeQuestion("chinese", "chinese-words", "基础题", "字形辨析", "下列词语书写完全正确的一项是？", ["锻炼", "祥细", "妨拂", "焦燥"], "锻炼", "“锻炼”两个字都和训练、磨炼有关，书写正确。", "容易把“详细”写成“祥细”。", "遇到形近字，可以联系字义帮助记忆。"),
    makeQuestion("chinese", "chinese-words", "提高题", "近义词", "“端详”的近义词最恰当的是？", ["打量", "端正", "详细", "端午"], "打量", "“端详”表示仔细地看，和“打量”意思相近。", "容易被字形相近的“详细”干扰。", "判断近义词时，要把词放进句子里试一试。"),
    makeQuestion("chinese", "chinese-words", "易错题", "词语理解", "“肃然起敬”的意思是？", ["形容非常敬佩", "形容非常安静", "形容突然生气", "形容快速起立"], "形容非常敬佩", "“肃然”表示恭敬的样子，“起敬”表示产生敬意。", "容易只看“起”字误解为站起来。", "理解词语不能只拆一个字，要看整体意思。"),
    makeQuestion("chinese", "chinese-idioms", "基础题", "成语意义", "“画蛇添足”常用来比喻什么？", ["多此一举", "速度很快", "认真观察", "坚持到底"], "多此一举", "故事中给蛇添脚反而坏事，所以比喻多余的举动。", "容易只看字面，忽略寓意。", "成语要结合来源故事理解。"),
    makeQuestion("chinese", "chinese-idioms", "基础题", "成语用法", "下列句子中，“胸有成竹”使用正确的是？", ["他复习充分，考试前胸有成竹。", "这棵竹子长得胸有成竹。", "他吃饭时胸有成竹。", "雨下得胸有成竹。"], "他复习充分，考试前胸有成竹。", "“胸有成竹”表示做事前已有完整打算。", "容易把成语当普通词随意搭配。", "看成语是否和句子语境匹配。"),
    makeQuestion("chinese", "chinese-idioms", "提高题", "感情色彩", "下列成语中带有贬义色彩的是？", ["自作聪明", "坚持不懈", "全神贯注", "精益求精"], "自作聪明", "“自作聪明”指自以为聪明，通常含批评意味。", "容易忽略成语的褒贬色彩。", "积累成语时顺手标注褒义、贬义或中性。"),
    makeQuestion("chinese", "chinese-idioms", "易错题", "成语辨析", "“不耻下问”的正确理解是？", ["不以向不如自己的人请教为羞耻", "不愿意向别人请教", "问问题会让人羞耻", "只向老师提问"], "不以向不如自己的人请教为羞耻", "“耻”是以……为耻，整个成语强调虚心请教。", "容易把“不耻”误解成“不羞耻别人”。", "遇到文言色彩成语，要注意关键字含义。"),
    makeQuestion("chinese", "chinese-poems", "基础题", "诗句积累", "“春眠不觉晓”的下一句是？", ["处处闻啼鸟", "夜来风雨声", "花落知多少", "举头望明月"], "处处闻啼鸟", "这两句出自孟浩然《春晓》。", "容易把同一首诗的后几句顺序混淆。", "背古诗时按画面顺序记忆。"),
    makeQuestion("chinese", "chinese-poems", "基础题", "作者朝代", "《静夜思》的作者是？", ["李白", "杜甫", "王维", "白居易"], "李白", "《静夜思》是唐代诗人李白的代表作。", "容易混淆唐代诗人的作品。", "可以按作者建立作品清单。"),
    makeQuestion("chinese", "chinese-poems", "提高题", "诗意理解", "“独在异乡为异客”表达的主要情感是？", ["思乡怀亲", "热爱劳动", "赞美春天", "送别友人"], "思乡怀亲", "诗句写诗人独自远离家乡，表达思念亲人的情感。", "容易只翻译字面，不体会情感。", "读古诗要抓住时间、地点和人物心情。"),
    makeQuestion("chinese", "chinese-poems", "易错题", "名句理解", "“欲穷千里目，更上一层楼”告诉我们什么？", ["想看得更远要站得更高", "楼越高越危险", "千里之外没有风景", "看风景不用努力"], "想看得更远要站得更高", "诗句既写登楼，也包含不断进取的道理。", "容易只理解成登楼动作。", "名句常有表层意思和深层道理。"),
    makeQuestion("english", "english-words", "基础题", "单词含义", "Which word means “苹果”？", ["apple", "orange", "banana", "pear"], "apple", "apple 的意思是苹果。", "容易混淆水果类单词。", "把单词和图片一起记会更牢。"),
    makeQuestion("english", "english-sentences", "基础题", "日常问候", "别人说“How are you?”时，合适的回答是？", ["I'm fine, thank you.", "I'm five yuan.", "It's a book.", "Good night only."], "I'm fine, thank you.", "How are you? 是询问近况，常用 I'm fine, thank you. 回答。", "容易把 how old 和 how are you 混淆。", "常用句型要整句记忆。"),
    makeQuestion("english", "english-reading", "基础题", "阅读理解", "Tom has a red bag. What color is Tom's bag?", ["Red", "Blue", "Green", "Black"], "Red", "题干中直接说明 Tom has a red bag，所以书包是红色。", "容易忽略原文中的颜色词。", "阅读题先找关键词，再回原文定位。")
  ];
}

function getEnglishStarterQuestions() {
  return [
    makeQuestion("english", "english-words", "基础题", "单词含义", "Which word means “苹果”？", ["apple", "orange", "banana", "pear"], "apple", "apple 的意思是苹果。", "容易混淆水果类单词。", "把单词和图片一起记会更牢。"),
    makeQuestion("english", "english-sentences", "基础题", "日常问候", "别人说“How are you?”时，合适的回答是？", ["I'm fine, thank you.", "I'm five yuan.", "It's a book.", "Good night only."], "I'm fine, thank you.", "How are you? 是询问近况，常用 I'm fine, thank you. 回答。", "容易把 how old 和 how are you 混淆。", "常用句型要整句记忆。"),
    makeQuestion("english", "english-reading", "基础题", "阅读理解", "Tom has a red bag. What color is Tom's bag?", ["Red", "Blue", "Green", "Black"], "Red", "题干中直接说明 Tom has a red bag，所以书包是红色。", "容易忽略原文中的颜色词。", "阅读题先找关键词，再回原文定位。")
  ];
}

function buildChineseTextbookQuestions() {
  const units = [
    { id: "chinese-u1", name: "第一单元", theme: "童年往事", words: ["昼夜", "耘田", "桑树", "樱桃"], scene: "祖父的园子", person: "童年里的孩子", method: "抓住生活画面和真情实感", text: "《祖父的园子》" },
    { id: "chinese-u2", name: "第二单元", theme: "古典名著", words: ["妒忌", "擂鼓", "呐喊", "水寨"], scene: "草船借箭", person: "诸葛亮", method: "关注人物语言、动作和情节变化", text: "《草船借箭》" },
    { id: "chinese-u3", name: "第三单元", theme: "汉字文化", words: ["谜语", "楷书", "篆刻", "谐音"], scene: "汉字研究活动", person: "资料整理小组", method: "搜集资料、分类整理、清楚表达", text: "综合性学习：遨游汉字王国" },
    { id: "chinese-u4", name: "第四单元", theme: "责任担当", words: ["拟定", "锻炼", "特殊", "奔赴"], scene: "革命岁月", person: "有担当的人物", method: "结合具体事例体会人物品质", text: "《青山处处埋忠骨》" },
    { id: "chinese-u5", name: "第五单元", theme: "人物描写", words: ["摔跤", "欺负", "喉咙", "手疾眼快"], scene: "人物活动片段", person: "鲜活的人物", method: "分析动作、语言、神态描写", text: "人物描写一组" },
    { id: "chinese-u6", name: "第六单元", theme: "思维方法", words: ["引荐", "放肆", "桅杆", "航行"], scene: "解决难题的故事", person: "善于思考的人物", method: "梳理起因、经过、结果和办法", text: "《跳水》" },
    { id: "chinese-u7", name: "第七单元", theme: "异域风情", words: ["威尼斯", "船艄", "簇拥", "码头"], scene: "威尼斯小艇", person: "异域生活中的人们", method: "抓住景物特点和表达顺序", text: "《威尼斯的小艇》" },
    { id: "chinese-u8", name: "第八单元", theme: "语言智慧", words: ["造诣", "家禽", "拇指", "附庸"], scene: "幽默语言情境", person: "机智表达的人", method: "体会言外之意和表达效果", text: "《杨氏之子》" }
  ];
  const difficulties = ["基础题", "基础题", "基础题", "提高题", "提高题", "提高题", "易错题", "易错题", "提高题", "易错题"];
  const templates = {
    "生字词": [
      (u) => [`${u.name}字音辨析：读“${u.words[0]}”时，最应先确认哪一项？`, ["读音是否准确", "段落是否最长", "插图是否鲜艳", "题目是否很短"], "读音是否准确", `学习“${u.words[0]}”要先读准字音，再放入课文语境理解。`, "只看字形不读音，容易在朗读和默写中出错。", "先读准，再写对，最后会运用。"],
      (u) => [`${u.name}字形辨析：“${u.words[1]}”书写正确的一项是？`, [u.words[1], "祥细", "焦燥", "拔弄"], u.words[1], `“${u.words[1]}”是本单元词语，书写时要看清字形。`, "形近字容易混淆，要看清关键部件。", "把易错部件圈出来，默写会更稳。"],
      (u) => [`${u.name}词语理解：理解“${u.words[2]}”这类词语，最好放在哪里判断意思？`, ["课文句子中", "作业本封面上", "目录页里", "标点符号旁"], "课文句子中", "词语意义常和上下文有关，放回句子里更准确。", "脱离语境解释词语，容易理解片面。", "遇到词语先找它所在的句子。"],
      (u) => [`${u.name}近义词训练：判断词语近义关系时，最可靠的方法是？`, ["放进同一句话替换试读", "只比较字数", "只看第一个字", "按笔画多少判断"], "放进同一句话替换试读", "近义词意思接近，但使用场景也要合适。", "只看字面相似，可能把无关词当近义词。", "替换后句子通顺，意思基本不变，才更可靠。"],
      (u) => [`${u.name}反义词训练：找反义词时，应重点比较什么？`, ["词语表达的意思方向", "词语是否押韵", "词语是否很长", "词语所在页码"], "词语表达的意思方向", "反义词表示相反或相对的意思，要看语义方向。", "只看字形相反不一定是真正反义。", "先说清词义，再找相反意思。"],
      (u) => [`${u.name}词语运用：下列句子中“${u.words[3]}”使用恰当的一项是？`, ["看它常和哪些词一起出现", "把所有词随便连起来", "只选最长的词", "只看标点"], "看它常和哪些词一起出现", "词语要放在合适语境中使用。", "随意使用词语会造成句子别扭。", "读完整个句子，检查表达是否通顺。"],
      (u) => [`${u.name}多音字复习：遇到多音字，最应该依据什么确定读音？`, ["所在词语和句意", "字写得大不大", "是不是在第一段", "旁边有没有逗号"], "所在词语和句意", "多音字读音由词语和句意决定，不能孤立判断。", "看到熟字就按常见读音读，可能读错。", "把多音字整理成词语组记忆。"],
      (u) => [`${u.name}形近字辨析：区别两个形近字时，最有效的是？`, ["看不同部件并联系意思", "只看字的颜色", "只数横画", "看谁更常见"], "看不同部件并联系意思", "形近字要找不同部件，再联系字义区分。", "只靠模糊印象容易写错别字。", "给形近字各组一个词，辨析更清楚。"],
      (u) => [`${u.name}语境填词：下列词语填入句子最恰当的一项是？`, ["读完整个句子", "直接选第一个词", "只看括号", "先看答案长度"], "读完整个句子", "语境填词要先读懂句子表达的意思。", "没读完句子就填，常会忽略前后提示。", "把填入的词再读一遍，检查是否通顺。"],
      (u) => [`${u.name}词语积累：复习“${u.theme}”相关词语时，哪种整理方式更清楚？`, ["按意思分类记录", "按铅笔颜色记录", "随机写在角落", "只写一个字"], "按意思分类记录", "按人物、景物、动作、情感等分类，复习更有条理。", "只堆在一起背，容易记混。", "给词语分类，就是在帮大脑建文件夹。"]
    ],
    "课文理解": [
      (u) => [`${u.name}主要内容：概括${u.text}时，最应抓住什么？`, ["人物、事件和结果", "课本页码", "插图边框", "生字数量"], "人物、事件和结果", "概括课文要抓主要人物、发生的事和结果。", "把所有细节都写进去，会让概括过长。", "用一句话说清“谁做了什么，结果怎样”。"],
      (u) => [`${u.name}人物品质：分析“${u.person}”时，应主要依据什么？`, ["具体事例和言行", "名字长短", "所在段落序号", "课文标题颜色"], "具体事例和言行", "人物品质要从语言、动作、神态和事件中分析。", "脱离事例空喊品质，答案不够有说服力。", "每说一个品质，配一个证据。"],
      (u) => [`${u.name}关键句理解：课文中反复出现或表达情感的句子通常有什么作用？`, ["提示主题或情感", "增加字数", "替代标点", "说明作者忘记删"], "提示主题或情感", "关键句往往帮助理解文章中心和作者情感。", "看到熟悉句子就跳过，容易错过主题。", "遇到关键句可以画线并写旁批。"],
      (u) => [`${u.name}写作顺序：理清${u.scene}的描写，最适合先找什么？`, ["时间、地点或事情发展线索", "每行字数", "标点数量", "生字表位置"], "时间、地点或事情发展线索", "写作顺序常藏在时间词、地点变化或事情发展中。", "只按自然段机械分，不一定能看出结构。", "先找线索，再分层次。"],
      (u) => [`${u.name}表达情感：体会${u.theme}主题时，要重点关注哪些词句？`, ["描写感受和态度的词句", "所有数字", "目录标题", "页脚"], "描写感受和态度的词句", "情感常通过描写和议论性句子表达出来。", "只看故事情节，不一定能体会作者心情。", "读到情感词时停一下，想想作者为什么这样写。"],
      (u) => [`${u.name}标题作用：课文标题一般可以帮助我们了解什么？`, ["主要内容或主题线索", "练习册价格", "铅笔品牌", "课桌高度"], "主要内容或主题线索", "标题常提示文章对象、内容或主题。", "只记标题不读正文，仍然不能真正理解文章。", "预习时先根据标题提出问题。"],
      (u) => [`${u.name}细节描写：判断一个细节是否重要，最好看它是否能表现什么？`, ["人物特点或文章中心", "纸张厚度", "字体大小", "页码单双"], "人物特点或文章中心", "重要细节常服务于人物形象和中心思想。", "把所有细节都看成同等重要，会抓不住重点。", "问自己：这个细节说明了什么？"],
      (u) => [`${u.name}中心思想：归纳中心思想时，不能只做哪件事？`, ["照抄一个自然段", "联系全文", "结合人物表现", "关注作者情感"], "照抄一个自然段", "中心思想要综合全文内容和情感，不能机械照抄。", "只摘一句话，可能漏掉文章真正表达。", "中心思想通常包含内容和情感两部分。"],
      (u) => [`${u.name}段落作用：开头段常见的作用是什么？`, ["引出内容或奠定情感基调", "结束全文", "列答案", "替代题目"], "引出内容或奠定情感基调", "开头常引出描写对象、设置情境或表达情感。", "把开头段只当普通内容，容易漏掉结构作用。", "分析段落作用时，从内容和结构两方面想。"],
      (u) => [`${u.name}课文内容：下列对本单元课文表达理解正确的一项是？`, ["结合课文例子说明", "只写“很好”", "不看文本", "只写作者名字"], "结合课文例子说明", `${u.method}需要回到具体课文内容中分析。`, "只写结论没有依据，容易丢分。", "答案里带上课文依据，会更完整。"]
    ],
    "阅读理解": [
      (u) => [`${u.name}信息提取：阅读短文找答案时，第一步通常是？`, ["回到原文定位关键词", "直接猜一个", "只看最后一段", "先看选项长短"], "回到原文定位关键词", "多数信息题能在原文找到依据。", "凭印象答题容易漏掉细节。", "圈出题干关键词，再去文中找。"],
      (u) => [`${u.name}情感体会：判断作者情感时，要综合哪些内容？`, ["描写对象、用词和上下文", "页码和字体", "题目编号", "插图大小"], "描写对象、用词和上下文", "情感体会不能只看一个词，要结合上下文。", "孤立理解一句话，容易误判情感。", "把句子前后各读一遍，答案更稳。"],
      (u) => [`${u.name}词句含义：解释文中句子含义时，最关键的是？`, ["联系上下文和文章主题", "照抄字典", "只改标点", "删掉主语"], "联系上下文和文章主题", "句子在文章中的含义常比字面更深。", "只解释字面，容易答得浅。", "先说表层意思，再想深层含义。"],
      (u) => [`${u.name}概括段意：概括一段话时，哪种答案更合适？`, ["简洁写出本段主要意思", "逐句照抄整段", "只写第一个字", "只写标点"], "简洁写出本段主要意思", "段意要简洁、完整，抓住本段中心。", "照抄太长，不能体现概括能力。", "找中心句或合并几句话的意思。"],
      (u) => [`${u.name}原因推断：题目问“为什么”时，应优先寻找什么？`, ["文中的原因提示和前后联系", "题号大小", "答案字数", "插图颜色"], "文中的原因提示和前后联系", "原因往往藏在事情前后变化中。", "只凭生活经验答，可能偏离文章。", "先找“因为、所以、原来”等提示词。"],
      (u) => [`${u.name}表达赏析：赏析一句描写时，回答重点应包括什么？`, ["写法和表达效果", "字数和页码", "铅笔颜色", "段落序号"], "写法和表达效果", "赏析题要说明用了什么写法、表现了什么。", "只说“写得好”没有具体分析。", "按“写法+内容+效果”组织答案。"],
      (u) => [`${u.name}词语理解：下列对文中词语理解不正确的一项是？`, ["脱离文章随便猜", "读前后句", "看所在语境", "结合主题"], "脱离文章随便猜", "上下文能提供词义线索。", "脱离文本会让答案不准确。", "先别急着查答案，前后文常有提示。"],
      (u) => [`${u.name}人物变化：分析人物前后变化，应比较什么？`, ["前后言行和心理", "页码变化", "标点数量", "题目颜色"], "前后言行和心理", "人物变化通常通过言行和心理表现出来。", "只看一个片段，可能看不出变化过程。", "画出前后两处描写再比较。"],
      (u) => [`${u.name}景物特点：阅读写景短文时，概括景物特点要看什么？`, ["描写景物的关键词", "题号", "纸张边缘", "作者姓氏笔画"], "描写景物的关键词", "写景文章常用形容词和具体描写体现特点。", "只写“很美”太笼统。", "找颜色、声音、形态、动态等描写。"],
      (u) => [`${u.name}开放表达：回答阅读开放题时，怎样更容易得高分？`, ["观点明确并结合文本说明", "只写一个词", "完全离开文章", "照抄选项"], "观点明确并结合文本说明", "开放题也要有文本依据，观点要清楚。", "只写感受没有理由，答案不完整。", "先表态，再用文中内容说明理由。"]
    ],
    "单元测试": [
      (u) => [`${u.name}字词综合：单元测试复习生字词，最完整的顺序是？`, ["读准音、写对形、理解义、会运用", "只看一遍", "只抄题号", "只背答案"], "读准音、写对形、理解义、会运用", "字词掌握包括音、形、义和运用。", "只会读不会写，测试中仍会失分。", "用四步法检查字词，漏洞会少很多。"],
      (u) => [`${u.name}课文综合：复习${u.text}时，应该把哪几项联系起来？`, ["内容、人物、主题和表达方法", "页码、封面、颜色", "题号、铅笔、橡皮", "字体、边框、插图"], "内容、人物、主题和表达方法", "课文综合题常同时考内容理解和表达方法。", "只背故事，不理解写法，遇到综合题会吃力。", "复习课文时做一张小思维导图。"],
      (u) => [`${u.name}阅读综合：做阅读题前，最合理的做法是？`, ["先通读短文，再带题回文定位", "只看选项", "先写答案再读文", "跳过题干"], "先通读短文，再带题回文定位", "通读能了解整体，定位能保证依据准确。", "没读懂文章就答题，容易答偏。", "阅读题按“读文-审题-定位-作答”来。"],
      (u) => [`${u.name}积累运用：积累的词句在答题中应怎样使用？`, ["符合语境地运用", "越多越好地堆砌", "随便插入", "只写不解释"], "符合语境地运用", "积累词句要服务表达，不能生硬堆砌。", "乱用好词好句会让表达不自然。", "先想句子意思，再选合适积累。"],
      (u) => [`${u.name}句子训练：下列病句修改正确的一项是？`, ["读懂句子找问题", "直接删一半", "只换标点", "只看最后一个字"], "读懂句子找问题", "修改病句要先判断是搭配、重复、缺成分还是语序问题。", "不找病因就修改，可能越改越错。", "改完后再读一遍，看是否通顺。"],
      (u) => [`${u.name}主题理解：判断单元主题“${u.theme}”，应结合什么？`, ["多篇课文的共同点", "封面颜色", "课桌位置", "练习页数"], "多篇课文的共同点", "单元主题通常由多篇课文共同体现。", "只看一篇课文，可能概括不全面。", "把几篇课文放在一起比较共同点。"],
      (u) => [`${u.name}易错辨析：考试后整理错题，最重要的是写清什么？`, ["错误原因和正确思路", "今天温度", "铅笔品牌", "错题所在页边颜色"], "错误原因和正确思路", "错题本要帮助下次不再错，所以要记录原因和方法。", "只抄题不分析，复习效果有限。", "错题本里的每一道题都在提醒你进步方向。"],
      (u) => [`${u.name}文学常识：下列课文、作者或出处对应正确的一项是？`, ["按单元建立对应表", "随机写在草稿纸上", "只记第一个字", "完全不复习"], "按单元建立对应表", "对应表能把课文、作者、主题连起来。", "零散记忆容易混淆。", "把常识整理成表格，考前看一遍很高效。"],
      (u) => [`${u.name}表达运用：下列习作片段最符合本单元表达特点的一项是？`, ["选择合适的生活材料", "直接抄课文", "只写标题", "不分段"], "选择合适的生活材料", "表达运用要结合具体内容，不是照搬原文。", "照抄课文不是真正会表达。", "想清材料，再选择动作、语言、景物等写法。"],
      (u) => [`${u.name}综合提升：完成单元测试后，最值得复盘的是？`, ["错题类型和薄弱专项", "试卷颜色", "桌面是否整齐", "题号字体"], "错题类型和薄弱专项", "复盘能发现是字词、课文、阅读还是综合运用薄弱。", "只看分数不看原因，下次容易重复失分。", "每次测试后给自己列一个小改进目标。"]
    ]
  };
  return units.flatMap((unit) => Object.entries(templates).flatMap(([moduleName, makers]) => makers.map((maker, index) => {
    const [title, options, answer, explanation, commonMistake, encouragement] = maker(unit);
    return makeQuestion("chinese", unit.id, difficulties[index], moduleName, title, options, answer, explanation, commonMistake, encouragement);
  })));
}

function buildChineseTextbookQuestions() {
  const units = [
    { id: "chinese-u1", name: "第一单元", theme: "童年往事", text: "《祖父的园子》", person: "祖父", place: "园子", feeling: "自由、快乐和怀念", words: [["昼夜", "zhou ye"], ["耘田", "yun tian"], ["桑树", "sang shu"], ["樱桃", "ying tao"], ["承认", "cheng ren"]], near: ["明晃晃", "亮堂堂"], anti: ["新鲜", "陈旧"], phrase: "童年生活", event: "“我”在园子里跟着祖父劳作、玩耍", passage: "园子里有蜜蜂、蝴蝶、蜻蜓，样样都有生机。祖父在园子里劳动，“我”也跟着东一脚西一脚地玩。" },
    { id: "chinese-u2", name: "第二单元", theme: "古典名著", text: "《草船借箭》", person: "诸葛亮", place: "江面", feeling: "机智沉着", words: [["妒忌", "du ji"], ["擂鼓", "lei gu"], ["呐喊", "na han"], ["水寨", "shui zhai"], ["弓弩", "gong nu"]], near: ["推却", "推辞"], anti: ["齐全", "短缺"], phrase: "神机妙算", event: "诸葛亮利用大雾向曹操借箭", passage: "江上雾很大，鲁肃看不清虚实。诸葛亮命人擂鼓呐喊，曹操不敢轻易出兵，只叫弓弩手射箭。" },
    { id: "chinese-u3", name: "第三单元", theme: "汉字文化", text: "综合性学习：遨游汉字王国", person: "活动小组", place: "班级展示区", feeling: "热爱汉字文化", words: [["谜语", "mi yu"], ["楷书", "kai shu"], ["篆刻", "zhuan ke"], ["谐音", "xie yin"], ["外甥", "wai sheng"]], near: ["有趣", "风趣"], anti: ["规范", "潦草"], phrase: "汉字演变", event: "同学们搜集资料，展示汉字的趣味和历史", passage: "汉字有悠久的历史。一个字的字形变化，常常记录着古人的生活和想象，也让我们感受到中华文化的丰富。" },
    { id: "chinese-u4", name: "第四单元", theme: "责任担当", text: "《青山处处埋忠骨》", person: "毛主席", place: "办公室", feeling: "悲痛而坚定", words: [["拟定", "ni ding"], ["锻炼", "duan lian"], ["特殊", "te shu"], ["奔赴", "ben fu"], ["眷恋", "juan lian"]], near: ["踌躇", "犹豫"], anti: ["特殊", "普通"], phrase: "若有所思", event: "毛主席面对亲人牺牲，作出艰难决定", passage: "秘书将电报放在桌上，屋里很安静。毛主席沉默了很久，既有父亲的悲痛，也有领袖的胸怀。" },
    { id: "chinese-u5", name: "第五单元", theme: "人物描写", text: "人物描写一组", person: "小嘎子", place: "摔跤场面", feeling: "机灵好胜", words: [["摔跤", "shuai jiao"], ["欺负", "qi fu"], ["喉咙", "hou long"], ["手疾眼快", "shou ji yan kuai"], ["脚腕", "jiao wan"]], near: ["破绽", "漏洞"], anti: ["灵活", "笨拙"], phrase: "精神抖擞", event: "人物在动作和神态中显出鲜明性格", passage: "他围着对手转了几圈，眼睛盯着对方的脚下，身子一晃，立刻伸手去钩。" },
    { id: "chinese-u6", name: "第六单元", theme: "思维方法", text: "《跳水》", person: "船长", place: "甲板", feeling: "沉着果断", words: [["引荐", "yin jian"], ["放肆", "fang si"], ["桅杆", "wei gan"], ["航行", "hang xing"], ["吓唬", "xia hu"]], near: ["放肆", "放纵"], anti: ["镇定", "慌张"], phrase: "哭笑不得", event: "船长在危急时刻逼孩子跳水脱险", passage: "孩子站在高高的横木上，下面的人都吓坏了。船长举起枪，果断命令孩子跳到海里。" },
    { id: "chinese-u7", name: "第七单元", theme: "异域风情", text: "《威尼斯的小艇》", person: "船夫", place: "威尼斯", feeling: "赞美独特风情", words: [["威尼斯", "wei ni si"], ["船艄", "chuan shao"], ["簇拥", "cu yong"], ["码头", "ma tou"], ["祷告", "dao gao"]], near: ["闻名", "著名"], anti: ["簇拥", "散开"], phrase: "操纵自如", event: "小艇成为威尼斯重要的交通工具", passage: "小艇穿过一座座桥，船夫操纵自如。白天城里很热闹，夜晚水面又渐渐沉寂下来。" },
    { id: "chinese-u8", name: "第八单元", theme: "语言智慧", text: "《杨氏之子》", person: "杨氏之子", place: "待客场景", feeling: "机智幽默", words: [["造诣", "zao yi"], ["家禽", "jia qin"], ["拇指", "mu zhi"], ["附庸", "fu yong"], ["窈窕", "yao tiao"]], near: ["机敏", "机智"], anti: ["渺小", "伟大"], phrase: "养尊处优", event: "孩子用巧妙语言回应客人的玩笑", passage: "孔君平指着杨梅说这是君家果。孩子不慌不忙地回答，既有礼貌，又显出机敏。" }
  ];
  const categories = ["拼音", "字形", "近义词", "反义词", "词语理解", "词语运用", "课文内容", "阅读理解", "单元测试"];
  const broadKnowledge = {
    "拼音": "生字",
    "字形": "生字",
    "近义词": "词语",
    "反义词": "词语",
    "词语理解": "词语",
    "词语运用": "词语",
    "课文内容": "课文内容",
    "阅读理解": "阅读理解",
    "单元测试": "单元测试"
  };
  const difficultyOf = (index) => index < 4 ? "基础题" : index < 8 ? "提高题" : "易错题";
  const pick = (list, index) => list[index % list.length];
  const makeOptions = (answer, others) => [answer, ...others].slice(0, 4);
  const builders = {
    "拼音": (u, i) => {
      const word = pick(u.words, i);
      const other = pick(u.words, i + 1);
      const titles = [
        `下列词语中，“${word[0]}”的读音正确的一项是？`,
        `给加点词“${word[0]}”选择正确读音。`,
        `下列读音完全正确的一项是？`,
        `“${word[0]}”在课文词语中的正确读音是？`
      ];
      const wrongs = [`${word[0]}（${other[1]}）`, `${word[0]}（${word[1].replace(/[aeiou]/, "a")}）`, `${word[0]}（${word[1].split(" ").reverse().join(" ")}）`];
      return [pick(titles, i), makeOptions(`${word[0]}（${word[1]}）`, wrongs), `${word[0]}（${word[1]}）`, `“${word[0]}”应读作 ${word[1]}，声母、韵母和声调都要读准确。`, "容易把形近字或常见字的读音套用到这个词上。", "读准字音是理解课文的第一步。"];
    },
    "字形": (u, i) => {
      const word = pick(u.words, i)[0];
      const typo = word.length > 1 ? `${word[0]}${pick(["祥", "燥", "拔", "竟", "厉"], i)}` : `${word}错`;
      const titles = [
        `下列词语书写完全正确的一项是？`,
        `下面没有错别字的一项是？`,
        `选择“${word}”书写正确的一项。`,
        `下列词语中，字形正确的是？`
      ];
      return [pick(titles, i), makeOptions(word, [typo, `${pick(u.words, i + 1)[0]}误`, `${pick(u.words, i + 2)[0]}错`]), word, `“${word}”是本单元要求掌握的词语，书写时要看清每个字的部件。`, "常见错误是把形近字写混，或漏写关键笔画。", "把易错字单独圈出来，多写两遍就会更稳。"];
    },
    "近义词": (u, i) => {
      const titles = [`“${u.near[0]}”的近义词最恰当的一项是？`, `下列词语中，与“${u.near[0]}”意思最接近的是？`, `选择“${u.near[0]}”的近义词。`];
      return [pick(titles, i), makeOptions(u.near[1], [u.anti[1], pick(u.words, i)[0], u.phrase]), u.near[1], `“${u.near[0]}”和“${u.near[1]}”意思相近，可以在相近语境中替换。`, "容易被字形相近但意思不同的词干扰。", "理解词义后再选近义词，准确率会更高。"];
    },
    "反义词": (u, i) => {
      const titles = [`“${u.anti[0]}”的反义词是？`, `下列词语中，与“${u.anti[0]}”意思相反的是？`, `选择“${u.anti[0]}”的反义词。`];
      return [pick(titles, i), makeOptions(u.anti[1], [u.near[1], pick(u.words, i)[0], u.phrase]), u.anti[1], `“${u.anti[1]}”与“${u.anti[0]}”意思相反，符合反义词关系。`, "容易把近义词误选成反义词。", "先说清原词意思，再找相反意思。"];
    },
    "词语理解": (u, i) => {
      const titles = [`“${u.phrase}”在本单元语境中的意思最接近哪一项？`, `联系${u.text}，理解“${u.phrase}”正确的一项是？`, `下列对“${u.phrase}”的理解正确的是？`];
      const answer = `${u.theme}相关的重要词语，表达了${u.feeling}`;
      return [pick(titles, i), makeOptions(answer, [`侧重表现${u.person}的外貌特点`, `主要写${u.place}的环境变化`, `强调事情发生的先后顺序`]), answer, `“${u.phrase}”要结合${u.name}的主题“${u.theme}”理解，不能只看字面。`, "只拆开单个字解释，可能偏离词语整体含义。", "把词语放回课文句子里，意思会更清楚。"];
    },
    "词语运用": (u, i) => {
      const word = i % 2 === 0 ? u.phrase : u.near[0];
      const answer = `${u.text}中，${u.person}的表现可以用“${word}”来形容。`;
      const titles = [`下列句子中，“${word}”使用恰当的一项是？`, `选择词语“${word}”运用正确的一句。`, `下面句子中，词语使用正确的是？`];
      return [pick(titles, i), makeOptions(answer, [`描写${u.place}时，可以用“${word}”概括全部内容。`, `读到${u.text}标题，就一定能判断“${word}”的意思。`, `${u.name}所有课文都直接写出了“${word}”这个词。`]), answer, `这个句子把“${word}”放在与${u.theme}相关的语境中，意思通顺。`, "词语意思和句子内容不匹配时，就是使用不当。", "读完整个句子，检查词语和前后内容是否一致。"];
    },
    "课文内容": (u, i) => {
      const titles = [`关于${u.text}，下列说法正确的一项是？`, `下列对${u.text}理解正确的一项是？`, `根据${u.text}，选择正确说法。`];
      const answer = `${u.event}。`;
      return [pick(titles, i), makeOptions(answer, [`课文重点描写${u.place}，但没有展开主要事件。`, `${u.person}的表现与${u.theme}关系不大。`, `文章主要通过议论文的方式直接说明道理。`]), answer, `${u.text}围绕${u.event}展开，体现了${u.theme}这一单元主题。`, "没有读清主要事件，容易被无关选项干扰。", "抓住人物、地点和事件，课文内容题就不难。"];
    },
    "阅读理解": (u, i) => {
      const titles = [`阅读片段：${u.passage} 这段话主要表现了什么？`, `阅读短文后判断，最恰当的一项是？${u.passage}`, `根据阅读材料，选择理解正确的一项。${u.passage}`];
      const answer = `表现了${u.theme}中${u.feeling}的特点。`;
      return [pick(titles, i), makeOptions(answer, [`侧重说明${u.place}的来历和名称`, `主要突出${u.person}外貌描写的变化`, `只是在交代事情发生的时间`]), answer, `片段中的人物、场景和关键词都指向“${u.theme}”，表达出${u.feeling}。`, "只看个别词语，不结合整段，会造成理解偏差。", "阅读题要从原文里找依据。"];
    },
    "单元测试": (u, i) => {
      const titles = [`综合检测：下列说法正确的一项是？`, `综合检测：选择正确答案。`, `结合本单元内容，判断正确的一项。`];
      const answer = `${u.name}围绕“${u.theme}”安排课文和练习，重点考查字词、课文内容和阅读理解。`;
      return [pick(titles, i), makeOptions(answer, [`${u.name}主要考查课外古诗背诵，不涉及课文内容。`, `${u.name}只需要掌握${u.text}标题，不需要理解内容。`, `${u.name}重点只在字形辨析，不考阅读理解。`]), answer, `单元测试通常综合考查拼音、字形、词语、课文内容和阅读理解。`, "只复习单一题型，综合测试时容易失分。", "按题型逐项检查，能发现自己的薄弱点。"];
    }
  };
  return units.flatMap((unit) => categories.flatMap((category) => Array.from({ length: 10 }, (_, index) => {
    const [title, options, answer, explanation, commonMistake, encouragement] = builders[category](unit, index);
    return makeQuestion("chinese", unit.id, difficultyOf(index), broadKnowledge[category], title, options, answer, explanation, commonMistake, encouragement);
  })));
}

function buildDefaultQuestionBank() {
  const legacyMath = Array.isArray(window.V5_QUESTION_BANK) ? window.V5_QUESTION_BANK : [];
  return dedupeQuestionBank([
    ...legacyMath,
    ...buildExamHighFrequencyQuestions(),
    ...buildChineseTextbookQuestions()
  ].map(normalizeQuestion));
}

function buildExamHighFrequencyQuestions() {
  return [
    ...buildMathExamQuestions(),
    ...buildChinesePoemExamQuestions(),
    ...buildEnglishFormalQuestions(),
    ...buildEnglishExamQuestions()
  ];
}

function makeExamQuestion(subjectId, chapterId, difficulty, knowledgePoint, frequency, examTypes, title, options, answer, explanation, commonMistake, encouragement) {
  return {
    ...makeQuestion(subjectId, chapterId, difficulty, knowledgePoint, title, options, answer, explanation, commonMistake, encouragement),
    frequency,
    examTypes
  };
}

function buildMathExamQuestions() {
  const rows = [
    ["factor", "基础题", "因数与倍数", "高频", "期中真题常考：36的因数中，既是3的倍数又是偶数的是哪一组？", ["6、12、18、36", "3、6、9、12", "2、4、8、16", "1、3、9、27"], "6、12、18、36", "先列36的因数，再筛选能被3整除且个位是偶数的数。"],
    ["factor", "基础题", "2、3、5倍数特征", "高频", "期中填空改编：三位数47□同时是2和5的倍数，□里应填几？", ["0", "2", "5", "8"], "0", "同时是2和5的倍数，个位必须是0。"],
    ["factor", "提高题", "最大公因数", "高频", "期中应用题：把24个苹果和36个梨平均分给若干小组，每组苹果、梨都同样多，最多能分几组？", ["6组", "8组", "12组", "24组"], "12组", "最多组数是24和36的最大公因数，最大公因数是12。"],
    ["factor", "提高题", "最小公倍数", "高频", "期中真题：跑道旁每6米插一面红旗，每8米插一面蓝旗，从起点开始，多少米处两种旗再次重合？", ["12米", "18米", "24米", "48米"], "24米", "再次重合位置是6和8的最小公倍数，最小公倍数是24。"],
    ["factor", "易错题", "质数合数", "易错", "期中易错：下面说法正确的是哪一项？", ["1既不是质数也不是合数", "所有奇数都是质数", "所有偶数都是合数", "质数没有因数"], "1既不是质数也不是合数", "1只有一个因数，不符合质数和合数的定义。"],
    ["factor", "易错题", "公因数", "易错", "期中选择：18和30的公因数共有几个？", ["2个", "4个", "6个", "8个"], "4个", "18和30的公因数是1、2、3、6，共4个。"],
    ["cube", "基础题", "表面积", "高频", "期中真题：一个长方体长8cm、宽5cm、高3cm，它的表面积是多少？", ["158平方厘米", "120平方厘米", "79平方厘米", "240平方厘米"], "158平方厘米", "表面积=2×(8×5+8×3+5×3)=158平方厘米。"],
    ["cube", "基础题", "体积", "高频", "期中真题：一个长方体长10dm、宽6dm、高4dm，体积是多少？", ["20立方分米", "120立方分米", "240立方分米", "480立方分米"], "240立方分米", "长方体体积=长×宽×高=10×6×4=240立方分米。"],
    ["cube", "提高题", "容积", "高频", "期中应用：一个无盖水槽长12dm、宽5dm、高4dm，最多能装水多少升？", ["120升", "200升", "240升", "300升"], "240升", "容积=12×5×4=240立方分米=240升。"],
    ["cube", "提高题", "棱长总和", "中频", "期中检测：长方体长7cm、宽4cm、高3cm，棱长总和是多少？", ["14cm", "28cm", "56cm", "84cm"], "56cm", "棱长总和=4×(7+4+3)=56cm。"],
    ["cube", "易错题", "单位换算", "易错", "期中易错：3.5立方米等于多少立方分米？", ["35立方分米", "350立方分米", "3500立方分米", "35000立方分米"], "3500立方分米", "1立方米=1000立方分米，所以3.5立方米=3500立方分米。"],
    ["cube", "易错题", "展开图", "易错", "期中易错：判断正方体展开图时，最需要避免哪种情况？", ["6个面连在一起", "有4个面排成一行", "折叠后两个面重合", "每个面都是正方形"], "折叠后两个面重合", "展开图能否折成正方体，关键看折叠后6个面不重合且能围成封闭体。"],
    ["fraction", "基础题", "分数意义", "高频", "期中真题：把3米长的绳子平均分成5段，每段是全长的几分之几？", ["1/5", "3/5", "1/3", "5/3"], "1/5", "求每段占全长的几分之几，看平均分成5段，每段是1/5。"],
    ["fraction", "基础题", "约分", "高频", "期中常考：把18/24约成最简分数是？", ["3/4", "6/8", "9/12", "2/3"], "3/4", "18和24的最大公因数是6，分子分母同时除以6得3/4。"],
    ["fraction", "提高题", "通分", "高频", "期中检测：比较5/6和7/9的大小，正确的是？", ["5/6>7/9", "5/6<7/9", "5/6=7/9", "无法比较"], "5/6>7/9", "通分为15/18和14/18，所以5/6>7/9。"],
    ["fraction", "易错题", "假分数带分数", "易错", "期中易错：17/5化成带分数是？", ["2又5/7", "3又2/5", "3又5/2", "4又1/5"], "3又2/5", "17÷5=3余2，所以17/5=3又2/5。"],
    ["fraction-add", "基础题", "异分母分数加减", "高频", "期末真题：1/3+1/4的结果是？", ["2/7", "7/12", "1/12", "1/2"], "7/12", "先通分，1/3=4/12，1/4=3/12，和为7/12。"],
    ["fraction-add", "提高题", "分数混合运算", "高频", "期末检测：5/6-1/3+1/2等于多少？", ["1", "2/3", "5/6", "7/6"], "1", "1/3=2/6，1/2=3/6，5/6-2/6+3/6=6/6=1。"],
    ["fraction-add", "易错题", "单位1", "易错", "期末易错：一根彩带用去2/5，还剩几分之几？", ["2/5", "3/5", "5/5", "7/5"], "3/5", "整根彩带是单位1，剩下1-2/5=3/5。"],
    ["motion", "基础题", "旋转", "高频", "期末真题：钟面上分针从12走到3，顺时针旋转了多少度？", ["30°", "60°", "90°", "180°"], "90°", "钟面一大格是30°，12到3有3大格，3×30°=90°。"],
    ["motion", "基础题", "轴对称", "高频", "期末常考：下面图形中，对称轴最多的是？", ["长方形", "正方形", "等腰三角形", "平行四边形"], "正方形", "正方形有4条对称轴，长方形有2条，等腰三角形通常有1条。"],
    ["motion", "提高题", "平移", "中频", "期末检测：图形向右平移6格后，每个对应点移动了几格？", ["1格", "3格", "6格", "12格"], "6格", "平移时图形上每个点移动的方向和距离都相同。"],
    ["motion", "易错题", "旋转方向", "易错", "期末易错：图形旋转后，不变的是哪一项？", ["位置", "方向", "形状和大小", "所在方格"], "形状和大小", "旋转改变位置和方向，不改变图形的形状和大小。"],
    ["view", "基础题", "观察物体", "中频", "期末选择：从正面看到一行3个小正方形，从左面看到一行1个，可能的摆法是？", ["3个横排成一行", "3个竖直叠放", "3个前后排成一列", "摆成2层"], "3个横排成一行", "正面看到3个、左面看到1个，说明横向排成一行。"],
    ["line-chart", "基础题", "折线统计图", "中频", "期末真题：折线统计图最适合表示哪类情况？", ["数量多少的排列", "部分与整体关系", "数量随时间变化", "图形面积大小"], "数量随时间变化", "折线统计图能清楚表示数据的增减变化趋势。"]
  ];
  return rows.map(([chapterId, difficulty, knowledgePoint, frequency, title, options, answer, explanation]) =>
    makeExamQuestion("math", chapterId, difficulty, knowledgePoint, frequency, ["unit", "midterm", "final"], title, options, answer, explanation, "容易没有分清本题考查的数量关系，直接套错公式。", "考试题按知识点选择公式或性质，会更稳。")
  );
}

function buildChinesePoemExamQuestions() {
  const poems = [
    ["chinese-u1", "基础题", "古诗文", "高频", "期中真题：“童孙未解供耕织，也傍桑阴学种瓜”描写的是哪种画面？", ["儿童学着大人劳动", "诗人夜晚思乡", "送别朋友", "描写边塞风光"], "儿童学着大人劳动"],
    ["chinese-u2", "基础题", "古诗文", "高频", "期中常考：阅读古典名著节选时，判断人物形象主要依据什么？", ["人物言行和情节", "页码多少", "插图颜色", "字数长短"], "人物言行和情节"],
    ["chinese-u4", "提高题", "古诗文", "中频", "期中检测：“青山处处埋忠骨，何须马革裹尸还”表达的主要情感是？", ["舍小家为大家的胸怀", "赞美春天景色", "表现儿童天真", "说明路途遥远"], "舍小家为大家的胸怀"],
    ["chinese-u8", "基础题", "古诗文", "高频", "期末真题：《杨氏之子》中，孩子回答巧妙，主要妙在哪里？", ["顺着对方的话机智回应", "直接否认对方", "大声争辩", "转移话题"], "顺着对方的话机智回应"],
    ["chinese-u8", "易错题", "古诗文", "易错", "期末易错：“未闻孔雀是夫子家禽”中的“未闻”意思是？", ["没有听说", "不能闻到", "不想听见", "已经听说"], "没有听说"]
  ];
  return poems.map(([chapterId, difficulty, knowledgePoint, frequency, title, options, answer]) =>
    makeExamQuestion("chinese", chapterId, difficulty, knowledgePoint, frequency, ["unit", "midterm", "final"], title, options, answer, "古诗文题要结合注释、人物语言和上下文理解。", "容易只按现代字面意思理解文言词。", "遇到文言句，先抓关键词，再联系上下文。")
  );
}

function buildEnglishExamQuestions() {
  const rows = [
    ["english-words", "基础题", "单词", "高频", "期末真题：Which word means “图书馆”？", ["library", "hospital", "cinema", "kitchen"], "library", "library 的意思是图书馆。"],
    ["english-words", "基础题", "单词", "高频", "期末常考：Which word is a kind of food?", ["bread", "river", "window", "music"], "bread", "bread 是食物类单词。"],
    ["english-words", "易错题", "单词", "易错", "期末易错：Which word is opposite to hot?", ["cold", "warm", "sunny", "big"], "cold", "hot 的反义词是 cold。"],
    ["english-sentences", "基础题", "句型", "高频", "期末真题：别人问“What would you like?”，合适回答是？", ["I'd like some rice.", "I am ten.", "It is Monday.", "She is my sister."], "I'd like some rice.", "What would you like? 询问想要什么。"],
    ["english-sentences", "基础题", "句型", "高频", "期中常考：询问星期几，应说哪一句？", ["What day is it today?", "How old are you?", "Where is my book?", "What color is it?"], "What day is it today?", "What day is it today? 用来询问今天星期几。"],
    ["english-sentences", "易错题", "句型", "易错", "期末易错：There ___ two books on the desk.", ["is", "are", "am", "be"], "are", "two books 是复数，be动词用 are。"],
    ["english-reading", "提高题", "阅读理解", "高频", "期末阅读：Tom goes to school at 7:30. When does Tom go to school?", ["At 7:30", "At 6:30", "At 8:00", "At 9:00"], "At 7:30", "短文直接给出 Tom goes to school at 7:30。"],
    ["english-reading", "提高题", "阅读理解", "高频", "期末阅读：Lucy has a cat. It is white. What color is the cat?", ["White", "Black", "Brown", "Blue"], "White", "原文 It is white 说明猫是白色。"],
    ["english-reading", "易错题", "阅读理解", "易错", "期末易错：Mike likes football, but he doesn't like basketball. What doesn't Mike like?", ["Football", "Basketball", "Ping-pong", "Swimming"], "Basketball", "doesn't like 表示不喜欢，后面是 basketball。"],
    ["english-words", "基础题", "单词", "高频", "期中真题：Which word means “星期三”？", ["Wednesday", "Monday", "Friday", "Sunday"], "Wednesday", "Wednesday 的意思是星期三。"],
    ["english-words", "基础题", "单词", "高频", "期中常考：Which word is an animal?", ["tiger", "desk", "ruler", "bread"], "tiger", "tiger 是动物类单词。"],
    ["english-words", "提高题", "单词", "中频", "期末检测：Which word is about weather?", ["rainy", "rice", "train", "shirt"], "rainy", "rainy 表示多雨的，属于天气词。"],
    ["english-words", "易错题", "单词", "易错", "期末易错：Which one is plural?", ["boxes", "box", "book", "bus"], "boxes", "boxes 是 box 的复数形式。"],
    ["english-sentences", "基础题", "句型", "高频", "期中真题：How do you ask someone's age?", ["How old are you?", "How are you?", "What are you doing?", "Where are you?"], "How old are you?", "How old are you? 用来询问年龄。"],
    ["english-sentences", "基础题", "句型", "高频", "期末常考：选择正确句子。", ["She likes apples.", "She like apples.", "She liking apples.", "She likes apple are."], "She likes apples.", "主语 She 是第三人称单数，动词 like 要加 s。"],
    ["english-sentences", "提高题", "句型", "中频", "期末检测：What are you doing? 的正确回答是？", ["I am reading.", "I read yesterday.", "I can read.", "I like reading."], "I am reading.", "What are you doing? 问正在做什么，用现在进行时回答。"],
    ["english-sentences", "易错题", "句型", "易错", "期末易错：He ___ play football on Sundays.", ["doesn't", "don't", "isn't", "aren't"], "doesn't", "主语 He 是第三人称单数，否定助动词用 doesn't。"],
    ["english-reading", "提高题", "阅读理解", "高频", "期中阅读：Amy has breakfast at seven. What does Amy do at seven?", ["Has breakfast", "Goes home", "Reads books", "Plays football"], "Has breakfast", "原文 has breakfast at seven 说明七点吃早饭。"],
    ["english-reading", "提高题", "阅读理解", "高频", "期末阅读：There are four people in Jack's family. How many people are there?", ["Four", "Three", "Five", "Six"], "Four", "原文 There are four people 直接给出人数。"],
    ["english-reading", "易错题", "阅读理解", "易错", "期末易错：Lily can swim, but she can't skate. What can't Lily do?", ["Skate", "Swim", "Run", "Sing"], "Skate", "can't skate 表示不会滑冰。"],
    ["english-reading", "提高题", "阅读理解", "中频", "期末阅读：The schoolbag is under the chair. Where is the schoolbag?", ["Under the chair", "On the desk", "In the box", "Behind the door"], "Under the chair", "under the chair 表示在椅子下面。"],
    ["english-words", "基础题", "单词", "高频", "期末真题：Which word means “医生”？", ["doctor", "driver", "teacher", "farmer"], "doctor", "doctor 的意思是医生。"],
    ["english-sentences", "基础题", "句型", "高频", "期末常考：Can you play ping-pong? 的肯定回答是？", ["Yes, I can.", "Yes, I do.", "No, I am.", "I like it."], "Yes, I can.", "Can 开头的一般疑问句，肯定回答用 Yes, I can。"],
    ["english-reading", "易错题", "阅读理解", "易错", "期末阅读：Ben usually walks to school. How does Ben usually go to school?", ["On foot", "By car", "By bus", "By bike"], "On foot", "walks to school 表示步行上学，也就是 on foot。"]
  ];
  return rows.map(([chapterId, difficulty, knowledgePoint, frequency, title, options, answer, explanation]) =>
    makeExamQuestion("english", chapterId, difficulty, knowledgePoint, frequency, ["unit", "midterm", "final"], title, options, answer, explanation, "容易忽略问句中的关键词或否定词。", "先找题干关键词，再回到原句定位。")
  );
}

function buildEnglishFormalQuestions() {
  return [
    ...buildEnglishWordQuestions(),
    ...buildEnglishSentenceQuestions(),
    ...buildEnglishReadingQuestions(),
    ...buildEnglishHighFrequencyQuestions()
  ];
}

function buildEnglishWordQuestions() {
  const rows = [
    ["单词含义", "Which word means “周末”？", ["weekend", "weekday", "Wednesday", "weather"], "weekend", "weekend 表示周末，常出现在周末活动类题目中。"],
    ["单词含义", "Which word means “博物馆”？", ["museum", "market", "mountain", "music"], "museum", "museum 的意思是博物馆，常与 visit 连用。"],
    ["单词含义", "Which word means “健康的”？", ["healthy", "hungry", "heavy", "happy"], "healthy", "healthy 表示健康的，注意和 hungry 的拼写区别。"],
    ["单词含义", "Which word means “邀请”？", ["invite", "inside", "interest", "invent"], "invite", "invite 表示邀请，常见搭配 invite sb. to...。"],
    ["单词含义", "Which word means “特别的”？", ["special", "straight", "strong", "strict"], "special", "special 表示特别的、特殊的。"],
    ["单词含义", "Which word means “安静的”？", ["quiet", "quick", "quite", "queen"], "quiet", "quiet 表示安静的，quite 表示相当。"],
    ["单词含义", "Which word means “桥”？", ["bridge", "building", "bread", "brush"], "bridge", "bridge 的意思是桥。"],
    ["单词含义", "Which word means “季节”？", ["season", "second", "science", "subject"], "season", "season 表示季节，spring、summer 等都属于 season。"],
    ["单词含义", "Which word means “旅行”？", ["trip", "tree", "train", "trick"], "trip", "trip 表示旅行，常见 a school trip。"],
    ["单词含义", "Which word means “计划”？", ["plan", "plant", "plane", "plate"], "plan", "plan 表示计划，plant 是植物或种植。"],
    ["拼写辨析", "Choose the correct spelling of “星期二”.", ["Tuesday", "Tusday", "Tuseday", "Thuesday"], "Tuesday", "Tuesday 是星期二的正确拼写。"],
    ["拼写辨析", "Choose the correct spelling of “二月”.", ["February", "Febrary", "Febuary", "Feburary"], "February", "February 中间有 ruary，拼写较易错。"],
    ["拼写辨析", "Choose the correct spelling of “早餐”.", ["breakfast", "brekfast", "breakfrist", "brakfast"], "breakfast", "breakfast 是早餐，注意中间是 break。"],
    ["拼写辨析", "Choose the correct spelling of “图书馆”.", ["library", "libary", "librery", "liberry"], "library", "library 是图书馆，常见漏写 r 的错误。"],
    ["拼写辨析", "Choose the correct spelling of “明天”.", ["tomorrow", "tommorow", "tomorow", "tommorrow"], "tomorrow", "tomorrow 是明天，注意双 r。"],
    ["拼写辨析", "Choose the correct spelling of “蔬菜”.", ["vegetable", "vegtable", "vegetabel", "vegtible"], "vegetable", "vegetable 是蔬菜，词较长，注意中间 e。"],
    ["拼写辨析", "Choose the correct spelling of “因为”.", ["because", "becase", "becuase", "beacuse"], "because", "because 表示因为，注意 au 顺序。"],
    ["拼写辨析", "Choose the correct spelling of “最喜欢的”.", ["favourite", "favorate", "favouirte", "faverite"], "favourite", "favourite 表示最喜欢的。"],
    ["拼写辨析", "Choose the correct spelling of “天气”.", ["weather", "whether", "wether", "wheather"], "weather", "weather 表示天气，whether 表示是否。"],
    ["拼写辨析", "Choose the correct spelling of “厨房”.", ["kitchen", "kichen", "kitten", "kithcen"], "kitchen", "kitchen 表示厨房。"],
    ["词性分类", "Which word is a month?", ["April", "Friday", "winter", "morning"], "April", "April 是月份，Friday 是星期。"],
    ["词性分类", "Which word is a season?", ["autumn", "August", "Sunday", "noon"], "autumn", "autumn 是季节。"],
    ["词性分类", "Which word is a subject?", ["science", "sandwich", "station", "season"], "science", "science 是学科。"],
    ["词性分类", "Which word is a place?", ["cinema", "clean", "clever", "cloudy"], "cinema", "cinema 是电影院，表示地点。"],
    ["词性分类", "Which word is a drink?", ["juice", "jacket", "jump", "July"], "juice", "juice 是饮料。"],
    ["词性分类", "Which word is a sport?", ["basketball", "bathroom", "breakfast", "blackboard"], "basketball", "basketball 是运动项目。"],
    ["词性分类", "Which word is a job?", ["nurse", "north", "noise", "night"], "nurse", "nurse 是护士，表示职业。"],
    ["词性分类", "Which word is an animal?", ["horse", "house", "homework", "holiday"], "horse", "horse 是动物。"],
    ["词性分类", "Which word is a family member?", ["aunt", "art", "autumn", "answer"], "aunt", "aunt 是姑母、姨母等亲属称呼。"],
    ["词性分类", "Which word is about weather?", ["cloudy", "clock", "classroom", "clean"], "cloudy", "cloudy 表示多云的天气。"],
    ["反义词", "Which word is opposite to “early”?", ["late", "left", "little", "light"], "late", "early 早的，反义词是 late 晚的。"],
    ["反义词", "Which word is opposite to “before”?", ["after", "again", "about", "above"], "after", "before 之前，after 之后。"],
    ["反义词", "Which word is opposite to “dirty”?", ["clean", "close", "clever", "cold"], "clean", "dirty 脏的，clean 干净的。"],
    ["反义词", "Which word is opposite to “strong”?", ["weak", "warm", "wrong", "wide"], "weak", "strong 强壮的，weak 虚弱的。"],
    ["反义词", "Which word is opposite to “cheap”?", ["expensive", "excited", "excellent", "early"], "expensive", "cheap 便宜的，expensive 昂贵的。"],
    ["反义词", "Which word is opposite to “full”?", ["hungry", "funny", "fresh", "friendly"], "hungry", "full 饱的，hungry 饿的。"],
    ["反义词", "Which word is opposite to “different”?", ["same", "safe", "slow", "small"], "same", "different 不同的，same 相同的。"],
    ["反义词", "Which word is opposite to “easy”?", ["difficult", "delicious", "different", "dangerous"], "difficult", "easy 容易的，difficult 困难的。"],
    ["反义词", "Which word is opposite to “open”?", ["close", "clean", "come", "carry"], "close", "open 打开，close 关闭。"],
    ["反义词", "Which word is opposite to “left”?", ["right", "ready", "river", "road"], "right", "left 左边，right 右边。"],
    ["词形变化", "What is the plural form of “child”?", ["children", "childs", "childes", "childrens"], "children", "child 的复数是 children，不是直接加 s。"],
    ["词形变化", "What is the plural form of “tooth”?", ["teeth", "tooths", "toothes", "toothies"], "teeth", "tooth 的复数是 teeth。"],
    ["词形变化", "What is the plural form of “tomato”?", ["tomatoes", "tomatos", "tomatoies", "tomato"], "tomatoes", "tomato 复数加 es。"],
    ["词形变化", "What is the plural form of “bus”?", ["buses", "bus", "buss", "buseses"], "buses", "bus 以 s 结尾，复数加 es。"],
    ["词形变化", "What is the -ing form of “run”?", ["running", "runing", "runs", "ran"], "running", "run 变现在分词要双写 n 再加 ing。"],
    ["词形变化", "What is the -ing form of “make”?", ["making", "makeing", "makes", "made"], "making", "make 去 e 加 ing。"],
    ["词形变化", "What is the third person singular of “go”?", ["goes", "gos", "going", "went"], "goes", "主语是第三人称单数时，go 变 goes。"],
    ["词形变化", "What is the third person singular of “study”?", ["studies", "studys", "studying", "studied"], "studies", "study 以辅音字母+y 结尾，变 y 为 i 加 es。"],
    ["词形变化", "What is the past form of “see”?", ["saw", "seed", "seen", "sees"], "saw", "see 的过去式是 saw。"],
    ["词形变化", "What is the past form of “eat”?", ["ate", "eated", "eats", "eating"], "ate", "eat 的过去式是 ate。"],
    ["固定搭配", "Which phrase means “起床”？", ["get up", "go up", "look up", "put up"], "get up", "get up 表示起床。"],
    ["固定搭配", "Which phrase means “做作业”？", ["do homework", "make homework", "write housework", "play homework"], "do homework", "do homework 是做作业的固定搭配。"],
    ["固定搭配", "Which phrase means “上英语课”？", ["have an English class", "make an English class", "play English class", "go English class"], "have an English class", "have a class 表示上课。"],
    ["固定搭配", "Which phrase means “去购物”？", ["go shopping", "do shopping", "make shopping", "play shopping"], "go shopping", "go shopping 表示去购物。"],
    ["固定搭配", "Which phrase means “听音乐”？", ["listen to music", "listen music", "hear to music", "look music"], "listen to music", "listen to 是固定搭配。"],
    ["固定搭配", "Which phrase means “照相”？", ["take photos", "make photos", "do photos", "draw photos"], "take photos", "take photos 表示拍照。"],
    ["固定搭配", "Which phrase means “乘公交车”？", ["by bus", "on bus", "take bus only", "with bus"], "by bus", "by bus 表示乘公交车。"],
    ["固定搭配", "Which phrase means “擅长”？", ["be good at", "be good in", "be nice at", "be fine with"], "be good at", "be good at 表示擅长。"],
    ["固定搭配", "Which phrase means “寻找”？", ["look for", "look at", "look after", "look like"], "look for", "look for 表示寻找。"],
    ["固定搭配", "Which phrase means “照顾”？", ["look after", "look for", "look at", "look out"], "look after", "look after 表示照顾。"],
    ["语境选词", "It's raining. Take your ___, please.", ["umbrella", "sunglasses", "crayon", "ticket"], "umbrella", "下雨要带 umbrella 雨伞。"],
    ["语境选词", "We can borrow books from the ___.", ["library", "playground", "kitchen", "farm"], "library", "借书的地点是 library。"],
    ["语境选词", "My father works in a hospital. He is a ___.", ["doctor", "driver", "farmer", "singer"], "doctor", "在医院工作且符合选项的是 doctor。"],
    ["语境选词", "I am thirsty. I want some ___.", ["water", "bread", "rice", "noodles"], "water", "thirsty 表示口渴，应选择饮品。"],
    ["语境选词", "The first month of a year is ___.", ["January", "June", "July", "September"], "January", "一年中的第一个月是 January。"],
    ["语境选词", "We usually plant trees on Tree Planting Day in ___.", ["March", "May", "October", "December"], "March", "植树节通常在 March。"],
    ["语境选词", "A ___ has black and white stripes.", ["zebra", "panda", "tiger", "horse"], "zebra", "zebra 有黑白条纹。"],
    ["语境选词", "The room is dark. Please turn on the ___.", ["light", "fan", "computer", "window"], "light", "房间暗时应开灯。"],
    ["语境选词", "We can see many stars at ___.", ["night", "noon", "morning", "breakfast"], "night", "星星通常在夜晚可见。"],
    ["语境选词", "My birthday is in winter. It may be very ___.", ["cold", "hot", "rainbow", "fresh"], "cold", "冬天天气通常 cold。"],
    ["易混单词", "Which word means “穿；戴”?", ["wear", "where", "were", "water"], "wear", "wear 表示穿戴，where 表示哪里。"],
    ["易混单词", "Which word means “他们的”?", ["their", "there", "they're", "then"], "their", "their 是形容词性物主代词。"],
    ["易混单词", "Which word means “右边；正确的”?", ["right", "write", "white", "light"], "right", "right 可表示右边或正确的。"],
    ["易混单词", "Which word means “太；也”?", ["too", "two", "to", "toe"], "too", "too 表示也或太，two 是数字二。"],
    ["易混单词", "Which word means “眼睛”?", ["eye", "I", "ear", "egg"], "eye", "eye 是眼睛，I 是我。"],
    ["易混单词", "Which word means “看见”?", ["see", "sea", "say", "sit"], "see", "see 表示看见，sea 是大海。"],
    ["易混单词", "Which word means “知道”?", ["know", "no", "now", "new"], "know", "know 表示知道，no 表示不。"],
    ["易混单词", "Which word means “小时”?", ["hour", "our", "house", "horse"], "hour", "hour 表示小时，our 表示我们的。"],
    ["易混单词", "Which word means “买”?", ["buy", "by", "bye", "boy"], "buy", "buy 表示买。"],
    ["易混单词", "Which word means “写”?", ["write", "right", "white", "winter"], "write", "write 表示写。"],
    ["短语理解", "“on the left” means ___.", ["在左边", "在右边", "在中间", "在上面"], "在左边", "left 表示左边。"],
    ["短语理解", "“next to the cinema” means ___.", ["在电影院旁边", "在电影院里面", "在电影院后面", "离电影院很远"], "在电影院旁边", "next to 表示紧挨着、在旁边。"],
    ["短语理解", "“a lot of books” means ___.", ["许多书", "一本书", "没有书", "旧书"], "许多书", "a lot of 表示许多。"],
    ["短语理解", "“half past seven” means ___.", ["七点半", "六点半", "七点十五", "八点整"], "七点半", "half past seven 表示七点半。"],
    ["短语理解", "“a pair of shoes” means ___.", ["一双鞋", "一件衬衫", "一条裤子", "一顶帽子"], "一双鞋", "a pair of 常用于成双物品。"],
    ["短语理解", "“on foot” means ___.", ["步行", "乘船", "骑车", "坐飞机"], "步行", "on foot 表示步行。"],
    ["短语理解", "“in front of the house” means ___.", ["在房子前面", "在房子后面", "在房子里面", "在房子下面"], "在房子前面", "in front of 表示在前面。"],
    ["短语理解", "“at the weekend” means ___.", ["在周末", "在早晨", "在星期一", "在夜里"], "在周末", "weekend 表示周末。"],
    ["短语理解", "“have a fever” means ___.", ["发烧", "头痛", "咳嗽", "牙疼"], "发烧", "have a fever 表示发烧。"],
    ["短语理解", "“take a message” means ___.", ["捎口信", "拍照片", "坐公交", "做实验"], "捎口信", "take a message 表示捎口信。"],
    ["音形辨析", "Which word has the same beginning sound as “chair”?", ["chicken", "school", "ship", "city"], "chicken", "chair 和 chicken 都以 ch 音开头。"],
    ["音形辨析", "Which word has the same beginning sound as “ship”?", ["shirt", "chair", "cheap", "clock"], "shirt", "ship 和 shirt 都以 sh 音开头。"],
    ["音形辨析", "Which word has the same ending sound as “cake”?", ["lake", "cat", "class", "clock"], "lake", "cake 和 lake 结尾发音相近。"],
    ["音形辨析", "Which word has the same vowel sound as “bike”?", ["like", "big", "milk", "fish"], "like", "bike 和 like 中 i 发音相同。"],
    ["音形辨析", "Which word has the same vowel sound as “home”?", ["nose", "hot", "box", "shop"], "nose", "home 和 nose 中 o 的发音相同。"],
    ["音形辨析", "Which word has the same vowel sound as “see”?", ["tree", "bed", "egg", "pen"], "tree", "see 和 tree 中 ee 发音相同。"],
    ["音形辨析", "Which word has the same vowel sound as “book”?", ["cook", "food", "room", "school"], "cook", "book 和 cook 中 oo 发音相同。"],
    ["音形辨析", "Which word has the same ending sound as “day”?", ["play", "desk", "dog", "duck"], "play", "day 和 play 结尾发音相近。"],
    ["音形辨析", "Which word starts with the sound /tr/?", ["train", "chair", "shirt", "bread"], "train", "train 以 /tr/ 音开头。"],
    ["音形辨析", "Which word starts with the sound /dr/?", ["draw", "tree", "chair", "sleep"], "draw", "draw 以 /dr/ 音开头。"]
  ];
  return rows.map((row, index) => englishQuestion("english-words", row, index, ["unit", "midterm", "final"]));
}

function buildEnglishSentenceQuestions() {
  const rows = [
    ["情景问答", "别人说 Thank you. 你应回答：", ["You're welcome.", "I'm sorry.", "Good night.", "Here you are."], "You're welcome.", "Thank you 的常用答语是 You're welcome."],
    ["情景问答", "别人问 How old are you? 合适回答是：", ["I'm eleven.", "I'm fine.", "It's red.", "It's Monday."], "I'm eleven.", "How old 询问年龄。"],
    ["情景问答", "别人问 What day is it today? 合适回答是：", ["It's Friday.", "It's sunny.", "It's five yuan.", "It's blue."], "It's Friday.", "What day 询问星期几。"],
    ["情景问答", "别人问 What's the weather like? 合适回答是：", ["It's windy.", "It's a pencil.", "I'm ten.", "She is my aunt."], "It's windy.", "weather like 询问天气。"],
    ["情景问答", "别人问 Can I help you? 在商店里合适回答是：", ["Yes, I want a coat.", "Yes, I can swim.", "No, I'm not a teacher.", "It is under the desk."], "Yes, I want a coat.", "Can I help you? 在购物场景中表示需要帮助吗。"],
    ["情景问答", "别人问 What would you like? 合适回答是：", ["I'd like some noodles.", "I like Mondays.", "I can dance.", "I am reading."], "I'd like some noodles.", "What would you like? 询问想要什么。"],
    ["情景问答", "别人问 Whose book is this? 合适回答是：", ["It's mine.", "It's Monday.", "It's rainy.", "It's ten o'clock."], "It's mine.", "Whose 询问物品归属。"],
    ["情景问答", "别人问 How do you go to school? 合适回答是：", ["By bike.", "At seven.", "In May.", "With my mother."], "By bike.", "How do you go... 询问交通方式。"],
    ["情景问答", "别人问 When is your birthday? 合适回答是：", ["It's in June.", "It's a cake.", "It's near the door.", "It's yellow."], "It's in June.", "When 询问时间。"],
    ["情景问答", "别人问 Where is the museum? 合适回答是：", ["It's beside the park.", "It's very kind.", "It's my ruler.", "It's cloudy."], "It's beside the park.", "Where 询问地点。"],
    ["be动词", "There ___ a clock on the wall.", ["is", "are", "am", "be"], "is", "a clock 是单数，there be 句型用 is。"],
    ["be动词", "There ___ many flowers in the garden.", ["are", "is", "am", "be"], "are", "many flowers 是复数，用 are。"],
    ["be动词", "I ___ a student in Grade Five.", ["am", "is", "are", "be"], "am", "主语 I 搭配 am。"],
    ["be动词", "My parents ___ at home now.", ["are", "is", "am", "be"], "are", "parents 是复数，用 are。"],
    ["be动词", "The milk ___ on the table.", ["is", "are", "am", "be"], "is", "milk 在这里不可数，用 is。"],
    ["be动词", "These shoes ___ too small.", ["are", "is", "am", "be"], "are", "these shoes 是复数。"],
    ["be动词", "He ___ good at football.", ["is", "are", "am", "be"], "is", "He 是第三人称单数，用 is。"],
    ["be动词", "You ___ late for school.", ["are", "is", "am", "be"], "are", "You 搭配 are。"],
    ["be动词", "The children ___ in the classroom.", ["are", "is", "am", "be"], "are", "children 是复数，用 are。"],
    ["be动词", "This pair of socks ___ blue.", ["is", "are", "am", "be"], "is", "this pair 作主语时按单数处理。"],
    ["一般现在时", "She ___ English every morning.", ["reads", "read", "reading", "to read"], "reads", "主语 She 是第三人称单数，动词加 s。"],
    ["一般现在时", "Tom ___ TV on Sundays.", ["watches", "watch", "watching", "watched"], "watches", "Tom 是第三人称单数，watch 加 es。"],
    ["一般现在时", "My brother ___ to school by bus.", ["goes", "go", "going", "went"], "goes", "My brother 是第三人称单数，go 变 goes。"],
    ["一般现在时", "They ___ football after school.", ["play", "plays", "playing", "played"], "play", "They 是复数主语，动词用原形。"],
    ["一般现在时", "We ___ lunch at twelve.", ["have", "has", "having", "had"], "have", "We 作主语，have 用原形。"],
    ["一般现在时", "My mother ___ very well.", ["cooks", "cook", "cooking", "cooked"], "cooks", "My mother 是第三人称单数。"],
    ["一般现在时", "The cat ___ fish.", ["likes", "like", "liking", "liked"], "likes", "The cat 是第三人称单数。"],
    ["一般现在时", "I ___ my room on Saturdays.", ["clean", "cleans", "cleaning", "cleaned"], "clean", "主语 I 后动词用原形。"],
    ["一般现在时", "He ___ his homework after dinner.", ["does", "do", "doing", "did"], "does", "He 后 do 变 does。"],
    ["一般现在时", "The girl ___ a red dress.", ["wears", "wear", "wearing", "wore"], "wears", "The girl 是第三人称单数。"],
    ["现在进行时", "Look! The boys ___ basketball.", ["are playing", "play", "plays", "played"], "are playing", "Look 常提示正在进行，用 be doing。"],
    ["现在进行时", "Listen! Mary ___ a song.", ["is singing", "sings", "sing", "sang"], "is singing", "Listen 提示动作正在发生。"],
    ["现在进行时", "They ___ a kite in the park now.", ["are flying", "fly", "flies", "flew"], "are flying", "now 提示现在进行时。"],
    ["现在进行时", "I ___ my homework now.", ["am doing", "do", "does", "did"], "am doing", "I 搭配 am doing。"],
    ["现在进行时", "The dog ___ under the tree.", ["is sleeping", "sleep", "sleeps", "slept"], "is sleeping", "主语 The dog 是单数，用 is doing。"],
    ["现在进行时", "We ___ English in the classroom.", ["are learning", "learn", "learns", "learned"], "are learning", "We 搭配 are doing。"],
    ["现在进行时", "My father ___ dinner now.", ["is cooking", "cooks", "cook", "cooked"], "is cooking", "now 表示正在做饭。"],
    ["现在进行时", "The students ___ books quietly.", ["are reading", "read", "reads", "readed"], "are reading", "students 是复数，用 are reading。"],
    ["现在进行时", "What ___ you doing?", ["are", "is", "am", "be"], "are", "you 搭配 are。"],
    ["现在进行时", "Who ___ cleaning the blackboard?", ["is", "are", "am", "be"], "is", "who 作主语询问单个人时常用 is。"],
    ["一般过去时", "Yesterday I ___ to the zoo.", ["went", "go", "goes", "going"], "went", "yesterday 提示一般过去时，go 的过去式是 went。"],
    ["一般过去时", "Last night she ___ a storybook.", ["read", "reads", "reading", "reader"], "read", "last night 提示过去，read 过去式拼写相同。"],
    ["一般过去时", "We ___ many photos on the trip.", ["took", "take", "takes", "taking"], "took", "take photos 的过去式是 took photos。"],
    ["一般过去时", "He ___ football yesterday afternoon.", ["played", "plays", "play", "playing"], "played", "yesterday afternoon 提示过去时。"],
    ["一般过去时", "They ___ a big dinner last Sunday.", ["had", "have", "has", "having"], "had", "have 的过去式是 had。"],
    ["一般过去时", "My mother ___ a new coat yesterday.", ["bought", "buy", "buys", "buying"], "bought", "buy 的过去式是 bought。"],
    ["一般过去时", "The children ___ happy at the party.", ["were", "was", "are", "is"], "were", "children 是复数，过去时 be 动词用 were。"],
    ["一般过去时", "It ___ rainy yesterday.", ["was", "were", "is", "are"], "was", "It 是单数，过去时用 was。"],
    ["一般过去时", "Did you ___ your grandparents?", ["visit", "visited", "visits", "visiting"], "visit", "Did 后动词用原形。"],
    ["一般过去时", "She didn't ___ TV last night.", ["watch", "watched", "watches", "watching"], "watch", "didn't 后动词用原形。"],
    ["一般将来时", "I ___ visit my uncle tomorrow.", ["will", "am", "do", "was"], "will", "tomorrow 提示将来时，可用 will do。"],
    ["一般将来时", "They are going to ___ a picnic.", ["have", "has", "had", "having"], "have", "be going to 后接动词原形。"],
    ["一般将来时", "She will ___ a new song.", ["sing", "sings", "singing", "sang"], "sing", "will 后动词用原形。"],
    ["一般将来时", "We ___ going to play chess.", ["are", "is", "am", "be"], "are", "We 搭配 are going to。"],
    ["一般将来时", "What will you ___ this evening?", ["do", "does", "doing", "did"], "do", "will 后接动词原形。"],
    ["一般将来时", "He is going to ___ his bike.", ["ride", "rides", "riding", "rode"], "ride", "is going to 后用动词原形。"],
    ["一般将来时", "There ___ be a football match tomorrow.", ["will", "is", "are", "was"], "will", "There will be 表示将会有。"],
    ["一般将来时", "Will it ___ sunny tomorrow?", ["be", "is", "are", "was"], "be", "will 后 be 动词用原形 be。"],
    ["一般将来时", "I won't ___ late again.", ["be", "am", "is", "was"], "be", "won't 后接动词原形。"],
    ["一般将来时", "Are you going to ___ your room?", ["clean", "cleans", "cleaned", "cleaning"], "clean", "be going to 后用动词原形。"],
    ["疑问词", "___ is your new teacher? Miss Li.", ["Who", "Where", "When", "What colour"], "Who", "回答是人，疑问词用 Who。"],
    ["疑问词", "___ do you live? In Beijing.", ["Where", "Who", "When", "Whose"], "Where", "回答地点，用 Where。"],
    ["疑问词", "___ do you get up? At 6:30.", ["When", "What", "Who", "Which"], "When", "回答时间点，用 When。"],
    ["疑问词", "___ book is this? It's Tom's.", ["Whose", "Who", "Where", "Why"], "Whose", "回答归属，用 Whose。"],
    ["疑问词", "___ do you like winter? Because I can skate.", ["Why", "Where", "Who", "What"], "Why", "Because 回答原因，对应 Why。"],
    ["疑问词", "___ season do you like best?", ["Which", "Where", "Whose", "When"], "Which", "在多个季节中选择，用 Which。"],
    ["疑问词", "___ are the shoes? They are 80 yuan.", ["How much", "How many", "How old", "How long"], "How much", "询问价格用 How much。"],
    ["疑问词", "___ apples are there? Six.", ["How many", "How much", "How old", "How far"], "How many", "询问可数名词数量用 How many。"],
    ["疑问词", "___ is your father? He is a doctor.", ["What", "Where", "When", "Which"], "What", "询问职业常用 What is...。"],
    ["疑问词", "___ does the boy go home? By bus.", ["How", "Who", "What", "When"], "How", "回答交通方式，用 How。"],
    ["介词短语", "The ball is ___ the box. You can't see it.", ["in", "on", "under", "beside"], "in", "看不见且在盒子里面，用 in。"],
    ["介词短语", "The picture is ___ the wall.", ["on", "in", "under", "between"], "on", "挂在墙上用 on the wall。"],
    ["介词短语", "The cat is ___ the door and the window.", ["between", "behind", "above", "under"], "between", "两者之间用 between。"],
    ["介词短语", "The shop is ___ the school, so we can walk there quickly.", ["near", "far from", "under", "inside"], "near", "能很快走到，说明 near。"],
    ["介词短语", "My birthday is ___ May.", ["in", "on", "at", "to"], "in", "月份前用 in。"],
    ["介词短语", "We have English ___ Monday.", ["on", "in", "at", "for"], "on", "星期前用 on。"],
    ["介词短语", "I get up ___ seven o'clock.", ["at", "on", "in", "from"], "at", "具体时刻前用 at。"],
    ["介词短语", "The dog is sleeping ___ the table.", ["under", "on", "between", "near"], "under", "在桌子下面用 under。"],
    ["介词短语", "The cinema is ___ the left.", ["on", "in", "at", "by"], "on", "on the left 表示在左边。"],
    ["介词短语", "The park is next ___ the library.", ["to", "at", "in", "of"], "to", "next to 是固定搭配，表示在旁边。"],
    ["情态动词", "Can you play the piano? Yes, I ___.", ["can", "do", "am", "will"], "can", "Can 开头，肯定回答用 can。"],
    ["情态动词", "You ___ run in the classroom.", ["mustn't", "can", "may", "need"], "mustn't", "教室里不能跑，用 mustn't 表示禁止。"],
    ["情态动词", "May I use your pen? Yes, you ___.", ["may", "mustn't", "don't", "are"], "may", "May I...? 的肯定回答可用 Yes, you may.。"],
    ["情态动词", "We should ___ our hands before meals.", ["wash", "washes", "washing", "washed"], "wash", "should 后接动词原形。"],
    ["情态动词", "He can ___ fast.", ["run", "runs", "running", "ran"], "run", "can 后接动词原形。"],
    ["情态动词", "You shouldn't ___ too much candy.", ["eat", "eats", "eating", "ate"], "eat", "shouldn't 后动词用原形。"],
    ["情态动词", "Must I finish it today? No, you ___.", ["needn't", "must", "can't", "aren't"], "needn't", "Must I...? 的否定回答常用 needn't。"],
    ["情态动词", "Could you help me? 合适回答是：", ["Sure.", "No, I don't like apples.", "It is sunny.", "She is tall."], "Sure.", "Could you...? 是请求帮助。"],
    ["情态动词", "What can birds do?", ["They can fly.", "They are tables.", "It is Friday.", "I like rice."], "They can fly.", "can 表示能力。"],
    ["情态动词", "Students should ___ carefully in class.", ["listen", "listens", "listening", "listened"], "listen", "should 后用动词原形。"],
    ["语序判断", "选择语序正确的一项。", ["What are you doing?", "What you are doing?", "Are what you doing?", "Doing what are you?"], "What are you doing?", "特殊疑问句语序为疑问词 + be/助动词 + 主语。"],
    ["语序判断", "选择语序正确的一项。", ["Where does he live?", "Where he does live?", "Does where he live?", "Where live does he?"], "Where does he live?", "一般现在时第三人称疑问句用 does 提前。"],
    ["语序判断", "选择语序正确的一项。", ["Do you like music?", "You do like music?", "Like do you music?", "Music do like you?"], "Do you like music?", "一般疑问句用 Do 放句首。"],
    ["语序判断", "选择语序正确的一项。", ["There is a river near my house.", "There a river is near my house.", "Is there a river near my house.", "A river there is near my house."], "There is a river near my house.", "There be 陈述句结构为 There is/are...。"],
    ["语序判断", "选择语序正确的一项。", ["I often read books on Sundays.", "Often I books read on Sundays.", "I read often on Sundays books.", "Books I often Sundays read."], "I often read books on Sundays.", "频度副词 often 通常放实义动词前。"],
    ["语序判断", "选择语序正确的一项。", ["She is going to visit her aunt.", "She going is to visit her aunt.", "Is she going visit to her aunt.", "She to visit is going her aunt."], "She is going to visit her aunt.", "be going to 后接动词原形。"],
    ["语序判断", "选择语序正确的一项。", ["How many books do you have?", "How many do you have books?", "Books how many you have?", "Do how many books you have?"], "How many books do you have?", "How many 后接可数名词复数。"],
    ["语序判断", "选择语序正确的一项。", ["My favourite season is spring.", "My season favourite is spring.", "Favourite my season spring is.", "Spring is season my favourite."], "My favourite season is spring.", "favourite 作形容词修饰 season。"],
    ["语序判断", "选择语序正确的一项。", ["He doesn't like onions.", "He don't likes onions.", "He doesn't likes onions.", "He isn't like onions."], "He doesn't like onions.", "doesn't 后动词用原形。"],
    ["语序判断", "选择语序正确的一项。", ["Let's go to the park.", "Let's to go the park.", "Go let's to the park.", "Let's park go to the."], "Let's go to the park.", "Let's 后接动词原形。"]
  ];
  return rows.map((row, index) => englishQuestion("english-sentences", row, index, ["unit", "midterm", "final"]));
}

function buildEnglishReadingQuestions() {
  const people = ["Tom", "Amy", "Jack", "Lily", "Mike", "Sarah", "Ben", "Lucy", "Peter", "Anna"];
  const places = ["library", "park", "museum", "cinema", "zoo", "bookshop", "farm", "hospital", "school", "supermarket"];
  const actions = ["reads storybooks", "plays football", "takes photos", "buys a notebook", "visits his aunt", "helps his mother", "waters flowers", "draws pictures", "rides a bike", "writes an email"];
  const times = ["on Monday", "after school", "at 7:30", "on Saturday morning", "in the afternoon", "before dinner", "every weekend", "in May", "after lunch", "on Children's Day"];
  const colors = ["red", "blue", "green", "yellow", "black", "white", "brown", "orange", "purple", "pink"];
  const animals = ["cat", "dog", "rabbit", "bird", "panda", "horse", "duck", "tiger", "monkey", "fish"];
  const foods = ["rice", "noodles", "bread", "fish", "chicken", "vegetables", "dumplings", "cake", "sandwiches", "soup"];
  const rows = [];
  people.forEach((person, index) => {
    const place = places[index];
    const action = actions[index];
    const time = times[index];
    rows.push(["细节理解", `${person} goes to the ${place} ${time}. Where does ${person} go?`, capitalize(place), ["school", "park", "library", "zoo"].map((item) => capitalize(item)), `短文中直接出现 goes to the ${place}，地点就是 ${place}。`]);
    rows.push(["时间信息", `${person} ${action} ${time}. When does ${person} ${action.split(" ")[0]}?`, capitalize(time), ["On Sunday", "At night", "After breakfast", "In winter"].map(capitalize), `题干中的时间短语是 ${time}。`]);
    rows.push(["人物活动", `${person} is in the ${place}. ${person} ${action}. What does ${person} do?`, capitalize(action), ["sleeps at home", "watches TV", "cleans the room", "has a fever"].map(capitalize), `第二句说明 ${person} 的活动是 ${action}。`]);
  });
  colors.forEach((color, index) => {
    const animal = animals[index];
    rows.push(["细节理解", `I have a ${animal}. It is ${color}. What colour is the ${animal}?`, capitalize(color), ["green", "white", "black", "yellow"].filter((item) => item !== color).map(capitalize), `It is ${color}. 直接说明颜色。`]);
    rows.push(["信息匹配", `There is a ${color} kite under the tree. What is under the tree?`, `A ${color} kite`, [`A ${color} bag`, `A ${color} bike`, `A ${color} coat`, `A ${color} cap`], `under the tree 后的物品是 a ${color} kite。`]);
  });
  foods.forEach((food, index) => {
    const person = people[index];
    rows.push(["细节理解", `${person} would like some ${food} for lunch. What would ${person} like?`, capitalize(food), ["milk", "apples", "beef", "juice"].filter((item) => item !== food).map(capitalize), `would like 后面是 some ${food}。`]);
    rows.push(["推理判断", `${person} is hungry. There is some ${food} on the table. What may ${person} do?`, `Eat some ${food}`, ["Go to sleep", "Buy a pencil", "Clean the window", "Play the piano"], `hungry 表示饿了，桌上有食物，最可能吃一些。`]);
  });
  const shortPassages = [
    ["主旨理解", "Mary has a busy weekend. On Saturday she cleans her room. On Sunday she visits her grandparents.", "What is the passage mainly about?", "Mary's weekend", ["Mary's schoolbag", "Mary's birthday", "Mary's new teacher"], "两句话都围绕 Mary 的周末活动展开。"],
    ["推理判断", "It is cold today. Mike wears a coat and a scarf.", "What season may it be?", "Winter", ["Summer", "Spring", "Autumn"], "cold、coat、scarf 都提示天气寒冷。"],
    ["细节理解", "John's school starts at eight. He gets to school at seven forty.", "Is John late for school?", "No, he isn't.", ["Yes, he is.", "He is a teacher.", "It is Monday."], "7:40 早于 8:00，所以没有迟到。"],
    ["信息匹配", "There are thirty students in Class One. Eighteen are boys.", "How many girls are there?", "Twelve", ["Ten", "Eighteen", "Thirty"], "30-18=12，女生有 12 人。"],
    ["主旨理解", "The park is beautiful. There are many trees and flowers. Children fly kites there.", "What is the passage about?", "A beautiful park", ["A busy hospital", "A small kitchen", "A new library"], "trees、flowers、children fly kites 都围绕公园。"],
    ["推理判断", "Linda has a toothache. Her mother takes her to see a dentist.", "Where do they probably go?", "A hospital", ["A cinema", "A farm", "A zoo"], "toothache 和 dentist 提示去医院或牙科诊所。"],
    ["细节理解", "Sam likes science best. He has science on Tuesdays and Thursdays.", "What subject does Sam like best?", "Science", ["English", "Maths", "Music"], "第一句直接说 likes science best。"],
    ["信息匹配", "The bookstore is beside the cinema and across from the bank.", "What is beside the bookstore?", "The cinema", ["The zoo", "The school", "The farm"], "beside the cinema 表示书店在电影院旁边。"],
    ["主旨理解", "My family will have a picnic tomorrow. We will take bread, fruit and water.", "What are they going to do?", "Have a picnic", ["Clean the classroom", "Watch TV", "See a doctor"], "picnic 和携带食物饮料说明要野餐。"],
    ["推理判断", "The traffic light is red. The children stop and wait.", "Are the children following the traffic rules?", "Yes, they are.", ["No, they aren't.", "They are running.", "They are singing."], "红灯停，他们 stop and wait，说明遵守规则。"],
    ["细节理解", "Kate's favourite month is June because Children's Day is in June.", "Why does Kate like June?", "Because Children's Day is in June.", ["Because it is cold.", "Because she likes snow.", "Because she has maths."], "because 后说明原因。"],
    ["信息匹配", "There is a map on the wall and a computer on the teacher's desk.", "Where is the computer?", "On the teacher's desk", ["On the wall", "Under the chair", "In the bag"], "computer 后的位置是 on the teacher's desk。"],
    ["主旨理解", "We should eat vegetables and fruit. We should play sports every day.", "What is the passage about?", "Healthy habits", ["A birthday party", "A school trip", "A toy shop"], "饮食和运动都属于健康习惯。"],
    ["推理判断", "Peter can't find his English book. He looks for it in his schoolbag and under the desk.", "What is Peter doing?", "Looking for his English book", ["Reading a story", "Buying a book", "Writing a letter"], "can't find 和 looks for 提示正在找书。"],
    ["细节理解", "The train leaves at 9:15. We should get to the station before 9:00.", "When does the train leave?", "At 9:15", ["At 9:00", "At 8:30", "At 10:15"], "第一句直接给出 leaves at 9:15。"],
    ["信息匹配", "Emma's dress is red. Her shoes are white. Her hat is yellow.", "What colour are Emma's shoes?", "White", ["Red", "Yellow", "Black"], "Her shoes are white 直接说明鞋子颜色。"],
    ["主旨理解", "In spring, trees turn green. Birds sing in the trees. Children like flying kites.", "Which season is the passage about?", "Spring", ["Summer", "Autumn", "Winter"], "第一句直接点出 In spring。"],
    ["推理判断", "The boy has a fever and a headache. He shouldn't go swimming today.", "What should the boy do?", "Have a rest", ["Eat ice cream", "Go swimming", "Run fast"], "发烧头痛时应该休息。"],
    ["细节理解", "Nancy's father is a driver. He drives a bus every day.", "What does Nancy's father do?", "A driver", ["A nurse", "A farmer", "A singer"], "第一句直接说 father is a driver。"],
    ["信息匹配", "The art room is on the second floor. The music room is on the third floor.", "Where is the music room?", "On the third floor", ["On the first floor", "On the second floor", "Near the gate"], "music room 对应 on the third floor。"],
    ["主旨理解", "This email tells Tom about our school trip. We will go to the farm and pick apples.", "What is the email about?", "A school trip", ["A birthday cake", "A new film", "A football match"], "school trip、go to the farm 都说明主题是学校旅行。"],
    ["推理判断", "It is twelve o'clock. The students are going to the dining hall.", "What will they probably do?", "Have lunch", ["Have breakfast", "Go to bed", "Buy tickets"], "十二点去餐厅，最可能吃午饭。"],
    ["细节理解", "The library opens at 8:30 and closes at 5:00.", "When does the library open?", "At 8:30", ["At 5:00", "At 7:30", "At 9:00"], "opens at 8:30 表示开放时间。"],
    ["信息匹配", "Bob has three lessons in the morning: Chinese, maths and English.", "How many lessons does Bob have in the morning?", "Three", ["Two", "Four", "Five"], "three lessons 直接说明三节课。"],
    ["主旨理解", "My robot can talk, sing and clean the room. I like it very much.", "What is the passage about?", "A helpful robot", ["A funny dog", "A new classroom", "A long river"], "talk、sing、clean the room 都在介绍机器人。"],
    ["推理判断", "The girl is wearing a raincoat. She also takes an umbrella.", "What is the weather probably like?", "Rainy", ["Sunny", "Snowy", "Windless"], "raincoat 和 umbrella 提示下雨。"],
    ["细节理解", "David's birthday is on October 10th.", "When is David's birthday?", "On October 10th", ["On September 10th", "On October 1st", "On December 10th"], "题干直接给出 on October 10th。"],
    ["信息匹配", "The elephant is big and strong. The monkey is small and clever.", "Which animal is clever?", "The monkey", ["The elephant", "The panda", "The tiger"], "The monkey is small and clever。"],
    ["主旨理解", "Please turn left at the bookstore. Then go straight. The post office is on your right.", "What is the passage about?", "Asking the way", ["Ordering food", "Taking photos", "Doing homework"], "turn left、go straight、on your right 是指路表达。"],
    ["推理判断", "Helen studies hard and helps her classmates. Her teachers all like her.", "What is Helen like?", "Helpful and hard-working", ["Lazy and rude", "Angry and noisy", "Tall and hungry"], "studies hard 和 helps classmates 说明勤奋又乐于助人。"]
  ];
  shortPassages.forEach(([knowledge, passage, question, answer, distractors, explanation]) => {
    rows.push([knowledge, `${passage} ${question}`, answer, distractors, explanation]);
  });
  return rows.slice(0, 100).map(([knowledgePoint, title, answer, distractors, explanation], index) => {
    const options = makeEnglishOptions(answer, distractors);
    return makeExamQuestion("english", "english-reading", englishDifficulty(index), knowledgePoint, englishFrequency(index), ["unit", "midterm", "final"], title, options, answer, explanation, "阅读题容易只看个别单词，忽略时间、地点、否定词或原因。", "先读问题，再回原文找关键词，答案会更清楚。");
  });
}

function buildEnglishHighFrequencyQuestions() {
  const rows = [
    ["高频单词", "期中常考：Which word means “操场”？", ["playground", "classroom", "computer", "homework"], "playground", "playground 表示操场，是校园地点类高频词。"],
    ["高频单词", "期中常考：Which word means “牙疼”？", ["toothache", "headache", "fever", "cough"], "toothache", "toothache 表示牙疼。"],
    ["高频单词", "期末常考：Which word is about clothes?", ["sweater", "weather", "water", "worker"], "sweater", "sweater 是衣物类单词。"],
    ["高频单词", "期末常考：Which word is a traffic tool?", ["subway", "Sunday", "subject", "supper"], "subway", "subway 表示地铁，属于交通工具。"],
    ["高频单词", "期中易错：Which word means “十二月”？", ["December", "November", "September", "October"], "December", "December 是十二月。"],
    ["高频单词", "期末易错：Which word means “有礼貌的”？", ["polite", "pretty", "popular", "possible"], "polite", "polite 表示有礼貌的。"],
    ["高频单词", "期末检测：Which word is a vegetable?", ["potato", "piano", "photo", "pilot"], "potato", "potato 是蔬菜。"],
    ["高频单词", "期中检测：Which word is a festival?", ["Christmas", "Monday", "January", "Music"], "Christmas", "Christmas 是节日。"],
    ["高频单词", "期末常考：Which word means “山”？", ["mountain", "minute", "market", "medicine"], "mountain", "mountain 表示山。"],
    ["高频单词", "期中易错：Which word means “有趣的”？", ["interesting", "important", "inside", "Internet"], "interesting", "interesting 表示有趣的。"],
    ["高频句型", "期中真题：What do you often do on the weekend?", ["I often clean my room.", "It is Friday.", "She is my sister.", "They are red."], "I often clean my room.", "问周末常做什么，应回答活动。"],
    ["高频句型", "期中真题：What's your favourite season?", ["Spring.", "At seven.", "By bus.", "In the bag."], "Spring.", "favourite season 询问最喜欢的季节。"],
    ["高频句型", "期末真题：Is there a river in the park?", ["Yes, there is.", "Yes, it can.", "No, I don't.", "It is mine."], "Yes, there is.", "Is there...? 用 there is/there isn't 回答。"],
    ["高频句型", "期末真题：Are these books yours?", ["Yes, they are.", "Yes, it is.", "No, I can't.", "They are reading."], "Yes, they are.", "these books 是复数，用 they are 回答。"],
    ["高频句型", "期中常考：What is she doing?", ["She is dancing.", "She dances every day.", "She danced yesterday.", "She will dance."], "She is dancing.", "问正在做什么，用现在进行时。"],
    ["高频句型", "期末常考：Where did you go yesterday?", ["I went to the park.", "I go to school.", "I am going home.", "I can go there."], "I went to the park.", "did 和 yesterday 提示过去时。"],
    ["高频句型", "期末检测：What are you going to do tomorrow?", ["I'm going to see a film.", "I saw a film.", "I see a film every week.", "I can see a film."], "I'm going to see a film.", "be going to 表示将来计划。"],
    ["高频句型", "期中检测：How much is the T-shirt?", ["It's 50 yuan.", "It's red.", "It's on the bed.", "It's mine."], "It's 50 yuan.", "How much 询问价格。"],
    ["高频句型", "期末易错：Whose pencils are these?", ["They are Sarah's.", "It is Sarah.", "She is Sarah.", "Sarah is tall."], "They are Sarah's.", "Whose pencils 询问铅笔是谁的。"],
    ["高频句型", "期中易错：How many people are there in your family?", ["There are four.", "They are fine.", "It is four yuan.", "At four o'clock."], "There are four.", "How many people 和 there be 搭配回答数量。"],
    ["易错语法", "期中易错：She ___ like onions.", ["doesn't", "don't", "isn't", "aren't"], "doesn't", "She 是第三人称单数，否定用 doesn't。"],
    ["易错语法", "期中易错：Do you often ___ TV?", ["watch", "watches", "watching", "watched"], "watch", "Do 后用动词原形。"],
    ["易错语法", "期末易错：There ___ some water in the bottle.", ["is", "are", "am", "be"], "is", "water 不可数，there be 用 is。"],
    ["易错语法", "期末易错：My shoes ___ under the bed.", ["are", "is", "am", "be"], "are", "shoes 是复数，用 are。"],
    ["易错语法", "期中易错：I want ___ apple.", ["an", "a", "the many", "some a"], "an", "apple 以元音音素开头，单数前用 an。"],
    ["易错语法", "期末易错：This is ___ old photo.", ["an", "a", "many", "some"], "an", "old 以元音音素开头，用 an。"],
    ["易错语法", "期中检测：He can ___ English songs.", ["sing", "sings", "singing", "sang"], "sing", "can 后接动词原形。"],
    ["易错语法", "期末检测：Let's ___ home.", ["go", "goes", "going", "went"], "go", "Let's 后接动词原形。"],
    ["易错语法", "期中易错：Does Mike ___ a bike?", ["have", "has", "having", "had"], "have", "Does 后动词用原形。"],
    ["易错语法", "期末易错：The girls are ___ now.", ["singing", "sing", "sings", "sang"], "singing", "are 后接现在分词构成现在进行时。"],
    ["情景交际", "期中口语：朋友生日时你应说：", ["Happy birthday!", "Good morning!", "I'm sorry.", "This way, please."], "Happy birthday!", "生日祝福用 Happy birthday!"],
    ["情景交际", "期中口语：别人帮助你后，你应说：", ["Thank you.", "Goodbye.", "I'm ten.", "It's rainy."], "Thank you.", "接受帮助后表达感谢。"],
    ["情景交际", "期末口语：想借对方尺子，可以说：", ["May I use your ruler?", "Where is your ruler?", "I have a ruler.", "This ruler is long."], "May I use your ruler?", "May I use...? 表示礼貌请求。"],
    ["情景交际", "期末口语：别人说 I'm sorry. 你可以回答：", ["That's all right.", "Thank you.", "Happy birthday.", "Good night."], "That's all right.", "对道歉的回应可说 That's all right.。"],
    ["情景交际", "期中口语：想知道对方是否会游泳，可以问：", ["Can you swim?", "Do you like fish?", "Are you a swimmer?", "Where do you swim?"], "Can you swim?", "询问能力用 Can you...?"],
    ["情景交际", "期末口语：想知道去邮局的路，可以问：", ["How can I get to the post office?", "What is the post office?", "When is the post office?", "Who is in the post office?"], "How can I get to the post office?", "问路常用 How can I get to...?"],
    ["情景交际", "期中口语：想知道对方最喜欢的食物，可以问：", ["What's your favourite food?", "Where is your food?", "How old is your food?", "Can food swim?"], "What's your favourite food?", "favourite food 表示最喜欢的食物。"],
    ["情景交际", "期末口语：看见同学不舒服，可以问：", ["What's wrong?", "What colour is it?", "How much is it?", "Whose is it?"], "What's wrong?", "What's wrong? 用于询问身体或情况怎么了。"],
    ["情景交际", "期中口语：想邀请朋友踢足球，可以说：", ["Let's play football.", "I played football.", "Football is round.", "Where is football?"], "Let's play football.", "Let's... 表示邀请或建议。"],
    ["情景交际", "期末口语：别人说 Have a good trip! 你应回答：", ["Thank you.", "I am a trip.", "It is a train.", "No, it isn't."], "Thank you.", "对祝福表达感谢。"]
  ];
  const expanded = [];
  const reviewTypes = [
    ["高频阅读", "期中阅读：Tom goes to the library after school. What does Tom do after school?", ["Goes to the library", "Goes swimming", "Buys shoes", "Cooks dinner"], "Goes to the library", "after school 后的活动是 goes to the library。"],
    ["高频阅读", "期末阅读：Amy has a new bike. It is blue and white. What colour is Amy's bike?", ["Blue and white", "Red and black", "Green and yellow", "Brown and orange"], "Blue and white", "It is blue and white 直接说明颜色。"],
    ["高频阅读", "期中阅读：Ben is ill. He stays at home and drinks warm water. Why does Ben stay at home?", ["Because he is ill.", "Because he has a picnic.", "Because he buys books.", "Because he plays basketball."], "Because he is ill.", "第一句 Ben is ill 说明原因。"],
    ["高频阅读", "期末阅读：Lucy will visit Shanghai next week. When will Lucy visit Shanghai?", ["Next week", "Last week", "Every day", "Yesterday"], "Next week", "will 和 next week 表示下周。"],
    ["高频阅读", "期中阅读：The post office is between the bank and the school. Where is the post office?", ["Between the bank and the school", "Behind the zoo", "Under the bridge", "Inside the cinema"], "Between the bank and the school", "between...and... 表示在两者之间。"],
    ["高频阅读", "期末阅读：Mike often gets up at 6:40, but today he gets up at 7:20. What is different today?", ["He gets up later.", "He goes to bed earlier.", "He eats more.", "He runs faster."], "He gets up later.", "7:20 比 6:40 晚。"],
    ["高频阅读", "期中阅读：Sarah likes winter because she can make a snowman. Why does Sarah like winter?", ["Because she can make a snowman.", "Because she can swim.", "Because she can pick apples.", "Because she can fly kites."], "Because she can make a snowman.", "because 后给出喜欢冬天的原因。"],
    ["高频阅读", "期末阅读：There are five people in John's family. His parents, his sister, his brother and John. How many people are there?", ["Five", "Four", "Six", "Seven"], "Five", "第一句直接给出 five people。"],
    ["高频阅读", "期中阅读：The children are in the art room. They are drawing animals. What subject may they have?", ["Art", "PE", "Music", "Science"], "Art", "art room 和 drawing 提示美术课。"],
    ["高频阅读", "期末阅读：The sign says, 'No eating in the library.' What shouldn't we do in the library?", ["Eat food", "Read books", "Borrow books", "Keep quiet"], "Eat food", "No eating 表示不能吃东西。"]
  ];
  while (expanded.length < 100) {
    const source = expanded.length < rows.length ? rows[expanded.length] : reviewTypes[(expanded.length - rows.length) % reviewTypes.length];
      if (expanded.length < rows.length) expanded.push(source);
    else {
      const [knowledge, title, options, answer, explanation] = source;
      expanded.push([knowledge, `${title}（综合${expanded.length - rows.length + 1}）`, options, answer, explanation]);
    }
  }
  return expanded.slice(0, 100).map(([knowledgePoint, title, options, answer, explanation], index) =>
    makeExamQuestion("english", "english-exam", englishDifficulty(index), knowledgePoint, englishFrequency(index), ["unit", "midterm", "final"], title, options, answer, explanation, "考试高频题容易被时态、疑问词、否定词或固定搭配干扰。", "按场景、时态和句子结构逐项核对。")
  );
}

function englishQuestion(chapterId, row, index, examTypes) {
  const [knowledgePoint, title, options, answer, explanation] = row;
  return makeExamQuestion(
    "english",
    chapterId,
    englishDifficulty(index),
    knowledgePoint,
    englishFrequency(index),
    examTypes,
    title,
    makeEnglishOptions(answer, options),
    answer,
    explanation,
    "容易把形近词、时态标志或问句关键词看错。",
    "按词义、语法结构和语境逐项核对。"
  );
}

function makeEnglishOptions(answer, candidates) {
  const seen = new Set();
  return [answer, ...candidates].filter((item) => {
    const text = String(item || "").trim();
    if (!text || seen.has(text)) return false;
    seen.add(text);
    return true;
  }).slice(0, 4);
}

function englishDifficulty(index) {
  const mod = index % 10;
  if (mod < 4) return DIFFICULTIES[0];
  if (mod < 8) return DIFFICULTIES[1];
  return DIFFICULTIES[2];
}

function englishFrequency(index) {
  const mod = index % 10;
  if (mod < 6) return "高频";
  if (mod < 8) return "中频";
  return "易错";
}

function capitalize(text) {
  const value = String(text || "");
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function makeQuestion(subjectId, chapterId, difficulty, knowledgePoint, title, options, answer, explanation, commonMistake, encouragement) {
  const chapter = getChapter(chapterId);
  return { id: `${subjectId}-${chapterId}-${knowledgePoint}-${title}`.slice(0, 90), subjectId, chapterId, chapter: chapter.name, difficulty, knowledgePoint, title, question: title, options, answer, explanation, analysis: explanation, commonMistake, encouragement };
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
  const subjectId = question.subjectId || findSubjectByChapterId(chapter.id).id;
  const difficulty = DIFFICULTIES.includes(question.difficulty) ? question.difficulty : DIFFICULTIES[0];
  const answer = String(question.answer || question.答案 || "").trim();
  const options = Array.isArray(question.options)
    ? question.options.map(String).filter(Boolean)
    : String(question.options || "").split("|").map((item) => item.trim()).filter(Boolean);
  const title = String(question.title || question.question || question.题目 || "").trim();
  return {
    id: String(question.id || createQuestionId()),
    subjectId,
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
    frequency: normalizeFrequency(question.frequency || question.考频 || question.examFrequency || difficulty),
    examTypes: normalizeExamTypes(question.examTypes || question.examType || question.试卷类型),
    commonMistake: String(question.commonMistake || question.常见错误 || makeDefaultMistake(difficulty)).trim(),
    encouragement: String(question.encouragement || question.鼓励语 || makeDefaultEncouragement(difficulty)).trim()
  };
}

function normalizeFrequency(value) {
  const text = String(value || "").trim();
  if (text.includes("易错")) return "易错";
  if (text.includes("高频") || text === "基础题") return "高频";
  if (text.includes("中频") || text === "提高题") return "中频";
  return "中频";
}

function normalizeExamTypes(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  const text = String(value || "").trim();
  if (!text) return ["unit", "midterm", "final"];
  if (text.includes("|")) return text.split("|").map((item) => item.trim()).filter(Boolean);
  if (text.includes(",")) return text.split(",").map((item) => item.trim()).filter(Boolean);
  return [text];
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
  const exactQuestions = new Set();
  const result = [];
  list.forEach((item) => {
    const question = normalizeQuestion(item);
    if (!question.title) return;
    const exactKey = makeExactQuestionKey(question);
    if (exactQuestions.has(exactKey)) return;
    exactQuestions.add(exactKey);
    result.push(question);
  });
  return result;
}

function makeExactQuestionKey(question) {
  const title = normalizeExactText(question.title || question.question || "");
  const answer = normalizeExactText(question.answer || "");
  const options = Array.isArray(question.options)
    ? question.options.map((item) => normalizeExactText(item)).join("|")
    : normalizeExactText(question.options || "");
  return `${title}::${answer}::${options}`;
}

function normalizeExactText(text) {
  return String(text || "").trim().replace(/\s+/g, " ");
}

function normalizeQuestionText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[，。？！、；：,.?!;:"'“”‘’（）()【】\[\]{}<>《》]/g, "");
}

function pickDiverseQuestions(pool, limit, maxPerKnowledge = 2) {
  const selected = [];
  const usedExact = new Set();
  const usedKeywords = new Set();
  const knowledgeCounts = new Map();
  const groups = new Map();

  shuffle([...pool]).forEach((item) => {
    const key = item.knowledgePoint || "综合应用";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  });

  const orderedKeys = shuffle([...groups.keys()]);
  let guard = 0;
  while (selected.length < limit && orderedKeys.length && guard < limit * Math.max(pool.length, 1)) {
    guard += 1;
    let addedInRound = false;
    for (const knowledgePoint of orderedKeys) {
      if (selected.length >= limit) break;
      if (selected[selected.length - 1]?.knowledgePoint === knowledgePoint && orderedKeys.length > 1) continue;
      const currentCount = knowledgeCounts.get(knowledgePoint) || 0;
      if (currentCount >= maxPerKnowledge) continue;
      const list = groups.get(knowledgePoint) || [];
      while (list.length) {
        const question = list.shift();
        const questionText = question.title || question.question || "";
        const exactKey = makeExactQuestionKey(question);
        const keywordKey = extractQuestionKeyword(question);
        if (usedExact.has(exactKey) || usedKeywords.has(keywordKey)) continue;
        selected.push(question);
        usedExact.add(exactKey);
        usedKeywords.add(keywordKey);
        knowledgeCounts.set(knowledgePoint, currentCount + 1);
        addedInRound = true;
        break;
      }
    }
    if (!addedInRound) break;
  }

  return selected;
}

function pickExamPaperQuestions(pool, subjectId, examType, limit = 20) {
  const ratio = getExamRatio(subjectId, examType);
  const selected = [];
  const usedIds = new Set();
  ratio.forEach((part) => {
    const partPool = pool
      .filter((item) => part.chapters.includes(item.chapterId) || part.knowledgePoints.includes(item.knowledgePoint))
      .sort((a, b) => getFrequencyWeight(b.frequency) - getFrequencyWeight(a.frequency));
    pickDiverseQuestions(partPool, part.count, part.maxPerKnowledge || 4).forEach((question) => {
      if (!usedIds.has(question.id) && selected.length < limit) {
        selected.push(question);
        usedIds.add(question.id);
      }
    });
  });
  if (selected.length < limit) {
    const rest = pool
      .filter((item) => !usedIds.has(item.id))
      .sort((a, b) => getFrequencyWeight(b.frequency) - getFrequencyWeight(a.frequency));
    pickDiverseQuestions(rest, limit - selected.length, 5).forEach((question) => {
      if (!usedIds.has(question.id) && selected.length < limit) {
        selected.push(question);
        usedIds.add(question.id);
      }
    });
  }
  return shuffle(selected).slice(0, limit);
}

function getExamRatio(subjectId, examType) {
  if (subjectId === "math") {
    const midChapters = ["factor", "cube", "fraction"];
    const finalChapters = ["factor", "cube", "fraction", "motion", "fraction-add"];
    return [
      { chapters: examType === "midterm" ? midChapters : finalChapters, knowledgePoints: [], count: 14, maxPerKnowledge: 4 },
      { chapters: ["view", "line-chart"], knowledgePoints: [], count: 3, maxPerKnowledge: 2 },
      { chapters: ["motion", "fraction-add"], knowledgePoints: [], count: 3, maxPerKnowledge: 2 }
    ];
  }
  if (subjectId === "chinese") {
    return [
      { chapters: [], knowledgePoints: ["生字", "词语"], count: 7, maxPerKnowledge: 4 },
      { chapters: [], knowledgePoints: ["课文内容"], count: 5, maxPerKnowledge: 3 },
      { chapters: [], knowledgePoints: ["阅读理解"], count: 5, maxPerKnowledge: 3 },
      { chapters: [], knowledgePoints: ["古诗文", "单元测试"], count: 3, maxPerKnowledge: 2 }
    ];
  }
  return [
    { chapters: ["english-words"], knowledgePoints: [], count: 5, maxPerKnowledge: 3 },
    { chapters: ["english-sentences"], knowledgePoints: [], count: 5, maxPerKnowledge: 3 },
    { chapters: ["english-reading"], knowledgePoints: [], count: 5, maxPerKnowledge: 3 },
    { chapters: ["english-exam"], knowledgePoints: [], count: 5, maxPerKnowledge: 3 }
  ];
}

function getFrequencyWeight(frequency) {
  if (frequency === "高频") return 3;
  if (frequency === "易错") return 2;
  if (frequency === "中频") return 1;
  return 0;
}

function extractQuestionKeyword(question) {
  const text = String(question.title || question.question || "");
  const quoted = text.match(/[“《]([^”》]{2,16})[”》]/);
  if (quoted && !text.includes(`《${quoted[1]}》`)) return `${question.chapterId || ""}::${quoted[1]}`;
  const compact = normalizeQuestionText(text)
    .replace(/第[一二三四五六七八九十]+单元/g, "")
    .replace(/拼音|字形|近义词|反义词|词语理解|词语运用|课文内容|阅读理解|单元测试/g, "")
    .slice(0, 24);
  return `${question.chapterId || ""}::${question.knowledgePoint || ""}::${compact}`;
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
  if (item.type === "medal-streak") return appData.streak >= item.target;
  if (item.type === "medal-answered") return appData.totalAnswered >= item.target;
  if (item.type === "medal-week") return summarizeLogs(getDateRange("week")).answered >= item.target;
  return false;
}

function getAchievementHint(item) {
  if (item.type === "streak") return `连续学习达到 ${item.target} 天后获得`;
  if (item.type === "correct") return `累计答对 ${item.target} 题后获得`;
  if (item.type === "points") return `积分达到 ${item.target} 后获得`;
  if (item.type === "chapter") return `本章节累计答对 ${item.target} 题后获得`;
  if (item.type === "medal-streak") return `连续学习达到 ${item.target} 天后获得`;
  if (item.type === "medal-answered") return `累计完成 ${item.target} 题后获得`;
  if (item.type === "medal-week") return `本周完成 ${item.target} 题后获得`;
  return "继续练习即可获得";
}

function getLearningMedals() {
  return ACHIEVEMENTS.filter((item) => String(item.id).startsWith("medal-"));
}

function getMedalDescription(item) {
  if (item.type === "medal-streak") return "连续学习表现优秀";
  if (item.type === "medal-answered") return "累计答题表现优秀";
  if (item.type === "medal-week") return "本周练习表现优秀";
  return "学习成长勋章";
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
  return getAllChapters().map((chapter) => {
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
      ${weakPoints.length ? `<ul>${weakPoints.map((item) => `<li>${escapeHTML(item.name)}</li>`).join("")}</ul>` : "<p>基础概念、易错题复盘和单元练习巩固。</p>"}
      <p>建议每天练习 20 分钟，先做基础题，再复盘错题本。</p>
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
    if (text && !isPlaceholderOption(text) && !seen.has(text)) {
      seen.add(text);
      result.push(text);
    }
  });
  getFallbackOptions(answer).forEach((text) => {
    if (result.length >= 4) return;
    if (!seen.has(text)) {
      seen.add(text);
      result.push(text);
    }
  });
  return result.slice(0, 4);
}

function isPlaceholderOption(text) {
  return /^选项\d+$/.test(text) || /^(A|B|C|D)$/.test(text) || text === "随便填";
}

function getFallbackOptions(answer) {
  const text = String(answer || "").trim();
  const numberMatch = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (numberMatch) {
    const value = Number(numberMatch[1]);
    const unit = numberMatch[2] || "";
    const candidates = [
      value + 1,
      Math.max(0, value - 1),
      value * 2,
      Math.max(1, Math.round(value / 2)),
      value + 2,
      value + 3,
      Math.max(0, value - 2)
    ];
    return candidates.map((item) => `${item}${unit}`);
  }
  if (text.includes("/")) return ["1/2", "2/3", "3/4", "5/6"].filter((item) => item !== text);
  return ["说法一", "说法二", "说法三", "说法四"].filter((item) => item !== text);
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
  getAllChapters().forEach((chapter) => {
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

function markQuestionCompleted(question) {
  if (!question || !question.chapterId || !question.id) return;
  appData.completedQuestions = appData.completedQuestions && typeof appData.completedQuestions === "object" ? appData.completedQuestions : {};
  const list = Array.isArray(appData.completedQuestions[question.chapterId]) ? appData.completedQuestions[question.chapterId] : [];
  if (!list.includes(question.id)) list.push(question.id);
  appData.completedQuestions[question.chapterId] = list;
}

function getChapterCompletion(chapterId, total) {
  if (!total) return 0;
  const completed = appData.completedQuestions && Array.isArray(appData.completedQuestions[chapterId])
    ? new Set(appData.completedQuestions[chapterId]).size
    : 0;
  return Math.min(100, Math.round((completed / total) * 100));
}

function getChapter(chapterId) {
  return getAllChapters().find((chapter) => chapter.id === chapterId) || chapters[0];
}

function findChapterByNameOrId(value) {
  return getAllChapters().find((chapter) => chapter.id === value || chapter.name === value) || chapters[0];
}

function getAllChapters() {
  return Object.values(subjectChapters).flat();
}

function findSubjectByChapterId(chapterId) {
  return subjects.find((subject) => subjectChapters[subject.id].some((chapter) => chapter.id === chapterId)) || subjects[0];
}

function getSubjectName(subjectId) {
  return (subjects.find((subject) => subject.id === subjectId) || subjects[0]).name;
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
