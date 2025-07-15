import Swal from "sweetalert2";
import './index.css'

export const AlertWithTimer = (icon, title,text, button,time) => {
    return Swal.fire({
        icon,
        title,
        text,
        confirmButtonText: button,
        timer:time,
        customClass: {
            popup: 'custom-swal-popup',
          },
    });
};

export const Alert = (icon, title,text, button) => {
    return Swal.fire({
        icon,
        title,
        text,
        confirmButtonText: button,
        customClass: {
            popup: 'custom-swal-popup',
          },
    });
};
