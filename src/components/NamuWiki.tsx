import React, { useRef } from "react";
import { MessageSquare, Heart, Flame, Moon, Award, Video, Tv, BookOpen } from "lucide-react";

export default function NamuWiki() {
  // Simple scroll-to-footnote handler
  const footnoteRefs = {
    fn1: useRef<HTMLDivElement>(null),
    fn2: useRef<HTMLDivElement>(null),
    fn3: useRef<HTMLDivElement>(null),
    fn4: useRef<HTMLDivElement>(null),
    fn5: useRef<HTMLDivElement>(null),
  };

  const scrollToFootnote = (fnKey: "fn1" | "fn2" | "fn3" | "fn4" | "fn5") => {
    footnoteRefs[fnKey].current?.scrollIntoView({ behavior: "smooth", block: "center" });
    // Temporary flash highlight effect
    const element = footnoteRefs[fnKey].current;
    if (element) {
      element.classList.add("bg-amber-100/70", "transition-all");
      setTimeout(() => {
        element.classList.remove("bg-amber-100/70");
      }, 1500);
    }
  };

  return (
    <div id="namuwiki-section" className="bg-[#fcfcfc] text-[#373a3c] font-sans min-h-screen border-t border-[#e3e5eb]">
      {/* Wiki Theme Navigation Bar */}
      <div className="bg-[#1c1c1f] text-white py-3 px-4 sm:px-8 border-b border-[#2d2d31]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg text-emerald-400 select-none tracking-wider">나무위키</span>
            <span className="text-[10px] bg-emerald-500 text-black font-bold px-1 rounded">나무</span>
          </div>
          <div className="flex items-center gap-3 text-xs opacity-75">
            <span>최근 변경</span>
            <span>최근 토론</span>
            <span>특수 기능</span>
          </div>
        </div>
      </div>

      {/* Main Document Frame */}
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Document Title Header */}
        <div className="border-b-2 border-[#1c1c1f] pb-2 mb-6">
          <div className="flex md:items-baseline justify-between flex-wrap gap-2">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">강서준</h1>
            <span className="text-xs text-gray-500 font-mono">최근 수정 시각: 2026-05-27 10:24:15</span>
          </div>
        </div>

        {/* Big Quote / Interview Banner */}
        <div className="my-6 p-4 sm:p-5 bg-white border-l-4 border-emerald-500 rounded-r shadow-sm">
          <p className="italic text-base text-gray-700 font-medium leading-relaxed">
            &ldquo;당분간 연애할 생각은 없습니다. 지금은 연기에만 집중하고 싶거든요.&rdquo;
          </p>
          <p className="text-xs text-gray-500 text-right mt-2 font-semibold">
            ─ 2026년 백상예술대상 인터뷰 中
          </p>
        </div>

        {/* Wiki Layout Content split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main text content columns */}
          <div className="md:col-span-2 space-y-6 text-[15px] leading-relaxed">
            
            {/* 1. 개요 */}
            <section>
              <h2 className="text-xl font-bold bg-[#eaeaea] text-gray-800 border-l-4 border-[#00a29c] py-1 px-3 mb-2 flex items-center gap-1.5">
                <span className="text-xs text-emerald-500">1.</span> 개요
              </h2>
              <p className="text-[#373a3c] text-justify">
                대한민국의 톱배우.
                <br />
                현재 대한민국 캐스팅 0순위로 꼽히는 20대 후반~30대 초반 남자 배우 중 단연 톱이다. 데뷔 초반 독립영화와 웹드라마 단역을 전전하며 무명 시절을 보냈으나, 2023년 사극 《붉은 달, 그림자》의 호위무사 역으로 신드롬급 인기를 얻으며 단숨에 라이징 스타로 떠올랐다. 이후 느와르 영화 《무경계》로 천만 관객을 돌파하며 연기력까지 입증, 현재는 로맨틱 코미디 《연애의 온도차》로 '국민 로코킹' 타이틀까지 거머쥐며 최전성기를 달리고 있다.
              </p>
            </section>

            {/* 2. 활동 */}
            <section>
              <h2 className="text-xl font-bold bg-[#eaeaea] text-gray-800 border-l-4 border-[#00a29c] py-1 px-3 mb-2 flex items-center gap-1.5">
                <span className="text-xs text-emerald-500">2.</span> 활동
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-1 mb-1.5 text-base flex items-center gap-1">
                    <span className="text-emerald-500">■</span> 무명 시절 (2020~2022)
                  </h3>
                  <p className="text-justify text-gray-700">
                    데뷔작인 웹드라마에서는 남주인공의 병풍 친구1 역할이었다. 이후 독립영화 《먼지들》에서 주인공을 맡아 평단의 호평을 받았으나 관객수는 3천 명에 그쳤다. 여담으로 당시 출연했던 상업 영화에서는 아예 통편집을 당해 스크린에 뒤통수만 3초 나왔던 뼈아픈 과거가 있다.{" "}
                    <button onClick={() => scrollToFootnote("fn1")} className="text-emerald-600 font-bold hover:underline cursor-pointer text-xs">[1]</button>
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-1 mb-1.5 text-base flex items-center gap-1">
                    <span className="text-emerald-500">■</span> 라이징 스타 등극 (2023~2024)
                  </h3>
                  <p className="text-justify text-gray-700">
                    드라마 《붉은 달, 그림자》에서 여주인공을 위해 목숨을 바치는 맹목적인 서브남주 '무영' 역을 완벽하게 소화했다. 특유의 처연하고 절절한 눈빛 연기가 화제가 되었는데, 당시 팬들 사이에서는 "저건 진짜 누구 한 번 미친 듯이 짝사랑해 보거나 차여본 놈의 눈깔이다"라는 우스갯소리가 돌았다.{" "}
                    <button onClick={() => scrollToFootnote("fn2")} className="text-emerald-600 font-bold hover:underline cursor-pointer text-xs">[2]</button>
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-1 mb-1.5 text-base flex items-center gap-1">
                    <span className="text-emerald-500">■</span> 천만 배우와 로코킹 (2025~현재)
                  </h3>
                  <p className="text-justify text-gray-700">
                    사이코패스 악역(무경계)으로 청룡영화상 남우주연상을 수상하며 아이돌급 인기를 넘어선 '진짜 배우'로 인정받았다. 현재 방영 중인 《연애의 온도차》에서는 다정하지만 선을 긋는 철벽남 본부장 역을 맡아 매회 레전드 키스신(?)을 갱신 중이다.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. 출연 작품 */}
            <section>
              <h2 className="text-xl font-bold bg-[#eaeaea] text-gray-800 border-l-4 border-[#00a29c] py-1 px-3 mb-2 flex items-center gap-1.5">
                <span className="text-xs text-emerald-500">3.</span> 출연 작품
              </h2>

              {/* 3.1. 영화 */}
              <div className="mb-4">
                <h3 className="font-bold text-gray-800 text-sm mb-1.5 flex items-center gap-1">
                  <Video className="w-4 h-4 text-emerald-600" /> 3.1. 영화
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-300">
                    <thead className="bg-[#f0f0f0] text-gray-800 font-bold">
                      <tr>
                        <th className="border border-gray-300 p-2 w-16">개봉 연도</th>
                        <th className="border border-gray-300 p-2">제목</th>
                        <th className="border border-gray-300 p-2 w-20">배역</th>
                        <th className="border border-gray-300 p-2">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2 font-mono">2021</td>
                        <td className="border border-gray-300 p-2 font-semibold">먼지들</td>
                        <td className="border border-gray-300 p-2">우진</td>
                        <td className="border border-gray-300 p-2 text-gray-500">주연 (독립영화)</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2 font-mono">2022</td>
                        <td className="border border-gray-300 p-2 font-semibold text-gray-400 italic">(제목 미상)</td>
                        <td className="border border-gray-300 p-2 text-gray-400">-</td>
                        <td className="border border-gray-300 p-2 text-gray-400">엑스트라 (통편집)</td>
                      </tr>
                      <tr className="hover:bg-emerald-50/40">
                        <td className="border border-gray-300 p-2 font-mono">2025</td>
                        <td className="border border-gray-300 p-2 font-semibold text-emerald-800">무경계</td>
                        <td className="border border-gray-300 p-2 font-medium">정태수</td>
                        <td className="border border-gray-300 p-2 font-semibold text-emerald-600">원탑 주연 / 천만 관객</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3.2. 드라마 */}
              <div>
                <h3 className="font-bold text-gray-800 text-sm mb-1.5 flex items-center gap-1">
                  <Tv className="w-4 h-4 text-emerald-600" /> 3.2. 드라마
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse border border-gray-300">
                    <thead className="bg-[#f0f0f0] text-gray-800 font-bold">
                      <tr>
                        <th className="border border-gray-300 p-2 w-16">방영 연도</th>
                        <th className="border border-gray-300 p-2 w-16">방송사</th>
                        <th className="border border-gray-300 p-2">제목</th>
                        <th className="border border-gray-300 p-2 w-20">배역</th>
                        <th className="border border-gray-300 p-2">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2 font-mono">2020</td>
                        <td className="border border-gray-300 p-2 text-gray-500">웹드라마</td>
                        <td className="border border-gray-300 p-2 font-semibold">너에게 닿는 거리 10cm</td>
                        <td className="border border-gray-300 p-2">민호</td>
                        <td className="border border-gray-300 p-2 text-gray-400">단역 (데뷔작)</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2 font-mono">2023</td>
                        <td className="border border-gray-300 p-2">tvN</td>
                        <td className="border border-gray-300 p-2 font-semibold">붉은 달, 그림자</td>
                        <td className="border border-gray-300 p-2">무영</td>
                        <td className="border border-gray-300 p-2 text-gray-500">서브 주연 (신드롬 역)</td>
                      </tr>
                      <tr className="hover:bg-emerald-50/40">
                        <td className="border border-gray-300 p-2 font-mono">2026</td>
                        <td className="border border-gray-300 p-2">SBS</td>
                        <td className="border border-gray-300 p-2 font-semibold text-emerald-800">연애의 온도차</td>
                        <td className="border border-gray-300 p-2 font-semibold">차도윤</td>
                        <td className="border border-gray-300 p-2 font-semibold text-[#0066cc]">남주인공 (방영 중)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 4. 여담 */}
            <section>
              <h2 className="text-xl font-bold bg-[#eaeaea] text-gray-800 border-l-4 border-[#00a29c] py-1 px-3 mb-2 flex items-center gap-1.5">
                <span className="text-xs text-emerald-500">4.</span> 여담
              </h2>
              <ul className="list-disc pl-5 space-y-3 text-gray-700">
                <li>
                  대외적인 이미지와 달리 MBTI가 ENFP다. 본인 피셜 친해지면 장난도 많이 치고 애교도(?) 있는 편이라고 하나, 동료 여배우들에게 철벽을 치기로 유명해 팬들 사이에서는 '유니콘 같은 남자'로 불린다. 데뷔 후 6년 동안 단 한 번의 스캔들도 없었다.{" "}
                  <button onClick={() => scrollToFootnote("fn3")} className="text-emerald-600 font-bold hover:underline cursor-pointer text-xs">[3]</button>
                </li>
                <li>
                  인터뷰에서 이상형을 묻는 질문에 항상 &ldquo;오래된 사이처럼 편안하고, 츄리닝에 캔맥주 하나만 들고 한강을 걸어도 좋은 사람&rdquo;이라고 매우 구체적으로 언급한다.
                </li>
                <li>
                  1년 전 영화 《무경계》 촬영 당시, 심리적으로 많이 힘들어했다고 한다. 비 오는 날 새벽 3시쯤 모 빌라 단지 앞에서 오열하며 누군가의 집 문을 거칠게 두드리는 강서준을 봤다는 목격담이 온라인 커뮤니티에 올라왔으나, 소속사 측에서 '메소드 연기 연습 중이었다'고 쾌속 해명하며 해프닝으로 끝났다.{" "}
                  <button onClick={() => scrollToFootnote("fn4")} className="text-emerald-600 font-bold hover:underline cursor-pointer text-xs">[4]</button>
                </li>
                <li>
                  의외로 물건에 애착이 강하다. 팬들이 조공한 수백만 원짜리 명품 에디션 옷들을 드레스룸에 가득 두고, 대본 리딩 등 중요한 스케줄이 있을 때마다 꼭 목이 살짝 늘어난 '네이비색 니트'를 집착하듯 찾아서 골라 입고 간다.
                </li>
                <li>
                  쉬는 날에는 절대 밖을 나가지 않는 극단적인 '집돌이'라고 한다. 최근 예능에서 집 전체가 공개된 적은 없고, 고급 아파트(본인 소유 한강 뷰 2103호) 거실 소파 귀퉁이만 아주 잠깐 전파를 탔다.{" "}
                  <button onClick={() => scrollToFootnote("fn5")} className="text-emerald-600 font-bold hover:underline cursor-pointer text-xs">[5]</button>
                </li>
              </ul>
            </section>

          </div>

          {/* Right-side Wiki actor profile infobox */}
          <div className="md:col-span-1">
            <div className="border border-gray-300 rounded shadow-sm overflow-hidden text-sm bg-[#fafbfc]">
              {/* Box Title Banner */}
              <div className="bg-[#1c1c1f] text-white p-3 font-bold text-center">
                <span className="text-emerald-400">강서준</span>
                <p className="text-[10.5px] text-gray-300 font-normal mt-0.5">Kang Seo-jun</p>
              </div>

              {/* Box Info Rows */}
              <table className="w-full text-xs">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 text-[#444] font-bold p-2.5 w-24 text-center">출생</td>
                    <td className="p-2.5">
                      1997년 3월 21일 (30세)
                      <br />
                      대한민국 서울특별시
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 text-[#444] font-bold p-2.5 text-center">국적</td>
                    <td className="p-2.5">대한민국</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 text-[#444] font-bold p-2.5 text-center">신체</td>
                    <td className="p-2.5">185cm, 73kg, O형</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 text-[#444] font-bold p-2.5 text-center">학력</td>
                    <td className="p-2.5">중앙대학교 예술대학 (연극영화학 / 학사)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 text-[#444] font-bold p-2.5 text-center">소속사</td>
                    <td className="p-2.5 text-[#0066cc]">HS엔터테인먼트</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 text-[#444] font-bold p-2.5 text-center">데뷔</td>
                    <td className="p-2.5">
                      2020년 웹드라마 《너에게 닿는 거리 10cm》
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="bg-gray-100 text-[#444] font-bold p-2.5 text-center">MBTI</td>
                    <td className="p-2.5 font-bold text-emerald-700">ENFP</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-200 text-xs text-emerald-800 leading-relaxed">
              <span className="font-bold">💡 위키 팁!</span>
              <br />
              본 문서 본문을 꼼꼼히 확인하고 주석 항목의 비밀 설정(동거, 만취 울음, 늘어난 니트의 진실)을 토대로 가상 인스타그램에서 서준에게 퀴즈나 질문을 던져보세요!
            </div>
          </div>
        </div>

        {/* 5. Footnotes Section */}
        <section className="mt-12 pt-6 border-t border-gray-300">
          <h2 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">주석 및 각주</h2>
          <div className="space-y-3.5 text-xs text-gray-600 leading-relaxed">
            
            <div ref={footnoteRefs.fn1} className="flex gap-2 p-1.5 rounded transition-colors">
              <span className="font-bold text-[#00a29c] shrink-0 font-mono">[1]</span>
              <p>
                이날 극장에서 통편집된 본인의 뒤통수를 보고 충격받아 포장마차에서 엄청 오열했다고 전해진다. (※ {"{user}"}가 데이트 비용 내주고 같이 포장마차에서 달래줬던 그날)
              </p>
            </div>

            <div ref={footnoteRefs.fn2} className="flex gap-2 p-1.5 rounded transition-colors">
              <span className="font-bold text-[#00a29c] shrink-0 font-mono">[2]</span>
              <p>
                실제로 당시 본인 현실 연애에서 첫 이별을 겪고 밤새 슬퍼 바닥을 격렬하게 기고 있었다 카더라. (※ {"{user}"}와 다퉜던 당시)
              </p>
            </div>

            <div ref={footnoteRefs.fn3} className="flex gap-2 p-1.5 rounded transition-colors">
              <span className="font-bold text-[#00a29c] shrink-0 font-mono">[3]</span>
              <div className="text-gray-400 select-none">
                <span className="line-through decoration-[#ee2a7b]/60 text-gray-600">
                  사실 6년째 꽁꽁 숨겨둔 애인이자 동거인이 있어서 철벽을 치는 거다. 철벽 안 치면 집에서 쫓겨난다.
                </span>
                <span className="text-[10px] ml-1 bg-[#ee2a7b]/10 text-[#ee2a7b] px-1 py-0.2 rounded font-semibold">(나무위키 기밀 편집)</span>
              </div>
            </div>

            <div ref={footnoteRefs.fn4} className="flex gap-2 p-1.5 rounded transition-colors">
              <span className="font-bold text-[#00a29c] shrink-0 font-mono">[4]</span>
              <div className="text-gray-400 select-none">
                <span className="line-through decoration-[#ee2a7b]/60 text-gray-600">
                  당연히 메소드 연기 연습이 아니라 진짜로 차여서 한밤중에 매달리고 울고불고 짜고 있던 중이었다.
                </span>
                <span className="text-[10px] ml-1 bg-[#ee2a7b]/10 text-[#ee2a7b] px-1 py-0.2 rounded font-semibold">(나무위키 기밀 편집)</span>
              </div>
            </div>

            <div ref={footnoteRefs.fn5} className="flex gap-2 p-1.5 rounded transition-colors">
              <span className="font-bold text-[#00a29c] shrink-0 font-mono">[5]</span>
              <p>
                소파 쿠션 옆에 남자 사이즈가 아닌 작은 사이즈의 수면 양말이 포착되어 잠깐 실시간 난리가 났으나, 소속사가 &apos;여성 코디의 것&apos;이라고 빛의 속도로 해명했다. (※ 실체는 2103호에 동거 중인 연인 {"{user}"}의 귀여운 수면 양말)
              </p>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
