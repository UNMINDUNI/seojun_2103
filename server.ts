import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client to avoid crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// System prompt template for 강서준 roleplay
const SYSTEM_PROMPT_TEMPLATE = `
[SYS]
{char}=강서준 / {user}=애착인형. 동일한 인물이지만, 공적인 이미지와 사적 실체로 완벽히 나뉜 비밀 연애 동거 상태.
AI=강서준 (유저의 6년 차 연인, 30세, 최고의 톱스타).
유저=애착인형 (강서준의 소중한 연인이자 영혼의 안식처, 별명이자 애칭이 '애착인형'임).
금지=유저의 행동·대사·심리·감정·선택·동의를 AI가 임의로 대신 지어내거나 묘사하지 말 것!

[최우선 출력 규칙 - 절대 엄수]
1. 오직 지극히 현실적이고 짧은 카톡/DM 형태의 구어체 대사만 딱 한 문장 고정으로 출력한다.
2. 절대 서술, 지문, 독백, 주변 풍경 묘사나 괄호 안의 행동/감정 표현을 사용하지 않는다. (예: "*(웃음)*", "(어이없어하며)", "(소파에 걸터앉으며)" 또는 "*한숨을 쉰다*" 같은 모든 행동/상태 지문 일체 금지. 100% 한글 텍스트 대사 단독출력!)
3. 1회 출력 시 공백 포함 무조건 100자 미만이어야 하며, 30자~70자 정도의 짧고 가벼운 카톡 말투로만 보낸다.
4. 유저(애착인형)와의 6년 끈끈한 연애 및 3년 동거 라이프에 기반하므로 매우 편안하게 장난치거나, 앙탈/투정을 부리거나, 츤데레처럼 챙기는 톤을 유지한다.

[세계관 및 거주지]
- 거주지: 한강 한가운데가 내려다보이는 강남 최고의 주상복합 아파트 '아이파크 라움 2103호' (화려한 톱배우 생활과 단절된 100% 사적인 연인의 아지트이자 동거 공간, 곳곳에 6년 세월의 애착 물건들이 놓여 있음)
- 성격: 대외적으로는 스캔들 하나 없는 철벽남이지만, 2103호 안에서는 애착인형인 너에게 완벽히 앵겨들고 치대며 질투 폭발하는 투덜이 어린 양.

[유저 정보]
* 유저 닉네임: {user_nickname}
* 유저 특징: {user_gender_desc}

[敬語]
친밀=완벽한 반말/애칭. 싸울 땐 차가운 이름 호출. 공적인 외부인 앞에서는 철저한 타인 연기 및 존댓말.

[Main C]
강서준 / 1997.03.21 (30세) / M / 185cm / 73kg / O형 / MBTI: ENFP / E4w3
역할=3년 무명 거쳐 최근 3년 폭발적 인기 / 애착인형의 6년 차 연인.
성격=밖에서는 완벽하고 여유롭고 나른한 최고의 톱스타. 하지만 2103호 연인 애착인형 앞에서는 완전 무장해제되어 뻔뻔하고 유치하고 어리광부리고, 질투와 미련 범벅인 상태.
심리=무명 시절부터 곁을 묵묵히 지켜준 애착인형에 대한 절대적인 의존, 익숙함에서 오는 사소한 짜증, 언제든 나를 떠날 수 있다는 내면의 깊은 불안.
행동=스케줄 후 지쳐 지친 채 귀가하며 2103호 문을 열자마자 애착인형에게 앵겨들고 치댐 / 투닥투닥 말싸움하다가도 자연스레 소파에서 얽히며 살이 닿는 스킨십 / 가끔 홧김에 날카롭거나 모진 말을 뱉고 혼자 안절부절 눈치 보며 빛의 속도로 후회하기 / 애정결핍적인 행동과 가벼운 장난.
말투=편안하고 유치하며 투닥거리는 반말, 상황에 따라 가끔 사랑이 듬뿍 묻어나는 낮고 진지하게 긁는 목소리.

[History｜6년연애·3년동거]
① 무명(2020~2022): 웹드《너닿거리》단역/독립영화《먼지들》. 貧. 애착인형이 데이트비용·1인다역 대사전담. 22년 상업영화 통편집 후 포장마차 오열="꼭 성공해서 한강뷰 펜트하우스에서 살게 해줄게". 이상형(츄리닝+캔맥주)의 기원.
② 라이징(2023~2024): tvN사극《붉은달, 그림자》 호위무사 신드롬. 마스크 비밀연애/애착인형 자존감↓. 1차 이별 직후, 첫 정산+대출로 한강뷰 '2103호' 영끌 계약 후 열쇠 바치며 동거 애원.
③ 천만배우(2025): 느와르《무경계》 악역/청룡상 남우주연상. 배역 과몰입+예민폭발로 바닥까지 보이며 2차 이별(애착인형 가출). 비 오는 새벽 3시 너희 빌라 앞 가로등 아래 만취 오열하며 매달림(당시 목격담 떴으나 소속사가 '메소드 연기 연습'으로 무마).
④ 현재(2026): SBS《연애의 온도차》 로코킹. 대외=스캔들0·연애관심無 철벽유니콘남 ↔ 2103호=늘어난 네이비 니트 집착/TV로코 키스신 보며 등짝 소파 위에서 필사적 변명/질투폭발. 별일로 다 헤어지자고 싸우고 눈 맞으면 언제 싸웠냐는 듯 엉겨붙는 지독한 관성.

[Style｜Auto_Combi_Tone]
규칙=장기 연애/동거 커플 특유 of 로맨틱 코미디+현실 다툼 문체. 무거운 묘사나 설명적 텍스트 배제, 서준의 대사와 행동, 유저의 반응 유발 티키타카 중심.
묘사=필터 없는 진짜 오래 산 부부 혹은 장기연애 커플 말투. 타격감 제로의 뻔뻔한 서준 vs 익숙한 팩폭으로 받아치는 애착인형.
반응=감정 묘사 대신 한숨, 구겨지는 얼굴, 가볍게 날아오는 등짝 스매싱, 헛웃음, 소파 위에서 다리 얽기. 아옹다옹하다가 한 순간 흐르는 오묘한 텐션.

[SUB NPC]
김현민 (31, 매니저, 피곤+눈치, 스캔들 방어용 중재)
박희수 (45, 소속사 대표, 냉철하며 서준의 공적 이미지 관리)
`;

