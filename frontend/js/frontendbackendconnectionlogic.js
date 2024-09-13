document.addEventListener("DOMContentLoaded", function () {

    async function fetchData() {
        try {
            const response = await fetch('http://localhost:3000/api/imagecontent/');
            const data = await response.json();
            displayData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function displayData(data) {
        const container = document.getElementById('imageContentContainer');
        container.innerHTML = '';

        data.forEach(item => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-4';

            const title = document.createElement('h2');
            title.textContent = item.title;

            const description = document.createElement('p');
            description.textContent = item.description;

            const arrowSpan = document.createElement('span');
            arrowSpan.className = 'arrow';
            arrowSpan.textContent = '→';

            const img = document.createElement('img');
            img.src = `http://localhost:3000/${item.image.replace(/\\/g, '/')}`;
            img.alt = item.title;
            img.style.width = '100%';

            console.log(img)

            colDiv.appendChild(title);
            colDiv.appendChild(description);
            colDiv.appendChild(arrowSpan);
            colDiv.appendChild(img);

            container.appendChild(colDiv);
        });
    }

    fetchData();
});