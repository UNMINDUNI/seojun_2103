import React, { useState, useEffect, useRef } from "react";
import { 
  Instagram, Heart, Briefcase, MessageCircle, Send, SendHorizontal, 
  MapPin, Award, ShieldAlert, Sparkles, User, Settings, CheckCircle, 
  Image as ImageIcon, Grid, ArrowLeft, RefreshCw, AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage, InstagramTab, SecretPost, UserSettings } from "../types";

interface VirtualInstagramProps {
  onBackToPortal: () => void;
  initialTab?: InstagramTab;
}

export default function VirtualInstagram({ onBackToPortal, initialTab = "official" }: VirtualInstagramProps) {
  const [activeTab, setActiveTab] = useState<InstagramTab>(initialTab);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    nickname: "{user}",
    gender: "female",
  });
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Chat simulator state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      role: "model",
      text: "어 연락 왔네! 촬영 없는 날 집에서 뒹굴거리려니까 좀이 쑤신다. 맛있는 거 시켜 먹을까? 이따 올 때 시원한 캔맥주 하나만 사와!",
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
    }
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // States to allow pasting or choosing new feed images
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editImageUrlInput, setEditImageUrlInput] = useState<string>("");
  
  // Official dynamic feed entries with real WebP photos
  const [officialPosts, setOfficialPosts] = useState<SecretPost[]>(() => {
    const defaultOfficial = [
      {
        id: "off-1",
        category: "현재 방영",
        title: "SBS 드라마 《연애의 온도차》",
        subtitle: '"차도윤 본부장역 강서준 배우 스틸컷 대공개"',
        badge: "매주 수목 밤 10시 본방사수!",
        likes: 12023,
        commentsCount: 2,
        date: "2026.05.27",
        imageUrl: "https://i.postimg.cc/B63mCQr1/full-body-solo-2-male-focus-on-table-0-5-hair-slicked-back-leaning-b-s-1251848019.webp",
        caption: "오늘 밤 도윤과 은하의 대망의 한강 다리 키스신 방출 예고!! 후끈한 온도의 차이 함께 느껴보실래요? 😉",
        comments: [
          { id: "c-off1-1", username: "dorama_fan", text: "본방사수 갑니다 키스신 벌써 내 도파민 한도초과!!", time: "1시간 전" },
          { id: "c-off1-2", username: "hs_love", text: "서준 최고 존엄 강서준 꽃길만 걷자아아", time: "30분 전" }
        ]
      },
      {
        id: "off-2",
        category: "남우주연상 수상",
        title: "제46회 청룡영화상 남우주연상",
        subtitle: '영화 《무경계》 (정태수 역)',
        badge: "최고의 연기 찬사",
        likes: 38549,
        commentsCount: 1,
        date: "2025.11.25",
        imageUrl: "https://i.postimg.cc/LXSxV6cp/full-body-solo-2-male-focus-on-table-hair-slicked-back-leaning-back-photo-s-s-3847922501-(1).webp",
        caption: "청룡의 영광을 안겨주신 천만 관객 여러분들과 정태수를 사랑해 주신 모든 분들께 머리 숙여 감사드립니다. 더 겸손하게 깊이 배우겠습니다.",
        comments: [
          { id: "c-off2-1", username: "cinema_mania", text: "태수 악역은 진짜 한국 영화 역사상 최강 소름이었습니다!", time: "3일 전" }
        ]
      },
      {
        id: "off-3",
        category: "천만 돌파",
        title: "영화 《무경계》 (無境界)",
        subtitle: "정태수 역 핏빛 독전 스틸컷",
        badge: "천만 관객 신화",
        likes: 45781,
        commentsCount: 0,
        date: "2025.10.12",
        imageUrl: "https://i.postimg.cc/HkfZVt3Z/full-body-2-male-focus-face-from-side-looking-at-viewer-Still-chair-on-chair-s-3933004525.webp",
        caption: "느와르의 새로운 한 획 《무경계》가 마침내 꿈의 스코어 1,000만을 달성했습니다! 핏빛 연기를 극한으로 선보인 서준 배우 감사패 증정.",
        comments: []
      },
      {
        id: "off-4",
        category: "드라마 명작",
        title: "tvN 드라마 《붉은 달, 그림자》",
        subtitle: '"서브 영웅, 호위무사 무영"',
        badge: "신드롬 급 서브남주",
        likes: 29841,
        commentsCount: 0,
        date: "2023.09.04",
        imageUrl: "https://i.postimg.cc/LXgy2mKq/IMG-1.webp",
        caption: "서글픈 서브남신의 정석, 무영의 마지막 희생 장면 비하인드 컷입니다. 아직도 수많은 팬들의 가슴을 에이게 하는 처연하고 맹목적인 눈빛!",
        comments: []
      },
      {
        id: "off-5",
        category: "뉴스컷 리포트",
        title: '"늘어난 네이비 니트 스캔들?!"',
        subtitle: "소속사 측 '강서준의 오랜 애착템일 뿐, 과도한 추측 자제'",
        badge: "이상형의 재발견",
        likes: 18240,
        commentsCount: 0,
        date: "2026.04.18",
        imageUrl: "https://i.postimg.cc/KjDrfd6s/full-body-1-5-ligne-claire-male-focus-looking-at-viewer-on-white-sofa-aroused-s-3515788154.webp",
        caption: "강서준 배우의 최애템(네이비 니트)은 늘 완벽하게 리폼된 유니크 디자인으로 팬들의 조공 리스트 상위권에 머물러 있습니다. 😄",
        comments: []
      },
      {
        id: "off-6",
        category: "네이버 독점 인터뷰",
        title: "“츄리닝에 한강 캔맥주가 완벽한 내 이상형”",
        subtitle: "강서준 친서민 소탈 발언",
        badge: "이상형 공개 화제",
        likes: 24719,
        commentsCount: 0,
        date: "2025.08.30",
        imageUrl: "https://i.postimg.cc/jjDbmskZ/IMG-Gemini-Generated-Image-pqwux9pqwux9pqwu.webp",
        caption: "배우가 직접 참여한 네이버 독점 프로필 스토리입니다. 편안하고 소소한 일상을 함께 걸어가 주는 헌신적인 사랑이 이상향이라고 밝혔습니다.",
        comments: []
      }
    ];

    const saved = localStorage.getItem("insta_official_posts");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return defaultOfficial.map((p) => {
            const match = parsed.find((x: any) => x.id === p.id);
            if (match && match.imageUrl) {
              return { ...p, imageUrl: match.imageUrl };
            }
            return p;
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
    return defaultOfficial;
  });

  // Secret Posts Database (with real WebP photos and updated names)
  const [secretPosts, setSecretPosts] = useState<SecretPost[]>(() => {
    const defaultSecrets = [
      {
        id: "secret-1",
        imageUrl: "https://i.postimg.cc/LXgy2mKq/IMG-1.webp",
        caption: "매니저 형이나 코디 누나 거 절대 아님 😤 왜 이 다 자란 남자의 거대한 소파 구텡이에 꽁꽁 숨어있는 요 쬐그맣고 달콤한 수면 양말 한 짝이 내 생명줄 같은지 모르겠네. 2103호의 진짜 주인 발자국... 얼른 퇴근해라, 양말 주인이여! 🧦❤️ #2103호 #퇴근시급 #수면양말스캔들",
        likes: 12,
        commentsCount: 2,
        date: "2026.05.15",
        comments: [
          { id: "c1-1", username: "{user}", text: "어젯밤 소파에서 발 시리다고 징징대더니 기어코 찾아다 찍었네ㅋㅋㅋ 치워놓으랬지!", time: "10분 전", isUser: true },
          { id: "c1-2", username: "seojun_2103", text: "절대 못 치워. 이거 소파 붙박이 인테리어야.", time: "8분 전" }
        ]
      },
      {
        id: "secret-2",
        imageUrl: "https://i.postimg.cc/9MwxCc5X/IMG-2.webp",
        caption: "2025년 6월 비 오던 칠흑 같은 밤 🌧️ 소속사 대표님한테 '메소드 연기 리딩 연습' 중이었다고 기사 막히자마자 현민이 형한테 욕을 욕을 바가지로 먹었네... 진짜 나 버리고 나갔을 때 억장 무너졌던 날. 다시는 내 손 놓지 마. 죽어도 안 나줄 테니까.",
        likes: 45,
        commentsCount: 3,
        date: "2025.06.28",
        comments: [
          { id: "c2-1", username: "{user}", text: "이 흑역사를 또 소환하네.. 동네 시끄럽게 소리 소리 지르고 현관문이 구멍 날 정도로 쳐대서 경찰 신고당할까 봐 열어준 줄 알아라 바보야.", time: "1일 전", isUser: true },
          { id: "c2-2", username: "seojun_2103", text: "그럼 어떡해, 네가 나 차단하고 번호 바꾸고 짐 다 싸고 나갔잖아. 톱배우고 청룡이고 나발이고 너 없으면 나 껍데기야 껍데기.", time: "18시간 전" },
          { id: "c2-3", username: "{user}", text: "그래 알아, 그날부터 우리 튼튼한 자물쇠 새로 맞췄다 아주.", time: "15시간 전", isUser: true }
        ]
      },
      {
        id: "secret-3",
        imageUrl: "https://i.postimg.cc/qR6m4pVN/IMG-3.webp",
        caption: "패션 브랜드 협찬에 수백만 원짜리 명품 에디션이 쌓여있으면 뭐하나. 내 운명의 갑옷은 네가 6년 전 무명 때 첫 피땀 흘린 아르바이트 월급 털어 사줬던 이 네이비 니트뿐인데. 🧶 목이 살짝 늘어나서 소속사 대표님은 기절하시려고 하지만, 평생 수선해주고 꿰매줘야 돼.",
        likes: 38,
        commentsCount: 1,
        date: "2026.04.12",
        comments: [
          { id: "c3-1", username: "{user}", text: "아니.. 보풀 제거기라도 좀 돌리게 줘보라고 진짜ㅋㅋㅋ 리딩 목격 기사에 니트 헤진 거 팬들이 보고 HS엔터 가난하냐고 난리났단 말야ㅋㅋㅋ", time: "3일 전", isUser: true }
        ]
      },
      {
        id: "secret-4",
        imageUrl: "https://i.postimg.cc/MKG2dFhM/IMG-1.webp",
        caption: "너랑 한강 돗자리에 쭈그려 누워 캔맥주에 편의점 떡볶이 먹던 그 가을 바람. 내 네이버 공식 프로필 이상형이 왜 '츄리닝에 캔맥주 하나 들고 한강 걷기'로 고정되었는지 세상 사람들은 절대 모른다. 눈앞의 한강 뷰 펜트하우스를 사서 거실 열쇠고리를 바치기까지 먼 길도 너랑 손잡고 캔맥주 홀짝이던 발걸음이 있었네. 사랑한다, 세상에서 가장 따뜻하고 편안한 내 구세주.",
        likes: 56,
        commentsCount: 1,
        date: "2026.02.04",
        comments: [
          { id: "c4-1", username: "{user}", text: "나도 가끔 그 포장마차랑 돗자리가 눈물 나게 그립더라. 지금 한강뷰 최고급 소파 위에서 뒹굴거리는 것도 눈부시게 좋은데, 우린 여전히 그대로네.", time: "4주 전", isUser: true }
        ]
      }
    ];

    const saved = localStorage.getItem("insta_secret_posts");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return defaultSecrets.map((p) => {
            const match = parsed.find((x: any) => x.id === p.id);
            if (match && match.imageUrl) {
              return { ...p, imageUrl: match.imageUrl };
            }
            return p;
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
    return defaultSecrets;
  });

  // Save states to localStorage for persistence
  useEffect(() => {
    localStorage.setItem("insta_secret_posts", JSON.stringify(secretPosts));
  }, [secretPosts]);

  useEffect(() => {
    localStorage.setItem("insta_official_posts", JSON.stringify(officialPosts));
  }, [officialPosts]);

  // Helper inside VirtualInstagram to apply photo edits
  const handleApplyPhotoEdit = (postId: string, newUrl: string) => {
    if (!newUrl.trim()) return;

    setOfficialPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, imageUrl: newUrl } : p))
    );

    setSecretPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, imageUrl: p.imageUrl.startsWith("http") || p.imageUrl === "socks" || p.imageUrl === "crying" || p.imageUrl === "knit" || p.imageUrl === "hanriver" ? newUrl : p.imageUrl } : p))
    );

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({ ...selectedPost, imageUrl: newUrl });
    }

    setEditingPostId(null);
    setEditImageUrlInput("");
  };


  // Selected post modal
  const [selectedPost, setSelectedPost] = useState<SecretPost | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);
    setApiError(null);

    try {
      // Pack the chat history correctly for the server API call
      // Filter out ID & Timestamp to fit backend API
      const strippedHistory = [...chatMessages, userMsg].map((msg) => ({
        role: msg.role,
        text: msg.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: strippedHistory,
          userNickname: userSettings.nickname,
          userGender: userSettings.gender,
        }),
      });

      if (!res.ok) {
        throw new Error("서준이의 소속사(서버)가 너무 조용합니다. API 연결 상태 또는 비밀번호를 다시 확인하세요.");
      }

      const data = await res.json();
      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: "model",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
      };

      setChatMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "연결이 불안정합니다. 잠시 후 강서준에게 다시 톡해보세요.");
      
      // Fallback boyfriend dialogue if server is not fully set up or API key is missing
      setTimeout(() => {
        const fallbackMsg: ChatMessage = {
          id: `fallback-${Date.now()}`,
          role: "model",
          text: `(자동 응답 메세지... 📴) 자기야 미안, 현민이 형한테 핸드폰 뺏겼어😭😭 얼른 집으로 와서 나 꽉 안아줘. 맥주 차갑게 냉동실 올려놨어!`,
          timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
        };
        setChatMessages((prev) => [...prev, fallbackMsg]);
      }, 1000);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePostComment = (postId: string) => {
    if (!newCommentText.trim()) return;

    setSecretPosts((posts) =>
      posts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: `new-c-${Date.now()}`,
            username: "{user}",
            text: newCommentText,
            time: "방금 전",
            isUser: true,
          };
          const updatedComments = [...post.comments, newComment];
          
          // If in modal view, also update selectedPost active modal state
          if (selectedPost && selectedPost.id === postId) {
            setSelectedPost({
              ...selectedPost,
              comments: updatedComments,
              commentsCount: updatedComments.length,
            });
          }

          return {
            ...post,
            comments: updatedComments,
            commentsCount: updatedComments.length,
          };
        }
        return post;
      })
    );

    setNewCommentText("");
  };

  const handleApplyPresetQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div id="virtual-instagram-full" className="bg-[#fafafa] min-h-screen text-[#262626] font-sans">
      {/* Top Application Ribbon */}
      <div className="bg-slate-900 text-white py-2 px-4 text-xs font-semibold flex items-center justify-between shadow-md">
        <span className="flex items-center gap-1.5 text-[#03c75a]">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          연애 6년, 동거 3년 차 강서준과 연애 중
        </span>
        <button 
          onClick={onBackToPortal}
          className="bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded border border-slate-700 cursor-pointer flex items-center gap-1 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> 포털로 돌아가기
        </button>
      </div>

      {/* Instagram Header with Tabs */}
      <div className="bg-white border-b border-[#dbdbdb] py-3 px-4 sm:px-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Instagram className="w-6 h-6 text-[#1e1e1e]" />
            <span className="font-semibold text-lg italic tracking-tight font-serif select-none">
              Instagram
            </span>
          </div>

          {/* Tab Selector: 💼 (Official) vs ❤️ (Private) */}
          <div className="flex items-center bg-gray-100 p-1.5 rounded-full border border-gray-200">
            {/* 💼 Official Agency Account */}
            <button
              onClick={() => { setActiveTab("official"); setShowSettings(false); }}
              className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "official"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "grayscale opacity-50 text-gray-500 hover:opacity-80"
              }`}
              title="소속사 운영 공식 계정"
            >
              <Briefcase className="w-4 h-4" />
              <span>공식</span>
            </button>

            {/* ❤️ Private Secret Account */}
            <button
              onClick={() => { setActiveTab("private"); }}
              className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "private"
                  ? "bg-[#ee2a7b] text-white shadow-sm animate-pulse-slow"
                  : "grayscale opacity-50 text-gray-500 hover:opacity-80"
              }`}
              title="비밀 커플 계정"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>비공개</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-xs">
              U
            </div>
          </div>
        </div>
      </div>

      {/* Body content based on active tab */}
      <div className="max-w-4xl mx-auto py-6 px-4">
        


        {activeTab === "official" ? (
          /* ========================================================
             1. OFFICIAL ACCOMPANY TAB (💼)
             ======================================================== */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Profile Section */}
            <div className="bg-white border border-[#e6e6e6] rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 shadow-xs">
              {/* Profile Image (Glow Ring for Brand Actor) */}
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-slate-900 overflow-hidden relative flex items-center justify-center">
                  <img 
                    src={officialPosts[0]?.imageUrl || "https://i.postimg.cc/7YL8mWpT/IMG-2.webp"} 
                    alt="Actor Profile" 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Profile Meta Info */}
              <div className="flex-1 text-center sm:text-left space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <h2 className="text-xl font-semibold flex items-center justify-center sm:justify-start gap-1">
                    seojun_official
                    <CheckCircle className="w-4 h-4 text-sky-500 fill-current" />
                  </h2>
                  <div className="flex justify-center gap-2">
                    <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded font-semibold border border-slate-200 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-amber-500" /> 소속사 운영 공식 채널
                    </span>
                  </div>
                </div>

                <div className="flex justify-center sm:justify-start gap-4 text-sm font-medium text-gray-500">
                  <span className="text-gray-800"><strong className="text-black">{officialPosts.length}</strong> 게시물</span>
                  <span><strong className="text-black text-gray-800">4.5M</strong> 팔로워</span>
                  <span><strong className="text-black text-gray-800">12</strong> 팔로잉</span>
                </div>

                {/* Bio text */}
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                  <p className="font-bold text-gray-900">강서준 Actor Kang Seo Jun</p>
                  <p className="mt-1">💼 HS Entertainment에서 공식 관리하는 강서준 배우 채널입니다.</p>
                  <p>🎬 SBS 《연애의 온도차》 차도윤 역 열연 방영 중!</p>
                  <p className="text-[#00376b] hover:underline cursor-pointer mt-0.5 font-semibold">🔗 hsent.com/kangseojun</p>
                </div>
              </div>
            </div>

            {/* Post Layout Grid */}
            <div>
              <div className="flex items-center gap-1.5 border-b border-gray-200 pb-3 mb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Grid className="w-4 h-4" />
                <span>공식 필모그래피 & 홍보 아카이브 (Public Feed)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {officialPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="bg-white border border-[#e6e6e6] rounded-lg overflow-hidden group shadow-sm cursor-pointer hover:shadow-md transition-all relative"
                  >
                    {/* Hover actions panel: photo edit */}
                    <div className="absolute top-2 right-2 flex gap-1 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingPostId(post.id);
                          setEditImageUrlInput(post.imageUrl);
                        }}
                        className="bg-slate-900/85 hover:bg-slate-950 text-white rounded-full p-1.5 border border-white/20 shadow-sm opacity-0 group-hover:opacity-100 transition duration-150 cursor-pointer"
                        title="사진 변경"
                      >
                        <Settings className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="aspect-square bg-slate-900 relative flex flex-col justify-center items-center text-white p-4 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title || ""}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover brightness-65 group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Dark gradient mapping overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 z-10"></div>

                      <div className="relative z-10 text-center space-y-1.5 p-2">
                        {post.category && (
                          <span className="text-[9.5px] bg-[#ee2a7b] px-2.5 py-0.5 rounded-full font-black tracking-wider uppercase inline-block">
                            {post.category}
                          </span>
                        )}
                        <h4 className="font-extrabold text-xs sm:text-sm leading-tight text-white mb-0.5">{post.title}</h4>
                        <p className="text-[10px] text-slate-200 font-bold">{post.subtitle}</p>
                        {post.badge && <p className="text-[9px] text-[#03c75a] font-black tracking-tighter bg-white/95 px-2 py-0.5 rounded inline-block shadow-xs">{post.badge}</p>}
                      </div>
                    </div>

                    <div className="p-3 text-xs bg-gray-50 border-t border-gray-100">
                      <p className="font-bold text-gray-800">seojun_official</p>
                      <p className="text-gray-650 font-semibold mt-1 line-clamp-2">{post.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* ========================================================
             2. PRIVATE SECRET INSTAGRAM TAB (❤️)
             ======================================================== */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left side: Profile header & Secret grid (7 cols on large screens) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Profile Card */}
              <div className="bg-gradient-to-tr from-[#ffe3ec] via-white to-pink-50 border border-pink-200 rounded-2xl p-5 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100/30 rounded-full blur-2xl -mr-10 -mt-10"></div>
                
                <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
                  {/* Photo with Glowing Secret pink circle */}
                  <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#ee2a7b] via-[#ee2a7b] to-[#6228d7]">
                    <div className="w-20 h-20 rounded-full border-2 border-white bg-slate-800 overflow-hidden relative flex items-center justify-center">
                      <User className="w-12 h-12 text-slate-300 translate-y-1.5" />
                    </div>
                  </div>

                  {/* Profile Meta Box */}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="text-lg font-bold text-[#df1a6b] flex items-center justify-center sm:justify-start gap-1">
                        seojun_2103
                        <span className="text-[10px] bg-[#ee2a7b] text-white px-1.5 py-0.2 rounded font-black uppercase">SECRET</span>
                      </h3>
                      <span className="text-[11px] font-bold text-pink-600 bg-pink-100/80 px-2 py-0.5 rounded-full border border-pink-200 select-none inline-block max-w-max mx-auto sm:mx-0">
                        비밀 폭로 연인 전용 계정
                      </span>
                    </div>

                    <div className="flex justify-center sm:justify-start gap-3 my-2 text-xs font-semibold text-gray-500">
                      <span>게시물 <strong className="text-pink-600">4</strong></span>
                      <span>팔로워 <strong className="text-pink-600">1</strong></span>
                      <span>팔로잉 <strong className="text-pink-600">1</strong></span>
                    </div>

                     {/* Highly intimate secret bio */}
                    <div className="text-xs text-gray-600 leading-relaxed font-semibold">
                      <p className="text-[#262626] font-bold text-sm">내 사랑 @{"{user}"} 와의 기록</p>
                      <p className="mt-1">💕 6년째 꽁꽁 숨겨가며 연애 중, 3년째 동거 중.</p>
                      <p>🔒 밖에서는 철벽 치지만 네 소파 옆에서는 무한 무장해제 인간.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secret Post Collection */}
              <div>
                <div className="flex items-center justify-between border-b border-pink-100 pb-3 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-black text-pink-600 uppercase tracking-widest">
                    <Grid className="w-4 h-4 text-pink-500" />
                    <span>비밀 피드 (Secret Couple Story)</span>
                  </div>
                  <span className="text-[10px] text-gray-400">비공개로 보호됨 🔒</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {secretPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white border border-pink-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all relative group"
                    >
                      {/* Interactive Visual Element */}
                      <div className="aspect-square bg-slate-900 relative flex flex-col items-center justify-center text-white p-3 text-center overflow-hidden">
                        {post.imageUrl && post.imageUrl.startsWith("http") ? (
                          <img 
                            src={post.imageUrl}
                            alt="Secret Feed Card"
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#ee2a7b]/15 to-[#6228d7]/20 flex flex-col justify-center items-center">
                            <span className="text-3xl filter drop-shadow">🔒</span>
                            <span className="text-[10px] text-pink-300 mt-2 font-bold">비공개 소장 기록</span>
                          </div>
                        )}

                        {/* Interactive overlay icon context info */}
                        {post.id === "secret-1" && !post.imageUrl.startsWith("http") && (
                          <div className="relative z-10 flex flex-col justify-center items-center">
                            <span className="text-4xl filter drop-shadow">🧦</span>
                            <span className="text-[11px] font-bold text-pink-400 mt-2">{"{user}"}의 수면 양말 한 짝</span>
                            <span className="text-[9px] text-gray-300 mt-1">소파 뒤 기밀 발견기</span>
                          </div>
                        )}
                        {post.id === "secret-2" && !post.imageUrl.startsWith("http") && (
                          <div className="relative z-10 flex flex-col justify-center items-center">
                            <span className="text-4xl filter drop-shadow">🌧️</span>
                            <span className="text-[11px] font-extrabold text-red-400 mt-2">새벽 3시 빌라 앞 오열</span>
                            <span className="text-[9px] text-gray-300 mt-1">메소드 연기의 슬픈 현실</span>
                          </div>
                        )}
                        {post.id === "secret-3" && !post.imageUrl.startsWith("http") && (
                          <div className="relative z-10 flex flex-col justify-center items-center">
                            <div className="text-4xl text-sky-400 filter drop-shadow">🧶</div>
                            <span className="text-[11px] font-bold text-sky-300 mt-2">해진 네이비 니트 고집</span>
                            <span className="text-[9px] text-gray-300 mt-1">무명 시절 첫 니트의 비밀</span>
                          </div>
                        )}
                        {post.id === "secret-4" && !post.imageUrl.startsWith("http") && (
                          <div className="relative z-10 flex flex-col justify-center items-center">
                            <span className="text-4xl filter drop-shadow">🍺</span>
                            <span className="text-[11px] font-bold text-yellow-300 mt-2">츄리닝 한강 캔맥주</span>
                            <span className="text-[9px] text-gray-300 mt-1">6년 전 무명 때 데이트 재현</span>
                          </div>
                        )}

                        {/* Hover action to edit Secret image URL */}
                        <div className="absolute top-2 right-2 flex gap-1 z-20">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingPostId(post.id);
                              setEditImageUrlInput(post.imageUrl);
                            }}
                            className="bg-slate-900/85 hover:bg-slate-950 text-white rounded-full p-1.5 border border-white/20 shadow-sm opacity-0 group-hover:opacity-100 transition duration-150 cursor-pointer"
                            title="사진 변경"
                          >
                            <Settings className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Over-hover micro interaction */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-all duration-350 z-10">
                          <span className="flex items-center gap-1 font-bold text-xs text-white">
                            <Heart className="w-4 h-4 fill-pink-500 text-pink-500" /> {post.likes}
                          </span>
                          <span className="flex items-center gap-1 font-bold text-xs text-white">
                            <MessageCircle className="w-4 h-4 text-white" /> {post.commentsCount}
                          </span>
                        </div>
                      </div>

                      {/* Brief Card text */}
                      <div className="p-3 bg-pink-50/30 border-t border-pink-100 text-xs">
                        <p className="font-bold text-gray-800 flex items-center gap-1 text-[11px]">
                          <span>seojun_2103</span>
                        </p>
                        <p className="text-gray-500 font-semibold limit bg-transparent line-clamp-1 truncate mt-0.5">{post.caption}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Secret DM Chat Live (5 cols) */}
            <div className="lg:col-span-5 flex flex-col bg-white border border-pink-200 rounded-2xl shadow-sm overflow-hidden min-h-[500px]">
              
              {/* Chat Title bar */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white border border-pink-200 font-bold select-none text-xs">
                      🦊
                    </div>
                    {/* Active blink dot */}
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400"></span>
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-gray-900 flex items-center gap-1">
                      강서준 (2103호)
                      <span className="text-[9px] text-[#ee2a7b] bg-pink-100 px-1.5 py-0.2 rounded font-bold">실시간 활성화</span>
                    </h3>
                    <p className="text-[10px] text-emerald-600 font-bold">당신을 엄청 사랑하고 의존하는 중 💖</p>
                  </div>
                </div>

                <div className="text-[10px] text-gray-400 font-bold flex items-center gap-1 bg-white border border-pink-100 px-2 py-1 rounded-full">
                  <span>동거 3년차</span>
                </div>
              </div>

              {/* Footnote-related preloaded hints */}
              <div className="bg-slate-50 border-b border-[#f0f0f0] p-2.5">
                <p className="text-[10.5px] font-bold text-slate-500 mb-1.5 px-1 flex items-center gap-1">
                  💡 <span className="text-pink-600">나무위키 비밀 주석 퀴즈 / 대화 추천</span> (클릭 시 입력창에 반영됩니다)
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                  <button 
                    onClick={() => handleApplyPresetQuestion("소파 옆에 그 쬐그만 수면 양말 주인이 여자 코디 양말이라던데 진짜야?ㅋㅋㅋ 해명해봐!")}
                    className="text-[9.5px] bg-white hover:bg-pink-50 border border-slate-200 hover:border-pink-200 rounded px-2 py-1 font-semibold text-slate-700 transition"
                  >
                     코디 양말 해명해 🧦
                  </button>
                  <button 
                    onClick={() => handleApplyPresetQuestion("2025년 여름 비 오는 새벽 3시에 나 우는 거 목격담 진짜 메소드 연기 연습 중이었던 거 마자?")}
                    className="text-[9.5px] bg-white hover:bg-pink-50 border border-slate-200 hover:border-pink-200 rounded px-2 py-1 font-semibold text-slate-700 transition"
                  >
                     새벽 3시 빌라 앞 오열 🌧️
                  </button>
                  <button 
                    onClick={() => handleApplyPresetQuestion("조공받은 명품 다 두고 왜 맨날 보풀 피어 늘어난 네이비 니트만 집요하게 찾아 입고 나가는 거야?")}
                    className="text-[9.5px] bg-white hover:bg-pink-50 border border-slate-200 hover:border-pink-200 rounded px-2 py-1 font-semibold text-slate-700 transition"
                  >
                     늘어난 네이비 니트 🧶
                  </button>
                  <button 
                    onClick={() => handleApplyPresetQuestion("오늘 예능 촬영 비하인드에서 키스신 어쩌구 하던데, 차도윤 본부장님 연기 열심히 하시더라? 해명 대기타기.")}
                    className="text-[9.5px] bg-white hover:bg-pink-50 border border-slate-200 hover:border-pink-200 rounded px-2 py-1 font-semibold text-slate-700 transition"
                  >
                     대본 키스신 해명해 🎬
                  </button>
                  <button 
                    onClick={() => handleApplyPresetQuestion("나 당분간 연애할 생각 없다며 연기에 집중하겠다고 인터뷰 대서특필 났더라?? 기가 맥힌당~")}
                    className="text-[9.5px] bg-white hover:bg-pink-50 border border-slate-200 hover:border-pink-200 rounded px-2 py-1 font-semibold text-slate-700 transition"
                  >
                     비연애 선언 해명해 😤
                  </button>
                </div>
              </div>

              {/* Chat Message Lists */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fff9fa]/30 max-h-[380px] min-h-[300px]">
                {chatMessages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-end gap-1 max-w-[85%]">
                        {!isUser && (
                          <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center font-bold text-xs shrink-0 select-none border border-pink-200">
                            🦊
                          </div>
                        )}
                        <div
                          className={`rounded-2xl px-3.5 py-2.5 text-xs font-semibold leading-relaxed ${
                            isUser
                              ? "bg-[#ee2a7b] text-white rounded-br-none"
                              : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-pink-100"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[9px] text-gray-400 select-none font-medium mb-0.5">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center gap-1.5 text-pink-600 pl-1">
                    <div className="w-5 h-5 rounded-full bg-pink-50 flex items-center justify-center font-bold text-[10px] shrink-0 border border-pink-100">
                      🦊
                    </div>
                    <div className="bg-white border border-pink-100 px-3 py-1.5 rounded-full rounded-bl-none flex items-center gap-1 shadow-sm">
                      <span className="text-[10px] font-semibold">서준이가 급하게 톡 치는 중</span>
                      <span className="flex gap-0.5">
                        <span className="h-1 w-1 bg-pink-600 rounded-full animate-bounce"></span>
                        <span className="h-1 w-1 bg-pink-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="h-1 w-1 bg-pink-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </span>
                    </div>
                  </div>
                )}

                {apiError && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[10px] font-semibold flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <p>{apiError}</p>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Send message Form */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-pink-100 bg-white flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`${userSettings.nickname} 이름으로 서준이와 투닥거리기...`}
                  className="flex-1 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 focus:border-pink-300 rounded-full px-4 py-2 text-xs font-semibold focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className={`p-2 rounded-full cursor-pointer transition-all ${
                    inputValue.trim() && !isTyping
                      ? "bg-[#ee2a7b] text-white hover:bg-pink-600"
                      : "bg-slate-100 text-slate-300"
                  }`}
                >
                  <SendHorizontal className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </div>

      {/* Secret Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 bg-black/65 z-55 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-pink-100 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] sm:max-h-[80vh]"
            >
              {/* Left Side: Photo or Mock Image Placeholder details based on content */}
              <div className="bg-slate-950 flex flex-col justify-center items-center text-white p-6 relative aspect-square md:aspect-auto overflow-hidden">
                {selectedPost.imageUrl && selectedPost.imageUrl.startsWith("http") ? (
                  <img 
                    src={selectedPost.imageUrl} 
                    alt="Selected Feed Post" 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#ee2a7b]/15 to-[#6228d7]/20"></div>
                    {selectedPost.imageUrl === "socks" && <span className="text-7xl mb-2 relative z-10">🧦</span>}
                    {selectedPost.imageUrl === "crying" && <span className="text-7xl mb-2 relative z-10">🌧️</span>}
                    {selectedPost.imageUrl === "knit" && <span className="text-7xl mb-2 relative z-10">🧶</span>}
                    {selectedPost.imageUrl === "hanriver" && <span className="text-7xl mb-2 relative z-10">🍺</span>}
                  </>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/20 pointer-events-none z-10"></div>

                <div className="absolute top-3 left-3 bg-pink-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full select-none z-10">
                  {selectedPost.id.startsWith("off") ? "💼 OFFICIAL POST" : "🔒 SECRET DIARY"}
                </div>

                <p className="text-xs font-bold text-gray-300 mt-2 font-mono relative z-10">
                  {selectedPost.id.startsWith("off") ? "seojun_official" : "seojun_2103"}
                </p>
                <p className="text-[10px] text-pink-400 font-bold relative z-10">{selectedPost.date} 기록물</p>
              </div>

              {/* Right Side: Caption & Detailed Interactive Comments */}
              <div className="flex flex-col h-[400px] md:h-full justify-between bg-white">
                {/* Header info */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-pink-50/20">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-[10px] select-none">
                      🦊
                    </div>
                    <span className="text-xs font-bold text-gray-800">seojun_2103</span>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-gray-400 hover:text-black font-black text-sm p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Caption & Comments List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                  {/* Caption */}
                  <div className="space-y-1">
                    <span className="font-bold text-gray-900 mr-1">seojun_2103</span>
                    <span className="text-gray-700 leading-relaxed font-semibold block bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      {selectedPost.caption}
                    </span>
                    <span className="text-[9px] text-gray-400 block mt-1">{selectedPost.date}</span>
                  </div>

                  {/* Divider line */}
                  <div className="border-t border-gray-100 my-2"></div>

                  {/* List of comments */}
                  <div className="space-y-3">
                    {selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] shrink-0 select-none ${
                          comment.isUser ? "bg-pink-100 text-pink-700 font-black" : "bg-slate-800 text-white"
                        }`}>
                          {comment.isUser ? "U" : "🦊"}
                        </div>
                        <div className="flex-1">
                          <p className="leading-tight">
                            <span className="font-bold text-gray-950 mr-1.5">{comment.username}</span>
                            <span className="text-gray-600 font-semibold">{comment.text}</span>
                          </p>
                          <span className="text-[9px] text-gray-400">{comment.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom interactive send bar */}
                <div className="p-3 border-t border-gray-100 bg-gray-50 flex gap-2">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="비공개 댓글 달기..."
                    className="flex-1 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-xs focus:outline-none focus:border-pink-300 font-semibold"
                    onKeyDown={(e) => e.key === "Enter" && handlePostComment(selectedPost.id)}
                  />
                  <button
                    onClick={() => handlePostComment(selectedPost.id)}
                    className="text-pink-600 hover:text-pink-700 text-xs font-bold px-2.5 cursor-pointer"
                  >
                    게시
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
