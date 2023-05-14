import { useCallback, useContext, useEffect, useState } from "react"
import { useHttp } from "../../../hooks/http-hook"
import { AuthContext } from "../../../context/AuthContext"
import { Link, Navigate, useNavigate, redirect } from "react-router-dom"
import Moment from "react-moment"
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom"

export default function UserPage(){
  const {t} = useTranslation()
    const [userData, setUserData] = useState({})
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)
    const [reports, setReports] = useState([])
    const navigate = useNavigate()
    const fetchInfo = useCallback(async () => {
        try {
            const data = await request('/api/admin/identity', 'GET', null, {'Authorization': 'Bearer ' + token})
            setUserData(data)
            setReports(data.reportsUrl)
        } catch(e) {}
    }, [request])

    useEffect(() => {
        fetchInfo()
    }, [fetchInfo])

    const list = reports.map(x => {
        return <tr>
            <td><Moment format={'dddd DD.MM.YYYY hh:mm a'} date={x.dateTime}/>
                
            </td>
            <td><button onClick={() => window.location.replace(x.reportUrl)}>{t('Show PDF')}</button></td>
        </tr>
    })

    return (
        <>
          {loading && <div>{t('Loading...')}</div>}
          {!loading && (
            <div className="user-page">
              <button className="user-page-link"><NavLink to={'/admin/adminpanel'}>{t('Back')}</NavLink></button>
            <div className="user-page-container">
              <table className="user-page-table">
                <tbody>
                  <tr>
                    <th>{t('Email')}:</th>
                    <td>{userData.email}</td>
                  </tr>
                  <tr>
                    <th>{t('Access level')}:</th>
                    <td>{userData.role}</td>
                  </tr>
                </tbody>
              </table>
              <div className="user-page-reports">
                {t('Generated reports')}:
                {reports.length === 0 && <p>{t('No reports...')}</p>}
                {reports.length !== 0 && (
                  <table className="user-page-reports-table">
                    <thead>
                      <tr>
                        <th>{t('Report time')}</th>
                        <th>{t('Link')}</th>
                      </tr>
                    </thead>
                    <tbody>{list}</tbody>
                  </table>
                )}
              </div>
            </div>
            </div>
          )}
        </>
      )}