import 'styles/common.scss'
import 'animate.css'
import '@mdi/font/css/materialdesignicons.css'
import 'styles/team.scss'

import './nav'
import Siema from 'siema';
const siema = new Siema({
    perPage: {
      768: 1,
      800: 3,
      1024: 4,
      1366: 5
    },
    loop: true
});
setInterval(()=>{
    siema.next();
}, 3000)