// 在语言切换时保存当前语言到本地存储
export const saveLanguage = (locale: string) => {
    localStorage.setItem('language', locale)
}

// 在页面加载时从本地存储读取当前语言设置
export const getSavedLanguage = () => {
    return localStorage.getItem('language')
}

// 默认语言设置（如果没有保存的设置）
export const defaultLanguage = 'zh-CN'

// 根据保存的语言设置或默认设置应用语言
export const applyLanguage = (i18n: { global: { locale: string } }) => {
    const savedLanguage = getSavedLanguage()
    const language = savedLanguage || defaultLanguage
    // eslint-disable-next-line no-param-reassign
    i18n.global.locale = language
}
