import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/CreateProject.css";
import DraftDropBox from "../CreateDraft/DraftDropBox";

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
          },
        }));

        setRoleModelList(mappedData); // 상태 업데이트
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

  const hCardClick = async (roleModelId) => {
    try {
      const response = await fetch(`/api/v1/projects`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectid: projectId,
          name: "",
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
        type: "PROVIDED",
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

  function CreateRoleModel({ file, setFile }) {
    return (
      <div className="cp-createRoleModel">
        <h4>롤모델 생성하기</h4>
        <DraftDropBox isRecordable={false} file={file} setFile={setFile} />
      </div>
    );
  }

  function RoleModelCard({ key, title, type, duration, analysis, onClick }) {
    return (
      <div key={key} className="cp-rolemodel-card" onClick={onClick}>
        <div>{title}</div>
        <div>{"Type:        " + type}</div>
        <div>{"Duration:    " + duration}</div>
        <div>{"WPM:         " + analysis.wpm}</div>
        <div>{"Pitch:       " + analysis.pitch}</div>
        <div>{"Rest:        " + analysis.rest}</div>
        <div>{"Energy:      " + analysis.energy}</div>
        <div>{"Confidence:  " + analysis.confidence}</div>
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
              className=".cp-rolemodel-card"
              key={rolemodel.id}
              title={rolemodel.name}
              type={rolemodel.type}
              userid={rolemodel.userid}
              duration={rolemodel.duration}
              analysis={rolemodel.analysis}
              onClick={() => hCardClick(rolemodel.id)}
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
