import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function Graph({
  modelPitches = [],
  modelVolumes = [],
  myPitches = [],
  myVolumes = [],
}) {
  // console.log("모델피치다 ", modelPitches);
  // console.log("모델볼륨다 ", modelVolumes);
  // console.log("내피치다 ", myPitches);
  // console.log("내볼륨다 ", myVolumes);
  const modelPitchArray =
    typeof modelPitches === "string"
      ? JSON.parse(modelPitches)
      : Array.isArray(modelPitches)
      ? modelPitches
      : [];
  const modelVolumeArray =
    typeof modelVolumes === "string"
      ? JSON.parse(modelVolumes)
      : Array.isArray(modelVolumes)
      ? modelVolumes
      : [];
  const myPitchArray =
    typeof myPitches === "string"
      ? JSON.parse(myPitches)
      : Array.isArray(myPitches)
      ? myPitches
      : [];
  const myVolumeArray =
    typeof myVolumes === "string"
      ? JSON.parse(myVolumes)
      : Array.isArray(myVolumes)
      ? myVolumes
      : [];

  // 0이 아니고 1000 이하의 값만 필터링 (특이값 제외)
  const filteredModelData = modelPitchArray
    .map((pitch, index) => ({ x: pitch, y: modelVolumeArray[index] }))
    .filter(
      (point) =>
        point.x !== 0.0 && point.y > 10.0 && point.x < 1000 && point.y < 1000
    );
  const filteredMyData = myPitchArray
    .map((pitch, index) => ({ x: pitch, y: myVolumeArray[index] }))
    .filter(
      (point) =>
        point.x !== 0.0 && point.y > 10.0 && point.x < 1000 && point.y < 1000
    );

  const data = {
    datasets: [
      {
        label: "롤모델 분산도",
        data: filteredModelData,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "transparent",
        pointRadius: 4,
      },
      {
        label: "나의 분산도",
        data: filteredMyData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "transparent",
        pointRadius: 4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
        min: 20, // 최소 데시벨
        max: 90, // 최대 데시벨
        title: {
          display: true,
          text: "데시벨(dB)",
        },
        ticks: {
          stepSize: 10, // 눈금 간격 50
        },
      },
      x: {
        beginAtZero: false,
        min: 50, // 최소 피치
        max: 500, // 최대 피치
        title: {
          display: true,
          text: "피치(Hz)",
        },
        ticks: {
          stepSize: 50, // 눈금 간격 50
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "분산도 분석",
      },
    },
  };

  return (
    <div style={{ width: "70%", height: "auto" }}>
      <Scatter data={data} options={options} />
    </div>
  );
}

export default Graph;
