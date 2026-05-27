import React, { useState } from "react";
import { Search, Eye, FileText, Sparkles, BookOpen, User, Instagram } from "lucide-react";
import { motion } from "motion/react";
import NaverProfile from "./components/NaverProfile";
import NamuWiki from "./components/NamuWiki";
import VirtualInstagram from "./components/VirtualInstagram";
import { InstagramTab } from "./types";

type ViewMode = "portal" | "naver" | "wiki" | "instagram";

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("naver");
  const [instaInitialTab, setInstaInitialTab] = useState<InstagramTab>("official");

  const handleGoToInstagram = (tab: InstagramTab = "official") => {
    setInstaInitialTab(tab);
    setViewMode("instagram");
  };

  return (
    <div id="app-root-container" className="bg-[#f8f9fa] min-h-screen flex flex-col font-sans transition-colors duration-150 text-slate-800">
      
      {/* Absolute Header with Core Portal navigation */}
      <nav id="core-portal-nav" className="bg-slate-900 border-b border-slate-800 text-white shadow-md select-none">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Main Logo Header */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-pink-500 bg-clip-text text-transparent">
              강서준 연인 비밀연애 시뮬레이터
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-300 font-bold px-1.5 py-0.5 rounded border border-slate-700">
              SECRET v3.5
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 overflow-x-auto w-full md:w-auto">
            {/* NAVER Profile Mode BUTTON */}
            <button
              onClick={() => setViewMode("naver")}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                viewMode === "naver"
                  ? "bg-[#03c75a] text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>네이버 인물정보</span>
            </button>

            {/* Namu Wiki Mode BUTTON */}
            <button
              onClick={() => setViewMode("wiki")}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                viewMode === "wiki"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>나무위키</span>
            </button>

            {/* Virtual Instagram BUTTON with live indicator glow */}
            <button
              onClick={() => handleGoToInstagram("official")}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer relative whitespace-nowrap ${
                viewMode === "instagram"
                  ? "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>가상 인스타그램</span>
              
              {/* Pulsing secret heart symbol to tease intimacy */}
              <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-pink-500 ring-2 ring-slate-900 animate-pulse"></span>
            </button>

          </div>
        </div>
      </nav>

      {/* Primary Dynamic App Switcher Viewport */}
      <div className="flex-1 w-full min-h-0 bg-[#fbfbfb]">
        {viewMode === "naver" && (
          <NaverProfile onInstagramClick={() => handleGoToInstagram("official")} />
        )}

        {viewMode === "wiki" && (
          <NamuWiki />
        )}

        {viewMode === "instagram" && (
          <VirtualInstagram 
            onBackToPortal={() => setViewMode("naver")} 
            initialTab={instaInitialTab}
          />
        )}
      </div>

      {/* Shared system footer */}
      <footer className="bg-slate-950 text-slate-500 py-6 text-center border-t border-slate-900 text-xs">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-400">
            🌳 나무위키 숨겨진 비밀 주석들을 모두 찾아본 후 비공개 인스타그램(❤️)에서 강서준에게 수수께끼를 던져보세요!
          </p>
          <p className="text-slate-600 font-medium">
            © 2026 HS Entertainment & Wiki Star. Powered by Gemini 3.5. All Rights Reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
