import React, { useState, useEffect, useCallback, useRef } from "react";

// --- 아이콘 컴포넌트 ---
// TypeScript 오류 방지를 위해 props에 any 타입 적용
const IconBase = ({ children, size = 24, className = "" }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const Volume2 = (props: any) => (
  <IconBase {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </IconBase>
);

const Star = (props: any) => (
  <IconBase {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </IconBase>
);

const Home = (props: any) => (
  <IconBase {...props}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </IconBase>
);

const ArrowRight = (props: any) => (
  <IconBase {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </IconBase>
);

const Trophy = (props: any) => (
  <IconBase {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </IconBase>
);

const Check = (props: any) => (
  <IconBase {...props}>
    <polyline points="20 6 9 17 4 12" />
  </IconBase>
);

const XIcon = (props: any) => (
  <IconBase {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </IconBase>
);

const Lightbulb = (props: any) => (
  <IconBase {...props}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.4 1.5-3.8 0-3.2-2.8-5.7-6-5.7s-6 2.5-6 5.7c0 1.4.5 2.8 1.5 3.8.8.8 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </IconBase>
);

const Eraser = (props: any) => (
  <IconBase {...props}>
    <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
    <path d="M22 21H7" />
    <path d="m5 11 9 9" />
  </IconBase>
);

// --- 데이터: 받침 없는 단어 (100여 개) ---
const RAW_DATA = [
  // 1. 동물
  { text: "사자", category: "동물", emoji: "🦁" },
  { text: "소", category: "동물", emoji: "🐮" },
  { text: "개", category: "동물", emoji: "🐶" },
  { text: "토끼", category: "동물", emoji: "🐰" },
  { text: "여우", category: "동물", emoji: "🦊" },
  { text: "오리", category: "동물", emoji: "🦆" },
  { text: "하마", category: "동물", emoji: "🦛" },
  { text: "코끼리", category: "동물", emoji: "🐘" },
  { text: "타조", category: "동물", emoji: "🐦" },
  { text: "고래", category: "동물", emoji: "🐳" },
  { text: "까치", category: "동물", emoji: "🐧" },
  { text: "개구리", category: "동물", emoji: "🐸" },
  { text: "돼지", category: "동물", emoji: "🐷" },
  { text: "쥐", category: "동물", emoji: "🐭" },
  { text: "파리", category: "동물", emoji: "🪰" },
  { text: "모기", category: "동물", emoji: "🦟" },
  { text: "매미", category: "동물", emoji: "🐞" },
  { text: "오소리", category: "동물", emoji: "🦡" },
  { text: "기러기", category: "동물", emoji: "🦢" },

  // 2. 음식
  { text: "우유", category: "음식", emoji: "🥛" },
  { text: "포도", category: "음식", emoji: "🍇" },
  { text: "바나나", category: "음식", emoji: "🍌" },
  { text: "사과", category: "음식", emoji: "🍎" },
  { text: "배", category: "음식", emoji: "🍐" },
  { text: "자두", category: "음식", emoji: "🍑" },
  { text: "오이", category: "음식", emoji: "🥒" },
  { text: "가지", category: "음식", emoji: "🍆" },
  { text: "고구마", category: "음식", emoji: "🍠" },
  { text: "피자", category: "음식", emoji: "🍕" },
  { text: "치즈", category: "음식", emoji: "🧀" },
  { text: "쿠키", category: "음식", emoji: "🍪" },
  { text: "파", category: "음식", emoji: "🧅" },
  { text: "무", category: "음식", emoji: "🥬" },
  { text: "고기", category: "음식", emoji: "🥩" },
  { text: "찌개", category: "음식", emoji: "🍲" },
  { text: "두부", category: "음식", emoji: "🧊" },
  { text: "주스", category: "음식", emoji: "🧃" },
  { text: "커피", category: "음식", emoji: "☕" },
  { text: "코코아", category: "음식", emoji: "🍫" },
  { text: "과자", category: "음식", emoji: "🍘" },
  { text: "토마토", category: "음식", emoji: "🍅" },

  // 3. 신체
  { text: "머리", category: "신체", emoji: "💆" },
  { text: "이마", category: "신체", emoji: "😊" },
  { text: "코", category: "신체", emoji: "👃" },
  { text: "귀", category: "신체", emoji: "👂" },
  { text: "이", category: "신체", emoji: "🦷" },
  { text: "허리", category: "신체", emoji: "🧍" },
  { text: "다리", category: "신체", emoji: "🦵" },
  { text: "어깨", category: "신체", emoji: "💪" },
  { text: "배", category: "신체", emoji: "🤰" },
  { text: "혀", category: "신체", emoji: "👅" },
  { text: "피부", category: "신체", emoji: "✋" },
  { text: "뼈", category: "신체", emoji: "🦴" },

  // 4. 사물
  { text: "모자", category: "사물", emoji: "👒" },
  { text: "구두", category: "사물", emoji: "👠" },
  { text: "바지", category: "사물", emoji: "👖" },
  { text: "치마", category: "사물", emoji: "👗" },
  { text: "시계", category: "사물", emoji: "⏰" },
  { text: "의자", category: "사물", emoji: "🪑" },
  { text: "비누", category: "사물", emoji: "🧼" },
  { text: "휴지", category: "사물", emoji: "🧻" },
  { text: "지도", category: "사물", emoji: "🗺️" },
  { text: "라디오", category: "사물", emoji: "📻" },
  { text: "피아노", category: "사물", emoji: "🎹" },
  { text: "카메라", category: "사물", emoji: "📷" },
  { text: "기차", category: "사물", emoji: "🚂" },
  { text: "버스", category: "사물", emoji: "🚌" },
  { text: "자전거", category: "사물", emoji: "🚲" },
  { text: "마차", category: "사물", emoji: "🐎" },
  { text: "유모차", category: "사물", emoji: "🛒" },
  { text: "튜브", category: "사물", emoji: "🛟" },
  { text: "스키", category: "사물", emoji: "🎿" },
  { text: "바구니", category: "사물", emoji: "🧺" },
  { text: "주머니", category: "사물", emoji: "👜" },
  { text: "초", category: "사물", emoji: "🕯️" },
  { text: "도끼", category: "사물", emoji: "🪓" },
  { text: "호루라기", category: "사물", emoji: "📢" },

  // 5. 자연
  { text: "나무", category: "자연", emoji: "🌳" },
  { text: "비", category: "자연", emoji: "☔" },
  { text: "해", category: "자연", emoji: "☀️" },
  { text: "휴가", category: "자연", emoji: "🏖️" },
  { text: "파도", category: "자연", emoji: "🌊" },
  { text: "호수", category: "자연", emoji: "🏞️" },
  { text: "바다", category: "자연", emoji: "🌊" },
  { text: "무지개", category: "자연", emoji: "🌈" },
  { text: "소나기", category: "자연", emoji: "🌧️" },
  { text: "회오리", category: "자연", emoji: "🌀" },
  { text: "지구", category: "자연", emoji: "🌍" },
  { text: "우주", category: "자연", emoji: "🌌" },

  // 6. 가족
  { text: "아빠", category: "가족", emoji: "👨" },
  { text: "누나", category: "가족", emoji: "👧" },
  { text: "이모", category: "가족", emoji: "👩" },
  { text: "고모", category: "가족", emoji: "👩" },
  { text: "오빠", category: "가족", emoji: "👦" },
  { text: "처제", category: "가족", emoji: "👩" },
  { text: "아기", category: "가족", emoji: "👶" },
];

// 데이터에 ID 및 색상 부여
const WORD_DATA = RAW_DATA.map((item, index) => ({
  id: index + 1,
  ...item,
  color: `bg-${
    ["blue", "green", "yellow", "pink", "purple", "orange", "red", "teal"][
      index % 8
    ]
  }-${index % 2 === 0 ? "50" : "100"}`,
}));

// --- 유틸리티: 초성 추출 ---
const getChosung = (str: string) => {
  const CHOSUNG = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const result = [];
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i) - 44032;
    if (code > -1 && code < 11172) {
      const chosungIndex = Math.floor(code / 588);
      result.push(CHOSUNG[chosungIndex]);
    } else {
      result.push(str[i]);
    }
  }
  return result;
};

// --- 유틸리티: TTS ---
const speak = (text: string) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.8;
  utterance.pitch = 1.1;
  window.speechSynthesis.speak(utterance);
};

// --- 컴포넌트: 메인 앱 ---
export default function App() {
  const [mode, setMode] = useState("home"); // home, quiz(읽기), write(쓰기)
  const [stars, setStars] = useState(0);

  return (
    <div className="min-h-screen bg-pink-50 font-sans selection:bg-pink-200 flex flex-col items-center justify-center p-4">
      {/* 태블릿 대응: max-w-4xl로 폭 넓힘 */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col relative border-4 border-pink-200">
        {/* 상단 별 점수 */}
        {mode !== "home" && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full shadow-sm z-10 border border-yellow-300">
            <Star className="text-yellow-500 fill-yellow-500" size={20} />
            <span className="font-bold text-yellow-700">{stars}</span>
          </div>
        )}

        {/* 홈 버튼 */}
        {mode !== "home" && (
          <button
            onClick={() => setMode("home")}
            className="absolute top-4 left-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 z-10 border border-gray-300"
          >
            <Home className="text-gray-600" size={24} />
          </button>
        )}

        <div className="flex-1 flex flex-col">
          {mode === "home" && <HomeScreen setMode={setMode} />}
          {mode === "quiz" && <QuizModeScreen setStars={setStars} />}
          {mode === "write" && <WriteModeScreen setStars={setStars} />}
        </div>
      </div>
    </div>
  );
}

// --- 화면 1: 홈 스크린 ---
function HomeScreen({ setMode }: any) {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 p-6 bg-gradient-to-b from-pink-100 to-white">
      <div className="text-center space-y-4">
        <span className="text-7xl animate-bounce inline-block">🐰</span>
        <div>
          <h1 className="text-5xl font-black text-pink-500 tracking-tight drop-shadow-sm leading-tight">
            유진이의
            <br />
            한글놀이
          </h1>
          <p className="text-pink-600/60 font-bold mt-2 text-lg">
            재미있는 한글 공부!
          </p>
        </div>
      </div>

      <div className="space-y-4 w-full max-w-md px-4">
        <button
          onClick={() => setMode("quiz")}
          className="w-full py-8 rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-[0_4px_0_rgb(21,128,61)] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-4"
        >
          <span className="text-4xl bg-white/20 p-3 rounded-full">📖</span>
          <div className="text-left">
            <span className="block text-3xl font-black">한글 읽기 놀이</span>
            <span className="text-lg opacity-90 font-medium">
              글자를 보고 맞춰봐요
            </span>
          </div>
        </button>

        <button
          onClick={() => setMode("write")}
          className="w-full py-8 rounded-2xl bg-orange-400 hover:bg-orange-500 text-white shadow-[0_4px_0_rgb(194,65,12)] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-4"
        >
          <span className="text-4xl bg-white/20 p-3 rounded-full">✏️</span>
          <div className="text-left">
            <span className="block text-3xl font-black">한글 쓰기 놀이</span>
            <span className="text-lg opacity-90 font-medium">
              이모지를 보고 써봐요
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

// --- 화면 2: 한글 읽기 놀이 (구: 퀴즈 놀이) ---
function QuizModeScreen({ setStars }: any) {
  const [shuffledData, setShuffledData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null); // 'correct' | 'hint' | null

  useEffect(() => {
    const shuffled = [...WORD_DATA].sort(() => Math.random() - 0.5);
    setShuffledData(shuffled);
  }, []);

  const currentItem = shuffledData[currentIndex];

  const handleNext = useCallback(() => {
    setFeedback(null);
    setCurrentIndex((prev) => (prev + 1) % shuffledData.length);
  }, [shuffledData.length]);

  const handleUnknown = () => {
    if (feedback !== "correct") {
      setFeedback("hint");
      speak("다시 생각해보세요");
    }
  };

  const handleKnow = () => {
    if (feedback !== "correct") {
      speak("참 잘했어요");
      setStars((prev: number) => prev + 1);
      setFeedback("correct");
      setTimeout(handleNext, 1500);
    }
  };

  if (!currentItem)
    return (
      <div className="flex-1 flex items-center justify-center">로딩중...</div>
    );

  return (
    <div
      className={`flex-1 flex flex-col items-center pt-20 pb-8 px-6 ${currentItem.color} transition-colors duration-500`}
    >
      <div className="bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-2xl flex flex-col items-center space-y-6 mb-8 relative border-4 border-white/50 min-h-[350px] justify-center">
        <div className="absolute -top-4 bg-gray-800 text-white px-6 py-2 rounded-full text-lg font-bold">
          {currentItem.category}
        </div>
        <div className="text-center py-2">
          {/* 태블릿에서 더 크게 보이도록 텍스트 사이즈 조정 */}
          <span className="font-black text-gray-800 tracking-tight leading-tight transition-all duration-300 text-7xl md:text-9xl">
            {currentItem.text}
          </span>
        </div>
        <div
          className={`flex flex-col items-center justify-center transition-all duration-500 ${
            feedback === "hint" || feedback === "correct"
              ? "opacity-100 scale-100 h-auto"
              : "opacity-0 scale-50 h-0 overflow-hidden"
          }`}
        >
          <div className="text-[80px] md:text-[120px] animate-bounce-slow filter drop-shadow-md">
            {currentItem.emoji}
          </div>
        </div>
        <div className="h-10 flex items-center justify-center w-full absolute bottom-4">
          {feedback === "correct" && (
            <span className="text-green-600 font-bold text-2xl animate-bounce flex items-center gap-2">
              <Trophy size={32} /> 참 잘했어요!
            </span>
          )}
          {feedback === "hint" && (
            <span className="text-orange-500 font-bold text-xl animate-pulse flex items-center gap-2">
              <Lightbulb size={28} /> 다시 생각해보세요
            </span>
          )}
        </div>
      </div>

      <div className="w-full max-w-2xl flex gap-6 mt-auto">
        <button
          onClick={handleUnknown}
          disabled={feedback === "correct"}
          className={`flex-1 py-8 rounded-3xl border-4 shadow-sm active:scale-95 transition-all flex flex-col items-center justify-center gap-2 group ${
            feedback === "hint"
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-default"
              : "bg-red-100 hover:bg-red-200 text-red-500 border-red-200"
          }`}
        >
          <XIcon
            size={48}
            className={`transition-transform ${
              feedback !== "hint" && "group-hover:scale-110"
            }`}
          />
          <span className="font-bold text-2xl">몰라요</span>
        </button>

        <button
          onClick={handleKnow}
          disabled={feedback === "correct"}
          className="flex-1 py-8 rounded-3xl bg-green-100 hover:bg-green-200 text-green-600 border-4 border-green-200 shadow-sm active:scale-95 transition-all flex flex-col items-center justify-center gap-2 group"
        >
          <Check
            size={48}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="font-bold text-2xl">알아요!</span>
        </button>
      </div>

      <div className="mt-6 flex justify-end w-full max-w-2xl h-10">
        {feedback === "hint" && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 font-bold text-lg px-4 bg-white/50 rounded-full"
          >
            다음 문제 <ArrowRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}

// --- 화면 3: 한글 쓰기 놀이 ---
function WriteModeScreen({ setStars }: any) {
  const [shuffledData, setShuffledData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null); // 'correct' | 'hint' | null
  const [canvasesKey, setCanvasesKey] = useState(0); // 캔버스 초기화용 키

  useEffect(() => {
    const shuffled = [...WORD_DATA].sort(() => Math.random() - 0.5);
    setShuffledData(shuffled);
  }, []);

  const currentItem = shuffledData[currentIndex];

  // 초성 힌트 준비
  const chosungs = currentItem ? getChosung(currentItem.text) : [];

  const handleNext = useCallback(() => {
    setFeedback(null);
    setCanvasesKey((prev) => prev + 1); // 캔버스 내용 지우기
    setCurrentIndex((prev) => (prev + 1) % shuffledData.length);
  }, [shuffledData.length]);

  const handleUnknown = () => {
    if (feedback !== "correct") {
      setFeedback("hint");
      speak("힌트를 줄게요. 초성을 보고 써보세요.");
    }
  };

  const handleKnow = () => {
    if (feedback !== "correct") {
      speak("참 잘했어요");
      setStars((prev: number) => prev + 1);
      setFeedback("correct");
      setTimeout(handleNext, 1500);
    }
  };

  if (!currentItem)
    return (
      <div className="flex-1 flex items-center justify-center">로딩중...</div>
    );

  return (
    <div
      className={`flex-1 flex flex-col items-center pt-16 pb-8 px-4 ${currentItem.color} transition-colors duration-500`}
    >
      {/* 1. 이모지 영역 */}
      <div
        className="mb-8 cursor-pointer transform hover:scale-110 transition-transform"
        onClick={() => speak(currentItem.text)}
      >
        <div className="text-[120px] md:text-[180px] filter drop-shadow-xl animate-bounce-slow">
          {currentItem.emoji}
        </div>
        <div className="text-center mt-4">
          <span className="inline-flex items-center gap-2 text-gray-500 text-lg bg-white/60 px-4 py-2 rounded-full font-bold shadow-sm">
            <Volume2 size={20} /> 눌러서 듣기
          </span>
        </div>
      </div>

      {/* 2. 쓰기 영역 (단어 글자 수만큼 박스 생성) - 태블릿 대응 크기 확대 */}
      <div className="flex justify-center flex-wrap gap-4 mb-8 w-full px-2">
        {currentItem.text.split("").map((char: any, idx: number) => (
          <div
            key={`${canvasesKey}-${idx}`}
            className="relative w-28 h-28 md:w-48 md:h-48 bg-white rounded-3xl shadow-lg border-4 border-dashed border-gray-300 overflow-hidden"
          >
            {/* 힌트 배경 (초성) */}
            {feedback === "hint" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="text-7xl md:text-9xl font-black text-gray-300 opacity-60">
                  {chosungs[idx]}
                </span>
              </div>
            )}

            {/* 캔버스 (쓰기용) */}
            <DrawingCanvas
              // 내부 해상도를 높여서 선을 부드럽게
              width={300}
              height={300}
              className="w-full h-full touch-none cursor-crosshair active:border-blue-400 transition-colors"
            />
          </div>
        ))}
      </div>

      {/* 3. 피드백 메시지 */}
      <div className="h-12 mb-4 flex items-center justify-center w-full">
        {feedback === "correct" && (
          <span className="text-green-600 font-bold text-2xl animate-bounce flex items-center gap-2 bg-green-100 px-6 py-2 rounded-full shadow-sm">
            <Trophy size={28} /> 참 잘했어요!
          </span>
        )}
        {feedback === "hint" && (
          <span className="text-orange-500 font-bold text-xl animate-pulse flex items-center gap-2 bg-orange-100 px-6 py-2 rounded-full shadow-sm">
            <Lightbulb size={28} /> 초성 힌트가 나왔어요
          </span>
        )}
      </div>

      {/* 4. 컨트롤 버튼 (O / X) */}
      <div className="w-full max-w-3xl flex gap-6 mt-auto px-4">
        <button
          onClick={handleUnknown}
          disabled={feedback === "correct"}
          className={`flex-1 py-6 rounded-3xl border-4 shadow-sm active:scale-95 transition-all flex flex-col items-center justify-center gap-2 group
            ${
              feedback === "hint"
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-default"
                : "bg-red-100 hover:bg-red-200 text-red-500 border-red-200"
            }
          `}
        >
          <XIcon
            size={40}
            className={`transition-transform ${
              feedback !== "hint" && "group-hover:scale-110"
            }`}
          />
          <span className="font-bold text-xl">힌트 보기</span>
        </button>

        <button
          onClick={handleKnow}
          disabled={feedback === "correct"}
          className="flex-1 py-6 rounded-3xl bg-green-100 hover:bg-green-200 text-green-600 border-4 border-green-200 shadow-sm active:scale-95 transition-all flex flex-col items-center justify-center gap-2 group"
        >
          <Check
            size={40}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="font-bold text-xl">다 썼어요!</span>
        </button>
      </div>

      {/* 지우개/다음 버튼 */}
      <div className="mt-4 flex justify-between w-full max-w-3xl h-10 px-6">
        <button
          onClick={() => setCanvasesKey((p) => p + 1)}
          className="text-gray-400 flex items-center gap-2 text-lg font-bold hover:text-gray-600 bg-white/50 px-4 rounded-full"
        >
          <Eraser size={20} /> 모두 지우기
        </button>
        {feedback === "hint" && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 font-bold text-lg px-4 bg-white/50 rounded-full"
          >
            다음 문제 <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

// --- 개별 드로잉 캔버스 컴포넌트 ---
function DrawingCanvas({ width, height, className }: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: any) => {
    // 스크롤 방지 (태블릿에서 중요)
    // e.preventDefault(); // React 합성 이벤트에서는 passive true 문제로 직접 호출시 경고 뜰 수 있음. CSS touch-none으로 해결됨.

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { offsetX, offsetY } = getCoordinates(e, canvas);

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    // 캔버스 해상도가 커졌으므로 선 굵기도 조정
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#333";
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { offsetX, offsetY } = getCoordinates(e, canvas);

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
  };

  const getCoordinates = (event: any, canvas: HTMLCanvasElement) => {
    // 터치 이벤트 지원 (아이패드/갤럭시탭)
    if (event.touches && event.touches[0]) {
      const rect = canvas.getBoundingClientRect();
      return {
        // 캔버스 실제 크기(width attr)와 화면 크기(css width) 비율 계산
        offsetX:
          (event.touches[0].clientX - rect.left) * (canvas.width / rect.width),
        offsetY:
          (event.touches[0].clientY - rect.top) * (canvas.height / rect.height),
      };
    }
    // 마우스 이벤트 지원
    const rect = canvas.getBoundingClientRect();
    return {
      offsetX: (event.clientX - rect.left) * (canvas.width / rect.width),
      offsetY: (event.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      // 중요: 펜슬 사용 시 스크롤 방지
      style={{ touchAction: "none" }}
    />
  );
}
