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
        });

        setPractices(
          practicesData.map((item) => ({
            practiceId: item.id,
            practiceName: item.name,
            status: item.status || "N/A",
            createdTime: formatCreatedTime(item.created_date),
            duration: formatDuration(item.duration) || "N/A",
          }))
        );
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
  return { projectData, practices, setPractices, loading, error };
}
