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
               'select date': 'Chọn ngày'
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