import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import styles from './sidebar.module.css'
import brand from '../../../resources/icons/brand.svg'
import log_out from '../../../resources/icons/log-out-icon.svg'
import log_out_hover from '../../../resources/icons/log-out-hover.svg'
import routes from './SidebarItems'


const SidebarComponent = (props) => {
    const [path, setPath] = useState(window.location.pathname);
    return (
        <div className={styles.sidenav}>
            <div className={`${styles.brand}`}>
                <div className={styles.content}>
                    <div className={styles.item}>
                        {<img alt='' className={styles.icon} src={brand}/>}
                        {/* <label className={styles.text}>Farmacia Luz Eléctrica</label> */}
                        {/* <label className={styles.text}>Luz Eléctrica</label> */}
                    </div>
                </div>
            </div>
            <div className={styles.side}>
                <div className={styles.content}>
                    {
                        routes.map((route, i) => 
                        <Link to={route.path} style={{ textDecoration: 'none' }} onClick={() => setPath(route.path)} key={i}>
                            <div className={path === route.path ? `${styles['item-active']}` : `${styles.item}` }>
                                <img alt='' className={styles.icon} src={route.icon}/>
                                <img alt='' className={styles['icon-hover']} src={route.iconHover}/>
                                <label className={styles.text}>{route.label}</label>
                            </div>
                        </Link>)
                    }
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.content}>
                    <div className={styles.item} onClick={props.logOut}>
                        <img alt='' className={styles.icon} src={log_out}/>
                        <img alt='' className={styles['icon-hover']} src={log_out_hover}/>
                        <label className={styles.text}>Cerrar Sesión</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarComponent;
