/* import home from '../../../resources/icons/home-icon.svg'
import home_hover from '../../../resources/icons/home-hover.svg' */
import user from '../../../resources/icons/user-icon.svg'
import user_hover from '../../../resources/icons/user-hover.svg'
import product from '../../../resources/icons/product-icon.svg'
import product_hover from '../../../resources/icons/product-hover.svg'
import report from '../../../resources/icons/report-icon.svg'
import report_hover from '../../../resources/icons/report-hover.svg'
import exchange from '../../../resources/icons/exchange-icon.svg'
import exchange_hover from '../../../resources/icons/exchange-hover.svg'

const routes = [
    /* {
        path: '/dash/product',
        icon: home,
        iconHover: home_hover,
        label: 'Inicio',
        roles: ["Gerente General"]
    }, */
    {
        path: '/dash/user',
        icon: user,
        iconHover: user_hover,
        label: 'Usuarios',
        roles: ["Gerente General"]
    },
    {
        path: '/dash/product',
        icon: product,
        iconHover: product_hover,
        label: 'Productos',
        roles: ["Gerente General", "Gerente de Logística"]
    },
    {
        path: '/dash/exchange',
        icon: exchange,
        iconHover: exchange_hover,
        label: 'Tipo de Cambio',
        roles: ["Gerente General"]
    },
    {
        path: '/dash/report',
        icon: report,
        iconHover: report_hover,
        label: 'Reportes',
        roles: ["Gerente General"]
    }
  ];

export default routes;