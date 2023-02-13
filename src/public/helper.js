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
