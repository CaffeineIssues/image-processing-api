

const handleUpload = (event) => {
    const imageData = document.getElementById('image');
    const owner = document.getElementById('owner').value;
    let formData = new FormData();
    formData.append('owner', owner);
    formData.append('image', imageData.files[0]);
   
    fetch('/upload/image',{
        method: 'POST',
        body:formData

    })
}

  


