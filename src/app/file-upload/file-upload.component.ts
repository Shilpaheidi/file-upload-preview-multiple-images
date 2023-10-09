import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  selectedImages: File[] = [];

  onFileChange(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedImages.push(files[i]);
    }
    this.previewImages();
  }

  previewImages() {
    for (let i = 0; i < this.selectedImages.length; i++) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const img = document.createElement('img');
        const imagePreview = document.getElementById('image-preview');
        if (event.target && imagePreview) {
          img.src = event.target.result;
          imagePreview.appendChild(img);
        }
      };
      reader.readAsDataURL(this.selectedImages[i]);
    }
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.clearPreview();
    this.previewImages();
  }

  clearPreview() {
    const previewContainer = document.getElementById('image-preview');

    if (previewContainer) {
      while (previewContainer.firstChild) {
        previewContainer.firstChild.remove();
      }
    }
  }
}
