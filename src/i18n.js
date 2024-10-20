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
               "comming booking": "Coming Booking",
               "all booking": "All Booking",
               "booking calendar": "Booking Calendar",
               "month": "Month",
               "year": "Year",
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
               "comming booking": "Lịch sắp tới",
               "all booking": "Tất cả lịch",
               "booking calendar": "Lịch",
               "month": "Tháng",
               "year": "Năm",
          }
     }
}

i18n
     .use(initReactI18next)
     .init({
          resources,
          lng: "en",
          interpolation: {
               escapeValue: false
          }
     })

export default i18n