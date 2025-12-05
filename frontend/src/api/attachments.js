import apiClient from '../lib/apiClient.js';

export async function uploadAttachment(taskId, file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('taskId', taskId);
  
  const response = await apiClient.post('/attachments/upload', formData);
  return response;
}

export async function deleteAttachment(id) {
  await apiClient.delete(`/attachments/${id}`);
}
