import React, { useState } from "react";
import { usePracticeData, useModelData } from "../../hooks/useProjectData";
import "../../styles/AnalysisCard.css";

const AnalysisContentCard = ({
  title,
  isAchieved,
  isOver,
  isLacked,
  targetValue,
  className,
}) => {
  const getMessage = () => {
    if (isAchieved) return "달성";
    if (isOver) return "초과";
    if (isLacked) return "미달";
    return "미달성";
  };

  return (
    <div className={`analysis-content-card ${className || ""}`}>
      <h3>{title}</h3>
      <div
        className="achievement-status"
        style={{ backgroundColor: isAchieved ? "#4350e6" : "#e64345" }}
      >
        {getMessage()}
      </div>
      <div>{targetValue}</div>
    </div>
  );
};

const getSpeedStatus = (modelWpm, analysisWpm) => {
  if (!modelWpm || !analysisWpm) return { isAchieved: false };

  const upperLimit = modelWpm * 1.05;
  const lowerLimit = modelWpm * 0.95;

  if (analysisWpm > upperLimit) {
    return { isOver: true, isAchieved: false };
  } else if (analysisWpm >= lowerLimit && analysisWpm <= upperLimit) {
    return { isAchieved: true };
  } else {
    return { isLacked: true, isAchieved: false };
  }
};

const getRestStatus = (modelRest, analysisRest) => {
  if (!modelRest || !analysisRest) return { isAchieved: false };

  const upperLimit = modelRest * 1.2;
  const lowerLimit = modelRest * 0.8;

  if (analysisRest >= lowerLimit && analysisRest <= upperLimit) {
    return { isAchieved: true };
  } else if (analysisRest > upperLimit) {
    return { isOver: true, isAchieved: false };
  } else {
    return { isLacked: true, isAchieved: false };
  }
};

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

  if (!practiceId) return <div>연습을 선택해주세요</div>;
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
            {...getSpeedStatus(modelData?.wpm, analysisData?.wpm)}
            targetValue={`목표 빠르기 : ${modelData?.wpm} wpm`}
            className={selectedSection === "speed" ? "selected" : ""}
          />
        </div>
        <div onClick={() => handleCardClick("rest")}>
          <AnalysisContentCard
            title="쉼"
            {...getRestStatus(
              modelData?.restPerMinute,
              analysisData?.restPerMinute
            )}
            targetValue={`분당 목표 쉼 : ${modelData?.restPerMinute} 회`}
            className={selectedSection === "rest" ? "selected" : ""}
          />
        </div>
        <div onClick={() => handleCardClick("energy")}>
          <AnalysisContentCard
            title="강조"
            isAchieved={achievement.energy === 100}
            targetValue={`목표 강조 : ${modelData?.energy}`}
            className={selectedSection === "energy" ? "selected" : ""}
          />
        </div>
      </div>
      <div className="analysis-section">
        {selectedSection === "speed" && (
          <>
            <div>롤모델 빠르기: {modelData?.wpm || 0} wpm</div>
            <div>나의 빠르기: {analysisData?.wpm || 0} wpm</div>
          </>
        )}
        {selectedSection === "rest" && (
          <>
            <div>롤모델 분당 쉼: {modelData?.restPerMinute} 회</div>
            <div>롤모델 쉼: {modelData?.rest} 회</div>
            <div>나의 분당 쉼: {analysisData?.restPerMinute} 회</div>
            <div>나의 쉼: {analysisData?.rest} 회</div>
          </>
        )}
        {selectedSection === "energy" && <div>에너지 섹션 내용</div>}
      </div>
      <div className="tem-section">
        <div className="analysis-section">
          <h3>롤모델 분석 데이터</h3>
          {modelLoading ? (
            <div>롤모델 데이터 로딩중...</div>
          ) : modelError ? (
            <div>{modelError}</div>
          ) : (
            <>
              <div>롤모델 빠르기: {modelData?.wpm || 0} wpm</div>
              <div>음성 높낮이: {modelData?.pitch || 0}</div>
              <div>쉼: {modelData?.rest || 0}</div>
              <div>분당 쉼: {modelData?.restPerMinute || 0}</div>
              <div>에너지: {modelData?.energy || 0}</div>
              <div>자신감: {modelData?.confidence || 0}</div>
            </>
          )}
        </div>
        <div className="analysis-section">
          <h3>내 연습 분석 데이터</h3>
          <div>말하기 속도: {analysisData?.wpm || 0}</div>
          <div>음성 높낮이: {analysisData?.pitch || 0}</div>
          <div>쉼: {analysisData?.rest || 0}</div>
          <div>분당 쉼: {analysisData?.restPerMinute || 0}</div>
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
