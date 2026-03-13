/**
 * TDD Lab Page
 */

"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TDDLab } from "@/components/organisms/TDDLab";
import { getChallengeById } from "@/lib/challengeData";
import type { TDDChallenge } from "@/types/challenge";

export default function LabPage() {
  const params = useParams();
  const router = useRouter();
  const [challenge, setChallenge] = useState<TDDChallenge | null>(null);
  const [loading, setLoading] = useState(true);

  const challengeId = params.id as string;

  useEffect(() => {
    const c = getChallengeById(challengeId);
    if (c) {
      setChallenge(c);
    }
    setLoading(false);
  }, [challengeId]);

  const handleBack = () => {
    router.push("/lab");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Challenge Not Found</h1>
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
        >
          Back to Lab
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={handleBack}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Lab
          </button>
          <h1 className="text-xl font-semibold">TDD Lab</h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Lab Content */}
      <main className="py-8">
        <TDDLab challenge={challenge} />
      </main>
    </div>
  );
}
