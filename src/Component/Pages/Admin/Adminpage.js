import { NavLink, Navigate } from "react-router-dom"
import { t } from "i18next"
import { useTranslation } from "react-i18next";

const AdminPage = () => {
    const {t} = useTranslation()
    return (
        <div className="admin-page">  

        <div className="admin-link1">
            <NavLink to={'/admin/listusers'}>{t('show users')}</NavLink>
        </div>
        <div className="admin-link2">
            <NavLink to={'/admin/listclass'}>{t('list classrooms')}</NavLink>
        </div>
        <div className="admin-link3">
            <NavLink to={'/admin/listcategory'}>{t('Show categories')}</NavLink>
        </div>
        </div>
    )
}

export default AdminPage


