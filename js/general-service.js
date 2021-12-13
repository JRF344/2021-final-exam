'use strict';

const pushContact = async (pushData, dataEndpoint, redirectUrl) => {
    let url = `http://localhost:8000/api${dataEndpoint}`;

    await axios({
        'method': 'post',
        'url': url,
        data: pushData
    }).then(res => {
        Swal.fire({
            'icon': 'success',
            'title': "Contacto agregado exitosamente.",
            'text': res.msj
        }).then(() => {
            window.location.href = redirectUrl;
        }).catch(error => {
            Swal.fire({
                'icon': 'error',
                'title': 'Ha ocurrido un error.',
                'text': `${error}`
            });
        })
    })
};

const pullContacts = async (dataEndpoint) => {
    let url = `http://localhost:8000/api${dataEndpoint}`;
    let list = [];

    await axios({
        'method': 'get',
        'url': url
    }).then(res => {
        list = res.data.list;
    }).catch(error => {
        Swal.fire({
            'icon': 'error',
            'title': 'Ha ocurrido un error.',
            'text': `${error}`
        });
    })

    return list;
}

const updateContact = async (pushData, dataEndpoint, redirectUrl) => {
    let url = `http://localhost:8000/api${dataEndpoint}`;

    await axios({
        'method': 'put',
        'url': url,
        data: pushData
    }).then(res => {
        Swal.fire({
            'icon': 'success',
            'title': "Contacto editado exitosamente.",
            'text': res.msj
        }).then(() => {
            window.location.href = redirectUrl;
        }).catch(error => {
            Swal.fire({
                'icon': 'error',
                'title': 'Ha ocurrido un error.',
                'text': `${error}`
            });
        })
    })
};

const deleteContact = async(dataEndpoint, data_Id) => {
    let url = `http://localhost:8000/api${dataEndpoint}`;

    await axios({
        'method': 'delete',
        'url': url,
        'data': {
            _id: data_Id
        }
    }).then(res => {
        Swal.fire({
            'icon': 'success',
            'title': "Contacto eliminado exitosamente.",
            'text': res.msj
        }).then(() => {
            window.location.reload();
        }).catch(error => {
            Swal.fire({
                'icon': 'error',
                'title': 'Ha ocurrido un error.',
                'text': `${error}`
            });
        })
    })
};