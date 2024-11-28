import React, { useState } from "react";
import "../../styles/CreateProject.css";
import DraftDropBox from "../CreateDraft/DraftDropBox";

function SelectRoleModel() {
  const [file, setFile] = useState(null);
  const [rolemodelList, setRoleModelList] = useState([
    "김민지 아나운서 (8시 뉴스)",
  ]);

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
          {rolemodelList.map((rolemodel, index) => (
            <RoleModelCard index={index} title={rolemodel} />
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