const API_KEY_NEWS = "4cdb59328fda4ebaa262c8e3827408f1";
const TECH_API_URL = `https://newsapi.org/v2/everything?q=tech&pageSize=3&apiKey=${API_KEY_NEWS}`;
const SPORTS_API_URL = `https://newsapi.org/v2/everything?q=sports&pageSize=3&apiKey=${API_KEY_NEWS}`;
const url_NEWS = `https://newsapi.org/v2/everything?q=technology&apiKey=${API_KEY_NEWS}`;
let currentPage = 1; // Page tracking for main feed
const pageSize = 7; // Number of articles per page for the main feed

// Fetch news from the API
async function fetchNews(url, containerId, templateType = "basic") {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            if (templateType === "basic") {
                populateBasicCards(data.articles, containerId);
            } else if (templateType === "band") {
                populateBand(data.articles);
            }
        } else {
            console.error("No articles found.");
        }
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

// Populate basic Tech or Sports cards
function populateBasicCards(articles, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with ID '${containerId}' not found.`);
        return;
    }

    articles.forEach((article) => {
        const cardHTML = `
            <a style="text-decoration:none;color:black;" class="small-card animate__animated animate__fadeInLeft">
                <div class="img-div">
                    <img class="card-small-img" src="${article.urlToImage || 'img.png'}" alt="News Image">
                </div>
                <div class="text-div">
                    <h4 class="heading">${article.title ? article.title.slice(0, 20) + "..." : 'No Title Available'}</h4>
                    <p class="description">${article.description ? article.description.slice(0, 40) + "..." : 'No Description Available'}</p>
                    <div class="date-time-div">
                        <span>${new Date(article.publishedAt).toLocaleDateString()}</span>
                        <span>${article.author || 'Unknown Author'}</span>
                    </div>
                </div>
            </a>
        `;
        container.innerHTML += cardHTML;
    });
}

// Populate the main feed using the band template
function populateBand(articles) {
    const bandContainer = document.querySelector('.band');

    if (!bandContainer) {
        console.error("Band container not found.");
        return;
    }

    articles.forEach((article, index) => {
        const newsHTML = `
            <div class="item-${index + 1} animate__animated animate__fadeInRight">
                <a href="${article.url}" class="card" target="_blank">
                    <div class="thumb" style="background-image: url(${article.urlToImage || 'img.png'});"></div>
                    <article>
                        <h1>${article.title ? article.title.slice(0, 30) + "..." : "No Title Available"}</h1>
                        <p>${article.description ? article.description.slice(0, 60) + "..." : "No Description Available"}</p>
                        <span>${article.author || "Unknown Author"}</span>
                    </article>
                </a>
            </div>
        `;
        bandContainer.innerHTML += newsHTML;
    });
}

// Load more news for the main feed
async function loadMoreNews() {
    await fetchNews(`${url_NEWS}&page=${currentPage}&pageSize=${pageSize}`, null, "band");
    currentPage++;
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    // Fetch Tech and Sports news
    fetchNews(TECH_API_URL, "tech-news", "basic");
    fetchNews(SPORTS_API_URL, "sports-news", "basic");

    // Fetch initial main feed news
    loadMoreNews();

    // Attach "Load More" button functionality
    const loadMoreButton = document.querySelector('#load-more');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', loadMoreNews);
    }
});
