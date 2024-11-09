import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
     en: {
          translation: {
               //header:
               "browser mentors": "Browse mentors",
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
               'Donation history': 'Donation history',

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
               "comming booking": "Coming",
               "completed booking": "Completed",
               "deny booking": "Denied",
               "booking calendar": "Booking Calendar",
               "month": "Month",
               "year": "Year",
               "end list": "You have reached the end of your bookings!",
               "deny": "Booking Denied",
               "start": 'Start',
               "end": 'End',

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
               "Expand your professional network and open doors to new opportunities through your mentors.": "Expand your professional network and open doors to new opportunities through your mentors.",

               //Login page
               "welcome back": 'Welcome Back!',
               "We are glad": 'We are glad to see you back.',
               "login": 'Log in with Google',

               //Modal apply mentor:
               'Skill Selector': 'Skill Selector',
               'Become a Mentor': 'Become a Mentor',
               'Apply': 'Apply',
               'Add': 'Add',
               'Your selected skills': 'Your selected skills',
               'Remove': 'Remove',
               'Level': 'Level',
               'Agree to': 'Agree to',
               'our terms': 'our terms',
               'Select a level': 'Select a level',
               'Select a skill': 'Select a skill',

               //Donate
               "//Donate": "//Donate",
               "Payment Failed": "Payment Failed",
               "Payment processing error": "Unfortunately, we encountered an issue processing your payment.",
               "Return to Home": "Return to Home",
               "Payment Successful": "Payment Successful!",
               "Thank you message": "Thank you for your purchase. Your order has been processed successfully.",
               "Order Details": "Order Details",
               "Order Number": "Order Number",
               "View Donation": "View Donation",

               // For CommingBooking
               "Cancel this booking?": "Cancel this booking?",
               "Are you sure to cancel this booking?": "Are you sure to cancel this booking?",
               "Yes": "Yes",
               "No": "No",
               "Add Member": "Add Member",

               // For Group display
               "Group": "Group",

               // For Report Modal
               "Report": "Report",

               // MentorCard translations
               "Booked": "Booked",
               "No time available": "No time available",

               // MentorInfo translations
               "Semester": "Semester",
               "Read more": "Read more",

               // Common translations for stats
               "years experience": "years experience",
               "sessions": "sessions",
               "points": "points",
               "mentees": "mentees",
               "No mentees yet": "No mentees yet",

               // MentorProfile Menu Items
               "Slots": "Slots",
               "About": "About",
               "Skills": "Skills",
               "Rating": "Rating",

               // RatingView translations
               "Rating & reviews": "Rating & reviews",
               "Reviews": "Reviews",
               "Write your Review": "Write your Review",
               "Share your feedback": "Share your feedback and help create a better booking experience for everyone.",
               "Write a review": "Write a review",

               // Skills translations
               "Mentor Skills": "Mentor Skills",

               // Slots translations
               "Available Time Slots": "Available Time Slots",
               "Add new slot": "Add new slot",
               "Book": "Book",
               "Delete": "Delete",
               "Something went wrong": "Something went wrong",
               "Booked successfully": "Booked successfully",

               // AboutMentor translations
               "About Me": "About Me",
               "Contact": "Contact",
               "Email": "Email",

               // Gift page translations
               "Total Value": "Total Value",
               "Select a gift to view details": "Select a gift to view details",
               "Send": "Send",
               "Received": "Received",
               "To": "To",
               "From": "From",

               // Gift page additional translations
               "Home": "Home",
               "Browse mentors": "Browse mentors",
               "Gifts Received from Donations": "Gifts Received from Donations",
               "History of sent gifts": "History of sent gifts",
               "Gift History": "Gift History",
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
               'pending booking': 'Đang chờ xác nhận',
               'Gift': 'Quà tặng',
               'Donation history': 'Lịch sử tặng quà',

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
               'name': 'Tên',
               'point': 'Điểm',
               'edit-profile': 'Chỉnh sửa hồ sơ',
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
               "deny booking": "Đã hủy",
               "booking calendar": "Lịch",
               "month": "Tháng",
               "year": "Năm",
               "end list": "Bạn đã xem hết lịch đặt của bạn!",
               "deny": "Đã hủy",
               "start": 'Bắt đầu',
               "end": 'Kết thúc',

               //wallet:
               'Your balance': 'Số dư của bạn',
               'Transaction history': 'Lịch sử giao dịch',

               // New translations for Home.jsx
               "SWP Mentor Booking": "Đặt Lịch Mentor SWP",
               "Find Your Perfect Mentor": "Tìm Mentor Phù Hợp Với Bạn",
               "Connect with experienced professionals to guide your career": "Kết nối với các chuyên gia giàu kinh nghiệm để định hướng sự nghiệp của bạn",
               "Get Started": "Bắt Đầu",
               "See Our Best Mentor": "Xem Mentor Xuất Sắc Của Chúng Tôi",
               "View Mentor": "Xem Mentor",
               "Why Use Our Mentor Booking System?": "Tại Sao Nên Sử Dụng Hệ Thống Đặt Lịch Mentor Của Chúng Tôi?",
               "Expert Guidance": "Hướng Dẫn Chuyên Nghiệp",
               "Connect with experienced professionals who can provide valuable insights and advice tailored to your career goals.": "Kết nối với các chuyên gia giàu kinh nghiệm, những người có thể cung cấp những hiểu biết và lời khuyên quý giá phù hợp với mục tiêu nghề nghip của bạn.",
               "Flexible Scheduling": "Lịch Trình Linh Hoạt",
               "Book sessions at your convenience, fitting mentorship into your busy life with ease.": "Đặt lịch các buổi học theo sự thuận tiện của bạn, dễ dàng kết hợp việc học hỏi từ mentor vào cuộc sống bận rộn của bạn.",
               "Personalized Learning": "Học Tập Cá Nhân Hóa",
               "Receive one-on-one attention and customized advice to accelerate your professional growth.": "Nhận được sự chú ý cá nhân và lời khuyên tùy chỉnh để đẩy nhanh sự phát triển nghề nghip của bạn.",
               "Diverse Expertise": "Chuyên Môn Đa Dạng",
               "Access a wide range of mentors across various industries and specializations.": "Tiếp cận với nhiều mentor từ các ngành nghề và chuyên môn khác nhau.",
               "Career Advancement": "Phát Triển Sự Nghiệp",
               "Gain insights and strategies to help you climb the career ladder and achieve your professional goals.": "Nhận được những hiểu biết sâu sắc và chiến lược để giúp bạn thăng tiến trong sự nghiệp và đạt được mục tiêu nghề nghip.",
               "Networking Opportunities": "Cơ Hội Kết Nối",
               "Expand your professional network and open doors to new opportunities through your mentors.": "Mở rộng mạng lưới chuyên nghiệp và mở ra cánh cửa cho những cơ hội mới thông qua các mentor của bạn.",

               //Login page
               "welcome back": 'Chào mừng trở lại!',
               "We are glad": 'Chúng tôi rất vui khi được gặp lại bạn.',
               "login": 'Đăng nhập bằng Google',

               //Modal apply mentor:
               'Skill Selector': 'Chọn Kỹ Năng',
               'Become a Mentor': 'Trở Thành Mentor',
               'Apply': 'Đăng Ký',
               'Add': 'Thêm',
               'Your selected skills': 'Kỹ Năng Đã Chọn',
               'Remove': 'Xóa',
               'Level': 'Cấp Độ',
               'Agree to': 'Đồng ý với',
               'our terms': 'điều khoản của chúng tôi',
               'Select a level': 'Chọn Cấp Độ',
               'Select a skill': 'Chọn Kỹ Năng',

               //Donate
               "//Donate": "//Donate",
               "Payment Failed": "Thanh Toán Thất Bại",
               "Payment processing error": "Rất tiếc, chúng tôi gặp sự cố khi xử lý thanh toán của bạn.",
               "Return to Home": "Trở Về Trang Chủ",
               "Payment Successful": "Thanh Toán Thành Công!",
               "Thank you message": "Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xử lý thành công.",
               "Order Details": "Chi Tiết Đơn Hàng",
               "Order Number": "Mã Đơn Hàng",
               "View Donation": "Xem Quà Tặng",

               // For CommingBooking
               "Cancel this booking?": "Hủy lịch này?",
               "Are you sure to cancel this booking?": "Bạn có chắc chắn muốn hủy lịch này không?",
               "Yes": "Có",
               "No": "Không",
               "Add Member": "Thêm thành viên",

               // For Group display
               "Group": "Nhóm",

               // For Report Modal
               "Report": "Báo cáo",

               // MentorCard translations
               "Booked": "Đã đặt",
               "No time available": "Không có lịch trống",

               // MentorInfo translations
               "Semester": "Học kỳ",
               "Read more": "Xem thêm",

               // Common translations for stats
               "years experience": "năm kinh nghiệm",
               "sessions": "buổi học",
               "points": "điểm",
               "mentees": "học viên",
               "No mentees yet": "Chưa có học viên",

               // MentorProfile Menu Items
               "Slots": "Lịch Trống",
               "About": "Giới Thiệu",
               "Skills": "Kỹ Năng",
               "Rating": "Đánh Giá",

               // RatingView translations
               "Rating & reviews": "Đánh giá & nhận xét",
               "Reviews": "Nhận xét",
               "Write your Review": "Viết đánh giá của bạn",
               "Share your feedback": "Chia sẻ phản hồi của bạn và giúp tạo trải nghiệm đặt lịch tốt hơn cho mọi người.",
               "Write a review": "Viết đánh giá",

               // Skills translations
               "Mentor Skills": "Kỹ Năng Mentor",

               // Slots translations
               "Available Time Slots": "Lịch Trống Hiện Có",
               "Add new slot": "Thêm lịch mới",
               "Book": "Đặt lịch",
               "Delete": "Xóa",
               "Something went wrong": "Đã xảy ra lỗi",
               "Booked successfully": "Đặt lịch thành công",

               // AboutMentor translations
               "About Me": "Về Tôi",
               "Contact": "Liên Hệ",
               "Email": "Email",

               // Gift page translations
               "Total Value": "Tổng giá trị",
               "Select a gift to view details": "Chọn một món quà để xem chi tiết",
               "Send": "Đã gửi",
               "Received": "Đã nhận",
               "To": "Đến",
               "From": "Từ",

               // Gift page additional translations
               "Home": "Trang chủ",
               "Browse mentors": "Tìm mentor",
               "Gifts Received from Donations": "Quà Tặng Nhận Được",
               "History of sent gifts": "Lịch Sử Quà Đã Tặng",
               "Gift History": "Lịch Sử Quà Tặng",
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