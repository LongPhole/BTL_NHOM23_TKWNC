let isLoggedIn = false; // Biến trạng thái đăng nhập
let userRole = ''; // Biến lưu vai trò người dùng ('basic' hoặc 'admin')

function showContent(usecase) {
    const contentDiv = document.getElementById('content');
    let content = '';

    if (!isLoggedIn && usecase !== 'login' && usecase !== 'register') {
        content = '<h2>Access Denied</h2><p>You must be logged in to view this content.</p>';
    } else {
        switch(usecase) {
            case 'login':
                content = `<h2>Đăng nhập</h2>
                           <form onsubmit="login(event)">
                               <div class="mb-3">
                                   <label for="username" class="form-label">Tên đăng nhập:</label>
                                   <input type="text" class="form-control" id="username" required>
                               </div>
                               <div class="mb-3">
                                   <label for="password" class="form-label">Mật khẩu:</label>
                                   <input type="password" class="form-control" id="password" required>
                               </div>
                               <button type="submit" class="btn btn-primary">Đăng nhập</button>
                           </form>`;
                break;
            case 'register':
                content = `<h2>Đăng ký</h2>
                           <form onsubmit="register(event)">
                               <div class="mb-3">
                                   <label for="fullname" class="form-label">Họ và tên:</label>
                                   <input type="text" class="form-control" id="fullname" required>
                               </div>
                               <div class="mb-3">
                                   <label for="email" class="form-label">Email:</label>
                                   <input type="email" class="form-control" id="email" required>
                               </div>
                               <div class="mb-3">
                                   <label for="password" class="form-label">Mật khẩu:</label>
                                   <input type="password" class="form-control" id="password" required>
                               </div>
                               <button type="submit" class="btn btn-primary">Đăng ký</button>
                           </form>`;
                break;
            case 'logout':
                content = '<h2>Đăng xuất</h2><p>Bạn đã đăng xuất thành công.</p>';
                isLoggedIn = false;
                userRole = '';
                updateNavLinks();
                break;
            case 'organizeMeetings':
                if (userRole === 'admin') {
                    content = `<h2>Tổ chức cuộc họp</h2>
                               <form onsubmit="createMeeting(event)">
                                   <div class="mb-3">
                                       <label for="meetingTitle" class="form-label">Tiêu đề cuộc họp:</label>
                                       <input type="text" class="form-control" id="meetingTitle" required>
                                   </div>
                                   <div class="mb-3">
                                       <label for="meetingTime" class="form-label">Thời gian kết thúc:</label>
                                       <input type="datetime-local" class="form-control" id="meetingTime" required>
                                   </div>
                                   <div class="mb-3">
                                       <label for="meetingLocation" class="form-label">Địa điểm:</label>
                                       <input type="text" class="form-control" id="meetingLocation" required>
                                   </div>
                                   <div class="mb-3">
                                       <label for="meetingParticipants" class="form-label">Danh sách người tham dự (email, cách nhau bởi dấu phẩy):</label>
                                       <input type="text" class="form-control" id="meetingParticipants" required>
                                   </div>
                                   <button type="submit" class="btn btn-primary">Tạo cuộc họp</button>
                               </form>
                               <div id="meetingManage" class="mt-4" style="display: none;">
                                   <h3>Quản lý cuộc họp</h3>
                                   <p id="meetingInfo"></p>
                                   <button class="btn btn-success" onclick="sendReport()">Gửi báo cáo tổng kết</button>
                               </div>`;
                } else {
                    content = '<h2>Access Denied</h2><p>You do not have permission to organize meetings.</p>';
                }
                break;
            case 'email':
                content = '<h2>Email</h2><p>Content for email.</p>';
                break;
            case 'notificationDetail':
                content = '<h2>Thông báo</h2><p>Content for notification details.</p>';
                break;
            case 'manageStorage':
                content = '<h2>Lưu trữ</h2><p>Content for managing storage.</p>';
                break;
            case 'shareDocuments':
                content = '<h2>Tài liệu</h2><p>Content for sharing documents.</p>';
                break;
            case 'manageAccounts':
                content = '<h2>Quản lý tài khoản</h2><p>Content for managing accounts.</p>';
                break;
            case 'manageTasks':
                content = '<h2>Công việc</h2><p>Content for managing tasks.</p>';
                break;
            case 'manageContracts':
                content = '<h2>Văn bản hợp đồng</h2><p>Content for managing contracts.</p>';
                break;
            case 'manageNotifications':
                content = '<h2>Quản lý thông báo</h2><p>Content for managing notifications.</p>';
                break;
            case 'manageEmployees':
                content = '<h2>Quản lý nhân viên</h2><p>Content for managing employees.</p>';
                break;
            case 'manageProfiles':
                content = '<h2>Quản lý hồ sơ</h2><p>Content for managing profiles.</p>';
                break;
            default:
                content = '<h2>Welcome to E-Office System</h2><p>Please log in to use the system.</p>';
        }
    }
    contentDiv.innerHTML = content;
}

