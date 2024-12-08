import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/CreateProject.css";
import DraftDropBox from "../CreateDraft/DraftDropBox";
import trashIcon from "../../assets/icons/trash-icon.png";

function SelectRoleModel({}) {
  const [file, setFile] = useState(null);
  const [rolemodelList, setRoleModelList] = useState([]);
  const { projectId } = useParams();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPractices = async () => {
      try {
        const response = await fetch("/api/v1/models");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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

  const hCardClick = async (roleModelId, name) => {
    const confirmDelete = window.confirm(
      `${name} 을 롤모델로 선택하시겠습니까?`
    );
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await fetch(`/api/v1/projects`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectid: projectId,
          modelid: roleModelId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Select Role Model - API Response:", data);
      // 강제 새로고침
      // CreateProject에서 isSelected 관련 State 추가하기
      window.location.reload();
    } catch (error) {
      console.error("Select Role Model - Error sending API request:", error);
      alert("Failed to select role model.");
    }
  };

  const hSelectRoleModelButton = async (e) => {
    // 1. Role Model Post 요청
    // 2. Response - rolemodel id 받아오기
    // 3. Patch Project 요청
    e.preventDefault();

    // 1. Role Model Post 요청
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append(
      "json",
      JSON.stringify({
        name: file.name,
        type: "CREATED",
        description: "기본 설명",
      })
    );
    formData.append("file", file);

    try {
      const postResponse = await fetch("/api/v1/models", {
        method: "POST",
        body: formData,
      });

      const postData = await postResponse.json();

      if (!postResponse.ok) {
        throw new Error(
          `POST request failed with status ${postResponse.status}`
        );
      }

      console.log("Select Role Model - RoleModel POST successful:", postData);

      // 2. Response - rolemodel id 받아오기
      const { id: modelId } = postData;
      console.log("여기요" + modelId);
      const patchResponse = await fetch(`/api/v1/projects`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectid: projectId,
          modelid: modelId, // POST 응답에서 추출한 ID
        }),
      });

      if (!patchResponse.ok) {
        throw new Error(
          `PATCH request failed with status ${patchResponse.status}`
        );
      }

      const patchData = await patchResponse.json();
      console.log("Selec Role Model - PATCH Project successful:", patchData);

      // 강제 새로고침
      // CreateProject에서 isSelected 관련 State 추가하기
      window.location.reload();
    } catch (error) {
      console.error("Error during API requests:", error);
      alert("Failed to process request. Please try again.");
    } finally {
      setLoading(false);
    }
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // 삭제 되면 ui 반영
      setRoleModelList(rolemodelList.filter((model) => model.id !== modelid));
      console.error("롤모델 삭제 완료 - ", modelid);
    } catch (error) {
      console.error("Error deleting model:", error);
      alert("롤모델 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  function CreateRoleModel({ file, setFile }) {
    return (
      <div className="cp-createRoleModel">
        <h4>롤모델 생성하기</h4>
        <DraftDropBox isRecordable={false} file={file} setFile={setFile} />
      </div>
    );
  }

  function RoleModelCard({ rolemodel }) {
    const cardClass =
      rolemodel.type === "CREATED"
        ? "cp-rolemodel-card created"
        : rolemodel.type === "PROVIDED"
        ? "cp-rolemodel-card provided"
        : "cp-rolemodel-card";

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

    const vpText = "(모노톤/다양한 톤)";

    return (
      <div
        className={cardClass}
        onClick={() => hCardClick(rolemodel.id, rolemodel.name)}
      >
        {/* 상단 영역 */}
        <div className="cp-rolemodel-card-header">
          <span className="cp-rolemodel-card-title">{rolemodel.name}</span>

          {true && (
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
  function SelectRoleModelButton() {
    return (
      <button
        className="cp-button"
        onClick={hSelectRoleModelButton}
        disabled={isLoading || !file}
      >
        {isLoading ? "업로드 중..." : "생성 하기"}
      </button>
    );
  }
  function SelectRoleModel() {
    return (
      <div className="cp-selectRoleModel">
        <h4>롤모델 둘러보기</h4>
        <div className="cp-selectRoleModel-scroll-container">
          {rolemodelList.map((rolemodel) => (
            <RoleModelCard
              key={rolemodel.id}
              className=".cp-rolemodel-card"
              rolemodel={rolemodel}
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="cp-rolemodel-container">
      <div className="cp-rolemodel-title">롤모델</div>
      <div className="cp-rolemodel-content">
        <h3>롤모델을 추가하여 프로젝트를 활성화해주세요</h3>
        <CreateRoleModel file={file} setFile={setFile} />
        {!file ? (
          <SelectRoleModel />
        ) : (
          <div className="cp-button-container">
            <SelectRoleModelButton />
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectRoleModel;
