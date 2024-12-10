import React, { useState } from "react";
import { usePracticeData, useModelData } from "../../hooks/useProjectData";
import "../../styles/AnalysisCard.css";
import Graph from "./Graph";
import play from "../../assets/icons/play.png";
import AudioPlayer from "./AudioPlayer";

const AnalysisContentCard = ({
  title,
  achievementLevel,
  targetValue,
  className,
}) => {
  const getMessage = () => {
    if (achievementLevel === 3) return "달성";
    else if (achievementLevel === 5) return "초과";
    else if (achievementLevel === 4) return "약간 초과";
    else if (achievementLevel === 1) return "미달";
    else if (achievementLevel === 2) return "약간 미달";
    else return "분석불가";
  };
  const getColor = () => {
    if (achievementLevel === 3) return "#4350e6";
    else if (achievementLevel === 4 || achievementLevel === 2) return "#FF9B4B";
    else if (achievementLevel === 1 || achievementLevel === 5) return "#e64345";
    else return "#e6e6e6";
  };
  return (
    <div className={`analysis-content-card ${className || ""}`}>
      <h3>{title}</h3>
      <div
        className="achievement-status"
        style={{ backgroundColor: getColor() }}
      >
        {getMessage()}
      </div>
      <div>{targetValue}</div>
    </div>
  );
};

const getSpeedStatus = (achievement) => {
  if (achievement > 110) return 5;
  else if (achievement > 105 && achievement <= 110) return 4;
  else if (achievement <= 105 && achievement >= 95) return 3;
  else if (achievement < 95 && achievement >= 90) return 2;
  else if (achievement < 90) return 1;
  else return 0;
};

const getRestStatus = (achievement) => {
  if (achievement > 140) return 5;
  else if (achievement > 120 && achievement <= 140) return 4;
  else if (achievement <= 120 && achievement >= 80) return 3;
  else if (achievement < 80 && achievement >= 60) return 2;
  else if (achievement < 60) return 1;
  else return 0;
};

const getEnergyStatus = (modelPitchSd, analysisPitchSd) => {
  if (!modelPitchSd || !analysisPitchSd) return 0;

  const achievement = (analysisPitchSd / modelPitchSd) * 100;
  console.log("강조 달성도", achievement);

  if (achievement > 120) return 5;
  else if (achievement > 110 && achievement <= 120) return 4;
  else if (achievement <= 110 && achievement >= 90) return 3;
  else if (achievement < 90 && achievement >= 80) return 2;
  else if (achievement < 80) return 1;
  else return 0;
};

