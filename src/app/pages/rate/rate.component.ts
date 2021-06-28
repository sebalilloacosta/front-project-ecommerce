import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Rate } from '../../interfaces/Rate';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {

  product_id:string = "";
  order_id:string = "";
  inputRate:number = 0;
  inputComment:string = "";
  formulario:FormGroup;

  constructor(public fb:FormBuilder, public service: OrdersService, private router: Router, private ActiveRoute:ActivatedRoute) {
    this.formulario = fb.group({
      inputRate:new FormControl(''),
      inputComment:new FormControl('')
    });
   }

  ngOnInit(): void {
    this.product_id = "";
    this.order_id = "";
    let token = localStorage.getItem('accessToken');
    if (token) {
      this.ActiveRoute.paramMap.subscribe( (paramMap:any) =>{
        const {params} = paramMap;
        this.product_id = params['product_id'];
        this.order_id = params['order_id'];
      });
      if(!this.service.ordersMap.get(this.order_id)){
        this.router.navigate([`/orders`]);
      }

    }
    else {
      this.router.navigate([`/home`]);
    }

  }

  onSubmit() {
    let token = localStorage.getItem('accessToken');
    let rate:Rate = {
      score: Number(this.formulario.controls['inputRate'].value),
      comment:this.formulario.controls['inputComment'].value
    }
    console.log(typeof rate.score);
    if (token) {
      if (rate.score != 0) {
        this.service.rateProduct(this.product_id, this.order_id, token, rate);
      }
      else{
        alert("Debe seleccionar una calificacion");
      }
    }
    
    
  }

}
