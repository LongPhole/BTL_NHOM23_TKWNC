let isLoggedIn = false;
let userRole = '';
const notifications = [];
const employees = [];

function showContent(usecase) {
    const contentDiv = document.getElementById('content');
    let content = '';

    if (!isLoggedIn && usecase !== 'login' && usecase !== 'register') {
        content = '<h2>Access Denied</h2><p>You must be logged in to view this content.</p>';
    } else {
        switch (usecase) {
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
                if (userRole === 'admin') {
                    content = `<h2>Quản lý thông báo</h2>
                               <button class="btn btn-success mb-3" onclick="showNotificationForm()">Thêm thông báo</button>
                               <div id="notificationList"></div>
                               <form id="notificationForm" style="display:none;" onsubmit="saveNotification(event)">
                                   <div class="mb-3">
                                       <label for="notificationContent" class="form-label">Nội dung thông báo</label>
                                       <input type="text" class="form-control" id="notificationContent" required>
                                   </div>
                                   <div class="mb-3">
                                       <label for="notificationTime" class="form-label">Thời gian</label>
                                       <input type="datetime-local" class="form-control" id="notificationTime" required>
                                   </div>
                                   <button type="submit" class="btn btn-primary">Lưu lại</button>
                                   <button type="button" class="btn btn-secondary" onclick="cancelNotification()">Hủy bỏ</button>
                               </form>`;
                    setTimeout(loadNotifications, 0); // Use setTimeout to ensure the element is in the DOM
                } else {
                    content = '<h2>Access Denied</h2><p>You do not have permission to manage notifications.</p>';
                }
                break;
            case 'manageEmployees':
                if (userRole === 'admin') {
                    content = `<h2>Quản lý nhân viên</h2>
                               <button class="btn btn-success mb-3" onclick="showEmployeeForm()">Thêm nhân viên</button>
                               <div id="employeeList"></div>
                               <form id="employeeForm" style="display:none;" onsubmit="saveEmployee(event)">
                                   <div class="mb-3">
                                       <label for="employeeName" class="form-label">Tên nhân viên</label>
                                       <input type="text" class="form-control" id="employeeName" required>
                                   </div>
                                   <div class="mb-3">
                                       <label for="employeeEmail" class="form-label">Email</label>
                                       <input type="email" class="form-control" id="employeeEmail" required>
                                   </div>
                                   <div class="mb-3">
                                       <label for="employeePosition" class="form-label">Chức vụ</label>
                                       <input type="text" class="form-control" id="employeePosition" required>
                                   </div>
                                   <div class="mb-3">
                                       <label for="employeeDepartment" class="form-label">Phòng ban</label>
                                       <input type="text" class="form-control" id="employeeDepartment" required>
                                   </div>
                                   <div class="mb-3">
                                       <label for="employeeJoinDate" class="form-label">Ngày gia nhập</label>
                                       <input type="date" class="form-control" id="employeeJoinDate" required>
                                   </div>
                                   <div class="mb-3">
                                       <label for="employeeBirthDate" class="form-label">Ngày sinh</label>
                                       <input type="date" class="form-control" id="employeeBirthDate" required>
                                   </div>
                                   <div class="mb-3">
                                       <label for="employeePhone" class="form-label">Số điện thoại</label>
                                       <input type="text" class="form-control" id="employeePhone" required>
                                   </div>
                                   <div class="mb-3">
                                       <label for="employeeSalary" class="form-label">Lương</label>
                                       <input type="number" class="form-control" id="employeeSalary" required>
                                   </div>
                                   <button type="submit" class="btn btn-primary">Lưu lại</button>
                                   <button type="button" class="btn btn-secondary" onclick="cancelEmployee()">Hủy bỏ</button>
                               </form>`;
                    setTimeout(loadEmployees, 0); // Use setTimeout to ensure the element is in the DOM
                } else {
                    content = '<h2>Access Denied</h2><p>You do not have permission to manage employees.</p>';
                }
                break;
            default:
                content = '<h2>Welcome to E-Office System</h2><p>Please log in to use the system.</p>';
        }
    }
    contentDiv.innerHTML = content;
}

