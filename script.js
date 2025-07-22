const apiKey = "29d8a911";
const form = document.getElementById("search-form");
const results = document.getElementById("results");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const year = document.getElementById("year").value.trim();

  results.innerHTML = "Loading...";

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}${year ? `&y=${year}` : ''}`);
    const data = await response.json();

    if (data.Response === "False") {
      results.textContent = "No results found";
      return;
    }

    results.innerHTML = ""; // Clear previous results

for (const movie of data.Search) {
  const detailResponse = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`);
  const movieDetails = await detailResponse.json();

  const movieCard = document.createElement("div");
  movieCard.innerHTML = `
    <h2>${movieDetails.Title} (${movieDetails.Year})</h2>
    <p><strong>Genre:</strong> ${movieDetails.Genre}</p>
    <p><strong>Director:</strong> ${movieDetails.Director}</p>
    <p><strong>Actors:</strong> ${movieDetails.Actors}</p>
    <p><strong>Plot:</strong> ${movieDetails.Plot}</p>
    <p><strong>Rating:</strong> ${movieDetails.imdbRating}</p>
    <img src="${movieDetails.Poster !== "N/A" ? movieDetails.Poster : "https://via.placeholder.com/150"}" alt="${movieDetails.Title} Poster">
  `;
  results.appendChild(movieCard);
}


  } catch (err) {
    console.error("Fetch error:", err);
    results.textContent = "Something went wrong.";
  }
});
