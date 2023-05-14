import { useContext, useState } from "react"
import { useHttp } from "../../../hooks/http-hook"
import { AuthContext } from "../../../context/AuthContext"
import { NavLink, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useCallback } from "react"
import { t } from "i18next"
import { useTranslation } from "react-i18next";

export default function CreateFromScanner () {
    const {number} = useParams()
    const {t} = useTranslation()
    const {request, loading, error} = useHttp()
    const {token} = useContext(AuthContext)
    const [success, setSuccess] = useState(false)
    const [categories, setCategories] = useState([])
    const [image, setImage] = useState(null)
    const [form, setForm] = useState({
        name: "",
        description:"",
        iconUrl:"https://inventory-app-aitu.s3.eu-north-1.amazonaws.com/aitu.jpg",
        condition:"",
        classroomId: '',
        categoryId:"", 
        itemNumber: number
    })
    function handleImage(event){
        setImage(event.target.files[0])
        
    }
    function changeHandler(event){
        setForm({...form, [event.target.name]: event.target.value.trim()})
    }

    const fetchCategories = useCallback(async function fetchCategories(){
        try {
            const data = await request('/api/category', 'GET', null, {'Authorization': 'Bearer ' + token})
            setCategories(data)
            setForm({...form, categoryId: data[0].id})
            
        } catch(e) {}
    }, [request]) 

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    async function registerHandler(){
        try{
            if(image !== null) {
                const formData = new FormData()
                formData.append('file', image)
                const response = await (await fetch('/api/item/upload', {method: 'POST', body: formData, headers: {"Authorization": 'Bearer '+ token}})).json()
    
                const data = await request('/api/item/fromscanner', 'POST', {...form, iconUrl: response.fileUrl}, {"Authorization": 'Bearer '+ token})
                setSuccess(true)
                return;
            }

            const data = await request('/api/item/fromscanner', 'POST', {...form}, {"Authorization": 'Bearer '+ token})
                setSuccess(true)
        }catch(e){}
    }

    const catList = categories.map(x => <option value={x.id}>{x.name}</option>)
    
    return (
        <div className="create-from-scanner">
            <h2>{t('Create Item from Scanner')}</h2>
            <div className="form-group">
                <label htmlFor="name">{t('Name')}</label>
                <input type="text" id="name" value={form.name} name="name" onChange={changeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="description">{t('Description')}</label>
                <textarea id="description" value={form.description} name="description" onChange={changeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="itemNumber">{t('Item number')}</label>
                <input type="text" id="itemNumber" value={form.itemNumber} name="itemNumber" onChange={changeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="classroomId">{t('Classroom number')}</label>
                <input type="text" id="classroomId" value={form.classroomId} name="classroomId" onChange={changeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="condition">{t('Condition')}</label>
                <input type="text" id="condition" value={form.condition} name="condition" onChange={changeHandler}/> 
            </div>
            <div className="form-group">
                <label htmlFor="categoryId">{t('Categories')}</label>
                <select id="categoryId" name="categoryId" onChange={changeHandler}>
                    {catList}
                </select>
            </div>
            <div>
            <input id={'input-file'}
                               name={'file'}
                               accept={"image/png, image/jpg, image/gif, image/jpeg"}
                               type={'file'}
                               onChange={handleImage}/>
        </div>
            <div className="form-group">
                <button onClick={registerHandler}>{t('Add item')}</button>
            </div>
            {success && <div className="success-message"><b>{t('Item was created!')}</b></div>}
        </div>
    )
};