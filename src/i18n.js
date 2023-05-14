import i18next from "i18next";
import {initReactI18next} from "react-i18next";

const resourses = {
    ru: {
        translation: {
            'Log In': 'Войти',
            'Logout': 'Выход',
            'delete': 'Удалить',
            'edit': 'Редактировать',
            'Name': 'Имя',
            'Description': 'Описание',
            'No categories...': 'Нет категорий...',
            'view items': 'Просмотр элементов',
            'No classes...': 'Нет классов...',
            'Condition': 'Условие',
            'Item number id': 'Идентификационный номер элемента',
            'Category name': 'Название категории',
            'No items...': 'Никаких элементов',
            'Email': 'Почта',
            'Full name': 'Полное имя',
            'Access level': 'Уровень доступа',
            'No users...': 'Никаких пользователей',
            'About Us': 'О нас',
            'Eng': 'Англ',
            'Rus': 'Рус',
            'show users': 'Показать пользователей',
            'list classrooms': 'Список кабинетов',
            'Show categories': 'Показать категории',
            'Login': 'Войти',
            'Email:': 'Почта:',
            'Password:': 'Пароль:',
            'Password': 'Пароль',
            'Back': 'Назад',
            'Add category': 'Добавить категорию',
            'Category was created!': 'Категория создана!',
            'Save changes': 'Сохранить изменения',
            'Loading...': 'Загрузка...',
            'Create category': 'Создать категорию',
            'Add classroom': 'Добавить кабинет',
            'Classroom was created!': 'Кабинет создан!',
            'Category was edited!': 'Категория была изменена!',
            'Create class': 'Создать кабинет',
            'No access for this functionality!': 'Нет доступа для этой функции!',
            'No auth': 'Нет авторизации',
            'Item number': 'Номер элемента',
            'Categories': 'Категории',
            'Add item': 'Добавить элемент',
            'Item was created!': 'Элемент создан!',
            'Classroom number': 'Номер кабинета',
            'Item was edited!': 'Элемент был отредактирован!',
            'Role:': 'Роль:',
            'Admin': 'Администратор',
            'Moderator': 'Модератор',
            'Add user': 'Добавить пользователя',
            'Add User': 'Добавить пользователя',
            'User was created!': 'Пользователь создан!',
            'Create account': 'Создать Аккаунт',
            'The mission of Astana IT University is to provide digital transformation through training, research and successful innovation.': 'Миссия Астанинского ИТ-университета - обеспечить цифровую трансформацию за счет обучения, исследований и успешных инноваций.',
            'Vision. Astana IT University is a leading center of competence for digital transformation in Central Asia.': 'Видение. Астанинский ИТ-университет является ведущим центром компетенций по цифровой трансформации в Центральной Азии.',
            'The global goal is to train highly qualified specialists in the digital economy based on interdisciplinary technologies.': 'Глобальная цель - подготовка высококвалифицированных специалистов в цифровой экономике на основе междисциплинарных технологий.',
            'Phone': 'Номер Телефона',
            'All': 'Все',
            'Available': 'Доступно',
            'Unavailable': 'Недоступно',
            'Search': 'Поиск',
            'User Information': 'Информация Пользователя',
            'No item found': 'Элемент не найден',
            'Create new item': 'Создать новый элемент',
            'Decoded Text': 'Декодированный текст',
            'Format': 'Формат',
            'Scanned results:': 'Отсканированные результаты:',
            'Scanning...': 'Сканирование...',
            'Clear': 'Очистить',
            'Scan': 'Скан',
            'Phone:': 'Номер Телефона:',
            'Search by category': 'Поиск по категориям',
            'This function was created to find appropriate classrooms with certain number of items for different purposes.': 'Эта функция была создана для поиска соответствующих классов с определенным количеством элементов для различных целей.',
            'Enter desired number of items:': 'Введите требуемое количество позиций:',
            'Classroom name/number': 'Название/номер класса',
            'Number of': 'Количество',
            'Find': 'Найти',
            'Profile': 'Профиль',
            'Generate report': 'Сгенерируйте отчет',
            '>Add icon<': '>Добавьте иконку<',
            'No images...': 'Нет изображений...',
            'Show PDF':'Показать PDF',
            'Generated reports': 'Сгенерированные отчеты',
            'No reports...': 'Никаких отчетов...',
            'Report time': 'Время отчета',
            'Link': 'Ссылка',
            'Create Item': 'Создать элемент',
            'Search by item': 'Поиск по элементу',
            'Search by name': 'Поиск по названию',
            'Add icon': 'Добавить иконку',
            'Add images': 'Добавить картинку',
            'Edit Item': 'Изменить элемент'

        }
    }
}

i18next.
    use(initReactI18next).
    init({
    resources: resourses, lng: localStorage.getItem('lang') ,interpolation: {
        escapeValue: false
    }
})

export default i18next;