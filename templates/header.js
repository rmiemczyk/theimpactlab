document.addEventListener("DOMContentLoaded", function() {
    // Adding CSS to the head of the document
    var style = document.createElement('style');
    style.textContent = `
        .container h1 a {
            color: black;
            text-decoration: none;
        }
        .search-box {
            padding: 5px;
            margin: 5px;
            width: 200px;
        }
    `;
    document.head.appendChild(style);

    // Adding HTML content to the body
    var headerHtml = `
            <header>
                <div class="flex container">
                    <h1><a href="index.html">The Impact Lab</a></h1>
                    <input type="text" id="search" class="search-box" placeholder="Search...">
                </div>
                <div id="searchResults" class="search-results-container"></div> <!-- Search results will appear here -->
            </header>
        <nav>
            <div class="container">
                <a href="index.html">home</a> |
                <a href="about.html">about</a> |
                <a href="contact.html">contact</a> |
                <a href="work.html">previous work</a> |
                <a href="resources.html">resources</a> |
            </div>
        </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHtml);

    // Load JSON data for search
    fetch('search_content/content.json')
    .then(response => response.json())
    .then(documents => {
        const options = {
            includeScore: true,
            keys: ['title', 'content']
        };
        const fuse = new Fuse(documents, options);

        document.getElementById('search').addEventListener('input', function() {
            var query = this.value;
            if (query.length > 2) { // Only search if the query is 3 or more characters
                const results = fuse.search(query);
                displayResults(results); // Function to handle displaying results
            }
        });

        function displayResults(results) {
            var resultsContainer = document.getElementById('searchResults');
            resultsContainer.innerHTML = ''; // Clear previous results
            results.forEach(result => {
                var div = document.createElement('div');
                div.innerHTML = `<a href="${result.item.url}">${result.item.title}</a> - ${result.item.content}`;
                resultsContainer.appendChild(div);
            });
        }
    })
    .catch(error => {
        console.error('Error loading the documents:', error);
    });
});
