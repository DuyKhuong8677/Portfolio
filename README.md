# Nhóm 4 — Website nhóm + Portfolio cá nhân theo rubric GK

## Cấu trúc

```text
group-portfolio/
├── index.html
├── css/
│   ├── group.css
│   └── personal.css
├── js/
│   ├── group.js
│   └── personal.js
├── members/
│   ├── duy-khuong.html
│   ├── thanh-vien-02.html
│   ├── thanh-vien-03.html
│   ├── thanh-vien-04.html
│   ├── thanh-vien-05.html
│   └── thanh-vien-06.html
├── images/
│   ├── project-student.svg
│   └── project-web.svg
└── README.md
```

## Đối chiếu yêu cầu GK

- Header/banner, giới thiệu cá nhân và định hướng nghề nghiệp.
- Kỹ năng có thanh tiến độ.
- Học vấn, hoạt động, chứng chỉ/giải thưởng (nếu chưa có ghi đang cập nhật).
- Ít nhất 2 dự án mẫu có mô tả, công nghệ, hình minh họa và link để thay bằng link thật.
- Responsive cho desktop/tablet/mobile, hiệu ứng hover/transition và semantic HTML.
- JavaScript: menu mobile, chuyển Dark/Light mode (ghi nhớ lựa chọn), lọc dự án, hiệu ứng cuộn và kiểm tra form liên hệ.
- CSS/JS tách riêng; ảnh dự án lưu trong `images/`.

## Chạy website

1. Giải nén ZIP.
2. Mở thư mục bằng VS Code.
3. Mở `index.html` trực tiếp trên trình duyệt hoặc dùng extension Live Server.
4. Tại trang chủ nhóm, vào mục Thành viên và chọn một hồ sơ để kiểm tra portfolio cá nhân.

## Việc cần cá nhân hóa trước khi nộp

1. Thay tên, phần giới thiệu, mục tiêu, học vấn và hoạt động bằng thông tin đúng của từng sinh viên.
2. Cập nhật tỷ lệ kỹ năng dựa trên năng lực thật.
3. Thay 2 dự án mẫu bằng ít nhất 2 dự án mà bạn thực sự tham gia; sửa tên, mô tả, công nghệ, ảnh và URL source/demo. Không nên nộp mô tả mẫu như thể đó là dự án đã hoàn thành.
4. Thay email và liên kết GitHub mẫu.
5. Nếu chưa có chứng chỉ hoặc giải thưởng, có thể ghi “Chưa có” theo rubric.
6. Form hiện kiểm tra dữ liệu bằng JavaScript ở trình duyệt, không tự gửi email. Muốn nhận tin nhắn thật phải kết nối backend hoặc dịch vụ form.

## Chức năng JavaScript

- Menu mobile mở/đóng.
- Dark mode / Light mode, lưu lựa chọn bằng `localStorage`.
- Bộ lọc dự án: Tất cả / Web / Lập trình.
- Kiểm tra tên, email, chủ đề và nội dung form.
- Hiệu ứng hiện phần tử khi cuộn.

## Mỗi thành viên tự làm trang riêng

- Mỗi người thay nội dung trong tệp của mình ở `members/` (giữ nguyên tên tệp để liên kết trên trang chủ không bị hỏng).
- Ảnh đại diện: chép vào `images/members/` với tên `01.jpg` … `06.jpg`; trang chủ tự hiển thị.
- Sau khi có thông tin thật, sửa tên, vai trò, kỹ năng trên thẻ tương ứng trong `index.html` và xóa dấu đỏ `<span class="stamp">`.
