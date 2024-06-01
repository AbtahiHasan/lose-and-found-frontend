const getRecentPost = async () => {
  const response = await fetch(
    "https://lost-and-found-system-system-backend.onrender.com/api/found-items?sortBy=createdAt&sortOrder=desc",
    {
      next: { tags: ["found-items"] },
    }
  );
  return response.json();
};

export { getRecentPost };
