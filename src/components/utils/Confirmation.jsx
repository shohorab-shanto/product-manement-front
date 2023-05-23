import React from 'react';

const Confirmation = (props) => {
    // Props can contains variables: {open, message, confirmText, cancelText, id }
    // and events: {onConfirm, onCancel}
    
    if (props.open)
        window.Swal.fire({
            text: props.message ?? "Are you sure you want to delete?",
            icon: props.icon ?? "warning",
            showCancelButton: 1,
            buttonsStyling: 0,
            confirmButtonText: props.confirmText ?? "Yes, delete!",
            cancelButtonText: props.cancelText ?? "No, cancel",
            customClass: {
                confirmButton: "btn fw-bold btn-danger",
                cancelButton: "btn fw-bold btn-active-light-primary"
            }
        }).then((function (t) {
            switch (t.value) {
                case true:
                    props.onConfirm && props.onConfirm(props.id)
                    break;

                default:
                    props.onCancel && props.onCancel(props.id)
                    break;
            }
        }))

    return (
        <>
        </>
    )
};

export default Confirmation;
