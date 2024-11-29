import { useState, useEffect } from "react";
import { projectPageApi } from "../components/ProjectPage/projectPageApi";
import { formatCreatedTime, formatDuration } from "../utils/fomatters";

export function useProjectData(projectId) {
  const [projectData, setProjectData] = useState({
    projectName: "",
    targetTimeMin: 0,
    targetTimeMax: 0,
  });
  const [practices, setPractices] = useState([]);
  const [roleModel, setRoleModel] = useState({
    audioUrl: "",
    modelName: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const projectData = await projectPageApi.fetchProject(projectId);
        const practicesData = await projectPageApi.fetchPractices(projectId);

        setProjectData({
          projectName: projectData.name,
          targetTimeMin: projectData.min_time,
          targetTimeMax: projectData.max_time,
          modelId: projectData.model?.id || null,
        });

        if (projectData.model) {
          setRoleModel({
            audioUrl: `/api/v1/models/files/${projectData.model.id}`,
            modelName: projectData.model.name,
          });
        } else {
          setRoleModel({
            audioUrl: "",
            modelName: "",
          });
        }

        setPractices(
          practicesData
            .map((item) => ({
              practiceId: item.id,
              practiceName: item.name,
              status: item.status || "N/A",
              createdTime: formatCreatedTime(item.created_date),
              duration: formatDuration(item.duration) || "N/A",
              createdDate: item.created_date,
              // analysis: item.analysis.wpm,
            }))
            .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
        );
        // console.log(practicesData.analysis);
      } catch (error) {
        setError("데이터 불러오기 실패");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      fetchData();
    }
  }, [projectId]);
  return { projectData, practices, roleModel, setPractices, loading, error };
}

export function usePracticeData(practiceId) {
  const [analysisData, setAnalysisData] = useState({
    wpm: 0,
    pitch: 0,
    rest: 0,
    energy: 0,
    confidence: 0,
  });
  const [achievement, setAchievement] = useState({
    wpm: 0,
    pitch: 0,
    rest: 0,
    energy: 0,
    confidence: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPracticeData() {
      try {
        const data = await projectPageApi.fetchAnalysis(practiceId);

        if (data?.analysis) {
          setAnalysisData({
            wpm: data.analysis.wpm || 0,
            pitch: data.analysis.pitch || 0,
            rest: data.analysis.rest || 0,
            energy: data.analysis.energy || 0,
            confidence: data.analysis.confidence || 0,
          });
        }

        if (data?.achievements) {
          setAchievement({
            wpm: data.achievements.wpm || 0,
            pitch: data.achievements.pitch || 0,
            rest: data.achievements.rest || 0,
            energy: data.achievements.energy || 0,
            confidence: data.achievements.confidence || 0,
          });
        }
      } catch (error) {
        setError("분석 데이터 불러오기 실패");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (practiceId) {
      fetchPracticeData();
    }
  }, [practiceId]);

  return { analysisData, achievement, loading, error };
}

export function useModelData(modelId) {
  const [modelData, setModelData] = useState({
    wpm: 0,
    pitch: 0,
    rest: 0,
    energy: 0,
    confidence: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchModelData() {
      try {
        const data = await projectPageApi.fetchRoleModel(modelId);

        if (data?.analysis) {
          setModelData({
            wpm: data.analysis.wpm || 0,
            pitch: data.analysis.pitch || 0,
            rest: data.analysis.rest || 0,
            energy: data.analysis.energy || 0,
            confidence: data.analysis.confidence || 0,
          });
        }
      } catch (error) {
        setError("모델 데이터 불러오기 실패");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (modelId) {
      fetchModelData();
    }
  }, [modelId]);

  return { modelData, loading, error };
}
