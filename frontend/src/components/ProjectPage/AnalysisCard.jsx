import React, { useState } from "react";
import { usePracticeData, useModelData } from "../../hooks/useProjectData";
import "../../styles/AnalysisCard.css";
import { SpeedGraph, RestGraph, EnergyGraph } from "./Graph";
import play from "../../assets/icons/play.png";

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
    else if (achievementLevel === 6) return "미달성";
    else return "분석불가";
  };
  const getColor = () => {
    if (achievementLevel === 3) return "#3A7EFC";
    else if (achievementLevel === 4 || achievementLevel === 2) return "#FFA03B";
    else if (
      achievementLevel === 1 ||
      achievementLevel === 5 ||
      achievementLevel === 6
    )
      return "#FF595C";
    else return "rgba(230, 230, 230, 0.8)";
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
  if (!achievement) return 0;

  if (achievement > 110) return 5;
  else if (achievement > 105) return 4;
  else if (achievement >= 95) return 3;
  else if (achievement >= 90) return 2;
  else return 1;
};

const getRestStatus = (achievement) => {
  if (!achievement) return 0;

  if (achievement > 140) return 5;
  else if (achievement > 120) return 4;
  else if (achievement >= 80) return 3;
  else if (achievement >= 60) return 2;
  else return 1;
};

const getEnergyStatus = (pitch, volume) => {
  const achievement = pitch * volume;
  const statusMap = {
    16: 5,
    12: 4,
    9: 3,
    8: 6,
    6: 2,
    4: 1,
  };
  return statusMap[achievement] || 0;
};

const getPitchStatus = (pitchSd) => {
  if (pitchSd > 110) {
    return 4;
  } else if (pitchSd >= 90) {
    return 3;
  } else {
    return 2;
  }
};

const getVolumeStatus = (volumeSd) => {
  if (volumeSd > 120) {
    return 4;
  } else if (volumeSd >= 80) {
    return 3;
  } else {
    return 2;
  }
};

const getSpeedMessage = (
  speedStatus,
  restStatus,
  modelPitch,
  analysisPitch
) => {
  let feedback = "";

  if (speedStatus > 3) {
    feedback +=
      "속도가 빠릅니다. 청중이 이해하기 어려울 수 있으니 속도를 조절해 보세요.";
    if (restStatus >= 3)
      feedback += "\n말을 어절별로 조금 더 천천히 이어가 보세요.";
    else feedback += "\n전체적인 분량을 줄이고, 어절별로 천천히 말해 보세요.";
    if (analysisPitch > modelPitch)
      feedback +=
        "\n목소리 피치가 높아 같은 속도에서도 더 빠르게 느껴질 수 있습니다. 조금 더 여유롭게 말해 보세요.";
    else
      feedback +=
        "\n다만 목소리 톤이 낮은 편이라 롤모델보다 약간 빠르게 말하는 것이 효과적일 수 있습니다.";
  } else if (speedStatus === 3)
    feedback += "속도가 적절합니다. 현재 리듬을 잘 유지하세요!";
  else if (speedStatus < 3) {
    feedback +=
      "속도가 느립니다. 청중의 집중도를 유지하기 위해 속도를 조금 더 높여 보세요.";
    if (restStatus > 3)
      feedback += "\n어절별로 조금 더 빠르게 이어서 말해 보세요.";
    else if (restStatus < 3)
      feedback +=
        "\n추가적으로 설명하고 싶은 부분의 분량을 늘려 더 자세하게 빠르게 말해보세요.";
    if (analysisPitch > modelPitch)
      feedback +=
        "\n다만 목소리 톤이 높아 롤모델보다 약간 느리게 말하는 것이 효과적일 수 있습니다.";
    else
      feedback +=
        "\n목소리 톤이 낮은 편이라 롤모델보다 빠르게 말하는 것이 효과적일 수 있습니다.";
  }
  return feedback || "분석 불가";
};

const getRestMessage = (restStatus) => {
  let feedback = "";
  if (restStatus > 3)
    feedback +=
      "끊어 읽기가 너무 잦아 흐름이 끊깁니다. 더 부드럽게 연결하여 말해 보세요.";
  if (restStatus < 3)
    feedback +=
      "어절을 지나치게 이어 말하고 있습니다. 중간중간 끊어 읽으며 호흡을 정리해 보세요.";
  else
    feedback +=
      "끊어 읽기의 빈도가 적절합니다. 청중이 이해하기 쉽게 전달하고 있습니다.";

  return feedback || "분석 불가";
};

const getEnergyMessage = (pitchStatus, volumeStatus, accentCount) => {
  let feedback = "";
  const lack = accentCount > 0;

  if (pitchStatus > 3) {
    feedback +=
      "목소리 피치 변화 범위가 너무 큽니다. 피치를 조금 더 안정적으로 유지해 보세요.";
    if (lack)
      feedback +=
        "\n추가적으로, 톤의 범위를 줄이되, 톤의 변화를 더 자주 주는 방식으로 시도해 보세요.";
  } else if (pitchStatus < 3)
    feedback +=
      "목소리 피치 변화가 단조로워 지루하게 느껴질 수 있습니다. 단락 전환 시 피치에 변화를 주어 감정을 표현해 보세요.";

  if (volumeStatus > 3) {
    feedback +=
      "\n목소리 크기 변화 범위가 너무 큽니다. 조금 더 차분하게 말해 보세요.";
    if (lack)
      feedback +=
        "\n추가적으로, 목소리 크기의 범위를 줄이되, 목소리 크기의 변화를 더 자주 주는 방식으로 시도해 보세요.";
  } else if (volumeStatus < 3)
    feedback +=
      "\n목소리 크기가 지나치게 일정합니다. 강조하고 싶은 단어를 더 힘 있게 말해 청중의 주의를 끌어 보세요.";

  if (pitchStatus === 3 && volumeStatus === 3)
    feedback +=
      "목소리 크기와 톤 변화 모두 적절합니다. 훌륭한 전달력을 보여주고 있습니다.";

  return feedback || "분석 불가";
};

