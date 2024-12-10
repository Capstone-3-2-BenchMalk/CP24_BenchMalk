export const projectPageApi = {
  async fetchProject(projectId) {
    const response = await fetch(`/api/v1/projects/${projectId}`);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("서버 에러 메세지:", errorData.message || "알 수 없음");
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async fetchPractices(projectId) {
    const response = await fetch(`/api/v1/practices?projectid=${projectId}`);
    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "서버 에러 메시지:",
        errorData.message || "알 수 없는 에러"
      );
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
  },

  async deletePractice(practiceId) {
    const response = await fetch(`/api/v1/practices/${practiceId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "서버 에러 메시지:",
        errorData.message || "알 수 없는 에러"
      );
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
  },

  async fetchAnalysis(practiceId) {
    const response = await fetch(`/api/v1/practices/${practiceId}`, {
      method: "GET",
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "서버 에러 메시지:",
        errorData.message || "알 수 없는 에러"
      );
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
  },

  async fetchRoleModel(modelId) {
    const response = await fetch(`/api/v1/models/${modelId}`);
    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "서버 에러 메시지:",
        errorData.message || "알 수 없는 에러"
      );
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
  },
};
