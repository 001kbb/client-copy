import { useContext, useState } from "react"
import { useHttp } from "../../../hooks/http-hook"
import { AuthContext } from "../../../context/AuthContext"
import { NavLink } from "react-router-dom"
import { t } from "i18next"
import { useTranslation } from "react-i18next";

export default function CreateCategoryPage () {
    const {t} = useTranslation()
    const {request, loading, error} = useHttp()
    const {token} = useContext(AuthContext)
    const [success, setSuccess] = useState(false)
    const [form, setForm] = useState({
        name: '',
        description: '',
        imageUrl: '123123'
    })

    function changeHandler(event){
        setForm({...form, [event.target.name]: event.target.value.trim()})
    }

    async function registerHandler(){
        try{
            const data = await request('/api/category/', 'POST', {...form}, {"Authorization": 'Bearer '+ token})
            setSuccess(true)
        }catch(e){}
    }
    
    return (<div className="create-category-page">
        
            <button className="create-category-page-button"><NavLink to={'/admin/listcategory'}>{t('Back')}</NavLink></button>
        
        <div>
            {t('Name')}
            <input type={'text'} value={form.name} name={"name"} onChange={changeHandler}/>
        </div>
        <div>
            {t('Description')}
             <input value={form.description} name={"description"} onChange={changeHandler}/>
        </div>
        <div>
            <button className="add-category" onClick={registerHandler}>{t('Add category')}</button>
        </div>
        {success && <div><b>{t('Category was created!')}</b></div>}
    </div>)
};