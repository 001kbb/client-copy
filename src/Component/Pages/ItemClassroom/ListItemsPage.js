import { useHttp } from "../../../hooks/http-hook"
import { useState, useCallback, useEffect } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { useContext } from "react"
import { NavLink, useParams } from "react-router-dom"
import ItemsListCard from "../../PageComponents/Items/ItemsListCard"
import { t } from "i18next"
import { useTranslation } from "react-i18next";
import { NotificationManager } from "react-notifications"
import ImageViewer from 'react-simple-image-viewer'
export default function ListItemsPage() {
    const {t} = useTranslation()
    const {id} = useParams()
    const [items, setItems] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [search, setSearch] = useState({
        search: ''
    })
    const fetchItems = useCallback(async () => {
        try {
            const fetched = await request('/api/item/classroom/'+id, 'GET', null,  {'Authorization': 'Bearer ' + token})
            setItems(fetched)
            
        } catch(e){}
    }, [request])

    const generateReport = async () => {
        try {
            const response = await request('/api/reports/','POST', {classroom: id}, {'Authorization': 'Bearer ' + token})
            NotificationManager.success('You can check your report in profile!')
        }catch(e) {}
    }

    const [listOfImages,setList] = useState([])
    const [currentImage, setCurrentImage] = useState(0);
     const [isViewerOpen, setIsViewerOpen] = useState(false);
     const openImageViewer = useCallback((index) => {
            setCurrentImage(index);
            console.log(listOfImages);
            setIsViewerOpen(true);
        }, []);
    
        const closeImageViewer = () => {
            setCurrentImage(0);
            setIsViewerOpen(false);
        };


    useEffect(() => {
        fetchItems()
    }, [fetchItems])

    useEffect(()=>{
        searchItems()
    }, [search])

    const searchItems = async () => {
        try{
            if(search.search.length === 0) {
                fetchItems()
                return
            }
            const data = await request('/api/item/search/'+id+'/'+search.search,'GET', null, {'Authorization': 'Bearer ' + token})
            setItems(data)
        }catch(e){}
    }
    function handleChange(e){
        setSearch({...search, [e.target.name]: e.target.value})
    }
    return (
        <div className="list-items-page">
            {isViewerOpen && (
        <ImageViewer
          src={ listOfImages }
          currentIndex={ currentImage }
          disableScroll={ true }
          closeOnClickOutside={ true }
          backgroundStyle={{backgroundColor: "rgba(0,0,0,0.8)"}}
          onClose={ closeImageViewer }
        />
      )}
            <div className="list-item-buttons">
                <button className="list-item-button-left"><NavLink to={'/admin/listclass'}>{t('Back')}</NavLink></button>
                <button className="list-item-button-right"><NavLink to={'/admin/createitem/' + id} >{t('Add item')}</NavLink></button>
            </div>
            
            <div>
            <input placeholder={t('Search by name')} className = 'list-items-input1' type={'text'} name={'search'} value={search.search} onChange={handleChange}/>
            </div>
            <div>
                
                <button className="generate-report" onClick={generateReport}>{t('Generate report')}</button>
            </div>
            {(!loading) && <ItemsListCard setList={(data) => setList(data)} openImageViewer={(index) => openImageViewer(index)} reload={fetchItems} items={items} />}
            {loading && <div>{t('Loading...')}</div>}
        </div>
    )
}