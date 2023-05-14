import { useContext, useEffect, useState } from "react"
import { useHttp } from "../../../hooks/http-hook"
import { AuthContext } from "../../../context/AuthContext"
import { NavLink } from "react-router-dom"
import { t } from "i18next"
import { useTranslation } from "react-i18next";

export default function CategoriesListCard(props){
    const {t} = useTranslation()
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    const categories = props.categories

    const list = categories.map(x => 
        <tr key={x.id}>
            <td>
                {x.name}
            </td>
            <td>
                {x.description}
            </td>
            <td>
            <button onClick={async () => {
                const data = await request('/api/category/'+x.id, 'DELETE', null, {'Authorization': 'Bearer ' +token})

                props.reload()
            }}>{t('delete')}</button>
            </td>
            <td><NavLink to={`/admin/editcategory/${x.id}`}>{t('edit')}</NavLink></td>
            
        </tr>
    )
    
    return (<div className="categories-list-card">
    <table> 
          <tr>
            <th>{t('Name')}</th>
            <th>{t('Description')}</th>
            <th></th>
          </tr>
        
        {list.length !== 0 ? list : <div>{t('No categories...')}</div>}

    </table>
    </div>)
}
