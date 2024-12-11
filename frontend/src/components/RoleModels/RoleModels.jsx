import React, { useEffect, useState } from "react";
import trashIcon from "../../assets/icons/trash-icon.png";
import "../../styles/CreateProject.css";
import "../../styles/Dashboard.css";
import "../../styles/ProjectPage.css";
import AudioPlayer from "../ProjectPage/AudioPlayer";

function RoleModels() {
  const [file, setFile] = useState(null);
  const [rolemodelList, setRoleModelList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    const fetchPractices = async () => {
      try {
        const response = await fetch("/api/v1/models");
        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, response body: ${errorBody}`
          );
        }
        const data = await response.json();

        // API 데이터 매핑
        const mappedData = data.map((item) => ({
          id: item.id,
          name: item.name,
          type: item.type,
          userid: item.userid,
          duration: item.duration,
          analysis: {
            wpm: item.analysis?.wpm || 0,
            pitch: item.analysis?.pitch || 0,
            rest: item.analysis?.rest || 0,
            energy: item.analysis?.energy || 0,
            confidence: item.analysis?.confidence || 0,
            pitchSD: item.analysis?.pitchSD || 0,
            volumeSD: item.analysis?.volumeSD || 0,
            restPerMinute: Math.round(item.analysis?.restPerMinute) || 0,
          },
        }));

        const reversedData = [...mappedData].reverse();
        setRoleModelList(reversedData); // 상태 업데이트
        console.log(
          "Select Role Model - fetch Practice Response mappeddata ",
          mappedData
        );
      } catch (err) {
        console.error(err);
      } finally {
      }
    };
    fetchPractices();
  }, []);

  // 카드 클릭 핸들러
  const handleCardClick = async (rolemodel) => {
    setSelectedModel({
      name: rolemodel.name,
      audioUrl: `/api/v1/models/files/${rolemodel.id}`,
    });
  };

  const handleDelete = async (e, modelid, name) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(`${name} 롤모델을 삭제하시겠습니까?`);
    if (!confirmDelete) {
      return;
    }
    try {
      //삭제 API 요청
      const response = await fetch(`/api/v1/models/${modelid}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, response body: ${errorBody}`
        );
      }
      // 삭제 되면 ui 반영
      setRoleModelList(rolemodelList.filter((model) => model.id !== modelid));
      console.error("롤모델 삭제 완료 - ", modelid);
    } catch (error) {
      console.error("Error deleting model:", error);
      alert("롤모델 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  function RoleModelCard({ rolemodel }) {
    const cardClass =
      rolemodel.type === "CREATED"
        ? "cp-rolemodel-grid-card created"
        : rolemodel.type === "PROVIDED"
        ? "cp-rolemodel-grid-card provided"
        : "cp-rolemodel-grid-card";

    const pitchText =
      rolemodel.analysis.pitch >= 80
        ? `높은 목소리 - ${rolemodel.analysis.pitch}`
        : rolemodel.analysis.pitch <= 60
        ? `낮은 목소리 - ${rolemodel.analysis.pitch}`
        : `중간 목소리 - ${rolemodel.analysis.pitch}`;

    const wpmText =
      rolemodel.analysis.wpm >= 120
        ? `빠른 말하기 속도 - ${rolemodel.analysis.wpm}wpm`
        : rolemodel.analysis.wpm <= 95
        ? `낮은 말하기 속도 - ${rolemodel.analysis.wpm}wpm`
        : `중간 말하기 속도 - ${rolemodel.analysis.wpm}wpm`;

    const restText =
      rolemodel.analysis.restPerMinute >= 40
        ? `끊어 읽는 스타일 - 분당 ${rolemodel.analysis.restPerMinute}회`
        : rolemodel.analysis.restPerMinute < 40
        ? `부드럽게 읽는 스타일 - 분당 ${rolemodel.analysis.restPerMinute}회`
        : `부드럽게 읽는 스타일 - 분당 ${rolemodel.analysis.restPerMinute}회`;

    const vpText =
      rolemodel.analysis.pitchSD > 60 && rolemodel.analysis.volumeSD > 10
        ? "굉장히 역동적인 스타일"
        : rolemodel.analysis.pitchSD > 60 || rolemodel.analysis.volumeSD > 10
        ? "역동적인 스타일"
        : "정적인 스타일";

    return (
      <div className={cardClass} onClick={() => handleCardClick(rolemodel)}>
        {/* 상단 영역 */}
        <div className="cp-rolemodel-card-header">
          <span className="cp-rolemodel-card-title">{rolemodel.name}</span>

          {rolemodel.type === "CREATED" && (
            <img
              src={trashIcon}
              alt="delete"
              className="cp-rolemodel-delete-button"
              onClick={(e) => handleDelete(e, rolemodel.id, rolemodel.name)}
            />
          )}
        </div>

        {/* 중간 영역 */}
        <div className="cp-rolemodel-card-analysis">
          <div># {pitchText}</div>
          <div># {wpmText}</div>
          <div># {restText}</div>
          <div># {vpText}</div>
        </div>

        {/* 하단 영역 */}
        <div className="cp-rolemodel-card-footer">{rolemodel.type}</div>
      </div>
    );
  }
  function SelectRoleModel() {
    return (
      <>
        <div className="cp-selectRoleModel-grid-container">
          {rolemodelList.map((rolemodel) => (
            <RoleModelCard key={rolemodel.id} rolemodel={rolemodel} />
          ))}
        </div>
      </>
    );
  }
  return (
    // <div className="cp-rolemodel-container">
    /* <div className="cp-rolemodel-title">롤모델</div> */
    /* <div className="cp-rolemodel-content"> */
    <>
      <h2 className="section-title">롤모델 둘러보기</h2>
      <div className="player-container">
        <AudioPlayer
          audioUrl={selectedModel?.audioUrl || null}
          modelName={selectedModel?.name || null}
        />
      </div>

      <SelectRoleModel canAdd={false} />
    </>

    /* </div> */
    // </div>
  );
}

export default RoleModels;
