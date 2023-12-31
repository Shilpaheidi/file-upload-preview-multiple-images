import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
        // Display the image preview
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
