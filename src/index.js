  // Function to fetch beer data
  function fetchBeerData() {
  // Make a GET request to the server
  return fetch('http://localhost:3000/beers')
    .then(function (response) {
      // Check if the response is successful (status code in the range of 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response body as JSON and return it
      return response.json();
    })
    .catch(function (error) {
      // If there's an error during the fetch or JSON parsing process, handle it
      console.error('Error fetching beer data:', error);
      return null; // Return null to indicate an error occurred
    });
}

  // Function to update the page with beer details
  function updateBeerDetails(beerData) {
    if (!beerData || beerData.length === 0) {
      console.error('No beer data available.');
      return;
    }

    const firstBeer = beerData[0]; // Assuming the first beer in the array is the one to be displayed

    // Update the DOM elements with beer data
    document.getElementById('beer-name').textContent = firstBeer.name;
    document.getElementById('beer-image').src = firstBeer.image_url;
    document.getElementById('beer-image').alt = firstBeer.name;
    document.getElementById('beer-description').textContent =
      firstBeer.description;

    const reviewListElement = document.getElementById('review-list');
    reviewListElement.innerHTML = ''; // Clear the existing reviews

    // Add the reviews to the review list
    firstBeer.reviews.forEach((review) => {
      const reviewListItem = document.createElement('li');
      reviewListItem.textContent = review;
      reviewListElement.appendChild(reviewListItem);
    });
  }

  // Call the functions when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    fetchBeerData().then((beerData) => {
      updateBeerDetails(beerData);
    });
  });