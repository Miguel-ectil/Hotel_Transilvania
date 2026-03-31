import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';

export const displayMessage = (
    title: string | undefined,
    text: string | undefined,
    icon: SweetAlertIcon,
    buttons?: boolean,
    buttonConfirm?: boolean,
    buttonText?: string | false,
    time?: number,
    options: SweetAlertOptions = {}
) => {
    const iconColors: Record<SweetAlertIcon, string> = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3',
        question: '#7ca5af'
    };

    const objSwal: SweetAlertOptions = {
        title: title || 'Sucesso!',
        html: text,
        showCancelButton: buttons,
        cancelButtonText: 'Fechar',
        showConfirmButton: buttonConfirm,
        confirmButtonText: buttonText === false || !buttonText ? 'OK' : buttonText,
        timer: time,
        icon: icon,
        background: '#f9f9f9',
        color: '#707070',
        customClass: {
            container: 'my-swal'
        },
        didOpen: () => {
            const popup = Swal.getPopup();
            const titleElement = Swal.getTitle();
            const htmlContainer = Swal.getHtmlContainer();
            const confirmButton = Swal.getConfirmButton();
            const cancelButton = Swal.getCancelButton();

            if (popup) {
                popup.style.maxWidth = '380px';
                popup.style.padding = '0.5rem';
                popup.style.borderRadius = '10px';
            }

            if (titleElement) {
                titleElement.style.fontSize = '1rem';
                titleElement.style.margin = '0.1rem 0';
                titleElement.style.color = iconColors[icon];
            }

            if (htmlContainer) {
                htmlContainer.style.fontSize = '0.85rem';
                htmlContainer.style.margin = '0';
            }

            if (confirmButton) {
                confirmButton.style.padding = '0.3rem 0.8rem';
                confirmButton.style.fontSize = '0.85rem';
                confirmButton.style.borderRadius = '6px';
                confirmButton.style.backgroundColor = iconColors[icon];
                confirmButton.style.color = '#fff';
            }

            if (cancelButton) {
                cancelButton.style.padding = '0.3rem 0.8rem';
                cancelButton.style.fontSize = '0.85rem';
                cancelButton.style.borderRadius = '6px';
                cancelButton.style.backgroundColor = '#ccc';
                cancelButton.style.color = '#333';
            }
        },
        ...options
    };

    if (time) {
        objSwal.timer = time;
        objSwal.showConfirmButton = false;
    }

    return Swal.fire(objSwal);
};