export const fetchData = async (url: string) => {
  try {
    const response = await fetch(`https://api-e-com.vercel.app/${url}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
