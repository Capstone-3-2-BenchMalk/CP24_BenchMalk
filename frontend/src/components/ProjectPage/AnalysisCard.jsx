import React, { useState } from "react";
import { usePracticeData, useModelData } from "../../hooks/useProjectData";
import "../../styles/AnalysisCard.css";

const AnalysisContentCard = ({
  title,
  isAchieved,
  targetValue,
  unit,
  className,
}) => (
  <div className={`analysis-content-card ${className || ""}`}>
    <h3>{title}</h3>
    <div
      className="achievement-status"
      style={{ backgroundColor: isAchieved ? "#4350e6" : "#e64345" }}
    >
      {isAchieved ? "달성" : "미달성"}
    </div>
    <div>
      목표 {title} : {targetValue || 0} {unit}
    </div>
  </div>
);

function AnalysisCard({ practiceName, practiceId, modelId }) {
  const [selectedSection, setSelectedSection] = useState("speed");
  const { analysisData, achievement, loading, error } =
    usePracticeData(practiceId);
  const {
    modelData,
    loading: modelLoading,
    error: modelError,
  } = useModelData(modelId);

  const handleCardClick = (section) => {
    setSelectedSection(section);
  };

  if (loading) return <div>연습 데이터 로딩중...</div>;
  if (error) return <div>{error}</div>;
  if (!analysisData || !achievement) return <div>분석 데이터가 없습니다.</div>;

  return (
    <div className="analysis-card">
      <div className="analysis-card-title">{practiceName}</div>
      <div className="analysis-content">
        <div onClick={() => handleCardClick("speed")}>
          <AnalysisContentCard
            title="빠르기"
            isAchieved={achievement.wpm > 80 && achievement.wpm < 120}
            targetValue={modelData?.wpm}
            unit="wpm"
            className={selectedSection === "speed" ? "selected" : ""}
          />
        </div>
        <div onClick={() => handleCardClick("rest")}>
          <AnalysisContentCard
            title="쉼"
            isAchieved={achievement.rest > 100}
            targetValue={modelData?.rest}
            unit="회"
            className={selectedSection === "rest" ? "selected" : ""}
          />
        </div>
        <div onClick={() => handleCardClick("energy")}>
          <AnalysisContentCard
            title="강조"
            isAchieved={achievement.energy === 100}
            targetValue={modelData?.energy}
            unit="회"
            className={selectedSection === "energy" ? "selected" : ""}
          />
        </div>
      </div>
      <div className="analysis-section">
        {selectedSection === "speed" && (
          <>
            <h3>롤모델 분석 데이터</h3>
            {modelLoading ? (
              <div>롤모델 데이터 로딩중...</div>
            ) : modelError ? (
              <div>{modelError}</div>
            ) : (
              <>
                <div>말하기 속도: {modelData?.wpm || 0}</div>
                <div>음성 높낮이: {modelData?.pitch || 0}</div>
                <div>쉼: {modelData?.rest || 0}</div>
                <div>에너지: {modelData?.energy || 0}</div>
                <div>자신감: {modelData?.confidence || 0}</div>
              </>
            )}
          </>
        )}
        {selectedSection === "rest" && <div>호흡 섹션 내용</div>}
        {selectedSection === "energy" && <div>에너지 섹션 내용</div>}
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
  );
}

export default AnalysisCard;
