document.addEventListener('DOMContentLoaded', () => {
    const cursordot = document.querySelector('.cursor-dot');
    document.addEventListener('mousemove', (e) => {
        cursordot.style.left = `${e.clientx}px`;
        cursordot.style.top = `${e.clienty}px`;
    });
});
document.addEventListener('mousemove', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.querySelector('.ripple-container').appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
    });
document.addEventListener("DOMContentLoaded", function () {
    const loginContainer = document.getElementById("loginContainer");
    const nerdContainer = document.getElementById("nerdContainer");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");

    if (localStorage.getItem("loggedIn") === "true"){
        loginContainer.style.display = "none";
        nerdContainer.style.display = "blocl";
    }

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "123456") {
            alert("Bạn đã Đăng Nhập");
            localStorage.setItem("loggedIn", "true");
            loginContainer.style.display = "none";
            nerdContainer.style.display = "block";
        } else {
            alert("Tên đăng nhập hoặc mật khẩu không chính xác");
        }
    });

    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("loggedIn");
        loginContainer.style.display = "block";
        nerdContainer.style.display = "none";
    })
});
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