function login(event) {
    event.preventDefault();
    isLoggedIn = true; // Giả sử đăng nhập thành công
    userRole = 'admin'; // Đặt vai trò người dùng ở đây ('basic' hoặc 'admin')
    updateNavLinks();
    showContent('organizeMeetings'); // Điều hướng đến một usecase sau khi đăng nhập
}

function register(event) {
    event.preventDefault();
    isLoggedIn = true; // Giả sử đăng ký và đăng nhập thành công
    userRole = 'basic'; // Đặt vai trò người dùng ở đây ('basic' hoặc 'admin')
    updateNavLinks();
    showContent('organizeMeetings'); // Điều hướng đến một usecase sau khi đăng ký
}

function updateNavLinks() {
    const navLinks = document.getElementById('nav-links');
    if (isLoggedIn) {
        navLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="#" onclick="showContent('organizeMeetings')">Tổ chức cuộc họp</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="showContent('email')">Email</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="showContent('notificationDetail')">Thông báo</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="showContent('manageStorage')">Lưu trữ</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="showContent('shareDocuments')">Tài liệu</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="showContent('manageAccounts')">Quản lý tài khoản</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="showContent('manageTasks')">Công việc</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="showContent('manageContracts')">Văn bản hợp đồng</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="showContent('manageNotifications')">Quản lý thông báo</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="showContent('manageEmployees')">Quản lý nhân viên</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="showContent('manageProfiles')">Quản lý hồ sơ</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="showContent('logout')">Đăng xuất</a></li>`;
    } else {
        navLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="#" onclick="showContent('login')">Đăng nhập</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="showContent('register')">Đăng ký</a></li>`;
    }
}

function createMeeting(event) {
    event.preventDefault();
    const meetingTitle = document.getElementById('meetingTitle').value;
    const meetingTime = document.getElementById('meetingTime').value;
    const meetingLocation = document.getElementById('meetingLocation').value;
    const meetingParticipants = document.getElementById('meetingParticipants').value;

    // Hiển thị thông tin cuộc họp
    const meetingInfo = `
        <p><strong>Tiêu đề:</strong> ${meetingTitle}</p>
        <p><strong>Thời gian kết thúc:</strong> ${meetingTime}</p>
        <p><strong>Địa điểm:</strong> ${meetingLocation}</p>
        <p><strong>Người tham dự:</strong> ${meetingParticipants}</p>
    `;
    document.getElementById('meetingInfo').innerHTML = meetingInfo;
    document.getElementById('meetingManage').style.display = 'block';

    alert('Cuộc họp đã được tạo và thông tin đã được gửi đến các người tham dự.');
}

function sendReport() {
    alert('Báo cáo tổng kết đã được gửi về thông báo cho các thành viên.');
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
    showContent('login');
});
