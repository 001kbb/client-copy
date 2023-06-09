import { useContext, useEffect, useState } from "react"
import { useHttp } from "../../../hooks/http-hook"
import { AuthContext } from "../../../context/AuthContext"
import { NavLink } from "react-router-dom"
import { t } from "i18next"
import { useTranslation } from "react-i18next";

export default function ClassroomListCard(props){
    const {t} = useTranslation()
    const {request} = useHttp()
    const {token, role} = useContext(AuthContext)
    const classes = props.classes

    const list = classes.map(x => 
        <tr key={x.id}>
            <td>
                {x.classroomName}
            </td>
            <td>
                {x.description}
            </td>
            <td>{role !== 2 &&
            <button onClick={async () => {
                const data = await request('/api/classroom/'+x.id, 'DELETE', null, {'Authorization': 'Bearer ' +token})

                props.reload()
            }}>{t('delete')}</button>}
            </td>
            <td>{role !==2 && <NavLink to={`/admin/editclass/${x.id}`}>{t('edit')}</NavLink>}</td>
            <td><NavLink to={'/admin/listitems/'+x.id}>{t('view items')}</NavLink></td>
        </tr>
    )
    
    return (<div className="classroom-list-card">
    <table> 
          <tr>
            <th>{t('Name')}</th>
            <th>{t('Description')}</th>
            <th></th>
          </tr>
        
        {list.length !== 0 ? list : <div>{t('No classes...')}</div>}

    </table>
    </div>)
}