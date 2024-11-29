import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/CreateProject.css";
import DraftDropBox from "../CreateDraft/DraftDropBox";

function SelectRoleModel({}) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [rolemodelList, setRoleModelList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { projectId } = useParams();

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
        console.log(data);
        console.log(mappedData);
      } catch (err) {
        console.error(err);
      } finally {
      }
    };
    fetchPractices();
  }, []);

  const hModalOpen = () => {
    setIsOpen(true);
  };
  const hCloseModal = () => {
    setIsOpen(false);
  };

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
          modeilid: roleModelId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("API Response:", data);
      // 강제 새로고침
      // CreateProject에서 isSelected 관련 State 추가하기
      window.location.reload();
    } catch (error) {
      console.error("Error sending API request:", error);
      alert("Failed to select role model.");
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

  function RoleModelCard({ index, title, onClick }) {
    return (
      <div key={index} className="cp-rolemodel-card" onClick={onClick}>
        <div>{title}</div>
      </div>
    );
  }
  function SelectRoleModelButton() {
    return (
      <button
        className="cp-button"
        onClick={() => {}}
        disabled={false || !file}
      >
        {false ? "업로드 중..." : "생성 하기"}
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
              index={rolemodel.id}
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