function AnalysisCard({
  practiceName,
  practiceId,
  modelId,
  onAudioTimeChange,
}) {
  const [selectedSection, setSelectedSection] = useState("speed");
  const { analysisData, achievement, loading, error } =
    usePracticeData(practiceId);
  console.log("achievement 전체:", achievement);
  console.log("achievement.wpm:", achievement?.wpm);
  const {
    modelData,
    loading: modelLoading,
    error: modelError,
  } = useModelData(modelId);

  const handleCardClick = (section) => {
    setSelectedSection(section);
  };

  if (!practiceId)
    return <div className="empty-menu-message">연습을 추가하세요</div>;
  if (loading)
    return <div className="empty-menu-message">연습 데이터 로딩중...</div>;
  if (error) return <div className="empty-menu-message">{error}</div>;
  if (!analysisData)
    return (
      <div className="empty-menu-message">연습 분석 데이터가 없습니다.</div>
    );

  return (
    <div className="analysis-card">
      <div className="analysis-card-title">{practiceName}</div>
      <div className="analysis-content">
        <div onClick={() => handleCardClick("speed")}>
          <AnalysisContentCard
            title="빠르기"
            achievementLevel={getSpeedStatus(achievement?.wpm)}
            targetValue={`목표 빠르기 : ${modelData?.wpm} wpm`}
            className={selectedSection === "speed" ? "selected" : ""}
          />
        </div>
        <div onClick={() => handleCardClick("rest")}>
          <AnalysisContentCard
            title="쉼"
            achievementLevel={getRestStatus(achievement?.rest)}
            targetValue={`목표 분당 쉼 : ${modelData?.restPerMinute} 회`}
            className={selectedSection === "rest" ? "selected" : ""}
          />
        </div>
        <div onClick={() => handleCardClick("energy")}>
          <AnalysisContentCard
            title="강조"
            achievementLevel={getEnergyStatus(
              modelData?.pitchSD,
              analysisData?.pitchSD
            )}
            targetValue={`목표 강조 : 다양하게`}
            className={selectedSection === "energy" ? "selected" : ""}
          />
        </div>
      </div>
      <div className="analysis-section">
        {selectedSection === "speed" && (
          <>
            <div
              style={{
                fontSize: 19,
                fontWeight: 400,
                whiteSpace: "pre-line",
                lineHeight: "1.5",
              }}
            >
              {`현재 ${
                analysisData?.wpm || 0
              } wpm 으로, 너무 느려요. \n좀 더 빠르게 말해보세요. 분량을 더 추가하거나 더 자세하게 설명해도 좋아요.`}
            </div>
            <div
              onClick={() => onAudioTimeChange(90)}
              className="play-model-audio"
              style={{
                cursor: "pointer",
                color: "#4350e6",
                fontWeight: 500,
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <img src={play} alt="play" style={{ width: "30px" }} />
              {modelData?.wpm} wpm 문장 들어보기
            </div>
            <div
              style={{
                color: "#646875",
                whiteSpace: "pre-line",
                lineHeight: "1.7",
                fontSize: "16px",
              }}
            >
              {`WPM(Words Per Minute)이란? \n분당 발화한 단어 수를 뜻합니다. 벤치말크에서 제공하는 WPM은 기존 방식과 달리 문장 사이의 긴 쉼 간격을 제거하여 보다 정확한 발화 속도를 분석합니다. 이 방법은 불필요한 멈춤으로 인한 왜곡을 최소화하여 효과적인 피드백을 제공합니다.`}
            </div>
          </>
        )}
        {selectedSection === "rest" && (
          <>
            <div
              style={{
                fontSize: 19,
                fontWeight: 400,
                whiteSpace: "pre-line",
                lineHeight: "1.5",
              }}
            >
              {`현재 분당 쉼이 ${
                analysisData?.restPerMinute || 0
              } 회로, 좀 많아요. \n한 문장을 조금 더 이어서 말해보세요. 쉼의 빈도를 줄이면 더 자연스러운 흐름으로 청중에게 메시지를 전달할 수 있습니다.`}
            </div>
            <div
              onClick={() => onAudioTimeChange(90)}
              className="play-model-audio"
              style={{
                cursor: "pointer",
                color: "#4350e6",
                fontWeight: 500,
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <img src={play} alt="play" style={{ width: "30px" }} />
              분당 쉼 {modelData?.restPerMinute} 회 문장 들어보기
            </div>
            <div
              style={{
                color: "#646875",
                whiteSpace: "pre-line",
                lineHeight: "1.7",
                fontSize: "16px",
              }}
            >
              {`분당 쉼이란? \n분당 쉼은 말하는 동안 1분 동안 일정 시간 이상 멈춘 횟수를 뜻합니다. 이는 말 속도와 호흡 조절의 일관성을 평가하는 데 사용됩니다. \n벤치말크에서는 180ms 이상의 멈춤을 하나의 쉼으로 인식하며, 이 기준은 일반적인 문장 구조에서의 자연스러운 호흡 간격을 반영합니다. 쉼이 너무 많거나 너무 적을 경우 각각 지나치게 느리거나 빠른 말하기 스타일로 해석될 수 있습니다. 이러한 분석을 통해 적절한 쉼의 빈도를 유지하도록 피드백을 제공합니다.`}
            </div>
          </>
        )}
        {selectedSection === "energy" && (
          <div className="energy-section">
            <div
              style={{
                fontSize: 19,
                fontWeight: 400,
                whiteSpace: "pre-line",
                lineHeight: "1.5",
              }}
            >
              {`롤모델보다 비교적 모노톤으로 말하고 있어요. 모노톤은 발표가 지루해질 수 있어요. 볼륨과 피치를 더 다양하게 사용해보세요.`}
            </div>

            <div className="graph-container">
              <h3>강조 분산도</h3>
              <Graph
                modelPitches={modelData?.pitches}
                modelVolumes={modelData?.volumes}
                myPitches={analysisData?.pitches}
                myVolumes={analysisData?.volumes}
              />
            </div>
            <div
              onClick={() => onAudioTimeChange(90)}
              className="play-model-audio"
              style={{
                cursor: "pointer",
                color: "#4350e6",
                fontWeight: 500,
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <img src={play} alt="play" style={{ width: "30px" }} />
              강조 문장 들어보기
            </div>
            <div
              style={{
                color: "#646875",
                whiteSpace: "pre-line",
                lineHeight: "1.7",
                fontSize: "16px",
              }}
            >
              {`강조 분산도란? \n목소리 톤의 분포를 나타낸 그래프입니다. 그래프에서 점들의 분산이 넓을수록 강조가 더 다양하다는 것을 의미합니다. \n가로축은 피치(음높이)를, 세로축은 데시벨(음량)을 나타내며, 점이 가로로 넓게 퍼져 있을수록 피치 변화가 다양하고, 세로로 넓게 퍼져 있을수록 볼륨 변화가 다양함을 의미합니다. 이를 통해 발화의 톤과 강세 사용 패턴을 분석할 수 있습니다.`}
            </div>
          </div>
        )}
      </div>
      {/* <div className="tem-section">
        <div className="analysis-section">
          <h3>롤모델 분석 데이터</h3>
          {modelLoading ? (
            <div>롤모델 데이터 로딩중...</div>
          ) : modelError ? (
            <div>{modelError}</div>
          ) : (
            <>
              <div>롤모델 빠르기: {modelData?.wpm || 0} wpm</div>
              <div>피치 표준편차: {modelData?.pitchSD || 0}</div>
              <div>쉼: {modelData?.rest || 0}</div>
              <div>분당 쉼: {modelData?.restPerMinute || 0}</div>
            </>
          )}
        </div>
        <div className="analysis-section">
          <h3>내 연습 분석 데이터</h3>
          <div>말하기 속도: {analysisData?.wpm || 0} wpm</div>
          <div>피치 표준편차: {analysisData?.pitchSD || 0}</div>
          <div>쉼: {analysisData?.rest || 0}</div>
          <div>분당 쉼: {analysisData?.restPerMinute || 0}</div>
        </div>
        <div className="achievement-section">
          <h3>달성도</h3>
          <div>빠르기: {achievement?.wpm || 0}%</div>
          <div>쉼: {achievement?.rest || 0}%</div>

          <div>
            피치 달성도: {analysisData?.pitchSD / modelData?.pitchSD || 0}%
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default AnalysisCard;
