import React from "react";
import { usePracticeData, useModelData } from "../../hooks/useProjectData";
import "../../styles/AnalysisCard.css";

function AnalysisCard({ practiceId, modelId }) {
  const { analysisData, achievement, loading, error } =
    usePracticeData(practiceId);
  const {
    modelData,
    loading: modelLoading,
    error: modelError,
  } = useModelData(modelId);

  if (loading || modelLoading) return <div>로딩중...</div>;
  if (error || modelError) return <div>{error || modelError}</div>;
  if (!analysisData || !achievement)
    return <div>분석 데이터가 진짜 없습니다.</div>;

  return (
    <div className="analysis-card">
      <div className="analysis-card-title">분석 결과</div>
      <div className="analysis-content">
        <div className="analysis-section">
          <h3>롤모델 분석 데이터</h3>
          <div>말하기 속도: {modelData?.wpm || 0}</div>
          <div>음성 높낮이: {modelData?.pitch || 0}</div>
          <div>쉼: {modelData?.rest || 0}</div>
          <div>에너지: {modelData?.energy || 0}</div>
          <div>자신감: {modelData?.confidence || 0}</div>
        </div>
        <div className="analysis-section">
          <h3>내 연습 분석 데이터</h3>
          <div>말하기 속도: {analysisData?.wpm || 0}</div>
          <div>음성 높낮이: {analysisData?.pitch || 0}</div>
          <div>쉼: {analysisData?.rest || 0}</div>
          <div>에너지: {analysisData?.energy || 0}</div>
          <div>자신감: {analysisData?.confidence || 0}</div>
        </div>
        <div className="achievement-section">
          <h3>달성도</h3>
          <div>말하기 속도: {achievement?.wpm || 0}%</div>
          <div>음성 높낮이: {achievement?.pitch || 0}%</div>
          <div>쉼: {achievement?.rest || 0}%</div>
          <div>에너지: {achievement?.energy || 0}%</div>
          <div>자신감: {achievement?.confidence || 0}%</div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisCard;
