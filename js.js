const form = document.getElementById('nerdForm');
const nerdDiv = document.getElementById('nerdList');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const nerdName = document.getElementById('nerdName').value;
    const description = document.getElementById('description').value;
    const imageFile = document.getElementById('image').files[0];
    
    if (!imageFile) {
        alert('Chưa chọn hình kìa mày!!!');
        return;
    }
        const reader = new FileReader();
        reader.onload = function (e) {
            const nerdItem = document.createElement('div');
            nerdItem.classList.add('member');
        
            nerdItem.innerHTML = `
            <img src='${e.target.result}' alt='${nerdName}' />
            <h3>${nerdName}</h3>
            <p>${description}</p>
    `;
        nerdDiv.appendChild(nerdItem);
       };
       reader.readAsDataURL(imageFile);
       form.reset();
});