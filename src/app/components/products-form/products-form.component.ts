import { Component } from '@angular/core';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzColDirective} from "ng-zorro-antd/grid";
import {ReactiveFormsModule} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';

import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {ApiService} from "../../services/api.service";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzNotificationService} from "ng-zorro-antd/notification";
import { Validators as MyValidators } from '@angular/forms';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    NzFormItemComponent,
    NzFormDirective,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzColDirective,
    ReactiveFormsModule,
    NzInputDirective,
    NzDatePickerComponent,
    NzButtonComponent,
    NzInputNumberComponent
  ],
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsComponent {
  productForm: FormGroup<{
    productName: FormControl<string>;
    description: FormControl<string>;
    quantityInStock: FormControl<number>;
    unitPrice: FormControl<number>;
  }>;

  submitProductForm(): void {
    if (this.productForm.valid) {
      console.log('submit', this.productForm.value);
      this.apiService.create(this.productForm.value).subscribe(() => {
        this.createNotification('success', this.productForm.value.productName, "Product has been created successfully!");
        this.productForm.reset();
      });
    } else {
      Object.values(this.productForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private apiService: ApiService,
    private notification: NzNotificationService
  ) {
    const { required } = MyValidators;
    this.productForm = this.fb.group({
      productName: ['', [required]],
      description: [''],
      quantityInStock: [0, [required]],
      unitPrice: [0, [required]]
    });
  }
}
