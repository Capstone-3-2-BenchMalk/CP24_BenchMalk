import React from "react";
import trashIcon from "../../assets/icons/trash-icon.png";
import recordIcon from "../../assets/icons/record-icon.png";

export function PracticeCard({ data, onDelete, onClick, isSelected }) {
  const handleDelete = async (e) => {
    e.stopPropagation(); // 카드 클릭 이벤트와 분리
    try {
      const response = await fetch(`/api/v1/practices/${data.practiceId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, response body: ${errorBody}`
        );
      }

      onDelete(data.practiceId);
    } catch (error) {
      console.error("Error deleting practice:", error);
      alert("연습 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div
      className={`pp-practice-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="practice-card-icon">
        <img src={recordIcon} alt="record" style={{ width: "12px" }} />
      </div>
      <div className="practice-name">{data.practiceName}</div>
      <div className="practice-date">{data.createdTime}</div>
      <div className="practice-time">{data.duration}</div>
      <div className="status">
        <span style={{ color: data.status === "ANALYZED" ? "green" : "red" }}>
          {data.status}
        </span>
      </div>
      <div className="practice-card-icon" onClick={handleDelete}>
        <img
          src={trashIcon}
          alt="trash"
          style={{ width: "14px", cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

// HOC 패턴으로 성능 최적화
// props가 변경되지 않으면 리렌더링 방지
export default React.memo(PracticeCard);
