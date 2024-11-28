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

  // async getRoleModel(modelId) {
  //   console.log("롤모델가보자");
  //   const response = await fetch(`/api/v1/models/files/${modelId}`, {
  //     method: "GET",
  //   });
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   return response.json();
  // },
};
