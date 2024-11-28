import React, { useEffect, useState } from "react";
import "../../styles/CreateProject.css";
import DraftDropBox from "../CreateDraft/DraftDropBox";

function SelectRoleModel() {
  const [file, setFile] = useState(null);
  const [rolemodelList, setRoleModelList] = useState([]);

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

  function CreateRoleModel() {
    return (
      <div className="cp-createRoleModel">
        <h4>롤모델 생성하기</h4>
        <DraftDropBox isRecordable={false} file={file} setFile={setFile} />
      </div>
    );
  }

  function RoleModelCard({ index, title }) {
    return (
      <div key={index} className="cp-rolemodel-card">
        <div>{title}</div>
      </div>
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
              index={rolemodel.id}
              title={rolemodel.name}
              type={rolemodel.type}
              userid={rolemodel.userid}
              duration={rolemodel.duration}
              analysis={rolemodel.analysis}
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
        <CreateRoleModel />
        <SelectRoleModel />
      </div>
    </div>
  );
}

export default SelectRoleModel;
