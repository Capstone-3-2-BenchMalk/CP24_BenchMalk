export const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

export const formatCreatedTime = (isoDate) => {
  const date = new Date(isoDate);

  const hours = String(date.getHours()).padStart(2, "0"); // 24시간 형식
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(date.getDate()).padStart(2, "0")} ${hours}:${minutes}`;
};

export const formatCreatedDate = (isoDate) => {
  const date = new Date(isoDate);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(date.getDate()).padStart(2, "0")}`;
};
