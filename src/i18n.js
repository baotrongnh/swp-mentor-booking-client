import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
     en: {
          translation: {
               //header:
               "browser mentors": "Browser mentors",
               'schedule': 'Schedule',
               'more': 'More',
               'find mentors': 'Find mentors',
               'profile': 'Profile',
               'wallet': 'Wallet',
               'become a mentor': 'Become a mentor',
               'theme': 'Theme',
               'language': 'Language',
               'logout': 'Logout',
               'pending booking': 'Pending bookings',
               'Gift': 'Gift',

               //button:
               'book': 'Book',
               'view profile': 'View Profile',
               'home': 'Home',
               'book now': 'Book now',
               'Wallet': 'Wallet',
               'view profile mentor': 'View profile mentor',

               //moda-booking:
               'Book mentor': 'Book mentor',
               'Available Schedule': 'Available Schedule',
               'Custom Schedule': 'Custom Schedule',
               'Available time': 'Available time',
               'Select a slot': 'Select a slot',
               'This Mentor has no available slot.': 'This Mentor has no available slot.',
               'Cancel': 'Cancel',

               //mentor list page:
               'Clear all filter': 'Clear all filter',
               'No reviews yet': 'No reviews yet',
               'reviews': 'reviews',
               'No description': 'No description',

               //sidebar:
               'skills': 'Skills',
               'rating': 'Rating',
               'date': 'Date',
               'search for skills': 'Search for skills',
               'show more': 'Show more',
               'show less': 'Show less',
               'select date': 'Select date',
               'name': 'Name',
               'point': 'Point',
               'edit-profile': 'Edit Profile',
               'save': 'Save',
               'cancel': 'Cancel',
               'user profile': 'User Profile',

               //footer
               "about us": "About Us",
               "help": "Help",
               "contact": "Contact",
               "welcome message": "Welcome to Mentor Booking System! We connect you with experienced mentors in various fields. Explore our platform to find the perfect mentor for your growth.",
               "all rights reserved": "2024 Mentor Booking System - All rights reserved",

               //schedule
               "booking list": "Booking List",
               "comming booking": "Pending Booking",
               "completed booking": "Completed Booking",
               "all booking": "All Booking",
               "booking calendar": "Booking Calendar",
               "month": "Month",
               "year": "Year",
               "end list": "You have reached the end of your bookings!",

               //wallet:
               'Your balance': 'Your balance',
               'Transaction history': 'Transaction history',

               // New translations for Home.jsx
               "SWP Mentor Booking": "SWP Mentor Booking",
               "Find Your Perfect Mentor": "Find Your Perfect Mentor",
               "Connect with experienced professionals to guide your career": "Connect with experienced professionals to guide your career",
               "Get Started": "Get Started",
               "See Our Best Mentor": "See Our Best Mentor",
               "View Mentor": "View Mentor",
               "Why Use Our Mentor Booking System?": "Why Use Our Mentor Booking System?",
               "Expert Guidance": "Expert Guidance",
               "Connect with experienced professionals who can provide valuable insights and advice tailored to your career goals.": "Connect with experienced professionals who can provide valuable insights and advice tailored to your career goals.",
               "Flexible Scheduling": "Flexible Scheduling",
               "Book sessions at your convenience, fitting mentorship into your busy life with ease.": "Book sessions at your convenience, fitting mentorship into your busy life with ease.",
               "Personalized Learning": "Personalized Learning",
               "Receive one-on-one attention and customized advice to accelerate your professional growth.": "Receive one-on-one attention and customized advice to accelerate your professional growth.",
               "Diverse Expertise": "Diverse Expertise",
               "Access a wide range of mentors across various industries and specializations.": "Access a wide range of mentors across various industries and specializations.",
               "Career Advancement": "Career Advancement",
               "Gain insights and strategies to help you climb the career ladder and achieve your professional goals.": "Gain insights and strategies to help you climb the career ladder and achieve your professional goals.",
               "Networking Opportunities": "Networking Opportunities",
               "Expand your professional network and open doors to new opportunities through your mentors.": "Expand your professional network and open doors to new opportunities through your mentors."
          }
     },
     vi: {
          translation: {
               //header:
               "browser mentors": "Tìm mentors",
               'schedule': 'Lịch',
               'more': 'Thêm',
               'find mentors': 'Tìm mentors',
               'profile': 'Hồ sơ',
               'wallet': 'Ví',
               'become a mentor': 'Trở thành mentor',
               'theme': 'Chủ đề',
               'language': 'Ngôn ngữ',
               'logout': 'Đăng xuất',
               //button:
               'book': 'Đặt lịch',
               'view profile': 'Xem thông tin',
               'home': 'Trang chủ',
               'book now': 'Đặt lịch ngay',
               'Wallet': 'Ví',
               'view profile mentor': 'Xem thông tin mentor',

               //moda-booking:
               'Book mentor': 'Đặt lịch mentor',
               'Available Schedule': 'Lịch trống',
               'Custom Schedule': 'Lịch tùy chỉnh',
               'Available time': 'Thời gian trống',
               'Select a slot': 'Chọn một khung giờ',
               'This Mentor has no available slot.': 'Mentor này không có khung giờ trống nào.',
               'Cancel': 'Hủy',

               //mentor list page:
               'Clear all filter': 'Xóa bộ lọc',
               'No reviews yet': 'Chưa có đánh giá',
               'reviews': 'đánh giá',
               'No description': 'Không có mô tả',

               //sidebar:
               'skills': 'Kỹ năng',
               'rating': 'Đánh giá',
               'date': 'Ngày',
               'search for skills': 'Tìm kiếm kỹ năng',
               'show more': 'Xem thêm',
               'show less': 'Thu gọn',
               'select date': 'Chọn ngày',
               'name': 'Tên Đăng Nhập',
               'point': 'Điểm',
               'edit-profile': 'Chỉnh sửa',
               'save': 'Lưu',
               'cancel': 'Hủy',
               'user profile': 'Trang Cá Nhân',

               //footer
               "about us": "Về Chúng Tôi",
               "help": "Trợ Giúp",
               "contact": "Liên Hệ",
               "welcome message": "Chào mừng đến với Hệ Thống Đặt Lịch Mentor! Chúng tôi kết nối bạn với những mentor giàu kinh nghiệm trong nhiều lĩnh vực. Khám phá nền tảng của chúng tôi để tìm mentor phù hợp cho sự phát triển của bạn.",
               "all rights reserved": "2024 Hệ Thống Đặt Lịch Mentor - Bản quyền thuộc về chúng tôi",

               //schedule
               "booking list": "Danh Sách Đặt Lịch",
               "comming booking": "Đợi duyệt",
               "completed booking": "Đã hoàn thành",
               "all booking": "Tất cả lịch",
               "booking calendar": "Lịch",
               "month": "Tháng",
               "year": "Năm",
               "end list": "Bạn đã xem hết lịch đặt của bạn!",

               //wallet:
               'Your balance': 'Số dư của bạn',
               'Transition history': 'Lịch sử giao dịch',

               // New translations for Home.jsx
               "SWP Mentor Booking": "Đặt Lịch Mentor SWP",
               "Find Your Perfect Mentor": "Tìm Mentor Phù Hợp Với Bạn",
               "Connect with experienced professionals to guide your career": "Kết nối với các chuyên gia giàu kinh nghiệm để định hướng sự nghiệp của bạn",
               "Get Started": "Bắt Đầu",
               "See Our Best Mentor": "Xem Mentor Xuất Sắc Của Chúng Tôi",
               "View Mentor": "Xem Mentor",
               "Why Use Our Mentor Booking System?": "Tại Sao Nên Sử Dụng Hệ Thống Đặt Lịch Mentor Của Chúng Tôi?",
               "Expert Guidance": "Hướng Dẫn Chuyên Nghiệp",
               "Connect with experienced professionals who can provide valuable insights and advice tailored to your career goals.": "Kết nối với các chuyên gia giàu kinh nghiệm, những người có thể cung cấp những hiểu biết và lời khuyên quý giá phù hợp với mục tiêu nghề nghiệp của bạn.",
               "Flexible Scheduling": "Lịch Trình Linh Hoạt",
               "Book sessions at your convenience, fitting mentorship into your busy life with ease.": "Đặt lịch các buổi học theo sự thuận tiện của bạn, dễ dàng kết hợp việc học hỏi từ mentor vào cuộc sống bận rộn của bạn.",
               "Personalized Learning": "Học Tập Cá Nhân Hóa",
               "Receive one-on-one attention and customized advice to accelerate your professional growth.": "Nhận được sự chú ý cá nhân và lời khuyên tùy chỉnh để đẩy nhanh sự phát triển nghề nghiệp của bạn.",
               "Diverse Expertise": "Chuyên Môn Đa Dạng",
               "Access a wide range of mentors across various industries and specializations.": "Tiếp cận với nhiều mentor từ các ngành nghề và chuyên môn khác nhau.",
               "Career Advancement": "Phát Triển Sự Nghiệp",
               "Gain insights and strategies to help you climb the career ladder and achieve your professional goals.": "Nhận được những hiểu biết sâu sắc và chiến lược để giúp bạn thăng tiến trong sự nghiệp và đạt được mục tiêu nghề nghiệp.",
               "Networking Opportunities": "Cơ Hội Kết Nối",
               "Expand your professional network and open doors to new opportunities through your mentors.": "Mở rộng mạng lưới chuyên nghiệp và mở ra cánh cửa cho những cơ hội mới thông qua các mentor của bạn."
          }
     }
}

i18n
     .use(initReactI18next)
     .init({
          resources,
          lng: localStorage.getItem('language') || 'en',
          interpolation: {
               escapeValue: false
          }
     })

export default i18n