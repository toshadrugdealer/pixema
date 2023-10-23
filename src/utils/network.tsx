export const srcTrends = "http://www.omdbapi.com/?&apikey=73f13b04&s=naruto";
export const srcMovie = `http://www.omdbapi.com/?&apikey=73f13b04`;
export const getApiResource = async (url: string) => {
  const res = await fetch(url);
  return await res.json();
};
