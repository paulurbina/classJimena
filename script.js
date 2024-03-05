document.addEventListener('DOMContentLoaded', function() {
    fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.getElementById('posts');
            data.slice(0, 5).forEach(post => { // Limitamos a 5 publicaciones para el ejemplo
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <img src="${post.thumbnailUrl}">
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error:', error));
});