function updateNavLinks() {
    const navLinks = document.getElementById('nav-links');
    let links = '';

    if (isLoggedIn) {
        links += `<li class="nav-item"><a class="nav-link" href="#" onclick="showContent('organizeMeetings')">Tổ chức cuộc họp</a></li>`;
        links += `<li class="nav-item"><a class="nav-link" href="#" onclick="showContent('email')">Email</a></li>`;
        links += `<li class="nav-item"><a class="nav-link" href="#" onclick="showContent('notificationDetail')">Thông báo</a></li>`;
        links += `<li class="nav-item"><a class="nav-link" href="#" onclick="showContent('manageStorage')">Lưu trữ</a></li>`;
        links += `<li class="nav-item"><a class="nav-link" href="#" onclick="showContent('shareDocuments')">Tài liệu</a></li>`;
        links += `<li class="nav-item"><a class="nav-link" href="#" onclick="showContent('manageAccounts')">Quản lý tài khoản</a></li>`;
        links += `<li class="nav-item"><a class="nav-link" href="#" onclick="showContent('manageTasks')">Công việc</a></li>`;
        links += `<li class="nav-item"><a class="nav-link" href="#" onclick="showContent('manageContracts')">Văn bản hợp đồng</a></li>`;
        links += `<li class="nav-item"><a class="nav-link" href="#" onclick="showContent('manageNotifications')">Quản lý thông báo</a></li>`;
        links += `<li class="nav-item"><a class="nav-link" href="#" onclick="showContent('manageEmployees')">Quản lý nhân viên</a></li>`;
        links += `<li class="nav-item"><a class="nav-link" href="#" onclick="showContent('manageProfiles')">Quản lý hồ sơ</a></li>`;
        links += `<li class="nav-item"><a class="nav-link" href="#" onclick="showContent('logout')">Đăng xuất</a></li>`;
    } else {
        links += `<li class="nav-item"><a class="nav-link" href="#" onclick="showContent('login')">Đăng nhập</a></li>`;
        links += `<li class="nav-item"><a class="nav-link" href="#" onclick="showContent('register')">Đăng ký</a></li>`;
    }

    navLinks.innerHTML = links;
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Kiểm tra tên đăng nhập và mật khẩu
    if (username === 'admin' && password === 'admin') {
        isLoggedIn = true;
        userRole = 'admin';
    } else if (username === 'user' && password === 'user') {
        isLoggedIn = true;
        userRole = 'basic';
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng.');
        return;
    }

    updateNavLinks();
    showContent('welcome');
}

function register(event) {
    event.preventDefault();
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Thêm logic đăng ký người dùng vào đây

    alert('Đăng ký thành công. Vui lòng đăng nhập.');
    showContent('login');
}

function showNotificationForm() {
    document.getElementById('notificationForm').style.display = 'block';
}

function cancelNotification() {
    document.getElementById('notificationForm').style.display = 'none';
}

function saveNotification(event) {
    event.preventDefault();
    const content = document.getElementById('notificationContent').value;
    const time = document.getElementById('notificationTime').value;

    notifications.push({ content, time });
    loadNotifications();
    cancelNotification();
}

function loadNotifications() {
    const notificationList = document.getElementById('notificationList');
    notificationList.innerHTML = '';
    notifications.forEach((notification, index) => {
        const notificationItem = document.createElement('div');
        notificationItem.classList.add('notification-item');
        notificationItem.innerHTML = `<p>${notification.content}</p><p>${notification.time}</p>`;
        notificationList.appendChild(notificationItem);
    });
}

function showEmployeeForm() {
    document.getElementById('employeeForm').style.display = 'block';
}

function cancelEmployee() {
    document.getElementById('employeeForm').style.display = 'none';
}

function saveEmployee(event) {
    event.preventDefault();
    const name = document.getElementById('employeeName').value;
    const email = document.getElementById('employeeEmail').value;
    const position = document.getElementById('employeePosition').value;
    const department = document.getElementById('employeeDepartment').value;
    const joinDate = document.getElementById('employeeJoinDate').value;
    const birthDate = document.getElementById('employeeBirthDate').value;
    const phone = document.getElementById('employeePhone').value;
    const salary = document.getElementById('employeeSalary').value;

    employees.push({ name, email, position, department, joinDate, birthDate, phone, salary });
    loadEmployees();
    cancelEmployee();
}

function loadEmployees() {
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = `<table class="table">
                                <thead>
                                    <tr>
                                        <th>Tên</th>
                                        <th>Email</th>
                                        <th>Chức vụ</th>
                                        <th>Phòng ban</th>
                                        <th>Ngày gia nhập</th>
                                        <th>Ngày sinh</th>
                                        <th>Số điện thoại</th>
                                        <th>Lương</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${employees.map((employee, index) => `
                                        <tr>
                                            <td>${employee.name}</td>
                                            <td>${employee.email}</td>
                                            <td>${employee.position}</td>
                                            <td>${employee.department}</td>
                                            <td>${employee.joinDate}</td>
                                            <td>${employee.birthDate}</td>
                                            <td>${employee.phone}</td>
                                            <td>${employee.salary}</td>
                                            <td>
                                                <button class="btn btn-warning btn-sm" onclick="editEmployee(${index})">Sửa</button>
                                                <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Xóa</button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                              </table>`;
}

function editEmployee(index) {
    const employee = employees[index];
    document.getElementById('employeeName').value = employee.name;
    document.getElementById('employeeEmail').value = employee.email;
    document.getElementById('employeePosition').value = employee.position;
    document.getElementById('employeeDepartment').value = employee.department;
    document.getElementById('employeeJoinDate').value = employee.joinDate;
    document.getElementById('employeeBirthDate').value = employee.birthDate;
    document.getElementById('employeePhone').value = employee.phone;
    document.getElementById('employeeSalary').value = employee.salary;
    document.getElementById('employeeForm').dataset.editingIndex = index;
    showEmployeeForm();
}

function deleteEmployee(index) {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
        employees.splice(index, 1);
        loadEmployees();
    }
}

// Ensure the page is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    updateNavLinks();
    showContent('login'); // Default to login page if not logged in
});
