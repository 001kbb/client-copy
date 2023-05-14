import { useContext, useEffect, useState, useCallback } from "react"
import { useHttp } from "../../../hooks/http-hook"
import { AuthContext } from "../../../context/AuthContext"
import { NavLink } from "react-router-dom"
import { t } from "i18next"
import { useTranslation } from "react-i18next";
import ImageViewer from 'react-simple-image-viewer'

export default function ItemsListCard(props){
    const {t} = useTranslation()
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    const items = props.items
    const list = items.map(x => 
        <Item setList={(data) => props.setList(data)} openImageViewer={(index) => props.openImageViewer(index)} x={x} reload={() => props.reload()}/>
    )
    
    return (<div className="items-list-card">
    <table> 
          <tr>
            <th></th>
            <th>{t('Name')}</th>
            <th>{t('Description')}</th>
            <th>{t('Condition')}</th>
            <th>{t('Item number id')}</th>
            <th>{t('Category name')}</th>
          </tr>
        
        {list.length !== 0 ? list : <div>{t('No items...')}</div>}

    </table>
    </div>)
}

function Item(props) {
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    const {t} = useTranslation()
    const x = props.x
    const [showImage, setShowImages] = useState(false)
    const [images, setImages] = useState([])

    // const [currentImage, setCurrentImage] = useState(0);
    // const [isViewerOpen, setIsViewerOpen] = useState(false);
    const imagesList = [];
    
    // const openImageViewer = useCallback((index) => {
    //     setCurrentImage(index);
    //     setIsViewerOpen(true);
    // }, []);

    // const closeImageViewer = () => {
    //     setCurrentImage(0);
    //     setIsViewerOpen(false);
    // };

    return (<>
    <tr onClick={async () => {
        setShowImages(!showImage)
        const images = await request('/api/item/getimages/'+x.id, 'GET', null, {'Authorization': 'Bearer ' +token})
        setImages(images)
        images.map((x) => imagesList.push(x.url))
        props.setList(imagesList)
    }} key={x.id}>
            <td>
                <img height={100} width={150} src={x.iconUrl}></img>
            </td>
            <td>
                {x.name}
            </td>
            <td>
                {x.description}
            </td>
            <td>
                {x.condition}
            </td>
            <td>
                {x.itemNumber}
            </td>
            <td>
                {x.categoryName}
            </td>
            <td>
            <button onClick={async () => {
                const data = await request('/api/item/'+x.id, 'DELETE', null, {'Authorization': 'Bearer ' +token})

                props.reload()
            }}>{t('delete')}</button>
            </td>
            <td><NavLink to={`/admin/edititem/${x.id}`}>{t('edit')}</NavLink></td>
            
        </tr>
        
        {(showImage && images.length !== 0) && images.map((src, index) => (
        <img
          src={ src.url }
          onClick={ () => props.openImageViewer(index) }
          width="300"
          key={ index }
          style={{ margin: '2px' }}
          alt=""
        />
      ))}
      {/* {isViewerOpen && (
        <ImageViewer
          src={ imagesList }
          currentIndex={ currentImage }
          disableScroll={ false }
          closeOnClickOutside={ true }
          onClose={ closeImageViewer }
        />
      )} */}
        {(showImage && images.length === 0) && <div>{t('No images...')}</div>}
        </>)
}


