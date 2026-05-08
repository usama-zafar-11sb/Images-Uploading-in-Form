function previewImage() {
    const fileInput = document.getElementById('image-input');
    const file = fileInput.files[0];
    const previewImg = document.getElementById('preview-img');
    const dropZoneContent = document.querySelector('.drop-zone-content');
    const reader = new FileReader();

    reader.onloadend = function () {
        previewImg.src = reader.result;
        previewImg.style.display = 'block';
        if (dropZoneContent) {
            dropZoneContent.style.display = 'none';
        }
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        previewImg.src = "";
        previewImg.style.display = 'none';
        if (dropZoneContent) {
            dropZoneContent.style.display = 'flex';
        }
    }
}

// Drag and drop visual feedback
const dropZone = document.getElementById('drop-zone');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
        dropZone.classList.add('highlight');
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
        dropZone.classList.remove('highlight');
    }, false);
});

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    document.getElementById('image-input').files = files;
    previewImage();
}

dropZone.addEventListener('drop', handleDrop, false);

// Form submission
const form = document.getElementById('upload-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const file = document.getElementById('image-input').files[0];
    
    if (!file) {
        alert('Please select an image first!');
        return;
    }

    const btn = form.querySelector('.submit-btn span');
    const originalText = btn.textContent;
    btn.textContent = 'Uploading...';
    form.querySelector('.submit-btn').disabled = true;

    // Simulate upload
    setTimeout(() => {
        btn.textContent = 'Success!';
        form.querySelector('.submit-btn').style.background = '#10b981';
        
        setTimeout(() => {
            btn.textContent = originalText;
            form.querySelector('.submit-btn').style.background = '';
            form.querySelector('.submit-btn').disabled = false;
            // Optionally reset form
            // form.reset();
            // previewImage();
        }, 2000);
    }, 1500);
});
