const apiUrl = 'https://api.api-ninjas.com/v1/quotes';
const apiKey = '4MdhOeZH/ffNBpmFnzwUiw==xDpVw5NKaPJkJCoA';

function fetchQuote() {
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
        })
        .then(data => {
            if (data && data.length > 0) {
                const quoteText = data[0].quote;
                const authorText = data[0].author;

                // Check if the quote length is 30 characters or less
                if (quoteText.length <= 80) {
                    document.getElementById('quote').textContent = `"${quoteText}"`;
                    document.getElementById('author').textContent = `- ${authorText}`;
                    // console.log(data);
                } else {
                    // Call the API again for a shorter quote
                    fetchQuote();
                }
            } else {
                document.getElementById('quote').textContent = 'No quote found.';
                document.getElementById('author').textContent = '';
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}

fetchQuote();


const search = () => {
    let search = document.getElementById("search")
    console.log(search)
}



// window.onload = function () {
//     let descriptions = document.querySelectorAll('.description'); // Select all description elements
//     let heading = document.querySelector('.heading')

//     descriptions.forEach(description => {
//         if (description && description.textContent) {
//             let text = description.textContent.trim(); // Get the text and trim whitespace
//             if (text.length > 20) {
//                 description.textContent = text.slice(0, 60) + '...'; // Limit to 20 characters
//             }
//         }

//     });

//     // heading.forEach(heading => {
//     //     if (heading && heading.textContent) {
//     //         let text = heading.textContent.trim(); 
//     //         if (text.length > 10) {
//     //             heading.textContent = text.slice(0, 60) + '...'; 
//     //         }
//     //     }

//     // });
// };


