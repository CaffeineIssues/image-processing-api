const handleUpload = () => {
    const imageData = document.getElementById('image')
    const owner = document.getElementById('owner').value
    let formData = new FormData()
    formData.append('owner', owner)
    formData.append('image', imageData.files[0])

    fetch('/upload/image', {
        method: 'POST',
        body: formData,
    }).then((response) => {
        console.log(response)
        if (response.status === 200 || response.status === 210) {
            response.json().then((data) => {
                const url = data.message.url
                document.getElementById('originalImage').src = url
            })
        }
        if (response.status === 500) {
            alert('Internal Server Error')
        }
    })
}

const handleThumb = () => {
    const imageData = document.getElementById('image')
    const owner = document.getElementById('owner').value

    const extension = imageData.files[0].type.split('/')[1]

    const imageFolder = imageData.files[0].name.split(
        `.${extension === 'jpeg' ? 'jpg' : extension}`
    )[0]
    fetch(`/thumbs/${owner}/${imageFolder}/${imageData.files[0].name}`, {
        method: 'GET',
    }).then((response) => {
        console.log(response)
        if (response.status === 200 || response.status === 210) {
            response.json().then((data) => {
                const url = data.message.url
                const file = data.message.file
                document.getElementById(
                    'results'
                ).innerText = `${file}, you can find it at:`
                document.getElementById('results-link').innerText = 'here'
                document.getElementById('results-link').href = url
            })
        }
        if (response.status === 500) {
            alert('Internal Server Error')
        }
    })
}
