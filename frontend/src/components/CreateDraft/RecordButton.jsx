import React, { useState, useRef } from "react";
import recordIcon from "../../assets/icons/record-icon.svg";
const Mp3Encoder = require("lamejs").Mp3Encoder;

function RecordButton({ setFile }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const convertToMp3 = async (audioData) => {
    // AudioContext를 사용하여 webm을 디코딩
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(
      await audioData.arrayBuffer()
    );

    // 오디오 데이터를 가져옴
    const channelData = audioBuffer.getChannelData(0);

    // Float32Array를 Int16Array로 변환
    const samples = new Int16Array(channelData.length);
    for (let i = 0; i < channelData.length; i++) {
      samples[i] = channelData[i] * 32767;
    }

    // MP3 인코딩
    const mp3enc = new Mp3Encoder(1, audioBuffer.sampleRate, 128);
    const mp3Data = [];

    const sampleBlockSize = 1152;
    for (let i = 0; i < samples.length; i += sampleBlockSize) {
      const sampleChunk = samples.subarray(
        i,
        Math.min(i + sampleBlockSize, samples.length)
      );
      const mp3buf = mp3enc.encodeBuffer(sampleChunk);
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
    }

    const mp3buf = mp3enc.flush();
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }

    const blob = new Blob(mp3Data, { type: "audio/mp3" });
    return new File([blob], "recording.mp3", { type: "audio/mp3" });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const mp3File = await convertToMp3(blob);
        setFile(mp3File);
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
      <span>{isRecording ? "녹음중" : "녹음"}</span>
    </button>
  );
}

export default RecordButton;
