import { useState, useCallback, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom"
import { useHttp } from "../../../hooks/http-hook";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { t } from "i18next"
import { useTranslation } from "react-i18next";

export default function EditItemsPage() {
    const {t} = useTranslation()
    const {id} = useParams()
    const [item, setItem] = useState({})
    const [categories, setCategories] = useState([])
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [image, setImage] = useState(null)
    const {request, loading, error} = useHttp()
    const [imagesFile, setImagesFile] = useState([])
    const {token} = useContext(AuthContext)
    const [form, setForm] = useState({
        name: item.name,
        description: item.description,
        iconUrl: item.iconUrl,
        condition: item.condition,
        classroomId: item.classroomId,
        categoryId:item.categoryId,
        itemNumber: item.itemNumber
    })

    function handleImage(event){
        setImage(event.target.files[0])
    }

    const fetchItem = useCallback(async () => {
        try {
            const fetched = await request('/api/item/byid/'+id, 'GET', null,  {'Authorization': 'Bearer ' + token})
            setItem(fetched);
            setForm({condition: fetched.condition,classroomId: fetched.classroomName,categoryId: fetched.categoryId, itemNumber: fetched.itemNumber, name: fetched.name, description: fetched.description, iconUrl: fetched.iconUrl});
        } catch(e){}
    }, [request])


    useEffect(() => {
        fetchItem()
    }, [fetchItem])

    const fetchCategories = useCallback(async function fetchCategories(){
        try {
            const data = await request('/api/category', 'GET', null, {'Authorization': 'Bearer ' + token})
            setCategories(data)
        } catch(e) {}
    }, [request]) 

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    function handleImagesFile(event) {
        setImagesFile(event.target.files)
    }

    const catList = categories.map(x =>{
        if(x.id === item.categoryId) {
            return <option selected value={x.id}>{x.name}</option>    
        }
        return <option value={x.id}>{x.name}</option>})

    function changeHandler(event){
        setForm({...form, [event.target.name]: event.target.value.trim()})
    }

    async function handleSave() {
        try {
            setMessage('')
             if(image === null) {
                const data = await request('/api/item/'+id, 'PUT', {...form}, {'Authorization': 'Bearer ' + token})
                setSuccess(true)
                const formDataImages = new FormData()
                for (var i = 0; i < imagesFile.length; i++) {
                    formDataImages.append('files', imagesFile[i])
                }
                formDataImages.append('owner', id)
                if(imagesFile.length !== 0) {
                    const imagesResponse = await fetch('/api/item/uploadmany', {method: 'POST', body: formDataImages, headers:{"Authorization": 'Bearer '+ token}});
                    }
                return;
             }
            
            const formData = new FormData()
            formData.append('file', image)
            const response = await (await fetch('/api/item/upload', {method: 'POST', body: formData, headers: {"Authorization": 'Bearer '+ token}})).json()

            const formDataImages = new FormData()
            for (var i = 0; i < imagesFile.length; i++) {
                formDataImages.append('files', imagesFile[i])
            }
            formDataImages.append('owner', id)
            if(imagesFile.length !== 0) {
                const imagesResponse = await fetch('/api/item/uploadmany', {method: 'POST', body: formDataImages, headers:{"Authorization": 'Bearer '+ token}});
            }
            
            console.log(imagesFile.length);
            const data = await request('/api/item/'+id, 'PUT', {...form, iconUrl: response.fileUrl}, {'Authorization': 'Bearer ' + token})
            setSuccess(true)
            
        } catch(e){
            setMessage('No classroom with this number or name')
        }
    }

    return (
        <div className="edit-items-page">
            <NavLink to={'/admin/listitems/'+item.classroomId} className="back-button">{t('Back')}</NavLink>
            {!loading &&
            <div className="form-container">
                <h2 className="page-title">{t('Edit Item')}</h2>
                <div className="form-group">
                    <label htmlFor="name">{t('Name')}</label>
                    <input type="text" id="name" value={form.name} onChange={changeHandler} name={'name'} className="form-input"/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">{t('Description')}</label>
                    <input id="description" value={form.description} onChange={changeHandler} name={'description'} className="form-input"/>
                </div>
                <div className="form-group">
                    <label htmlFor="itemNumber">{t('Item number')}</label>
                    <input type="text" id="itemNumber" value={form.itemNumber} onChange={changeHandler} name={'itemNumber'} className="form-input"/>
                </div>
                <div className="form-group">
                    <label htmlFor="condition">{t('Condition')}</label>
                    <input type="text" id="condition" value={form.condition} onChange={changeHandler} name={'condition'} className="form-input"/>
                </div>
                <div className="form-group">
                    <label htmlFor="categoryId">{t('Categories')}</label>
                    <select onChange={changeHandler} name={'categoryId'} className="form-input">
                        {catList}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="classroomId">{t('Classroom number')}</label>
                    <input type="text" id="classroomId" value={form.classroomId} onChange={changeHandler} name={'classroomId'} className="form-input"/>
                </div>
                <div className="form-group">
                    <label htmlFor="file" className="file-label">{t('Add icon')}</label>
                    <input id="file" name="file" accept={"image/png, image/jpg, image/gif, image/jpeg"} type="file" onChange={handleImage} className="file-input"/>
                </div>
                <div className="form-group">
                    <label htmlFor="files" className="file-label">{t('Add images')}</label>
                    <input id="files" name="files" accept={"image/png, image/jpg, image/gif, image/jpeg"} type="file" multiple onChange={handleImagesFile} className="file-input"/>
                </div>
                <div className="form-group">
                    <button onClick={handleSave} className="submit-button">{t('Save changes')}</button>
                </div>
            </div>}
            {loading && <div>{t('Loading...')}</div>}
            {success && <div className="success-message">{t('Item was edited!')}</div>}
            {message && <div className="error-message">{message}</div>}
        </div>
    )
}