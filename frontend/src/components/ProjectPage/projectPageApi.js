export const projectPageApi = {
  async fetchProject(projectId) {
    const response = await fetch(`/api/v1/projects/${projectId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async fetchPractices(projectId) {
    const response = await fetch(`/api/v1/practices?projectid=${projectId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async deletePractice(practiceId) {
    const response = await fetch(`/api/v1/practices/${practiceId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async fetchAnalysis(practiceId) {
    const response = await fetch(`/api/v1/practices/${practiceId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async fetchRoleModel(modelId) {
    const response = await fetch(`/api/v1/models/${modelId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};
