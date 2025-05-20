document.addEventListener('DOMContentLoaded', () => {
    const cursordot = document.querySelector('.cursor-dot');
    if (cursordot) {
        document.addEventListener('mousemove', (e) => {
            // Kiểm tra xem chuột có đang ở trong login-box không
            const loginBox = document.querySelector('.login-box');
            if (loginBox && loginBox.matches(':hover')) {
                cursordot.style.opacity = '0';
            } else {
                cursordot.style.opacity = '1';
                cursordot.style.left = `${e.clientX}px`;
                cursordot.style.top = `${e.clientY}px`;
            }
        });
    }
});
document.addEventListener('mousemove', function (e) {
    // Kiểm tra xem chuột có đang ở trong login-box không
    const loginBox = document.querySelector('.login-box');
    if (loginBox && loginBox.matches(':hover')) {
        return; // Không tạo ripple nếu chuột đang trong login-box
    }

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    
    const rippleContainer = document.querySelector('.ripple-container');
    if (rippleContainer) {
        rippleContainer.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const loginContainer = document.getElementById("loginContainer");
    const nerdContainer = document.getElementById("nerdContainer");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");

    if (localStorage.getItem("loggedIn") === "true" && loginContainer && nerdContainer){
        loginContainer.style.display = "none";
        nerdContainer.style.display = "block";
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                // Đăng nhập với Firebase
                const userCredential = await firebase.auth().signInWithEmailAndPassword(username, password);
                const user = userCredential.user;
                
                // Lưu thông tin người dùng vào Firestore
                const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
                
                if (!userDoc.exists) {
                    // Nếu là người dùng mới, tạo document mới trong collection 'users'
                    await firebase.firestore().collection('users').doc(user.uid).set({
                        email: username,
                        lastLogin: new Date()
                    });
                } else {
                    // Cập nhật thời gian đăng nhập
                    await firebase.firestore().collection('users').doc(user.uid).update({
                        lastLogin: new Date()
                    });
                }

                alert("Đăng nhập thành công!");
                localStorage.setItem("loggedIn", "true");
                loginContainer.style.display = "none";
                nerdContainer.style.display = "block";
            } catch (error) {
                console.error("Lỗi đăng nhập:", error);
                alert("Đăng nhập thất bại: " + error.message);
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedIn");
            loginContainer.style.display = "block";
            nerdContainer.style.display = "none";
        });
    }
    // Nerd form logic
    const form = document.getElementById('nerdForm');
    const nerdDiv = document.getElementById('nerdList');

    if (form && nerdDiv) {
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
    }
});