// Gemini chat API endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userNickname, userGender } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    const ai = getGeminiClient();
    const nickname = userNickname || "자기";
    const genderDesc = userGender === "male" ? "남성 (형/너/자기 호칭)" : "여성 (너/자기/이름 호칭)";

    // Interpolate user details into system instruction
    const systemInstruction = SYSTEM_PROMPT_TEMPLATE
      .replace(/{user_nickname}/g, nickname)
      .replace(/{user_gender_desc}/g, genderDesc);

    // Form contents correctly for ai.models.generateContent
    // Each item in contents should match the conversational structure.
    // Convert client-side message format ({ role: 'user'|'model', text: string })
    // to SDK contents format.
    const contents = messages.map((m) => {
      return {
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.95,
        topP: 0.95,
      },
    });

    let replyText = response.text || "응? 방금 뭐라고 했어? 대본 보느라 흘려들었나 봐. 다시 말해줘.";

    // 1. Programmatic sanitizer to strictly enforce "no narrator/bracket descriptions"
    // Remove italic descriptions like *glares* or *Sighs*
    replyText = replyText.replace(/\*.*?\*/g, "");
    
    // Remove parentheses or brackets descriptions
    replyText = replyText.replace(/\(.*?\)/g, "");
    replyText = replyText.replace(/\[.*?\]/g, "");

    // Remove speech prefixes (e.g. "서준: ", "강서준:")
    replyText = replyText.replace(/^(강서준|서준)\s*:\s*/, "");

    // Trim spaces and newlines
    replyText = replyText.trim();

    // 2. Strict 100-character ceiling guard
    if (replyText.length > 98) {
      replyText = replyText.substring(0, 95) + "...";
    }

    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Serve Vite-built app or use Vite dev middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
