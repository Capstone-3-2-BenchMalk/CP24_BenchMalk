import React, { useState, useRef } from "react";
import recordIcon from "../../assets/icons/record-icon.svg";

function RecordButton({ setFile }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const audioFile = new File([blob], "recording.webm", {
          type: "audio/webm",
        });
        setFile(audioFile);
        chunks.current = [];

        // 스트림 트랙들을 정지
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("녹음을 시작할 수 없습니다:", err);
      alert("마이크 접근 권한이 필요합니다.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <button
      className="cd-draftDropBox-button"
      style={{
        width: "118px",
        gap: "8px",
        backgroundColor: isRecording ? "#ff4444" : undefined,
      }}
      onClick={isRecording ? stopRecording : startRecording}
    >
      <img src={recordIcon} alt="Record Icon" />
      <span>{isRecording ? "녹음중..." : "녹음"}</span>
    </button>
  );
}

export default RecordButton;