const toRound = (value) => {
  return (Math.round(value * 10) / 10).toFixed(1);
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
            title="끊어읽기"
            achievementLevel={getRestStatus(achievement?.rest)}
            targetValue={`목표 끊어읽기 : ${toRound(
              modelData?.restPerMinute
            )} 회`}
            className={selectedSection === "rest" ? "selected" : ""}
          />
        </div>
        <div onClick={() => handleCardClick("energy")}>
          <AnalysisContentCard
            title="에너지"
            achievementLevel={getEnergyStatus(
              getPitchStatus(achievement?.pitchSD),
              getVolumeStatus(achievement?.volumeSD)
            )}
            targetValue={
              modelData?.pitchSD > 60 && modelData?.volumeSD > 10
                ? "목표 에너지 : 굉장히 역동적"
                : modelData?.pitchSD > 60 || modelData?.volumeSD > 10
                ? "목표 에너지 : 역동적"
                : "목표 에너지 : 정적"
            }
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
              {`현재 ${analysisData?.wpm || 0} wpm 으로, \n${getSpeedMessage(
                getSpeedStatus(achievement?.wpm),
                getRestStatus(achievement?.rest),
                modelData?.pitch,
                analysisData?.pitch
              )}`}
            </div>
            <div className="graph-container">
              <SpeedGraph
                modelSpeed={modelData?.wpm}
                mySpeed={analysisData?.wpm}
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
              {`WPM(Words Per Minute)이란? \n분당 발화한 단어 수를 뜻합니다. 벤치말크에서 제공하는 WPM은 기존 방식과 달리 문장 사이의 긴 쉼 간격을 제거하여 보다 정확한 발화 속도를 분석합니다. \n이 방법은 불필요한 멈춤으로 인한 왜곡을 최소화하여 효과적인 피드백을 제공합니다.`}
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
                toRound(analysisData?.restPerMinute) || 0
              } 회로, \n${getRestMessage(getRestStatus(achievement?.rest))}`}
            </div>
            <div className="graph-container">
              <RestGraph
                modelRest={toRound(modelData?.restPerMinute)}
                myRest={toRound(analysisData?.restPerMinute)}
              />
            </div>

            <div
              onClick={() => onAudioTimeChange(50)}
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
              끊어읽기 {toRound(modelData?.restPerMinute)} 회 문장 들어보기
            </div>
            <div
              style={{
                color: "#646875",
                whiteSpace: "pre-line",
                lineHeight: "1.7",
                fontSize: "16px",
              }}
            >
              {`끊어읽기란? \n분당 일정 시간 이상 휴지를 둔 횟수를 뜻합니다. 이는 호흡과 리듬감을 평가하는 데 사용됩니다. \n벤치말크에서는 180ms 이상의 멈춤(쉼)을 하나의 휴지로 인식하며, 이 기준은 일반적인 문장 구조에서의 자연스러운 호흡 간격을 반영합니다. 끊어읽기가 너무 많거나 너무 적을 경우 각각 지나치게 느리거나 빠른 말하기 스타일로 해석될 수 있습니다. 이러한 분석을 통해 적절한 끊어읽기 빈도를 유지하도록 피드백을 제공합니다.`}
            </div>
          </>
        )}
        {selectedSection === "energy" && (
          <>
            <div
              style={{
                fontSize: 19,
                fontWeight: 400,
                whiteSpace: "pre-line",
                lineHeight: "1.5",
              }}
            >
              {`${getEnergyMessage(
                getPitchStatus(achievement?.pitchSD),
                getVolumeStatus(achievement?.volumeSD),
                modelData?.accent - analysisData?.accent
              )}`}
              {modelData?.accent - analysisData?.accent > 2 &&
                `\n분당 ${toRound(
                  modelData?.accent - analysisData?.accent
                )}번 정도 더 강조 효과를 주세요. 속도, 크기, 톤 변화를 활용하면 전달력을 더욱 높일 수 있습니다.`}
            </div>

            <div className="graph-container">
              <h3>에너지 분산도</h3>
              <EnergyGraph
                modelPitches={modelData?.pitches}
                modelVolumes={modelData?.volumes}
                myPitches={analysisData?.pitches}
                myVolumes={analysisData?.volumes}
              />
            </div>
            <div
              onClick={() => onAudioTimeChange(62)}
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
              에너지 들어보기
            </div>
            <div
              style={{
                color: "#646875",
                whiteSpace: "pre-line",
                lineHeight: "1.7",
                fontSize: "16px",
              }}
            >
              {`에너지 분산도란? \n목소리 에너지의 분포를 나타낸 그래프입니다. 그래프에서 점들의 분산이 넓을수록 에너지가 더 다이나믹하다는 것을 의미합니다. \n가로축은 피치(음높이)를, 세로축은 데시벨(음량)을 나타내, 점이 가로로 넓게 퍼져 있을수록 피치 변화가 다양하고, 세로로 넓게 퍼져 있을수록 볼륨 변화가 다양함을 의미합니다. 이를 통해 발화의 톤과 강세 사용 패턴을 분석할 수 있습니다.`}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AnalysisCard;
