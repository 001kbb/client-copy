import { useContext, useState, useEffect, useCallback } from "react"
import { useHttp } from "../../../hooks/http-hook"
import { AuthContext } from "../../../context/AuthContext"
import { useTranslation } from "react-i18next";

export default function ItemCard(props) {
    const {t} = useTranslation()
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)
    const number = props.number
    const [data, setData] = useState([])
    const fetchItem = useCallback(async () => {
        try {
            const fetched = await request('/api/item/bynumber/'+number, 'GET', null,  {'Authorization': 'Bearer ' + token})
            setData(fetched)
            
        } catch(e){}
    }, [request])
    

    useEffect(() => {
        fetchItem()
    }, [fetchItem])

    return (
        <div className="item-card">
            {!loading &&
                <>
                    {data.length === 0 && 
                        <div className="no-item-found">
                            <p>{t('No item found')}</p>
                            <a href={"admin/createnew/" + number}>{t('Create new item')}</a>
                        </div>
                    }
                    {data.length > 0 && 
                        <div className="item-details">
                            <div className="item-number">{t('Item id:')} {number}</div>
                            <h2>{t('Name')}: {data[0].name}</h2>
                            <p>{t('Description')}: {data[0].description}</p>
                            <p>{t('Condition')}:    {data[0].condition}</p>
                            
                            <p><img height={150} width={170} src={data[0].iconUrl}/></p>
                        </div>
                    }
                </>
            }
        </div>
    )
}